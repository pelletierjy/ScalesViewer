#!/usr/bin/env pwsh
# MAS Flow State Management Module
# Handles persistent state tracking for Spec-Kit workflow execution
# Provides initialization, updates, queries, and validation for flow state

[CmdletBinding()]
param(
    [Parameter(Mandatory = $false)]
    [ValidateSet('Initialize', 'Read', 'StartStep', 'CompleteStep', 'FailStep', 'GetStatus', 'GetStepHistory', 'Validate', 'Reset')]
    [string]$Operation,

    [Parameter(Mandatory = $false)]
    [string]$StateFilePath,

    [Parameter(Mandatory = $false)]
    [int]$StepIndex,

    [Parameter(Mandatory = $false)]
    [string]$StepName,

    [Parameter(Mandatory = $false)]
    [ValidateSet('success', 'failed', 'skipped')]
    [string]$Outcome,

    [Parameter(Mandatory = $false)]
    [string]$Message,

    [Parameter(Mandatory = $false)]
    [string[]]$Artifacts,

    [Parameter(Mandatory = $false)]
    [switch]$Json
)

$ErrorActionPreference = 'Stop'

# State schema version
$STATE_VERSION = "1.0"

# Step definitions
$STEPS = @(
    @{ Index = 0; Name = "Setup" },
    @{ Index = 1; Name = "Plan" },
    @{ Index = 2; Name = "Tasks" },
    @{ Index = 3; Name = "Checklist" },
    @{ Index = 4; Name = "Analyze" },
    @{ Index = 5; Name = "Implement" }
)

<#
.SYNOPSIS
Gets the current timestamp in ISO 8601 format
#>
function Get-IsoTimestamp {
    [System.DateTime]::UtcNow.ToString("o")
}

<#
.SYNOPSIS
Generates a unique flow ID
#>
function New-FlowId {
    [guid]::NewGuid().ToString()
}

<#
.SYNOPSIS
Gets the current branch name
#>
function Get-CurrentBranch {
    try {
        if ($env:SPECIFY_FEATURE) {
            return $env:SPECIFY_FEATURE
        }
        $branch = git rev-parse --abbrev-ref HEAD 2>$null
        if ($LASTEXITCODE -eq 0) {
            return $branch
        }
    }
    catch { }
    return "unknown"
}

<#
.SYNOPSIS
Creates a new state structure
#>
function New-MasFlowState {
    param(
        [string]$FlowId = (New-FlowId),
        [string]$FeatureBranch = (Get-CurrentBranch)
    )

    $steps = $STEPS | ForEach-Object {
        @{
            stepIndex  = $_.Index
            stepName   = $_.Name
            status     = "pending"
            attempts   = @()
            lastAttempt = $null
        }
    }

    @{
        version         = $STATE_VERSION
        flowId          = $FlowId
        featureBranch   = $FeatureBranch
        createdAt       = Get-IsoTimestamp
        updatedAt       = Get-IsoTimestamp
        currentStep     = 0
        status          = "not_started"
        steps           = $steps
    }
}

<#
.SYNOPSIS
Creates a new attempt record for a step
#>
function New-StepAttempt {
    param(
        [int]$AttemptNumber = 1
    )

    @{
        attemptNumber = $AttemptNumber
        startedAt     = Get-IsoTimestamp
        completedAt   = $null
        outcome       = "pending"
        message       = "Starting..."
        artifacts     = @()
    }
}

<#
.SYNOPSIS
Writes state to disk atomically (temp file + rename)
#>
function Save-MasFlowState {
    param(
        [Parameter(Mandatory = $true)]
        [string]$StateFilePath,

        [Parameter(Mandatory = $true)]
        [PSCustomObject]$State
    )

    # Ensure directory exists
    $stateDir = Split-Path -Parent $StateFilePath
    if (-not (Test-Path $stateDir)) {
        New-Item -ItemType Directory -Path $stateDir -Force | Out-Null
    }

    # Write to temp file first (atomic write pattern)
    $guid = [guid]::NewGuid().ToString().Substring(0, 8)
    $tempFile = "$StateFilePath.tmp.$guid"

    try {
        $json = $State | ConvertTo-Json -Depth 10 -Compress
        [System.IO.File]::WriteAllText($tempFile, $json, [System.Text.Encoding]::UTF8)

        # Atomic rename
        if (Test-Path $StateFilePath) {
            Remove-Item -Path $StateFilePath -Force
        }
        Move-Item -Path $tempFile -Destination $StateFilePath -Force
    }
    catch {
        if (Test-Path $tempFile) {
            Remove-Item -Path $tempFile -Force -ErrorAction SilentlyContinue
        }
        throw "Failed to save state file: $_"
    }
}

<#
.SYNOPSIS
Reads state from disk with validation
#>
function Read-MasFlowState {
    param(
        [Parameter(Mandatory = $true)]
        [string]$StateFilePath
    )

    if (-not (Test-Path $StateFilePath)) {
        throw "State file not found: $StateFilePath"
    }

    try {
        $json = [System.IO.File]::ReadAllText($StateFilePath, [System.Text.Encoding]::UTF8)
        $state = $json | ConvertFrom-Json
        return $state
    }
    catch {
        throw "Failed to read or parse state file: $_"
    }
}

<#
.SYNOPSIS
Validates state structure
#>
function Test-MasFlowState {
    param(
        [Parameter(Mandatory = $true)]
        [PSCustomObject]$State
    )

    $errors = @()

    if (-not $State.version) { $errors += "Missing version field" }
    if (-not $State.flowId) { $errors += "Missing flowId field" }
    if (-not $State.featureBranch) { $errors += "Missing featureBranch field" }
    if (-not $State.createdAt) { $errors += "Missing createdAt field" }
    if (-not $State.updatedAt) { $errors += "Missing updatedAt field" }
    if ($null -eq $State.currentStep) { $errors += "Missing currentStep field" }
    if (-not $State.status) { $errors += "Missing status field" }
    if (-not $State.steps -or $State.steps.Count -ne 6) { $errors += "Expected 6 steps in state" }

    if ($errors.Count -gt 0) {
        return $false, $errors -join "; "
    }

    return $true, "Valid"
}

<#
.SYNOPSIS
Initializes a new flow state file
#>
function Initialize-MasFlowState {
    param(
        [Parameter(Mandatory = $true)]
        [string]$StateFilePath
    )

    $state = New-MasFlowState
    Save-MasFlowState -StateFilePath $StateFilePath -State $state

    return $state
}

<#
.SYNOPSIS
Marks a step as started
#>
function Start-MasFlowStep {
    param(
        [Parameter(Mandatory = $true)]
        [string]$StateFilePath,

        [Parameter(Mandatory = $true)]
        [int]$StepIndex
    )

    # Read current state
    if (-not (Test-Path $StateFilePath)) {
        throw "State file not found. Run Initialize-MasFlowState first."
    }

    $state = Read-MasFlowState -StateFilePath $StateFilePath

    # Validate step index
    if ($StepIndex -lt 0 -or $StepIndex -ge $state.steps.Count) {
        throw "Invalid step index: $StepIndex"
    }

    $step = $state.steps[$StepIndex]

    # Create new attempt
    $attemptNumber = ($step.attempts | Measure-Object).Count + 1
    $attempt = New-StepAttempt -AttemptNumber $attemptNumber

    # Update step
    $step.status = "in_progress"
    $step.attempts += $attempt
    $step.lastAttempt = $attempt.startedAt

    # Update flow state
    $state.currentStep = $StepIndex
    if ($state.status -eq "not_started") {
        $state.status = "in_progress"
    }
    $state.updatedAt = Get-IsoTimestamp

    # Save state
    Save-MasFlowState -StateFilePath $StateFilePath -State $state

    return $state
}

<#
.SYNOPSIS
Completes a step with outcome
#>
function Complete-MasFlowStep {
    param(
        [Parameter(Mandatory = $true)]
        [string]$StateFilePath,

        [Parameter(Mandatory = $true)]
        [int]$StepIndex,

        [Parameter(Mandatory = $false)]
        [ValidateSet('success', 'failed', 'skipped')]
        [string]$Outcome = 'success',

        [Parameter(Mandatory = $false)]
        [string]$Message = "",

        [Parameter(Mandatory = $false)]
        [string[]]$Artifacts = @()
    )

    # Read current state
    $state = Read-MasFlowState -StateFilePath $StateFilePath

    # Validate step index
    if ($StepIndex -lt 0 -or $StepIndex -ge $state.steps.Count) {
        throw "Invalid step index: $StepIndex"
    }

    $step = $state.steps[$StepIndex]

    # Get last attempt
    if ($step.attempts.Count -eq 0) {
        throw "No active attempt for step $StepIndex. Call Start-MasFlowStep first."
    }

    $attempt = $step.attempts[-1]

    # Update attempt
    $attempt.completedAt = Get-IsoTimestamp
    $attempt.outcome = $Outcome
    $attempt.message = $Message
    $attempt.artifacts = $Artifacts

    # Update step
    $step.status = if ($Outcome -eq 'success') { 'completed' } else { 'failed' }
    $step.lastAttempt = $attempt.completedAt

    # If step completed successfully and not the last step, advance currentStep
    if ($Outcome -eq 'success' -and $StepIndex -lt ($state.steps.Count - 1)) {
        $state.currentStep = $StepIndex + 1
    }

    # If all steps completed, update flow status
    $allCompleted = $state.steps | Where-Object { $_.status -ne 'completed' } | Measure-Object
    if ($allCompleted.Count -eq 0) {
        $state.status = "completed"
    }

    # Update state
    $state.updatedAt = Get-IsoTimestamp

    # Save state
    Save-MasFlowState -StateFilePath $StateFilePath -State $state

    return $state
}

<#
.SYNOPSIS
Gets information about a step and its history
#>
function Get-StepStatus {
    param(
        [Parameter(Mandatory = $true)]
        [string]$StateFilePath,

        [Parameter(Mandatory = $true)]
        [int]$StepIndex
    )

    $state = Read-MasFlowState -StateFilePath $StateFilePath

    if ($StepIndex -lt 0 -or $StepIndex -ge $state.steps.Count) {
        throw "Invalid step index: $StepIndex"
    }

    $step = $state.steps[$StepIndex]

    $status = [PSCustomObject]@{
        stepIndex      = $step.stepIndex
        stepName       = $step.stepName
        status         = $step.status
        attemptCount   = ($step.attempts | Measure-Object).Count
        lastAttempt    = $step.lastAttempt
        lastOutcome    = if ($step.attempts.Count -gt 0) { $step.attempts[-1].outcome } else { $null }
        lastMessage    = if ($step.attempts.Count -gt 0) { $step.attempts[-1].message } else { $null }
        attempts       = $step.attempts
    }

    return $status
}

<#
.SYNOPSIS
Gets the current flow status
#>
function Get-FlowStatus {
    param(
        [Parameter(Mandatory = $true)]
        [string]$StateFilePath
    )

    $state = Read-MasFlowState -StateFilePath $StateFilePath

    $currentStepInfo = $state.steps[$state.currentStep]

    $completedCount = ($state.steps | Where-Object { $_.status -eq 'completed' } | Measure-Object).Count

    $status = [PSCustomObject]@{
        flowId          = $state.flowId
        featureBranch   = $state.featureBranch
        status          = $state.status
        currentStep     = $state.currentStep
        currentStepName = $currentStepInfo.stepName
        completedSteps  = $completedCount
        totalSteps      = $state.steps.Count
        createdAt       = $state.createdAt
        updatedAt       = $state.updatedAt
        steps           = $state.steps
    }

    return $status
}

<#
.SYNOPSIS
Resets flow state (deletes state file)
#>
function Reset-MasFlowState {
    param(
        [Parameter(Mandatory = $true)]
        [string]$StateFilePath
    )

    if (Test-Path $StateFilePath) {
        # Create backup
        $backupPath = "$StateFilePath.backup.$(Get-Date -Format 'yyyyMMdd-HHmmss')"
        Copy-Item -Path $StateFilePath -Destination $backupPath

        # Delete original
        Remove-Item -Path $StateFilePath -Force

        return @{
            success    = $true
            message    = "Flow state reset"
            backupPath = $backupPath
        }
    }

    return @{
        success = $true
        message = "Flow state file did not exist"
    }
}

# Main execution
try {
    if (-not $Operation) {
        Write-Error "Operation parameter is required"
        exit 1
    }

    $result = $null

    switch ($Operation) {
        'Initialize' {
            $result = Initialize-MasFlowState -StateFilePath $StateFilePath
        }
        'Read' {
            $result = Read-MasFlowState -StateFilePath $StateFilePath
        }
        'StartStep' {
            $result = Start-MasFlowStep -StateFilePath $StateFilePath -StepIndex $StepIndex
        }
        'CompleteStep' {
            $result = Complete-MasFlowStep `
                -StateFilePath $StateFilePath `
                -StepIndex $StepIndex `
                -Outcome $Outcome `
                -Message $Message `
                -Artifacts $Artifacts
        }
        'FailStep' {
            $result = Complete-MasFlowStep `
                -StateFilePath $StateFilePath `
                -StepIndex $StepIndex `
                -Outcome 'failed' `
                -Message $Message
        }
        'GetStatus' {
            $result = Get-StepStatus -StateFilePath $StateFilePath -StepIndex $StepIndex
        }
        'Validate' {
            $state = Read-MasFlowState -StateFilePath $StateFilePath
            $isValid, $message = Test-MasFlowState -State $state
            $result = @{
                valid   = $isValid
                message = $message
            }
        }
        'Reset' {
            $result = Reset-MasFlowState -StateFilePath $StateFilePath
        }
    }

    if ($Json) {
        $result | ConvertTo-Json -Depth 10 -Compress
    }
    else {
        $result | Out-Default
    }
}
catch {
    $errorObj = @{
        success = $false
        error   = $_.Exception.Message
    }

    if ($Json) {
        $errorObj | ConvertTo-Json -Compress
    }
    else {
        Write-Error $_.Exception.Message
    }
    exit 1
}

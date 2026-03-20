#!/usr/bin/env pwsh
# Check if current directory is a git worktree
[CmdletBinding()]
param(
    [switch]$Json
)
$ErrorActionPreference = 'Stop'

$isWorktree = $false
$worktreePath = $null
$mainRepoPath = $null

try {
    # Get current repo root
    $currentRoot = git rev-parse --show-toplevel 2>$null

    if ($LASTEXITCODE -eq 0) {
        # Get main worktree path (first entry in worktree list)
        $worktreeList = git worktree list --porcelain 2>$null

        if ($LASTEXITCODE -eq 0) {
            $lines = $worktreeList -split "`n"
            $mainRepoPath = ($lines | Where-Object { $_ -match '^worktree ' } | Select-Object -First 1) -replace '^worktree ', ''

            # If current root != main repo path, we're in a worktree
            if ($currentRoot -ne $mainRepoPath) {
                $isWorktree = $true
                $worktreePath = $currentRoot
            }
        }
    }
} catch {
    # Git command failed, not a worktree
}

if ($Json) {
    $obj = [PSCustomObject]@{
        IS_WORKTREE = $isWorktree
        WORKTREE_PATH = $worktreePath
        MAIN_REPO_PATH = $mainRepoPath
    }
    $obj | ConvertTo-Json -Compress
} else {
    Write-Output "IS_WORKTREE: $isWorktree"
    if ($worktreePath) { Write-Output "WORKTREE_PATH: $worktreePath" }
    if ($mainRepoPath) { Write-Output "MAIN_REPO_PATH: $mainRepoPath" }
}

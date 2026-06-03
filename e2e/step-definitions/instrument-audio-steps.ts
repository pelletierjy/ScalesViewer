/**
 * Cucumber steps for specs/instrument-audio/spec.md
 */

import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("I have opened the settings panel", async function () {
  const { page, guitarPage } = (this as { world: { page: import("@playwright/test").Page; guitarPage: { navigateTo: () => Promise<void> } } }).world;
  await guitarPage.navigateTo();
  await page.getByRole("button", { name: /open settings panel/i }).click();
  await expect(page.getByRole("dialog", { name: /settings/i })).toBeVisible();
});

Then("I should see the sound playback engine options", async function () {
  const { page } = (this as { world: { page: import("@playwright/test").Page } }).world;
  await expect(page.getByLabel(/playback engine/i)).toBeVisible();
  await expect(
    page.getByRole("option", { name: /instrument samples/i })
  ).toBeVisible();
});

When('I select the {string} sound engine', async function (label: string) {
  const { page } = (this as { world: { page: import("@playwright/test").Page } }).world;
  const valueMap: Record<string, string> = {
    "Instrument samples": "sample",
    "Pluck synth": "synth",
    "Classic sine": "sine",
  };
  const value = valueMap[label] ?? label;
  await page.getByLabel(/playback engine/i).selectOption(value);
});

Then('the sound engine should be {string}', async function (engine: string) {
  const { page } = (this as { world: { page: import("@playwright/test").Page } }).world;
  await expect(page.getByLabel(/playback engine/i)).toHaveValue(engine);
});

Given('the sound engine is {string}', async function (engine: string) {
  const { page } = (this as { world: { page: import("@playwright/test").Page } }).world;
  await page.evaluate((soundEngine) => {
    const raw = localStorage.getItem("state");
    if (!raw) return;
    const state = JSON.parse(raw);
    state.globalConfig = state.globalConfig ?? {};
    state.globalConfig.soundEngine = soundEngine;
    localStorage.setItem("state", JSON.stringify(state));
  }, engine);
  await page.reload();
  await page.waitForLoadState("networkidle");
});

Then(
  'the active instrument for audio should be {string}',
  async function (instrument: string) {
    const { page } = (this as { world: { page: import("@playwright/test").Page } }).world;
    const stored = await page.evaluate(() => {
      const raw = localStorage.getItem("state");
      if (!raw) return null;
      return JSON.parse(raw)?.globalConfig?.instrument ?? null;
    });
    expect(stored).toBe(instrument);
  }
);

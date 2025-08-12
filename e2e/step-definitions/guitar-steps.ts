import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { GuitarPage } from '../pages/GuitarPage';

Given('I am on the guitar page', { timeout: 30 * 1000 }, async function (this: any) {
  const { world } = this;
  await world.guitarPage.navigateTo();
});

Then('I should see the guitar neck', async function (this: any) {
  const { world } = this;
  const isVisible = await world.guitarPage.isGuitarNeckVisible();
  expect(isVisible).toBe(true);
});

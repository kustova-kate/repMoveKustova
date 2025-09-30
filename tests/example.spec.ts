import { test, expect } from '@playwright/test';
import { ExamplePage } from '../pages/page1';

test('Example domain heading is visible', async ({ page }) => {
  const examplePage = new ExamplePage(page);
  await examplePage.goto();
  await examplePage.validateHeading();
});

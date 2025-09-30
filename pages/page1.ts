import { expect, Locator, Page } from '@playwright/test';

export class ExamplePage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Example Domain' });
  }

  async goto() {
    await this.page.goto('https://example.com');
  }

  async validateHeading() {
    await expect(this.heading).toBeVisible();
  }
}

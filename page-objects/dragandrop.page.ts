import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class DragAndDropPage extends BasePage {
  readonly columnA: Locator;
  readonly columnB: Locator;

  constructor(page: Page) {
    super(page);

    this.columnA = page.locator("#column-a");
    this.columnB = page.locator("#column-b");
  }

  async goTo(): Promise<void> {
    await this.page.goto("/drag-and-drop");

    await expect(this.columnA).toBeVisible();
    await expect(this.columnB).toBeVisible();
  }

  async dragColumn(source: Locator, target: Locator) {
    await source.dragTo(target);
  }

  async getColumnText(column: Locator) {
    const text = await column.locator("header").textContent();
    return text ?? "";
  }
}

import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export type CircleColor = "red" | "green" | "blue";

export class DragAndDropCirclesPage extends BasePage {
  readonly circles: Record<CircleColor, Locator>;
  readonly grayTarget: Locator;
  readonly whiteSource: Locator;

  constructor(page: Page) {
    super(page);

    this.circles = {
      red: page.locator(".red"),
      green: page.locator(".green"),
      blue: page.locator(".blue"),
    };

    this.grayTarget = page.locator("#target");
    this.whiteSource = page.locator(".row > div:nth-child(2)");
  }

  async dragCircleToTarget(color: CircleColor): Promise<void> {
    await this.circles[color].dragTo(this.grayTarget);
  }

  async expectColorInTarget(color: CircleColor): Promise<void> {
    await expect(this.grayTarget.locator(`.${color}`)).toHaveCount(1);
  }

  async expectColorInSource(color: CircleColor): Promise<void> {
    await expect(this.whiteSource.locator(`.${color}`)).toHaveCount(1);
  }

  async expectColorNotInSource(color: CircleColor): Promise<void> {
    await expect(this.whiteSource.locator(`.${color}`)).toHaveCount(0);
  }
}

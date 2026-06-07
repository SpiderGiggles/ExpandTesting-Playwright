import { type Locator, type Page, type FrameLocator } from "@playwright/test";

export class AdsPopupActions {
  readonly page: Page;
  readonly closeButton: Locator;
  readonly googleAd: Locator;

  constructor(page: Page) {
    this.page = page;

    const frameLocator: FrameLocator = page
      .locator('iframe[name^="aswift_"]')
      .first()
      .contentFrame();

    this.closeButton = frameLocator.getByRole("button", { name: "Close ad" });
    this.googleAd = frameLocator.locator("#ad_position_box");
  }

  async closeIfVisible(): Promise<boolean> {
    if (await this.googleAd.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.closeButton.click();
      await this.googleAd.waitFor({ state: "hidden" });
      return true;
    }

    return false;
  }
}

export class AdsPopup {
  private actions: AdsPopupActions;

  constructor(page: Page) {
    this.actions = new AdsPopupActions(page);
  }

  async closeIfVisible() {
    return await this.actions.closeIfVisible();
  }
}

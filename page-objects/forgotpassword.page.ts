import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class ForgotPasswordPage extends BasePage {
  readonly emailInput: Locator;
  readonly retrievePasswordButton: Locator;
  readonly flashMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.getByRole("textbox", { name: "E-mail" });
    this.retrievePasswordButton = page.getByRole("button", {
      name: "Retrieve password",
    });
    this.flashMessage = page.locator("#flash");
  }

  async emailReset(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);

    await this.retrievePasswordButton.click();
  }

  async assertSuccessfulEmail(): Promise<void> {
    await expect(this.page).toHaveURL(/\/forgot-password$/);
    await expect(this.flashMessage).toContainText(
      "An e-mail has been sent to you which explains how to reset your password. Automation practice website",
    );
  }
}

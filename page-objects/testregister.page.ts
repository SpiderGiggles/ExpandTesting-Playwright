import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class TestRegisterPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordConfirm: Locator;
  readonly registerButton: Locator;
  readonly flashMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", {
      name: "Password",
      exact: true,
    });
    this.passwordConfirm = page.getByRole("textbox", {
      name: "Confirm Password",
    });
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.flashMessage = page.locator("#flash");
  }

  async goto(): Promise<void> {
    await this.page.goto("/register");
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordConfirm).toBeVisible();
  }

  async register(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await expect(this.usernameInput).toHaveValue(username);

    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveValue(password);

    await this.passwordConfirm.fill(password);
    await expect(this.passwordConfirm).toHaveValue(password);

    await this.registerButton.click();
  }

  async assertSuccessfulRegister(): Promise<void> {
    await expect(this.page).toHaveURL(/\/register$/);
    // await expect(this.flashMessage).toContainText("Successfully registered, you can log in now.");
  }
}

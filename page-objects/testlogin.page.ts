import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class TestLoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashMessage: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.flashMessage = page.locator("#flash");
    this.logoutButton = page.getByRole("link", { name: "Logout" });
  }

  async goTo(): Promise<void> {
    await this.page.goto("/login");
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await expect(this.usernameInput).toHaveValue(username);

    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveValue(password);

    await this.loginButton.click();
  }

  async loginWithValidCredentials(): Promise<void> {
    await this.login("practice", "SuperSecretPassword!");
  }

  async assertSuccessfulLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/\/secure$/);
    await expect(this.flashMessage).toContainText("You logged into a secure area!");
    await expect(this.logoutButton).toBeVisible();
  }

  async assertInvalidUsername(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.flashMessage).toContainText("Your password is invalid!");
  }

  async assertInvalidPassword(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.flashMessage).toContainText("Your password is invalid!");
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
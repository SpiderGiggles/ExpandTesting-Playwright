import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class WebInputsPage extends BasePage {
  readonly inputNumber: Locator;
  readonly inputText: Locator;
  readonly inputPassword: Locator;
  readonly inputDate: Locator;
  readonly displayInputs: Locator;
  readonly clearInputs: Locator;

  constructor(page: Page) {
    super(page);

    this.inputNumber = page.locator('input[type="number"]');
    this.inputText = page.locator('input[type="text"]');
    this.inputPassword = page.locator('input[type="password"]');
    this.inputDate = page.locator('input[type="date"]');
    this.displayInputs = page.getByRole("button", { name: "Display Inputs" });
    this.clearInputs = page.getByRole("button", { name: "Clear Inputs" });
  }

  async fillFields(
    number: number,
    text: string,
    password: string,
    date: string,
  ): Promise<void> {
    await this.inputNumber.fill(number.toString());
    await expect(this.inputNumber).toHaveValue(number.toString());

    await this.inputText.fill(text);
    await expect(this.inputText).toHaveValue(text);

    await this.inputPassword.fill(password);
    await expect(this.inputPassword).toHaveValue(password);

    await this.inputDate.fill(date);
    await expect(this.inputDate).toHaveValue(date);
  }

  async clearAllFields(): Promise<void> {
    await this.clearInputs.click();

    await expect(this.inputNumber).toHaveValue("");
    await expect(this.inputText).toHaveValue("");
    await expect(this.inputPassword).toHaveValue("");
    await expect(this.inputDate).toHaveValue("");
  }

  async clickDisplayInputs(): Promise<void> {
    await this.displayInputs.click();
  }
}

import path from "path";
import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class FileUploadPage extends BasePage {
  readonly chooseFile: Locator;
  readonly uploadButton: Locator;
  readonly uploadedMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.chooseFile = page.locator('[data-testid="file-input"]');
    this.uploadButton = page.locator('[data-testid="file-submit"]');
    this.uploadedMessage = page.getByRole('heading', { name: 'File Uploaded!' });
  }

  async uploadFile(filePath: string): Promise<void> {
    const fullPath = path.resolve(process.cwd(), "test-data", filePath);
    const fileName = path.basename(filePath);

    await this.chooseFile.setInputFiles(fullPath);
    await expect(this.chooseFile).toHaveValue(new RegExp(fileName));

    await this.page.waitForLoadState("networkidle");
    await this.uploadButton.click();
  }

  async assertSuccessfulUpload(filePath: string): Promise<void> {
    const fileName = path.basename(filePath);

    await expect(this.page).toHaveURL(/\/upload$/);
    await expect(this.uploadedMessage).toContainText("File Uploaded!");
  }
}

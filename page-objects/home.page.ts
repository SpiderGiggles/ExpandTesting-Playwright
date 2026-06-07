import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export type CardOptions =
  | "webinputs"
  | "testloginpage"
  | "testregisterpage"
  | "draganddroppage"
  | "draganddropcirclespage"
  | "fileupload";

class HomePageActions {
  readonly page: Page;
  readonly webInputsButton: Locator;
  readonly testLoginPageButton: Locator;
  readonly testRegisterPageButton: Locator;
  readonly dragAndDropPageButton: Locator;
  readonly dragAndDropCirclesPage: Locator;
  readonly fileUploadPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.webInputsButton = page.getByRole("link", { name: "Web inputs" });
    this.testLoginPageButton = page.getByRole("link", {
      name: "Test Login Page",
    });
    this.testRegisterPageButton = page.getByRole("link", {
      name: "Test Register Page",
    });
    this.dragAndDropPageButton = page.getByRole("link", {
      name: "Drag and Drop",
      exact: true,
    });
    this.dragAndDropCirclesPage = page.getByRole("heading", {
      name: "Drag and Drop Circles",
    });
    this.fileUploadPage = page.getByRole('link', { name: 'File Upload' });
  }

  async openCard(option: CardOptions): Promise<void> {
    const cardMap: Record<CardOptions, Locator> = {
      webinputs: this.webInputsButton,
      testloginpage: this.testLoginPageButton,
      testregisterpage: this.testRegisterPageButton,
      draganddroppage: this.dragAndDropPageButton,
      draganddropcirclespage: this.dragAndDropCirclesPage,
      fileupload: this.fileUploadPage,
    };

    const card = cardMap[option];
    await card.waitFor({ state: "visible" });
    await card.click();
  }
}

export class HomePage extends BasePage {
  private actions: HomePageActions;

  constructor(page: Page) {
    super(page);
    this.actions = new HomePageActions(page);
  }

  openCard(option: CardOptions): Promise<void> {
    return this.actions.openCard(option);
  }
}

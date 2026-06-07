import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export type CardOptions =
  | "webinputs"
  | "testlogin"
  | "testregister"
  | "draganddrop"
  | "draganddropcircles"
  | "fileupload"
  | "hoverover";

class HomePageActions {
  readonly page: Page;
  readonly webInputsButton: Locator;
  readonly testLoginButton: Locator;
  readonly testRegisterButton: Locator;
  readonly dragAndDropButton: Locator;
  readonly dragAndDropCirclesButton: Locator;
  readonly fileUploadButton: Locator;
  readonly hoverOverButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.webInputsButton = page.getByRole("link", { name: "Web inputs" });
    this.testLoginButton = page.getByRole("link", {
      name: "Test Login Page",
    });
    this.testRegisterButton = page.getByRole("link", {
      name: "Test Register Page",
    });
    this.dragAndDropButton = page.getByRole("link", {
      name: "Drag and Drop",
      exact: true,
    });
    this.dragAndDropCirclesButton = page.getByRole("heading", {
      name: "Drag and Drop Circles",
    });
    this.fileUploadButton = page.getByRole('link', { name: 'File Upload' });
    this.hoverOverButton = page.getByRole('link', { name: 'Hovers' });
  }

  async openCard(option: CardOptions): Promise<void> {
    const cardMap: Record<CardOptions, Locator> = {
      webinputs: this.webInputsButton,
      testlogin: this.testLoginButton,
      testregister: this.testRegisterButton,
      draganddrop: this.dragAndDropButton,
      draganddropcircles: this.dragAndDropCirclesButton,
      fileupload: this.fileUploadButton,
      hoverover: this.hoverOverButton,
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

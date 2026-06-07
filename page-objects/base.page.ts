import { type Page } from "@playwright/test";
import { NavigationMenu } from "../page-components/navigation.menu";

export class BasePage {
  protected readonly page: Page;
  readonly navigationMenu: NavigationMenu;

  constructor(page: Page) {
    this.page = page;
    this.navigationMenu = new NavigationMenu(page);
  }
}
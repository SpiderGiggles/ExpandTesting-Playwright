import { type Locator, type Page, expect } from "@playwright/test";
import { HomePage } from "../page-objects/home.page";

export type MenuOptions =
  | "practice"
  | "demos"
  | "tools"
  | "tips"
  | "testcases"
  | "apitesting"
  | "about"
  | "mockexams"
  | "pmppractice";

export type DemoOptions =
  | "examples"
  | "apps"
  | "apis"
  | "assertions"
  | "reports";

export class NavigationMenuActions {
  readonly page: Page;
  readonly practiceButton: Locator;
  readonly demosButton: Locator;
  readonly toolsButton: Locator;
  readonly tipsButton: Locator;
  readonly testcasesButton: Locator;
  readonly apiTestingButton: Locator;
  readonly aboutButton: Locator;
  readonly mockExamsButton: Locator;
  readonly pmpPracticeButton: Locator;
  readonly demoDropdown: Locator;
  readonly demosExamplesButton: Locator;
  readonly demosExamplesApps: Locator;
  readonly demosExamplesApis: Locator;
  readonly demosExamplesAssertions: Locator;
  readonly demosExamplesReports: Locator;

  constructor(page: Page) {
    this.page = page;
    this.practiceButton = page.getByRole("link", { name: "SUT" });
    this.demosButton = page.getByRole("button", { name: "Demos" });
    this.toolsButton = page.getByRole("link", { name: "Tools" });
    this.tipsButton = page.getByRole("link", { name: "Tips", exact: true });
    this.testcasesButton = page
      .getByLabel("Main navigation")
      .getByRole("link", { name: "Test Cases" });
    this.apiTestingButton = page
      .getByLabel("Main navigation")
      .getByRole("link", { name: "API Testing" });
    this.aboutButton = page.getByRole("link", { name: "About", exact: true });
    this.mockExamsButton = page.getByRole("link", {
      name: "Free ISTQB Mock Exams",
    });
    this.pmpPracticeButton = page.getByRole("link", { name: "PMP Practice" });

    this.demoDropdown = page.getByRole("list", { name: "Demos" });
    this.demosExamplesButton = page.getByRole("link", {
      name: "Examples",
      exact: true,
    });
    this.demosExamplesApps = page.getByRole("link", { name: "Apps" });
    this.demosExamplesApis = page.getByRole("link", { name: "APIs" });
    this.demosExamplesAssertions = page.getByRole("link", {
      name: "Assertions",
    });
    this.demosExamplesReports = page.getByRole("link", {
      name: "Reports",
      exact: true,
    });
  }

  async ensureDemoDropdownVisible(): Promise<void> {
    if (!(await this.demoDropdown.isVisible())) {
      await this.demosButton.click();
      await this.demoDropdown.waitFor({ state: "visible" });
    }
  }

  async openMenu(option: MenuOptions): Promise<void> {
    const menuMap: Record<MenuOptions, Locator> = {
      practice: this.practiceButton,
      demos: this.demosButton,
      tools: this.toolsButton,
      tips: this.tipsButton,
      testcases: this.testcasesButton,
      apitesting: this.apiTestingButton,
      about: this.aboutButton,
      mockexams: this.mockExamsButton,
      pmppractice: this.pmpPracticeButton,
    };

    const menuItem = menuMap[option];
    await menuItem.waitFor({ state: "visible" });
    await menuItem.click();
  }

  async openDemoOption(option: DemoOptions): Promise<void> {
    await this.ensureDemoDropdownVisible();

    const demoMap: Record<DemoOptions, Locator> = {
      examples: this.demosExamplesButton,
      apps: this.demosExamplesApps,
      apis: this.demosExamplesApis,
      assertions: this.demosExamplesAssertions,
      reports: this.demosExamplesReports,
    };

    const demoItem = demoMap[option];
    await demoItem.waitFor({ state: "visible" });
    await demoItem.click();
  }
}

export class NavigationMenu {
  private actions: NavigationMenuActions;

  constructor(page: Page) {
    this.actions = new NavigationMenuActions(page);
  }

  async goToHome(): Promise<HomePage> {
    await this.actions.openMenu("practice");
    await expect(this.actions.page).toHaveURL(
      "https://practice.expandtesting.com/",
    );
    return new HomePage(this.actions.page);
  }

  openMenu(option: MenuOptions): Promise<void> {
    return this.actions.openMenu(option);
  }

  openDemoOption(option: DemoOptions): Promise<void> {
    return this.actions.openDemoOption(option);
  }
}

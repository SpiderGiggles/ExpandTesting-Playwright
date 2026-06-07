import {
  test as base,
  expect,
  selectors,
  type Page,
  type TestInfo,
} from "@playwright/test";
import { HomePage } from "../page-objects/home.page";

type AppFixtures = {
  homePage: HomePage;
};

const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export async function beforeHook({ page }: { page: Page }) {
  selectors.setTestIdAttribute("data-test");
  await page.goto("/");
}

export async function afterHook(
  { page }: { page: Page },
  testInfo: TestInfo,
) {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({
      path: testInfo.outputPath("failed.png"),
      fullPage: true,
    });
  }
}

export { test, expect };
import { expect, type Browser, type Page } from "@playwright/test";
import { test, beforeHook, afterHook } from "../setup/test-hooks";
import { WebInputsPage } from "../page-objects/webinputs.page";
import { TestLoginPage } from "../page-objects/testlogin.page";
import { TestRegisterPage } from "../page-objects/testregister.page";
import { DragAndDropPage } from "../page-objects/dragandrop.page";
import { DragAndDropCirclesPage } from "../page-objects/draganddrop-circles.page";
import { AdsPopup } from "../page-components/adds.popup";
import { FileUploadPage } from "../page-objects/fileupload.page";
import { HomePage } from "../page-objects/home.page";
import { HoverOverPage } from "../page-objects/hoverover.page";

test.describe("Full Sanity", () => {
  test.beforeEach(async ({ page }) => {
    await beforeHook({ page });
  });

  test.afterEach(async ({ page }, testInfo) => {
    await afterHook({ page }, testInfo);
  });

  test("Web Inputs Test", async ({ page }) => {
    const webInputsPage = new WebInputsPage(page);
    const adsPopup = new AdsPopup(page);
    const homePage = new HomePage(page);

    await adsPopup.closeIfVisible();
    await homePage.openCard("webinputs");
    await webInputsPage.fillFields(123, "abc", "4321", "2026-05-15");
    await webInputsPage.clearAllFields();
  });

  test("Successful Login", async ({ page }) => {
    const loginPage = new TestLoginPage(page);
    const adsPopup = new AdsPopup(page);
    const homePage = new HomePage(page);

    await adsPopup.closeIfVisible();
    await homePage.openCard("testlogin");
    await loginPage.loginWithValidCredentials();
    await loginPage.assertSuccessfulLogin();
  });

  test("Invalid Username", async ({ page }) => {
    const loginPage = new TestLoginPage(page);
    const adsPopup = new AdsPopup(page);
    const homePage = new HomePage(page);

    await adsPopup.closeIfVisible();
    await homePage.openCard("testlogin");
    await loginPage.login("wrongUser", "SuperSecretPassword!");
    await loginPage.assertInvalidUsername();
  });

  test("Invalid Password", async ({ page }) => {
    const loginPage = new TestLoginPage(page);
    const adsPopup = new AdsPopup(page);
    const homePage = new HomePage(page);

    await adsPopup.closeIfVisible();
    await homePage.openCard("testlogin");
    await loginPage.login("practice", "WrongPassword");
    await loginPage.assertInvalidPassword();
  });

  test("Successful Registration", async ({ page }) => {
    const registerPage = new TestRegisterPage(page);
    const adsPopup = new AdsPopup(page);
    const homePage = new HomePage(page);

    await adsPopup.closeIfVisible();
    await homePage.openCard("testregister");
    await registerPage.register("Testing", "CorrectPassword");
    await registerPage.assertSuccessfulRegister();
  });

  test("Drag and Drop Verification", async ({ page }) => {
    const dragAndDropPage = new DragAndDropPage(page);
    const adsPopup = new AdsPopup(page);
    const homePage = new HomePage(page);

    await adsPopup.closeIfVisible();
    await homePage.openCard("draganddrop");

    await expect(
      await dragAndDropPage.getColumnText(dragAndDropPage.columnA),
    ).toBe("A");

    await expect(
      await dragAndDropPage.getColumnText(dragAndDropPage.columnB),
    ).toBe("B");

    await dragAndDropPage.dragColumn(
      dragAndDropPage.columnA,
      dragAndDropPage.columnB,
    );

    await expect(
      await dragAndDropPage.getColumnText(dragAndDropPage.columnA),
    ).toBe("B");

    await expect(
      await dragAndDropPage.getColumnText(dragAndDropPage.columnB),
    ).toBe("A");
  });
  test("Drag and Drop Circles Verification", async ({ page }) => {
    const dragAndDropCirclesPage = new DragAndDropCirclesPage(page);
    const adsPopup = new AdsPopup(page);
    const homePage = new HomePage(page);

    await adsPopup.closeIfVisible();
    await homePage.openCard("draganddropcircles");

    await adsPopup.closeIfVisible();
    await dragAndDropCirclesPage.expectColorInSource("blue");
    await dragAndDropCirclesPage.expectColorInSource("green");
    await dragAndDropCirclesPage.expectColorInSource("red");

    await dragAndDropCirclesPage.dragCircleToTarget("blue");
    await dragAndDropCirclesPage.dragCircleToTarget("green");

    await dragAndDropCirclesPage.expectColorInTarget("blue");
    await dragAndDropCirclesPage.expectColorInTarget("green");

    await dragAndDropCirclesPage.expectColorNotInSource("blue");
    await dragAndDropCirclesPage.expectColorNotInSource("green");
    await dragAndDropCirclesPage.expectColorInSource("red");
  });

  test("Upload CSV file", async ({ page }) => {
    const fileUploadPage = new FileUploadPage(page);
    const adsPopup = new AdsPopup(page);
    const homePage = new HomePage(page);

    await adsPopup.closeIfVisible();
    await homePage.openCard("fileupload");
    await fileUploadPage.uploadFile("FileUpload.csv");
    await fileUploadPage.assertSuccessfulUpload("FileUpload.csv");
  });

  test("Hover Over User Profile", async ({ page }) => {
    const hoverOverPage = new HoverOverPage(page);
    const adsPopup = new AdsPopup(page);
    const homePage = new HomePage(page);

    await adsPopup.closeIfVisible();
    await homePage.openCard("hoverover");
    await hoverOverPage.hoverOverUser("user1");
    await hoverOverPage.assertViewProfileVisible("user1");
    await hoverOverPage.clickViewProfile();
    await hoverOverPage.assertWelcomeMessage("user1");
  });
});

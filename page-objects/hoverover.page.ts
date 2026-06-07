import { BasePage } from "./base.page";
import { type Locator, type Page, expect } from "@playwright/test";

export type HoverOption = "user1" | "user2" | "user3";

const UserNames: Record<HoverOption, { simpleName: string; welcomeMessage: string }> = {
    user1: { simpleName: "user1", welcomeMessage: "Welcome user1" },
    user2: { simpleName: "user2", welcomeMessage: "Welcome user2" },
    user3: { simpleName: "user3", welcomeMessage: "Welcome user3" }
};

export class HoverOverPage extends BasePage {
    readonly hover: Record<HoverOption, Locator>;
    readonly viewProfileButton: Locator;

    constructor(page: Page) {
        super(page);

        this.hover = {
            user1: page.locator('[data-testid="img-user-1"]'),
            user2: page.locator('[data-testid="img-user-2"]'),
            user3: page.locator('[data-testid="img-user-3"]'),
        }
        this.viewProfileButton = page.getByRole('link', { name: 'View profile' });
        
    }

    async hoverOverUser(user: HoverOption): Promise<void> {
        await this.hover[user].hover();
    }

    async assertViewProfileVisible(expectedUser: HoverOption): Promise<void> {
        const simpleName = UserNames[expectedUser].simpleName;
        const userHeading = this.page.getByRole('heading', { name: simpleName });
        await expect(this.viewProfileButton).toBeVisible();
        await expect(userHeading).toBeVisible();
    }

    async clickViewProfile(): Promise<void> {
        await this.viewProfileButton.click();
    }

    async assertWelcomeMessage(expectedUser: HoverOption): Promise<void> {
        const welcomeMessage = UserNames[expectedUser].welcomeMessage;
        const welcomeHeading = this.page.getByRole('heading', { name: welcomeMessage });
        await expect(welcomeHeading).toBeVisible();
    }
}
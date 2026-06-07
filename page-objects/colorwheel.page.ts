import { BasePage } from "./base.page";
import { type Locator, type Page, expect } from "@playwright/test";

export type ColorWheelOption = "red" | "green" | "blue" | "maroon" | "gray" | "violet" | "pink"
    | "black" | "yellow" | "purple" | "white" | "orange" | "brown";

const ColorNames: Record<ColorWheelOption, { simpleColor: string, incorrectColor: string }> = {
    red: { simpleColor: "Red", incorrectColor: "Incorrect Answer:red" },
    green: { simpleColor: "Green", incorrectColor: "Incorrect Answer:green" },
    blue: { simpleColor: "Blue", incorrectColor: "Incorrect Answer:blue" },
    maroon: { simpleColor: "Maroon", incorrectColor: "Incorrect Answer:maroon" },
    gray: { simpleColor: "Gray", incorrectColor: "Incorrect Answer:gray" },
    violet: { simpleColor: "Violet", incorrectColor: "Incorrect Answer:violet" },
    pink: { simpleColor: "Pink", incorrectColor: "Incorrect Answer:pink" },
    black: { simpleColor: "Black", incorrectColor: "Incorrect Answer:black" },
    yellow: { simpleColor: "Yellow", incorrectColor: "Incorrect Answer:yellow" },
    purple: { simpleColor: "Purple", incorrectColor: "Incorrect Answer:purple" },
    white: { simpleColor: "White", incorrectColor: "Incorrect Answer:white" },
    orange: { simpleColor: "Orange", incorrectColor: "Incorrect Answer:orange" },
    brown: { simpleColor: "Brown", incorrectColor: "Incorrect Answer:brown" },
};

export class ColorWheelPage extends BasePage {
    readonly playGameButton: Locator;
    readonly resetGameButton: Locator;
    readonly colorOptions: Record<ColorWheelOption, Locator>;
    
    private readonly colorOrder: ColorWheelOption[] = [
        "red", "green", "blue", "maroon", "gray", "violet", 
        "pink", "black", "yellow", "purple", "white", "orange", "brown"
    ];

    constructor(page: Page) {
        super(page);

        this.playGameButton = page.getByRole('button', { name: 'Play Game' });
        this.resetGameButton = page.getByRole('button', { name: 'Reset Game' });
        this.colorOptions = {
            red: page.getByRole('button', { name: 'red' }),
            green: page.getByRole('button', { name: 'green' }),
            blue: page.getByRole('button', { name: 'blue' }),
            maroon: page.getByRole('button', { name: 'maroon' }),
            gray: page.getByRole('button', { name: 'gray' }),
            violet: page.getByRole('button', { name: 'violet' }),
            pink: page.getByRole('button', { name: 'pink' }),
            black: page.getByRole('button', { name: 'black' }),
            yellow: page.getByRole('button', { name: 'yellow' }),
            purple: page.getByRole('button', { name: 'purple' }),
            white: page.getByRole('button', { name: 'white' }),
            orange: page.getByRole('button', { name: 'orange' }),
            brown: page.getByRole('button', { name: 'brown' }),
        };
    }

    async playGame(): Promise<void> {
        await this.playGameButton.click();
    }

    async selectColor(color: ColorWheelOption, expectedColor: ColorWheelOption): Promise<void> {
        await this.colorOptions[color].click();

        const incorrectColor = ColorNames[expectedColor].incorrectColor;
        const incorrectColorMessage = this.page.getByRole('heading', { name: incorrectColor });

        const isVisible = await incorrectColorMessage.isVisible();
        
        if (!isVisible) {
            return;
        }

        let startIndex = this.colorOrder.indexOf(color);
        
        for (let i = 0; i < this.colorOrder.length - 1; i++) {
            let nextIndex = (startIndex + i + 1) % this.colorOrder.length;
            let nextColor = this.colorOrder[nextIndex];

            await this.colorOptions[nextColor].click();
            
            const isStillVisible = await incorrectColorMessage.isVisible();
            if (!isStillVisible) {
                break;
            }
        }
    }
}
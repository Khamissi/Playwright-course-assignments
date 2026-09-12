import { type Locator, type Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class LogIn extends PageBase {

    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.emailField = this.page.getByPlaceholder("Username");
        this.passwordField = this.page.getByPlaceholder("Password");
        this.loginButton = this.page.locator("#login-button");
    }

    override async open(): Promise<void> {
        await super.open();
    }

    async login(username: string, password: string): Promise<void> {
        await this.emailField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}
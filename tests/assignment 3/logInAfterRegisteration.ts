import { Page } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) {}

    
    private locateLoginButton() {
        return this.page.getByRole('button', { name: 'Login' });
    }

    async clickLoginButton() {
        await this.locateLoginButton().click();
    }

    private locateEmailField() {
        return this.page.getByRole('textbox', { name: 'email@example.com' });
    }

    async enterEmail(email: string) {
        await this.locateEmailField().clear();
        await this.locateEmailField().fill(email);
    }

    private locatePasswordField() {
        return this.page.getByRole('textbox', { name: 'enter your passsword' });
    }
    
    async enterPassword(password: string) {
        await this.locatePasswordField().clear();
        await this.locatePasswordField().fill(password);
    }



}
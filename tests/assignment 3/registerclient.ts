import {Page, expect} from "@playwright/test";

export class RegisterClientPage {
    constructor(private page: Page) {}
    
    async navigateTo() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    private locateRegisterButton() {
        return this.page.getByRole('link', { name: 'Register' });
    }

    async clickRegisterButton() {
        await this.locateRegisterButton().click();
    }

    private locateFirstNameField() {
        return this.page.getByRole('textbox', { name: 'First Name' });
    }

    async enterFirstName(firstName: string) {
        await this.locateFirstNameField().fill(firstName);
    }

    private locateLastNameField() {
        return this.page.getByRole('textbox', { name: 'Last Name' });
    }

    async enterLastName(lastName: string) {
        await this.locateLastNameField().fill(lastName);
    }

    private locateEmailField() {
        return this.page.getByRole('textbox', { name: 'email@example.com' });
    }

    async enterEmail(email: string) {
        await this.locateEmailField().fill(email);
    }

    private locatePhoneField() {
        return this.page.getByRole('textbox', { name: 'enter your number' });
    }

    async enterPhone(phone: string) {
        await this.locatePhoneField().fill(phone);
    }

    private locateOcuupationList() {
        return this.page.getByRole('combobox');
    }

    async selectOccupation(occupation: string) {
        await this.locateOcuupationList().selectOption({ label: occupation });
    }
    
    private locateGender(gender: string) {
        return this.page.getByRole('radio', { name: `${gender}`, exact: true });
    }

    async enterGender(gender: string) {
        await this.locateGender(gender).click();
    }

    private locatePasswordField() {
        return this.page.getByRole('textbox', { name: 'Passsword' });
    }

    async enterPassword(password: string) {
        await this.locatePasswordField().fill(password);
    }

    private locateConfirmPasswordField() {
        return this.page.getByRole('textbox', { name: 'Confirm Password' });
    }

    async enterConfirmPassword(confirmPassword: string) {
        await this.locateConfirmPasswordField().fill(confirmPassword);
    }

    private locateTermsAndConditionsCheckbox() {
        return this.page.getByRole('checkbox');
    }

    async checkTermsAndConditions() {
        await this.locateTermsAndConditionsCheckbox().check();
    }

    private locateRegisterSubmitButton() {
        return this.page.getByRole('button', { name: 'Register' });
    }

    async clickRegisterSubmitButton() {
        await this.locateRegisterSubmitButton().click();
    }

    private locateSuccessMessage() {
        return this.page.getByText('Account Created Successfully');
    }
}
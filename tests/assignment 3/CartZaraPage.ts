import {Page, expect} from "@playwright/test";

export class CartZaraPage {
    constructor(private page: Page) {}

    private locateCheckoutButton() {
        return this.page.getByRole('button', { name: 'Checkout' });
    }

    async clickCheckoutButton() {
        await this.locateCheckoutButton().click();
    }  
    
    private locateCountryField() 
    {
        return this.page.getByRole('textbox', { name: 'Select Country' });
    }

    async enterCountry(countryName: string, fullCountryName: string) {
        await this.locateCountryField().pressSequentially(countryName, { delay: 100 });
    }

    private locateCountryFromSuggestions(fullCountryName: string) {
        return this.page.locator('button.ta-item', { hasText: fullCountryName });
    }

    async selectCountryFromSuggestions(fullCountryName: string) {
        await this.locateCountryFromSuggestions(fullCountryName).click();
    }
}
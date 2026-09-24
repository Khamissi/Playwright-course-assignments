import {Page, expect} from "@playwright/test";

export class CheckoutPage
{
    constructor(private page: Page) {}  

    private locateCountryInputField()
    {
        return this.page.getByRole('textbox', { name: 'please choose your delivery' });
    }

    private suggestedCountriesList(fullCountryName: string)
    {
        return this.page.locator('.suggestions a').filter({ hasText: fullCountryName });
    }


    async enterCountry (abstractCountryName: string, fullCountryName: string)
    {
        await this.locateCountryInputField().pressSequentially(abstractCountryName, { delay: 100 });
        await expect(this.suggestedCountriesList(fullCountryName)).toBeVisible();
    }

    
    async selectCountryFromSuggestions (fullCountryName: string)
    {  
        await this.suggestedCountriesList(fullCountryName).click();
    }

    private locateTermsAndConditionsCheckbox()
    {
        return this.page.locator("#checkbox2");
    }

    async acceptTermsAndConditions()
    {
        const checkbox = this.locateTermsAndConditionsCheckbox();
        await checkbox.click({ force: true });
        await expect(checkbox).toBeChecked();
    }

    private locatePurchaseButton()
    {
        return this.page.getByRole('button', { name: 'Purchase' });
    }

    async completePurchase()
    {
        await this.locatePurchaseButton().click();
    }

    private locateSuccessMessage() {
        return this.page.getByText(
            "Success! Thank you! Your order will be delivered in next few weeks :-)."
        );
    }

    async assertSuccess() {
        await expect(this.locateSuccessMessage()).toBeVisible();
    }


}
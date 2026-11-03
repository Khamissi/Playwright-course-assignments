import {Locator, Page, expect} from '@playwright/test';

export class CartPage
{
    readonly page: Page;

    constructor(page: Page)
    {
        this.page = page;
    }

    private locateProductRowByName(productName: string): Locator
    {
        return this.page.locator("div.cartSection h3").filter({hasText: productName});
    }

    async assertProductInCart(productName: string): Promise<void>
    {
        await expect(this.locateProductRowByName(productName), `Product ${productName} exists in the cart`).toBeVisible();
    }

    private locateCheckOutButton() {
        return this.page.getByRole('button', { name: 'Checkout' });
    }

    async clickCheckOutButton() {
        await this.locateCheckOutButton().click();
    }

    async processCheckout(productName: string): Promise<void> 
    {
        await this.assertProductInCart(productName);
        await this.clickCheckOutButton();
    }

}
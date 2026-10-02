import { Page,expect } from "@playwright/test";

export class ShopPage 
{
    constructor(private page: Page) {}

    private locateProductCard(productName: string) {
        return this.page.locator('div', { has: this.page.getByRole('heading', { name: productName, exact: true }) }).last();
    }

    async clickAddToCartButtonForSpecificProduct(productName: string) {
        const card = this.locateProductCard(productName);
        await card.getByRole('button', { name: ' Add To Cart' }).click();
    }

    private locateCartButton() {
    return this.page.locator('button[routerlink="/dashboard/cart"]');
   }

    async clickCartButton() {
        await this.locateCartButton().click();
    }   

    private locateCheckOutButton() {
        return this.page.getByRole('button', { name: 'Checkout' });
    }

    async clickCheckOutButton() {
        await this.locateCheckOutButton().click();
    }

    public locateCartItem(productName: string) {
        return this.page.getByText(productName);
    }

    async addProductToCart(productName: string) {
        await this.clickAddToCartButtonForSpecificProduct(productName);
        await this.clickCartButton();
        await this.clickCheckOutButton();
    }
        

    





    
}
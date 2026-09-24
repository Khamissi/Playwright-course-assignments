import { Page } from "@playwright/test";

export class ShopPage {
    constructor(private page: Page) {}

    private locateProductCard(productName: string) {
        return this.page.locator('div', { has: this.page.getByRole('heading', { name: productName, exact: true }) }).last();
    }

    async clickViewButtonForSpecificProduct(productName: string) {
        const card = this.locateProductCard(productName);
        await card.getByRole('button', { name: 'View' }).click();
    }

    private locateAddToCartButton(productName: string) {
        return this.locateProductCard(productName).getByRole('button', { name: 'Add To Cart' });
    }

    async clickAddToCartButton(productName: string) {
        await this.locateAddToCartButton(productName).click();
    }

    private locateCartButton() {
    return this.page.locator('button[routerlink="/dashboard/cart"]');
}

    async clickCartButton() {
        //console.log( this.locateCartButton());
        await this.locateCartButton().click();
    
    }   

    
}
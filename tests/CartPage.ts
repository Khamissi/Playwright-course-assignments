import {Page, expect} from "@playwright/test";

export class CartPage 
{
    constructor(private page: Page) {}

    private locateCheckoutButton()
    {
        return this.page.getByRole("button", { name: "Checkout" });
    }

    async proceedToCheckout(productName: string) 
    {
    const isItemExistInCart = await this.page.getByRole('link', { name: productName }).isVisible();

    if (isItemExistInCart) 
        {
        await this.locateCheckoutButton().click();
    } 
    else 
        {
        throw new Error(`Item "${productName}" not found in cart`);
    }
}
}


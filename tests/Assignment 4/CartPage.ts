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
    const product = this.page.getByRole("link", { name: productName });

        await expect(product).toBeVisible();

        await this.locateCheckoutButton().click();
}
}


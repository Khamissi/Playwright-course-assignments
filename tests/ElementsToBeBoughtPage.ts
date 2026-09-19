import {Page, defineConfig} from "@playwright/test";

export class ElementsToBeBoughtPage {

    constructor(private page: Page) {}

    
    async navigateTo() 
    {
        await this.page.goto('https://rahulshettyacademy.com/angularpractice/shop');
    }

    private locateProductCard(productName: string) 
    {
        return this.page.locator("app-card").filter({ hasText: productName });
    }

    async selectProduct(productName: string)
    {
        await this.locateProductCard(productName).getByRole("button", { name: "Add" }).click();
    }

    private locateCheckoutButton()
    {
        return this.page.getByText("Checkout");
    }

    
    async proceedToCart() 
    {
    const hasItems = await this.page.getByText("Checkout ( 1 ) (current)").isVisible();

    if (hasItems) 
        {
        await this.locateCheckoutButton().click();
    } 
    else 
        {
        console.log("Cart is empty, select at least one product before proceeding to checkout.");
    }
}
}
import {Locator, Page} from '@playwright/test';
import Urls from '../../../test data/Urls.json';

export class DashboardPage
{
    readonly page: Page;
    readonly cartButton: Locator;


    constructor(page: Page)
    {
        this.page = page;
        this.cartButton = page.locator("[routerlink*='cart']");
    }

    async navigateToShop(): Promise<void>
    {
        await this.page.goto(Urls.RauhShettyShopUrlClient);
    }

    private locateProductCardByName(productName: string): Locator
    {
        return this.page.locator(".card-body").filter({hasText: productName});
    }

    async addProductToCart(productName: string): Promise<void>
    {
        const productCard = this.locateProductCardByName(productName);
        await productCard.getByRole("button", {name: /add to cart/i}).click();
    }

    async goToCart(): Promise<void>
    {
        await this.cartButton.click();
    }

    async addProductCountInCart(productName: string): Promise<void>
    {
        await this.navigateToShop();
        await this.addProductToCart(productName);
        await this.goToCart();
    }
}
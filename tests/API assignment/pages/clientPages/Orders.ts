import { Page, expect, Locator } from '@playwright/test';
import { OrderIdHelper } from '../../utils/OrderHelper';
import OrdersApiUtil from '../../utils/GetOrdersApi';

export class OrdersPage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private locateOrderTab() {
        return this.page.locator(
            "button[routerlink*='/dashboard/myorders']"
        );
    }

    async navigateToOrdersTab(): Promise<void> {
        await this.locateOrderTab().click();
    }

    private locateViewButtonByProductName(productName: string): Locator {
        return this.page.locator('tr')
            .filter({ hasText: productName })
            .getByRole('button', { name: 'View' })
            .first();
    }

    async clickViewButtonByProductName(productName: string): Promise<void> {
        await this.locateViewButtonByProductName(productName).click();
    }

    private locateOrderId(): Locator {
        return this.page.locator('.col-text.-main').first();
    }

    async getOrderID(): Promise<string> {
        return (await this.locateOrderId().innerText()).trim();
    }

    async assertOrderID(expectedOrderId: string): Promise<void> {
    const uiOrderId = await this.getOrderID();

    expect(
        uiOrderId,
        'The UI order ID does not match the API order ID'
    ).toBe(expectedOrderId);
}

async orderProceed(
    productName: string,
    token: string,
    email: string
): Promise<void> {

    const ordersApi = await OrdersApiUtil.create();

    let apiOrderId: string;

    try {
        apiOrderId = await ordersApi.getOrderId(
            token,
            email,
            productName
        );
    } finally {
        await ordersApi.dispose();
    }

    await this.navigateToOrdersTab();

    await this.clickViewButtonByProductName(productName);

    await this.assertOrderID(apiOrderId);
}
    
}
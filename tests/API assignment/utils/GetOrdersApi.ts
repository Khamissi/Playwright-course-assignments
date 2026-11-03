
import { APIRequestContext, request, expect } from '@playwright/test';
import Urls from '../../test data/Urls.json';

const BaseUrl = Urls.BaseUrl;

export type Order = {
    _id: string;
    productName: string;
};

export class OrdersApiUtil {

    private constructor(
        private readonly apiContext: APIRequestContext
    ) {}

    static async create(): Promise<OrdersApiUtil> {
        const apiContext = await request.newContext({
            baseURL: BaseUrl
        });

        return new OrdersApiUtil(apiContext);
    }

  async getOrderId(
    token: string,
    email: string,
    productName: string
): Promise<string> {

    const ordersResponse = await this.apiContext.get(
        Urls.OrdersUrl,
        {
            headers: {
                Authorization: token
            }
        }
    );

    const responseBody = await ordersResponse.text();

    expect(
        ordersResponse.ok(),
        `Failed to fetch customer orders.
        Status: ${ordersResponse.status()}
        Response: ${responseBody}`
    ).toBeTruthy();

    const responseJson = JSON.parse(responseBody);

    const matchingOrder = responseJson.data.find(
        (order: Order) => order.productName === productName
    );

    expect(
        matchingOrder,
        `Order not found for product: ${productName}`
    ).toBeTruthy();

    expect(
        matchingOrder._id,
        `Order ID not found for product: ${productName}`
    ).toBeTruthy();

    return matchingOrder._id;
}

    async dispose(): Promise<void> {
        await this.apiContext.dispose();
    }
}

export default OrdersApiUtil;

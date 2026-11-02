import {test} from '@playwright/test';
import fs from "fs";
import path  from 'path';

import { LogInApiUtil } from '../utils/LogInApiUtil';
import { TokenHelper } from '../utils/TokenHelper';
import { DashboardPage } from '../pages/clientPages/Dashboard';
import { CheckOut } from '../pages/clientPages/CheckOut';   
import { CartPage } from '../pages/clientPages/Cart';
import { OrdersPage} from '../pages/clientPages/Orders';

interface TestData {
    email: string;
    password: string;
    TestCaseID: string;
    productName: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardHolderName: string;
    abstractCountryName: string;
    fullCountryName: string;
};

const dataPath = path.join(__dirname, "../../test data/ProductData.json");
const tests : TestData[] = JSON.parse(fs.readFileSync(dataPath, "utf-8"));


for (const data of tests) {

    const {
        email,
        password,
        productName,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
        cardHolderName,
        abstractCountryName,
        fullCountryName
    } = data;

    test(`API login + add "${productName}" for ${email}`, async ({ page }) => {

        const authenticationApi = await LogInApiUtil.create();
        let token: string;
        try {
            token = await authenticationApi.logIn({email,password,});
            await TokenHelper.inject(page, token);
        }
        
        finally 
        {
            await authenticationApi.dispose();
        }

        const dashboard = new DashboardPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckOut(page);
        const order = new OrdersPage(page);

        await dashboard.addProductCountInCart(productName);
        await cart.processCheckout(productName);

        await checkout.completePurchase({
            month: expiryMonth,
            year: expiryYear,
            cardNumber,
            cvv,
            cardHolderName,
            abstractCountryName: abstractCountryName,
            fullCountryName: fullCountryName
        });

        await order.orderProceed(productName, token, email);
    });
}
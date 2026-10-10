import {test, expect} from '@playwright/test';
import LogInData from '../test data/LogInData.json';  
import { LogInPage } from './LogIn';
import { ShopPage } from './shopPage';
import ProductData from '../test data/ProductData.json';
import {CheckOut} from './CheckOut';
import path from 'path';

test.describe('Test Just log in', () => 
{
    for (const data of LogInData) {
        test(`Log in with ${data.TestCaseID}`, async ({ page }) => {
            const testLogInObject = new LogInPage(page);
            await testLogInObject.navigateTo('https://rahulshettyacademy.com/client/#/auth/login');
            await testLogInObject.login(data.email, data.password);
            await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash'); 
        });
    }

    test.afterEach(async ({ page }, testInfo) => {

        const screenshotName = testInfo.title.replace(/[<>:"/\\|?*]/g, '');

        const screenshotPath = path.join(
            testInfo.config.rootDir,
            'evidences',
            'LogIn',
            `${screenshotName}.png`
        );
        console.log(`Screenshot name: ${screenshotName}`);

        await page.screenshot({
            path: screenshotPath,
            fullPage: true
        });
    });
});

test.describe('Test add product to cart', () => 
{
    for (const data of ProductData) {
        test(`Add ${data.productName} to cart`, async ({ page }) => {
            const testLogInObject = new LogInPage(page);
            const testShopPageObject = new ShopPage(page);
            const testCheckOutObject = new CheckOut(page);
            await testLogInObject.navigateTo('https://rahulshettyacademy.com/client/#/auth/login');
            await testLogInObject.login(data.email, data.password);
            await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash'); 
            await testShopPageObject.addProductToCart(data.productName);await page.getByRole('button', { name: 'Checkout❯' }).click();
            await testCheckOutObject.completePurchase({
                cardNumber: data.cardNumber,
                month: data.expiryMonth,
                year: data.expiryYear,
                cvv: data.cvv,
                cardHolderName: data.cardHolderName,
                abstractCountryName: data.coountryPrefix,
                fullCountryName: data.country
            });

        });
    }

    test.afterEach(async ({ page }, testInfo) => {

        const screenshotName = testInfo.title.replace(/[<>:"/\\|?*]/g, '');

        const screenshotPath = path.join(
            testInfo.config.rootDir,
            'evidences',
            'Shop',
            `${screenshotName}.png`
        );
        console.log(`Screenshot name: ${screenshotName}`);

        await page.screenshot({
            path: screenshotPath,
            fullPage: true
        });
    });
});

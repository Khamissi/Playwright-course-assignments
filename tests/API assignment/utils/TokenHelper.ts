import {Page, APIRequestContext} from '@playwright/test';

export class TokenHelper
{
    static async inject(page: Page, token: string): Promise<void> {
        await page.addInitScript((authToken) => {
            window.localStorage.setItem('token', authToken);
        }, token);
    }
}
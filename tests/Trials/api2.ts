import { test, expect, request } from '@playwright/test';
import LogInData from '../test data/LogInData.json';
import Urls from '../test data/Urls.json';


let token: string;

test.beforeAll(async () => {
    const apiContext = await request.newContext();

    for (const data of LogInData) {
        const logInPayload = {
            email: data.email,
            password: data.password
        };

        const logInResponse = await apiContext.post(
            Urls.BaseUrl + Urls.LoginUrl,
            {
                data: logInPayload
            }
        );

        const responseJson = await logInResponse.json();

        token = responseJson.token;
    }

    await apiContext.dispose();
});
import {APIRequestContext, request, expect} from '@playwright/test';
import Urls from '../../test data/Urls.json';

const BaseUrl = Urls.BaseUrl;

export type logInCredentials = {
    email: string;
    password: string;
};

export class LogInApiUtil {
    private constructor(private readonly apiContext: APIRequestContext) {}

    static async create(): Promise<LogInApiUtil> {
        const apiContext = await request.newContext({baseURL: BaseUrl});
        return new LogInApiUtil(apiContext);
    }

    async logIn({email, password}: logInCredentials): Promise<string> {
        const logInResponse = await this.apiContext.post(Urls.LoginUrl, {
            data: {
                userEmail: email,
                userPassword: password
            }
        });

        expect(logInResponse.ok(), `Login failed for ${email}`).toBeTruthy();

        const logInResponseJson = await logInResponse.json();
        expect(logInResponseJson.token, 'Token not found in login response').toBeTruthy();
        return logInResponseJson.token as string;
    }

    async dispose(): Promise<void> {        
        await this.apiContext.dispose();
    }
}
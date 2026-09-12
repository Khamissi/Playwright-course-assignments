import { test, expect } from "@playwright/test";
import { LogIn } from "./LogIn";

test("LogIn page test", async ({ page }) => {
    const logInPage = new LogIn(page);
    const username = "standard_user";
    const password = "secret_sauce";

    await logInPage.open();
    await logInPage.login(username, password);
    await expect(page.getByText("Products")).toBeVisible();

});
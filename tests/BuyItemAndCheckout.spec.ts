import {test} from "@playwright/test";
import {ElementsToBeBoughtPage} from "./ElementsToBeBoughtPage";
import {CartPage} from "./CartPage";
import {CheckoutPage} from "./CheckoutPage";    

test('Buy item and checkout', async ({ page }) =>    
{
    const elementsToBeBoughtPage = new ElementsToBeBoughtPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const productName = "Blackberry";
    const abstractCountryName = "Ger";
    const fullCountryName = "Germany";

    await elementsToBeBoughtPage.navigateTo();
    await elementsToBeBoughtPage.selectProduct(productName);
    await elementsToBeBoughtPage.proceedToCart();
    await cartPage.proceedToCheckout(productName);
    await checkoutPage.enterCountry(abstractCountryName, fullCountryName);
    await checkoutPage.selectCountryFromSuggestions(fullCountryName);
    await checkoutPage.acceptTermsAndConditions();
    await checkoutPage.completePurchase();
    await checkoutPage.assertSuccess();
})
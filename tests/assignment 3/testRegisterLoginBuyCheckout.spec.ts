import {test, expect} from '@playwright/test';
import {RegisterClientPage} from './registerclient';
import {LoginPage} from './logInAfterRegisteration';
import {ShopPage} from './shopPage';
import {CartZaraPage} from './CartZaraPage';
test('test', async ({page}) => {
  const registerClientPage = new RegisterClientPage(page);
  const loginPage = new LoginPage(page);
  const shopPage = new ShopPage(page);
  const cartZaraPage = new CartZaraPage(page);
  const firstName = 'Ahmed';
  const lastName = 'Elkhamissi';
  const email = 'kahmississ@mail.com';
  const password = 'Password123!';
  const confirmPassword = 'Password123!'; 
  const occupation = 'Engineer';
  const phone = '9308224429';
  const gender = 'Male';


  await registerClientPage.navigateTo();
  await registerClientPage.clickRegisterButton();
  await registerClientPage.enterFirstName(firstName);
  await registerClientPage.enterLastName(lastName);
  await registerClientPage.enterEmail(email);
  await registerClientPage.enterPhone(phone);
  await registerClientPage.selectOccupation(occupation);
  await registerClientPage.enterGender(gender);
  await registerClientPage.enterPassword(password);
  await registerClientPage.enterConfirmPassword(confirmPassword);
  await registerClientPage.checkTermsAndConditions();
  await registerClientPage.clickRegisterSubmitButton(); 

  await loginPage.clickLoginButton();
  await loginPage.enterEmail(email);
  await loginPage.enterPassword(password);
  await loginPage.clickLoginButton();

  await shopPage.clickViewButtonForSpecificProduct('ZARA COAT 3');
  await shopPage.clickAddToCartButton('ZARA COAT 3');
  await shopPage.clickCartButton();

  await cartZaraPage.clickCheckoutButton();
  await cartZaraPage.enterCountry('Ger', ' Germany');
  await cartZaraPage.selectCountryFromSuggestions(' Germany');

});
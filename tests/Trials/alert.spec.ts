import {test, expect} from '@playwright/test';

test("Simple Alert Handling", async ({page}) => 
{
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("#alertBtn").click();
  
  page.on("dialog", async (dialog)=>
  {
    expect(dialog.type()).toBe("alert");
    expect(dialog.message()).toContain("I am an alert box!");

    await dialog.accept();
  })
})


test("Confirm and dismiss alrets", async ({page}) => 
{
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("#confirmBtn").click();
  
  page.on("dialog", async (dialog)=>
  {
    expect(dialog.type()).toBe("confirm");
    expect(dialog.message()).toContain("Press a button!");
    await dialog.accept();
    await expect(page.locator("#demo")).toHaveText("You pressed OK!");
    await dialog.dismiss();
    await expect(page.locator("#demo")).toHaveText("You pressed Cancel!");

    
  })
  
})

test("Prompet alerts", async ({page}) => 
{
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("#promptBtn").click();
  
  page.on("dialog", async (dialog)=>
  {
    expect(dialog.type()).toBe("prompt");
    expect(dialog.message()).toContain("Please enter your name:");
    expect(dialog.defaultValue()).toBe("Harry Potter");
    await dialog.accept("Ahmed");
    expect(await page.locator("#demo")).toHaveText("Hello Harry Potter! How are you today?");
    
    
  })
  
})
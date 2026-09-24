import {type Page} from "@playwright/test";
export class PageBase 
{
    constructor (readonly page:Page)
    {

    }

    static url:string = "https://www.saucedemo.com/";

    async open ():Promise<void>
    {
        await this.page.goto(PageBase.url);
    }
}
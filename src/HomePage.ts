import { By, WebDriver } from "selenium-webdriver";
import { Component } from "./Component";
import { FRONTEND_URL } from "./env";
import { LoginPage } from "./LoginPage";

export class HomePage extends Component {

    constructor(driver: WebDriver) {
        super(driver, By.id("root"))

        this.descendants = {
            "loginOrLogoutButton": new Component(driver, By.css("#login, #logout")),
            "searchBar": new Component(driver, By.id("search-bar")),
            "searchResult": new Component(driver, By.css("ul"))
        }
    }

    async open() {
        return this.driver.get(FRONTEND_URL + "/")
    }

    async openLogin(): Promise<LoginPage> {
        await this.click("loginOrLogoutButton")
        const loginPage = new LoginPage(this.driver)
        await loginPage.waitForVisible()
        return loginPage
    }

    async enterTitleSearch(search: string) {
        await this.sendKeys("searchBar", search)
    }

    async getSearchResult() {
        const result = await this.findDescendant("searchResult")
        return result.findElements(By.css("li")).then(
            elems => Promise.all(elems.map(
                elem => elem.getText()
            ))
        )
    }
}
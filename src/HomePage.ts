import { By, until, WebDriver } from "selenium-webdriver";
import { Component } from "./Component";
import { FRONTEND_URL } from "./env";
import { LoginPage } from "./LoginPage";

export class HomePage extends Component {

    loginLocator = By.id("login")
    logoutLocator = By.id("logout")
    searchInputLocator = By.id("search-bar")
    searchResultLocator = By.css("ul")

    async open() {
        return this.driver.get(FRONTEND_URL + "/")
    }

    async openLogin(): Promise<LoginPage> {
        await this.driver.findElement(this.loginLocator).click()
        const loginPage = new LoginPage(this.driver)
        await loginPage.waitUntilReady()
        return loginPage
    }

    enterTitleSearch(search: string) {
        return this.driver.findElement(this.searchInputLocator).sendKeys(search)
    }

    async getSearchResult() {
        return this.driver.findElements(By.css("li")).then(
            elems => Promise.all(elems.map(
                elem => elem.getText()
            ))
        )
    }

    waitUntilReady() {
        return this.driver.wait(
            until.elementLocated(By.css("#login, #logout"))
        ).then(
            elem => until.elementIsVisible(elem)
        )
    }
}
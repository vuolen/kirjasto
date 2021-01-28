import { By, until, WebDriver } from "selenium-webdriver";
import { Book } from "../features/support/steps";
import { Component } from "./Component";
import { FRONTEND_URL } from "./env";
import { LoginPage } from "./LoginPage";

export class HomePage extends Component {

    loginLocator = By.id("login")
    logoutLocator = By.id("logout")
    searchInputLocator = By.id("search-bar")
    searchResultsLocator = By.css("[data-se='book']")

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
        const results = await this.driver.findElements(this.searchResultsLocator)
        
        return Promise.all(results.map(
            async result => {
                const title = await result.findElement(By.css("[data-se='title']")).getText()
                const author = await result.findElement(By.css("[data-se='author']")).getText()

                return {title, author} as Book
            }
        ))
    }

    waitUntilReady() {
        return Promise.all(
            [By.css("#login, #logout"), this.searchInputLocator].map(
                locator => this.driver.wait(until.elementLocated(locator)).then(elem => this.driver.wait(until.elementIsVisible(elem)))
            )
        )
    }
}
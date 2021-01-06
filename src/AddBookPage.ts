import { By, until, WebDriver } from "selenium-webdriver";
import { Component } from "./Component";
import { FRONTEND_URL } from "./env";

export class AddBookPage {
    driver: WebDriver

    titleLocator = By.id("title")
    submitLocator = By.id("submit")
    errorLocator = By.id("error")

    constructor(driver: WebDriver) {
        this.driver = driver
    }

    open() {
        return this.driver.get(FRONTEND_URL + "/addBook")
    }

    enterTitle(title: string) {
        return this.driver.findElement(this.titleLocator).sendKeys(title)
    }

    submit() {
        return this.driver.findElement(this.submitLocator).click()
    }

    addBook(title: string) {
        return this.enterTitle(title).then(
            () => this.submit()
        )
    }

    getError() {
        return this.driver.findElement(this.errorLocator).getText()
    }

    waitUntilReady() {
        return this.driver.wait(
            until.elementLocated(this.titleLocator)
        ).then(
            elem => this.driver.wait(
                until.elementIsVisible(elem)
            )
        )
    }
}

import { By, until, WebDriver } from "selenium-webdriver";
import { Component } from "./Component";
import { FRONTEND_URL } from "./env";

export class AddBookPage {
    driver: WebDriver

    titleLocator = By.id("title")
    authorLocator = By.id("author")
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

    enterAuthor(author: string) {
        return this.driver.findElement(this.authorLocator).sendKeys(author)
    }

    submit() {
        return this.driver.findElement(this.submitLocator).click()
    }

    addBook(book: {title: string, author: string}) {
        return this.enterTitle(book.title).then(
            () => this.enterAuthor(book.author)
        ).then(
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

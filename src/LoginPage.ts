import { By, until, WebDriver } from "selenium-webdriver";
import { Component } from "./Component";
import { HomePage } from "./HomePage";

export class LoginPage extends Component {

    emailLocator = By.name("email")
    passwordLocator = By.name("password")
    submitLocator = By.name("submit")

    async login(email: string, password: string): Promise<HomePage> {
        await this.waitUntilReady()
        await this.driver.findElement(this.emailLocator).sendKeys(email)
        await this.driver.findElement(this.passwordLocator).sendKeys(password)
        await this.driver.findElement(this.submitLocator).click()
        
        const homePage = new HomePage(this.driver)
        await homePage.waitUntilReady()
        return homePage
    }

    waitUntilReady() {
        return Promise.all(
            [this.emailLocator, this.passwordLocator, this.submitLocator].map(
                locator => this.driver.wait(until.elementLocated(locator)).then(elem => this.driver.wait(until.elementIsVisible(elem)))
            )
        )
    }
}
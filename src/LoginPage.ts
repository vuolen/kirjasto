import { By, WebDriver } from "selenium-webdriver";
import { Component } from "./Component";
import { HomePage } from "./HomePage";

export class LoginPage extends Component {

    constructor(driver: WebDriver) {
        super(driver, By.css("html"))

        this.descendants = {
            "emailInput": new Component(driver, By.name("email")),
            "passwordInput": new Component(driver, By.name("password")),
            "submitButton": new Component(driver, By.name("submit"))
        }
    }

    async login(email: string, password: string): Promise<HomePage> {
        await this.sendKeys("emailInput", email)
        await this.sendKeys("passwordInput", password)
        await this.click("submitButton")
        const homePage = new HomePage(this.driver)
        await homePage.waitForVisible()
        return homePage
    }
}
import { By, WebDriver } from "selenium-webdriver";
import { Component } from "./Component";
import { FRONTEND_URL } from "./env";

export class AddBookPage extends Component {

    constructor(driver: WebDriver) {
        super(driver, By.id("root"))

        this.descendants = {
            "titleInput": new Component(driver, By.name("title")),
            "error": new Component(driver, By.className("error"))
        }
    }

    open() {
        return this.driver.get(FRONTEND_URL + "/addBook")
    }

    enterTitle(title: string) {
        return this.sendKeys("titleInput", title)
    }

    getError() {
        return this.findDescendant("error").then(
            errorMessage => errorMessage.getText()
        )
    }
}
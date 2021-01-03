import { WebDriver } from "selenium-webdriver";

export abstract class Component {
    driver: WebDriver

    constructor(driver: WebDriver) {
        this.driver = driver
    }

    abstract waitUntilReady(): Promise<any>
}
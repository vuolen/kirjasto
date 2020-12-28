import { By, Locator, promise, until, WebDriver, WebElement, WebElementCondition, WebElementPromise } from "selenium-webdriver"

const ByChained = (...bys: By[]): Locator => 
    (driver: {findElement: (locator: Locator) => WebElementPromise}) => {
        return bys.reduce(
            (promise, by) => (promise.then(
                (elem) => elem.findElement(by)
            )),
            Promise.resolve(driver)
        )
    }

export class Component {
    locator: By
    descendants: Record<string, Component>

    driver: WebDriver

    constructor(driver: WebDriver, locator: By) {
        this.driver = driver
        this.locator = locator
        this.descendants = {}
    }
    
    async waitForVisible(parent?: WebElement): Promise<any> {
        var findElement = parent ? (l: Locator) => parent.findElement(l)
                                    : (l: Locator) => this.driver.findElement(l)
        return this.driver.wait(
            async () => findElement(this.locator).catch(() => null),
            3000,
            "Timed out waiting for component location " + this.locator
        ).then(
            elem => this.driver.wait(until.elementIsVisible(elem!), 3000, "Timed out waiting for component visibility " + this.locator)
        ).then(
            elem => 
                Promise.all(Object.values(this.descendants).map(
                    descendant => descendant.waitForVisible(elem)
                ))
        )
 
    }

    async findDescendant(componentName: string) {
        return await this.driver.findElement(ByChained(this.locator, this.descendants[componentName].locator))
    }

    async sendKeys(componentName: string, keys: string) {
        this.descendants[componentName].waitForVisible()
        const element = await this.findDescendant(componentName)
        return element.sendKeys(keys)
    }

    async click(componentName: string) {
        this.descendants[componentName].waitForVisible()
        const element = await this.findDescendant(componentName)
        return element.click()
    }
}
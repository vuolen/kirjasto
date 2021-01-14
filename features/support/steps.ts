import { Given, Then, After, Before, Status, When, setWorldConstructor, setDefaultTimeout } from "@cucumber/cucumber"
import { Builder, By, Capabilities, logging, until, WebElementPromise } from "selenium-webdriver"
import { Client } from "pg"
import * as assert from "assert"
import { Driver } from "selenium-webdriver/chrome";
import { ITestCaseHookParameter } from "@cucumber/cucumber/lib/support_code_library_builder/types";
import { AddBookPage } from "../../src/AddBookPage";
import { HomePage } from "../../src/HomePage";

setDefaultTimeout(30000);

const VALID_BOOK = {
    title: "Test Book"
}

interface World {
    attach: any,
    parameters: any
    client: Client,
    driver: Driver,
    waitForElementIsVisible: (locator: By) => WebElementPromise
    login: (email: string, password: string) => void
    pageContainsString: (str: string) => WebElementPromise
    addBook: (title: string) => void
}

setWorldConstructor(function(this: World, {attach, parameters}: {attach: any, parameters: any}) {
    this.attach = attach;
    this.parameters = parameters;

    this.waitForElementIsVisible = function(locator: By) {
        return this.driver.wait(until.elementIsVisible(this.driver.wait(until.elementLocated(locator))))
    }

    this.login = async function(email: string, password: string) {
        const homePage = new HomePage(this.driver)
        await homePage.open()
        const loginPage = await homePage.openLogin()
        await loginPage.login(email, password)
    }

    this.pageContainsString = function(str: string) {
        return this.driver.findElement(By.xpath("//*[text()[contains(., '" + str + "')]]"))
    }

    this.addBook = async function(title: string) {
        const addBookPage = new AddBookPage(this.driver)
        await addBookPage.open()
        await addBookPage.waitUntilReady()
        await addBookPage.addBook(title)
    }
})

Before(async function(this: World) {
    const prefs = new logging.Preferences()
    prefs.setLevel(logging.Type.BROWSER, logging.Level.DEBUG)
    this.driver = new Builder()
        .withCapabilities(
            new Capabilities().setLoggingPrefs(prefs)
                .setBrowserName("chrome")
                .setAcceptInsecureCerts(true)
                .set("chromeOptions", {"args": ["--disable-dev-shm-usage"]})
        )
        .build()

    this.client = new Client({connectionString: process.env.DATABASE_URL})
    await this.client.connect()
    await this.client.query("TRUNCATE TABLE book")
})

After(async function(this: World, testCase: ITestCaseHookParameter) {
    var world = this
    if (testCase.result && testCase.result.status !== Status.PASSED) {
        await this.driver.takeScreenshot().then(function(screenShot) {
            world.attach(Buffer.from(screenShot, "base64"), 'image/png');
        })
        await this.driver.manage().logs().get(logging.Type.BROWSER).then(
            function(logs) {
                world.attach(logs.map(log => log.level + ": " + log.message).join("\n"), "text/plain")
            }
        )
    }
    await this.driver.close()
    await this.driver.quit()
    await this.client.end()
})

Given("the user navigates to the home page", async function(this: World) {
    return new HomePage(this.driver).open()
})

Given("the user is authenticated as an administrator", async function(this: World) {
    return this.login("admin@example.com", "E2Eadmin")
})

Given("the user is authenticated as a normal user", async function(this: World) {
    return this.login("user@example.com", "E2Euserpassword")
})

Given("a book with the title {string} exists in the database", function(this: World, title: string) {
    return this.client.query("INSERT INTO book(title) VALUES($1)", [title])
})

When("the user tries to create a book with an empty title", async function(this: World) {
    return this.addBook("")
})

When("the user tries to create a book with the title {string}", function(this: World, title: string) {
    return this.addBook(title)
})

When("the user tries to create a book with a valid title", function(this: World) {
    return this.addBook(VALID_BOOK.title)
})

When('the user searches books by the title {string}', async function (this: World, title: string) {
    const homePage = new HomePage(this.driver)
    await homePage.open()
    await homePage.enterTitleSearch(title)
})


Then('a book appears in the book search', async function (this: World) {
    const homePage = new HomePage(this.driver)
    await homePage.open()
    const res = await homePage.getSearchResult()
    assert(res.length > 0)
})

Then("the page should contain {string}", function(this: World, str: string) { 
    return this.pageContainsString(str)
})

Then("the page should not contain {string}", function(this: World, str: string) {
    return this.pageContainsString(str).then(
        () => new Error("Page contains string"),
        () => {return}
    )
})

Then('the user receives an error message about invalid permissions', function (this: World) {
    return new AddBookPage(this.driver).getError().then(
        message => message.toLowerCase().includes("invalid")
            && message.toLowerCase().includes("permissions")
    )
})

Then("a book with the title {string} does not appear in the search", async function(this: World, title: string) {
    const homePage = new HomePage(this.driver)
    await homePage.open()
    const result = await homePage.getSearchResult()
    assert(result.every(s => !s.includes(title)))
})

Then('a book with the title {string} appears in the search', async function(this: World, title: string) {
    const homePage = new HomePage(this.driver)
    await homePage.open()
    const result = await homePage.getSearchResult()
    assert(result.some(s => s.includes(title)))
})

Then("the server responds with a page", function(this: World) {
    return this.driver.findElement(By.css("html"))
})

Then('the user receives an error message about an empty title', function(this: World) {
    return new AddBookPage(this.driver).getError().then(
        message => message.toLowerCase().includes("empty")
            && message.toLowerCase().includes("title")
    )
    
})

Then('the search results contain a book with the title {string}', async function(this: World, title: string) {
    const homePage = new HomePage(this.driver)
    const result = await homePage.getSearchResult()
    assert(result.some(s => s.includes(title)))
})

Then('the search results do not contain a book with the title {string}', async function(this: World, title: string) {
    const homePage = new HomePage(this.driver)
    const result = await homePage.getSearchResult()
    assert(result.every(s => !s.includes(title)))
})
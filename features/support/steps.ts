import { Given, Then, After, Before, Status, When, setWorldConstructor, setDefaultTimeout } from "@cucumber/cucumber"
import { Builder, By, Capabilities, IWebDriverCookie, logging, until, WebElementPromise } from "selenium-webdriver"
import { Client } from "pg"
import * as assert from "assert"
import { Driver } from "selenium-webdriver/chrome";
import { ITestCaseHookParameter } from "@cucumber/cucumber/lib/support_code_library_builder/types";
import { AddBookPage } from "../../src/AddBookPage";
import { HomePage } from "../../src/HomePage";

setDefaultTimeout(30000);

interface Book {
    title: string
    author: string
}

const VALID_BOOK: Book = {
    title: "Test Book",
    author: "Test Testersson"
}

interface World {
    attach: any
    parameters: any
    client: Client
    driver: Driver
    waitForElementIsVisible: (locator: By) => WebElementPromise
    login: (email: string, password: string) => void
    pageContainsString: (str: string) => WebElementPromise
    addBook: (book: Book) => void
    addedBook: Book
}

setWorldConstructor(function(this: World, {attach, parameters}: {attach: any, parameters: any}) {
    this.attach = attach;
    this.parameters = parameters;

    this.login = async function(email: string, password: string) {
        const homePage = new HomePage(this.driver)
        await homePage.open()
        const loginPage = await homePage.openLogin()
        await loginPage.login(email, password)
    }

    this.pageContainsString = function(str: string) {
        return this.driver.findElement(By.xpath("//*[text()[contains(., '" + str + "')]]"))
    }

    this.addBook = async function(book: Book) {
        const addBookPage = new AddBookPage(this.driver)
        await addBookPage.open()
        await addBookPage.waitUntilReady()
        await addBookPage.addBook(book)

        this.addedBook = book
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
    return this.client.query("INSERT INTO book(title, author) VALUES($1, $2)", [title, VALID_BOOK.author])
})

When("the user tries to add a book with an empty title", async function(this: World) {
    return this.addBook({...VALID_BOOK, title: ""})
})

When("the user tries to add a valid book", async function(this: World) {
    return this.addBook(VALID_BOOK)
})

When('the user searches books by the title {string}', async function (this: World, title: string) {
    const homePage = new HomePage(this.driver)
    await homePage.open()
    await homePage.enterTitleSearch(title)
})

Then('the book appears in the search', async function (this: World) {
    const homePage = new HomePage(this.driver)
    await homePage.open()
    const res = await homePage.getSearchResult()
    assert(res.some(book => book.includes(this.addedBook.author) && book.includes(this.addedBook.title)))
});

Then('the book does not appear in the search', async function (this: World) {
    const homePage = new HomePage(this.driver)
    await homePage.open()
    const res = await homePage.getSearchResult()
    assert(!res.some(book => book.includes(this.addedBook.author) && book.includes(this.addedBook.title)))
});


Then('the user receives an error message about invalid permissions', function (this: World) {
    return new AddBookPage(this.driver).getError().then(
        message => message.toLowerCase().includes("invalid")
            && message.toLowerCase().includes("permissions")
    )
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
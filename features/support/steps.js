const { Given, Then, After, Before, Status, When, setWorldConstructor, setDefaultTimeout } = require("@cucumber/cucumber");
const { Builder, By, Capabilities, logging } = require("selenium-webdriver");
const { Client } = require('pg');
const assert = require("assert").strict

setDefaultTimeout(60 * 1000);

const FRONTEND_URL = process.env.FRONTEND_URL

setWorldConstructor(function({attach, parameters}) {
    this.attach = attach;
    this.parameters = parameters;

    const prefs = new logging.Preferences()
    prefs.setLevel(logging.Type.BROWSER, logging.Level.DEBUG)
    this.driver = new Builder()
        .withCapabilities(
            new Capabilities().setLoggingPrefs(prefs)
                .setBrowserName("chrome")
        )
        .build()

        this.client = new Client()
})

Before(async function() {
    await this.client.connect()
    await this.client.query("TRUNCATE TABLE book")
})

After(async function(testCase) {
    var world = this
    if (testCase.result.status === Status.FAILED) {
        await this.driver.takeScreenshot().then(function(screenShot) {
            world.attach(Buffer.from(screenShot, "base64"), 'image/png');
        })
        await this.driver.manage().logs().get(logging.Type.BROWSER).then(
            function (logs) {
                world.attach(logs.map(log => log.level + ": " + log.message).join("\n"), "text/plain")
            }
        )
    }
    await this.driver.quit()
    await this.client.end()
})

Given("the home page is loaded", function () {
    return this.driver.get(FRONTEND_URL)
})

Given("the user navigates to the search page", function () {
    return this.driver.get(FRONTEND_URL)
})

Given("a book with the title {string} exists in the database", function(title) {
    return this.client.query("INSERT INTO book(title) VALUES($1)", [title])
})

When("the user enters {string} into the search bar", function(title) { 
    return this.driver.findElement(By.id('search-bar')).sendKeys(title)
})

Then("the page should contain {string}", function(str) { 
    return this.driver.findElement(By.xpath("//*[text()[contains(., '" + str + "')]]"))
})

Then("the page should not contain {string}", function(str) {
    this.driver.findElement(By.xpath("//*[contains(text(),'" + str + "')]")).then(
        ok => assert(false),
        err => assert(true)
    )
})

const { Given, Then, After, Before } = require("@cucumber/cucumber");
const { Builder, By, Capabilities } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const assert = require("assert").strict

const FRONTEND_URL = "http://" + process.env.FRONTEND_HOST + ":" + process.env.FRONTEND_PORT

Before(function () {
    this.driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new Options().headless())
        .build()
})

After(function () {
    this.driver.quit()
})

Given("the home page is loaded", function() {
    return this.driver.get(FRONTEND_URL)
})

Then("the page should contain {string}", function(string) {
    return this.driver.findElement(By.xpath("//*[contains(text(),'" + string + "')]"))
})
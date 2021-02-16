// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare global {
    namespace Cypress {
        interface Chainable {
            loginAsAdmin: () => void
            loginAsUser: () => void
            loginAs(username: string, password: string)
            emptyDB: () => void
            addBook: (book: {title?: string, author?: {name: string}}) => void
        }
    }
}

const getAccessToken = (username: string, password: string) => 
    cy.request({
        method: "POST",
        url: `https://kirjasto-e2e.eu.auth0.com/oauth/token`,
        body: {
            client_id: "kCcOfUimwS5lOzXWBzZyuG6I11ZqDghb",
            grant_type: "password",
            audience: "https://kirjasto-backend.herokuapp.com",
            username,
            password,
            scope: "add:book"
        }
    }).then(
        ({body}) => body.access_token
    )

Cypress.Commands.add("loginAsAdmin", () => cy.loginAs("admin@example.com", "admin"))

Cypress.Commands.add("loginAsUser", () => cy.loginAs("user@example.com", "user"))

Cypress.Commands.add("loginAs", (username, password) => {
    getAccessToken(username, password).then(
        token => window.localStorage.setItem("access_token", token)
    )
})

Cypress.Commands.add("emptyDB", () => {
    cy.exec("npm run empty-db")
})

Cypress.Commands.add("addBook", (book: {title?: string, author?: {name: string}}) => {
    const VALID_BOOK = {title: "Test Book"}
    getAccessToken("admin@example.com", "admin").then(
        token => cy.request({
            method: "POST",
            url: "/api/books",
            body: {
                ...VALID_BOOK,
                ...book
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
    )
})

export {}
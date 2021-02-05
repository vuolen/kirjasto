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
            resetDB: () => void
        }
    }
}

Cypress.Commands.add("loginAsAdmin", () => cy.loginAs("admin@example.com", "admin"))

Cypress.Commands.add("loginAsUser", () => cy.loginAs("user@example.com", "user"))

Cypress.Commands.add("loginAs", (username, password) => {

    const body = {
        client_id: "kCcOfUimwS5lOzXWBzZyuG6I11ZqDghb",
        grant_type: "password",
        audience: "https://kirjasto-backend.herokuapp.com",
        username,
        password,
        scope: "add:book"
    }

    cy.request({
        method: "POST",
        url: `https://kirjasto-e2e.eu.auth0.com/oauth/token`,
        body
    }).then(
        ({body, headers}) => {
            window.localStorage.setItem("access_token", body.access_token)
        }
    )
})

Cypress.Commands.add("resetDB", () => {
    cy.exec("npm run reset-db")
})

export {}
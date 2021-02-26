import { verify } from "cypress/types/sinon"

describe("Book search", () => {
    beforeEach(() => {
        cy.emptyDB()
        cy.loginAsUser()
        cy.addBook({title: "Test Book", author: {name: "Test Author"}})
    })

    it("shows book with matching title", () => {
        cy.visit("/")
        cy.get("[data-cy=search]").type("Te{enter}")
        cy.contains("Test Book").should("exist")
    })

    it("does not show book with not matching title or author", () => {
        cy.visit("/")
        cy.get("[data-cy=search]").type("Nope{enter}")
        cy.contains("Test Book").should("not.exist")
    })

    it("shows book with matching author", () => {
        cy.visit("/")
        cy.get("[data-cy=search]").type("Author{enter}")
        cy.contains("Test Book").should("exist")
    })
})
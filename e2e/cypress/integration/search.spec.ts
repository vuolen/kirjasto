import { verify } from "cypress/types/sinon"

describe("Book search", () => {
    beforeEach(() => {
        cy.emptyDB()
        cy.loginAsUser()
        cy.addBook({title: "Test Book"})
    })

    it("shows book with matching title", () => {
        cy.visit("/")
        cy.get("[data-cy=search] > input").type("Te")
        cy.get("[data-cy=title]").contains("Test Book").should("exist")
    })

    it("does not show book with not matching title", () => {
        cy.visit("/")
        cy.get("[data-cy=search] > input").type("Nope")
        cy.get("[data-cy=title]").should("not.exist")
    })
})
describe("Adding a book", () => {
    beforeEach(() => {
        cy.emptyDB()
    })

    describe("as an admin", () => {
        beforeEach(() => {
            cy.loginAsAdmin()
            cy.visit("/addBook")
        })

        it("returns an error if the title is empty and does not add book to list", () => {
            cy.get("[data-cy=title]").clear()
            cy.get("[data-cy=author]").type("Valid Author")
            cy.get("[data-cy=submit]").click()
    
            cy.get("[data-cy=message]").should("be.visible")

            cy.visit("/")
            cy.get("[data-cy=books]").should("exist")
            cy.contains("Valid Author").should("not.exist")
        })
    
        it("valid book added to list", () => {
            cy.get("[data-cy=title]").type("Valid Title")
            cy.get("[data-cy=author]").type("Valid Author{enter}")
            cy.get("[data-cy=submit]").click()
    
            cy.visit("/")
            cy.contains("Valid Title").should("exist")
            cy.contains("Valid Author").should("exist")
        })
    })

    describe("as a normal user", () => {
        beforeEach(() => {
            cy.loginAsUser()
            cy.visit("/addBook")
        })

        it("returns an error on valid book and does not add book to list", () => {
            cy.get("[data-cy=title]").type("Valid Title")
            cy.get("[data-cy=author]").type("Valid Author")
            cy.get("[data-cy=submit]").click()
    
            cy.get("[data-cy=message]").should("be.visible")

            cy.visit("/")
            cy.get("[data-cy=books]").should("exist")
            cy.get("[data-cy=book]").should("not.exist")
        })
    })
})
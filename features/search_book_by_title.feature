Feature: User can create and view books by title

    Scenario: filtering shows book by title
        Given a book with the title "Test" exists in the database
        Given the user navigates to the search page
        When the user enters "Test" into the search bar
        Then the page should contain "Test"

    Scenario: filtering doesnt show filtered book
        Given a book with the title "Test" exists in the database
        Given the user navigates to the search page
        When the user enters "a" into the search bar
        Then the page should not contain "Test"
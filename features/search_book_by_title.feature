Feature: User can create and view books by title

    Scenario: filtering shows book by title
        Given a book with the title "Test" exists in the database
        When the user searches books by the title "Test"
        Then the search results contain a book with the title "Test"

    Scenario: filtering doesnt show filtered book
        Given a book with the title "Test" exists in the database
        When the user searches books by the title "a"
        Then the search results do not contain a book with the title "Test"
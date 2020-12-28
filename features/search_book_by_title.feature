Feature: User can create and view books by title

    Scenario: filtering shows book by title
        Given a book with the title "Test" exists in the database
        When the user searches books by the title "Test"
        Then a book with the title "Test" appears in the search

    Scenario: filtering doesnt show filtered book
        Given a book with the title "Test" exists in the database
        When the user searches books by the title "a"
        Then a book with the title "Test" does not appear in the search
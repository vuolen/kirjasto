Feature: The administrator can create a book

    Scenario: Empty title gives an error
        Given the user is authenticated as an administrator
        When the user tries to add a book with an empty title
        Then the user receives an error message about an empty title

    Scenario: Empty title not added
        Given the user is authenticated as an administrator
        When the user tries to add a book with an empty title
        Then the book does not appear in the search
    
    Scenario: Valid book appears in the book search
        Given the user is authenticated as an administrator
        When the user tries to add a valid book
        Then the book appears in the search

    Scenario: Valid book not added when not an administrator
        Given the user is authenticated as a normal user
        When the user tries to add a valid book
        Then the book does not appear in the search

    Scenario: Invalid permissions gives an error
        Given the user is authenticated as a normal user
        When the user tries to add a valid book
        Then the user receives an error message about invalid permissions
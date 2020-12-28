Feature: The administrator can create a book with a title

    Scenario: Empty title gives an error
        Given the user is authenticated as an administrator
        When the user tries to create a book with an empty title
        Then the user receives an error message about an empty title

    Scenario: Empty title not added
        Given the user is authenticated as an administrator
        When the user tries to create a book with an empty title
        Then the book does not appear in the book search
    
    Scenario: Valid title added
        Given the user is authenticated as an administrator
        When the user tries to create a book with a valid title
        Then a book appears in the book search

    Scenario: Valid title not added when not an administrator
        Given the user is authenticated as a normal user
        When the user tries to create a book with a valid title
        Then the user receives an error message about invalid permissions
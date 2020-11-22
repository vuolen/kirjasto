Feature: Server works

    Scenario: home page loads
        Given the home page is loaded
        Then the page should contain "Kirjasto"

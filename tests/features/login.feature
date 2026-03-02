@login
Feature: Login Flow

  As a user I want to log in to the application
  so that I can access the settings pages.

  Background:
    Given I am on the login page

  @smoke @auth
  Scenario: Successful login with valid credentials
    When I log in with email "user@test.com" and password "Password123"
    Then I should be redirected to the settings page

  @auth
  Scenario: Failed login with invalid email
    When I log in with email "wrong@test.com" and password "Password123"
    Then I should see a form error message

  @auth
  Scenario: Failed login with invalid password
    When I log in with email "user@test.com" and password "WrongPassword"
    Then I should see a form error message

  @validation
  Scenario: Email field validation - empty email
    When I clear the email field and blur
    Then I should see an email validation error

  @validation
  Scenario: Email field validation - invalid format
    When I fill in the email with "not-an-email"
    And I blur the email field
    Then I should see an email validation error

  @validation
  Scenario: Password field validation - empty password
    When I clear the password field and blur
    Then I should see a password validation error

  @smoke
  Scenario: Login page displays correctly
    Then I should see the sign in heading
    And I should see the email input
    And I should see the password input
    And I should see the remember me checkbox
    And I should see the sign in button

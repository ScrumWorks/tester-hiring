@a11y
Feature: Accessibility

  As a user with accessibility needs I want every page to meet WCAG 2.1 AA standards
  so that I can use the application with assistive technologies.

  @smoke @a11y
  Scenario: Login page has no critical accessibility violations
    Given I am on the login page
    Then the page should have no critical accessibility violations

  @a11y
  Scenario: Profile settings page has no critical accessibility violations
    Given I am logged in as the default user
    And I am on the profile settings page
    Then the page should have no critical accessibility violations

  @a11y
  Scenario: Account settings page has no critical accessibility violations
    Given I am logged in as the default user
    And I am on the account settings page
    Then the page should have no critical accessibility violations

  @a11y @modal
  Scenario: Nickname modal has no critical accessibility violations
    Given I am logged in as the default user
    And I am on the profile settings page
    When I open the nickname modal
    Then the page should have no critical accessibility violations

  @a11y @modal
  Scenario: Change password modal has no critical accessibility violations
    Given I am logged in as the default user
    And I am on the account settings page
    When I open the change password form
    Then the page should have no critical accessibility violations

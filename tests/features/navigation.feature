@navigation
Feature: Responsive and Navigation

  As a user I want to navigate between pages and use the app on different screen sizes
  so that I can access all features regardless of device.

  @smoke @desktop
  Scenario: Sidebar navigation - profile to account
    Given I am logged in as the default user
    And I am on the profile settings page
    When I click the account link in the sidebar
    Then I should be on the account settings page

  @desktop
  Scenario: Sidebar navigation - account to profile
    Given I am logged in as the default user
    And I am on the account settings page
    When I click the profile link in the sidebar
    Then I should be on the profile settings page

  @smoke @auth @desktop
  Scenario: Logout from sidebar
    Given I am logged in as the default user
    And I am on the profile settings page
    When I click the logout button
    Then I should be redirected to the login page

  @auth
  Scenario: Unauthenticated user is redirected to login
    When I navigate to the profile settings page without logging in
    Then I should be redirected to the login page

  @auth
  Scenario: Root page redirects to login
    When I navigate to the root page
    Then I should be redirected to the login page

  @smoke @mobile
  Scenario: Mobile - hamburger menu opens navigation
    Given I am using a mobile viewport
    And I am logged in as the default user
    And I am on the profile settings page
    When I click the mobile menu button
    Then I should see the sidebar navigation

  @mobile
  Scenario: Mobile - navigate to account via hamburger menu
    Given I am using a mobile viewport
    And I am logged in as the default user
    And I am on the profile settings page
    When I click the mobile menu button
    And I click the account link in the sidebar
    Then I should be on the account settings page

  @mobile
  Scenario: Mobile - logout via hamburger menu
    Given I am using a mobile viewport
    And I am logged in as the default user
    And I am on the profile settings page
    When I click the mobile menu button
    And I click the logout button
    Then I should be redirected to the login page

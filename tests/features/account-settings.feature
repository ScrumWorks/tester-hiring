@account
Feature: Account Settings

  As an authenticated user I want to manage my account settings
  so that I can change my password or delete my account.

  Background:
    Given I am logged in as the default user
    And I am on the account settings page

  @smoke
  Scenario: Account page displays correctly
    Then I should see the account heading
    And I should see the change password item
    And I should see the delete account button

  @smoke @modal
  Scenario: Change password with valid data
    When I open the change password form
    And I fill in current password with "Password123"
    And I fill in new password with "NewPassword1"
    And I fill in confirm password with "NewPassword1"
    And I click the change password button
    Then I should see a success toast message

  @validation @modal
  Scenario: Change password validation - wrong current password
    When I open the change password form
    And I fill in current password with "WrongPassword"
    And I fill in new password with "NewPassword1"
    And I fill in confirm password with "NewPassword1"
    And I click the change password button
    Then I should see a form error about incorrect password

  @validation @modal
  Scenario: Change password validation - password too short
    When I open the change password form
    And I fill in current password with "Password123"
    And I fill in new password with "Short1"
    And I fill in confirm password with "Short1"
    And I click the change password button
    Then I should see a validation error about password length

  @validation @modal
  Scenario: Change password validation - missing uppercase
    When I open the change password form
    And I fill in current password with "Password123"
    And I fill in new password with "newpassword1"
    And I fill in confirm password with "newpassword1"
    And I click the change password button
    Then I should see a validation error about uppercase

  @validation @modal
  Scenario: Change password validation - missing number
    When I open the change password form
    And I fill in current password with "Password123"
    And I fill in new password with "Newpassword"
    And I fill in confirm password with "Newpassword"
    And I click the change password button
    Then I should see a validation error about number

  @validation @modal
  Scenario: Change password validation - passwords do not match
    When I open the change password form
    And I fill in current password with "Password123"
    And I fill in new password with "NewPassword1"
    And I fill in confirm password with "DifferentPass1"
    And I click the change password button
    Then I should see a validation error about password match

  @modal
  Scenario: Delete account - confirm dialog appears
    When I click the delete account button
    Then I should see the delete confirmation dialog

  @modal
  Scenario: Delete account - confirm button disabled without typed confirmation
    When I click the delete account button
    Then the confirm delete button should be disabled

  @modal
  Scenario: Delete account - wrong confirmation text
    When I click the delete account button
    And I type "WRONG" in the confirmation input
    Then the confirm delete button should be disabled

  @modal
  Scenario: Delete account - successful deletion
    When I click the delete account button
    And I type "DELETE" in the confirmation input
    And I click the confirm delete button
    Then I should be redirected to the login page

  @modal
  Scenario: Access change password form via direct URL
    When I navigate directly to the change password URL
    Then I should see the change password form

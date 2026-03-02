@profile
Feature: Profile Settings

  As an authenticated user I want to manage my profile settings
  so that I can update my personal information.

  Background:
    Given I am logged in as the default user
    And I am on the profile settings page

  @smoke
  Scenario: Profile page displays all settings items
    Then I should see the profile heading
    And I should see the nickname settings item
    And I should see the bio settings item
    And I should see the date of birth settings item
    And I should see the location settings item

  @smoke @modal
  Scenario: Update nickname with valid value
    When I open the nickname modal
    And I fill in the nickname with "newuser123"
    And I click save
    Then I should see a success toast message
    And the nickname preview should show "newuser123"

  @validation @modal
  Scenario: Nickname validation - too short
    When I open the nickname modal
    And I fill in the nickname with "ab"
    And I click save
    Then I should see a validation error about minimum length

  @validation @modal
  Scenario: Nickname validation - invalid characters
    When I open the nickname modal
    And I fill in the nickname with "user name!"
    And I click save
    Then I should see a validation error about allowed characters

  @modal
  Scenario: Update bio with valid value
    When I open the bio modal
    And I fill in the bio with "This is my new bio text that is long enough"
    And I click save
    Then I should see a success toast message

  @validation @modal
  Scenario: Bio validation - too short
    When I open the bio modal
    And I fill in the bio with "Short"
    And I click save
    Then I should see a validation error about minimum length

  @modal
  Scenario: Update date of birth with valid date
    When I open the date of birth modal
    And I fill in the date of birth with "1995-06-15"
    And I click save
    Then I should see a success toast message

  @validation @modal
  Scenario: Date of birth validation - underage
    When I open the date of birth modal
    And I fill in the date of birth with "2020-01-01"
    And I click save
    Then I should see a validation error about age

  @modal
  Scenario: Update location with country and city
    When I open the location modal
    And I select country "United States"
    And I wait for cities to load
    And I select city "New York"
    And I click save
    Then I should see a success toast message

  @validation @modal
  Scenario: City dropdown is disabled when no country is selected
    When I open the location modal
    And I clear the country selection
    Then the city dropdown should be disabled

  @modal
  Scenario: Close modal with close button
    When I open the nickname modal
    And I close the modal
    Then the modal should be closed

  @known-bug @modal
  Scenario: Access nickname form via direct URL
    When I navigate directly to the nickname settings URL
    Then I should see the nickname modal

  @known-bug @modal
  Scenario: Access bio form via direct URL
    When I navigate directly to the bio settings URL
    Then I should see the bio modal

  @modal
  Scenario: Access date of birth form via direct URL
    When I navigate directly to the date of birth settings URL
    Then I should see the date of birth modal

  @modal
  Scenario: Access location form via direct URL
    When I navigate directly to the location settings URL
    Then I should see the location modal

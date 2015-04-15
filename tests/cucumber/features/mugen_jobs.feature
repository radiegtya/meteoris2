Feature: Create a new master collection

  As a developer I need to be able to create the CRUDSS operations for a master collection
  I want to specify its name and the fields specifications of the collection
  So that I have a fully manageable new collection, ready to associate with a slave collection

  Scenario:
    Given I am logged in as "admin" with uid "admin@meteoris.me" and password "admin"
    And I am on the CRUDSS generator page : "mugen"
    When I create a "jobs"  collection with attributes :
      | Name   |  Type  | Required | Label | isOf |  FK  |
      | title  | String | required | Title | null | null |
      | posted | Date   | required | Date  | null | null |
    And I create a "jobs" roles collection
    And I create a role and a user from the table :
      | Name | Password  |  RoleGroup |     Email       |
      |  Bob |  bob123   | HR_Manager | bob@meteoris.me |
    And I give the "HR_Manager" "index" authority over the "jobs" collection
    Then logged in as "Bob" with uid "bob@meteoris.me" and password "bob123" I can open the "jobs" management page

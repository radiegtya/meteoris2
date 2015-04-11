Feature: Create a new master collection

  As a developer I need to be able to create the CRUDSS operations for a master collection
  I want to specify its name and the fields specifications of the collection
  So that I have a fully manageable new collection, ready to associate with a slave collection

  Scenario:
    Given I am on the CRUDSS generator page : "mugen"
    When I name my new collection "jobs"
    And I add the table :
      | Name   |  Type  | Required | Label | isOf |  FK  |
      | title  | String | required | Title | null | null |
      | posted | Date   | required | Date  | null | null |
    And I generate the new collection
    Then I can open the "jobs" manager's index page
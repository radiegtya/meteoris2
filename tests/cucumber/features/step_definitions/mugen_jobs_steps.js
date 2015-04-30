(function () {

  'use strict';

  module.exports = function () {

    // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
    var url = require('url');

    /*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */
    /*                                                           */
    /*    Given I am logged in as "UID" with password "PWD"      */
    /*                                                           */
    /*                                                           */
    this.Given(/^I am logged in as "([^"]*)" with uid "([^"]*)" and password "([^"]*)"$/
      , function (strNameAdmin, strEmailAdmin, strPwdAdmin, callback) {

      this.browser.setViewportSize({width: 1024, height: 720})

      seqLogin(this, callback, strEmailAdmin, strPwdAdmin, strNameAdmin);
      callback();

    });

    /*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */
    /*                                                           */
    /*      And I am on the CRUDSS generator page : mugen        */
    /*                                                           */
    /*                                                           */
    this.Given(/^I am on the CRUDSS generator page : "([^"]*)"$/, function (relativePath, callback) {

      this.browser
        .url(url.resolve(process.env.HOST, relativePath)) // process.env.HOST always points to the mirror
//        .saveScreenshot('/home/yourself/Pictures/onCRUDPage.png')
        .call(callback);

    });


    /*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */
    /*                                                               */
    /*   When I create a "jobs" collection with attributes :         */
    /*    | Name   |  Type  | Required | Label | isOf |  FK  |       */
    /*    | title  | String | required | Title | null | null |       */
    /*    | posted | Date   | required | Date  | null | null |       */
    /*                                                               */
    this.When(/^I create a "([^"]*)"  collection with attributes :$/
        , function (nameCollection, featureTable, callback) {

      var fldCollectionName = '//*[@id="collection"]';
      prepElem(this, fldCollectionName)
        .setValue(fldCollectionName, nameCollection)
//        .saveScreenshot('/home/yourself/Pictures/nameMyCollection.png')

      var funcColumnSetter = null;
      var idxRow = 0;

      for (var idxRow = 0; idxRow < featureTable.raw().length - 1; idxRow++) {
        processNextRowIfValid(this, featureTable, idxRow, processTableRow, callback, failedTest);
      };

      var xpathCRUDSSForm = '//*[@id="mugenGenerator_form"]';
      var xpathBtnConfirm = '//button[text()="Yes. Please proceed!"]';

      var that = this;
      this.browser
        .submitForm(xpathCRUDSSForm)
        .waitForExist(xpathBtnConfirm, 5000)
        .waitForVisible(xpathBtnConfirm, 5000)
        .waitForEnabled(xpathBtnConfirm, 5000)
        .click(xpathBtnConfirm)
        .call(callback);

    });


    /*   *   *   *   *   *   *   *   *   *   *  *   *   */
    /*                                                  */
    /*          I create a jobs roles collection :      */
    /*                                                  */
    this.When(/^I create a "([^"]*)" roles collection$/, function (roleName, callback) {
      var that = this;

      var urlRoleCollections = '/mugenRoleCollections';
      var xpathInsertButton = '//a[text()="Insert"]';

      var xpathNameMugenRoleCollections = '//*[@id="name"]';
      var xpathSubmitButton = '//*[@id="btnSave"]';
      var xpathRoleCollectionsForm = '//*[@id="mugenRoleCollections_form"]';

      //  Get to the role groups page
      var routeRoleCollections = url.resolve(process.env.HOST, urlRoleCollections);  // process.env.HOST always points to the mirror
//      console.log("routeRoleCollections ? " + routeRoleCollections);
      this.browser.url(routeRoleCollections);

      // Open role group form
      prepElem(this, xpathInsertButton)
        .click(xpathInsertButton);

      // Create new role group
      prepElem(this, xpathNameMugenRoleCollections)
        .setValue(xpathNameMugenRoleCollections, roleName)
//        .saveScreenshot('/home/yourself/Pictures/roleCollection.png')
        .click(xpathSubmitButton)
//        .saveScreenshot('/home/yourself/Pictures/roleCollectionIndex.png')
        ;

      callback();
    });


    /*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */
    /*                                                           */
    /*          I create a role and a user from the table :        */
    /*                                                           */
    /*    | Name | Password  |  RoleGroup |     Email       |    */
    /*    |  Bob |  bob123   | HR_Manager | bob@meteoris.me |    */
    /*                                                           */
    this.When(/^I create a role and a user from the table :$/, function (table, callback) {
      var that = this;

      var urlRoleGroup = '/mugenRoleGroups/index';
      var xpathInsertButton = '//a[text()="Insert"]';
      var xpathNameMugenRoleGroups = '//*[@id="name"]';
      var xpathRoleGroupsForm = '//*[@id="mugenRoleGroups_form"]';
      var urlUserMgmnt = '/users/index';
      var xpathSubmitButton = '//*[@id="btnSave"]';
      var xpathUsersForm = '//*[@id="users_form"]';

      //  Get to the role groups page
      var routeRoleGroups = url.resolve(process.env.HOST, urlRoleGroup);  // process.env.HOST always points to the mirror
//      console.log("routeRoleGroups ? " + routeRoleGroups);
      this.browser.url(routeRoleGroups);

      //  Prepare feature table data
      var mapFeatureTable = characterizeFeatureTable(table);


      // Open role group form
      prepElem(this, xpathInsertButton)
        .click(xpathInsertButton);

      // Create new role group
      prepElem(this, xpathNameMugenRoleGroups)
        .setValue(xpathNameMugenRoleGroups, mapFeatureTable.rows[0].RoleGroup)
        .submitForm(xpathRoleGroupsForm)
        ;

      //  Get to the user management page
      var routeUserMgmnt = url.resolve(process.env.HOST, urlUserMgmnt);  // process.env.HOST always points to the mirror
//      console.log("routeUserMgmnt ? " + routeUserMgmnt);
      this.browser
        .url(routeUserMgmnt)
//        .saveScreenshot('/home/yourself/Pictures/userPage.png')
        ;

      // Open user creation form
      prepElem(this, xpathInsertButton)
        .click(xpathInsertButton);

      // Create new user
      prepElem(this, xpathSubmitButton)
        .setValue(mapFeatureTable.columns.Email.xpath, mapFeatureTable.rows[0].Email)
        .setValue(mapFeatureTable.columns.Password.xpath, mapFeatureTable.rows[0].Password)
        .setValue(mapFeatureTable.columns.Name.xpath, mapFeatureTable.rows[0].Name)
        .selectByVisibleText(mapFeatureTable.columns.RoleGroup.xpath, mapFeatureTable.rows[0].RoleGroup)
        .click(xpathSubmitButton)
        ;

      callback();
    });


    /*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */
    /*                                                                           */
    /*  I give the "a role" "a privilege" authority over the "???" collection    */
    /*                                                                           */
    /*                                                                           */
    this.When(/^I give the "([^"]*)" "([^"]*)" authority over the "([^"]*)" collection$/
             , function (role, privilege, collection, callback) {

      var that = this;
      var xpathRoleGroupsChooser = '//*[@id="mugenRoleGroupId"]';
      var xpathRoleCollectionChooser = '//*[@id="mugenRoleCollectionId"]';
      var xpathBtnSearch = '//*[@id="btnSearchManage"]';
      var xpathActioName = '//*[@id="name"]';
      var xpathBtnInsert = '//*[@id="btnInsertManage"]';

      this.browser
        .url(url.resolve(process.env.HOST, '/mugenRoleActions/manage'), function (collection, callback) {
//             that.browser.saveScreenshot('/home/yourself/Pictures/manageRoleActions.png');
        })
        .waitForExist(xpathBtnSearch, 5000)
        .selectByVisibleText(xpathRoleGroupsChooser, role)
        .selectByVisibleText(xpathRoleCollectionChooser, collection)
        .click(xpathBtnSearch)
        .setValue(xpathActioName, privilege)
        .click(xpathBtnInsert)
//        .saveScreenshot('/home/yourself/Pictures/chosenRoleActions.png')

      callback();
    });

    /*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */
    /*                                                           */
    /*        Then logged in as "bob@meteoris.me" with           */
    /*  password "bob123" I can open the "jobs" management page  */
    /*                                                           */
    /*                                                           */
    this.Then(/^logged in as "([^"]*)" with uid "([^"]*)" and password "([^"]*)" I can open the "([^"]*)" management page$/
      , function (name, user, pwd, collection, callback) {
      seqLogin(this, callback, user, pwd, name);
      this.browser
        .url(url.resolve(process.env.HOST, "/" + collection)) // process.env.HOST always points to the mirror
//        .saveScreenshot('/home/yourself/Pictures/jobs.png')

      callback();
    });

    /*   --------------------------------------------------------*/
    /*          Helper functions                                 */
    /*   --------------------------------------------------------*/

    function failedTest(idxRow, next) {
      next.fail('Tried to write to a nonexistent row : ' + idxRow);
    };

    function processTableRow(table, idxRow, this_) {
      var titles = collectTitles(table);
      var body = table.hashes();
      var idxCol = 0;

      while ( idxCol < titles.length ) {

        // The field type handler is mapped to the field title
        hndlrFieldType[mapField[titles[idxCol]]](
            this_
          , crudssTableCellSelector(idxRow + 1, idxCol + 1)  //  xpath_
          , body[idxRow][titles[idxCol]]                     //  value_
        );
        idxCol++;
      };
    };

    function seqLogin(this_, callback_, uid, pwd, name) {

      var urlLogin = '/users/login';
      var routeLogin = url.resolve(process.env.HOST, urlLogin);  // process.env.HOST always points to the mirror
//      console.log("Login route ? " + routeLogin);
      this_.browser.url(routeLogin);

      var xpathFldEmail = '//*[@id="email"]';
      var xpathFldPwd = '//*[@id="password"]';

      var xpathLoginBtn = '//input[@value="Log In"]';

      var xpathHrefUID = '//a[text()="' + name + '"]';

      this_.browser
        .waitForExist(xpathFldEmail, 5000)
        .waitForVisible(xpathFldEmail, 5000)
        .waitForEnabled(xpathFldEmail, 5000)
        .setValue(xpathFldEmail, uid)
        .setValue(xpathFldPwd, pwd)
        .click(xpathLoginBtn)
        .waitForExist(xpathHrefUID, 5000)
        .waitForVisible(xpathHrefUID, 5000)

    }
    /*   --------------------------------------------------------*/


  };
})();

function characterizeFeatureTable(table_) {

  var mapTable = {};
  var mapColumns = {
      Name :      {type: 'StringInput', xpath: '//*[@id="name"]'}
    , Password :  {type: 'StringInput', xpath: '//*[@id="password"]'}
    , RoleGroup : {type: 'DropDown',    xpath: '//*[@id="mugenRoleGroupId"]'}
    , Email :     {type: 'StringInput', xpath: '//*[@id="email"]'}
  };
  mapTable.columns = mapColumns;
  mapTable.rows = table_.hashes();
  return mapTable;

};

function prepElem(this_, selector) {
  return this_.browser.waitForExist(selector, 5000).waitForVisible(selector);
};

function processNextRowIfValid(this_, featureTable, idxRow, processRow, workflowNext, giveUp) {

  var lastRow = featureTable.raw().length - 2;
  var xpathButtonsCell = crudssTableCellSelector(idxRow + 1, 7) + "/a[text()='Add']";

  this_.browser.isExisting(xpathButtonsCell, function (err, isExisting) {
    if (isExisting) {
//      console.log("We can process this row.  It has an 'Add' button.");
      processRow(featureTable, idxRow, this_);
      if (idxRow < lastRow) {
        console.log("Adding a new table row");
        this_.browser.click(xpathButtonsCell);
      }
    } else {
      console.log("No 'Add' button found :: " + xpathButtonsCell);
      giveUp(idxRow, workflowNext);
    }
  });
  if ( idxRow > 0) return false;
  return true;
}

function crudssTableCellSelector(row, col) {
  return tableCellSelector(crudssTableCellSelectorParts, row, col);
};

var crudssTableCellSelectorParts = {
    L : '//*[@id="mugenGenerator_form"]/table[1]/tbody/tr['
  , M : ']/td['
  , R : ']'
};

function tableCellSelector(selector, row, col) {
  return selector.L + row + selector.M + col + selector.R;
};

function collectTitles(table) {
  var titles = table.raw()[0];
  var titlesIndex = [];
  for (var idx = 0; idx < titles.length; idx++) {
    titlesIndex[idx] = titles[idx];
  };
  return titlesIndex;
};


mapField = {
    Name: "StringInput"
  , Required: "CheckBox"
  , Type: "DropDown"
  , Label: "StringInput"
  , isOf: "StringInput"
  , FK: "StringInput"
};

hndlrFieldType = {
    StringInput : function setAsStringInput(this_, xpath_, strng_) {
      if (strng_ != "null") {
        var xpath = xpath_ + "/input";
//        console.log("Set string input " + xpath + " to " + strng_);

        prepElem(this_, xpath)
          .setValue(xpath, strng_, function (err, value) {
        });

      }
    }
  , CheckBox : function setAsCheckBox(this_, xpath_, value_) {
      if (value_ === "required") {

        var xpath = xpath_ + "/input";
//        console.log("Set check box " + xpath + " to true");
        prepElem(this_, xpath_)
          .isSelected(xpath, function (err, isSelected) {
//          console.log("Is checked " + isSelected);
          this_.browser.click(xpath);
        });

      }
    }
  , DropDown : function setAsCheckBox(this_, xpath_, value_) {
      if (value_ != "null") {

        var xpath = xpath_ + "/select"
//        console.log("Set drop down " + xpath + " to " + value_);
        prepElem(this_, xpath_).selectByValue(xpath, value_);

      }
    }
};

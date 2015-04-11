(function () {

  'use strict';

  module.exports = function () {

    // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
    var url = require('url');

    /*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */
    /*                                                           */
    /*          I am on the CRUDSS generator page : mugen        */
    /*                                                           */
    /*                                                           */
    this.Given(/^I am on the CRUDSS generator page : "([^"]*)"$/, function (relativePath, callback) {

      this.browser
        .url(url.resolve(process.env.HOST, relativePath)) // process.env.HOST always points to the mirror
        .call(callback);

    });


    /*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */
    /*                                                           */
    /*          I name my new collection "jobs"                  */
    /*                                                           */
    /*                                                           */
    this.When(/^I name my new collection "([^"]*)"$/, function (nameCollection, callback) {
      
      var fldCollectionName = '//*[@id="collection"]';
      prepElem(this, fldCollectionName)
        .setValue(fldCollectionName, nameCollection)
        .call(callback);

    });


    /*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */
    /*                                                           */
    /*          I add the table                                  */
    /*                                                           */
    /*                                                           */
   this.When(/^I add the table :$/, function (featureTable, callback) {

      console.log("Applying gherkin table");
      var funcColumnSetter = null;
      var idxRow = 0;

      for (var idxRow = 0; idxRow < featureTable.raw().length - 1; idxRow++) {
        processNextRowIfValid(this, featureTable, idxRow, processTableRow, callback, failedTest);
      };

      /*****************/
//      callback();  // Handled inside  processNextRowIfValid
    });


    /*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */
    /*                                                           */
    /*          I generate the new collection                    */
    /*                                                           */
    /*                                                           */
    this.When(/^I generate the new collection$/, function (callback) {

      console.log("Submitting the form");
      var xpathCRUDSSForm = '//*[@id="posts_form"]';
      var xpathBtnConfirm = '.confirm';
      this.browser.saveScreenshot('/home/yourself/Pictures/lastTestRun_A.png'); 
      var that = this;
      this.browser
        .submitForm(xpathCRUDSSForm, function (err, submitForm) {
          console.log(" . . . . . . ");
          console.log(err);
          console.log(submitForm);
          console.log("Should be submitting now from : " + xpathCRUDSSForm);

          that.browser.saveScreenshot('/home/yourself/Pictures/lastTestRun_B.png');
          prepElem(that, xpathBtnConfirm)
            .click(xpathBtnConfirm, function(err) {
              console.log(" Confirmed ");
              console.log(err);
              that.browser.saveScreenshot('/home/yourself/Pictures/lastTestRun_C.png');
            });
          callback();
        });
        
    });

    this.Then(/^I can open the "([^"]*)" manager's index page$/, function (nameCollection, callback) {
      console.log(" Got : " + nameCollection);
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

    /*   --------------------------------------------------------*/

  };

})();


function prepElem(this_, selector) {
  return this_.browser.waitForExist(selector, 5000).waitForVisible(selector);
};

function processNextRowIfValid(this_, featureTable, idxRow, processRow, workflowNext, giveUp) {

  var lastRow = featureTable.raw().length - 2;
  var xpathButtonsCell = crudssTableCellSelector(idxRow + 1, 7) + "/a[text()='Add']";
  console.log(" ++++++ Checking " + xpathButtonsCell);
  this_.browser.isExisting(xpathButtonsCell, function (err, isExisting) {
    if (isExisting) {
      console.log("We can process this row.  It has an 'Add' button.");
      processRow(featureTable, idxRow, this_);
      if (idxRow < lastRow) {
        console.log("|''''''''''''  ADD A NEW LINE NOW  '''''''''''|");
        this_.browser.click(xpathButtonsCell);
        console.log("|''''''''''''        ADDED         '''''''''''|");
      } else {
        workflowNext();
      }
    } else {
      console.log("No 'Add' button found ");
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
    L : '//*[@id="posts_form"]/table[1]/tbody/tr['
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
        var xpath = xpath_ + "/input"
        console.log("Set string input " + xpath + " to " + strng_);

        prepElem(this_, xpath)
          .setValue(xpath, strng_, function (err, value) {
//          console.log("Have set string input " + xpath + " to " + value);
        });

      }
    }
  , CheckBox : function setAsCheckBox(this_, xpath_, value_) {
      if (value_ === "required") {

        var xpath = xpath_ + "/input"
        console.log("Set check box " + xpath + " to true");
        prepElem(this_, xpath_)
          .isSelected(xpath, function (err, isSelected) {
          console.log("Is checked " + isSelected);
          this_.browser.click(xpath);
        });

      }
    }
  , DropDown : function setAsCheckBox(this_, xpath_, value_) {
      if (value_ != "null") {

        var xpath = xpath_ + "/select"
        console.log("Set drop down " + xpath + " to " + value_);
        prepElem(this_, xpath_).selectByValue(xpath, value_);

      }
    }
};


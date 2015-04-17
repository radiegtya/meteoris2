(function () {

  'use strict';

  if (Meteor.isServer) {

    var _dummy = function () {
      console.log("Dummy function for preparing data.")
    };

    Meteor.methods({
      '/fixtures/dummy': function () {
        _dummy();
      }
    });

  }

})();

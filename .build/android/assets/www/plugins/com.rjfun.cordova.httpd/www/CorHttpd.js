cordova.define("com.rjfun.cordova.httpd.CorHttpd", function(require, exports, module) { 
var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var corhttpd_exports = {};

corhttpd_exports.startServer = function(options, success, error) {
	  var defaults = {
			    'www_root': '',
			    'port': 8888,
          'cordovajs_root': null
			  };
	  
	  // Merge optional settings into defaults.
	  for (var key in defaults) {
	    if (typeof options[key] !== 'undefined') {
	      defaults[key] = options[key];
	    }
	  }
			  
  exec(success, error, "CorHttpd", "startServer", [ defaults['www_root'], defaults['port'], defaults['cordovajs_root'] ]);
};

corhttpd_exports.stopServer = function(success, error) {
	  exec(success, error, "CorHttpd", "stopServer", []);
};

corhttpd_exports.getURL = function(success, error) {
	  exec(success, error, "CorHttpd", "getURL", []);
};

corhttpd_exports.getLocalPath = function(success, error) {
	  exec(success, error, "CorHttpd", "getLocalPath", []);
};

corhttpd_exports.getCordovajsRoot = function(success, error) {
	  exec(success, error, "CorHttpd", "getCordovajsRoot", []);
};

module.exports = corhttpd_exports;


});

/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

/**
 * Edit this class value as you need
 */
App = {
    name: "Meteoris",
    version: "0.2.1",
    baseUrl: "http://192.168.1.168:3000"
};


/**
 * Don't edit this if you don't know what exactly are you doing 
 */
UI.registerHelper('app', function(option, value) {
    return App[option];
});
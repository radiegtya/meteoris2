/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

PiyikuFlash = {
    isOpened: false,
    state: 'success',
    message: 'success',
    deps: new Tracker.Dependency,
    setIsOpened: function(isOpened) {
        this.isOpened = isOpened;
        this.deps.changed();
    },
    setState: function(state) {
        this.state = state;
        this.deps.changed();
    },
    setMessage: function(message) {
        this.message = message;
        this.deps.changed();
    },
    getIsOpened: function() {
        this.deps.depend();
        return this.isOpened;
    },
    getState: function() {
        this.deps.depend();
        return this.state;
    },
    getMessage: function() {
        this.deps.depend();
        return this.message;
    },
    set: function(state, message) {
        PiyikuFlash.setState(state);
        PiyikuFlash.setMessage(message);
        PiyikuFlash.setIsOpened(true);
        
        Meteor.setTimeout(function() {
            PiyikuFlash.setIsOpened(false);
        }, 4000);
    }
};

Template.piyikuFlash.helpers({
    isOpened: function() {
        if (PiyikuFlash.getIsOpened()) {
            return true;
        } else
            return false;
    },
    state: function() {
        return PiyikuFlash.getState();
    },
    message: function() {
        return PiyikuFlash.getMessage();
    }
});

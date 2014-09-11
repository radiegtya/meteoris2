/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

WidgetFlashMessage = {
    isOpened: false,
    state: 'success',
    message: 'success',
    deps: new Deps.Dependency,
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
    run: function(state, message) {
        WidgetFlashMessage.setState(state);
        WidgetFlashMessage.setMessage(message);
        WidgetFlashMessage.setIsOpened(true);
        
        Meteor.setTimeout(function() {
            WidgetFlashMessage.setIsOpened(false);
        }, 4000);
    }
};

Template.widgetFlashMessage.helpers({
    isOpened: function() {
        if (WidgetFlashMessage.getIsOpened()) {
            return true;
        } else
            return false;
    },
    state: function() {
        return WidgetFlashMessage.getState();
    },
    message: function() {
        return WidgetFlashMessage.getMessage();
    }
});

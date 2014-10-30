//activate groundDB for users collection to work offline
GroundDB(Meteor.users);

/* register helper for default relations */
UI.registerHelper('createdUser', function() {
    return Meteor.users.findOne(this.createdUserId);
});
UI.registerHelper('updatedUser', function() {
    return Meteor.users.findOne(this.updatedUserId);
});
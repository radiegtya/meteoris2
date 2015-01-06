//activate groundDB for users collection to work offline
//GroundDB(Meteor.users);

Meteor.users.helpers({
    mugenRoleGroup: function() {
        return MugenRoleGroups.findOne(this.profile.mugenRoleGroupId);
    },
});

Meteor.users.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'users', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'users', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'users', 'remove');
        return result;
    },
});
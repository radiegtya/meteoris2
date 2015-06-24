Template.users_form.helpers({    
    mugenRoleGroups: function(){
        return MugenRoleGroups.find({}, {sort: {name: 1}});
    }
});
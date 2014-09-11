Meteor.publishComposite('users', function(id) {
    console.log('subscribing some Users');
    return {
        find: function() {
            return Meteor.users.find(id);
        },
        children: [
//            /* return all related Jobs in HRM module */
//            {
//                find: function(collection) {
//                    return Hrm.Jobs.find({_id: collection.profile.hrm_jobId});
//                }
//            },
        ],
    }
});

Meteor.methods({
    siteRegisterUser: function(doc) {
        console.log('Register an user');
        validateParams(doc);
        Accounts.createUser(doc);
        return true;
    },
    usersUpdate: function(id, doc) {
        if (checkAuth('users', 'update')) {
            console.log('updating user');
            validateParams(doc);
            Meteor.users.update(id, {$set: doc});
            return true;
        } else {
            throw new Meteor.Error('Anda tidak mempunyai hak akses');
        }
    },
    usersRemove: function(id) {
        if (checkAuth('users', 'remove')) {
            console.log('removing user');
            Meteor.users.remove(id);
            return true;
        } else {
            throw new Meteor.Error('Anda tidak mempunyai hak akses');
        }
    },
});


function validateParams(params) {
    for (var key in params) {
        if (key == "profile") {
            for (var keyProfile in params[key]) {
                value = params[key][keyProfile];
                console.log(value);
                if (value == "") {
                    throw new Meteor.Error('Please enter your ' + keyProfile, keyProfile);
                }
            }
        } else if (key == "email") {
            value = params[key];
            if (!validateEmail(value))
                throw new Meteor.Error('Please format email ' + key, key);

        } else {
            value = params[key];
            console.log(value);
            if (value == "")
                throw new Meteor.Error('Please enter your ' + key, key);
        }
    }

}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
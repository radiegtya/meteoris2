Meteor.publishComposite('users', function(doc) {
    console.log('subscribing some Users');
    return {
        find: function() {
            return Meteor.users.find(doc);
        },
        children: [
        ],
    }
});

Meteor.methods({
    'Users.insert': function(doc) {
        validateParams(doc);
        Accounts.createUser(doc);
        return true;
    },
});


function validateParams(params) {
    for (var key in params) {
        if (key == "profile") {
            for (var keyProfile in params[key]) {
                value = params[key][keyProfile];
//                console.log("UsersServer.js " + value);
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
//            console.log("UsersServer.js " + value);
            if (value == "")
                throw new Meteor.Error('Please enter your ' + key, key);
        }
    }

}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function get_visitor_ip(uid) {
    var k, ret, s, ss, _ref, _ref1, _ref2, _ref3;
    ret = {};
    if (uid != null) {
        _ref = Meteor.default_server.sessions;
        for (k in _ref) {
            ss = _ref[k];
            if (ss.userId === uid) {
                s = ss;
            }
        }
        if (s) {
            ret.forwardedFor = (_ref1 = s.socket) != null ? (_ref2 = _ref1.headers) != null ? _ref2['x-forwarded-for'] :
                    void 0 :
                    void 0;
            ret.remoteAddress = (_ref3 = s.socket) != null ? _ref3.remoteAddress :
                    void 0;
        }
    }
    return ret.forwardedFor ? ret.forwardedFor : ret.remoteAddress;
}

/* auto insert into Meteor.users "@" and "admin" when collection still empty */
Meteor.startup(function() {
    var users = Meteor.users.find();
    if (users.count() == 0) {
        Accounts.createUser({
            email: "admin@meteoris.me",
            password: "admin",
            profile:{
                name: "admin",
                mugenRoleGroupId: "1"
            }
        });
        Accounts.createUser({
            email: "demo@meteoris.me",
            password: "demo",
            profile:{
                name: "demo",
                mugenRoleGroupId: "2"
            }
        });
    }
});

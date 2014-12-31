Template.mugen_form.rendered = function() {

};

Template.mugen_form.helpers({
});

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

Template.mugen_form.events = {
    'keyup #collection': function(e) {
        var collection = $(e.target).val();
        $(e.target).val(collection.toLowerCase());
    },
    'click .btnAddField': function(e) {
        e.preventDefault();
        var html = $('.collectionFields tr:first-child').html();
        html = '<tr>' + html + '</tr>';
        $('.collectionFields').append(html);
    },
    'click .btnDeleteField': function(e) {
        e.preventDefault();
        $(e.target).parent().parent().remove();
    },
    'click #btnSave': function(e, t) {
        e.preventDefault();
        var collection = t.find('#collection').value;
        var names = $('.names').map(function() {
            return $(this).val();
        }).get();
        var types = $('.types').map(function() {
            return $(this).val();
        }).get();
        var labels = $('.labels').map(function() {
            return $(this).val();
        }).get();
        var belongToCollections = $('.belongToCollections').map(function() {
            return $(this).val();
        }).get();
        var relationKeys = $('.relationKeys').map(function() {
            return $(this).val();
        }).get();
        var isRequireds = $('.isRequireds');


        //check whether collection cannot be empty
        if (!collection || collection == "") {
            var errMessage = "Collection is required";
            MeteorisFlash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        }

        //regex match collection to avoid field break generate
        var collectionMatch = collection.match(/^[a-z0-9A-Z_]{3,15}$/);
        if (!collectionMatch) {
            var errMessage = "Collection name can't contain any of the following characters \ / : * ? < > |";
            MeteorisFlash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        }

        //check all field before insert, avoid blank field
        for (i = 0; i < names.length; i++) {
            var name = names[i];
            var type = types[i];
            var belongToCollection = belongToCollections[i];
            var relationKey = relationKeys[i];

            if (name == null || name == "") {
                var errMessage = "Field (" + (i + 1) + ") Name is required.";
                MeteorisFlash.set('danger', errMessage);
                throw new Meteor.Error(errMessage);
            }

            if (type == null || type == "") {
                var errMessage = "Field (" + (i + 1) + ") Type is required.";
                MeteorisFlash.set('danger', errMessage);
                throw new Meteor.Error(errMessage);
            }

            if (belongToCollection != "" && relationKey == "" || belongToCollection == "" && relationKey != "") {
                var errMessage = "Field (" + (i + 1) + "), error. Please fill both Belongs to Collection and Relation Key.";
                MeteorisFlash.set('danger', errMessage);
                throw new Meteor.Error(errMessage);
            }
        }

        //push all validated field to fieldsArray
        var fields = [];
        for (i = 0; i < names.length; i++) {
            var name = names[i];
            var type = types[i];
            var label = labels[i] ? labels[i] : toTitleCase(names[i]);
            var belongToCollection = belongToCollections[i];
            var relationKey = relationKeys[i];
            var isRequired = isRequireds[i].checked ? true : false;

            //regex match name to avoid field break generate
            var nameMatch = name.match(/^[a-z0-9A-Z_]{3,15}$/);
            if (!nameMatch) {
                var errMessage = "Field Name can't contain any of the following characters \ / : * ? < > |";
                MeteorisFlash.set('danger', errMessage);
                throw new Meteor.Error(errMessage);
            }

            fields.push({
                name: name,
                type: type,
                label: label,
                isRequired: isRequired,
                belongToCollection: belongToCollection,
                relationKey: relationKey,
            });
        }

        Meteor.call("Mugen.generateAll", collection, fields, function(err) {
            if (err)
                MeteorisFlash.set('danger', err.reason);
            else {
                MeteorisFlash.set('success', 'Success generating code!');
                Router.go('mugen');
            }
        });
    },
};
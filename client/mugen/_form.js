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
        var isRequireds = $('.isRequireds');


        //check whether collection cannot be empty
        if (!collection || collection == "") {
            var errMessage = "Collection is required";
            MeteorisFlash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        }
        //check whether names cannot be empty
        if (names.length < 1 || names[0] == "") {
            var errMessage = "Field Name is required";
            MeteorisFlash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        }
        //check whether types cannot be empty
        if (types.length < 1 || types[0] == "") {
            var errMessage = "Field Type is required";
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

        var fields = [];
        for (i = 0; i < names.length; i++) {
            var name = names[i];
            var type = types[i];
            var label = labels[i] ? labels[i] : toTitleCase(names[i]);
            var isRequired = isRequireds[i].checked ? true : false;

            //regex match name to avoid field break generate
            var nameMatch = name.match(/^[a-z0-9A-Z_]{3,15}$/);
            if (!nameMatch) {
                var errMessage = "Field name can't contain any of the following characters \ / : * ? < > |";
                MeteorisFlash.set('danger', errMessage);
                throw new Meteor.Error(errMessage);
            }

            fields.push({
                name: name,
                type: type,
                label: label,
                isRequired: isRequired
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
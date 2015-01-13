String.prototype.toCollectionCase = function() {
    var words = this.split(' ');
    var results = [];
    for (var i = 0; i < words.length; i++) {
        var letter = words[i].charAt(0).toLowerCase();
        results.push(letter + words[i].slice(1));
    }
    return results.join(' ');
};

String.prototype.toProperCase = function() {
    var words = this.split(' ');
    var results = [];
    for (var i = 0; i < words.length; i++) {
        var letter = words[i].charAt(0).toUpperCase();
        results.push(letter + words[i].slice(1));
    }
    return results.join(' ');
};

Template.mugen_form.events = {
    'keyup #collection': function(e) {
        var collection = $(e.target).val();
        $(e.target).val(collection.toCollectionCase());

        $('#generatedRoutersPath').text("client/routers/" + collection.toCollectionCase() + ".js");
        $('#generatedViewsPath').text("client/views/" + collection.toCollectionCase() + "/*");
        $('#generatedCollectionsPath').text("lib/collections/" + collection.toProperCase() + ".js");
        $('#generatedControllersPath').text("lib/controllers/" + collection.toProperCase() + ".js");
        $('#generatedServerPath').text("server/" + collection.toProperCase() + ".js");
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
    /* check all checkbox */
    'change #checkAll': function(e) {
        e.preventDefault();
        var checkboxes = $('.checkAll');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = e.target.checked;
        }
    },
    'click #btnSave': function(e, t) {
        e.preventDefault();
        var checkboxes = $('.checkAll');
        if (confirm("Are you sure want to generate your code with this data?")) {
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
            var collectionMatch = collection.match(/^[a-z0-9A-Z_]{2,30}$/);
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
                var label = labels[i] ? labels[i] : names[i].toProperCase();
                var belongToCollection = belongToCollections[i];
                var relationKey = relationKeys[i];
                var isRequired = isRequireds[i].checked ? true : false;

                //regex match name to avoid field break generate
                var nameMatch = name.match(/^[a-z0-9A-Z_]{2,30}$/);
                if (!nameMatch) {
                    var errMessage = "Field (" + (i + 1) + ") Name can't contain any of the following characters \ / : * ? < > |";
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

            //insert into mugenRoleCollections & mugenRoleActions automatically
            Meteor.call('MugenRoleCollections.autoInsert', {name: collection}, function(err) {
                if (err)
                    MeteorisFlash.set('danger', err.reason);
            });

            // loop over generated check lists
            for (var i = 0; i < checkboxes.length; i++) {
                // And stick the checked ones onto an array...
                if (checkboxes[i].checked) {
                    var checkedGeneratedList = $(checkboxes[i]).val();
                    if (checkedGeneratedList == 'routers') {
                        Meteor.call("Mugen.generateRouter", collection, function(err) {
                            if (err)
                                MeteorisFlash.set('danger', err.reason);
                        });
                    } else if (checkedGeneratedList == 'views') {
                        Meteor.call("Mugen.generateView", collection, fields, function(err) {
                            if (err)
                                MeteorisFlash.set('danger', err.reason);
                        });
                    } else if (checkedGeneratedList == 'collections') {
                        Meteor.call("Mugen.generateCollection", collection, fields, function(err) {
                            if (err)
                                MeteorisFlash.set('danger', err.reason);
                        });
                    } else if (checkedGeneratedList == 'controllers') {
                        Meteor.call("Mugen.generateController", collection, fields, function(err) {
                            if (err)
                                MeteorisFlash.set('danger', err.reason);
                        });
                    } else if (checkedGeneratedList == 'server') {
                        Meteor.call("Mugen.generateServer", collection, fields, function(err) {
                            if (err)
                                MeteorisFlash.set('danger', err.reason);
                        });
                    }
                }
            }
            MeteorisFlash.set('success', 'Success generating code!');
        }
    },
};
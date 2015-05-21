function advisePaths (collection, nameNameSpace) {

    if ( typeof    collection == "undefined" |    collection.length < 1)     collection = "{collection}";
    if ( typeof nameNameSpace == "undefined" | nameNameSpace.length < 1)  nameNameSpace = "{nameSpace}";
//    var pathPkg = "packages/" + collection + "/";

    $(    '#generatedRoutersPath').text(MugenUtils.preparePath(      "router", collection));
    $(      '#generatedViewsPath').text(MugenUtils.preparePath(       "views", collection));
    $('#generatedCollectionsPath').text(MugenUtils.preparePath( "collections", collection));
    $('#generatedControllersPath').text(MugenUtils.preparePath( "controllers", collection));
    $(     '#generatedServerPath').text(MugenUtils.preparePath(      "server", collection));
    $(    '#generatedPackagePath').text(MugenUtils.preparePath(     "package", collection));
    $(          '#installPackage').html("<i>Install new meteor package " 
                                      + MugenUtils.preparePath(     "install", collection, null, nameNameSpace) + "</i>");

};

Template.mugen_form.events = {
    'keyup #nameNameSpace': function(e) {
        var nameNameSpace = $(e.target).val();
        $(e.target).val(nameNameSpace);
        var collection = $('#collection').val();

        advisePaths (collection, nameNameSpace);
    },
    'keyup #collection': function(e) {
        var collection = $(e.target).val();
        $(e.target).val(collection.toCollectionCase());
        var nameNameSpace = $('#nameNameSpace').val()

        advisePaths (collection, nameNameSpace);
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
//    'click #btnSave': function(e, t) {      //  Handling click, rather than submit, makes
    'submit #mugenGenerator_form': function(e, t) {    //  integration testing very difficult

        e.preventDefault();
        var checkboxes = $('.checkAll');

        var id = this._id;
        MeteorisAlert.confirm("overwrite_ok", function() {
                var nameNameSpace = t.find('#nameNameSpace').value;
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

                //check if nameNameSpace is empty
                if (!nameNameSpace || nameNameSpace == "") {
                    var errMessage = TAPi18n.__("namespace_required", "");
                    MeteorisFlash.set('danger', errMessage);
                    throw new Meteor.Error(errMessage);
                }

                //regex match nameNameSpace to avoid control characters
                var nameNameSpaceMatch = nameNameSpace.match(/^[a-z][a-z0-9]{2,16}$/);
                if (!nameNameSpaceMatch) {
                    var errMessage = TAPi18n.__("namespace_syntax", "");
                    MeteorisFlash.set('danger', errMessage);
                    throw new Meteor.Error(errMessage);
                }

                //check if collection is empty
                if (!collection || collection == "") {
                    var errMessage = TAPi18n.__("collection_required", "");
                    MeteorisFlash.set('danger', errMessage);
                    throw new Meteor.Error(errMessage);
                }

                //regex match collection to avoid control characters
                var collectionMatch = collection.match(/^[a-z][a-z0-9]{2,30}$/);
                if (!collectionMatch) {
                    var errMessage = TAPi18n.__("collection_name_syntax", "");
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


                if (false) {
                    Meteor.call("Mugen.testMe", "dir_pkg", collection, function(err) {
                        if (err)
                            MeteorisFlash.set('danger', err.reason);
                    });
                } else {
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
                            } else if (checkedGeneratedList == 'package') {
                                Meteor.call("Mugen.generatePackage", collection, nameNameSpace, function(err) {
                                    if (err)
                                        MeteorisFlash.set('danger', err.reason);
                                });
                            } else if (checkedGeneratedList == 'install') {
                                Meteor.call("Mugen.installPackage", collection, nameNameSpace, function(err) {
                                    if (err)
                                        MeteorisFlash.set('danger', err.reason);
                                });
                            }
                        }
                    }
                }

                MeteorisFlash.set('success', TAPi18n.__("generate_success", ""));
        })
    },
};

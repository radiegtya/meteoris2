Template.usersIndex.helpers({

});

Template.usersIndex.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        var recordId = this._id;
        MeteorisAlert.confirm("confirm_remove", function() {
            Router.current().remove(recordId);
        });
    },
    /* sorting by parameter */
    'click #btnSortEmail': function(e) {
        MeteorisGridView.sort('emails.address');
    },
    /* sorting by parameter */
    'click #btnSortName': function(e) {
        MeteorisGridView.sort('profile.name');
    },
    'keyup #search': function(e, t) {
        e.preventDefault();
        Router.current().search(t);        
    },
    /* check all checkbox */
    'change #checkAll': function(e) {
        e.preventDefault();
        var checkboxes = $('.checkAll');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = e.target.checked;
        }
    },
    /* remove all selected item */
    'click #btnRemoveAll': function(e) {
        e.preventDefault();
        var checkboxes = $('.checkAll');
        var checkedLength = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkedLength++;
            }
        }

        if (checkedLength > 0) {

            MeteorisAlert.confirm("confirm_remove", function() {
                // loop over them all
                for (var i = 0; i < checkboxes.length; i++) {
                    // And stick the checked ones onto an array...
                    if (checkboxes[i].checked) {
                        Router.current().remove($(checkboxes[i]).val());
                    }
                }
            }, {count:checkedLength});

        } else {
            MeteorisFlash.set('danger', TAPi18n.__("No rows selected", "") + ".");
        }

        //set checkAll header to uncheck
        $('#checkAll').attr("checked", false);
    },
};
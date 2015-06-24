Template.mugenRoleActionsIndex.helpers({
});

Template.mugenRoleActionsIndex.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        var recordId = this._id;
        MeteorisAlert.confirm("confirm_remove", function() {
            Router.current().remove(recordId);
        });
    },
    /* sorting by parameter */
    'click #btnSortname': function(e) {
        MeteorisGridView.sort('name');
    },
    /* sorting by parameter */
    'click #btnSortmugenRoleGroupId': function(e) {
        MeteorisGridView.sort('mugenRoleGroupId');
    },
    /* sorting by parameter */
    'click #btnSortmugenRoleCollectionId': function(e) {
        MeteorisGridView.sort('mugenRoleCollectionId');
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
            MeteorisFlash.set('danger', 'Please Select Some data which You Want to Remove');
        }

        //set checkAll header to uncheck
        $('#checkAll').attr("checked", false);
    },
};
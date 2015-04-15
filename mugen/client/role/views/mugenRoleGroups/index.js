Template.mugenRoleGroupsIndex.helpers({
});

Template.mugenRoleGroupsIndex.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        var it = this._id;
        standardConfirmDialog.text = "Are you sure want to remove this role group?";
        swal(
            standardConfirmDialog
          , function () {
            Router.current().remove(it);
        });

    },
    /* sorting by parameter */
    'click #btnSortname': function(e) {
        MeteorisGridView.sort('name');
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

            standardConfirmDialog.text = "Are you sure want to remove \n"
              + ((checkedLength == 1)
                   ?  "this role group"
                   :  "these " + checkedLength + " role groups")
              + "?";
            swal(
                standardConfirmDialog
              , function () {
                    dropChecked(checkboxes)
            });



        } else {
            MeteorisFlash.set('danger', 'Please Select Some data which You Want to Remove');
        }

        //set checkAll header to uncheck
        $('#checkAll').attr("checked", false);
    },
};

function dropChecked(checkboxes) {

    for (var i = 0; i < checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            Router.current().remove($(checkboxes[i]).val());
        }
    }

};

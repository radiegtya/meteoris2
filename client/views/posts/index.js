Template.postsIndex.helpers({
    /* get btn arrow up or down whether sortOrder desc or asc */
    sortClass: function(by) {
        return WidgetGridView.sortClass(by);
    },
});

Template.postsIndex.events = {
    'click .btnUpdate': function(e, t) {
        e.preventDefault();
        Router.go('postsUpdate', {_id: this._id});
    },
    'click .btnRemove': function(e) {
        e.preventDefault();
        Router.current().remove(this._id);
    },
    /* sorting by parameter */
    'click .btnSortName': function(e) {
        WidgetGridView.sort('name');
    },
};

Template.postsIndex.rendered = function() {

};
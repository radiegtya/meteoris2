Template.frontendPostsIndex.helpers({
    getSomeContent: function() {
        return this.content.length > 300 ? this.content.substr(0, 300) + "..." : this.content;
    },
});

Template.frontendPostsIndex.events = {
    /* sorting by parameter */
    'click #btnSortTitle': function(e) {
        MeteorisGridView.sort('title');
    },
    'keyup #search': function(e, t) {
        e.preventDefault();
        Router.current().search(t);
    },
};
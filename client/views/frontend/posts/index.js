Template.frontend_postsIndex.helpers({
    /* get related imageId from images collection */
    image: function() {
        return Images.findOne(this.imageId);
    },
    /* get related createdUserId from users collection */
    user: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    getSomeContent: function() {
        return this.content.length > 300 ? this.content.substr(0, 300) + "..." : this.content;
    },
});

Template.frontend_postsIndex.events = {
    /* sorting by parameter */
    'click #btnSortTitle': function(e) {
        MeteorisGridView.sort('title');
    },
    'keyup #search': function(e, t) {
        e.preventDefault();
        Router.current().search(t);
    },
};
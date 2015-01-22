Template.comments_form.rendered = function() {

};

Template.comments_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Comments, field);
    },
    positions: function() {
        return Positions.find({}, {sort: {name: 1}});
    },
    provinces: function() {
        return Provinces.find({}, {sort: {name: 1}});
    },
    categories: function() {
        var workshopsCategories = WorkshopsCategories.find({workshopId: Router.current().getId()});
        var orCriteria = [];
        workshopsCategories.forEach(function(obj) {
            orCriteria.push({_id: obj.categoryId});
        });

        if (orCriteria.length > 0)
            return Categories.find({$or: orCriteria}, {sort: {name: 1}});
    },
    speakers: function() {
        var workshopsSpeakers = WorkshopsSpeakers.find({workshopId: Router.current().getId()});
        var orCriteria = [];
        workshopsSpeakers.forEach(function(obj) {
            orCriteria.push({_id: obj.speakerId});
        });

        if (orCriteria.length > 0)
            return Speakers.find({$or: orCriteria}, {sort: {name: 1}});
    },
});
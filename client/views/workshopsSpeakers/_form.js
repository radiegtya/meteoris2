Template.workshopsSpeakers_form.rendered = function() {

};

Template.workshopsSpeakers_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(WorkshopsSpeakers, field);
    },
    speakers: function() {
        return Speakers.find({}, {sort: {name: 1}});
    }
});
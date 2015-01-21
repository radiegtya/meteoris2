Template.speakers_form.rendered = function() {

};

Template.speakers_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Speakers, field);
    },
    positions: function(){
        return Positions.find({}, {sort: {name: 1}});
    }
});
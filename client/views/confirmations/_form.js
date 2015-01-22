Template.confirmations_form.rendered = function() {

};

Template.confirmations_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Confirmations, field);
    },
    positions: function() {
        return Positions.find({}, {sort: {name: 1}});
    },
    provinces: function() {
        return Provinces.find({}, {sort: {name: 1}});
    },
});
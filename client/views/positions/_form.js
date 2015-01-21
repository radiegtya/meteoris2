Template.positions_form.rendered = function(){
    
};

Template.positions_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Positions, field);
    },
});
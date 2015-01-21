Template.confirmations_form.rendered = function(){
    
};

Template.confirmations_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Confirmations, field);
    },
});
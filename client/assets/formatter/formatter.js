PiyikuFormatter = {
    /**
     * Formatting date to desired format, this function needs moment packages     
     */
    date: function(date, format) {
        if (date)
            return moment(date).format(format ? format : 'DD MMM YYYY');
        else
            return "-";
    },
    /**
     * Formatting date to desired format, this function needs moment packages     
     */
    dateTime: function(date, format) {
        if (date)
            return moment(date).format(format ? format : 'DD MMM YYYY HH:mm');
        else
            return "-";
    },
    /**
     * Formatting number to desired format, this function needs accounting packages     
     */
    number: function(value) {
        if (value === 0)
            return 0;
        else if (value < 0) //accounting format when number is negative
            return "(" + accounting.formatMoney(value * -1, "", 2, ".", ",") + ")";
        else if (value)
            return accounting.formatMoney(value, "", 2, ".", ",");
    },
    combodate: function(date) {
        if (date)
            return moment(date).format("YYYY-MM-DD");
        else
            return moment(new Date()).format("YYYY-MM-DD");
    },
    combodateEmpty: function(date) {
        if (date)
            return moment(date).format("YYYY-MM-DD");
    },
};


/**
 * Don't edit this if you don't know what exactly are you doing 
 */
UI.registerHelper('piyikuFormatter', function(option, firstParam) {
    return PiyikuFormatter[option](firstParam);
});
UI.registerHelper('piyikuFormatterDate', function(date, format) {
    return PiyikuFormatter.date(date, format);
});
UI.registerHelper('piyikuFormatterDateTime', function(date, format) {
    return PiyikuFormatter.dateTime(date, format);
});
UI.registerHelper('piyikuFormatterNumber', function(value) {
    return PiyikuFormatter.dateTime(value);
});
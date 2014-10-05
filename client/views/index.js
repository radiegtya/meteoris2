Template.layout.rendered = function() {
    var layout = function() {
        var htmlHeight = $('html').height();
        var navbarHeight = $('.navbar-fixed-top').height();
        var footerHeight = $('.footer').height();
        var contentHeight = htmlHeight - navbarHeight - footerHeight;
        $('aside').css('height', contentHeight);
        $('.main').css('height', contentHeight);
        $('body > .aside-container')
                .css('height', contentHeight)
                .css('margin-top', navbarHeight);
        $('body > .main-container')
                .css('height', contentHeight)
                .css('margin-top', navbarHeight);
        $('.panel-search')
                .css('height', contentHeight)
                .css('margin-top', navbarHeight);
        $('.panel-right')
                .css('height', contentHeight)
                .css('margin-top', navbarHeight);

//        pgsSlimScroll.run('aside, .main');
    };

    layout();

    $(window).resize(function() {
        layout();
    });
};

Template.layout.events = {
    'click .btn-help': function() {
        $('.alert-help, .help-block.info').toggleClass('show');
    }
}
WidgetSearch = {
    content: {},
    deps: new Deps.Dependency,
    set: function(content) {
        this.content = content;
        this.deps.changed();
    },
    get: function() {
        this.deps.depend();
        return this.content;
    },
};
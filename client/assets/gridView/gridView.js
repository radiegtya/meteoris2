/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

MeteorisGridView = {
    deps: new Tracker.Dependency,
    /* ---- sorting ---- */
    sortState: 1,
    sorting: {
        sort: {
            'createdAt': -1
        }
    },
    //used in index js to know current sort order
    getSortOrder: function(by) {
        this.deps.depend();
        return this.sorting.sort[by];
    },
    //set sortBy and sortOrder
    setSorting: function(by, order) {
        //if there is sort by in array then change the order value
        this.sorting.sort[by] = order;
        this.deps.changed();
    },
    //used in controller to get current sorting
    getSorting: function() {
        this.deps.depend();
        return this.sorting;
    },
    //used to sort data by value in index.js, every users click table sorter
    sort: function(by) {
        this.sortState++;
        var sortBy = this.sorting.sort[by];
        this.sorting = {
            sort: {
//                by: sortBy,
            }};

        if (sortBy == -1)
            this.setSorting(by, 1);
        else
            this.setSorting(by, -1);
    },
    sortBy: function(by, order) {
        this.sortState++;
        this.sorting = {
            sort: {
                by: order,
            }};

        this.setSorting(by, order);
    },
    sortClass: function(by) {
        var result = '';
        if (this.sortState == 1)
            result = '';
        else if (this.getSortOrder(by) == -1)
            result = 'desc';
        else
            result = 'asc';
        return result;
    }
};

/**
 * Don't edit this if you don't know what exactly are you doing 
 */
UI.registerHelper('meteorisGridView', function(option, firstParam) {
    return MeteorisGridView[option](firstParam);
});
UI.registerHelper('meteorisGridViewSortClass', function(by) {
    return MeteorisGridView.sortClass(by);
});
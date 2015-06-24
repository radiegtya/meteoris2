String.prototype.toCollectionCase = function() {
    var words = this.split(' ');
    var results = [];
    for (var i = 0; i < words.length; i++) {
        var letter = words[i].charAt(0).toLowerCase();
        results.push(letter + words[i].slice(1));
    }
    return results.join(' ');
};

String.prototype.toProperCase = function() {
    var words = this.split(' ');
    var results = [];
    for (var i = 0; i < words.length; i++) {
        var letter = words[i].charAt(0).toUpperCase();
        results.push(letter + words[i].slice(1));
    }
    return results.join(' ');
};


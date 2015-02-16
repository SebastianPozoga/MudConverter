
function MudPatterns(str) {
    var that;

    that.replace = function(what,to){
        str.replace(what, to);
    }

    that.simpleTag = function(regex, begin, end, bodyProcess){
        str.replace(/(\[)(.*])(\]\()(.*)(\))/g, function(match, open, title, sep1, link, close){
            return '<a href="'+link+'">'+title+'</a>';
        });
    }

    return that;
};

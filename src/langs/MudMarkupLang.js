function MudMarkupLang() {
    var that = {}, processHtml, packToMarkdownBox;

    processHtml = function (nodeInterface, separator) {
        var i1, i2, prefix, tag = nodeInterface.getTagName();

        //<h[1..6]>
        for (i1 = 1; i1 < 7; i1++) {
            if (tag === "h" + i1) {
                prefix = "";
                for (i2 = 0; i2 < i1; i2++) prefix += "#";
                return [prefix + " " + nodeInterface.processChilds().join(separator).replace("\n", " ") + " " + prefix];
            }
        }

        //<hr>
        if (tag === "hr") {
            return ['\n-----\n'];
        }

        //<i>
        if(tag === "i"){
            return [" * " + nodeInterface.processChilds().join(separator) + " * "];
        }

        //<b>
        if(tag === "i"){
            return [" ** " + nodeInterface.processChilds().join(separator) + " ** "];
        }

        //<code>
        if(tag === "code"){
            return [" ` " + nodeInterface.getText() + " ` "];
        }

        //<code>
        if(tag === "code"){
            return [" ` " + nodeInterface.getText() + " ` "];
        }

        return nodeInterface.processChilds(processHtml);
    };

    that.fromHtml = function (xmlStr) {
        var iterator = MudDomIterator(xmlStr);
        return iterator.process(processHtml);
    };

    that.toHtml = function () {

    };

    return that;
}


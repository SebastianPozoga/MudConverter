function MudMarkdownLang() {
    var that = {}, processHtml, processText, packToMarkdownBox;

    //Process HTML (to markdown)
    processHtml = function (nodeInterface, separator) {
        var i1, i2, value, prefix, tag = nodeInterface.getTagName();

        if (tag === "h1") {
            prefix = "";
            value = nodeInterface.processChilds().join(separator).replace("\n", " ");
            for (i1 = 0; i1 < value.length; i1++) prefix += "=";
            return [value + "\n" + prefix];
        }

        if (tag === "h2") {
            prefix = "";
            value = nodeInterface.processChilds().join(separator).replace("\n", " ");
            for (i1 = 0; i1 < value.length; i1++) prefix += "-";
            return [value + "\n" + prefix];
        }

        if (tag === "blockquote" || tag === "q") {
            return ["\n> " + nodeInterface.processChilds().join(separator) + "\n"];
        }

        if (tag === "hr") {
            return ['-----'];
        }

        if (tag === "i") {
            return [" * " + nodeInterface.processChilds().join(separator) + " * "];
        }

        if (tag === "b") {
            return [" ** " + nodeInterface.processChilds().join(separator) + " ** "];
        }

        if (tag === "code") {
            return [" ` " + nodeInterface.getText() + " ` "];
        }

        if (tag === "a") {
            return [" [" + nodeInterface.getText() + "](" + nodeInterface.getAttr("href") + ") "];
        }

        if (tag === "img") {
            return [" !(" + nodeInterface.getAttr("src") + ") "];
        }

        return nodeInterface.processChilds(processHtml);
    };

    that.fromHtml = function (xmlStr) {
        var iterator = MudDomIterator(xmlStr);
        return iterator.process(processHtml);
    };

    //Process markdown (to HTML)

    that.toHtml = function (str) {
        // Link (a)
        str = "\n"+str+"\n";
        return str.replace(/(\[)(.*)(\]\()(.*)(\))/g, function (match, open, title, s1, link, close) {
            return '<a href="' + link + '">' + title + '</a>';
        })
            .replace(/(\!\()(.*)(\))/g, function (match, open, url, close) {
                // Image (img)
                return '<img src="' + url + '" />';
            })
            .replace(/(`)(.*)(`)/g, function (match, open, code, close) {
                // Code (code)
                return '<code>' + code + '</code>';
            })
            .replace(/(\*\*)(.*)(\*\*)/g, function (match, open, text, close) {
                // Bold (b)
                return '<b>' + text + '</b>';
            })
            .replace(/(\*)(.*)(\*)/g, function (match, open, text, close) {
                // Italic (i)
                return '<i>' + text + '</i>';
            })
            .replace(/(\n\n)(\-+)/g, function (match) {
                // Page separator (hr)
                return '<hr />';
            })
            .replace(/(\n\>)(.*)(\n)/g, function (match, open, body, close) {
                // Blockquote/quote (q)
                return '<q>' + body + '</q>';
            })
            .replace(/(\n)(.*)(\n)(\-+)(\n)/g, function (match, n0, text) {
                // Sub-header /(h2)
                return '<h2>' + text + '</h2>';
            })
            .replace(/(\n)(.*)(\n)(\=+)(\n)/g, function (match, n0, text) {
                // Main-header /(h1)
                return '<h1>' + text + '</h1>';
            })
            .replace(/^[\s\n]+/g, "")
            .replace(/[\s\n]+$/g, "");
    };

    return that;
}


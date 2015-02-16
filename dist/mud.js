
function MudDomIterator(strDom) {
    //var(s)
    var defaultPocessFunction, toDom, process, iterateObject, nodeInterface, that = {};
    
    //const(s)
    that.DEFAULT_SEPARATOR = "\n";

    //helpers
    defaultPocessFunction = function(nodeInterface, separator){
        return nodeInterface.processChilds(defaultPocessFunction, separator);
    }

    toDom = function (domStr) {
        //Create dom
        var parseXml, result;
        if (window.DOMParser) {
            parseXml = function (str) {
                return ( new window.DOMParser() ).parseFromString(str, "text/html");
            };
        } else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
            parseXml = function (str) {
                var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = "false";
                xmlDoc.loadXML(str);
                return xmlDoc;
            };
        } else {
            throw "Can not parse xml string: container no support  DOMParser / Microsoft.XMLDOM";
        }
        result = parseXml(domStr);
        if(result.tagName === 'parsererror') {
            throw "No parse dom (you should use xml/xhtml syntax)";
        }
        return result;
    };

    //process
    process = function (processFunction, separator) {
        var i, value, resps = [], currentNode = iterateObject.currentNode;

        //defaults
        separator = separator ? separator : that.DEFAULT_SEPARATOR;
        processFunction = processFunction ? processFunction : defaultPocessFunction;

        //loop
        for (i = 0; i < currentNode.childNodes.length; i++) {
            if (currentNode.childNodes[i].nodeType == 3) {
                resps.push(currentNode.childNodes[i].nodeValue);
                continue;
            }
            if(currentNode.tagName === 'parsererror'){
                //no process dom errors
                continue;
            }
            iterateObject.currentNode = currentNode.childNodes[i];
            value = processFunction(iterateObject.nodeInterface, separator);
            if(value.length>0) resps.push(value.join(separator));
        }
        iterateObject.currentNode = currentNode;
        return resps;
    }

    //nodeInterface
    nodeInterface = {
        getTagName: function () {
            return iterateObject.currentNode.nodeName.toLowerCase();
        },
        getText: function(){
            return iterateObject.currentNode.innerHTML;
        },
        getAttr: function(name){
            return iterateObject.currentNode.getAttribute(name);
        },
        hasClass: function (className) {
            return (' ' + iterateObject.currentNode.className + ' ').indexOf(' ' + className + ' ') > -1;
        },
        processChilds: process
    };

    //iterate object
    iterateObject = {
        currentNode: toDom(strDom),
        nodeInterface: nodeInterface
    };

    //interface
    that.process = function(processFunction, separator){
        return nodeInterface.processChilds(processFunction, separator).join(that.DEFAULT_SEPARATOR);
    };

    return that;
};

;
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

;function MudMarkdownLang() {
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


;function MudMarkupLang() {
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


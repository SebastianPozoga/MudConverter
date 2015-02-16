
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

describe("MudDomIterator", function() {

    var ulLiListDom = "<ul><LI>1</LI><li>2</li><li>3</li></ul>";


    beforeEach(function() {});
    afterEach(function() {});

    it("should be definied", function() {
        expect(MudDomIterator).toBeDefined();
    });

    it("should build instance from dom", function() {
        var instance = MudDomIterator(ulLiListDom);
    });

    it("should build instance with process method", function() {
        var instance = MudDomIterator("");
        expect(instance.process).toBeDefined();
    });

    it("should get unprocessed text by getText", function() {
        var instance = MudDomIterator('<code>...<b>.</b>...</code>');
        expect(instance.process(function(nodeInterface){
            return [nodeInterface.getText()];
        })).toBeDefined('...<b>.</b>...');
    });

    it("should process "+ulLiListDom+" dom to '1\\n2\\n3' string", function() {
        var instance = MudDomIterator(ulLiListDom),
            processRespons = instance.process();
        expect(processRespons).toEqual('1\n2\n3');
    });

    it("should process "+ulLiListDom+" dom to '1 2 3' string (when set space as separator)", function() {
        var instance = MudDomIterator(ulLiListDom),
            processRespons = instance.process(null, ' ');
        expect(processRespons).toEqual('1 2 3');
    });



});

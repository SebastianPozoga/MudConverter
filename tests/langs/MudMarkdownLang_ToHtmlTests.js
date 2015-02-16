describe("MudMarkdownLang (toHtml)", function() {

    it("should be definied", function() {
        expect(MudMarkdownLang).toBeDefined();
    });

    it("constains 'toHtml' method", function(){
        var converter = new MudMarkdownLang();
        expect(converter.toHtml).toBeDefined();
    });

    it("should correct convert main-title", function(){
        var converter = new MudMarkdownLang();
        expect(converter.toHtml("Title\n=====")).toBe("<h1>Title</h1>");
    });

    it("should correct convert sub-title", function(){
        var converter = new MudMarkdownLang();
        expect(converter.toHtml("Title\n-----")).toBe("<h2>Title</h2>");
    });

    it("should convert quote", function(){
        var converter = new MudMarkdownLang();
        expect(converter.toHtml("\n>quote\n")).toBe("<q>quote</q>");
    });

    it("should convert page separator", function(){
        var converter = new MudMarkdownLang();
        expect(converter.toHtml("\n\n-----")).toBe("<hr />");
    });

    it("should convert italic text", function(){
        var converter = new MudMarkdownLang();
        expect(converter.toHtml("*text*")).toBe("<i>text</i>");
    });

    it("should convert bold", function(){
        var converter = new MudMarkdownLang();
        expect(converter.toHtml("**text**")).toBe("<b>text</b>");
    });

    it("should convert code", function(){
        var converter = new MudMarkdownLang();
        expect(converter.toHtml("`code`")).toBe("<code>code</code>");
    });

    /* - ?? no precision
    it("should convert code", function(){
        var converter = new MudMarkdownLang();
        expect(converter.toHtml("`<code>...</code>`")).toBe("<code>code</code>");
    });*/


    it("should convert link", function(){
        var converter = new MudMarkdownLang();
        expect(converter.toHtml("[link](http://pozoga.eu)")).toBe('<a href="http://pozoga.eu">link</a>');
    });

    it("should convert image", function(){
        var converter = new MudMarkdownLang();
        expect(converter.toHtml("!(http://pozoga.eu)")).toBe('<img src="http://pozoga.eu" />');
    });

});
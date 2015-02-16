describe("MudMarkdownLang (fromHTML)", function() {

    /*beforeEach(function(){
    });*/

    /*afterEach(function() {
    });*/

    it("should be definied", function() {
        expect(MudMarkdownLang).toBeDefined();
    });

    it("constains 'fromHtml' function", function(){
        var converter = new MudMarkdownLang();
        expect(converter.fromHtml).toBeDefined();
    });

    it("should correct convert title (h1)", function(){
        var converter = new MudMarkdownLang();
        expect(converter.fromHtml("<h1>Title</h1>")).toBe("Title\n=====");
    });

    it("should correct convert title (h2)", function(){
        var converter = new MudMarkdownLang();
        expect(converter.fromHtml("<h2>Title</h2>")).toBe("Title\n-----");
    });

    it("should not convert title (h7)", function(){
        var converter = new MudMarkdownLang();
        expect(converter.fromHtml("<h3>Title</h3>")).toBe("Title");
    });

    it("should convert blockquote tag to line \\n> quote\\n", function(){
        var converter = new MudMarkdownLang();
        expect(converter.fromHtml("<blockquote>quote</blockquote>")).toBe('\n> quote\n');
    });

    it("should convert q tag to line \\n> quote\\n", function(){
        var converter = new MudMarkdownLang();
        expect(converter.fromHtml("<q>quote</q>")).toBe('\n> quote\n');
    });

    it("should convert hr tag to line '-----'", function(){
        var converter = new MudMarkdownLang();
        expect(converter.fromHtml("<hr>")).toBe('-----');
    });

    it("should convert i tag to line ' * ... * '", function(){
        var converter = new MudMarkdownLang();
        expect(converter.fromHtml("<i>...</i>")).toBe(' * ... * ');
    });

    it("should convert b tag to line ' ** ... ** '", function(){
        var converter = new MudMarkdownLang();
        expect(converter.fromHtml("<i>...</i>")).toBe(' * ... * ');
    });

    it("should convert code tag to line ' ` ... ` '", function(){
        var converter = new MudMarkdownLang();
        expect(converter.fromHtml("<code>...</code>")).toBe(' ` ... ` ');
    });

    it("should convert code tag to `` line (with tags inside) ", function(){
        var converter = new MudMarkdownLang();
        expect(converter.fromHtml("<code>.<b>.</b>.</code>")).toBe(' ` .<b>.</b>. ` ');
    });

    it("should convert a tag to correct markdown link", function(){
        var converter = new MudMarkdownLang();
        expect(converter.fromHtml('<a href="http://pozoga.eu">link</a>')).toBe(' [link](http://pozoga.eu) ');
    });

    it("should convert img tag to correct markdown image", function(){
        var converter = new MudMarkdownLang();
        expect(converter.fromHtml('<img src="http://pozoga.eu" />')).toBe(' !(http://pozoga.eu) ');
    });

    it("constains 'toHtml' function", function(){
        var converter = new MudMarkdownLang();
        expect(converter.toHtml).toBeDefined();
    });

});
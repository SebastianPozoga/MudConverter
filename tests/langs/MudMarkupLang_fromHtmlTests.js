describe("WikiConverter", function() {

    it("should be definied", function() {
        expect(MudMarkupLang).toBeDefined();
    });

    it("should build converter instance", function() {
        //all converter have methods:
    });

    it("constains 'fromHtml' function", function(){
        var converter = new MudMarkupLang();
        expect(converter.fromHtml).toBeDefined();
    });

    it("should correct convert title (h1)", function(){
        var converter = new MudMarkupLang();
        expect(converter.fromHtml("<h1>Title</h1>")).toBe("# Title #");
    });

    it("should correct convert title (h2)", function(){
        var converter = new MudMarkupLang();
        expect(converter.fromHtml("<h2>Title</h2>")).toBe("## Title ##");
    });

    it("should correct convert title (h3)", function(){
        var converter = new MudMarkupLang();
        expect(converter.fromHtml("<h3>Title</h3>")).toBe("### Title ###");
    });

    it("should correct convert title (h4)", function(){
        var converter = new MudMarkupLang();
        expect(converter.fromHtml("<h4>Title</h4>")).toBe("#### Title ####");
    });

    it("should correct convert title (h5)", function(){
        var converter = new MudMarkupLang();
        expect(converter.fromHtml("<h5>Title</h5>")).toBe("##### Title #####");
    });

    it("should correct convert title (h6)", function(){
        var converter = new MudMarkupLang();
        expect(converter.fromHtml("<h6>Title</h6>")).toBe("###### Title ######");
    });

    it("should not convert title (h7)", function(){
        var converter = new MudMarkupLang();
        expect(converter.fromHtml("<h7>Title</h7>")).toBe("Title");
    });

    it("should convert hr tag to line '-----'", function(){
        var converter = new MudMarkupLang();
        expect(converter.fromHtml("<hr>")).toBe('\n-----\n');
    });

    it("should convert i tag to line ' * ... * '", function(){
        var converter = new MudMarkupLang();
        expect(converter.fromHtml("<i>...</i>")).toBe(' * ... * ');
    });

    it("should convert b tag to line ' ** ... ** '", function(){
        var converter = new MudMarkupLang();
        expect(converter.fromHtml("<i>...</i>")).toBe(' * ... * ');
    });

    it("should convert code tag to line ' ` ... ` '", function(){
        var converter = new MudMarkupLang();
        expect(converter.fromHtml("<code>...</code>")).toBe(' ` ... ` ');
    });

    it("should convert code tag to `` line (with tags inside) ", function(){
        var converter = new MudMarkupLang();
        expect(converter.fromHtml("<code>.<b>.</b>.</code>")).toBe(' ` .<b>.</b>. ` ');
    });

    it("constains 'toHtml' function", function(){
        var converter = new MudMarkupLang();
        expect(converter.toHtml).toBeDefined();
    });

});
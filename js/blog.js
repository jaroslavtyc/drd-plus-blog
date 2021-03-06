function googlemapsReady() {
    googlemapsLoadDone.resolve()
}

(function () {
    function a(a) {
        this.tokens = [], this.tokens.links = {}, this.options = a || h.defaults, this.rules = i.normal, this.options.gfm && (this.rules = this.options.tables ? i.tables : i.gfm)
    }

    function b(a, b) {
        if (this.options = b || h.defaults, this.links = a, this.rules = j.normal, !this.links) throw new Error("Tokens array requires a `links` property.");
        this.options.gfm ? this.rules = this.options.breaks ? j.breaks : j.gfm : this.options.pedantic && (this.rules = j.pedantic)
    }

    function c(a) {
        this.tokens = [], this.token = null, this.options = a || h.defaults
    }

    function d(a, b) {
        return a.replace(b ? /&/g : /&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    }

    function e(a, b) {
        return a = a.source, b = b || "", function c(d, e) {
            return d ? (e = e.source || e, e = e.replace(/(^|[^\[])\^/g, "$1"), a = a.replace(d, e), c) : new RegExp(a, b)
        }
    }

    function f() {
    }

    function g(a) {
        for (var b, c, d = 1; d < arguments.length; d++) {
            b = arguments[d];
            for (c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
        }
        return a
    }

    function h(b, e, f) {
        if (f || "function" == typeof e) {
            f || (f = e, e = null), e && (e = g({}, h.defaults, e));
            var i = a.lex(i, e), j = e.highlight, k = 0, l = i.length, m = 0;
            if (!j || j.length < 3) return f(null, c.parse(i, e));
            for (var n = function () {
                delete e.highlight;
                var a = c.parse(i, e);
                return e.highlight = j, f(null, a)
            }; l > m; m++) !function (a) {
                return "code" === a.type ? (k++, j(a.text, a.lang, function (b, c) {
                    return null == c || c === a.text ? --k || n() : (a.text = c, a.escaped = !0, void (--k || n()))
                })) : void 0
            }(i[m])
        } else try {
            return e && (e = g({}, h.defaults, e)), c.parse(a.lex(b, e), e)
        } catch (o) {
            if (o.message += "\nPlease report this to https://github.com/chjj/marked.", (e || h.defaults).silent) return "<p>An error occured:</p><pre>" + d(o.message + "", !0) + "</pre>";
            throw o
        }
    }

    var i = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        fences: f,
        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
        heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
        nptable: f,
        lheading: /^([^\n]+)\n *(=|-){3,} *\n*/,
        blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
        list: /^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        html: /^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
        table: f,
        paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
        text: /^[^\n]+/
    };
    i.bullet = /(?:[*+-]|\d+\.)/, i.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/, i.item = e(i.item, "gm")(/bull/g, i.bullet)(), i.list = e(i.list)(/bull/g, i.bullet)("hr", /\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)(), i._tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|@)\\b", i.html = e(i.html)("comment", /<!--[\s\S]*?-->/)("closed", / < (tag)[\s\S] + ? <\/\1>/)
    ("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, i._tag)(), i.paragraph = e(i.paragraph)("hr", i.hr)("heading", i.heading)("lheading", i.lheading)("blockquote", i.blockquote)("tag", "<" + i._tag)("def", i.def)(), i.normal = g({}, i), i.gfm = g({}, i.normal, {
        fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
        paragraph: /^/
    }), i.gfm.paragraph = e(i.paragraph)("(?!", "(?!" + i.gfm.fences.source.replace("\\1", "\\2") + "|")(), i.tables = g({}, i.gfm, {
        nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
        table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
    }), a.rules = i, a.lex = function (b, c) {
        var d = new a(c);
        return d.lex(b)
    }, a.prototype.lex = function (a) {
        return a = a.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n"), this.token(a, !0)
    }, a.prototype.token = function (a, b) {
        for (var c, d, e, f, g, h, j, k, l, a = a.replace(/^ +$/gm, ""); a;) if ((e = this.rules.newline.exec(a)) && (a = a.substring(e[0].length), e[0].length > 1 && this.tokens.push({type: "space"})), e = this.rules.code.exec(a)) a = a.substring(e[0].length), e = e[0].replace(/^ {4}/gm, ""), this.tokens.push({
            type: "code",
            text: this.options.pedantic ? e : e.replace(/\n+$/, "")
        }); else if (e = this.rules.fences.exec(a)) a = a.substring(e[0].length), this.tokens.push({
            type: "code",
            lang: e[2],
            text: e[3]
        }); else if (e = this.rules.heading.exec(a)) a = a.substring(e[0].length), this.tokens.push({
            type: "heading",
            depth: e[1].length,
            text: e[2]
        }); else if (b && (e = this.rules.nptable.exec(a))) {
            for (a = a.substring(e[0].length), h = {
                type: "table",
                header: e[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: e[3].replace(/\n$/, "").split("\n")
            }, k = 0; k < h.align.length; k++) h.align[k] = /^ *-+: *$/.test(h.align[k]) ? "right" : /^ *:-+: *$/.test(h.align[k]) ? "center" : /^ *:-+ *$/.test(h.align[k]) ? "left" : null;
            for (k = 0; k < h.cells.length; k++) h.cells[k] = h.cells[k].split(/ *\| */);
            this.tokens.push(h)
        } else if (e = this.rules.lheading.exec(a)) a = a.substring(e[0].length), this.tokens.push({
            type: "heading",
            depth: "=" === e[2] ? 1 : 2,
            text: e[1]
        }); else if (e = this.rules.hr.exec(a)) a = a.substring(e[0].length), this.tokens.push({type: "hr"}); else if (e = this.rules.blockquote.exec(a)) a = a.substring(e[0].length), this.tokens.push({type: "blockquote_start"}), e = e[0].replace(/^ *> ?/gm, ""), this.token(e, b), this.tokens.push({type: "blockquote_end"}); else if (e = this.rules.list.exec(a)) {
            for (a = a.substring(e[0].length), f = e[2], this.tokens.push({
                type: "list_start",
                ordered: f.length > 1
            }), e = e[0].match(this.rules.item), c = !1, l = e.length, k = 0; l > k; k++) h = e[k], j = h.length, h = h.replace(/^ *([*+-]|\d+\.) +/, ""), ~h.indexOf("\n ") && (j -= h.length, h = this.options.pedantic ? h.replace(/^ {1,4}/gm, "") : h.replace(new RegExp("^ {1," + j + "}", "gm"), "")), this.options.smartLists && k !== l - 1 && (g = i.bullet.exec(e[k + 1])[0], f === g || f.length > 1 && g.length > 1 || (a = e.slice(k + 1).join("\n") + a, k = l - 1)), d = c || /\n\n(?!\s*$)/.test(h), k !== l - 1 && (c = "\n" === h[h.length - 1], d || (d = c)), this.tokens.push({type: d ? "loose_item_start" : "list_item_start"}), this.token(h, !1), this.tokens.push({type: "list_item_end"});
            this.tokens.push({type: "list_end"})
        } else if (e = this.rules.html.exec(a)) a = a.substring(e[0].length), this.tokens.push({
            type: this.options.sanitize ? "paragraph" : "html",
            pre: "pre" === e[1] || "script" === e[1],
            text: e[0]
        }); else if (b && (e = this.rules.def.exec(a))) a = a.substring(e[0].length), this.tokens.links[e[1].toLowerCase()] = {
            href: e[2],
            title: e[3]
        }; else if (b && (e = this.rules.table.exec(a))) {
            for (a = a.substring(e[0].length), h = {
                type: "table",
                header: e[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: e[3].replace(/(?: *\| *)?\n$/, "").split("\n")
            }, k = 0; k < h.align.length; k++) h.align[k] = /^ *-+: *$/.test(h.align[k]) ? "right" : /^ *:-+: *$/.test(h.align[k]) ? "center" : /^ *:-+ *$/.test(h.align[k]) ? "left" : null;
            for (k = 0; k < h.cells.length; k++) h.cells[k] = h.cells[k].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
            this.tokens.push(h)
        } else if (b && (e = this.rules.paragraph.exec(a))) a = a.substring(e[0].length), this.tokens.push({
            type: "paragraph",
            text: "\n" === e[1][e[1].length - 1] ? e[1].slice(0, -1) : e[1]
        }); else if (e = this.rules.text.exec(a)) a = a.substring(e[0].length), this.tokens.push({
            type: "text",
            text: e[0]
        }); else if (a) throw new Error("Infinite loop on byte: " + a.charCodeAt(0));
        return this.tokens
    };
    var j = {
            escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
            autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
            url: f,
            tag: /^<!--[\s\S]*?--> | ^ <\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
            link:
                /^!?\[(inside)\]\(href\)/,
            reflink:
                /^!?\[(inside)\]\s*\[([^\]]*)\]/,
            nolink:
                /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
            strong:
                /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
            em:
                /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
            code:
                /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
            br:
                /^ {2,}\n(?!\s*$)/,
            del:
            f,
            text:
                /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
        }
    ;
    j._inside = /(?:\[[^\]]*\]|[^\]]|\](?=[^\[]*\]))*/, j._href = /\s*<?(.*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/, j.link = e(j.link)("inside", j._inside)("href", j._href)(), j.reflink = e(j.reflink)("inside", j._inside)(), j.normal = g({}, j), j.pedantic = g({}, j.normal, {
        strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
    }), j.gfm = g({}, j.normal, {
        escape: e(j.escape)("])", "~|])")(),
        url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
        del: /^~~(?=\S)([\s\S]*?\S)~~/,
        text: e(j.text)("]|", "~]|")("|", "|https?://|")()
    }), j.breaks = g({}, j.gfm, {
        br: e(j.br)("{2,}", "*")(),
        text: e(j.gfm.text)("{2,}", "*")()
    }), b.rules = j, b.output = function (a, c, d) {
        var e = new b(c, d);
        return e.output(a)
    }, b.prototype.output = function (a) {
        for (var b, c, e, f, g = ""; a;) if (f = this.rules.escape.exec(a)) a = a.substring(f[0].length), g += f[1]; else if (f = this.rules.autolink.exec(a)) a = a.substring(f[0].length), "@" === f[2] ? (c = this.mangle(":" === f[1][6] ? f[1].substring(7) : f[1]), e = this.mangle("mailto:") + c) : (c = d(f[1]), e = c), g += '<a href="' + e + '">' + c + "</a>"; else if (f = this.rules.url.exec(a)) a = a.substring(f[0].length), c = d(f[1]), e = c, g += '<a href="' + e + '">' + c + "</a>"; else if (f = this.rules.tag.exec(a)) a = a.substring(f[0].length), g += this.options.sanitize ? d(f[0]) : f[0]; else if (f = this.rules.link.exec(a)) a = a.substring(f[0].length), g += this.outputLink(f, {
            href: f[2],
            title: f[3]
        }); else if ((f = this.rules.reflink.exec(a)) || (f = this.rules.nolink.exec(a))) {
            if (a = a.substring(f[0].length), b = (f[2] || f[1]).replace(/\s+/g, " "), b = this.links[b.toLowerCase()], !b || !b.href) {
                g += f[0][0], a = f[0].substring(1) + a;
                continue
            }
            g += this.outputLink(f, b)
        } else if (f = this.rules.strong.exec(a)) a = a.substring(f[0].length), g += "<strong>" + this.output(f[2] || f[1]) + "</strong>"; else if (f = this.rules.em.exec(a)) a = a.substring(f[0].length), g += "<em>" + this.output(f[2] || f[1]) + "</em>"; else if (f = this.rules.code.exec(a)) a = a.substring(f[0].length), g += "<code>" + d(f[2], !0) + "</code>"; else if (f = this.rules.br.exec(a)) a = a.substring(f[0].length), g += "<br>"; else if (f = this.rules.del.exec(a)) a = a.substring(f[0].length), g += "<del>" + this.output(f[1]) + "</del>"; else if (f = this.rules.text.exec(a)) a = a.substring(f[0].length), g += d(f[0]); else if (a) throw new Error("Infinite loop on byte: " + a.charCodeAt(0));
        return g
    }, b.prototype.outputLink = function (a, b) {
        return "!" !== a[0][0] ? '<a href="' + d(b.href) + '"' + (b.title ? ' title="' + d(b.title) + '"' : "") + ">" + this.output(a[1]) + "</a>" : '<img src="' + d(b.href) + '" alt="' + d(a[1]) + '"' + (b.title ? ' title="' + d(b.title) + '"' : "") + ">"
    }, b.prototype.smartypants = function (a) {
        return this.options.smartypants ? a.replace(/--/g, "—").replace(/'([^']*)'/g, "‘$1’").replace(/"([^"]*)"/g, "“$1”").replace(/\.{3}/g, "…") : a
    }, b.prototype.mangle = function (a) {
        for (var b, c = "", d = a.length, e = 0; d > e; e++) b = a.charCodeAt(e), Math.random() > .5 && (b = "x" + b.toString(16)), c += "&#" + b + ";";
        return c
    }, c.parse = function (a, b) {
        var d = new c(b);
        return d.parse(a)
    }, c.prototype.parse = function (a) {
        this.inline = new b(a.links, this.options), this.tokens = a.reverse();
        for (var c = ""; this.next();) c += this.tok();
        return c
    }, c.prototype.next = function () {
        return this.token = this.tokens.pop()
    }, c.prototype.peek = function () {
        return this.tokens[this.tokens.length - 1] || 0
    }, c.prototype.parseText = function () {
        for (var a = this.token.text; "text" === this.peek().type;) a += "\n" + this.next().text;
        return this.inline.output(a)
    }, c.prototype.tok = function () {
        switch (this.token.type) {
            case"space":
                return "";
            case"hr":
                return "<hr>\n";
            case"heading":
                return "<h" + this.token.depth + ">" + this.inline.output(this.token.text) + "</h" + this.token.depth + ">\n";
            case"code":
                if (this.options.highlight) {
                    var a = this.options.highlight(this.token.text, this.token.lang);
                    null != a && a !== this.token.text && (this.token.escaped = !0, this.token.text = a)
                }
                return this.token.escaped || (this.token.text = d(this.token.text, !0)), "<pre><code" + (this.token.lang ? ' class="' + this.options.langPrefix + this.token.lang + '"' : "") + ">" + this.token.text + "</code></pre>\n";
            case"table":
                var b, c, e, f, g, h = "";
                for (h += "<thead>\n<tr>\n", c = 0; c < this.token.header.length; c++) b = this.inline.output(this.token.header[c]), h += this.token.align[c] ? '<th align="' + this.token.align[c] + '">' + b + "</th>\n" : "<th>" + b + "</th>\n";
                for (h += "</tr>\n</thead>\n", h += "<tbody>\n", c = 0; c < this.token.cells.length; c++) {
                    for (e = this.token.cells[c], h += "<tr>\n", g = 0; g < e.length; g++) f = this.inline.output(e[g]), h += this.token.align[g] ? '<td align="' + this.token.align[g] + '">' + f + "</td>\n" : "<td>" + f + "</td>\n";
                    h += "</tr>\n"
                }
                return h += "</tbody>\n", "<table>\n" + h + "</table>\n";
            case"blockquote_start":
                for (var h = ""; "blockquote_end" !== this.next().type;) h += this.tok();
                return "<blockquote>\n" + h + "</blockquote>\n";
            case"list_start":
                for (var i = this.token.ordered ? "ol" : "ul", h = ""; "list_end" !== this.next().type;) h += this.tok();
                return "<" + i + ">\n" + h + "</" + i + ">\n";
            case"list_item_start":
                for (var h = ""; "list_item_end" !== this.next().type;) h += "text" === this.token.type ? this.parseText() : this.tok();
                return "<li>" + h + "</li>\n";
            case"loose_item_start":
                for (var h = ""; "list_item_end" !== this.next().type;) h += this.tok();
                return "<li>" + h + "</li>\n";
            case"html":
                return this.token.pre || this.options.pedantic ? this.token.text : this.inline.output(this.token.text);
            case"paragraph":
                return "<p>" + this.inline.output(this.token.text) + "</p>\n";
            case"text":
                return "<p>" + this.parseText() + "</p>\n"
        }
    }, f.exec = f, h.options = h.setOptions = function (a) {
        return g(h.defaults, a), h
    }, h.defaults = {
        gfm: !0,
        tables: !0,
        breaks: !1,
        pedantic: !1,
        sanitize: !1,
        smartLists: !1,
        silent: !1,
        highlight: null,
        langPrefix: "lang-"
    }, h.Parser = c, h.parser = c.parse, h.Lexer = a, h.lexer = a.lex, h.InlineLexer = b, h.inlineLexer = b.output, h.parse = h, "object" == typeof exports ? module.exports = h : "function" == typeof define && define.amd ? define(function () {
        return h
    }) : this.marked = h
}).call(function () {
    return this || ("undefined" != typeof window ? window : global)
}()), function (a) {
    "use strict";
    a("html").addClass("md-hidden-load"), a.md = function (b) {
        return a.md.publicMethods[b] ? a.md.publicMethods[b].apply(this, Array.prototype.slice.call(arguments, 1)) : void a.error("Method " + b + " does not exist on jquery.md")
    }, a.md.config = {
        title: null,
        useSideMenu: !0,
        lineBreaks: "gfm",
        additionalFooterText: "",
        anchorCharacter: "&para;",
        tocAnchor: "[ &uarr; ]"
    }, a.md.gimmicks = [], a.md.stages = [], a.md.mainHref = "", a.md.inPageAnchor = "", a.md.loglevel = {
        TRACE: 10,
        DEBUG: 20,
        INFO: 30,
        WARN: 40,
        ERROR: 50,
        FATAL: 60
    }, a.md.logThreshold = a.md.loglevel.WARN
}(jQuery), function (a) {
    "use strict";
    a.md.getLogger = function () {
        var b = a.md.loglevel, c = function (c) {
            var d = b[c];
            return function (b) {
                a.md.logThreshold <= d && console.log("[" + c + "] " + b)
            }
        }, d = {};
        return d.trace = c("TRACE"), d.debug = c("DEBUG"), d.info = c("INFO"), d.warn = c("WARN"), d.error = c("ERROR"), d.fatal = c("FATAL"), d
    }
}(jQuery), function (a) {
    "use strict";
    var b = a.md.getLogger();
    a.Stage = function (c) {
        var d = a.extend(a.Deferred(), {});
        return d.name = c, d.events = [], d.started = !1, d.reset = function () {
            d.complete = a.Deferred(), d.outstanding = []
        }, d.reset(), d.subscribe = function (b) {
            d.started && a.error("Subscribing to stage which already started!"), d.events.push(b)
        }, d.unsubscribe = function (a) {
            d.events.remove(a)
        }, d.executeSubscribedFn = function (e) {
            var f = a.Deferred();
            d.outstanding.push(f), a.md.util.wait(2500).done(function () {
                "resolved" !== f.state() && (b.fatal("Timeout reached for done callback in stage: " + d.name + ". Did you forget a done() call in a .subscribe() ?"), b.fatal("stage " + c + " failed running subscribed function: " + e))
            });
            var g = function () {
                f.resolve()
            };
            e(g)
        }, d.run = function () {
            d.started = !0, a(d.events).each(function (a, b) {
                d.executeSubscribedFn(b)
            }), 0 === d.outstanding.length && d.resolve(), a.when.apply(a, d.outstanding).done(function () {
                d.resolve()
            }).fail(function () {
                d.resolve()
            })
        }, d.done(function () {
            b.debug("stage " + d.name + " completed successfully.")
        }), d.fail(function () {
            b.debug("stage " + d.name + " completed with errors!")
        }), d
    }
}(jQuery), function (a) {
    "use strict";

    function b() {
        a.md.stages = [a.Stage("init"), a.Stage("load"), a.Stage("transform"), a.Stage("ready"), a.Stage("skel_ready"), a.Stage("bootstrap"), a.Stage("pregimmick"), a.Stage("gimmick"), a.Stage("postgimmick"), a.Stage("all_ready"), a.Stage("final_tests")], a.md.stage = function (b) {
            var c = a.grep(a.md.stages, function (a) {
                return a.name === b
            });
            return 0 !== c.length ? c[0] : void a.error("A stage by name " + b + "  does not exist")
        }
    }

    function c() {
        var b = a.md.stages;
        a.md.stages = [], a(b).each(function (b, c) {
            a.md.stages.push(a.Stage(c.name))
        })
    }

    function d(b) {
        var c = {gfm: !0, tables: !0, breaks: !0};
        "original" === a.md.config.lineBreaks ? c.breaks = !1 : "gfm" === a.md.config.lineBreaks && (c.breaks = !0), marked.setOptions(c);
        var d = marked(b);
        return d
    }

    function e() {
        var b = "";
        a.md.stage("init").subscribe(function (c) {
            var d = {url: a.md.mainHref, dataType: "text"};
            a.ajax(d).done(function (a) {
                b = a, c()
            }).fail(function () {
                var b = a.md.getLogger();
                b.fatal("Could not get " + a.md.mainHref), c()
            })
        }), a.md.stage("transform").subscribe(function (b) {
            var c = a.md.mainHref.lastIndexOf("/"), d = a.md.mainHref.substring(0, c + 1);
            a.md.baseUrl = d, b()
        }), a.md.stage("transform").subscribe(function (c) {
            var e = d(b);
            a("#md-content").html(e), b = "";
            var g = a.Deferred();
            f(g), g.always(function () {
                c()
            })
        })
    }

    function f(b) {
        function c() {
            return a("a").filter(function () {
                var b = a(this).attr("href"), c = a(this).toptext(), d = a.md.util.hasMarkdownFileExtension(b),
                    e = "include" === c, f = c.startsWith("preview:");
                return (e || f) && d
            })
        }

        function e(b, c) {
            function d(a) {
                return 3 === a.nodeType
            }

            var e = 0, f = [];
            return b.each(function (a, b) {
                c > e && (f.push(b), d(b) || e++)
            }), a(f)
        }

        var f = c(), g = a.md.util.countDownLatch(f.length);
        g.always(function () {
            b.resolve()
        }), f.each(function (b, c) {
            var f = a(c), h = f.attr("href"), i = f.toptext();
            a.ajax({url: h, dataType: "text"}).done(function (b) {
                var c = a(d(b));
                if (i.startsWith("preview:")) {
                    var g = parseInt(i.substring(8), 10) || 3, j = e(c, g);
                    j.last().append('<a href="' + h + '"> ...read more &#10140;</a>'), j.insertBefore(f.parent("p").eq(0)), f.remove()
                } else c.insertAfter(f.parents("p")), f.remove()
            }).always(function () {
                g.countDown()
            })
        })
    }

    function g(a) {
        return a ? a.lastIndexOf("data:") >= 0 ? !0 : a.startsWith("mailto:") ? !0 : a.startsWith("file:") ? !0 : a.startsWith("ftp:") ? !0 : void 0 : !1
    }

    function h(b, c) {
        var d = a(b);
        void 0 === c && (c = ""), d.find("a").not("#md-menu a").filter(function () {
            var b = a(this), c = b.attr("href");
            c && 0 !== c.length || b.removeAttr("href")
        }), d.find("a, img").each(function (b, d) {
            function e(b) {
                return a.md.util.hasMarkdownFileExtension(b) ? "#!" + b : b
            }

            var f = a(d), h = !1, i = "href";
            f.attr(i) || (h = !0, i = "src");
            var j = f.attr(i);
            if (!(j && j.lastIndexOf("#!") >= 0 || g(j) || (h || !j.startsWith("#") || j.startsWith("#!") || f.click(function (b) {
                b.preventDefault(), a.md.scrollToInPageAnchor(j)
            }), !a.md.util.isRelativeUrl(j) || h && !a.md.util.isRelativePath(j) || !h && a.md.util.isGimmickLink(f)))) {
                var k = c + j;
                h ? f.attr(i, k) : a.md.util.isRelativePath(j) ? f.attr(i, e(k)) : f.attr(i, e(j))
            }
        })
    }

    function i() {
        a.md.stage("init").subscribe(function (b) {
            a.md.NavigationDfd.done(function () {
                b()
            }).fail(function () {
                b()
            })
        }), a.md.stage("transform").subscribe(function (b) {
            if ("" === r) {
                var c = a.md.getLogger();
                return c.info("no navgiation.md found, not using a navbar"), void b()
            }
            var d = marked(r), e = a("<div>" + d + "</div>");
            e.each(function (b, c) {
                "SCRIPT" === c.tagName && a("script").first().before(c)
            });
            var f = e.eq(0);
            f.find("p").each(function (b, c) {
                var d = a(c);
                d.replaceWith(d.html())
            }), a("#md-menu").append(f.html()), b()
        }), a.md.stage("bootstrap").subscribe(function (b) {
            h(a("#md-menu")), b()
        }), a.md.stage("postgimmick").subscribe(function (b) {
            var c = a("#md-menu a").length, d = a("#md-menu .navbar-brand").eq(0).toptext().trim().length > 0;
            !d && 1 >= c && a("#md-menu").hide(), b()
        })
    }

    function j() {
        a.md.stage("init").subscribe(function (b) {
            a.md.ConfigDfd.done(function () {
                b()
            }).fail(function () {
                var c = a.md.getLogger();
                c.info("No config.json found, using default settings"), b()
            })
        })
    }

    function k() {
        a.md.stage("init").subscribe(function (b) {
            a("#md-all").empty();
            var c = '<div id="md-body"><div id="md-title"></div><div id="md-menu"></div><div id="md-content"></div></div>';
            a("#md-all").prepend(a(c)), b()
        })
    }

    function l(b) {
        a.md.mainHref = b, e(), k(), a.md.stage("ready").subscribe(function (b) {
            a.md.initializeGimmicks(), a.md.registerLinkGimmicks(), b()
        }), a.each(a.md.gimmicks, function (b, c) {
            void 0 !== c.load && a.md.stage("load").subscribe(function (a) {
                c.load(), a()
            })
        }), a.md.stage("ready").subscribe(function (b) {
            a.md("createBasicSkeleton"), b()
        }), a.md.stage("bootstrap").subscribe(function (b) {
            a.mdbootstrap("bootstrapify"), h(a("#md-content"), a.md.baseUrl), b()
        }), m()
    }

    function m() {
        a.md.stage("init").done(function () {
            a.md.stage("load").run()
        }), a.md.stage("load").done(function () {
            a.md.stage("transform").run()
        }), a.md.stage("transform").done(function () {
            a.md.stage("ready").run()
        }), a.md.stage("ready").done(function () {
            a.md.stage("skel_ready").run()
        }), a.md.stage("skel_ready").done(function () {
            a.md.stage("bootstrap").run()
        }), a.md.stage("bootstrap").done(function () {
            a.md.stage("pregimmick").run()
        }), a.md.stage("pregimmick").done(function () {
            a.md.stage("gimmick").run()
        }), a.md.stage("gimmick").done(function () {
            a.md.stage("postgimmick").run()
        }), a.md.stage("postgimmick").done(function () {
            a.md.stage("all_ready").run()
        }), a.md.stage("all_ready").done(function () {
            a("html").removeClass("md-hidden-load"), "function" == typeof window.callPhantom && window.callPhantom({}), a.md.stage("final_tests").run()
        }), a.md.stage("final_tests").done(function () {
            c(), a("body").append('<span id="start-tests"></span>'), a("#start-tests").hide()
        }), a.md.stage("init").run()
    }

    function n() {
        var b;
        b = window.location.hash.substring(window.location.hash.startsWith("#!") ? 2 : 1), b = decodeURIComponent(b);
        var c = b.indexOf("#");
        -1 !== c
            ? (a.md.inPageAnchor = b.substring(c + 1), a.md.mainHref = b.substring(0, c))
            : a.md.mainHref = b
    }

    function o() {
        var a = "", b = window.location.hash || "";
        "" === b || "#" === b || "#!" === b ? a = "#!index.md" : b.startsWith("#!") && b.endsWith("/") && (a = b + "index.md"), a && (window.location.hash = a)
    }

    var p = a.md.getLogger();
    b();
    var q = {};
    a.md.publicMethods = a.extend({}, a.md.publicMethods, q);
    var r = "";
    a.md.NavigationDfd = a.Deferred();
    var s = {url: "navigation.md", dataType: "text"};
    a.ajax(s).done(function (b) {
        r = b, a.md.NavigationDfd.resolve()
    }).fail(function () {
        a.md.NavigationDfd.reject()
    }), a.md.ConfigDfd = a.Deferred(), a.ajax({url: "config.json", dataType: "text"}).done(function (b) {
        try {
            var c = JSON.parse(b);
            a.md.config = a.extend(a.md.config, c), p.info("Found a valid config.json file, using configuration")
        } catch (d) {
            p.error("config.json was not JSON parsable: " + d)
        }
        a.md.ConfigDfd.resolve()
    }).fail(function (b, c) {
        p.error("unable to retrieve config.json: " + c), a.md.ConfigDfd.reject()
    }), a(document).ready(function () {
        j(), i(), n(), o(), a(window).bind("hashchange", function () {
            window.location.reload(!1)
        }), l(a.md.mainHref)
    })
}(jQuery), function (a) {
    var b = {
        isRelativeUrl: function (a) {
            return void 0 === a ? !1 : -1 === a.indexOf("://") ? !0 : !1
        }, isRelativePath: function (a) {
            return void 0 === a ? !1 : a.startsWith("/") ? !1 : !0
        }, isGimmickLink: function (a) {
            return -1 !== a.toptext().indexOf("gimmick:") ? !0 : !1
        }, hasMarkdownFileExtension: function (b) {
            var c = [".md", ".markdown", ".mdown"], d = !1, e = b.toLowerCase().split("#")[0];
            return a(c).each(function (a, b) {
                e.toLowerCase().endsWith(b) && (d = !0)
            }), d
        }, wait: function (b) {
            return a.Deferred(function (a) {
                setTimeout(a.resolve, b)
            })
        }
    };
    a.md.util = a.extend({}, a.md.util, b), "function" != typeof String.prototype.startsWith && (String.prototype.startsWith = function (a) {
        return this.slice(0, a.length) === a
    }), "function" != typeof String.prototype.endsWith && (String.prototype.endsWith = function (a) {
        return this.slice(this.length - a.length, this.length) === a
    }), a.fn.extend({
        toptext: function () {
            return this.clone().children().remove().end().text()
        }
    }), a.fn.extend({
        localAnchor: function () {
            var link = this.context.href;
            var localHashIndex = link.lastIndexOf('#');
            return link.substring(localHashIndex + 1);
        }
    }), a.expr[":"].icontains = a.expr.createPseudo(function (b) {
        return function (c) {
            return a(c).toptext().toUpperCase().indexOf(b.toUpperCase()) >= 0
        }
    }), a.md.util.getInpageAnchorText = function (a) {
        var b = a.replace(/ /g, "_");
        return b
    }, a.md.util.getInpageAnchorHref = function (b, c) {
        c = c || a.md.mainHref;
        var d = a.md.util.getInpageAnchorText(b);
        return "#!" + c + "#" + d
    }, a.md.util.repeatUntil = function (b, c, d) {
        function e(b, c, d) {
            return 0 === d ? void f.reject() : c() ? void f.resolve() : void a.md.util.wait(b).always(function () {
                e(b, c, d - 1)
            })
        }

        d = d || 10;
        var f = a.Deferred();
        return e(b, c, d), f
    }, a.md.util.countDownLatch = function (b, c) {
        c = c || 0;
        var d = a.Deferred();
        return c >= b && d.resolve(), d.capacity = b, d.countDown = function () {
            d.capacity--, d.capacity <= c && d.resolve()
        }, d
    }
}(jQuery), function ($) {
    "use strict";

    function ScriptInfo(a) {
        this.module = void 0, this.options = {}, this.src = "", $.extend(this, a)
    }

    function LinkTrigger(a) {
        this.trigger = void 0, this.module = void 0, this.callback = void 0, $.extend(this, a)
    }

    function insertInlineScript(a) {
        var b = document.createElement("script");
        b.type = "text/javascript", b.text = a, document.body.appendChild(b)
    }

    function checkLicense(a, b) {
        if (-1 === $.inArray(a, licenses)) {
            var c = JSON.stringify(licenses);
            log.warn("license " + a + " is not known."), log.warn("Known licenses:" + c)
        } else "OTHER" === a && log.warn("WARNING: Module " + b.name + " uses a script with unknown license. This may be a GPL license violation if this website is publically available!")
    }

    function loadScript(a) {
        var b = a.module, c = a.src, d = a.options, e = d.license || "OTHER", f = d.loadstage || "skel_ready",
            g = d.finishstage || "pregimmick", h = d.callback, i = $.Deferred();
        checkLicense(e, b), log.debug("subscribing " + b.name + " to start: " + f + " end in: " + g), $.md.stage(f).subscribe(function (a) {
            c.startsWith("//") || c.startsWith("http") ? $.getScript(c, function () {
                void 0 !== h ? h(a) : (log.debug("module" + b.name + " script load done: " + c), a()), i.resolve()
            }) : (insertInlineScript(c), log.debug("module" + b.name + " script inject done"), i.resolve(), a())
        }), $.md.stage(g).subscribe(function (a) {
            i.done(function () {
                a()
            })
        })
    }

    function findActiveLinkTrigger() {
        var a = $("a:icontains(gimmick:)");
        a.each(function (a, b) {
            var c = getGimmickLinkParts($(b));
            -1 === activeLinkTriggers.indexOf(c.trigger) && activeLinkTriggers.push(c.trigger)
        }), log.debug("Scanning for required gimmick links: " + JSON.stringify(activeLinkTriggers))
    }

    function loadRequiredScripts() {
        $.each(activeLinkTriggers, function (a, b) {
            var c = findModuleByTrigger(b);
            if (void 0 === c) return void log.error('Gimmick link: "' + b + '" found but no suitable gimmick loaded');
            var d = registeredScripts.filter(function (a) {
                return a.module.name === c.name
            })[0];
            void 0 !== d && loadScript(d)
        })
    }

    function findModuleByTrigger(a) {
        var b;
        return $.each(linkTriggers, function (c, d) {
            d.trigger === a && (b = d.module)
        }), b
    }

    function getGimmickLinkParts($link) {
        var link_text = $.trim($link.toptext());
        if (null === link_text.match(/gimmick:/i)) return null;
        var href = $.trim($link.attr("href")), r = new RegExp(/gimmick:\s*([^(\s]*)\s*(\(\s*{?(.*)\s*}?\s*\))*/i),
            matches = r.exec(link_text);
        if (null === matches || void 0 === matches[1]) return $.error("Error matching a gimmick: " + link_text), null;
        var trigger = matches[1].toLowerCase(), args = null;
        if (void 0 !== matches[2]) {
            var params = $.trim(matches[3].toString());
            "}" === params.charAt(params.length - 1) && (params = params.substring(0, params.length - 1)), params = "({" + params + "})", params = params.replace(/'/g, '"');
            try {
                args = eval(params)
            } catch (err) {
                log.error("error parsing argument of gimmick: " + link_text + "giving error: " + err)
            }
        }
        return {trigger: trigger, options: args, href: href}
    }

    function runGimmicksOnce() {
        $.each($.md.gimmicks, function (a, b) {
            void 0 !== b.once && b.once()
        })
    }

    function subscribeLinkTrigger(a, b, c) {
        log.debug("Subscribing gimmick " + c.module.name + " to stage: " + c.stage), $.md.stage(c.stage).subscribe(function (d) {
            b.options = b.options || {}, jQuery.contains(document.documentElement, a[0]) || (log.error("LINK IS NOT IN THE DOM ANYMORE: "), console.log(a)), log.debug("Running gimmick " + c.module.name), c.callback(a, b.options, b.href, d), d()
        })
    }

    $.md.registerGimmick = function (a) {
        $.md.gimmicks.push(a)
    }, $.md.registerScript = function (a, b, c) {
        var d = new ScriptInfo({module: a, src: b, options: c});
        registeredScripts.push(d)
    }, $.md.registerCss = function (a, b, c) {
        var d = c.license, e = c.stage || "skel_ready", f = c.callback;
        checkLicense(d, a);
        var g = '<link rel="stylesheet" href="' + b + '" type="text/css"></link>';
        $.md.stage(e).subscribe(function (a) {
            $("head").append(g), void 0 !== f ? f(a) : a()
        })
    }, $.md.prepareLink = function (a, b) {
        b = b || {};
        var c = window.location.protocol;
        return b.forceSSL ? "https://" + a : b.forceHTTP ? "http://" + a : "file:" === c ? "http://" + a : "//" + a
    }, $.md.linkGimmick = function (a, b, c, d) {
        void 0 === d && (d = "gimmick");
        var e = new LinkTrigger({trigger: b, module: a, stage: d, callback: c});
        linkTriggers.push(e)
    }, $.md.triggerIsActive = function (a) {
        return -1 === activeLinkTriggers.indexOf(a) ? !1 : !0
    };
    var initialized = !1;
    $.md.initializeGimmicks = function () {
        findActiveLinkTrigger(), runGimmicksOnce(), loadRequiredScripts()
    };
    var log = $.md.getLogger(), activeLinkTriggers = [], registeredScripts = [], linkTriggers = [],
        licenses = ["MIT", "BSD", "GPL", "GPL2", "GPL3", "LGPL", "LGPL2", "APACHE2", "PUBLICDOMAIN", "EXCEPTION", "OTHER"];
    $.md.registerLinkGimmicks = function () {
        var a = $("a:icontains(gimmick:)");
        a.each(function (a, b) {
            var c = $(b), d = getGimmickLinkParts(c);
            $.each(linkTriggers, function (a, b) {
                d.trigger === b.trigger && subscribeLinkTrigger(c, d, b)
            })
        })
    }
}(jQuery), function (a) {
    function b() {
        var b;
        if (a.md.config.title && a("title").text(a.md.config.title), b = a("#md-content h1").eq(0), a.trim(b.toptext()).length > 0) {
            a("#md-title").prepend(b);
            {
                b.toptext()
            }
        } else a("#md-title").remove()
    }

    function c() {
        a("#md-content p").each(function () {
            var b = a(this);
            if (0 !== a.trim(b.text()).length) {
                var c = b.contents().filter(function () {
                    var b = a(this);
                    return "A" === this.tagName && b.find("img").length > 0 ? !0 : "IMG" === this.tagName ? !0 : !1
                }), d = e(b);
                b.wrapInner('<div class="md-text" />'), 0 !== c.length && (c.prependTo(b), b.addClass("md-floatenv").addClass(d))
            }
        })
    }

    function d() {
        a(".md-floatenv").find(".md-text").each(function () {
            var b = a(this).find("*").eq(0);
            b.is("br") && b.remove()
        }), a(".md-image-group").find("br").remove()
    }

    function e(b) {
        var c = a(b), d = "", e = c.contents().filter(function () {
            return "IMG" === this.tagName || "IFRAME" === this.tagName ? !0 : "A" === this.tagName ? a(this).find("img").length > 0 : a.trim(a(this).text()).length > 0
        }), f = e[0];
        return void 0 !== f && null !== f && (d = "IMG" === f.tagName || "IFRAME" === f.tagName ? "md-float-left" : "A" === f.tagName && a(f).find("img").length > 0 ? "md-float-left" : "md-float-right"), d
    }

    function f() {
        var b = a("p img").parents("p");
        b.addClass("md-image-group")
    }

    function g() {
        function b() {
            return c = a("img").filter(function () {
                var b = a(this).parents("a").eq(0);
                if (0 === b.length) return !0;
                var c = b.attr("href");
                return c && 0 === c.length
            })
        }

        var c = b();
        return c.each(function () {
            var b = a(this), c = b.attr("src"), d = b.attr("title");
            void 0 === d && (d = ""), b.wrap('<a class="md-image-selfref" href="' + c + '" title="' + d + '"/> ')
        })
    }

    function h() {
        function b(b, c) {
            var d = a.md.config.anchorCharacter, e = a('<span class="anchor-highlight"><a>' + d + "</a></span>");
            e.find("a").attr("href", c), e.hide();
            var f = !1;
            b.mouseenter(function () {
                f = !0, a.md.util.wait(10).then(function () {
                    f && e.fadeIn(200)
                })
            }), b.mouseleave(function () {
                f = !1, e.fadeOut(200)
            }), e.appendTo(b)
        }

        function c(b) {
        }

        a("h1,h2,h3,h4,h5,h6").not("#md-title h1").each(function () {
            var d = a(this);
            d.addClass("md-inpage-anchor");
            var e = d.clone().children(".anchor-highlight").remove().end().text(),
                f = a.md.util.getInpageAnchorHref(e);
            b(d, f), c(d)
            d.find('.anchor-highlight').find('a').click(function (b) {
                b.preventDefault();
                var c = a(this);
                var localAnchor = c.localAnchor();
                var d = a.md.util.getInpageAnchorText(localAnchor);
                var localAnchorText = decodeURIComponent(d);
                a.md.scrollToInPageAnchor(localAnchorText);
                history.pushState(null, document.title, c.context.href);
            })
        })
    }

    var i = {
        createBasicSkeleton: function () {
            b(), c(), g(), f(), d(), h(), a.md.stage("all_ready").subscribe(function (b) {
                "" !== a.md.inPageAnchor && a.md.util.wait(0).then(function () {
                    a.md.scrollToInPageAnchor(a.md.inPageAnchor)
                }), b()
            })
        }
    };
    a.md.publicMethods = a.extend({}, a.md.publicMethods, i), a.md.scrollToInPageAnchor = function (b) {
        b.startsWith("#") && (b = b.substring(1, b.length));
        var c = !1;
        a(".md-inpage-anchor").each(function () {
            if (!c) {
                var d = a(this), e = d.toptext(), f = a.md.util.getInpageAnchorText(e);
                if (b === f) {
                    this.scrollIntoView(!0);
                    c = !0
                }
            }
        })
    }
}(jQuery), function (a) {
    "use strict";

    function b() {
        if (!(a("#md-menu").length <= 0)) {
            o = "top";
            var b = a("#md-menu").children(), c = "";
            c += '<div id="md-main-navbar" class="navbar navbar-default navbar-static-top" role="navigation">', c += '<div class="navbar-header">', c += '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">', c += '<span class="sr-only">Toggle navigation</span>', c += '<span class="icon-bar"></span>', c += '<span class="icon-bar"></span>', c += '<span class="icon-bar"></span>', c += "</button>", c += '<a class="navbar-brand" href="#"></a>', c += "</div>", c += '<div class="collapse navbar-collapse navbar-ex1-collapse">', c += '<ul class="nav navbar-nav" />', c += '<ul class="nav navbar-nav navbar-right" />', c += "</div>", c += "</div>";
            var e = a(c);
            e.appendTo("#md-menu"), a("#md-menu ul.nav").eq(0).append(b), a("#md-menu").prependTo("#md-all");
            var f = a("#md-menu h1").toptext();
            a("#md-menu h1").remove(), a("a.navbar-brand").text(f), a.md.stage("pregimmick").subscribe(function (a) {
                d(), a()
            })
        }
    }

    function c() {
        /*var b = a("#md-main-navbar").height() + 10;
        a("#md-body").css("margin-top", b + "px")*/
    }

    function d() {
        var b = 0, d = a.md.util.repeatUntil(40, function () {
            return b = a("#md-main-navbar").height(), b > 35 && 481 > b
        }, 25);
        d.done(function () {
            b = a("#md-main-navbar").height();
            var d = a.md.util.repeatUntil(20, function () {
                return b !== a("#md-main-navbar").height()
            }, 25);
        })
    }

    function e() {
        if (0 !== a("#md-menu a").length) {
            var c = a("#md-menu");
            c.find('> a[href=""]').attr("data-toggle", "dropdown").addClass("dropdown-toggle").attr("href", "").append('<b class="caret"/>'), c.find("ul").addClass("dropdown-menu"), c.find("ul li").addClass("dropdown"), a("#md-menu hr").each(function (b, c) {
                var d = a(c), e = d.prev(), f = d.next();
                e.is("ul") && e.length >= 0 && (e.append(a('<li class="divider"/>')), d.remove(), f.is("ul") && (f.find("li").appendTo(e), f.remove()))
            }), a("#md-menu ul").each(function (b, c) {
                var d = a(c);
                0 === d.find("li").length && d.remove()
            }), a("#md-menu hr").replaceWith(a('<li class="divider-vertical"/>')), a("#md-menu > a").wrap("<li />"), a("#md-menu ul").each(function (b, c) {
                var d = a(c);
                d.appendTo(d.prev()), d.parent("li").addClass("dropdown")
            }), a("#md-menu li.dropdown").find("h1, h2, h3").each(function (b, c) {
                var d = a(c), e = d.toptext(), f = a('<li class="dropdown-header" />');
                f.text(e), d.replaceWith(f)
            }), b()
        }
    }

    function f(b) {
        var c = a(b), d = a(window).scrollTop(), e = d + a(window).height(), f = c.offset().top, g = f + c.height();
        return e >= g && f >= d
    }

    function g() {
        var b = a("#md-content").find("h2").clone();
        if (b.children().remove(), !(b.length <= 1)) {
            a("#md-content").removeClass("col-md-12"), a("#md-content").addClass("col-md-9"), a("#md-content-row").prepend('<div class="col-md-3" id="md-left-column"/>');
            var c = function () {
                var b = a("#md-left-column").css("width");
                a("#md-page-menu").css("width", b)
            };
            a(window).scroll(function () {
                c(a("#md-page-menu"));
                var b;
                a("*.md-inpage-anchor").each(function (c, d) {
                    if (void 0 === b) {
                        var e = a(d);
                        f(e) && (b = e)
                    }
                }), a("#md-page-menu a").each(function (c, d) {
                    var e = a(d);
                    b && e.toptext() === b.toptext() && (a("#md-page-menu a.active").removeClass("active"), e.addClass("active"))
                })
            });
            var e = a('<div id="md-page-menu" />'), g = 70;
            e.affix({offset: 130}), e.css("top", g);
            var h = a('<div class="panel panel-default"><ul class="list-group"/></div>'), i = h.find("ul");
            e.append(h), b.each(function (b, c) {
                var d = a(c), e = a('<li class="list-group-item" />'), f = a("<a />");
                f.attr("href", a.md.util.getInpageAnchorHref(d.toptext())), f.click(function (b) {
                    b.preventDefault();
                    var c = a(this), d = a.md.util.getInpageAnchorText(c.toptext());
                    a.md.scrollToInPageAnchor(d);
                    history.pushState(null, document.title, c.context.href);
                }), f.text(d.toptext()), e.append(f), i.append(e)
            }), a(window).resize(function () {
                c(a("#md-page-menu")), d()
            }), a.md.stage("postgimmick").subscribe(function (a) {
                a()
            }), a("#md-left-column").append(e)
        }
    }

    function h() {
        a("#md-title").wrap('<div class="container" id="md-title-container"/>'), a("#md-title").wrap('<div class="row" id="md-title-row"/>'), a("#md-menu").wrap('<div class="container" id="md-menu-container"/>'), a("#md-menu").wrap('<div class="row" id="md-menu-row"/>'), a("#md-content").wrap('<div class="container" id="md-content-container"/>'), a("#md-content").wrap('<div class="row" id="md-content-row"/>'), a("#md-body").wrap('<div class="container" id="md-body-container"/>'), a("#md-body").wrap('<div class="row" id="md-body-row"/>'), a("#md-title").addClass("col-md-12"), a("#md-content").addClass("col-md-12")
    }

    function i() {
        var b = a('<div class="page-header" />');
        a("#md-title").wrapInner(b)
    }

    function j() {
        if (0 !== a("#md-menu").find("li").length) {
            var b = window.location.hash;
            0 === b.length && (b = "#!index.md");
            var c = 'li:has(a[href="' + b + '"])';
            a("#md-menu").find(c).addClass("active")
        }
    }

    function k() {
        var b = a("p img").parents("p");
        b.each(function () {
            function b(b, c) {
                return d.each(function (b, d) {
                    var e = a(d), f = e.parent("a");
                    f.length > 0 ? f.wrap(c) : e.wrap(c)
                })
            }

            var c = a(this), d = a(this).find("img").filter(function () {
                return 0 === a(this).parents("a").length
            }).add(a(this).find("img")).addClass("img-responsive").addClass("img-thumbnail");
            c.hasClass("md-floatenv") ? 1 === d.length ? b(d, '<div class="col-sm-8" />') : 2 === d.length ? b(d, '<div class="col-sm-4" />') : b(d, '<div class="col-sm-2" />') : 1 === d.length ? b(d, '<div class="col-sm-12" />') : 2 === d.length ? b(d, '<div class="col-sm-6" />') : 3 === d.length ? b(d, '<div class="col-sm-4" />') : 4 === d.length ? b(d, '<div class="col-sm-3" />') : b(d, '<div class="col-sm-2" />'), c.addClass("row")
        })
    }

    function l() {
        a("iframe.md-external").not(".md-external-nowidth").attr("width", "450").css("width", "450px"), a("iframe.md-external").not(".md-external-noheight").attr("height", "280").css("height", "280px"), a("div.md-external").not(".md-external-noheight").css("height", "280px"), a("div.md-external").not(".md-external-nowidth").css("width", "450px")
    }

    function m() {
        var b = "";
        b += '<hr><div class="scontainer">', b += '<div class="pull-right md-copyright-footer"> ', b += '<span id="md-footer-additional"></span>', b += 'Website generated with <a href="http://www.mdwiki.info">MDwiki</a> ', b += "&copy; Timo D&ouml;rr and contributors. ", b += "</div>", b += "</div>";
        var c = a(b);
        c.css("position", "relative"), c.css("margin-top", "1em"), a("#md-all").append(c)
    }

    function n() {
        var b = a.md.config.additionalFooterText;
        b && a(".md-copyright-footer #md-footer-additional").html(b)
    }

    a.mdbootstrap = function (b) {
        return a.mdbootstrap.publicMethods[b] ? a.mdbootstrap.publicMethods[b].apply(this, Array.prototype.slice.call(arguments, 1)) : void a.error("Method " + b + " does not exist on jquery.mdbootstrap")
    }, a.mdbootstrap.events = [], a.mdbootstrap.bind = function (b, c) {
        a(document).bind(b, c), a.mdbootstrap.events.push(b)
    }, a.mdbootstrap.trigger = function (b) {
        a(document).trigger(b)
    };
    var o = "", p = {
        bootstrapify: function () {
            h(), e(), i(), k(), a("table").addClass("table").addClass("table-bordered"), a.md.stage("pregimmick").subscribe(function (b) {
                a.md.config.useSideMenu !== !1 && g(), m(), n(), b()
            }), a.md.stage("postgimmick").subscribe(function (a) {
                l(), j(), a()
            })
        }
    };
    a.mdbootstrap.publicMethods = a.extend({}, a.mdbootstrap.publicMethods, p)
}(jQuery), function (a) {
    a.gimmicks = a.fn.gimmicks = function (b) {
        return void 0 !== b ? a.fn.gimmicks.methods[b] ? a.fn.gimmicks.methods[b].apply(this, Array.prototype.slice.call(arguments, 1)) : void a.error("Gimmick " + b + " does not exist on jQuery.gimmicks") : void 0
    }
}(jQuery), function (a) {
    function b() {
        var b = a(c());
        b.each(function () {
            var b = a(this.p), c = this.alertType;
            b.addClass("alert"), "note" === c ? b.addClass("alert-info") : "hint" === c ? b.addClass("alert-success") : "warning" === c && b.addClass("alert-warning")
        })
    }

    function c() {
        var b = ["note", "beachte"],
            c = ["achtung", "attention", "warnung", "warning", "atención", "guarda", "advertimiento"],
            d = ["hint", "tipp", "tip", "hinweis"], e = b.concat(c);
        e = e.concat(d);
        var f = [];
        return a("p").filter(function () {
            var g = a(this);
            a(e).each(function (e, h) {
                var i = g.text().toLowerCase(), j = new RegExp(h + "(:|!)+.*", "i"), k = "none";
                null !== i.match(j) && (a.inArray(h, b) >= 0 ? k = "note" : a.inArray(h, c) >= 0 ? k = "warning" : a.inArray(h, d) >= 0 && (k = "hint"), f.push({
                    p: g,
                    alertType: k
                }))
            })
        }), f
    }

    var d = {
        name: "alerts", load: function () {
            a.md.stage("bootstrap").subscribe(function (a) {
                b(), a()
            })
        }
    };
    a.md.registerGimmick(d)
}(jQuery), function (a) {
    var b = {
        name: "colorbox", load: function () {
            a.md.stage("gimmick").subscribe(function (b) {
                a.gimmicks("colorbox"), b()
            })
        }
    };
    a.md.registerGimmick(b);
    var c = {
        colorbox: function () {
            var b;
            b = a(this instanceof jQuery ? this : ".md-image-group");
            var c = 0;
            return b.each(function () {
                var b = a(this), d = "gallery-group-" + c++;
                b.find("a.md-image-selfref img").parents("a").colorbox({
                    rel: d,
                    opacity: .75,
                    slideshow: !0,
                    maxWidth: "95%",
                    maxHeight: "95%",
                    scalePhotos: !0,
                    photo: !0,
                    slideshowAuto: !1
                })
            })
        }
    };
    a.gimmicks.methods = a.extend({}, a.fn.gimmicks.methods, c)
}(jQuery), function (a) {
    "use strict";

    function b(b, c, d) {
        var e = a('<div id="myCarousel" class="carousel slide"></div>'), f = a('<div class="carousel-inner"/>');
        e.append('<ol class="carousel-indicators" />');
        var g = [];
        a.each(d.split(","), function (b, c) {
            g.push(a.trim(c)), e.find("ol").append('<li data-target="#myCarousel" data-slide-to="' + b + '" class="active" /');
            var d;
            d = 0 === b ? '<div class="active item"/>' : '<div class="item"/>', f.append(a(d).append('<img src="' + c + '"/>'))
        }), e.append(f), e.append('<a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>'), e.append('<a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>'), b.replaceWith(e)
    }

    var c = {
        name: "Themes", version: a.md.version, once: function () {
            a.md.linkGimmick(this, "carousel", b)
        }
    };
    a.md.registerGimmick(c)
}(jQuery), function (a) {
    var b = {
        name: "disqus", version: a.md.version, once: function () {
            a.md.linkGimmick(this, "disqus", d)
        }
    };
    a.md.registerGimmick(b);
    var c = !1, d = function (b, d) {
        var e = {identifier: ""}, f = a.extend(e, d),
            g = a('<div id="disqus_thread" class="md-external md-external-noheight md-external-nowidth" ><a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a></div>');
        return g.css("margin-top", "2em"), b.each(function (b, d) {
            if (c !== !0) {
                c = !0;
                var e = a(d), h = e.attr("href");
                void 0 !== h && h.length > 0 && (e.remove(), a("#md-content").append(g), a("#disqus_thread").length > 0 && !function () {
                    var a, b = window.location.href;
                    a = f.identifier.length > 0 ? f.identifier : b;
                    var c = document.createElement("script");
                    c.type = "text/javascript", c.async = !0, c.src = "http://" + h + ".disqus.com/embed.js", (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(c)
                }())
            }
        })
    }
}(jQuery), function (a) {
    function b(b, c) {
        var d = {layout: "standard", showfaces: !0}, f = a.extend({}, d, c);
        return "boxcount" === f.layout && (f.layout = "box_count"), "buttoncount" === f.layout && (f.layout = "button_count"), b.each(function (b, c) {
            var d = a(c), g = d.attr("href");
            a("body").append(e);
            var h = a('<div class="fb-like" data-send="false" data-width="450"></div>');
            h.attr("data-href", g), h.attr("data-layout", f.layout), h.attr("data-show-faces", f.showfaces), d.replaceWith(h)
        })
    }

    var c = window.navigator.userLanguage || window.navigator.language, d = c + "_" + c.toUpperCase(),
        e = a('<div id="fb-root" />'),
        f = a.md.prepareLink("connect.facebook.net/" + d + "/all.js#xfbml=1", {forceHTTP: !0}),
        g = '(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "' + f + '"; fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));',
        h = {
            name: "FacebookLike", version: a.md.version, once: function () {
                a.md.linkGimmick(this, "facebooklike", b), a.md.registerScript(this, g, {
                    license: "APACHE2",
                    loadstage: "postgimmick",
                    finishstage: "all_ready"
                })
            }
        };
    a.md.registerGimmick(h)
}(jQuery), function (a) {
    "use strict";

    function b(b, c) {
        return b.each(function (b, d) {
            var e = a(d), f = {color: "red", position: "right"}, g = a.extend({}, f, c), h = g.color,
                i = g.position, j = "https://s3.amazonaws.com/github/ribbons/forkme_";
            "red" === h && (j += i + "_red_aa0000.png"), "green" === h && (j += i + "_green_007200.png"), "darkblue" === h && (j += i + "_darkblue_121621.png"), "orange" === h && (j += i + "_orange_ff7600.png"), "white" === h && (j += i + "_white_ffffff.png"), "gray" === h && (j += i + "_gray_6d6d6d.png");
            var k = e.attr("href"), l = 0,
                m = a('<a class="forkmeongithub" href="' + k + '"><img style="position: absolute; top: ' + l + ";" + i + ': 0; border: 0;" src="' + j + '" alt="Fork me on GitHub"></a>');
            a("body").prepend(m), m.find("img").css("z-index", "2000"), e.remove()
        })
    }

    var c = {
        name: "forkmeongithub", version: a.md.version, once: function () {
            a.md.linkGimmick(this, "forkmeongithub", b)
        }
    };
    a.md.registerGimmick(c)
}(jQuery), function (a) {
    "use strict";

    function b(b, c, d) {
        return a().lazygist("init"), b.each(function (b, c) {
            var e = a(c), f = a('<div class="gist_here" data-id="' + d + '" />');
            e.replaceWith(f), f.lazygist({url_template: "https://gist.github.com/{id}.js?"})
        })
    }

    var c = {
        name: "gist", once: function () {
            a.md.linkGimmick(this, "gist", b)
        }
    };
    a.md.registerGimmick(c)
}(jQuery), function (a, b, c, d) {
    "use strict";

    function e(b) {
        var e, f, g;
        if (-1 !== b.indexOf('rel="stylesheet"')) f = a(b).attr("href"), -1 === a.inArray(f, k) && (a("head").append(b), k.push(f)); else if (-1 !== b.indexOf('id="gist')) {
            if (e = /gist([\d]{1,})/g.exec(b), g = e[1], g !== d) {
                if (-1 !== a.inArray(g, l)) return;
                l.push(g), a(".gist_here[data-id=" + g + "]").append(b)
            }
        } else j.apply(c, arguments)
    }

    var f, g = "lazygist", h = "0.2pre",
        i = {url_template: "https://gist.github.com/{id}.js?file={file}", id: "data-id", file: "data-file"},
        j = c.write, k = [], l = [], m = [], n = {
            init: function (b) {
                return f = a.extend({}, i, b), c.write = e, a.each(f, function (a, b) {
                    if ("string" != typeof b) throw new TypeError(b + " (" + typeof b + ") is not a string")
                }), this.lazygist("load")
            }, load: function () {
                return this.filter("[" + f.id + "]").each(function () {
                    var b, c = a(this).attr(f.id), e = a(this).attr(f.file);
                    if (c !== d) {
                        if (-1 !== a.inArray(c, m)) return;
                        m.push(c), b = f.url_template.replace(/\{id\}/g, c).replace(/\{file\}/g, e), a.getScript(b, function () {
                        })
                    }
                })
            }, reset_write: function () {
                return c.write = j, this
            }
        };
    a.fn[g] = function (b) {
        return n[b] ? n[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist on jQuery.lazygist") : n.init.apply(this, arguments)
    }, a.fn[g].version = h
}(jQuery, window, document);
var googlemapsLoadDone;
!function (a) {
    function b(b, d) {
        {
            var e = b;
            (new Date).getTime()
        }
        return e.each(function (b, e) {
            var f = a(e), g = {zoom: 11, marker: !0, scrollwheel: !1, maptype: "roadmap"}, h = a.extend({}, g, d);
            void 0 === h.address && (h.address = f.attr("href"));
            var i = "google-map-" + Math.floor(1e5 * Math.random()),
                j = a('<div class="md-external md-external-nowidth" id="' + i + '"/>');
            f.replaceWith(j), c(h, i)
        })
    }

    function c(b, c) {
        var d = b.maptype.toUpperCase();
        b.mapTypeId = google.maps.MapTypeId[d];
        var e = new google.maps.Geocoder;
        e.geocode({address: b.address}, function (d, e) {
            if ("OK" === e) {
                var f = d[0].geometry.location, g = a.extend({}, b, {center: f}),
                    h = new google.maps.Map(document.getElementById(c), g);
                if (g.marker === !0) {
                    new google.maps.Marker({position: f, map: h})
                }
            }
        })
    }

    var d = "http://maps.google.com/maps/api/js?sensor=false&callback=googlemapsReady", e = {
        name: "googlemaps", version: a.md.version, once: function () {
            googlemapsLoadDone = a.Deferred(), a.md.linkGimmick(this, "googlemaps", b), a.md.registerScript(this, d, {
                license: "EXCEPTION",
                loadstage: "skel_ready",
                finishstage: "bootstrap"
            }), a.md.stage("bootstrap").subscribe(function (b) {
                a.md.triggerIsActive("googlemaps") ? googlemapsLoadDone.done(function () {
                    b()
                }) : b()
            })
        }
    };
    a.md.registerGimmick(e)
}(jQuery), function (a) {
    function b() {
        var b = a("pre code[class^=lang-]");
        return b.each(function () {
            var b = a(this), c = b.attr("class"), d = c.substring(5);
            b.removeClass(c), b.addClass(d);
            hljs.highlightBlock(b[0])
        })
    }

    var c = {
        name: "highlight", load: function () {
            a.md.stage("gimmick").subscribe(function (a) {
                b(), a()
            })
        }
    };
    a.md.registerGimmick(c)
}(jQuery), function (a) {
    "use strict";

    function b(b, c) {
        return b.each(function (b, d) {
            var e = a(d), f = e.attr("href"),
                g = a('<iframe class="col-md-12" style="border: 0px solid red; height: 650px;"></iframe>');
            if (g.attr("src", f), e.replaceWith(g), c.width && g.css("width", c.width), c.height) g.css("height", c.height); else {
                var h = function () {
                    var b = g.offset(), c = a(window).height(), d = c - b.top - 5;
                    g.height(d)
                };
                g.load(function () {
                    h()
                }), a(window).resize(function () {
                    h()
                })
            }
        })
    }

    var c = {
        name: "iframe", version: a.md.version, once: function () {
            a.md.linkGimmick(this, "iframe", b)
        }
    };
    a.md.registerGimmick(c)
}(jQuery), function (a) {
    function b(b) {
        b.remove();
        var c = document.createElement("script");
        c.type = "text/javascript", c.src = a.md.prepareLink("cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML", {forceHTTP: !0}), document.getElementsByTagName("head")[0].appendChild(c)
    }

    var c = {
        name: "math", once: function () {
            a.md.linkGimmick(this, "math", b)
        }
    };
    a.md.registerGimmick(c)
}(jQuery), function (a) {
    "use strict";
    var b = [{
        name: "bootstrap",
        url: "netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
    }, {
        name: "amelia",
        url: "netdna.bootstrapcdn.com/bootswatch/3.0.0/amelia/bootstrap.min.css"
    }, {
        name: "cerulean",
        url: "netdna.bootstrapcdn.com/bootswatch/3.0.0/cerulean/bootstrap.min.css"
    }, {name: "cosmo", url: "netdna.bootstrapcdn.com/bootswatch/3.0.0/cosmo/bootstrap.min.css"}, {
        name: "cyborg",
        url: "netdna.bootstrapcdn.com/bootswatch/3.0.0/cyborg/bootstrap.min.css"
    }, {name: "flatly", url: "netdna.bootstrapcdn.com/bootswatch/3.0.0/flatly/bootstrap.min.css"}, {
        name: "journal",
        url: "netdna.bootstrapcdn.com/bootswatch/3.0.0/journal/bootstrap.min.css"
    }, {
        name: "readable",
        url: "netdna.bootstrapcdn.com/bootswatch/3.0.0/readable/bootstrap.min.css"
    }, {name: "simplex", url: "netdna.bootstrapcdn.com/bootswatch/3.0.0/simplex/bootstrap.min.css"}, {
        name: "slate",
        url: "netdna.bootstrapcdn.com/bootswatch/3.0.0/slate/bootstrap.min.css"
    }, {
        name: "spacelab",
        url: "netdna.bootstrapcdn.com/bootswatch/3.0.0/spacelab/bootstrap.min.css"
    }, {name: "united", url: "netdna.bootstrapcdn.com/bootswatch/3.0.0/united/bootstrap.min.css"}, {
        name: "yeti",
        url: "netdna.bootstrapcdn.com/bootswatch/3.0.2/yeti/bootstrap.min.css"
    }], c = !1, d = {
        name: "Themes", version: a.md.version, once: function () {
            a.md.linkGimmick(this, "themechooser", h, "skel_ready"), a.md.linkGimmick(this, "theme", g)
        }
    };
    a.md.registerGimmick(d);
    var e = a.md.getLogger(), f = function (c) {
        if (c.inverse = c.inverse || !1, void 0 === c.url) {
            if (!c.name) return void e.error("Theme name must be given!");
            var d = b.filter(function (a) {
                return a.name === c.name
            })[0];
            if (!d) return void e.error("Theme " + name + " not found, removing link");
            c = a.extend(c, d)
        }
        a('link[rel=stylesheet][href*="netdna.bootstrapcdn.com"]').remove();
        var f = a("style[id*=bootstrap]").length > 0;
        "bootstrap" === c.name && f || (a("style[id*=bootstrap]").remove(), a('<link rel="stylesheet" type="text/css">').attr("href", a.md.prepareLink(c.url)).appendTo("head")), c.inverse === !0 ? (a("#md-main-navbar").removeClass("navbar-default"), a("#md-main-navbar").addClass("navbar-inverse")) : (a("#md-main-navbar").addClass("navbar-default"), a("#md-main-navbar").removeClass("navbar-inverse"))
    }, g = function (b, d, e) {
        d.name = d.name || e, b.each(function (b, e) {
            a.md.stage("postgimmick").subscribe(function (b) {
                a(e);
                void 0 !== window.localStorage.theme && c || f(d), b()
            })
        }), b.remove()
    }, h = function (d, e, f) {
        return c = !0, a.md.stage("bootstrap").subscribe(function (a) {
            i(e), a()
        }), d.each(function (c, d) {
            var e = a(d), g = a('<a href=""></a><ul></ul>');
            g.eq(0).text(f), a.each(b, function (b, c) {
                var d = a("<li></li>");
                g.eq(1).append(d);
                a("<a/>").text(c.name).attr("href", "").click(function (a) {
                    a.preventDefault(), window.localStorage.theme = c.name, window.location.reload()
                }).appendTo(d)
            }), g.eq(1).append('<li class="divider" />');
            var h = a("<li/>"), i = a("<a>Use default</a>");
            i.click(function (a) {
                a.preventDefault(), window.localStorage.removeItem("theme"), window.location.reload()
            }), h.append(i), g.eq(1).append(h), g.eq(1).append('<li class="divider" />'), g.eq(1).append('<li><a href="http://www.bootswatch.com">Powered by Bootswatch</a></li>'), e.replaceWith(g)
        })
    }, i = function (b) {
        window.localStorage.theme && (b = a.extend({name: window.localStorage.theme}, b), f(b))
    }
}(jQuery), function (a) {
    var b = a.md.prepareLink("platform.twitter.com/widgets.js"),
        c = '!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="' + b + '";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");',
        d = {
            name: "TwitterGimmick", version: a.md.version, once: function () {
                a.md.linkGimmick(this, "twitterfollow", e), a.md.registerScript(this, c, {
                    license: "EXCEPTION",
                    loadstage: "postgimmick",
                    finishstage: "all_ready"
                })
            }
        };
    a.md.registerGimmick(d);
    var e = function (b) {
        return b.each(function (b, c) {
            var d, e = a(c), f = e.attr("href");
            if (f.indexOf("twitter.com") <= 0) {
                d = e.attr("href"), f = a.md.prepareLink("twitter.com/" + d), "@" === d[0] && (d = d.substring(1));
                var g = a('<a href="' + f + '" class="twitter-follow-button" data-show-count="false" data-lang="en" data-show-screen-name="false">@' + d + "</a>");
                e.replaceWith(g)
            }
        })
    }
}(jQuery), function (a) {
    function b() {
        var b = a("a[href*=youtube\\.com]:empty, a[href*=youtu\\.be]:empty");
        b.each(function () {
            var b = a(this), c = b.attr("href");
            if (void 0 !== c) {
                var d = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/, e = c.match(d);
                if (e && 11 === e[1].length) {
                    var f = e[1], g = a('<iframe class="md-external" frameborder="0" allowfullscreen></iframe>');
                    g.attr("src", "http://youtube.com/embed/" + f), b.replaceWith(g)
                }
            }
        })
    }

    var c = {
        name: "youtube", load: function () {
            a.md.stage("gimmick").subscribe(function (a) {
                b(), a()
            })
        }
    };
    a.md.registerGimmick(c)
}(jQuery), function (a) {
    "use strict";

    function b(b, c) {
        var d = {type: "class", style: "plain", direction: "LR", scale: "100"}, e = a.extend({}, d, c);
        return b.each(function (b, c) {
            var d = a(c), f = "http://yuml.me/diagram/", g = d.attr("href"), h = d.attr("title");
            h = h ? h : "", g = g.replace(new RegExp("`", "g"), "(").replace(new RegExp("´", "g"), ")"), f += e.style + ";dir:" + e.direction + ";scale:" + e.scale + "/" + e.type + "/" + g;
            var i = a('<img src="' + f + '" title="' + h + '" alt="' + h + '">');
            d.replaceWith(i)
        })
    }

    var c = {
        name: "yuml", version: a.md.version, once: function () {
            a.md.linkGimmick(this, "yuml", b), a.md.registerScript(this, "", {
                license: "LGPL",
                loadstage: "postgimmick",
                finishstage: "all_ready"
            })
        }
    };
    a.md.registerGimmick(c)
}(jQuery);

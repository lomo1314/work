!function () {
    function f(a) {
        for (var b = 0; b < e.length; b++)e[b].className = b === a ? "visit" : "null";
        c.innerHTML = e[a].innerHTML
    }

    function M() {
        $(".TT2").animate({left: 994}, 200), $(".TT3").animate({left: 1245}, 200), $(".TT4").animate({left: 1490}, 200), $(".TT5").animate({left: 1740}, 200)
    }

    function N() {
        $(".TT1").animate({left: -250}, 200), $(".TT2").animate({left: 0}, 150), $(".TT3").animate({left: 994}, 200), $(".TT4").animate({left: 1244}, 200), $(".TT5").animate({left: 1494}, 200)
    }

    function O() {
        $(".TT1").animate({left: -500}, 280), $(".TT2").animate({left: -750}, 300), $(".TT3").animate({left: 0}, 200), $(".TT4").animate({left: 994}, 200), $(".TT5").animate({left: 1244}, 230)
    }

    function P() {
        $(".TT1").animate({left: -750}, 300), $(".TT2").animate({left: -500}, 300), $(".TT3").animate({left: -250}, 220), $(".TT4").animate({left: 0}, 220)
    }

    function Q() {
        $(".TT5").animate({left: 250}, 200), $(".TT1").animate({left: -750}, 300), $(".TT2").animate({left: -500}, 300), $(".TT3").animate({left: -250}, 210), $(".TT4").animate({left: 0}, 210)
    }

    var b, c, d, e, g, h, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, C, D, E, F, G, H, I, J, K, L, R;
    for ($(function () {
        function b() {
            var d, b = "", c = "";
            for (d = 0; d < a.length; d++)b += "<li trueImg='" + a[d] + "'></li>", c += "<li>" + (d + 1) + "</li>";
            $(".img").html(b), $(".num").html(c)
        }

        function c() {
            for (var b = 0; b < a.length; b++)~function (a) {
                var b = $(".img li")[a], c = new Image;
                c.src = b.getAttribute("trueImg"), c.onload = function () {
                    b.appendChild(c), animate(c, {opacity: 1}, 300)
                }
            }(b)
        }

        function f() {
            d++, d == a.length && (d = 0), $(".img li").eq(d).fadeIn(300).siblings().fadeOut(300), $(".num li").eq(d).addClass("active").siblings().removeClass("active")
        }

        function g() {
            d--, -1 == d && (d = a.length - 1), $(".img li").eq(d).fadeIn(300).siblings().fadeOut(300), $(".num li").eq(d).addClass("active").siblings().removeClass("active")
        }

        var d, e, a = ["img/ban1.jpg", "img/ban2.jpg", "img/ban3.jpg", "img/ban4.jpg", "img/ban5.jpg"];
        b(), setTimeout(c, 250), $(".img li").eq(0).show(), $(".num li").eq(0).addClass("active"), $(".num li").mouseover(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var a = $(this).index();
            d = a, $(".img li").eq(a).stop().fadeIn(300).siblings().stop().fadeOut(300)
        }), d = 0, e = setInterval(f, 1800), $(".right").click(function () {
            f()
        }), $(".left").click(function () {
            g()
        }), $(".out").hover(function () {
            clearInterval(e)
        }, function () {
            e = setInterval(f, 1800)
        })
    }), document.getElementById("top1"), b = document.getElementById("topUl"), c = b.getElementsByTagName("span")[0], d = document.getElementById("addList"), e = d.getElementsByTagName("a"), b.onmouseenter = function () {
        d.style.display = "block"
    }, b.onmouseleave = function () {
        d.style.display = "none"
    }, d.onmouseenter = function () {
        d.style.display = "block", b.className = "select"
    }, d.onmouseleave = function () {
        d.style.display = "none", b.className = "topUl"
    }, g = 0; g < e.length; g++)e[g].t = g, e[g].onclick = function () {
        f(this.t)
    };
    for (h = document.getElementById("li4"), h.getElementsByTagName("a")[0], j = document.getElementById("myJd"), h.onmouseenter = function () {
        j.style.display = "block"
    }, h.onmouseleave = function () {
        j.style.display = "none"
    }, j.onmouseenter = function () {
        j.style.display = "block", h.className = "liover"
    }, j.onmouseleave = function () {
        j.style.display = "none", h.className = "li4"
    }, k = document.getElementById("saoma"), l = document.getElementById("li3"), l.onmouseenter = function () {
        k.style.display = "block"
    }, l.onmouseleave = function () {
        k.style.display = "none"
    }, k.onmouseenter = function () {
        l.className = "li3l", k.style.display = "block"
    }, k.onmouseleave = function () {
        k.style.display = "none", l.className = "li3"
    }, m = document.getElementById("saoma1"), n = document.getElementById("li7"), n.onmouseenter = function () {
        m.style.display = "block"
    }, n.onmouseleave = function () {
        m.style.display = "none"
    }, m.onmouseenter = function () {
        n.className = "li7l", m.style.display = "block"
    }, m.onmouseleave = function () {
        m.style.display = "none", n.className = "li7"
    }, o = document.getElementById("list"), p = document.getElementById("li5"), p.onmouseenter = function () {
        o.style.display = "block"
    }, p.onmouseleave = function () {
        o.style.display = "none"
    }, o.onmouseenter = function () {
        p.className = "li5l", o.style.display = "block"
    }, o.onmouseleave = function () {
        o.style.display = "none", p.className = "li5"
    }, q = document.getElementById("navigation"), r = document.getElementById("li6"), r.onmouseenter = function () {
        q.style.display = "block"
    }, r.onmouseleave = function () {
        q.style.display = "none"
    }, q.onmouseenter = function () {
        r.className = "li6l", q.style.display = "block"
    }, q.onmouseleave = function () {
        q.style.display = "none", r.className = "li6"
    }, s = document.getElementById("topImg"), t = document.getElementById("cont"), u = s.getElementsByTagName("a")[0], u.onclick = function () {
        animate(s, {opacity: 0}, 400, function () {
            t.removeChild(s)
        })
    }, v = document.getElementById("text"), w = document.getElementById("boxList"), v.onfocus = function () {
        this.value = "";
        var a = this.value.replace(/(^ +| +$)/g, "");
        w.style.display = a.length > 0 ? "block" : "none"
    }, v.onkeyup = function () {
        var a = this.value.replace(/(^ +| +$)/g, "");
        w.style.display = a.length > 0 ? "block" : "none"
    }, document.body.onclick = function (a) {
        a = a || window.event;
        var b = a.target || a.srcElement;
        if ("text" !== b.id)return "p" === b.tagName.toLowerCase() && "boxList" === b.parentNode.parentNode.parentNode.id ? (w.style.display = "none", v.value = "p1" === b.className ? b.innerHTML : DOM.prev(b).innerHTML, void 0) : (w.style.display = "none", void 0)
    }, x = document.getElementById("shopCart"), y = document.getElementById("no-shop"), x.onmouseenter = function () {
        y.style.display = "block"
    }, x.onmouseleave = function () {
        y.style.display = "none"
    }, z = document.getElementById("store1"), A = z.getElementsByTagName("li"), document.getElementById("houseApp"), C = [], D = 1; D < A.length; D++)"store1" === A[D].parentNode.id && C.push(A[D]);
    for (E = [], F = 0; F < C.length; F++)C[F].k = F, G = C[F], H = G.getElementsByTagName("div")[0], E.push(H);
    for (g = 0; g < C.length; g++)C[g].t = g, C[g].onmouseenter = function () {
        E[this.t].style.display = "block", C[this.t].className = "selectl"
    }, C[g].onmouseleave = function () {
        E[this.t].style.display = "none", C[this.t].className = "ll"
    };
    for (g = 0; g < E.length; g++)E[g].p = g, E[g].style.top = 31 * -g + "px", E[g].onmouseenter = function () {
        C[this.p].className = "selectl"
    }, E[g].onmouseleave = function () {
        C[this.p].className = "ll"
    };
    for (I = document.getElementById("leftUl"), J = I.getElementsByTagName("i"), g = 0; g < J.length; g++)K = J[g], K.className = "oli" + (g + 1);
    !function () {
        var b, a = 0;
        $("#leftUl>li:lt(4)").mouseenter(function () {
            if (0 == a % 2) {
                $(".lfNav").slideUp(500);
                var b = $(this).index()
            }
            $("#leftUl>li:lt(4)").mouseleave(function () {
                a = 0
            }), $("#lfLi>li:lt(4)").each(function (a, c) {
                a === b ? $(c).addClass("lfselect ") : $(c).removeClass("lfselect")
            }), $("#lfLi>li:lt(4)").parent().siblings().each(function (a, c) {
                a === b ? $(c).addClass("lfselect ") : $(c).removeClass("lfselect")
            })
        }), $("#lfLi").siblings().children(".dele").click(function () {
            $(".lfNav").slideDown(500), a = 1
        }), b = document.getElementById("inp"), $("#lfLi>li:lt(4)").mouseenter(function () {
            b.value = "移动、联通、电信";
            var a = $(this).index();
            $(this).addClass("lfselect").siblings().removeClass("lfselect"), $(this).parent().siblings().each(function (b, c) {
                b === a ? $(c).addClass("lfselect") : $(c).removeClass("lfselect")
            })
        })
    }(), function () {
        var a = document.getElementById("utiler"), b = document.getElementById("innt"), c = document.getElementById("left1"), d = document.getElementById("right1"), e = 0;
        a.onmouseover = function () {
            d.style.display = c.style.display = "block"
        }, a.onmouseout = function () {
            d.style.display = c.style.display = "none"
        }, d.onclick = function () {
            e++, e > 3 && (b.style.left = "0px", e = 1), animate(b, {left: 1e3 * -e}, 500)
        }, c.onclick = function () {
            e--, 0 > e && (b.style.left = "-3000px", e = 2), animate(b, {left: 1e3 * -e}, 500)
        }
    }(), L = null, $(".TT1").mouseenter(function () {
        window.clearTimeout(L), L = window.setTimeout(M, 300)
    }), $(".TT1").mouseleave(function () {
        window.clearTimeout(L), $(".TT2").animate({left: 250}, 200), $(".TT3").animate({left: 500}, 200), $(".TT4").animate({left: 750}, 200), $(".TT5").animate({left: 994}, 200)
    }), $(".TT2").mouseenter(function () {
        window.clearTimeout(L), L = window.setTimeout(N, 300)
    }), $(".TT2").mouseleave(function () {
        window.clearTimeout(L), $(".TT1").animate({left: 0}, 200), $(".TT2").animate({left: 250}, 200), $(".TT3").animate({left: 500}, 200), $(".TT4").animate({left: 750}, 200), $(".TT5").animate({left: 994}, 200)
    }), $(".TT3").mouseenter(function () {
        window.clearTimeout(L), L = window.setTimeout(O, 300)
    }), $(".TT3").mouseleave(function () {
        window.clearTimeout(L), $(".TT1").animate({left: 0}, 140), $(".TT2").animate({left: 250}, 150), $(".TT3").animate({left: 500}, 200), $(".TT4").animate({left: 750}, 200), $(".TT5").animate({left: 994}, 200)
    }), $(".TT4").mouseenter(function () {
        window.clearTimeout(L), L = window.setTimeout(P, 300)
    }), $(".TT4").mouseleave(function () {
        window.clearTimeout(L), $(".TT1").animate({left: 0}, 150), $(".TT2").animate({left: 250}, 180), $(".TT3").animate({left: 500}, 200), $(".TT4").animate({left: 750}, 200)
    }), $(".TT5").mouseenter(function () {
        window.clearTimeout(L), L = window.setTimeout(Q, 300)
    }), $(".TT5").mouseleave(function () {
        window.clearTimeout(L), $(".TT1").animate({left: 0}, 150), $(".TT2").animate({left: 250}, 150), $(".TT3").animate({left: 500}, 200), $(".TT4").animate({left: 750}, 200), $(".TT5").animate({left: 994}, 200)
    }), function () {
        function d(a) {
            for (var d = 0; d < b.length; d++)b[d].className = "", c[d + 1].className = " siv";
            b[a].className = "seler", c[a + 1].className = "selc siv"
        }

        var e, a = document.getElementById("seList"), b = a.getElementsByTagName("li"), c = DOM.siblings(a);
        for (e = 0; e < b.length; e++)b[e].t = e, b[e].onmouseenter = function () {
            d(this.t)
        }
    }(), function () {
        function d(a) {
            for (var d = 0; d < b.length; d++)b[d].className = "", c[d + 1].className = " siv";
            b[a].className = "seler", c[a + 1].className = "selc siv"
        }

        var e, a = document.getElementById("seList1"), b = a.getElementsByTagName("li"), c = DOM.siblings(a);
        for (e = 0; e < b.length; e++)b[e].t = e, b[e].onmouseenter = function () {
            d(this.t)
        }
    }(), R = document.getElementById("inp"), R.onclick = function () {
        R.value = ""
    }, function () {
        $(".btn-change").click(function () {
            var a = $(".addres").find("option:selected").text(), b = $(".addres1").find("option:selected").text();
            $(".addres").find("option:selected").text(b), $(".addres1").find("option:selected").text(a)
        })
    }(), function () {
        function a(a, b, c, d, e) {
            function n() {
                var c, d, a = "";
                for (c = 0; c < f.length; c++)a += "<div trueImg='" + f[c] + "'></div>";
                for (a += "<div trueImg='" + f[0] + "'></div>", h.innerHTML = a, a = "", c = 0; c < f.length; c++)d = 0 === c ? "selectLi" : null, a += "<li class='" + d + "'></li>";
                l = h.getElementsByTagName("div")[0], m = utils.getCss(l, "width"), b.innerHTML = a, h.style.width = j.length * m + "px", b.style.width = 20 * k.length + "px"
            }

            function o() {
                for (var a = 0; a < j.length; a++)~function (a) {
                    var b = j[a], c = new Image;
                    c.src = b.getAttribute("trueImg"), c.onload = function () {
                        b.appendChild(c), animate(c, {opacity: 1}, 500)
                    }
                }(a)
            }

            function q() {
                p++, p > f.length && (h.style.left = "0px", p = 1), animate(h, {left: -p * m}, 300), s()
            }

            function s() {
                var b, a = p >= k.length ? 0 : p;
                for (b = 0; b < k.length; b++)k[b].className = b === a ? "selectLi" : null
            }

            var j, k, l, m, p, r, t, f = ["img/init1.jpg", "img/init2.jpg", "img/init3.jpg", "img/init4.jpg"], g = document.getElementById(e), h = document.getElementById(a);
            for (h.getElementsByTagName("img"), b = document.getElementById(b), c = document.getElementById(c), d = document.getElementById(d), j = h.getElementsByTagName("div"), k = b.getElementsByTagName("li"), l = null, m = null, n(), window.setTimeout(o, 500), p = 0, r = window.setInterval(q, 3e3), t = 0; t < k.length; t++)k[t].t = t, k[t].onclick = function () {
                window.clearInterval(r), animate(h, {left: this.t * -m}, 500), p = this.t, r = window.setInterval(q, 3e3), s()
            };
            g.onmouseover = function () {
                c.style.display = d.style.display = "block"
            }, g.onmouseout = function () {
                c.style.display = d.style.display = "none"
            }, c.onclick = function () {
                window.clearInterval(r), q(), r = window.setInterval(q, 3e3)
            }, d.onclick = function () {
                window.clearInterval(r), p--, 0 > p && (h.style.left = -f.length * m + "px", p = f.length - 1), animate(h, {left: -p * m}, 500), r = window.setInterval(q, 3e3), s()
            }
        }

        a("inti", "tipe", "righte", "lefte", "outi"), a("inti1", "tips", "rights", "lefts", "outi1")
    }(), function () {
        var c, a = document.getElementById("ridd1"), b = a.getElementsByTagName("li");
        for (c = 0; c < b.length; c++)b[c].onmouseleave = function () {
            var a = DOM.children(this, "div");
            animate(a, {right: "-27px"}, 1e3, 4)
        }
    }(), document.documentElement.clientHeight || document.body.clientHeight, function () {
        $(window).scroll(function () {
            document.body.scrollTop > 200 ? ($("#floor").css("display", "block"), $(".nn").css("display", "block")) : $(".nn").css("display", "none")
        }), $(".nn").click(function () {
            $("body").stop().animate({scrollTop: 0})
        }), $("#floor li").click(function () {
            console.log($("#floor li"));
            var a = $(this).index();
            0 === a ? $("body").stop().animate({scrollTop: 200}) : 1 === a ? $("body").stop().animate({scrollTop: 724}) : 2 === a ? $("body").stop().animate({scrollTop: 1333}) : 3 === a && $("body").stop().animate({scrollTop: 2111})
        })
    }()
}();
(function(){
var inoutDiv=document.getElementById("input");
var divInput=inoutDiv.getElementsByTagName("div")[0];
var inputP=divInput.getElementsByTagName("a");
var oInput=inoutDiv.getElementsByTagName("input")[0];
var hideUl=document.getElementById("hide");
var hideLi=hideUl.getElementsByTagName("li");
var hideA=hideUl.getElementsByTagName("a");

oInput.onmousedown=oInput.onkeydown=function(e){
    e=e||window.event;
    oInput.value=null;
    divInput.style.display = "none";
    hideUl.style.display="block";
    e.stopPropagation();
    e.cancelBubble=true;

};
document.onmousedown=function(){
    hideUl.style.display="none";
    divInput.style.display = "block";
    if(!oInput.value){
        oInput.value="课程搜索，问答或wiki";
    }
};

for(var i=0;i<hideA.length;i++){
    hideA[i].i=i;
    hideA[i].onmousedown=function(e){
        e=e||window.event;
        oInput.value=hideA[this.i].innerHTML;
        e.stopPropagation();
        e.cancelBubble=true;

    }
}
})();

(function(){
var pOut=document.getElementById("pOut");
var lastCatalogue=document.getElementById("lastCatalogue");
var p1=document.getElementById("p1");
    var p2=document.getElementById("p2");
    var p3=document.getElementById("p3");
    var p4=document.getElementById("p4");
    var p5=document.getElementById("p5");
    var ul2=document.getElementById("ul2");
    var ul3=document.getElementById("ul3");
    var ul4=document.getElementById("ul4");
    var ul5=document.getElementById("ul5");

    p1.onmouseenter=function(){
        p1.style.color="#54bc66";
    };
    p1.onmouseleave=function(){
        p1.style.color="black"
    };
    ul2.onmouseenter=p2.onmouseenter=function(){
        p2.style.color="#54bc66";
        ul2.style.backgroundColor="#eae4e4";
        var li=ul2.getElementsByTagName("li");
        for(var i=0;i<li.length;i++){
            li[i].i=i;
            li[i].onmouseenter=function() {
                li[this.i].style.color = "#54bc66";
            }
        }
    };
        ul2.onmouseleave=p2.onmouseleave=function(){
            p2.style.color="black"
            ul2.style.backgroundColor="white";
            var li=ul2.getElementsByTagName("li");
            for(var i=0;i<li.length;i++){
                li[i].i=i;
                li[i].onmouseleave=function() {
                    li[this.i].style.color = "black";
                }
            }
    };
    ul3.onmouseenter=p3.onmouseenter=function(){
        p3.style.color="#54bc66";
        ul3.style.backgroundColor="#eae4e4";
        var li=ul3.getElementsByTagName("li");
        for(var i=0;i<li.length;i++){
            li[i].i=i;
            li[i].onmouseenter=function() {
                li[this.i].style.color = "#54bc66";
            }
        }
    };
    ul3.onmouseleave=p3.onmouseleave=function(){
        p3.style.color="black"
        ul3.style.backgroundColor="white";
        var li=ul3.getElementsByTagName("li");
        for(var i=0;i<li.length;i++){
            li[i].i=i;
            li[i].onmouseleave=function() {
                li[this.i].style.color = "black";
            }
        }
    };
    ul4.onmouseenter=p4.onmouseenter=function(){
        p4.style.color="#54bc66";
        ul4.style.backgroundColor="#eae4e4";
        var li=ul4.getElementsByTagName("li");
        for(var i=0;i<li.length;i++){
            li[i].i=i;
            li[i].onmouseenter=function() {
                li[this.i].style.color = "#54bc66";
            }
        }
    };
    ul4.onmouseleave=p4.onmouseleave=function(){
        p4.style.color="black"
        ul4.style.backgroundColor="white";
        var li=ul4.getElementsByTagName("li");
        for(var i=0;i<li.length;i++){
            li[i].i=i;
            li[i].onmouseleave=function() {
                li[this.i].style.color = "black";
            }
        }

    };
    ul5.onmouseenter=p5.onmouseenter=function(){
        p5.style.color="#54bc66";
        ul5.style.backgroundColor="#eae4e4";
        var li=ul5.getElementsByTagName("li");
        for(var i=0;i<li.length;i++){
            li[i].i=i;
            li[i].onmouseenter=function() {
                li[this.i].style.color = "#54bc66";
            }
        }
    };
    ul5.onmouseleave=p5.onmouseleave=function(){
        p5.style.color="black"
        ul5.style.backgroundColor="white";
        var li=ul5.getElementsByTagName("li");
        for(var i=0;i<li.length;i++){
            li[i].i=i;
            li[i].onmouseleave=function() {
                li[this.i].style.color = "black";
            }
        }
    };

    pOut.onmouseenter=function(e){
        e=e||window.event;
        lastCatalogue.style.display="block";
    };
    pOut.onmouseleave=function(e){
        e=e||window.event;
        lastCatalogue.style.display="none";
    };
    lastCatalogue.onmouseenter=function(e){
        e=e||window.event;
        lastCatalogue.style.display="block";
    };
    lastCatalogue.onmouseleave=function(e){
        e=e||window.event;
        lastCatalogue.style.display="none";
    };
})();

(function() {
    var menu = document.getElementById("menu");
    var lis = menu.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
        var oLis = lis[i];
        var oIn = oLis.getElementsByTagName("div")[0];
        var dds=oIn.getElementsByTagName("dd");
        var dts=oIn.getElementsByTagName("dt");
        for(var v=0;v<dts.length;v++){
            dts[v].k=v;
            dts[v].onmouseover=function(){
                this.style.color="#54bc66";
            };
            dts[v].onmouseout=function(){
                this.style.color="black";
            }
        }
        for(var k=0;k<dds.length;k++){
            dds[k].k=k;
            dds[k].onmouseover=function(){
                this.style.color="#54bc66";
            };
            dds[k].onmouseout=function(){
                this.style.color="black";
            }
        }
        oLis.inner = oIn;
        oLis.onmouseover = function () {
            this.inner.style.display = "block";
            this.style["border-left"] ="2px solid #54bc66";
            this.style["border-right"] ="2px solid white";
            this.style["border-top"]= this.style["border-bottom"]="1px solid #cfcdcd";
            this.style.color="#54bc66";
            this.inner.style.color="black";
            var imgs=this.getElementsByTagName("img")[0];
            imgs.style.display="none"
        };
        oLis.onmouseout = function () {
            this.inner.style.display = "none";
            this.style.color="black";
            this.style["border-left"] ="2px solid white"
            this.style["border-right"] ="2px  ";
            this.style["border-top"]= this.style["border-bottom"]="1px solid #f6f1f1";
            var imgs=this.getElementsByTagName("img")[0];
            imgs.style.display="block"
        };
    }
    })();

var animate = (function () {
    var getCss = function (curEle, attr) {
        var val, reg;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                var temp = curEle.currentStyle["filter"];
                reg = /^alpha\(opacity=((?:\d|(?:[1-9]\d+))(?:\.\d+)?)\)$/;
                temp = reg.exec(temp);
                val = temp ? temp[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^-?(\d|([1-9]\d+))(\.\d+)?(px|pt|em|rem|vh|vw)$/;
        return reg.test(val) ? parseFloat(val) : val;
    };
    var setCss = function (curEle, attr, value) {
        var reg = /^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?))$/;
        if (attr === "opacity") {
            value = parseFloat(value);
            value = value < 0 || value > 1 ? 1 + value : value;
            curEle["style"]["opacity"] = value;
            curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
        } else if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
        } else if (reg.test(attr)) {
            curEle["style"][attr] = isNaN(value) ? value : value + "px";
        } else {
            curEle["style"][attr] = value;
        }
    };
    var zhufengEffect = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - zhufengEffect.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) {
                    return zhufengEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                }
                return zhufengEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        },
        Quad: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t + b;
                }
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                }
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Back: {
            easeIn: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) {
                    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                }
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Elastic: {
            easeIn: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        }
    };
    return function (curEle, options, duration, effect, callback) {
        var fnEffect = zhufengEffect.Linear;
        if (typeof effect === "number") {
            //1->Linear 2->Elastic-easeOut 3->Back-easeOut 4->Bounce-easeOut 5->Expo-easeIn
            var ary = ["Linear", "Elastic-easeOut", "Back-easeOut", "Bounce-easeOut", "Expo-easeIn"];
            for (var i = 0; i < ary.length; i++) {
                if (effect === (i + 1)) {
                    var curItem = ary[i].split("-");
                    var curItemFir = curItem[0];
                    var curItemTwo = curItem[1];
                    fnEffect = curItem.length === 1 ? zhufengEffect[curItemFir] : zhufengEffect[curItemFir][curItemTwo];
                    break;
                }
            }
        } else if (effect instanceof Array) {
            var effectFir = effect[0];
            var effectTwo = effect[1];
            fnEffect = effect.length === 1 ? zhufengEffect[effectFir] : zhufengEffect[effectFir][effectTwo];
        } else if (typeof effect === "function") {
            callback = effect;
        }
        var times = 0, interval = 15, oBegin = {}, oChange = {};
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                oBegin[key] = getCss(curEle, key);
                oChange[key] = options[key] - oBegin[key];
            }
        }
        var move = function () {
            window.clearTimeout(curEle.timer);
            times += interval;
            if (times >= duration) {
                for (var key in options) {
                    if (options.hasOwnProperty(key)) {
                        setCss(curEle, key, options[key]);
                    }
                }
                typeof callback === "function" ? callback.call(curEle) : null;
                return;
            }
            for (var attr in oChange) {
                if (oChange.hasOwnProperty(attr)) {
                    var curVal = fnEffect(times, oBegin[attr], oChange[attr], duration);
                    setCss(curEle, attr, curVal);
                }
            }
            curEle.timer = window.setTimeout(move, interval);
        };
        move();
    }
})();

(function(){
   var pictureGoIn=document.getElementById("pictureGoIn");
    var click=document.getElementById("click");
    var lis=click.getElementsByTagName("li");
    var leftBig=document.getElementById("leftBig");
    var rightBig=document.getElementById("rightBig");
    var leftBigImg=leftBig.getElementsByTagName("img")[0];
    var rightBigImg=rightBig.getElementsByTagName("img")[0];
    pictureGoIn.onmouseenter=function(){
        leftBig.style.display="block";
        rightBig.style.display="block";

    }
    leftBigImg.onmouseenter=rightBigImg.onmouseenter=function(){
        leftBig.style.display="block";
        rightBig.style.display="block";
        leftBigImg.style.top=-60+"px";
        rightBigImg.style.top=-60+"px";

    }
    pictureGoIn.onmouseleave=function(){
        leftBig.style.display="none";
        rightBig.style.display="none";
        leftBigImg.style.top=0+"px";
        rightBigImg.style.top=0+"px";

    }


var step=0;
    function clickBg(){
        for(var i=0;i<lis.length;i++){
         step==i?lis[i].style.backgroundColor="red":lis[i].style.backgroundColor="white";
            lis[i].i=i;
            lis[i].onclick=function(){
                window.clearInterval(timer);
                this.style.backgroundColor="red";
                for(var k=0;k<lis.length;k++){
                    this.i==k?null:lis[k].style.backgroundColor="white";
                }
                animate(pictureGoIn,{left:(this.i)*-560},1000,4)
                step=this.i;
                timer=window.setInterval(momv,3000)
            }
        }
        step==6?lis[0].style.backgroundColor="red":null;
    }
    function momv(){
        step++;
        leftBig.onclick=function(){
            clearInterval(timer);
            step--
            animate(pictureGoIn,{left:step*-560},1000,1)
            clickBg();
        }
        rightBig.onclick=function(){

            clearInterval(timer);
            step++
            if(step>6){
                step=1;
                pictureGoIn.style.left=0+"px"
            }
            animate(pictureGoIn,{left:step*-560},1000,1)
            clickBg();
        }
        if(step>6){
            step=1;
            pictureGoIn.style.left=0+"px"
        }
        animate(pictureGoIn,{left:step*-560},1000,4)
        clickBg();
    }
    momv();
    var timer=window.setInterval(momv,4000)
})();

(function(){
    var rightBiglittle=document.getElementById("rightBiglittle");
    var leftBiglittle=document.getElementById("leftBiglittle");
    var pictureGoIn1=document.getElementById("pictureGoIn1");
    var leftBiglittleImg=leftBiglittle.getElementsByTagName("img")[0];
    var rightBiglittleImg=rightBiglittle.getElementsByTagName("img")[0];



    pictureGoIn1.addEventListener("mouseenter",function(){
        rightBiglittle.style.display="block";
        leftBiglittle.style.display="block";
    },false);
    pictureGoIn1.addEventListener("mouseleave",function(e){
        e=e||window.event;
        e.target= e.target|| e.srcElement;

        rightBiglittle.style.display="none";
        leftBiglittle.style.display="none";

    },false);

    rightBiglittle.addEventListener("mouseenter",function(){
        rightBiglittleImg.style.top=-40+"px";
        rightBiglittle.style.display="block";
        leftBiglittle.style.display="block";
    },false);
    leftBiglittle.addEventListener("mouseenter",function(){
        leftBiglittleImg.style.top=-40+"px";
        leftBiglittle.style.display="block";
        rightBiglittle.style.display="block";
    },false);
    rightBiglittle.addEventListener("mouseleave",function(){
        rightBiglittleImg.style.top=0+"px";
    },false);
    leftBiglittle.addEventListener("mouseleave",function(){
        leftBiglittleImg.style.top=0+"px";
    },false);

    var step=0;
    leftBiglittle.addEventListener("click",function(e){
       step++;
        if(step>4){
            pictureGoIn1.style.left=0+"px";
            step=1;
        }
        animate(pictureGoIn1,{left:step*-185},500,1)

    },false);
    rightBiglittle.addEventListener("click",function(){
        step--;
        if(step<0){
            pictureGoIn1.style.left=-740+"px";
            step=3;
        }
        animate(pictureGoIn1,{left:-step*185},500,1)

    },false)

})();

(function(){
    var smallCDt=document.getElementById("smallChange");
    var dts=smallCDt.getElementsByTagName("h3");
    var smallCDl=document.getElementById("smallCDl");
    var dds=smallCDl.getElementsByTagName("dd");
    var dlHover=document.getElementById("dlHover");

    smallCDl.onmouseenter=function(){
        smallCDl.style.display="block";

    };
    smallCDl.onmouseleave=function(){
        smallCDl.style.display="none";
    };
    dlHover.onmouseenter=function(){
        smallCDl.style.display="block";
    };
    dlHover.onmouseleave=function(){
        smallCDl.style.display="none";
    };

    for(var i=0;i<dts.length;i++){
        var oDt=dts[i];
        oDt.i=i;
        oDt.onmouseenter=function(){
         this.style.color="#54bc66";
            dds[this.i].style.display="block";
        }
        oDt.onmouseleave=function(){
            this.style.color="black";
            dds[this.i].style.display="none";
        }
    }
    for(var i=0;i<dds.length;i++){
        dds[i].onmouseover=function(){
            this.style.display="block"

        };
        dds[i].onmouseleave=function(){
            this.style.display="none"
        }
    }

})();//小图标有BUG有时间就修改

(function(){
    var soMuch=document.getElementById("soMuch");
    var spans=soMuch.getElementsByTagName("span");
    var soMuchUl=document.getElementById("soMuchUl");
    var soMuchLi=soMuchUl.getElementsByTagName("li");
    var divs=soMuch.getElementsByTagName("ul");//原本设置的不是UL是DIV但是soMuch下有很多很多DIV所以错误不显示
    var soLia=soMuchUl.getElementsByTagName("a");

    for(var i=0;i<soMuchLi.length;i++){
        soLia[0].style.display="block";
        soMuchLi[0].style.color="#54bc66";
        soMuchLi[0].style["border-bottom-color"]="#54bc66";
        divs[0].style.display="block";

        var soLi=soMuchLi[i];

        soLi.i=i;
        soLi.addEventListener("mouseenter",function(){

           for(var k=0;k<spans.length;k++){
               k==this.i?soLia[k].style.display="block":soLia[k].style.display="none";
               k==this.i?divs[this.i].style.display="block":divs[k].style.display="none";
               k==this.i?this.style.color="#54bc66":soMuchLi[k].style.color="black";
               k==this.i?this.style["border-bottom-color"]="#54bc66":soMuchLi[k].style["border-bottom-color"]="white";

           }

        },false)
    }


    for(var i=0;i<spans.length;i++){
        var oSpan=spans[i];
        oSpan.addEventListener("mouseenter",function(){
            var oDiv=this.getElementsByTagName("div")[0];
            oDiv.style.display="block";

            var as=this.getElementsByTagName("a")[0];

            animate(as,{height:76},500,1);
            var ps=this.getElementsByTagName("p");
            var p0Img=ps[0].getElementsByTagName("img")[1];
            p0Img.style.display="none";
            ps[1].style.display="block";
            animate(ps[2],{height:26},300,1);
            var p2Img=ps[2].getElementsByTagName("img")[1];
            p2Img.style.display="block";
        },false);

        oSpan.addEventListener("mouseleave",function(){
            var oDiv=this.getElementsByTagName("div")[0];
            oDiv.style.display="none";

            var as=this.getElementsByTagName("a")[0];

            animate(as,{height:0},500,1);
            var ps=this.getElementsByTagName("p");
            var p0Img=ps[0].getElementsByTagName("img")[1];
            p0Img.style.display="block";
            ps[1].style.display="none";
            animate(ps[2],{height:0},300,1);
            var p2Img=ps[2].getElementsByTagName("img")[1];
            p2Img.style.display="none";
        },false);
    }



})();

(function(){
    var talk=document.getElementById("talk");
    var quest=document.getElementById("quest");

    quest.addEventListener("mouseenter",function(){
        animate(talk,{opacity:1,left:145},500,1)
    },false)
    quest.addEventListener("mouseleave",function(){
        animate(talk,{opacity:0,left:140},500,1)
    },false)
})();//更系统的职业学习路径技能,没问题

(function(){
    var thirdBody=document.getElementById("thirdBody");
    var spans=thirdBody.getElementsByTagName("span");

    for(var i=0;i<spans.length;i++){
        var Ospan=spans[i];
        Ospan.addEventListener("mouseenter",function(){
            this.style.borderColor="#54bc66";
            var studyAll=this.getElementsByTagName("p");
            var study=studyAll[2];
            var studys=studyAll[3];
            study.style.display="none";
            animate(studys,{opacity:1},400,1)

        },false)

        Ospan.addEventListener("mouseleave",function(){
            this.style.borderColor="white";
            var studyAll=this.getElementsByTagName("p");
            var study=studyAll[2];
            var studys=studyAll[3];

            animate(studys,{opacity:0},400,1,function(){
                study.style.display="block";
            })

        },false)
    }

})();//职业路径图没问题

(function(){


        var talk=document.getElementById("talk2");
        var quest=document.getElementById("quest2");

        quest.addEventListener("mouseenter",function(){
            animate(talk,{opacity:1,left:145,top:-5},400,1)
        },false)
        quest.addEventListener("mouseleave",function(){
            animate(talk,{opacity:0,left:140,top:1},400,1)
        },false)


    var fourthBody=document.getElementById("fourthBody");
    var divs=fourthBody.getElementsByTagName("div");

    for(var i=1;i<divs.length;i++){
        var oDiv=divs[i];
        oDiv.addEventListener("mouseenter",function(e){
            e=e||window.event;
            var span=this.getElementsByTagName("span");
            var spanA=span[0],spanB=span[1];

            animate(spanA,{width:0,left:80},300,1,function(){
                animate(spanB,{width:162,left:0},10,1,function(){

                })
            });

            e.stopPropagation();

        },false);

        oDiv.addEventListener("mouseleave",function(e){
            e=e||window.event;
            var span=this.getElementsByTagName("span");
            var spanA=span[0],spanB=span[1];
            console.log(e.target)

            animate(spanB, {width: 0, left: 80}, 20, 1, function () {
                animate(spanA, {width: 132, left: 0}, 300, 1)
            })



        },false)


    }
})();//知识体系反转图没问题，本来在翻转速度在一定值得时候会有BUG

(function(){
    var fifthBody=document.getElementById("fifthBody");
    var imgs=fifthBody.getElementsByTagName("img");
    var Oi=fifthBody.getElementsByTagName("i");
    var divs=fifthBody.getElementsByTagName("div");
    var ps=fifthBody.getElementsByTagName("p");
    var lis=fifthBody.getElementsByTagName("li");

    for(var i=0;i<lis.length;i++){
        var Oli=lis[i];
        Oli.addEventListener("mouseenter",function(){
            this.style.color="#54bc66"
        },false)
        Oli.addEventListener("mouseleave",function(){
            this.style.color="gray"
        },false)

    }

    for(var i=0;i<ps.length;i++){
        ps[i].addEventListener("mouseenter",function(){
            this.style.color="#54bc66"
        },false)
        ps[i].i=i;
        ps[i].addEventListener("mouseleave",function(){

                this.style.color="black"

        },false)
    }
    //ps[0].addEventListener("mouseleave",function(){
    //    this.style.color="black"
    //},false)
    //ps[1].addEventListener("mouseleave",function(){
    //    this.style.color="black"
    //},false)
    //ps[2].addEventListener("mouseleave",function(){
    //    this.style.color="gray"
    //},false)

    for(var i=0;i<divs.length;i++){
        divs[i].addEventListener("mouseenter",function(){
            this.style.borderColor="#54bc66"
        },false)
        divs[i].addEventListener("mouseleave",function(){
            this.style.borderColor="white"
        },false)
    }


    for(var i=0;i<imgs.length;i++){
        var oImg=imgs[i];
        oImg.i=i;
        oImg.addEventListener("mouseenter",function(){
            Oi[this.i].style.display="block";
            animate(this,{width:133},500,1)


        },false);
        oImg.addEventListener("mouseleave",function(){
            Oi[this.i].style.display="none";
            animate(this,{width:142},500,1)
            fifthBody.style.borderColor="white"
        },false)
    }

})();
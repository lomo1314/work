/**
 * Created by Administrator on 2016/5/6.
 */
(function(){
// vivi: 通用底层函数  viviCat：组件及模块
    var vivi = {},
        viviCat = {};
    if (!configData) {
        var configData = {};
    }
//缓存系统
    var global = {
//	json: {}, //异步数据缓存
//	va: {}, //变量缓存
//	imgs: {}, //图片缓存
//	php: {}, //页面打开时php传递的数据
        v: {
            hasTouch: 'ontouchstart' in window
        } //客户端数据收集
    };

//事件集合
    var EV = global.EV = {
        ts: global.v.hasTouch ? 'touchstart' : 'mousedown',
        tm: global.v.hasTouch ? 'touchmove' : 'mousemove',
        te: global.v.hasTouch ? 'touchend' : 'mouseup',
        tz: 'onorientationchange' in window ? 'orientationchange' : 'resize'
    };

    global.v.UA = window.navigator.userAgent;
    global.v.browserinfo = {
        webkit: global.v.UA.match(/WebKit\/([\d.]+)/),
        ie: global.v.UA.match(/MSIE\s([\d.]+)/),
        iemobile: global.v.UA.match(/IEMobile\/([\d.]+)/),
        chrome: global.v.UA.match(/Chrome\/([\d.]+)/) || global.v.UA.match(/CriOS\/([\d.]+)/),
        firefox: global.v.UA.match(/Firefox\/([\d.]+)/),
        opera: global.v.UA.match(/Opera\/([\d.]+)/)
    };
    global.v.platforminfo = {
        android: global.v.UA.match(/(Android)\s+([\d.]+)/),
        ipad: global.v.UA.match(/(iPad).*OS\s([\d_]+)/),
        windowsphone: global.v.UA.match(/(Windows\sPhone)[\sOS]*([\d\.]+)/),
        windows: global.v.UA.match(/(Windows)\sNT\s([\d\.]+)/)
    };
    global.v.platforminfo.ipod = global.v.platforminfo.itouch = !global.v.platforminfo.ipad && global.v.UA.match(/(iPod\s?[Ttouch]{5})[a-zA-Z\s;]*([\d_]+)/);
    global.v.platforminfo.iphone = !global.v.platforminfo.ipad && !global.v.platforminfo.itouch && global.v.UA.match(/(iPhone\sOS)\s([\d_]+)/);

    global.v.browser = {}, global.v.platform = {};
    for (var key in global.v.browserinfo) {
        global.v.browserinfo[key] && (global.v.browser[key] = true, global.v.browser.version = global.v.browserinfo[key][1], global.v.browser.majorVersion = parseInt(global.v.browser.version) || 0);
    }
    global.v.ie = global.v.browserinfo.ie ? global.v.browser.majorVersion : false;
    for (var key in global.v.platforminfo) {
        global.v.platforminfo[key] && (global.v.platform[key] = true, global.v.platform.version = global.v.platforminfo[key][2].replace(/_/g, '.'), global.v.platform.majorVersion = parseInt(global.v.platform.version) || 0);
    }
    global.v.ios = !!(global.v.platform.iphone || global.v.platform.itouch || global.v.platform.ipad);
    global.v.pad = !!(global.v.platform.ipad || (global.v.platform.android && !global.v.UA.match(/Mobile/)));
    global.v.phone = !!(!global.v.pad && global.v.platform.android || global.v.platform.iphone || global.v.platform.windowsphone) || /meizu|lephone|xiaomi|mui|mobile|coolpad|zte|huawei/i.test(global.v.UA);
    if (global.v.phone && /safari|webkit/i.test(global.v.UA) && !/OS\s?X/i.test(global.v.UA) && !global.v.ios) {
        global.v.platform.android = true;
        global.v.browser.webkit = true;
    }
    global.v.ios && (global.v.platform.ios = global.v.ios);
    global.v.pad && (global.v.platform.pad = global.v.pad);
    global.v.phone && (global.v.platform.phone = global.v.phone);

//
    EV.tap = global.v.hasTouch ? (global.v.ios ? 'touchend' : 'click') : ('click');

    vivi = {
        g: function(sid) {
            return document.getElementById(sid);
        },
        gClass:function(className){
            return document.getElementsByClassName(className);
        },

        docEl:function(ev){//获取浏览器宽高
            var Swidth =  window.innerWidth == screen.width/2 ? screen.width/2 : screen.width  ,
                Sheight = window.innerHeight == screen.height/2 ? screen.height/2 : screen.height  ;
            var docEl = Swidth <  Sheight ? Swidth :  Sheight;
            var cW = docEl < 768 ? docEl : 768;

            return cW;
        },

        getTop:function(obj) {//获取距顶部距离
            var iTop = 0;
            while(obj) {
                iTop += obj.offsetTop;
                obj = obj.offsetParent;
            }
            return iTop;
        },

        tap: function(el, fn) {
            if (!global.v.ios) {
                el.addEventListener('click', fn, false);
            } else {
                function fnTapM(e) {
                    el.isTapClick = false;
                }

                function fnTapE(e) {
                    if (el.isTapClick) {
                        fn(e);
                    }
                    el.removeEventListener('touchmove', fnTapM, false);
                    el.removeEventListener('touchend', fnTapE, false);
                }

                el.addEventListener('touchstart', function() {
                    el.isTapClick = true;
                    el.addEventListener('touchmove', fnTapM, false);
                    el.addEventListener('touchend', fnTapE, false);

                }, false);
            }
        },

        addClass: function(obj, sClass) {
            var rg = new RegExp('\\b' + sClass + '\\b');
            if (!rg.test(obj.className)) {
                var oldName = obj.className;
                obj.className = oldName ? oldName + ' ' + sClass : sClass;
            }
        },

        removeClass: function(obj, sClass) {
            var rg = new RegExp('\\b' + sClass + '\\b');
            if (rg.test(obj.className)) {
                obj.className = obj.className.replace(rg, '').replace(/^\s+|\s+$/, '');
            }
        },

        hasClass: function(obj, sClass) {
            var rg = new RegExp('\\b' + sClass + '\\b');
            return rg.test(obj.className) ? true : false;
        },

        isChild: function(oParent, obj) {
            while (obj) {
                if (obj == oParent) {
                    return true;
                }
                obj = obj.parentNode;
            }
            return false;
        },
        bind: function(obj, sEv, fn) {
            !obj._evs && (obj._evs = []);
            obj.addEventListener(sEv, fn, false);
            obj._evs.push({
                ev_name: sEv,
                ev_fn: fn
            });
        },

        live: function(obj, sEv, fn) {
            function _fn2(ev) {
                vivi.isChild(obj, ev.target) && fn.call(obj);
            }
            document.addEventListener(sEv, _fn2, false);
        },

        transForm: function(obj, iTarget) {
            iTarget[0] = iTarget[0] + '';
            iTarget[1] = iTarget[1] + '';
            if (iTarget[0].indexOf('px') == -1) {
                iTarget[0] += 'px';
            }
            if (iTarget[1].indexOf('px') == -1) {
                iTarget[1] += 'px';
            }
            obj.style.webkitTransform = obj.style.transform = 'translateX(' + iTarget[0] + ') translateY(' + iTarget[1] + ') translateZ(0)';
        },

        tranSition: function(obj, speed, type, dlayT) {
            var ele = obj.style;
            dlayT = dlayT || 0;
            type = type || 'linear';
            if (type && type.length > 15) {
                ele.webkitTransition = ele.transition = speed + 'ms ' + type;
            } else if(type==='cubic-bezier'){
                ele.webkitTransition = ele.transition = 'all ' + speed + 'ms ' + type + dlayT;
            }else{
                ele.webkitTransition = ele.transition = 'all ' + speed + 'ms ' + type + ' ' + dlayT + 'ms';
            }
        },

        next: function(obj, ele) {
            var temp = obj.nextElementSibling || obj.nextSibling;
            if (ele) {
                if (temp.tagName.toLowerCase() == ele.toLowerCase()) {
                    return temp;
                }
            } else {
                return temp;
            }
        },
        loadImg: function( img , src ){
            var oImg = new Image();
            oImg.onload = function(){
                img.src = this.src;
            };
            oImg.src = src;

        }
    };

    vivi.Touch = function(el) {
        this.el = el;
        this.sTouchStart = EV.ts;
        this.sTouchMove = EV.tm;
        this.sTouchEnd = EV.te;
    }
    vivi.Touch.prototype.fn = function(json, touchType) {
        if (typeof json == 'function' && touchType) {
            var json2 = {};
            json2[touchType] = json;
            json = json2;
        };
        var t = {};
        var fnMove = json.move || null;

        this.el.touchfns = function(e) {

            ts.call(this, e);
        };
        this.el.touchfnm = function(e) {
            tm(this, e);
        };
        this.el.touchfne = function() {
            te.call(this);
        };

        this.el.addEventListener(this.sTouchStart, this.el.touchfns, false);
        this.el.addEventListener(this.sTouchMove, this.el.touchfnm, false);
        this.el.addEventListener(this.sTouchEnd, this.el.touchfne, false);
        this.el.onselectstart = function() {
            return false;
        };

        function ts(e) {
            var oTar = e.target;
            this.noMoveEnd = false;
            if (global.v.hasTouch) {
                t.x1 = e.touches[0].pageX;
                t.y1 = e.touches[0].pageY;
            } else {
                t.x1 = e.offsetX;
                t.y1 = e.offsetY;
            }
            t.oldX = 0;
            t.oldY = 0;
        }

        function tm(a, e) {
            if (a.noMoveEnd) {
                return;
            }
            if (a.noMove) {
                e.preventDefault();
                a.moveNum = 1;
            }
            var oTar = e.target;
            while (oTar) {
                if (oTar.getAttribute && oTar.getAttribute('t') == 'noSroll') {
                    return;
                }
                oTar = oTar.parentNode;
            }
            if (global.v.hasTouch) {
                t.x2 = e.touches[0].pageX;
                t.y2 = e.touches[0].pageY;
            } else {
                t.x2 = e.offsetX;
                t.y2 = e.offsetY;
            }

            var vv = {};
            vv.x = t.x2 - t.x1;
            vv.y = t.y2 - t.y1;

            var p = {};
            p.x = vv.x - t.oldX;
            p.y = vv.y - t.oldY;

            t.oldX = vv.x;
            t.oldY = vv.y;

            if (touchType) {
                if (touchType == 'Left' || touchType == 'Right') {
                    if (Math.abs(vv.x) > Math.abs(vv.y)) {
                        a.noMove = true;
                        e.preventDefault();
                    } else {
                        a.noMoveEnd = 1;
                        return;
                    }
                }
                if (touchType == 'Up' || touchType == 'Down') {

                    if (Math.abs(vv.y) > Math.abs(vv.x)) {
                        a.noMove = true;
                        e.preventDefault();
                    }
                }
            } else {
                e.preventDefault();
            }

            a.moveNum && fnMove && fnMove.call(a, vv, p);
            e.cancelBubble = true;
            return false;
        }

        function te(num) {
            this.noMove = false; //阻止默认行为的标识
            this.moveNum = 0; //首次按下 标识（首次move不执行回调，只做状态判断）
            this.noMoveEnd = 0; //单方向禁止 恢复
            var styleTmp = 'swipe';
            if (t.x2 || t.y2) {
                if (Math.abs(t.x2 - t.x1) > 30 || Math.abs(t.y1 - t.y2) > 30) {
                    styleTmp = (vivi.Touch.swipeDirection(t.x1, t.x2, t.y1, t.y2));
                }
            }
            if (json[styleTmp]) {
                json[styleTmp].call(this);
            } else {
                json['other'] && json['other'].call(this);
            }
            t = {};
        }
    };

    vivi.Touch.prototype.closefn = function() {
        this.el.removeEventListener(this.sTouchStart, this.el.touchfns);
        this.el.removeEventListener(this.sTouchMove, this.el.touchfnm);
        this.el.removeEventListener(this.sTouchEnd, this.el.touchfne);
    };
    vivi.Touch.prototype.close = function() {
        this.closefn();
        return this;
    };
    vivi.Touch.prototype.swipe = function(json) {
        this.fn(json);
        return this;
    };
    vivi.Touch.prototype.swipeLeft = function(fnL) {
        this.fn(fnL, 'Left');
        return this;
    };
    vivi.Touch.prototype.swipeRight = function(fnL) {
        this.fn(fnL, 'Right');
        return this;
    };
    vivi.Touch.prototype.swipeUp = function(fnL) {
        this.fn(fnL, 'Up');
        return this;
    };
    vivi.Touch.prototype.swipeDown = function(fnL) {
        this.fn(fnL, 'Down');
        return this;
    };
    vivi.Touch.prototype.swipeMove = function(fnL) {
        this.fn(fnL, 'move');
        return this;
    };
    vivi.Touch.prototype.swipeOther = function(fnL) {
        this.fn(fnL, 'other');
        return this;
    };
    vivi.Touch.swipeDirection = function(x1, x2, y1, y2, c) {
        var xDelta = Math.abs(x1 - x2),
            yDelta = Math.abs(y1 - y2);
        if (c) {
            return 'other';
        }
        return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
    };

    vivi.touch = function(a) {
        return new vivi.Touch(a);
    };

    global.vivi = vivi;
    global.viviCat = viviCat;

    /**** 业务逻辑 ****/
//滚动类
    viviCat.Focus = function(json) {
        var oBox = json.oBox,
            oDiv = json.oDiv,
            ww = json.ww,
            loop = json.loop;
        MoveAuto = json.MoveAuto;
        if (!oBox) {
            return;
        }
        var oUl = oBox.getElementsByTagName('ul')[0],
            aLi = oUl.children,
            num = aLi.length,
            oBoxWidth = oBox.offsetWidth;
        oPrev = oBox.getElementsByClassName('sub_prev')[0],
            oNext = oBox.getElementsByClassName('sub_next')[0];

        oUl.style.width = oBoxWidth*(num+2) +'px';
        for(var i=0;i<num;i++){
            aLi[i].style.width = oBoxWidth +'px';
        }
        this.el = {
            oBox: oBox,
            oDiv: json.oDiv,
            oUl: oUl,
            aLi: aLi,
            oPrev: oPrev,
            oNext: oNext,
            num: num,
            now:  0,
            oW: ww ? (oBoxWidth - ww) : oBoxWidth,
            aImg: null,
            aSpan: [],
            loop: json.loop || false,
            MoveAuto: json.MoveAuto || false,
            oTimer: oBox.oTimer,
        };
        this.init();
    };

    viviCat.Focus.prototype = {
        init: function() {
            var t = this.el;
            //单图片处理
            if (t.aLi.length <= 1) {
                var tmp = t.oBox.getElementsByTagName('img')[0];
                return;
            }
            //初始化位置、按钮、原点
            vivi.tranSition(t.oUl, 0);
            vivi.transForm(t.oUl, [-t.now * t.oW, 0]);
            t.aImg = t.oBox.getElementsByTagName('img');
            for (var i = 0; i < t.num; i++) {
                if (!t.oDiv) {
                    break;
                }
                var oSpan = document.createElement('span');
                i == 0 && (oSpan.className = 'cur');
                t.oDiv.appendChild(oSpan);
                t.aSpan.push(oSpan);
            }
            if(t.loop){
                var liFirst = t.aLi[0].cloneNode('true');
                var liLast = t.aLi[t.num-1].cloneNode('true');
                t.oUl.insertBefore(liLast,t.aLi[0]);
                t.oUl.appendChild(liFirst);
                vivi.transForm(t.oUl, [-t.oW, 0]);

            };
            //启动事件绑定
            this.bind();
            //轮播自运动
            if(t.MoveAuto){
                this.autoPlay()
            }
        },

        autoPlay: function() {
            var t = this.el,
                _t = this;
            clearInterval(t.oTimer);
            t.oTimer = setInterval(function() {
                _t.next();
            }, 4000);
        },

        bind: function() {
            var t = this.el,
                _t = this;
            vivi.touch(t.oBox).swipeLeft(function() {
                _t.next();
            }).swipeRight(function() {
                _t.prev();
            }).swipeMove(function(v) {
                clearInterval(t.oTimer);
                vivi.tranSition(t.oUl, 0);
                if(t.loop){
                    vivi.transForm(t.oUl, [-(t.now+1) * t.oW + v.x/2, 0]);
                }else{
                    vivi.transForm(t.oUl, [-t.now * t.oW + v.x/2, 0]);
                }

            }).swipeOther(function() {
                vivi.tranSition(t.oUl, 300, 'linear');
                if(t.loop){
                    vivi.transForm(t.oUl, [-(t.now+1) * t.oW, 0]);
                }else{
                    vivi.transForm(t.oUl, [-t.now * t.oW, 0]);

                }
                if(t.MoveAuto){
                    _t.autoPlay()
                }
            });
            if (t.oPrev && t.oNext) {
                t.oPrev.addEventListener('click', _t.prev, false);
                t.oNext.addEventListener('click', _t.next, false);
            }

            var focusTimer = null;
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
                clearTimeout(focusTimer);
                flowTimer = setTimeout(function() {
                    t.oW = t.ww ? (t.oBox.offsetWidth - t.ww) : t.oBox.offsetWidth;
                    vivi.tranSition(t.oUl, 300, 'linear');
                    vivi.transForm(t.oUl, [-t.now * t.oW, 0]);
                }, 200);
            }, false);
        },

        next: function() {
            var t = this.el,
                _t = this;
            t.now++;
            !t.loop && (t.now >= t.num && (t.now = t.num - 1));
            vivi.tranSition(t.oUl, 300, 'linear');
            if(t.loop){
                vivi.transForm(t.oUl, [-(t.now+1) * t.oW, 0]);
            }else{
                vivi.transForm(t.oUl, [-t.now * t.oW, 0]);
            }

            t.oBox.tEndFn = function() {
                t.now =!t.loop?t.now>= t.num? t.num-1: t.now:(t.now+t.num)%t.num;
                _t.tEnd();
            };
            setTimeout(function(){
                t.oBox.tEndFn()
            },300);

            return false;
        },

        prev: function() {

            var t = this.el,
                _t = this;
            t.now--;
            !t.loop && (t.now < 0 && (t.now = 0));
            vivi.tranSition(t.oUl, 300, 'linear');
            vivi.transForm(t.oUl, [-t.now * t.oW, 0]);

            t.oBox.tEndFn = function() {
                t.now =!t.loop?t.now<0?0: t.now:(t.now+t.num)%t.num;
                _t.tEnd();

            };
            setTimeout(function(){
                t.oBox.tEndFn()
            },300);
            return false;
        },

        tEnd: function() {

            var t = this.el,
                _t = this;
            vivi.tranSition(t.oUl, 0);
            if (t.loop) {
                vivi.transForm(t.oUl, [-(t.now+1) * t.oW, 0]);
            }else{
                vivi.transForm(t.oUl, [-t.now * t.oW, 0]);
            }

            if (t.oDiv) {
                for (i in t.aSpan) {
                    t.aSpan[i].className = '';
                }
                t.aSpan[t.now].className = 'cur';

            }
        },

    };

////文字滚动
    viviCat.TextScroll = function(obj, json) {
        var speed = json.speed,
            mount = json.mount,
            width = json.width,
            dir = json.dir;
        var obj = vivi.g(obj),
            oTimer, iNow, ulMove;
        var aul = obj.getElementsByTagName('ul')[0];
        aul.innerHTML += aul.innerHTML;
        var oli = aul.getElementsByTagName('li');
        var oliHeight = oli[0].offsetHeight,
            numLi = oli.length;
        var b;
        oliHeight = oliHeight*width;
        this.b = {
            speed: speed,
            mount: mount,
            dir: dir,
            oTimer: null,
            aul: aul,
            oli: oli,
            oliHeight: oliHeight,
            numLi: numLi,
            iNow: 0,
            ulMove: 0,
            obj: obj
        };
        this.bind();
        this.moveScroll();

    }
    viviCat.TextScroll.prototype = {
        moveScroll: function() {
            var b = this.b,
                _this = this;
            b.obj.oTimer = setInterval(function() {
                if (b.dir === 'up') { //判断向上还是向下滚动
                    b.iNow--;
                } else {
                    b.iNow++;
                };
                vivi.tranSition(b.aul, b.mount, 'linear');
                b.ulMove = b.oliHeight * b.iNow;
                vivi.transForm(b.aul, [0, b.ulMove]);
                if (Math.abs(b.iNow) > b.numLi / 2) {
                    b.iNow = 0;
                    vivi.tranSition(b.aul, 0);
                    b.ulMove = b.oliHeight * b.iNow;
                    vivi.transForm(b.aul, [0, b.ulMove]);
                }
            }, b.speed);
        },
        bind: function(ev) {
            var b = this.b,
                _this = this;
            vivi.live(b.aul, EV.ts, function() {
                clearInterval(b.obj.oTimer)
            });
            vivi.live(b.aul, EV.te, function() {
                _this.moveScroll();
            });
        }
    }

//拖动[子元素为li]
    viviCat.dragRoll = function(sid) {
        var gps = vivi.g(sid);
        if (!gps) {
            return;
        }
        var iStartX =0,// 定义触点起始x轴坐标
            iScroll=0,//控制跟随滑动
            clickOn = true,
            reg=/\-?[0-9]+\.?[0-9]*/g,
            iStartPageX=0;// 定义触点坐标的起始位置变量
        var aLi = gps.getElementsByTagName('li');
        var liWidth = aLi[0].offsetWidth;
        var winWidth=document.body.clientWidth;
        var ulWidth=0;
        var isRoll = false;
//	var ticking=false;
        for (var i = 0; i < aLi.length; i++) {
            ulWidth += aLi[i].offsetWidth;
        }
        if( liWidth-winWidth%liWidth <10 ){
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].style.width = liWidth-5 + 'px';
                ulWidth += aLi[i].offsetWidth;
            }
        }
        vivi.transForm(gps, [0, 0]);
        gps.addEventListener(EV.ts,fnStart,false);

        function fnStart(ev){
            var ev=ev||event;
            vivi.tranSition(gps, 0);
            iStartPageX=ev.changedTouches[0].pageX;
            iStartX=iScroll;
            isRoll=false;
            gps.addEventListener(EV.tm,fnMove,false);
            gps.addEventListener(EV.te,fnEnd,false);
        }

        function fnMove(ev){
            var ev = ev || event;
            ev.preventDefault();

            var iDis=ev.changedTouches[0].pageX-iStartPageX;
            try{
                var dragLongMax = gps.style.WebkitTransform.match(reg)||gps.style.transform.match(reg)||gps.style.MozTransform.match(reg);
            }catch(e){
                var dragLongMax  = gps.style.WebkitTransform.match(reg);
            }

            if(iDis > 0 && dragLongMax[0] >= 0  ){//判断最左侧
                iScroll=0;
            }else if(iDis < 0 && dragLongMax[0] <= winWidth-ulWidth  ){//判断最右侧
                iScroll=winWidth-ulWidth-10;
            }else{
                iScroll=iStartX+iDis;
            }
            vivi.transForm(gps, [iScroll, 0]);
            vivi.tranSition(gps, 0);
            isRoll = true ;
            $('#ceshi').html(iDis)
        }
        function fnEnd(ev){
            var ev=ev||event;
            var iDis=ev.changedTouches[0].pageX-iStartPageX;
            if(!isRoll){return};
            try{
                var dragLongMax = gps.style.WebkitTransform.match(reg)||gps.style.transform.match(reg)||gps.style.MozTransform.match(reg);
            }catch(e){
                var dragLongMax  = gps.style.WebkitTransform.match(reg);
            }
            if( iDis < 0 &&  dragLongMax[0] <= winWidth-ulWidth){
                return false;
            }
            var num = Math.floor(-iScroll/liWidth);
            if(num > 5  && iDis < 0){
                return;
            }
            iScroll = iScroll==0?0:-(num+1)*liWidth;
            if(iDis>0){
                iScroll = -num*liWidth;
            }
            if(iScroll>0){
                iScroll=0;
            }
            vivi.tranSition(gps, 300, 'cubic-bezier','(0.333333, 0.666667, 0.666667, 1)');
            vivi.transForm(gps, [iScroll, 0]);

            gps.removeEventListener(EV.tm,fnMove,false);
            gps.removeEventListener(EV.te,fnEnd,false);
        }
    };
//重力感应
    viviCat.ForceShak = function(obj) {
        //魅族手机浏览器不加重力感应
        var uAgent=window.navigator.userAgent;
        var MZ=uAgent.match(/MZ-/i);
        if(MZ){
            return;
        }

        var obj1 = vivi.g(obj);
        var oImg = obj1.getElementsByTagName('img');
        var oA = obj1.getElementsByTagName('a')[0];
        var x = y = z = last_x = last_y = last_z = 0;
        if (window.DeviceOrientationEvent) { //绑定函数
            window.addEventListener('deviceorientation', orientationListener, false);
            window.addEventListener('MozOrientation', orientationListener, false);
            window.addEventListener('devicemotion', orientationListener, false);
        };

        function orientationListener(ev) {
            // For FF3.6+
            if (!ev.gamma && !ev.beta) {
                ev.gamma = (ev.x * (180 / Math.PI)); //转换成角度值,
                ev.beta = (ev.y * (180 / Math.PI)); //转换成角度值
                ev.alpha = (ev.z * (180 / Math.PI)); //转换成角度值
            }
            var gamma = ev.gamma
            var beta = ev.beta
            var alpha = ev.alpha

            if (ev.accelerationIncludingGravity) {
                gamma = ev.accelerationIncludingGravity.x * 10
                beta = -ev.accelerationIncludingGravity.y * 10
            }

            if (this._lastGamma != gamma || this._lastBeta != beta) {
//			var moveX = gamma / 90 * 20;
//			var moveY = beta / 90 * 20;
//			if(Math.abs(moveX) > 10 ||  Math.abs(moveY) >10){
//				return;
//			};
                var style = obj1.style;
                style.left = gamma/20 * 3 +"px";
                style.top = beta/20 * 6+"px";

//			if (Math.abs(moveX) - Math.abs(moveY) > 0) {
//				vivi.transForm(obj1, [moveX, 0]);
//
//			} else {
//				vivi.transForm(obj1, [0, moveY]);
//
//			}
//			$('#ceshi').html(gamma/10 * 10);
                this._lastGamma = gamma;
                this._lastBeta = beta;
            }

        }
    }
//图片预加载
    viviCat.showImg = function(obj){
        var arrObj = vivi.gClass(obj);

        for(var i=0;i<arrObj.length;i++){
            var arrImg = arrObj[i].getElementsByTagName('img');
            for(var j=0;j<arrImg.length;j++){
                if(!arrImg[j].isOnload && arrImg[j].getAttribute('data-src')){
                    vivi.loadImg( arrImg[j] , arrImg[j].getAttribute('data-src') );
                    arrImg[j].isOnload = true;
                }
            }
        }

    }

//底部广告位
    viviCat.adfooter = function(obj){
        var timer=null;
        var ad= vivi.g(obj);
        var closeBtn = ad.children[0];
        ad.style.display='block';
        var sdHeight = ad.clientHeight;
        closeBtn.onclick = function(){
            vivi.tranSition(ad, 300, 'linear');
            vivi.transForm(ad, [0,sdHeight]);
            setTimeout(function(){
                ad.style.display='none';
            },300);
        }
    };

    /**** 通用配置 ****/

    var rootUrl = 'http://m.cnmo.com/';
    global && (global.rootUrl = rootUrl);
    configData && global && (global.configData = configData);


//重力感应
    viviCat.ForceShak('force_shak');
//焦点图
    new viviCat.Focus({
        oBox: vivi.g('f1_1'), //焦点图区块
        oDiv: vivi.g('f1_2'), //原点区块
        ww: 0, //微调宽度(一般区块不满屏的时候设置)
        loop: true, //是否无限滑动
        MoveAuto: true

    });
//手机机型
    new viviCat.Focus({
        oBox: vivi.g('m_phone_list'), //焦点图区块
        oDiv: vivi.g('m_phone_row'), //原点区块
        ww: 0, //微调宽度(一般区块不满屏的时候设置)
        loop: false, //是否无限滑动
        MoveAuto: false //是否自动
    });
//广告图轮播
    new viviCat.Focus({
        oBox: vivi.g('m_ad_car'), //焦点图区块
        oDiv: vivi.g('m_ad_btn'), //原点区块
        ww: 0, //微调宽度(一般区块不满屏的时候设置)
        loop: false, //是否无限滑动
        MoveAuto: false //是否自动
    });
////今日头条
    new viviCat.TextScroll('m_hot', {
        speed: 2000, //间隔速度
        mount: 300, //单个滑动速度
        width: 1, //滑动li个数
        dir: "up"
    });
//客户投诉
    new viviCat.TextScroll('m_list315', {
        speed: 1500, //间隔速度
        mount: 350, //单个滑动速度
        width: 1, //滑动li个数
        dir: "up"
    });
//广告
    new viviCat.TextScroll('m_adText', {
        speed: 2000, //间隔速度
        mount: 300, //单个滑动速度
        width: 1, //滑动li个数
        dir: "up"
    });

//新机速递
    viviCat.dragRoll('m_new_phone');
//图片预加载
    viviCat.showImg('m_list_img');
    viviCat.showImg('m_list_spe1');
    viviCat.showImg('m_list_video_img');

//机型判断
    (function ios(){
        var ios = vivi.g('ios_none'),
            iosA = ios.children[0],
            iosName = iosA.children[1],
            ios1 = vivi.g('ios_none1');//大家都在玩
        if(global.v.ios){
            iosA.href = '###';
            iosName.innerHTML = '苹果控';
            ios1.style.display='none';
        }else{
            iosA.href = 'http://m.cnmo.com/app/iphone/';
            iosName.innerHTML = '找应用';
            ios1.style.display='block';
        }
    })()


//返回顶部
    $(function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 200){
                $('#to_top').show();
            }else{
                $('#to_top').hide();
            }
        });
        $('#to_top').click(function() {
            $('html, body').animate({scrollTop: 0}, 1000);
        });
    });
//固定导航
    function fixNav (obj,obj1) {
        var arrList = vivi.gClass('isTopList');
        arrTop = [],
            fixTE = vivi.g(obj),
            listNum = arrList.length,
            topNum = 0,
            scrollTop=0,
            a=0,
            num = 0;
        //包版
        var Holiday = true;
        arrListName = vivi.gClass('m_list_tit'),
            arrName = [],
            arrSpan=0,
            now = 0,
            Mnav = vivi.g('m_nav'),
            Mnav1 = Mnav.children;
        if(!obj1){
            Holiday = false;
        }
        for(var i=0;i<listNum;i++){
            arrTop.push(vivi.getTop(arrList[i]));
            arrSpan = arrListName[i].children[0].innerHTML;
            arrSpanI = arrSpan.replace(/\<img.[^\>]*\>/g,"");//去除分栏前部小图标
            arrName.push(arrSpanI);
        }
        if(Holiday){
            window.addEventListener("scroll", scrollMH,false);
        }else{
            window.addEventListener("scroll", scrollM,false);
        }
        if(global.v.ios){//苹果机特殊处理
            arrTop.length = arrTop.length-1;
        }

        function scrollM(){
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            for(var i=0;i<arrTop.length;i++){
                if(i==num){//判断滚动距离顶部i是否有变换，无变跳出，有变化继续
                    break;
                }else{
                    if(scrollTop<=arrTop[i]){
                        if(i!=0){//是否第一个，不是变更导航内容
                            vivi.removeClass(arrList[a],'fixed_tit');
                            vivi.addClass(arrList[i-1],'fixed_tit');
                            fixTE.style.position = 'absolute';
                            a=i-1;
                            if(i==4){
                                if(scrollTop > arrTop[4]-400){
                                    vivi.removeClass(arrList[i-1],'fixed_tit');
                                }
                            }
                        }else{//是第一个，导航显示第一个
                            vivi.removeClass(arrList[i],'fixed_tit');
                            fixTE.style.position = 'fixed';
                        }
                        break;
                    }
                }

            }
        }
        function scrollMH(){
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            fixTE.style.position = 'fixed';
            for(var i=0;i<arrTop.length;i++){
                if(scrollTop<=arrTop[i]){
                    if(i==now){
//					console.log('没有变化，直接返回');
                        if(scrollTop > arrTop[arrList.length-1]-500){
                            fixTE.style.position = 'absolute'
                        }
                        break;
                    }else{
//					console.log('已经变化了');
                        if(i!=0){
                            vivi.addClass(Mnav,'active');
                            Mnav1[0].innerHTML = arrName[i-1];
                            if(i==4){
                                if(scrollTop > arrTop[4]-400){
                                    fixTE.style.position = 'absolute'
                                }
                            }
                        }else{
                            vivi.removeClass(Mnav,'active');
                        }
                        now=i;
                        break;
                    }

                }
            }
        }
    }
    //固定导航
    fixNav('m_template','holiday');//包版
//	fixNav('m_template');//非包版
    //底部广告位
    viviCat.adfooter('m_make');
})();





/**
 * Created by Administrator on 2016/5/6.
 */
// f: 通用底层函数  c：组件及模块
var f = {},
    c = {};
if (!configData) {
    var configData = {};
}
//缓存系统
var global = {
    json: {}, //异步数据缓存
    va: {}, //变量缓存
    imgs: {}, //图片缓存
    php: {}, //页面打开时php传递的数据
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

f = {
    g: function(sid) {
        return document.getElementById(sid);
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
            f.isChild(obj, ev.target) && fn.call(obj);
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
        } else {
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
    }
};

f.Touch = function(el) {
    this.el = el;
    this.sTouchStart = EV.ts;
    this.sTouchMove = EV.tm;
    this.sTouchEnd = EV.te;
}
f.Touch.prototype.fn = function(json, touchType) {
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
                styleTmp = (f.Touch.swipeDirection(t.x1, t.x2, t.y1, t.y2));
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

f.Touch.prototype.closefn = function() {
    this.el.removeEventListener(this.sTouchStart, this.el.touchfns);
    this.el.removeEventListener(this.sTouchMove, this.el.touchfnm);
    this.el.removeEventListener(this.sTouchEnd, this.el.touchfne);
};
f.Touch.prototype.close = function() {
    this.closefn();
    return this;
};
f.Touch.prototype.swipe = function(json) {
    this.fn(json);
    return this;
};
f.Touch.prototype.swipeLeft = function(fnL) {
    this.fn(fnL, 'Left');
    return this;
};
f.Touch.prototype.swipeRight = function(fnL) {
    this.fn(fnL, 'Right');
    return this;
};
f.Touch.prototype.swipeUp = function(fnL) {
    this.fn(fnL, 'Up');
    return this;
};
f.Touch.prototype.swipeDown = function(fnL) {
    this.fn(fnL, 'Down');
    return this;
};
f.Touch.prototype.swipeMove = function(fnL) {
    this.fn(fnL, 'move');
    return this;
};
f.Touch.prototype.swipeOther = function(fnL) {
    this.fn(fnL, 'other');
    return this;
};
f.Touch.swipeDirection = function(x1, x2, y1, y2, c) {
    var xDelta = Math.abs(x1 - x2),
        yDelta = Math.abs(y1 - y2);
    if (c) {
        return 'other';
    }
    return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
};

f.touch = function(a) {
    return new f.Touch(a);
};

global.f = f;
global.c = c;

/**** 业务逻辑 ****/

//拖动[子元素为li]
c.dragRoll = function(sid, sid2) {
    var gps = document.getElementById(sid);

    if (!gps) {
        return;
    }
    var isRoll = false,
        oW = 0,
        iW = document.body.offsetWidth,
        autoM = true;
    var aLi = gps.getElementsByTagName('li');
    var liWidth = aLi[0].offsetWidth;
    if (!sid2) {
        autoM = false
    }; //不自动对齐

    var oldX = 0,
        tsX = 0;

    for (var i = 0; i < aLi.length; i++) {
        if (f.hasClass(aLi[i], 'cur')) {
            oldX = tsX = -oW;
        }
        oW += aLi[i].offsetWidth;
    }

    gps.style.width = oW + 1 + 'px';

    var posW = oW - iW;
    //如果默认没有完全显示，调整位置，如果已完全显示，默认忽视cur的位置偏移
    if (oldX && posW > 0) {
        if (oldX < -posW) {
            oldX = tsX = -posW;
        }
    } else {
        oldX = 0;
    }
    f.transForm(gps, [oldX, 0]);
    if (posW <= 5) {
        isRoll = true;
    }

    f.touch(gps).swipeLeft(function() {
        if (isRoll) {
            return;
        }
        oldX = tsX;
        f.tranSition(gps, 200, 'ease');
        f.transForm(gps, [oldX, 0]);
        if (oldX < -posW) {
            tsX = -posW;
            oldX = -posW;
            f.transForm(gps, [-posW, 0]);
        };
        if (oldX >= 0 && v.x > 0) { //判断最左侧
            oldX = 0;
            f.transForm(gps, [oldX, 0]);
        }
    }).swipeRight(function() {
        if (isRoll) {
            return;
        }
        oldX = tsX;
        f.tranSition(gps, 200, 'ease');
        f.transForm(gps, [oldX, 0]);
        if (oldX > 0) {
            tsX = 0;
            oldX = 0;
            f.transForm(gps, [0, 0]);
        };
    }).swipeMove(function(v, p) {
        if (isRoll) {
            return;
        }
        f.tranSition(gps, 0);
        //		if(oldX >= 0 && v.x > 0){//判断最左侧
        //			oldX = 0;
        //			f.transForm(gps,[oldX,0]);
        //		}else if(oldX <= iW-oW && v.x < 0){//判断最右侧
        //			oldX = iW-oW;
        //			f.transForm(gps,[oldX,0]);
        //		}else{
        //			f.transForm(gps,[oldX+v.x,0]);
        //		}
        f.transForm(gps, [oldX + v.x, 0]);
        tsX += p.x;

    }).swipeOther(function() {
        oldX = tsX;
        if (autoM) {
            var num = Math.floor(-oldX / liWidth);
            oldX = oldX == 0 ? 0 : -(num + 1) * liWidth;
            f.tranSition(gps, 200, 'ease');
            f.transForm(gps, [oldX, 0]);
        }
    });

    var flowTimer = null;
    window.addEventListener(EV.tz, function() {
        clearTimeout(flowTimer);
        flowTimer = setTimeout(function() {
            iW = document.body.offsetWidth;
            posW = oW - iW;
            f.transForm(gps, [0, 0]);
            oldX = tsX = 0;
            isRoll = posW <= 5 ? true : false;
        }, 260);
    }, false);
};

//焦点图
c.Focus = function(json) {
    var oBox = json.oBox,
        oDiv = json.oDiv,
        ww = json.ww,
        loop = json.loop;
    if (!oBox) {
        return;
    }

    var oUl = oBox.getElementsByTagName('ul')[0],
        aLi = oUl.children,
        num = aLi.length,
        oPrev = oBox.getElementsByClassName('sub_prev')[0],
        oNext = oBox.getElementsByClassName('sub_next')[0];

    this.el = {
        oBox: oBox,
        oDiv: json.oDiv,
        oUl: oUl,
        aLi: aLi,
        oPrev: oPrev,
        oNext: oNext,
        num: num,
        now: loop ? num : 0,
        oW: ww ? (oBox.offsetWidth - ww) : oBox.offsetWidth,
        isRoll: false,
        aImg: null,
        aSpan: [],
        loop: json.loop || false,
        LazyImg: json.LazyImg || false,
        oTimer: 0,
        iNow: 0
    };

    this.init();
};

c.Focus.prototype = {
    init: function() {
        var t = this.el;
        //单图片处理
        if (t.aLi.length <= 1) {
            var tmp = t.oBox.getElementsByTagName('img')[0];
            t.LazyImg && (this.loadImg(tmp));
            return;
        }
        //初始化位置、按钮、原点
        f.tranSition(t.oUl, 0);
        f.transForm(t.oUl, [-t.now * t.oW, 0]);
        t.loop && (t.oUl.innerHTML += (t.oUl.innerHTML + t.oUl.innerHTML));
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

        //初始化延迟图片
        t.LazyImg && (this.loadImg(t.aImg[t.now]));
        //启动事件绑定
        this.bind(t.isRoll);
        //轮播自运动
        this.autoPlay()
    },

    autoPlay: function() {
        var t = this.el,
            _t = this;
        t.oTimer = setInterval(function() {
            t.iNow++;
            _t.next();
        }, 3000);
    },

    bind: function() {
        var t = this.el,
            _t = this;
        f.touch(t.oBox).swipeLeft(function() {
            _t.next();
        }).swipeRight(function() {
            _t.prev();
        }).swipeMove(function(v) {
            clearInterval(t.oTimer);
            if (t.isRoll) {
                return;
            }
            f.tranSition(t.oUl, 0);
            f.transForm(t.oUl, [-t.now * t.oW + v.x / 2, 0]);
        }).swipeOther(function() {
            f.tranSition(t.oUl, 300, 'linear');
            f.transForm(t.oUl, [-t.now * t.oW, 0]);
            _t.autoPlay()
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
                f.tranSition(t.oUl, 300, 'linear');
                f.transForm(t.oUl, [-t.now * t.oW, 0]);
            }, 200);
        }, false);
    },

    next: function() {
        var t = this.el,
            _t = this;
        if (t.isRoll) {
            return;
        }
        t.isRoll = true;
        t.now++;
        !t.loop && (t.now >= t.num && (t.now = t.num - 1));
        f.tranSition(t.oUl, 300, 'linear');
        f.transForm(t.oUl, [-t.now * t.oW, 0]);

        t.oBox.tEndFn = function() {
            _t.tEnd();
        };
        t.oBox.addEventListener('webkitTransitionEnd', t.oBox.tEndFn);
        return false;
    },

    prev: function() {
        var t = this.el,
            _t = this;
        if (t.isRoll) {
            return;
        }
        t.isRoll = true;
        t.now--;
        !t.loop && (t.now < 0 && (t.now = 0));
        f.tranSition(t.oUl, 300, 'linear');
        f.transForm(t.oUl, [-t.now * t.oW, 0]);

        t.oBox.tEndFn = function() {
            _t.tEnd();
        };
        t.oBox.addEventListener('webkitTransitionEnd', t.oBox.tEndFn);
        return false;
    },

    tEnd: function() {
        var t = this.el,
            _t = this;
        t.LazyImg && (_t.loadImg(t.aImg[t.now]));
        if (t.loop) {
            if (t.now > 2 * t.num - 1) {
                t.now = t.num;
                f.tranSition(t.oUl, 0);
                f.transForm(t.oUl, [-t.now * t.oW, 0]);
            }
            if (t.now < t.num) {
                t.now = 2 * t.num - 1;
                f.tranSition(t.oUl, 0);
                f.transForm(t.oUl, [-t.now * t.oW, 0]);
                t.LazyImg && (_t.loadImg(t.aImg[t.now]));
            }
        }
        if (t.oDiv) {
            for (i in t.aSpan) {
                t.aSpan[i].className = '';
            }
            t.loop ? t.aSpan[t.now - t.num].className = 'cur' : t.aSpan[t.now].className = 'cur';
        }
        t.isRoll = false;
        t.oBox.removeEventListener('webkitTransitionEnd', t.oBox.tEndFn);
    },

    loadImg: function(obj) {
        if (obj.loadOver) {
            return;
        }
        obj.getAttribute('_src') && (obj.src = obj.getAttribute('_src'));
        obj.onload = function() {
            this.loadOver = 1;
        }
    }
};

////文字滚动
c.TextScroll = function(obj, json) {
    var speed = json.speed,
        mount = json.mount,
        width = json.width,
        dir = json.dir;
    var obj = f.g(obj),
        oTimer, iNow, ulMove;
    var aul = obj.getElementsByTagName('ul')[0];
    aul.innerHTML += aul.innerHTML;
    var oli = aul.getElementsByTagName('li');
    var oliHeight = oli[0].offsetHeight,
        numLi = oli.length;
    var b;
    this.b = {
        speed: speed,
        mount: mount,
        width: width,
        dir: dir,
        oTimer: null,
        aul: aul,
        oli: oli,
        oliHeight: oliHeight,
        numLi: numLi,
        iNow: 0,
        ulMove: 0
    };
    this.bind();
    this.moveScroll();
}
c.TextScroll.prototype = {
    moveScroll: function() {
        var b = this.b,
            _this = this;
        b.oTimer = setInterval(function() {
            if (b.dir === 'up') { //判断向上还是向下滚动
                b.iNow--;
            } else {
                b.iNow++;
            };
            f.tranSition(b.aul, b.mount, 'linear');
            b.ulMove = b.oliHeight * b.iNow;
            f.transForm(b.aul, [0, b.ulMove]);
            if (Math.abs(b.iNow) > b.numLi / 2) {
                b.iNow = 0;
                f.tranSition(b.aul, 0);
                b.ulMove = b.oliHeight * b.iNow;
                f.transForm(b.aul, [0, b.ulMove]);
            }
        }, b.speed);
    },
    bind: function(ev) {
        var b = this.b,
            _this = this;
        f.live(b.aul, EV.ts, function() {
            clearInterval(b.oTimer)
        });
        f.live(b.aul, EV.te, function() {
            _this.moveScroll();
        });
    }
}

//重力感应
c.ForceShak = function(obj) {
    var obj1 = f.g(obj);
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
            // angle=radian*180.0/PI 在firefox中x和y是弧度值,
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
            //			alpha = ev.accelerationIncludingGravity.z*10
        }

        if (this._lastGamma != gamma || this._lastBeta != beta) {
            var moveX = gamma / 90 * 13;
            var moveY = beta / 90 * 10;
            if (Math.abs(moveX) - Math.abs(moveY) > 0) {
                f.transForm(obj1, [moveX, 0]);
                this._lastGamma = gamma;
            } else {
                f.transForm(obj1, [0, moveY]);
                this._lastBeta = beta;
            }
        }

    }
}

c.fixNav = function() {
    var nav = f.g('m_nav'); //固定导航
    //id1
    var obj1 = f.g(arguments[0]),
        oheight1 = obj1.offsetHeigh,
        oTop1 = obj1.offsetTop,
        oBot1 = oTop1 + obj1.scrollHeight;
    //id1
    var obj2 = f.g(arguments[1]),
        oheight2 = obj2.offsetHeigh,
        oTop2 = obj2.offsetTop,
        oBot2 = oTop2 + obj2.scrollHeight;
    window.addEventListener("scroll", function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        nav.style.background = '#E0413E';
        f.tranSition(nav, 300);
        if (scrollTop > oTop1 && scrollTop < oBot1) {
            nav.style.background = '#777';
        } else {
            nav.style.background = '#E0413E';
        }
        if (oTop2 < scrollTop && scrollTop < oBot2) {
            nav.style.background = '#DEE9C0';
        }
    })
}

/**** 通用配置 ****/

var rootUrl = 'http://m.cnmo.com/';
global && (global.rootUrl = rootUrl);
configData && global && (global.configData = configData);

//拖动
c.dragRoll('app-enter', 'auto'); //app拖动,有'auto'自动对齐头部
//重力感应
c.ForceShak('force_shak');
//焦点图
new c.Focus({
    oBox: f.g('f1_1'), //焦点图区块
    oDiv: f.g('f1_2'), //原点区块
    ww: 0, //微调宽度(一般区块不满屏的时候设置)
    loop: true, //是否无限滑动
    LazyImg: true //是否延迟图片
});
//客户投诉
new c.TextScroll('ycw-list315', {
    speed: 1500, //间隔速度
    mount: 350, //单个滑动速度
    width: 25, //单个滑动距离
    dir: "up"
});
//固定导航
c.fixNav('top', 'top1');
//c.fixNav('top1')
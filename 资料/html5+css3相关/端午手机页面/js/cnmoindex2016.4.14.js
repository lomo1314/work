/**
 * Created by Administrator on 2016/5/6.
 */
//运动
//底层通用
var f={};
var ot {
    if("ontouchstart" in window){
        startEvt = "touchstart";
        moveEvt = "touchmove";
        endEvt = "touchend";
    }else{
        startEvt = "mousedown";
        moveEvt = "mousemove";
        endEvt = "mouseup";
    }
}
f = {
    g:function(sid){
        return document.getElementById(sid);
    },
    tweenMove : function(obj, attrs, callback){//运动函数
        clearInterval(obj.timer);
        var j = {};
        var ds = [];
        for (var attr in attrs) {
            j[attr] = {};
            j[attr].b = parseInt(f.css(obj, attr));
            //c值
            j[attr].c = attrs[attr].target - j[attr].b;
            j[attr].d = attrs[attr].duration;
            j[attr].fx = attrs[attr].fx?attrs[attr].fx:'linear';
            ds.push(attrs[attr].duration);
        }
        var d = Math.max.apply(null, ds);
        var startTime = +new Date();

        //每一次开启定时器的，同时去改变多个不同的属性
        obj.timer = setInterval(function() {
            var t = +new Date() - startTime;
            if (t >= d) {
                t = d;
                clearInterval(obj.timer);
            }
            for (var attr in attrs) {
                if (t <= j[attr].d) {
                    var value = f.Tween[j[attr].fx](t, j[attr].b, j[attr].c, j[attr].d);
                    f.css(obj,attr,value);
                }
            }
            if (t == d) {
                callback && callback();
            }

        }, 16);
    },

    css : function(obj, attr, value){
        if(arguments.length==2){
            if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'||attr=='rotateY'||attr=='scaleX'||attr=='scaleY'||attr=='translateY'||attr=='translateX'){
                if(! obj.$Transform){
                    obj.$Transform={};
                }
                switch(attr){
                    case 'scale':
                    case 'scaleX':
                    case 'scaleY':
                        return typeof(obj.$Transform[attr])=='number'?obj.$Transform[attr]:100;
                        break;
                    default:
                        return obj.$Transform[attr]?obj.$Transform[attr]:0;
                }
            }
            var sCur=obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr];
            if(attr=='opacity'){
                return Math.round((parseFloat(sCur)*100));
            }else{
                return parseInt(sCur);
            }
        }else if(arguments.length==3){
            switch(attr){
                case 'scale':
                case 'scaleX':
                case 'scaleY':
                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                case 'translateZ':
                case 'translateX':
                case 'translateY':
                    f.setCss3(obj, attr, value);
                    break;
                case 'width':
                case 'height':
                case 'paddingLeft':
                case 'paddingTop':
                case 'paddingRight':
                case 'paddingBottom':
                    value=Math.max(value,0);
                case 'left':
                case 'top':
                case 'marginLeft':
                case 'marginTop':
                case 'marginRight':
                case 'marginBottom':
                    if(typeof value=="string")
                    {
                        obj.style[attr]=value;
                    }
                    else
                    {
                        obj.style[attr]=value+'px';
                    }
                    break;
                case 'opacity':
                    obj.style.filter="alpha(opacity:"+value+")";
                    obj.style.opacity=value/100;
                    break;
                default:
                    obj.style[attr]=value;
            }
        }
        return function (attr_in, value_in){f.css(obj, attr_in, value_in)};
    },

    setCss3 : function(obj, attr, value){
        var sTr="";
        var sVal="";
        var arr=["Webkit","Moz","O","ms",""];
        if(! obj["$Transform"])
        {
            obj["$Transform"]={};
        }
        obj["$Transform"][attr]=parseInt(value);
        for( sTr in obj["$Transform"])
        {
            switch(sTr)
            {
                case 'scale':
                case 'scaleX':
                case 'scaleY':
                    sVal+=sTr+"("+(obj["$Transform"][sTr]/100)+") ";
                    break;
                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                    sVal+=sTr+"("+(obj["$Transform"][sTr])+"deg) ";
                    break;
                case 'translateX':
                case 'translateY':
                case 'translateZ':
                    sVal+=sTr+"("+(obj["$Transform"][sTr])+"px) ";
                    break;
            }
        }
        for(var i=0;i<arr.length;i++){
            obj.style[arr[i]+"Transform"]=sVal;
        }
    },

    Tween : {
        linear: function (t, b, c, d){  //匀速
            return c*t/d + b;
        },
        easeIn: function(t, b, c, d){  //加速曲线
            return c*(t/=d)*t + b;
        },
        easeOut: function(t, b, c, d){  //减速曲线
            return -c *(t/=d)*(t-2) + b;
        }
    },

    showImg : function(obj){
        var arrImg = obj.getElementsByTagName('img');
        var arrSpan = obj.getElementsByTagName('span');
//		imgLeng = arrSpan.length;
        for(var i=0;i<arrImg.length;i++){
            if(!arrImg[i].isOnload && arrImg[i].getAttribute('data-src')){
                f.loadImg( arrImg[i] , arrImg[i].getAttribute('data-src') );
                arrImg[i].isOnload = true;
            }
        }
    },

    loadImg : function(img,src){
        var oImg = new Image();
        oImg.onload = function(){
            img.src = this.src;
        };
        oImg.src = src;
    }
}

//轮播图
var ImgScroll=function(obj,btn){
    var oPicList=document.getElementById(obj)?obj:document.getElementById(obj);
//	var aBtns=document.getElementById(btn).children;
    var aBtns=btn.children;
//	var iScroll=0,iStartX=0,iStartPageX=0,iNow=0,oTimer=0,oClick;
//	obj.innerHTML+=obj.innerHTML;
    obj.style.width=obj.clientWidth*2+"px";
//	console.log(obj.clientWidth)
    this.ele={
        obj         : obj,
        aBtns       : aBtns,
        iScroll     : 0,
        iStartX     : 0,
        iStartPageX : 0,
        iNow        : 0,
        oTimer      : 0,
        oClick      : 0
    }

    this.autoPlay();
}
ImgScroll.prototype={
    autoPlay : function (){
        var t=this.ele,_t=this;
        oTimer=setInterval(function(){
            t.iNow++;
            _t.next();
        },3000);
        _t.bind(t.isRoll);
    },

    bind : function(){
        var t=this.ele,_t=this;
//		console.log(this)
        t.obj.addEventListener(ot.startEvt,_t.fnStart.call(_t),false);
        t.obj.addEventListener(ot.moveEvt,_t.fnMove.call(_t),false);
        t.obj.addEventListener(ot.endEvt,_t.fnEnd.call(_t),false);
    },

    fnStart : function(ev){
        var t=this.ele,_t=this;
        clearInterval(_t.oTimer);
        clearInterval(t.obj.timer);

        if(t.iNow<=0)
        {
            t.iNow+=t.aBtns.length;
            t.iScroll=-t.iNow*window.screen.width;
            css(t.obj, "translateX", t.iScroll);
        }
        t.iStartPageX=ev.changedTouches[0].pageX;
        t.iStartX=t.iScroll;
        t.oClick = 0;
    },

    fnMove : function(ev){
        ev.preventDefault();
        var t=this.ele;
        var iDis=ev.changedTouches[0].pageX-t.iStartPageX;
        t.iScroll=t.iStartX+t.iDis;
        css(t.obj, "translateX", t.iScroll);
        t.oClick = 1;
    },

    fnEnd : function(ev){
        var t=this.ele, _t=this;
        if(t.oClick){
            var iDis=ev.changedTouches[0].pageX-t.iStartPageX;
            var iNub=Math.round(iDis/window.screen.width);
            t.iNow-=iNub;
            _t.next();
            this.autoPlay();
        }
    },

    next : function (){
        var t=this.ele, _t=this;
        t.iScroll=-t.iNow*window.screen.width;
//		console.log(t.iScroll)
        for(var i=0;i<t.aBtns.length;i++)
        {
            t.aBtns[i].className="";
        }
        t.aBtns[t.iNow%t.aBtns.length].className="active";
        if(t.iNow>=t.aBtns.length)
        {
            f.tweenMove(t.obj,{
                translateX:{
                    target: t.iScroll,
                    duration: 500,
                    fx : 'easeOut'
                }},function(){
                t.iNow=t.iNow%t.aBtns.length;
                t.iScroll=-t.iNow*window.screen.width;
                css(t.obj, "translateX", t.iScroll);
            });
        }
        else
        {
            f.tweenMove(t.obj,{
                translateX:{
                    target: t.iScroll,
                    duration: 500,
                    fx : 'easeOut'
                }});
        }
    }
}
new ImgScroll(picList,picBtns);


///* 触屏底层 V1 momo 2015-9-9 */
//
//// f: 通用底层函数  c：组件及模块
//var f={},c={};
//if(!configData){var configData={};}
////缓存系统
//var global={
//	json : {}, //异步数据缓存
//	va :   {}, //变量缓存
//	imgs : {}, //图片缓存
//	php :  {}, //页面打开时php传递的数据
//	v :    {hasTouch : 'ontouchstart' in window} //客户端数据收集
//};
//
////事件集合
//var EV=global.EV={
//	ts : global.v.hasTouch ? 'touchstart' : 'mousedown',
//	tm : global.v.hasTouch ? 'touchmove' : 'mousemove',
//	te : global.v.hasTouch ? 'touchend' : 'mouseup',
//	tz : 'onorientationchange' in window ? 'orientationchange' : 'resize'
//};
//
///* version V1 momo 2014-6-15 */
//global.v.UA=window.navigator.userAgent;
//global.v.browserinfo={
//	webkit: global.v.UA.match(/WebKit\/([\d.]+)/),
//	ie: global.v.UA.match(/MSIE\s([\d.]+)/),
//	iemobile: global.v.UA.match(/IEMobile\/([\d.]+)/),
//	chrome: global.v.UA.match(/Chrome\/([\d.]+)/) || global.v.UA.match(/CriOS\/([\d.]+)/),
//	firefox: global.v.UA.match(/Firefox\/([\d.]+)/),
//	opera: global.v.UA.match(/Opera\/([\d.]+)/)
//};
//global.v.platforminfo={
//	android: global.v.UA.match(/(Android)\s+([\d.]+)/),
//	ipad: global.v.UA.match(/(iPad).*OS\s([\d_]+)/),
//	windowsphone: global.v.UA.match(/(Windows\sPhone)[\sOS]*([\d\.]+)/),
//	windows: global.v.UA.match(/(Windows)\sNT\s([\d\.]+)/)
//};
//global.v.platforminfo.ipod = global.v.platforminfo.itouch = !global.v.platforminfo.ipad && global.v.UA.match(/(iPod\s?[Ttouch]{5})[a-zA-Z\s;]*([\d_]+)/);
//global.v.platforminfo.iphone = !global.v.platforminfo.ipad && !global.v.platforminfo.itouch && global.v.UA.match(/(iPhone\sOS)\s([\d_]+)/);
//
//global.v.browser={},global.v.platform={};
//for(var key in global.v.browserinfo) {
//	global.v.browserinfo[key] && (global.v.browser[key] = true, global.v.browser.version = global.v.browserinfo[key][1], global.v.browser.majorVersion = parseInt(global.v.browser.version) || 0);
//}
//global.v.ie=global.v.browserinfo.ie?global.v.browser.majorVersion:false;
//for(var key in global.v.platforminfo) {
//	global.v.platforminfo[key] && (global.v.platform[key] = true, global.v.platform.version = global.v.platforminfo[key][2].replace(/_/g, '.'), global.v.platform.majorVersion = parseInt(global.v.platform.version) || 0);
//}
//global.v.ios = !!(global.v.platform.iphone || global.v.platform.itouch || global.v.platform.ipad);
//global.v.pad = !!(global.v.platform.ipad || (global.v.platform.android && !global.v.UA.match(/Mobile/)));
//global.v.phone = !!(!global.v.pad && global.v.platform.android || global.v.platform.iphone || global.v.platform.windowsphone) || /meizu|lephone|xiaomi|mui|mobile|coolpad|zte|huawei/i.test(global.v.UA);
//if (global.v.phone && /safari|webkit/i.test(global.v.UA) && !/OS\s?X/i.test(global.v.UA) && !global.v.ios) {
//	global.v.platform.android = true;
//	global.v.browser.webkit = true;
//}
//global.v.ios && (global.v.platform.ios = global.v.ios);
//global.v.pad && (global.v.platform.pad = global.v.pad);
//global.v.phone && (global.v.platform.phone = global.v.phone);
//
//
///* publish fn V1 momo 2015-9-9 */
//
//EV.tap=global.v.hasTouch?(global.v.ios?'touchend':'click'):('click');
//
//f={
//	g:function(sid){
//		return document.getElementById(sid);
//	},
//
//	tap:function(el,fn){
//		if(!global.v.ios){
//			el.addEventListener('click',fn,false);
//		}else{
//			function fnTapM(e){
//				el.isTapClick=false;
//			}
//			function fnTapE(e){
//				if(el.isTapClick){
//					fn(e);
//				}
//				el.removeEventListener('touchmove',fnTapM,false);
//				el.removeEventListener('touchend',fnTapE,false);
//			}
//
//			el.addEventListener('touchstart',function(){
//				el.isTapClick=true;
//				el.addEventListener('touchmove',fnTapM,false);
//				el.addEventListener('touchend',fnTapE,false);
//
//			},false);
//		}
//	},
//
//	addClass:function(obj,sClass){
//		var rg=new RegExp('\\b'+sClass+'\\b');
//		if(!rg.test(obj.className)){
//			var oldName=obj.className;
//			obj.className=oldName?oldName+' '+sClass:sClass;
//		}
//	},
//
//
//	removeClass:function(obj,sClass){
//		var rg=new RegExp('\\b'+sClass+'\\b');
//		if(rg.test(obj.className)){
//			obj.className=obj.className.replace(rg,'').replace(/^\s+|\s+$/,'');
//		}
//	},
//
//
//	hasClass:function(obj,sClass){
//		var rg=new RegExp('\\b'+sClass+'\\b');
//		return rg.test(obj.className)?true:false;
//	},
//
//	bind:function(obj,sEv,fn){
//		!obj._evs&&(obj._evs=[]);
//		obj.addEventListener(sEv,fn,false);
//		obj._evs.push({ev_name:sEv,ev_fn:fn});
//	},
//
//	transForm : function(obj,iTarget){
//		iTarget[0]=iTarget[0]+'';iTarget[1]=iTarget[1]+'';
//		if(iTarget[0].indexOf('px')==-1){iTarget[0]+='px';}
//		if(iTarget[1].indexOf('px')==-1){iTarget[1]+='px';}
//		obj.style.webkitTransform =obj.style.transform ='translateX('+iTarget[0]+') translateY('+ iTarget[1] +') translateZ(0)';
//	},
//
//	tranSition : function(obj,speed,type,dlayT){
//		var ele=obj.style;
//		dlayT = dlayT || 0;
//		type = type || 'linear';
//		if(type && type.length>15){
//			ele.webkitTransition = ele.transition = speed + 'ms '+type;
//		}else{
//			ele.webkitTransition = ele.transition ='all '+ speed + 'ms '+type+' '+dlayT+'ms';
//		}
//	},
//
//
//	next : function(obj,ele){
//		var temp=obj.nextElementSibling || obj.nextSibling;
//		if(ele){
//			if(temp.tagName.toLowerCase()==ele.toLowerCase()){
//				return temp;
//			}
//		}else{
//			return temp;
//		}
//	}
//};
//
//f.Touch=function(el){
//	this.el=el;
//	this.sTouchStart = EV.ts;
//	this.sTouchMove = EV.tm;
//	this.sTouchEnd = EV.te;
//}
//f.Touch.prototype.fn=function(json,touchType){
//	if(typeof json == 'function' && touchType){
//		var json2={};
//		json2[touchType]=json;
//		json=json2;
//	};
//	var t={};
//	var fnMove=json.move || null;
//
//	//2015-3-19 增加绑定函数名存储
//	this.el.touchfns=function(e){
//
//		ts.call(this,e);
//	};
//	this.el.touchfnm=function(e){
//		tm(this,e);
//	};
//	this.el.touchfne=function(){
//		te.call(this);
//	};
//
//	this.el.addEventListener(this.sTouchStart,this.el.touchfns,false);
//	this.el.addEventListener(this.sTouchMove,this.el.touchfnm,false);
//	this.el.addEventListener(this.sTouchEnd,this.el.touchfne,false);
//	this.el.onselectstart=function(){return false;};
//
//	function ts(e){
//		var oTar=e.target;
//		//if(this.noMoveEnd){return;}
//		this.noMoveEnd=false;
//		/*while(oTar){
//			if(oTar.getAttribute&&oTar.getAttribute('t')=='noSroll'){return;}
//			oTar=oTar.parentNode;
//		}*/
//		if(global.v.hasTouch){
//			t.x1 = e.touches[0].pageX;
//			t.y1 = e.touches[0].pageY;
//		}else{
//			t.x1 = e.offsetX;
//			t.y1 = e.offsetY;
//		}
//
//		t.oldX=0;
//		t.oldY=0;
//	}
//	function tm(a,e){
//		if(a.noMoveEnd){return;}
//		if(a.noMove){ e.preventDefault(); a.moveNum=1; }
//		var oTar=e.target;
//		while(oTar){
//			if(oTar.getAttribute&&oTar.getAttribute('t')=='noSroll'){return;}
//			oTar=oTar.parentNode;
//		}
//		if(global.v.hasTouch){
//			t.x2 = e.touches[0].pageX;
//			t.y2 = e.touches[0].pageY;
//		}else{
//			t.x2 = e.offsetX;
//			t.y2 = e.offsetY;
//		}
//
//		var vv={};
//		vv.x=t.x2 - t.x1;
//		vv.y=t.y2 - t.y1;
//
//		var p={};
//		p.x=vv.x-t.oldX;
//		p.y=vv.y-t.oldY;
//
//		t.oldX=vv.x;
//		t.oldY=vv.y;
//
//
//		if(touchType){
//			if(touchType=='Left' || touchType=='Right'){
//				if(Math.abs(vv.x)>Math.abs(vv.y)){
//					a.noMove=true;
//					e.preventDefault();
//				}else{
//					a.noMoveEnd=1;
//					return;
//				}
//			}
//			if(touchType=='Up' || touchType=='Down'){
//
//				if(Math.abs(vv.y)>Math.abs(vv.x)){
//					a.noMove=true;
//					e.preventDefault();
//				}
//			}
//		}else{
//			e.preventDefault();
//		}
//
//		a.moveNum && fnMove && fnMove.call(a,vv,p);  //2014-09-23
//		e.cancelBubble=true;
//		return false;
//	}
//	function te(e){
//		this.noMove=false; //阻止默认行为的标识
//		this.moveNum=0; //首次按下 标识（首次move不执行回调，只做状态判断）
//		this.noMoveEnd=0; //单方向禁止 恢复
//		var styleTmp='swipe';
//		if(t.x2 || t.y2){
//			if(Math.abs(t.x2 - t.x1) > 30 || Math.abs(t.y1 - t.y2) > 30){
//				styleTmp=(f.Touch.swipeDirection(t.x1, t.x2, t.y1, t.y2));
//			}
//		}
//		//2015-3-3
//		if(json[styleTmp]){
//			json[styleTmp].call(this);
//		}else{
//			json['other'] && json['other'].call(this);
//		}
//		t={};
//	}
//};
//
//f.Touch.prototype.closefn=function(){
//	this.el.removeEventListener(this.sTouchStart,this.el.touchfns);
//	this.el.removeEventListener(this.sTouchMove,this.el.touchfnm);
//	this.el.removeEventListener(this.sTouchEnd,this.el.touchfne);
//};
//f.Touch.prototype.close=function(){
//	this.closefn();
//	return this;
//};
//f.Touch.prototype.swipe=function(json){
//	this.fn(json);
//	return this;
//};
//f.Touch.prototype.swipeLeft=function(fnL){
//	this.fn(fnL,'Left');
//	return this;
//};
//f.Touch.prototype.swipeRight=function(fnL){
//	this.fn(fnL,'Right');
//	return this;
//};
//f.Touch.prototype.swipeUp=function(fnL){
//	this.fn(fnL,'Up');
//	return this;
//};
//f.Touch.prototype.swipeDown=function(fnL){
//	this.fn(fnL,'Down');
//	return this;
//};
//f.Touch.prototype.swipeMove=function(fnL){
//	this.fn(fnL,'move');
//	return this;
//};
//f.Touch.prototype.swipeOther=function(fnL){
//	this.fn(fnL,'other');
//	return this;
//};
//f.Touch.swipeDirection=function(x1, x2, y1, y2, c){
//	var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2);
//	if(c){return 'other';}
//	return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
//};
//
//f.touch=function(a){return new f.Touch( a );};
//
//
//global.f=f;
//global.c=c;
//
//
//
///**** 业务逻辑 ****/
//
////自适应滑动菜单，内容 [子元素为li]
//c.navRoll=function(sid,sid2,sid3){
//	var gps=document.getElementById(sid);
//	if(!gps){return;}
//
//	if(sid2){
//		var minNav=document.getElementById(sid2);
//		if(!minNav){return;}
//		minNav.innerHTML = gps.innerHTML;
//	}
//
//	if(sid3 && sid3.length && sid3.length==4){
//		var e1=f.g(sid3[0]),e2=f.g(sid3[1]),e3=f.g(sid3[2]),e4=f.g(sid3[3]);
//		e1.onclick=function(){
//			e3.style.display = 'none';
//			e4.style.display = 'block';
//		};
//		e2.onclick=function(){
//			e4.style.display = 'none';
//			e3.style.display = 'block';
//		};
//	}
//
//	var isRoll=false,oW=0,iW=document.body.offsetWidth;
//	var aLi=gps.getElementsByTagName('li');
//
//	var oldX=0,tsX=0;
//
//	for(var i=0;i<aLi.length;i++){
//		if(f.hasClass(aLi[i],'cur')){ oldX=tsX=-oW; }
//		oW+=aLi[i].offsetWidth;
//	}
//
//	gps.style.width=oW+1+'px';
//
//	var posW=oW-iW;
//
//	//如果默认没有完全显示，调整位置，如果已完全显示，默认忽视cur的位置偏移
//	if(oldX && posW>0){
//		if(oldX<-posW){oldX=tsX=-posW;}
//	}else{
//		oldX=0;
//	}
//	f.transForm(gps,[oldX,0]);
//	if(posW<=5){isRoll=true;}
//
//	f.touch(gps).swipeLeft(function(){
//		if(isRoll){return;}
//		oldX=tsX;
//		f.tranSition(gps,200,'ease');
//		f.transForm(gps,[oldX-15,0]);
//		if(oldX<-posW){
//			tsX=-posW;
//			oldX=-posW;
//			f.transForm(gps,[-posW,0]);
//		};
//	}).swipeRight(function(){
//		if(isRoll){return;}
//		oldX=tsX;
//		f.tranSition(gps,200,'ease');
//		f.transForm(gps,[oldX+15,0]);
//		if(oldX>0){
//			tsX=0;
//			oldX=0;
//			f.transForm(gps,[0,0]);
//		};
//	}).swipeMove(function(v,p){
//		if(isRoll){return;}
//		f.tranSition(gps,0);
//		f.transForm(gps,[oldX+v.x,0]);
//		tsX+=p.x;
//	}).swipeOther(function(){
//		oldX=tsX;
//	});
//
//	var flowTimer=null;
//	window.addEventListener(EV.tz, function(){
//		clearTimeout(flowTimer);
//		flowTimer=setTimeout(function(){
//			iW=document.body.offsetWidth;
//			posW=oW-iW;
//			f.transForm(gps,[0,0]);
//			oldX=tsX=0;
//			isRoll=posW<=5?true:false;
//		},260);
//	}, false);
//};
//
//
////焦点图
//c.Focus=function(json){
//	var oBox=json.oBox,oDiv=json.oDiv,ww=json.ww,loop=json.loop;
//	if(!oBox){return;}
//
//	var oUl=oBox.getElementsByTagName('ul')[0],
//		aLi=oUl.children,
//		num=aLi.length,
//		oPrev=oBox.getElementsByClassName('sub_prev')[0],
//		oNext=oBox.getElementsByClassName('sub_next')[0];
//
//	this.el={
//		oBox:     oBox,
//		oDiv:     json.oDiv,
//		oUl:      oUl,
//		aLi:      aLi,
//		oPrev:    oPrev,
//		oNext:    oNext,
//		num:      num,
//		now:      loop?num:0,
//		oW:       ww?(oBox.offsetWidth-ww):oBox.offsetWidth,
//		isRoll:   false,
//		aImg:     null,
//		aSpan:    [],
//		loop:     json.loop || false,
//		LazyImg:  json.LazyImg || false
//	};
//
//	this.init();
//};
//
//c.Focus.prototype={
//	init : function(){
//		var t=this.el;
//		//单图片处理
//		if(t.aLi.length<=1){
//			var tmp=t.oBox.getElementsByTagName('img')[0];
//			t.LazyImg && (this.loadImg(tmp));
//			return;
//		}
//		//初始化位置、按钮、原点
//		f.tranSition(t.oUl,0);
//		f.transForm(t.oUl,[-t.now*t.oW,0]);
//		t.loop && (t.oUl.innerHTML+=(t.oUl.innerHTML+t.oUl.innerHTML));
//		t.aImg=t.oBox.getElementsByTagName('img');
//		for(var i=0;i<t.num;i++){
//			if(!t.oDiv){break;}
//			var oSpan=document.createElement('span');
//			i==0&&(oSpan.className='cur');
//			t.oDiv.appendChild(oSpan);
//			t.aSpan.push(oSpan);
//		}
//		//初始化延迟图片
//		t.LazyImg && (this.loadImg(t.aImg[t.now]));
//		//启动事件绑定
//		this.bind(t.isRoll);
//	},
//
//	bind : function(){
//		var t=this.el,_t=this;
//		f.touch(t.oBox).swipeLeft(function(){
//			_t.next();
//		}).swipeRight(function(){
//			_t.prev();
//		}).swipeMove(function(v){
//			if(t.isRoll){return;}
//			f.tranSition(t.oUl,0);
//			f.transForm(t.oUl,[-t.now*t.oW+v.x/2,0]);
//		}).swipeOther(function(){
//			f.tranSition(t.oUl,250,'linear');
//			f.transForm(t.oUl,[-t.now*t.oW,0]);
//		});
//
//
//		if(t.oPrev && t.oNext){
//			t.oPrev.addEventListener('click',_t.prev,false);
//			t.oNext.addEventListener('click',_t.next,false);
//		}
//
//		var focusTimer=null;
//		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(){
//			clearTimeout(focusTimer);
//			flowTimer=setTimeout(function(){
//				t.oW=t.ww?(t.oBox.offsetWidth-t.ww):t.oBox.offsetWidth;
//				f.tranSition(t.oUl,200,'linear');
//				f.transForm(t.oUl,[-t.now*t.oW,0]);
//			},200);
//		}, false);
//	},
//
//	next : function(){
//		var t=this.el,_t=this;
//		if(t.isRoll){return;}
//		t.isRoll=true;
//		t.now++;
//		!t.loop && (t.now>=t.num && (t.now=t.num-1));
//		f.tranSition(t.oUl,250,'linear');
//		f.transForm(t.oUl,[-t.now*t.oW,0]);
//
//		t.oBox.tEndFn=function(){
//			_t.tEnd();
//		};
//		t.oBox.addEventListener('webkitTransitionEnd',t.oBox.tEndFn);
//		return false;
//	},
//
//	prev : function(){
//		var t=this.el,_t=this;
//		if(t.isRoll){return;}
//		t.isRoll=true;
//		t.now--;
//		!t.loop && (t.now<0 && (t.now=0));
//		f.tranSition(t.oUl,250,'linear');
//		f.transForm(t.oUl,[-t.now*t.oW,0]);
//
//		t.oBox.tEndFn=function(){
//			_t.tEnd();
//		};
//		t.oBox.addEventListener('webkitTransitionEnd',t.oBox.tEndFn);
//		return false;
//	},
//
//	tEnd : function(){
//		var t=this.el,_t=this;
//		t.LazyImg && (_t.loadImg(t.aImg[t.now]));
//		if(t.loop){
//			if(t.now>2*t.num-1){
//				t.now=t.num;
//				f.tranSition(t.oUl,0);
//				f.transForm(t.oUl,[-t.now*t.oW,0]);
//			}
//			if(t.now<t.num){
//				t.now=2*t.num-1;
//				f.tranSition(t.oUl,0);
//				f.transForm(t.oUl,[-t.now*t.oW,0]);
//				t.LazyImg && (_t.loadImg(t.aImg[t.now]));
//			}
//		}
//		if(t.oDiv){
//			for(i in t.aSpan){t.aSpan[i].className='';}
//			t.loop?t.aSpan[t.now-t.num].className='cur':t.aSpan[t.now].className='cur';
//		}
//		t.isRoll=false;
//		t.oBox.removeEventListener('webkitTransitionEnd',t.oBox.tEndFn);
//	},
//
//
//	loadImg : function(obj){
//		if(obj.loadOver){return;}
//		obj.getAttribute('_src') && (obj.src=obj.getAttribute('_src'));
//		obj.onload=function(){this.loadOver=1;}
//	}
//};
//
//
//////选项卡 (按钮识别class==tabBtn，卡片识别全部children)
////c.BbsTab=function(t,c,noLoop){
////	if(!t || !c){return;}
////	this.tabc=c;
////	this.roll=c.children[0];
////
////	this.num=this.now=this.roll.children.length;
////	noLoop && (this.now=0);
////	this.tab=[];
////	this.box=this.roll.children;
////	this.noLoop=noLoop||0;
////	//按钮处理
////	var tabT=t;
////	if(tabT.innerHTML.replace(/^\s+|\s+$/,'')==''){
////		for(var i=0;i<this.num;i++){
////			var tmp=document.createElement('i');
////			tabT.appendChild(tmp);
////			this.tab.push(tmp);
////		}
////	}else{
////		this.tab=tabT.getElementsByClassName('tabBtn');
////	}
////
////	this.isRoll=false;
////	this.oW=this.tabc.offsetWidth;
////	this.initPos();
////	this.bind();
////};
////
////c.BbsTab.prototype={
////	initPos:function(){
////		var oW=this.oW;
////		//初始外层高度
////		var hasPic=this.box[0].getElementsByTagName('img');
////		//文本tab计算初始高度
////		if(!hasPic.length){
////			this.resetHeight(0);
////		}
////		//
////		//初始位置
////		f.tranSition(this.roll,0);
////		f.transForm(this.roll,[-this.now*oW,0]);
////		f.addClass(this.tab[0],'cur');
////
////		if(!this.noLoop){
////			this.roll.innerHTML+=(this.roll.innerHTML+this.roll.innerHTML);
////		}
////	},
////	bind:function(){
////		var t=this;
////		//滑动
////		f.touch(t.tabc).swipeLeft(function(){
////			t.next.call(t);
////		}).swipeRight(function(){
////			t.prev.call(t);
////		}).swipeMove(function(v){
////			//if(t.isRoll){return;}
////			//console.log(111);
////			f.tranSition(t.roll,0); f.transForm(t.roll,[-t.now*t.oW+v.x/2,0]);
////		}).swipeOther(function(){
////			f.tranSition(t.roll,250); f.transForm(t.roll,[-t.now*t.oW,0]);
////		});
////
////		//点击
////		for(var i=0;i<t.tab.length;i++){
////			t.tab[i].index=i;
////			t.tab[i].addEventListener(EV.te,function(){
////				//忽略重复点击，避免出现 webkitTransitionEnd 无法激活
////				//console.log(t.oldClick==this);
////				if(f.hasClass(this,'cur')){return;}
////				t.isRoll=false;
////				t.noLoop?t.fnTab(this.index):t.fnTab(this.index+t.num);
////			},false);
////		}
////		//旋转
////		var tabTimer=null;
////		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(){
////			clearTimeout(tabTimer);
////			tabTimer=setTimeout(function(){
////				t.oW=t.tabc.offsetWidth;
////				f.tranSition(t.roll,100);
////				f.transForm(t.roll,[-t.now*t.oW,0]);
////				t.resetHeight(t.now);
////			},300);
////		}, false);
////	},
////	next : function(){
////		if(this.noLoop){
////			this.now++;
////			this.now>=this.num && (this.now=this.num-1);
////			this.fnTab(this.now);
////		}else{
////			this.fnTab(this.now+1);
////		}
////	},
////	prev : function(){
////		if(this.noLoop){
////			this.now--;
////			this.now<0 && (this.now=0);
////			this.fnTab(this.now);
////		}else{
////			this.fnTab(this.now-1);
////		}
////	},
////	fnTab : function(n){
////		var t=this;
////		if(t.isRoll){return;} t.isRoll=true;
////		t.now=n;
////		f.tranSition(t.roll,250);
////		f.transForm(t.roll,[-t.now*t.oW,0]);
////		t.endFnName= function(){ //保存回调函数，转向this
////			t.tEnd();
////		};
////		t.tabc.addEventListener('webkitTransitionEnd',t.endFnName);
////		return false;
////	},
////	tEnd : function(){
////		var t=this;
////
////		//给外层重赋值高度
////		this.resetHeight(t.now);
////
////		if(!this.noLoop){
////			if(t.now>2*t.num-1){
////				t.now=t.num;
////				f.tranSition(t.roll,0); f.transForm(t.roll,[-t.now*t.oW,0]);
////			}
////			if(t.now<t.num){
////				t.now=2*t.num-1;
////				f.tranSition(t.roll,0); f.transForm(t.roll,[-t.now*t.oW,0]);
////			}
////		}
////		if(t.tab){
////			for(i in t.tab){
////				f.removeClass(t.tab[i],'cur');
////			}
////			this.noLoop?f.addClass(t.tab[t.now],'cur'):f.addClass(t.tab[t.now-t.num],'cur');
////		}
////		t.isRoll=false;
////		t.tabc.removeEventListener('webkitTransitionEnd',t.endFnName);
////	},
////	resetHeight : function(k){
////		this.tabc.style.height=this.box[k].offsetHeight+'px';
////	}
////};
//
///**** 通用配置 ****/
//
//var rootUrl='http://m.cnmo.com/';
//global && (global.rootUrl=rootUrl);
//configData && global && (global.configData=configData);
//
//c.navRoll('main_nav','main_nav_min',['main_nav_btn','main_nav_min_btn','main_nav_box','main_nav_min_box']); //导航菜单
//
//
//new c.BbsTab(f.g('tab1'),f.g('tabc1')); //选项卡
//
////焦点图
//new c.Focus({
//	oBox:        f.g('f1_1'), //焦点图区块
//	oDiv:         f.g('f1_2'), //原点区块
//	ww:           0,       //微调宽度(一般区块不满屏的时候设置)
//	loop:         false,  //是否无限滑动
//	LazyImg :  true    //是否延迟图片
//});






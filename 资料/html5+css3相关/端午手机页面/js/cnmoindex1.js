/**
 * Created by Administrator on 2016/5/6.
 */
//底层通用
var f={};
f = {
    tweenMove : function(obj, attrs, callback){
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
//document.ontouchmove=function(e){
//
//};

function iScroll(obj,btn){
    var oPicList=document.getElementById(obj);
    var aBtns=document.getElementById(btn).children;
    var iScroll=0,iStartX=0,iStartPageX=0,iNow=0,oTimer=0,oclick=0;
    var locWidth = oPicList.clientWidth;
    oPicList.style.width=locWidth+"px";
    oPicList.style.marginLeft=-locWidth+"px";

    addImg(oPicList);
    autoPlay();
    oPicList.addEventListener("touchstart",fnStart,false);
    oPicList.addEventListener("touchmove",fnMove,false);
    oPicList.addEventListener("touchend",fnEnd,false);

    function autoPlay(){
        oTimer=setInterval(function(){
            iNow++;
            next();
        },2000);
    }
    function addImg(obj){
        var aUl = obj.getElementsByTagName('ul')[0];
        var listLi = aUl.getElementsByTagName('li');
        var numLi = listLi.length;
        var liFirst = listLi[0].cloneNode('true');
        var liLast = listLi[numLi-1].cloneNode('true');
        aUl.insertBefore(liLast,listLi[0]);
        aUl.appendChild(liFirst);
    }

    function fnStart(ev){
        var ev=event||ev;
        clearInterval(oTimer);
        clearInterval(oPicList.timer);
        if(iNow<=-1){
            iNow+=aBtns.length;
            iScroll=-iNow*window.screen.width;
            f.css(oPicList, "translateX", iScroll);
        }else if(iNow>aBtns.length-1){
            iNow=0;
        }
        iStartPageX=ev.changedTouches[0].pageX;
        iStartX=iScroll;
        oclick = 0;

    };

    function fnMove(ev){
        var ev=event||ev;
        ev.preventDefault();
        var iDis=ev.changedTouches[0].pageX-iStartPageX;
        iScroll=iStartX+iDis;
        f.css(oPicList, "translateX", iScroll);
        oclick = 1;
    };

    function fnEnd(ev){
        var ev=event||ev;
        if(oclick){
            var iDis=ev.changedTouches[0].pageX-iStartPageX;
//			var iNubn=Math.floor(iDis/window.screen.width);
            var iNubn=Math.round(iDis/window.screen.width);
//			console.log(iDis,window.screen.width)
            iNow-=iNubn;
//			if(iDis>10){
//				iNow = iNow - iNubn -1;
//			}
            next();
            autoPlay();
        }
    };

    function next(){
        iScroll=-iNow*window.screen.width;

        for(var i=0;i<aBtns.length;i++){
            aBtns[i].className="";
        }
        aBtns[iNow%aBtns.length].className="active";
        if(iNow>=aBtns.length-1){
            f.tweenMove(oPicList,{translateX:{target:iScroll,duration: 300,fx : 'linear'}},function(){
                iNow=iNow%aBtns.length;
                iScroll=-iNow*window.screen.width;
                f.css(oPicList, "translateX", iScroll);
            });
        }else{
            f.tweenMove(oPicList,{translateX:{target:iScroll,duration: 300,fx : 'linear'}});
        }
    }
};


iScroll('picList','picBtns');

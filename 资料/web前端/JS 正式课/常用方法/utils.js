utils = {};


utils.getCss = function (ele, attr) {
    var val, reg;
    if ("getComputedStyle"in window) {
        val = window.getComputedStyle(ele, null)[attr];
    } else {
        if (attr === "opacity") {
            val = ele.currentStyle["filter"];
            reg = /^alpha\(opacity=((?:\d)|(?:[1-9]\d+))(?:\.\d)?\)$/;
            var tempVal = reg.exec(val);
            val = tempVal ? tempVal[1] / 100 : 1
        } else {
            val = ele.currentStyle[attr];
        }
        reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?(px|em|pt|rem|vh|vw)$/;
        return reg.test(val) ? parseFloat(val) : val;
    }
};

utils.prev=function(ele){//获取上一个哥哥元素节点
    if(ele.previousElementSibling){
        return ele.previousElementSibling;
    }
        var p= ele.previousSibling;
        while(p&& p.nodeType!==1){
            p=p.previousSibling;
        }
        return p;
};

utils.prevAll=function(ele){//获取所有哥哥元素节点
    var ary=[]; var pre=this.prev(ele);
    while(pre){
        ary.unshift(pre);
        pre=this.prev(pre);
    }
    return ary;
};

utils.next=function(ele){ // 获取下一个弟弟元素节点
    if(ele.nextElementSibling){
        return ele.nextElementSibling;
    }
    var nex=ele.nextSiblings;
    while(nex&&nex.nodeType!==1){
        nex=nex.nextSibling;
    }
    return nex;
};
utils.nextAll=function(ele){ //获取一个弟弟元素节点
   var ary=[]; var nex=this.next(ele);
    while(nex){
        ary.unshift(nex);
        nex=this.next(nex);
    }
    return ary;
};

utils.sibling=function(ele){// 获取当前元素相邻的哥哥和弟弟元素
    var p=this.prev(ele);
    var n=this.next(ele);
    var ary=[];
    if(p){ary.push(p)};
    if(n){ary.push(n)};
    return ary;
};

utils.siblings=function(ele){//获取当前元素所有兄弟元素节点
    //var pAll=this.prevAll(ele);
    //var nAll=this.nextAll(ele);
    //var ary=pAll.concat(nAll);
    //
    //return ary;
    return this.prevAll(ele).concat(this.nextAll(ele));
};

utils.getIndex=function(ele){//获取当前元素索引
    return this.prevAll(ele).length;
};

utils.getElementsByClass=function(strClass,context){//通过元素类名获取元素集合
    context=context||document;
    if("getElementByClassName" in document){
        return context.getElementsByClassName(strClass);
    }
    // 处理IE 6~8 下不兼容处理
    var ary=[]; //所有匹配的元素
    var reg=null;
    //1、获取指定上下文中的所有元素标签
    var tagList=document.getElementsByClassName("*");
    //2、把传递进来的strClass 多个样式类名，拆分成一个数组，里面包含每一个样式类名。
    var classAry=strClass.replace(/(^ +| +$)/g,"").split(/ +/);
    //3、循环所有的标签，把具备条件的保存到容器 ary中
    for(var i=0;i<tagList.length;i++){
        var curTag=tagList[i];
        //我们假设当前的curTag是想要，classAry中所有的样式单签元素都有。
        curTag.flag=true;//给当前元素增加自定义属性，假设传递近来的样式，当前标签都有。
        // 验证curTag是否包含每一个样式类名。
        for(var k=0;k<classAry.length;k++){
            reg=new RegExp("(^| +)"+classAry[k]+"( +|$)");
            if(!reg.test(curTag.className)){
            curTag.flag=false;
            break;
           }
        }
        curTag.flag?ary.push(curTag):null;
    }
    return ary;
};





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

utils.prev=function(ele){//��ȡ��һ�����Ԫ�ؽڵ�
    if(ele.previousElementSibling){
        return ele.previousElementSibling;
    }
        var p= ele.previousSibling;
        while(p&& p.nodeType!==1){
            p=p.previousSibling;
        }
        return p;
};

utils.prevAll=function(ele){//��ȡ���и��Ԫ�ؽڵ�
    var ary=[]; var pre=this.prev(ele);
    while(pre){
        ary.unshift(pre);
        pre=this.prev(pre);
    }
    return ary;
};

utils.next=function(ele){ // ��ȡ��һ���ܵ�Ԫ�ؽڵ�
    if(ele.nextElementSibling){
        return ele.nextElementSibling;
    }
    var nex=ele.nextSiblings;
    while(nex&&nex.nodeType!==1){
        nex=nex.nextSibling;
    }
    return nex;
};
utils.nextAll=function(ele){ //��ȡһ���ܵ�Ԫ�ؽڵ�
   var ary=[]; var nex=this.next(ele);
    while(nex){
        ary.unshift(nex);
        nex=this.next(nex);
    }
    return ary;
};

utils.sibling=function(ele){// ��ȡ��ǰԪ�����ڵĸ��͵ܵ�Ԫ��
    var p=this.prev(ele);
    var n=this.next(ele);
    var ary=[];
    if(p){ary.push(p)};
    if(n){ary.push(n)};
    return ary;
};

utils.siblings=function(ele){//��ȡ��ǰԪ�������ֵ�Ԫ�ؽڵ�
    //var pAll=this.prevAll(ele);
    //var nAll=this.nextAll(ele);
    //var ary=pAll.concat(nAll);
    //
    //return ary;
    return this.prevAll(ele).concat(this.nextAll(ele));
};

utils.getIndex=function(ele){//��ȡ��ǰԪ������
    return this.prevAll(ele).length;
};

utils.getElementsByClass=function(strClass,context){//ͨ��Ԫ��������ȡԪ�ؼ���
    context=context||document;
    if("getElementByClassName" in document){
        return context.getElementsByClassName(strClass);
    }
    // ����IE 6~8 �²����ݴ���
    var ary=[]; //����ƥ���Ԫ��
    var reg=null;
    //1����ȡָ���������е�����Ԫ�ر�ǩ
    var tagList=document.getElementsByClassName("*");
    //2���Ѵ��ݽ�����strClass �����ʽ��������ֳ�һ�����飬�������ÿһ����ʽ������
    var classAry=strClass.replace(/(^ +| +$)/g,"").split(/ +/);
    //3��ѭ�����еı�ǩ���Ѿ߱������ı��浽���� ary��
    for(var i=0;i<tagList.length;i++){
        var curTag=tagList[i];
        //���Ǽ��赱ǰ��curTag����Ҫ��classAry�����е���ʽ��ǩԪ�ض��С�
        curTag.flag=true;//����ǰԪ�������Զ������ԣ����贫�ݽ�������ʽ����ǰ��ǩ���С�
        // ��֤curTag�Ƿ����ÿһ����ʽ������
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





/**
 * Created by Administrator on 2016/1/6.
 */
function on(ele, type, fn) {
    if (!ele["onEvent" + type]) {
        ele["onEvent" + type] = [];
        ele.attachEvent("on" + type, function () {
            run.call(ele)
        })
    }
    var a = ele["onEvent" + type];
    for (var i = 0; i < a.length; i++) {
        if (a[i] == fn) {
            return;
        }
        a.push(fn);
    }
}
function run(e) {
    e = e || window.event;
    var type = e.type;
    var a = this["onEvent" + type];
    for (var i = 0; i < a.length; i++) {
        if (typeof a[i] === "function") {
            a[i].call(this, e);
        } else {
            a.splice(i, 1);
            i--;
        }
    }
}

function off(ele, type, fn) {
    var a = ele["onEvent" + type];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] == fn) {
                a[i] = null;
                break;
            }
        }
    }
}
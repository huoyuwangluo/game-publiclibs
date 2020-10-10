var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LuckyTurntableAlert = (function (_super) {
    __extends(LuckyTurntableAlert, _super);
    function LuckyTurntableAlert() {
        return _super.call(this) || this;
    }
    LuckyTurntableAlert.prototype.hide = function () {
        this.btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetFun, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    LuckyTurntableAlert.prototype.show = function (value, tomrrow) {
        this.todayValue = value;
        this.getNum.text = "" + value;
        this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetFun, this);
    };
    LuckyTurntableAlert.prototype.onGetFun = function (e) {
        var moshi = "201_" + this.todayValue;
        var rewards = [moshi];
        mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    LuckyTurntableAlert.prototype.onClose = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return LuckyTurntableAlert;
}(ui.LuckyTurntableAlertSkin));
__reflect(LuckyTurntableAlert.prototype, "LuckyTurntableAlert", ["IAlert", "egret.DisplayObject"]);

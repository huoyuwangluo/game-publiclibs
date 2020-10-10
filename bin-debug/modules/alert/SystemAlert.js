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
var SystemAlert = (function (_super) {
    __extends(SystemAlert, _super);
    function SystemAlert() {
        return _super.call(this) || this;
    }
    SystemAlert.prototype.show = function (msg) {
        this.labSystemMsg.text = "" + msg;
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    SystemAlert.prototype.hide = function () {
        this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    SystemAlert.prototype.onClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return SystemAlert;
}(ui.SystemAlertSkin));
__reflect(SystemAlert.prototype, "SystemAlert", ["IAlert", "egret.DisplayObject"]);

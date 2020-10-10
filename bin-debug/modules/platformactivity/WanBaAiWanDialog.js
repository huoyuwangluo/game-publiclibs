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
var WanBaAiWanDialog = (function (_super) {
    __extends(WanBaAiWanDialog, _super);
    function WanBaAiWanDialog() {
        return _super.call(this) || this;
    }
    WanBaAiWanDialog.prototype.show = function (data) {
        this.btnGoTo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this);
    };
    WanBaAiWanDialog.prototype.btnUpSureClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    WanBaAiWanDialog.prototype.onReceive = function (e) {
        window.open("https://iwan.qq.com/community/h5index?hidetitlebar=1?ADTAG=txsp.xyx.yxdl");
        mg.uiManager.remove(this);
    };
    WanBaAiWanDialog.prototype.hide = function () {
        this._data = null;
        this.btnGoTo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return WanBaAiWanDialog;
}(ui.WanBaAiWanSkin));
__reflect(WanBaAiWanDialog.prototype, "WanBaAiWanDialog", ["IAlert", "egret.DisplayObject"]);

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
var dialog;
(function (dialog) {
    var xpExperencet;
    (function (xpExperencet) {
        var xpExperencetMain = (function (_super) {
            __extends(xpExperencetMain, _super);
            function xpExperencetMain() {
                return _super.call(this) || this;
            }
            xpExperencetMain.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            xpExperencetMain.prototype.enter = function () {
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnQianWang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this);
            };
            xpExperencetMain.prototype.exit = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnQianWang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this);
            };
            xpExperencetMain.prototype.onReceive = function (e) {
                mg.uiManager.show(dialog.setting.SettingDialog);
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            xpExperencetMain.prototype.onClose = function (e) {
                mg.uiManager.remove(this);
            };
            return xpExperencetMain;
        }(ui.xpExperencetMainSkin));
        xpExperencet.xpExperencetMain = xpExperencetMain;
        __reflect(xpExperencetMain.prototype, "dialog.xpExperencet.xpExperencetMain");
    })(xpExperencet = dialog.xpExperencet || (dialog.xpExperencet = {}));
})(dialog || (dialog = {}));

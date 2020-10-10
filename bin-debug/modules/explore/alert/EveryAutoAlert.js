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
    var explore;
    (function (explore) {
        var EveryAutoAlert = (function (_super) {
            __extends(EveryAutoAlert, _super);
            function EveryAutoAlert() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EveryAutoAlert.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.list.dataProvider = new eui.ArrayCollection();
            };
            EveryAutoAlert.prototype.show = function () {
                this.list.dataProvider.source = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_EVERYONE);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            };
            EveryAutoAlert.prototype.hide = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.list.dataProvider.source = null;
                if (this.parent) {
                    this.parent.removeChild(this);
                }
                mg.uiManager.update(explore.CopyFightBossDialog);
            };
            EveryAutoAlert.prototype.touchHandler = function (e) {
                switch (e.currentTarget) {
                    case this.btnClose:
                        this.dispatchEventWith(egret.Event.CLOSE);
                        break;
                }
            };
            return EveryAutoAlert;
        }(ui.EveryAutoAlertSkin));
        explore.EveryAutoAlert = EveryAutoAlert;
        __reflect(EveryAutoAlert.prototype, "dialog.explore.EveryAutoAlert", ["IAlert", "egret.DisplayObject"]);
    })(explore = dialog.explore || (dialog.explore = {}));
})(dialog || (dialog = {}));

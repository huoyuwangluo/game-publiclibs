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
    var battlefield;
    (function (battlefield) {
        var BattlefieldYuGao = (function (_super) {
            __extends(BattlefieldYuGao, _super);
            function BattlefieldYuGao() {
                return _super.call(this) || this;
            }
            BattlefieldYuGao.prototype.show = function () {
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                if (GameModels.serverTime.kaifuDay == 1) {
                    this.labDes.text = Language.J_JDMOBAWF1;
                }
                else {
                    this.labDes.text = Language.J_JDMOBAWF2;
                }
            };
            BattlefieldYuGao.prototype.hide = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            BattlefieldYuGao.prototype.clickHandler = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            return BattlefieldYuGao;
        }(ui.BattlefieldYuGaoSkin));
        battlefield.BattlefieldYuGao = BattlefieldYuGao;
        __reflect(BattlefieldYuGao.prototype, "dialog.battlefield.BattlefieldYuGao", ["IAlert", "egret.DisplayObject"]);
    })(battlefield = dialog.battlefield || (dialog.battlefield = {}));
})(dialog || (dialog = {}));

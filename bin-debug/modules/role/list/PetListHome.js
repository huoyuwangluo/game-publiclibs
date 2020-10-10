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
    var list;
    (function (list) {
        var PetListHome = (function (_super) {
            __extends(PetListHome, _super);
            function PetListHome() {
                return _super.call(this) || this;
            }
            PetListHome.prototype.show = function () {
                this.btnFenJie.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            };
            PetListHome.prototype.onBtnClick = function (evt) {
                if (evt.currentTarget == this.btnFenJie) {
                    mg.uiManager.show(dialog.tujian.TuJianMainDialog, { tabIndex: 2 });
                }
                else {
                    mg.uiManager.show(dialog.list.PetListFenJieDialog);
                }
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            PetListHome.prototype.hide = function () {
                this.btnFenJie.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return PetListHome;
        }(ui.PetListHomeSkin));
        list.PetListHome = PetListHome;
        __reflect(PetListHome.prototype, "dialog.list.PetListHome", ["IAlert", "egret.DisplayObject"]);
    })(list = dialog.list || (dialog.list = {}));
})(dialog || (dialog = {}));

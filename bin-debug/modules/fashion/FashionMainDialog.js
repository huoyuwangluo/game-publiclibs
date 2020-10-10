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
    var fashion;
    (function (fashion) {
        var FashionMainDialog = (function (_super) {
            __extends(FashionMainDialog, _super);
            function FashionMainDialog() {
                var _this = _super.call(this) || this;
                _this._seleceIndex = -1;
                return _this;
            }
            FashionMainDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._tabBtns = [this.btnWeapon, this.btnClothing, this.btnHalo, this.btnTitle];
                this.initStack();
                GameModels.state.registerWarnTarget(GameRedState.ROLE_EQIUP_FASHION_WEAPON, this.btnWeapon);
                GameModels.state.registerWarnTarget(GameRedState.ROLE_EQIUP_FASHION_CLOTH, this.btnClothing);
                GameModels.state.registerWarnTarget(GameRedState.ROLE_EQIUP_FASHION_HALO, this.btnHalo);
            };
            FashionMainDialog.prototype.initStack = function () {
                this._modules = [];
                this.stack = new eui.ViewStack();
                this.stack.touchEnabled = false;
                this._modules[0] = this.stack.addChild(new item.fashion.FashionItem());
                this._modules[1] = this.stack.addChild(new item.fashion.FashionItem());
                this._modules[2] = this.stack.addChild(new item.fashion.FashionItem());
                this._modules[3] = this.stack.addChild(new item.fashion.TitleItem());
                this.addChild(this.stack);
            };
            FashionMainDialog.prototype.enter = function (data) {
                var rolePos = (data && data.hasOwnProperty("param") ? data.param : 0);
                this._rolePos = rolePos ? rolePos : 0;
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                this.btnWeapon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tabOnClick, this);
                this.btnClothing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tabOnClick, this);
                this.btnHalo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tabOnClick, this);
                this.btnTitle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tabOnClick, this);
            };
            FashionMainDialog.prototype.exit = function () {
                this._seleceIndex = null;
                this._modules[this.stack.selectedIndex].exit();
                this.btnWeapon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tabOnClick, this);
                this.btnClothing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tabOnClick, this);
                this.btnHalo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tabOnClick, this);
                this.btnTitle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tabOnClick, this);
            };
            FashionMainDialog.prototype.closeHandler = function (e) {
                mg.uiManager.remove(this);
            };
            FashionMainDialog.prototype.tabOnClick = function (e) {
                var index = this._tabBtns.indexOf(e.target);
                if (index != -1) {
                    mg.soundManager.playSound('ButtonClick_1');
                    this.onSelectChange(index);
                }
            };
            FashionMainDialog.prototype.onSelectChange = function (index) {
                if (index == this._seleceIndex)
                    return;
                var oldIndex = this.stack.selectedIndex;
                this._tabBtns[oldIndex].currentState = "up";
                this._modules[oldIndex].exit();
                this._seleceIndex = this.stack.selectedIndex = index;
                this._tabBtns[index].currentState = "down";
                this._modules[index].enter({ type: index, pos: this._rolePos }, null);
            };
            Object.defineProperty(FashionMainDialog.prototype, "titleItem", {
                get: function () {
                    return this._modules[1];
                },
                enumerable: true,
                configurable: true
            });
            return FashionMainDialog;
        }(ui.FashionMainDialogSkin));
        fashion.FashionMainDialog = FashionMainDialog;
        __reflect(FashionMainDialog.prototype, "dialog.fashion.FashionMainDialog");
    })(fashion = dialog.fashion || (dialog.fashion = {}));
})(dialog || (dialog = {}));

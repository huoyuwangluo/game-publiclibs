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
var view;
(function (view) {
    var vip;
    (function (vip) {
        var VipMianDailog = (function (_super) {
            __extends(VipMianDailog, _super);
            function VipMianDailog() {
                var _this = _super.call(this) || this;
                _this._seleceIndex = -1;
                return _this;
            }
            VipMianDailog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._tabBtns = [this.btnVipXianGou, this.btnVipTeQuan];
                this._modules = [];
                this._stack = new eui.ViewStack();
                this._stack.touchEnabled = false;
                this._modules[0] = this._stack.addChild(new vip.vipGiftView());
                // this._modules[2] = this._stack.addChild(new MallTeQuanShop()) as MallTeQuanShop;
                // this._modules[1] = this._stack.addChild(new VipExchange()) as VipExchange;
                this._modules[1] = this._stack.addChild(new vip.MallTeQuan());
                this.addChild(this._stack);
                this._titleImg = ["tequanShop", "teQuan"];
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                GameModels.state.registerWarnTarget(GameRedState.VIP_TEQUAN_XIANGOU, this.btnVipXianGou);
                // GameModels.state.registerWarnTarget(GameRedState.VIP_TEQUAN_DUIHUAN, this.btnVipExchange);
                GameModels.state.registerWarnTarget(GameRedState.VIP_TEQUAN_SPECAILCARD, this.btnVipTeQuan);
            };
            VipMianDailog.prototype.destory = function () {
                _super.prototype.destory.call(this);
                this._tabBtns.length = 0;
                for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                    var moduleView = _a[_i];
                    moduleView.destory();
                }
                this._modules.length = 0;
                this._stack.removeChildren();
                this._stack = null;
            };
            VipMianDailog.prototype.enter = function (data) {
                mg.soundManager.playViewLongSound("SoundJM_13", "SKILL");
                this._pos = (data && data.hasOwnProperty("param") ? data.param : 0);
                this._isBossComing = (data && data.hasOwnProperty("param1") ? data.param1 : false);
                if (!this._pos)
                    this._pos = 0;
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                this.btnVipXianGou.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnVipShangCheng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnVipExchange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnVipTeQuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            };
            VipMianDailog.prototype.exit = function () {
                var oldIndex = this._stack.selectedIndex;
                this._modules[oldIndex].exit();
                this.btnVipXianGou.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnVipShangCheng.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnVipExchange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnVipTeQuan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this._seleceIndex = -1;
                if (this._isBossComing) {
                    copy.CopyWinInstance.instance.visibleView = true;
                }
            };
            VipMianDailog.prototype.refreshMarkImagesDisplay = function () {
                for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                    var moduleView = _a[_i];
                    moduleView.refreshMarkImagesDisplay();
                }
            };
            Object.defineProperty(VipMianDailog.prototype, "mallTeQuanShopView", {
                get: function () {
                    return this._modules[2];
                },
                enumerable: true,
                configurable: true
            });
            VipMianDailog.prototype.onTabClick = function (e) {
                var index = this._tabBtns.indexOf(e.target);
                if (index != -1) {
                    mg.soundManager.playSound('ButtonClick_1');
                    this.onSelectChange(index);
                }
            };
            VipMianDailog.prototype.onSelectChange = function (index) {
                if (index != this._seleceIndex) {
                    if (TypeFunOpen.checkFuncOpen(this, index, true)) {
                        var oldIndex = this._stack ? this._stack.selectedIndex : 0;
                        this._tabBtns[oldIndex].currentState = "up";
                        this._modules[oldIndex].exit();
                        this._seleceIndex = this._stack.selectedIndex = index;
                        this._tabBtns[index].currentState = "down";
                        this._modules[index].enter(this._pos, null);
                        this.updateTitle(this._titleImg[index] ? this._titleImg[index] : null);
                    }
                }
            };
            return VipMianDailog;
        }(ui.VipMianDailogSkin));
        vip.VipMianDailog = VipMianDailog;
        __reflect(VipMianDailog.prototype, "view.vip.VipMianDailog");
    })(vip = view.vip || (view.vip = {}));
})(view || (view = {}));

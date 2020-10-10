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
    var shop;
    (function (shop) {
        var MallChangeShopMain = (function (_super) {
            __extends(MallChangeShopMain, _super);
            function MallChangeShopMain() {
                var _this = _super.call(this) || this;
                _this._seleceIndex = -1;
                return _this;
            }
            MallChangeShopMain.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._tabBtns = [this.btnTaoFa, this.btnJunGong, this.btnTianTi, this.btnYuanZheng, this.btnShouHun];
                this._modules = [];
                this._stack = new eui.ViewStack();
                this._stack.touchEnabled = false;
                this._modules[0] = this._stack.addChild(new dialog.shop.MallTaoFaChangeShop());
                this._modules[1] = this._stack.addChild(new dialog.shop.MallJunGongChangeShop());
                this._modules[2] = this._stack.addChild(new dialog.shop.MallTianTiChangeShop());
                this._modules[3] = this._stack.addChild(new dialog.shop.MallYuanZhengChangeShop());
                this._modules[4] = this._stack.addChild(new dialog.shop.MallShouHunChangeShop());
                this.addChild(this._stack);
                GameModels.state.registerWarnTarget(GameRedState.JUNGONG_SHOP, this.btnJunGong);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            MallChangeShopMain.prototype.destory = function () {
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
            MallChangeShopMain.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this.group.removeChildren();
                if (GameModels.animal && GameModels.animal.hashOpen8day) {
                    this.group.addChild(this.btnTaoFa);
                    this.group.addChild(this.btnTianTi);
                    this.group.addChild(this.btnYuanZheng);
                    this.group.addChild(this.btnJunGong);
                    this.group.addChild(this.btnShouHun);
                }
                else {
                    this.group.addChild(this.btnTaoFa);
                    this.group.addChild(this.btnTianTi);
                    this.group.addChild(this.btnYuanZheng);
                    this.group.addChild(this.btnJunGong);
                }
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                this.btnTaoFa.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnTianTi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnYuanZheng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnJunGong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnShouHun.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            };
            MallChangeShopMain.prototype.exit = function () {
                var oldIndex = this._stack.selectedIndex;
                this._modules[oldIndex].exit();
                this.btnTaoFa.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnTianTi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnYuanZheng.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnJunGong.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnShouHun.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this._seleceIndex = -1;
            };
            Object.defineProperty(MallChangeShopMain.prototype, "taoFaShop", {
                get: function () {
                    return this._modules[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MallChangeShopMain.prototype, "junGongShop", {
                get: function () {
                    return this._modules[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MallChangeShopMain.prototype, "tianTiShop", {
                get: function () {
                    return this._modules[2];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MallChangeShopMain.prototype, "yuanZhengShop", {
                get: function () {
                    return this._modules[3];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MallChangeShopMain.prototype, "shouhunShop", {
                get: function () {
                    return this._modules[4];
                },
                enumerable: true,
                configurable: true
            });
            MallChangeShopMain.prototype.onTabClick = function (e) {
                var index = this._tabBtns.indexOf(e.target);
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            MallChangeShopMain.prototype.onSelectChange = function (index) {
                if (index != this._seleceIndex) {
                    if (TypeFunOpen.checkFuncOpen(this, index, true)) {
                        var oldIndex = this._stack.selectedIndex;
                        this._tabBtns[oldIndex].currentState = "up";
                        this._modules[oldIndex].exit();
                        this._seleceIndex = this._stack.selectedIndex = index;
                        this._tabBtns[index].currentState = "down";
                        this._modules[index].enter(this._rolePos, this._guideData);
                    }
                }
            };
            Object.defineProperty(MallChangeShopMain.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            /**标签改变 */
            MallChangeShopMain.CHANG_TAL = "CHANG_TAL";
            return MallChangeShopMain;
        }(ui.MallChangeShopMainSkin));
        shop.MallChangeShopMain = MallChangeShopMain;
        __reflect(MallChangeShopMain.prototype, "dialog.shop.MallChangeShopMain");
    })(shop = dialog.shop || (dialog.shop = {}));
})(dialog || (dialog = {}));

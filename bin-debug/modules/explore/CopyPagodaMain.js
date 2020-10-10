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
        var CopyPagodaMain = (function (_super) {
            __extends(CopyPagodaMain, _super);
            function CopyPagodaMain() {
                var _this = _super.call(this) || this;
                _this._seleceIndex = -1;
                return _this;
            }
            CopyPagodaMain.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._modules = [];
                this._stack = new eui.ViewStack();
                this._stack.touchEnabled = false;
                this._modules[0] = this._stack.addChild(new dialog.explore.CopySoulsPagoda());
                this._modules[1] = this._stack.addChild(new dialog.explore.CopyAnimalPagodaDialog());
                this._modules[2] = this._stack.addChild(new dialog.explore.CopyLockDemonDialog());
                this._titleImg = ["wuHun", "explorePetpagoda", "exploreGoblinpagoda"];
                this.addChild(this._stack);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._tabBtns = [this.btnWuHun, this.btnWuShen, this.btnShiLian];
                GameModels.state.registerWarnTarget(GameRedState.EXPLORE_WUHUNPAGODA, this.btnWuHun);
                GameModels.state.registerWarnTarget(GameRedState.EXPLORE_PETPAGODA, this.btnWuShen);
                GameModels.state.registerWarnTarget(GameRedState.EXPLORE_SUOYAOPAGODA, this.btnShiLian);
            };
            CopyPagodaMain.prototype.destory = function () {
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
            CopyPagodaMain.prototype.enter = function (data) {
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                this.btnWuHun.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnWuShen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnShiLian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            };
            CopyPagodaMain.prototype.exit = function () {
                this.btnWuHun.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnWuShen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnShiLian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this._seleceIndex = -1;
            };
            CopyPagodaMain.prototype.onTabClick = function (e) {
                var index;
                if (e && e.target) {
                    index = this._tabBtns.indexOf(e.target);
                }
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            CopyPagodaMain.prototype.onSelectChange = function (index) {
                if (index != this._seleceIndex) {
                    if (TypeFunOpen.checkFuncOpen(this, index, true)) {
                        var oldIndex = this._stack.selectedIndex;
                        this._tabBtns[oldIndex].currentState = "up";
                        this._modules[oldIndex].exit();
                        this._seleceIndex = this._stack.selectedIndex = index;
                        this._tabBtns[index].currentState = "down";
                        this._modules[index].enter(null, null);
                        this.updateTitle(this._titleImg[index] ? this._titleImg[index] : null);
                    }
                    this.dispatchEventWith(CopyPagodaMain.CHANG_TAL);
                }
            };
            CopyPagodaMain.prototype.updataChange = function () {
                this.dispatchEventWith(CopyPagodaMain.CHANG_TAL);
            };
            Object.defineProperty(CopyPagodaMain.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CopyPagodaMain.prototype, "copyWuHunPagodaView", {
                get: function () {
                    return this._modules[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CopyPagodaMain.prototype, "copyAnimalPagodaView", {
                get: function () {
                    return this._modules[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CopyPagodaMain.prototype, "copyLockView", {
                get: function () {
                    return this._modules[2];
                },
                enumerable: true,
                configurable: true
            });
            /**标签改变 */
            CopyPagodaMain.CHANG_TAL = "CHANG_TAL";
            return CopyPagodaMain;
        }(ui.CopyPagodaMainSkin));
        explore.CopyPagodaMain = CopyPagodaMain;
        __reflect(CopyPagodaMain.prototype, "dialog.explore.CopyPagodaMain");
    })(explore = dialog.explore || (dialog.explore = {}));
})(dialog || (dialog = {}));

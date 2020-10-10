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
    var strategy;
    (function (strategy) {
        var StrategyMain = (function (_super) {
            __extends(StrategyMain, _super);
            function StrategyMain() {
                return _super.call(this) || this;
            }
            StrategyMain.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._modules = [];
                this._stack = new eui.ViewStack();
                this._stack.touchEnabled = false;
                this._modules[0] = this._stack.addChild(new dialog.strategy.StrategyTuCao());
                this._modules[1] = this._stack.addChild(new dialog.strategy.StrategyMiDian());
                this.addChild(this._stack);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._tabBtns = [this.btnTuCao, this.btnMiDian];
                this._imgArr = ["strategy", "midian"];
            };
            StrategyMain.prototype.destory = function () {
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
            StrategyMain.prototype.enter = function (data) {
                this._seleceIndex = -1;
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                this.btnTuCao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnMiDian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            };
            StrategyMain.prototype.exit = function () {
                var oldIndex = this._stack.selectedIndex;
                this._modules[oldIndex].exit();
                this.btnTuCao.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnMiDian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this._seleceIndex = -1;
            };
            StrategyMain.prototype.onTabClick = function (e) {
                var index;
                if (e && e.target) {
                    index = this._tabBtns.indexOf(e.target);
                }
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            StrategyMain.prototype.onSelectChange = function (index) {
                if (index != this._seleceIndex) {
                    if (TypeFunOpen.checkFuncOpen(this, index, true)) {
                        var oldIndex = this._stack.selectedIndex;
                        this._tabBtns[oldIndex].currentState = "up";
                        this._modules[oldIndex].exit();
                        this._seleceIndex = this._stack.selectedIndex = index;
                        this._tabBtns[index].currentState = "down";
                        this._modules[index].enter(null, null);
                        this.updateTitle(this._imgArr[index]);
                    }
                    this.dispatchEventWith(dialog.strategy.StrategyMain.CHANG_TAL);
                }
            };
            StrategyMain.prototype.updataChange = function () {
                this.dispatchEventWith(dialog.strategy.StrategyMain.CHANG_TAL);
            };
            Object.defineProperty(StrategyMain.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            /**标签改变 */
            StrategyMain.CHANG_TAL = "CHANG_TAL";
            return StrategyMain;
        }(ui.StrategyMainSkin));
        strategy.StrategyMain = StrategyMain;
        __reflect(StrategyMain.prototype, "dialog.strategy.StrategyMain");
    })(strategy = dialog.strategy || (dialog.strategy = {}));
})(dialog || (dialog = {}));

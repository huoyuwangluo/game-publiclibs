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
    var legion;
    (function (legion) {
        var LegionTeHuiMain = (function (_super) {
            __extends(LegionTeHuiMain, _super);
            function LegionTeHuiMain() {
                return _super.call(this) || this;
            }
            LegionTeHuiMain.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._modules = [];
                this._stack = new eui.ViewStack();
                this._stack.touchEnabled = false;
                this._modules[0] = this._stack.addChild(new legion.LegionTeHui());
                this._modules[1] = this._stack.addChild(new legion.LegionWelfare());
                this.addChild(this._stack);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._tabBtns = [this.btnTeHui, this.btnWelfare];
                GameModels.state.registerWarnTarget(GameRedState.UNION_FULI_TEHUI_GOUMAI, this.btnTeHui);
                GameModels.state.registerWarnTarget(GameRedState.UNION_FULI_TEHUI_LINGQU, this.btnWelfare);
            };
            LegionTeHuiMain.prototype.destory = function () {
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
            LegionTeHuiMain.prototype.enter = function (data) {
                this._seleceIndex = -1;
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                this.btnTeHui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnWelfare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            };
            LegionTeHuiMain.prototype.exit = function () {
                var oldIndex = this._stack.selectedIndex;
                this._modules[oldIndex].exit();
                this.btnTeHui.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnWelfare.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this._seleceIndex = -1;
            };
            LegionTeHuiMain.prototype.onTabClick = function (e) {
                var index;
                if (e && e.target) {
                    index = this._tabBtns.indexOf(e.target);
                }
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            LegionTeHuiMain.prototype.onSelectChange = function (index) {
                if (index != this._seleceIndex) {
                    if (TypeFunOpen.checkFuncOpen(this, index, true)) {
                        var oldIndex = this._stack.selectedIndex;
                        this._tabBtns[oldIndex].currentState = "up";
                        this._modules[oldIndex].exit();
                        this._seleceIndex = this._stack.selectedIndex = index;
                        this._tabBtns[index].currentState = "down";
                        this._modules[index].enter(null, null);
                    }
                    this.dispatchEventWith(legion.LegionTaskMain.CHANG_TAL);
                }
            };
            LegionTeHuiMain.prototype.updataChange = function () {
                this.dispatchEventWith(legion.LegionTaskMain.CHANG_TAL);
            };
            Object.defineProperty(LegionTeHuiMain.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LegionTeHuiMain.prototype, "legionTeHui", {
                get: function () {
                    return this._modules[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LegionTeHuiMain.prototype, "legionWelfare", {
                get: function () {
                    return this._modules[1];
                },
                enumerable: true,
                configurable: true
            });
            /**标签改变 */
            LegionTeHuiMain.CHANG_TAL = "CHANG_TAL";
            return LegionTeHuiMain;
        }(ui.LegionTeHuiMainSkin));
        legion.LegionTeHuiMain = LegionTeHuiMain;
        __reflect(LegionTeHuiMain.prototype, "dialog.legion.LegionTeHuiMain");
    })(legion = dialog.legion || (dialog.legion = {}));
})(dialog || (dialog = {}));

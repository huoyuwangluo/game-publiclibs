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
        var LegionTaskMain = (function (_super) {
            __extends(LegionTaskMain, _super);
            function LegionTaskMain() {
                return _super.call(this) || this;
            }
            LegionTaskMain.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._modules = [];
                this._stack = new eui.ViewStack();
                this._stack.touchEnabled = false;
                this._modules[0] = this._stack.addChild(new LegionZhanLing());
                this._modules[1] = this._stack.addChild(new LegionTask());
                this._titleImg = ["legionTask", "legionTask"];
                this.addChild(this._stack);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._tabBtns = [this.btnZhanLing, this.btnTask];
                GameModels.state.registerWarnTarget(GameRedState.UNION_RICHANG_TASK_TASK, this.btnTask);
                GameModels.state.registerWarnTarget(GameRedState.UNION_RICHANG_TASK_ZHANLING, this.btnZhanLing);
            };
            LegionTaskMain.prototype.destory = function () {
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
            LegionTaskMain.prototype.enter = function (data) {
                this._seleceIndex = -1;
                this.btnZhanLing.visible = this.btnTask.visible = GameModels.platform.isPay;
                if (!GameModels.platform.isPay) {
                    this.onSelectChange(1);
                }
                else {
                    this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                }
                this.btnZhanLing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnTask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            };
            LegionTaskMain.prototype.exit = function () {
                var oldIndex = this._stack.selectedIndex;
                this._modules[oldIndex].exit();
                this.btnZhanLing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnTask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this._seleceIndex = -1;
            };
            LegionTaskMain.prototype.onTabClick = function (e) {
                var index;
                if (e && e.target) {
                    index = this._tabBtns.indexOf(e.target);
                }
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            LegionTaskMain.prototype.onSelectChange = function (index) {
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
                    this.dispatchEventWith(LegionTaskMain.CHANG_TAL);
                }
            };
            LegionTaskMain.prototype.updataChange = function () {
                this.dispatchEventWith(LegionTaskMain.CHANG_TAL);
            };
            Object.defineProperty(LegionTaskMain.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LegionTaskMain.prototype, "legionZhanLing", {
                get: function () {
                    return this._modules[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LegionTaskMain.prototype, "legionTask", {
                get: function () {
                    return this._modules[1];
                },
                enumerable: true,
                configurable: true
            });
            /**标签改变 */
            LegionTaskMain.CHANG_TAL = "CHANG_TAL";
            return LegionTaskMain;
        }(ui.LegionTaskMainSkin));
        legion.LegionTaskMain = LegionTaskMain;
        __reflect(LegionTaskMain.prototype, "dialog.legion.LegionTaskMain");
    })(legion = dialog.legion || (dialog.legion = {}));
})(dialog || (dialog = {}));

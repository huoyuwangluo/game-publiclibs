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
    var sport;
    (function (sport) {
        var SportsMainDialog = (function (_super) {
            __extends(SportsMainDialog, _super);
            function SportsMainDialog() {
                return _super.call(this) || this;
            }
            SportsMainDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._modules = [];
                this._stack = new eui.ViewStack();
                this._stack.touchEnabled = false;
                this._modules[0] = this._stack.addChild(new dialog.explore.LadderViewDialog());
                this._modules[1] = this._stack.addChild(new dialog.explore.LadderViewDialog1());
                this.addChild(this._stack);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._tabBtns = [this.btnTianTi, this.btnYanWu];
            };
            SportsMainDialog.prototype.destory = function () {
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
            SportsMainDialog.prototype.enter = function (data) {
                mg.soundManager.playViewLongSound("SoundJM_14", "SPORTS");
                this._seleceIndex = -1;
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                this.btnYanWu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnTianTi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                // this.btnDeath.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                // this.btnGodDie.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                // this.btnWoods.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                GameModels.state.registerWarnTarget(GameRedState.ARENA_LADDER, this.btnTianTi);
                GameModels.state.registerWarnTarget(GameRedState.ARENA_YANWU, this.btnYanWu);
                // GameModels.state.registerWarnTarget(GameRedState.GOD_DIE, this.btnGodDie);
                // GameModels.state.registerWarnTarget(GameRedState.WOORS_BOSS, this.btnWoods);
                // GameModels.state.registerWarnTarget(GameRedState.DEATH_BOSS, this.btnDeath);
            };
            SportsMainDialog.prototype.exit = function () {
                this.btnYanWu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnTianTi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                // this.btnDeath.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                // this.btnGodDie.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                // this.btnWoods.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                GameModels.state.unRegisterWarnTarget(GameRedState.ARENA_LADDER);
                GameModels.state.unRegisterWarnTarget(GameRedState.ARENA_YANWU);
                // GameModels.state.unRegisterWarnTarget(GameRedState.GOD_DIE);
                // GameModels.state.unRegisterWarnTarget(GameRedState.WOORS_BOSS);
                this._seleceIndex = -1;
            };
            SportsMainDialog.prototype.onTabClick = function (e) {
                var index;
                if (e && e.target) {
                    index = this._tabBtns.indexOf(e.target);
                }
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            SportsMainDialog.prototype.onSelectChange = function (index) {
                if (index != this._seleceIndex) {
                    if (TypeFunOpen.checkFuncOpen(this, index, true)) {
                        var oldIndex = this._stack.selectedIndex;
                        this._tabBtns[oldIndex].currentState = "up";
                        this._modules[oldIndex].exit();
                        this._seleceIndex = this._stack.selectedIndex = index;
                        this._tabBtns[index].currentState = "down";
                        this._modules[index].enter(null, null);
                    }
                    this.dispatchEventWith(SportsMainDialog.CHANG_TAL);
                }
            };
            SportsMainDialog.prototype.updataChange = function () {
                this.dispatchEventWith(SportsMainDialog.CHANG_TAL);
            };
            Object.defineProperty(SportsMainDialog.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SportsMainDialog.prototype, "yanWuView", {
                get: function () {
                    return this._modules[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SportsMainDialog.prototype, "ladderView", {
                get: function () {
                    return this._modules[0];
                },
                enumerable: true,
                configurable: true
            });
            /**标签改变 */
            SportsMainDialog.CHANG_TAL = "CHANG_TAL";
            return SportsMainDialog;
        }(ui.SportsMainDialogSkin));
        sport.SportsMainDialog = SportsMainDialog;
        __reflect(SportsMainDialog.prototype, "dialog.sport.SportsMainDialog");
    })(sport = dialog.sport || (dialog.sport = {}));
})(dialog || (dialog = {}));

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
    var WenGuan;
    (function (WenGuan) {
        var WenGuanDialog = (function (_super) {
            __extends(WenGuanDialog, _super);
            function WenGuanDialog() {
                var _this = _super.call(this) || this;
                _this._seleceIndex = -1;
                return _this;
            }
            WenGuanDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._tabBtns = [this.btnWenGuan, this.btnWuGuan];
                this._modules = [];
                this._stack = new eui.ViewStack();
                this._stack.touchEnabled = false;
                this._modules[0] = this._stack.addChild(new achievement.AchievementWenGuanDialog());
                this._modules[1] = this._stack.addChild(new dialog.WenGuan.CampChallenge());
                this.addChild(this._stack);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                GameModels.state.registerWarnTarget(GameRedState.GUANZHI_WENGUAN, this.btnWenGuan);
                GameModels.state.registerWarnTarget(GameRedState.GUANZHI_WUGUAN, this.btnWuGuan);
            };
            WenGuanDialog.prototype.destory = function () {
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
            WenGuanDialog.prototype.enter = function (data) {
                mg.soundManager.playViewLongSound("SoundJM_13", "SKILL");
                var rolePos = (data && data.hasOwnProperty("param") ? data.param : 0);
                this._rolePos = rolePos ? rolePos : 0;
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                this.btnWenGuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnWuGuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            };
            WenGuanDialog.prototype.exit = function () {
                var oldIndex = this._stack.selectedIndex;
                this._modules[oldIndex].exit();
                this.btnWenGuan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnWuGuan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this._seleceIndex = -1;
            };
            Object.defineProperty(WenGuanDialog.prototype, "wenGuanView", {
                get: function () {
                    if (!this._modules)
                        return null;
                    return this._modules[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WenGuanDialog.prototype, "hongYanView", {
                get: function () {
                    return this._modules[1];
                },
                enumerable: true,
                configurable: true
            });
            WenGuanDialog.prototype.refreshMarkImagesDisplay = function () {
                for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                    var moduleView = _a[_i];
                    moduleView.refreshMarkImagesDisplay();
                }
            };
            WenGuanDialog.prototype.onClose = function (e) {
                mg.uiManager.remove(this);
            };
            WenGuanDialog.prototype.onTabClick = function (e) {
                var index = this._tabBtns.indexOf(e.target);
                if (index != -1) {
                    mg.soundManager.playSound('ButtonClick_1');
                    this.onSelectChange(index);
                }
            };
            WenGuanDialog.prototype.onSelectChange = function (index) {
                if (index != this._seleceIndex) {
                    if (!GameModels.user.player.legionId && index == 1) {
                        mg.alertManager.tip(Language.J_NWJRZY, 0xff0000);
                        return;
                    }
                    if (TypeFunOpen.checkFuncOpen(this, index, true)) {
                        var oldIndex = this._stack ? this._stack.selectedIndex : 0;
                        this._tabBtns[oldIndex].currentState = "up";
                        this._modules[oldIndex].exit();
                        this._seleceIndex = this._stack.selectedIndex = index;
                        this._tabBtns[index].currentState = "down";
                        this._modules[index].enter(this._rolePos, null);
                        this.updataChange();
                    }
                }
            };
            WenGuanDialog.prototype.updataChange = function () {
                this.dispatchEventWith(dialog.WenGuan.WenGuanDialog.CHANG_TAL);
            };
            Object.defineProperty(WenGuanDialog.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            /**标签改变 */
            WenGuanDialog.CHANG_TAL = "CHANG_TAL";
            return WenGuanDialog;
        }(ui.WenGuanDialogSkin));
        WenGuan.WenGuanDialog = WenGuanDialog;
        __reflect(WenGuanDialog.prototype, "dialog.WenGuan.WenGuanDialog");
    })(WenGuan = dialog.WenGuan || (dialog.WenGuan = {}));
})(dialog || (dialog = {}));

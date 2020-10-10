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
    var tujian;
    (function (tujian) {
        var TuJianMainDialog = (function (_super) {
            __extends(TuJianMainDialog, _super);
            function TuJianMainDialog() {
                var _this = _super.call(this) || this;
                _this._seleceIndex = -1;
                return _this;
            }
            TuJianMainDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._tabBtns = [this.btnTuJian, this.btnPet, this.btnShengXing, this.btnLvReast, this.btnStarReast];
                this._modules = [];
                this._stack = new eui.ViewStack();
                this._stack.touchEnabled = false;
                this._modules[0] = this._stack.addChild(new achievement.AchievementTuJianDialog());
                this._modules[1] = this._stack.addChild(new dialog.list.PetListAllPetDialog());
                this._modules[2] = this._stack.addChild(new dialog.petChoose.PetChooseMainDialog());
                this._modules[3] = this._stack.addChild(new pet.PetLvRebirth());
                this._modules[4] = this._stack.addChild(new pet.PetRebirth());
                this.addChild(this._stack);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                GameModels.state.registerWarnTarget(GameRedState.TUJIAN_TUJIAN, this.btnTuJian);
                GameModels.state.registerWarnTarget(GameRedState.TUJIAN_QUCIK_SHENGXING, this.btnShengXing);
                GameModels.state.registerWarnTarget(GameRedState.TUJIAN_LV_ZHONGSEHNG, this.btnLvReast);
                //GameModels.state.registerWarnTarget(GameRedState.TUJIAN_STAR_ZHONGSEHNG, this.btnStarReast);
            };
            TuJianMainDialog.prototype.destory = function () {
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
            TuJianMainDialog.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this._guideData = (data && data.hasOwnProperty("guideData") ? data.guideData : null);
                this._rolePos = (data && data.hasOwnProperty("param") ? data.param : -1);
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                this.btnTuJian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnShengXing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnLvReast.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnStarReast.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnPet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            };
            TuJianMainDialog.prototype.exit = function () {
                var oldIndex = this._stack.selectedIndex;
                this._modules[oldIndex].exit();
                this.btnTuJian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnShengXing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnLvReast.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnStarReast.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnPet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this._seleceIndex = -1;
                //mg.uiManager.offClosePre(RoleMainDialog);
            };
            Object.defineProperty(TuJianMainDialog.prototype, "tujianView", {
                get: function () {
                    return this._modules[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TuJianMainDialog.prototype, "petAllPetView", {
                get: function () {
                    return this._modules[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TuJianMainDialog.prototype, "shengxingView", {
                get: function () {
                    return this._modules[2];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TuJianMainDialog.prototype, "lvRebirthView", {
                get: function () {
                    return this._modules[3];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TuJianMainDialog.prototype, "RebirthView", {
                get: function () {
                    return this._modules[4];
                },
                enumerable: true,
                configurable: true
            });
            TuJianMainDialog.prototype.updataChange = function () {
                this.dispatchEventWith(TuJianMainDialog.CHANG_TAL);
            };
            TuJianMainDialog.prototype.refreshMarkImagesDisplay = function () {
                for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                    var moduleView = _a[_i];
                    moduleView.refreshMarkImagesDisplay();
                }
            };
            TuJianMainDialog.prototype.onClose = function (e) {
                mg.uiManager.remove(this);
            };
            TuJianMainDialog.prototype.onTabClick = function (e) {
                var index = this._tabBtns.indexOf(e.target);
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            TuJianMainDialog.prototype.onSelectChange = function (index) {
                if (index != this._seleceIndex) {
                    if (TypeFunOpen.checkFuncOpen(this, index, true)) {
                        var oldIndex = this._stack.selectedIndex;
                        this._tabBtns[oldIndex].currentState = "up";
                        this._modules[oldIndex].exit();
                        this._seleceIndex = this._stack.selectedIndex = index;
                        this._tabBtns[index].currentState = "down";
                        this._modules[index].enter(this._rolePos, this._guideData);
                        this.updataChange();
                    }
                }
            };
            Object.defineProperty(TuJianMainDialog.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            /**标签改变 */
            TuJianMainDialog.CHANG_TAL = "CHANG_TAL";
            return TuJianMainDialog;
        }(ui.TuJianMainSkin));
        tujian.TuJianMainDialog = TuJianMainDialog;
        __reflect(TuJianMainDialog.prototype, "dialog.tujian.TuJianMainDialog");
    })(tujian = dialog.tujian || (dialog.tujian = {}));
})(dialog || (dialog = {}));

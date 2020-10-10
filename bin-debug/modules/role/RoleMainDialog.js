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
    var role;
    (function (role) {
        var RoleMainDialog = (function (_super) {
            __extends(RoleMainDialog, _super);
            function RoleMainDialog() {
                var _this = _super.call(this) || this;
                _this._seleceIndex = -1;
                return _this;
            }
            RoleMainDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._tabBtns = [this.btnEquipt, this.btnShengXing, this.btnJiuXing, this.btnLiuDao];
                this._modules = [];
                this._stack = new eui.ViewStack();
                this._stack.touchEnabled = false;
                this._modules[0] = this._stack.addChild(new dialog.role.equip.RoleEquipt());
                this._modules[1] = this._stack.addChild(new pet.PetUpStars());
                this._modules[2] = this._stack.addChild(new dialog.baowu.BaoWuJiuQu());
                this._modules[3] = this._stack.addChild(new dialog.baowu.BaoWuLiuDao());
                this.addChild(this._stack);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                GameModels.state.registerWarnTarget(GameRedState.ROLE_EQIUP, this.btnEquipt);
                GameModels.state.registerWarnTarget(GameRedState.ROLE_SHENGXING, this.btnShengXing);
                GameModels.state.registerWarnTarget(GameRedState.ROLE_JIUXING, this.btnJiuXing);
                GameModels.state.registerWarnTarget(GameRedState.ROLE_LIUDAO, this.btnLiuDao);
            };
            RoleMainDialog.prototype.destory = function () {
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
            RoleMainDialog.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this._guideData = (data && data.hasOwnProperty("guideData") ? data.guideData : null);
                this._rolePos = (data && data.hasOwnProperty("param") ? data.param : -1);
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                this.btnEquipt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnShengXing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnJiuXing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnLiuDao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                //mg.uiManager.onClosePre(RoleMainDialog, this, this.closePreHandler);
            };
            RoleMainDialog.prototype.exit = function () {
                TypePetPos.role_currPos = 0;
                if (this.equipView.isUpOperation && GameModels.user.player.level > TypeModel.LimitLevel) {
                    var voLJDL = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.cjjl);
                    if (voLJDL && voLJDL.hashNoHaveReward) {
                        mg.uiManager.show(dialog.welfare.WelfareMain, { tabIndex: 1 });
                    }
                }
                var oldIndex = this._stack.selectedIndex;
                this._modules[oldIndex].exit();
                this.btnEquipt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnShengXing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnJiuXing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnLiuDao.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this._seleceIndex = -1;
                //mg.uiManager.offClosePre(RoleMainDialog);
            };
            Object.defineProperty(RoleMainDialog.prototype, "equipView", {
                // //界面面板关闭事件
                // private closePreHandler() {
                // 	var vo: vo.GameHoresVO = GameModels.hores.currVo;
                // 	if (vo && this._seleceIndex == 3 && vo.resetime > 0) {
                // 		mg.alertManager.showAlert(RoleZhanQiWishAlert, false, true, utils.Handler.create(this, this.callfunRefresh))
                // 	} else {
                // 		mg.uiManager.offClosePre(RoleMainDialog);
                // 		mg.uiManager.remove(RoleMainDialog);
                // 	}
                // }
                // public callfunRefresh() {
                // 	mg.uiManager.offClosePre(RoleMainDialog);
                // 	mg.uiManager.remove(RoleMainDialog);
                // }
                get: function () {
                    return this._modules[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RoleMainDialog.prototype, "shengxingView", {
                get: function () {
                    return this._modules[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RoleMainDialog.prototype, "jiuquView", {
                get: function () {
                    return this._modules[2];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RoleMainDialog.prototype, "liudaoView", {
                get: function () {
                    return this._modules[3];
                },
                enumerable: true,
                configurable: true
            });
            RoleMainDialog.prototype.updataChange = function () {
                this.dispatchEventWith(RoleMainDialog.CHANG_TAL);
            };
            RoleMainDialog.prototype.refreshMarkImagesDisplay = function () {
                for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                    var moduleView = _a[_i];
                    moduleView.refreshMarkImagesDisplay();
                }
            };
            RoleMainDialog.prototype.onClose = function (e) {
                mg.uiManager.remove(this);
            };
            RoleMainDialog.prototype.onTabClick = function (e) {
                var index = this._tabBtns.indexOf(e.target);
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            RoleMainDialog.prototype.onSelectChange = function (index) {
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
            Object.defineProperty(RoleMainDialog.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            /**标签改变 */
            RoleMainDialog.CHANG_TAL = "CHANG_TAL";
            return RoleMainDialog;
        }(ui.RoleMainSkin));
        role.RoleMainDialog = RoleMainDialog;
        __reflect(RoleMainDialog.prototype, "dialog.role.RoleMainDialog");
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));

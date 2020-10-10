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
    var dazao;
    (function (dazao) {
        var DaoZaoMainDialog = (function (_super) {
            __extends(DaoZaoMainDialog, _super);
            function DaoZaoMainDialog() {
                var _this = _super.call(this) || this;
                _this._seleceIndex = -1;
                return _this;
            }
            DaoZaoMainDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._tabBtns = [this.btnChengzhuang, this.btnShenbing, this.btnDuanZao];
                this._modules = [];
                this._stack = new eui.ViewStack();
                this._stack.touchEnabled = false;
                this._modules[0] = this._stack.addChild(new dialog.role.chengzhuang.ChengZhuangDialog());
                this._modules[1] = this._stack.addChild(new dialog.smithy.SmithyMainDialog());
                this._modules[2] = this._stack.addChild(new treasure.GodDuanZaoMain());
                this.addChild(this._stack);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                GameModels.state.registerWarnTarget(GameRedState.DAZAO_SHENBING, this.btnShenbing);
                GameModels.state.registerWarnTarget(GameRedState.DAZAO_CHENGZHUANG, this.btnChengzhuang);
                GameModels.state.registerWarnTarget(GameRedState.DAZAO_SHENZHIDUANZAO, this.btnDuanZao);
            };
            DaoZaoMainDialog.prototype.destory = function () {
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
            DaoZaoMainDialog.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this._guideData = (data && data.hasOwnProperty("guideData") ? data.guideData : null);
                this._rolePos = (data && data.hasOwnProperty("param") ? data.param : -1);
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                this.btnChengzhuang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnShenbing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnDuanZao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            };
            DaoZaoMainDialog.prototype.exit = function () {
                var oldIndex = this._stack.selectedIndex;
                this._modules[oldIndex].exit();
                this.btnChengzhuang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnShenbing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnDuanZao.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this._seleceIndex = -1;
                //mg.uiManager.offClosePre(RoleMainDialog);
            };
            Object.defineProperty(DaoZaoMainDialog.prototype, "smithyView", {
                get: function () {
                    return this._modules[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DaoZaoMainDialog.prototype, "chengzhuangView", {
                get: function () {
                    return this._modules[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DaoZaoMainDialog.prototype, "duanZaoView", {
                get: function () {
                    return this._modules[2];
                },
                enumerable: true,
                configurable: true
            });
            DaoZaoMainDialog.prototype.updataChange = function () {
                this.dispatchEventWith(DaoZaoMainDialog.CHANG_TAL);
            };
            DaoZaoMainDialog.prototype.refreshMarkImagesDisplay = function () {
                for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                    var moduleView = _a[_i];
                    moduleView.refreshMarkImagesDisplay();
                }
            };
            DaoZaoMainDialog.prototype.onClose = function (e) {
                mg.uiManager.remove(this);
            };
            DaoZaoMainDialog.prototype.onTabClick = function (e) {
                var index = this._tabBtns.indexOf(e.target);
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            DaoZaoMainDialog.prototype.onSelectChange = function (index) {
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
            Object.defineProperty(DaoZaoMainDialog.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            /**标签改变 */
            DaoZaoMainDialog.CHANG_TAL = "CHANG_TAL";
            return DaoZaoMainDialog;
        }(ui.DaoZaoMainDialogSkin));
        dazao.DaoZaoMainDialog = DaoZaoMainDialog;
        __reflect(DaoZaoMainDialog.prototype, "dialog.dazao.DaoZaoMainDialog");
    })(dazao = dialog.dazao || (dialog.dazao = {}));
})(dialog || (dialog = {}));

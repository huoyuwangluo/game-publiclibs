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
    var topBattle;
    (function (topBattle) {
        var TopBattleMainDialog = (function (_super) {
            __extends(TopBattleMainDialog, _super);
            function TopBattleMainDialog() {
                var _this = _super.call(this) || this;
                _this._seleceIndex = -1;
                return _this;
            }
            TopBattleMainDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._tabBtns = [this.btnBattle, this.btnGuess, this.btnStep, this.btnRank];
                this._modules = [];
                this._stack = new eui.ViewStack();
                this._stack.touchEnabled = false;
                this._modules[0] = this._stack.addChild(new dialog.topBattle.TopBattleMyBattle());
                this._modules[1] = this._stack.addChild(new dialog.topBattle.TopBattleMyGuess());
                this._modules[2] = this._stack.addChild(new dialog.topBattle.TopBattleStepBattle1());
                this._modules[3] = this._stack.addChild(new dialog.topBattle.TopBattleRank());
                this.addChild(this._stack);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                GameModels.state.registerWarnTarget(GameRedState.XIANSHI_DIANFENGSAI_JINGCAI, this.btnGuess);
                GameModels.state.registerWarnTarget(GameRedState.XIANSHI_DIANFENGSAI_MOBAI, this.btnRank);
            };
            // public destory() {
            // 	super.destory();
            // 	this._tabBtns.length = 0;
            // 	for (var moduleView of this._modules) {
            // 		moduleView.destory();
            // 	}
            // 	this._modules.length = 0;
            // 	this._stack.removeChildren();
            // 	this._stack = null;
            // }
            TopBattleMainDialog.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                var battleStep = GameModels.topBattle.battleStep;
                if (battleStep <= 0) {
                    this.btnStep.label = Language.J_HDWKQ;
                }
                else {
                    this.btnStep.label = battleStep > 16 ? Language.getExpression(Language.E_1Q, battleStep) : Language.C_ZJS;
                }
                GameModels.topBattle.initTopBattleInfo(utils.Handler.create(this, function () {
                    this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                }));
                this.btnBattle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnGuess.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnStep.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            };
            TopBattleMainDialog.prototype.exit = function () {
                var oldIndex = this._stack.selectedIndex;
                this._modules[oldIndex].exit();
                this.btnBattle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnGuess.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnStep.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this._seleceIndex = -1;
            };
            TopBattleMainDialog.prototype.onTabClick = function (e) {
                var index = this._tabBtns.indexOf(e.target);
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            TopBattleMainDialog.prototype.onSelectChange = function (index) {
                if (index != this._seleceIndex) {
                    var oldIndex = this._stack.selectedIndex;
                    this._tabBtns[oldIndex].currentState = "up";
                    this._modules[oldIndex].exit();
                    this._seleceIndex = this._stack.selectedIndex = index;
                    this._tabBtns[index].currentState = "down";
                    this._modules[index].enter(null, null);
                }
            };
            Object.defineProperty(TopBattleMainDialog.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            return TopBattleMainDialog;
        }(ui.TopBattleMainDialogSkin));
        topBattle.TopBattleMainDialog = TopBattleMainDialog;
        __reflect(TopBattleMainDialog.prototype, "dialog.topBattle.TopBattleMainDialog");
    })(topBattle = dialog.topBattle || (dialog.topBattle = {}));
})(dialog || (dialog = {}));

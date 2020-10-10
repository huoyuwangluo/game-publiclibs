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
    var baowu;
    (function (baowu) {
        var BaoWuMain = (function (_super) {
            __extends(BaoWuMain, _super);
            function BaoWuMain() {
                var _this = _super.call(this) || this;
                _this._seleceIndex = -1;
                return _this;
            }
            BaoWuMain.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._tabBtns = [this.btnHongYan, this.btnChiBang, this.btnZuoQi, this.btnShenBing];
                this.initStack();
                GameModels.state.registerWarnTarget(GameRedState.BAOWU_ZUOQI, this.btnZuoQi);
                GameModels.state.registerWarnTarget(GameRedState.BAOWU_WING, this.btnChiBang);
                GameModels.state.registerWarnTarget(GameRedState.BAOWU_HONGYAN, this.btnHongYan);
                GameModels.state.registerWarnTarget(GameRedState.BAOWU_SHENBIN, this.btnShenBing);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            BaoWuMain.prototype.initStack = function () {
                this._modules = [];
                this.stack = new eui.ViewStack();
                this.stack.touchEnabled = false;
                this._modules[0] = this.stack.addChild(new achievement.AchievementHongYanDialog());
                this._modules[1] = this.stack.addChild(new dialog.role.wing.RoleWingDialog());
                this._modules[2] = this.stack.addChild(new dialog.zhanqi.RoleZhanQi());
                this._modules[3] = this.stack.addChild(new dialog.role.liLian.RoleShenBing());
                this.addChild(this.stack);
            };
            BaoWuMain.prototype.enter = function (data) {
                mg.soundManager.playViewLongSound("SoundJM_10", "BAOWU");
                this._rolePos = (data && data.hasOwnProperty("param") ? data.param : -1);
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                this.btnZuoQi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnChiBang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnHongYan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnShenBing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            };
            BaoWuMain.prototype.exit = function () {
                this.btnZuoQi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnChiBang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnHongYan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnShenBing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this._seleceIndex = -1;
                for (var i = 0; i < this._modules.length; i++) {
                    this._modules[i].exit();
                }
            };
            BaoWuMain.prototype.onTabClick = function (e) {
                var index = this._tabBtns.indexOf(e.target);
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            Object.defineProperty(BaoWuMain.prototype, "hongYanView", {
                get: function () {
                    return this._modules[0];
                },
                enumerable: true,
                configurable: true
            });
            BaoWuMain.prototype.updataChange = function () {
                this.dispatchEventWith(BaoWuMain.CHANG_TAL);
            };
            BaoWuMain.prototype.onSelectChange = function (index) {
                if (index != this._seleceIndex) {
                    if (TypeFunOpen.checkFuncOpen(this, index, true)) {
                        var oldIndex = this.stack.selectedIndex;
                        this._tabBtns[oldIndex].currentState = "up";
                        this._modules[oldIndex].exit();
                        this._seleceIndex = this.stack.selectedIndex = index;
                        this._tabBtns[index].currentState = "down";
                        this._modules[index].enter(this._rolePos, null);
                        this.updataChange();
                    }
                }
            };
            BaoWuMain.prototype.refreshMarkImagesDisplay = function () {
                for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                    var moduleView = _a[_i];
                    moduleView.refreshMarkImagesDisplay();
                }
            };
            BaoWuMain.prototype.destory = function () {
                for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                    var moduleView = _a[_i];
                    moduleView.destory();
                }
            };
            Object.defineProperty(BaoWuMain.prototype, "selectedIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaoWuMain.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            /**标签改变 */
            BaoWuMain.CHANG_TAL = "CHANG_TAL";
            return BaoWuMain;
        }(ui.BaoWuMainSkin));
        baowu.BaoWuMain = BaoWuMain;
        __reflect(BaoWuMain.prototype, "dialog.baowu.BaoWuMain");
    })(baowu = dialog.baowu || (dialog.baowu = {}));
})(dialog || (dialog = {}));

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
    var activityLimit;
    (function (activityLimit) {
        var sgActivityLimitMainDialog = (function (_super) {
            __extends(sgActivityLimitMainDialog, _super);
            function sgActivityLimitMainDialog() {
                return _super.call(this) || this;
            }
            sgActivityLimitMainDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._selected = -1;
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._curstack = new eui.ViewStack();
                this._curstack.touchEnabled = false;
                this.group.addChild(this._curstack);
            };
            sgActivityLimitMainDialog.prototype.enter = function (data) {
                var _this = this;
                this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
                this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
                this.tabGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                GameModels.sgActivity.requestSGRunningActivitys(utils.Handler.create(this, function () {
                    _this.updateView(data);
                }));
            };
            sgActivityLimitMainDialog.prototype.exit = function () {
                egret.Tween.removeTweens(this.scrollerTab.viewport);
                this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
                this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
                this.tabGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                if (this._curstack.selectedChild)
                    this._curstack.selectedChild.exit();
            };
            sgActivityLimitMainDialog.prototype.updateView = function (data) {
                this.clear();
                var openList = GameModels.sgActivity.limitActListVO;
                this._curtabs = [];
                if (openList.length != 0) {
                    for (var i = 0; i < openList.length; i++) {
                        if (openList[i].actType == game.sgActivityType.act6)
                            continue;
                        var btn = new renderer.ActivityTabButton();
                        btn.actType = openList[i].actType;
                        btn.setImgIcon = game.sgActivityType.getIcon(openList[i].actType);
                        btn.x = i * 121;
                        btn.setLabName = game.sgActivityType.getName(openList[i].actType);
                        this.tabGroup.addChild(btn);
                        this._curtabs.push(btn);
                    }
                }
                egret.Tween.removeTweens(this.scrollerTab.viewport);
                this.scrollerTab.viewport.scrollH = -(this._curtabs.length * 121);
                egret.Tween.get(this.scrollerTab.viewport).to({ scrollH: 0 }, this._curtabs.length * 50, utils.Ease.expoOut);
                if (!this._curviews)
                    this._curviews = [];
                for (var i = 0; i < this._curtabs.length; i++) {
                    if (this._curtabs[i] && this._curtabs[i].actType) {
                        var viewstack = null;
                        if (this._curtabs[i].actType == game.sgActivityType.act1) {
                            viewstack = new view.activity.activityLimitTable1(game.sgActivityType.act1);
                            GameModels.state.registerWarnTarget(GameRedState.LIMIT1_1, utils.Handler.create(this, this.updateRedState, [i], false));
                        }
                        else if (this._curtabs[i].actType == game.sgActivityType.act2) {
                            viewstack = new view.activity.activityLimitTable1(game.sgActivityType.act2);
                            GameModels.state.registerWarnTarget(GameRedState.LIMIT1_2, utils.Handler.create(this, this.updateRedState, [i], false));
                        }
                        else if (this._curtabs[i].actType == game.sgActivityType.act3) {
                            viewstack = new view.activity.activityLimitTable1(game.sgActivityType.act3);
                            GameModels.state.registerWarnTarget(GameRedState.LIMIT1_3, utils.Handler.create(this, this.updateRedState, [i], false));
                        }
                        else if (this._curtabs[i].actType == game.sgActivityType.act4) {
                            viewstack = new view.activity.activityLimitTable3();
                        }
                        else if (this._curtabs[i].actType == game.sgActivityType.act7) {
                            viewstack = new view.activity.activityLimitTable2();
                            GameModels.state.registerWarnTarget(GameRedState.LIMIT1_4, utils.Handler.create(this, this.updateRedState, [i], false));
                        }
                        if (viewstack)
                            this._curviews.push(this._curstack.addChild(viewstack));
                    }
                    if (data && data.hasOwnProperty("tabIndex") && data.tabIndex == this._curtabs[i].actType) {
                        data.tabIndex = i;
                    }
                }
                if (data && data.hasOwnProperty("parms")) {
                    data.parms = data.parms;
                }
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0, data && data.hasOwnProperty("parms") ? data.parms : 0);
            };
            sgActivityLimitMainDialog.prototype.updateRedState = function (index, value) {
                this._curtabs[index].imgRed.visible = value;
            };
            sgActivityLimitMainDialog.prototype.clear = function () {
                if (this._selected != -1) {
                    this._curtabs[this._selected].currentState = "up";
                    this._selected = -1;
                }
                if (this._curtabs)
                    this._curtabs.length = 0;
                if (this._curviews)
                    this._curviews.length = 0;
                this._curstack.selectedIndex = 0;
            };
            sgActivityLimitMainDialog.prototype.onTabClick = function (e) {
                var index = this._curtabs.indexOf(e.target.parent);
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            sgActivityLimitMainDialog.prototype.onSelectChange = function (index, index1) {
                if (index1 === void 0) { index1 = 0; }
                if (this._curstack.selectedChild)
                    this._curstack.selectedChild.exit();
                if (!this._curviews[index])
                    return;
                this._curstack.selectedIndex = index;
                this._curviews[index].enter(index, [index1]);
                if (this._selected != -1) {
                    this._curtabs[this._selected].currentState = "up";
                }
                this._selected = index;
                this._curtabs[index].currentState = "down";
            };
            sgActivityLimitMainDialog.prototype.onLeftClick = function (e) {
                if (this.scrollerTab.viewport.scrollH > 0) {
                    this.scrollerTab.viewport.scrollH = Math.max(0, this.scrollerTab.viewport.scrollH - 121);
                }
            };
            sgActivityLimitMainDialog.prototype.onRightClick = function (e) {
                this.tabGroup.validateNow();
                var width = this.tabGroup.contentWidth - this.scrollerTab.width;
                if (this.scrollerTab.viewport.scrollH < width) {
                    this.scrollerTab.viewport.scrollH = Math.min(width, this.scrollerTab.viewport.scrollH + 121);
                }
            };
            return sgActivityLimitMainDialog;
        }(ui.sgActivitysummerMainDialogSkin));
        activityLimit.sgActivityLimitMainDialog = sgActivityLimitMainDialog;
        __reflect(sgActivityLimitMainDialog.prototype, "dialog.activityLimit.sgActivityLimitMainDialog");
    })(activityLimit = dialog.activityLimit || (dialog.activityLimit = {}));
})(dialog || (dialog = {}));

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
    var activitysummer;
    (function (activitysummer) {
        var sgActivitysummerMainDialog = (function (_super) {
            __extends(sgActivitysummerMainDialog, _super);
            function sgActivitysummerMainDialog() {
                return _super.call(this) || this;
            }
            sgActivitysummerMainDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._selected = -1;
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._curstack = new eui.ViewStack();
                this._curstack.touchEnabled = false;
                this.group.addChild(this._curstack);
            };
            sgActivitysummerMainDialog.prototype.enter = function (data) {
                var _this = this;
                this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
                this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
                this.tabGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                GameModels.activitySummer.requestHolidayRunningActivitys(utils.Handler.create(this, function () {
                    _this.updateView(data);
                }));
            };
            sgActivitysummerMainDialog.prototype.exit = function () {
                egret.Tween.removeTweens(this.scrollerTab.viewport);
                this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
                this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
                this.tabGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                if (this._curstack.selectedChild)
                    this._curstack.selectedChild.exit();
            };
            sgActivitysummerMainDialog.prototype.updateView = function (data) {
                this.clear();
                var openList = GameModels.activitySummer.summerActivityTemplates;
                this._curtabs = [];
                if (openList.length != 0) {
                    for (var i = 0; i < openList.length; i++) {
                        var btn = new renderer.ActivityTabButton();
                        btn.actType = openList[i].type;
                        btn.setImgIcon = game.sgActivitysummerType.getIcon(openList[i].type);
                        btn.x = i * 121;
                        btn.setLabName = game.sgActivitysummerType.getName(openList[i].type);
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
                        if (this._curtabs[i].actType == game.sgActivitysummerType.ljdl) {
                            viewstack = new view.activity.sgLeiJiDengLu();
                            GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_LJDL, utils.Handler.create(this, this.updateRedState, [i], false));
                        }
                        else if (this._curtabs[i].actType == game.sgActivitysummerType.xglb) {
                            viewstack = new view.activity.sgXianGouLiBao();
                        }
                        else if (this._curtabs[i].actType == game.sgActivitysummerType.szkh) {
                            viewstack = new view.activity.ShengZhiTask();
                        }
                        else if (this._curtabs[i].actType == game.sgActivitysummerType.zglb) {
                            viewstack = new view.activity.ZhiGouLiBao();
                            GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_ZGLB, utils.Handler.create(this, this.updateRedState, [i], false));
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
            sgActivitysummerMainDialog.prototype.updateRedState = function (index, value) {
                this._curtabs[index].imgRed.visible = value;
            };
            sgActivitysummerMainDialog.prototype.clear = function () {
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
            sgActivitysummerMainDialog.prototype.onTabClick = function (e) {
                var index = this._curtabs.indexOf(e.target.parent);
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            sgActivitysummerMainDialog.prototype.onSelectChange = function (index, index1) {
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
            sgActivitysummerMainDialog.prototype.onLeftClick = function (e) {
                if (this.scrollerTab.viewport.scrollH > 0) {
                    this.scrollerTab.viewport.scrollH = Math.max(0, this.scrollerTab.viewport.scrollH - 121);
                }
            };
            sgActivitysummerMainDialog.prototype.onRightClick = function (e) {
                this.tabGroup.validateNow();
                var width = this.tabGroup.contentWidth - this.scrollerTab.width;
                if (this.scrollerTab.viewport.scrollH < width) {
                    this.scrollerTab.viewport.scrollH = Math.min(width, this.scrollerTab.viewport.scrollH + 121);
                }
            };
            return sgActivitysummerMainDialog;
        }(ui.sgActivitysummerMainDialogSkin));
        activitysummer.sgActivitysummerMainDialog = sgActivitysummerMainDialog;
        __reflect(sgActivitysummerMainDialog.prototype, "dialog.activitysummer.sgActivitysummerMainDialog");
    })(activitysummer = dialog.activitysummer || (dialog.activitysummer = {}));
})(dialog || (dialog = {}));

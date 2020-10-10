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
    var activity;
    (function (activity) {
        var sgDailyActivityMainDialog = (function (_super) {
            __extends(sgDailyActivityMainDialog, _super);
            function sgDailyActivityMainDialog() {
                return _super.call(this) || this;
            }
            sgDailyActivityMainDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._selected = -1;
                //每日首冲/连充豪礼/豪华奖池/每周特惠/每月特惠/每日累充/周卡/月卡/四季
                this._dailyActList = [
                    game.sgActivityType.mrcz,
                    game.sgActivityType.lchl,
                    game.sgActivityType.haohuajiangchi,
                    game.sgActivityType.mzth,
                    game.sgActivityType.myth,
                    game.sgActivityType.mrlc,
                    game.sgActivityType.zk,
                    game.sgActivityType.monthCard,
                    game.sgActivityType.season
                ];
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._curstack = new eui.ViewStack();
                this._curstack.touchEnabled = false;
                this._scrollerChange = false;
                this.group.addChild(this._curstack);
            };
            sgDailyActivityMainDialog.prototype.enter = function (data) {
                var _this = this;
                this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
                this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
                this.tabGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.scrollerTab.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.scrollerChangeEvent, this);
                GameModels.sgActivity.requestSGRunningActivitys(utils.Handler.create(this, function () {
                    _this.updateView(data);
                }));
            };
            sgDailyActivityMainDialog.prototype.exit = function () {
                egret.Tween.removeTweens(this.scrollerTab.viewport);
                this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
                this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
                this.tabGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.scrollerTab.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.scrollerChangeEvent, this);
                if (this._curstack.selectedChild)
                    this._curstack.selectedChild.exit();
            };
            sgDailyActivityMainDialog.prototype.updateView = function (data) {
                this.clear();
                this.updateRightRedPoint();
                var openList = GameModels.sgActivity.dailyActListVO;
                this._curtabs = [];
                for (var i = 0; i < this._dailyActList.length; i++) {
                    if (this._dailyActList[i] == game.sgActivityType.haohuajiangchi && !GameModels.sgActivity.getDailyActListVOByType(this._dailyActList[i]))
                        continue;
                    if (this._dailyActList[i] == game.sgActivityType.mrcz) {
                        var voMRCZ = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                        if (!voMRCZ)
                            continue;
                        if (voMRCZ && voMRCZ.hashYYQGAndMRCZReceive) {
                            continue;
                        }
                    }
                    var btn = new renderer.ActivityTabButton();
                    btn.actType = this._dailyActList[i];
                    btn.setImgIcon = game.sgActivityType.getIcon(this._dailyActList[i]);
                    btn.x = (this._dailyActList.length + i) * 121;
                    btn.setLabName = game.sgActivityType.getName(this._dailyActList[i]);
                    this.tabGroup.addChild(btn);
                    this._curtabs.push(btn);
                }
                egret.Tween.removeTweens(this.scrollerTab.viewport);
                this.scrollerTab.viewport.scrollH = -(this._curtabs.length * 121);
                egret.Tween.get(this.scrollerTab.viewport).to({ scrollH: 0 }, this._curtabs.length * 50, utils.Ease.expoOut);
                if (!this._curviews)
                    this._curviews = [];
                for (var i = 0; i < this._curtabs.length; i++) {
                    if (this._curtabs[i] && this._curtabs[i].actType) {
                        var viewstack = null;
                        if (this._curtabs[i].actType == game.sgActivityType.lchl) {
                            viewstack = new view.activity.LianChongHaoLi();
                            GameModels.state.registerWarnTarget(GameRedState.DAILY_ACTIVITY_LIANCHONGHAOLI, utils.Handler.create(this, this.updateRedState, [i], false));
                        }
                        if (this._curtabs[i].actType == game.sgActivityType.mzth) {
                            viewstack = new view.activity.MeiZhouTeHui(game.sgActivityType.mzth, game.sgActivityType.mzth_0);
                            GameModels.state.registerWarnTarget(GameRedState.DAILY_ACTIVITY_MEIZHOUTEHUI, utils.Handler.create(this, this.updateRedState, [i], false));
                        }
                        if (this._curtabs[i].actType == game.sgActivityType.myth) {
                            viewstack = new view.activity.MeiZhouTeHui(game.sgActivityType.myth, game.sgActivityType.myth_0);
                            GameModels.state.registerWarnTarget(GameRedState.DAILY_ACTIVITY_MEIYUETEHUI, utils.Handler.create(this, this.updateRedState, [i], false));
                        }
                        if (this._curtabs[i].actType == game.sgActivityType.haohuajiangchi) {
                            viewstack = new view.activity.HaoHuaJiangChi();
                        }
                        if (this._curtabs[i].actType == game.sgActivityType.mrlc) {
                            viewstack = new view.activity.MeiRiLeiChongView();
                            GameModels.state.registerWarnTarget(GameRedState.DAILY_ACTIVITY_MEIRILEICHONG, utils.Handler.create(this, this.updateRedState, [i], false));
                        }
                        else if (this._curtabs[i].actType == game.sgActivityType.zk) {
                            viewstack = new view.activity.zhouKaView();
                            GameModels.state.registerWarnTarget(GameRedState.DAILY_ACTIVITY_ZHOUKA, utils.Handler.create(this, this.updateRedState, [i], false));
                        }
                        else if (this._curtabs[i].actType == game.sgActivityType.mrcz) {
                            viewstack = new view.activity.meiriChongZhiView();
                            GameModels.state.registerWarnTarget(GameRedState.DAILY_ACTIVITY_MEIRICHONGZHI, utils.Handler.create(this, this.updateRedState, [i], false));
                        }
                        else if (this._curtabs[i].actType == game.sgActivityType.season) {
                            viewstack = new view.activity.season();
                        }
                        else if (this._curtabs[i].actType == game.sgActivityType.monthCard) {
                            viewstack = new dialog.vip.PrivilegeDialog();
                            GameModels.state.registerWarnTarget(GameRedState.MONTHCARD, utils.Handler.create(this, this.updateRedState, [i], false));
                        }
                        else {
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
            sgDailyActivityMainDialog.prototype.updateRedState = function (index, value) {
                this._curtabs[index].imgRed.visible = value;
            };
            sgDailyActivityMainDialog.prototype.clear = function () {
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
            sgDailyActivityMainDialog.prototype.onTabClick = function (e) {
                var index = this._curtabs.indexOf(e.target.parent);
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            sgDailyActivityMainDialog.prototype.onSelectChange = function (index, index1) {
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
            sgDailyActivityMainDialog.prototype.onLeftClick = function (e) {
                if (this.scrollerTab.viewport.scrollH > 0) {
                    this.scrollerTab.viewport.scrollH = Math.max(0, this.scrollerTab.viewport.scrollH - 121);
                }
            };
            sgDailyActivityMainDialog.prototype.onRightClick = function (e) {
                this._scrollerChange = true;
                this.updateRightRedPoint();
                this.tabGroup.validateNow();
                var width = this.tabGroup.contentWidth - this.scrollerTab.width;
                if (this.scrollerTab.viewport.scrollH < width) {
                    this.scrollerTab.viewport.scrollH = Math.min(width, this.scrollerTab.viewport.scrollH + 121);
                }
            };
            sgDailyActivityMainDialog.prototype.scrollerChangeEvent = function (e) {
                this._scrollerChange = true;
                this.updateRightRedPoint();
            };
            sgDailyActivityMainDialog.prototype.updateRightRedPoint = function () {
                var hashRedPoint = GameModels.common && GameModels.common.checkActivityEndRedPoint();
                if (hashRedPoint && !this._scrollerChange) {
                    this.imgRedPoint.visible = true;
                }
                else {
                    this.imgRedPoint.visible = false;
                }
            };
            return sgDailyActivityMainDialog;
        }(ui.sgDailyActivityMainDialogSkin));
        activity.sgDailyActivityMainDialog = sgDailyActivityMainDialog;
        __reflect(sgDailyActivityMainDialog.prototype, "dialog.activity.sgDailyActivityMainDialog");
    })(activity = dialog.activity || (dialog.activity = {}));
})(dialog || (dialog = {}));

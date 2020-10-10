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
var view;
(function (view) {
    var activity;
    (function (activity) {
        var RenYiChongZhi = (function (_super) {
            __extends(RenYiChongZhi, _super);
            function RenYiChongZhi() {
                return _super.call(this) || this;
            }
            RenYiChongZhi.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.touchEnabled = false;
                this._rwards = [this.reward0, this.reward1, this.reward2, this.reward3, this.reward4, this.reward5];
            };
            RenYiChongZhi.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.RYCZ);
                if (temp) {
                    this._time = GameModels.activitySummer.getSummerActivityListTiem(temp.id) - GameModels.timer.getTimer() / 1000;
                    if (this._time > 0) {
                        this.labDate.text = utils.DateUtil.formatTimeLeft(this._time);
                        utils.timer.countdown(this._time, this, this.updateLableTime, this.finshTime);
                    }
                }
                GameModels.activitySummer.requestRewardInfosData(game.TypeSummerActivity.RYCZ, utils.Handler.create(this, function () {
                    _this.showView();
                }));
                this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetClick, this);
            };
            RenYiChongZhi.prototype.exit = function () {
                utils.timer.clearAll(this);
                this.btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetClick, this);
                for (var _i = 0, _a = this._rwards; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    reward.dataSource = null;
                }
            };
            RenYiChongZhi.prototype.updateLableTime = function () {
                this._time--;
                this.labDate.text = utils.DateUtil.formatTimeLeft(this._time);
            };
            RenYiChongZhi.prototype.finshTime = function () {
                utils.timer.clearAll(this);
                this._time = 0;
                this.labDate.text = Language.J_HDYJJS;
            };
            RenYiChongZhi.prototype.onGetClick = function (e) {
                if (!GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.RYCZ)) {
                    mg.alertManager.tip(Language.J_HDYJJS);
                    return;
                }
                if (GameModels.activitySummer.renYiChongZhiData.length > 0) {
                    var data = GameModels.activitySummer.renYiChongZhiData[0];
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    if (data.holidayRewardState == 1) {
                        GameModels.activitySummer.requestGetRewardInfos(data.holidayRewardId, game.TypeSummerActivity.RYCZ, utils.Handler.create(this, this.getRewardCallback, [e.target.parent.localToGlobal(240, 220)]));
                    }
                    if (data.holidayRewardState == 2) {
                        GameModels.recharge.openRechargeDialog();
                    }
                }
            };
            RenYiChongZhi.prototype.getRewardCallback = function (fromPoint) {
                this.showView();
                var rewardArr = GameModels.activitySummer.renYiChongZhiData[0].template.rewards.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
            };
            RenYiChongZhi.prototype.showView = function () {
                this.btnGet.touchEnabled = true;
                this.btnGet.filters = null;
                if (GameModels.activitySummer.renYiChongZhiData.length > 0) {
                    var data = GameModels.activitySummer.renYiChongZhiData[0];
                    var rewards = data.template.rewards.split(";");
                    for (var i = 0; i < this._rwards.length; i++) {
                        var iconBox = this._rwards[i];
                        iconBox.labName.stroke = 1;
                        if (i < rewards.length) {
                            iconBox.dataSource = rewards[i];
                            this.boxGroup.addChild(iconBox);
                        }
                        else {
                            if (iconBox.parent) {
                                iconBox.parent.removeChild(iconBox);
                            }
                        }
                    }
                    if (data.holidayRewardState == 1) {
                        this.btnGet.label = Language.C_KLQ;
                    }
                    else if (data.holidayRewardState == 2) {
                        this.btnGet.touchEnabled = true;
                        this.btnGet.filters = null;
                        this.btnGet.label = Language.C_QCZ;
                    }
                    else {
                        this.btnGet.touchEnabled = false;
                        this.btnGet.filters = utils.filterUtil.grayFilters;
                        this.btnGet.label = Language.C_YLQ;
                    }
                }
            };
            return RenYiChongZhi;
        }(ui.RenYiChongZhiSkin));
        activity.RenYiChongZhi = RenYiChongZhi;
        __reflect(RenYiChongZhi.prototype, "view.activity.RenYiChongZhi", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

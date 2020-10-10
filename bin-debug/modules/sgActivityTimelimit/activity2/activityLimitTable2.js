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
        var activityLimitTable2 = (function (_super) {
            __extends(activityLimitTable2, _super);
            function activityLimitTable2() {
                return _super.call(this) || this;
            }
            activityLimitTable2.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            activityLimitTable2.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                GameModels.sgActivity.setIsopen();
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act7);
                this.labTime.text = utils.DateUtil.formatDateInChinese(new Date(vo.endTime * 1000), false);
                var vo1 = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act6);
                var voList = [];
                if (vo1.actRewardListVOStorState[0].getTimes > 0) {
                    voList = vo.actRewardListVOStorState.concat(vo1.actRewardListVOStorState);
                }
                else {
                    voList = vo1.actRewardListVOStorState.concat(vo.actRewardListVOStorState);
                }
                if (voList) {
                    if (!this._listData) {
                        this._listData = new eui.ArrayCollection(voList);
                    }
                    else {
                        this._listData.source = voList;
                    }
                }
                else {
                    if (!this._listData) {
                        this._listData = new eui.ArrayCollection([]);
                    }
                    else {
                        this._listData.source = [];
                    }
                }
                this.list.dataProvider = this._listData;
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            activityLimitTable2.prototype.exit = function () {
                this.clearList(this.list);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            activityLimitTable2.prototype.showView = function () {
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act7);
                var vo1 = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act6);
                var voList = [];
                if (vo1.actRewardListVOStorState[0].getTimes > 0) {
                    voList = vo.actRewardListVOStorState.concat(vo1.actRewardListVOStorState);
                }
                else {
                    voList = vo1.actRewardListVOStorState.concat(vo.actRewardListVOStorState);
                }
                if (this._listData)
                    this._listData.replaceAll(voList);
                var list = vo.actRewardListVOStorState;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] && list[i].state == 0) {
                        this.scroller.viewport.scrollV = 0;
                        break;
                    }
                }
            };
            activityLimitTable2.prototype.onBuyClick = function (e) {
                var item = this.list.selectedItem;
                if (item.otherRewards) {
                    var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act7);
                    var count = vo.buyCountByValueStr(item.rewardCfgId.toString());
                    if (e.target instanceof components.IconButton) {
                        if (item.rechargeParams > count) {
                            GameModels.platform.buy(item.rmb, 1, "" + item.template.id, item.template.name, item.template.des);
                        }
                        else {
                            if (utils.CheckUtil.checkBagSmelting())
                                return;
                            if (item.getTimes < count) {
                                GameModels.sgActivity.requestSGGetActivityReward(vo.actCfgId, item.rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [item.otherRewards ? item.otherRewards : item.templateRewards]));
                            }
                        }
                    }
                }
                else {
                    if (e.target instanceof components.IconButton) {
                        if (utils.CheckUtil.checkBagSmelting())
                            return;
                        var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act6);
                        GameModels.sgActivity.requestSGGetActivityReward(vo.actCfgId, item.rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [item.otherRewards ? item.otherRewards : item.templateRewards]));
                    }
                }
            };
            activityLimitTable2.prototype.getRewardCallback = function (str) {
                this.showView();
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            return activityLimitTable2;
        }(ui.activityLimitTable2Skin));
        activity.activityLimitTable2 = activityLimitTable2;
        __reflect(activityLimitTable2.prototype, "view.activity.activityLimitTable2", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

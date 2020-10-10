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
        /**game.sgActivityType.mzth  game.sgActivityType.myth*/
        var MeiZhouTeHui = (function (_super) {
            __extends(MeiZhouTeHui, _super);
            function MeiZhouTeHui(type, type0) {
                var _this = _super.call(this) || this;
                _this._type = type;
                _this._type0 = type0;
                return _this;
            }
            MeiZhouTeHui.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            MeiZhouTeHui.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                var dayLongTime = 24 * 60 * 60 * 1000;
                var num = dayLongTime - GameModels.timer.getPastSecond() * 1000;
                var currTime = GameModels.timer.getTimer();
                var oDate = new Date(currTime);
                var oYear = oDate.getFullYear();
                var oMonth = oDate.getMonth() + 1;
                var oWeek = oDate.getDay();
                //logger.log("现在的时间戳：" + currTime);
                var lastMonthDay = new Date([oYear, oMonth + 1, 1].join("-")).getTime();
                //logger.log("月末的时间戳：", lastMonthDay);
                var lastWeekDay = oDate.getTime() + (7 - oWeek) * dayLongTime + num;
                //logger.log("周末的时间戳：", lastWeekDay);
                var count = this._type == game.sgActivityType.mzth ? lastWeekDay - currTime : lastMonthDay - currTime;
                this.labTime.text = utils.DateUtil.formatTimeLeftInChinese(count / 1000, true, true, true, false);
                this.labDes.text = this._type == game.sgActivityType.mzth ? Language.C_MZYSX : Language.C_MYYSX;
                this.imgBg.source = this._type == game.sgActivityType.mzth ? "img_meizhoutehui_bg2_jpg" : "img_meizhoutehui_bg1_jpg";
                var vo = GameModels.sgActivity.getSgActivityListVOByType(this._type);
                var vo1 = GameModels.sgActivity.getSgActivityListVOByType(this._type0);
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
            MeiZhouTeHui.prototype.exit = function () {
                this.clearList(this.list);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            MeiZhouTeHui.prototype.onBuyClick = function (e) {
                var item = this.list.selectedItem;
                if (item.otherRewards) {
                    var vo = GameModels.sgActivity.getSgActivityListVOByType(this._type);
                    var count = vo.buyCountByValueStr(item.rewardCfgId.toString());
                    if (e.target instanceof components.IconButton) {
                        if (item.rechargeParams > count) {
                            GameModels.platform.buy(item.rmb, 1, "" + item.template.id, item.template.name, item.template.des);
                        }
                        return;
                    }
                    if (e.target instanceof components.SnapButton) {
                        if (utils.CheckUtil.checkBagSmelting())
                            return;
                        if (item.getTimes < count) {
                            GameModels.sgActivity.requestSGGetActivityReward(vo.actCfgId, item.rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [item.otherRewards]));
                        }
                    }
                }
                else {
                    if (e.target instanceof components.IconButton) {
                        if (utils.CheckUtil.checkBagSmelting())
                            return;
                        var vo = GameModels.sgActivity.getSgActivityListVOByType(this._type0);
                        GameModels.sgActivity.requestSGGetActivityReward(vo.actCfgId, item.rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [item.templateRewards]));
                    }
                }
            };
            MeiZhouTeHui.prototype.getRewardCallback = function (rewardStr) {
                if (rewardStr === void 0) { rewardStr = ""; }
                var rewards = rewardStr.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                this.showView();
            };
            MeiZhouTeHui.prototype.showView = function () {
                var vo = GameModels.sgActivity.getSgActivityListVOByType(this._type);
                var vo1 = GameModels.sgActivity.getSgActivityListVOByType(this._type0);
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
            return MeiZhouTeHui;
        }(ui.MeiZhouTeHuiSkin));
        activity.MeiZhouTeHui = MeiZhouTeHui;
        __reflect(MeiZhouTeHui.prototype, "view.activity.MeiZhouTeHui", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

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
    var legion;
    (function (legion) {
        var LegionTeHui = (function (_super) {
            __extends(LegionTeHui, _super);
            function LegionTeHui() {
                return _super.call(this) || this;
            }
            LegionTeHui.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            LegionTeHui.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                GameModels.legion.isOpenBuyView = true;
                this._ybvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.zyyb);
                this._rmbvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.zyth);
                if (!this._ybvo || !this._rmbvo)
                    return;
                var voList = [];
                if (this._ybvo.actRewardListVOStorState[0].getTimes > 0) {
                    voList = this._rmbvo.actRewardListVOStorState.concat(this._ybvo.actRewardListVOStorState);
                }
                else {
                    voList = this._ybvo.actRewardListVOStorState.concat(this._rmbvo.actRewardListVOStorState);
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
                this._lastTime = 0;
                var day = GameModels.serverTime.kaifuDay % this._rmbvo.actSetTemp.expand;
                if (day <= 0)
                    day = 3;
                var openTimeStr = utils.DateUtil.formatDateFromSecondsInChinese((GameModels.timer.getTimer() + (this._rmbvo.actSetTemp.expand - day) * 86400000) / 1000, true);
                var str = openTimeStr.substring(5, openTimeStr.length);
                this.labTime.text = Language.getExpression(Language.E_1HCZXG, str);
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.updateRedpoint, this);
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.imgGoFuLi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            };
            LegionTeHui.prototype.timerHandler = function () {
                this._lastTime--;
                if (this._lastTime <= 0) {
                    this._lastTime = 0;
                    utils.timer.clear(this, this.timerHandler);
                    this.labTime.text = "";
                    return;
                }
                this.labTime.text = utils.DateUtil.formatTimeLeft(this._lastTime);
            };
            LegionTeHui.prototype.exit = function () {
                this._ybvo = null;
                this._rmbvo = null;
                this.clearList(this.list);
                utils.timer.clear(this, this.timerHandler);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.updateRedpoint, this);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.imgGoFuLi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            };
            LegionTeHui.prototype.onBtnClick = function (e) {
                mg.uiManager.show(dialog.legion.LegionTeHuiMain, { tabIndex: 1 });
            };
            LegionTeHui.prototype.onBuyClick = function (e) {
                if (e.target instanceof components.IconButton) {
                    var item = this.list.selectedItem;
                    var id = 0;
                    if (item.otherRewards) {
                        id = this._rmbvo.actCfgId;
                        if (item.hashMyValueStr(item.rewardCfgId.toString())) {
                            if (item.getTimes <= 0) {
                                if (utils.CheckUtil.checkBagSmelting())
                                    return;
                                GameModels.sgActivity.requestSGGetActivityReward(id, item.rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [e.target.parent.localToGlobal(45, 45)]));
                            }
                        }
                        else {
                            GameModels.platform.buy(item.rmb, 1, "" + item.template.id, item.template.name, item.template.des);
                        }
                    }
                    else {
                        id = this._ybvo.actCfgId;
                        if (item.getTimes <= 0) {
                            if (utils.CheckUtil.checkBagSmelting())
                                return;
                            GameModels.sgActivity.requestSGGetActivityReward(id, item.rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [item.otherRewards ? item.otherRewards : item.templateRewards]));
                        }
                    }
                }
            };
            LegionTeHui.prototype.getRewardCallback = function (str) {
                this.showView();
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            LegionTeHui.prototype.showView = function () {
                var voList = [];
                if (this._ybvo.actRewardListVOStorState[0].getTimes > 0) {
                    voList = this._rmbvo.actRewardListVOStorState.concat(this._ybvo.actRewardListVOStorState);
                }
                else {
                    voList = this._ybvo.actRewardListVOStorState.concat(this._rmbvo.actRewardListVOStorState);
                }
                if (this._listData)
                    this._listData.replaceAll(voList);
            };
            LegionTeHui.prototype.updateRedpoint = function () {
                GameModels.legion.getLegionRedBagInfo(utils.Handler.create(this, function () { }));
            };
            return LegionTeHui;
        }(ui.LegionTeHuiSkin));
        legion.LegionTeHui = LegionTeHui;
        __reflect(LegionTeHui.prototype, "dialog.legion.LegionTeHui");
    })(legion = dialog.legion || (dialog.legion = {}));
})(dialog || (dialog = {}));

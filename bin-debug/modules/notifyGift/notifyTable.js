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
    var gift;
    (function (gift) {
        var notifyTable = (function (_super) {
            __extends(notifyTable, _super);
            function notifyTable(data) {
                var _this = _super.call(this) || this;
                _this._notifyData = data;
                return _this;
            }
            notifyTable.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._rwards = [this.reward4, this.reward0, this.reward1, this.reward2];
            };
            notifyTable.prototype.enter = function () {
                this.labTime.text = "";
                if (this._notifyData.leftTime > 0) {
                    this._time = this._notifyData.leftTime;
                    utils.timer.clear(this, this.timerHandler);
                    this.labTime.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_LBSYSJ, utils.DateUtil.formatTimeLeft(this._time)));
                    utils.timer.loop(1000, this, this.timerHandler);
                }
                this.imgBg.source = this._notifyData.temp.giftType == 1 ? "img_notifty_bg1_png" : "img_notifty_bg_png";
                this.btnChongZhi.source = "btnMoney_json.btn_sg_chongzhi_" + this._notifyData.rechargeTemp.RMB;
                this.labName.text = this._notifyData.temp.name;
                var rewards = this._notifyData.rechargeTemp.otherRewards.split(";");
                for (var i = 0; i < 4; i++) {
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
                this.showBtnState();
                this.btnChongZhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                GameModels.notifyGift.addEventListener(mo.ModelNotifyGift.CHANGE_GIFT_INFO, this.showBtnState, this);
            };
            notifyTable.prototype.exit = function () {
                utils.timer.clear(this);
                this.btnChongZhi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                GameModels.notifyGift.removeEventListener(mo.ModelNotifyGift.CHANGE_GIFT_INFO, this.showBtnState, this);
            };
            notifyTable.prototype.onBuyClick = function (e) {
                if (e.currentTarget == this.btnChongZhi) {
                    GameModels.platform.buy(this._notifyData.rechargeTemp.RMB, 1, "" + this._notifyData.rechargeTemp.id, this._notifyData.rechargeTemp.name, this._notifyData.rechargeTemp.des);
                }
                else {
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    GameModels.notifyGift.requestGetGiftReward(this._notifyData.refId, utils.Handler.create(this, this.getRewardCallback, [this._notifyData.rechargeTemp.otherRewards]));
                }
            };
            notifyTable.prototype.getRewardCallback = function (str) {
                this.showBtnState();
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            notifyTable.prototype.showBtnState = function () {
                this.imgBuyFinsh.visible = false;
                this.btnGet.visible = false;
                this.btnChongZhi.visible = false;
                if (this._notifyData.isRecharge) {
                    if (this._notifyData.isGotReward) {
                        this.imgBuyFinsh.visible = true;
                    }
                    else {
                        this.btnGet.visible = true;
                    }
                }
                else {
                    this.btnChongZhi.visible = true;
                }
            };
            notifyTable.prototype.timerHandler = function () {
                this._time--;
                if (this._time <= 0) {
                    this._time = 0;
                    this.labTime.text = "";
                    utils.timer.clear(this, this.timerHandler);
                    return;
                }
                this.labTime.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_LBSYSJ, utils.DateUtil.formatTimeLeft(this._time)));
            };
            return notifyTable;
        }(ui.notifyTableSkin));
        gift.notifyTable = notifyTable;
        __reflect(notifyTable.prototype, "view.gift.notifyTable", ["IModuleView", "egret.DisplayObject"]);
    })(gift = view.gift || (view.gift = {}));
})(view || (view = {}));

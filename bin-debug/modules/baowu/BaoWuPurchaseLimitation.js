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
        var BaoWuPurchaseLimitation = (function (_super) {
            __extends(BaoWuPurchaseLimitation, _super);
            function BaoWuPurchaseLimitation() {
                return _super.call(this) || this;
            }
            BaoWuPurchaseLimitation.prototype.show = function (type) {
                this._ybvo = null;
                this._rmbvo = null;
                this.imgType.source = "img_xianGou_" + type + "_jpg";
                this._type = type;
                switch (type) {
                    case 1://九星限购
                        this._ybvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.jxyb);
                        this._rmbvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.jxrmb);
                        break;
                    case 2://六道限购
                        this._ybvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.ldyb);
                        this._rmbvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.ldrmb);
                        break;
                    case 3://万将归心限购
                        this._ybvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.wjgxyb);
                        this._rmbvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.wjgxrmb);
                        break;
                    case 4://退星限购
                        this._ybvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.txyb);
                        this._rmbvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.txrmb);
                        break;
                    case 5://神兵限购
                        this._rmbvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.sbrmb);
                        break;
                    case 6://宠物限购
                        this._ybvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.cwyb);
                        this._rmbvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.cwrmb);
                        break;
                }
                var openTimeStr = "";
                if (type != 5) {
                    var voList = this._ybvo.actRewardListVO.concat(this._rmbvo.actRewardListVO);
                    openTimeStr = utils.DateUtil.formatDateFromSecondsInChinese(this._ybvo.endTime, true);
                }
                else {
                    var voList = this._rmbvo.actRewardListVO;
                    openTimeStr = utils.DateUtil.formatDateFromSecondsInChinese(this._rmbvo.endTime, true);
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
                    this._listData.source = [];
                }
                this.list.dataProvider = this._listData;
                var str = openTimeStr.substring(5, openTimeStr.length);
                this.labTime.text = Language.getExpression(Language.E_1HCZXG, str);
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
            };
            BaoWuPurchaseLimitation.prototype.onBuyClick = function (e) {
                var item = this.list.selectedItem;
                var id = 0;
                if (item.otherRewards) {
                    id = this._rmbvo.actCfgId;
                    var count = item.buyCountByValueStr(item.rewardCfgId.toString());
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
                            GameModels.sgActivity.requestSGGetActivityReward(id, item.rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [e.target.parent.localToGlobal(45, 45)]));
                        }
                    }
                }
                else {
                    if (e.target instanceof components.IconButton) {
                        id = this._ybvo.actCfgId;
                        if (item.getTimes <= 0) {
                            if (utils.CheckUtil.checkBagSmelting())
                                return;
                            GameModels.sgActivity.requestSGGetActivityReward(id, item.rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [item.otherRewards ? item.otherRewards : item.templateRewards]));
                        }
                    }
                }
            };
            BaoWuPurchaseLimitation.prototype.getRewardCallback = function (str) {
                this.showView();
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            BaoWuPurchaseLimitation.prototype.showView = function () {
                if (this._type != 5) {
                    var voList = this._ybvo.actRewardListVO.concat(this._rmbvo.actRewardListVO);
                }
                else {
                    var voList = this._rmbvo.actRewardListVO;
                }
                if (this._listData)
                    this._listData.replaceAll(voList);
            };
            BaoWuPurchaseLimitation.prototype.clickHandler = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            BaoWuPurchaseLimitation.prototype.hide = function () {
                this._ybvo = null;
                this._rmbvo = null;
                this._type = 0;
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return BaoWuPurchaseLimitation;
        }(ui.BaoWuPurchaseLimitationSkin));
        baowu.BaoWuPurchaseLimitation = BaoWuPurchaseLimitation;
        __reflect(BaoWuPurchaseLimitation.prototype, "dialog.baowu.BaoWuPurchaseLimitation", ["IAlert", "egret.DisplayObject"]);
    })(baowu = dialog.baowu || (dialog.baowu = {}));
})(dialog || (dialog = {}));

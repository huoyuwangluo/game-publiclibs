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
        /**game.sgActivityType.mrlc*/
        var MeiRiLeiChongView = (function (_super) {
            __extends(MeiRiLeiChongView, _super);
            function MeiRiLeiChongView() {
                return _super.call(this) || this;
            }
            MeiRiLeiChongView.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            MeiRiLeiChongView.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrlc);
                var lastMs = GameModels.sgActivity.getLastDateSec(vo.actCfgId) * 0.001 >> 0;
                this.labTime.text = Language.getExpression(Language.E_1HJS, utils.DateUtil.formatTimeLeftInChinese(lastMs));
                this.labCount0.text = Language.getExpression(Language.E_1MS, vo.myValue);
                var voList = vo.actRewardListVOStorState;
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
                this.btnChongZhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLinkClick, this);
            };
            MeiRiLeiChongView.prototype.exit = function () {
                this.clearList(this.list);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnChongZhi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLinkClick, this);
            };
            MeiRiLeiChongView.prototype.onBuyClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (e.target instanceof components.SnapButton) {
                    var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrlc);
                    var item = this.list.selectedItem;
                    GameModels.sgActivity.requestSGGetActivityReward(vo.actCfgId, item.rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [item.templateRewards]));
                }
            };
            MeiRiLeiChongView.prototype.getRewardCallback = function (str) {
                this.showView();
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            MeiRiLeiChongView.prototype.onLinkClick = function (e) {
                mg.uiManager.remove(s.UserfaceName.sgDaily);
                GameModels.recharge.openRechargeDialog();
            };
            MeiRiLeiChongView.prototype.showView = function () {
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrlc);
                this.labCount0.text = Language.getExpression(Language.E_1MS, vo.myValue);
                if (this._listData)
                    this._listData.replaceAll(vo.actRewardListVOStorState);
            };
            return MeiRiLeiChongView;
        }(ui.MeiRiLeiChongSkin));
        activity.MeiRiLeiChongView = MeiRiLeiChongView;
        __reflect(MeiRiLeiChongView.prototype, "view.activity.MeiRiLeiChongView", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

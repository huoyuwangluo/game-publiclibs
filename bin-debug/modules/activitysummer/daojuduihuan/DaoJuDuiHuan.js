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
        var DaoJuDuiHuan = (function (_super) {
            __extends(DaoJuDuiHuan, _super);
            function DaoJuDuiHuan() {
                return _super.call(this) || this;
            }
            DaoJuDuiHuan.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            DaoJuDuiHuan.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.DJDH);
                if (temp) {
                    this.labDesc.text = temp.des;
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                this.showItemCount();
                this.listReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                GameModels.activitySummer.requestExchangeShopData(15, utils.Handler.create(this, function () {
                    if (!_this._listData) {
                        _this._listData = new eui.ArrayCollection(GameModels.activitySummer.exchangeshopData);
                    }
                    else {
                        _this._listData.source = GameModels.activitySummer.exchangeshopData;
                    }
                    _this.listReward.dataProvider = _this._listData;
                }));
            };
            DaoJuDuiHuan.prototype.exit = function () {
                this.clearList(this.listReward);
                this.listReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            DaoJuDuiHuan.prototype.showItemCount = function () {
                this.labCount1.text = "" + GameModels.bag.getItemCountById(ConfigData.ITEM_GUOQING_MO);
                this.labCount2.text = "" + GameModels.bag.getItemCountById(ConfigData.ITEM_GUOQING_YU);
                this.labCount3.text = "" + GameModels.bag.getItemCountById(ConfigData.ITEM_GUOQING_XI);
                this.labCount4.text = "" + GameModels.bag.getItemCountById(ConfigData.ITEM_GUOQING_YING);
                this.labCount5.text = "" + GameModels.bag.getItemCountById(ConfigData.ITEM_GUOQING_GUO);
                this.labCount6.text = "" + GameModels.bag.getItemCountById(ConfigData.ITEM_GUOQING_QING);
            };
            DaoJuDuiHuan.prototype.onBuyClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (e.target instanceof components.SnapButton) {
                    var vo = this.listReward.selectedItem;
                    GameModels.activitySummer.exchangeShopDataCall(vo.shopid.toString(), 1, vo.type, utils.Handler.create(this, this.getRewardCallback, [vo.shoptemplate.reward]));
                }
            };
            DaoJuDuiHuan.prototype.getRewardCallback = function (str) {
                this.showItemCount();
                this.listReward.dataProvider.replaceAll(GameModels.activitySummer.exchangeshopData);
                var rewardArr = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
            };
            return DaoJuDuiHuan;
        }(ui.DaoJuDuiHuanSkin));
        activity.DaoJuDuiHuan = DaoJuDuiHuan;
        __reflect(DaoJuDuiHuan.prototype, "view.activity.DaoJuDuiHuan", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

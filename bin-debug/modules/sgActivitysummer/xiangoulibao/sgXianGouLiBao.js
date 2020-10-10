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
        var sgXianGouLiBao = (function (_super) {
            __extends(sgXianGouLiBao, _super);
            function sgXianGouLiBao() {
                return _super.call(this) || this;
            }
            sgXianGouLiBao.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            sgXianGouLiBao.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.sgActivitysummerType.xglb);
                if (temp) {
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                this.listReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                GameModels.activitySummer.requestXianGouInfosData(utils.Handler.create(this, function () {
                    if (!_this._listData) {
                        _this._listData = new eui.ArrayCollection(GameModels.activitySummer.xianGouData);
                    }
                    else {
                        _this._listData.source = GameModels.activitySummer.xianGouData;
                    }
                    _this.listReward.dataProvider = _this._listData;
                }));
            };
            sgXianGouLiBao.prototype.exit = function () {
                this.clearList(this.listReward);
                this.listReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            sgXianGouLiBao.prototype.onBuyClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (e.target instanceof components.SnapButton) {
                    var item_1 = this.listReward.selectedItem;
                    //logger.log(item.holidayBuyId);
                    GameModels.activitySummer.requestBuyXianGou(item_1.holidayBuyId, utils.Handler.create(this, this.getRewardCallback, [item_1.template.rewards]));
                }
            };
            sgXianGouLiBao.prototype.getRewardCallback = function (str) {
                this.listReward.dataProvider.replaceAll(GameModels.activitySummer.xianGouData);
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            return sgXianGouLiBao;
        }(ui.sgXianGouLiBaoSkin));
        activity.sgXianGouLiBao = sgXianGouLiBao;
        __reflect(sgXianGouLiBao.prototype, "view.activity.sgXianGouLiBao", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

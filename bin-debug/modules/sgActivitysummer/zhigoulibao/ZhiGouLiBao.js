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
        var ZhiGouLiBao = (function (_super) {
            __extends(ZhiGouLiBao, _super);
            function ZhiGouLiBao() {
                return _super.call(this) || this;
            }
            ZhiGouLiBao.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            ZhiGouLiBao.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.sgActivitysummerType.zglb);
                if (temp) {
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                GameModels.activitySummer.requestZhiGouInfosData(utils.Handler.create(this, function () {
                    if (!_this._listData) {
                        _this._listData = new eui.ArrayCollection(GameModels.activitySummer.zhigouGotRewardData);
                    }
                    else {
                        _this._listData.source = GameModels.activitySummer.zhigouGotRewardData;
                    }
                    _this.list.dataProvider = _this._listData;
                }));
                GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.UPDATA_ZHIGOU_LIBAO, this.showView, this);
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            ZhiGouLiBao.prototype.exit = function () {
                this.clearList(this.list);
                GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.UPDATA_ZHIGOU_LIBAO, this.showView, this);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            ZhiGouLiBao.prototype.onBuyClick = function (e) {
                var item = this.list.selectedItem;
                var temp = Templates.getTemplateByProperty(templates.Map.HOLIDAYRECHARGE, "rechargeId", item.key);
                var tempRechatge = Templates.getTemplateById(templates.Map.GAMERECHARGE, item.key);
                var buyCount = GameModels.activitySummer.getZhigouRechargeData(item.key);
                var getCount = GameModels.activitySummer.getZhigouGotRewardData(item.key);
                if (e.target instanceof components.IconButton) {
                    if (temp.buyTimes > buyCount) {
                        GameModels.platform.buy(tempRechatge.RMB, 1, "" + tempRechatge.id, tempRechatge.name, tempRechatge.des);
                        this.scroller.viewport.scrollV = 0;
                    }
                    return;
                }
                if (e.target instanceof components.SnapButton) {
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    if (getCount < temp.buyTimes) {
                        GameModels.activitySummer.requestBuyZhiGou(item.key, utils.Handler.create(this, this.getRewardCallback, [temp.rewards]));
                    }
                }
            };
            ZhiGouLiBao.prototype.getRewardCallback = function (str) {
                this.showView();
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            ZhiGouLiBao.prototype.showView = function () {
                if (this._listData)
                    this._listData.replaceAll(GameModels.activitySummer.zhigouGotRewardData);
            };
            return ZhiGouLiBao;
        }(ui.ZhiGouLiBaoSkin));
        activity.ZhiGouLiBao = ZhiGouLiBao;
        __reflect(ZhiGouLiBao.prototype, "view.activity.ZhiGouLiBao", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

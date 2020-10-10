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
        var sgLeiJiDengLu = (function (_super) {
            __extends(sgLeiJiDengLu, _super);
            function sgLeiJiDengLu() {
                return _super.call(this) || this;
            }
            sgLeiJiDengLu.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            sgLeiJiDengLu.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.sgActivitysummerType.ljdl);
                if (temp) {
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                this.listReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                GameModels.activitySummer.requestRewardInfosData(game.sgActivitysummerType.ljdl, utils.Handler.create(this, function () {
                    if (!_this._listData) {
                        _this._listData = new eui.ArrayCollection(GameModels.activitySummer.leiJiDengLuData);
                    }
                    else {
                        _this._listData.source = GameModels.activitySummer.leiJiDengLuData;
                    }
                    _this.listReward.dataProvider = _this._listData;
                }));
            };
            sgLeiJiDengLu.prototype.exit = function () {
                this.clearList(this.listReward);
                this.listReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            sgLeiJiDengLu.prototype.onBuyClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (e.target instanceof components.SnapButton) {
                    var item_1 = this.listReward.selectedItem;
                    if (item_1.holidayRewardState == 1) {
                        GameModels.activitySummer.requestGetRewardInfos(item_1.holidayRewardId, game.sgActivitysummerType.ljdl, utils.Handler.create(this, this.getRewardCallback, [item_1.template.rewards]));
                    }
                }
            };
            sgLeiJiDengLu.prototype.getRewardCallback = function (str) {
                this.listReward.dataProvider.replaceAll(GameModels.activitySummer.leiJiDengLuData);
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            return sgLeiJiDengLu;
        }(ui.sgLeiJiDengLuSkin));
        activity.sgLeiJiDengLu = sgLeiJiDengLu;
        __reflect(sgLeiJiDengLu.prototype, "view.activity.sgLeiJiDengLu", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

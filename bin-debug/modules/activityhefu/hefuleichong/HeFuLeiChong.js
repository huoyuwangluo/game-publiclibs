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
        var HeFuLeiChong = (function (_super) {
            __extends(HeFuLeiChong, _super);
            function HeFuLeiChong() {
                return _super.call(this) || this;
            }
            HeFuLeiChong.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            HeFuLeiChong.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                this._id = 0;
                var temp = GameModels.activityHeFu.getActivityHeFuListTemplates(game.TypeHeFuActivity.HEFU_LEICHONG);
                if (temp) {
                    this._id = temp.id;
                    this.labDesc.text = temp.des;
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activityHeFu.getHeFuActivityListTiem(temp.id) * 1000), false);
                    GameModels.activityHeFu.requestRewardInfosData(temp.id, utils.Handler.create(this, function () {
                        if (!_this._listData) {
                            _this._listData = new eui.ArrayCollection(GameModels.activityHeFu.rewardInfos);
                        }
                        else {
                            _this._listData.source = GameModels.activityHeFu.rewardInfos;
                        }
                        _this.listReward.dataProvider = _this._listData;
                        _this.labRechange.text = GameModels.activityHeFu.currActivityTotal + Language.C_MS;
                    }));
                }
                this.listReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            HeFuLeiChong.prototype.exit = function () {
                this.clearList(this.listReward);
                this.listReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            HeFuLeiChong.prototype.onBuyClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (e.target instanceof components.SnapButton) {
                    var item_1 = this.listReward.selectedItem;
                    logger.log(item_1.hefuRewardId);
                    if (item_1.hefuRewardState == 1) {
                        GameModels.activityHeFu.requestGetRewardInfos(this._id, item_1.hefuRewardId, utils.Handler.create(this, this.getRewardCallback, [item_1.template.rewards]));
                    }
                    if (item_1.hefuRewardState == 2) {
                        GameModels.recharge.openRechargeDialog();
                    }
                }
            };
            HeFuLeiChong.prototype.getRewardCallback = function (str) {
                this.listReward.dataProvider.replaceAll(GameModels.activityHeFu.rewardInfos);
                var rewardArr = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
            };
            return HeFuLeiChong;
        }(ui.HeFuLeiChongSkin));
        activity.HeFuLeiChong = HeFuLeiChong;
        __reflect(HeFuLeiChong.prototype, "view.activity.HeFuLeiChong", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

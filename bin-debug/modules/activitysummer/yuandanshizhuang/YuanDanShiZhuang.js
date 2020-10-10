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
        var YuanDanShiZhuang = (function (_super) {
            __extends(YuanDanShiZhuang, _super);
            function YuanDanShiZhuang() {
                return _super.call(this) || this;
            }
            YuanDanShiZhuang.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.touchEnabled = false;
                if (!this._playerShowAvatar) {
                    this._playerShowAvatar = new components.PlayerShowAvatar();
                }
                this.addChild(this._playerShowAvatar);
                this._playerShowAvatar.x = 300;
                this._playerShowAvatar.y = 500;
                this._rwards = [this.reward4, this.reward0, this.reward1, this.reward2];
            };
            YuanDanShiZhuang.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                if (GameModels.user.player.job == TypeJob.ZHAN) {
                    this._playerShowAvatar.clothResId = "1036";
                }
                else if (GameModels.user.player.job == TypeJob.FA) {
                    this._playerShowAvatar.clothResId = "1033";
                }
                else {
                    this._playerShowAvatar.clothResId = "1035";
                }
                GameModels.activitySummer.requestRewardInfosData(game.TypeSummerActivity.YDSZ, utils.Handler.create(this, function () {
                    _this.showView();
                }));
                this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetClick, this);
            };
            YuanDanShiZhuang.prototype.exit = function () {
                if (this._playerShowAvatar) {
                    this._playerShowAvatar.reset();
                }
                this.btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetClick, this);
                for (var _i = 0, _a = this._rwards; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    reward.dataSource = null;
                }
            };
            YuanDanShiZhuang.prototype.onGetClick = function (e) {
                if (GameModels.activitySummer.yuanDanShiZhuanData.length > 0) {
                    var data = GameModels.activitySummer.yuanDanShiZhuanData[0];
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    if (data.holidayRewardState == 1) {
                        GameModels.activitySummer.requestGetRewardInfos(data.holidayRewardId, game.TypeSummerActivity.YDSZ, utils.Handler.create(this, this.getRewardCallback, [e.target.parent.localToGlobal(60, 555)]));
                    }
                    if (data.holidayRewardState == 2) {
                        GameModels.recharge.openRechargeDialog();
                    }
                }
            };
            YuanDanShiZhuang.prototype.getRewardCallback = function (fromPoint) {
                this.showView();
                var rewardArr = GameModels.activitySummer.yuanDanShiZhuanData[0].template.rewards.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
            };
            YuanDanShiZhuang.prototype.showView = function () {
                this.btnGet.touchEnabled = true;
                this.btnGet.filters = null;
                if (GameModels.activitySummer.yuanDanShiZhuanData.length > 0) {
                    var data = GameModels.activitySummer.yuanDanShiZhuanData[0];
                    // let rewards: Array<string> = data.template.rewards.split(";");
                    // for (var i: number = 0; i < this._rwards.length; i++) {
                    // 	var iconBox: components.RewardItemBox = this._rwards[i];
                    // 	iconBox.labName.stroke = 1;
                    // 	if (i < rewards.length) {
                    // 		if (i == 0) {
                    // 			var str: string[] = rewards[i].split("&");
                    // 			iconBox.dataSource = str[GameModels.user.player.job - 1];
                    // 			this.boxGroup.addChild(iconBox);
                    // 		}
                    // 		else {
                    // 			iconBox.dataSource = rewards[i];
                    // 			this.boxGroup.addChild(iconBox);
                    // 		}
                    // 	} else {
                    // 		if (iconBox.parent) {
                    // 			iconBox.parent.removeChild(iconBox);
                    // 		}
                    // 	}
                    // }
                    var max = data.template.value;
                    var currValue = GameModels.activitySummer.tatolValueArr[0];
                    this.labCount.text = Language.getExpression(Language.E_YCZ12MS, currValue, max);
                    this.progressBar.maximum = max;
                    this.progressBar.value = currValue;
                    if (data.holidayRewardState == 1) {
                        this.btnGet.label = Language.C_KLQ;
                    }
                    else if (data.holidayRewardState == 2) {
                        this.btnGet.touchEnabled = true;
                        this.btnGet.filters = null;
                        this.btnGet.label = Language.C_QCZ;
                    }
                    else {
                        this.btnGet.touchEnabled = false;
                        this.btnGet.filters = utils.filterUtil.grayFilters;
                        this.btnGet.label = Language.C_YLQ;
                    }
                }
            };
            return YuanDanShiZhuang;
        }(ui.YuanDanShiZhuangSkin));
        activity.YuanDanShiZhuang = YuanDanShiZhuang;
        __reflect(YuanDanShiZhuang.prototype, "view.activity.YuanDanShiZhuang", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

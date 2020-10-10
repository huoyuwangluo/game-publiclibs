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
        var KuaNianLiBao = (function (_super) {
            __extends(KuaNianLiBao, _super);
            function KuaNianLiBao() {
                return _super.call(this) || this;
            }
            KuaNianLiBao.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.touchEnabled = false;
                this._iconArr = [this.icon0, this.icon1, this.icon2, this.icon3, this.icon4];
                this._rwards = [this.reward0, this.reward1, this.reward2, this.reward3];
                this._iconRedPointArr = [this.imgRed0, this.imgRed1, this.imgRed2, this.imgRed3, this.imgRed4];
            };
            KuaNianLiBao.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                this.imgNoGroup.visible = true;
                this.labDate1.text = "";
                this.labDate2.text = "";
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.KNLB);
                if (!temp) {
                    mg.alertManager.tip(Language.J_HDYJJS, 0xff0000);
                    return;
                }
                GameModels.activitySummer.requestRewardInfosData(game.TypeSummerActivity.KNLB, utils.Handler.create(this, function () {
                    _this._currIndex = 0;
                    _this.showView();
                }));
                this.requireKuaNianGiftState();
                for (var i = 0; i < this._iconArr.length; i++) {
                    this._iconArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                }
                this.btnChongZhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                GameModels.user.player.onPropertyChange(TypeProperty.VIP_LEVEL, this, this.chongzhiCallFun);
                GameModels.user.player.onPropertyChange(TypeProperty.VIP_EXP, this, this.chongzhiCallFun);
            };
            KuaNianLiBao.prototype.exit = function () {
                for (var i = 0; i < this._iconArr.length; i++) {
                    this._iconArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                }
                for (var _i = 0, _a = this._rwards; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    reward.dataSource = null;
                }
                utils.timer.clearAll(this);
                GameModels.user.player.offPropertyChange(TypeProperty.VIP_LEVEL, this, this.chongzhiCallFun);
                GameModels.user.player.offPropertyChange(TypeProperty.VIP_EXP, this, this.chongzhiCallFun);
            };
            KuaNianLiBao.prototype.onIconClick = function (e) {
                for (var i = 0; i < this._iconArr.length; i++) {
                    if (e.currentTarget == this._iconArr[i]) {
                        this._currIndex = i;
                        this.showView();
                        break;
                    }
                }
            };
            KuaNianLiBao.prototype.chongzhiCallFun = function () {
                var _this = this;
                GameModels.activitySummer.requestRewardInfosData(game.TypeSummerActivity.KNLB, utils.Handler.create(this, function () {
                    _this.showView();
                }));
            };
            KuaNianLiBao.prototype.showView = function () {
                this.imgSelected.x = this._iconArr[this._currIndex].x;
                this.imgSelected.y = this._iconArr[this._currIndex].y;
                if (GameModels.activitySummer.kuaNainLiBaoData[this._currIndex]) {
                    this._currVo = GameModels.activitySummer.kuaNainLiBaoData[this._currIndex];
                    var rewards = this._currVo.template.rewards.split(";");
                    for (var i = 0; i < this._rwards.length; i++) {
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
                    if (this._currVo.holidayRewardState == 1) {
                        this.btnChongZhi.touchEnabled = true;
                        this.btnChongZhi.label = Language.C_LQ;
                        this.btnChongZhi.filters = null;
                    }
                    else if (this._currVo.holidayRewardState == 2) {
                        this.btnChongZhi.touchEnabled = true;
                        this.btnChongZhi.label = Language.C_QQG;
                        this.btnChongZhi.filters = null;
                    }
                    else {
                        this.btnChongZhi.touchEnabled = false;
                        this.btnChongZhi.label = Language.C_YLQ;
                        this.btnChongZhi.filters = utils.filterUtil.grayFilters;
                    }
                }
                this.imgTitle.source = "img_kuanian" + this._currIndex + "_png";
                this.labYuanJia0.text = this._currVo.template.desc;
                this.labYuanJia0.validateNow();
                this.imgYuan.x = this.labYuanJia0.x + this.labYuanJia0.textWidth;
                if (this.imgYuan.x < 128)
                    this.imgYuan.x = 128;
                for (var i = 0; i < this._iconRedPointArr.length; i++) {
                    this._iconRedPointArr[i].visible = false;
                    if (GameModels.activitySummer.kuaNainLiBaoData[i]) {
                        if (GameModels.activitySummer.kuaNainLiBaoData[i].holidayRewardState == 1) {
                            this._iconRedPointArr[i].visible = true;
                        }
                    }
                }
            };
            KuaNianLiBao.prototype.onBuyClick = function (e) {
                if (!GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.KNLB)) {
                    mg.alertManager.tip(Language.J_HDYJJS);
                    return;
                }
                this._currVo = GameModels.activitySummer.kuaNainLiBaoData[this._currIndex];
                if (this._currVo) {
                    if (this._currVo.holidayRewardState == 1) {
                        if (utils.CheckUtil.checkBagSmelting())
                            return;
                        GameModels.activitySummer.requestGetRewardInfos(this._currVo.holidayRewardId, game.TypeSummerActivity.KNLB, utils.Handler.create(this, this.getRewardCallback, [e.target.parent.localToGlobal(303, 354)]));
                    }
                    else if (this._currVo.holidayRewardState == 2) {
                        logger.log("当前的的礼包Id", this._currVo.template.id);
                        logger.log("当前的的礼包对应的充值Id", this._currVo.template.target);
                        var temp = Templates.getTemplateById(templates.Map.GAMERECHARGE, this._currVo.template.target);
                        if (temp) {
                            GameModels.platform.buy(temp.RMB, 1, "" + temp.id, temp.name, temp.des);
                        }
                    }
                }
            };
            KuaNianLiBao.prototype.getRewardCallback = function (fromPoint) {
                this.showView();
                var rewardArr = this._currVo.template.rewards.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
            };
            KuaNianLiBao.prototype.updataView = function () {
                this.labDate1.text = "";
                this.labDate2.text = "";
                this.labDate0.text = "";
                if (GameModels.activitySummer.kuanianState == 0) {
                    this.imgNoGroup.visible = true;
                    this.imgTimeBg1.source = "img_countDown2_png";
                    this.imgTimeBg2.source = "img_countDown2_png";
                    this._time1 = GameModels.activitySummer.kuanianTime;
                    this.labDate1.text = utils.DateUtil.formatTimeLeft(this._time1);
                    this._time2 = GameModels.activitySummer.kuanianTime + 3600;
                    this.labDate2.text = utils.DateUtil.formatTimeLeft(this._time2);
                }
                else if (GameModels.activitySummer.kuanianState == 1) {
                    this.imgNoGroup.visible = true;
                    this.imgTimeBg1.source = "img_countDown1_png";
                    this.imgTimeBg2.source = "img_countDown2_png";
                    this._time1 = GameModels.activitySummer.kuanianTime;
                    this.labDate1.text = utils.DateUtil.formatTimeLeft(this._time1);
                    this._time2 = GameModels.activitySummer.kuanianTime;
                    this.labDate2.text = utils.DateUtil.formatTimeLeft(this._time2);
                }
                else {
                    this._time3 = GameModels.activitySummer.kuanianTime;
                    this.labDate0.text = utils.DateUtil.formatTimeLeft(this._time3);
                    this.imgNoGroup.visible = false;
                    if (this._time3 > 0) {
                        utils.timer.countdown(this._time3, this, this.updateLableTime3, this.requireKuaNianGiftState);
                    }
                    return;
                }
                if (this._time1 > 0) {
                    utils.timer.countdown(this._time1, this, this.updateLableTime1, this.requireKuaNianGiftState);
                }
                if (this._time2 > 0) {
                    utils.timer.countdown(this._time2, this, this.updateLableTime2, this.requireKuaNianGiftState);
                }
            };
            KuaNianLiBao.prototype.updateLableTime1 = function () {
                this._time1--;
                this.labDate1.text = utils.DateUtil.formatTimeLeft(this._time1);
            };
            KuaNianLiBao.prototype.updateLableTime2 = function () {
                this._time2--;
                this.labDate2.text = utils.DateUtil.formatTimeLeft(this._time2);
            };
            KuaNianLiBao.prototype.updateLableTime3 = function () {
                this._time3--;
                this.labDate0.text = utils.DateUtil.formatTimeLeft(this._time3);
            };
            KuaNianLiBao.prototype.requireKuaNianGiftState = function () {
                var _this = this;
                utils.timer.clearAll(this);
                this._time1 = 0;
                this._time2 = 0;
                this._time3 = 0;
                GameModels.activitySummer.requestKuaNianGiftState(utils.Handler.create(this, function () {
                    _this.updataView();
                }));
            };
            return KuaNianLiBao;
        }(ui.KuaNianLiBaoSkin));
        activity.KuaNianLiBao = KuaNianLiBao;
        __reflect(KuaNianLiBao.prototype, "view.activity.KuaNianLiBao", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

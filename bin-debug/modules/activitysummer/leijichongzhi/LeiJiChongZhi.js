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
        var LeiJiChongZhi = (function (_super) {
            __extends(LeiJiChongZhi, _super);
            function LeiJiChongZhi() {
                var _this = _super.call(this) || this;
                _this.touchEnabled = false;
                return _this;
            }
            LeiJiChongZhi.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._rwards = [this.reward0, this.reward1, this.reward2];
            };
            LeiJiChongZhi.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.LCSL);
                if (temp) {
                    this.labDesc.text = temp.des;
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                this.listReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnDay1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnDay2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnDay3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnLingQu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLingQuClick, this);
                if (temp) {
                    if (GameModels.activitySummer.summerActivityOneResourceType > 0) {
                        this.imgTitle.source = "img_summer_lianchong" + GameModels.activitySummer.summerActivityOneResourceType + "_" + temp.typeTable + "_jpg";
                    }
                    if (temp.effect) {
                        this.addEff(temp.effect);
                    }
                    else {
                        if (this._efct) {
                            this.removeEffectHandler(this._efct);
                            this._efct = null;
                        }
                    }
                }
                GameModels.activitySummer.requestRewardInfosData(game.TypeSummerActivity.LCSL, utils.Handler.create(this, function () {
                    _this.showView(GameModels.activitySummer.tatolValueArr.length);
                }));
            };
            LeiJiChongZhi.prototype.exit = function () {
                if (this._efct) {
                    this.removeEffectHandler(this._efct);
                    this._efct = null;
                }
                this.clearList(this.listReward);
                this.listReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnDay1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnDay2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnDay3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnLingQu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLingQuClick, this);
            };
            LeiJiChongZhi.prototype.addEff = function (resid) {
                this._efct = utils.ObjectPool.from(s.AnimationSprite, true);
                this._efct.x = 466;
                this._efct.y = 140;
                this._efct.frameRate = 6;
                this._efct.scale(0.8);
                // this._efct.skewY = 180;
                this.addChild(this._efct);
                this._efct.touchEnabled = false;
                this._efct.touchChildren = false;
                this._efct.resId = resid;
                this._efct.play();
            };
            LeiJiChongZhi.prototype.onLingQuClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                var voItem = GameModels.activitySummer.getLianChongSongLiDataByValue();
                if (voItem) {
                    //logger.log(this._vo.holidayRewardState);
                    if (voItem.holidayRewardState == 1) {
                        GameModels.activitySummer.requestGetRewardInfos(voItem.holidayRewardId, game.TypeSummerActivity.LCSL, utils.Handler.create(this, this.getRewardCallback1, [e.target.parent.localToGlobal(100, 650)]));
                    }
                }
            };
            LeiJiChongZhi.prototype.getRewardCallback1 = function (fromPoint) {
                this.notAttain.visible = false;
                this.btnLingQu.visible = false;
                this.getVipBox.visible = true;
                var voItem = GameModels.activitySummer.getLianChongSongLiDataByValue();
                if (voItem) {
                    var rewardArr = voItem.template.rewards.split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
                }
            };
            LeiJiChongZhi.prototype.showView = function (pos) {
                this._currPos = pos;
                if (pos == 1) {
                    this.btnDay1.currentState = "down";
                    this.btnDay2.currentState = "up";
                    this.btnDay3.currentState = "up";
                    this.btnDay1.touchEnabled = false;
                    this.btnDay2.touchEnabled = true;
                    this.btnDay3.touchEnabled = true;
                }
                else if (pos == 2) {
                    this.btnDay1.currentState = "up";
                    this.btnDay2.currentState = "down";
                    this.btnDay3.currentState = "up";
                    this.btnDay1.touchEnabled = true;
                    this.btnDay2.touchEnabled = false;
                    this.btnDay3.touchEnabled = true;
                }
                else {
                    this.btnDay1.currentState = "up";
                    this.btnDay2.currentState = "up";
                    this.btnDay3.currentState = "down";
                    this.btnDay1.touchEnabled = true;
                    this.btnDay2.touchEnabled = true;
                    this.btnDay3.touchEnabled = false;
                }
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(GameModels.activitySummer.getLianChongSongLiDataBytarget(pos.toString()));
                }
                else {
                    this._listData.source = GameModels.activitySummer.getLianChongSongLiDataBytarget(pos.toString());
                }
                this.listReward.dataProvider = this._listData;
                if (GameModels.activitySummer.tatolValueArr[pos - 1]) {
                    this.labRechange.text = GameModels.activitySummer.tatolValueArr[pos - 1] + Language.C_MS;
                }
                else {
                    this.labRechange.text = 0 + Language.C_MS;
                }
                this.showJiangLi();
            };
            LeiJiChongZhi.prototype.showJiangLi = function () {
                this.getVipBox.visible = false;
                this.notAttain.visible = false;
                this.btnLingQu.visible = false;
                var voItem = GameModels.activitySummer.getLianChongSongLiDataByValue();
                if (voItem) {
                    var rewards = voItem.template.rewards.split(";");
                    for (var i = 0; i < 3; i++) {
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
                    if (voItem.holidayRewardState == 1) {
                        this.btnLingQu.visible = true;
                    }
                    else if (voItem.holidayRewardState == 2) {
                        this.notAttain.visible = true;
                    }
                    else {
                        this.getVipBox.visible = true;
                    }
                }
            };
            LeiJiChongZhi.prototype.onBtnClick = function (e) {
                switch (e.currentTarget) {
                    case this.btnDay1:
                        this.showView(1);
                        break;
                    case this.btnDay2:
                        this.showView(2);
                        break;
                    case this.btnDay3:
                        this.showView(3);
                        break;
                }
            };
            LeiJiChongZhi.prototype.onBuyClick = function (e) {
                if (e.target instanceof components.SnapButton) {
                    var item = this.listReward.selectedItem;
                    if (item.holidayRewardState == 1) {
                        if (utils.CheckUtil.checkBagSmelting())
                            return;
                        GameModels.activitySummer.requestGetRewardInfos(item.holidayRewardId, game.TypeSummerActivity.LCSL, utils.Handler.create(this, this.getRewardCallback, [item.template.rewards]));
                    }
                    else {
                        GameModels.recharge.openRechargeDialog();
                    }
                }
            };
            LeiJiChongZhi.prototype.getRewardCallback = function (str) {
                this.showView(this._currPos);
                var rewardArr = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
            };
            return LeiJiChongZhi;
        }(ui.LeiJiChongZhiSkin));
        activity.LeiJiChongZhi = LeiJiChongZhi;
        __reflect(LeiJiChongZhi.prototype, "view.activity.LeiJiChongZhi", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

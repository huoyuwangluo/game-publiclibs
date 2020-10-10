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
        var XiaRiLeiChong = (function (_super) {
            __extends(XiaRiLeiChong, _super);
            function XiaRiLeiChong() {
                return _super.call(this) || this;
            }
            XiaRiLeiChong.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.touchEnabled = false;
            };
            XiaRiLeiChong.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                this.imgSkill.visible = false;
                this.btnShow.visible = false;
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.MRLC);
                if (temp) {
                    this.labDesc.text = temp.des;
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                    if (temp.typeTable == 10206 || temp.typeTable == 10202) {
                        this.imgSkill.visible = true;
                        this.btnShow.visible = true;
                    }
                    if (GameModels.activitySummer.summerActivityOneResourceType > 0) {
                        this.imgTitle.source = "img_summer_leichong" + GameModels.activitySummer.summerActivityOneResourceType + "_" + temp.typeTable + "_jpg";
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
                this.listReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnShow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowClick, this);
                GameModels.activitySummer.requestRewardInfosData(game.TypeSummerActivity.MRLC, utils.Handler.create(this, function () {
                    if (!_this._listData) {
                        _this._listData = new eui.ArrayCollection(GameModels.activitySummer.xiaRiLeiJiData);
                    }
                    else {
                        _this._listData.source = GameModels.activitySummer.xiaRiLeiJiData;
                    }
                    _this.listReward.dataProvider = _this._listData;
                    _this.labRechange.text = GameModels.activitySummer.tatolValue + Language.C_MS;
                }));
            };
            XiaRiLeiChong.prototype.addEff = function (resid) {
                this._efct = utils.ObjectPool.from(s.AnimationSprite, true);
                this._efct.x = 466;
                this._efct.y = 140;
                this._efct.frameRate = 6;
                this._efct.scale(0.8);
                // this._efct.skewY = 180;
                this.addChild(this._efct);
                this._efct.resId = resid;
                this._efct.touchEnabled = false;
                this._efct.touchChildren = false;
                this._efct.play();
            };
            XiaRiLeiChong.prototype.exit = function () {
                this.clearList(this.listReward);
                if (this._efct) {
                    this.removeEffectHandler(this._efct);
                    this._efct = null;
                }
                this.listReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnShow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowClick, this);
            };
            XiaRiLeiChong.prototype.onShowClick = function () {
                //mg.alertManager.showAlert(RoleStarEquipSuitSkillAlert, true, true, null, 0, false);
            };
            XiaRiLeiChong.prototype.onBuyClick = function (e) {
                if (e.target instanceof components.SnapButton) {
                    var item_1 = this.listReward.selectedItem;
                    if (item_1.holidayRewardState == 1) {
                        if (utils.CheckUtil.checkBagSmelting())
                            return;
                        GameModels.activitySummer.requestGetRewardInfos(item_1.holidayRewardId, game.TypeSummerActivity.MRLC, utils.Handler.create(this, this.getRewardCallback, [item_1.template.rewards]));
                    }
                    else {
                        GameModels.recharge.openRechargeDialog();
                    }
                }
            };
            XiaRiLeiChong.prototype.getRewardCallback = function (str) {
                this.listReward.dataProvider.replaceAll(GameModels.activitySummer.xiaRiLeiJiData);
                var rewardArr = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
            };
            return XiaRiLeiChong;
        }(ui.XiaRiLeiChongSkin));
        activity.XiaRiLeiChong = XiaRiLeiChong;
        __reflect(XiaRiLeiChong.prototype, "view.activity.XiaRiLeiChong", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

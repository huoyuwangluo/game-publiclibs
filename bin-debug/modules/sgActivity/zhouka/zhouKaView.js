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
        /**game.sgActivityType.zk*/
        var zhouKaView = (function (_super) {
            __extends(zhouKaView, _super);
            function zhouKaView() {
                return _super.call(this) || this;
            }
            zhouKaView.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._imgHeraldArr = ["img_sg_zhouka_des0_png", "img_sg_zhouka_des1_png",
                    "img_sg_zhouka_des2_png" /*, "img_sg_zhouka_des3_png", "img_sg_zhouka_des4_png", "img_sg_zhouka_des5_png"*/];
            };
            zhouKaView.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                GameModels.oneCountRedPoint.isOpenWeekCardView = true;
                this.updata();
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.WEEKCARD_CHANGE, this.updata, this);
                GameModels.user.player.onPropertyChange(TypeProperty.TODAY_RECHARGE, this, this.updata);
                this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.list1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listClick, this);
            };
            zhouKaView.prototype.exit = function () {
                this.clearList(this.list);
                this.clearList(this.list1);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.WEEKCARD_CHANGE, this.updata, this);
                GameModels.user.player.offPropertyChange(TypeProperty.TODAY_RECHARGE, this, this.updata);
                this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.list1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listClick, this);
            };
            zhouKaView.prototype.listClick = function (e) {
                if (e.target instanceof components.SnapButton) {
                    var item = this.list1.selectedItem;
                    if (item.index == 0) {
                        if (utils.CheckUtil.checkBagSmelting())
                            return;
                        if (GameModels.sgActivity.normalGift == 0) {
                            GameModels.sgActivity.requestGetWeekCard(2, utils.Handler.create(this, this.getRewardCallback, [item.reward]));
                        }
                    }
                    else if (item.index == 1) {
                        if (GameModels.user.player.vip >= 1) {
                            if (utils.CheckUtil.checkBagSmelting())
                                return;
                            if (GameModels.sgActivity.vipGift == 0) {
                                GameModels.sgActivity.requestGetWeekCard(3, utils.Handler.create(this, this.getRewardCallback, [item.reward]));
                            }
                        }
                        else {
                            GameModels.recharge.openRechargeDialog();
                        }
                    }
                    else {
                        if (GameModels.user.player.todayRechargeTotal > 0) {
                            if (utils.CheckUtil.checkBagSmelting())
                                return;
                            if (GameModels.sgActivity.payGift == 0) {
                                GameModels.sgActivity.requestGetWeekCard(4, utils.Handler.create(this, this.getRewardCallback, [item.reward]));
                            }
                        }
                        else {
                            GameModels.recharge.openRechargeDialog();
                        }
                    }
                }
            };
            zhouKaView.prototype.getRewardCallback = function (str) {
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            zhouKaView.prototype.btnClick = function (e) {
                var _this = this;
                if (e.currentTarget == this.btnBuy) {
                    GameModels.sgActivity.requestBuyWeekCard();
                }
                else {
                    GameModels.sgActivity.requestGetWeekCard(1, utils.Handler.create(this, function () {
                        // this.reward.playFlyItem();
                        var rewards = [_this.reward.dataSource];
                        mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                    }));
                }
            };
            zhouKaView.prototype.updata = function () {
                GameModels.state.updateState(GameRedState.DAILY_ACTIVITY_ZHOUKA);
                GameModels.state.updateState(GameRedState.DAILY_ACTIVITY1);
                if (GameModels.sgActivity.days <= 0) {
                    this.NoGroup.visible = true;
                    this.YesGroup.visible = false;
                    this.showViewHerald();
                }
                else {
                    this.NoGroup.visible = false;
                    this.YesGroup.visible = true;
                    this.showView();
                }
            };
            zhouKaView.prototype.showViewHerald = function () {
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(this._imgHeraldArr);
                }
                else {
                    this._listData.source = this._imgHeraldArr;
                }
                this.list.dataProvider = this._listData;
            };
            zhouKaView.prototype.showView = function () {
                var tem = Templates.getTemplateById(templates.Map.WEEKCARD, GameModels.sgActivity.days);
                this.labDay.text = "" + GameModels.sgActivity.days;
                if (GameModels.sgActivity.yuanBaoGift == 0) {
                    this.labCount.text = 100 * (GameModels.sgActivity.days - 1) + "/" + 700;
                }
                else {
                    this.labCount.text = 100 * GameModels.sgActivity.days + "/" + 700;
                }
                if (tem) {
                    var data = [];
                    data.push({ index: 0, text: Language.J_MRDLKLQ, reward: tem.rewards2 + ";" + tem.rewards3 });
                    data.push({ index: 1, text: Language.J_VIP1KLQ, reward: tem.rewards2 });
                    data.push({ index: 2, text: Language.J_CZRYJKKLQ, reward: tem.rewards2 });
                    if (!this._listData1) {
                        this._listData1 = new eui.ArrayCollection(data);
                    }
                    else {
                        this._listData1.source = data;
                    }
                    this.list1.dataProvider = this._listData1;
                    this.reward.dataSource = tem.rewards1;
                    if (GameModels.sgActivity.yuanBaoGift == 0) {
                        this.btnGet.visible = true;
                        this.imgBuyFinsh.visible = false;
                    }
                    else {
                        this.btnGet.visible = false;
                        this.imgBuyFinsh.visible = true;
                    }
                }
            };
            return zhouKaView;
        }(ui.zhouKaViewSkin));
        activity.zhouKaView = zhouKaView;
        __reflect(zhouKaView.prototype, "view.activity.zhouKaView", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

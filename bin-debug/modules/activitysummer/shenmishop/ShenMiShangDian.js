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
        var ShenMiShangDian = (function (_super) {
            __extends(ShenMiShangDian, _super);
            function ShenMiShangDian() {
                return _super.call(this) || this;
            }
            ShenMiShangDian.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._yanhuaEffArr = [];
                this._xiangouItem = [this.item0, this.item1, this.item2, this.item3, this.item4];
            };
            ShenMiShangDian.prototype.removeYanHua = function () {
                for (var i = 0; i < this._yanhuaEffArr.length; i++) {
                    if (this._yanhuaEffArr[i]) {
                        this.removeEffectHandler(this._yanhuaEffArr[i]);
                        this._yanhuaEffArr[i] = null;
                    }
                }
                this._yanhuaEffArr.length = 0;
            };
            ShenMiShangDian.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                this._chixuDay = 0;
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.JLSC);
                if (temp) {
                    this._chixuDay = temp.Time;
                    this.labTime.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                this.labDiamond.text = "" + GameModels.user.player.diamonds;
                GameModels.user.player.onPropertyChange(TypeProperty.UnbindedGold, this, this.onGoldChange);
                this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.helpClick, this);
                GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_SHENMI_SHOP_BUY, this.showView, this);
                this.btnupdata.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpDataClick, this);
                for (var i = 0; i < this._xiangouItem.length; i++) {
                    this._xiangouItem[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                }
                GameModels.activitySummer.requestHolidayMysteryShopdInfosData(utils.Handler.create(this, function () {
                    _this.showView();
                }));
            };
            ShenMiShangDian.prototype.exit = function () {
                this.removeYanHua();
                utils.timer.clearAll(this);
                if (this._timerHandler) {
                    utils.timer.clearHandler(this._timerHandler);
                }
                for (var i = 0; i < this._xiangouItem.length; i++) {
                    this._xiangouItem[i].dataSource = null;
                }
                this.clearList(this.listReward);
                for (var i = 0; i < this._xiangouItem.length; i++) {
                    this._xiangouItem[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                }
                this.btnupdata.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpDataClick, this);
                this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.helpClick, this);
                GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.ACTIVITY_SHENMI_SHOP_BUY, this.showView, this);
                GameModels.user.player.offPropertyChange(TypeProperty.UnbindedGold, this, this.onGoldChange);
            };
            ShenMiShangDian.prototype.helpClick = function () {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 2201).des);
            };
            ShenMiShangDian.prototype.finshTime = function () {
                var _this = this;
                this.labTime.text = "";
                this._time = 0;
                if (this._timerHandler) {
                    utils.timer.clearHandler(this._timerHandler);
                }
                GameModels.activitySummer.requestHolidayMysteryShopdInfosData(utils.Handler.create(this, function () {
                    _this.showView();
                }));
            };
            ShenMiShangDian.prototype.updateLableTime = function () {
                this.labUpTime.text = utils.DateUtil.formatTimeLeft(this._time);
                this._time--;
            };
            ShenMiShangDian.prototype.showView = function () {
                this._time = GameModels.activitySummer.nextRefreshTime;
                if (this._chixuDay <= 1) {
                    this.lab1.visible = false;
                    this.labUpTime.visible = false;
                    this.lab2.y = 16;
                    this.labTime.y = 16;
                }
                else {
                    this.lab1.visible = true;
                    this.labUpTime.visible = true;
                    this.lab2.y = 28;
                    this.labTime.y = 28;
                    if (GameModels.activitySummer.nextRefreshTime >= 0) {
                        this.updateLableTime();
                        this._timerHandler = utils.timer.countdown(GameModels.activitySummer.nextRefreshTime, this, this.updateLableTime, this.finshTime);
                    }
                }
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(GameModels.activitySummer.mysteryShopData);
                }
                else {
                    this._listData.source = GameModels.activitySummer.mysteryShopData;
                }
                this.listReward.dataProvider = this._listData;
                var dataSet = GameModels.dataSet.getDataSettingById(319002);
                if (GameModels.activitySummer.freeTimes > 0) {
                    this.labDes.text = Language.getExpression(Language.E_SY1CJLFT, 1);
                }
                else {
                    this.labDes.text = Language.J_SXJLCFFT;
                }
                this.labDiamond0.text = "" + GameModels.activitySummer.refreshCost;
                this.showXianGou();
                this.showRecord();
            };
            ShenMiShangDian.prototype.showXianGou = function () {
                var data = GameModels.activitySummer.mysteryShopLimitData;
                for (var i = 0; i < this._xiangouItem.length; i++) {
                    if (data[i]) {
                        this._xiangouItem[i].visible = true;
                        this._xiangouItem[i].dataSource = data[i];
                    }
                    else {
                        this._xiangouItem[i].visible = false;
                    }
                }
            };
            ShenMiShangDian.prototype.showRecord = function () {
                if (!this._recordListData) {
                    this._recordListData = new eui.ArrayCollection(GameModels.activitySummer.mysteryShopRecordData);
                }
                else {
                    this._recordListData.source = GameModels.activitySummer.mysteryShopRecordData;
                }
                this.recordList.dataProvider = this._recordListData;
            };
            ShenMiShangDian.prototype.onUpDataClick = function () {
                if (this.checkGoodItem()) {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.J_DQLBYCZDJ, TypeBtnLabel.OK, null, utils.Handler.create(this, this.callfunRefresh));
                }
                else {
                    this.callfunRefresh();
                }
            };
            ShenMiShangDian.prototype.callfunRefresh = function () {
                var _this = this;
                var oldNum = GameModels.activitySummer.freeTimes;
                GameModels.activitySummer.requestRefreshMysteryShop(utils.Handler.create(this, function () {
                    if (oldNum == 0 && GameModels.activitySummer.freeTimes > 0) {
                        var str = utils.TextFlowMaker.htmlParser(Language.J_GXNSXHDJMCS);
                        mg.alertManager.showAlert(PromptAlert, false, true, str, TypeBtnLabel.OK, null, null, null, true);
                        _this.starBoFangYanHua();
                    }
                    _this.showView();
                }));
            };
            ShenMiShangDian.prototype.checkGoodItem = function () {
                var data = GameModels.activitySummer.mysteryShopData;
                var data1 = GameModels.activitySummer.mysteryShopLimitDataId;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].shopBuyCount <= 0 && data1.indexOf(data[i].shopid) != -1) {
                        return true;
                    }
                }
                return false;
            };
            ShenMiShangDian.prototype.starBoFangYanHua = function () {
                var resIdArr = ["6347", "6348", "6349", "6350", "6351", "6352"];
                var posArr = [new egret.Point(170, 200), new egret.Point(320, 310), new egret.Point(420, 230), new egret.Point(150, 370), new egret.Point(400, 160), new egret.Point(480, 430)];
                for (var i = 0; i < resIdArr.length; i++) {
                    var eff = utils.ObjectPool.from(s.AnimationSprite);
                    this._yanhuaEffArr.push(eff);
                    utils.timer.once(i * 300, this, this.playYanHuaEff, false, resIdArr[i], posArr[i], eff, i == resIdArr.length - 1);
                }
            };
            ShenMiShangDian.prototype.playYanHuaEff = function (resId, pos, eff, islast) {
                eff.x = pos.x;
                eff.y = pos.y;
                eff.resId = resId;
                eff.frameRate = 12;
                eff.play();
                this.addChild(eff);
                if (islast) {
                    utils.timer.once(300, this, this.removeYanHua);
                }
            };
            ShenMiShangDian.prototype.onIconClick = function (e) {
                for (var i = 0; i < this._xiangouItem.length; i++) {
                    if (e.currentTarget == this._xiangouItem[i]) {
                        var item = this._xiangouItem[i].dataSource;
                        if (item && item.template) {
                            mg.TipManager.instance.showTip(tips.PropTip, { count: item.template.itemCount, templateProp: Templates.getTemplateById(templates.Map.ITEM, item.template.itemId) });
                            break;
                        }
                    }
                }
            };
            ShenMiShangDian.prototype.onGoldChange = function () {
                this.labDiamond.text = "" + GameModels.user.player.diamonds;
            };
            return ShenMiShangDian;
        }(ui.ShenMiShangDianSkin));
        activity.ShenMiShangDian = ShenMiShangDian;
        __reflect(ShenMiShangDian.prototype, "view.activity.ShenMiShangDian", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

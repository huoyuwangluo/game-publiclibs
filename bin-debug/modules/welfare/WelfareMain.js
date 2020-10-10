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
var dialog;
(function (dialog) {
    var welfare;
    (function (welfare) {
        var TypeWelfare = (function () {
            function TypeWelfare() {
            }
            TypeWelfare.getStateByIndex = function (index) {
                if (index < this._nameList.length)
                    return this._nameList[index].state;
            };
            TypeWelfare.getNamebyIndex = function (index) {
                if (this._nameList.length > index)
                    return this._nameList[index].name;
            };
            TypeWelfare.setNameByState = function (state, name) {
                for (var i = 0; i < this._nameList.length; i++) {
                    if (state == this._nameList[i].state)
                        this._nameList[i].name = name;
                }
            };
            TypeWelfare.setIconImageByState = function (state, name) {
                for (var i = 0; i < this._nameList.length; i++) {
                    if (state == this._nameList[i].state)
                        this._nameList[i].iconImage = name;
                }
            };
            TypeWelfare.getIndexByState = function (state) {
                for (var i = 0; i < this._nameList.length; i++) {
                    if (state == this._nameList[i].state)
                        return i;
                }
                return -1;
            };
            TypeWelfare.removeTypeByName = function (state) {
                for (var i = 0; i < this._nameList.length; i++) {
                    if (state == this._nameList[i].state) {
                        this._nameList.splice(i, 1);
                        return true;
                    }
                }
                return false;
            };
            TypeWelfare.getDataList = function () {
                var list = [];
                for (var i = 0; i < this._nameList.length; i++) {
                    list.push({ name: this._nameList[i].name, image: this._nameList[i].iconImage });
                }
                return list;
            };
            TypeWelfare.logReward = Language.C_LJDL;
            TypeWelfare.upReward = Language.C_DJJL;
            TypeWelfare.sign = Language.C_QD1;
            TypeWelfare.code = Language.C_JHM;
            TypeWelfare.book = Language.C_SGBJ;
            TypeWelfare.notice = Language.C_GG;
            TypeWelfare.faq = "faq";
            TypeWelfare.kefu = Language.C_VIP;
            TypeWelfare.grwoup = Language.C_CZJH;
            TypeWelfare.zhengshou = Language.C_ZSDH;
            TypeWelfare.chengzhangFund = Language.C_CZJJ; //成长基金
            TypeWelfare._nameList = [
                { name: TypeWelfare.logReward, state: "logReward", iconImage: "welfareBtnIcon_json.welfare_btn_LJDL" },
                { name: TypeWelfare.upReward, state: "upReward", iconImage: "welfareBtnIcon_json.welfare_btn_DJLB" },
                { name: Language.C_HDJJ2, state: "activity", iconImage: "welfareBtnIcon_json.welfare_btn_ACT103" },
                { name: TypeWelfare.zhengshou, state: "zhengshou", iconImage: "welfareBtnIcon_json.welfare_btn_ZS" },
                { name: TypeWelfare.chengzhangFund, state: "fund", iconImage: "welfareBtnIcon_json.welfare_btn_CZJJ" },
                // { name: TypeWelfare.book, state: "book", iconImage: "welfareBtnIcon_json.welfare_btn_book" },
                { name: TypeWelfare.grwoup, state: "grwoup", iconImage: "welfareBtnIcon_json.welfare_btn_CZ" },
                { name: TypeWelfare.code, state: "code", iconImage: "welfareBtnIcon_json.welfare_btn_code" }
                /*{ name: TypeWelfare.kefu, state: "kefu", iconImage: "welfareBtnIcon_json.welfare_btn_vip" },*/
                // { name: TypeWelfare.notice, state: "notice", iconImage: "welfareBtnIcon_json.welfare_btn_NOTICE" },
                // { name: TypeWelfare.faq, state: "faq", iconImage: "welfareBtnIcon_json.welfare_btn_FAQ" }
            ];
            return TypeWelfare;
        }());
        welfare.TypeWelfare = TypeWelfare;
        __reflect(TypeWelfare.prototype, "dialog.welfare.TypeWelfare");
        var WelfareMain = (function (_super) {
            __extends(WelfareMain, _super);
            function WelfareMain() {
                var _this = _super.call(this) || this;
                _this._labPrompt = Language.C_HDSM + " : ";
                _this._requstCodeTime = 0;
                return _this;
            }
            WelfareMain.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            WelfareMain.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.welPaging.setPage(TypeWelfare.getDataList());
                this.welPaging.listPaging.validateNow();
                this.registerWarn();
                this._gameBookBtnArr = [this.btn0, this.btn1, this.btn2, this.btn3, this.btn4];
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._rwards = [this.reward0, this.reward1, this.reward2, this.reward3];
                // ENTER_FRAME 比 RENDER慢一针
                // this.listPaging.once(egret.Event.ENTER_FRAME,this.reqisterWarn,this);
            };
            WelfareMain.prototype.enter = function (data) {
                var _this = this;
                this.welPaging.visible = false;
                GameModels.sgActivity.requestSGRunningActivitys(utils.Handler.create(this, function () {
                    _this.setActivityType();
                    mg.soundManager.playViewLongSound("SoundJM_6", "WELFAR");
                    _this.correctingPage();
                    var index = data && data.hasOwnProperty("parms") ? data.parms : 0;
                    var index1 = data && data.hasOwnProperty("param") ? data.param : 0;
                    _this._gameBookType = index1 ? index1 : 0;
                    var index2 = data && data.hasOwnProperty("param1") ? data.param1 : 0;
                    _this._gameBookPetType = index2 ? index2 : 0;
                    if (!GameModels.platform.isPay) {
                        if (TypeWelfare.removeTypeByName("logReward")) {
                            _this.welPaging.setPage(TypeWelfare.getDataList());
                            _this.welPaging.listPaging.validateNow();
                            _this.registerWarn();
                        }
                        if (TypeWelfare.removeTypeByName("fund")) {
                            _this.welPaging.setPage(TypeWelfare.getDataList());
                            _this.welPaging.listPaging.validateNow();
                            _this.registerWarn();
                        }
                    }
                    _this.welPaging.itemClickCallBack(utils.Handler.create(_this, _this.changeState));
                    _this.welPaging.selectedTab(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                    _this.updateState();
                    _this.welPaging.visible = true;
                    egret.Tween.removeTweens(_this.welPaging.scroller.viewport);
                    // var maxScrollH = this.welPaging.listPaging.contentWidth - this.scroller.width;
                    _this.welPaging.scroller.viewport.scrollH = -500;
                    egret.Tween.get(_this.welPaging.scroller.viewport).to({ scrollH: 0 }, 1000, utils.Ease.expoOut);
                }));
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.refreshLogionAcitiveData, this);
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.refreshGradeAcitiveData, this);
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showAcivity, this);
                this.btn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameBookClick, this);
                this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameBookClick, this);
                this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameBookClick, this);
                this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameBookClick, this);
                this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameBookClick, this);
                this.gameBookList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameBookListClick, this);
                this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAcitityClick, this);
                this.btnYuLan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAcitityClick, this);
                this.btnDuiHuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDuiHuanClick, this);
                GameModels.bag.onItemChange(ConfigData.ZHENGSHOU_DUIHUAN, this, this.showZhengshou);
                // GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                this.listActivity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.fundList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listClick, this);
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showChengZhangFundView, this);
                this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            };
            WelfareMain.prototype.setActivityType = function () {
                var activity_103 = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_103);
                var activity_104 = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_104);
                var activity_105 = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_105);
                var activity_106 = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_106);
                var name = "";
                var icon = "";
                if (activity_103) {
                    name = game.sgActivityType.getName(game.sgActivityType.activity_103);
                    icon = game.sgActivityType.getIcon(game.sgActivityType.activity_103);
                    this._currAcivity = activity_103;
                    this._currRankAcivity = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_303);
                    logger.log("存在强征活动");
                }
                if (activity_104) {
                    name = game.sgActivityType.getName(game.sgActivityType.activity_104);
                    icon = game.sgActivityType.getIcon(game.sgActivityType.activity_104);
                    this._currAcivity = activity_104;
                    this._currRankAcivity = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_304);
                    logger.log("存在天梯活动");
                }
                if (activity_105) {
                    name = game.sgActivityType.getName(game.sgActivityType.activity_105);
                    icon = game.sgActivityType.getIcon(game.sgActivityType.activity_105);
                    this._currAcivity = activity_105;
                    this._currRankAcivity = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_305);
                    logger.log("存在圣旨活动");
                }
                if (activity_106) {
                    name = game.sgActivityType.getName(game.sgActivityType.activity_106);
                    icon = game.sgActivityType.getIcon(game.sgActivityType.activity_106);
                    this._currAcivity = activity_106;
                    this._currRankAcivity = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_306);
                    logger.log("存在副本活动");
                }
                if (name && icon) {
                    TypeWelfare.setNameByState("activity", name);
                    TypeWelfare.setIconImageByState("activity", icon);
                    this.imgActivityBg.source = "img_welfare_act_bg_" + this._currAcivity.actType + "_jpg";
                    this.welPaging.setPage(TypeWelfare.getDataList());
                    this.welPaging.listPaging.validateNow();
                    this.registerWarn();
                }
            };
            WelfareMain.prototype.exit = function () {
                for (var i = 0; i < this._rwards.length; i++) {
                    this._rwards[i].dataSource = null;
                }
                this.reset();
                egret.Tween.removeTweens(this);
                egret.Tween.removeTweens(this.$children);
                egret.Tween.removeTweens(this.welPaging.scroller.viewport);
                this.welPaging.removeTween();
                utils.timer.clearAll(this);
                this.btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.requstCode, this);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.refreshLogionAcitiveData, this);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.refreshGradeAcitiveData, this);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showAcivity, this);
                this.btn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameBookClick, this);
                this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameBookClick, this);
                this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameBookClick, this);
                this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameBookClick, this);
                this.btn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameBookClick, this);
                this.gameBookList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameBookListClick, this);
                this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAcitityClick, this);
                this.btnYuLan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAcitityClick, this);
                this.btnDuiHuan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDuiHuanClick, this);
                GameModels.bag.offItemChange(ConfigData.ZHENGSHOU_DUIHUAN, this, this.showZhengshou);
                // GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                this.listActivity.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.fundList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listClick, this);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showChengZhangFundView, this);
            };
            WelfareMain.prototype.onDuiHuanClick = function () {
                mg.alertManager.showAlert(WelfareZhengShouShopAlert, true, true);
            };
            WelfareMain.prototype.onAcitityClick = function (evt) {
                if (!this._currRankAcivity) {
                    logger.log("活动未开启");
                    return;
                }
                if (evt.currentTarget == this.btnRank) {
                    mg.alertManager.showAlert(WelfareActivityRankAlert, true, true, this._currRankAcivity);
                }
                else {
                    mg.alertManager.showAlert(WelfareActivityYuLanAlert, true, true, this._currRankAcivity);
                }
            };
            WelfareMain.prototype.reset = function () {
                this.clearList(this.listLog);
                this.clearList(this.listGrade);
                this.clearList(this.listActivity);
            };
            WelfareMain.prototype.registerWarn = function () {
                //三种得到形式 getVirtualElementAt，getElementAt，getChildAt
                this.pageRegisterWarnTarget("logReward", GameRedState.WELFARE_SEVENDAY);
                this.pageRegisterWarnTarget("upReward", GameRedState.WELFARE_UPREWARD);
                this.pageRegisterWarnTarget("activity", GameRedState.WELFARE_ACITIVITY);
                this.pageRegisterWarnTarget("fund", GameRedState.WELFARE_FUND);
                // this.pageRegisterWarnTarget(TypeWelfare.kefu, GameRedState.WELFARE_VIPKEFU);
            };
            WelfareMain.prototype.pageRegisterWarnTarget = function (typeWelfare, redType) {
                var index = TypeWelfare.getIndexByState(typeWelfare);
                var length = this.welPaging.listPaging.numChildren;
                if (index != -1 && index < length) {
                    GameModels.state.unRegisterWarnTarget(redType);
                    GameModels.state.registerWarnTarget(redType, this.welPaging.listPaging.getChildAt(index)["imgRed"]);
                }
                else
                    GameModels.state.unRegisterWarnTarget(redType);
            };
            WelfareMain.prototype.updateState = function () {
                GameModels.state.updateState(GameRedState.WELFARE_SEVENDAY);
                GameModels.state.updateState(GameRedState.WELFARE_UPREWARD);
                GameModels.state.updateState(GameRedState.WELFARE_ACITIVITY);
                GameModels.state.updateState(GameRedState.WELFARE_FUND);
                // GameModels.state.updateState(GameRedState.WELFARE_VIPKEFU);
            };
            /**关闭已结束页签 */
            WelfareMain.prototype.correctingPage = function () {
                this.closeLoginPage();
                this.closeUpRewardPage();
                this.closeVipPage();
                this.closeActivityPage();
                this.closeZhengShouPage();
                this.closeChengZhangFundPage();
            };
            /**检测关闭累计登陆页签 */
            WelfareMain.prototype.closeLoginPage = function () {
                if (GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.ljdl))
                    return;
                if (!TypeWelfare.removeTypeByName("logReward"))
                    return;
                this.welPaging.setPage(TypeWelfare.getDataList());
                this.welPaging.listPaging.validateNow();
                this.registerWarn();
            };
            /**检测关闭冲级奖励页签 */
            WelfareMain.prototype.closeUpRewardPage = function () {
                if (GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.cjjl))
                    return;
                if (!TypeWelfare.removeTypeByName("upReward"))
                    return;
                this.welPaging.setPage(TypeWelfare.getDataList());
                this.welPaging.listPaging.validateNow();
                this.registerWarn();
            };
            /**检测关闭Vip贵宾页签 */
            WelfareMain.prototype.closeVipPage = function () {
                // var vipLevel: number = GameModels.user.player.getProperty(TypeProperty.VIP_LEVEL) || 0;
                // if (platform.sdk && platform.sdk.type == platform.TW && vipLevel >= 7) return;
                // if (!TypeWelfare.removeTypeByName(TypeWelfare.kefu)) return;
                // this.welPaging.setPage(TypeWelfare.getDataList());
                // this.welPaging.listPaging.validateNow();
                // this.registerWarn();
            };
            /**检测关闭活动竞技页签 */
            WelfareMain.prototype.closeActivityPage = function () {
                if (this._currAcivity)
                    return;
                if (!TypeWelfare.removeTypeByName("activity"))
                    return;
                this.welPaging.setPage(TypeWelfare.getDataList());
                this.welPaging.listPaging.validateNow();
                this.registerWarn();
            };
            /**检测关闭活动征收页签 */
            WelfareMain.prototype.closeZhengShouPage = function () {
                var qzdh = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.qzdh);
                var qzdl = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.qzdl);
                if (qzdh && qzdl)
                    return;
                if (!TypeWelfare.removeTypeByName("zhengshou"))
                    return;
                this.welPaging.setPage(TypeWelfare.getDataList());
                this.welPaging.listPaging.validateNow();
                this.registerWarn();
            };
            /**检测关闭成长页签 */
            WelfareMain.prototype.closeChengZhangFundPage = function () {
                var czjjrmb = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.czjjrmb);
                if (czjjrmb)
                    return;
                if (!TypeWelfare.removeTypeByName("fund"))
                    return;
                this.welPaging.setPage(TypeWelfare.getDataList());
                this.welPaging.listPaging.validateNow();
                this.registerWarn();
            };
            WelfareMain.prototype.changeState = function (index) {
                mg.soundManager.playSound('ButtonClick_1');
                this.currentState = TypeWelfare.getStateByIndex(index);
                this.welPaging.itemClickCallBack(utils.Handler.create(this, this.changeState));
                switch (this.currentState) {
                    case "logReward":
                        this.setLogAcitiveData();
                        break;
                    case "upReward":
                        this.setGradeAcitiveData();
                        break;
                    case "code":
                        this.setCodeData();
                        break;
                    case "notice":
                        this.setNoticeData();
                        break;
                    case "faq":
                        this.setFaqData();
                        break;
                    case "kefu":
                        GameModels.welfare.setKefuClick(true);
                        break;
                    case "book":
                        this.setGameBook();
                        break;
                    case "activity":
                        this.showAcivity();
                        break;
                    case "zhengshou":
                        this.showZhengshou();
                        break;
                    case "grwoup":
                        break;
                    case "fund":
                        this.showChengZhangFundView();
                        break;
                }
            };
            WelfareMain.prototype.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
            };
            WelfareMain.prototype.showZhengshou = function () {
                var strArr = GameModels.dataSet.getDataSettingValueById(750001).split(";");
                for (var i = 0; i < this._rwards.length; i++) {
                    this._rwards[i].dataSource = strArr[i];
                }
                var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.ZHENGSHOU_DUIHUAN);
                this.labMyValue.text = item.name + ":" + GameModels.bag.getItemCountById(ConfigData.ZHENGSHOU_DUIHUAN);
                this.icon.source = item.icon;
                var qzdl = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.qzdl);
                if (qzdl) {
                    logger.log("当前时间===", utils.DateUtil.formatDateInChinese(new Date(GameModels.timer.getTimer()), false));
                    logger.log("征收活动结束时间===", utils.DateUtil.formatDateInChinese(new Date(qzdl.endTime * 1000), false));
                    if (GameModels.timer.getTimer() < qzdl.endTime * 1000) {
                        this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(qzdl.endTime * 1000), false);
                    }
                    else {
                        this.labDate.text = Language.J_HDYJJS;
                    }
                }
                else {
                    this.labDate.text = Language.J_HDYJJS;
                }
            };
            WelfareMain.prototype.showAcivity = function () {
                if (!this._currAcivity)
                    return;
                var voList = this._currAcivity.actRewardListVOStorState;
                if (voList) {
                    if (!this._listAcivityData) {
                        this._listAcivityData = new eui.ArrayCollection(voList);
                    }
                    else {
                        this._listAcivityData.source = voList;
                    }
                }
                else {
                    if (!this._listAcivityData) {
                        this._listAcivityData = new eui.ArrayCollection([]);
                    }
                    else {
                        this._listAcivityData.source = [];
                    }
                }
                this.listActivity.dataProvider = this._listAcivityData;
                this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(this._currAcivity.endTime * 1000), false);
            };
            WelfareMain.prototype.onBuyClick = function (e) {
                var item = this.listActivity.selectedItem;
                if (e.target instanceof components.SnapButton) {
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    if (item.state == 0) {
                        GameModels.sgActivity.requestSGGetActivityReward(this._currAcivity.actCfgId, item.rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [item.templateRewards]));
                    }
                }
            };
            WelfareMain.prototype.getRewardCallback = function (str) {
                this.showView();
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            WelfareMain.prototype.showView = function () {
                if (this._listAcivityData)
                    this._listAcivityData.replaceAll(this._currAcivity.actRewardListVOStorState);
            };
            WelfareMain.prototype.setLogAcitiveData = function () {
                var data = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.ljdl).getLeijidengluActRewardListVO(0);
                if (data) {
                    if (!this._logRewardData) {
                        this._logRewardData = new eui.ArrayCollection(data);
                    }
                    else {
                        this._logRewardData.source = data;
                    }
                }
                else {
                    if (!this._logRewardData) {
                        this._logRewardData = new eui.ArrayCollection([]);
                    }
                    else {
                        this._logRewardData.source = [];
                    }
                }
                this.listLog.dataProvider = this._logRewardData;
            };
            WelfareMain.prototype.refreshLogionAcitiveData = function () {
                if (this._logRewardData)
                    this._logRewardData.replaceAll(GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.ljdl).getLeijidengluActRewardListVO(0));
            };
            WelfareMain.prototype.setGradeAcitiveData = function () {
                var data = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.cjjl).actRewardListVOStorState;
                if (data) {
                    if (!this._gradeRewardData) {
                        this._gradeRewardData = new eui.ArrayCollection(data);
                    }
                    else {
                        this._gradeRewardData.source = data;
                    }
                }
                else {
                    if (!this._gradeRewardData) {
                        this._gradeRewardData = new eui.ArrayCollection([]);
                    }
                    else {
                        this._gradeRewardData.source = [];
                    }
                }
                this.listGrade.dataProvider = this._gradeRewardData;
            };
            WelfareMain.prototype.refreshGradeAcitiveData = function () {
                if (this._gradeRewardData)
                    this._gradeRewardData.replaceAll(GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.cjjl).actRewardListVOStorState);
            };
            //初始化激活码
            WelfareMain.prototype.setCodeData = function () {
                if (platform.sdk && (platform.sdk.type == platform.NN_ZF || platform.sdk.type == platform.NN_ZF_H5)) {
                    this.imgCodeBack.source = "img_code_back1_jpg";
                }
                else {
                    this.imgCodeBack.source = "img_code_back_jpg";
                }
                this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.requstCode, this);
            };
            WelfareMain.prototype.requstCode = function () {
                if (this._requstCodeTime > 0 && (egret.getTimer() - this._requstCodeTime < 2000))
                    return;
                this._requstCodeTime = 0;
                if (this.inputText.text != "") {
                    this._requstCodeTime = egret.getTimer();
                    GameModels.welfare.requestCodeReward(this.inputText.text, utils.Handler.create(this, function (data) {
                        mg.alertManager.tip(data.msg);
                    }));
                }
                else {
                    mg.alertManager.tip(Language.J_SRWK);
                }
            };
            WelfareMain.prototype.setNoticeData = function () {
                var xhr = new XMLHttpRequest();
                var version = window.config.debug ? "" : GameModels.login.serverList.selected.version;
                xhr.open('GET', version + "/" + game.GameConfig.resource_path + "/notice/" + (platform.sdk ? platform.sdk.type : 'tw') + ".txt?" + window.config.version_notice, true);
                xhr.addEventListener("load", (function () {
                    try {
                        xhr.removeEventListener('load', arguments.callee, false);
                    }
                    catch (e) { }
                    ;
                    this.labContent.textFlow = utils.TextFlowMaker.generateTextFlow(xhr.response);
                }).bind(this));
                xhr.send(null);
            };
            WelfareMain.prototype.setFaqData = function () {
                var strs = GameModels.welfare.faqStrs;
                this.labContent.textFlow = utils.TextFlowMaker.generateTextFlow(strs[0].des);
            };
            WelfareMain.prototype.setGameBook = function () {
                var gameBookTemp = [];
                gameBookTemp = GameModels.gameBook.getGameBookTempBuyType(this._gameBookType + 1);
                if (gameBookTemp) {
                    if (!this._gameBookData) {
                        this._gameBookData = new eui.ArrayCollection(gameBookTemp);
                    }
                    else {
                        this._gameBookData.source = gameBookTemp;
                    }
                }
                this.scroller.validateNow();
                this.changeGameBookClick(this._gameBookType);
                this.gameBookList.dataProvider = this._gameBookData;
                this.imgTitle.source = "welfare_json.img_titleBg_" + this._gameBookType;
            };
            WelfareMain.prototype.onGameBookClick = function (evt) {
                this._gameBookType = this._gameBookBtnArr.indexOf(evt.currentTarget);
                this.setGameBook();
            };
            WelfareMain.prototype.changeGameBookClick = function (index) {
                var btn = this._gameBookBtnArr[index];
                for (var i = 0; i < this._gameBookBtnArr.length; i++) {
                    if (i == index) {
                        this._gameBookBtnArr[i].currentState = "down";
                    }
                    else {
                        this._gameBookBtnArr[i].currentState = "up";
                    }
                }
                this.imgSelecd.x = btn.x;
            };
            WelfareMain.prototype.onGameBookListClick = function (evt) {
                if (evt.target instanceof components.SnapButton) {
                    var item = this.gameBookList.selectedItem;
                    if (item.gameFun == 123 && GameModels.user.player.leijidenglu < 2) {
                        mg.alertManager.tip(Language.J_CRKYDZ, 0XFF0000);
                        return;
                    }
                    mg.uiManager.showByName(item.gameFun);
                }
            };
            WelfareMain.prototype.showChengZhangFundView = function () {
                var czjj = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.czjj);
                var voList = czjj.actRewardListVOStorState;
                if (voList) {
                    if (!this._fundListData) {
                        this._fundListData = new eui.ArrayCollection(voList);
                    }
                    else {
                        this._fundListData.source = voList;
                    }
                }
                else {
                    if (!this._fundListData) {
                        this._fundListData = new eui.ArrayCollection([]);
                    }
                    else {
                        this._fundListData.source = [];
                    }
                }
                this.fundList.dataProvider = this._fundListData;
                var czjjrmb = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.czjjrmb);
                var temRecharge = Templates.getTemplateById(templates.Map.GAMERECHARGE, czjjrmb.actSetTemp.params);
                this.btnBuy.source = "btnMoney_json.btn_sg_chongzhi_" + temRecharge.RMB;
                this.btnBuy.visible = !czjjrmb.hashMyValueStr(czjjrmb.actSetTemp.params);
                this.imgFundBg.visible = !czjjrmb.hashMyValueStr(czjjrmb.actSetTemp.params);
                this.fundScroller.height = czjjrmb.hashMyValueStr(czjjrmb.actSetTemp.params) ? 575 : 454;
                this.fundScroller.validateNow();
            };
            WelfareMain.prototype.listClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (e.target instanceof components.SnapButton) {
                    var czjj = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.czjj);
                    var item = this.fundList.selectedItem;
                    if (item.state == 0) {
                        GameModels.sgActivity.requestSGGetActivityReward(czjj.actCfgId, item.rewardCfgId, 0, utils.Handler.create(this, this.getFundRewardCallback, [item.templateRewards]));
                    }
                    else if (item.state == 1) {
                        if (GameModels.user.player.level >= item.templateValue) {
                            mg.alertManager.tip(Language.J_GMCZJJHKLQ);
                        }
                    }
                }
            };
            WelfareMain.prototype.getFundRewardCallback = function (str) {
                this.showChengZhangFundView();
                var rewardArr = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
            };
            WelfareMain.prototype.btnClick = function (e) {
                var czjjrmb = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.czjjrmb);
                if (!czjjrmb)
                    return;
                var temRecharge = Templates.getTemplateById(templates.Map.GAMERECHARGE, czjjrmb.actSetTemp.params);
                if (temRecharge)
                    GameModels.platform.buy(temRecharge.RMB, 1, "" + temRecharge.id, temRecharge.name, temRecharge.des);
            };
            return WelfareMain;
        }(ui.WelfareMainSkin));
        welfare.WelfareMain = WelfareMain;
        __reflect(WelfareMain.prototype, "dialog.welfare.WelfareMain");
    })(welfare = dialog.welfare || (dialog.welfare = {}));
})(dialog || (dialog = {}));

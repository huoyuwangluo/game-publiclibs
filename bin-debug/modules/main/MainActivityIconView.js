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
var main;
(function (main) {
    var MainActivityIconView = (function (_super) {
        __extends(MainActivityIconView, _super);
        function MainActivityIconView() {
            var _this = _super.call(this) || this;
            _this._iconVisible = true;
            _this._imgY = [95, 180, 260, 335, 415, 495];
            /**时间追赶礼包 */
            _this._timePickGiftTime = 0;
            return _this;
        }
        MainActivityIconView.prototype.init = function () {
            this._parent = this.parent;
            var index = this.getChildIndex(this.btnHideIcon);
            this._vBox = new main.TileBox();
            this._vBox.isVertical = true;
            this._vBox.padding = 0;
            this.addChild(this._vBox);
            this._vBox.x = this.leftGroup.x;
            this._vBox.y = this.leftGroup.y;
            this._hBox = new main.TileBox();
            this._hBox.padding = 0;
            this._hBox.isVertical = false;
            this.addChild(this._hBox);
            this._hBox.x = this.rightGroup.x;
            this._hBox.y = this.rightGroup.y;
            this._hBoxTwo = new main.TileBox();
            this._hBoxTwo.padding = 0;
            this._hBoxTwo.isVertical = false;
            this.addChild(this._hBoxTwo);
            this._hBoxTwo.x = this.rightGroup1.x;
            this._hBoxTwo.y = this.rightGroup1.y;
            this._hBoxThree = new main.TileBox();
            this._hBoxThree.padding = 0;
            this._hBoxThree.isVertical = false;
            this.addChild(this._hBoxThree);
            this._hBoxThree.x = this.rightGroup2.x;
            this._hBoxThree.y = this.rightGroup2.y;
            this._hBoxFour = new main.TileBox();
            this._hBoxFour.padding = 0;
            this._hBoxFour.isVertical = false;
            this.addChild(this._hBoxFour);
            this._hBoxFour.x = this.rightGroup3.x;
            this._hBoxFour.y = this.rightGroup3.y;
            this.rightGroup.touchEnabled = false;
            this.rightGroup1.touchEnabled = false;
            this.rightGroup2.touchEnabled = false;
            this.rightGroup3.touchEnabled = false;
            this.leftGroup.touchEnabled = false;
            this.btnShowIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showGroup, this);
            this.btnHideIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideGroup, this);
            this._icons = {};
            this.updateIcon(this.registerIcon(s.UserfaceName.changeShop, this.btnChangeShop, 1, this._hBox, true));
            this.updateIcon(this.registerIcon(s.UserfaceName.mainGongxunShop, this.btnShop, 2, this._hBox, true));
            this.updateIcon(this.registerIcon(s.UserfaceName.welfare, this.btnWelfare, 3, this._hBox, true));
            this.updateIcon(this.registerIcon(s.UserfaceName.sevenDayTask, this.btnSevenDay, 4, this._hBox, true));
            this.updateIcon(this.registerIcon(s.UserfaceName.activityLimit, this.btnSgXianShi1, 5, this._hBox, true));
            this.updateIcon(this.registerIcon(s.UserfaceName.activityLimit1, this.btnSgXianShi2, 6, this._hBox, true));
            this.updateIcon(this.registerIcon(s.UserfaceName.mainTeQuan, this.btnMainTeQuan, 1, this._vBox, true)).effectKey = "6041";
            this.updateIcon(this.registerIcon(s.UserfaceName.oneYuanBuy, this.btnYYQG, 2, this._vBox, true)).effectKey = "6041";
            this.updateIcon(this.registerIcon(s.UserfaceName.mainZhanLing, this.btnZhanLing, 3, this._vBox, true)).effectKey = "6041";
            this.updateIcon(this.registerIcon(s.UserfaceName.zhuanshuTeQuan, this.btnZhuanShuTeQuan, 4, this._vBox, true)).effectKey = "6041";
            this.updateIcon(this.registerIcon(s.UserfaceName.sgDaily, this.btnActivity, 5, this._vBox, true)).effectKey = "6041";
            this.updateIcon(this.registerIcon(s.UserfaceName.firstRecharge, this.btnFirstRecharge, 6, this._vBox, true)).effectKey = "6041";
            // this.updateIcon(this.registerIcon(s.UserfaceName.crossServer, this.btnCrossbattle, 2, this._hBoxTwo, true));
            // this.updateIcon(this.registerIcon(s.UserfaceName.peaksBattle, this.btnPeaksBattle, 3, this._hBoxTwo, true));
            // this.updateIcon(this.registerIcon(s.UserfaceName.peaksBattleCross, this.btnPeaksBattleCross, 4, this._hBoxTwo, true));
            this.updateIcon(this.registerIcon(s.UserfaceName.kingwar, this.btnCamp0, 1, this._hBoxTwo, true)).effectKey = "6041";
            this.updateIcon(this.registerIcon(s.UserfaceName.xianshiGift, this.btnXianShi, 2, this._hBoxTwo, true)).effectKey = "6041";
            this.updateIcon(this.registerIcon(s.UserfaceName.juebanGift, this.btnJueBan, 3, this._hBoxTwo, true)).effectKey = "6041";
            this.updateIcon(this.registerIcon(s.UserfaceName.timePickGift, this.btntimePiak, 5, this._hBoxTwo, true)).effectKey = "6041";
            this.updateIcon(this.registerIcon(s.UserfaceName.activitysumme, this.btnSummer, 6, this._hBoxTwo, true)).effectKey = "6041";
            this.updateIcon(this.registerIcon(s.UserfaceName.campBattleMain, this.btnCamp, 1, this._hBoxThree, true));
            GameModels.state.registerWarnTarget(GameRedState.INTEGRALSHOP, this.btnChangeShop);
            GameModels.state.registerWarnTarget(GameRedState.XIANSHI_GIFT, this.btnXianShi);
            GameModels.state.registerWarnTarget(GameRedState.JUEBAN_GIFT, this.btnJueBan);
            GameModels.state.registerWarnTarget(GameRedState.MAIN_ZHANLING, this.btnZhanLing);
            GameModels.state.registerWarnTarget(GameRedState.WELFARE, this.btnWelfare);
            GameModels.state.registerWarnTarget(GameRedState.FIRSTRECHARGE, this.btnFirstRecharge);
            GameModels.state.registerWarnTarget(GameRedState.DAILY_ACTIVITY, this.btnActivity);
            GameModels.state.registerWarnTarget(GameRedState.OPENSERVER_ACTIVITY_ZHUANSHUTEQUAN, this.btnZhuanShuTeQuan);
            GameModels.state.registerWarnTarget(GameRedState.ONEYUANBUY, this.btnYYQG);
            GameModels.state.registerWarnTarget(GameRedState.SHOP, this.btnShop);
            GameModels.state.registerWarnTarget(GameRedState.SPECAICARD, this.btnMainTeQuan);
            GameModels.state.registerWarnTarget(GameRedState.MAIN_UNION_WANFA_CAMPBATTLE, this.btnCamp);
            GameModels.state.registerWarnTarget(GameRedState.KING_WAR, this.btnCamp0);
            GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY, this.btnSummer);
            GameModels.state.registerWarnTarget(GameRedState.TIMEPICK_GIFT, this.btntimePiak);
            GameModels.state.registerWarnTarget(GameRedState.MAIN_SEVENDAY, this.btnSevenDay);
            GameModels.state.registerWarnTarget(GameRedState.LIMIT1, this.btnSgXianShi1);
            GameModels.state.registerWarnTarget(GameRedState.LIMIT2, this.btnSgXianShi2);
            this.updateIconEffects(true);
            this.btnWelfare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnActivity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnZhuanShuTeQuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnFirstRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            //this.imgFirstRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnYYQG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnCamp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnCamp0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            // this.btnCrossbattle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            // this.btnPeaksBattle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            // this.btnPeaksBattleCross.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnChangeShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnMainTeQuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnSummer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnZhanLing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnXianShi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnJueBan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btntimePiak.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnSevenDay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnSgXianShi1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnSgXianShi2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.updateFirstRecharge();
            // if (this.imgFirstRecharge.parent) {
            // 	this.imgFirstRecharge.parent.removeChild(this.imgFirstRecharge);
            // }
            // this.updateCrossServer();
            // this.updatePeaksBattle();
            // this.updatePeaksBattleCross();
            this.updateMainTeQuan();
            this.updateSevenDayTask();
            this.updateZhuanShuTeQuan();
            this.updateOneYuanBuy();
            this.updateCampBattleNotice();
            this.updataSummer();
            this.updataNotifyGift();
            this.upDataTimePickGift();
            this.upDataActivity();
            this.upDataXianShiActivity();
            this.upDataXianShiActivity1();
            GameModels.user.player.onPropertyChange(TypeProperty.Level, this, this.levelChangeHandler);
            //GameModels.peaksBattle.addEventListener(mo.ModelPeaksBattle.UPDATE_INFO, this.updatePeaksBattle, this);
            //GameModels.peaksBattleCross.addEventListener(mo.ModelPeaksBattleCross.UPDATE_INFO, this.updatePeaksBattleCross, this);
            //GameModels.serverTime.addEventListener(mo.ModelServerTime.CROSS_DAY_EVENT, this.crossDayEventHandler, this);
            GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.updateFirstRecharge, this);
            GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.upDataXianShiActivity, this);
            GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.upDataXianShiActivity1, this);
            GameModels.user.player.onPropertyChange(TypeProperty.TOTAL_FIRST_RECHARGE, this, this.updateFirstRecharge);
            GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.updateZhuanShuTeQuan, this);
            GameModels.user.player.onPropertyChange(TypeProperty.VIP_LEVEL, this, this.updateZhuanShuTeQuan);
            GameModels.user.player.onPropertyChange(TypeProperty.VIP_LEVEL, this, this.updateMainTeQuan);
            GameModels.user.player.onPropertyChange(TypeProperty.VIP_LEVEL, this, this.upDataTimePickGift);
            GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.updateOneYuanBuy, this);
            GameModels.activityNotice.addEventListener(mo.ModelActivityNotice.ACTIVITY_NOTICE_UPDATA, this.updateCampBattleNotice, this);
            GameModels.campBattle.addEventListener(mo.ModelCampBattle.CAMPBATTLE_UPDATA, this.updateCampBattleNotice, this);
            if (GameModels.task.curTask)
                GameModels.task.curTask.addEventListener(egret.Event.CHANGE, this.initFun, this);
            GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_SUMMER_OPEN, this.updataSummer, this);
            GameModels.common.addEventListener(mo.ModelCommon.CHANGE_TIMEPICKGIFT_INFO, this.upDataTimePickGift, this);
            GameModels.notifyGift.addEventListener(mo.ModelNotifyGift.INIT_GIFT_INFO, this.updataNotifyGift, this);
            GameModels.notifyGift.addEventListener(mo.ModelNotifyGift.CHANGE_GIFT_INFO, this.updataNotifyGift, this);
            GameModels.sevenDayTask.addEventListener(mo.ModelSevenDayTask.CHANGE_TASK_INFO, this.updateSevenDayTask, this);
            game.state.onState(TypeSetting.OPEN_MODELS, this, this.levelChangeHandler);
        };
        MainActivityIconView.prototype.updateIconEffects = function (enabled) {
            var tileBoxItem;
            tileBoxItem = this.reciveIcon(this.btnActivity);
            if (tileBoxItem && tileBoxItem.visible && tileBoxItem.parent)
                tileBoxItem.effectEnabled = enabled;
            tileBoxItem = this.reciveIcon(this.btnZhuanShuTeQuan);
            if (tileBoxItem && tileBoxItem.visible && tileBoxItem.parent)
                tileBoxItem.effectEnabled = enabled;
            tileBoxItem = this.reciveIcon(this.btnFirstRecharge);
            if (tileBoxItem && tileBoxItem.visible && tileBoxItem.parent)
                tileBoxItem.effectEnabled = enabled;
            tileBoxItem = this.reciveIcon(this.btnYYQG);
            if (tileBoxItem && tileBoxItem.visible && tileBoxItem.parent)
                tileBoxItem.effectEnabled = enabled;
            tileBoxItem = this.reciveIcon(this.btnMainTeQuan);
            if (tileBoxItem && tileBoxItem.visible && tileBoxItem.parent)
                tileBoxItem.effectEnabled = enabled;
            tileBoxItem = this.reciveIcon(this.btnSummer);
            if (tileBoxItem && tileBoxItem.visible && tileBoxItem.parent)
                tileBoxItem.effectEnabled = enabled;
            tileBoxItem = this.reciveIcon(this.btnXianShi);
            if (tileBoxItem && tileBoxItem.visible && tileBoxItem.parent)
                tileBoxItem.effectEnabled = enabled;
            tileBoxItem = this.reciveIcon(this.btnJueBan);
            if (tileBoxItem && tileBoxItem.visible && tileBoxItem.parent)
                tileBoxItem.effectEnabled = enabled;
            tileBoxItem = this.reciveIcon(this.btnCamp0);
            if (tileBoxItem && tileBoxItem.visible && tileBoxItem.parent)
                tileBoxItem.effectEnabled = enabled;
        };
        MainActivityIconView.prototype.add = function () {
            this.updateIconEffects(true);
            if (!this.parent) {
                this._parent.addChild(this);
            }
        };
        MainActivityIconView.prototype.remove = function () {
            this.updateIconEffects(false);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        MainActivityIconView.prototype.initFun = function () {
            this.updateAllIcons();
            this.updateFirstRecharge();
            this.updateZhuanShuTeQuan();
            this.updateOneYuanBuy();
            this.updateMainTeQuan();
            this.updateSevenDayTask();
            // this.updateCrossServer();
            // this.updatePeaksBattle();
            // this.updatePeaksBattleCross();
            this.updateCampBattleNotice();
            this.updataSummer();
            this.updataNotifyGift();
            this.upDataTimePickGift();
            this.upDataActivity();
            this.upDataXianShiActivity();
            this.upDataXianShiActivity1();
            // if (GameModels.user.player.level == 20 && !mg.uiManager.isOpen(dialog.welfare.WelfareMain)) {
            // 	mg.uiManager.show(dialog.welfare.WelfareMain, { tabIndex: 4 });
            // }
        };
        MainActivityIconView.prototype.upDataXianShiActivity = function () {
            if (!GameModels.platform.isPay) {
                this.removeIcon(this.reciveIcon(this.btnSgXianShi1));
                return;
            }
            if (GameModels.sgActivity.limitActListVO.length > 0) {
                this.updateIcon(this.reciveIcon(this.btnSgXianShi1));
            }
            else {
                this.removeIcon(this.reciveIcon(this.btnSgXianShi1));
            }
        };
        MainActivityIconView.prototype.upDataXianShiActivity1 = function () {
            if (!GameModels.platform.isPay) {
                this.removeIcon(this.reciveIcon(this.btnSgXianShi2));
                return;
            }
            var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act5);
            if (vo) {
                if (vo.actCfgId == 81101 || vo.actCfgId == 81102) {
                    this.btnSgXianShi2.imageSource = "uiMain_activityIcon_json.main_icon_limit1_1";
                }
                else {
                    this.btnSgXianShi2.imageSource = "uiMain_activityIcon_json.main_icon_limit1_2";
                }
                this.updateIcon(this.reciveIcon(this.btnSgXianShi2));
            }
            else {
                this.removeIcon(this.reciveIcon(this.btnSgXianShi2));
            }
        };
        MainActivityIconView.prototype.upDataActivity = function () {
            if (!GameModels.platform.isPay) {
                this.removeIcon(this.reciveIcon(this.btnActivity));
            }
        };
        MainActivityIconView.prototype.levelChangeHandler = function () {
            this.initFun();
            this.updataCZJJView();
            //this.updateFirstRechargeBg();
        };
        /**成长基金120/160/200/240/280/300 */
        MainActivityIconView.prototype.updataCZJJView = function () {
            if (!GameModels.platform.isPay) {
                return;
            }
            var level = GameModels.user.player.level;
            if (level == 120 || level == 160 || level == 200 || level == 240 || level == 280 || level == 300) {
                var index = 3;
                var qzdh = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.qzdh);
                var qzdl = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.qzdl);
                if (qzdh || qzdl) {
                    index = 4;
                }
                mg.uiManager.show(dialog.welfare.WelfareMain, { tabIndex: index });
            }
        };
        MainActivityIconView.prototype.updataNotifyGift = function () {
            if (!GameModels.platform.isPay) {
                this.removeIcon(this.reciveIcon(this.btnXianShi));
                this.removeIcon(this.reciveIcon(this.btnJueBan));
                return;
            }
            if (GameModels.notifyGift.getNotifyGiftVoArrByType(1).length <= 0) {
                this.removeIcon(this.reciveIcon(this.btnXianShi));
            }
            else {
                this.updateIcon(this.reciveIcon(this.btnXianShi)).effectEnabled = true;
            }
            if (GameModels.notifyGift.getNotifyGiftVoArrByType(2).length <= 0) {
                this.removeIcon(this.reciveIcon(this.btnJueBan));
            }
            else {
                this.updateIcon(this.reciveIcon(this.btnJueBan)).effectEnabled = true;
            }
        };
        MainActivityIconView.prototype.updataSummer = function () {
            if (GameModels.activitySummer.summerActivityTemplates.length <= 0) {
                this.removeIcon(this.reciveIcon(this.btnSummer));
            }
            else {
                this.updateIcon(this.reciveIcon(this.btnSummer));
            }
        };
        MainActivityIconView.prototype.updateCampBattleNotice = function () {
            if (this.imgNoticeBg.parent) {
                this.imgNoticeBg.parent.removeChild(this.imgNoticeBg);
            }
            utils.timer.clear(this, this.campBattleTimerHandler);
            this.removeIcon(this.reciveIcon(this.btnCamp));
            if (GameModels.user.player.legionId && GameModels.user.player.level >= 55) {
                if (GameModels.activityNotice.selfcampBattleActivityId.length > 0) {
                    if (!GameModels.activityNotice.isEndselfcampBattle || GameModels.campBattle.canJoin) {
                        if (GameModels.user.player.level == 55 || (GameModels.campBattle.isJoinBattle() && !GameModels.campBattle.isCampBattleView)) {
                            this.addChild(this.imgNoticeBg);
                            utils.timer.once(5000, this, function () {
                                if (this.imgNoticeBg.parent) {
                                    this.imgNoticeBg.parent.removeChild(this.imgNoticeBg);
                                }
                            });
                        }
                        if (GameModels.activityNotice.selfcampBattleBegian) {
                            this._beginTime = GameModels.activityNotice.endLongselfcampBattleTime;
                            //this.btnCamp.text = Language.getExpression(Language.E_1HJS, utils.DateUtil.formatTimeLeft(this._beginTime));
                            this.btnCamp.text = Language.J_HDJXZ;
                            var lab = this.btnCamp.getChildAt(1);
                            lab.textColor = TypeColor.GOLDEN;
                        }
                        else {
                            this._beginTime = GameModels.activityNotice.endSamllselfcampBattleTime - GameModels.timer.getPastSecond();
                            this.btnCamp.text = Language.getExpression(Language.E_1HKQ, utils.DateUtil.formatTimeLeft(this._beginTime));
                            var lab = this.btnCamp.getChildAt(1);
                            lab.textColor = 0x77F207;
                        }
                        if (this._beginTime > 0) {
                            utils.timer.loop(1000, this, this.campBattleTimerHandler);
                        }
                        this.updateIcon(this.reciveIcon(this.btnCamp));
                    }
                }
                else {
                    if (GameModels.user.player.level == 55) {
                        this.addChild(this.imgNoticeBg);
                        utils.timer.once(5000, this, function () {
                            if (this.imgNoticeBg.parent) {
                                this.imgNoticeBg.parent.removeChild(this.imgNoticeBg);
                            }
                        });
                        this.btnCamp.text = "";
                        this.updateIcon(this.reciveIcon(this.btnCamp));
                    }
                }
            }
        };
        MainActivityIconView.prototype.campBattleTimerHandler = function () {
            this._beginTime--;
            if (this._beginTime <= 0) {
                this._beginTime = 0;
                utils.timer.clear(this, this.campBattleTimerHandler);
                return;
            }
            if (GameModels.activityNotice.selfcampBattleBegian) {
                //this.btnCamp.text = Language.getExpression(Language.E_1HJS, utils.DateUtil.formatTimeLeft(this._beginTime));
                this.btnCamp.text = Language.J_HDJXZ;
            }
            else {
                this.btnCamp.text = Language.getExpression(Language.E_1HKQ, utils.DateUtil.formatTimeLeft(this._beginTime));
            }
        };
        MainActivityIconView.prototype.updateMainTeQuan = function () {
            if (!GameModels.platform.isPay) {
                this.removeIcon(this.reciveIcon(this.btnMainTeQuan));
                return;
            }
            if (TypeFunOpen.checkFuncOpen(s.UserfaceName.vipTeQuan, 1)) {
                this.updateIcon(this.reciveIcon(this.btnMainTeQuan)).effectEnabled = true;
            }
            else {
                this.removeIcon(this.reciveIcon(this.btnMainTeQuan));
            }
        };
        MainActivityIconView.prototype.updateSevenDayTask = function () {
            if (!GameModels.platform.isPay) {
                this.removeIcon(this.reciveIcon(this.btnSevenDay));
                return;
            }
            var taskInfo = GameModels.sevenDayTask.sevenDayList;
            if (TypeFunOpen.checkFuncOpen(s.UserfaceName.sevenDayTask) && taskInfo.length > 0) {
                this.updateIcon(this.reciveIcon(this.btnSevenDay));
            }
            else {
                this.removeIcon(this.reciveIcon(this.btnSevenDay));
            }
        };
        MainActivityIconView.prototype.updateOneYuanBuy = function () {
            if (!GameModels.platform.isPay) {
                this.removeIcon(this.reciveIcon(this.btnYYQG));
                this.removeIcon(this.reciveIcon(this.btnZhanLing));
                return;
            }
            this.removeIcon(this.reciveIcon(this.btnZhanLing));
            var voYYQG = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.yyqg);
            if (!voYYQG) {
                this.removeIcon(this.reciveIcon(this.btnYYQG));
                if (GameModels.user.player.legionId) {
                    this.updateIcon(this.reciveIcon(this.btnZhanLing)).effectEnabled = true;
                }
            }
            else {
                if (voYYQG.hashYYQGAndMRCZReceive) {
                    this.removeIcon(this.reciveIcon(this.btnYYQG));
                    if (GameModels.user.player.legionId) {
                        this.updateIcon(this.reciveIcon(this.btnZhanLing)).effectEnabled = true;
                    }
                }
                else {
                    var qArr = voYYQG.actRewardListVO;
                    for (var i = 0; i < qArr.length; i++) {
                        if (qArr[i].getTimes <= 0) {
                            this.btnYYQG.imageSource = "uiMain_activityIcon_json.main_icon_yyqg_" + i;
                            break;
                        }
                    }
                    this.updateIcon(this.reciveIcon(this.btnYYQG)).effectEnabled = true;
                }
            }
        };
        /**专属特权活动 */
        MainActivityIconView.prototype.updateZhuanShuTeQuan = function () {
            if (!GameModels.platform.isPay) {
                this.removeIcon(this.reciveIcon(this.btnZhuanShuTeQuan));
                return;
            }
            var vo1 = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.zstq1);
            var vo2 = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.zstq2);
            var vo3 = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.zstq3);
            if (GameModels.user.player.vip >= 1) {
                if ((vo1 && vo1.hashFirstRechargeReceive) || (vo2 && vo2.hashFirstRechargeReceive) || (vo3 && vo3.hashFirstRechargeReceive)) {
                    this.updateIcon(this.reciveIcon(this.btnZhuanShuTeQuan)).effectEnabled = true;
                }
                else {
                    this.removeIcon(this.reciveIcon(this.btnZhuanShuTeQuan));
                }
            }
            else {
                this.removeIcon(this.reciveIcon(this.btnZhuanShuTeQuan));
            }
        };
        MainActivityIconView.prototype.updateCrossServer = function () {
            // if (GameModels.serverTime.isOpenCrossServer()) {
            // 	this.updateIcon(this.reciveIcon(this.btnCrossbattle));
            // } else {
            // 	this.removeIcon(this.reciveIcon(this.btnCrossbattle));
            // }
        };
        MainActivityIconView.prototype.updatePeaksBattle = function () {
            // GameModels.peaksBattleCross.requestPeaksBattleState(utils.Handler.create(this, function (isCross: boolean) {
            // 	if (!isCross) {
            // 		if (GameModels.peaksBattle.checkPeaksBattleIsOpen()) {
            // 			this.updateIcon(this.reciveIcon(this.btnPeaksBattle));
            // 		} else {
            // 			this.removeIcon(this.reciveIcon(this.btnPeaksBattle));
            // 		}
            // 	} else {
            // 		this.removeIcon(this.reciveIcon(this.btnPeaksBattle));
            // 	}
            // }));
        };
        MainActivityIconView.prototype.updatePeaksBattleCross = function () {
            // GameModels.peaksBattleCross.requestPeaksBattleState(utils.Handler.create(this, function (isCross: boolean) {
            // 	if (isCross) {
            // 		if (GameModels.peaksBattleCross.checkPeaksBattleIsOpen()) {
            // 			this.updateIcon(this.reciveIcon(this.btnPeaksBattleCross));
            // 		} else {
            // 			this.removeIcon(this.reciveIcon(this.btnPeaksBattleCross));
            // 		}
            // 	} else {
            // 		this.removeIcon(this.reciveIcon(this.btnPeaksBattleCross));
            // 	}
            // }));
        };
        // //跨天按钮刷新
        // private crossDayEventHandler(): void {
        // 	this.updatePeaksBattle();
        // 	this.updatePeaksBattleCross();
        // }
        MainActivityIconView.prototype.updateAllIcons = function () {
            for (var name_1 in this._icons) {
                var data = this._icons[name_1];
                this.updateIcon(data.item);
            }
        };
        MainActivityIconView.prototype.updateIcon = function (item) {
            if (TypeFunOpen.isOpen(item.name)) {
                this.addIcon(item);
            }
            else {
                this.removeIcon(item);
            }
            return item;
        };
        MainActivityIconView.prototype.addIcon = function (item) {
            var tileBox = this._icons[item.name].box;
            tileBox.addElement(item);
            return item;
        };
        MainActivityIconView.prototype.removeIcon = function (item) {
            if (!item || !this._icons[item.name])
                return;
            var tileBox = this._icons[item.name].box;
            tileBox.removeElement(item);
            return item;
        };
        MainActivityIconView.prototype.registerIcon = function (name, icon, index, tileBox, isHide) {
            if (!this._icons) {
                this._icons = {};
            }
            if (!this._icons[name]) {
                this._icons[name] = { item: new main.TileBoxItem(name, icon, index, isHide), box: tileBox };
            }
            return this._icons[name].item;
        };
        MainActivityIconView.prototype.reciveIcon = function (nameOrTarget) {
            if (nameOrTarget instanceof components.SnapButton) {
                for (var key in this._icons) {
                    var data = this._icons[key];
                    if (data.item.skin == nameOrTarget) {
                        return data.item;
                    }
                }
                return null;
            }
            return this._icons[nameOrTarget].item;
        };
        MainActivityIconView.prototype.showGroup = function (e) {
            this.iconsVisible = true;
        };
        MainActivityIconView.prototype.hideGroup = function (e) {
            this.iconsVisible = false;
        };
        Object.defineProperty(MainActivityIconView.prototype, "iconsVisible", {
            get: function () {
                return this._iconVisible;
            },
            set: function (flag) {
                if (this._iconVisible == flag)
                    return;
                this._iconVisible = flag;
                this.updateIconsDisplay();
            },
            enumerable: true,
            configurable: true
        });
        MainActivityIconView.prototype.updateIconsDisplay = function () {
            var _this = this;
            if (!this._mainUI)
                this._mainUI = mg.uiManager.getView(s.UserfaceName.main);
            if (this._iconVisible) {
                this._hBox.isHide = false;
                this._vBox.isHide = false;
                this._hBoxTwo.isHide = false;
                this._hBoxThree.isHide = false;
                this._hBoxFour.isHide = false;
                this.btnShowIcon.visible = false;
                this._mainUI.updateIconsDisplay(false);
                egret.Tween.removeTweens(this._hBox);
                egret.Tween.removeTweens(this._vBox);
                egret.Tween.removeTweens(this._hBoxTwo);
                egret.Tween.removeTweens(this._hBoxThree);
                egret.Tween.removeTweens(this._hBoxFour);
                egret.Tween.get(this._hBox).to({ x: this._hBox.x + 80 }, 100, utils.Ease.quadOut);
                egret.Tween.get(this._hBoxTwo).to({ x: this._hBoxTwo.x + 80 }, 100, utils.Ease.quadOut);
                egret.Tween.get(this._hBoxThree).to({ x: this._hBoxThree.x + 80 }, 100, utils.Ease.quadOut);
                egret.Tween.get(this._hBoxFour).to({ x: this._hBoxFour.x + 80 }, 100, utils.Ease.quadOut);
                egret.Tween.get(this._vBox).to({ y: this._vBox.y }, 100, utils.Ease.quadOut).call(function () {
                    this.btnHideIcon.visible = true;
                    this.dispatchEventWith(MainActivityIconView.ICON_DISPLAY_CHANGE, false);
                }, this);
            }
            else {
                this.btnHideIcon.visible = false;
                this._mainUI.updateIconsDisplay(true);
                egret.Tween.removeTweens(this._hBox);
                egret.Tween.removeTweens(this._vBox);
                egret.Tween.removeTweens(this._hBoxTwo);
                egret.Tween.removeTweens(this._hBoxThree);
                egret.Tween.removeTweens(this._hBoxFour);
                egret.Tween.get(this._hBox).to({ x: this._hBox.x - 80 }, 100, utils.Ease.quadOut);
                egret.Tween.get(this._hBoxTwo).to({ x: this._hBoxTwo.x - 80 }, 100, utils.Ease.quadOut);
                egret.Tween.get(this._hBoxThree).to({ x: this._hBoxThree.x - 80 }, 100, utils.Ease.quadOut);
                egret.Tween.get(this._hBoxFour).to({ x: this._hBoxFour.x - 80 }, 100, utils.Ease.quadOut);
                egret.Tween.get(this._vBox).to({ y: this._vBox.y }, 100, utils.Ease.quadOut).call(function () {
                    _this._hBox.isHide = true;
                    _this._vBox.isHide = true;
                    _this._hBoxTwo.isHide = true;
                    _this._hBoxThree.isHide = true;
                    _this._hBoxFour.isHide = true;
                    _this.btnShowIcon.visible = true;
                }, this);
                this.dispatchEventWith(MainActivityIconView.ICON_DISPLAY_CHANGE, false);
            }
        };
        //先后顺序根据this._vBox index
        MainActivityIconView.prototype.getY = function (name) {
            var index = 0;
            if (this.btnMainTeQuan && this.btnMainTeQuan.parent) {
                index++;
            }
            if (this.btnYYQG && this.btnYYQG.parent) {
                index++;
            }
            if (this.btnActivity && this.btnActivity.parent) {
                index++;
            }
            if (this.btnFirstRecharge && this.btnFirstRecharge.parent) {
                if (name == s.UserfaceName.firstRecharge) {
                    return this._imgY[index];
                }
                index++;
            }
            return this._imgY[index];
        };
        // private updateFirstRechargeBg(): void {
        // 	if (GameModels.firstRecharge.hashFirstRecharge && !GameModels.firstRecharge.clickFirstRecharge) {
        // 		if (this.imgFirstRecharge && this.imgFirstRecharge.visible) this.imgFirstRecharge.y = this.getY(s.UserfaceName.firstRecharge);
        // 		return;
        // 	}
        // 	if (this.imgFirstRecharge.parent) {
        // 		if (this.imgFirstRecharge) egret.Tween.removeTweens(this.imgFirstRecharge);
        // 		this.imgFirstRecharge.parent.removeChild(this.imgFirstRecharge);
        // 	}
        // 	if (!GameModels.sgActivity.isHashFirstRecharge()) return;
        // 	if (!this.btnFirstRecharge || !this.btnFirstRecharge.parent) return;
        // 	var isShow: boolean = false;
        // 	if (GameModels.user.player.level == 30 && GameModels.user.player.firstRechargeTotal <= 0) {
        // 		this.imgFirstRecharge.source = "img_firstrechargeBg_1_png";
        // 		isShow = true;
        // 	}
        // 	else if (GameModels.user.player.level == 50 && GameModels.user.player.firstRechargeTotal < 1000) {
        // 		this.imgFirstRecharge.source = "img_firstrechargeBg_2_png";
        // 		isShow = true;
        // 	}
        // 	else if (GameModels.user.player.level == 70 && GameModels.user.player.firstRechargeTotal < 5000) {
        // 		this.imgFirstRecharge.source = "img_firstrechargeBg_3_png";
        // 		GameModels.firstRecharge.firstRechargeIndex = 1;
        // 		isShow = true;
        // 	}
        // 	else if (GameModels.user.player.level == 90 && GameModels.user.player.firstRechargeTotal < 18000) {
        // 		this.imgFirstRecharge.source = "img_firstrechargeBg_4_png";
        // 		GameModels.firstRecharge.firstRechargeIndex = 2;
        // 		isShow = true;
        // 	}
        // 	else if (GameModels.user.player.level == 100 && GameModels.user.player.firstRechargeTotal < 36000) {
        // 		this.imgFirstRecharge.source = "img_firstrechargeBg_5_png";
        // 		GameModels.firstRecharge.firstRechargeIndex = 3;
        // 		isShow = true;
        // 	}
        // 	if (isShow) {
        // 		GameModels.firstRecharge.clickFirstRecharge = false;
        // 		GameModels.firstRecharge.hashFirstRecharge = true;
        // 		this.imgFirstRecharge.y = this.getY(s.UserfaceName.firstRecharge);
        // 		this.imgFirstRecharge.visible = true;
        // 		this.imgFirstRecharge.x = 40;
        // 		if (this.imgFirstRecharge) egret.Tween.removeTweens(this.imgFirstRecharge);
        // 		this.playFirstRechargeTween(true);
        // 		this.addChild(this.imgFirstRecharge);
        // 	}
        // }
        // private playFirstRechargeTween(isBool: boolean): void {
        // 	egret.Tween.get(this.imgFirstRecharge).to({ x: isBool ? 40 : 60 }, 500).call(this.playFirstRechargeTween, this, [!isBool]);
        // }
        MainActivityIconView.prototype.updateFirstRecharge = function () {
            if (!GameModels.platform.isPay) {
                this.removeIcon(this.reciveIcon(this.btnFirstRecharge));
                return;
            }
            if (GameModels.sgActivity.isHashFirstRecharge()) {
                this.updateIcon(this.reciveIcon(this.btnFirstRecharge)).effectEnabled = true;
            }
            else {
                this.removeIcon(this.reciveIcon(this.btnFirstRecharge));
            }
        };
        MainActivityIconView.prototype.upDataTimePickGift = function () {
            if (!GameModels.platform.isPay) {
                this.removeIcon(this.reciveIcon(this.btntimePiak));
                return;
            }
            this.removeIcon(this.reciveIcon(this.btntimePiak));
            if (GameModels.common.timeGiftInfo) {
                this.btntimePiak.text = "";
                this.updateIcon(this.reciveIcon(this.btntimePiak));
                if ((GameModels.common.timeGiftInfo.Status1 < 2 || GameModels.common.timeGiftInfo.Status2 < 2) && GameModels.common.timeGiftInfo.LeftTime > 0) {
                    this._timePickGiftTime = GameModels.common.timeGiftInfo.LeftTime;
                    utils.timer.clear(this, this.timerTimePickGiftHandler);
                    this.btntimePiak.text = Language.getExpression(Language.E_1HJS, utils.DateUtil.formatTimeLeft(this._timePickGiftTime));
                    utils.timer.loop(1000, this, this.timerTimePickGiftHandler);
                }
            }
        };
        MainActivityIconView.prototype.timerTimePickGiftHandler = function () {
            this._timePickGiftTime--;
            if (this._timePickGiftTime <= 0) {
                this._timePickGiftTime = 0;
                this.btntimePiak.text = "";
                utils.timer.clear(this, this.timerTimePickGiftHandler);
                if (this.btntimePiak.parent) {
                    this.removeIcon(this.reciveIcon(this.btntimePiak));
                }
                return;
            }
            this.btntimePiak.text = Language.getExpression(Language.E_1HJS, utils.DateUtil.formatTimeLeft(this._timePickGiftTime));
        };
        MainActivityIconView.prototype.onClick = function (e) {
            switch (e.target) {
                case this.btnXianShi:
                    // var index: number = GameModels.notifyGift.getNewestNotifyGiftVoArrByType(1);
                    mg.uiManager.show(dialog.gift.notifyGiftMainDialog, { tabIndex: 0 });
                    break;
                case this.btnJueBan:
                    // var index: number = GameModels.notifyGift.getNewestNotifyGiftVoArrByType(2);
                    mg.uiManager.show(dialog.gift.notifyGiftMainDialog1, { tabIndex: 0 });
                    break;
                case this.btnZhanLing:
                    mg.uiManager.show(dialog.legion.LegionTaskMain);
                    break;
                case this.btnWelfare:
                    mg.uiManager.show(dialog.welfare.WelfareMain);
                    break;
                case this.btnSgXianShi1:
                    mg.uiManager.show(dialog.activityLimit.sgActivityLimitMainDialog);
                    break;
                case this.btnSgXianShi2:
                    mg.uiManager.show(dialog.activityLimit.sgActivityLimitMainDialog1);
                    break;
                case this.btnActivity:
                    mg.uiManager.show(dialog.activity.sgDailyActivityMainDialog);
                    break;
                case this.btnZhuanShuTeQuan:
                    mg.uiManager.show(view.activity.zhuanshuTeQuanView);
                    break;
                case this.btnFirstRecharge:
                    //case this.imgFirstRecharge:
                    GameModels.firstRecharge.clickFirstRecharge = true;
                    GameModels.firstRecharge.hashFirstRecharge = false;
                    //if (this.imgFirstRecharge) egret.Tween.removeTweens(this.imgFirstRecharge);
                    //if (this.imgFirstRecharge.parent) this.imgFirstRecharge.parent.removeChild(this.imgFirstRecharge);
                    mg.uiManager.show(dialog.firstrecharge.FirstRechargeDialog1, { tabIndex: GameModels.firstRecharge.firstRechargeIndex });
                    break;
                case this.btnYYQG:
                    mg.uiManager.show(dialog.activity.oneYuanBuyDialog);
                    break;
                // case this.btnCrossbattle:
                // 	mg.uiManager.show(dialog.cross.CrossServerDialog);
                // 	break;
                // case this.btnPeaksBattle:
                // 	GameModels.peaksBattleCross.requestPeaksBattleState(utils.Handler.create(this, function (isCross: boolean) {
                // 		if (!isCross) {
                // 			mg.uiManager.show(dialog.peaksBattle.PeaksBattleMainDialog);
                // 		}
                // 	}));
                // 	break;
                // case this.btnPeaksBattleCross:
                // 	GameModels.peaksBattleCross.requestPeaksBattleState(utils.Handler.create(this, function (isCross: boolean) {
                // 		if (isCross) {
                // 			mg.uiManager.show(dialog.peaksBattleCross.PeaksBattleCrossMainDialog);
                // 		}
                // 	}));
                // 	break;
                case this.btnChangeShop:
                    mg.uiManager.show(dialog.shop.MallChangeShopMain);
                    break;
                case this.btnShop:
                    mg.uiManager.show(MallScene, { tabIndex: 1 });
                    break;
                case this.btnCamp:
                    mg.uiManager.show(dialog.campBattle.CampBattleMain);
                    break;
                case this.btnCamp0:
                    if (GameModels.user.player.legionId == "") {
                        mg.alertManager.showAlert(PromptAlert, false, true, Language.J_NSWJRZY, TypeBtnLabel.OK_SIGIN, null, utils.Handler.create(this, function () {
                            mg.uiManager.show(LegionList);
                        }));
                        return;
                    }
                    mg.uiManager.show(dialog.kingwar.kingWarMapMainDilog, true);
                    break;
                case this.btnMainTeQuan:
                    mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1 });
                    break;
                case this.btnSummer:
                    mg.uiManager.show(dialog.activitysummer.sgActivitysummerMainDialog);
                    break;
                case this.btntimePiak:
                    mg.uiManager.show(MainTimePickGift);
                    break;
                case this.btnSevenDay:
                    // mg.alertManager.tip(Language.J_GNZWKQ);
                    // return;
                    mg.uiManager.show(dialog.sevenday.SevenDayTask);
                    break;
            }
        };
        MainActivityIconView.ICON_DISPLAY_CHANGE = 'ICON_DISPLAY_CHANGE';
        return MainActivityIconView;
    }(ui.MainIconActivitySkin));
    main.MainActivityIconView = MainActivityIconView;
    __reflect(MainActivityIconView.prototype, "main.MainActivityIconView");
})(main || (main = {}));

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
    var MainUIView = (function (_super) {
        __extends(MainUIView, _super);
        function MainUIView() {
            var _this = _super.call(this) || this;
            _this._TokenTime = 0;
            return _this;
        }
        Object.defineProperty(MainUIView.prototype, "height", {
            set: function (v) {
                this._liuhaiBg.width = mg.stageManager.stageWidth;
                this._liuhaiBg.height = platform.sdk.uiOffsetY;
                egret.superSetter(MainUIView, this, 'height', v - platform.sdk.uiOffsetY);
            },
            enumerable: true,
            configurable: true
        });
        MainUIView.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            Mediator.getMediator(this).onAdd(this, this.enter);
            Mediator.getMediator(this).onRemove(this, this.exit);
            mg.dialogManager.register(this.dialogGroup);
            mg.layerManager.registerEffectLayer(this.effectGroup);
            this._copyMainView = copy.CopyMainView.instance;
            this._copyMainView.touchEnabled = false;
            this.cityBossGroup.touchEnabled = false;
            this.cityBossGroup.touchChildren = false;
            this._liuhaiBg = new eui.Image();
            this._liuhaiBg.source = 'uiMain_json.img_main_expbarbg';
            this._liuhaiBg.scale9Grid = new egret.Rectangle(4, 3, 4, 4);
            mg.layerManager.mainUI.addChild(this._liuhaiBg);
        };
        MainUIView.prototype.enter = function () {
            this._mainPublicNotice = new main.MainPublicNotice();
            this._mainPublicNotice.initializeLayer(this.noticeGroup);
            this._copyFirstPass = new main.MainFirstPassView(this);
            this.title.init();
            this.activityIcon.init();
            this.chat.init();
            this.dock.init();
            this.cityBoss.init();
            this.getData.init();
            this.city.init();
            if (GameModels.task.hasTask) {
                this.task.init();
                GameModels.task.onEnd(this, this.taskEndHandler);
            }
            else {
                this.everytask.init(this.everytaskGroup);
                GameModels.achievement.addEventListener(mo.ModelAchievement.CHANG_EVERY_TASK, this.everytaskEndHandler, this);
            }
            this.activityNotice.init();
            this.activityNotice1.init();
            this.title.remove();
            this.activityIcon.remove();
            this.chat.remove();
            this.dock.remove();
            this.task.remove();
            this.everytask.remove();
            this.cityBoss.remove();
            this.getData.remove();
            this.city.remove();
            mg.stageManager.onResize(this, this.resizeHandler, true);
            app.gameContext.manager.onGameChange(this, this.gameChangeHandler, true);
            mg.uiManager.addEventListener(egret.Event.CHANGE, this.updatePartDisplay, this);
            this.effectGroup.touchEnabled = false;
            this.effectGroup.touchChildren = false;
            this.effectGroup.touchThrough = true;
            this.titleGroup.touchEnabled = false;
            this.titleGroup.touchThrough = true;
            this.chapterCityGroup.touchEnabled = false;
            this.chapterCityGroup.touchThrough = true;
            this.activityIconGroup.touchEnabled = false;
            this.chatGroup.touchEnabled = false;
            this.dockGroup.touchEnabled = false;
            this.taskGroup.touchEnabled = false;
            this.everytaskGroup.touchEnabled = false;
            this.cityBossGroup.touchEnabled = false;
            this.getData.touchEnabled = false;
            this.chapterCityGroup.touchEnabled = false;
            this.chapterCityGroup.visible = true;
            this.addPropertyRemind();
            this.upDataToken();
            this.upDataSeason();
            this.upDataPresentZhuGeLiang();
            this.upDataTempGroup();
            this.updateGuanZhi();
            this.upDataAnimalReward();
            this.guanZhiGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGuanZhiCkick, this);
            GameModels.copyBoss.addEventListener(mo.ModelGameBoss.TOKEN_RESFIN, this.upDataToken, this);
            GameModels.serverTime.addEventListener(mo.ModelServerTime.CROSS_DAY_EVENT, this.upDataSeason, this);
            GameModels.legion.addEventListener(mo.ModelLegion.NEW_UNION_REDBAG, this.upDataTempGroup, this);
            GameModels.notifyGift.addEventListener(mo.ModelNotifyGift.NEW_GIFT_INFO, this.upDataTempGroup, this);
            GameModels.limitTarget.addEventListener(mo.ModelLimitTargetTask.CHANGE_LIMITTARGET_INFO, this.upDataPresentZhuGeLiang, this);
            GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.upDataAnimalReward, this);
            GameModels.state.updateState(GameRedState.ROLE_SHENGXING);
            GameModels.state.updateState(GameRedState.TUJIAN_QUCIK_SHENGXING);
            GameModels.state.updateState(GameRedState.MAIL_ONEGET);
            GameModels.state.updateState(GameRedState.MAIN_MAIL);
            GameModels.state.registerWarnTarget(GameRedState.GUANZHI, this.btnGuanZhi);
        };
        MainUIView.prototype.exit = function () { };
        MainUIView.prototype.everytaskEndHandler = function () {
            if (!GameModels.achievement.allIsReceive) {
                GameModels.achievement.removeEventListener(mo.ModelAchievement.CHANG_EVERY_TASK, this.everytaskEndHandler, this);
                this.everytask.remove();
                this.everytask.clear();
            }
        };
        MainUIView.prototype.taskEndHandler = function () {
            if (!GameModels.task.hasTask) {
                GameModels.task.offEnd();
                this.task.remove();
                this.task.clear();
                if (GameModels.achievement.allIsReceive) {
                    this.everytask.init(this.everytaskGroup);
                    this.everytask.add();
                }
            }
        };
        MainUIView.prototype.resizeHandler = function (w, h) {
            this.width = w;
            this.height = h;
            if (this._copyMainView.parent) {
                this._copyMainView.width = w;
                this._copyMainView.height = h;
            }
        };
        MainUIView.prototype.addPropertyRemind = function () {
            var that = this;
            var playerVO = GameModels.user.player;
            that._listenerProperties = [
                TypeProperty.MaxHp,
                TypeProperty.PAtk,
                TypeProperty.PDef,
                TypeProperty.IgnorePDef,
                TypeProperty.Hit,
                TypeProperty.Dodge,
                TypeProperty.Crit,
                TypeProperty.IgnoreCritInjure,
                TypeProperty.CritInjure,
                TypeProperty.IgnoreCrit,
                TypeProperty.InjureAdd,
                TypeProperty.InjureIgnore,
            ];
            that._oldPlayerProperty = {};
            that._oldPetProperty = {};
            function listenerProperty(type) {
                playerVO.onPropertyChange(type, that, that.onPropertyTip);
                that._oldPlayerProperty[type] = playerVO.getProperty(type);
                that._oldPetProperty[type] = playerVO.petList.getProperty(type);
            }
            for (var _i = 0, _a = that._listenerProperties; _i < _a.length; _i++) {
                var type = _a[_i];
                listenerProperty(type);
            }
            GameModels.pet.onPropertyRemind(that, that.onPetPropertyTip);
        };
        MainUIView.prototype.onPropertyTip = function (smartVO, type) {
            var oldValue = this._oldPlayerProperty[type];
            if (oldValue == undefined)
                oldValue = 0;
            var value = GameModels.user.player.getProperty(type);
            if (!isNaN(value) && !isNaN(oldValue) && !isNaN(type) && value != oldValue) {
                mg.alertManager.propertyTip(type, value - oldValue);
                this._oldPlayerProperty[type] = value;
            }
        };
        MainUIView.prototype.onPetPropertyTip = function () {
            var petList = GameModels.user.player.petList;
            for (var _i = 0, _a = this._listenerProperties; _i < _a.length; _i++) {
                var type = _a[_i];
                var oldValue = this._oldPetProperty[type];
                if (oldValue == undefined)
                    oldValue = 0;
                var value = petList.getProperty(type);
                if (!isNaN(value) && !isNaN(oldValue) && !isNaN(type) && value != oldValue) {
                    mg.alertManager.petPropertyTip(type, value - oldValue);
                    this._oldPetProperty[type] = value;
                }
            }
        };
        MainUIView.prototype.gameChangeHandler = function () {
            this.updatePartDisplay();
            if (app.gameContext.typeGameLast == TypeGame.CITY) {
                this.removeCopyView();
            }
            var gameType = app.gameContext.typeGame;
            this.updateCopyViewDisplay();
            GameModels.state.updateState(GameRedState.CITY);
            GameModels.state.updateState(GameRedState.ATKCITY);
            GameModels.state.updateState(GameRedState.EXPLORE_PETPAGODA);
            GameModels.state.updateState(GameRedState.EXPLORE_SUOYAOPAGODA);
            GameModels.state.updateState(GameRedState.EXPLORE_WUHUNPAGODA);
        };
        MainUIView.prototype.updateUi = function () {
            var hasDialog = mg.uiManager.hasDialog;
            var gameType = app.gameContext.manager.gameCurrent.type;
            this.activityNoticeGroup.bottom = gameType == TypeGame.ATKCITY ? 400 : 276;
            this.cityBossGroup.bottom = gameType == TypeGame.CITY ? 208 : 333;
            this.activityNoticeGroup1.bottom = gameType == TypeGame.CITY ? 208 : 333;
            this.chatGroup.bottom = gameType == TypeGame.ATKCITY ? 240 : 0;
            if (gameType == TypeGame.ATKCITY) {
                this.everytaskGroup.bottom = this.taskGroup.bottom = 250;
            }
            if (gameType == TypeGame.CITY) {
                this.everytaskGroup.bottom = this.taskGroup.bottom = 189;
            }
            this.title.btnShop.visible = gameType != TypeGame.ATKCITY;
            this.title.petGroup.visible = false; //(gameType == TypeGame.ATKCITY || gameType == TypeGame.CITY) ? false : true;
            this.title.imgNameBg.visible = gameType != TypeGame.ATKCITY && gameType != TypeGame.CITY;
            this.title.labMapName.visible = gameType != TypeGame.ATKCITY && gameType != TypeGame.CITY;
            this.title.labTime.visible = gameType != TypeGame.ATKCITY && gameType != TypeGame.CITY;
            this.dock.backXpGroup.visible = hasDialog;
            this.dock.bottomback1.visible = hasDialog;
            this.dock.legionGroup.visible = !hasDialog;
            this.dock.bottomback2.visible = !hasDialog;
        };
        MainUIView.prototype.updatePartDisplay = function () {
            if (!app.gameContext.manager.gameCurrent)
                return;
            var hasDialog = mg.uiManager.hasDialog;
            var gameType = app.gameContext.manager.gameCurrent.type;
            this.dock.add();
            hasDialog ? this.title.remove() : this.title.add();
            hasDialog ? this.cityBoss.remove() : this.cityBoss.add();
            //部分场景聊天功能不隐藏
            ((TypeGame.isHideChat(gameType) && !GameModels.chat.isHashChatView) || hasDialog) ? this.chat.remove() : this.chat.add();
            this.getData.remove();
            this.upDataToken();
            this.upDataSeason();
            this.upDataTempGroup();
            this.updateUi();
            this.upDataPresentZhuGeLiang();
            this.updateGuanZhi();
            this.upDataAnimalReward();
            switch (gameType) {
                case TypeGame.BEGIN:
                    this._copyFirstPass.remove();
                    this.activityIcon.remove();
                    this.cityBoss.remove();
                    this.activityNotice.remove();
                    this.activityNotice1.remove();
                    this.everytask.remove();
                    this.city.remove();
                    if (hasDialog) {
                        this.task.remove();
                    }
                    else {
                        this.task.add();
                    }
                    break;
                case TypeGame.ATKCITY:
                    this._copyFirstPass.remove();
                    this.activityIcon.remove();
                    this._copyFirstPass.remove();
                    if (hasDialog) {
                        this.task.remove();
                        if (this.city.parent) {
                            this.city.visible = true;
                        }
                        else {
                            this.city.add();
                            this.city.visible = true;
                        }
                        this.activityNotice.remove();
                        this.activityNotice1.remove();
                    }
                    else {
                        if (this.city.parent) {
                            this.city.visible = true;
                        }
                        else {
                            this.city.add();
                            this.city.visible = true;
                        }
                        this.city.visible = true;
                        this.activityNotice.add();
                        if (!this.cityBoss.parent)
                            this.activityNotice1.add();
                        if (this.task.isInit) {
                            this.task.add();
                        }
                        else {
                            if (GameModels.achievement.allIsReceive) {
                                this.everytask.add();
                            }
                        }
                        if (GameModels.bag.getDataItemId > 0 && GameModels.user.player.level >= 40) {
                            if (GameModels.bag.checkFunsIsOpen(GameModels.bag.getDataItemId.toString())) {
                                this.getData.add();
                            }
                        }
                    }
                    break;
                case TypeGame.CITY:
                    this.city.remove();
                    if (hasDialog) {
                        this.activityIcon.remove();
                        this.task.remove();
                        this.everytask.remove();
                        this.activityNotice.remove();
                        this.activityNotice1.remove();
                        this.activityIcon.remove();
                    }
                    else {
                        this.activityIcon.add();
                        this.activityNotice.add();
                        if (!this.cityBoss.parent)
                            this.activityNotice1.add();
                        if (this.task.isInit) {
                            this.task.add();
                        }
                        else {
                            if (GameModels.achievement.allIsReceive) {
                                this.everytask.add();
                            }
                        }
                        if (GameModels.bag.getDataItemId > 0 && GameModels.user.player.level >= 40) {
                            if (GameModels.bag.checkFunsIsOpen(GameModels.bag.getDataItemId.toString())) {
                                this.getData.add();
                            }
                        }
                    }
                    this._copyFirstPass.remove();
                    break;
                default:
                    if (gameType == TypeGame.CROSS_PET_FIGHT || gameType == TypeGame.CAMP_BATTLE_WAR) {
                        this.title.remove();
                    }
                    else {
                        hasDialog ? this.title.remove() : this.title.add();
                    }
                    this.task.remove();
                    this.everytask.remove();
                    this.city.remove();
                    this.activityIcon.remove();
                    // this._mainLoseBossViews.remove();
                    if (gameType == TypeGame.PAGODA_LOCK || gameType == TypeGame.PAGODA_PET || gameType == TypeGame.PAGODA_WUHUN) {
                        var gamePagoda = null;
                        switch (gameType) {
                            case TypeGame.PAGODA_LOCK:
                                gamePagoda = app.gameContext.manager.getGameLockPagoda();
                                break;
                            case TypeGame.PAGODA_PET:
                                gamePagoda = app.gameContext.manager.getGamePetPagoda();
                                break;
                            case TypeGame.PAGODA_WUHUN:
                                gamePagoda = app.gameContext.manager.getGameWuHunPagoda();
                                break;
                        }
                        if (GameModels.copyPagoda.checkFirstState(gamePagoda.copyVO)) {
                            this._copyFirstPass.add(gamePagoda.copyVO.template.firstDrop);
                        }
                        else {
                            this._copyFirstPass.remove();
                        }
                    }
                    else {
                        this._copyFirstPass.remove();
                    }
                    break;
            }
            GameModels.guide.gameChangeHandler();
        };
        MainUIView.prototype.updateCopyViewDisplay = function () {
            if (app.gameContext.typeGame == TypeGame.BEGIN || app.gameContext.typeGame == TypeGame.ATKCITY || app.gameContext.typeGame == TypeGame.CITY) {
                this.removeCopyView();
            }
            else {
                this.addCopyView();
            }
        };
        MainUIView.prototype.addCopyView = function () {
            if (!this._copyMainView.parent) {
                this.copyGroup.addChild(this._copyMainView);
                this._copyMainView.width = mg.stageManager.stageWidth;
                this._copyMainView.height = mg.stageManager.stageHeight;
                this._copyMainView.switchState(app.gameContext.typeGame);
            }
            else {
                this._copyMainView.switchState(app.gameContext.typeGame);
            }
        };
        MainUIView.prototype.removeCopyView = function () {
            if (this._copyMainView && this._copyMainView.parent) {
                this._copyMainView.parent.removeChild(this._copyMainView);
                this._copyMainView.resetState(app.gameContext.typeGameLast);
            }
        };
        MainUIView.prototype.isLeftIconVisible = function () {
            return this.activityIcon.iconsVisible;
        };
        MainUIView.prototype.showLeftIcons = function () {
            this.activityIcon.iconsVisible = true;
        };
        MainUIView.prototype.getCopyBossInfo = function () {
            return this._copyMainView;
        };
        MainUIView.prototype.getTaskRect = function (isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            return this.getRect(this.taskGroup);
        };
        /**将领点  1*/
        MainUIView.prototype.getRolePostion = function (isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            return this.getPosition(this.dock.btnWuJiang, isCenter);
        };
        // /**技能点  2*/
        // public getSkillPostion(isCenter: boolean = false): egret.Point {
        // 	return this.getPosition(this.dock.btnSkill, isCenter);
        // }
        /**背包点  3*/
        MainUIView.prototype.getBagPostion = function (isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            return this.getPosition(this.dock.btnBeiBao, isCenter);
        };
        // /**成就点  4*/
        // public getChengJiuPostion(isCenter: boolean = false): egret.Point {
        // 	return this.getPosition(this.dock.btnChengJiu, isCenter);
        // }
        /**宝物点 */
        MainUIView.prototype.getBaoWuPostion = function (isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            return this.getPosition(this.dock.btnBaoWu, isCenter);
        };
        // /**宝藏点  10*/
        // public getBaoCangPostion(isCenter: boolean = false): egret.Point {
        // 	return this.getPosition(this.activityIcon.btnBaoCang, isCenter);
        // }
        /**福利点  11*/
        MainUIView.prototype.getFuLiPostion = function (isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            return this.getPosition(this.activityIcon.btnWelfare, isCenter);
        };
        // /**红颜文官点  12*/
        // public getHongYanPostion(isCenter: boolean = false): egret.Point {
        // 	return this.getPosition(this.activityIcon.btnHongYan, isCenter);
        // }
        /**偶遇仙人的点 3*/
        MainUIView.prototype.getOuYuXainRenPostion = function (isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            return this.getPosition(this.city.btnouYu, isCenter);
        };
        /**文官送红颜的点 */
        MainUIView.prototype.geWenGuanSongHongYanPostion = function (isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            return this.getPosition(this.city.btnGiveHongYan, isCenter);
        };
        /**诸葛亮的点 */
        MainUIView.prototype.getZhuGeLiangPostion = function (isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            return this.getPosition(this.zhuGeLiangGroup, isCenter);
        };
        /**征收点 3*/
        MainUIView.prototype.getFoodPostion = function (isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            return this.getPosition(this.city.imgGold, isCenter);
        };
        MainUIView.prototype.getMoneyPostion = function (isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            return this.getPosition(this.title.labMoney, isCenter);
        };
        MainUIView.prototype.getDiamondPostion = function (isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            return this.getPosition(this.title.labDiamond, isCenter);
        };
        MainUIView.prototype.getHeadPostion = function (isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            return this.getPosition(this.title.imgHead, isCenter);
        };
        MainUIView.prototype.getRect = function (target) {
            if (target) {
                var point = target.localToGlobal(0, 0);
                return new egret.Rectangle(point.x, point.y, target.width, target.height);
            }
            return null;
        };
        MainUIView.prototype.getPosition = function (target, isCenter, cache) {
            if (isCenter === void 0) { isCenter = false; }
            if (target) {
                var point = target.localToGlobal(0, 0, cache);
                if (isCenter) {
                    point.x += target.width / 2;
                    point.y += target.height / 2;
                }
                return point;
            }
            return null;
        };
        /**隐藏/显示主界面按钮 缩放按钮功能 */
        MainUIView.prototype.updateIconsDisplay = function (hide) {
            if (hide) {
                if (this.groupSeason) {
                    this.groupSeason.visible = false;
                }
            }
            else {
                if (this.groupSeason) {
                    this.groupSeason.visible = true;
                }
            }
        };
        MainUIView.prototype.showGetItemTips = function () {
            this.getData.remove();
            if (mg.uiManager.hasDialog)
                return;
            if (app.gameContext.typeGame == TypeGame.ATKCITY || app.gameContext.typeGame == TypeGame.CITY) {
                if (GameModels.user.player.level >= 40) {
                    this.getData.add();
                }
            }
        };
        /**将军令*/
        MainUIView.prototype.upDataToken = function () {
            if (this.tokenGroup.parent) {
                if (this.tokenGroup) {
                    this.tokenGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showToken, this);
                    this.tokenGroup.parent.removeChild(this.tokenGroup);
                }
            }
            if (GameModels.user.player.level < 80)
                return;
            if (!app.gameContext.manager.gameCurrent)
                return;
            if (mg.uiManager.hasDialog)
                return;
            if (app.gameContext.manager.gameCurrent.type != TypeGame.CITY)
                return;
            var materialIsOpen = TypeFunOpen.checkFuncOpen(s.UserfaceName.material, 0);
            var personIsOpen = TypeFunOpen.checkFuncOpen(s.UserfaceName.copyboss, 0);
            if (GameModels.copyBoss.token && materialIsOpen && personIsOpen) {
                this.addChild(this.tokenGroup);
                this.upTokenTime();
                egret.Tween.removeTweens(this.imgtoken);
                this.tweenTokenImgHandler(false);
                this.tokenGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showToken, this);
            }
        };
        MainUIView.prototype.upTokenTime = function () {
            this.labTime.text = "";
            this._TokenTime = 0;
            utils.timer.clear(this, this.TokenTimerHandler);
            this._TokenTime = GameModels.copyBoss.tokenTime;
            if (this._TokenTime > 0) {
                this.labTime.text = utils.DateUtil.formatTimeLeft(this._TokenTime);
                utils.timer.loop(1000, this, this.TokenTimerHandler);
            }
            else {
                this.labTime.text = "";
                if (this.tokenGroup.parent) {
                    this.tokenGroup.parent.removeChild(this.tokenGroup);
                    this.tokenGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showToken, this);
                }
                GameModels.copyBoss.token = false;
            }
        };
        MainUIView.prototype.TokenTimerHandler = function () {
            this._TokenTime--;
            if (this._TokenTime <= 0) {
                this._TokenTime = 0;
                utils.timer.clear(this, this.TokenTimerHandler);
                if (this.tokenGroup.parent) {
                    this.tokenGroup.parent.removeChild(this.tokenGroup);
                    this.tokenGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showToken, this);
                }
                GameModels.copyBoss.token = false;
                return;
            }
            // logger.log("主界面开启了一个xp体验的倒计时:",this._time);
            this.labTime.text = utils.DateUtil.formatTimeLeft(this._TokenTime);
        };
        MainUIView.prototype.tweenTokenImgHandler = function (isBool) {
            egret.Tween.get(this.imgtoken).to({ x: isBool ? 100 : 84 }, 500).call(this.tweenTokenImgHandler, this, [!isBool]);
        };
        MainUIView.prototype.showToken = function () {
            mg.uiManager.show(main.MainToken);
        };
        /**四季*/
        MainUIView.prototype.upDataSeason = function () {
            if (this.groupSeason.parent) {
                if (this.groupSeason) {
                    this.groupSeason.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showSeason, this);
                    this.groupSeason.parent.removeChild(this.groupSeason);
                }
            }
            if (!GameModels.platform.isPay) {
                return;
            }
            if (!app.gameContext.manager.gameCurrent)
                return;
            if (mg.uiManager.hasDialog)
                return;
            if (app.gameContext.manager.gameCurrent.type != TypeGame.CITY)
                return;
            if (GameModels.user.player.level < 50)
                return;
            this.btnSeason.imageSource = "uiMain_activityIcon_json.main_seasonIcon_" + GameModels.serverTime.getSeason();
            this.addChild(this.groupSeason);
            this.groupSeason.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSeason, this);
        };
        MainUIView.prototype.showSeason = function () {
            mg.uiManager.show(dialog.activity.sgDailyActivityMainDialog, { tabIndex: game.sgActivityType.season });
        };
        /**临时组处理 */
        MainUIView.prototype.upDataTempGroup = function () {
            this.tempGroup.removeChildren();
            this.tempGroup.touchChildren = false;
            this.tempGroup.touchEnabled = false;
            if (this.tempGroup.parent) {
                this.tempGroup.parent.removeChild(this.tempGroup);
            }
            var hasDialog = mg.uiManager.hasDialog;
            if (hasDialog)
                return;
            if (!GameModels.platform.isPay) {
                return;
            }
            if (!app.gameContext.manager.gameCurrent)
                return;
            var gameType = app.gameContext.manager.gameCurrent.type;
            if (!TypeGame.isMainGame(gameType))
                return;
            if (GameModels.legion && GameModels.legion.newRedBag) {
                TypeTempBtn.addBtnArr(TypeTempBtn.LEGION_REDBAG);
                this.tempGroup.addChild(this.btnRedBag);
                this.btnRedBag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLegionRedBag, this);
            }
            if (GameModels.notifyGift && GameModels.notifyGift.newGift1) {
                TypeTempBtn.addBtnArr(TypeTempBtn.NOTIFY_GIFT_1);
                this.tempGroup.addChild(this.btnNotifyGift1);
                this.btnNotifyGift1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showNotifyGift1, this);
            }
            if (GameModels.notifyGift && GameModels.notifyGift.newGift2) {
                TypeTempBtn.addBtnArr(TypeTempBtn.NOTIFY_GIFT_2);
                this.tempGroup.addChild(this.btnNotifyGift2);
                this.btnNotifyGift2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showNotifyGift2, this);
            }
            if (TypeTempBtn.currBtnArr.length > 0) {
                if (!this.tempGroup.parent) {
                    this.addChildAt(this.tempGroup, this.getChildIndex(this.chatGroup) - 1);
                    this.tempGroup.touchChildren = true;
                    this.tempGroup.touchEnabled = true;
                    this.tempGroup.bottom = gameType == TypeGame.ATKCITY ? 333 : 272;
                }
            }
        };
        MainUIView.prototype.showNotifyGift1 = function () {
            TypeTempBtn.removeBtnArr(TypeTempBtn.NOTIFY_GIFT_1);
            var index = GameModels.notifyGift.id1;
            mg.uiManager.show(dialog.gift.notifyGiftMainDialog, { tabIndex: index });
        };
        MainUIView.prototype.showNotifyGift2 = function () {
            TypeTempBtn.removeBtnArr(TypeTempBtn.NOTIFY_GIFT_2);
            var index = GameModels.notifyGift.id2;
            mg.uiManager.show(dialog.gift.notifyGiftMainDialog1, { tabIndex: index });
        };
        MainUIView.prototype.showLegionRedBag = function () {
            TypeTempBtn.removeBtnArr(TypeTempBtn.LEGION_REDBAG);
            mg.uiManager.show(dialog.legion.LegionTeHuiMain, { tabIndex: 1 });
        };
        /**送诸葛亮 */
        MainUIView.prototype.upDataPresentZhuGeLiang = function () {
            if (this.zhuGeLiangGroup.parent) {
                if (this.zhuGeLiangGroup) {
                    this.zhuGeLiangGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showZhuGeLiang, this);
                    this.zhuGeLiangGroup.parent.removeChild(this.zhuGeLiangGroup);
                }
            }
            if (!GameModels.platform.isPay) {
                return;
            }
            if (!app.gameContext.manager.gameCurrent)
                return;
            if (mg.uiManager.hasDialog && !mg.uiManager.isOpen(MainPresentZhuGeLiangAlter))
                return;
            if (!TypeGame.isMainGame(app.gameContext.manager.gameCurrent.type))
                return;
            egret.Tween.removeTweens(this.imgPreBg);
            if (GameModels.limitTarget && GameModels.limitTarget.templates && GameModels.limitTarget.curLimitTaskId > 0) {
                this.addChildAt(this.zhuGeLiangGroup, this.getChildIndex(this.chatGroup) - 1);
                this._count = 0;
                this._angle = 0;
                this.tweenPreviewImgHandler();
                this.btnZhuGeLiang.isWarn = GameModels.limitTarget.checkPedPoint();
                this.zhuGeLiangGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showZhuGeLiang, this);
                var gameType = app.gameContext.manager.gameCurrent.type;
                if (gameType == TypeGame.ATKCITY) {
                    this.zhuGeLiangGroup.bottom = 833;
                }
                if (gameType == TypeGame.CITY) {
                    this.zhuGeLiangGroup.bottom = 300;
                }
            }
        };
        MainUIView.prototype.tweenPreviewImgHandler = function () {
            this._count++;
            this._angle = this._count * 360;
            egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
        };
        MainUIView.prototype.showZhuGeLiang = function (e) {
            if (e.currentTarget) {
                mg.uiManager.show(MainPresentZhuGeLiangAlter);
                return;
            }
        };
        /**驯服灵兽 */
        MainUIView.prototype.upDataAnimalReward = function () {
            if (this.animalGroup.parent) {
                if (this.animalGroup) {
                    this.animalGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showAnimalReward, this);
                    this.animalGroup.parent.removeChild(this.animalGroup);
                }
            }
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.animal))
                return;
            if (!app.gameContext.manager.gameCurrent)
                return;
            if (mg.uiManager.hasDialog && !mg.uiManager.isOpen(animal.AnimalReward))
                return;
            if (app.gameContext.manager.gameCurrent.type != TypeGame.CITY)
                return;
            egret.Tween.removeTweens(this.imgAnimalPreBg);
            var lvVo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.xflslv);
            var logVo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.xflslog);
            if (lvVo && logVo) {
                var hashAct = false;
                var voList = lvVo.actRewardListVO.concat(logVo.actRewardListVO);
                for (var _i = 0, voList_1 = voList; _i < voList_1.length; _i++) {
                    var act = voList_1[_i];
                    if (act.state < 2) {
                        hashAct = true;
                        break;
                    }
                }
                if (!hashAct)
                    return;
                this.addChildAt(this.animalGroup, this.getChildIndex(this.chatGroup) - 1);
                this._animalCount = 0;
                this._animalAngle = 0;
                this.tweenAnimalPreviewImgHandler();
                var hashLv = GameModels.sgActivity.checkRedPoint(game.sgActivityType.xflslv);
                var hashLog = GameModels.sgActivity.checkRedPoint(game.sgActivityType.xflslog);
                this.btnAnimal.isWarn = hashLv || hashLog;
                this.animalGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showAnimalReward, this);
            }
        };
        MainUIView.prototype.tweenAnimalPreviewImgHandler = function () {
            this._animalCount++;
            this._animalAngle = this._animalCount * 360;
            egret.Tween.get(this.imgAnimalPreBg).to({ rotation: this._animalAngle }, 2000 * this._animalCount).call(this.tweenAnimalPreviewImgHandler, this);
        };
        MainUIView.prototype.showAnimalReward = function (e) {
            if (e.currentTarget) {
                mg.uiManager.show(animal.AnimalReward);
                return;
            }
        };
        MainUIView.prototype.updateGuanZhi = function () {
            this.guanZhiGroup.visible = false;
            if (!app.gameContext.manager.gameCurrent)
                return;
            if (mg.uiManager.hasDialog)
                return;
            var gameType = app.gameContext.manager.gameCurrent.type;
            if (TypeFunOpen.checkFuncOpen(s.UserfaceName.guanzhi) && gameType == TypeGame.CITY) {
                this.guanZhiGroup.visible = true;
            }
        };
        MainUIView.prototype.onGuanZhiCkick = function (e) {
            mg.uiManager.show(dialog.WenGuan.WenGuanDialog);
        };
        //private _mainLoseBossViews: MainLoseBossView;
        MainUIView.TWEEN_FINSH = "TWEEN_FINSH";
        return MainUIView;
    }(ui.MainUISkin));
    main.MainUIView = MainUIView;
    __reflect(MainUIView.prototype, "main.MainUIView");
})(main || (main = {}));

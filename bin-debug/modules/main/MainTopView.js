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
    var MainTopView = (function (_super) {
        __extends(MainTopView, _super);
        function MainTopView() {
            var _this = _super.call(this) || this;
            _this._btnBackVisible = true;
            _this._btnCityVisible = true;
            _this.isShowHpEffect = false;
            return _this;
        }
        MainTopView.prototype.init = function () {
            this._parent = this.parent;
            this.btnZhuangBan.visible = this.icon1.visible = this.icon2.visible = this.btnVip.visible = this.btnGoldRecharge.visible = this.btnRecharge.visible = GameModels.platform.isPay;
            this.btnRank.x = GameModels.platform.isPay ? 179 : 119;
            this.btnShop.x = GameModels.platform.isPay ? 239 : 179;
            this._pets = [this.pet1, this.pet2, this.pet3, this.pet4];
            this.formatChange();
            var petVO = GameModels.pet.getFormatUpVOByPos(0);
            if (petVO)
                petVO.onPropertyChange(TypeProperty.Hp, this, this.hpChange);
            if (petVO)
                petVO.onPropertyChange(TypeProperty.MaxHp, this, this.hpChange);
            // GameModels.user.player.onPropertyChange(TypeProperty.Hp, this, this.hpChange);
            // GameModels.user.player.onPropertyChange(TypeProperty.MaxHp, this, this.hpChange);
            GameModels.user.player.onPropertyChange(TypeProperty.Level, this, this.levelChange);
            GameModels.user.player.onPropertyChange(TypeProperty.VIP_LEVEL, this, this.vipChange);
            GameModels.user.player.onPropertyChange(TypeProperty.Gold, this, this.updateGold);
            GameModels.user.player.onPropertyChange(TypeProperty.UnbindedGold, this, this.updateUnbindedGold);
            GameModels.user.player.onPropertyChange(TypeProperty.ALLFIGHT, this, this.updateFight);
            GameModels.user.player.onPropertyChange(TypeProperty.HEADICON, this, this.headChange);
            GameModels.pet.addEventListener(mo.ModelPet.PROPERTY_CHANGE, this.eudemonsFightChange, this);
            //game.state.onState(TypeSetting.CLICK_AUTO_XP, this, this.stateAutoXpHandler);
            //game.state.onState(TypeSetting.CLICK_AUTO_MERGE, this, this.stateAutoXpHandler);
            this.labMoney.text = convert.formatGold(GameModels.user.player.gold);
            this.labDiamond.text = "" + GameModels.user.player.diamonds;
            this.blabFight.text = GameModels.user.player.getProperty(TypeProperty.ALLFIGHT);
            this.btnRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goRecharge, this);
            this.btnGoldRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goGoldRecharge, this);
            this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnVip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnZhuangBan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            GameModels.state.registerWarnTarget(GameRedState.VIP_TEQUAN, this.btnVip);
            GameModels.state.registerWarnTarget(GameRedState.MAIN_SET, this.iconXPSettingRed);
            GameModels.state.registerWarnTarget(GameRedState.ROLE_EQIUP_FASHION, this.btnZhuangBan);
            GameModels.user.player.petList.onMergeStateChange(this, this.hpChange);
            this.imgHead.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            this.pet1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPetClick, this);
            this.pet2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPetClick, this);
            this.pet3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPetClick, this);
            this.pet4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPetClick, this);
            GameModels.pet.addEventListener(mo.ModelPet.FORMAT_CHANGE, this.formatChange, this);
            GameModels.pet.addEventListener(mo.ModelPet.PET_CHANGE_LEVEL, this.formatChange, this);
            this.hpChange();
            this.levelChange();
            this.vipChange();
            //this.stateAutoXpHandler(null);
            this.headChange();
            app.gameContext.manager.onGameChange(this, this.gameChangeHandler);
            //app.gameContext.manager.getGameChapter().onStart(this, this.gameChangeHandler);
            this.gameChangeHandler();
            // //玩吧中的玩一玩平台,打印消息
            // if (platform.sdk) {
            // 	logger.log("platform.sdk====", platform.sdk);
            // }
            // if (platform.sdk && platform.sdk.type == platform.WB && platform.sdk.pf == "wanba_ts.105") {
            // 	this.setBackAndCity(0.8, 120);
            // 	this.groupGold.right = 33;
            // 	this.groupRecharge.right = 162;
            // }
            // else {
            // 	this.setBackAndCity(1, 78);
            // }
        };
        // private setBackAndCity(scale: number, pos: number) {
        // 	this.btnBack.scaleX = this.btnBack.scaleY = scale;
        // 	//this.btnBack.x = this.btnBack.y = pos;
        // 	this.btnCity.scaleX = this.btnCity.scaleY = scale;
        // 	//this.btnCity.x = this.btnCity.y = pos;
        // }
        MainTopView.prototype.clear = function () {
        };
        MainTopView.prototype.add = function () {
            if (!this.parent) {
                this._parent.addChild(this);
                //this._parent.touchEnabled = this._parent.touchChildren = true;
            }
        };
        MainTopView.prototype.remove = function () {
            if (this.parent) {
                this.parent.removeChild(this);
                //this._parent.touchEnabled=this._parent.touchChildren=false;
            }
        };
        MainTopView.prototype.gameChangeHandler = function () {
            this.stopCountDown();
            if (!app.gameContext.manager.gameCurrent)
                return;
            var gameType = app.gameContext.manager.gameCurrent.type;
            switch (gameType) {
                case TypeGame.GOD_DIE:
                    this.labMapName.text = Language.C_YZLX;
                    break;
                case TypeGame.BEGIN:
                    this.labMapName.text = "";
                    break;
                case TypeGame.CITY:
                    this.labMapName.text = "";
                    break;
                case TypeGame.ATKCITY:
                case TypeGame.CHAPTER_BOSS:
                    {
                        this.labMapName.text = GameModels.chapter.mainCityTemplate.name + Language.getExpression(Language.E_D1G, !GameModels.chapter.isAutoAtt ? GameModels.chapter.totalChapter : GameModels.chapter.getChapterRewardBuyNowChapter().order.toString());
                    }
                    break;
                case TypeGame.CROSS_CITY:
                    {
                        this.labMapName.text = app.gameContext.manager.getGameCrossCity().mapData.name;
                    }
                    break;
                case TypeGame.KING_BATTLE_GROUD:
                    {
                        var temp = Templates.getTemplateById(templates.Map.SCENEACTIVITY, mo.ModelActivityNotice.KING_BATTLEFIELD);
                        this.labMapName.text = temp.name;
                    }
                    break;
                case TypeGame.LEGION_WAR:
                    {
                        var temp = Templates.getTemplateById(templates.Map.SCENEACTIVITY, mo.ModelActivityNotice.LEGION_WAR);
                        this.labMapName.text = temp.name;
                    }
                    break;
                case TypeGame.GOD_DIE:
                    {
                        this.labMapName.text = app.gameContext.manager.getGameGodDie().mapData.name;
                    }
                    break;
                case TypeGame.PEAKS_FIGHT:
                case TypeGame.CROSS_PEAKS_FIGHT:
                    {
                    }
                    break;
                case TypeGame.PAGODA_PET: {
                    this.labMapName.text = Language.C_WST;
                    break;
                }
                case TypeGame.PAGODA_LOCK: {
                    this.labMapName.text = Language.C_SLT;
                    break;
                }
                case TypeGame.PAGODA_WUHUN: {
                    this.labMapName.text = Language.C_WHT;
                    break;
                }
                case TypeGame.LADDER_FIGHT1:
                case TypeGame.LADDER_FIGHT: {
                    this.labMapName.text = Language.C_JJC;
                    break;
                }
                case TypeGame.EXPEDITION:
                case TypeGame.EXPEDITION_SUPPORT: {
                    if (GameModels.legion.currStep) {
                        this.labMapName.text = Language.getExpression(Language.E_D1G, GameModels.legion.currStep);
                    }
                    else {
                        this.labMapName.text = "";
                    }
                    break;
                }
                case TypeGame.SHILITA_1:
                case TypeGame.SHILITA_2:
                case TypeGame.SHILITA_3: {
                    var copyVO = app.gameContext.manager.gameCurrent.copyVO;
                    if (copyVO) {
                        this.labMapName.text = Language.getExpression(Language.E_D1G, copyVO.step);
                    }
                    else {
                        this.labMapName.text = "";
                    }
                    break;
                }
                case TypeGame.KING_WAR:
                    this.labMapName.text = Language.J_WZZB;
                    break;
                case TypeGame.WUGUAN_FIGHT:
                    this.labMapName.text = Language.J_WG;
                    break;
                default: {
                    var copyVO = app.gameContext.manager.gameCurrent.copyVO;
                    if (copyVO) {
                        this.labMapName.text = copyVO.template.name;
                    }
                    else {
                        if (gameType == TypeGame.MATERIAL) {
                            this.labMapName.text = Language.C_CLFB;
                        }
                    }
                    break;
                }
            }
            if (TypeGame.hasEndCoundDown(gameType)) {
                var lastTime;
                switch (app.gameContext.typeGame) {
                    case TypeGame.LEGION_WAR:
                        lastTime = GameModels.sceneLegin.lastTime;
                        break;
                    case TypeGame.KING_BATTLE_GROUD:
                        lastTime = GameModels.sceneKingBattle.activityLastTime;
                        break;
                    default: {
                        lastTime = GameModels.scene.leftTime >= 0 ? GameModels.scene.leftTime : TypeGame.getCopyLimitTime(app.gameContext.typeGame);
                        break;
                    }
                }
                this.initCountdown(lastTime);
                app.gameContext.manager.gameCurrent.onStart(this, this.gameStartHandler);
            }
        };
        MainTopView.prototype.gameStartHandler = function () {
            app.gameContext.manager.gameCurrent.offStart(this, this.gameStartHandler);
            this.startCountdown();
        };
        MainTopView.prototype.updateFight = function () {
            var total = GameModels.user.player.getProperty(TypeProperty.ALLFIGHT);
            this.blabFight.text = "" + total;
            var gameType = app.gameContext.typeGame;
            tips.FightTip.instance.updateFight(total);
        };
        MainTopView.prototype.eudemonsFightChange = function (e) {
            this.updateFight();
        };
        MainTopView.prototype.updateGold = function () {
            this.labMoney.text = convert.formatGold(GameModels.user.player.gold);
        };
        MainTopView.prototype.updateUnbindedGold = function () {
            this.labDiamond.text = "" + GameModels.user.player.diamonds;
        };
        MainTopView.prototype.goRecharge = function (e) {
            /**黄纪珊 */
            GameModels.recharge.openRechargeDialog();
        };
        MainTopView.prototype.goGoldRecharge = function (e) {
            mg.alertManager.showAlert(PropOfSourceAlert, true, true, ConfigData.GOLD);
        };
        // private stateAutoXpHandler(e: egret.Event): void {
        // 	this.iconXPSettingRed.visible = false;
        // 	// var firstXpSetting: boolean = !!game.state.getItem(GameModels.user.player.uid, 'firstXpSetting');
        // 	// var firstMergeSetting: boolean = !!game.state.getItem(GameModels.user.player.uid, 'firstMergeSetting');
        // 	// if (firstXpSetting == true && firstMergeSetting == true) {
        // 	// 	this.iconXPSettingRed.visible = false;
        // 	// }
        // 	// else {
        // 	// 	this.iconXPSettingRed.visible = true;
        // 	// }
        // 	// if (GameModels.user.player.level < 50) {
        // 	// 	this.iconXPSettingRed.visible = false;
        // 	// }
        // }
        MainTopView.prototype.touchHandler = function (e) {
            mg.uiManager.show(dialog.setting.SettingDialog);
        };
        MainTopView.prototype.showPetClick = function (e) {
            for (var i = 0; i < 4; i++) {
                if (this._pets[i] == e.currentTarget) {
                    var isUnLock = GameModels.pet.isPosUnLock(i + 1);
                    var hasPet = GameModels.pet.hasPetPos(i + 1);
                    if (!isUnLock) {
                        mg.alertManager.tip(Language.J_ZXRWKQ);
                        return;
                    }
                    if (!hasPet) {
                        if (GameModels.pet.formatDownVOList.length <= 0) {
                            mg.alertManager.tip(Language.J_MYKRMHS);
                        }
                        else {
                            mg.uiManager.show(dialog.role.RoleMainDialog);
                        }
                        return;
                    }
                    mg.uiManager.show(dialog.role.RoleMainDialog, { tabIndex: 0, param: i + 1 });
                    return;
                }
            }
        };
        MainTopView.prototype.formatChange = function () {
            for (var i = 0; i < 4; i++) {
                var petVO = GameModels.pet.getFormatUpVOByPos(i + 1);
                this._pets[i].initializeData(petVO, GameModels.pet.isPosUnLock(i + 1), i);
            }
        };
        MainTopView.prototype.hpChange = function () {
            var petVO = GameModels.pet.getFormatUpVOByPos(0);
            if (petVO) {
                //this.hpBar.value = (petVO.hp / petVO.hpMax) * 100;
            }
            // if (TypeGame.isRedViewEffect()) {
            // 	var hp: number = Math.floor(GameModels.user.player.hp / GameModels.user.player.hpMax * 100);
            // 	var isHeTi: boolean = false;
            // 	for (var i = 0; i < GameModels.user.player.petList.upFormats.length; i++) {
            // 		if (GameModels.user.player.petList.upFormats[i].isMerged) {
            // 			isHeTi = true;
            // 			break;
            // 		}
            // 	}
            // 	if (hp <= 30 && hp > 0 && !isHeTi) {
            // 		if (!this.isShowHpEffect) {
            // 			this.isShowHpEffect = true;
            // 			if (GameModels.user.player.level < 100) {
            // 				mg.alertManager.tip(Language.J_HWWJKYHZ);
            // 			}
            // 			mg.effectManager.addBeAttackedEffect(true);
            // 		}
            // 	}
            // 	else {
            // 		if (this.isShowHpEffect) {
            // 			this.isShowHpEffect = false;
            // 			mg.effectManager.removeBeAttackedEffect();
            // 		}
            // 	}
            // }
            // else {
            // 	this.isShowHpEffect = false;
            // 	mg.effectManager.removeBeAttackedEffect();
            // }
        };
        MainTopView.prototype.levelChange = function () {
            this.labLevel.text = GameModels.user.player.level + "";
            GameModels.platform.uploadLevelUp();
            //this.stateAutoXpHandler(null);
        };
        MainTopView.prototype.vipChange = function () {
            this.btnVip.imageSource = "vipBtn_json.vip_" + GameModels.user.player.vip;
        };
        MainTopView.prototype.headChange = function () {
            this.imgHead.source = ResPath.getPlayerIconSmall(GameModels.user.player.headIcon);
        };
        MainTopView.prototype.onClick = function (e) {
            switch (e.target) {
                case this.btnRank:
                    if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.rank, -1, true))
                        return;
                    mg.uiManager.show(dialog.rank.RankingMainDialog);
                    break;
                case this.btnShop:
                    /**黄纪珊 */
                    GameModels.recharge.openRechargeDialog();
                    break;
                case this.btnVip:
                    mg.uiManager.show(view.vip.VipMianDailog);
                    break;
                case this.btnZhuangBan:
                    mg.uiManager.show(dialog.fashion.FashionMainDialog);
                    break;
            }
        };
        MainTopView.prototype.initCountdown = function (lastTime) {
            this._countDonwLastTime = lastTime;
            this.labTime.text = Language.C_DJS + ":" + this.delHourTime(utils.DateUtil.formatTimeLeft(this._countDonwLastTime));
        };
        MainTopView.prototype.startCountdown = function () {
            utils.timer.loop(1000, this, this.lastTimeLoop, true);
        };
        MainTopView.prototype.stopCountDown = function () {
            utils.timer.clear(this, this.lastTimeLoop);
            this.labTime.text = "";
        };
        MainTopView.prototype.lastTimeLoop = function () {
            this._countDonwLastTime--;
            if (this._countDonwLastTime <= 0) {
                this.labTime.text = "";
                utils.timer.clear(this, this.lastTimeLoop);
            }
            this.labTime.text = Language.C_DJS + ":" + this.delHourTime(utils.DateUtil.formatTimeLeft(this._countDonwLastTime));
        };
        MainTopView.prototype.delHourTime = function (time) {
            return time.slice(3);
        };
        MainTopView.prototype.formatExp = function (exp) {
            var farmExp;
            if ((exp / 100000000) >= 1) {
                farmExp = exp / 100000000;
                farmExp = farmExp.toFixed(1) + Language.Z_YI;
            }
            else if ((exp / 10000) >= 1) {
                farmExp = exp / 10000;
                farmExp = farmExp.toFixed(1) + Language.Z_WAN;
            }
            else {
                farmExp = exp;
            }
            return farmExp;
        };
        return MainTopView;
    }(ui.MainTopSkin));
    main.MainTopView = MainTopView;
    __reflect(MainTopView.prototype, "main.MainTopView");
})(main || (main = {}));

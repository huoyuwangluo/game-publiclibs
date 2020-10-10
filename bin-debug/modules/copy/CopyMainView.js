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
var copy;
(function (copy) {
    var CopyMainView = (function (_super) {
        __extends(CopyMainView, _super);
        function CopyMainView() {
            var _this = _super.call(this) || this;
            _this._bossBloodWidth = 336;
            _this._ownerBloodWidth = 143;
            _this._bossBloodImg = ["copy_json.boss_blood_5", "copy_json.boss_blood_6", "copy_json.boss_blood_7", "copy_json.boss_blood_8"];
            _this._bossBloodImgBg = ["copy_json.boss_blood_1", "copy_json.boss_blood_2", "copy_json.boss_blood_3", "copy_json.boss_blood_4"];
            _this._nowbloodnum = 1; //当前第几管血
            /**显示仙童特效*/
            _this._xianTongEffectList = {};
            _this.num = 0;
            return _this;
        }
        Object.defineProperty(CopyMainView, "instance", {
            get: function () {
                if (!CopyMainView._instance) {
                    CopyMainView._instance = new CopyMainView();
                }
                return CopyMainView._instance;
            },
            enumerable: true,
            configurable: true
        });
        CopyMainView.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._bossBloodWidth = this.bossBlood.width;
            this._ownerBloodWidth = this.belongBlood.width;
            this.shieldGroup.visible = false;
            this.shieldReward.visible = false;
            this.relifeView.visible = false;
            this.btnJoin.visible = false;
            this.btnShengZhi.visible = false;
            this.unionSkillItem.visible = false;
            // this._petItemsPosY = [];
            // this._petItems = [this.pet0, this.pet1, this.pet2, this.pet3];
            // for (var petItem of this._petItems) {
            // 	petItem.enableHandler();
            // 	this._petItemsPosY.push(petItem.y);
            // }
            // this._petItemsPosY[3] = this.yuanGroup.y;
            this.unionSkillItem.bottom = (platform.sdk && platform.sdk.uiOffsetY) ? 190 + platform.sdk.uiOffsetY : 190;
            this.hideBossBlood();
        };
        /**切换界面状态 */
        CopyMainView.prototype.switchState = function (type) {
            this.btnJoin.visible = false;
            this.btnShengZhi.visible = false;
            this.unionSkillItem.visible = TypeGame.isFormationGame(true) && !TypeGame.noHaveLegionSkill();
            if (this.unionSkillItem.visible) {
                this.unionSkillItem.enter();
            }
            switch (type) {
                case TypeGame.MATERIAL:
                    this.currentState = 'material';
                    this.bloodGroup.visible = false;
                    this.countdownGroup.visible = false;
                    this.countDownTime.text = "";
                    copy.GameMaterialUI.instance.setMaterialShow(true);
                    copy.GameMaterialMaiGuUI.instance.setMaiGuSkillIconShow(false);
                    //this.materialInfo.enter(false);
                    GameModels.copyMaterial.onTimeChange(this, this.timerHandler);
                    break;
                case TypeGame.MATERIAL_PHAMTOM:
                    this.currentState = 'material';
                    this.bloodGroup.visible = false;
                    copy.GameMaterialUI.instance.setMaterialShow(true);
                    copy.GameMaterialMaiGuUI.instance.setMaiGuSkillIconShow(false);
                    //this.materialInfo.enter(true);
                    break;
                case TypeGame.MATERIAL_MAIGU:
                    this.currentState = 'material';
                    this.bloodGroup.visible = false;
                    copy.GameMaterialUI.instance.setMaterialShow(false);
                    copy.GameMaterialMaiGuUI.instance.setMaiGuSkillIconShow(true);
                    copy.GameMaterialMaiGuUI.instance.enter();
                    break;
                case TypeGame.CITY:
                    this.currentState = 'fight';
                    break;
                case TypeGame.LADDER_FIGHT:
                case TypeGame.LADDER_FIGHT1:
                case TypeGame.CROSS_CITY:
                case TypeGame.KING_WAR:
                case TypeGame.EXPEDITION:
                case TypeGame.EXPEDITION_SUPPORT:
                case TypeGame.GOD_RUINS_FIGHT:
                case TypeGame.FRIEND_DISCUSS_WAR:
                case TypeGame.WUGUAN_FIGHT:
                case TypeGame.TOP_BATTLE_ROOM:
                    this.currentState = 'fight';
                    break;
                case TypeGame.CROSS_PET_FIGHT:
                    this.currentState = 'petfight';
                    break;
                case TypeGame.PERSONAL_BOSS:
                //case TypeGame.WUDOU_BOSS:
                case TypeGame.CHAPTER_BOSS:
                case TypeGame.DOOR_BOSS:
                case TypeGame.HONGYAN_BOSS:
                    this.currentState = 'personboss';
                    this.bloodGroup.visible = false;
                    this.rewardGroup.visible = false;
                    if (type == TypeGame.CHAPTER_BOSS || type == TypeGame.DOOR_BOSS) {
                        this.rewardGroup.visible = true;
                        this.showChapterReward();
                    }
                    if (TypeFunOpen.isOpen(s.UserfaceName.shengZhiMain) && type == TypeGame.CHAPTER_BOSS) {
                        this.btnShengZhi.visible = true;
                    }
                    else {
                        this.btnShengZhi.visible = false;
                    }
                    break;
                case TypeGame.FAMILY_BOSS:
                case TypeGame.GOD_DOMAIN:
                case TypeGame.DEATH_BOSS:
                    this.currentState = 'everyboss';
                    this.bloodGroup.visible = false;
                    if (GameModels.user.player.level >= 20 || GameModels.user.player.vip >= 1) {
                        this.btnJoin.visible = true;
                    }
                    break;
                case TypeGame.EVERYONE_BOSS:
                case TypeGame.EVERYONE_BOSS_GUIDE:
                case TypeGame.DEMON_INTRUSION:
                case TypeGame.HOLIDAY_BOSS:
                case TypeGame.COPY_BOSS_FANTASY:
                case TypeGame.LOSE_BOSS:
                case TypeGame.WOORS_BOSS:
                    this.currentState = 'everyboss';
                    this.bloodGroup.visible = false;
                    break;
                case TypeGame.PAGODA_WUHUN:
                case TypeGame.PAGODA_LOCK:
                case TypeGame.PAGODA_PET:
                case TypeGame.SHILITA_1:
                case TypeGame.SHILITA_2:
                case TypeGame.SHILITA_3:
                    this.currentState = 'petpagoda';
                    this.bloodGroup.visible = false;
                    break;
                case TypeGame.LEGION_WAR:
                    this.currentState = 'legionwar';
                    break;
                case TypeGame.KING_BATTLE_GROUD:
                    this.currentState = 'kingbattlefield';
                    break;
                case TypeGame.GOD_DIE:
                    this.currentState = 'goddie';
                    break;
                case TypeGame.JUE_DI_QIU_SHENG:
                    this.currentState = 'juedi';
                    break;
                case TypeGame.CAMP_BATTLE_WAR:
                    this.currentState = 'campBattle';
                    break;
                case TypeGame.TEAM_COPY_FIGHT:
                    this.bloodGroup.visible = false;
                    this.currentState = 'teamcopy';
                    break;
                case TypeGame.CROSS_BOSS:
                case TypeGame.SECRET_BOSS:
                    this.currentState = 'crossboss';
                    this.bloodGroup.visible = false;
                    break;
                case TypeGame.PEAKS_FIGHT:
                case TypeGame.CROSS_PEAKS_FIGHT:
                    this.currentState = 'peaksBattle';
                    break;
            }
            //this.initializePetData();
            // var petVO: vo.GamePetVO = GameModels.pet.getFormatUpVOByPos(4);
            // if (!!petVO) petVO.onSupportStateChange(this, this.initializePetData);
            //GameModels.pet.addEventListener(mo.ModelPet.FORMAT_CHANGE, this.initializePetData, this);
            app.gameContext.manager.onGameChange(this, this.gameChangeHandler);
            this.gameChangeHandler();
            this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnJoinClick, this);
            this.btnShengZhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnShengZhiClick, this);
            this.icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRewardClick, this);
        };
        CopyMainView.prototype.showChapterReward = function () {
            var temp = GameModels.chapter.getChapterRewardBuyNowChapter();
            this.labDes.text = Language.C_TG + temp.order + Language.Z_G;
            this.icon.source = temp.id < 3 ? "chapterMap_json.img_chapterReward" + temp.id : "chapterMap_json.img_chapterReward" + temp.rewards.split("_")[0];
        };
        /**复位界面状态 */
        CopyMainView.prototype.resetState = function (type) {
            this.hideBossBlood();
            this.hideDeadTip();
            this.unionSkillItem.exit();
            switch (type) {
                case TypeGame.MATERIAL:
                case TypeGame.MATERIAL_PHAMTOM:
                    //this.materialInfo.exit();
                    break;
                case TypeGame.MATERIAL_MAIGU:
                    //this.materialMaiguInfo.exit();
                    copy.GameMaterialMaiGuUI.instance.exit();
                    break;
            }
            // GameModels.pet.removeEventListener(mo.ModelPet.FORMAT_CHANGE, this.initializePetData, this);
            // var petVO: vo.GamePetVO = GameModels.pet.getFormatUpVOByPos(4);
            // if (!!petVO) petVO.offSupportStateChange(this, this.initializePetData);
            // if (this._petItems) {
            // 	for (var petItem of this._petItems) {
            // 		petItem.reset();
            // 	}
            // }
            this.btnShengZhi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnShengZhiClick, this);
            GameModels.copyMaterial.offTimeChange(this, this.timerHandler);
        };
        CopyMainView.prototype.btnJoinClick = function () {
            // TypeGame.FAMILY_BOSS
            // TypeGame.GOD_DOMAIN
            // TypeGame.DEATH_BOSS
            var id = 0;
            if (app.gameContext.typeGame == TypeGame.FAMILY_BOSS) {
                id = 2055;
            }
            else if (app.gameContext.typeGame == TypeGame.GOD_DOMAIN) {
                id = 2056;
            }
            else {
                id = 2057;
            }
            var tem = Templates.getTemplateById(templates.Map.SYSNOTICE, id);
            var str = "{" + app.gameContext.gameCurrent.copyVO.id + "}";
            var desc = tem.desc.replace("{0}", str);
            GameModels.chat.sendHandler(TypeChatChannel.LEGION, desc);
        };
        CopyMainView.prototype.btnShengZhiClick = function (e) {
            mg.uiManager.show(pet.PetGroupMain);
        };
        CopyMainView.prototype.btnRewardClick = function (e) {
            mg.alertManager.showAlert(MainChapterRewardAlter, false, true, GameModels.chapter.data.Id, 2);
        };
        // public initializePetData(): void {
        // 	this._petPos = [];
        // 	this.imgYuan.visible = false;
        // 	for (var i: number = 0; i < 4; i++) {
        // 		if (i == 3) {
        // 			this.yuanGroup.y = this._petItemsPosY[i];
        // 		}
        // 		else {
        // 			this._petItems[i].y = this._petItemsPosY[i];
        // 		}
        // 		this._petPos.push(this._petItemsPosY[i]);
        // 		var petVO: vo.GamePetVO = GameModels.pet.getFormatUpVOByPos(i + 1);
        // 		this._petItems[i].initializeData(petVO, i);
        // 		if (!!petVO) {
        // 			this._petItems[i].visible = petVO.template.job == 5
        // 		}
        // 		else {
        // 			this._petItems[i].visible = false;
        // 		}
        // 		if (i == 3 && !!petVO) {
        // 			this.imgYuan.visible = petVO.template.job == 5;
        // 			this.yuanGroup.filters = petVO.isSupport ? utils.filterUtil.grayFilters : null;
        // 			this.yuanGroup.touchEnabled = this.yuanGroup.touchChildren = petVO.isSupport ? false : true;
        // 		}
        // 	}
        // 	var index: number = 0;
        // 	for (var i = 0; i < 4; i++) {
        // 		if (this._petItems[i].visible) {
        // 			if (i == 3) {
        // 				this.yuanGroup.y = this._petPos[index];
        // 			}
        // 			else {
        // 				this._petItems[i].y = this._petPos[index];
        // 			}
        // 			index++;
        // 		}
        // 	}
        // }
        CopyMainView.prototype.timerHandler = function () {
            if (GameModels.copyMaterial.scoreStarTime - GameModels.copyMaterial.timeCost <= 10) {
                this.countdownGroup.visible = true;
                this.countDownTime.text = (GameModels.copyMaterial.scoreStarTime - GameModels.copyMaterial.timeCost).toString();
            }
            else {
                this.countdownGroup.visible = false;
            }
        };
        CopyMainView.prototype.gameChangeHandler = function () {
            this.stopCountDown();
            if (!app.gameContext.manager.gameCurrent)
                return;
            var gameType = app.gameContext.manager.gameCurrent.type;
            if (TypeGame.hasEndCoundDown(gameType)) {
                var lastTime;
                switch (app.gameContext.typeGame) {
                    case TypeGame.PAGODA_LOCK:
                    case TypeGame.PAGODA_PET:
                        lastTime = 30;
                        break;
                    case TypeGame.PAGODA_WUHUN:
                        lastTime = 120;
                        break;
                }
                this.initCountdown(lastTime);
                app.gameContext.manager.gameCurrent.onStart(this, this.gameStartHandler);
            }
        };
        CopyMainView.prototype.gameStartHandler = function () {
            app.gameContext.manager.gameCurrent.offStart(this, this.gameStartHandler);
            this.startCountdown();
        };
        CopyMainView.prototype.initCountdown = function (lastTime) {
            this._countDonwLastTime = lastTime;
            this.expProgress.visible = true;
            switch (app.gameContext.typeGame) {
                case TypeGame.PAGODA_LOCK:
                case TypeGame.PAGODA_PET:
                    this.expProgress.noTweenValue = this._countDonwLastTime / 30;
                    break;
                case TypeGame.PAGODA_WUHUN:
                    this.expProgress.noTweenValue = this._countDonwLastTime / 120;
                    break;
            }
            this.labTime1.text = utils.DateUtil.formatTimeLeft(this._countDonwLastTime);
        };
        CopyMainView.prototype.startCountdown = function () {
            utils.timer.loop(1000, this, this.lastTimeLoop, true);
        };
        CopyMainView.prototype.stopCountDown = function () {
            utils.timer.clear(this, this.lastTimeLoop);
            this.expProgress.visible = false;
            this.labTime1.text = "";
            this.countdownGroup.visible = false;
            this.countDownTime.text = "";
        };
        CopyMainView.prototype.lastTimeLoop = function () {
            this._countDonwLastTime--;
            if (this._countDonwLastTime <= 0) {
                this.expProgress.visible = false;
                this.labTime1.text = "";
                utils.timer.clear(this, this.lastTimeLoop);
            }
            if (this._countDonwLastTime <= 10) {
                this.countdownGroup.visible = true;
                this.countDownTime.text = this._countDonwLastTime.toString();
            }
            this.expProgress.visible = true;
            switch (app.gameContext.typeGame) {
                case TypeGame.PAGODA_LOCK:
                case TypeGame.PAGODA_PET:
                    this.expProgress.noTweenValue = this._countDonwLastTime / 30;
                    break;
                case TypeGame.PAGODA_WUHUN:
                    this.expProgress.noTweenValue = this._countDonwLastTime / 120;
                    break;
            }
            this.labTime1.text = utils.DateUtil.formatTimeLeft(this._countDonwLastTime);
        };
        CopyMainView.prototype.showBossComming = function (petId) {
            if (this._bosscommingMovie == null) {
                this._bosscommingMovie = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
                this._bosscommingMovie.resId = "shoujiangyingdi";
            }
            var generaltmp = Templates.getTemplateById(templates.Map.GENERAL, petId);
            var dataModel = Templates.getTemplateById(templates.Map.DATAMODEL, generaltmp.model);
            this._bosscommingMovie.replaceSlotBitmap("name_frame", ResPath.getPetName(dataModel.resId));
            this._bosscommingMovie.replaceSlotImage("body_frame", ResPath.getShowPetPath("" + dataModel.resId));
            this._bosscommingMovie.updateReplaceSlot();
            //播放守将声音
            mg.soundManager.playRandomSound(dataModel.bossSound);
            this._bosscommingMovie.x = mg.stageManager.stageWidth / 2 - 50;
            this._bosscommingMovie.y = mg.stageManager.stageHeight / 2;
            this.addChild(this._bosscommingMovie);
            this._bosscommingMovie.timeScale = 1.5;
            this._bosscommingMovie.playOnce("animation");
            this._bosscommingMovie.onCompleteOnce(this, function () {
                this._bosscommingMovie.stop();
                if (this._bosscommingMovie.parent) {
                    this._bosscommingMovie.parent.removeChild(this._bosscommingMovie);
                }
            });
        };
        CopyMainView.prototype.showBossDead = function () {
            if (this._bossdeadMovie == null) {
                this._bossdeadMovie = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
                this._bossdeadMovie.resId = "dijiangjisha";
            }
            this._bossdeadMovie.x = mg.stageManager.stageWidth / 2;
            this._bossdeadMovie.y = 450;
            this.addChild(this._bossdeadMovie);
            this._bossdeadMovie.timeScale = 1.0;
            this._bossdeadMovie.playOnce("newAnimation");
            this._bossdeadMovie.onCompleteOnce(this, function () {
                this._bossdeadMovie.stop();
                if (this._bossdeadMovie.parent) {
                    this._bossdeadMovie.parent.removeChild(this._bossdeadMovie);
                }
            });
        };
        CopyMainView.prototype.showCityWin = function () {
            if (this._cityWinMovie == null) {
                this._cityWinMovie = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
                this._cityWinMovie.resId = "gongzhanchengchi";
            }
            this._cityWinMovie.x = mg.stageManager.stageWidth / 2;
            this._cityWinMovie.y = 450;
            this.addChild(this._cityWinMovie);
            this._cityWinMovie.timeScale = 1.0;
            this._cityWinMovie.playOnce("newAnimation");
            this._cityWinMovie.onCompleteOnce(this, function () {
                this._cityWinMovie.stop();
                if (this._cityWinMovie.parent) {
                    this._cityWinMovie.parent.removeChild(this._cityWinMovie);
                }
            });
        };
        CopyMainView.prototype.showXianTongEffect = function (resId) {
            if (resId == 0)
                return;
            if (!this._xianTongEffectList[resId]) {
                this._xianTongEffectList[resId] = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
                this._xianTongEffectList[resId].resId = "camp_skill_" + resId;
                //this._xianTongEffectList[resId].scaleX = this._xianTongEffectList[resId].scaleY = 0.5;
                //this._xianTongEffectList[resId].timeScale = 0.8;
            }
            this._xianTongEffectList[resId].x = mg.stageManager.stageWidth / 2;
            this._xianTongEffectList[resId].y = mg.stageManager.stageHeight / 2 - 160;
            this.addChild(this._xianTongEffectList[resId]);
            this._xianTongEffectList[resId].playOnce("newAnimation");
            this._xianTongEffectList[resId].onCompleteOnce(this, function () {
                this._xianTongEffectList[resId].stop();
                if (this._xianTongEffectList[resId].parent) {
                    this._xianTongEffectList[resId].parent.removeChild(this._xianTongEffectList[resId]);
                }
            });
        };
        /**
         * 显示BOSS血条
         * @param bossVO
         */
        CopyMainView.prototype.showBossBlood = function (bossVO) {
            this.hideBossBlood();
            this._curBossVO = bossVO;
            if (this._curBossVO) {
                this.bossName.text = this._curBossVO.name;
                this.bossLevel.text = this._curBossVO.level.toString();
                this.bossHead.source = ResPath.getPetIconSmall(this._curBossVO.petId);
                this._curBossVO.onPropertyChange(TypeProperty.Hp, this, this.bossHpChange);
                this._curBossVO.onPropertyChange(TypeProperty.MaxHp, this, this.bossHpChange);
                this._bossbloodNum = 5;
                var mean = this._curBossVO.hpMax / 5;
                var residueBloodNum = Math.floor((this._curBossVO.hpMax - this._curBossVO.hp) / mean);
                this._nowbloodnum = residueBloodNum + 1;
                this._bossbloodNum -= residueBloodNum;
                this.bossBlood.width = 336;
                this.bossBlood0.width = 336;
                this.bossBlood1.width = 336;
                this.bossBlood.source = "copy_json.boss_blood_bar";
                this.bossBlood0.source = this._bossBloodImg[0];
                this.bossBlood1.source = this._bossBloodImgBg[0];
                this.bossBlood.visible = true;
                this.bossBlood0.visible = true;
                this.bossBlood1.visible = true;
                this.bossHpChange();
                this.bloodGroup.visible = true;
                this.labgoddieCount.visible = true;
            }
        };
        /**隐藏BOSS血条 */
        CopyMainView.prototype.hideBossBlood = function () {
            if (this._curBossVO) {
                this._curBossVO.offPropertyChange(TypeProperty.Hp, this, this.bossHpChange);
                this._curBossVO.offPropertyChange(TypeProperty.MaxHp, this, this.bossHpChange);
                this._curBossVO = null;
                this.bossBlood.width = 0;
                this.bossBlood0.width = 0;
                this.bossBlood1.width = 0;
                this.bloodGroup.visible = false;
                this.labgoddieCount.visible = false;
            }
        };
        CopyMainView.prototype.bossHpChange = function () {
            var _this = this;
            if (this._curBossVO.hp <= 0) {
                this._bossbloodNum = 0;
                this.bossBlood.width = 0;
                this.bossBlood0.width = 0;
                this.bossBlood1.width = 0;
                this.bossHp.text = "";
                this.bosshp.text = "";
                if (app.gameContext.typeGame == TypeGame.MATERIAL_MAIGU || app.gameContext.typeGame == TypeGame.DOOR_BOSS) {
                    this.hideBossBlood();
                }
                return;
            }
            //this.bossBlood0.visible = false;
            var mean = this._curBossVO.hpMax / 5;
            var everyblood = this._curBossVO.hpMax - mean * this._nowbloodnum;
            if (this.bossBlood.width > 0 && this._curBossVO.hp >= everyblood) {
                var booldWidth = (this._curBossVO.hp - everyblood) / mean * this._bossBloodWidth;
                if (booldWidth >= 336) {
                    this._bossbloodNum = 5;
                    var mean = this._curBossVO.hpMax / 5;
                    var residueBloodNum = Math.floor((this._curBossVO.hpMax - this._curBossVO.hp) / mean);
                    this._nowbloodnum = residueBloodNum + 1;
                    this._bossbloodNum -= residueBloodNum;
                    booldWidth = 336;
                    this.bossBlood0.visible = true;
                    this.bossBlood1.visible = true;
                }
                this.bossBlood.width = booldWidth;
                utils.timer.once(500, this, function (w) {
                    if (_this._curBossVO) {
                        _this.bossBlood0.width = w;
                        if (_this._curBossVO.hp <= 0) {
                            _this.bossBlood0.width = 0;
                            _this.bossBlood1.width = 0;
                        }
                    }
                    else {
                        _this.bossBlood0.width = 0;
                        _this.bossBlood1.width = 0;
                    }
                }, false, booldWidth);
            }
            else {
                this._bossbloodNum--;
                this.bossBlood.width = 336;
                this.bossBlood0.width = 336;
                this._nowbloodnum++;
            }
            if (this._bossbloodNum == 4) {
                this.bossBlood.source = this._bossBloodImg[0];
                this.bossBlood0.source = this._bossBloodImgBg[0];
                this.bossBlood1.source = this._bossBloodImg[1];
            }
            else if (this._bossbloodNum == 3) {
                this.bossBlood.source = this._bossBloodImg[this._bossBloodImg.length - this._bossbloodNum];
                this.bossBlood0.source = this._bossBloodImgBg[this._bossBloodImg.length - this._bossbloodNum];
                var index = this._bossBloodImg.length - this._bossbloodNum + 1 >= 4 ? 0 : this._bossBloodImg.length - this._bossbloodNum + 1;
                this.bossBlood1.source = this._bossBloodImg[index];
            }
            else if (this._bossbloodNum == 2) {
                this.bossBlood.source = this._bossBloodImg[this._bossBloodImg.length - this._bossbloodNum];
                this.bossBlood0.source = this._bossBloodImgBg[this._bossBloodImg.length - this._bossbloodNum];
                this.bossBlood1.source = "copy_json.boss_blood_bar";
            }
            else if (this._bossbloodNum == 1) {
                this.bossBlood.source = "copy_json.boss_blood_bar";
                this.bossBlood0.visible = false;
                this.bossBlood1.visible = false;
            }
            this.bossHp.text = "X" + this._bossbloodNum;
            this.bosshp.text = this._curBossVO.hp + "/" + this._curBossVO.hpMax; //调试用，后续删掉
        };
        /**隐藏死亡提示 */
        CopyMainView.prototype.hideDeadTip = function () {
            mg.uiManager.remove(s.UserfaceName.playerRelife);
        };
        return CopyMainView;
    }(ui.CopyMainViewSkin));
    copy.CopyMainView = CopyMainView;
    __reflect(CopyMainView.prototype, "copy.CopyMainView");
})(copy || (copy = {}));

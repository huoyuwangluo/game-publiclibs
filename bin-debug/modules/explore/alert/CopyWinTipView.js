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
    var CopyWinTipView = (function (_super) {
        __extends(CopyWinTipView, _super);
        function CopyWinTipView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ONE_RATE = 1; //单倍
            _this.TWO_RATE = 2; //双倍
            _this.FROU_RATE = 4; //四倍
            return _this;
        }
        CopyWinTipView.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._stars = [this.star1, this.star2, this.star3];
            this._starList = [this.imgStart1, this.imgStart2, this.imgStart3];
            //Mediator.getMediator(this).onAdd(this, this.enter);
            //Mediator.getMediator(this).onRemove(this, this.exit);
        };
        CopyWinTipView.prototype.close = function () {
            if (this.currentState == "material" || this.currentState == "pagoda" || this.currentState == "ladderpvp" || this.currentState == "collier" ||
                this.currentState == "friendDiscuss" || this.currentState == "teamcopy" || this.currentState == "petfigth") {
                if (this._copyWinVO)
                    this._copyWinVO.call();
                copy.CopyWinInstance.instance.remove();
            }
        };
        CopyWinTipView.prototype.enter = function (copyWinVO) {
            for (var z = this.rewardGroup.numChildren; z >= 0; z--) {
                var btns = this.rewardGroup.getChildAt(z);
                if (btns) {
                    this.rewardGroup.removeChildAt(z);
                }
            }
            if (!this.list.dataProvider)
                this.list.dataProvider = new eui.ArrayCollection();
            this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exitHandler, this);
            this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exitHandler, this);
            this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextHandler, this);
            this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveHandler, this);
            this.btnReceiveDouble.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveHandler, this);
            this.boxChecked.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectedDoubleReward, this);
            this.btnLingQu1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveDoubleGetHandler, this);
            this.btnLingQu2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveDoubleGetHandler, this);
            this.btnLingQu4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveDoubleGetHandler, this);
            this.btnTongJi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTongJiHandler, this);
            this.petGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTongJiHandler, this);
            GameModels.vip.addEventListener(mo.ModelVip.VIPTEQUAN_CHANGE, this.refreshLeftBuyLab, this);
            this._copyWinVO = copyWinVO;
            this.removeBestPetTween();
            // this.imgSanStar.visible = false;
            this.tag.visible = true;
            this.tag.source = "img_explore_win_png";
            mg.layerManager.dialog.addChild(this);
            this.reset();
            if (copyWinVO.dropItems && copyWinVO.dropItems.length) {
                copyWinVO.dropItems.sort(function (a, b) {
                    return b.quality - a.quality;
                });
                this.list.dataProvider.source = copyWinVO.dropItems;
            }
            else {
                this.list.dataProvider.source = null;
            }
            this.btnOK.visible = false;
            this.btnNext.label = this._copyWinVO.isFive ? Language.C_TZXWG : Language.C_TZXYG;
            this.tag.alpha = 0;
            egret.Tween.get(this.tag).to({ alpha: 1 }, 800, utils.Ease.linearNone);
            this.labTip.visible = false;
            this.starGroup.visible = true;
            this.btnTongJi.visible = TypeGame.isFormationGame();
            this.labWinName.text = TypeGame.getName(this._copyWinVO.type);
            switch (copyWinVO.type) {
                case TypeGame.MATERIAL_PHAMTOM:
                    this.currentState = "huanjie";
                    this.setHuanJieView();
                    this.showStar(copyWinVO.star, this, function () {
                        this.showBoxes(this, function () {
                            this.btnOK.visible = true;
                            this.startCloseTime();
                        });
                    });
                    break;
                case TypeGame.MATERIAL:
                    this.currentState = "material";
                    this.starGroup.visible = false;
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                        this.startCloseTime();
                    });
                    break;
                case TypeGame.MATERIAL_MAIGU:
                    this.currentState = "material";
                    this.showStar(3, this, function () {
                        this.showBoxes(this, function () {
                            this.btnOK.visible = true;
                            this.startCloseTime();
                        });
                    });
                    break;
                case TypeGame.EVERYONE_BOSS:
                case TypeGame.PERSONAL_BOSS:
                case TypeGame.LOSE_BOSS:
                case TypeGame.GOD_DOMAIN:
                    this.currentState = "personboss";
                    this.btnReceive.visible = false;
                    this.btnReceiveDouble.visible = false;
                    this.goldGroup.visible = false;
                    this.labLeftDoubleCnt.visible = false;
                    this.doubleGroup.visible = false;
                    var isShow = false;
                    var isLab = false;
                    if (copyWinVO.gold) {
                        var goldItem = new components.RewardItemBox();
                        goldItem.dataSource = copyWinVO.gold;
                        this.rewardGroup.addChild(goldItem);
                    }
                    if (copyWinVO.petDebris) {
                        var petItem = new components.RewardItemBox();
                        petItem.dataSource = copyWinVO.petDebris;
                        this.rewardGroup.addChild(petItem);
                    }
                    if (GameModels.user.player.level < 70 || (!copyWinVO.gold && !copyWinVO.petDebris)) {
                        this.btnReceive.x = 217;
                        this.btnReceive.label = Language.C_QD;
                    }
                    else {
                        this.btnReceive.x = 109;
                        this.btnReceive.label = Language.C_DBJL;
                        var num = GameModels.copyBoss.getDoubleRewardBuyItemNum(GameModels.copyBoss.doubleRewardCnt + 1);
                        this.lab_vip.text = num.toString();
                        isShow = true;
                        if (!GameModels.vip.getRewardBuyType(3)) {
                            isLab = true;
                            this.labLeftDoubleCnt.text = Language.getExpression(Language.E_SYGMSBEWJLCS, 5 - GameModels.copyBoss.doubleRewardCnt);
                        }
                        else {
                            this.boxChecked.selected = GameModels.copyBoss.doubleBol;
                        }
                    }
                    this.lab_vip.visible = true;
                    this.showBoxes(this, function () {
                        this.btnReceive.visible = true;
                        this.btnReceiveDouble.visible = isShow;
                        this.goldGroup.visible = isShow;
                        this.labLeftDoubleCnt.visible = isLab;
                        this.doubleGroup.visible = !isLab;
                        this.startCloseTime();
                    });
                    if (GameModels.task.hasTask && GameModels.task.curTask.type == TypeTask.EVERY_BOSS_GUIDE_20) {
                        GameModels.task.curTask.updateCurrent(1);
                        GameModels.task.requestSubmit();
                    }
                    break;
                case TypeGame.CROSS_BOSS:
                case TypeGame.SECRET_BOSS:
                    this.currentState = "crossboss";
                    if (!(copyWinVO.dropItems && copyWinVO.dropItems.length)) {
                        this.labPrompt.visible = false;
                        this.labTip.visible = true;
                        this.labTip.text = Language.KF_TIP3;
                    }
                    else {
                        this.labTip.visible = false;
                        this.labPrompt.visible = true;
                        this.labPrompt.text = this.checkUser(copyWinVO.winPlayerVO.name) ? (Language.J_HDGSJL + ":") : (Language.J_HDXZJL + ":");
                    }
                    this.labPlayerName.text = "S" + copyWinVO.winPlayerVO.serverId + "." + copyWinVO.winPlayerVO.name;
                    this.imgHead.source = ResPath.getPlayerIconSmall(copyWinVO.winPlayerVO.headIcon);
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                        this.startCloseTime();
                    });
                    break;
                case TypeGame.DEMON_INTRUSION:
                case TypeGame.HOLIDAY_BOSS:
                case TypeGame.FAMILY_BOSS:
                case TypeGame.COPY_BOSS_FANTASY:
                    this.currentState = "everyboss";
                    this.labPlayerName.text = copyWinVO.winPlayerVO.name;
                    this.labPrompt.text = this.checkUser(copyWinVO.winPlayerVO.name) ? (Language.J_HDGSJL + ":") : (Language.J_HDCYJL + ":");
                    this.imgHead.source = ResPath.getPlayerIconSmall(copyWinVO.winPlayerVO.headIcon);
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                        this.startCloseTime();
                    });
                    break;
                case TypeGame.PAGODA_WUHUN:
                case TypeGame.PAGODA_LOCK:
                case TypeGame.PAGODA_PET:
                case TypeGame.SHILITA_1:
                case TypeGame.SHILITA_2:
                case TypeGame.SHILITA_3:
                    this.currentState = "pagoda";
                    this.btnNext.visible = true;
                    this.btnExit.visible = true;
                    this.labCountDown.text = "";
                    //this.startNextTime();
                    this.showBestPetInfo(copyWinVO);
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                        this.startCloseTime();
                    });
                    break;
                case TypeGame.LADDER_FIGHT:
                    this.imgUpGrade.visible = true;
                    this.imgDuanWei.visible = true;
                    this.labGradeNow.visible = true;
                    this.imgDuanWeiBg.visible = true;
                    this.imgJiFen.visible = true;
                    this.new.visible = true;
                    this.labUpJiFen.visible = true;
                    this.imgArrow.visible = true;
                    this.imgJiFenBg.visible = true;
                    this.currentState = "ladderpvp";
                    this.setPropertyData();
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                        this.startCloseTime();
                    });
                    break;
                case TypeGame.LADDER_FIGHT1:
                    this.imgUpGrade.visible = false;
                    this.imgDuanWei.visible = false;
                    this.labGradeNow.visible = false;
                    this.imgDuanWeiBg.visible = false;
                    this.imgJiFen.visible = false;
                    this.new.visible = false;
                    this.labUpJiFen.visible = false;
                    this.imgArrow.visible = false;
                    this.imgJiFenBg.visible = false;
                    this.currentState = "ladderpvp";
                    this.setPropertyData1();
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                        this.startCloseTime();
                    });
                    break;
                case TypeGame.PEAKS_FIGHT:
                case TypeGame.CROSS_PEAKS_FIGHT:
                    this.currentState = "noend";
                    this.setNoendPeaksBattleWin();
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                        this.startCloseTime();
                    });
                    break;
                case TypeGame.DOOR_BOSS:
                case TypeGame.CHAPTER_BOSS:
                    this.currentState = "collier";
                    this.btnNext.visible = false;
                    this.btnExit.visible = false;
                    this.labCountDown.text = "";
                    this.labTime.text = "";
                    if (copyWinVO.type == TypeGame.DOOR_BOSS || copyWinVO.type == TypeGame.CHAPTER_BOSS) {
                        this.img_winBg.source = "copy_boss_winbg5_png";
                        if (copyWinVO.playerLevel && copyWinVO.playerLevel < GameModels.user.player.level) {
                            this._lvMovie = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
                            this._lvMovie.resId = "jiesuan_lvup";
                            var sCurr = "" + copyWinVO.playerLevel;
                            var sNext = "" + GameModels.user.player.level;
                            var animationName = "gg";
                            if (sCurr.length == 1) {
                                if (sNext.length == 1) {
                                    animationName = "gg";
                                    this._lvMovie.replaceSlotImage("lv3", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                                    this._lvMovie.replaceSlotImage("lv6", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                                }
                                else {
                                    animationName = "gs";
                                    this._lvMovie.replaceSlotImage("lv3", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                                    this._lvMovie.replaceSlotImage("lv5", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                                    this._lvMovie.replaceSlotImage("lv6", sNext[1] ? "chapterMap_json." + sNext[1] : "");
                                }
                            }
                            else if (sCurr.length == 2) {
                                if (sNext.length == 2) {
                                    animationName = "ss";
                                    this._lvMovie.replaceSlotImage("lv2", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                                    this._lvMovie.replaceSlotImage("lv3", sCurr[1] ? "chapterMap_json." + sCurr[1] : "");
                                    this._lvMovie.replaceSlotImage("lv5", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                                    this._lvMovie.replaceSlotImage("lv6", sNext[1] ? "chapterMap_json." + sNext[1] : "");
                                }
                                else {
                                    animationName = "sb";
                                    this._lvMovie.replaceSlotImage("lv2", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                                    this._lvMovie.replaceSlotImage("lv3", sCurr[1] ? "chapterMap_json." + sCurr[1] : "");
                                    this._lvMovie.replaceSlotImage("lv4", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                                    this._lvMovie.replaceSlotImage("lv5", sNext[1] ? "chapterMap_json." + sNext[1] : "");
                                    this._lvMovie.replaceSlotImage("lv6", sNext[2] ? "chapterMap_json." + sNext[2] : "");
                                }
                            }
                            else {
                                animationName = "bb";
                                this._lvMovie.replaceSlotImage("lv1", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                                this._lvMovie.replaceSlotImage("lv2", sCurr[1] ? "chapterMap_json." + sCurr[1] : "");
                                this._lvMovie.replaceSlotImage("lv3", sCurr[2] ? "chapterMap_json." + sCurr[2] : "");
                                this._lvMovie.replaceSlotImage("lv4", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                                this._lvMovie.replaceSlotImage("lv5", sNext[1] ? "chapterMap_json." + sNext[1] : "");
                                this._lvMovie.replaceSlotImage("lv6", sNext[2] ? "chapterMap_json." + sNext[2] : "");
                            }
                            this._lvMovie.x = this.width / 2;
                            this._lvMovie.y = 630;
                            this.addChild(this._lvMovie);
                            this._lvMovie.playOnce(animationName);
                        }
                        else {
                            this.showBestPetInfo(copyWinVO);
                        }
                    }
                    var temp = GameModels.chapter.getChapterRewardBuyNowChapter();
                    logger.log("11111111111=", GameModels.chapter.autoFightBoss);
                    logger.log("22222222222=", GameModels.chapter.totalChapter + 1);
                    logger.log("33333333333=", GameModels.wenguanTask.wenguanChapter);
                    logger.log("44444444444=", temp.order);
                    if (this._copyWinVO.type == TypeGame.CHAPTER_BOSS && GameModels.chapter.autoFightBoss) {
                        if ((GameModels.wenguanTask.wenguanChapter != 0 && GameModels.chapter.totalChapter + 1 > GameModels.wenguanTask.wenguanChapter) || GameModels.chapter.totalChapter + 1 > temp.order) {
                            this.showBoxes(this, function () {
                                this.btnOK.visible = true;
                                this.startCloseTime();
                            });
                        }
                        else {
                            this.btnNext.visible = true;
                            this.btnExit.visible = true;
                            this.startNextTime();
                        }
                    }
                    else {
                        this.showBoxes(this, function () {
                            this.btnOK.visible = true;
                            this.startCloseTime();
                        });
                    }
                    break;
                // case TypeGame.HONGYAN_BOSS:
                //     this.currentState = "collier";
                //     this.img_winBg.source = "copy_boss_winbg3_png";
                //     this.showBoxes(this, function () {
                //         this.btnOK.visible = true;
                //         this.startCloseTime();
                //     });
                //     break;
                case TypeGame.KING_WAR:
                case TypeGame.EXPEDITION:
                case TypeGame.EXPEDITION_SUPPORT:
                    this.currentState = "collier";
                    this.labTime.text = "";
                    this.btnNext.visible = false;
                    this.btnExit.visible = false;
                    this.labMaxHide.visible = true;
                    this.labCountDown.text = "";
                    this.showBestPetInfo(copyWinVO);
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                    });
                    break;
                case TypeGame.CROSS_PET_FIGHT:
                    this.currentState = "petfigth";
                    this.showPetfigthInfo();
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                    });
                    break;
                case TypeGame.FRIEND_DISCUSS_WAR:
                    this.currentState = "friendDiscuss";
                    this.showBestPetInfo(copyWinVO);
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                        this.startCloseTime();
                    });
                    break;
                case TypeGame.WUGUAN_FIGHT:
                    this.imgDuanWeiBg.visible = true;
                    this.imgJiFenBg.visible = true;
                    this.currentState = "wuguan";
                    var wuguanData = GameModels.legion.SelfInfo;
                    var step = wuguanData ? wuguanData.Step : 13;
                    var campWuCurr = Templates.getTemplateByProperty(templates.Map.CAMPWU, "step", step);
                    this.labCurrStep.text = campWuCurr.name;
                    this.labCurrCount.text = campWuCurr.rewards.split(";")[0].split("_")[1];
                    var campWuNext = Templates.getTemplateByProperty(templates.Map.CAMPWU, "step", step - 1);
                    this.labNextStep.text = campWuNext ? campWuNext.name : campWuCurr.name;
                    this.labNextCount.text = campWuNext ? campWuNext.rewards.split(";")[0].split("_")[1] : campWuCurr.rewards.split(";")[0].split("_")[1];
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                        this.startCloseTime();
                    });
                    break;
                case TypeGame.JUE_DI_QIU_SHENG:
                    this.currentState = "juedi";
                    this.labRankingName.text = Language.getExpression(Language.E_D1M, this._copyWinVO.ranking);
                    this.labPlayerName.text = GameModels.user.player.name;
                    this.imgHead.source = ResPath.getPlayerIconSmall(GameModels.user.player.headIcon);
                    if (this._copyWinVO.ranking != 1) {
                        this.tag.source = "img_explore_fail_png";
                    }
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                        this.startCloseTime();
                    });
                    break;
                case TypeGame.TEAM_COPY_FIGHT:
                    this.currentState = "teamcopy";
                    if (this._copyWinVO.endParam == "0") {
                        this.labPrompt.text = Language.J_HDTGJL;
                    }
                    else {
                        this.labPrompt.text = Language.J_HDXZJL;
                    }
                    if (this._copyWinVO.dropItems.length <= 0) {
                        this.labTip.visible = true;
                        this.labTip.text = Language.J_JLCSYYW;
                    }
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                        this.startCloseTime();
                    });
                    break;
                case TypeGame.DEATH_BOSS:
                case TypeGame.WOORS_BOSS:
                    this.currentState = "crossboss";
                    this.labTip.visible = false;
                    this.labPrompt.visible = true;
                    this.labPrompt.text = this.checkUser(copyWinVO.winPlayerVO.name) ? (Language.J_HDGSJL + ":") : (Language.J_HDXZJL + ":");
                    this.labPlayerName.text = copyWinVO.winPlayerVO.name;
                    this.imgHead.source = ResPath.getPlayerIconSmall(copyWinVO.winPlayerVO.headIcon);
                    this.showBoxes(this, function () {
                        this.btnOK.visible = true;
                        this.startCloseTime();
                    });
            }
        };
        // private get copyWinVODropItemslength(): boolean {
        //     if (this._copyWinVO && this._copyWinVO.dropItems && this.currentState == "huanjie") {
        //         return this._copyWinVO.dropItems.length >= 2;
        //     }
        //     return false;
        // }
        CopyWinTipView.prototype.showBestPetInfo = function (copyWinVO) {
            if (!copyWinVO)
                return;
            var selfList = copyWinVO.selfEndVo.getVoListByType(0);
            var pet = selfList[0];
            logger.log("petiddddddddddddddddd=", pet.petId);
            var petTmp = Templates.getTemplateById(templates.Map.GENERAL, pet.petId);
            this.imgPLayerHead.source = ResPath.getPlayerIconSmall(petTmp.model.toString());
            var skillArr = petTmp.skill.split(";");
            var hashFourSkill = skillArr.length >= 4 && skillArr[skillArr.length - 1] != "-1";
            this.imgPlayerQuality.source = ResPath.getLingXingQualityByStar(pet.petStar, hashFourSkill);
            this.addBestPetTween();
        };
        CopyWinTipView.prototype.addBestPetTween = function () {
            this.petGroup.x = 378;
            this.petGroup.visible = true;
            egret.Tween.get(this.petGroup).to({ x: 170 }, 500, egret.Ease.backOut);
        };
        CopyWinTipView.prototype.removeBestPetTween = function () {
            this.petGroup.x = 378;
            this.petGroup.visible = false;
            egret.Tween.removeTweens(this.petGroup);
        };
        CopyWinTipView.prototype.btnTongJiHandler = function () {
            if (!TypeGame.isFormationGame())
                return;
            this.stopCloseTime();
            this.stopNextDown();
            this.labCountDown.text = "";
            this.labTime.text = "";
            mg.alertManager.showAlert(CopyBattleStatistics, true, true, this._copyWinVO.selfEndVo, this._copyWinVO.otherEndVo);
        };
        CopyWinTipView.prototype.setHuanJieView = function () {
            // if (this.copyWinVODropItemslength) {
            //     this.imgSanStar.visible = true;
            // }
            var vo = GameModels.copyMaterial.currCopyVo;
            if (vo.step >= 15) {
                this.btnLingQu4.filters = null;
                this.btnLingQu4.touchEnabled = true;
            }
            else {
                this.btnLingQu4.filters = utils.filterUtil.grayFilters;
                ;
                this.btnLingQu4.touchEnabled = false;
            }
            var dataSet = GameModels.dataSet.getDataSettingById(621001);
            this.labCount1.text = dataSet.value.split("_")[1];
            var dataSet1 = GameModels.dataSet.getDataSettingById(621002);
            this.labCount2.text = dataSet1.value.split("_")[1];
        };
        CopyWinTipView.prototype.receiveDoubleGetHandler = function (e) {
            var dataSet = GameModels.dataSet.getDataSettingById(621001);
            var dataSet1 = GameModels.dataSet.getDataSettingById(621002);
            if (e.target == this.btnLingQu1) {
                GameModels.scene.requestDoubleGetGift(this.ONE_RATE);
            }
            else if (e.target == this.btnLingQu2) {
                if (GameModels.user.player.diamonds < parseInt(dataSet.value.split("_")[1])) {
                    mg.alertManager.tip(Language.J_MSBZ, 0xFF0000);
                    return;
                }
                GameModels.scene.requestDoubleGetGift(this.TWO_RATE);
            }
            else {
                if (GameModels.user.player.diamonds < parseInt(dataSet1.value.split("_")[1])) {
                    mg.alertManager.tip(Language.J_MSBZ, 0xFF0000);
                    return;
                }
                GameModels.scene.requestDoubleGetGift(this.FROU_RATE);
            }
            this.exitHandler(null);
        };
        CopyWinTipView.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.currentState == "personboss") {
                if (this.btnReceiveDouble.visible) {
                    this._btnEffect = this.addEffect(TypeEffectId.BUTTON_EFF_BIG_RED, this.btnReceiveDouble.x, this.btnReceiveDouble.y, this.group, 10);
                }
            }
        };
        CopyWinTipView.prototype.exit = function () {
            if (this._lvMovie)
                this._lvMovie.stop();
            if (this._lvMovie && this._lvMovie.parent) {
                this._lvMovie.parent.removeChild(this._lvMovie);
                this._lvMovie = null;
            }
            for (var z = this.rewardGroup.numChildren; z >= 0; z--) {
                var btns = this.rewardGroup.getChildAt(z);
                if (btns) {
                    this.rewardGroup.removeChildAt(z);
                }
            }
            this.removeEffect(this._btnEffect);
            this.removeBestPetTween();
            this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.exitHandler, this);
            this.btnExit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.exitHandler, this);
            this.btnNext.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.nextHandler, this);
            this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveHandler, this);
            this.btnReceiveDouble.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveHandler, this);
            this.boxChecked.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectedDoubleReward, this);
            this.btnLingQu1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveDoubleGetHandler, this);
            this.btnLingQu2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveDoubleGetHandler, this);
            this.btnLingQu4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveDoubleGetHandler, this);
            this.btnTongJi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTongJiHandler, this);
            this.petGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTongJiHandler, this);
            GameModels.vip.removeEventListener(mo.ModelVip.VIPTEQUAN_CHANGE, this.refreshLeftBuyLab, this);
            this._copyWinVO = null;
            this.stopNextDown();
            this.stopCloseTime();
            this.clearEffect();
            // mg.stageManager.offResize(this, this.resizeHandler);
            this.clearList(this.list);
        };
        CopyWinTipView.prototype.checkUser = function (name) {
            return name == GameModels.user.player.name;
        };
        CopyWinTipView.prototype.startCloseTime = function () {
            this._endTime = 10;
            this.stopCloseTime();
            this.closeTimeUpdateHandler();
            utils.timer.loop(1000, this, this.closeTimeUpdateHandler, true);
        };
        CopyWinTipView.prototype.stopCloseTime = function () {
            utils.timer.clear(this, this.closeTimeUpdateHandler);
        };
        CopyWinTipView.prototype.closeTimeUpdateHandler = function () {
            if (this._endTime <= 0) {
                utils.timer.clear(this);
                if (this._copyWinVO && GameModels.copyBoss.doubleBol && (this._copyWinVO.type == TypeGame.EVERYONE_BOSS || this._copyWinVO.type == TypeGame.PERSONAL_BOSS || this._copyWinVO.type == TypeGame.GOD_DOMAIN)) {
                    GameModels.copyBoss.requestDoubleReward();
                }
                this.exitHandler(null);
            }
            this.labTime.textFlow = utils.TextFlowMaker.generateTextFlow(Language.getExpression(Language.E_1MHZDGB, this._endTime));
            this._endTime--;
        };
        CopyWinTipView.prototype.selectedDoubleReward = function (evt) {
            if (evt === void 0) { evt = null; }
            if (GameModels.copyBoss.doubleRewardCnt < 5 || GameModels.vip.getRewardBuyType(3)) {
                GameModels.copyBoss.doubleBol = this.boxChecked.selected;
                this.boxChecked.selected = GameModels.copyBoss.doubleBol;
            }
            else {
                this.stopCloseTime();
                this.boxChecked.selected = false;
                GameModels.copyBoss.doubleBol = false;
                mg.alertManager.showAlert(PromptAlert, false, true, Language.J_GMSBLB, TypeBtnLabel.GOTO, null, utils.Handler.create(this, function () {
                    this.showVipTeQuanView();
                }), false);
            }
        };
        CopyWinTipView.prototype.exitHandler = function (e) {
            if (e === void 0) { e = null; }
            if (this._copyWinVO && this._copyWinVO.type == TypeGame.LADDER_FIGHT && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_11) <= 0) {
                mg.StoryManager.instance.startBigStory(131, this, null);
                GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_11);
            }
            if (this._copyWinVO && this._copyWinVO.type == TypeGame.MATERIAL && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_12) <= 0) {
                mg.StoryManager.instance.startBigStory(132, this, null);
                GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_12);
            }
            if (this._copyWinVO)
                this._copyWinVO.call();
            copy.CopyWinInstance.instance.remove();
            var temp = GameModels.chapter.getChapterRewardBuyNowChapter();
            if (GameModels.limitTarget.isShowView == 1 && GameModels.chapter.totalChapter + 1 <= temp.order) {
                mg.uiManager.show(MainPresentZhuGeLiangAlter, true);
                GameModels.limitTarget.isShowView = 0;
            }
        };
        CopyWinTipView.prototype.receiveHandler = function (e) {
            if (e.target == this.btnReceiveDouble) {
                if (GameModels.copyBoss.doubleRewardCnt >= 5 && !GameModels.vip.getRewardBuyType(3)) {
                    this.stopCloseTime();
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.J_GMSBLB, TypeBtnLabel.GOTO, null, utils.Handler.create(this, function () {
                        this.showVipTeQuanView();
                    }), false);
                }
                else {
                    GameModels.copyBoss.requestDoubleReward();
                    this.exitHandler(null);
                }
            }
            else {
                this.exitHandler(null);
            }
        };
        CopyWinTipView.prototype.showVipTeQuanView = function () {
            copy.CopyWinInstance.instance.visibleView = false;
            mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1, param: 3, param1: true });
        };
        CopyWinTipView.prototype.refreshLeftBuyLab = function () {
            if (!this._copyWinVO)
                return;
            if (this._copyWinVO.type == TypeGame.EVERYONE_BOSS || this._copyWinVO.type == TypeGame.PERSONAL_BOSS || this._copyWinVO.type == TypeGame.GOD_DOMAIN) {
                if (GameModels.user.player.level < 70 || (!this._copyWinVO.gold && !this._copyWinVO.petDebris)) {
                    this.btnReceive.x = 217;
                    this.btnReceive.label = Language.C_QD;
                    this.goldGroup.visible = false;
                    this.btnReceiveDouble.visible = false;
                    this.doubleGroup.visible = false;
                    this.labLeftDoubleCnt.visible = false;
                }
                else {
                    this.btnReceive.x = 109;
                    this.btnReceive.label = Language.C_DBJL;
                    this.goldGroup.visible = true;
                    var num = GameModels.copyBoss.getDoubleRewardBuyItemNum(GameModels.copyBoss.doubleRewardCnt + 1);
                    this.lab_vip.text = num.toString();
                    this.btnReceiveDouble.visible = true;
                    if (!GameModels.vip.getRewardBuyType(3)) {
                        this.doubleGroup.visible = false;
                        this.labLeftDoubleCnt.visible = true;
                        this.labLeftDoubleCnt.text = Language.getExpression(Language.E_SYGMSBEWJLCS, 5 - GameModels.copyBoss.doubleRewardCnt);
                    }
                    else {
                        this.labLeftDoubleCnt.visible = false;
                        this.doubleGroup.visible = true;
                        this.boxChecked.selected = GameModels.copyBoss.doubleBol;
                    }
                }
            }
        };
        CopyWinTipView.prototype.nextHandler = function (e) {
            var _this = this;
            if (e === void 0) { e = null; }
            if (this._copyWinVO.type == TypeGame.CHAPTER_BOSS) {
                if (GameModels.chapter.autoFightBoss) {
                    GameModels.chapter.resetState(this, function () {
                        if (GameModels.chapter.autoFightBoss) {
                            if (app.gameContext.typeGame == this._copyWinVO.type) {
                                if (this._copyWinVO)
                                    this._copyWinVO.call(1);
                                copy.CopyWinInstance.instance.remove();
                            }
                            else {
                                if (this._copyWinVO)
                                    this._copyWinVO.call(2);
                                copy.CopyWinInstance.instance.remove();
                            }
                        }
                        else {
                            if (this._copyWinVO)
                                this._copyWinVO.call();
                            copy.CopyWinInstance.instance.remove();
                        }
                    });
                }
                else {
                    if (this._copyWinVO)
                        this._copyWinVO.call();
                    copy.CopyWinInstance.instance.remove();
                }
            }
            else {
                if (this._copyWinVO.type == TypeGame.PAGODA_WUHUN) {
                    GameModels.copyPagoda.requestWuHunCopyInfo(this, this.getCopyInfoHandler);
                }
                else if (this._copyWinVO.type == TypeGame.PAGODA_LOCK) {
                    GameModels.copyPagoda.requestLockCopyInfo(this, this.getCopyInfoHandler);
                }
                else if (this._copyWinVO.type == TypeGame.PAGODA_PET) {
                    GameModels.copyPagoda.requestSavageCopyInfo(this, this.getCopyInfoHandler);
                }
                else if (this._copyWinVO.type == TypeGame.SHILITA_1) {
                    GameModels.shilita.requestShiLiTaInfo(utils.Handler.create(this, function () {
                        _this.getCopyInfoHandler();
                    }));
                }
                else if (this._copyWinVO.type == TypeGame.SHILITA_2) {
                    GameModels.shilita.requestShiLiTaInfo(utils.Handler.create(this, function () {
                        _this.getCopyInfoHandler();
                    }));
                }
                else if (this._copyWinVO.type == TypeGame.SHILITA_3) {
                    GameModels.shilita.requestShiLiTaInfo(utils.Handler.create(this, function () {
                        _this.getCopyInfoHandler();
                    }));
                }
                else {
                    this._copyWinVO.call();
                    copy.CopyWinInstance.instance.remove();
                }
            }
        };
        CopyWinTipView.prototype.getCopyInfoHandler = function () {
            this._copyWinVO.call(true, this._copyWinVO.isFive, this._copyWinVO.copyVo);
            copy.CopyWinInstance.instance.remove();
        };
        CopyWinTipView.prototype.startNextTime = function () {
            this._countDown = 10;
            this.labCountDown.text = Language.getExpression(Language.E_1ZDJRXYG, this._countDown);
            utils.timer.loop(1000, this, this.nextTimeUpdateHandler);
        };
        CopyWinTipView.prototype.stopNextDown = function () {
            utils.timer.clear(this, this.nextTimeUpdateHandler);
        };
        CopyWinTipView.prototype.nextTimeUpdateHandler = function () {
            this._countDown--;
            if (this._countDown < 0) {
                this.nextHandler(null);
                return;
            }
            this.labCountDown.text = Language.getExpression(Language.E_1ZDJRXYG, this._countDown);
        };
        CopyWinTipView.prototype.setNoendWin = function (killNum) {
            this.labKillNum.textFlow = (new egret.HtmlTextParser).parser(Language.getExpression(Language.E_BCJBGW, TypeColor.WHITE, TypeColor.GREEN, killNum, TypeColor.WHITE));
        };
        CopyWinTipView.prototype.setNoendPeaksBattleWin = function () {
        };
        CopyWinTipView.prototype.setPropertyData1 = function () {
            var _this = this;
            GameModels.ladder1.requestFightList(utils.Handler.create(this, function () {
                var oldRoleData = GameModels.ladder1.oldRoleData;
                _this.labNowRank.text = oldRoleData.ladderRanking.toString();
                _this.new.text = oldRoleData.myOrAddScore.toString();
                logger.log("old************" + oldRoleData.myOrAddScore.toString(), "text**************", _this.new.text);
                var roleData = GameModels.ladder1.roleData;
                _this.labUpRank.text = roleData.ladderRanking.toString();
                _this.labUpJiFen.text = roleData.myOrAddScore.toString();
                logger.log("now" + roleData.myOrAddScore.toString(), "text**************", _this.labUpJiFen.text);
                if (oldRoleData.template.ladderStep == roleData.template.ladderStep && oldRoleData.template.ladderLv == roleData.template.ladderLv) {
                    _this.imgUpGrade.visible = false;
                    if (roleData.template.nextId > 0) {
                        var needJifen = roleData.template.credit - roleData.myOrAddScore;
                        _this.labGradeNow.text = oldRoleData.template.name + oldRoleData.template.lvShow + "(" + Language.getExpression(Language.E_HX1JFJJ, needJifen) + ")";
                    }
                    else {
                        _this.labGradeNow.text = oldRoleData.template.name + oldRoleData.template.lvShow + "(" + Language.J_DWDDJ + ")";
                    }
                }
                else {
                    _this.imgUpGrade.visible = true;
                    _this.labGradeNow.text = roleData.template.name + roleData.template.lvShow;
                }
            }));
        };
        CopyWinTipView.prototype.setPropertyData = function () {
            var _this = this;
            GameModels.ladder.requestFightList(utils.Handler.create(this, function () {
                var oldRoleData = GameModels.ladder.oldRoleData;
                _this.labNowRank.text = oldRoleData.ladderRanking.toString();
                _this.new.text = oldRoleData.myOrAddScore.toString();
                logger.log("ttold************" + oldRoleData.myOrAddScore.toString(), "tttext**************", _this.new.text);
                var roleData = GameModels.ladder.roleData;
                _this.labUpRank.text = roleData.ladderRanking.toString();
                _this.labUpJiFen.text = roleData.myOrAddScore.toString();
                logger.log("ttnow************" + roleData.myOrAddScore.toString(), "tttext**************", _this.labUpJiFen.text);
                if (oldRoleData.template.ladderStep == roleData.template.ladderStep && oldRoleData.template.ladderLv == roleData.template.ladderLv) {
                    _this.imgUpGrade.visible = false;
                    if (roleData.template.nextId > 0) {
                        var needJifen = roleData.template.credit - roleData.myOrAddScore;
                        _this.labGradeNow.text = oldRoleData.template.name + oldRoleData.template.lvShow + "(" + Language.getExpression(Language.E_HX1JFJJ, needJifen) + ")";
                    }
                    else {
                        _this.labGradeNow.text = oldRoleData.template.name + oldRoleData.template.lvShow + "(" + Language.J_DWDDJ + ")";
                    }
                }
                else {
                    _this.imgUpGrade.visible = true;
                    _this.labGradeNow.text = roleData.template.name + roleData.template.lvShow;
                }
            }));
        };
        /**count:1,2,3 */
        CopyWinTipView.prototype.showStar = function (count, caller, method, index) {
            if (index === void 0) { index = 0; }
            if (count > 3)
                count = 3;
            for (var i = 0; i < this._stars.length; i++) {
                this._stars[i].visible = i < count;
            }
            // if (index < count) {
            //     var star: eui.Image = this._stars[index];
            //     star.visible = true;
            //     egret.Tween.removeTweens(star);
            //     star.scaleX = star.scaleY = 3;
            //     index++
            //     egret.Tween.get(star).to({ scaleX: 1, scaleY: 1 }, 500, utils.Ease.circInOut).call(this.showStar, this, [count, caller, method, index]);
            //     return;
            // }
            method.call(caller);
        };
        CopyWinTipView.prototype.showBoxes = function (caller, method) {
            if (!this.list.dataProvider) {
                method.call(caller);
                return;
            }
            this.list.visible = true;
            this.list.alpha = 0;
            egret.Tween.get(this.list).to({ alpha: 1 }, 500, utils.Ease.expoOut).call(method, caller);
            if (this.currentState == "personboss") {
                this.rewardGroup.visible = true;
                this.rewardGroup.alpha = 0;
                egret.Tween.get(this.rewardGroup).to({ alpha: 1 }, 1500);
            }
        };
        CopyWinTipView.prototype.showPetfigthInfo = function () {
            if (GameModels.warKing.staticData) {
                this.labRankingName.text = GameModels.warKing.staticData.name;
                for (var i = 0; i < this._starList.length; i++) {
                    if (i < GameModels.warKing.staticData.star) {
                        this._starList[i].source = "crossserver_json.img_warking_start2";
                    }
                    else {
                        this._starList[i].source = "crossserver_json.img_warking_start1";
                    }
                    this._starList[i].visible = true;
                }
                this.startGroup.visible = false;
            }
            else {
                for (var i = 0; i < this._starList.length; i++) {
                    this._starList[i].visible = false;
                }
                this.labRankingName.text = Language.C_RYWZ;
                this.startGroup.visible = true;
                this.labStart1.text = (GameModels.warKing.star - 241).toString();
            }
        };
        return CopyWinTipView;
    }(ui.CopyWinSkin));
    copy.CopyWinTipView = CopyWinTipView;
    __reflect(CopyWinTipView.prototype, "copy.CopyWinTipView");
})(copy || (copy = {}));

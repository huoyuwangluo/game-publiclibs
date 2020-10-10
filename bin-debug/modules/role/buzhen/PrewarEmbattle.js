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
var PrewarEmbattle = (function (_super) {
    __extends(PrewarEmbattle, _super);
    function PrewarEmbattle() {
        var _this = _super.call(this) || this;
        _this._headArr = [_this.head0, _this.head1, _this.head2, _this.head3, _this.head4];
        _this._monsterHeadArr = [_this.head5, _this.head6, _this.head7, _this.head8, _this.head9];
        _this._skillIconList = [_this.skill1, _this.skill2, _this.skill3];
        _this._skillLockList = [_this.skillLock1, _this.skillLock2, _this.skillLock3];
        _this._restrainArr = [_this.img_kezhi0, _this.img_kezhi1, _this.img_kezhi2];
        return _this;
    }
    PrewarEmbattle.prototype.show = function (type, ladderPlayerVo, copyVo, isFive, isWenGuan) {
        var _this = this;
        if (type === void 0) { type = 0; }
        if (isFive === void 0) { isFive = false; }
        if (isWenGuan === void 0) { isWenGuan = false; }
        this._isWenGuan = isWenGuan;
        this._isMove = false;
        this._isGuideBuZhen = false;
        TypeFormation.CURR_ZHENYING_TYPE = 0;
        this._isFive = isFive;
        this._type = type;
        this.btnHelp.visible = false;
        this.labLeftCount.text = "";
        this.labTip.visible = isFive;
        switch (type) {
            case 1:
            case 2:
                this.labTip.visible = this._type != 1;
                GameModels.chapter.isAutoAtt = this._type == 1 ? false : true;
                this.imgCountBg.visible = true;
                this.labCount.text = this._type == 1 ? GameModels.chapter.totalChapter.toString() : GameModels.chapter.getChapterRewardBuyNowChapter().order.toString();
                this.btnFight.label = this._type == 1 ? Language.C_TZ + GameModels.chapter.totalChapter + Language.Z_G : Language.C_TZ + GameModels.chapter.getChapterRewardBuyNowChapter().order + Language.Z_G;
                if (type == 1 && GameModels.user.player.level >= 70 && GameModels.user.player.legionId) {
                    this.btnHelp.visible = true;
                    GameModels.chapter.requestChapterGetSupportInfo(utils.Handler.create(this, function () {
                        _this.labLeftCount.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SYZQCS1, GameModels.chapter.leftSupportCount));
                    }));
                }
                break;
            case 3:
                this.btnFight.label = Language.C_TZ;
                this.imgCountBg.visible = false;
                this.labCount.text = "";
                this._ladderPlayerVo = ladderPlayerVo;
                break;
            case 4:
                this._wuGuanVo = GameModels.legion.EnemyInfo;
                this.btnFight.label = Language.C_TZ;
                this.imgCountBg.visible = false;
                this.labCount.text = "";
                break;
            case 5:
            case 6:
            case 7:
                this._copyVo = copyVo;
                this.btnFight.label = Language.C_TZ;
                this.imgCountBg.visible = true;
                this.labCount.text = copyVo.step.toString();
                break;
        }
        GameModels.pet.petGetFormationData(TypeFormation.UP_FORMATION, utils.Handler.create(this, function () {
            _this.registerMoveItem();
            _this.showView();
            _this.updataInfo();
            _this.showMonsterHead();
        }));
        this.skill1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.skill2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.skill3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        for (var i = 0; i < this._monsterHeadArr.length; i++) {
            this._monsterHeadArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBegionHeadClick, this);
        }
        this.btnFight.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
        this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
    };
    PrewarEmbattle.prototype.updataInfo = function () {
        this.skill1.source = "legionSkill_json.img_legionSkill_601101";
        this.skill2.source = "legionSkill_json.img_legionSkill_601201";
        this.skill3.source = "legionSkill_json.img_legionSkill_601301";
        if (GameModels.pet.getLegionSkillByGameType()) {
            var strArr = GameModels.pet.getLegionSkillByGameType().skill.split(";");
            for (var i = 0; i < this._skillIconList.length; i++) {
                if (strArr[i]) {
                    this._skillLockList[i].visible = false;
                    this._skillIconList[i].source = "legionSkill_json.img_legionSkill_" + strArr[i];
                    this._skillIconList[i].filters = null;
                }
                else {
                    this._skillLockList[i].visible = true;
                    this._skillIconList[i].filters = utils.filterUtil.grayFilters;
                }
            }
        }
        else {
            this.skill1.filters = this.skill2.filters = this.skill3.filters = utils.filterUtil.grayFilters;
        }
    };
    PrewarEmbattle.prototype.registerMoveItem = function () {
        var _this = this;
        var drags = this._headArr;
        var puts = this._headArr;
        this.moveItem.register(this, drags, function (index) {
            _this._touchIndex = index;
            logger.log("dragHandler" + index);
            _this._headArr[_this._touchIndex].visible = false;
            return true;
        }, puts, function (index) {
            _this._endIndex = index;
            logger.log("putHandler" + index);
            _this._headArr[_this._touchIndex].visible = true;
            if (_this._endIndex == 9999) {
                return false;
            }
            if (_this._endIndex == -1) {
                _this.resetPetPosData();
                _this.closeGuide();
                return false;
            }
            if (_this._touchIndex < 3 && _this._endIndex >= 3) {
                mg.alertManager.tip(Language.J_QPWJZNBZQP);
                _this.closeGuide();
                _this.resetPetPosData();
                return false;
            }
            if (_this._touchIndex >= 3 && _this._endIndex < 3) {
                mg.alertManager.tip(Language.J_HPWJZNBZHP);
                _this.closeGuide();
                _this.resetPetPosData();
                return false;
            }
            var touchVo = _this._headArr[_this._touchIndex].vo;
            var endVo = _this._headArr[_this._endIndex].vo;
            if (endVo) {
                _this._headArr[_this._touchIndex].data = endVo;
            }
            else {
                _this._headArr[_this._touchIndex].data = null;
            }
            _this._headArr[_this._endIndex].data = touchVo;
            _this.closeGuide();
            _this.resetPetPosData();
            return true;
        }, function (index) {
            _this.closeGuide(false);
            return true;
        });
        this.moveItem.getSourceMethod = function (selectItem, index) {
            return selectItem.vo;
        };
    };
    PrewarEmbattle.prototype.closeGuide = function (isClick) {
        if (isClick === void 0) { isClick = true; }
        this._isMove = true;
        if (this._isGuideBuZhen) {
            if (isClick) {
                mg.guideManager.guideImmediately(this.btnFight, Language.C_DJGC, TypeDirection.UP);
            }
            else {
                mg.alertManager.tip(Language.J_TDGHWZ);
            }
        }
    };
    PrewarEmbattle.prototype.resetPetPosData = function () {
        this._petUid = [];
        for (var i = 0; i < this._headArr.length; i++) {
            this._petUid.push(this._headArr[i].petUid);
        }
        GameModels.pet.petSetFormationData(TypeFormation.UP_FORMATION, this._petUid, utils.Handler.create(this, function () {
            this.showView();
        }));
    };
    PrewarEmbattle.prototype.showView = function () {
        var formationData = GameModels.pet.formationData;
        for (var i = 0; i < this._headArr.length; i++) {
            this._headArr[i].filters = null;
            if (formationData[i]) {
                this._headArr[i].visible = true;
                var vo = GameModels.pet.getFormatUpVO(formationData[i]);
                this._headArr[i].data = vo;
            }
            else {
                this._headArr[i].data = null;
            }
        }
        this.showRestrain();
        this.clearEff();
        if (!this._isMove) {
            utils.timer.once(10000, this, function () {
                this.clearEff();
            });
            if (this._type == 1 && GameModels.chapter.totalChapter == 13 && formationData[1] && formationData[2]) {
                var vo1 = GameModels.pet.getFormatUpVO(formationData[1]);
                var vo2 = GameModels.pet.getFormatUpVO(formationData[2]);
                if (vo1.refId == "13000" && vo2.refId == "13012") {
                    mg.StoryManager.instance.startBigStory(140, this, this.storyEndCallFun);
                }
            }
        }
    };
    PrewarEmbattle.prototype.storyEndCallFun = function () {
        if (!this._effect) {
            this._effect = this.fromEffect("6605");
            // this._effect.frameRate = 6;
            this._effect.scale(0.5);
            this._effect.play();
            this.addChild(this._effect);
        }
        if (this._effect) {
            this._isGuideBuZhen = true;
            this._effect.visible = true;
            this._effect.x = this._headArr[1].x;
            this._effect.y = this._headArr[1].y;
            egret.Tween.get(this._effect).to({ y: this._headArr[2].y }, 1000).call(this.tweenPreviewImgHandler, this);
        }
    };
    PrewarEmbattle.prototype.tweenPreviewImgHandler = function () {
        this._effect.visible = false;
        this.storyEndCallFun();
    };
    PrewarEmbattle.prototype.showMonsterHead = function () {
        if (this._type < 5) {
            var monsterListDate = null;
            if (this._type == 1 || this._type == 2) {
                monsterListDate = this._type == 1 ? GameModels.chapter.chaptermonsterData : GameModels.chapter.chaptermonsterData1;
            }
            else if (this._type == 3) {
                if (!this._ladderPlayerVo)
                    return;
                monsterListDate = this._ladderPlayerVo.monsterDate;
            }
            else if (this._type == 4) {
                monsterListDate = this._wuGuanVo.FormationInfo;
            }
            this.imgLine.visible = true;
            for (var i = 0; i < 5; i++) {
                if (monsterListDate.List[i] && monsterListDate.List[i].PetId) {
                    var vo = monsterListDate.List[i];
                    this._monsterHeadArr[i].data = vo;
                }
                else {
                    this.imgLine.visible = false;
                    this._monsterHeadArr[i].data = null;
                }
            }
        }
        else {
            if (!this._copyVo)
                return;
            var monsterId = this._copyVo.monsterArr;
            for (var i = 0; i < 5; i++) {
                if (monsterId[i]) {
                    this._monsterHeadArr[i].data = monsterId[i];
                }
                else {
                    this._monsterHeadArr[i].data = null;
                }
            }
        }
    };
    PrewarEmbattle.prototype.showRestrain = function () {
        if (this._type < 5) {
            var monsterListDate = null;
            var formationData = GameModels.pet.formationData;
            if (this._type == 1 || this._type == 2) {
                monsterListDate = this._type == 1 ? GameModels.chapter.chaptermonsterData : GameModels.chapter.chaptermonsterData1;
            }
            else if (this._type == 3) {
                if (!this._ladderPlayerVo)
                    return;
                monsterListDate = this._ladderPlayerVo.monsterDate;
            }
            else if (this._type == 4) {
                monsterListDate = this._wuGuanVo.FormationInfo;
            }
            for (var i = 0; i < this._restrainArr.length; i++) {
                var petVo = GameModels.pet.getAllPetVOByUid(formationData[i]);
                var monsterVo = monsterListDate.List[i];
                if (petVo && monsterVo) {
                    var temp = Templates.getTemplateById(templates.Map.GENERAL, monsterVo.PetId);
                    if (temp) {
                        var type = GameModels.pet.getPetRestrain(petVo.template.corps, temp.corps);
                        if (type > 0) {
                            this._restrainArr[i].visible = true;
                            this._restrainArr[i].source = "img_kezhi" + type + "_png";
                        }
                        else {
                            this._restrainArr[i].visible = false;
                        }
                    }
                    else {
                        this._restrainArr[i].visible = false;
                    }
                }
                else {
                    this._restrainArr[i].visible = false;
                }
            }
        }
        else {
            if (!this._copyVo)
                return;
            var monsterId = this._copyVo.monsterArr;
            var petformationData = GameModels.pet.formationData;
            for (var i = 0; i < this._restrainArr.length; i++) {
                var petVo = GameModels.pet.getFormatUpVO(petformationData[i]);
                var monsterTemp = Templates.getTemplateById(templates.Map.GENERAL, monsterId[i].split("_")[0]);
                if (petVo && monsterTemp) {
                    var type = GameModels.pet.getPetRestrain(petVo.template.corps, monsterTemp.corps);
                    if (type > 0) {
                        this._restrainArr[i].visible = true;
                        this._restrainArr[i].source = "img_kezhi" + type + "_png";
                    }
                    else {
                        this._restrainArr[i].visible = false;
                    }
                }
                else {
                    this._restrainArr[i].visible = false;
                }
            }
        }
    };
    PrewarEmbattle.prototype.onBegionHeadClick = function (e) {
        mg.alertManager.tip(Language.J_TFZXBNCZ);
    };
    PrewarEmbattle.prototype.onBtnClick = function (e) {
        if (e.currentTarget == this.btnFight) {
            if (this._type == 1 || this._type == 2) {
                // if (this._type == 2) {
                // 	GameModels.chapter.bossActiveAutoFight();
                // }
                if ((this._type == 1 && GameModels.user.player.level >= 50) || this._isWenGuan) {
                    GameModels.chapter.bossActiveAutoFight();
                }
                mg.uiManager.removeAllDialogs();
                app.gameContext.enterChapterBoss(this._type == 1 ? "" : GameModels.chapter.chapterId1);
            }
            else if (this._type == 3) {
                if (!this._ladderPlayerVo)
                    return;
                this.dispatchEventWith(egret.Event.CLOSE);
                app.gameContext.enterLadderFight(this._ladderPlayerVo.playerId);
            }
            else if (this._type == 4) {
                if (!this._wuGuanVo)
                    return;
                this.dispatchEventWith(egret.Event.CLOSE);
                mg.uiManager.removeAllDialogs();
                app.gameContext.enterWuGuanFight();
            }
            else if (this._type == 5) {
                if (!this._copyVo)
                    return;
                this.dispatchEventWith(egret.Event.CLOSE);
                app.gameContext.enterPagodaPet(this._copyVo, false, this._isFive);
            }
            else if (this._type == 6) {
                if (!this._copyVo)
                    return;
                this.dispatchEventWith(egret.Event.CLOSE);
                app.gameContext.enterPagodaLock(this._copyVo, false, this._isFive);
            }
            else if (this._type == 7) {
                if (!this._copyVo)
                    return;
                this.dispatchEventWith(egret.Event.CLOSE);
                app.gameContext.enterWuHunPagodaPet(this._copyVo, false, this._isFive);
            }
        }
        else if (e.currentTarget == this.skill1) {
            mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: 1, config: null });
        }
        else if (e.currentTarget == this.skill2) {
            mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: 2, config: null });
        }
        else if (e.currentTarget == this.skill3) {
            mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: 3, config: null });
        }
        else if (e.currentTarget == this.btnHelp) {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.legionList, -1, true)) {
                return;
            }
            if (!GameModels.user.player.legionId) {
                mg.alertManager.showAlert(PromptAlert, false, true, Language.J_SFJRJT, TypeBtnLabel.GOTO, null, utils.Handler.create(this, function () {
                    mg.uiManager.show(LegionList);
                }));
                return;
            }
            if (GameModels.chapter.leftSupportCount <= 0) {
                mg.alertManager.tip(Language.J_JRCSYYW);
                return;
            }
            mg.TipManager.instance.showTip(tips.LegionBattleHelp, { type: 1, data: null });
        }
    };
    PrewarEmbattle.prototype.onClose = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    PrewarEmbattle.prototype.clearEff = function () {
        utils.timer.clear(this);
        this._isGuideBuZhen = false;
        if (this._effect) {
            this._effect.scale(1);
            this._effect.visible = true;
            egret.Tween.removeTweens(this._effect);
            if (this._effect.parent) {
                this._effect.parent.removeChild(this._effect);
            }
            this._effect.stop();
            utils.ObjectPool.to(this._effect, true);
            this._effect = null;
        }
    };
    PrewarEmbattle.prototype.hide = function () {
        this.clearEff();
        this.moveItem.reset();
        mg.guideManager.guideStopImmediately(this.btnFight);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnFight.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
        this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
        for (var i = 0; i < this._monsterHeadArr.length; i++) {
            this._monsterHeadArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBegionHeadClick, this);
            this._monsterHeadArr[i].data = null;
        }
        for (var i = 0; i < this._headArr.length; i++) {
            this._headArr[i].data = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return PrewarEmbattle;
}(ui.PrewarEmbattleSkin));
__reflect(PrewarEmbattle.prototype, "PrewarEmbattle", ["IAlert", "egret.DisplayObject"]);

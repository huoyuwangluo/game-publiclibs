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
var PrewarEmbattleYuanZheng = (function (_super) {
    __extends(PrewarEmbattleYuanZheng, _super);
    function PrewarEmbattleYuanZheng() {
        var _this = _super.call(this) || this;
        _this._headArr = [_this.head0, _this.head1, _this.head2, _this.head3, _this.head4];
        _this._monsterHeadArr = [_this.head5, _this.head6, _this.head7, _this.head8, _this.head9];
        _this._skillIconList = [_this.skill1, _this.skill2, _this.skill3];
        _this._skillLockList = [_this.skillLock1, _this.skillLock2, _this.skillLock3];
        _this._restrainArr = [_this.img_kezhi0, _this.img_kezhi1, _this.img_kezhi2];
        _this._btnArr = [_this.btn0, _this.btn1, _this.btn2, _this.btn3, _this.btn4];
        _this._labArr = [_this.lab0, _this.lab1, _this.lab2, _this.lab3, _this.lab4];
        return _this;
    }
    PrewarEmbattleYuanZheng.prototype.show = function (data) {
        var _this = this;
        this.labTip.visible = false;
        this._data = data;
        this._hashAnimal = false;
        this._currSelecdIndex = 0;
        TypeFormation.CURR_ZHENYING_TYPE = TypeFormation.MINGJIANG_YUANZHENG;
        GameModels.pet.headSelfArr = this._headArr;
        this.btnHelp.visible = false;
        this.labLeftCount.text = "";
        this.btnFight.label = Language.C_TZ;
        this.imgCountBg.visible = true;
        this.labCount.text = GameModels.legion.currStep + "";
        this.labDes.text = Language.J_ZSWJHJYWJKSZ;
        this.labJuYi.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_QWJY);
        this.labDes.x = 42;
        this.labCrops.visible = false;
        if (GameModels.user.player.legionId) {
            this.btnHelp.visible = true;
            this.labLeftCount.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SYZQCS1, GameModels.legion.leftSupportCount));
        }
        GameModels.pet.petGetFormationData(TypeFormation.MINGJIANG_YUANZHENG, utils.Handler.create(this, function () {
            _this.registerMoveItem();
            _this.showView();
            _this.updataInfo();
            _this.showMonsterHead();
            _this.updataList();
            _this.showBtnView();
        }));
        this.skill1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.skill2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.skill3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
        this.labJuYi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        for (var i = 0; i < this._monsterHeadArr.length; i++) {
            this._monsterHeadArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBegionHeadClick, this);
        }
        for (var i = 0; i < this._headArr.length; i++) {
            this._headArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadClick, this);
        }
        this.btnFight.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
        this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
        for (var i = 0; i < this._btnArr.length; i++) {
            this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTableClick, this);
        }
    };
    PrewarEmbattleYuanZheng.prototype.updataInfo = function () {
        this.skill1.source = "legionSkill_json.img_legionSkill_601101";
        this.skill2.source = "legionSkill_json.img_legionSkill_601201";
        this.skill3.source = "legionSkill_json.img_legionSkill_601301";
        if (GameModels.pet.getLegionSkillByGameType(TypeGame.EXPEDITION)) {
            var strArr = GameModels.pet.getLegionSkillByGameType(TypeGame.EXPEDITION).skill.split(";");
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
    PrewarEmbattleYuanZheng.prototype.registerMoveItem = function () {
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
                _this.resetPetPosData();
                return false;
            }
            if (_this._endIndex == -1) {
                _this.resetPetPosData();
                return false;
            }
            if (_this._touchIndex < 3 && _this._endIndex >= 3) {
                mg.alertManager.tip(Language.J_QPWJZNBZQP);
                _this.resetPetPosData();
                return false;
            }
            if (_this._touchIndex >= 3 && _this._endIndex < 3) {
                mg.alertManager.tip(Language.J_HPWJZNBZHP);
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
            _this.resetPetPosData();
            return true;
        }, function (index) {
            if (index < 0)
                return false;
            _this._headArr[index].visible = false;
            _this._headArr[index].data = null;
            _this.resetPetPosData();
            return true;
        });
        this.moveItem.getSourceMethod = function (selectItem, index) {
            return selectItem.vo;
        };
    };
    PrewarEmbattleYuanZheng.prototype.resetPetPosData = function () {
        var _this = this;
        this._petUid = [];
        for (var i = 0; i < this._headArr.length; i++) {
            this._petUid.push(this._headArr[i].petUid);
        }
        GameModels.pet.petSetFormationDataLinShi(this._petUid, utils.Handler.create(this, function () {
            _this.showView();
            _this.updataList();
            _this.updataInfo();
        }));
    };
    PrewarEmbattleYuanZheng.prototype.showView = function () {
        var formationData = GameModels.pet.formationDataLinShi;
        this.btnFight.visible = GameModels.pet.hashFormationLinShiData1;
        this.btnFight.text = Language.C_TZ;
        var yaoHuanimal = GameModels.animal.getAnimalBuyType(20); //妖虎
        if (yaoHuanimal.isAct && yaoHuanimal.step >= 3) {
            this._hashAnimal = true;
            this.btnFight.text = Language.C_SD;
        }
        for (var i = 0; i < this._headArr.length; i++) {
            this._headArr[i].filters = null;
            if (formationData[i]) {
                this._headArr[i].visible = true;
                var vo = GameModels.pet.getAllPetVOByUid(formationData[i]);
                this._headArr[i].data = vo;
            }
            else {
                this._headArr[i].data = null;
            }
        }
        this.showRestrain();
    };
    PrewarEmbattleYuanZheng.prototype.showMonsterHead = function () {
        this.imgLine.visible = true;
        var monsterListDate = GameModels.legion.monsterData;
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
    };
    PrewarEmbattleYuanZheng.prototype.onHeadClick = function (e) {
        logger.log("111111111111111");
        for (var i = 0; i < this._headArr.length; i++) {
            if (e.currentTarget == this._headArr[i]) {
                this._headArr[i].visible = false;
                this._headArr[i].data = null;
                this.resetPetPosData();
                break;
            }
        }
    };
    PrewarEmbattleYuanZheng.prototype.showRestrain = function () {
        var monsterListDate = GameModels.legion.monsterData;
        var formationData = GameModels.pet.formationDataLinShi;
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
    };
    PrewarEmbattleYuanZheng.prototype.updataList = function () {
        var petVoArr1 = GameModels.pet.formatUpVOList.concat(GameModels.pet.gongMingPetList);
        var petVoArr = [];
        for (var i = 0; i < petVoArr1.length; i++) {
            if (this._currSelecdIndex == 0) {
                petVoArr.push(petVoArr1[i]);
            }
            else {
                if (petVoArr1[i].template.country == this._currSelecdIndex) {
                    petVoArr.push(petVoArr1[i]);
                }
            }
        }
        if (petVoArr.length > 0) {
            this.labNo.visible = false;
            petVoArr.sort(function (a, b) {
                return b.star - a.star;
            });
            // petVoArr.sort(function (a: vo.GamePetVO, b: vo.GamePetVO) {
            // 	var formationData: string[] = GameModels.pet.formationDataLinShi;
            // 	var aUp: boolean = false;
            // 	var bUp: boolean = false;
            // 	if (formationData.length > 0) {
            // 		if (formationData.indexOf(a.uid) != -1) {
            // 			aUp = true;
            // 		}
            // 		if (formationData.indexOf(b.uid) != -1) {
            // 			bUp = true;
            // 		}
            // 	}
            // 	if (aUp) {
            // 		return -1;
            // 	}
            // 	else if (bUp) {
            // 		return 1;
            // 	}
            // })
            // petVoArr.sort(function (a: vo.GamePetVO, b: vo.GamePetVO) {
            // 	var aSiWang: boolean = false;
            // 	var bSiWang: boolean = false;
            // 	if (GameModels.legion.hashSelfDataHp(a.uid) == 0) {
            // 		aSiWang = true;
            // 	}
            // 	if (GameModels.legion.hashSelfDataHp(b.uid) == 0) {
            // 		bSiWang = true;
            // 	}
            // 	if (aSiWang) {
            // 		return 1;
            // 	}
            // 	else if (bSiWang) {
            // 		return -1;
            // 	}
            // })
            if (petVoArr) {
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(petVoArr);
                }
                else {
                    this._listData.replaceAll(petVoArr);
                }
            }
            this.list.dataProvider = this._listData;
        }
        else {
            this.labNo.visible = true;
            if (!this._listData) {
                this._listData = new eui.ArrayCollection([]);
            }
            else {
                this._listData.replaceAll([]);
            }
            this.list.dataProvider = this._listData;
        }
    };
    PrewarEmbattleYuanZheng.prototype.onListClick = function (e) {
        var item = this.list.selectedItem;
        if (!item)
            return;
        if (GameModels.legion.hashSelfDataHp(item.uid) == 0) {
            mg.alertManager.tip(Language.J_WJYSW);
            return;
        }
        var formationData = GameModels.pet.formationDataLinShi;
        if (formationData.indexOf(item.uid) == -1 && GameModels.pet.formationPetRefIdDataLinShi.indexOf(item.refId) != -1) {
            mg.alertManager.tip(Language.J_TYZWJZNSZYG);
            return;
        }
        if (formationData.indexOf(item.uid) != -1) {
            for (var i = 0; i < this._headArr.length; i++) {
                if (this._headArr[i].data == item) {
                    this._headArr[i].visible = false;
                    this._headArr[i].data = null;
                    this.resetPetPosData();
                    break;
                }
            }
            return;
        }
        var isBool = false;
        if (item.template.corps <= 3) {
            for (var i = 0; i < 3; i++) {
                if (!this._headArr[i].data) {
                    this._headArr[i].visible = true;
                    this._headArr[i].data = item;
                    isBool = true;
                    break;
                }
            }
        }
        else {
            for (var i = 3; i < 5; i++) {
                if (!this._headArr[i].data) {
                    this._headArr[i].visible = true;
                    this._headArr[i].data = item;
                    isBool = true;
                    break;
                }
            }
        }
        if (!isBool) {
            mg.alertManager.tip(item.template.corps <= 3 ? Language.J_MYKSZQPWZ : Language.J_MYKSZHPWZ);
            return;
        }
        this.resetPetPosData();
    };
    PrewarEmbattleYuanZheng.prototype.onBegionHeadClick = function (e) {
        mg.alertManager.tip(Language.J_TFZXBNCZ);
    };
    PrewarEmbattleYuanZheng.prototype.onBtnClick = function (e) {
        var _this = this;
        var temp = GameModels.pet.getLegionSkillByGameType(TypeGame.EXPEDITION);
        if (e.currentTarget == this.btnFight) {
            this._petUid = [];
            for (var i = 0; i < this._headArr.length; i++) {
                this._petUid.push(this._headArr[i].petUid);
            }
            GameModels.pet.petSetFormationData(TypeFormation.MINGJIANG_YUANZHENG, this._petUid, utils.Handler.create(this, function () {
                _this.dispatchEventWith(egret.Event.CLOSE);
                // app.gameContext.enterExpedition(this._data);
                if (_this._hashAnimal) {
                    GameModels.legion.requestExpeditionQuickPass();
                }
                else {
                    app.gameContext.enterExpedition();
                }
            }));
        }
        else if (e.currentTarget == this.skill1) {
            mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: 1, config: temp });
        }
        else if (e.currentTarget == this.skill2) {
            mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: 2, config: temp });
        }
        else if (e.currentTarget == this.skill3) {
            mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: 3, config: temp });
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
            if (GameModels.legion.leftSupportCount <= 0) {
                mg.alertManager.tip(Language.J_JRCSYYW);
                return;
            }
            mg.TipManager.instance.showTip(tips.LegionBattleHelp, { type: 2, data: this._data });
        }
        else if (e.currentTarget == this.labJuYi) {
            this.dispatchEventWith(egret.Event.CLOSE);
            mg.uiManager.show(pet.PetGongMingMain);
        }
    };
    PrewarEmbattleYuanZheng.prototype.onClose = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    PrewarEmbattleYuanZheng.prototype.onTableClick = function (e) {
        this._currSelecdIndex = this._btnArr.indexOf(e.currentTarget);
        this.scroller.viewport.scrollV = 0;
        this.updataList();
        this.showBtnView();
    };
    PrewarEmbattleYuanZheng.prototype.showBtnView = function () {
        for (var i = 0; i < this._btnArr.length; i++) {
            if (i == this._currSelecdIndex) {
                this._btnArr[i].currentState = "down";
                this._labArr[i].textColor = 0xCCC6BA;
            }
            else {
                this._btnArr[i].currentState = "up";
                this._labArr[i].textColor = 0x969696;
            }
        }
    };
    PrewarEmbattleYuanZheng.prototype.hide = function () {
        TypeFormation.CURR_ZHENYING_TYPE = 0;
        GameModels.pet.headSelfArr = [];
        this.moveItem.reset();
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnFight.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
        this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
        this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
        for (var i = 0; i < this._monsterHeadArr.length; i++) {
            this._monsterHeadArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBegionHeadClick, this);
            this._monsterHeadArr[i].data = null;
        }
        for (var i = 0; i < this._headArr.length; i++) {
            this._headArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadClick, this);
            this._headArr[i].data = null;
        }
        for (var i = 0; i < this._btnArr.length; i++) {
            this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTableClick, this);
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return PrewarEmbattleYuanZheng;
}(ui.PrewarEmbattle1Skin));
__reflect(PrewarEmbattleYuanZheng.prototype, "PrewarEmbattleYuanZheng", ["IAlert", "egret.DisplayObject"]);

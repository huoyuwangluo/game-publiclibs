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
var PrewarEmbattleYanWu = (function (_super) {
    __extends(PrewarEmbattleYanWu, _super);
    function PrewarEmbattleYanWu() {
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
    PrewarEmbattleYanWu.prototype.show = function (ladderPlayerVo) {
        var _this = this;
        this.labTip.visible = false;
        this._currSelecdIndex = 0;
        TypeFormation.CURR_ZHENYING_TYPE = 0;
        GameModels.pet.headSelfArr = this._headArr;
        GameModels.pet.currType = 0;
        this.btnHelp.visible = false;
        this.labLeftCount.text = "";
        this.btnFight.label = Language.C_TZ;
        this.imgCountBg.visible = false;
        this.labCount.text = "";
        this._ladderPlayerVo = ladderPlayerVo;
        this.labDes.text = Language.J_TJJHDHSWJKSZ;
        this.labJuYi.text = "";
        this.labDes.x = 151;
        this.labCrops.visible = true;
        GameModels.pet.petGetFormationLadderData(GameModels.pet.currType, utils.Handler.create(this, function () {
            _this.registerMoveItem();
            _this.showView();
            _this.updataList();
            _this.showMonsterHead();
            _this.updataInfo();
            _this.showBtnView();
        }));
        this.skill1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.skill2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.skill3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        for (var i = 0; i < this._monsterHeadArr.length; i++) {
            this._monsterHeadArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBegionHeadClick, this);
        }
        for (var i = 0; i < this._headArr.length; i++) {
            this._headArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadClick, this);
        }
        this.btnFight.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
        this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
        for (var i = 0; i < this._btnArr.length; i++) {
            this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTableClick, this);
        }
    };
    PrewarEmbattleYanWu.prototype.updataInfo = function () {
        this.skill1.source = "legionSkill_json.img_legionSkill_601101";
        this.skill2.source = "legionSkill_json.img_legionSkill_601201";
        this.skill3.source = "legionSkill_json.img_legionSkill_601301";
        var temp = GameModels.pet.getLegionSkillByGameType(TypeGame.LADDER_FIGHT1);
        if (temp) {
            var strArr = temp.skill.split(";");
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
    PrewarEmbattleYanWu.prototype.registerMoveItem = function () {
        var _this = this;
        var drags = this._headArr;
        var puts = this._headArr;
        this.moveItem.collision_Range = 32 * 32;
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
            var touchVo = _this._headArr[_this._touchIndex].petRefId;
            var endVo = _this._headArr[_this._endIndex].petRefId;
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
            if (_this._headArr[index].data != 13000) {
                _this._headArr[index].visible = false;
                _this._headArr[index].data = 0;
                _this.resetPetPosData();
            }
            else {
                mg.alertManager.tip(Language.J_ZGBNXZ);
            }
            return true;
        });
        this.moveItem.getSourceMethod = function (selectItem, index) {
            return selectItem.petRefId;
        };
    };
    PrewarEmbattleYanWu.prototype.resetPetPosData = function () {
        var _this = this;
        var petRefId = [];
        for (var i = 0; i < this._headArr.length; i++) {
            petRefId.push(this._headArr[i].petRefId);
        }
        GameModels.pet.petSetFormationLadderDataLinShi(petRefId, utils.Handler.create(this, function () {
            _this.showView();
            _this.updataList();
            _this.updataInfo();
        }));
    };
    PrewarEmbattleYanWu.prototype.onListClick = function (e) {
        var item = this.list.selectedItem;
        if (!item)
            return;
        var temp = Templates.getTemplateById(templates.Map.GENERAL, item);
        var formationData = GameModels.pet.formationLadderDataLinShi;
        if (formationData.indexOf(item) != -1) {
            for (var i = 0; i < this._headArr.length; i++) {
                if (this._headArr[i].data == item) {
                    this._headArr[i].visible = false;
                    this._headArr[i].data = 0;
                    this.resetPetPosData();
                    break;
                }
            }
            return;
        }
        var isBool = false;
        if (temp.corps <= 3) {
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
            mg.alertManager.tip(temp.corps <= 3 ? Language.J_MYKSZQPWZ : Language.J_MYKSZHPWZ);
            return;
        }
        this.resetPetPosData();
    };
    PrewarEmbattleYanWu.prototype.showView = function () {
        var formationData = GameModels.pet.formationLadderDataLinShi;
        for (var i = 0; i < this._headArr.length; i++) {
            this._headArr[i].filters = null;
            if (formationData[i]) {
                this._headArr[i].visible = true;
                this._headArr[i].data = formationData[i];
            }
            else {
                this._headArr[i].data = 0;
            }
        }
        this.showRestrain();
    };
    PrewarEmbattleYanWu.prototype.updataList = function () {
        var petIdArr = GameModels.handBook.getActiviteRedGeneral(this._currSelecdIndex).concat(GameModels.pet.getAllRedPet(this._currSelecdIndex));
        if (petIdArr.length > 0) {
            this.labNo.visible = false;
            petIdArr.sort(function (a, b) {
                var aB = GameModels.pet.isHashFourSkill(a);
                var bB = GameModels.pet.isHashFourSkill(b);
                if (aB) {
                    return -1;
                }
                else if (bB) {
                    return 1;
                }
            });
            // petIdArr.sort(function (a: number, b: number) {
            // 	var formationData: number[] = GameModels.pet.formationLadderDataLinShi;
            // 	var aUp: boolean = false;
            // 	var bUp: boolean = false;
            // 	if (formationData.length > 0) {
            // 		if (formationData.indexOf(a) != -1) {
            // 			aUp = true;
            // 		}
            // 		if (formationData.indexOf(b) != -1) {
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
            if (petIdArr) {
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(petIdArr);
                }
                else {
                    this._listData.replaceAll(petIdArr);
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
    PrewarEmbattleYanWu.prototype.showMonsterHead = function () {
        if (!this._ladderPlayerVo)
            return;
        this.imgLine.visible = true;
        var monsterListDate = this._ladderPlayerVo.monsterDate;
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
    PrewarEmbattleYanWu.prototype.showRestrain = function () {
        if (!this._ladderPlayerVo)
            return;
        var monsterListDate = this._ladderPlayerVo.monsterDate;
        var formationData = []; // GameModels.pet.formationLadderDataLinShi;
        for (var i = 0; i < this._restrainArr.length; i++) {
            var monsterVo = monsterListDate.List[i];
            if (formationData[i] && monsterVo) {
                var temp1 = Templates.getTemplateById(templates.Map.GENERAL, formationData[i]);
                var temp = Templates.getTemplateById(templates.Map.GENERAL, monsterVo.PetId);
                if (temp && temp1) {
                    var type = GameModels.pet.getPetRestrain(temp1.corps, temp.corps);
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
    PrewarEmbattleYanWu.prototype.onHeadClick = function (e) {
        logger.log("111111111111111");
        for (var i = 0; i < this._headArr.length; i++) {
            if (e.currentTarget == this._headArr[i]) {
                if (this._headArr[i].data != 13000) {
                    this._headArr[i].visible = false;
                    this._headArr[i].data = 0;
                    this.resetPetPosData();
                }
                else {
                    mg.alertManager.tip(Language.J_ZGBNXZ);
                }
                break;
            }
        }
    };
    PrewarEmbattleYanWu.prototype.onBegionHeadClick = function (e) {
        mg.alertManager.tip(Language.J_TFZXBNCZ);
    };
    PrewarEmbattleYanWu.prototype.onBtnClick = function (e) {
        var _this = this;
        var temp = GameModels.pet.getLegionSkillByGameType(TypeGame.LADDER_FIGHT1);
        if (e.currentTarget == this.btnFight) {
            if (!this._ladderPlayerVo)
                return;
            var petRefId = [];
            for (var i = 0; i < this._headArr.length; i++) {
                petRefId.push(this._headArr[i].petRefId);
            }
            GameModels.pet.petSetFormationLadderData(GameModels.pet.currType, petRefId, utils.Handler.create(this, function () {
                _this.dispatchEventWith(egret.Event.CLOSE);
                app.gameContext.enterLadder1Fight(_this._ladderPlayerVo.playerId);
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
        }
    };
    PrewarEmbattleYanWu.prototype.onClose = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    PrewarEmbattleYanWu.prototype.onTableClick = function (e) {
        this._currSelecdIndex = this._btnArr.indexOf(e.currentTarget);
        this.scroller.viewport.scrollV = 0;
        this.updataList();
        this.showBtnView();
    };
    PrewarEmbattleYanWu.prototype.showBtnView = function () {
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
    PrewarEmbattleYanWu.prototype.hide = function () {
        // GameModels.pet.currType = -1;
        GameModels.pet.headSelfArr = [];
        this.moveItem.reset();
        this.clearList(this.list);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnFight.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
        this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
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
    return PrewarEmbattleYanWu;
}(ui.PrewarEmbattle1Skin));
__reflect(PrewarEmbattleYanWu.prototype, "PrewarEmbattleYanWu", ["IAlert", "egret.DisplayObject"]);

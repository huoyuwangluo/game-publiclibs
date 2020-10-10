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
var PrewarEmbattleShiLiTa = (function (_super) {
    __extends(PrewarEmbattleShiLiTa, _super);
    function PrewarEmbattleShiLiTa() {
        var _this = _super.call(this) || this;
        _this._headArr = [_this.head0, _this.head1, _this.head2, _this.head3, _this.head4];
        _this._monsterHeadArr = [_this.head5, _this.head6, _this.head7, _this.head8, _this.head9];
        _this._skillIconList = [_this.skill1, _this.skill2, _this.skill3];
        _this._skillLockList = [_this.skillLock1, _this.skillLock2, _this.skillLock3];
        _this._restrainArr = [_this.img_kezhi0, _this.img_kezhi1, _this.img_kezhi2];
        return _this;
    }
    PrewarEmbattleShiLiTa.prototype.show = function (data, isFive) {
        var _this = this;
        if (isFive === void 0) { isFive = false; }
        this._data = data;
        this._tipStr = "";
        this._isFive = isFive;
        this.labTip.visible = isFive;
        var str = "";
        if (this._data.type == 81) {
            this._typeFormation = TypeFormation.BINGFENSANLU_WEI;
            this._tipStr = Language.getExpression(Language.E_ZSSZ1M2WJ, data.template.parm1, Language.UNION_WEIG);
            str = Language.getExpression(Language.E_ZNSZQXH1WJQ, Language.UNION_WEIG) + this._tipStr;
        }
        else if (this._data.type == 82) {
            this._typeFormation = TypeFormation.BINGFENSANLU_SHU;
            this._tipStr = Language.getExpression(Language.E_ZSSZ1M2WJ, data.template.parm1, Language.UNION_SHUG);
            str = Language.getExpression(Language.E_ZNSZQXH1WJQ, Language.UNION_SHUG) + this._tipStr;
        }
        else {
            this._typeFormation = TypeFormation.BINGFENSANLU_WU;
            this._tipStr = Language.getExpression(Language.E_ZSSZ1M2WJ, data.template.parm1, Language.UNION_WUG);
            str = Language.getExpression(Language.E_ZNSZQXH1WJQ, Language.UNION_WUG) + this._tipStr;
        }
        TypeFormation.CURR_ZHENYING_TYPE = this._typeFormation;
        GameModels.pet.headSelfArr = this._headArr;
        this.btnFight.label = Language.C_TZ;
        this.imgCountBg.visible = true;
        this.labJuYi.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_QWJY);
        this.labCount.text = data.step + "";
        this.labDes.text = str;
        GameModels.pet.petGetFormationData(this._typeFormation, utils.Handler.create(this, function () {
            _this.registerMoveItem();
            _this.showView();
            _this.updataInfo();
            _this.showMonsterHead();
            _this.updataList();
        }));
        this.skill1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.skill2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.skill3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.labJuYi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
        for (var i = 0; i < this._monsterHeadArr.length; i++) {
            this._monsterHeadArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBegionHeadClick, this);
        }
        for (var i = 0; i < this._headArr.length; i++) {
            this._headArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadClick, this);
        }
        this.btnFight.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
    };
    PrewarEmbattleShiLiTa.prototype.updataInfo = function () {
        this.skill1.source = "legionSkill_json.img_legionSkill_601101";
        this.skill2.source = "legionSkill_json.img_legionSkill_601201";
        this.skill3.source = "legionSkill_json.img_legionSkill_601301";
        if (GameModels.pet.getLegionSkillByGameType(TypeGame.SHILITA_1)) {
            var strArr = GameModels.pet.getLegionSkillByGameType(TypeGame.SHILITA_1).skill.split(";");
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
    PrewarEmbattleShiLiTa.prototype.registerMoveItem = function () {
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
    PrewarEmbattleShiLiTa.prototype.resetPetPosData = function () {
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
    PrewarEmbattleShiLiTa.prototype.showView = function () {
        var formationData = GameModels.pet.formationDataLinShi;
        this.btnFight.visible = GameModels.pet.hashFormationLinShiData;
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
    PrewarEmbattleShiLiTa.prototype.showMonsterHead = function () {
        this.imgLine.visible = true;
        var monsterListDate = GameModels.shilita.monsterData;
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
    PrewarEmbattleShiLiTa.prototype.onHeadClick = function (e) {
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
    PrewarEmbattleShiLiTa.prototype.showRestrain = function () {
        var monsterListDate = GameModels.shilita.monsterData;
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
    PrewarEmbattleShiLiTa.prototype.updataList = function () {
        var petVoArr1 = GameModels.pet.formatUpVOList.concat(GameModels.pet.gongMingPetList);
        var petVoArr = [];
        for (var i = 0; i < petVoArr1.length; i++) {
            if (petVoArr1[i].template.country == 4 || petVoArr1[i].template.country == GameModels.shilita.currIndex) {
                petVoArr.push(petVoArr1[i]);
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
    PrewarEmbattleShiLiTa.prototype.onListClick = function (e) {
        var item = this.list.selectedItem;
        if (!item)
            return;
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
    PrewarEmbattleShiLiTa.prototype.onBegionHeadClick = function (e) {
        mg.alertManager.tip(Language.J_TFZXBNCZ);
    };
    PrewarEmbattleShiLiTa.prototype.onBtnClick = function (e) {
        var _this = this;
        var temp = GameModels.pet.getLegionSkillByGameType(TypeGame.SHILITA_1);
        if (e.currentTarget == this.btnFight) {
            this._petUid = [];
            var count = 0;
            for (var i = 0; i < this._headArr.length; i++) {
                this._petUid.push(this._headArr[i].petUid);
                if (this._headArr[i].data) {
                    var gamePet = this._headArr[i].data;
                    if (gamePet.template.country != 4) {
                        count++;
                    }
                }
            }
            if (count < parseInt(this._data.template.parm1)) {
                mg.alertManager.tip(this._tipStr);
                return;
            }
            GameModels.pet.petSetFormationData(this._typeFormation, this._petUid, utils.Handler.create(this, function () {
                _this.dispatchEventWith(egret.Event.CLOSE);
                app.gameContext.enterShiLiTa(_this._data, false, _this._isFive);
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
        else if (e.currentTarget == this.labJuYi) {
            this.dispatchEventWith(egret.Event.CLOSE);
            mg.uiManager.show(pet.PetGongMingMain);
        }
    };
    PrewarEmbattleShiLiTa.prototype.onClose = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    PrewarEmbattleShiLiTa.prototype.hide = function () {
        TypeFormation.CURR_ZHENYING_TYPE = 0;
        GameModels.pet.headSelfArr = [];
        this.moveItem.reset();
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnFight.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
        this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
        for (var i = 0; i < this._monsterHeadArr.length; i++) {
            this._monsterHeadArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBegionHeadClick, this);
            this._monsterHeadArr[i].data = null;
        }
        for (var i = 0; i < this._headArr.length; i++) {
            this._headArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadClick, this);
            this._headArr[i].data = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return PrewarEmbattleShiLiTa;
}(ui.PrewarEmbattle2Skin));
__reflect(PrewarEmbattleShiLiTa.prototype, "PrewarEmbattleShiLiTa", ["IAlert", "egret.DisplayObject"]);

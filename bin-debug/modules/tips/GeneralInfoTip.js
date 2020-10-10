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
var tips;
(function (tips) {
    var GeneralInfoTip = (function (_super) {
        __extends(GeneralInfoTip, _super);
        function GeneralInfoTip() {
            var _this = _super.call(this) || this;
            _this._clickType = false;
            _this._labArr = [_this.labHp, _this.labAtk, _this.labDef, _this.labCross];
            return _this;
        }
        ;
        Object.defineProperty(GeneralInfoTip.prototype, "data", {
            set: function (data) {
                if (data.hasOwnProperty("tabIndex")) {
                    this.show(data.data, data.tabIndex, data.equips);
                }
                else {
                    this.show(data);
                }
            },
            enumerable: true,
            configurable: true
        });
        GeneralInfoTip.prototype.show = function (data, pos, equips) {
            if (pos === void 0) { pos = 0; }
            if (equips === void 0) { equips = []; }
            this.scroller.viewport.scrollV = 0;
            this.showView(data, pos, equips);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.imgLock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUnLock, this);
            this.btnDress.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDressClick, this);
        };
        GeneralInfoTip.prototype.removeSelf = function () {
            utils.timer.clear(this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            this.imgLock.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUnLock, this);
            this.btnDress.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDressClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        GeneralInfoTip.prototype.showView = function (data, pos, equips, protoEquips) {
            if (pos === void 0) { pos = 0; }
            if (equips === void 0) { equips = []; }
            if (protoEquips === void 0) { protoEquips = []; }
            this._petVo = null;
            this._petTemp = null;
            this._shenBingTalent = "";
            this.imgHelp.visible = true;
            this.fightGroup.visible = false;
            this.imgLock.visible = false;
            this.btnDress.visible = false;
            this._pos = pos;
            this._equips = equips;
            for (var z = this.scrollerGroup.numChildren; z >= 0; z--) {
                this.scrollerGroup.removeChildAt(z);
            }
            var isTemps = true; //是配置就走配置，不是配置就拿上阵数据
            var star = 0;
            if (data instanceof n.ProtoPet) {
                this._protoPet = data;
                this._petTemp = Templates.getTemplateById(templates.Map.GENERAL, data.PetRefId);
                this.labName.textColor = TypeQuality.getStarColor(this._protoPet.Star);
                star = data.Star;
                this.showOtherPetView();
            }
            else {
                if (data instanceof templates.general) {
                    this.imgHelp.visible = false;
                    this._petTemp = data;
                    isTemps = false;
                    star = this._petTemp.star;
                    this.showProperites(true);
                    this.labName.textColor = TypeQuality.getStarColor(this._petTemp.star);
                }
                else {
                    this._petVo = data;
                    this.imgLock.visible = true;
                    this.imgLock.source = this._petVo.isLock == 0 ? "bag_json.img_bag_unlock" : "bag_json.img_bag_lock";
                    this._petTemp = Templates.getTemplateById(templates.Map.GENERAL, this._petVo.template.id);
                    this.labName.textColor = TypeQuality.getStarColor(this._petVo.star);
                    star = this._petVo.star;
                    this.showProperites(false);
                    if (!this._petVo.isFormat && mg.uiManager.isOpen(dialog.tujian.TuJianMainDialog)) {
                        this.btnDress.visible = true;
                    }
                }
                this.showBaseSkill();
                this.showEquip();
                this.showHongYanSkill();
            }
            if (star < 10 && star != 5) {
                this.imgStar.x = 374 + (((star % 5) - 1) * 8);
            }
            else {
                this.imgStar.x = 406;
            }
            this.imgStar.source = "pet_json.img_petStar" + star + "_png";
            if (!this._petTemp)
                return;
            this.body.setPetBody(this._petTemp.model, true);
            this.labName.text = this._petTemp.name;
            this.labPos.text = this._petTemp.des;
            this.labUnion.text = TypeUnionName.getLeginId(this._petTemp.id == 13000 ? 6 : this._petTemp.country);
            this.labBingZhong.text = TypeCorps.getCorpsBuyType(this._petTemp.corps);
            if (this._petVo && this._petVo.isFormat) {
                this.fightGroup.visible = true;
                this.blabFight.text = this._petVo.fightValue.toString();
                this.showBingFa();
            }
        };
        GeneralInfoTip.prototype.showBaseSkill = function () {
            if (this._petVo) {
                var skillList = this._petVo.skillList.list;
                var skillItem = new item.GeneralInfoSkillItem();
                skillItem.show(1, skillList);
                this.scrollerGroup.addChild(skillItem);
            }
            else {
                var skillTemp = this._petTemp.skill.split(";");
                var skillList = [];
                for (var i = 0; i < skillTemp.length; i++) {
                    if (skillTemp[i] != "-1") {
                        var skillVO = vo.fromPool(vo.SkillVO);
                        skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, skillTemp[i]), 0);
                        skillList.push(skillVO);
                    }
                }
                var skillItem = new item.GeneralInfoSkillItem();
                skillItem.show(1, skillList);
                this.scrollerGroup.addChild(skillItem);
            }
            var shenBingVo = Templates.getTemplateByProperty(templates.Map.SMITHYSHENBING, "general", this._petTemp.id);
            if (shenBingVo) {
                var talentArr = shenBingVo.starTalent.split(";");
                if (this._petVo) {
                    var sbLv = this._petVo.shenBingLv < 1 ? 1 : this._petVo.shenBingLv;
                    for (var i = 0; i < talentArr.length; i++) {
                        if (sbLv >= parseInt(talentArr[i].split("_")[0])) {
                            this._shenBingTalent = talentArr[i].split("_")[1];
                        }
                    }
                }
                else {
                    this._shenBingTalent = talentArr[0].split("_")[1];
                }
                var sBSkillVO = vo.fromPool(vo.SkillVO);
                sBSkillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, this._shenBingTalent), 0);
                var sBSkillItem = new item.GeneralInfoSkillItem();
                sBSkillItem.show(2, [sBSkillVO]);
                this.scrollerGroup.addChild(sBSkillItem);
                this.labShenBing.text = shenBingVo.name;
            }
            else {
                this.labShenBing.text = Language.Z_WU;
            }
        };
        GeneralInfoTip.prototype.showProperites = function (isTemp) {
            if (isTemp) {
                if (!this._petTemp)
                    return;
                var proStr = this._petTemp.properties.split(";");
                for (var i = 0; i < proStr.length; i++) {
                    if (proStr[i]) {
                        this._labArr[i].text = proStr[i].split("_")[1];
                    }
                    else {
                        this._labArr[i].text = "0";
                    }
                }
            }
            else {
                if (!this._petVo)
                    return;
                this.labHp.text = this._petVo.getProperty(TypeProperty.MaxHp);
                this.labAtk.text = this._petVo.getProperty(TypeProperty.PAtk);
                this.labDef.text = this._petVo.getProperty(TypeProperty.PDef);
                this.labCross.text = this._petVo.getProperty(TypeProperty.IgnorePDef);
            }
        };
        GeneralInfoTip.prototype.showBingFa = function () {
            if (!this._petVo)
                return;
            var listVo = this._petVo.bingFaVOList;
            if (listVo.length <= 0)
                return;
            var skillItem = new item.GeneralInfoSkillItem();
            skillItem.show(3, null, listVo);
            this.scrollerGroup.addChild(skillItem);
        };
        GeneralInfoTip.prototype.showHongYanSkill = function () {
            if (!this._petVo)
                return;
            var listVo = this._petVo.hongYanSkill;
            if (!listVo)
                return;
            var skillItem = new item.GeneralInfoSkillItem();
            skillItem.show(4, [listVo]);
            this.scrollerGroup.addChild(skillItem);
        };
        GeneralInfoTip.prototype.showEquip = function () {
            var baseEquip = [];
            if (this._equips.length > 0) {
                for (var i = 0; i < this._equips.length; i++) {
                    if (this._equips[i].rolePos == this._pos && Math.floor(this._equips[i].pos / 10) == TypeEquip.JICHU_EQIUP) {
                        if (this._equips[i].refId) {
                            baseEquip.push(this._equips[i]);
                        }
                    }
                }
            }
            baseEquip.sort(function (a, b) {
                return a.pos - b.pos;
            });
            if (baseEquip.length > 0) {
                var equipItem = new item.GeneralInfoEquipItem();
                equipItem.show(1, baseEquip);
                this.scrollerGroup.addChild(equipItem);
            }
        };
        GeneralInfoTip.prototype.onBtnClick = function (e) {
            if (this._petVo) {
                var obj = { proper: this._petVo.property, refId: this._petVo.refId };
                mg.TipUpManager.instance.showTip(tipUps.PropertyTips, obj);
            }
            else if (this._protoPet) {
                var serverData = {};
                for (var c = 0; c < this._protoPet.PropertyList.length; c++) {
                    serverData[this._protoPet.PropertyList[c].Type] = this._protoPet.PropertyList[c].Value;
                }
                var obj = { proper: serverData, refId: this._protoPet.PetRefId };
                mg.TipUpManager.instance.showTip(tipUps.PropertyTips, obj);
            }
        };
        GeneralInfoTip.prototype.onUnLock = function (e) {
            var _this = this;
            if (this._petVo instanceof vo.GamePetVO) {
                var status = this._petVo.isLock == 0 ? 1 : 0;
                GameModels.pet.petSetLockDate(this._petVo.uid, status, utils.Handler.create(this, function () {
                    _this.imgLock.source = _this._petVo.isLock == 0 ? "bag_json.img_bag_unlock" : "bag_json.img_bag_lock";
                }));
            }
        };
        GeneralInfoTip.prototype.onDressClick = function (e) {
            if (this._petVo instanceof vo.GamePetVO) {
                if (!this._petVo.isFormat) {
                    var point = this._petVo.fightType == 1 ? 1 : 3;
                    mg.uiManager.show(dialog.role.RoleMainDialog, { tabIndex: 0, param: point });
                    mg.TipManager.instance.removeBlack();
                    this.removeSelf();
                }
            }
        };
        GeneralInfoTip.prototype.showOtherPetView = function () {
            for (var c = 0; c < this._protoPet.PropertyList.length; c++) {
                if (this._protoPet.PropertyList[c].Type == TypeProperty.MaxHp) {
                    this.labHp.text = this._protoPet.PropertyList[c].Value + "";
                }
                if (this._protoPet.PropertyList[c].Type == TypeProperty.PAtk) {
                    this.labAtk.text = this._protoPet.PropertyList[c].Value + "";
                }
                if (this._protoPet.PropertyList[c].Type == TypeProperty.PDef) {
                    this.labDef.text = this._protoPet.PropertyList[c].Value + "";
                }
                if (this._protoPet.PropertyList[c].Type == TypeProperty.IgnorePDef) {
                    this.labCross.text = this._protoPet.PropertyList[c].Value + "";
                }
            }
            var skillList = [];
            var skillArr = this._protoPet.SkillList.concat();
            for (var i = 0; i < skillArr.length; i++) {
                var skillVO = vo.fromPool(vo.SkillVO);
                skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, skillArr[i].SkillRedId), 0);
                skillList.push(skillVO);
            }
            var skillItem = new item.GeneralInfoSkillItem();
            skillItem.show(1, skillList);
            this.scrollerGroup.addChild(skillItem);
            var shenBingVo = Templates.getTemplateByProperty(templates.Map.SMITHYSHENBING, "general", this._protoPet.PetRefId);
            if (shenBingVo) {
                var talentArr = shenBingVo.starTalent.split(";");
                if (this._petVo) {
                    var sbLv = this._protoPet.ShenBingLv < 1 ? 1 : this._protoPet.ShenBingLv;
                    for (var i = 0; i < talentArr.length; i++) {
                        if (sbLv >= parseInt(talentArr[i].split("_")[0])) {
                            this._shenBingTalent = talentArr[i].split("_")[1];
                        }
                    }
                }
                else {
                    this._shenBingTalent = talentArr[0].split("_")[1];
                }
                var sBSkillVO = vo.fromPool(vo.SkillVO);
                sBSkillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, this._shenBingTalent), 0);
                var sBSkillItem = new item.GeneralInfoSkillItem();
                sBSkillItem.show(2, [sBSkillVO]);
                this.scrollerGroup.addChild(sBSkillItem);
                this.labShenBing.text = shenBingVo.name;
            }
            else {
                this.labShenBing.text = Language.Z_WU;
            }
            this.showEquip();
            var bingFaVo = [];
            for (var i = 0; i < this._protoPet.BingFaList.length; i++) {
                var listVo = vo.fromPool(vo.GamePetBingFaVO, this._protoPet.BingFaList[i]);
                bingFaVo.push(listVo);
            }
            if (bingFaVo.length > 0) {
                var skillItem = new item.GeneralInfoSkillItem();
                skillItem.show(3, null, bingFaVo);
                this.scrollerGroup.addChild(skillItem);
            }
            var hongYanSkillVo = null;
            if (this._protoPet.HongYanCfgId != 0) {
                var hongYanTemp = Templates.getTemplateById(templates.Map.HONGYAN, this._protoPet.HongYanCfgId.toString());
                var hySkillId = hongYanTemp.skillId;
                if (!hySkillId) {
                    logger.log("配置找不到=========", this._protoPet.HongYanCfgId);
                }
                var skillVO = vo.fromPool(vo.SkillVO);
                skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, hySkillId), 0, hongYanTemp.skillOpenLv, this._protoPet.HongYanLevel);
                hongYanSkillVo = skillVO;
            }
            if (hongYanSkillVo && !hongYanSkillVo.isLock) {
                var skillItem = new item.GeneralInfoSkillItem();
                skillItem.show(4, [hongYanSkillVo]);
                this.scrollerGroup.addChild(skillItem);
            }
        };
        GeneralInfoTip.prototype.btnCloseClick = function (e) {
            mg.TipManager.instance.removeBlack();
            this.removeSelf();
        };
        return GeneralInfoTip;
    }(ui.GeneralInfoTipSkin));
    tips.GeneralInfoTip = GeneralInfoTip;
    __reflect(GeneralInfoTip.prototype, "tips.GeneralInfoTip", ["ITipLogic", "egret.DisplayObject"]);
})(tips || (tips = {}));

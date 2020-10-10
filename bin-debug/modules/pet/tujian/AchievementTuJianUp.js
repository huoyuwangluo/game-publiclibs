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
var AchievementTuJianUp = (function (_super) {
    __extends(AchievementTuJianUp, _super);
    function AchievementTuJianUp() {
        var _this = _super.call(this) || this;
        Mediator.getMediator(_this).onAdd(_this, _this.enter);
        Mediator.getMediator(_this).onRemove(_this, _this.exit);
        _this._petSKillArr = [_this.skill0, _this.skill1, _this.skill2, _this.skill3];
        return _this;
    }
    AchievementTuJianUp.prototype.enter = function (data) {
        this.btnAct.visible = GameModels.platform.isPay;
        this.show(data);
        this.labStarCheck.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_SXYL);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.img_LieZhuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
        this.imgSearch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
        this.btnAct.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
        this.labCorps.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
        for (var i = 0; i < this._petSKillArr.length; i++) {
            this._petSKillArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
        }
        this.skillShenBing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
        this.labStarCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
        GameModels.user.player.onPropertyChange(TypeProperty.HANDBOOK_EXP, this, this.showUpgradeView);
    };
    AchievementTuJianUp.prototype.show = function (data) {
        this._data = data;
        this.showUpgradeView();
    };
    AchievementTuJianUp.prototype.exit = function (data) {
        this._data = null;
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.labStarCheck.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
        this.img_LieZhuan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
        this.imgSearch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
        this.btnAct.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
        this.labCorps.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
        for (var i = 0; i < this._petSKillArr.length; i++) {
            this._petSKillArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
        }
        this.skillShenBing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
        GameModels.user.player.offPropertyChange(TypeProperty.HANDBOOK_EXP, this, this.showUpgradeView);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    AchievementTuJianUp.prototype.btnIconClick = function (e) {
        if (e.currentTarget == this.btnAct) {
            if (this._data.status == 0 || this._data.status == 1) {
                mg.alertManager.showAlert(PropOfSourceAlert, true, true, this._data.general, 0, false);
            }
            else {
                // if (GameModels.guide.guideType == mo.ModelGuide.guideType0) {
                // 	GameModels.guide.requestGuideDone(mo.ModelGuide.guideType0);
                // }
                // GameModels.handBook.requestActHandbook(this._suitId, this._data.handbookId, utils.Handler.create(this, () => {
                // 	mg.effectManager.playEffectOnce(TypeEffectId.JIHUO_EFF, this.width * 0.5, this.height * 0.5, this);
                // 	this.showUpgradeView();
                // }));
            }
        }
        else if (e.currentTarget == this.img_LieZhuan) {
            mg.alertManager.showAlert(achievement.AchievementTuJianLieZhuan, true, true, this._data);
        }
        else if (e.currentTarget == this.imgSearch) {
            var pettmp = Templates.getTemplateById(templates.Map.GENERAL, this._data.general);
            if (pettmp)
                mg.TipManager.instance.showTip(tips.GeneralInfoTip, pettmp);
        }
        else if (e.currentTarget == this.labCorps) {
            if (!GameModels.user.player.legionId) {
                mg.alertManager.tip(Language.J_JRZYCKBZ);
            }
            else {
                var pettemps = Templates.getTemplateById(templates.Map.GENERAL, this._data.general);
                if (pettemps)
                    mg.uiManager.show(LegionCorpsMain, pettemps.corps - 1);
            }
        }
        else if (e.currentTarget == this.labStarCheck) {
            var pettemps = Templates.getTemplateById(templates.Map.GENERAL, this._data.general);
            mg.alertManager.showAlert(pet.PetUpStarPreviewAlter, true, true, pettemps);
        }
    };
    AchievementTuJianUp.prototype.showUpgradeView = function () {
        if (!this._data)
            return;
        this.fightGroup.visible = false;
        this.img_LieZhuan.visible = !!this._data.templates.biogId1;
        var tempHandBook = Templates.getTemplateById(templates.Map.HANDBOOK, this._data.handbookId);
        var tempGeneral = Templates.getTemplateById(templates.Map.GENERAL, tempHandBook.general);
        var proPP = utils.htmlUtil.computeModelTatolFighting(tempHandBook.properties);
        this.body.setPetBody(tempGeneral.model);
        if (this._data.status == 0) {
            this.body.filters = utils.filterUtil.grayFilters;
        }
        else {
            this.fightGroup.visible = true;
            this.body.filters = null;
            this.labPower.text = "" + (proPP * 1);
        }
        var str = Language.C_HD + tempGeneral.name;
        this.btnAct.label = str;
        this.imgActivete.source = this._data.status < 1 ? "img_Unacvitive_png" : "img_acvitive_png";
        this.showSkillView();
    };
    AchievementTuJianUp.prototype.showSkillView = function () {
        this._shenBingSkillVo = null;
        var tempGeneral = Templates.getTemplateById(templates.Map.GENERAL, this._data.general);
        var petCorps = TypeCorps.getCorpsBuyType(tempGeneral.corps);
        this.labCorps.textFlow = utils.htmlUtil.getUnderlineFormat(petCorps);
        this.labLocation.text = tempGeneral.des;
        for (var i = 0; i < this._petSKillArr.length; i++) {
            this._petSKillArr[i].dataSource = null;
            this.skillGroup.removeChild(this._petSKillArr[i]);
        }
        var skillTemp = tempGeneral.skill.split(";");
        var skillList = [];
        for (var i = 0; i < skillTemp.length; i++) {
            if (skillTemp[i] != "-1") {
                var skillVO = vo.fromPool(vo.SkillVO);
                skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, skillTemp[i]), 0);
                skillList.push(skillVO);
            }
        }
        for (var i = 0; i < this._petSKillArr.length; i++) {
            if (skillList[i]) {
                this.skillGroup.addChild(this._petSKillArr[i]);
                this._petSKillArr[i].dataSource = skillList[i];
            }
        }
        var shenBingVo = Templates.getTemplateByProperty(templates.Map.SMITHYSHENBING, "general", this._data.general);
        if (shenBingVo) {
            this.shenBingGroup.visible = true;
            var talentArr = shenBingVo.starTalent.split(";");
            for (var i = 0; i < talentArr.length; i++) {
                if (parseInt(talentArr[i].split("_")[0]) == 1) {
                    var sBSkillVO = vo.fromPool(vo.SkillVO);
                    sBSkillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, talentArr[i].split("_")[1]), 0);
                    this.skillShenBing.dataSource = sBSkillVO;
                    this._shenBingSkillVo = sBSkillVO;
                }
            }
        }
        else {
            this.shenBingGroup.visible = false;
        }
    };
    AchievementTuJianUp.prototype.onSkillClick = function (e) {
        if (e.currentTarget == this.skillShenBing) {
            if (this._shenBingSkillVo)
                mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, this._shenBingSkillVo);
        }
        else {
            for (var i = 0; i < this._petSKillArr.length; i++) {
                if (e.currentTarget == this._petSKillArr[i]) {
                    mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, this._petSKillArr[i].dataSource);
                    break;
                }
            }
        }
    };
    AchievementTuJianUp.prototype.onClose = function (e) {
        mg.uiManager.remove(this);
    };
    /**标签改变 */
    AchievementTuJianUp.CHANG_TAL = "CHANG_TAL";
    return AchievementTuJianUp;
}(ui.AchievementTuJianUpSkin));
__reflect(AchievementTuJianUp.prototype, "AchievementTuJianUp");

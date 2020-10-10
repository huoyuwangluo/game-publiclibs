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
var pet;
(function (pet) {
    var PetLvRebirth = (function (_super) {
        __extends(PetLvRebirth, _super);
        function PetLvRebirth() {
            return _super.call(this) || this;
        }
        PetLvRebirth.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        PetLvRebirth.prototype.enter = function () {
            this.labdes1.text = Language.J_LVTX1;
            this.labdes2.text = Language.J_LVTX2;
            this.labdes3.text = Language.J_LVTX3;
            this.randomStar.source = null;
            this.imgHide.visible = false;
            this.needGroup.visible = false;
            this.imgType.source = "img_rebirthBg4_png";
            this.rebirthType.source = "img_rebirthBg5_png";
            this.imgPreBg.visible = false;
            this.btnBuy.visible = false;
            this.showView();
            this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.selectedIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changePet, this);
            GameModels.upStar.addEventListener(mo.ModelUpStar.ADD_REMOVE_GAMEPETVO, this.showView, this);
            GameModels.upStar.addEventListener(mo.ModelUpStar.PETREBIRTH_CHANGE, this.showView, this);
        };
        PetLvRebirth.prototype.showView = function () {
            this._petVo = GameModels.upStar.rebirthLvPetVo;
            this.imgRedPoint.visible = GameModels.upStar.checkPetZhongShengRedPoint();
            if (!this._petVo) {
                this.selectedIcon.source = "tujian_json.img_addrebirth";
                this.selectedStar.source = null;
                this.selfIcon.source = null;
                this.selfStar.source = null;
                this.randomIcon.source = null;
                this.selectedQuality.source = null;
                this.selfQuality.source = null;
                this.labCount.text = "";
                this.labLv1.text = "";
                this.labLv2.text = "";
                this.randomQuality.source = null;
            }
            else {
                this.labLv1.text = "Lv." + this._petVo.lv;
                this.labLv2.text = "Lv.1";
                this.selectedIcon.source = ResPath.getItemIconKey(this._petVo.refId);
                this.selectedStar.source = "tujian_json.img_star" + this._petVo.star;
                this.selectedQuality.source = ResPath.getPetQualityByStar(this._petVo.star, this._petVo.isHashFourSkill);
                var petTmp = Templates.getTemplateById(templates.Map.GENERAL, this._petVo.refId);
                if (petTmp) {
                    this.selfIcon.source = ResPath.getItemIconKey(this._petVo.refId);
                    this.selfStar.source = "tujian_json.img_star" + petTmp.star;
                    this.selfQuality.source = ResPath.getPetQualityByStar(petTmp.star, GameModels.pet.isHashFourSkill(petTmp.id));
                }
                var itemTmp = Templates.getTemplateById(templates.Map.ITEM, 210201);
                var clearCaiLiao = 0;
                if (this._petVo.lv > 1) {
                    clearCaiLiao = parseInt(GameModels.pet.getCaiLiaoCountByClearPet(this._petVo.lv).split(";")[0].split("_")[1]);
                }
                this.randomQuality.source = ResPath.getQuality(itemTmp.quality);
                this.labCount.text = "X" + clearCaiLiao;
                this.randomIcon.source = itemTmp.icon;
            }
        };
        PetLvRebirth.prototype.onBtnClick = function (e) {
            if (!this._petVo)
                return;
            GameModels.upStar.petLvReduceStar(this._petVo.uid, utils.Handler.create(this, function () {
                // if (GameModels.guide.guideTypeClinte == mo.ModelGuide.guideType30000) {
                // 	GameModels.guide.stopClinteGuide();
                // 	var viewRole: dialog.role.RoleMainDialog = mg.uiManager.getView(dialog.role.RoleMainDialog) as dialog.role.RoleMainDialog;
                // 	if (viewRole) GameModels.guide.setClinteGuideType(mo.ModelGuide.guideType20000, viewRole.equipView.headIndex);
                // }
                mg.alertManager.tip(Language.J_TQCG);
            }));
        };
        PetLvRebirth.prototype.changePet = function (e) {
            mg.alertManager.showAlert(pet.PetRebirthList, true, true, 1);
        };
        PetLvRebirth.prototype.exit = function () {
            this._petVo = null;
            GameModels.upStar.rebirthLvPetVo = null;
            this.selectedIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changePet, this);
            this.btnUpgrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            GameModels.upStar.removeEventListener(mo.ModelUpStar.ADD_REMOVE_GAMEPETVO, this.showView, this);
            GameModels.upStar.removeEventListener(mo.ModelUpStar.PETREBIRTH_CHANGE, this.showView, this);
        };
        return PetLvRebirth;
    }(ui.PetRebirthSkin));
    pet.PetLvRebirth = PetLvRebirth;
    __reflect(PetLvRebirth.prototype, "pet.PetLvRebirth");
})(pet || (pet = {}));

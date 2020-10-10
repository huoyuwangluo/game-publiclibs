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
    var PetRebirth = (function (_super) {
        __extends(PetRebirth, _super);
        function PetRebirth() {
            var _this = _super.call(this) || this;
            _this._itemId = "";
            return _this;
        }
        PetRebirth.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        PetRebirth.prototype.enter = function () {
            this.btnBuy.visible = this.imgPreBg.visible = GameModels.platform.isPay;
            this.labdes1.text = Language.J_STARTX1;
            this.labdes2.text = Language.J_STARTX2;
            this.labdes3.text = Language.J_STARTX3;
            this.labLv1.text = "";
            this.labLv2.text = "";
            this.imgType.source = "img_rebirthBg3_png";
            this.rebirthType.source = "img_rebirthBg6_png";
            this.imgRedPoint.visible = false;
            this._itemId = "";
            this._count = 0;
            this._angle = 0;
            this.showView();
            egret.Tween.removeTweens(this.imgPreBg);
            this.tweenPreviewImgHandler();
            this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.selectedIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changePet, this);
            this.getItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showItemVieww, this);
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyItemClick, this);
            GameModels.upStar.addEventListener(mo.ModelUpStar.ADD_REMOVE_GAMEPETVO, this.showView, this);
            GameModels.upStar.addEventListener(mo.ModelUpStar.PETREBIRTH_CHANGE, this.showView, this);
        };
        PetRebirth.prototype.showView = function () {
            this._petVo = GameModels.upStar.rebirthPetVo;
            if (!this._petVo) {
                this.selectedIcon.source = "tujian_json.img_addrebirth";
                this.selectedStar.source = null;
                this.selfIcon.source = null;
                this.selfStar.source = null;
                this.randomIcon.source = null;
                this.randomStar.source = null;
                this.selectedQuality.source = null;
                this.selfQuality.source = null;
                this.labCount.text = "";
                this.randomQuality.source = null;
                this.imgHide.visible = true;
                this.needGroup.visible = false;
            }
            else {
                this.imgHide.visible = false;
                this.needGroup.visible = true;
                this.selectedIcon.source = ResPath.getItemIconKey(this._petVo.refId);
                this.selectedStar.source = "tujian_json.img_star" + this._petVo.star;
                this.selectedQuality.source = ResPath.getPetQualityByStar(this._petVo.star, this._petVo.isHashFourSkill);
                var petTmp = Templates.getTemplateById(templates.Map.GENERAL, this._petVo.refId);
                if (petTmp) {
                    this.selfIcon.source = ResPath.getItemIconKey(this._petVo.refId);
                    this.selfStar.source = "tujian_json.img_star" + petTmp.star;
                    this.selfQuality.source = ResPath.getPetQualityByStar(petTmp.star, GameModels.pet.isHashFourSkill(petTmp.id));
                }
                this.randomQuality.source = "qualityBg_json.img_qlt_6_png";
                this.randomStar.source = "tujian_json.img_star5";
                var getReward = this._petVo.generalBraekTmp.reduceGen.split(";")[0];
                this.labCount.text = "X" + getReward.split("_")[1];
                var item = Templates.getTemplateById(templates.Map.ITEM, this._petVo.generalBraekTmp.reduceGen.split("_")[0]);
                this.randomIcon.source = item.icon;
                var reditem = Templates.getTemplateById(templates.Map.ITEM, this._petVo.generalBraekTmp.reduceConsume.split("_")[0]);
                this.labNeed.text = reditem.name;
                this.imgNeedIcon.source = reditem.icon;
                this._itemId = this._petVo.generalBraekTmp.reduceConsume.split("_")[0];
                var bagCount = GameModels.bag.getItemCountById(this._petVo.generalBraekTmp.reduceConsume.split("_")[0]);
                var needCount = parseInt(this._petVo.generalBraekTmp.reduceConsume.split("_")[1]);
                this.labNeedCount.text = bagCount + "/" + needCount;
                this.labNeedCount.textColor = bagCount >= needCount ? TypeColor.GREEN1 : TypeColor.RED1;
            }
        };
        PetRebirth.prototype.onBtnClick = function (e) {
            if (!this._petVo)
                return;
            GameModels.upStar.petReduceStar(this._petVo.uid, utils.Handler.create(this, function () {
                mg.alertManager.tip(Language.J_TQCG);
            }));
        };
        PetRebirth.prototype.changePet = function (e) {
            mg.alertManager.showAlert(pet.PetRebirthList, true, true, 2);
        };
        PetRebirth.prototype.showItemVieww = function (e) {
            if (this._itemId)
                mg.alertManager.showAlert(PropOfSourceAlert, true, true, this._itemId);
        };
        PetRebirth.prototype.buyItemClick = function (e) {
            mg.alertManager.showAlert(dialog.baowu.BaoWuPurchaseLimitation, false, true, 4);
        };
        PetRebirth.prototype.tweenPreviewImgHandler = function () {
            this._count++;
            this._angle = this._count * 360;
            egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
        };
        PetRebirth.prototype.exit = function () {
            this._petVo = null;
            this._itemId = "";
            this._count = 0;
            this._angle = 0;
            egret.Tween.removeTweens(this.imgPreBg);
            GameModels.upStar.rebirthPetVo = null;
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyItemClick, this);
            this.selectedIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changePet, this);
            this.btnUpgrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.getItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showItemVieww, this);
            GameModels.upStar.removeEventListener(mo.ModelUpStar.ADD_REMOVE_GAMEPETVO, this.showView, this);
            GameModels.upStar.removeEventListener(mo.ModelUpStar.PETREBIRTH_CHANGE, this.showView, this);
        };
        return PetRebirth;
    }(ui.PetRebirthSkin));
    pet.PetRebirth = PetRebirth;
    __reflect(PetRebirth.prototype, "pet.PetRebirth");
})(pet || (pet = {}));

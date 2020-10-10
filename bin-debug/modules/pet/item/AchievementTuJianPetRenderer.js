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
var renderer;
(function (renderer) {
    var AchievementTuJianPetRenderer = (function (_super) {
        __extends(AchievementTuJianPetRenderer, _super);
        function AchievementTuJianPetRenderer() {
            return _super.call(this) || this;
        }
        AchievementTuJianPetRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (!this.data)
                return;
            var pet = this.data;
            if (pet instanceof vo.GamePetVO) {
                this.imgWarn.visible = false;
                this.img_petType.visible = false;
                this.imgTaskState.visible = false;
                if (pet.isFormat || pet.isGongMing == 1) {
                    this.img_petType.visible = true;
                    this.img_petType.source = pet.isFormat ? "pet_json.img_petFormate_png" : "pet_json.img_petJuYi_png";
                }
                this.imgQuality.source = ResPath.getLingXingQualityByStar(pet.star, pet.isHashFourSkill);
                this.imgHead.source = ResPath.getPetIconSmall(pet.template.model);
                this.imgPetJob.source = "common_json.img_pet_job" + pet.template.corps + "_png";
                this.labLevel.text = pet.lv + "";
                this.imgStar.visible = true;
                this.imgStar.source = pet.star > 0 ? "tujian_json.img_star" + pet.star : "";
                this.imgLock.visible = pet.isLock == 1;
                if (pet.isFormat) {
                    this.imgWarn.visible = GameModels.upStar.checkPetHeadUpStarRedPoint(pet) || GameModels.equip.checkBingFaRedPoint(pet.formatData.position);
                }
            }
            else if (pet instanceof templates.general) {
                this.imgWarn.visible = false;
                this.img_petType.visible = false;
                this.imgLock.visible = false;
                this.labLevel.text = "";
                this.imgTaskState.visible = false;
                var skillArr = pet.skill.split(";");
                var hashFourSkill = skillArr.length >= 4 && skillArr[skillArr.length - 1] != "-1";
                this.imgQuality.source = ResPath.getLingXingQualityByStar(pet.star, hashFourSkill);
                this.imgHead.source = ResPath.getPetIconSmall(pet.model);
                this.imgPetJob.source = "common_json.img_pet_job" + pet.corps + "_png";
                this.imgStar.source = pet.star > 0 ? "tujian_json.img_star" + pet.star : "";
            }
            else {
                this.imgWarn.visible = false;
                this.img_petType.visible = false;
                this.imgLock.visible = false;
                this.imgStar.visible = false;
                this.labLevel.text = "";
                this.imgTaskState.visible = true;
                this.imgQuality.source = ResPath.getLingXingQualityByStar(pet.generalTemp.star, GameModels.pet.isHashFourSkill(pet.generalTemp.id));
                this.imgHead.source = ResPath.getPetIconSmall(pet.generalTemp.model);
                this.imgPetJob.source = "common_json.img_pet_job" + pet.generalTemp.corps + "_png";
                this.imgTaskState.source = "pet_json.img_pet_task" + pet.state + "_png";
            }
        };
        AchievementTuJianPetRenderer.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.currentState == "up") {
                this.dataChanged();
            }
        };
        return AchievementTuJianPetRenderer;
    }(ui.AchievementTuJianPetRendererSkin));
    renderer.AchievementTuJianPetRenderer = AchievementTuJianPetRenderer;
    __reflect(AchievementTuJianPetRenderer.prototype, "renderer.AchievementTuJianPetRenderer");
})(renderer || (renderer = {}));

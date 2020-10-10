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
var item;
(function (item) {
    var PetSKillAndTalent = (function (_super) {
        __extends(PetSKillAndTalent, _super);
        function PetSKillAndTalent() {
            return _super.call(this) || this;
        }
        PetSKillAndTalent.prototype.dataChange = function () {
            this.imgWuShuang.visible = false;
            this.imgNoAct.visible = false;
            this.imgQuality.visible = true;
            this.imgAnimalQuality.visible = false;
            if (this.dataSource) {
                if (this.dataSource instanceof vo.SkillVO) {
                    var skillVo = this.dataSource;
                    if (skillVo.type == 2) {
                        this.imgWuShuang.visible = true;
                        this.imgWuShuang.source = "legionSkill_json.img_wushuang_index";
                    }
                    if (skillVo.group == 3) {
                        this.imgWuShuang.visible = true;
                        this.imgWuShuang.source = "legionSkill_json.img_shenbing_index";
                    }
                    this.imgQuality.source = ResPath.getQuality(1);
                    this.imgRed.visible = false;
                    this.imgIcon.source = skillVo.icon;
                    this.labName.text = skillVo.level > 0 ? "lv:" + skillVo.level : "";
                    this.filters = skillVo.isLock ? utils.filterUtil.grayFilters : null;
                    if (skillVo.group != 3) {
                        if (skillVo.isLock) {
                            this.labName.text = Language.getExpression(Language.E_1JJS, skillVo.needLv);
                        }
                    }
                }
                else if (this.dataSource instanceof vo.GamePetBingFaVO) {
                    var bingFaVo = this.dataSource;
                    this.imgQuality.source = ResPath.getQuality(bingFaVo.quality);
                    this.imgRed.visible = false;
                    this.imgIcon.source = bingFaVo.icon;
                    this.labName.text = "";
                }
                else if (this.dataSource instanceof templates.animal) {
                    var animal = this.dataSource;
                    var isAct = GameModels.animal.getAnimalIsActBuyTypeAndStep(animal.type, animal.step);
                    this.imgQuality.source = ResPath.getQuality(animal.quality);
                    this.imgRed.visible = false;
                    this.imgIcon.source = animal.skillIcon.toString();
                    this.labName.text = "";
                    this.imgNoAct.visible = !isAct;
                    this.imgQuality.visible = false;
                    this.imgAnimalQuality.visible = true;
                    this.imgAnimalQuality.source = "animal_json.img_animal_" + animal.step;
                }
                else {
                    this.imgQuality.source = "qualityBg_json.img_qlt_1_png";
                    this.imgRed.visible = false;
                    this.imgIcon.source = this.dataSource;
                    this.labName.text = "";
                }
            }
        };
        return PetSKillAndTalent;
    }(ui.PetSKillAndTalentSkin));
    item.PetSKillAndTalent = PetSKillAndTalent;
    __reflect(PetSKillAndTalent.prototype, "item.PetSKillAndTalent");
})(item || (item = {}));

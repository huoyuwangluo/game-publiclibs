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
var tipUps;
(function (tipUps) {
    var PetNextSkillDetailsTips = (function (_super) {
        __extends(PetNextSkillDetailsTips, _super);
        function PetNextSkillDetailsTips() {
            return _super.call(this) || this;
        }
        Object.defineProperty(PetNextSkillDetailsTips.prototype, "data", {
            set: function (data) {
                this.show(data);
            },
            enumerable: true,
            configurable: true
        });
        PetNextSkillDetailsTips.prototype.show = function (data) {
            this.imgWuShuang.visible = false;
            this.labUpNeed.text = "";
            this.labUpGrade.text = "";
            this.labNext.text = "";
            this.labExclusive.text = "";
            if (data) {
                var skillVo = data;
                switch (skillVo.group) {
                    case 1:
                        this.labTitle.text = Language.C_WJJN;
                        break;
                    case 2:
                        this.labTitle.text = Language.C_BFJN;
                        break;
                    case 3:
                        this.labTitle.text = Language.C_SBJN;
                        break;
                    case 4:
                        this.labTitle.text = Language.C_HYJN;
                        break;
                    case 7:
                        this.labTitle.text = Language.C_TZJN;
                        break;
                }
                if (skillVo.skillType == 2) {
                    this.imgWuShuang.visible = true;
                    this.imgWuShuang.source = "legionSkill_json.img_wushuang_index";
                }
                if (skillVo.group == 3) {
                    this.imgWuShuang.visible = true;
                    this.imgWuShuang.source = "legionSkill_json.img_shenbing_index";
                    this.labUpGrade.text = Language.J_SBJNXG;
                    var sBtemp = Templates.getTemplateByProperty(templates.Map.SMITHYSHENBING, "name", skillVo.name);
                    if (sBtemp) {
                        var petTmp = Templates.getTemplateById(templates.Map.GENERAL, sBtemp.general);
                        if (petTmp) {
                            var elements = [];
                            elements.push({ text: petTmp.name, style: { textColor: TypeQuality.getStarColor(petTmp.star) } });
                            elements.push({ text: Language.C_ZSSB + Language.P_JN, style: { textColor: 0xD3D3D3 } });
                            this.labExclusive.textFlow = elements;
                        }
                    }
                }
                this.imgQuality.source = ResPath.getQuality(1);
                this.imgIcon.source = skillVo.icon;
                this.labName.text = skillVo.name;
                this.labLv.text = "lv." + skillVo.id % 100;
                this.labContent.text = skillVo.Desc;
            }
        };
        PetNextSkillDetailsTips.prototype.removeSelf = function () {
            mg.TipUpManager.instance.setCurrent();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PetNextSkillDetailsTips;
    }(ui.PetSkillDetailsTipsSkin));
    tipUps.PetNextSkillDetailsTips = PetNextSkillDetailsTips;
    __reflect(PetNextSkillDetailsTips.prototype, "tipUps.PetNextSkillDetailsTips", ["ITipLogic", "egret.DisplayObject"]);
})(tipUps || (tipUps = {}));

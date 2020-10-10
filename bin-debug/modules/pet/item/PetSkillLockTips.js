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
var PetSkillLockTips = (function (_super) {
    __extends(PetSkillLockTips, _super);
    function PetSkillLockTips() {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this._angle = 0;
        return _this;
    }
    PetSkillLockTips.prototype.show = function (skill, type) {
        if (type === void 0) { type = 1; }
        this.labExclusive.visible = false;
        this.imgBg.source = type == 1 ? "img_skillLockBg_png" : "img_skillLockBg1_png";
        if (skill instanceof vo.SkillVO) {
            this.skill.dataSource = skill;
            this.skill.labName.text = "";
            this.skill.filters = null;
            var elements = [];
            elements.push({ text: skill.name, style: { textColor: 0xFED385 } });
            elements.push({ text: skill.level > 0 ? "lv." + skill.level : "", style: { textColor: 0xD3D3D3 } });
            this.labName.textFlow = elements;
            this.labDes.text = skill.desc;
            if (skill.template.group == 3) {
                this.labExclusive.visible = true;
                var sBtemp = Templates.getTemplateByProperty(templates.Map.SMITHYSHENBING, "name", skill.template.name);
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
        }
        else {
            this.labName.text = skill.name;
            this.labDes.text = skill.des;
            this.skill.dataSource = skill;
            this.skill.labName.text = "";
            this.skill.filters = null;
        }
        egret.Tween.removeTweens(this.img_ratoion);
        this.tweenPreviewImgHandler();
    };
    PetSkillLockTips.prototype.tweenPreviewImgHandler = function () {
        this._count++;
        this._angle = this._count * 360;
        egret.Tween.get(this.img_ratoion).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
    };
    PetSkillLockTips.prototype.hide = function () {
        this._count = 0;
        this._angle = 0;
        egret.Tween.removeTweens(this.img_ratoion);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return PetSkillLockTips;
}(ui.PetSkillLockTipsSkin));
__reflect(PetSkillLockTips.prototype, "PetSkillLockTips", ["IAlert", "egret.DisplayObject"]);

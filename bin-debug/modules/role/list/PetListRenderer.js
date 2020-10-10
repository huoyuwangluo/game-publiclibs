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
    var PetListRenderer = (function (_super) {
        __extends(PetListRenderer, _super);
        function PetListRenderer() {
            return _super.call(this) || this;
        }
        PetListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var vo = this.data;
                this.btnUp.visible = !vo.isFormat;
                this.imgXiYouPet.visible = vo.isHashFourSkill;
                this.imgXiYouPet.source = vo.quality == 8 ? "smokePet_json.img_smokepet_chuanshuo" : "smokePet_json.img_smokepet_xiyou";
                this.imgFormate.visible = vo.isFormat;
                this.imgPos.source = "pet_json.img_fightType_" + vo.fightType + "_png";
                this.imgQuila.source = ResPath.getPetQualityByStar(vo.star, vo.isHashFourSkill);
                var item = Templates.getTemplateById(templates.Map.ITEM, vo.refId);
                this.imgIcon.source = item.icon;
                this.labName.text = vo.name;
                if (vo.star <= 0) {
                    this.imgStar.visible = false;
                }
                else {
                    this.imgStar.visible = true;
                    this.imgStar.source = "tujian_json.img_star" + vo.star;
                }
                this.labName.textColor = TypeQuality.getStarColor(vo.star);
                this.labLV.text = vo.lv.toString();
                this.labHP.text = vo.getProperty(TypeProperty.MaxHp);
                this.labATK.text = vo.getProperty(TypeProperty.PAtk);
                this.labDEF.text = vo.getProperty(TypeProperty.PDef);
                this.labCROSS.text = vo.getProperty(TypeProperty.IgnorePDef);
                this.labFight.text = vo.baseFightValue.toString();
                this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
            }
            else {
                this.imgIcon.source = null;
                this.imgIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
            }
        };
        PetListRenderer.prototype.showTips = function () {
            if (this.data) {
                var vo = this.data;
                mg.TipManager.instance.showTip(tips.GeneralInfoTip, vo);
            }
        };
        return PetListRenderer;
    }(ui.PetListRendererSkin));
    renderer.PetListRenderer = PetListRenderer;
    __reflect(PetListRenderer.prototype, "renderer.PetListRenderer");
})(renderer || (renderer = {}));

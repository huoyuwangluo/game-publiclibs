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
    var PetUpStarPreviewRenderer = (function (_super) {
        __extends(PetUpStarPreviewRenderer, _super);
        function PetUpStarPreviewRenderer() {
            return _super.call(this) || this;
        }
        PetUpStarPreviewRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var general = this.data.pet;
                var item = Templates.getTemplateById(templates.Map.ITEM, general.id);
                var skillArr = general.skill.split(";");
                var hashFourSKill = skillArr.length >= 4 && skillArr[skillArr.length - 1] != "-1";
                var temp = this.data.tmps;
                // 				this._iconArr[i].source = item.icon;
                // this._qualityArr[i].source = ResPath.getPetQualityByStar(pet.Star,GameModels.pet.isHashFourSkill(pet.PetRefId));
                // this._starArr[i].source = "tujian_json.img_star" + pet.Star;
                // this._labArr[i].text = "LV." + pet.Level.toString();
                if (general) {
                    this.imgIcon.source = item.icon;
                    this.imgQuila.source = ResPath.getPetQualityByStar((temp.star + 1), hashFourSKill);
                    this.imgStar.source = "tujian_json.img_star" + (temp.star + 1);
                    this.labName.text = item.name;
                    this.labName.textColor = TypeQuality.getStarColor(temp.star + 1);
                }
                if (temp) {
                    if (temp.selfGen > 0) {
                        this.imgIcon0.source = item.icon;
                        this.imgQuila0.source = ResPath.getPetQualityByStar((general.star), hashFourSKill);
                        this.imgStar0.source = "tujian_json.img_star" + (general.star);
                        var elements0 = [];
                        elements0.push({ text: item.name, style: { textColor: TypeQuality.getStarColor(general.star) } });
                        elements0.push({ text: "X" + temp.selfGen, style: { textColor: 0xD3D3D3 } });
                        this.labName0.textFlow = elements0;
                    }
                    else {
                        this.imgIcon0.source = "common_json.img_skill_wu_png";
                        this.imgQuila0.source = "qualityBg_json.img_qlt_1_png";
                        this.imgStar0.source = null;
                        this.labName0.text = Language.Z_WU;
                        this.labName0.textColor = 0x9D9D9F;
                    }
                    if (temp.consume) {
                        var couTmp = Templates.getTemplateById(templates.Map.ITEM, temp.consume.split("_")[0]);
                        this.imgIcon1.source = ResPath.getItemIconKey(couTmp.id.toString());
                        this.imgStar1.source = null;
                        this.imgQuila1.source = ResPath.getQuality(couTmp.quality);
                        var elements1 = [];
                        elements1.push({ text: couTmp.name, style: { textColor: TypeQuality.getStarColor(couTmp.quality) } });
                        elements1.push({ text: "X" + temp.consume.split("_")[1], style: { textColor: 0xD3D3D3 } });
                        this.labName1.textFlow = elements1;
                    }
                    else {
                        this.imgIcon1.source = "common_json.img_skill_wu_png";
                        this.imgQuila1.source = "qualityBg_json.img_qlt_1_png";
                        this.imgStar1.source = null;
                        this.labName1.text = Language.Z_WU;
                        this.labName1.textColor = 0x9D9D9F;
                    }
                    if (temp.otherGen) {
                        var other = temp.otherGen.split(";");
                        if (other.length > 1) {
                            this.imgIcon1.source = ResPath.getPetTuBiaoByStar(parseInt(other[0].split("_")[0]));
                            this.imgQuila1.source = ResPath.getPetQualityByStar(parseInt(other[0].split("_")[0]), false);
                            this.imgStar1.source = "tujian_json.img_star" + other[0].split("_")[0];
                            var elements2 = [];
                            elements2.push({ text: Language.getExpression(Language.E_1X, other[0].split("_")[0]), style: { textColor: TypeQuality.getStarColor(parseInt(other[0].split("_")[0])) } });
                            elements2.push({ text: "X" + other[0].split("_")[1], style: { textColor: 0xD3D3D3 } });
                            this.labName1.textFlow = elements2;
                            this.imgIcon2.source = ResPath.getPetTuBiaoByStar(parseInt(other[1].split("_")[0]));
                            this.imgQuila2.source = ResPath.getPetQualityByStar(parseInt(other[1].split("_")[0]), false);
                            this.imgStar2.source = "tujian_json.img_star" + other[1].split("_")[0];
                            var elements3 = [];
                            elements3.push({ text: Language.getExpression(Language.E_1X, other[1].split("_")[0]), style: { textColor: TypeQuality.getStarColor(parseInt(other[1].split("_")[0])) } });
                            elements3.push({ text: "X" + other[1].split("_")[1], style: { textColor: 0xD3D3D3 } });
                            this.labName2.textFlow = elements3;
                        }
                        else {
                            this.imgIcon2.source = ResPath.getPetTuBiaoByStar(parseInt(other[0].split("_")[0]));
                            this.imgQuila2.source = ResPath.getPetQualityByStar(parseInt(other[0].split("_")[0]), false);
                            this.imgStar2.source = "tujian_json.img_star" + other[0].split("_")[0];
                            var elements4 = [];
                            elements4.push({ text: Language.getExpression(Language.E_1X, other[0].split("_")[0]), style: { textColor: TypeQuality.getStarColor(parseInt(other[0].split("_")[0])) } });
                            elements4.push({ text: "X" + other[0].split("_")[1], style: { textColor: 0xD3D3D3 } });
                            this.labName2.textFlow = elements4;
                        }
                    }
                    else {
                        this.imgIcon2.source = "common_json.img_skill_wu_png";
                        this.imgQuila2.source = "qualityBg_json.img_qlt_1_png";
                        this.imgStar2.source = null;
                        this.labName2.text = Language.Z_WU;
                        this.labName2.textColor = 0x9D9D9F;
                    }
                    if (temp.campGen) {
                        var star = parseInt(temp.campGen.split("_")[0]);
                        var count = parseInt(temp.campGen.split("_")[1]);
                        this.imgIcon3.source = ResPath.getPetTuBiaoByStar(star);
                        this.imgQuila3.source = ResPath.getPetQualityByStar(star, false);
                        this.imgStar3.source = "tujian_json.img_star" + star;
                        var elements5 = [];
                        elements5.push({
                            text: Language.C_TJT + Language.getExpression(Language.E_1X, star), style: { textColor: TypeQuality.getStarColor(star) }
                        });
                        elements5.push({ text: "X" + count, style: { textColor: 0xD3D3D3 } });
                        this.labName3.textFlow = elements5;
                        this.imgLegion.source = "common_json.img_union_item" + general.country + "_png";
                    }
                    else {
                        this.imgIcon3.source = "common_json.img_skill_wu_png";
                        this.imgQuila3.source = "qualityBg_json.img_qlt_1_png";
                        this.imgStar3.source = null;
                        this.labName3.text = Language.Z_WU;
                        this.labName3.textColor = 0x9D9D9F;
                        this.imgLegion.source = null;
                    }
                }
            }
        };
        return PetUpStarPreviewRenderer;
    }(ui.PetUpStarPreviewRendererSkin));
    renderer.PetUpStarPreviewRenderer = PetUpStarPreviewRenderer;
    __reflect(PetUpStarPreviewRenderer.prototype, "renderer.PetUpStarPreviewRenderer");
})(renderer || (renderer = {}));

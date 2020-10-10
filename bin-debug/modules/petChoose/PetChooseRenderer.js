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
    var PetChooseRenderer = (function (_super) {
        __extends(PetChooseRenderer, _super);
        function PetChooseRenderer() {
            return _super.call(this) || this;
        }
        PetChooseRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.filters = null;
            this.labDes.textColor = 0xFEE0A1;
            this.labDes.text = "";
            this.removeEff();
            if (this.data && this.data.petData) {
                this.imgLock.visible = false;
                this.img_petJuYi.visible = false;
                // var obj: any = { petData: null, selecd: false, count: "" } 
                /**petData 是GamePetVo或者templates.general或者品质，selecd是否选中 count是显示的数量*/
                if (this.data.petData instanceof templates.item) {
                    var item = this.data.petData;
                    this.imgQuality.source = ResPath.getQuality(item.quality);
                    this.imgIcon.source = item.icon;
                    var textCount = this.data.count;
                    this.labCount.text = textCount;
                    this.labDes.text = item.name;
                    this.labDes.textColor = TypeQuality.getStarColor(item.quality);
                    this.imgSelecd.visible = false;
                    this.imgBack.visible = false;
                    this.star.visible = false;
                    this.imgRedPoint.visible = false;
                    this.imgLegion.visible = false;
                }
                else if (this.data.petData instanceof templates.general) {
                    this.showGeneralTemplates();
                }
                else if (this.data.petData instanceof vo.GamePetVO) {
                    if (this.data.petData.quality >= 8)
                        this.addEff();
                    this.showGamePetVo();
                }
                else {
                    this.showQuality();
                }
            }
        };
        PetChooseRenderer.prototype.showQuality = function () {
            var temp = this.data.petData;
            var selecd = this.data.selecd;
            var textCount = this.data.count;
            this.imgQuality.source = ResPath.getPetQualityByStar(this.data.star, false);
            this.imgIcon.source = ResPath.getPetTuBiaoByStar(this.data.star);
            this.labCount.text = textCount;
            this.imgSelecd.visible = selecd;
            this.imgBack.visible = selecd;
            this.star.visible = false;
            this.imgRedPoint.visible = false;
            if (this.data.star) {
                this.star.visible = true;
                this.star.source = "tujian_json.img_star" + this.data.star;
            }
            if (this.data.point) {
                this.imgRedPoint.visible = true;
            }
            if (this.data.legion) {
                this.imgLegion.visible = true;
                this.imgLegion.source = "common_json.img_union_item" + this.data.legion + "_png";
            }
            else {
                this.imgLegion.visible = false;
            }
            if (this.data.legion) {
                this.labDes.text = Language.getExpression(Language.E_1J2X, TypeUnionName.getLeginId(this.data.legion), this.data.star);
            }
            else {
                this.labDes.text = Language.getExpression(Language.E_1XJ, this.data.star);
            }
        };
        PetChooseRenderer.prototype.showGamePetVo = function () {
            var temp = this.data.petData;
            var selecd = this.data.selecd;
            var textCount = this.data.count;
            if (temp.isLock == 1) {
                this.imgLock.visible = true;
            }
            if (temp.isGongMing == 1) {
                this.img_petJuYi.visible = true;
            }
            this.imgQuality.source = ResPath.getPetQualityByStar(this.data.star, temp.isHashFourSkill);
            this.imgIcon.source = ResPath.getItemIconKey(temp.refId);
            this.labCount.text = textCount;
            this.imgSelecd.visible = selecd;
            this.imgBack.visible = selecd;
            this.star.visible = false;
            this.imgRedPoint.visible = false;
            this.labDes.text = temp.name;
            this.labDes.textColor = TypeQuality.getStarColor(this.data.star);
            if (this.data.star) {
                this.star.visible = true;
                this.star.source = "tujian_json.img_star" + this.data.star;
            }
            if (this.data.point) {
                this.imgRedPoint.visible = true;
            }
            if (this.data.legion) {
                this.imgLegion.visible = true;
                this.imgLegion.source = "common_json.img_union_item" + this.data.legion + "_png";
            }
            else {
                this.imgLegion.visible = false;
            }
            if (temp.isGongMing == 1 || temp.isLock == 1)
                this.filters = utils.filterUtil.grayFilters;
        };
        PetChooseRenderer.prototype.showGeneralTemplates = function () {
            var temp = this.data.petData;
            var selecd = this.data.selecd;
            var textCount = this.data.count;
            this.imgQuality.source = ResPath.getPetQualityByStar(temp.star, GameModels.pet.isHashFourSkill(temp.id));
            this.imgIcon.source = ResPath.getItemIconKey(temp.id.toString());
            this.labCount.text = textCount;
            this.imgSelecd.visible = selecd;
            this.imgBack.visible = selecd;
            this.star.visible = false;
            this.imgRedPoint.visible = false;
            this.labDes.text = temp.name;
            this.labDes.textColor = TypeQuality.getStarColor(this.data.star);
            if (this.data.star) {
                this.star.visible = true;
                this.star.source = "tujian_json.img_star" + this.data.star;
            }
            if (this.data.point) {
                this.imgRedPoint.visible = true;
            }
            if (this.data.legion) {
                this.imgLegion.visible = true;
                this.imgLegion.source = "common_json.img_union_item" + this.data.legion + "_png";
            }
            else {
                this.imgLegion.visible = false;
            }
        };
        PetChooseRenderer.prototype.addEff = function () {
            if (!this._effect) {
                this._effect = utils.ObjectPool.from(s.AnimationSprite);
                this._effect.x = this.imgQuality.x + this.imgQuality.width / 2;
                this._effect.y = this.imgQuality.y + this.imgQuality.height / 2;
                ;
                this._effect.resId = TypeEffectId.GOLDEN_EFF;
                this.addChild(this._effect);
                this._effect.play();
            }
        };
        PetChooseRenderer.prototype.removeEff = function () {
            if (this._effect) {
                this._effect.stop();
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
                utils.ObjectPool.to(this._effect, true);
                this._effect = null;
            }
        };
        return PetChooseRenderer;
    }(ui.PetChooseRendererSkin));
    renderer.PetChooseRenderer = PetChooseRenderer;
    __reflect(PetChooseRenderer.prototype, "renderer.PetChooseRenderer");
})(renderer || (renderer = {}));

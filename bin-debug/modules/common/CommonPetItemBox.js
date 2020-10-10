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
    var CommonPetItemBox = (function (_super) {
        __extends(CommonPetItemBox, _super);
        function CommonPetItemBox() {
            return _super.call(this) || this;
        }
        CommonPetItemBox.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var petTmp = this.data;
                if (!petTmp)
                    return;
                var skillArr = petTmp.skill.split(";");
                var isHashFourSkill = skillArr.length >= 4 && skillArr[skillArr.length - 1] != "-1";
                this.imgQuila.source = ResPath.getPetQualityByStar(petTmp.star, isHashFourSkill);
                var item = Templates.getTemplateById(templates.Map.ITEM, petTmp.id);
                this.imgIcon.source = item.icon;
                this.labName.text = petTmp.name;
                this.labName.textColor = TypeQuality.getStarColor(petTmp.star);
                this.imgStar.source = "tujian_json.img_star" + petTmp.star;
            }
        };
        return CommonPetItemBox;
    }(ui.CommonPetItemBoxSkin));
    renderer.CommonPetItemBox = CommonPetItemBox;
    __reflect(CommonPetItemBox.prototype, "renderer.CommonPetItemBox");
})(renderer || (renderer = {}));

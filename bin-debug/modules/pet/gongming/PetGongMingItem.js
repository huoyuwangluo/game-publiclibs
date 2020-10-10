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
    var PetGongMingItem = (function (_super) {
        __extends(PetGongMingItem, _super);
        function PetGongMingItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PetGongMingItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        PetGongMingItem.prototype.show = function (data) {
            this._data = data;
            this.labLock.text = "";
            this.imgXiYouPet.visible = false;
            this.imgPos.source = null;
            this.labName.text = "";
            this.filters = null;
            this.imgStar.source = null;
            this.imgRedPoint.visible = false;
            this.imgJian.visible = false;
            if (data.pet) {
                var petVo = data.pet;
                this.imgXiYouPet.visible = true;
                this.imgXiYouPet.source = petVo.quality == 8 ? "smokePet_json.img_smokepet_chuanshuo" : "smokePet_json.img_smokepet_xiyou";
                this.imgPos.source = "pet_json.img_fightType_" + petVo.fightType + "_png";
                this.imgQuila.source = ResPath.getPetQualityByStar(petVo.star, petVo.isHashFourSkill);
                var item = Templates.getTemplateById(templates.Map.ITEM, petVo.refId);
                this.imgIcon.source = item.icon;
                var elements = [];
                elements.push({ text: item.name, style: { textColor: TypeQuality.getStarColor(petVo.star) } });
                elements.push({ text: "Lv." + petVo.lv, style: { textColor: 0xD3D3D3 } });
                this.labName.textFlow = elements;
                this.imgStar.source = "tujian_json.img_star" + petVo.star;
                this.imgJian.visible = true;
            }
            else {
                this.imgQuila.source = "qualityBg_json.img_qlt_2_png";
                if (data.isAdd) {
                    this.imgIcon.source = "forging_json.img_jiuXingIconBg";
                    this.imgRedPoint.visible = GameModels.pet.checkDownListHashFourSKillPet();
                }
                if (data.lockLv > 0) {
                    this.imgIcon.source = "common_json.img_lock_png";
                    if (GameModels.platform.isPay)
                        this.labLock.text = Language.getExpression(Language.E_VIP1KJ, data.lockLv);
                    this.filters = utils.filterUtil.grayFilters;
                }
                if (data.cdTime > 0) {
                    this.imgIcon.source = "imperialedict_json.img_taskTime";
                }
            }
        };
        Object.defineProperty(PetGongMingItem.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        return PetGongMingItem;
    }(ui.PetGongMingItemSkin));
    pet.PetGongMingItem = PetGongMingItem;
    __reflect(PetGongMingItem.prototype, "pet.PetGongMingItem");
})(pet || (pet = {}));

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
var components;
(function (components) {
    var HeadInfo2 = (function (_super) {
        __extends(HeadInfo2, _super);
        function HeadInfo2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeadInfo2.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.reset();
        };
        HeadInfo2.prototype.reset = function () {
            this._petVo = null;
            this.imgQuality.source = null;
            this.imgHead.source = null;
            this.imgPetJob.source = null;
            this.imgStar.source = null;
            this.labLockLv.text = "";
        };
        /**
         * 设置无武将头像
         */
        HeadInfo2.prototype.setNullInfo = function (lockBol, lockStar) {
            if (lockStar === void 0) { lockStar = 0; }
            this._petVo = null;
            this.imgQuality.source = "qualityBg_json.img_head_player_png";
            this.imgHead.source = lockBol ? "common_json.img_add_png" : "common_json.img_lock_png";
            this.imgPetJob.source = null;
            this.imgStar.source = null;
            this.labLockLv.text = lockBol ? "" : Language.getExpression(Language.E_1XJS, lockStar);
        };
        /**
         * 设置武将头像
         */
        HeadInfo2.prototype.setGeneralInfo = function (pet) {
            if (pet === void 0) { pet = null; }
            this._petVo = pet;
            this.labLockLv.text = "";
            var petId = 0;
            if (pet instanceof templates.general) {
                petId = pet.id;
                this.imgHead.source = ResPath.getPetIconSmall(pet.model);
                this.imgPetJob.source = "common_json.img_pet_job" + pet.corps + "_png";
                this.imgStar.source = "tujian_json.img_star" + pet.star;
            }
            else {
                petId = parseInt(pet.refId);
                this.imgHead.source = ResPath.getPetIconSmall(pet.headIcon);
                this.imgPetJob.source = "common_json.img_pet_job" + pet.template.corps + "_png";
                this.imgStar.source = "tujian_json.img_star" + pet.star;
            }
            this.imgQuality.source = ResPath.getLingXingQualityByStar(pet.star, GameModels.pet.isHashFourSkill(petId));
        };
        Object.defineProperty(HeadInfo2.prototype, "petVo", {
            get: function () {
                return this._petVo ? this._petVo : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeadInfo2.prototype, "petId", {
            get: function () {
                if (this._petVo instanceof vo.GamePetVO) {
                    return parseInt(this._petVo.refId);
                }
                else if (this._petVo instanceof templates.general) {
                    return this._petVo.id;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        return HeadInfo2;
    }(ui.HeadInfo2Skin));
    components.HeadInfo2 = HeadInfo2;
    __reflect(HeadInfo2.prototype, "components.HeadInfo2");
})(components || (components = {}));

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
    var HeadInfo = (function (_super) {
        __extends(HeadInfo, _super);
        function HeadInfo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeadInfo.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.imgWarn.visible = false;
            this._isGeneral = false;
            this._generalId = null;
            this._lv = 0;
            this._hideLvInfo = false;
            this._warnType = null;
        };
        /**
         * 设置角色头像
         */
        HeadInfo.prototype.setHeadInfo = function (jobType, lv, hideLvInfo) {
            if (hideLvInfo === void 0) { hideLvInfo = false; }
            this.imgQuality.source = "qualityBg_json.img_head_player_png";
            this._isGeneral = false;
            this.imgHead.source = ResPath.getPlayerIconSmall(jobType);
            this.hideLvInfo = hideLvInfo;
            this.lv = lv;
            this.imgPetJob.visible = false;
            this.imgStar.visible = false;
            this.imgLegion.visible = false;
        };
        /**
         * 设置武将头像(无武将时generalId赋值为null)
         */
        HeadInfo.prototype.setGeneralHeadInfo = function (headId, lv, hideLvInfo, petConfig) {
            if (headId === void 0) { headId = null; }
            if (hideLvInfo === void 0) { hideLvInfo = false; }
            if (petConfig === void 0) { petConfig = null; }
            this.imgPetJob.visible = !!petConfig;
            this.imgStar.visible = !!petConfig;
            this.imgLegion.visible = !!petConfig;
            var id = 0;
            if (petConfig) {
                if (petConfig instanceof vo.GamePetVO) {
                    this.imgPetJob.source = !!petConfig ? "common_json.img_pet_job" + petConfig.template.corps + "_png" : null;
                    this.imgStar.source = !!petConfig ? "tujian_json.img_star" + petConfig.star : null;
                    id = parseInt(petConfig.refId);
                }
                else {
                    this.imgPetJob.source = !!petConfig ? "common_json.img_pet_job" + petConfig.corps + "_png" : null;
                    this.imgStar.source = !!petConfig ? "tujian_json.img_star" + petConfig.star : null;
                    id = petConfig.id;
                }
                this.imgQuality.source = ResPath.getLingXingQualityByStar(petConfig.star, GameModels.pet.isHashFourSkill(id));
                this.imgLegion.source = "common_json.img_union_point" + (id == 13000 ? 6 : petConfig.country) + "_png";
            }
            this.generalHead = headId;
            this.hideLvInfo = hideLvInfo;
            this.lv = lv;
        };
        /**
         * 注册红点GameRedState.type
         */
        HeadInfo.prototype.registerWarn = function (type) {
            if (type != null) {
                this._warnType = type;
                GameModels.state.registerWarnTarget(this._warnType, this.imgWarn);
            }
        };
        HeadInfo.prototype.unRegisterWarn = function () {
            if (this._warnType != null) {
                GameModels.state.unRegisterWarnTarget(this._warnType);
                this._warnType = null;
            }
        };
        Object.defineProperty(HeadInfo.prototype, "generalHead", {
            set: function (value) {
                this._generalId = value;
                if ((typeof value) == "number") {
                    this.imgHead.source = ResPath.getPetIconSmall(value);
                }
                else {
                    this.imgHead.source = "" + value;
                    this.imgQuality.source = null;
                }
                this._isGeneral = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeadInfo.prototype, "generalId", {
            get: function () {
                return this._generalId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeadInfo.prototype, "lv", {
            get: function () {
                return this._lv;
            },
            set: function (value) {
                this._lv = value;
                this.labLevel.text = this._lv.toString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeadInfo.prototype, "hideLvInfo", {
            get: function () {
                return this._hideLvInfo;
            },
            set: function (value) {
                this._hideLvInfo = value;
                this.labLevel.visible = !this._hideLvInfo;
                this.imgLevelBack.visible = !this._hideLvInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeadInfo.prototype, "isGeneral", {
            get: function () {
                return this._isGeneral;
            },
            enumerable: true,
            configurable: true
        });
        return HeadInfo;
    }(ui.HeadInfoSkin));
    components.HeadInfo = HeadInfo;
    __reflect(HeadInfo.prototype, "components.HeadInfo");
})(components || (components = {}));

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
    /**国战头像组件 */
    var kingWarMapPetHead = (function (_super) {
        __extends(kingWarMapPetHead, _super);
        function kingWarMapPetHead() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        kingWarMapPetHead.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.touchChildren = false;
        };
        kingWarMapPetHead.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.filters = null;
            this.imgDeal.visible = false;
            this.imgDeal.source = "imperialedict_json.img_format";
            this.img_petJuYi.visible = false;
            if (this.data) {
                this.setGeneralHeadInfo();
            }
            else {
                this._vo = null;
                this.imgHead.source = null;
                this.imgStar.source = null;
                this.imgQuality.source = null;
                this.labName.text = "";
                this.labLv.text = "";
            }
        };
        kingWarMapPetHead.prototype.setGeneralHeadInfo = function () {
            if (this.data instanceof vo.GamePetVO) {
                var petVo = this.data;
                this._vo = petVo;
                this.imgQuality.source = ResPath.getPetQualityByStar(petVo.star, petVo.isHashFourSkill);
                this.imgStar.source = "tujian_json.img_star" + petVo.star;
                this.imgHead.source = ResPath.getItemIconKey(petVo.refId);
                this.labName.text = petVo.name;
                this.labName.textColor = TypeQuality.getStarColor(petVo.star);
                this.labLv.text = "Lv." + petVo.lv;
                this.img_petJuYi.visible = petVo.isGongMing == 1;
                var formationData1 = GameModels.pet.formationDataLinShi;
                if (TypeFormation.CURR_ZHENYING_TYPE == TypeFormation.UP_FORMATION_KINGWAR1 || TypeFormation.CURR_ZHENYING_TYPE == TypeFormation.UP_FORMATION_KINGWAR2 || TypeFormation.CURR_ZHENYING_TYPE == TypeFormation.UP_FORMATION_KINGWAR3) {
                    if (GameModels.pet.headSelfArr.indexOf(this) == -1)
                        this.setState(petVo.uid);
                    if (formationData1.length > 0) {
                        if (GameModels.pet.headSelfArr.indexOf(this) == -1 && formationData1.indexOf(petVo.uid) != -1) {
                            this.imgDeal.source = "imperialedict_json.img_format";
                            this.imgDeal.visible = true;
                        }
                    }
                }
            }
            else {
                var kingWarpetVo = this.data;
                this._vo = kingWarpetVo;
                this.imgQuality.source = ResPath.getPetQualityByStar(kingWarpetVo.star, kingWarpetVo.isHashFourSkill);
                this.imgStar.source = "tujian_json.img_star" + kingWarpetVo.star;
                this.imgHead.source = ResPath.getItemIconKey(kingWarpetVo.petRefId);
                this.labName.text = kingWarpetVo.template.name;
                this.labLv.text = "Lv." + kingWarpetVo.level;
                this.labName.textColor = TypeQuality.getStarColor(kingWarpetVo.star);
            }
        };
        kingWarMapPetHead.prototype.setState = function (uid) {
            var isBuDui = false;
            var voList = GameModels.kingwar.kingWarArmyVOArr;
            if (TypeFormation.CURR_ZHENYING_TYPE == TypeFormation.UP_FORMATION_KINGWAR1) {
                if ((voList[1] && voList[1].kingWarPetUidVOArr.indexOf(uid) != -1) || (voList[2] && voList[2].kingWarPetUidVOArr.indexOf(uid) != -1)) {
                    isBuDui = true;
                }
            }
            else if (TypeFormation.CURR_ZHENYING_TYPE == TypeFormation.UP_FORMATION_KINGWAR2) {
                if ((voList[0] && voList[0].kingWarPetUidVOArr.indexOf(uid) != -1) || (voList[2] && voList[2].kingWarPetUidVOArr.indexOf(uid) != -1)) {
                    isBuDui = true;
                }
            }
            else {
                if ((voList[0] && voList[0].kingWarPetUidVOArr.indexOf(uid) != -1) || (voList[1] && voList[1].kingWarPetUidVOArr.indexOf(uid) != -1)) {
                    isBuDui = true;
                }
            }
            if (isBuDui) {
                this.imgDeal.source = "kingwar_json.img_buduizhong";
                this.imgDeal.visible = true;
            }
        };
        Object.defineProperty(kingWarMapPetHead.prototype, "vo", {
            get: function () {
                return this._vo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(kingWarMapPetHead.prototype, "petUid", {
            get: function () {
                if (!this._vo)
                    return "";
                if (this._vo instanceof vo.GamePetVO) {
                    return this._vo.uid;
                }
                else {
                    return this._vo.petId;
                }
            },
            enumerable: true,
            configurable: true
        });
        return kingWarMapPetHead;
    }(ui.kingWarMapPetHeadSkin));
    renderer.kingWarMapPetHead = kingWarMapPetHead;
    __reflect(kingWarMapPetHead.prototype, "renderer.kingWarMapPetHead");
})(renderer || (renderer = {}));

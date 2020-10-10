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
    var HeadInfo1 = (function (_super) {
        __extends(HeadInfo1, _super);
        function HeadInfo1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeadInfo1.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.touchChildren = false;
        };
        HeadInfo1.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.expProgress.visible = false;
            this.filters = null;
            this.imgDeal.visible = false;
            this.imgDeal.source = "pet_json.img_petDeal_png";
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
                this._petRefId = 0;
                this.labLv.text = "";
            }
        };
        HeadInfo1.prototype.setGeneralHeadInfo = function () {
            var data = this.data;
            var elements = [];
            if (typeof (data) == "number") {
                this._petRefId = data;
                var star = 9;
                var lv = 350;
                if (GameModels.pet.isHashFourSkill(this._petRefId)) {
                    star = 10;
                    lv = 400;
                }
                else {
                    star = 9;
                    lv = 350;
                }
                var temp = Templates.getTemplateById(templates.Map.GENERAL, this._petRefId);
                this.imgQuality.source = ResPath.getPetQualityByStar(star, GameModels.pet.isHashFourSkill(this._petRefId));
                this.imgStar.source = "tujian_json.img_star" + star;
                this.imgHead.source = ResPath.getItemIconKey(this._petRefId.toString());
                // elements.push({ text: temp.name, style: { textColor: TypeQuality.getStarColor(star) } });
                // elements.push({ text: "Lv." + lv, style: { textColor: 0xD3D3D3 } });
                // this.labName.textFlow = elements;
                this.labName.text = temp.name;
                this.labName.textColor = TypeQuality.getStarColor(star);
                this.labLv.text = "Lv." + lv;
                var formationData = GameModels.pet.formationLadderDataLinShi;
                if (formationData.length > 0) {
                    if (GameModels.pet.headSelfArr.indexOf(this) == -1 && formationData.indexOf(data) != -1) {
                        this.imgDeal.source = "imperialedict_json.img_format";
                        this.imgDeal.visible = true;
                    }
                }
            }
            else if (data instanceof vo.GamePetVO) {
                this._vo = data;
                this.imgQuality.source = ResPath.getPetQualityByStar(data.star, this._vo.isHashFourSkill);
                this.imgStar.source = "tujian_json.img_star" + data.star;
                this.imgHead.source = ResPath.getItemIconKey(data.refId);
                // elements.push({ text: data.name, style: { textColor: TypeQuality.getStarColor(data.star) } });
                // elements.push({ text: "Lv." + data.lv, style: { textColor: 0xD3D3D3 } });
                // this.labName.textFlow = elements;
                this.labName.text = data.name;
                this.labName.textColor = TypeQuality.getStarColor(data.star);
                this.labLv.text = "Lv." + data.lv;
                var formationData1 = GameModels.pet.formationDataLinShi;
                if (TypeFormation.CURR_ZHENYING_TYPE == TypeFormation.UP_FORMATION_400 || TypeFormation.CURR_ZHENYING_TYPE == TypeFormation.BINGFENSANLU_WEI || TypeFormation.CURR_ZHENYING_TYPE == TypeFormation.BINGFENSANLU_SHU || TypeFormation.CURR_ZHENYING_TYPE == TypeFormation.BINGFENSANLU_WU) {
                    if (formationData1.length > 0) {
                        if (GameModels.pet.headSelfArr.indexOf(this) == -1 && formationData1.indexOf(data.uid) != -1) {
                            this.imgDeal.source = "imperialedict_json.img_format";
                            this.imgDeal.visible = true;
                        }
                    }
                    this.img_petJuYi.visible = this._vo.isGongMing == 1;
                }
                if (TypeFormation.CURR_ZHENYING_TYPE == TypeFormation.MINGJIANG_YUANZHENG) {
                    this.labName.text = "";
                    if (GameModels.legion.hashSelfDataHp(data.uid) < 0) {
                        this.expProgress.visible = true;
                        this.expProgress.noTweenValue = 10000 / 10000;
                        if (GameModels.pet.headSelfArr.indexOf(this) == -1 && formationData1.indexOf(data.uid) != -1) {
                            this.imgDeal.source = "imperialedict_json.img_format";
                            this.imgDeal.visible = true;
                        }
                    }
                    else {
                        if (GameModels.legion.hashSelfDataHp(data.uid) == 0) {
                            this.filters = utils.filterUtil.grayFilters;
                            this.imgDeal.source = "pet_json.img_petDeal_png";
                            this.imgDeal.visible = true;
                            this.expProgress.visible = true;
                            this.expProgress.noTweenValue = 0 / 10000;
                        }
                        else {
                            this.expProgress.visible = true;
                            this.expProgress.noTweenValue = GameModels.legion.hashSelfDataHp(data.uid) / 10000;
                            if (GameModels.pet.headSelfArr.indexOf(this) == -1 && formationData1.indexOf(data.uid) != -1) {
                                this.imgDeal.source = "imperialedict_json.img_format";
                                this.imgDeal.visible = true;
                            }
                        }
                    }
                    this.img_petJuYi.visible = this._vo.isGongMing == 1;
                }
            }
            else if (data instanceof n.ProtoEnemyFormationDetail) {
                this._monsterVo = data;
                var temp = Templates.getTemplateById(templates.Map.GENERAL, this._monsterVo.PetId);
                var star = 0;
                if (this._monsterVo.Level < 450) {
                    star = GameModels.pet.getPetStarBuyLv(this._monsterVo.Level);
                }
                else {
                    star = 13;
                }
                if (this._monsterVo.PetStar <= 0 && temp) {
                    this.imgQuality.source = ResPath.getPetQualityByStar(temp.star, GameModels.pet.isHashFourSkill(temp.id));
                    if (star < 5) {
                        this.imgStar.source = "tujian_json.img_star" + temp.star;
                    }
                    else {
                        this.imgStar.source = "tujian_json.img_star" + star;
                    }
                    //elements.push({ text: temp.name, style: { textColor: TypeQuality.getStarColor(temp.star) } });
                    this.labName.text = temp.name;
                    this.labName.textColor = TypeQuality.getStarColor(temp.star);
                }
                else {
                    this.imgQuality.source = ResPath.getPetQualityByStar(this._monsterVo.PetStar, GameModels.pet.isHashFourSkill(temp.id));
                    this.imgStar.source = "tujian_json.img_star" + this._monsterVo.PetStar;
                    //elements.push({ text: temp.name, style: { textColor: TypeQuality.getStarColor(data.PetStar) } });
                    this.labName.text = temp.name;
                    this.labName.textColor = TypeQuality.getStarColor(data.PetStar);
                }
                this.imgHead.source = ResPath.getItemIconKey(temp.id.toString());
                // elements.push({ text: "Lv." + data.Level, style: { textColor: 0xD3D3D3 } });
                // this.labName.textFlow = elements;
                this.labLv.text = "Lv." + data.Level;
                if (TypeFormation.CURR_ZHENYING_TYPE == TypeFormation.MINGJIANG_YUANZHENG) {
                    this.expProgress.visible = true;
                    this.expProgress.noTweenValue = data.HPRate / 10000;
                    this.labName.text = "";
                    if (data.HPRate == 0) {
                        this.filters = utils.filterUtil.grayFilters;
                        this.imgDeal.source = "pet_json.img_petDeal_png";
                        this.imgDeal.visible = true;
                    }
                }
            }
            else {
                var star = 0;
                if (parseInt(data.split("_")[1]) < 450) {
                    star = GameModels.pet.getPetStarBuyLv(parseInt(data.split("_")[1]));
                }
                else {
                    star = 13;
                }
                var temp = Templates.getTemplateById(templates.Map.GENERAL, data.split("_")[0]);
                this.imgQuality.source = ResPath.getPetQualityByStar(temp.star, GameModels.pet.isHashFourSkill(temp.id));
                this.imgStar.source = "tujian_json.img_star" + star;
                this.imgHead.source = ResPath.getItemIconKey(temp.id.toString());
                // elements.push({ text: temp.name, style: { textColor: TypeQuality.getStarColor(temp.star) } });
                // elements.push({ text: "Lv." + data.split("_")[1], style: { textColor: 0xD3D3D3 } });
                // this.labName.textFlow = elements;
                this.labName.text = temp.name;
                this.labName.textColor = TypeQuality.getStarColor(temp.star);
                this.labLv.text = "Lv." + data.split("_")[1];
            }
        };
        Object.defineProperty(HeadInfo1.prototype, "vo", {
            get: function () {
                return this._vo ? this._vo : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeadInfo1.prototype, "petUid", {
            get: function () {
                return this._vo ? this._vo.uid : "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeadInfo1.prototype, "petRefId", {
            get: function () {
                return this._petRefId;
            },
            enumerable: true,
            configurable: true
        });
        return HeadInfo1;
    }(ui.HeadInfo1Skin));
    renderer.HeadInfo1 = HeadInfo1;
    __reflect(HeadInfo1.prototype, "renderer.HeadInfo1");
})(renderer || (renderer = {}));

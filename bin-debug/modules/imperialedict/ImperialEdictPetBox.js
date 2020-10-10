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
    var ImperialEdictPetBox = (function (_super) {
        __extends(ImperialEdictPetBox, _super);
        function ImperialEdictPetBox() {
            return _super.call(this) || this;
        }
        ImperialEdictPetBox.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.imgSelectedBg.visible = false;
                this.imgSelectedCheck.visible = false;
                this.imgTaskIng.visible = false;
                this.imgLock.visible = false;
                this.imgRedPoint.visible = false;
                this.img_petJuYi.visible = false;
                var selected = this.data.selected;
                var tasking = this.data.istask;
                var type = this.data.type;
                var petVo = this.data.id;
                var isEffect = this.data.effect;
                this.removeEffect();
                if (petVo instanceof vo.GamePetVO) {
                    if ((type == 2 || type == 4) && petVo.isLock == 1) {
                        this.imgLock.visible = true;
                    }
                    if (type == 4 && petVo.isGongMing == 1) {
                        this.img_petJuYi.visible = true;
                    }
                    if (type == 3) {
                        this.imgRedPoint.visible = GameModels.upStar && GameModels.upStar.checkPetHeadUpStarRedPoint(petVo);
                    }
                    this.labLv.text = "Lv." + petVo.lv;
                    this.quality.source = ResPath.getPetQualityByStar(petVo.star, petVo.isHashFourSkill);
                    this.icon.source = ResPath.getItemIconKey(petVo.refId);
                    this.star.source = "tujian_json.img_star" + petVo.star;
                    this.labName.text = petVo.name;
                    this.labName.textColor = TypeQuality.getStarColor(petVo.star);
                    if (selected) {
                        this.imgSelectedBg.visible = true;
                        this.imgSelectedCheck.visible = true;
                    }
                    if (tasking) {
                        this.imgTaskIng.source = type == 1 ? "imperialedict_json.img_taskIng" : "imperialedict_json.img_format";
                        this.imgSelectedBg.visible = true;
                        this.imgTaskIng.visible = true;
                    }
                }
                else {
                    if (petVo) {
                        var skillArr = petVo.skill.split(";");
                        var isHashFourSkill = skillArr.length >= 4 && skillArr[skillArr.length - 1] != "-1";
                        this.quality.source = ResPath.getPetQualityByStar(petVo.star, isHashFourSkill);
                        this.icon.source = ResPath.getItemIconKey(petVo.id.toString());
                        this.star.source = "tujian_json.img_star" + petVo.star;
                        this.labName.text = petVo.name;
                        this.labName.textColor = TypeQuality.getStarColor(petVo.star);
                        this.labLv.text = "Lv.1";
                        if (selected) {
                            this.imgSelectedBg.visible = true;
                            this.imgSelectedCheck.visible = true;
                        }
                        if (petVo.quality >= 8 && !isEffect) {
                            if (!this._effect) {
                                this._effect = utils.ObjectPool.from(s.AnimationSprite);
                                this._effect.x = this.quality.x + this.quality.width / 2;
                                this._effect.y = this.quality.y + this.quality.height / 2;
                                this._effect.resId = TypeEffectId.GOLDEN_EFF;
                                this._effect.frameRate = 12;
                                this.addChild(this._effect);
                                this._effect.play();
                            }
                        }
                    }
                }
            }
        };
        ImperialEdictPetBox.prototype.removeEffect = function () {
            if (this._effect) {
                this._effect.stop();
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
                utils.ObjectPool.to(this._effect, true);
                this._effect = null;
            }
        };
        return ImperialEdictPetBox;
    }(ui.ImperialEdictPetBoxSkin));
    renderer.ImperialEdictPetBox = ImperialEdictPetBox;
    __reflect(ImperialEdictPetBox.prototype, "renderer.ImperialEdictPetBox");
})(renderer || (renderer = {}));

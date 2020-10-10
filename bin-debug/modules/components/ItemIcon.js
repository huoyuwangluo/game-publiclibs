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
var item;
(function (item) {
    var ItemIcon = (function (_super) {
        __extends(ItemIcon, _super);
        function ItemIcon() {
            var _this = _super.call(this) || this;
            _this.index = -1;
            _this.touchChildren = false;
            return _this;
        }
        ItemIcon.prototype.destory = function () {
            _super.prototype.destory.call(this);
            this.reset();
        };
        ItemIcon.prototype.reset = function () {
            if (this._resData) {
                this._resData.offReference(this, this.updateAsset);
                this._resData = null;
            }
            utils.timer.clearAll(this);
        };
        ItemIcon.prototype.updateData = function (data, count) {
            if (count === void 0) { count = 1; }
            this._data = data;
            if (this._data) {
                if (data instanceof vo.EquipVO) {
                    this.updateEquipDisplay(data.templateEquip);
                    return;
                }
                if (data instanceof vo.ItemVO) {
                    this.updatePropDisplay(data, data.count, data.lv);
                    return;
                }
                if (data instanceof templates.equip) {
                    this.updateEquipDisplay(data);
                    return;
                }
                if (data instanceof templates.item) {
                    this.updatePropDisplay(data, count, data.lv);
                    return;
                }
            }
            else {
                this.reset();
            }
        };
        ItemIcon.prototype.updateEquipDisplay = function (data) {
            this._tipEnabled = true;
            // if (this.labCount.parent) {
            //     this.labCount.parent.removeChild(this.labCount);
            // }
            if (!this.labCount.parent) {
                this.addChild(this.labCount);
            }
            if (!this.labName.parent) {
                this.addChild(this.labName);
            }
            this.labCount.text = "Lv." + data.lv;
            this.labName.text = data.name;
            this.labName.textColor = TypeQuality.getQualityColor(data.quality);
            this.updateIcon(data.icon);
            this.updateJobDisplay();
            this.updateQualityDisplay(data.quality);
        };
        ItemIcon.prototype.updatePropDisplay = function (data, count, lv) {
            this._tipEnabled = false;
            if (!this.labName.parent) {
                this.addChild(this.labName);
            }
            if (!this.labCount.parent) {
                this.addChild(this.labCount);
            }
            this.updateRedVisisble();
            this.updateIcon(data.icon);
            if (TypeItem.checkIsPetTypeOrPetSuiTyp(data.type)) {
                var tem = Templates.getTemplateById(templates.Map.GENERAL, data.type == TypeItem.PET_SUI ? data.nextId : data.id);
                this.updateQualityDisplay(data.quality, tem);
            }
            else {
                this.updateQualityDisplay(data.quality);
            }
            this.labName.text = data.name;
            if (data.type == TypeItem.PET_SUI && data.inBag) {
                this.labName.text = data.name.split(Language.C_SP)[0];
            }
            if (count == 0) {
                this.labCount.text = "";
            }
            else {
                this.labCount.text = "" + count;
            }
        };
        ItemIcon.prototype.updateIcon = function (id) {
            if (this._resData) {
                this._resData.offReference(this, this.updateAsset);
                this._resData = null;
            }
            this._resData = mg.assetsManager.getIconData(id);
            if (this._resData) {
                this._resData.holdReference(this, this.updateAsset);
            }
        };
        ItemIcon.prototype.updateJobDisplay = function () {
            if (!this.imgJBiao)
                return;
            this.imgJBiao.source = null;
        };
        ItemIcon.prototype.updateQualityDisplay = function (type, tem) {
            if (tem === void 0) { tem = null; }
            if (!this.imgQuality)
                return;
            if (tem) {
                this.imgQuality.source = ResPath.getPetQualityByStar(tem.star, GameModels.pet.isHashFourSkill(tem.id));
            }
            else {
                this.imgQuality.source = ResPath.getQuality(type);
            }
        };
        ItemIcon.prototype.updateAsset = function (data) {
            this.imgIcon.texture = data;
        };
        Object.defineProperty(ItemIcon.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemIcon.prototype, "quality", {
            set: function (type) {
                this.updateQualityDisplay(type);
            },
            enumerable: true,
            configurable: true
        });
        ItemIcon.prototype.showEquipName = function () {
            var name;
            var type;
            if (this._data instanceof vo.EquipVO) {
                name = this._data.templateEquip.name;
                type = this._data.templateEquip.quality;
            }
            else if (this._data instanceof templates.equip) {
                name = this._data.name;
                type = this._data.quality;
            }
            if (!name)
                return;
            if (!this.labName.parent) {
                this.addChild(this.labName);
            }
            this.labName.text = name;
            this.labName.textColor = TypeQuality.getQualityColor(type);
        };
        ItemIcon.prototype.showEquipCount = function (value) {
            if (!this.labCount.parent) {
                this.addChild(this.labCount);
            }
            this.labCount.text = value.toString();
        };
        Object.defineProperty(ItemIcon.prototype, "redVisible", {
            get: function () {
                return this._resVisible;
            },
            set: function (bool) {
                this._resVisible = bool;
                this.updateRedVisisble();
            },
            enumerable: true,
            configurable: true
        });
        ItemIcon.prototype.updateRedVisisble = function () {
            if (this.imgJBiao) {
                this.imgJBiao.visible = this._resVisible;
            }
        };
        ItemIcon.prototype.removeEff = function () {
            if (this._effect) {
                this._effect.stop();
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
                utils.ObjectPool.to(this._effect, true);
                this._effect = null;
            }
        };
        ItemIcon.prototype.addEff = function () {
            if (!this._effect) {
                if (TypeItem.checkIsPetTypeOrPetSuiTyp(this._data.type)) {
                    var tem = Templates.getTemplateById(templates.Map.GENERAL, this._data.type == TypeItem.PET_SUI ? this._data.nextId : this._data.id);
                    if (tem && tem.star >= 5) {
                        this._effect = utils.ObjectPool.from(s.AnimationSprite);
                        this._effect.x = this.imgQuality.x + this.imgQuality.width / 2;
                        this._effect.y = this.imgQuality.y + this.imgQuality.height / 2;
                        ;
                        this._effect.resId = tem.star >= 10 ? TypeEffectId.GOLDEN_EFF : TypeEffectId.RED_EFF;
                        this.addChild(this._effect);
                        this._effect.play();
                    }
                    return;
                }
                this._effect = utils.ObjectPool.from(s.AnimationSprite);
                this._effect.x = this.imgQuality.x + this.imgQuality.width / 2;
                this._effect.y = this.imgQuality.y + this.imgQuality.height / 2;
                ;
                if (this._data.quality == TypeQuality.RED) {
                    this._effect.resId = TypeEffectId.RED_EFF;
                }
                else {
                    this._effect.resId = TypeEffectId.GOLDEN_EFF;
                }
                this.addChild(this._effect);
                this._effect.play();
            }
        };
        return ItemIcon;
    }(item.TipIcon));
    item.ItemIcon = ItemIcon;
    __reflect(ItemIcon.prototype, "item.ItemIcon");
})(item || (item = {}));

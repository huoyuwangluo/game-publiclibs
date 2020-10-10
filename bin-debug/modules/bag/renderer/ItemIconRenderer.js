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
    var ItemIconRenderer = (function (_super) {
        __extends(ItemIconRenderer, _super);
        function ItemIconRenderer() {
            var _this = _super.call(this) || this;
            _this._selected = false;
            _this.itemIndex = -1;
            return _this;
        }
        ItemIconRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.touchChildren = false;
        };
        ItemIconRenderer.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.removeEff();
            mg.TipManager.instance.unBind(this);
        };
        Object.defineProperty(ItemIconRenderer.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
                this.labName.visible = true;
                this.updateData(value);
                this.removeEff();
                if (this.data) {
                    this.petProgress.visible = false;
                    this.labProCount.visible = false;
                    this.imgStar.visible = false;
                    this.labCount.visible = true;
                    if (this.data.quality == TypeQuality.RED || this.data.quality == TypeQuality.GOLDEN || this.data.quality == TypeQuality.AN_GOLDEN)
                        this.addEff();
                    if (this.data instanceof vo.ItemVO) {
                        if (TypeItem.checkIsPetTypeOrPetSuiTyp(this.data.type) || this.data.type == TypeItem.PET_SUIJI_TYPE || this.data.type == TypeItem.ANIMAL_SUI || this.data.type == TypeItem.ANIMAL_SUIJI_TYPE) {
                            var item = Templates.getTemplateById(templates.Map.ITEM, this.data.templateProp.nextId);
                            var pet = Templates.getTemplateById(templates.Map.GENERAL, this.data.templateProp.nextId);
                            if (pet) {
                                this.imgStar.visible = true;
                                this.imgStar.source = "tujian_json.img_star" + pet.star;
                            }
                            if (this.data.id == "210301" || this.data.id == "210302" || this.data.id == "210303") {
                                this.imgStar.visible = true;
                                var star = parseInt(this.data.id.substring(4, 6));
                                this.imgStar.source = "tujian_json.img_star" + (star + 2);
                            }
                            if (item) {
                                var needCount = parseInt(item.combine.split("_")[1]);
                                if (this.data.count >= needCount) {
                                    this.redVisible = true;
                                }
                                else {
                                    this.redVisible = false;
                                }
                                this.labName.visible = false;
                                this.petProgress.visible = true;
                                this.labProCount.visible = true;
                                this.petProgress.value = this.data.count;
                                this.petProgress.maximum = needCount;
                                this.petProgress.labelDisplay.visible = false;
                                this.labProCount.text = this.data.count + "/" + needCount;
                                this.labCount.visible = false;
                            }
                            else {
                                this.redVisible = false;
                            }
                        }
                        else {
                            this.redVisible = utils.CheckUtil.checkUseByType(this.data.mainType, this.data.type) || this.data.mainType == TypeItem.EQUIP;
                        }
                    }
                    this.imgLock.visible = false;
                    if (this.data instanceof vo.EquipVO) {
                        if (this.data.mainType == 1 && this.data.type == TypeEquip.JICHU_EQIUP && this.data.quality == 4) {
                            this.imgLock.visible = true;
                            if (this.data.isLock == 1) {
                                this.imgLock.source = "bag_json.img_bag_lock";
                            }
                            else {
                                this.imgLock.source = "bag_json.img_bag_unlock";
                            }
                        }
                    }
                    mg.TipManager.instance.unBind(this);
                    switch (this.data.mainType) {
                        case TypeItem.BINGFA:
                            if (this.data.inBag) {
                                return;
                            }
                            mg.TipManager.instance.bind(this, tips.PropTip, this.data);
                            break;
                        case TypeItem.MATERIAL:
                            if (this.data.inBag && this.data.type == TypeItem.BINGFA_BOOK) {
                                return;
                            }
                            if (this.data.id == ConfigData.SHENMOJIAONIAO) {
                                mg.TipManager.instance.bind(this, tips.ShenMoJiangPropTip, this.data);
                            }
                            else {
                                mg.TipManager.instance.bind(this, tips.PropTip, this.data);
                            }
                            break;
                        case TypeItem.MONEY:
                            if (this.data.type == TypeItem.PET_TYPE) {
                                var pet = Templates.getTemplateById(templates.Map.GENERAL, this.data.id);
                                mg.TipManager.instance.bind(this, tips.GeneralInfoTip, pet);
                            }
                            else {
                                mg.TipManager.instance.bind(this, tips.PropTip, this.data);
                            }
                            break;
                        case TypeItem.ITEM:
                            if (!this.data.templateProp.split) {
                                mg.TipManager.instance.bind(this, tips.PropTip, this.data);
                            }
                            break;
                        case TypeItem.EQUIP:
                            mg.TipManager.instance.bind(this, tips.EquipTip, this.data);
                            break;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemIconRenderer.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                if (this._selected == value)
                    return;
                this._selected = value;
                this.invalidateState();
            },
            enumerable: true,
            configurable: true
        });
        return ItemIconRenderer;
    }(ui.ItemIconSkin));
    renderer.ItemIconRenderer = ItemIconRenderer;
    __reflect(ItemIconRenderer.prototype, "renderer.ItemIconRenderer", ["eui.IItemRenderer", "eui.UIComponent", "egret.DisplayObject"]);
})(renderer || (renderer = {}));

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
var treasure;
(function (treasure) {
    var TreasureIcon = (function (_super) {
        __extends(TreasureIcon, _super);
        function TreasureIcon() {
            var _this = _super.call(this) || this;
            _this._pos = -1;
            return _this;
        }
        TreasureIcon.prototype.setEffectByPool = function (itemVo) {
            if (itemVo) {
                // this._flyIcon ? utils.ObjectPool.to(this._flyIcon) : null;
                if (this._flyIcon) {
                    this._flyIcon.skewX = 0;
                    this._flyIcon.skewY = 0;
                    utils.ObjectPool.to(this._flyIcon);
                }
                this._flyIcon = utils.ObjectPool.from(s.FlyIcon);
                this._flyIcon.initialize(itemVo);
            }
        };
        TreasureIcon.prototype.playEffect = function (end, newEffect, clearEffects, overHandler) {
            if (end === void 0) { end = null; }
            if (newEffect === void 0) { newEffect = true; }
            if (clearEffects === void 0) { clearEffects = true; }
            if (overHandler === void 0) { overHandler = null; }
            this._overHandler = overHandler;
            if (!this._flyIcon && newEffect) {
                this.setEffectByPool(this._itemVO);
            }
            if (this._flyIcon) {
                if (this.localToGlobal(45, 45)) {
                    this.playFlyBagAni(this.localToGlobal(45, 45), end, clearEffects);
                }
            }
        };
        TreasureIcon.prototype.playFlyBagAni = function (startPosition, endPos, clearEffects) {
            var _this = this;
            if (clearEffects === void 0) { clearEffects = true; }
            if (this._imgId == "101") {
                var moneyPoint = mg.uiManager.getView(main.MainUIView).getMoneyPostion(true);
                mg.effectManager.flyEffects("6160", 10, startPosition, moneyPoint, mg.layerManager.top);
                this.callBack();
            }
            else if (this._imgId == "201") {
                var diamondPoint = mg.uiManager.getView(main.MainUIView).getDiamondPostion(true);
                mg.effectManager.flyEffects("6199", 10, startPosition, diamondPoint, mg.layerManager.top);
                this.callBack();
            }
            else if (this._imgId == "301") {
                var targetPos = mg.uiManager.getView(main.MainUIView).getRolePostion(true);
                mg.effectManager.flyEffects("6161", 1, startPosition, targetPos, mg.layerManager.top);
                this.callBack();
            }
            else {
                if (!endPos) {
                    endPos = mg.uiManager.getView(main.MainUIView).getBagPostion(true);
                }
                mg.layerManager.top.addChild(this._flyIcon);
                this._flyIcon.start(startPosition, endPos, this, function () {
                    _this.callBack();
                    if (clearEffects) {
                        _this.removeIconHandler();
                    }
                });
            }
        };
        TreasureIcon.prototype.callBack = function () {
            if (this._overHandler) {
                var handler = this._overHandler;
                if (handler.once) {
                    this._overHandler = null;
                }
                handler.run();
            }
        };
        TreasureIcon.prototype.removeIconHandler = function () {
            if (this._flyIcon) {
                this._flyIcon.stop();
                if (this._flyIcon.parent) {
                    this._flyIcon.parent.removeChild(this._flyIcon);
                }
                this._flyIcon.reset();
                this._flyIcon.skewX = 0;
                this._flyIcon.skewY = 0;
                utils.ObjectPool.to(this._flyIcon, true);
                this._flyIcon = null;
            }
        };
        TreasureIcon.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.reset();
            if (this.data) {
                if (this.data.id) {
                    this.updateItemData(this.data.id);
                }
                if (this.data.ItemNumber) {
                    this.labNums.visible = true;
                    this.labNums.text = equation.thousandChange(this.data.ItemNumber);
                }
                if (this.data.ItemId) {
                    this.updateItemData(this.data.ItemId.toString());
                }
                if (this.data instanceof n.ProtoHaoHuaZhuanPanItem) {
                    this.updateItemData(this.data.ItemId.toString(), true, this.data.Count);
                }
                if (this.data instanceof n.ProtoDaoJuZhuanPanItem) {
                    this.updateItemData(this.data.ItemId.toString(), true, this.data.Count);
                }
                if (this.data instanceof n.ProtoTavernItem) {
                    this.updateItemData(this.data.ItemId.toString(), true, this.data.Count);
                }
                if (typeof (this.data) == "string") {
                    var str = this.data.split("_");
                    this.updateItemData(str[0], true, str[1] ? parseInt(str[1]) : 1);
                }
            }
        };
        TreasureIcon.prototype.removeEffect = function () {
            if (this._effect) {
                this._effect.stop();
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
                utils.ObjectPool.to(this._effect, true);
                this._effect = null;
            }
        };
        TreasureIcon.prototype.addEffect = function () {
            if (!this._effect) {
                var index = this._itemVO.quality;
                var isPet = false;
                if (this._itemVO.mainType != TypeItem.EQUIP && TypeItem.checkIsPetTypeOrPetSuiTyp(this._itemVO.type)) {
                    // var tem: templates.general = Templates.getTemplateById(templates.Map.GENERAL, this._itemVO.type == TypeItem.PET_SUI ? this._itemVO.nextId : this._itemVO.id);
                    isPet = true;
                }
                if (isPet && index == TypeQuality.GOLDEN)
                    return;
                this._effect = utils.ObjectPool.from(s.AnimationSprite);
                this._effect.x = 41;
                this._effect.y = 41;
                // if (this._itemVO.quality == TypeQuality.GREEN) {
                // 	this._effect.resId = TypeEffectId.GREEN_EFF;
                // }
                // else if (this._itemVO.quality == TypeQuality.BLUE) {
                // 	this._effect.resId = TypeEffectId.BULE_EFF;
                // }
                // else 
                if (index == TypeQuality.PURPLE) {
                    this._effect.resId = TypeEffectId.PURPLE_EFF;
                }
                else if (index == TypeQuality.ORANGE) {
                    this._effect.resId = TypeEffectId.ORANGE_EFF;
                }
                else if (index == TypeQuality.RED) {
                    this._effect.resId = TypeEffectId.RED_EFF;
                }
                else if (index >= TypeQuality.GOLDEN) {
                    this._effect.resId = TypeEffectId.GOLDEN_EFF;
                }
                this._effect.frameRate = 12;
                this.addChildAt(this._effect, 3);
                this._effect.play();
            }
        };
        TreasureIcon.prototype.updateQualityEfct = function () {
            this.removeEffect();
            this.addEffect();
        };
        TreasureIcon.prototype.updateItemHasUnderline = function (idAndNum, setName, setCount, txtColor) {
            if (setName === void 0) { setName = false; }
            if (setCount === void 0) { setCount = false; }
            if (txtColor === void 0) { txtColor = false; }
            var data = idAndNum.split("_");
            if (data.length > 1 && setCount) {
                this.updateItemData(data[0], setName, parseInt(data[1]), txtColor);
            }
            else {
                this.updateItemData(data[0], setName, null, txtColor);
            }
        };
        TreasureIcon.prototype.updateItemData = function (id, setName, count, txtColor) {
            if (setName === void 0) { setName = false; }
            if (txtColor === void 0) { txtColor = false; }
            this._imgId = id;
            this._itemVO ? vo.toPool(this._itemVO) : null;
            if (Math.floor(parseInt(id) / 100000) == 1) {
                this._itemVO = vo.fromPool(vo.EquipVO, parseInt(id));
            }
            else {
                this._itemVO = vo.fromPool(vo.ItemVO, parseInt(id));
            }
            if (count) {
                this._itemVO.count = count;
                this.updateItemDataByItemVO(this._itemVO, setName, true, txtColor);
            }
            else {
                this.updateItemDataByItemVO(this._itemVO, setName, false, txtColor);
            }
        };
        TreasureIcon.prototype.updateItemDataByItemVO = function (itemVO, setName, setCount, txtColor) {
            if (setName === void 0) { setName = false; }
            if (setCount === void 0) { setCount = false; }
            if (txtColor === void 0) { txtColor = false; }
            this._itemVO = itemVO;
            this.quality = ResPath.getQuality(this._itemVO.quality);
            this.imgFragment.source = this._itemVO.icon;
            this.name = setName ? this._itemVO.name : "";
            if (this._itemVO.count >= 1 && setCount) {
                this.count = this._itemVO.count;
            }
            this.updateQualityEfct();
            txtColor ? this.labGrade.textColor = TypeQuality.getQualityColor(this._itemVO.quality) : null;
            if (this._itemVO.mainType != TypeItem.EQUIP && TypeItem.checkIsPetTypeOrPetSuiTyp(this._itemVO.type)) {
                var tem = Templates.getTemplateById(templates.Map.GENERAL, this._itemVO.type == TypeItem.PET_SUI ? this._itemVO.nextId : this._itemVO.id);
                txtColor ? this.labGrade.textColor = TypeQuality.getStarColor(tem.star) : null;
                this.quality = ResPath.getPetQualityByStar(tem.star, GameModels.pet.isHashFourSkill(tem.id));
            }
        };
        TreasureIcon.prototype.dataIconEquip = function (id) {
            this._imgId = id;
            this.updateItemData(id);
        };
        Object.defineProperty(TreasureIcon.prototype, "GoldVisible", {
            set: function (value) {
                this.imgGod.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreasureIcon.prototype, "imgId", {
            get: function () {
                return this._imgId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreasureIcon.prototype, "pos", {
            get: function () {
                return this._pos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreasureIcon.prototype, "itemVo", {
            get: function () {
                return this._itemVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreasureIcon.prototype, "count", {
            set: function (count) {
                this.labNums.visible = true;
                this.labNums.text = equation.thousandChange(count);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreasureIcon.prototype, "name", {
            set: function (name) {
                if (name != "") {
                    this.labGrade.visible = true;
                    this.labGrade.text = name;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreasureIcon.prototype, "quality", {
            set: function (value) {
                this.imgQuality.source = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreasureIcon.prototype, "grade", {
            set: function (value) {
                if (this.labGrade) {
                    this.labGrade.text = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        TreasureIcon.prototype.reset = function () {
            this.removeEffect();
            this.removeIconHandler();
            this.imgFragment.source = null;
            this._imgId = null;
            this._pos = 0;
            this._itemVO = null;
        };
        return TreasureIcon;
    }(ui.TreasureIconSkin));
    treasure.TreasureIcon = TreasureIcon;
    __reflect(TreasureIcon.prototype, "treasure.TreasureIcon");
})(treasure || (treasure = {}));

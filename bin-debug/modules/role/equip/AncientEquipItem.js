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
    var AncientEquipItem = (function (_super) {
        __extends(AncientEquipItem, _super);
        function AncientEquipItem() {
            var _this = _super.call(this) || this;
            _this.touchChildren = false;
            return _this;
        }
        Object.defineProperty(AncientEquipItem.prototype, "step", {
            set: function (value) {
                this.labStep.text = value; //Language.getExpression(Language.E_1J1,value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AncientEquipItem.prototype, "lv", {
            set: function (value) {
                if (value == "") {
                    this.img_lv.visible = false;
                }
                else {
                    this.img_lv.visible = true;
                }
                this.labLv.text = value; //Language.getExpression(Language.E_1J1,value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AncientEquipItem.prototype, "lockLv", {
            set: function (value) {
                this.labLockLv.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AncientEquipItem.prototype, "isWarn", {
            set: function (value) {
                this.imgWarn.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AncientEquipItem.prototype, "iconSour", {
            set: function (value) {
                this.imgIcon.source = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AncientEquipItem.prototype, "iconY", {
            set: function (value) {
                if (value) {
                    this.imgIcon.y = 15;
                }
                else {
                    this.imgIcon.y = 8;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AncientEquipItem.prototype, "quality", {
            // public set nameStr(value:string){
            // 	this.labName.text = value;
            // }
            set: function (value) {
                if (typeof (value) == "string") {
                    this.imgQuality.source = value;
                }
                else {
                    this.imgQuality.source = ResPath.getQuality(value);
                    this.labLv.textColor = TypeQuality.getQualityColor(value);
                }
                // this.labName.textColor = TypeQuality.getQualityColor(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AncientEquipItem.prototype, "pos", {
            get: function () {
                return this._pos;
            },
            set: function (value) {
                this._pos = value;
            },
            enumerable: true,
            configurable: true
        });
        AncientEquipItem.prototype.updateEffect = function (bool, quality) {
            if (quality === void 0) { quality = 0; }
            if (this._efct) {
                this._efct.stop();
                if (this._efct.parent) {
                    this._efct.parent.removeChild(this._efct);
                }
                utils.ObjectPool.to(this._efct, true);
                this._efct = null;
            }
            if (bool) {
                this._efct = utils.ObjectPool.from(s.AnimationSprite);
                this.addChild(this._efct);
                switch (quality) {
                    // case TypeQuality.GREEN:
                    // 	this._efct.resId = TypeEffectId.GREEN_EFF;
                    // 	break;
                    // case TypeQuality.BLUE:
                    // 	this._efct.resId = TypeEffectId.BULE_EFF;
                    // 	break;
                    case TypeQuality.PURPLE:
                        this._efct.resId = TypeEffectId.PURPLE_EFF;
                        break;
                    case TypeQuality.ORANGE:
                        this._efct.resId = TypeEffectId.ORANGE_EFF;
                        break;
                    case TypeQuality.RED:
                        this._efct.resId = TypeEffectId.RED_EFF;
                        break;
                    case TypeQuality.GOLDEN:
                        this._efct.resId = TypeEffectId.GOLDEN_EFF;
                        break;
                }
                this._efct.x = 50;
                this._efct.y = 50;
                this._efct.frameRate = 12;
                this._efct.play();
            }
        };
        return AncientEquipItem;
    }(ui.AncientEquipItemSkin));
    item.AncientEquipItem = AncientEquipItem;
    __reflect(AncientEquipItem.prototype, "item.AncientEquipItem");
})(item || (item = {}));

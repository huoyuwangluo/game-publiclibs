var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tips;
(function (tips) {
    var BubblePropertyTip = (function () {
        function BubblePropertyTip() {
            this.autoRecover = true;
            this.toPoolTime = 0;
            this._back = new eui.Image();
            this._back.source = 'img_propertytip_bg_png';
            this._back.scale9Grid = new egret.Rectangle(126, 4, 34, 40);
            this._back.touchEnabled = false;
            this._property = new eui.Image();
            this._property.source = '';
            this._property.touchEnabled = false;
            this._propertyIcon = new eui.Image();
            this._propertyIcon.source = '';
            this._propertyIcon.touchEnabled = false;
            this._blabNum = new eui.BitmapLabel();
            this._blabNum.letterSpacing = -5;
            this._blabNum.y = 16;
            this._blabNum.x = 170;
            this._blabNum.touchEnabled = false;
        }
        Object.defineProperty(BubblePropertyTip.prototype, "x", {
            get: function () {
                return this._back.x;
            },
            set: function (v) {
                this._back.x = v;
                this._propertyIcon.x = v + 30;
                this._property.x = v + 66;
                if (this._property.width <= 0) {
                    this._property.addEventListener(egret.Event.COMPLETE, this.updateBlabNumPos, this);
                }
                else {
                    this._blabNum.x = this._property.x + this._property.width;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BubblePropertyTip.prototype, "y", {
            get: function () {
                return this._back.y;
            },
            set: function (v) {
                this._back.y = v;
                this._propertyIcon.y = v + 5;
                this._property.y = v + 7;
                this._blabNum.y = v + 16;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BubblePropertyTip.prototype, "width", {
            get: function () {
                return this._back.width;
            },
            set: function (v) {
                this._back.width = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BubblePropertyTip.prototype, "height", {
            get: function () {
                return 50;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BubblePropertyTip.prototype, "alpha", {
            set: function (v) {
                this._back.alpha = this._blabNum.alpha = v;
            },
            enumerable: true,
            configurable: true
        });
        BubblePropertyTip.prototype.add = function (box) {
            box.back.addChild(this._back);
            box.mid.addChild(this._property);
            box.midIcon.addChild(this._propertyIcon);
            box.front.addChild(this._blabNum);
        };
        BubblePropertyTip.prototype.remove = function () {
            if (this._back.parent) {
                this._back.parent.removeChild(this._back);
            }
            if (this._property.parent) {
                this._property.parent.removeChild(this._property);
            }
            if (this._propertyIcon.parent) {
                this._propertyIcon.parent.removeChild(this._propertyIcon);
            }
            if (this._blabNum.parent) {
                this._blabNum.parent.removeChild(this._blabNum);
            }
        };
        BubblePropertyTip.prototype.reset = function () {
            utils.timer.clear(this, this.easeOut);
            egret.Tween.removeTweens(this._back);
            egret.Tween.removeTweens(this._property);
            egret.Tween.removeTweens(this._propertyIcon);
            egret.Tween.removeTweens(this._blabNum);
            this._completeCaller = null;
            this._completeMethod = null;
        };
        BubblePropertyTip.prototype.initialize = function (isPet, type, value) {
            var add = "";
            if (value > 0)
                add = "+";
            if (isPet) {
                this._property.source = "tips_json.pet_prop_" + type;
                this._blabNum.font = 'pet_prop_font_fnt';
            }
            else {
                this._property.source = "tips_json.property_" + type;
                this._blabNum.font = 'property_font_fnt';
            }
            this._propertyIcon.source = "tips_json.img_icon_" + type;
            switch (type) {
                case TypeProperty.Hit:
                case TypeProperty.Dodge:
                case TypeProperty.Crit:
                case TypeProperty.IgnoreCritInjure:
                case TypeProperty.CritInjure:
                case TypeProperty.IgnoreCrit:
                case TypeProperty.InjureAdd:
                case TypeProperty.InjureIgnore:
                case TypeProperty.IgnoreCtrl:
                case TypeProperty.Ctrl:
                case TypeProperty.BeHeal:
                case TypeProperty.Heal:
                    this._blabNum.text = add + (value * .01).toFixed(2) + "%";
                    break;
                default:
                    this._blabNum.text = add + value;
                    break;
            }
            //改一下命令工具 新设tips 不再集成view 让出initialize 函数名 重新实现验证视图失效函数， 
        };
        BubblePropertyTip.prototype.start = function (caller, method) {
            this._completeCaller = caller;
            this._completeMethod = method;
            this.width = 190;
            this.x = 0;
            utils.timer.once(2000, this, this.easeOut);
        };
        BubblePropertyTip.prototype.updateBlabNumPos = function (e) {
            this._property.removeEventListener(egret.Event.COMPLETE, this.updateBlabNumPos, this);
            this._blabNum.x = this._property.x + this._property.width;
        };
        BubblePropertyTip.prototype.easeOut = function () {
            egret.Tween.get(this._back).to({ x: this._back.x - 400 }, 300, utils.Ease.quadIn);
            egret.Tween.get(this._property).to({ x: this._property.x - 400 }, 300, utils.Ease.quadIn);
            egret.Tween.get(this._propertyIcon).to({ x: this._propertyIcon.x - 400 }, 300, utils.Ease.quadIn);
            egret.Tween.get(this._blabNum).to({ x: this._blabNum.x - 400 }, 300, utils.Ease.quadIn).call(function () {
                if (this._completeMethod)
                    this._completeMethod.call(this._completeCaller, this);
            }, this);
        };
        return BubblePropertyTip;
    }());
    tips.BubblePropertyTip = BubblePropertyTip;
    __reflect(BubblePropertyTip.prototype, "tips.BubblePropertyTip", ["IMessageBoxItem", "utils.IPool"]);
})(tips || (tips = {}));

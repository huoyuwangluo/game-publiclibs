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
    var PrizeBoxMark = (function (_super) {
        __extends(PrizeBoxMark, _super);
        function PrizeBoxMark() {
            return _super.call(this) || this;
        }
        PrizeBoxMark.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        PrizeBoxMark.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.removeEffects();
            this._data = null;
        };
        Object.defineProperty(PrizeBoxMark.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (data) {
                this._index = data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeBoxMark.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                if (this._data != value) {
                    this._data = value;
                    this.update();
                }
            },
            enumerable: true,
            configurable: true
        });
        PrizeBoxMark.prototype.update = function () {
            this.box.visible = true;
            if (this._state == item.StatePrize.CLOSE && this.data.state == item.StatePrize.WAIT) {
                if (!this._effect1) {
                    this.addEffects();
                }
                this.playOpenBoxAni();
            }
            else if (this._state == item.StatePrize.WAIT && this.data.state == item.StatePrize.OPEN) {
                //播放飞入背包动画
                this._itemNum = 0;
                // this.flyToBag();
                this.removeEffects();
                this.updateData();
            }
            if (this.data.state == item.StatePrize.WAIT) {
                if (!this._effect2) {
                    this.addEffects();
                }
                this._effect2.resId = "6179";
                this._effect2.scaleX = 0.5;
                this._effect2.scaleY = 0.5;
                this.addChild(this._effect2);
                this._effect2.play();
                this.updateData();
            }
            else {
                this.removeEffects();
                this.updateData();
            }
        };
        PrizeBoxMark.prototype.updateData = function () {
            this.state = this._data.state;
            this.type = this._data.type;
            this.mark.text = this._data.mark + "";
        };
        Object.defineProperty(PrizeBoxMark.prototype, "type", {
            set: function (value) {
                if (this._type != value) {
                    this._type = value;
                    this.updateBox();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeBoxMark.prototype, "state", {
            set: function (value) {
                if (this._state != value) {
                    this._state = value;
                    this.updateBox();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeBoxMark.prototype, "value", {
            set: function (v) {
                this.mark.text = v + "";
            },
            enumerable: true,
            configurable: true
        });
        PrizeBoxMark.prototype.addEffects = function () {
            this._effect1 = utils.ObjectPool.from(s.AnimationSprite);
            this._effect1.touchEnabled = false;
            this._effect1.x = this._effect1.y = 35;
            this._effect2 = utils.ObjectPool.from(s.AnimationSprite);
            this._effect2.touchEnabled = false;
            this._effect2.x = 40;
            this._effect2.y = 42;
            this._effect1.frameRate = this._effect2.frameRate = 8;
        };
        PrizeBoxMark.prototype.removeEffects = function () {
            if (this._effect1) {
                this._effect1.stop();
                if (this._effect1.parent) {
                    this._effect1.parent.removeChild(this._effect1);
                }
                utils.ObjectPool.to(this._effect1, true);
                this._effect1 = null;
            }
            if (this._effect2) {
                this._effect2.stop();
                if (this._effect2.parent) {
                    this._effect2.parent.removeChild(this._effect2);
                }
                utils.ObjectPool.to(this._effect2, true);
                this._effect2 = null;
            }
        };
        PrizeBoxMark.prototype.flyToBag = function () {
            var flyItem = new s.FlyIconsEffect();
            var fromPoint = this.localToGlobal(45, 45);
            flyItem.initialize(this._data.items, fromPoint, mg.layerManager.top);
            flyItem.start();
        };
        PrizeBoxMark.prototype.getEffectId = function () {
            switch (this._type) {
                case item.TypePrize.COPPER:
                    return "6174";
                case item.TypePrize.SILVER:
                    return "6175";
                case item.TypePrize.GOLD:
                    return "6176";
            }
        };
        PrizeBoxMark.prototype.playOpenBoxAni = function () {
            var _this = this;
            this._effect1.resId = this.getEffectId();
            // this._effect2.stop();
            this.box.visible = false;
            if (this._effect2.parent) {
                this._effect2.parent.removeChild(this._effect2);
            }
            this.addChild(this._effect1);
            this._effect1.playOnce();
            this._effect1.onCompleteOnce(this, function () {
                _this._effect1.stop();
                _this.box.visible = true;
                if (_this._effect1.parent) {
                    _this._effect1.parent.removeChild(_this._effect1);
                }
                _this.updateData();
            });
        };
        PrizeBoxMark.prototype.updateBox = function () {
            switch (this.data.state) {
                case item.StatePrize.CLOSE:
                    this.box.source = "exploreBox_json.img_" + item.TypePrize.getName(this.data.type) + "_box_close";
                    break;
                case item.StatePrize.WAIT:
                    this.box.source = "exploreBox_json.img_" + item.TypePrize.getName(this.data.type) + "_box_wait";
                    break;
                case item.StatePrize.OPEN:
                    this.box.source = "exploreBox_json.img_" + item.TypePrize.getName(this.data.type) + "_box_open";
                    break;
            }
        };
        return PrizeBoxMark;
    }(ui.PrizeBoxMarkSkin));
    item.PrizeBoxMark = PrizeBoxMark;
    __reflect(PrizeBoxMark.prototype, "item.PrizeBoxMark");
})(item || (item = {}));

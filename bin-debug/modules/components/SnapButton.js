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
    var SnapButton = (function (_super) {
        __extends(SnapButton, _super);
        function SnapButton() {
            var _this = _super.call(this) || this;
            _this._minscale = 0.9;
            _this._isWarn = false;
            _this._sound = 'ButtonClick_1';
            _this._soundOvedrride = true;
            _this._text = "";
            _this._isAcIcon = false;
            return _this;
        }
        SnapButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        };
        SnapButton.prototype.touchHandler = function (e) {
            egret.Tween.removeTweens(this);
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.scaleX = this.scaleY = 1;
                    egret.Tween.get(this).to({
                        scaleX: this._minscale,
                        scaleY: this._minscale
                    }, 300, utils.Ease.cubicOut);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    if (this._sound)
                        mg.soundManager.playSound(this._sound, 1, this._soundOvedrride, true);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 300, utils.Ease.circOut);
                    if (this.stage)
                        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    // this.effectEnabled = false;
                    break;
            }
        };
        Object.defineProperty(SnapButton.prototype, "imageSource", {
            get: function () {
                return this._imageSource;
            },
            set: function (v) {
                if (this._imageSource != v) {
                    this._imageSource = v;
                    this.getChildAt(0).source = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SnapButton.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (text) {
                if (this._text != text) {
                    this._text = text;
                    if (this._text && this.labelDisplay) {
                        this.labelDisplay.text = text;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SnapButton.prototype, "isAcIcon", {
            get: function () {
                return this._isAcIcon;
            },
            set: function (flag) {
                if (this._isAcIcon != flag) {
                    this._isAcIcon = flag;
                    if (this.getChildAt(3))
                        this.getChildAt(3).visible = flag;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SnapButton.prototype, "isWarn", {
            get: function () {
                return this._isWarn;
            },
            set: function (flag) {
                if (this._isWarn != flag) {
                    this._isWarn = flag;
                    if (this.iconDisplay)
                        this.iconDisplay.visible = flag;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SnapButton.prototype, "source", {
            get: function () {
                return this.skinName;
            },
            set: function (v) {
                this.skinName = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SnapButton.prototype, "sound", {
            get: function () {
                return this._sound;
            },
            set: function (v) {
                this._sound = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SnapButton.prototype, "soundOvedrride", {
            get: function () {
                return this._soundOvedrride;
            },
            set: function (v) {
                this._soundOvedrride = v;
            },
            enumerable: true,
            configurable: true
        });
        SnapButton.prototype.closeSound = function () {
            this._sound = "";
        };
        return SnapButton;
    }(eui.Button));
    components.SnapButton = SnapButton;
    __reflect(SnapButton.prototype, "components.SnapButton");
})(components || (components = {}));

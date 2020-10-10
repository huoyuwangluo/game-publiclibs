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
    var IconButton = (function (_super) {
        __extends(IconButton, _super);
        function IconButton(source) {
            var _this = _super.call(this, source) || this;
            _this._sound = 'ButtonClick_1';
            _this._soundOvedrride = true;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchHandler, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeFromStage, _this);
            return _this;
        }
        IconButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._scaleX = this.scaleX;
            this._scaleY = this.scaleY;
        };
        IconButton.prototype.removeFromStage = function (e) {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
        };
        IconButton.prototype.touchHandler = function (e) {
            egret.Tween.removeTweens(this);
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.scaleX = this._scaleX;
                    this.scaleY = this._scaleY;
                    this._sound = 'ButtonClick_1';
                    egret.Tween.get(this).to({ scaleX: this._scaleX * 0.8, scaleY: this._scaleY * 0.8 }, 300, utils.Ease.cubicOut);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    if (this._sound)
                        mg.soundManager.playSound(this._sound, 1, this._soundOvedrride, true);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    egret.Tween.get(this).to({ scaleX: this._scaleX, scaleY: this._scaleY }, 300, utils.Ease.circOut);
                    if (this.stage)
                        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    break;
            }
        };
        Object.defineProperty(IconButton.prototype, "sound", {
            get: function () {
                return this._sound;
            },
            set: function (v) {
                this._sound = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IconButton.prototype, "soundOvedrride", {
            get: function () {
                return this._soundOvedrride;
            },
            set: function (v) {
                this._soundOvedrride = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IconButton.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (v) {
                this._type = v;
            },
            enumerable: true,
            configurable: true
        });
        return IconButton;
    }(eui.Image));
    components.IconButton = IconButton;
    __reflect(IconButton.prototype, "components.IconButton");
})(components || (components = {}));

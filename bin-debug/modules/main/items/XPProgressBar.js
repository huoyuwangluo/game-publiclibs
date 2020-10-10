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
var main;
(function (main) {
    var XPProgressBar = (function (_super) {
        __extends(XPProgressBar, _super);
        function XPProgressBar() {
            var _this = _super.call(this) || this;
            _this.EFFECT_WIDTH = 200;
            _this._progress = 0;
            _this._pool = [];
            _this._effects = [];
            return _this;
        }
        Object.defineProperty(XPProgressBar.prototype, "width", {
            get: function () {
                return egret.superGetter(XPProgressBar, this, "width");
            },
            set: function (v) {
                egret.superSetter(XPProgressBar, this, "width", v);
                egret.callLater(this.update, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XPProgressBar.prototype, "height", {
            get: function () {
                return 60;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XPProgressBar.prototype, "progress", {
            get: function () {
                return this._progress;
            },
            set: function (value) {
                if (this._progress != value) {
                    this._progress = value;
                    var w = this.width * this._progress;
                    egret.callLater(this.update, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        XPProgressBar.prototype.update = function () {
            var maxWidth = (this.width * this._progress);
            var total = Math.ceil(maxWidth / this.EFFECT_WIDTH);
            if (total <= 0)
                total = 0;
            while (total > this._effects.length) {
                var animation = this.fromPool();
                this._effects.push(animation);
            }
            while (total < this._effects.length) {
                var animation = this._effects.pop();
                animation.stop();
                if (animation.parent) {
                    animation.parent.removeChild(animation);
                }
                this.toPool(animation);
            }
            if (this._progress == 0)
                return;
            var length = this._effects.length;
            for (var i = 0; i < length; i++) {
                var animation = this._effects[i];
                if (i < length - 1) {
                    animation.x = i * this.EFFECT_WIDTH;
                }
                else {
                    var offX = (maxWidth % this.EFFECT_WIDTH) - this.EFFECT_WIDTH;
                    animation.x = i * this.EFFECT_WIDTH + offX;
                }
                if (!animation.parent) {
                    //animation.blendMode=egret.BlendMode.ADD;
                    this.addChild(animation);
                    animation.gotoAndPlay(1);
                }
                else {
                    animation.play();
                }
            }
        };
        XPProgressBar.prototype.fromPool = function () {
            if (this._pool.length)
                return this._pool.pop();
            var animation = new s.AnimationSprite();
            animation.resId = ("6061");
            return animation;
        };
        XPProgressBar.prototype.toPool = function (value) {
            value.stop();
            this._pool.push(value);
        };
        return XPProgressBar;
    }(egret.DisplayObjectContainer));
    main.XPProgressBar = XPProgressBar;
    __reflect(XPProgressBar.prototype, "main.XPProgressBar");
})(main || (main = {}));

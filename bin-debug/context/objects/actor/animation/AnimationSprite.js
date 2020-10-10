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
var s;
(function (s) {
    var AnimationSprite = (function (_super) {
        __extends(AnimationSprite, _super);
        function AnimationSprite() {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            _this._scale = 1;
            _this._fliped = false;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            _this._animation = new s.ResAnimation();
            _this._animation.enableTimerLine();
            _this.addChild(_this._animation);
            _this.frameRate = 12;
            GameStatistics.addAnimation(_this);
            return _this;
        }
        AnimationSprite.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            GameStatistics.addAnimation(this);
        };
        AnimationSprite.prototype.reset = function () {
            this.frameRate = 12;
            this._scale = this.scaleX = this.scaleY = 1;
            this._animation.stop();
            this._animation.reset();
            GameStatistics.removeAnimation(this);
        };
        AnimationSprite.prototype.scale = function (value) {
            this._scale = this.scaleX = this.scaleY = value;
            this.updateFlip();
        };
        Object.defineProperty(AnimationSprite.prototype, "fliped", {
            get: function () {
                return this._fliped;
            },
            set: function (value) {
                if (this._fliped != value) {
                    this._fliped = value;
                    this.updateFlip();
                }
            },
            enumerable: true,
            configurable: true
        });
        AnimationSprite.prototype.updateFlip = function () {
            this.scaleX = (this._fliped ? -this._scale : this._scale);
        };
        Object.defineProperty(AnimationSprite.prototype, "data", {
            get: function () {
                return this._animation.data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationSprite.prototype, "frameRate", {
            get: function () {
                return this._animation.frameRate;
            },
            set: function (value) {
                this._animation.frameRate = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationSprite.prototype, "frameRateScale", {
            get: function () {
                return this._animation.frameRateScale;
            },
            set: function (value) {
                this._animation.frameRateScale = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationSprite.prototype, "resId", {
            get: function () {
                return this._animation.resId;
            },
            set: function (v) {
                this._animation.setResId(v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationSprite.prototype, "playing", {
            get: function () {
                return this._animation.playing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationSprite.prototype, "currentFrame", {
            get: function () {
                return this._animation.currentFrame;
            },
            enumerable: true,
            configurable: true
        });
        AnimationSprite.prototype.onCompleteOnce = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            (_a = this._animation).onCompleteOnce.apply(_a, [caller, method].concat(args));
            var _a;
        };
        AnimationSprite.prototype.onComplete = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            (_a = this._animation).onComplete.apply(_a, [caller, method].concat(args));
            var _a;
        };
        AnimationSprite.prototype.offComplete = function (caller, method) {
            this._animation.offComplete(caller, method);
        };
        AnimationSprite.prototype.offAllComplete = function () {
            this._animation.offAllComplete();
        };
        AnimationSprite.prototype.play = function () {
            this._animation.play();
            this._animation.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        AnimationSprite.prototype.stop = function () {
            this._animation.stop();
            this._animation.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        AnimationSprite.prototype.gotoAndPlay = function (frame) {
            this._animation.gotoAndPlay(frame);
            this._animation.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        AnimationSprite.prototype.gotoAndStop = function (frame) {
            this._animation.gotoAndStop(frame);
            this._animation.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        AnimationSprite.prototype.gotoAndStopEnd = function () {
            this._animation.gotoAndStopEnd();
            this._animation.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        AnimationSprite.prototype.playOnce = function () {
            this._animation.playOnce();
            this._animation.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        return AnimationSprite;
    }(egret.Sprite));
    s.AnimationSprite = AnimationSprite;
    __reflect(AnimationSprite.prototype, "s.AnimationSprite", ["s.IAnimation", "utils.IPool", "egret.DisplayObject", "s.IAnimationStatis"]);
})(s || (s = {}));

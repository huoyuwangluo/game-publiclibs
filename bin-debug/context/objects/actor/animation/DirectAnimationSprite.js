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
    var DirectAnimationSprite = (function (_super) {
        __extends(DirectAnimationSprite, _super);
        function DirectAnimationSprite() {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            _this._scale = 1;
            _this._fliped = false;
            _this.touchEnabled = _this.touchChildren = false;
            GameStatistics.addAnimation(_this);
            return _this;
        }
        DirectAnimationSprite.prototype.initialize = function (resType, autoFlip, fullDirect) {
            if (autoFlip === void 0) { autoFlip = true; }
            if (fullDirect === void 0) { fullDirect = false; }
            this._resType = resType;
            this._autoFlip = autoFlip;
            if (!this._animation) {
                switch (this._resType) {
                    case game.TypeAnimaAsset.ACTOR_DIRECT_5:
                    case game.TypeAnimaAsset.ACTOR_DIRECT_2:
                    case game.TypeAnimaAsset.EFFECT_NORMAL:
                        if (this._animation) {
                            if (this._animation instanceof s.ResDirectPackAnimation) {
                                this._animation.reset();
                            }
                        }
                        this._animation = new s.ResDirectAnimation();
                        break;
                    case game.TypeAnimaAsset.ACTOR_ACTION_5:
                    case game.TypeAnimaAsset.ACTOR_ACTION_2:
                    case game.TypeAnimaAsset.EFFECT_DIRECT_5:
                    case game.TypeAnimaAsset.EFFECT_DIRECT_2:
                        if (this._animation) {
                            if (this._animation instanceof s.ResDirectAnimation) {
                                this._animation.reset();
                            }
                        }
                        this._animation = new s.ResDirectPackAnimation();
                        break;
                }
            }
            Object(this._animation).fullDirect = fullDirect;
            this.addChild(this._animation);
            this._animation.enableTimerLine();
            this._animation.initialize(resType);
            GameStatistics.addAnimation(this);
        };
        DirectAnimationSprite.prototype.reset = function () {
            this._resId = null;
            this._direct = -1;
            this._animation.reset();
            GameStatistics.removeAnimation(this);
        };
        ;
        DirectAnimationSprite.prototype.scale = function (value) {
            this._scale = this.scaleX = this.scaleY = value;
            this.updateFlip();
        };
        Object.defineProperty(DirectAnimationSprite.prototype, "fliped", {
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
        DirectAnimationSprite.prototype.updateFlip = function () {
            this.scaleX = (this._fliped ? -this._scale : this._scale);
        };
        Object.defineProperty(DirectAnimationSprite.prototype, "frameRate", {
            get: function () {
                return this._animation.frameRate;
            },
            set: function (value) {
                this._animation.frameRate = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DirectAnimationSprite.prototype, "frameRateScale", {
            get: function () {
                return this._animation.frameRateScale;
            },
            set: function (value) {
                this._animation.frameRateScale = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DirectAnimationSprite.prototype, "playing", {
            get: function () {
                return this._animation.playing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DirectAnimationSprite.prototype, "currentFrame", {
            get: function () {
                return this._animation.currentFrame;
            },
            enumerable: true,
            configurable: true
        });
        DirectAnimationSprite.prototype.play = function () {
            this._animation.play();
            this._animation.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        DirectAnimationSprite.prototype.stop = function () {
            this._animation.stop();
            this._animation.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        DirectAnimationSprite.prototype.playOnce = function () {
            this._animation.playOnce();
            this._animation.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        DirectAnimationSprite.prototype.gotoAndStop = function (frame) {
            this._animation.gotoAndStop(frame);
            this._animation.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        DirectAnimationSprite.prototype.gotoAndStopEnd = function () {
            this._animation.gotoAndStopEnd();
            this._animation.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        DirectAnimationSprite.prototype.gotoAndPlay = function (frame) {
            this._animation.gotoAndPlay(frame);
            this._animation.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        Object.defineProperty(DirectAnimationSprite.prototype, "direct", {
            set: function (value) {
                this._animation.direct = value;
                if (this._autoFlip)
                    this.fliped = TypeDirection.isNeedRevert(this.direct);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DirectAnimationSprite.prototype, "resId", {
            get: function () {
                return this._animation.resId;
            },
            enumerable: true,
            configurable: true
        });
        DirectAnimationSprite.prototype.onCompleteOnce = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            (_a = this._animation).onCompleteOnce.apply(_a, [caller, method].concat(args));
            var _a;
        };
        DirectAnimationSprite.prototype.onComplete = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            (_a = this._animation).onComplete.apply(_a, [caller, method].concat(args));
            var _a;
        };
        DirectAnimationSprite.prototype.offComplete = function (caller, method) {
            this._animation.offComplete(caller, method);
        };
        DirectAnimationSprite.prototype.offAllComplete = function () {
            this._animation.offAllComplete();
        };
        DirectAnimationSprite.prototype.setResId = function (resId) {
            this._animation.setResId(resId);
            if (this._autoFlip)
                this.fliped = TypeDirection.isNeedRevert(this.direct);
        };
        return DirectAnimationSprite;
    }(egret.DisplayObjectContainer));
    s.DirectAnimationSprite = DirectAnimationSprite;
    __reflect(DirectAnimationSprite.prototype, "s.DirectAnimationSprite", ["s.IAnimation", "utils.IPool", "egret.DisplayObject", "s.IAnimationStatis"]);
})(s || (s = {}));

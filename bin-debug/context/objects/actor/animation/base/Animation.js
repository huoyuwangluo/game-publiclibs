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
    var Animation = (function (_super) {
        __extends(Animation, _super);
        function Animation() {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            _this._fliped = false;
            _this._scale = 1;
            _this._offsetPoint = new egret.Point();
            _this.touchEnabled = false;
            return _this;
        }
        Animation.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        Animation.prototype.reset = function () {
            this._scale = 1;
            this._data = null;
            if (!this._timerline)
                return;
            this._timerline.reset();
            this._timerline.offAllComplete();
            this.texture = null;
        };
        /*** 打开时间轴渲染**/
        Animation.prototype.enableTimerLine = function () {
            this._timerline = new s.TimerLine();
            this._timerline.onRender(this, this.frameRender);
        };
        Object.defineProperty(Animation.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (v) {
                if (this._data != v) {
                    this._data = v;
                    if (this._timerline) {
                        this._timerline.totalFrame = this._data ? this._data.numFrames : 0;
                        this._timerline.currentFrame = 1;
                        if (this._data) {
                            if (this._data.frameRate != 24) {
                                this._timerline.frameRate = this._data.frameRate;
                            }
                            this.frameRender(this.currentFrame);
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Animation.prototype.onCompleteOnce = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            (_a = this._timerline).onCompleteOnce.apply(_a, [caller, method].concat(args));
            var _a;
        };
        Animation.prototype.onComplete = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            (_a = this._timerline).onComplete.apply(_a, [caller, method].concat(args));
            var _a;
        };
        Animation.prototype.offComplete = function (caller, method) {
            this._timerline.offComplete(caller, method);
        };
        Animation.prototype.offAllComplete = function () {
            this._timerline.offAllComplete();
        };
        Animation.prototype.setOffset = function (x, y) {
            this._offsetPoint.setTo(x, y);
        };
        Animation.prototype.scale = function (value) {
            this._scale = this.scaleY = value;
            this.updateFlip();
        };
        Object.defineProperty(Animation.prototype, "fliped", {
            get: function () {
                return this._fliped;
            },
            set: function (value) {
                this._fliped = value;
                this.updateFlip();
            },
            enumerable: true,
            configurable: true
        });
        Animation.prototype.updateFlip = function () {
            this.scaleX = this._scale * (this._fliped ? -1 : 1);
        };
        Object.defineProperty(Animation.prototype, "frameRate", {
            get: function () {
                return this._timerline.frameRate;
            },
            set: function (value) {
                if (this._data && this._timerline && this._data.frameRate != 24) {
                    this._timerline.frameRate = this._data.frameRate;
                }
                else {
                    this._timerline.frameRate = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "frameRateScale", {
            get: function () {
                return this._timerline.frameRateScale;
            },
            set: function (value) {
                this._timerline.frameRateScale = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "playing", {
            get: function () {
                return this._timerline.playing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "currentFrame", {
            get: function () {
                return this._timerline.currentFrame;
            },
            enumerable: true,
            configurable: true
        });
        Animation.prototype.play = function () {
            if (this._timerline)
                this._timerline.play();
        };
        Animation.prototype.stop = function () {
            if (this._timerline)
                this._timerline.stop();
        };
        Animation.prototype.playOnce = function () {
            this._timerline.playOnce();
        };
        Animation.prototype.gotoAndStop = function (frame) {
            this._timerline.gotoAndStop(frame);
        };
        Animation.prototype.gotoAndStopEnd = function () {
            this._timerline.gotoAndStopEnd();
        };
        Animation.prototype.gotoAndPlay = function (frame) {
            this._timerline.gotoAndPlay(frame);
        };
        Animation.prototype.nextFrame = function () {
            this._timerline.nextFrame();
        };
        Animation.prototype.frameRender = function (frame) {
            var that = this;
            if (!that._data) {
                if (that.texture)
                    that.texture = null;
                return;
            }
            if (!this.stage)
                return;
            var data = that._data;
            if (!data || !data.frames)
                return;
            if (frame > data.frames.length)
                return;
            var frameData = data.getKeyFrameData(frame);
            that.texture = data.getTextureByFrame(frame);
            //!!!有优化空间
            that.x = (frameData.x + that._offsetPoint.x) * that.scaleX;
            that.y = (frameData.y + that._offsetPoint.y) * that.scaleY;
        };
        return Animation;
    }(egret.Bitmap));
    s.Animation = Animation;
    __reflect(Animation.prototype, "s.Animation", ["s.IAnimation", "utils.IPool", "egret.DisplayObject"]);
})(s || (s = {}));

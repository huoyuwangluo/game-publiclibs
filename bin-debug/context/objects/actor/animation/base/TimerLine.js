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
    var TimerLine = (function (_super) {
        __extends(TimerLine, _super);
        function TimerLine() {
            var _this = _super.call(this) || this;
            _this._passedTime = 0;
            _this._frameRateScale = 1;
            _this.frameRate = 24;
            _this.reset();
            return _this;
        }
        TimerLine.prototype.reset = function () {
            this.stop();
            this._playing = false;
            this._lastTime = 0;
            this._passedTime = 0;
            this._totalFrame = 10;
            this._currentFrame = 1;
            this._frameRateScale = 1;
        };
        TimerLine.prototype.onRender = function (caller, method) {
            this._renderCaller = caller;
            this._renderMethod = method;
        };
        TimerLine.prototype.onCompleteOnce = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._completes)
                this._completes = new utils.Handlers();
            this._completes.add(caller, method, args, true);
        };
        TimerLine.prototype.onComplete = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._completes)
                this._completes = new utils.Handlers();
            this._completes.add(caller, method, args, false);
        };
        TimerLine.prototype.offComplete = function (caller, method) {
            if (this._completes)
                this._completes.remove(caller, method);
        };
        TimerLine.prototype.offAllComplete = function () {
            if (this._completes)
                this._completes.clear();
        };
        Object.defineProperty(TimerLine.prototype, "frameRate", {
            get: function () {
                return this._frameRate;
            },
            set: function (value) {
                if (this._frameRate == value)
                    return;
                this._frameRate = value;
                this.updateInterval();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimerLine.prototype, "frameRateScale", {
            get: function () {
                return this._frameRateScale;
            },
            set: function (value) {
                if (this._frameRateScale == value)
                    return;
                this._frameRateScale = value;
                this.updateInterval();
            },
            enumerable: true,
            configurable: true
        });
        TimerLine.prototype.updateInterval = function () {
            this._interval = (1000 / (this._frameRate * this._frameRateScale)) >> 0;
        };
        Object.defineProperty(TimerLine.prototype, "totalFrame", {
            get: function () {
                return this._totalFrame;
            },
            set: function (value) {
                this._totalFrame = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimerLine.prototype, "currentFrame", {
            get: function () {
                return this._currentFrame;
            },
            set: function (value) {
                this._currentFrame = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimerLine.prototype, "playing", {
            get: function () {
                return this._playing;
            },
            enumerable: true,
            configurable: true
        });
        TimerLine.prototype.play = function () {
            this._playLoop = true;
            if (this._playing)
                return;
            this._playing = true;
            this.updateState();
        };
        TimerLine.prototype.stop = function () {
            this._playLoop = true;
            if (!this._playing)
                return;
            this._playing = false;
            this.updateState();
        };
        TimerLine.prototype.playOnce = function () {
            this._playLoop = false;
            this._currentFrame = 1;
            if (this._playing)
                return;
            this._playing = true;
            this.updateState();
        };
        TimerLine.prototype.gotoAndStop = function (frame) {
            this.stop();
            this._currentFrame = frame;
            if (this._renderMethod)
                this._renderMethod.call(this._renderCaller, this._currentFrame);
        };
        TimerLine.prototype.gotoAndStopEnd = function () {
            this.stop();
            this._currentFrame = this._totalFrame;
            if (this._renderMethod)
                this._renderMethod.call(this._renderCaller, this._currentFrame);
        };
        TimerLine.prototype.gotoAndPlay = function (frame) {
            this._currentFrame = frame;
            this.play();
        };
        TimerLine.prototype.nextFrame = function () {
            this._currentFrame++;
            if (this._currentFrame > this._totalFrame) {
                this._currentFrame = 1;
            }
            if (this._renderMethod)
                this._renderMethod.call(this._renderCaller, this._currentFrame);
        };
        TimerLine.prototype.updateState = function () {
            if (this._playing) {
                this._lastTime = egret.getTimer();
                mg.stageManager.addTick(this, this.updateRender, 30);
                //egret.startTick(this.updateRender, this);
                if (this._renderMethod)
                    this._renderMethod.call(this._renderCaller, this._currentFrame);
            }
            else {
                mg.stageManager.removeTick(this, this.updateRender);
                //egret.stopTick(this.updateRender, this);
            }
        };
        TimerLine.prototype.updateRender = function (timeStamp) {
            var self = this;
            var advancedTime = timeStamp - self._lastTime;
            self._lastTime = timeStamp;
            var currentTime = self._passedTime + advancedTime;
            var interval = self._interval;
            if (TimerLine.FRAME_CURRENT_SPEED != 1) {
                interval = (interval / TimerLine.FRAME_CURRENT_SPEED) >> 0;
            }
            self._passedTime = (currentTime % interval) >> 0;
            var num = (currentTime / interval) >> 0;
            if (num < 1) {
                return false;
            }
            var isEndTag = false;
            while (num >= 1) {
                num--;
                self._currentFrame++;
                if (self._currentFrame > self._totalFrame) {
                    self._currentFrame = 1;
                    isEndTag = true;
                    if (!self._playLoop) {
                        break;
                    }
                }
            }
            if (self._renderMethod)
                self._renderMethod.call(self._renderCaller, self._currentFrame);
            if (isEndTag) {
                if (!self._playLoop) {
                    self.stop();
                }
                if (self._completes)
                    self._completes.run();
            }
            return true;
        };
        TimerLine.FRAME_CURRENT_SPEED = 1; //动画播放速度总控，1为正常速度，<1为慢放
        TimerLine.FRAME_FAST = 1.5;
        TimerLine.FRAME_SLOW = 0.2;
        TimerLine.FRAME_NORMAL = 1;
        return TimerLine;
    }(egret.HashObject));
    s.TimerLine = TimerLine;
    __reflect(TimerLine.prototype, "s.TimerLine");
})(s || (s = {}));

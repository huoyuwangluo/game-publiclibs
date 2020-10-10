var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var EaseRender = (function () {
        function EaseRender() {
            this._start = new egret.Point();
            this._offset = new egret.Point();
            this._end = new egret.Point();
            this._lastTime = 0;
            this._passedTime = 0;
            this._interval = 1000 / 60;
        }
        EaseRender.prototype.initialize = function (body, speed, end_x, end_y, ease) {
            if (ease === void 0) { ease = utils.Ease.linearNone; }
            this._body = body;
            this._speed = speed;
            this._start.setTo(body.x, body.y);
            this._end.setTo(end_x, end_y);
            this._offset.setTo(this._end.x - this._start.x, this._end.y - this._start.y);
            this._totalFrame = (egret.Point.distance(this._start, this._end) / this._speed) >> 0;
            this._curFrame = 0;
            this._ease = ease;
            this._process = 0;
            this._lastTime = mg.stageManager.timeStamp;
        };
        EaseRender.prototype.reset = function () {
            this._body = null;
            this._ease = null;
            this._process = 0;
        };
        /**
         * 渲染移动
         */
        EaseRender.prototype.updateRender = function (passframe) {
            var self = this;
            if (!self._body)
                return;
            // var advancedTime = timeStamp - self._lastTime;
            // self._lastTime = timeStamp;
            // var frameIntervalTime = self._interval;
            // var currentTime = self._passedTime + advancedTime;
            // self._passedTime = currentTime % frameIntervalTime;
            // var num = currentTime / frameIntervalTime;
            // if (num < 1) {
            //     return true;
            // }
            if (passframe <= 0)
                return;
            self._curFrame += passframe;
            self._process = self._curFrame > self._totalFrame ? 1 : (self._curFrame / self._totalFrame);
            var tx = self._ease(self._process, self._start.x, self._offset.x, 1) >> 0;
            var ty = self._ease(self._process, self._start.y, self._offset.y, 1) >> 0;
            self._body.pos(tx, ty);
            //self._body.x=self._ease(self._process,self._start.x,self._offset.x,1);
            //self._body.y=self._ease(self._process,self._start.y,self._offset.y,1);
            return true;
        };
        Object.defineProperty(EaseRender.prototype, "body", {
            get: function () {
                return this._body;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EaseRender.prototype, "start", {
            get: function () {
                return this._start;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EaseRender.prototype, "end", {
            get: function () {
                return this._end;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EaseRender.prototype, "offset", {
            get: function () {
                return this._offset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EaseRender.prototype, "curFrame", {
            get: function () {
                return this._curFrame;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EaseRender.prototype, "totalFrame", {
            get: function () {
                return this._totalFrame;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EaseRender.prototype, "ease", {
            get: function () {
                return this._ease;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EaseRender.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EaseRender.prototype, "process", {
            get: function () {
                return this._process;
            },
            enumerable: true,
            configurable: true
        });
        return EaseRender;
    }());
    s.EaseRender = EaseRender;
    __reflect(EaseRender.prototype, "s.EaseRender");
})(s || (s = {}));

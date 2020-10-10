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
var utils;
(function (utils) {
    var TweenUtil = (function () {
        function TweenUtil() {
        }
        /**摇晃 */
        TweenUtil.shack = function (object, angle, interval, times, complete) {
            if (angle === void 0) { angle = 10; }
            if (interval === void 0) { interval = 500; }
            if (times === void 0) { times = -1; }
            if (complete === void 0) { complete = null; }
            this.killShack(object);
            if (!this._shackLib[object.hashCode]) {
                this._shackLib[object.hashCode] = utils.ObjectPool.from(ShackItem);
            }
            var item = this._shackLib[object.hashCode];
            item.initialize(object, angle, interval, times);
            item.onComplete(this, function (item) {
                this._shackLib[item.target.hashCode] = null;
                delete this._shackLib[item.target.hashCode];
                utils.ObjectPool.to(item, true);
            });
        };
        TweenUtil.killShack = function (object) {
            var item = this._shackLib[object.hashCode];
            if (item) {
                this._shackLib[item.target.hashCode] = null;
                delete this._shackLib[item.target.hashCode];
                utils.ObjectPool.to(item, true);
            }
        };
        /**闪烁 */
        TweenUtil.flash = function (object, interval, times, targetRotation, targetScale, complete) {
            if (interval === void 0) { interval = 500; }
            if (times === void 0) { times = -1; }
            if (targetRotation === void 0) { targetRotation = undefined; }
            if (targetScale === void 0) { targetScale = undefined; }
            if (complete === void 0) { complete = null; }
            this.killFlash(object);
            if (!this._flashLib[object.hashCode]) {
                this._flashLib[object.hashCode] = utils.ObjectPool.from(FlashItem);
            }
            var item = this._flashLib[object.hashCode];
            item.initialize(object, interval, times, targetRotation, targetScale);
            item.onComplete(this, function (item) {
                this._flashLib[item.target.hashCode] = null;
                delete this._flashLib[item.target.hashCode];
                utils.ObjectPool.to(item, true);
            });
        };
        TweenUtil.killFlash = function (object) {
            var item = this._flashLib[object.hashCode];
            if (item) {
                this._flashLib[object.hashCode] = null;
                delete this._flashLib[object.hashCode];
                utils.ObjectPool.to(item, true);
            }
        };
        /**震动 */
        TweenUtil.shock = function (object, time, amplitude, caller, complete) {
            if (amplitude === void 0) { amplitude = 20; }
            if (caller === void 0) { caller = null; }
            if (complete === void 0) { complete = null; }
            this.killShock(object);
            if (!this._shockLib[object.hashCode]) {
                this._shockLib[object.hashCode] = utils.ObjectPool.from(ShokeItem);
            }
            var item = this._shockLib[object.hashCode];
            item.initialize(object, time, amplitude);
            item.onComplete(this, function (item) {
                this._shockLib[item.target.hashCode] = null;
                delete this._shockLib[item.target.hashCode];
                utils.ObjectPool.to(item, true);
                if (complete) {
                    complete.call(caller, object);
                }
            });
        };
        TweenUtil.killShock = function (object) {
            var item = this._shockLib[object.hashCode];
            if (item) {
                this._shockLib[object.hashCode] = null;
                delete this._shockLib[object.hashCode];
                utils.ObjectPool.to(item, true);
            }
        };
        /**曲线运动 */
        TweenUtil.bezier = function (object, time, targetX, targetY, controlX, controlY, targetRotation, targetScale, caller, complete) {
            if (targetRotation === void 0) { targetRotation = undefined; }
            if (targetScale === void 0) { targetScale = undefined; }
            if (caller === void 0) { caller = null; }
            if (complete === void 0) { complete = null; }
            this.killBezier(object);
            if (!this._bezierLib[object.hashCode]) {
                this._bezierLib[object.hashCode] = utils.ObjectPool.from(BezierItem);
            }
            var item = this._bezierLib[object.hashCode];
            item.initialize(object, time, targetX, targetY, controlX, controlY, targetRotation, targetScale);
            item.onComplete(this, function (item) {
                this._shockLib[item.target.hashCode] = null;
                delete this._shockLib[item.target.hashCode];
                utils.ObjectPool.to(item, true);
                if (complete) {
                    complete.call(caller, object);
                }
            });
        };
        TweenUtil.killBezier = function (object) {
            var item = this._bezierLib[object.hashCode];
            if (item) {
                this._bezierLib[object.hashCode] = null;
                delete this._bezierLib[object.hashCode];
                utils.ObjectPool.to(item, true);
            }
        };
        /**角度按照最优运动 */
        TweenUtil.angle = function (object, angle, time, ease, caller, complete) {
            if (caller === void 0) { caller = null; }
            if (complete === void 0) { complete = null; }
            this.killAngle(object);
            if (!this._angleLib[object.hashCode]) {
                this._angleLib[object.hashCode] = utils.ObjectPool.from(AngleItem);
            }
            var item = this._angleLib[object.hashCode];
            item.initialize(object, angle, time, ease);
            item.onComplete(this, function (item) {
                this._angleLib[item.target.hashCode] = null;
                delete this._angleLib[item.target.hashCode];
                utils.ObjectPool.to(item, true);
                if (complete) {
                    complete.call(caller, object);
                }
            });
        };
        TweenUtil.killAngle = function (object) {
            var item = this._angleLib[object.hashCode];
            if (item) {
                this._angleLib[object.hashCode] = null;
                delete this._angleLib[object.hashCode];
                utils.ObjectPool.to(item, true);
            }
        };
        TweenUtil._shockLib = {};
        TweenUtil._shackLib = {};
        TweenUtil._flashLib = {};
        TweenUtil._bezierLib = {};
        TweenUtil._angleLib = {};
        return TweenUtil;
    }());
    utils.TweenUtil = TweenUtil;
    __reflect(TweenUtil.prototype, "utils.TweenUtil");
    var TweenItem = (function () {
        function TweenItem() {
            this.autoRecover = true;
            this.toPoolTime = 0;
        }
        TweenItem.prototype.initialize = function (target) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this._target = target;
            return this;
        };
        Object.defineProperty(TweenItem.prototype, "target", {
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });
        TweenItem.prototype.reset = function () {
            this._target = null;
            this.offComplete();
        };
        TweenItem.prototype.render = function () {
            ;
        };
        TweenItem.prototype.end = function () {
            if (this._complete) {
                this._complete.runWith(this);
            }
        };
        TweenItem.prototype.onComplete = function (caller, method) {
            this.offComplete();
            this._complete = utils.Handler.create(caller, method, null, false);
        };
        TweenItem.prototype.offComplete = function () {
            if (this._complete) {
                this._complete.recover();
                this._complete = null;
            }
        };
        return TweenItem;
    }());
    utils.TweenItem = TweenItem;
    __reflect(TweenItem.prototype, "utils.TweenItem", ["utils.IPool"]);
    var ShackItem = (function (_super) {
        __extends(ShackItem, _super);
        function ShackItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShackItem.prototype.initialize = function (target, angle, interval, times) {
            if (angle === void 0) { angle = 10; }
            if (interval === void 0) { interval = 300; }
            if (times === void 0) { times = -1; }
            _super.prototype.initialize.call(this, target);
            this._angle = angle;
            this._interval = interval;
            this._times = times;
            this._target = target;
            this.render();
            return this;
        };
        ShackItem.prototype.reset = function () {
            egret.Tween.removeTweens(this._target);
            _super.prototype.reset.call(this);
        };
        ShackItem.prototype.render = function () {
            if (this._times == 0) {
                this.end();
                return;
            }
            if (this._times > 0)
                this._times--;
            egret.Tween.get(this._target).to({ rotation: this._target.rotation > 0 ? -this._angle : this._angle }, this._interval, utils.Ease.quartInOut).call(this.render, this);
        };
        return ShackItem;
    }(TweenItem));
    utils.ShackItem = ShackItem;
    __reflect(ShackItem.prototype, "utils.ShackItem");
    var FlashItem = (function (_super) {
        __extends(FlashItem, _super);
        function FlashItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FlashItem.prototype.initialize = function (target, interval, times, targetRotation, targetScale) {
            if (interval === void 0) { interval = 500; }
            if (times === void 0) { times = -1; }
            this._interval = interval;
            this._times = times;
            this._startRotation = target.rotation;
            this._startScale = target.scaleX;
            this._targetRotation = targetRotation == undefined ? targetRotation : target.rotation;
            this._targetScale = targetScale == undefined ? targetScale : target.scaleX;
            this.render();
            return _super.prototype.initialize.call(this, target);
        };
        FlashItem.prototype.reset = function () {
            egret.Tween.removeTweens(this._target);
            _super.prototype.reset.call(this);
        };
        FlashItem.prototype.render = function () {
            if (this._times == 0) {
                this.end();
                return;
            }
            if (this._times > 0)
                this._times--;
            var bool = this._target.alpha > 0;
            egret.Tween.get(this._target).to({
                alpha: bool ? 0 : 1,
                rotation: bool ? this._targetRotation : this._startRotation,
                scaleX: bool ? this._targetScale : this._startScale,
                scaleY: bool ? this._targetScale : this._startScale
            }, this._interval, utils.Ease.quartInOut).call(this.render, this);
        };
        return FlashItem;
    }(TweenItem));
    utils.FlashItem = FlashItem;
    __reflect(FlashItem.prototype, "utils.FlashItem");
    var ShokeItem = (function (_super) {
        __extends(ShokeItem, _super);
        function ShokeItem() {
            var _this = _super.call(this) || this;
            _this._original = new egret.Point();
            return _this;
        }
        ShokeItem.prototype.initialize = function (target, time, amplitude) {
            if (amplitude === void 0) { amplitude = 20; }
            this._original.setTo(target.x, target.y);
            this._startTime = egret.getTimer();
            this._endTime = this._startTime + time;
            this._amplitude = amplitude;
            this._boolean = true;
            mg.stageManager.addTick(this, this.render, 60);
            return _super.prototype.initialize.call(this, target);
        };
        ShokeItem.prototype.reset = function () {
            if (this._target) {
                this._target.x = this._original.x;
                this._target.y = this._original.y;
            }
            mg.stageManager.removeTick(this, this.render);
            _super.prototype.reset.call(this);
        };
        ShokeItem.prototype.render = function () {
            var t = egret.getTimer();
            if (t >= this._endTime) {
                mg.stageManager.removeTick(this, this.render);
                this.end();
                return;
            }
            var a = this._amplitude * (this._endTime - t) / (this._endTime - this._startTime);
            this._boolean = !this._boolean;
            if (this._boolean) {
                this._target.x = this._original.x + a;
            }
            else {
                this._target.x = this._original.x - a;
            }
        };
        return ShokeItem;
    }(TweenItem));
    utils.ShokeItem = ShokeItem;
    __reflect(ShokeItem.prototype, "utils.ShokeItem");
    var BezierItem = (function (_super) {
        __extends(BezierItem, _super);
        function BezierItem() {
            var _this = _super.call(this) || this;
            _this._cachePoint = new egret.Point();
            return _this;
        }
        BezierItem.prototype.initialize = function (target, time, targetX, targetY, controlX, controlY, targetRotation, targetScale) {
            this._startTime = mg.stageManager.timeStamp;
            this._endTime = this._startTime + time;
            this._startX = target.x;
            this._startY = target.y;
            this._startRotation = target.rotation;
            this._startScale = target.scaleX;
            this._controlX = controlX;
            this._controlY = controlY;
            this._targetX = targetX;
            this._targetY = targetY;
            this._targetRotation = targetRotation == undefined ? targetRotation : target.rotation;
            this._targetScale = targetScale == undefined ? targetScale : target.scaleX;
            mg.stageManager.addTick(this, this.render, 60);
            return _super.prototype.initialize.call(this, target);
        };
        BezierItem.prototype.reset = function () {
            mg.stageManager.removeTick(this, this.render);
            _super.prototype.reset.call(this);
        };
        BezierItem.prototype.render = function () {
            if (mg.stageManager.timeStamp >= this._endTime) {
                mg.stageManager.removeTick(this, this.render);
                this.end();
                return;
            }
            var progress = (mg.stageManager.timeStamp - this._startTime) / (this._endTime - this._startTime);
            this._target.rotation = (this._targetRotation - this._startRotation) * progress + this._startRotation;
            this._target.scaleX = this._target.scaleY = (this._targetScale - this._startScale) * progress + this._startScale;
            //this.scaleX=this.scaleY=(1-Math.abs(this._progress-0.5));
            var point = utils.BezierUtil.quadratic(progress, this._startX, this._startY, this._controlX, this._controlY, this._targetX, this._targetY, this._cachePoint);
            this._target.x = point.x;
            this._target.y = point.y;
        };
        return BezierItem;
    }(TweenItem));
    utils.BezierItem = BezierItem;
    __reflect(BezierItem.prototype, "utils.BezierItem");
    var AngleItem = (function (_super) {
        __extends(AngleItem, _super);
        function AngleItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AngleItem.prototype.initialize = function (target, angle, time, ease) {
            if (angle === void 0) { angle = 0; }
            if (time === void 0) { time = 300; }
            if (ease === void 0) { ease = null; }
            _super.prototype.initialize.call(this, target);
            this._target = target;
            if (!this._object) {
                this._object = { rotation: 0 };
            }
            this._object.rotation = this._target.rotation;
            this._object.rotation = (this._object.rotation + 360) % 360;
            angle = (angle + 360) % 360;
            if (Math.abs(angle - this._object.rotation) > 180) {
                if (angle > this._object.rotation) {
                    angle -= 360;
                }
                else {
                    angle += 360;
                }
            }
            mg.stageManager.addTick(this, this.render, 60);
            egret.Tween.get(this._object).to({ rotation: angle }, time).call(this.end, this);
            return this;
        };
        AngleItem.prototype.reset = function () {
            mg.stageManager.removeTick(this, this.render);
            if (this._target)
                egret.Tween.removeTweens(this._target);
            _super.prototype.reset.call(this);
        };
        AngleItem.prototype.render = function () {
            this._target.rotation = this._object.rotation;
        };
        return AngleItem;
    }(TweenItem));
    utils.AngleItem = AngleItem;
    __reflect(AngleItem.prototype, "utils.AngleItem");
})(utils || (utils = {}));

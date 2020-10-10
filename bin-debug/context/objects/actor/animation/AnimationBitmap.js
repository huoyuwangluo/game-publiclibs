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
    var AnimationBitmap = (function (_super) {
        __extends(AnimationBitmap, _super);
        function AnimationBitmap() {
            var _this = _super.call(this) || this;
            _this.enableTimerLine();
            GameStatistics.addAnimation(_this);
            return _this;
        }
        AnimationBitmap.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            (_a = _super.prototype.initialize).call.apply(_a, [this].concat(args));
            GameStatistics.addAnimation(this);
            var _a;
        };
        AnimationBitmap.prototype.reset = function () {
            _super.prototype.reset.call(this);
            GameStatistics.removeAnimation(this);
        };
        AnimationBitmap.prototype.play = function () {
            _super.prototype.play.call(this);
            this._timerline.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        AnimationBitmap.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._timerline.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        AnimationBitmap.prototype.resChange = function () {
            //this.play();
        };
        return AnimationBitmap;
    }(s.ResAnimation));
    s.AnimationBitmap = AnimationBitmap;
    __reflect(AnimationBitmap.prototype, "s.AnimationBitmap", ["s.IAnimationStatis", "utils.IPool", "egret.DisplayObject"]);
})(s || (s = {}));

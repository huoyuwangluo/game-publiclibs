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
    var CopyTimerCountDown = (function (_super) {
        __extends(CopyTimerCountDown, _super);
        function CopyTimerCountDown() {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            _this._assetsNames = ['copy_time_start_png', 'copy_time_1_png', 'copy_time_2_png', 'copy_time_3_png'];
            _this._font = new eui.Image();
            _this.addChild(_this._font);
            return _this;
        }
        Object.defineProperty(CopyTimerCountDown, "instance", {
            get: function () {
                if (!CopyTimerCountDown._instance) {
                    CopyTimerCountDown._instance = new CopyTimerCountDown();
                }
                return CopyTimerCountDown._instance;
            },
            enumerable: true,
            configurable: true
        });
        CopyTimerCountDown.prototype.initialize = function (scene) {
            this._scene = scene;
        };
        CopyTimerCountDown.prototype.reset = function () {
            this.stop();
            this._scene = null;
        };
        CopyTimerCountDown.prototype.start = function (times, caller, method) {
            if (times === void 0) { times = 3; }
            if (caller === void 0) { caller = null; }
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            if (this._complete)
                this._complete.recover();
            this._complete = utils.Handler.create(caller, method, args);
            mg.layerManager.top.addChild(this);
            this._times = times;
            egret.Tween.get(this._font).wait(200).call(this.play, this);
            //this.play();
        };
        CopyTimerCountDown.prototype.stop = function () {
            egret.Tween.removeTweens(this._font);
            if (this._complete) {
                this._complete.recover();
                this._complete = null;
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        CopyTimerCountDown.prototype.play = function () {
            if (this._times < 0) {
                this.end();
                return;
            }
            this._font.source = this._assetsNames[this._times];
            this._font.anchorOffsetX = 125;
            this._font.anchorOffsetY = 54;
            this._font.x = mg.stageManager.stageWidth / 2;
            this._font.y = mg.stageManager.stageHeight / 2;
            this._font.scaleX = this._font.scaleY = 0;
            egret.Tween.get(this._font).to({ scaleX: 1, scaleY: 1 }, 300, utils.Ease.backOut).wait(700).call(this.play, this);
            this._times--;
        };
        CopyTimerCountDown.prototype.end = function () {
            if (this._complete) {
                this._complete.run();
                this._complete = null;
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return CopyTimerCountDown;
    }(egret.DisplayObjectContainer));
    s.CopyTimerCountDown = CopyTimerCountDown;
    __reflect(CopyTimerCountDown.prototype, "s.CopyTimerCountDown", ["utils.IPool"]);
})(s || (s = {}));

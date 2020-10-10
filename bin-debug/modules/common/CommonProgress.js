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
    var CommonProgress = (function (_super) {
        __extends(CommonProgress, _super);
        function CommonProgress() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CommonProgress.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._proValue = 0;
            this._proMax = 100;
            this._currentNum = 0;
            this._tweenRate = 4;
            this._tweenRate2 = 1.3;
            this._maxTweenTimes = 10;
            this._isLimitMaxTweenTimes = true;
            this._maxWidth = this.width;
            switch (this.currentState) {
                default:
                    this._minWidth = 0;
                    break;
            }
        };
        CommonProgress.prototype.init = function (currentNum, value, max) {
            this.updateProgress(currentNum, value, max, true);
        };
        CommonProgress.prototype.reset = function (value) {
            if (value === void 0) { value = 0; }
            egret.Tween.removeTweens(this.thumb);
            this.thumb.width = value == 0 ? value : this._minWidth;
        };
        CommonProgress.prototype.setMinWidth = function (v) {
            this._minWidth = v;
        };
        Object.defineProperty(CommonProgress.prototype, "max", {
            set: function (value) {
                this._proMax = value;
            },
            enumerable: true,
            configurable: true
        });
        /**跑一次进度重置到0 */
        CommonProgress.prototype.oneTween = function () {
            egret.Tween.get(this.thumb).to({ width: this.width }, 150).call(this.oneTweenCallFun, this);
        };
        CommonProgress.prototype.oneTweenCallFun = function () {
            this.thumb.width = this._minWidth;
        };
        Object.defineProperty(CommonProgress.prototype, "value", {
            /**
             * 设置value,默认max=100
             */
            set: function (value) {
                this._currentNum = 0;
                this.updateProgress(0, value, this._proMax);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommonProgress.prototype, "noTweenValue", {
            /**设置没有Tween动画的value */
            set: function (value) {
                var targetWidth = Math.floor(this.width * value);
                if (targetWidth <= this._minWidth)
                    targetWidth = this._minWidth;
                if (targetWidth >= this._maxWidth)
                    targetWidth = this._maxWidth;
                this.thumb.width = targetWidth;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新进度条显示,当切换角色时:isReset=true,当角色经验增加时:isReset=false,isReversal只在isReset=true时生效
         * 返回预估动画总用时
         */
        CommonProgress.prototype.updateProgress = function (currentNum, value, max, isReset, isReversal) {
            if (isReset === void 0) { isReset = false; }
            if (isReversal === void 0) { isReversal = false; }
            var targetNum = currentNum;
            this._proValue = value;
            this._proMax = max;
            this._maxWidth = this.width;
            var targetWidth = Math.floor(this._maxWidth * value / max);
            if (targetWidth <= this._minWidth)
                targetWidth = this._minWidth;
            if (targetWidth >= this._maxWidth)
                targetWidth = this._maxWidth;
            if (isReset)
                this._currentNum = currentNum;
            var costTime = this.progressTween(targetNum, targetWidth, isReset, isReversal);
            return costTime;
        };
        CommonProgress.prototype.progressTween = function (targetNum, targetWidth, isReset, isReversal) {
            egret.Tween.removeTweens(this.thumb);
            if (isReset) {
                var time;
                if (!isReversal) {
                    if (this.thumb.width >= targetWidth)
                        return 0;
                    this.thumb.width = this._minWidth;
                    time = targetWidth * this._tweenRate;
                }
                else {
                    if (this.thumb.width <= targetWidth)
                        return 0;
                    this.thumb.width = this._maxWidth;
                    time = (this._maxWidth - targetWidth) * this._tweenRate;
                }
                egret.Tween.get(this.thumb).to({ width: targetWidth }, time);
                return time;
            }
            else {
                return this.continuousProgressTween(targetNum, targetWidth);
            }
        };
        CommonProgress.prototype.continuousProgressTween = function (targetNum, targetWidth) {
            var _this = this;
            var tweenTimes = Math.abs(targetNum - this._currentNum) + 1;
            var isUp = (targetNum > this._currentNum) ? true : ((targetNum < this._currentNum) ? false : (this.thumb.width <= targetWidth ? true : false));
            if (this._isLimitMaxTweenTimes)
                if (tweenTimes > this._maxTweenTimes) {
                    this._currentNum = isUp ? (targetNum - this._maxTweenTimes) : (targetNum + this._maxTweenTimes);
                    tweenTimes = this._maxTweenTimes;
                }
            var rate = Math.pow(this._tweenRate2, tweenTimes - 1) * tweenTimes;
            var costTime = 0;
            var lastCostTime = (isUp ? (targetWidth - this._minWidth) : (this._maxWidth - targetNum) * this._tweenRate);
            if (targetNum > this._currentNum) {
                this._currentNum++;
                var time = (this._maxWidth - this.thumb.width) * this._tweenRate / rate;
                costTime = time * (tweenTimes - 1) + lastCostTime;
                egret.Tween.get(this.thumb).to({ width: this._maxWidth }, time).call(function () {
                    _this.thumb.width = _this._minWidth;
                    _this.continuousProgressTween(targetNum, targetWidth);
                }, this);
            }
            else if (targetNum < this._currentNum) {
                this._currentNum--;
                var time = (this.thumb.width - this._minWidth) * this._tweenRate / rate;
                costTime = time * (tweenTimes - 1) + lastCostTime;
                egret.Tween.get(this.thumb).to({ width: this._minWidth }, time).call(function () {
                    _this.thumb.width = _this._maxWidth;
                    _this.continuousProgressTween(targetNum, targetWidth);
                }, this);
            }
            else if (targetNum == this._currentNum) {
                var time = Math.abs((targetWidth - this.thumb.width) * this._tweenRate);
                costTime = time;
                egret.Tween.get(this.thumb).to({ width: targetWidth }, time);
            }
            return costTime;
        };
        return CommonProgress;
    }(ui.CommonProgressSkin));
    components.CommonProgress = CommonProgress;
    __reflect(CommonProgress.prototype, "components.CommonProgress");
})(components || (components = {}));

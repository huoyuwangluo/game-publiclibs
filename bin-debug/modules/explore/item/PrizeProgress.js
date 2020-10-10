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
var item;
(function (item) {
    var TypePrize = (function () {
        function TypePrize() {
        }
        TypePrize.getName = function (type) {
            switch (type) {
                case TypePrize.WOOD1:
                    return "wood";
                case TypePrize.WOOD:
                    return "wood";
                case TypePrize.SILVER:
                    return "silver";
                case TypePrize.COPPER:
                    return "copper";
                case TypePrize.GOLD:
                    return "gold";
                case TypePrize.GOLD1:
                    return "gold1";
                case TypePrize.GOLD2:
                    return "gold2";
            }
            return "";
        };
        TypePrize.WOOD1 = 7; //木箱
        TypePrize.WOOD = 6; //木箱
        TypePrize.SILVER = 5; //铜箱
        TypePrize.COPPER = 4; //银箱
        TypePrize.GOLD = 3; //金箱
        TypePrize.GOLD1 = 2; //金1箱
        TypePrize.GOLD2 = 1; //金2箱
        return TypePrize;
    }());
    item.TypePrize = TypePrize;
    __reflect(TypePrize.prototype, "item.TypePrize");
    var StatePrize = (function () {
        function StatePrize() {
        }
        StatePrize.updateChestState = function (state, needKills, nowNum) {
            //判断是否存在状态为0的箱子 然后当前击杀数是否大于它
            if (state == null) {
                if (nowNum > needKills)
                    return StatePrize.WAIT;
                else
                    return StatePrize.CLOSE;
            }
            return state;
        };
        StatePrize.CLOSE = 0; //显示宝箱 同事宝箱为关闭状态 不可领取
        StatePrize.OPEN = 1; //显示宝箱 同事宝箱为开启状态  已领取
        StatePrize.WAIT = 2; //显示宝箱 同事宝箱为关闭状态 且有提醒特效 可领取
        return StatePrize;
    }());
    item.StatePrize = StatePrize;
    __reflect(StatePrize.prototype, "item.StatePrize");
    var PrizeProgress = (function (_super) {
        __extends(PrizeProgress, _super);
        function PrizeProgress() {
            var _this = _super.call(this) || this;
            _this._isInitializData = false;
            _this._startValue = 0;
            return _this;
        }
        PrizeProgress.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            // this.prorgessBar.$setValue(0);
            this._boxes = [];
        };
        PrizeProgress.prototype.reset = function () {
            if (this._boxes) {
                for (var _i = 0, _a = this._boxes; _i < _a.length; _i++) {
                    var box = _a[_i];
                    if (box.parent)
                        box.parent.removeChild(box);
                    box.reset();
                }
                this._boxes.length = 0;
                this._boxes = null;
            }
            if (this._prizesData) {
                this._prizesData = null;
            }
        };
        /**请先设置基础值 调用initProgress */
        PrizeProgress.prototype.initializeData = function (min, max, prizeVOList) {
            this.prorgessBar.minimum = min;
            this.prorgessBar.maximum = max;
            this._prizesData = prizeVOList;
            this.initializeChildren();
            this._isInitializData = true;
        };
        PrizeProgress.prototype.initializeChildren = function () {
            for (var i = 0; i < this._prizesData.length; i++) {
                var prizeVO = this._prizesData[i];
                if (!this._boxes[i])
                    this._boxes[i] = new item.PrizeBoxMark();
                this._boxes[i].data = prizeVO;
                this._boxes[i].x = this.width * ((prizeVO.mark - this._startValue) / (this.prorgessBar.maximum - this._startValue)) - 20;
                this._boxes[i].y = -5;
                this.gpBoxes.addChild(this._boxes[i]);
            }
        };
        PrizeProgress.prototype.updateBoxX = function () {
            for (var i = 0; i < this._prizesData.length; i++) {
                var prizeVO = this._prizesData[i];
                this._boxes[i].x = this.width * ((prizeVO.mark - this._startValue) / (this.prorgessBar.maximum - this._startValue)) - 20;
            }
        };
        PrizeProgress.prototype.update = function () {
            if (this._boxes) {
                for (var _i = 0, _a = this._boxes; _i < _a.length; _i++) {
                    var box = _a[_i];
                    box.update();
                }
            }
        };
        Object.defineProperty(PrizeProgress.prototype, "min", {
            set: function (v) {
                this.prorgessBar.minimum = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeProgress.prototype, "max", {
            set: function (v) {
                this.prorgessBar.maximum = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeProgress.prototype, "startValue", {
            set: function (value) {
                this._startValue = value;
                this.updateBoxX();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeProgress.prototype, "value", {
            set: function (v) {
                this.prorgessBar.value = this.prorgessBar.maximum * (v - this._startValue) / (this.prorgessBar.maximum - this._startValue);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeProgress.prototype, "prizeBoxes", {
            get: function () {
                return this._boxes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeProgress.prototype, "isInitializData", {
            get: function () {
                return this._isInitializData;
            },
            enumerable: true,
            configurable: true
        });
        return PrizeProgress;
    }(ui.PrizeProgressSkin));
    item.PrizeProgress = PrizeProgress;
    __reflect(PrizeProgress.prototype, "item.PrizeProgress");
})(item || (item = {}));

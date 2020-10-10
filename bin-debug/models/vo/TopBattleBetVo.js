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
var vo;
(function (vo) {
    //巅峰战下注信息
    var TopBattleBetVo = (function (_super) {
        __extends(TopBattleBetVo, _super);
        function TopBattleBetVo() {
            return _super.call(this) || this;
        }
        TopBattleBetVo.prototype.initialize = function () {
            this._betType = 0;
            this._betLeftCount = 0;
            this._betLeftRate = 0;
            this._betRightCount = 0;
            this._betRightRate = 0;
        };
        TopBattleBetVo.prototype.decode = function (data) {
            this._betType = data.BetType;
            this._betLeftCount = data.LeftCount;
            this._betLeftRate = data.LeftRate;
            this._betRightCount = data.RightCount;
            this._betRightRate = data.RightRate;
        };
        Object.defineProperty(TopBattleBetVo.prototype, "betType", {
            get: function () {
                return this._betType;
            },
            set: function (v) {
                this._betType = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleBetVo.prototype, "betLeftCount", {
            get: function () {
                return this._betLeftCount;
            },
            set: function (v) {
                this._betLeftCount = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleBetVo.prototype, "betLeftRate", {
            get: function () {
                return this._betLeftRate;
            },
            set: function (v) {
                this._betLeftRate = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleBetVo.prototype, "betRightCount", {
            get: function () {
                return this._betRightCount;
            },
            set: function (v) {
                this._betRightCount = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleBetVo.prototype, "betRightRate", {
            get: function () {
                return this._betRightRate;
            },
            set: function (v) {
                this._betRightRate = v;
            },
            enumerable: true,
            configurable: true
        });
        TopBattleBetVo.prototype.reset = function () {
            this._betType = 0;
            this._betLeftCount = 0;
            this._betLeftRate = 0;
            this._betRightCount = 0;
            this._betRightRate = 0;
        };
        return TopBattleBetVo;
    }(vo.VOBase));
    vo.TopBattleBetVo = TopBattleBetVo;
    __reflect(TopBattleBetVo.prototype, "vo.TopBattleBetVo");
})(vo || (vo = {}));

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
    //月卡
    var MonthCardVo = (function (_super) {
        __extends(MonthCardVo, _super);
        function MonthCardVo() {
            return _super.call(this) || this;
        }
        MonthCardVo.prototype.initialize = function () {
            this._type = 0;
            this._cardStatus = 0;
            this._totalPay = 0;
            this._leftDays = 0;
            this._doneGotReward = 0;
        };
        MonthCardVo.prototype.reset = function () {
            this._type = 0;
            this._cardStatus = 0;
            this._totalPay = 0;
            this._leftDays = 0;
            this._doneGotReward = 0;
        };
        MonthCardVo.prototype.decode = function (data) {
            this._type = data.Type;
            this._cardStatus = data.CardStatus;
            this._totalPay = data.TotalPay;
            this._leftDays = data.LeftDays;
            this._doneGotReward = data.DoneGotReward;
        };
        Object.defineProperty(MonthCardVo.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonthCardVo.prototype, "cardStatus", {
            get: function () {
                return this._cardStatus;
            },
            set: function (v) {
                this._cardStatus = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonthCardVo.prototype, "totalPay", {
            get: function () {
                return this._totalPay;
            },
            set: function (v) {
                this._totalPay = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonthCardVo.prototype, "leftDays", {
            get: function () {
                return this._leftDays;
            },
            set: function (v) {
                this._leftDays = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonthCardVo.prototype, "doneGotReward", {
            get: function () {
                return this._doneGotReward;
            },
            set: function (v) {
                this._doneGotReward = v;
            },
            enumerable: true,
            configurable: true
        });
        return MonthCardVo;
    }(vo.VOBase));
    vo.MonthCardVo = MonthCardVo;
    __reflect(MonthCardVo.prototype, "vo.MonthCardVo");
})(vo || (vo = {}));

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
    var TradingSellRecordVO = (function (_super) {
        __extends(TradingSellRecordVO, _super);
        function TradingSellRecordVO() {
            return _super.call(this) || this;
        }
        TradingSellRecordVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.reset();
        };
        TradingSellRecordVO.prototype.reset = function () {
            this._buyPlayerId = "";
            this._buyPlayerName = "";
            this._sellPlayerId = "";
            this._sellPlayerName = "";
            this._itemId = "";
            this._count = 0;
            this._price = 0;
            this._buyTime = 0;
        };
        TradingSellRecordVO.prototype.decode = function (data) {
            this._buyPlayerId = data.BuyPlayerId;
            this._buyPlayerName = data.BuyPlayerName;
            this._sellPlayerId = data.SellPlayerId;
            this._sellPlayerName = data.SellPlayerName;
            this._itemId = data.ItemId;
            this._count = data.Count;
            this._price = data.Price;
            this._buyTime = data.BuyTime;
        };
        Object.defineProperty(TradingSellRecordVO.prototype, "buyPlayerId", {
            get: function () {
                return this._buyPlayerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellRecordVO.prototype, "buyPlayerName", {
            get: function () {
                return this._buyPlayerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellRecordVO.prototype, "sellPlayerId", {
            get: function () {
                return this._sellPlayerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellRecordVO.prototype, "sellPlayerName", {
            get: function () {
                return this._sellPlayerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellRecordVO.prototype, "itemId", {
            get: function () {
                return this._itemId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellRecordVO.prototype, "count", {
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellRecordVO.prototype, "price", {
            get: function () {
                return this._price;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellRecordVO.prototype, "buyTime", {
            get: function () {
                return this._buyTime;
            },
            enumerable: true,
            configurable: true
        });
        return TradingSellRecordVO;
    }(vo.VOBase));
    vo.TradingSellRecordVO = TradingSellRecordVO;
    __reflect(TradingSellRecordVO.prototype, "vo.TradingSellRecordVO");
})(vo || (vo = {}));

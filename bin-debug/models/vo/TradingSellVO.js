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
    var TradingSellListVO = (function (_super) {
        __extends(TradingSellListVO, _super);
        function TradingSellListVO() {
            return _super.call(this) || this;
        }
        TradingSellListVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.reset();
        };
        TradingSellListVO.prototype.reset = function () {
            this._orderId = "";
            this._playerId = "";
            this._playerName = "";
            this._itemId = "";
            this._count = 0;
            this._price = 0;
            this._endTime = 0;
        };
        TradingSellListVO.prototype.decode = function (data) {
            this._orderId = data.OrderId;
            this._playerId = data.PlayerId;
            this._playerName = data.PlayerName;
            this._itemId = data.ItemId;
            this._count = data.Count;
            this._price = data.Price;
            this._endTime = data.EndTime;
        };
        Object.defineProperty(TradingSellListVO.prototype, "orderId", {
            get: function () {
                return this._orderId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellListVO.prototype, "playerId", {
            get: function () {
                return this._playerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellListVO.prototype, "playerName", {
            get: function () {
                return this._playerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellListVO.prototype, "itemId", {
            get: function () {
                return this._itemId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellListVO.prototype, "count", {
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellListVO.prototype, "price", {
            get: function () {
                return this._price;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellListVO.prototype, "endTime", {
            get: function () {
                return this._endTime;
            },
            enumerable: true,
            configurable: true
        });
        return TradingSellListVO;
    }(vo.VOBase));
    vo.TradingSellListVO = TradingSellListVO;
    __reflect(TradingSellListVO.prototype, "vo.TradingSellListVO");
})(vo || (vo = {}));

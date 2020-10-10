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
    var TradingSellMyItemVO = (function (_super) {
        __extends(TradingSellMyItemVO, _super);
        function TradingSellMyItemVO() {
            return _super.call(this) || this;
        }
        TradingSellMyItemVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._itemId = "";
            this._itemCount = 0;
            this._templates = null;
        };
        TradingSellMyItemVO.prototype.reset = function () {
            this._itemId = "";
            this._itemCount = 0;
            this._templates = null;
        };
        TradingSellMyItemVO.prototype.decode = function (data) {
            this._itemId = data.ItemId;
            this._itemCount = data.Count;
            this._templates = Templates.getTemplateById(templates.Map.ITEMTRADE, this._itemId);
        };
        Object.defineProperty(TradingSellMyItemVO.prototype, "templates", {
            get: function () {
                return this._templates;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellMyItemVO.prototype, "itemId", {
            get: function () {
                return this._itemId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TradingSellMyItemVO.prototype, "itemCount", {
            get: function () {
                return this._itemCount;
            },
            enumerable: true,
            configurable: true
        });
        return TradingSellMyItemVO;
    }(vo.VOBase));
    vo.TradingSellMyItemVO = TradingSellMyItemVO;
    __reflect(TradingSellMyItemVO.prototype, "vo.TradingSellMyItemVO");
})(vo || (vo = {}));

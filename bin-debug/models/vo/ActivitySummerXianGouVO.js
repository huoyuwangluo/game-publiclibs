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
    var ActivitySummerXianGouVO = (function (_super) {
        __extends(ActivitySummerXianGouVO, _super);
        function ActivitySummerXianGouVO() {
            return _super.call(this) || this;
        }
        ActivitySummerXianGouVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        ActivitySummerXianGouVO.prototype.reset = function () {
            this._holidayBuyId = 0;
            this._holidayBuy = null;
            this._buyCount = 0;
            this._holidayType = 0;
        };
        ActivitySummerXianGouVO.prototype.decode = function (data) {
            this._holidayBuyId = data.GiftId;
            this._buyCount = data.BuyCount;
            this._holidayBuy = Templates.getTemplateById(templates.Map.HOLIDAYBUY, data.GiftId);
            var holidaySeting = Templates.getTemplateById(templates.Map.HOLIDAYSETING, this._holidayBuy.type);
            if (holidaySeting) {
                this._holidayType = holidaySeting.type;
            }
        };
        Object.defineProperty(ActivitySummerXianGouVO.prototype, "holidayType", {
            get: function () {
                return this._holidayType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivitySummerXianGouVO.prototype, "holidayBuyCount", {
            get: function () {
                return this._buyCount;
            },
            set: function (v) {
                this._buyCount = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivitySummerXianGouVO.prototype, "holidayBuyId", {
            get: function () {
                return this._holidayBuyId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivitySummerXianGouVO.prototype, "template", {
            get: function () {
                return this._holidayBuy;
            },
            enumerable: true,
            configurable: true
        });
        return ActivitySummerXianGouVO;
    }(vo.VOBase));
    vo.ActivitySummerXianGouVO = ActivitySummerXianGouVO;
    __reflect(ActivitySummerXianGouVO.prototype, "vo.ActivitySummerXianGouVO");
})(vo || (vo = {}));

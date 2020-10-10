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
    var ActivitySummerMysteryVO = (function (_super) {
        __extends(ActivitySummerMysteryVO, _super);
        function ActivitySummerMysteryVO() {
            return _super.call(this) || this;
        }
        ActivitySummerMysteryVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        ActivitySummerMysteryVO.prototype.reset = function () {
            this._shopId = 0;
            this._shopReward = null;
            this._shopBuyCount = 0;
            this._holidayType = 0;
        };
        ActivitySummerMysteryVO.prototype.decode = function (data) {
            this._shopId = data.ShopId;
            this._shopReward = Templates.getTemplateById(templates.Map.HOLIDAYMYSTERY, data.ShopId);
            this._shopBuyCount = data.BuyCount;
            var holidaySeting = Templates.getTemplateById(templates.Map.HOLIDAYSETING, this._shopReward.type);
            if (holidaySeting) {
                this._holidayType = holidaySeting.type;
            }
        };
        Object.defineProperty(ActivitySummerMysteryVO.prototype, "holidayType", {
            get: function () {
                return this._holidayType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivitySummerMysteryVO.prototype, "shopBuyCount", {
            get: function () {
                return this._shopBuyCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivitySummerMysteryVO.prototype, "shopid", {
            get: function () {
                return this._shopId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivitySummerMysteryVO.prototype, "template", {
            get: function () {
                return this._shopReward;
            },
            enumerable: true,
            configurable: true
        });
        return ActivitySummerMysteryVO;
    }(vo.VOBase));
    vo.ActivitySummerMysteryVO = ActivitySummerMysteryVO;
    __reflect(ActivitySummerMysteryVO.prototype, "vo.ActivitySummerMysteryVO");
})(vo || (vo = {}));

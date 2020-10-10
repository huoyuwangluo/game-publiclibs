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
    var ActivitySummerMysteryRecordVO = (function (_super) {
        __extends(ActivitySummerMysteryRecordVO, _super);
        function ActivitySummerMysteryRecordVO() {
            return _super.call(this) || this;
        }
        ActivitySummerMysteryRecordVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        ActivitySummerMysteryRecordVO.prototype.reset = function () {
            this._shopId = 0;
            this._playerName = null;
        };
        ActivitySummerMysteryRecordVO.prototype.decode = function (data) {
            this._shopId = data.BuyShopId;
            this._playerName = data.PlayerName;
            this._shopReward = Templates.getTemplateById(templates.Map.HOLIDAYMYSTERY, data.BuyShopId);
        };
        Object.defineProperty(ActivitySummerMysteryRecordVO.prototype, "playerName", {
            get: function () {
                return this._playerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivitySummerMysteryRecordVO.prototype, "shopid", {
            get: function () {
                return this._shopId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivitySummerMysteryRecordVO.prototype, "template", {
            get: function () {
                return this._shopReward;
            },
            enumerable: true,
            configurable: true
        });
        return ActivitySummerMysteryRecordVO;
    }(vo.VOBase));
    vo.ActivitySummerMysteryRecordVO = ActivitySummerMysteryRecordVO;
    __reflect(ActivitySummerMysteryRecordVO.prototype, "vo.ActivitySummerMysteryRecordVO");
})(vo || (vo = {}));

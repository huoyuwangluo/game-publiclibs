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
    var KingWarCityVO = (function (_super) {
        __extends(KingWarCityVO, _super);
        function KingWarCityVO() {
            return _super.call(this) || this;
        }
        KingWarCityVO.prototype.initialize = function (tmp) {
            this._cityId = tmp.CityId;
            this._country = tmp.Country;
            this._seizeRewardState = tmp.SeizeRewardStatus;
        };
        KingWarCityVO.prototype.reset = function () {
            this._cityId = 0;
            this._country = 0;
            this._seizeRewardState = 0;
        };
        Object.defineProperty(KingWarCityVO.prototype, "cityTemp", {
            get: function () {
                return Templates.getTemplateById(templates.Map.KINGWARCITY, this._cityId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarCityVO.prototype, "cityId", {
            get: function () {
                return this._cityId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarCityVO.prototype, "country", {
            get: function () {
                return this._country;
            },
            set: function (v) {
                this._country = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarCityVO.prototype, "seizeRewardState", {
            /**占领宝箱状态，0：无，1：可领取，2：已领取 */
            get: function () {
                return this._seizeRewardState;
            },
            set: function (v) {
                this._seizeRewardState = v;
            },
            enumerable: true,
            configurable: true
        });
        return KingWarCityVO;
    }(vo.VOBase));
    vo.KingWarCityVO = KingWarCityVO;
    __reflect(KingWarCityVO.prototype, "vo.KingWarCityVO");
})(vo || (vo = {}));

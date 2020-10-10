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
    var SummerLeiJiDengLuVO = (function (_super) {
        __extends(SummerLeiJiDengLuVO, _super);
        function SummerLeiJiDengLuVO() {
            return _super.call(this) || this;
        }
        SummerLeiJiDengLuVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        SummerLeiJiDengLuVO.prototype.reset = function () {
            this._holidayRewardId = 0;
            this._holidayReward = null;
            this._holidayRewardState = 0;
            this._holidayType = 0;
        };
        SummerLeiJiDengLuVO.prototype.decode = function (data) {
            this._holidayRewardId = data.RewardCfgId;
            this._holidayReward = Templates.getTemplateById(templates.Map.HOLIDAYREWARD, data.RewardCfgId);
            this._holidayRewardState = data.State;
            var holidaySeting = Templates.getTemplateById(templates.Map.HOLIDAYSETING, this._holidayReward.type);
            if (holidaySeting) {
                this._holidayType = holidaySeting.type;
            }
        };
        Object.defineProperty(SummerLeiJiDengLuVO.prototype, "holidayType", {
            get: function () {
                return this._holidayType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SummerLeiJiDengLuVO.prototype, "holidayRewardState", {
            /**1可领 2未达成 3 已领取*/
            get: function () {
                return this._holidayRewardState;
            },
            set: function (v) {
                this._holidayRewardState = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SummerLeiJiDengLuVO.prototype, "holidayRewardId", {
            get: function () {
                return this._holidayRewardId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SummerLeiJiDengLuVO.prototype, "template", {
            get: function () {
                return this._holidayReward;
            },
            enumerable: true,
            configurable: true
        });
        return SummerLeiJiDengLuVO;
    }(vo.VOBase));
    vo.SummerLeiJiDengLuVO = SummerLeiJiDengLuVO;
    __reflect(SummerLeiJiDengLuVO.prototype, "vo.SummerLeiJiDengLuVO");
})(vo || (vo = {}));

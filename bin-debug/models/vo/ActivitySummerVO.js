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
    var ActivitySummerVO = (function (_super) {
        __extends(ActivitySummerVO, _super);
        function ActivitySummerVO() {
            return _super.call(this) || this;
        }
        ActivitySummerVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        ActivitySummerVO.prototype.reset = function () {
            this._holidayRewardId = 0;
            this._holidayReward = null;
            this._holidayRewardState = 0;
            this._holidayType = 0;
        };
        ActivitySummerVO.prototype.decode = function (data) {
            this._holidayRewardId = data.RewardCfgId;
            if (data instanceof n.ProtoHolidayRewardInfo) {
                this._holidayReward = Templates.getTemplateById(templates.Map.HOLIDAYREWARD, data.RewardCfgId);
            }
            this._holidayRewardState = data.State;
            if (data instanceof n.ProtoHolidayRewardInfo) {
                var holidaySeting = Templates.getTemplateById(templates.Map.HOLIDAYSETING, this._holidayReward.type);
                if (holidaySeting) {
                    this._holidayType = holidaySeting.type;
                }
            }
        };
        Object.defineProperty(ActivitySummerVO.prototype, "holidayType", {
            get: function () {
                return this._holidayType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivitySummerVO.prototype, "holidayRewardState", {
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
        Object.defineProperty(ActivitySummerVO.prototype, "holidayRewardId", {
            get: function () {
                return this._holidayRewardId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivitySummerVO.prototype, "template", {
            get: function () {
                return this._holidayReward;
            },
            enumerable: true,
            configurable: true
        });
        return ActivitySummerVO;
    }(vo.VOBase));
    vo.ActivitySummerVO = ActivitySummerVO;
    __reflect(ActivitySummerVO.prototype, "vo.ActivitySummerVO");
})(vo || (vo = {}));

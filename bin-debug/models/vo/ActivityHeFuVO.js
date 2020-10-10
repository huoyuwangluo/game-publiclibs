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
    var ActivityHeFuVO = (function (_super) {
        __extends(ActivityHeFuVO, _super);
        function ActivityHeFuVO() {
            return _super.call(this) || this;
        }
        ActivityHeFuVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        ActivityHeFuVO.prototype.reset = function () {
            this._hefuRewardState = 0;
            this._hefuReward = null;
            this._hefuRewardId = 0;
            this._hefuType = 0;
        };
        ActivityHeFuVO.prototype.decode = function (data, type) {
            this._hefuRewardId = data.HeFuGiftId;
            this._hefuRewardState = data.State;
            this._hefuType = type;
            if (type == 101 || type == 102 || type == 906 || type == 104 || type == 103) {
                this._hefuReward = Templates.getTemplateById(templates.Map.MERGEREWARD, data.HeFuGiftId);
            }
            if (type == 201 || type == 202) {
                this._hefuReward = Templates.getTemplateById(templates.Map.MERGEBUY, data.HeFuGiftId);
            }
            if (type == 302) {
                this._hefuReward = Templates.getTemplateById(templates.Map.MERGERANK, data.HeFuGiftId);
            }
        };
        Object.defineProperty(ActivityHeFuVO.prototype, "hefuType", {
            get: function () {
                return this._hefuType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivityHeFuVO.prototype, "hefuRewardState", {
            /**1可领 2未达成 3 已领取*/
            get: function () {
                return this._hefuRewardState;
            },
            set: function (v) {
                this._hefuRewardState = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivityHeFuVO.prototype, "hefuRewardId", {
            get: function () {
                return this._hefuRewardId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivityHeFuVO.prototype, "template", {
            get: function () {
                return this._hefuReward;
            },
            enumerable: true,
            configurable: true
        });
        return ActivityHeFuVO;
    }(vo.VOBase));
    vo.ActivityHeFuVO = ActivityHeFuVO;
    __reflect(ActivityHeFuVO.prototype, "vo.ActivityHeFuVO");
})(vo || (vo = {}));

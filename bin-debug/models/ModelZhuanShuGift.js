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
var mo;
(function (mo) {
    var ModelZhuanShuGift = (function (_super) {
        __extends(ModelZhuanShuGift, _super);
        function ModelZhuanShuGift() {
            return _super.call(this) || this;
        }
        ModelZhuanShuGift.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._hasGift = false;
            this._giftId = this._rechargeStatus = this._leftTime = this._rechargeId = this._rechargeRMB = 0;
            this.requestGetGiftInfo();
            n.net.onRoute(n.MessageMap.NOTIFYPERSONALGIFTINFO, utils.Handler.create(this, this.notifyGiftInfo, null, false));
        };
        ModelZhuanShuGift.prototype.notifyGiftInfo = function (data) {
            this._hasGift = data.HasGift > 0 ? true : false;
            this.updataInfo(data.GiftInfo);
        };
        ModelZhuanShuGift.prototype.updataInfo = function (data) {
            this._giftId = data.GiftId;
            this._rechargeStatus = data.RechargeStatus;
            this._leftTime = data.LeftTime;
            this._rechargeId = data.RechargeId;
            this._rechargeRMB = data.RechargeRMB;
            this._rewardStr = data.RewardStr;
            if (this._leftTime > 0) {
                utils.timer.clear(this, this.timerZhuanShuHandler);
                utils.timer.loop(1000, this, this.timerZhuanShuHandler);
            }
            data.autoRecover = false;
            //logger.log("活动是否存在==", this._hasGift);
            //logger.log("活动数据==", data);
            this.dispatchEventWith(mo.ModelZhuanShuGift.CHANGE_GIFT_INFO);
        };
        ModelZhuanShuGift.prototype.timerZhuanShuHandler = function () {
            this._leftTime--;
            if (this._leftTime <= 0) {
                this._leftTime = 0;
                utils.timer.clear(this, this.timerZhuanShuHandler);
                this.requestGetGiftInfo();
                return;
            }
        };
        Object.defineProperty(ModelZhuanShuGift.prototype, "rewardStr", {
            get: function () {
                return this._rewardStr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelZhuanShuGift.prototype, "hasGift", {
            get: function () {
                return this._hasGift;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelZhuanShuGift.prototype, "giftId", {
            get: function () {
                return this._giftId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelZhuanShuGift.prototype, "rechargeStatus", {
            get: function () {
                return this._rechargeStatus;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelZhuanShuGift.prototype, "leftTime", {
            get: function () {
                return this._leftTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelZhuanShuGift.prototype, "rechargeId", {
            get: function () {
                return this._rechargeId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelZhuanShuGift.prototype, "rechargeRMB", {
            get: function () {
                return this._rechargeRMB;
            },
            enumerable: true,
            configurable: true
        });
        /**请求定制礼包信息*/
        ModelZhuanShuGift.prototype.requestGetGiftInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_PG_GetGiftInfo);
            this.request(n.MessageMap.C2G_PG_GETGIFTINFO, msg, utils.Handler.create(this, function (data) {
                _this._hasGift = data.HasGift > 0 ? true : false;
                _this.updataInfo(data.GiftInfo);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**领取定制礼包*/
        ModelZhuanShuGift.prototype.requestGetGiftReward = function (rewardIdx, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_PG_GetGiftReward);
            //msg.RewardIdx = rewardIdx;
            this.request(n.MessageMap.C2G_PG_GETGIFTREWARD, msg, utils.Handler.create(this, function (data) {
                _this._hasGift = data.HasGift > 0 ? true : false;
                _this.updataInfo(data.GiftInfo);
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelZhuanShuGift.CHANGE_GIFT_INFO = "CHANGE_GIFT_INFO";
        return ModelZhuanShuGift;
    }(mo.ModelBase));
    mo.ModelZhuanShuGift = ModelZhuanShuGift;
    __reflect(ModelZhuanShuGift.prototype, "mo.ModelZhuanShuGift");
})(mo || (mo = {}));

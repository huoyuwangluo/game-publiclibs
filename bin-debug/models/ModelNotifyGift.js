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
    var ModelNotifyGift = (function (_super) {
        __extends(ModelNotifyGift, _super);
        function ModelNotifyGift() {
            var _this = _super.call(this) || this;
            _this._newGift1 = false;
            _this._id1 = 0;
            _this._newGift2 = false;
            _this._id2 = 0;
            return _this;
        }
        ModelNotifyGift.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._notifyGiftVoArr = [];
            this.requestGetGiftInfo();
            n.net.onRoute(n.MessageMap.NOTIFYPUSHGIFT, utils.Handler.create(this, this.notifyGiftInfo, null, false));
        };
        Object.defineProperty(ModelNotifyGift.prototype, "newGift1", {
            get: function () {
                return this._newGift1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelNotifyGift.prototype, "id1", {
            get: function () {
                return this._id1;
            },
            enumerable: true,
            configurable: true
        });
        ModelNotifyGift.prototype.setNewGift1 = function (v, id) {
            this._newGift1 = v;
            this._id1 = id;
            this.dispatchEventWith(mo.ModelNotifyGift.NEW_GIFT_INFO);
        };
        Object.defineProperty(ModelNotifyGift.prototype, "newGift2", {
            get: function () {
                return this._newGift2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelNotifyGift.prototype, "id2", {
            get: function () {
                return this._id2;
            },
            enumerable: true,
            configurable: true
        });
        ModelNotifyGift.prototype.setNewGift2 = function (v, id) {
            this._newGift2 = v;
            this._id2 = id;
            this.dispatchEventWith(mo.ModelNotifyGift.NEW_GIFT_INFO);
        };
        ModelNotifyGift.prototype.notifyGiftInfo = function (data) {
            this.updataInfo(data.NewGiftInfo);
        };
        ModelNotifyGift.prototype.infoDataInfo = function (data) {
            this._notifyGiftVoArr = [];
            for (var i = 0; i < data.length; i++) {
                var tempVo = vo.fromPool(vo.NotifyGiftVO, data[i]);
                this._notifyGiftVoArr.push(tempVo);
            }
            this.dispatchEventWith(mo.ModelNotifyGift.INIT_GIFT_INFO);
            GameModels.state.updateState(GameRedState.XIANSHI_GIFT);
            GameModels.state.updateState(GameRedState.JUEBAN_GIFT);
        };
        ModelNotifyGift.prototype.updataInfo = function (data) {
            var isHash = false;
            for (var i = this._notifyGiftVoArr.length - 1; i >= 0; i--) {
                if (this._notifyGiftVoArr[i].refId == data.RefId) {
                    isHash = true;
                    this._notifyGiftVoArr[i].isRecharge = data.IsRecharge;
                    this._notifyGiftVoArr[i].isGotReward = data.IsGotReward;
                    this._notifyGiftVoArr[i].leftTime = data.LeftTime;
                }
            }
            if (!isHash && data.LeftTime > 0) {
                var tempVo = vo.fromPool(vo.NotifyGiftVO, data);
                this._notifyGiftVoArr.push(tempVo);
                tempVo.temp.giftType == 1 ? this.setNewGift1(true, tempVo.refId) : this.setNewGift2(true, tempVo.refId);
            }
            this.dispatchEventWith(mo.ModelNotifyGift.CHANGE_GIFT_INFO);
            GameModels.state.updateState(GameRedState.XIANSHI_GIFT);
            GameModels.state.updateState(GameRedState.JUEBAN_GIFT);
        };
        ModelNotifyGift.prototype.getNotifyGiftVoArrByType = function (type) {
            var giftArr = [];
            for (var i = 0; i < this._notifyGiftVoArr.length; i++) {
                if (this._notifyGiftVoArr[i].temp.giftType == type) {
                    giftArr.push(this._notifyGiftVoArr[i]);
                }
            }
            return giftArr;
        };
        // public getNewestNotifyGiftVoArrByType(type: number): number {
        // 	var index: number = 0;
        // 	var actTime: number = 0;
        // 	for (var i = 0; i < this._notifyGiftVoArr.length; i++) {
        // 		if (this._notifyGiftVoArr[i].temp.giftType == type) {
        // 			if (actTime <= 0) {
        // 				actTime = this._notifyGiftVoArr[i].activeTime;
        // 				index = i;
        // 			} else {
        // 				if (this._notifyGiftVoArr[i].activeTime > actTime) {
        // 					index = i;
        // 				}
        // 			}
        // 		}
        // 	}
        // 	return index;
        // }
        ModelNotifyGift.prototype.checkRedPoint = function (type) {
            var giftArr = this.getNotifyGiftVoArrByType(type);
            for (var i = 0; i < giftArr.length; i++) {
                if (giftArr[i].isRedPoint) {
                    return true;
                }
            }
            return false;
        };
        /**请求推送礼包信息*/
        ModelNotifyGift.prototype.requestGetGiftInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_PushGift_Info);
            this.request(n.MessageMap.C2G_PUSHGIFT_INFO, msg, utils.Handler.create(this, function (data) {
                _this.infoDataInfo(data.GiftList);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**领取推送礼包*/
        ModelNotifyGift.prototype.requestGetGiftReward = function (refId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_PushGift_GetReward);
            msg.RefId = refId;
            this.request(n.MessageMap.C2G_PUSHGIFT_GETREWARD, msg, utils.Handler.create(this, function (data) {
                _this.updataInfo(data.GiftInfo);
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelNotifyGift.CHANGE_GIFT_INFO = "CHANGE_GIFT_INFO";
        ModelNotifyGift.INIT_GIFT_INFO = "INIT_GIFT_INFO";
        ModelNotifyGift.NEW_GIFT_INFO = "NEW_GIFT_INFO";
        return ModelNotifyGift;
    }(mo.ModelBase));
    mo.ModelNotifyGift = ModelNotifyGift;
    __reflect(ModelNotifyGift.prototype, "mo.ModelNotifyGift");
})(mo || (mo = {}));

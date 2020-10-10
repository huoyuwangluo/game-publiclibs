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
    var OuYuXianRenVO = (function (_super) {
        __extends(OuYuXianRenVO, _super);
        function OuYuXianRenVO() {
            return _super.call(this) || this;
        }
        OuYuXianRenVO.prototype.initialize = function (data) {
            this._step = data.Step;
            this._type = data.Type;
            this._rewardIndex = data.RewardIndex;
            this._rewardStr = data.RewardStr;
            this._canGetLeftTime = data.CanGetLeftTime;
            this._giftStatus = data.GiftStatus;
        };
        OuYuXianRenVO.prototype.reset = function () {
            this._step = 0;
            this._type = 0;
            this._rewardIndex = 0;
            this._rewardStr = "";
            this._canGetLeftTime = 0;
            this._giftStatus = 0;
        };
        Object.defineProperty(OuYuXianRenVO.prototype, "step", {
            get: function () {
                return this._step;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OuYuXianRenVO.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OuYuXianRenVO.prototype, "rewardIndex", {
            get: function () {
                return this._rewardIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OuYuXianRenVO.prototype, "rewardStr", {
            get: function () {
                return this._rewardStr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OuYuXianRenVO.prototype, "canGetLeftTime", {
            get: function () {
                return this._canGetLeftTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OuYuXianRenVO.prototype, "giftStatus", {
            get: function () {
                return this._giftStatus;
            },
            enumerable: true,
            configurable: true
        });
        return OuYuXianRenVO;
    }(vo.VOBase));
    vo.OuYuXianRenVO = OuYuXianRenVO;
    __reflect(OuYuXianRenVO.prototype, "vo.OuYuXianRenVO");
})(vo || (vo = {}));

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
    var NotifyGiftVO = (function (_super) {
        __extends(NotifyGiftVO, _super);
        function NotifyGiftVO() {
            return _super.call(this) || this;
        }
        NotifyGiftVO.prototype.initialize = function (data) {
            this._refId = data.RefId;
            this._isGotReward = data.IsGotReward;
            this._isRecharge = data.IsRecharge;
            this._leftTime = data.LeftTime;
            this._activeTime = data.ActiveTime;
        };
        NotifyGiftVO.prototype.reset = function () {
            this._refId = 0;
            this._isGotReward = 0;
            this._isRecharge = 0;
            this._leftTime = 0;
            this._activeTime = 0;
        };
        Object.defineProperty(NotifyGiftVO.prototype, "refId", {
            get: function () {
                return this._refId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyGiftVO.prototype, "isGotReward", {
            get: function () {
                return this._isGotReward;
            },
            set: function (v) {
                this._isGotReward = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyGiftVO.prototype, "isRecharge", {
            get: function () {
                return this._isRecharge;
            },
            set: function (v) {
                this._isRecharge = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyGiftVO.prototype, "leftTime", {
            get: function () {
                return this._leftTime;
            },
            set: function (v) {
                this._leftTime = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyGiftVO.prototype, "activeTime", {
            get: function () {
                return this._activeTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyGiftVO.prototype, "temp", {
            get: function () {
                var temp = Templates.getTemplateById(templates.Map.PUSHGIFT, this._refId);
                return temp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyGiftVO.prototype, "rechargeTemp", {
            get: function () {
                var temp = Templates.getTemplateById(templates.Map.PUSHGIFT, this._refId);
                return Templates.getTemplateById(templates.Map.GAMERECHARGE, temp.rechargeId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyGiftVO.prototype, "isRedPoint", {
            get: function () {
                return this._isRecharge && !this._isGotReward;
            },
            enumerable: true,
            configurable: true
        });
        return NotifyGiftVO;
    }(vo.VOBase));
    vo.NotifyGiftVO = NotifyGiftVO;
    __reflect(NotifyGiftVO.prototype, "vo.NotifyGiftVO");
})(vo || (vo = {}));

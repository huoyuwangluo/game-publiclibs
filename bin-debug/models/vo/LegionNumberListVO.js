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
    var LegionNumberListVO = (function (_super) {
        __extends(LegionNumberListVO, _super);
        function LegionNumberListVO() {
            return _super.call(this) || this;
        }
        LegionNumberListVO.prototype.initialize = function (data) {
            data.autoRecover = false;
            this._legionData = data;
        };
        LegionNumberListVO.prototype.reset = function () {
            if (this._legionData) {
                this._legionData.reset();
                n.MessagePool.to(this._legionData);
                this._legionData = null;
            }
        };
        Object.defineProperty(LegionNumberListVO.prototype, "playerId", {
            get: function () {
                return this._legionData.PlayerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionNumberListVO.prototype, "playerName", {
            get: function () {
                return this._legionData.PlayerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionNumberListVO.prototype, "level", {
            get: function () {
                return this._legionData.Level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionNumberListVO.prototype, "fightPower", {
            get: function () {
                return this._legionData.FightPower;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionNumberListVO.prototype, "wuguan", {
            get: function () {
                return this._legionData.WuGuan;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionNumberListVO.prototype, "wenguan", {
            get: function () {
                return this._legionData.WenGuan;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionNumberListVO.prototype, "vip", {
            get: function () {
                return this._legionData.Vip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionNumberListVO.prototype, "lastLoginType", {
            /**0是7天前，1是3天前，2是昨天，3是今天 4是在线 */
            get: function () {
                return this._legionData.LastLoginType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionNumberListVO.prototype, "online", {
            get: function () {
                return this._legionData.Online;
            },
            enumerable: true,
            configurable: true
        });
        return LegionNumberListVO;
    }(vo.VOBase));
    vo.LegionNumberListVO = LegionNumberListVO;
    __reflect(LegionNumberListVO.prototype, "vo.LegionNumberListVO");
})(vo || (vo = {}));

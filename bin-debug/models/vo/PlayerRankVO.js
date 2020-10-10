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
    var PlayerRankVO = (function (_super) {
        __extends(PlayerRankVO, _super);
        function PlayerRankVO() {
            return _super.call(this) || this;
        }
        PlayerRankVO.prototype.initialize = function (data, ranking, type) {
            this._playerData = data;
            this._ranking = ranking;
            this._type = type;
        };
        Object.defineProperty(PlayerRankVO.prototype, "playerData", {
            get: function () {
                return this._playerData;
            },
            set: function (data) {
                this._playerData = data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerRankVO.prototype, "ranking", {
            get: function () {
                return this._ranking;
            },
            set: function (data) {
                this._ranking = data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerRankVO.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        PlayerRankVO.prototype.reset = function () {
            this._playerData = null;
            this._ranking = 0;
        };
        return PlayerRankVO;
    }(vo.VOBase));
    vo.PlayerRankVO = PlayerRankVO;
    __reflect(PlayerRankVO.prototype, "vo.PlayerRankVO");
})(vo || (vo = {}));

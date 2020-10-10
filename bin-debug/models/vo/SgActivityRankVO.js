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
    var SgActivityRankVO = (function (_super) {
        __extends(SgActivityRankVO, _super);
        function SgActivityRankVO() {
            return _super.call(this) || this;
        }
        SgActivityRankVO.prototype.initialize = function (data) {
            this._rank = data.Rank;
            this._playerId = data.PlayerId;
            this._playerName = data.PlayerName;
            this._country = data.Country;
            this._score = data.Value;
            this._weaponViewId = data.WeaponViewId;
            this._clothViewId = data.ClothViewId;
            this._headIcon = data.HeadIcon;
        };
        SgActivityRankVO.prototype.reset = function () {
            this._rank = 0;
            this._playerId = null;
            this._playerName = null;
            this._country = -1;
            this._score = 0;
            this._weaponViewId = this._clothViewId = null;
            this._headIcon = 0;
        };
        Object.defineProperty(SgActivityRankVO.prototype, "rank", {
            get: function () {
                return this._rank;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRankVO.prototype, "country", {
            get: function () {
                return this._country;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRankVO.prototype, "score", {
            get: function () {
                return this._score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRankVO.prototype, "playerId", {
            get: function () {
                return this._playerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRankVO.prototype, "playerName", {
            get: function () {
                return this._playerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRankVO.prototype, "weaponViewId", {
            get: function () {
                return this._weaponViewId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRankVO.prototype, "clothViewId", {
            get: function () {
                return this._clothViewId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRankVO.prototype, "headIcon", {
            get: function () {
                return this._headIcon;
            },
            enumerable: true,
            configurable: true
        });
        return SgActivityRankVO;
    }(vo.VOBase));
    vo.SgActivityRankVO = SgActivityRankVO;
    __reflect(SgActivityRankVO.prototype, "vo.SgActivityRankVO");
})(vo || (vo = {}));

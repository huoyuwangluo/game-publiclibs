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
    //巅峰战人员信息
    var TopBattlePlayerVo = (function (_super) {
        __extends(TopBattlePlayerVo, _super);
        function TopBattlePlayerVo() {
            return _super.call(this) || this;
        }
        TopBattlePlayerVo.prototype.initialize = function () {
            this._playerId = "";
            this._playerName = "";
            this._head = 0;
            this._playerFight = 0;
            this._moBaiCount = 0;
            this._ranking = 0;
            this._level = 0;
            this._weaponId = "";
            this._clothId = "";
            this._wingId = "";
        };
        TopBattlePlayerVo.prototype.decode = function (data, ranking) {
            this._playerId = data.PlayerId;
            this._playerName = data.PlayerName;
            this._head = data.Head;
            this._playerFight = data.FightValue;
            this._moBaiCount = data.WorshipTotal;
            this._ranking = ranking;
            this._level = data.Level;
            this._weaponId = data.PlayerWeaponViewId;
            this._clothId = data.PlayerClothViewId;
            this._wingId = data.PlayerWingViewId;
        };
        Object.defineProperty(TopBattlePlayerVo.prototype, "playerId", {
            get: function () {
                return this._playerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattlePlayerVo.prototype, "playerName", {
            get: function () {
                return this._playerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattlePlayerVo.prototype, "head", {
            get: function () {
                return this._head;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattlePlayerVo.prototype, "playerFight", {
            get: function () {
                return this._playerFight;
            },
            set: function (v) {
                this._playerFight = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattlePlayerVo.prototype, "moBaiCount", {
            get: function () {
                return this._moBaiCount;
            },
            set: function (v) {
                this._moBaiCount = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattlePlayerVo.prototype, "ranking", {
            get: function () {
                return this._ranking;
            },
            set: function (v) {
                this._ranking = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattlePlayerVo.prototype, "level", {
            get: function () {
                return this._level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattlePlayerVo.prototype, "weaponId", {
            get: function () {
                return this._weaponId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattlePlayerVo.prototype, "clothId", {
            get: function () {
                return this._clothId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattlePlayerVo.prototype, "wingId", {
            get: function () {
                return this._wingId;
            },
            enumerable: true,
            configurable: true
        });
        TopBattlePlayerVo.prototype.reset = function () {
            this._playerId = "";
            this._playerName = "";
            this._head = 0;
            this._playerFight = 0;
            this._moBaiCount = 0;
            this._ranking = 0;
            this._level = 0;
            this._weaponId = "";
            this._clothId = "";
            this._wingId = "";
        };
        return TopBattlePlayerVo;
    }(vo.VOBase));
    vo.TopBattlePlayerVo = TopBattlePlayerVo;
    __reflect(TopBattlePlayerVo.prototype, "vo.TopBattlePlayerVo");
})(vo || (vo = {}));

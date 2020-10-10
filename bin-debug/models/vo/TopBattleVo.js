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
    //巅峰战
    var TopBattleVo = (function (_super) {
        __extends(TopBattleVo, _super);
        function TopBattleVo() {
            return _super.call(this) || this;
        }
        TopBattleVo.prototype.initialize = function () {
            this._roomId = "";
            this._position = 0;
            this._battleStep = 0;
            this._winerId = "";
            this._status = 0;
            this._leftPlayer = null;
            this._rightPlayer = null;
            this._players = [];
        };
        TopBattleVo.prototype.decode = function (data) {
            data.autoRecover = false;
            this._players = [];
            this._roomId = data.RoomId;
            this._position = data.Position;
            this._battleStep = data.BattleStep;
            this._winerId = data.WinerId;
            this._leftPlayer = vo.fromPool(vo.TopBattlePlayerVo);
            this._leftPlayer.decode(data.LeftPlayer);
            this._rightPlayer = vo.fromPool(vo.TopBattlePlayerVo);
            this._rightPlayer.decode(data.RightPlayer);
            this._status = data.Status;
            this._players.push(this._leftPlayer);
            this._players.push(this._rightPlayer);
        };
        Object.defineProperty(TopBattleVo.prototype, "roomId", {
            get: function () {
                return this._roomId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleVo.prototype, "position", {
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleVo.prototype, "battleStep", {
            get: function () {
                return this._battleStep;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleVo.prototype, "winerId", {
            get: function () {
                return this._winerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleVo.prototype, "status", {
            get: function () {
                return this._status;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleVo.prototype, "leftPlayer", {
            get: function () {
                return this._leftPlayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleVo.prototype, "rightPlayer", {
            get: function () {
                return this._rightPlayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleVo.prototype, "players", {
            get: function () {
                return this._players;
            },
            enumerable: true,
            configurable: true
        });
        TopBattleVo.prototype.reset = function () {
            this._roomId = "";
            this._position = 0;
            this._battleStep = 0;
            this._winerId = "";
            this._status = 0;
            this._leftPlayer = null;
            this._rightPlayer = null;
            this._players = [];
        };
        return TopBattleVo;
    }(vo.VOBase));
    vo.TopBattleVo = TopBattleVo;
    __reflect(TopBattleVo.prototype, "vo.TopBattleVo");
})(vo || (vo = {}));

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
    //巅峰战下注记录
    var TopBattleBetRecordVo = (function (_super) {
        __extends(TopBattleBetRecordVo, _super);
        function TopBattleBetRecordVo() {
            return _super.call(this) || this;
        }
        TopBattleBetRecordVo.prototype.initialize = function () {
            this._battleStep = 0;
            this._betPlayerId = "";
            this._betPlayerName = "";
            this._betCount = 0;
            this._result = 0;
            this._getBetCount = 0;
            this._playerId = "";
        };
        TopBattleBetRecordVo.prototype.decode = function (data) {
            this._battleStep = data.BattleStep;
            this._betPlayerId = data.BetPlayerId;
            this._betPlayerName = data.BetPlayerName;
            this._betCount = data.BetCount;
            this._result = data.Result;
            this._getBetCount = data.GetCount;
            this._playerId = data.PlayerId;
        };
        Object.defineProperty(TopBattleBetRecordVo.prototype, "battleStep", {
            get: function () {
                return this._battleStep;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleBetRecordVo.prototype, "betPlayerId", {
            get: function () {
                return this._betPlayerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleBetRecordVo.prototype, "betPlayerName", {
            get: function () {
                return this._betPlayerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleBetRecordVo.prototype, "betCount", {
            get: function () {
                return this._betCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleBetRecordVo.prototype, "result", {
            get: function () {
                return this._result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleBetRecordVo.prototype, "getBetCount", {
            get: function () {
                return this._getBetCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattleBetRecordVo.prototype, "playerId", {
            get: function () {
                return this._playerId;
            },
            enumerable: true,
            configurable: true
        });
        TopBattleBetRecordVo.prototype.reset = function () {
            this._battleStep = 0;
            this._betPlayerId = "";
            this._betPlayerName = "";
            this._betCount = 0;
            this._result = 0;
            this._getBetCount = 0;
            this._playerId = "";
        };
        return TopBattleBetRecordVo;
    }(vo.VOBase));
    vo.TopBattleBetRecordVo = TopBattleBetRecordVo;
    __reflect(TopBattleBetRecordVo.prototype, "vo.TopBattleBetRecordVo");
})(vo || (vo = {}));

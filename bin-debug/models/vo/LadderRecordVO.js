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
    var LadderRecordVO = (function (_super) {
        __extends(LadderRecordVO, _super);
        function LadderRecordVO() {
            return _super.call(this) || this;
        }
        LadderRecordVO.prototype.initialize = function (data) {
            this._playerId = data.PlayerId;
            this._playerName = data.PlayerName;
            this._head = data.Head;
            this._action = data.Action;
            this._result = data.Result;
            this._scoreChange = data.ScoreChange;
            this._battleTime = data.BattleTime;
        };
        LadderRecordVO.prototype.reset = function () {
            this._playerId = "";
            this._playerName = "";
            this._head = 0;
            this._action = 0;
            this._result = 0;
            this._scoreChange = 0;
            this._battleTime = 0;
        };
        Object.defineProperty(LadderRecordVO.prototype, "playerName", {
            get: function () {
                return this._playerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderRecordVO.prototype, "playerId", {
            get: function () {
                return this._playerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderRecordVO.prototype, "head", {
            get: function () {
                return this._head;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderRecordVO.prototype, "action", {
            /**1进攻 0防守 */
            get: function () {
                return this._action;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderRecordVO.prototype, "result", {
            /**1胜利 0失败 */
            get: function () {
                return this._result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderRecordVO.prototype, "scoreChange", {
            get: function () {
                return this._scoreChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderRecordVO.prototype, "battleTime", {
            get: function () {
                return this._battleTime;
            },
            enumerable: true,
            configurable: true
        });
        return LadderRecordVO;
    }(vo.VOBase));
    vo.LadderRecordVO = LadderRecordVO;
    __reflect(LadderRecordVO.prototype, "vo.LadderRecordVO");
})(vo || (vo = {}));

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
    var ModelRanking = (function (_super) {
        __extends(ModelRanking, _super);
        function ModelRanking() {
            return _super.call(this) || this;
        }
        ModelRanking.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._myRank = 0;
            this._myScore = 0;
            this.requestAllRankOneData();
        };
        ModelRanking.prototype.updateFirstAndLaterData = function (data) {
            this._laterPlayerData = [];
            var scoreData = data.ScoreData;
            var type = dialog.ranking.TypeRanking.getRankingRely(data.SortboardType);
            if (scoreData.length > 0)
                this._onePlayerData = vo.fromPool(vo.PlayerRankVO, scoreData[0], 1, type);
            else
                this._onePlayerData = null;
            for (var i = 0; i < scoreData.length; i++) {
                this._laterPlayerData.push(vo.fromPool(vo.PlayerRankVO, scoreData[i], i + 1, type));
            }
        };
        Object.defineProperty(ModelRanking.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelRanking.prototype, "onePlayerData", {
            get: function () {
                return this._onePlayerData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelRanking.prototype, "laterPlayerData", {
            get: function () {
                return this._laterPlayerData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelRanking.prototype, "myRank", {
            get: function () {
                return this._myRank;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelRanking.prototype, "myScore", {
            get: function () {
                return this._myScore;
            },
            enumerable: true,
            configurable: true
        });
        ModelRanking.prototype.requestRanking = function (rankingType, handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_SortBoard_GetSortBoardData);
            msg.SortBoardType = rankingType;
            this.request(n.MessageMap.C2G_SORTBOARD_GETSORTBOARDDATA, msg, utils.Handler.create(this, function (data) {
                _this._myRank = data.Ranking;
                _this._myScore = data.Score;
                _this.updateFirstAndLaterData(data.SortboardData);
                if (handler)
                    handler.runWith(data);
            }));
        };
        ModelRanking.prototype.requestPlayerData = function (playerId, handler) {
            var msg = n.MessagePool.from(n.C2G_SortBoard_GetPlayerViewInfo);
            msg.PlayerId = playerId;
            this.request(n.MessageMap.C2G_SORTBOARD_GETPLAYERVIEWINFO, msg, utils.Handler.create(this, function (data) {
                if (handler) {
                    handler.runWith(data);
                }
            }));
        };
        /** 膜拜*/
        ModelRanking.prototype.requestWorshipExecute = function (sortBoardType, complte) {
            var msg = n.MessagePool.from(n.C2G_SortBoard_Worship);
            msg.SortboardType = sortBoardType;
            this.request(n.MessageMap.C2G_SORTBOARD_WORSHIP, msg, utils.Handler.create(this, function (data) {
                //this.dispatchEventWith(ModelFirstPlayer.FIRST_PLAYER_RECEIVE);
                this.dispatchEventWith(mo.ModelRanking.MOBAI);
                if (complte)
                    complte.run();
            }));
        };
        Object.defineProperty(ModelRanking.prototype, "dataOne", {
            get: function () {
                return this._dataOne;
            },
            enumerable: true,
            configurable: true
        });
        ModelRanking.prototype.requestAllRankOneData = function (complte) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_SortBoard_GetList);
            msg.SortboardTypeList = [TypeRank.ZONGGUANKA, TypeRank.ZONGZHANLI,
                TypeRank.DENGJI, TypeRank.TIANTI, TypeRank.WUHUNTA, TypeRank.WUSHENTA, TypeRank.SHILIANTA];
            this.request(n.MessageMap.C2G_SORTBOARD_GETLIST, msg, utils.Handler.create(this, function (data) {
                if (_this._dataOne) {
                    n.MessagePool.to(_this._dataOne);
                    _this._dataOne = null;
                }
                _this._dataOne = data;
                _this._dataOne.autoRecover = false;
                if (complte)
                    complte.run();
            }));
        };
        ModelRanking.MOBAI = "MOBAI";
        return ModelRanking;
    }(mo.ModelBase));
    mo.ModelRanking = ModelRanking;
    __reflect(ModelRanking.prototype, "mo.ModelRanking");
})(mo || (mo = {}));

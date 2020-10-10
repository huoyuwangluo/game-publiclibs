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
    var ModelLadder1 = (function (_super) {
        __extends(ModelLadder1, _super);
        function ModelLadder1() {
            var _this = _super.call(this) || this;
            _this.rankingNum = 100;
            _this._lostCount = 0;
            _this._lostScore = 0;
            /**挑战记录 */
            _this._type = 0;
            return _this;
        }
        ModelLadder1.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._underOnePlayers = [];
            this.initializePrizes();
            this.requestFightList();
        };
        /**初始化奖励信息 */
        ModelLadder1.prototype.initializePrizes = function () {
            this._prizeMin = 0;
            this._prizeMax = 0;
            this._prizes = [];
            var boxsTemplates = GameModels.dataSet.getDataSettingArrByType(ModelLadder1.CHESTLADDER);
            for (var _i = 0, boxsTemplates_1 = boxsTemplates; _i < boxsTemplates_1.length; _i++) {
                var template = boxsTemplates_1[_i];
                var prizeVO = vo.fromPool(vo.PrizeVO, template);
                this._prizes.push(prizeVO);
                this._prizeMax = Math.max(prizeVO.mark, this._prizeMax);
            }
            this._prizes[0].type = item.TypePrize.COPPER;
            this._prizes[1].type = item.TypePrize.SILVER;
            this._prizes[2].type = item.TypePrize.GOLD;
            this._prizeMax += this._prizeMax * 0.1;
        };
        /**更新奖励信息 */
        ModelLadder1.prototype.updatePrize = function (progressValue, stateIndexes) {
            if (stateIndexes === void 0) { stateIndexes = null; }
            this._prizeProgress = progressValue;
            for (var _i = 0, _a = this._prizes; _i < _a.length; _i++) {
                var prizeVO = _a[_i];
                prizeVO.state = (progressValue >= prizeVO.mark) ? item.StatePrize.WAIT : item.StatePrize.CLOSE;
            }
            if (stateIndexes) {
                for (var i = 0; i < stateIndexes.length; i++) {
                    var index = stateIndexes[i] - 1;
                    this._prizes[index].state = item.StatePrize.OPEN;
                }
            }
        };
        /**更新奖励宝箱状态 */
        ModelLadder1.prototype.updatePrizeBoxState = function (stateIndex) {
            var index = stateIndex - 1;
            this._prizes[index].state = item.StatePrize.OPEN;
        };
        ModelLadder1.prototype.getPlayersVo = function (data, start) {
            var players = [];
            for (var i = start; i < data.length; i++) {
                players.push(vo.fromPool(vo.LadderPlayerVO, data[i], i + 1));
            }
            return players;
        };
        ModelLadder1.prototype.completionUnderOneData = function () {
            this._underOnePlayers.length = 99;
            for (var i = 0; i < this.underOnePlayers.length; i++) {
                if (!this.underOnePlayers[i]) {
                    this.underOnePlayers[i] = vo.fromPool(vo.LadderPlayerVO, null, i + 2);
                }
            }
        };
        ModelLadder1.prototype.initAndtoPool = function () {
            if (!this._treePlayerData)
                this._treePlayerData = [];
            vo.toPoolList(this._treePlayerData);
            this._treePlayerData.length = 0;
        };
        //更新宝箱 和增加挑战此时check
        ModelLadder1.prototype.checkMadelChest = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.sports, 1)) {
                return false;
            }
            if (this._prizes) {
                for (var i = 0; i < this._prizes.length; i++) {
                    if (this._prizes[i].state == item.StatePrize.WAIT) {
                        return true;
                    }
                }
            }
            if (this._leftCount > 0) {
                return true;
            }
            return false;
        };
        Object.defineProperty(ModelLadder1.prototype, "leftCount", {
            get: function () {
                return this._leftCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder1.prototype, "roleData", {
            get: function () {
                return this._roleData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder1.prototype, "oldRoleData", {
            get: function () {
                return this._oldRoleData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder1.prototype, "prizeMin", {
            get: function () {
                return this._prizeMin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder1.prototype, "prizeMax", {
            get: function () {
                return this._prizeMax;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder1.prototype, "prizeProgress1", {
            get: function () {
                return this._prizeProgress;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder1.prototype, "prizeProgress", {
            get: function () {
                return this._prizeProgress * 1.1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder1.prototype, "prizes", {
            get: function () {
                return this._prizes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder1.prototype, "treePlayerData", {
            get: function () {
                return this._treePlayerData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder1.prototype, "firstPlayer", {
            get: function () {
                return this._firstPlayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder1.prototype, "leftTime", {
            get: function () {
                return this._leftTime;
            },
            enumerable: true,
            configurable: true
        });
        ModelLadder1.prototype.timeCount = function () {
            utils.timer.clear(this, this.timeOverCall);
            if (this._leftTime > 0) {
                utils.timer.loop(1000, this, this.timeOverCall, true);
            }
        };
        ModelLadder1.prototype.timeOverCall = function () {
            this._leftTime -= 1;
            if (this._leftTime < 0) {
                utils.timer.clear(this, this.timeOverCall);
                this.requestFightList();
            }
        };
        Object.defineProperty(ModelLadder1.prototype, "lostCount", {
            get: function () {
                return this._lostCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder1.prototype, "lostScore", {
            get: function () {
                return this._lostScore;
            },
            enumerable: true,
            configurable: true
        });
        //竞技情求
        //到达等级的时候需要Model初始化一下
        ModelLadder1.prototype.requestFightList = function (handler, errorHandler) {
            var _this = this;
            this.request(n.MessageMap.C2G_LADDER2_INFO, n.MessagePool.from(n.C2G_Ladder2_Info), utils.Handler.create(this, function (data) {
                _this._leftCount = data.LeftCount;
                _this._leftTime = data.LeftTime;
                _this._lostCount = data.LostCount;
                _this._lostScore = data.LostScore;
                _this.initAndtoPool();
                _this._treePlayerData = _this.getPlayersVo(data.Players, 0);
                _this._oldRoleData = _this._roleData;
                var temp = vo.fromPool(vo.LadderPlayerVO, data);
                _this._roleData = temp;
                _this.updatePrize(data.CurMedal, data.MedalRewards);
                GameModels.state.updateState(GameRedState.ARENA_YANWU);
                GameModels.state.updateState(GameRedState.CITY);
                if (handler) {
                    handler.runWith(data);
                }
            }));
            n.net.onError(n.MessageMap.C2G_LADDER2_INFO, utils.Handler.create(this, function (data) {
                if (errorHandler)
                    errorHandler.runWith(data);
            }));
        };
        //打开宝箱
        //  RewardId : number 奖励Id
        ModelLadder1.prototype.requestOpenChest = function (rewardId, handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Ladder2_Get_Medal_Reward);
            msg.RewardId = rewardId;
            this.request(n.MessageMap.C2G_LADDER2_GET_MEDAL_REWARD, msg, utils.Handler.create(this, function (data) {
                _this.updatePrizeBoxState(data.RewardId);
                GameModels.state.updateState(GameRedState.ARENA_YANWU);
                GameModels.state.updateState(GameRedState.CITY);
                if (handler) {
                    handler.run();
                }
            }));
        };
        //刷新奖励
        //  Players : ProtoLadderPlayer[] 玩家信息
        ModelLadder1.prototype.requestRefreshPlayer = function (handler) {
            var _this = this;
            this.request(n.MessageMap.C2G_LADDER2_REFRESH, n.MessagePool.from(n.C2G_Ladder2_Refresh), utils.Handler.create(this, function (data) {
                _this._treePlayerData = _this.getPlayersVo(data.Players, 0);
                if (handler) {
                    handler.run();
                }
            }));
        };
        //请求排行
        ModelLadder1.prototype.requestRankingList = function (handler, errorHandler) {
            var _this = this;
            this.request(n.MessageMap.C2G_LADDER2_RANKLIST, n.MessagePool.from(n.C2G_Ladder2_RankList), utils.Handler.create(this, function (data) {
                _this._firstPlayer ? vo.toPool(_this._firstPlayer) : null;
                for (var i = 0; i < data.Players.length; i++) {
                    if (data.Players[i] && data.Players[i].Rank == 1) {
                        _this._firstPlayer = vo.fromPool(vo.LadderPlayerVO, data.Players[i]);
                        break;
                    }
                }
                if (_this._underOnePlayers) {
                    for (var _i = 0, _a = _this._underOnePlayers; _i < _a.length; _i++) {
                        var ladderVO = _a[_i];
                        vo.toPool(ladderVO);
                    }
                    _this._underOnePlayers.length = 0;
                }
                while (data.Players.length > 100) {
                    var playerData = data.Players.pop();
                    playerData.reset();
                    n.MessagePool.to(playerData);
                }
                _this._underOnePlayers.length = 99;
                for (var i = 0; i < _this._underOnePlayers.length; i++) {
                    _this._underOnePlayers[i] = vo.fromPool(vo.LadderPlayerVO, null, i + 2);
                }
                for (var i = 0; i < _this._underOnePlayers.length; i++) {
                    for (var j = 0; j < data.Players.length; j++) {
                        if (_this._underOnePlayers[i].ladderRanking == data.Players[j].Rank) {
                            _this._underOnePlayers[i].updataProtoLadder2RankPlayer(data.Players[j]);
                        }
                    }
                }
                // this._underOnePlayers = this.getPlayersVo(data.Players, 1);
                // this.completionUnderOneData();
                if (handler) {
                    handler.runWith(data);
                }
            }));
            n.net.onError(n.MessageMap.C2G_LADDER2_RANKLIST, utils.Handler.create(this, function (data) {
                if (errorHandler)
                    errorHandler.runWith(data);
            }));
        };
        Object.defineProperty(ModelLadder1.prototype, "underOnePlayers", {
            get: function () {
                return this._underOnePlayers;
            },
            enumerable: true,
            configurable: true
        });
        ModelLadder1.prototype.getUnderOnePlayersByRank = function (rank) {
            for (var i = 0; i < this._underOnePlayers.length; i++) {
                if (this._underOnePlayers[i].ladderRanking == rank) {
                    return this._underOnePlayers[i];
                }
            }
            return null;
        };
        Object.defineProperty(ModelLadder1.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (v) {
                this._type = v;
            },
            enumerable: true,
            configurable: true
        });
        /**0天梯 1演武 */
        ModelLadder1.prototype.requestLadderGetRecordList = function (type, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Ladder_GetRecordList);
            msg.Type = type;
            this.request(n.MessageMap.C2G_LADDER_GETRECORDLIST, msg, utils.Handler.create(this, function (data) {
                _this._ladderRecordVoArr = [];
                for (var i = 0; i < data.List.length; i++) {
                    var tempVo = vo.fromPool(vo.LadderRecordVO, data.List[i]);
                    _this._ladderRecordVoArr.push(tempVo);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelLadder1.prototype, "recordVoArr", {
            get: function () {
                return this._ladderRecordVoArr;
            },
            enumerable: true,
            configurable: true
        });
        /**请求扫荡*/
        ModelLadder1.prototype.requestLadderQuickPass = function (callback) {
            var cmd = n.MessagePool.from(n.C2G_Ladder2_QuickFight);
            this.request(n.MessageMap.C2G_LADDER2_QUICKFIGHT, cmd, callback);
        };
        //天梯宝箱
        ModelLadder1.CHESTLADDER = 54;
        ModelLadder1.ROLEINDEX = 3;
        return ModelLadder1;
    }(mo.ModelCopy));
    mo.ModelLadder1 = ModelLadder1;
    __reflect(ModelLadder1.prototype, "mo.ModelLadder1");
})(mo || (mo = {}));

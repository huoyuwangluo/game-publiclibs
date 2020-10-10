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
    var ModelLadder = (function (_super) {
        __extends(ModelLadder, _super);
        function ModelLadder() {
            var _this = _super.call(this) || this;
            _this.rankingNum = 100;
            return _this;
        }
        ModelLadder.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._underOnePlayers = [];
            this.initializePrizes();
            this.initDuanweiData();
            this.requestFightList();
            this.requestDuanWeiRewardInfo();
        };
        /**初始化奖励信息 */
        ModelLadder.prototype.initializePrizes = function () {
            this._prizeMin = 0;
            this._prizeMax = 0;
            this._prizes = [];
            var boxsTemplates = GameModels.dataSet.getDataSettingArrByType(ModelLadder.CHESTLADDER);
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
        ModelLadder.prototype.updatePrize = function (progressValue, stateIndexes) {
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
        ModelLadder.prototype.updatePrizeBoxState = function (stateIndex) {
            var index = stateIndex - 1;
            this._prizes[index].state = item.StatePrize.OPEN;
        };
        // public setEveryData(){
        // 	//取出4个玩家信息 （应该不会）如果以后服务器要讲玩家所有信息传，vo继承玩家所有信息
        // 	this.getPlayerLadder(4);
        // }
        ModelLadder.prototype.getPlayersVo = function (data, start) {
            var players = [];
            for (var i = start; i < data.length; i++) {
                players.push(vo.fromPool(vo.LadderPlayerVO, data[i], i + 1));
            }
            return players;
        };
        ModelLadder.prototype.completionUnderOneData = function () {
            this._underOnePlayers.length = 99;
            for (var i = 0; i < this.underOnePlayers.length; i++) {
                if (!this.underOnePlayers[i]) {
                    this.underOnePlayers[i] = vo.fromPool(vo.LadderPlayerVO, null, i + 2);
                }
            }
        };
        ModelLadder.prototype.initDuanweiData = function () {
            this._ladders = [];
            var temps = Templates.getList(templates.Map.LADDER);
            for (var i = 0; i < temps.length; i++) {
                this._ladders.push(vo.fromPool(vo.LadderVO, temps[i]));
            }
        };
        ModelLadder.prototype.updateOneDuanweiData = function (id) {
            for (var i = 0; i < this._ladders.length; i++) {
                if (this._ladders[i].duanWeiId == id) {
                    this._ladders[i].isRecevied = true;
                }
            }
        };
        //更新段位数据
        ModelLadder.prototype.updateDuanweiInfo = function (data) {
            for (var i = 0; i < this._ladders.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (this._ladders[i].duanWeiId == data[j].DuanWeiId) {
                        this._ladders[i].updateData(data[j]);
                    }
                }
            }
            this.sortLadderRewardList();
        };
        ModelLadder.prototype.sortLadderRewardList = function () {
            var unReceviedList = [];
            var isReceviedList = [];
            for (var i = 0; i < this._ladders.length; i++) {
                if (this._ladders[i].isRecevied)
                    isReceviedList.push(this._ladders[i]);
                else
                    unReceviedList.push(this._ladders[i]);
            }
            this.sortList(isReceviedList);
            this.sortList(unReceviedList);
            this._ladders = unReceviedList.concat(isReceviedList);
        };
        ModelLadder.prototype.sortList = function (list) {
            var isChange = true;
            for (var i = 0; i < list.length - 1; i++) {
                isChange = false;
                for (var j = i + 1; j < list.length; j++) {
                    if (list[i].duanWeiId > list[j].duanWeiId) {
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                        isChange = true;
                    }
                }
                if (isChange == false)
                    break;
            }
        };
        ModelLadder.prototype.initAndtoPool = function () {
            if (!this._treePlayerData)
                this._treePlayerData = [];
            vo.toPoolList(this._treePlayerData);
            this._treePlayerData.length = 0;
        };
        //更新宝箱 和增加挑战此时check
        ModelLadder.prototype.checkMadelChest = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.sports, 0)) {
                return false;
            }
            if (this._prizes) {
                for (var i = 0; i < this._prizes.length; i++) {
                    if (this._prizes[i].state == item.StatePrize.WAIT) {
                        return true;
                    }
                }
            }
            // if (GameModels.bag.getItemCountById(ConfigData.LADDER_ITEM) > 0) return true;
            if (this._leftCount > 0) {
                return true;
            }
            return this.checkLadderReward();
        };
        ModelLadder.prototype.checkLadderReward = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.sports, 0)) {
                return false;
            }
            if (this._ladders) {
                for (var i = 0; i < this._ladders.length; i++) {
                    if (!this._ladders[i].isRecevied && this._ladders[i].canRecevied) {
                        return true;
                    }
                }
            }
            return false;
        };
        //第几次的价格数
        ModelLadder.prototype.getLaterTimesPrice = function (times) {
            times = times > 100 ? 100 : times;
            times = times <= 0 ? 1 : times;
            return GameModels.dataSet.getBuyCountNeedPrice(53001, times);
        };
        //得到当前等级VO
        ModelLadder.prototype.getRoleLadderVO = function () {
            var temp = Templates.getTemplateById(templates.Map.LADDER, this.roleData.template.id);
            var ladder = vo.fromPool(vo.LadderVO, temp);
            return ladder;
        };
        Object.defineProperty(ModelLadder.prototype, "leftCount", {
            get: function () {
                return this._leftCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder.prototype, "roleData", {
            get: function () {
                return this._roleData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder.prototype, "oldRoleData", {
            get: function () {
                return this._oldRoleData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder.prototype, "prizeMin", {
            get: function () {
                return this._prizeMin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder.prototype, "prizeMax", {
            get: function () {
                return this._prizeMax;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder.prototype, "prizeProgress", {
            get: function () {
                return this._prizeProgress * 1.1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder.prototype, "prizes", {
            get: function () {
                return this._prizes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder.prototype, "buyTimes", {
            get: function () {
                return this._buyCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder.prototype, "treePlayerData", {
            get: function () {
                return this._treePlayerData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder.prototype, "firstPlayer", {
            get: function () {
                return this._firstPlayer;
            },
            enumerable: true,
            configurable: true
        });
        //竞技情求
        //到达等级的时候需要Model初始化一下
        ModelLadder.prototype.requestFightList = function (handler, errorHandler) {
            var _this = this;
            this.request(n.MessageMap.C2G_LADDER_INFO, n.MessagePool.from(n.C2G_Ladder_Info), utils.Handler.create(this, function (data) {
                _this._leftCount = data.LeftCount;
                _this.initAndtoPool();
                _this._treePlayerData = _this.getPlayersVo(data.Players, 0);
                _this._oldRoleData = _this._roleData;
                var temp = vo.fromPool(vo.LadderPlayerVO, data);
                if (_this._roleData && temp) {
                    if (_this._roleData.lv != temp.lv || _this._roleData.step != temp.step) {
                        _this.requestDuanWeiRewardInfo();
                    }
                }
                _this._roleData = temp;
                _this._buyCount = data.BuyCount;
                _this.updatePrize(data.CurMedal, data.MedalRewards);
                GameModels.state.updateState(GameRedState.ARENA_LADDER);
                GameModels.state.updateState(GameRedState.CITY);
                if (handler) {
                    handler.runWith(data);
                }
            }));
            n.net.onError(n.MessageMap.C2G_LADDER_INFO, utils.Handler.create(this, function (data) {
                if (errorHandler)
                    errorHandler.runWith(data);
            }));
        };
        //打开宝箱
        //  RewardId : number 奖励Id
        ModelLadder.prototype.requestOpenChest = function (rewardId, handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Ladder_Get_Medal_Reward);
            msg.RewardId = rewardId;
            this.request(n.MessageMap.C2G_LADDER_GET_MEDAL_REWARD, msg, utils.Handler.create(this, function (data) {
                _this.updatePrizeBoxState(data.RewardId);
                GameModels.state.updateState(GameRedState.ARENA_LADDER);
                GameModels.state.updateState(GameRedState.CITY);
                if (handler) {
                    handler.run();
                }
            }));
        };
        //刷新奖励
        //  Players : ProtoLadderPlayer[] 玩家信息
        ModelLadder.prototype.requestRefreshPlayer = function (handler) {
            var _this = this;
            this.request(n.MessageMap.C2G_LADDER_REFRESH, n.MessagePool.from(n.C2G_Ladder_Refresh), utils.Handler.create(this, function (data) {
                _this._treePlayerData = _this.getPlayersVo(data.Players, 0);
                if (handler) {
                    handler.run();
                }
            }));
        };
        ModelLadder.prototype.requestBuyTimes = function (handler) {
            var _this = this;
            this.request(n.MessageMap.C2G_LADDER_BUY_CHALLENGE_COUNT, n.MessagePool.from(n.C2G_Ladder_Buy_Challenge_Count), utils.Handler.create(this, function (data) {
                _this._buyCount++;
                if (handler) {
                    handler.run();
                }
            }));
        };
        //请求排行
        ModelLadder.prototype.requestRankingList = function (handler, errorHandler) {
            var _this = this;
            this.request(n.MessageMap.C2G_LADDER_RANKLIST, n.MessagePool.from(n.C2G_Ladder_RankList), utils.Handler.create(this, function (data) {
                _this._firstPlayer ? vo.toPool(_this._firstPlayer) : null;
                _this._firstPlayer = vo.fromPool(vo.LadderPlayerVO, data.Players[0]);
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
                _this._underOnePlayers = _this.getPlayersVo(data.Players, 1);
                _this.completionUnderOneData();
                if (handler) {
                    handler.runWith(data);
                }
            }));
            n.net.onError(n.MessageMap.C2G_LADDER_RANKLIST, utils.Handler.create(this, function (data) {
                if (errorHandler)
                    errorHandler.runWith(data);
            }));
        };
        ModelLadder.prototype.requestDuanWeiRewardGet = function (id, handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Ladder_Get_DuanWei_Reward);
            msg.DuanWeiId = id;
            this.request(n.MessageMap.C2G_LADDER_GET_DUANWEI_REWARD, msg, utils.Handler.create(this, function (data) {
                _this.updateOneDuanweiData(data.DuanWeiId);
                //GameModels.state.updateState(GameRedState.ARENA_LADDER_REWARD);
                _this.sortLadderRewardList();
                if (!_this._listData) {
                    _this._listData = new eui.ArrayCollection(_this._ladders);
                }
                else {
                    _this._listData.source = _this._ladders;
                }
                _this._listData.refresh();
                if (handler) {
                    handler.runWith(data);
                }
                GameModels.state.updateState(GameRedState.ARENA_LADDER_REWARD);
                GameModels.state.updateState(GameRedState.CITY);
            }));
        };
        //请求段位奖励
        ModelLadder.prototype.requestDuanWeiRewardInfo = function (handler) {
            var _this = this;
            this.request(n.MessageMap.C2G_LADDER_DUANWEI_REWARD_INFO, n.MessagePool.from(n.C2G_Ladder_DuanWei_Reward_Info), utils.Handler.create(this, function (data) {
                _this.updateDuanweiInfo(data.Rewards);
                if (!_this._listData) {
                    _this._listData = new eui.ArrayCollection(_this._ladders);
                }
                else {
                    _this._listData.source = _this._ladders;
                }
                GameModels.state.updateState(GameRedState.ARENA_LADDER_REWARD);
                GameModels.state.updateState(GameRedState.CITY);
                if (handler) {
                    handler.runWith(data);
                }
            }));
        };
        Object.defineProperty(ModelLadder.prototype, "underOnePlayers", {
            get: function () {
                return this._underOnePlayers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder.prototype, "ladders", {
            get: function () {
                return this._ladders;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLadder.prototype, "listData", {
            get: function () {
                return this._listData;
            },
            enumerable: true,
            configurable: true
        });
        ModelLadder.prototype.normalBuyTimes = function () {
            return parseInt(GameModels.dataSet.getDataSettingValueById(52002));
        };
        /**请求扫荡*/
        ModelLadder.prototype.requestLadderQuickPass = function (playerId, callback) {
            var cmd = n.MessagePool.from(n.C2G_Ladder_QuickFight);
            cmd.TargetPlayerId = playerId;
            this.request(n.MessageMap.C2G_LADDER_QUICKFIGHT, cmd, callback);
        };
        //天梯宝箱
        ModelLadder.CHESTLADDER = 51;
        ModelLadder.ROLEINDEX = 3;
        return ModelLadder;
    }(mo.ModelCopy));
    mo.ModelLadder = ModelLadder;
    __reflect(ModelLadder.prototype, "mo.ModelLadder");
})(mo || (mo = {}));

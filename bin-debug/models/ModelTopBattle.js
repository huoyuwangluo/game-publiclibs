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
    //巅峰战
    var ModelTopBattle = (function (_super) {
        __extends(ModelTopBattle, _super);
        function ModelTopBattle() {
            return _super.call(this) || this;
        }
        ModelTopBattle.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._betLeftTime = 0;
            this._myBattle = null;
            this._betBattle = null;
            this._betInfo = null;
            this._betRecordList = [];
            this._leftWorshipCount = 0;
            this._recordList = [];
            this._playerRankList = [];
            this._nextBattleLeftTime = 0;
            this._leftPlayerCount = 0;
            this._top16BattleList = [];
            this._battleStep = 0;
            this._myCoin = 0;
            this._leftEndVo = null;
            this._rightEndVo = null;
            this._currentPlayerList = [];
            this._worshipPlayerList = [];
            this._fightStatus = 0;
            this.initTopBattleInfo();
            this.requsetTopBattleGetRank();
            this.requsetTopBattleRecord();
        };
        //获取巅峰之战信息
        ModelTopBattle.prototype.initTopBattleInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_TopBattle_GetInfo);
            this.request(n.MessageMap.C2G_TOPBATTLE_GETINFO, msg, utils.Handler.create(this, function (data) {
                if (data.MyBattleRoom) {
                    _this._myBattle = vo.fromPool(vo.TopBattleVo);
                    _this._myBattle.decode(data.MyBattleRoom);
                }
                if (data.BetBattleRoom) {
                    _this._betBattle = vo.fromPool(vo.TopBattleVo);
                    _this._betBattle.decode(data.BetBattleRoom);
                }
                if (data.MyBetInfo) {
                    _this._betInfo = vo.fromPool(vo.TopBattleBetVo);
                    _this._betInfo.decode(data.MyBetInfo);
                }
                _this._betLeftTime = data.BetLeftTime;
                _this._leftWorshipCount = data.LeftWorshipCount;
                _this._nextBattleLeftTime = data.NextBattleLeftTime;
                _this._leftPlayerCount = data.LeftPlayerCount;
                _this._battleStep = data.BattleStep;
                _this._myCoin = data.Coin;
                if (_this._betLeftTime > 0) {
                    utils.timer.countdown(_this._betLeftTime, _this, _this.updateLableTime, _this.finshTime);
                }
                if (complete)
                    complete.runWith(data);
                GameModels.state.updateState(GameRedState.XIANSHI_DIANFENGSAI_JINGCAI);
                GameModels.state.updateState(GameRedState.XIANSHI_DIANFENGSAI_MOBAI);
                GameModels.state.updateState(GameRedState.XIANSHI_WUSHUANG);
            }));
        };
        ModelTopBattle.prototype.updateLableTime = function () {
            if (this._betLeftTime <= 0) {
                this._betLeftTime = 0;
                this.finshTime();
                this.initTopBattleInfo();
                this.dispatchEventWith(ModelTopBattle.FIGHT_UPDATE);
                GameModels.state.updateState(GameRedState.XIANSHI_DIANFENGSAI_JINGCAI);
                return;
            }
            this._betLeftTime--;
        };
        ModelTopBattle.prototype.finshTime = function () {
            utils.timer.clear(this, this.updateLableTime);
        };
        //下注
        ModelTopBattle.prototype.requsetTopBattleBet = function (roomId, playerId, betCount, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_TopBattle_Bet);
            msg.RoomId = roomId;
            msg.PlayerId = playerId;
            msg.BetCount = betCount;
            this.request(n.MessageMap.C2G_TOPBATTLE_BET, msg, utils.Handler.create(this, function (data) {
                if (data.MyBetInfo) {
                    _this._betInfo = null;
                    _this._betInfo = vo.fromPool(vo.TopBattleBetVo);
                    _this._betInfo.decode(data.MyBetInfo);
                }
                _this._myCoin = data.Coin;
                _this.dispatchEventWith(ModelTopBattle.GUESS_UPDATE);
                GameModels.state.updateState(GameRedState.XIANSHI_DIANFENGSAI_JINGCAI);
                if (complete)
                    complete.runWith(data);
            }));
        };
        //下注记录
        ModelTopBattle.prototype.requsetTopBattleGetMysBetRecord = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_TopBattle_GetMyBet);
            this.request(n.MessageMap.C2G_TOPBATTLE_GETMYBET, msg, utils.Handler.create(this, function (data) {
                _this.initTopBattleRecordList(data.RecordList);
                if (complete)
                    complete.runWith(data);
            }));
        };
        //膜拜
        ModelTopBattle.prototype.requsetTopBattleWorship = function (playerId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_TopBattle_Worship);
            msg.PlayerId = playerId;
            this.request(n.MessageMap.C2G_TOPBATTLE_WORSHIP, msg, utils.Handler.create(this, function (data) {
                _this._leftWorshipCount = data.LeftWorshipCount;
                if (data.GetValue > 0) {
                    mg.alertManager.tip(Language.getExpression(Language.E_MBCG, data.GetValue));
                }
                _this._worshipPlayerList = [];
                _this._worshipPlayerList = data.WorshipRecords.concat();
                if (complete)
                    complete.runWith(data);
                GameModels.state.updateState(GameRedState.XIANSHI_DIANFENGSAI_MOBAI);
            }));
        };
        //获取我的战绩
        ModelTopBattle.prototype.requsetTopBattleRecord = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_TopBattle_GetBattleRecord);
            this.request(n.MessageMap.C2G_TOPBATTLE_GETBATTLERECORD, msg, utils.Handler.create(this, function (data) {
                if (_this._recordList) {
                    for (var _i = 0, _a = _this._recordList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._recordList.length = 0;
                }
                var recordList = data.Records.concat();
                for (var _b = 0, recordList_1 = recordList; _b < recordList_1.length; _b++) {
                    var record = recordList_1[_b];
                    record.autoRecover = false;
                    _this._recordList.push(record);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        //获取排行
        ModelTopBattle.prototype.requsetTopBattleGetRank = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_TopBattle_GetRank);
            this.request(n.MessageMap.C2G_TOPBATTLE_GETRANK, msg, utils.Handler.create(this, function (data) {
                _this.initTopBattleRankList(data.List);
                _this._worshipPlayerList = [];
                _this._worshipPlayerList = data.WorshipRecords.concat();
                GameModels.state.updateState(GameRedState.XIANSHI_DIANFENGSAI_MOBAI);
                if (complete)
                    complete.runWith(data);
            }));
        };
        //获取16强对战信息
        ModelTopBattle.prototype.requsetGetTop16BattleInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_TopBattle_GetTop16Battle);
            this.request(n.MessageMap.C2G_TOPBATTLE_GETTOP16BATTLE, msg, utils.Handler.create(this, function (data) {
                _this.initTop16BattleInfo(data.List);
                if (complete)
                    complete.runWith(data);
            }));
        };
        //获取房间战斗结果统计
        ModelTopBattle.prototype.requsetGetRoomSceneEndInfo = function (roomId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_TopBattle_GetRoomSceneEndInfo);
            msg.RoomId = roomId;
            this.request(n.MessageMap.C2G_TOPBATTLE_GETROOMSCENEENDINFO, msg, utils.Handler.create(this, function (data) {
                _this._leftEndVo = null;
                _this._rightEndVo = null;
                _this._fightStatus = data.Status;
                if (data.LeftEndInfo)
                    _this._leftEndVo = vo.fromPool(vo.ProtoSceneObjectEndInfoVO, data.LeftEndInfo);
                if (data.RightEndInfo)
                    _this._rightEndVo = vo.fromPool(vo.ProtoSceneObjectEndInfoVO, data.RightEndInfo);
                if (complete)
                    complete.runWith(data);
            }));
        };
        //获取当前阶段参赛人员
        ModelTopBattle.prototype.requsetGetCurrentPlayerList = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_TopBattle_GetCurrentPlayerList);
            this.request(n.MessageMap.C2G_TOPBATTLE_GETCURRENTPLAYERLIST, msg, utils.Handler.create(this, function (data) {
                _this.initTopBattleCurrentPlayerList(data.List);
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelTopBattle.prototype.initTop16BattleInfo = function (data) {
            this._top16BattleList = [];
            for (var i = 0; i < data.length; i++) {
                var battleRoom = vo.fromPool(vo.TopBattleVo);
                battleRoom.decode(data[i]);
                this._top16BattleList.push(battleRoom);
            }
        };
        ModelTopBattle.prototype.initTopBattleRankList = function (data) {
            this._playerRankList = [];
            for (var i = 0; i < data.length; i++) {
                var player = vo.fromPool(vo.TopBattlePlayerVo);
                player.decode(data[i], (i + 1));
                this._playerRankList.push(player);
            }
        };
        ModelTopBattle.prototype.initTopBattleRecordList = function (data) {
            this._betRecordList = [];
            for (var i = 0; i < data.length; i++) {
                var battleRecordVO = vo.fromPool(vo.TopBattleBetRecordVo);
                battleRecordVO.decode(data[i]);
                this._betRecordList.push(battleRecordVO);
            }
        };
        ModelTopBattle.prototype.initTopBattleCurrentPlayerList = function (data) {
            this._currentPlayerList = [];
            for (var i = 0; i < data.length; i++) {
                var player = vo.fromPool(vo.TopBattlePlayerVo);
                player.decode(data[i]);
                this._currentPlayerList.push(player);
            }
        };
        Object.defineProperty(ModelTopBattle.prototype, "top16BattleList", {
            get: function () {
                this._top16BattleList.sort(function (a, b) {
                    return a.position - b.position;
                });
                return this._top16BattleList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "playerRankList", {
            get: function () {
                this._playerRankList.sort(function (a, b) {
                    return a.ranking - b.ranking;
                });
                return this._playerRankList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "myRank", {
            get: function () {
                if (this._playerRankList) {
                    for (var _i = 0, _a = this._playerRankList; _i < _a.length; _i++) {
                        var player = _a[_i];
                        if (player.playerId == GameModels.user.player.uid) {
                            return player;
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "betRecordList", {
            get: function () {
                return this._betRecordList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "currentPlayerList", {
            get: function () {
                return this._currentPlayerList;
            },
            enumerable: true,
            configurable: true
        });
        ModelTopBattle.prototype.getRecordListBuyStep = function (step) {
            var recordList = [];
            if (this._betRecordList) {
                for (var i = 0; i < this._betRecordList.length; i++) {
                    if (this._betRecordList[i].battleStep == step) {
                        recordList.push(this._betRecordList[i]);
                    }
                }
            }
            return recordList;
        };
        Object.defineProperty(ModelTopBattle.prototype, "myBattle", {
            get: function () {
                return this._myBattle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "betBattle", {
            get: function () {
                return this._betBattle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "betInfo", {
            get: function () {
                return this._betInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "betLeftTime", {
            get: function () {
                return this._betLeftTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "leftWorshipCount", {
            get: function () {
                return this._leftWorshipCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "nextBattleLeftTime", {
            get: function () {
                return this._nextBattleLeftTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "leftPlayerCount", {
            get: function () {
                return this._leftPlayerCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "recordList", {
            get: function () {
                return this._recordList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "battleStep", {
            get: function () {
                return this._battleStep;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "myCoin", {
            get: function () {
                return this._myCoin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "leftEndVo", {
            get: function () {
                return this._leftEndVo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "rightEndVo", {
            get: function () {
                return this._rightEndVo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "fightStatus", {
            get: function () {
                return this._fightStatus;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTopBattle.prototype, "worshipPlayerList", {
            get: function () {
                return this._worshipPlayerList;
            },
            enumerable: true,
            configurable: true
        });
        ModelTopBattle.prototype.hashWorship = function (playerId) {
            if (this._worshipPlayerList.indexOf(playerId) != -1) {
                return true;
            }
            return false;
        };
        ModelTopBattle.prototype.getFightName = function (step) {
            var str = "";
            switch (step) {
                case 128:
                    str = Language.J_D1LTTS;
                    break;
                case 64:
                    str = Language.J_D2LTTS;
                    break;
                case 32:
                    str = Language.J_D3LTTS;
                    break;
                case 16:
                    str = Language.J_D4LTTS;
                    break;
                case 8:
                    str = Language.J_D5LTTS;
                    break;
                case 4:
                    str = Language.J_D6LTTS;
                    break;
                case 2:
                    str = Language.J_D7LTTS;
                    break;
                case 1:
                    str = Language.J_D8LTTS;
                    break;
            }
            return str;
        };
        ModelTopBattle.prototype.getFightEndTime = function (step) {
            var time = 0;
            switch (step) {
                case 128:
                    time = 50400;
                    break;
                case 64:
                    time = 57600;
                    break;
                case 32:
                    time = 64800;
                    break;
                case 16:
                    time = 72600;
                    break;
                case 8:
                    time = 73200;
                    break;
                case 4:
                    time = 73800;
                    break;
                case 2:
                    time = 74400;
                    break;
            }
            return time;
        };
        ModelTopBattle.prototype.getFightBeginTime = function (step) {
            var id = 0;
            switch (step) {
                case 128:
                    id = 1101;
                    break;
                case 64:
                    id = 1102;
                    break;
                case 32:
                    id = 1103;
                    break;
                case 16:
                    id = 1201;
                    break;
                case 8:
                    id = 1202;
                    break;
                case 4:
                    id = 1203;
                    break;
                case 1:
                case 2:
                    id = 1204;
                    break;
            }
            var temp = Templates.getTemplateById(templates.Map.SCENEACTIVITY, id);
            if (temp)
                return temp.activeTime;
            return "";
        };
        ModelTopBattle.prototype.getBetInfos = function (step) {
            if (!this._betRecordList || !this._betRecordList.length)
                return [];
            var betInfos = [];
            for (var _i = 0, _a = this._betRecordList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.battleStep == step) {
                    betInfos.push(item);
                }
            }
            return betInfos;
        };
        //根据场次和playerId判断这个player是不是在下注列表内
        ModelTopBattle.prototype.getPlayerInBetInfoBoo = function (step, playerId) {
            var betInfos = this.getBetInfos(step);
            if (betInfos && betInfos.length) {
                for (var _i = 0, betInfos_1 = betInfos; _i < betInfos_1.length; _i++) {
                    var item = betInfos_1[_i];
                    if (item.playerId == playerId) {
                        return true;
                    }
                }
            }
            return false;
        };
        //根据场次和playerId判断是不是在下注列表内
        ModelTopBattle.prototype.getBetInfoIndexBoo = function (index) {
            if (!this._top16BattleList || !this._top16BattleList.length)
                return false;
            var roomVO = this._top16BattleList[index];
            if (!roomVO)
                return false;
            var leftboo = this.getPlayerInBetInfoBoo(roomVO.battleStep, roomVO.leftPlayer.playerId);
            var rightboo = this.getPlayerInBetInfoBoo(roomVO.battleStep, roomVO.rightPlayer.playerId);
            if (leftboo || rightboo)
                return true;
            return false;
        };
        ModelTopBattle.prototype.checkJingCaiRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.topBattle))
                return false;
            if (GameModels.serverTime.getSeason() != 0)
                return false;
            if (GameModels.serverTime.getSeason() == 0 && GameModels.timer.getPastSecond() < 43200)
                return false;
            if (this.betInfo && this.betInfo.betType == 0 && this.betLeftTime > 0)
                return true;
            var actData = GameModels.activityNotice.getOpenActivityIdData(mo.ModelActivityNotice.DIANFENGSAI);
            if (actData != null && actData == 2)
                return true;
            return false;
        };
        ModelTopBattle.prototype.checkMoBaiRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.topBattle))
                return false;
            var rankList = this.playerRankList;
            if (rankList.length <= 0)
                return false;
            for (var i = 0; i < rankList.length; i++) {
                if (rankList[i].ranking <= 3 && this._leftWorshipCount > 0) {
                    return true;
                }
            }
            return false;
        };
        ModelTopBattle.GUESS_UPDATE = "GUESS_UPDATE";
        ModelTopBattle.FIGHT_UPDATE = "FIGHT_UPDATE"; //战斗变化
        return ModelTopBattle;
    }(mo.ModelBase));
    mo.ModelTopBattle = ModelTopBattle;
    __reflect(ModelTopBattle.prototype, "mo.ModelTopBattle");
})(mo || (mo = {}));

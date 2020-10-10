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
    //国战
    var ModelCampBattle = (function (_super) {
        __extends(ModelCampBattle, _super);
        function ModelCampBattle() {
            return _super.call(this) || this;
        }
        ModelCampBattle.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._campBattleIdList = [];
            this._campBattleEntryList = [];
            this._campRemainInfoList = [];
            this._campLeftRoadDetailList = [];
            this._campRightRoadDetailList = [];
            this._resultPlayerList = [];
            this._roadInfoList = [];
            this._battleId = 0;
            this._joinBattleId = 0;
            this._joinBattlePos = 0;
            this._guWuTimes = 0;
            this._guWuNeedCount = 0;
            this._winUnionId = 0;
            this._roadWinUnionIdList = [];
            this._myZhuWeiCount = 0;
            this._leftZhuWeiCount = 0;
            this._rightZhuWeiCount = 0;
            this._startLeftTime = 0;
            this._isCampBattleView = false;
            this.onRoute(n.MessageMap.G2C_CAMP_NOFIFYREMAININFO, utils.Handler.create(this, this.campInitHandler, null, false));
            this.onRoute(n.MessageMap.G2C_CAMP_GETBATTLERESULTINFO, utils.Handler.create(this, this.campEndHandler, null, false));
            if (GameModels.user && GameModels.user.player.legionId) {
                this.updateCampBattleInfo();
            }
        };
        /**获取国战基本信息 */
        ModelCampBattle.prototype.updateCampBattleInfo = function (complete) {
            var msg = n.MessagePool.from(n.C2G_Camp_GetBattleInfo);
            this.request(n.MessageMap.C2G_CAMP_GETBATTLEINFO, msg, utils.Handler.create(this, function (data) {
                this.updateBattleIdList(data.BattleIdList);
                this.updateBattleEntryList(data.EntryList);
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelCampBattle.prototype.updateBattleIdList = function (idList) {
            this._campBattleIdList = [];
            for (var i = 0; i < idList.length; i++) {
                this._campBattleIdList.push(idList[i]);
            }
            // if (GameModels.activityNotice.statusList.length > 0) {
            // 	GameModels.activityNotice.selfcampBattleActivityId = [];
            // 	var temArr:Array<number> = [];
            // 	for (var data of GameModels.activityNotice.statusList) {
            // 		if (ModelActivityNotice.campBattleId.indexOf(data.ActivityId) != -1) {
            // 			var act: number[] = GameModels.campBattle.campBattleIdList;
            // 			if (act.length > 0&&act.indexOf(data.ActivityId) != -1) {
            // 				temArr.push(ModelActivityNotice.campBattleId[i]);
            // 			}
            // 		}
            // 	}
            // 	GameModels.activityNotice.selfcampBattleActivityId = temArr;
            // }
        };
        ModelCampBattle.prototype.updateBattleEntryList = function (entryList) {
            this._campBattleEntryList = [];
            for (var i = 0; i < entryList.length; i++) {
                this._campBattleEntryList.push(entryList[i]);
            }
        };
        /**请求获取单场国战报名信息 */
        ModelCampBattle.prototype.getEntryInfo = function (battleId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Camp_GetEntryInfo);
            msg.BattleId = battleId;
            this.request(n.MessageMap.C2G_CAMP_GETENTRYINFO, msg, utils.Handler.create(this, function (data) {
                if (_this._roadInfoList) {
                    for (var _i = 0, _a = _this._roadInfoList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._roadInfoList.length = 0;
                }
                _this._battleId = data.BattleId;
                _this._guWuTimes = data.GuWuInfo.YuanBaoGuWuTimes;
                _this._guWuNeedCount = data.GuWuInfo.YuanBaoGuWuNeed;
                var RoadInfoList = data.RoadInfoList.concat();
                for (var _b = 0, RoadInfoList_1 = RoadInfoList; _b < RoadInfoList_1.length; _b++) {
                    var RoadItem = RoadInfoList_1[_b];
                    RoadItem.autoRecover = false;
                    _this._roadInfoList.push(RoadItem);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**请求加入一路军,参加或支援 */
        ModelCampBattle.prototype.requesJoinEntryRoad = function (battleId, pos, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Camp_EntryRoad);
            msg.BattleId = battleId;
            msg.Pos = pos;
            this.request(n.MessageMap.C2G_CAMP_ENTRYROAD, msg, utils.Handler.create(this, function (data) {
                _this._joinBattleId = data.BattleId;
                _this._joinBattlePos = data.Pos;
                _this.updatePlayerInfo(data.RoadInfo);
                _this.dispatchEventWith(ModelCampBattle.JOINROAD_UPDATE);
                GameModels.state.updateState(GameRedState.XIANSHI_SANGUO);
                GameModels.state.updateState(GameRedState.MAIN_UNION_WANFA_CAMPBATTLE);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**更新参战玩家信息 */
        ModelCampBattle.prototype.updatePlayerInfo = function (data) {
            if (this._roadInfoList.length < 0)
                return;
            for (var i = 0; i < this._roadInfoList.length; i++) {
                if (this._roadInfoList[i].Pos == data.Pos) {
                    this._roadInfoList[i] = data;
                }
            }
        };
        /**请求鼓舞 */
        ModelCampBattle.prototype.requesGuWu = function (battleId) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Camp_DoGuWu);
            msg.BattleId = battleId;
            this.request(n.MessageMap.C2G_CAMP_DOGUWU, msg, utils.Handler.create(this, function (data) {
                _this._battleId = data.BattleId;
                _this._guWuTimes = data.GuWuInfo.YuanBaoGuWuTimes;
                _this._guWuNeedCount = data.GuWuInfo.YuanBaoGuWuNeed;
                if (_this._guWuCountChangHandler)
                    _this._guWuCountChangHandler.run();
            }));
        };
        /**请求助威 */
        ModelCampBattle.prototype.requesZhuWei = function (battleId) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Camp_DoZhuWei);
            msg.BattleId = battleId;
            this.request(n.MessageMap.C2G_CAMP_DOZHUWEI, msg, utils.Handler.create(this, function (data) {
                _this._battleId = data.BattleId;
                _this._myZhuWeiCount = data.MyZhuWeiCount;
                _this._leftZhuWeiCount = data.LeftTotal;
                _this._rightZhuWeiCount = data.RightTotal;
                if (_this._zuWeiCountChangHandler)
                    _this._zuWeiCountChangHandler.run();
            }));
        };
        /**请求更换军队 */
        ModelCampBattle.prototype.requesChangePet = function (battleId, playerId, pos, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Camp_ChangeRoad);
            msg.BattleId = battleId;
            msg.PlayerId = playerId;
            msg.Pos = pos;
            this.request(n.MessageMap.C2G_CAMP_CHANGEROAD, msg, utils.Handler.create(this, function (data) {
                if (_this._roadInfoList) {
                    for (var _i = 0, _a = _this._roadInfoList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._roadInfoList.length = 0;
                }
                _this._battleId = data.BattleId;
                var RoadInfoList = data.RoadInfoList.concat();
                for (var _b = 0, RoadInfoList_2 = RoadInfoList; _b < RoadInfoList_2.length; _b++) {
                    var RoadItem = RoadInfoList_2[_b];
                    RoadItem.autoRecover = false;
                    _this._roadInfoList.push(RoadItem);
                }
                _this.dispatchEventWith(ModelCampBattle.CAMPBATTLE_CHANGE_ROAD);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**获取战斗中双方的战绩 */
        ModelCampBattle.prototype.requesBattlePlayerInfo = function (battleId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Camp_GetBattlePlayerInfo);
            msg.BattleId = battleId;
            this.request(n.MessageMap.C2G_CAMP_GETBATTLEPLAYERINFO, msg, utils.Handler.create(this, function (data) {
                if (_this._campLeftRoadDetailList) {
                    for (var _i = 0, _a = _this._campLeftRoadDetailList; _i < _a.length; _i++) {
                        var leftitems = _a[_i];
                        n.MessagePool.to(leftitems);
                    }
                    _this._campLeftRoadDetailList.length = 0;
                }
                if (_this._campRightRoadDetailList) {
                    for (var _b = 0, _c = _this._campRightRoadDetailList; _b < _c.length; _b++) {
                        var rightitems = _c[_b];
                        n.MessagePool.to(rightitems);
                    }
                    _this._campRightRoadDetailList.length = 0;
                }
                _this._battleId = data.BattleId;
                var leftRoadDetailList = data.LeftRoadDetailList.concat();
                for (var _d = 0, leftRoadDetailList_1 = leftRoadDetailList; _d < leftRoadDetailList_1.length; _d++) {
                    var leftItem = leftRoadDetailList_1[_d];
                    leftItem.autoRecover = false;
                    _this._campLeftRoadDetailList.push(leftItem);
                }
                var rightRoadDetailList = data.RightRoadDetailList.concat();
                for (var _e = 0, rightRoadDetailList_1 = rightRoadDetailList; _e < rightRoadDetailList_1.length; _e++) {
                    var rightItem = rightRoadDetailList_1[_e];
                    rightItem.autoRecover = false;
                    _this._campRightRoadDetailList.push(rightItem);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**战斗结果 */
        ModelCampBattle.prototype.requsetBattleResultInfo = function (battleId) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Camp_GetBattleResultInfo);
            msg.BattleId = battleId;
            this.request(n.MessageMap.C2G_CAMP_GETBATTLERESULTINFO, msg, utils.Handler.create(this, function (data) {
                if (_this._resultPlayerList) {
                    for (var _i = 0, _a = _this._resultPlayerList; _i < _a.length; _i++) {
                        var players = _a[_i];
                        n.MessagePool.to(players);
                    }
                    _this._resultPlayerList.length = 0;
                }
                _this._battleId = data.BattleId;
                _this._winUnionId = data.WinUnionId;
                _this.updateWinUnionList(data.RoadWinUnionIdList);
                var resultPlayerList = data.PlayerList.concat();
                for (var _b = 0, resultPlayerList_1 = resultPlayerList; _b < resultPlayerList_1.length; _b++) {
                    var player = resultPlayerList_1[_b];
                    player.autoRecover = false;
                    _this._resultPlayerList.push(player);
                }
                if (app.gameContext.gameCurrent.type == TypeGame.CAMP_BATTLE_WAR) {
                    app.gameContext.exitToMainGame();
                    utils.timer.once(2000, _this, function () {
                        mg.uiManager.show(dialog.campBattle.CampBattleRank);
                    });
                }
                else {
                    if (_this._resultPlayerList.length > 0) {
                        mg.uiManager.show(dialog.campBattle.CampBattleRank);
                    }
                    else {
                        mg.alertManager.tip(Language.C_ZWZDXX);
                    }
                }
            }));
        };
        ModelCampBattle.prototype.campEndHandler = function (data) {
            if (this._resultPlayerList) {
                for (var _i = 0, _a = this._resultPlayerList; _i < _a.length; _i++) {
                    var players = _a[_i];
                    n.MessagePool.to(players);
                }
                this._resultPlayerList.length = 0;
            }
            this._battleId = data.BattleId;
            this._winUnionId = data.WinUnionId;
            this.updateWinUnionList(data.RoadWinUnionIdList);
            var resultPlayerList = data.PlayerList.concat();
            for (var _b = 0, resultPlayerList_2 = resultPlayerList; _b < resultPlayerList_2.length; _b++) {
                var player = resultPlayerList_2[_b];
                player.autoRecover = false;
                this._resultPlayerList.push(player);
            }
            if (app.gameContext.gameCurrent.type == TypeGame.CAMP_BATTLE_WAR) {
                app.gameContext.exitToMainGame();
                utils.timer.once(2000, this, function () {
                    mg.uiManager.show(dialog.campBattle.CampBattleRank);
                });
            }
            else {
                if (this._resultPlayerList.length > 0) {
                    mg.uiManager.show(dialog.campBattle.CampBattleRank);
                }
                else {
                    mg.alertManager.tip(Language.C_ZWZDXX);
                }
            }
        };
        ModelCampBattle.prototype.updateWinUnionList = function (idList) {
            this._roadWinUnionIdList = [];
            for (var i = 0; i < idList.length; i++) {
                this._roadWinUnionIdList.push(idList[i]);
            }
        };
        ModelCampBattle.prototype.campInitHandler = function (data) {
            if (this._campRemainInfoList) {
                for (var _i = 0, _a = this._campRemainInfoList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    n.MessagePool.to(item);
                }
                this._campRemainInfoList.length = 0;
            }
            this._leftZhuWeiCount = data.LeftZhuWuTotal;
            this._rightZhuWeiCount = data.RightZhuWuTotal;
            this._startLeftTime = data.StartLeftTime;
            var RemainInfoList = data.RemainInfoList.concat();
            for (var _b = 0, RemainInfoList_1 = RemainInfoList; _b < RemainInfoList_1.length; _b++) {
                var RemainItem = RemainInfoList_1[_b];
                RemainItem.autoRecover = false;
                this._campRemainInfoList.push(RemainItem);
            }
            if (this._campChangeHandler)
                this._campChangeHandler.run();
        };
        /**监听鼓舞次数变更*/
        ModelCampBattle.prototype.onGuWuCountChangHandler = function (caller, method) {
            this.offGuWuCountChangHandler();
            this._guWuCountChangHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelCampBattle.prototype.offGuWuCountChangHandler = function () {
            if (this._guWuCountChangHandler) {
                this._guWuCountChangHandler.recover();
                this._guWuCountChangHandler = null;
            }
        };
        /**监听助威次数变更*/
        ModelCampBattle.prototype.onZhuWeiCountChangHandler = function (caller, method) {
            this.offZhuWeiCountChangHandler();
            this._zuWeiCountChangHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelCampBattle.prototype.offZhuWeiCountChangHandler = function () {
            if (this._zuWeiCountChangHandler) {
                this._zuWeiCountChangHandler.recover();
                this._zuWeiCountChangHandler = null;
            }
        };
        ModelCampBattle.prototype.onCampChangeHandler = function (caller, method) {
            this.offCampChangeHandler();
            this._campChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelCampBattle.prototype.offCampChangeHandler = function () {
            if (this._campChangeHandler) {
                this._campChangeHandler.recover();
                this._campChangeHandler = null;
            }
        };
        ModelCampBattle.prototype.getUnionList = function (id) {
            var unionArr = [];
            var battleId = parseInt(id);
            switch (battleId) {
                case 801:
                    unionArr = [1, 2];
                    break;
                case 802:
                    unionArr = [2, 3];
                    break;
                case 803:
                    unionArr = [3, 1];
                    break;
            }
            return unionArr;
        };
        Object.defineProperty(ModelCampBattle.prototype, "campBattleIdList", {
            get: function () {
                return this._campBattleIdList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "campBattleEntryList", {
            get: function () {
                return this._campBattleEntryList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "battleId", {
            get: function () {
                return this._battleId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "joinBattleId", {
            get: function () {
                return this._joinBattleId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "joinBattlePos", {
            get: function () {
                return this._joinBattlePos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "guWuTimes", {
            get: function () {
                return this._guWuTimes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "guWuNeedCount", {
            get: function () {
                return this._guWuNeedCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "roadInfoList", {
            get: function () {
                return this._roadInfoList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "campRemainInfoList", {
            get: function () {
                return this._campRemainInfoList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "campLeftRoadDetailList", {
            get: function () {
                return this._campLeftRoadDetailList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "campRightRoadDetailList", {
            get: function () {
                return this._campRightRoadDetailList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "winUnionId", {
            get: function () {
                return this._winUnionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "roadWinUnionIdList", {
            get: function () {
                return this._roadWinUnionIdList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "resultPlayerList", {
            get: function () {
                return this._resultPlayerList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "myZhuWeiCount", {
            get: function () {
                return this._myZhuWeiCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "leftZhuWeiCount", {
            get: function () {
                return this._leftZhuWeiCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "rightZhuWeiCount", {
            get: function () {
                return this._rightZhuWeiCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "startLeftTime", {
            get: function () {
                return this._startLeftTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCampBattle.prototype, "canJoin", {
            get: function () {
                var time = 0;
                var isOpenSeason = GameModels.serverTime.getSeason() == 1;
                for (var i = 0; i < this._campBattleIdList.length; i++) {
                    if (this._campBattleIdList[i]) {
                        time = this.getopenTime(this._campBattleIdList[i]);
                        if (time - GameModels.timer.getPastSecond() > 0 && isOpenSeason) {
                            return true;
                        }
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        ModelCampBattle.prototype.getopenTime = function (id) {
            var time = 0;
            switch (id) {
                case 801:
                    time = 72000;
                    break;
                case 802:
                    time = 72000 + 1 * 600;
                    break;
                case 803:
                    time = 72000 + 2 * 600;
                    break;
            }
            return time;
        };
        Object.defineProperty(ModelCampBattle.prototype, "isCampBattleView", {
            get: function () {
                return this._isCampBattleView;
            },
            set: function (value) {
                this._isCampBattleView = value;
                GameModels.state.updateState(GameRedState.XIANSHI_SANGUO);
                GameModels.state.updateState(GameRedState.MAIN_UNION_WANFA_CAMPBATTLE);
            },
            enumerable: true,
            configurable: true
        });
        ModelCampBattle.prototype.isJoinBattle = function () {
            var isJoin = false;
            var count = 0;
            for (var i = 0; i < this._campBattleEntryList.length; i++) {
                if (this._campBattleEntryList[i] <= 0) {
                    count++;
                }
            }
            isJoin = count >= 2;
            return isJoin;
        };
        ModelCampBattle.JOINROAD_UPDATE = "JOINROAD_UPDATE";
        ModelCampBattle.CAMPBATTLE_UPDATA = "CAMPBATTLE_UPDATA";
        ModelCampBattle.CAMPBATTLE_CHANGE_ROAD = "CAMPBATTLE_CHANGE_ROAD";
        return ModelCampBattle;
    }(mo.ModelBase));
    mo.ModelCampBattle = ModelCampBattle;
    __reflect(ModelCampBattle.prototype, "mo.ModelCampBattle");
})(mo || (mo = {}));

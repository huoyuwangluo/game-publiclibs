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
var dialog;
(function (dialog) {
    var topBattle;
    (function (topBattle) {
        var TopBattleStepBattle1 = (function (_super) {
            __extends(TopBattleStepBattle1, _super);
            function TopBattleStepBattle1() {
                return _super.call(this) || this;
            }
            TopBattleStepBattle1.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._players = [
                    [this.player_1_1, this.player_1_2], [this.player_2_1, this.player_2_2],
                    [this.player_3_1, this.player_3_2], [this.player_4_1, this.player_4_2],
                    [this.player_5_1, this.player_5_2], [this.player_6_1, this.player_6_2],
                    [this.player_7_1, this.player_7_2], [this.player_8_1, this.player_8_2]
                ];
                this._results = [
                    [this.result_1_1, this.result_1_2], [this.result_2_1, this.result_2_2],
                    [this.result_3_1, this.result_3_2], [this.result_4_1, this.result_4_2],
                    [this.result_5_1, this.result_5_2], [this.result_6_1, this.result_6_2],
                    [this.result_7_1, this.result_7_2], [this.result_8_1, this.result_8_2]
                ];
                this._lines = [
                    [this.line_1_1, this.line_1_2], [this.line_2_1, this.line_2_2], [this.line_3_1, this.line_3_2],
                    [this.line_4_1, this.line_4_2], [this.line_5_1, this.line_5_2], [this.line_6_1, this.line_6_2],
                    [this.line_7_1, this.line_7_2], [this.line_8_1, this.line_8_2], [this.line_9_1, this.line_9_2],
                    [this.line_10_1, this.line_10_2], [this.line_11_1, this.line_11_2], [this.line_12_1, this.line_12_2],
                    [this.line_13_1, this.line_13_2], [this.line_14_1, this.line_14_2], [this.line_15_1, this.line_15_2]
                ];
                this._btnInfos = [
                    this.btnInfo_1, this.btnInfo_2, this.btnInfo_3, this.btnInfo_4, this.btnInfo_5,
                    this.btnInfo_6, this.btnInfo_7, this.btnInfo_8, this.btnInfo_9, this.btnInfo_10,
                    this.btnInfo_11, this.btnInfo_12, this.btnInfo_13, this.btnInfo_14, this.btnInfo_15
                ];
            };
            TopBattleStepBattle1.prototype.enter = function () {
                this._nextBegintime = 0;
                this._top16Rooms = [];
                this._roomInfo = null;
                this._winType = 0;
                this._isLastFight = false;
                utils.timer.clear(this, this.beginTsimerHandler);
                this.showView();
                for (var i = 0; i < this._btnInfos.length; i++) {
                    this._btnInfos[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.lookReportHandler, this);
                }
                for (var i = 0; i < this._players.length; i++) {
                    for (var j = 0; j < this._players[i].length; j++) {
                        this._players[i][j].addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerInfoHandler, this);
                    }
                }
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                this.imgWinner.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFirstPlayerClick, this);
                GameModels.topBattle.addEventListener(mo.ModelTopBattle.FIGHT_UPDATE, this.showView, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            };
            TopBattleStepBattle1.prototype.showView = function () {
                var _this = this;
                this.scroller.visible = false;
                this.labNo.visible = false;
                this.group.visible = false;
                this.noHashGuessGroup.visible = false;
                this._hashFightBegin = false;
                if (GameModels.serverTime.getSeason() != 0 || (GameModels.serverTime.getSeason() == 0 && GameModels.timer.getPastSecond() < 43200)) {
                    GameModels.topBattle.requsetGetTop16BattleInfo(utils.Handler.create(this, function () {
                        _this._top16Rooms = GameModels.topBattle.top16BattleList;
                        if (_this._top16Rooms.length >= 16) {
                            _this.group.visible = true;
                            _this._isLastFight = true;
                            _this.showBattleGroupView();
                            _this.LabNextFightTime.text = "";
                            _this.LabBattleTime.text = "";
                            _this.LabBattleTitle.text = Language.C_SYLZJSXQ;
                        }
                        else {
                            _this.noHashGuessGroup.visible = true;
                            _this.noBattleImg.source = "img_topBattleTitle1_png";
                            if (GameModels.serverTime.getSeason() == 0 && GameModels.timer.getPastSecond() < 43200) {
                                var leftDay = 0;
                            }
                            else {
                                var leftDay = 4 - GameModels.serverTime.getSeason();
                            }
                            var openTimeStr = utils.DateUtil.formatDateFromSecondsInChinese((GameModels.timer.getTimer() + 86400000 * leftDay) / 1000, true);
                            var str = openTimeStr.substring(5, openTimeStr.length);
                            _this.LabNextOpenHide.text = Language.getExpression(Language.E_XCDFSKQ, str);
                        }
                    }));
                }
                else {
                    var battleStep = GameModels.topBattle.battleStep;
                    this.LabBattleTitle.text = GameModels.topBattle.getFightName(battleStep);
                    var begionTime = GameModels.topBattle.getFightBeginTime(battleStep);
                    this.LabBattleTime.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_BSSJ, begionTime));
                    var myBattleStep = GameModels.topBattle.myBattle.battleStep;
                    var leftPlayerCount = GameModels.topBattle.leftPlayerCount;
                    var fightName = GameModels.topBattle.getFightName(battleStep);
                    this._nextBegintime = GameModels.topBattle.betLeftTime;
                    if (this._nextBegintime > 0) {
                        this._hashFightBegin = true;
                        this._nextBegintime = GameModels.topBattle.betLeftTime;
                    }
                    else {
                        this._nextBegintime = GameModels.topBattle.getFightEndTime(battleStep) - GameModels.timer.getPastSecond();
                    }
                    this.LabNextContent.text = Language.getExpression(this._hashFightBegin ? Language.E_1JJKSSY2R : Language.E_1JYSSY2R, fightName, leftPlayerCount) + "," + Language.getExpression(Language.E_WDZJ, myBattleStep);
                    this.LabNextFightTime.textFlow = this._nextBegintime > 0 ? utils.TextFlowMaker.htmlParser(Language.getExpression(this._hashFightBegin ? Language.E_1DJS : Language.E_BSZ, utils.DateUtil.formatTimeLeft(this._nextBegintime))) : [];
                    utils.timer.loop(1000, this, this.beginTsimerHandler);
                    if (battleStep > 16) {
                        GameModels.topBattle.requsetGetCurrentPlayerList(utils.Handler.create(this, function () {
                            _this.showListView();
                        }));
                        this.scroller.visible = true;
                    }
                    else {
                        this.group.visible = true;
                        this.list.dataProvider = this._listData = new eui.ArrayCollection([]);
                        GameModels.topBattle.requsetGetTop16BattleInfo(utils.Handler.create(this, function () {
                            _this._top16Rooms = GameModels.topBattle.top16BattleList;
                            _this.showBattleGroupView();
                        }));
                    }
                }
            };
            TopBattleStepBattle1.prototype.showBattleGroupView = function () {
                if (this._top16Rooms.length < 15) {
                    this.imgWinner.source = ResPath.getPlayerIconSmall(1);
                    this.labWinnerName.text = Language.Z_WU;
                }
                for (var i = 0; i < 15; i++) {
                    if (this._top16Rooms[i]) {
                        var room = this._top16Rooms[i];
                        var hashBottomPour = GameModels.topBattle.getBetInfoIndexBoo(i);
                        this._btnInfos[i].visible = room.status != 0;
                        if (i < 8) {
                            this.showBase16PlayerMsg(i, room);
                        }
                        else {
                            this.show9To14Lines(i, room);
                        }
                        //有冠军了
                        if (i == 14) {
                            this.showChampionView(i, room);
                        }
                    }
                    else {
                        this._btnInfos[i].visible = false;
                        for (var j = 0; j < this._lines[i].length; j++) {
                            this._lines[i][j].visible = false;
                            if (i < this._players.length) {
                                this._players[i][j].visible = false;
                            }
                        }
                    }
                }
            };
            TopBattleStepBattle1.prototype.showBase16PlayerMsg = function (index, room) {
                var players = room.players;
                if (!room || !players || !players.length)
                    return;
                for (var i = 0; i < this._players[index].length; i++) {
                    this._results[index][i].visible = false;
                    this._lines[index][i].visible = false;
                    if (players[i]) {
                        this._players[index][i].playerVo = players[i];
                        this._players[index][i].labText = players[i].playerName ? players[i].playerName : Language.C_KOQ;
                        if (room.winerId) {
                            this._results[index][i].visible = true;
                            if (players[i].playerId == room.winerId) {
                                this._lines[index][i].visible = true;
                                this._results[index][i].source = "peaksBattle_json.peaksBattle_win";
                                this._players[index][i].labTextColor = 0x84786a;
                                this._players[index][i].imageSource = "peaksBattle_json.peaksBattle_nameWin_bg";
                            }
                            else {
                                this._results[index][i].source = "peaksBattle_json.peaksBattle_lose";
                                this._players[index][i].labTextColor = 0x84786a;
                                this._players[index][i].imageSource = "peaksBattle_json.peaksBattle_name_bg";
                            }
                        }
                    }
                    else {
                        this._players[index][i].labText = Language.C_KOQ;
                        this._players[index][i].labTextColor = 0x84786a;
                    }
                }
            };
            TopBattleStepBattle1.prototype.show9To14Lines = function (index, room) {
                var players = room.players;
                if (!room || !players || !players.length)
                    return;
                for (var i = 0; i < this._lines[index].length; i++) {
                    this._lines[index][i].visible = false;
                    if (players[i]) {
                        if (room.winerId) {
                            if (players[i].playerId == room.winerId) {
                                this._lines[index][i].visible = true;
                            }
                        }
                    }
                }
            };
            TopBattleStepBattle1.prototype.showChampionView = function (index, room) {
                var players = room.players;
                if (!room || !players || !players.length)
                    return;
                for (var i = 0; i < players.length; i++) {
                    if (players[i]) {
                        if (room.winerId) {
                            if (players[i].playerId == room.winerId) {
                                this.imgWinner.source = ResPath.getPlayerIconSmall(players[i].head);
                                this.labWinnerName.text = players[i].playerName;
                                this.LabNextContent.text = (this._isLastFight ? Language.J_SYLDFS : Language.J_BLDFSYJS + ",") + Language.getExpression(Language.E_GUANJUN, players[i].playerName);
                            }
                        }
                        else {
                            this.imgWinner.source = ResPath.getPlayerIconSmall(1);
                            this.labWinnerName.text = Language.Z_WU;
                        }
                    }
                }
            };
            TopBattleStepBattle1.prototype.showListView = function () {
                this.scroller.visible = true;
                var playerList = GameModels.topBattle.currentPlayerList;
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(playerList);
                }
                else {
                    this._listData.source = playerList;
                }
                this.labNo.visible = playerList.length <= 0;
                this.list.dataProvider = this._listData;
            };
            //查看战报
            TopBattleStepBattle1.prototype.lookReportHandler = function (e) {
                var _this = this;
                var index = this._btnInfos.indexOf(e.target);
                this._roomInfo = null;
                this._winType = 0;
                this._roomInfo = this._top16Rooms[index];
                if (!this._roomInfo || !this._roomInfo.roomId)
                    return;
                GameModels.topBattle.requsetGetRoomSceneEndInfo(this._roomInfo.roomId, utils.Handler.create(this, function () {
                    _this.fightView();
                }));
            };
            TopBattleStepBattle1.prototype.fightView = function () {
                if (!this._roomInfo || !this._roomInfo.roomId)
                    return;
                var fightStatus = GameModels.topBattle.fightStatus;
                if (fightStatus == 1) {
                    app.gameContext.enterGameTopBattleRoom(this._roomInfo.roomId);
                }
                else if (fightStatus == 2) {
                    if (this._roomInfo.winerId) {
                        this._winType = this._roomInfo.winerId == this._roomInfo.leftPlayer.playerId ? 1 : 2;
                    }
                    var leftEnd = GameModels.topBattle.leftEndVo;
                    var rightEnd = GameModels.topBattle.rightEndVo;
                    mg.alertManager.showAlert(CopyBattleStatistics, true, true, leftEnd, rightEnd, this._winType);
                }
                else {
                    mg.alertManager.tip(Language.C_ZDWKS);
                }
            };
            //查看角色信息
            TopBattleStepBattle1.prototype.playerInfoHandler = function (e) {
                var playerItem = e.target;
                var player = playerItem.playerVo;
                if (!player)
                    return;
                var playerId = player.playerId;
                if (!!playerId) {
                    GameModels.friends.getPromptInfo(playerId, utils.Handler.create(this, function (info, count) {
                        mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
                    }));
                }
            };
            TopBattleStepBattle1.prototype.onListClick = function (e) {
                var player = this.list.selectedItem;
                GameModels.friends.getPromptInfo(player.playerId, utils.Handler.create(this, function (info, count) {
                    mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
                }));
            };
            TopBattleStepBattle1.prototype.onFirstPlayerClick = function (e) {
                var playerId = "";
                var room = this._top16Rooms[14]; //最后一个比赛房间
                if (room) {
                    if (room.winerId) {
                        playerId = room.winerId;
                        GameModels.friends.getPromptInfo(playerId, utils.Handler.create(this, function (info, count) {
                            mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
                        }));
                    }
                    else {
                        mg.alertManager.tip(Language.C_ZWGJ);
                    }
                }
                else {
                    mg.alertManager.tip(Language.J_ZWCSGJ);
                }
            };
            TopBattleStepBattle1.prototype.beginTsimerHandler = function () {
                this._nextBegintime--;
                if (this._nextBegintime <= 0) {
                    this._nextBegintime = 0;
                    this.LabNextFightTime.text = "";
                    utils.timer.clear(this, this.beginTsimerHandler);
                    return;
                }
                this.LabNextFightTime.textFlow = this._nextBegintime > 0 ? utils.TextFlowMaker.htmlParser(Language.getExpression(this._hashFightBegin ? Language.E_1DJS : Language.E_BSZ, utils.DateUtil.formatTimeLeft(this._nextBegintime))) : [];
            };
            TopBattleStepBattle1.prototype.onBtnClick = function (e) {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5901).des);
            };
            TopBattleStepBattle1.prototype.exit = function () {
                this._roomInfo = null;
                this._nextBegintime = 0;
                this._top16Rooms = [];
                this._winType = 0;
                utils.timer.clear(this, this.beginTsimerHandler);
                for (var i = 0; i < this._btnInfos.length; i++) {
                    this._btnInfos[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.lookReportHandler, this);
                }
                for (var i = 0; i < this._players.length; i++) {
                    for (var j = 0; j < this._players[i].length; j++) {
                        this._players[i][j].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playerInfoHandler, this);
                    }
                }
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                this.imgWinner.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFirstPlayerClick, this);
                GameModels.topBattle.removeEventListener(mo.ModelTopBattle.FIGHT_UPDATE, this.showView, this);
            };
            return TopBattleStepBattle1;
        }(ui.TopBattleStepBattleSkin));
        topBattle.TopBattleStepBattle1 = TopBattleStepBattle1;
        __reflect(TopBattleStepBattle1.prototype, "dialog.topBattle.TopBattleStepBattle1");
    })(topBattle = dialog.topBattle || (dialog.topBattle = {}));
})(dialog || (dialog = {}));

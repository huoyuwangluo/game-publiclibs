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
        var TopBattleMyBattle = (function (_super) {
            __extends(TopBattleMyBattle, _super);
            function TopBattleMyBattle() {
                return _super.call(this) || this;
            }
            TopBattleMyBattle.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            TopBattleMyBattle.prototype.enter = function () {
                this._count = 0;
                this._angle = 0;
                this._leftBegintime = 0;
                this._nextBegintime = 0;
                this._myBattle = null;
                this._winType = 0;
                this.showView();
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.Check.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnFightRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnHistoryRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgLeftHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgRightHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                GameModels.topBattle.addEventListener(mo.ModelTopBattle.FIGHT_UPDATE, this.showView, this);
                this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            };
            TopBattleMyBattle.prototype.showView = function () {
                utils.timer.clear(this, this.timerHandler);
                utils.timer.clear(this, this.beginTsimerHandler);
                egret.Tween.removeTweens(this.imgPreBg);
                this.noBattleGroup.visible = false;
                this.HashBattleGroup.visible = false;
                this.imgHelp.y = 665;
                var battleStep = GameModels.topBattle.battleStep;
                var leftPlayerCount = GameModels.topBattle.leftPlayerCount;
                this._hashFightBegin = false;
                this.btnHistoryRecord.visible = GameModels.topBattle.recordList.length > 0;
                var fightName = GameModels.topBattle.getFightName(battleStep);
                if (GameModels.serverTime.getSeason() != 0 || (GameModels.serverTime.getSeason() == 0 && GameModels.timer.getPastSecond() < 43200)) {
                    this.noBattleGroup.visible = true;
                    this.tweenPreviewImgHandler();
                    this.noBattleImg.source = "img_topBattleTitle1_png";
                    if (GameModels.serverTime.getSeason() == 0 && GameModels.timer.getPastSecond() < 43200) {
                        var leftDay = 0;
                    }
                    else {
                        var leftDay = 4 - GameModels.serverTime.getSeason();
                    }
                    var openTimeStr = utils.DateUtil.formatDateFromSecondsInChinese((GameModels.timer.getTimer() + 86400000 * leftDay) / 1000, true);
                    var str = openTimeStr.substring(5, openTimeStr.length);
                    this.LabNextOpenHide.text = Language.getExpression(Language.E_XCDFSKQ, str);
                    this.LabNextOpenTime.text = "";
                }
                else {
                    this._myBattle = GameModels.topBattle.myBattle;
                    if (!this._myBattle.roomId) {
                        this.noBattleGroup.visible = true;
                        this.noBattleImg.source = "img_topBattleTitle2_png";
                        this._leftBegintime = GameModels.topBattle.betLeftTime;
                        this.LabNextOpenHide.text = Language.getExpression(this._leftBegintime > 0 ? Language.E_1JJKSSY2R : Language.E_1JYSSY2R, fightName, leftPlayerCount);
                        this.LabNextOpenTime.textFlow = this._leftBegintime > 0 ? utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_1DJS, utils.DateUtil.formatTimeLeft(this._leftBegintime))) : [];
                        utils.timer.loop(1000, this, this.timerHandler);
                        this.tweenPreviewImgHandler();
                        this.hashFirst(1);
                    }
                    else {
                        var myBattleStep = this._myBattle.battleStep;
                        if (!this._myBattle.leftPlayer.playerId || !this._myBattle.rightPlayer.playerId) {
                            this.noBattleGroup.visible = true;
                            this.noBattleImg.source = "img_topBattleTitle3_png";
                            this._nextBegintime = GameModels.topBattle.betLeftTime;
                            this.LabNextOpenHide.text = Language.getExpression(this._nextBegintime > 0 ? Language.E_1JJKSSY2R : Language.E_1JYSSY2R, fightName, leftPlayerCount) + "," + Language.getExpression(Language.E_WDZJ, myBattleStep);
                            this.LabNextOpenTime.textFlow = this._nextBegintime > 0 ? utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_1DJS, utils.DateUtil.formatTimeLeft(this._nextBegintime))) : [];
                            utils.timer.loop(1000, this, this.beginTsimerHandler);
                            this.tweenPreviewImgHandler();
                            this.hashFirst(1);
                        }
                        else {
                            this.imgHelp.y = 748;
                            this.HashBattleGroup.visible = true;
                            this.LabFightStep.text = GameModels.topBattle.getFightName(myBattleStep);
                            var begionTime = GameModels.topBattle.getFightBeginTime(myBattleStep);
                            this.LabFightBeginTime.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_BSSJ, begionTime));
                            this.imgLeftHead.source = ResPath.getPlayerIconSmall(this._myBattle.leftPlayer.head);
                            this.imgRightHead.source = ResPath.getPlayerIconSmall(this._myBattle.rightPlayer.head);
                            this.labLeftPlayerName.text = this._myBattle.leftPlayer.playerName;
                            this.labRightPlayerName.text = this._myBattle.rightPlayer.playerName;
                            this.labLeftLv.text = this._myBattle.leftPlayer.level + Language.C_JI;
                            this.labRightLv.text = this._myBattle.rightPlayer.level + Language.C_JI;
                            this.labLeftFight.text = this._myBattle.leftPlayer.playerFight.toString();
                            this.labRightFight.text = this._myBattle.rightPlayer.playerFight.toString();
                            this.Check.visible = this._myBattle.status != 0;
                            if (this._myBattle.winerId) {
                                this._winType = this._myBattle.winerId == this._myBattle.leftPlayer.playerId ? 1 : 2;
                                this.imgLeftWin.visible = this.imgRightWin.visible = true;
                                this.imgLeftWin.source = this._myBattle.winerId == this._myBattle.leftPlayer.playerId ? "topBattle_json.img_battleWin" : "topBattle_json.img_battleLose";
                                this.imgRightWin.source = this._myBattle.winerId == this._myBattle.rightPlayer.playerId ? "topBattle_json.img_battleWin" : "topBattle_json.img_battleLose";
                            }
                            else {
                                this.imgLeftWin.visible = this.imgRightWin.visible = false;
                            }
                            this._nextBegintime = GameModels.topBattle.betLeftTime;
                            if (this._nextBegintime > 0) {
                                this._hashFightBegin = true;
                                this._nextBegintime = GameModels.topBattle.betLeftTime;
                            }
                            else {
                                this._nextBegintime = GameModels.topBattle.getFightEndTime(battleStep) - GameModels.timer.getPastSecond();
                            }
                            this.LabEndRecord.visible = !!this._myBattle.winerId && this._myBattle.winerId != GameModels.user.player.uid;
                            this.LabEndRecord.text = Language.getExpression(Language.E_NCJ1Q, myBattleStep);
                            if (!!this._myBattle.winerId && this._myBattle.winerId != GameModels.user.player.uid) {
                                this._nextBegintime = 0;
                            }
                            if (leftPlayerCount <= 1) {
                                if (myBattleStep <= 2) {
                                    var str = this._winType == 1 ? Language.J_GUNJUN : Language.J_YAJUN;
                                    this.LabNextContent.text = Language.J_BLDFSYJS + "," + Language.getExpression(Language.E_WDZJ, str);
                                    this.LabEndRecord.visible = true;
                                    this.LabEndRecord.text = Language.J_NCJ1Q;
                                }
                                else {
                                    this.hashFirst(2);
                                }
                            }
                            else {
                                this.LabNextContent.text = Language.getExpression(this._hashFightBegin ? Language.E_1JJKSSY2R : Language.E_1JYSSY2R, fightName, leftPlayerCount) + "," + Language.getExpression(Language.E_WDZJ, myBattleStep);
                                this.hashFirst(2);
                            }
                            this.LabNextFightTime.textFlow = this._nextBegintime > 0 ? utils.TextFlowMaker.htmlParser(Language.getExpression(this._hashFightBegin ? Language.E_1DJS : Language.E_BSZ, utils.DateUtil.formatTimeLeft(this._nextBegintime))) : [];
                            utils.timer.loop(1000, this, this.beginTsimerHandler);
                        }
                    }
                }
            };
            TopBattleMyBattle.prototype.hashFirst = function (type) {
                var _this = this;
                GameModels.topBattle.requsetGetTop16BattleInfo(utils.Handler.create(this, function () {
                    var rooms = GameModels.topBattle.top16BattleList;
                    var room = rooms[14];
                    if (!room)
                        return;
                    for (var i = 0; i < room.players.length; i++) {
                        if (room.winerId) {
                            if (room.players[i].playerId == room.winerId) {
                                if (type == 2) {
                                    _this.LabNextContent.text = Language.J_BLDFSYJS + "," + Language.getExpression(Language.E_GUANJUN, room.players[i].playerName);
                                }
                                else {
                                    _this.LabNextOpenHide.text = Language.J_BLDFSYJS + "," + Language.getExpression(Language.E_GUANJUN, room.players[i].playerName);
                                }
                                break;
                            }
                        }
                    }
                }));
            };
            TopBattleMyBattle.prototype.timerHandler = function () {
                this._leftBegintime--;
                if (this._leftBegintime <= 0) {
                    this._leftBegintime = 0;
                    this.LabNextOpenTime.text = "";
                    utils.timer.clear(this, this.timerHandler);
                    return;
                }
                this.LabNextOpenTime.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_JLKSHY, utils.DateUtil.formatTimeLeft(this._leftBegintime)));
            };
            TopBattleMyBattle.prototype.beginTsimerHandler = function () {
                this._nextBegintime--;
                if (this._nextBegintime <= 0) {
                    this._nextBegintime = 0;
                    this.LabNextFightTime.text = "";
                    utils.timer.clear(this, this.beginTsimerHandler);
                    return;
                }
                this.LabNextFightTime.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(this._hashFightBegin ? Language.E_1DJS : Language.E_BSZ, utils.DateUtil.formatTimeLeft(this._nextBegintime)));
            };
            TopBattleMyBattle.prototype.onBtnClick = function (e) {
                var _this = this;
                switch (e.target) {
                    case this.imgHelp:
                        mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5901).des);
                        break;
                    case this.btnFightRecord:
                        mg.alertManager.showAlert(dialog.topBattle.TopBattleBattleRecordList, true, true);
                        break;
                    case this.btnHistoryRecord:
                        mg.alertManager.showAlert(dialog.topBattle.TopBattleBattleRecordList, true, true);
                        break;
                    case this.imgLeftHead:
                        GameModels.friends.getPromptInfo(this._myBattle.leftPlayer.playerId, utils.Handler.create(this, function (info, count) {
                            mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
                        }));
                        break;
                    case this.imgRightHead:
                        GameModels.friends.getPromptInfo(this._myBattle.rightPlayer.playerId, utils.Handler.create(this, function (info, count) {
                            mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
                        }));
                        break;
                    case this.Check:
                        GameModels.topBattle.requsetGetRoomSceneEndInfo(this._myBattle.roomId, utils.Handler.create(this, function () {
                            _this.fightView();
                        }));
                        break;
                    case this.btnReward:
                        mg.uiManager.show(dialog.shop.MallChangeShopMain, { tabIndex: 2 });
                        break;
                }
            };
            TopBattleMyBattle.prototype.fightView = function () {
                var _this = this;
                if (!this._myBattle || !this._myBattle.roomId)
                    return;
                var fightStatus = GameModels.topBattle.fightStatus;
                if (fightStatus == 1) {
                    app.gameContext.enterGameTopBattleRoom(this._myBattle.roomId);
                }
                else if (fightStatus == 2) {
                    GameModels.topBattle.initTopBattleInfo(utils.Handler.create(this, function () {
                        _this.showView();
                    }));
                    var leftEnd = GameModels.topBattle.leftEndVo;
                    var rightEnd = GameModels.topBattle.rightEndVo;
                    mg.alertManager.showAlert(CopyBattleStatistics, true, true, leftEnd, rightEnd, this._winType);
                }
                else {
                    mg.alertManager.tip(Language.C_ZDWKS);
                }
            };
            TopBattleMyBattle.prototype.tweenPreviewImgHandler = function () {
                this._count++;
                this._angle = this._count * 360;
                egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
            };
            TopBattleMyBattle.prototype.exit = function () {
                this._count = 0;
                this._angle = 0;
                egret.Tween.removeTweens(this.imgPreBg);
                this._leftBegintime = 0;
                this._nextBegintime = 0;
                this._winType = 0;
                this._myBattle = null;
                utils.timer.clear(this, this.timerHandler);
                utils.timer.clear(this, this.beginTsimerHandler);
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnHistoryRecord.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnFightRecord.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgLeftHead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgRightHead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.Check.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                GameModels.topBattle.removeEventListener(mo.ModelTopBattle.FIGHT_UPDATE, this.showView, this);
                this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            };
            return TopBattleMyBattle;
        }(ui.TopBattleMyBattleSkin));
        topBattle.TopBattleMyBattle = TopBattleMyBattle;
        __reflect(TopBattleMyBattle.prototype, "dialog.topBattle.TopBattleMyBattle");
    })(topBattle = dialog.topBattle || (dialog.topBattle = {}));
})(dialog || (dialog = {}));

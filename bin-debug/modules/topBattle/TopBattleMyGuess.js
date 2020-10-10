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
        var TopBattleMyGuess = (function (_super) {
            __extends(TopBattleMyGuess, _super);
            function TopBattleMyGuess() {
                return _super.call(this) || this;
            }
            TopBattleMyGuess.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            TopBattleMyGuess.prototype.enter = function () {
                this._myGuessBattle = null;
                this._guessVo = null;
                this._leftGuesstime = 0;
                this._winType = 0;
                this.showView();
                this.btnMyGuess.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgLeftHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgRightHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnLeftGuess.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnRightGuess.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.Check.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                GameModels.topBattle.addEventListener(mo.ModelTopBattle.GUESS_UPDATE, this.showView, this);
                GameModels.topBattle.addEventListener(mo.ModelTopBattle.FIGHT_UPDATE, this.showView, this);
            };
            TopBattleMyGuess.prototype.showView = function () {
                utils.timer.clear(this, this.timerHandler);
                this.HashGuessGroup.visible = false;
                this.noHashGuessGroup.visible = false;
                this.imgHelp.y = 665;
                if (GameModels.serverTime.getSeason() != 0 || (GameModels.serverTime.getSeason() == 0 && GameModels.timer.getPastSecond() < 43200)) {
                    this.noHashGuessGroup.visible = true;
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
                }
                else {
                    this._myGuessBattle = GameModels.topBattle.betBattle;
                    this._leftGuesstime = GameModels.topBattle.betLeftTime;
                    this._guessVo = GameModels.topBattle.betInfo;
                    this.LabNextContent.textFlow = utils.TextFlowMaker.htmlParser(Language.E_DHBL);
                    this.LabFightStep.text = "";
                    this.LabFightBeginTime.text = "";
                    if (this._myGuessBattle && this._myGuessBattle.roomId && this._myGuessBattle.leftPlayer && this._myGuessBattle.rightPlayer) {
                        this.imgHelp.y = 748;
                        this.HashGuessGroup.visible = true;
                        this.LabFightStep.text = GameModels.topBattle.getFightName(this._myGuessBattle.battleStep) + Language.C_JC;
                        this.LabFightBeginTime.textFlow = this._leftGuesstime > 0 ? utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_JC1DJS, utils.DateUtil.formatTimeLeft(this._leftGuesstime))) : [];
                        utils.timer.loop(1000, this, this.timerHandler);
                        this.imgLeftHead.source = ResPath.getPlayerIconSmall(this._myGuessBattle.leftPlayer.head);
                        this.imgRightHead.source = ResPath.getPlayerIconSmall(this._myGuessBattle.rightPlayer.head);
                        this.labLeftPlayerName.text = this._myGuessBattle.leftPlayer.playerName;
                        this.labRightPlayerName.text = this._myGuessBattle.rightPlayer.playerName;
                        this.labLeftFight.text = this._myGuessBattle.leftPlayer.playerFight.toString();
                        this.labRightFight.text = this._myGuessBattle.rightPlayer.playerFight.toString();
                        this.Check.visible = this._myGuessBattle.status != 0;
                        this.LabLeftName.text = this._myGuessBattle.leftPlayer.playerName;
                        this.LabRightName.text = this._myGuessBattle.rightPlayer.playerName;
                        this.labLeftLv.text = this._myGuessBattle.leftPlayer.level + Language.C_JI;
                        this.labRightLv.text = this._myGuessBattle.rightPlayer.level + Language.C_JI;
                        if (this._myGuessBattle.winerId) {
                            this._winType = this._myGuessBattle.winerId == this._myGuessBattle.leftPlayer.playerId ? 1 : 2;
                            this.imgLeftWin.visible = this.imgRightWin.visible = true;
                            this.imgLeftWin.source = this._myGuessBattle.winerId == this._myGuessBattle.leftPlayer.playerId ? "topBattle_json.img_battleWin" : "topBattle_json.img_battleLose";
                            this.imgRightWin.source = this._myGuessBattle.winerId == this._myGuessBattle.rightPlayer.playerId ? "topBattle_json.img_battleWin" : "topBattle_json.img_battleLose";
                        }
                        else {
                            this.imgLeftWin.visible = this.imgRightWin.visible = false;
                        }
                        this.LabLeftOdds.text = Language.getExpression(Language.E_1PLV, (this._guessVo.betLeftRate / 100));
                        this.LabRightOdds.text = Language.getExpression(Language.E_1PLV, (this._guessVo.betRightRate / 100));
                        var myCoin = GameModels.topBattle.myCoin;
                        if (this._guessVo.betType == 0 && myCoin < 100)
                            myCoin = 100;
                        this.labCount1.text = myCoin.toString();
                        this.labLeftBetCount.text = this._guessVo.betLeftCount.toString();
                        this.labRightBetCount.text = this._guessVo.betRightCount.toString();
                        var max = this._guessVo.betLeftCount + this._guessVo.betRightCount;
                        this.guessProess.show(1, this._guessVo.betLeftCount, max);
                        this.guessProess.show(2, this._guessVo.betRightCount, max);
                        this.btnLeftGuess.visible = this.btnRightGuess.visible = this._guessVo.betType == 0;
                        var temGuessGold = Templates.getTemplateById(templates.Map.ITEM, 2401);
                        this.imgNeedIcon1.source = temGuessGold.icon;
                    }
                    else {
                        this.noHashGuessGroup.visible = true;
                        this.noBattleImg.source = "img_topBattleTitle3_png";
                        this.LabNextOpenHide.text = Language.J_JQQDXLJC;
                    }
                }
            };
            TopBattleMyGuess.prototype.timerHandler = function () {
                this._leftGuesstime--;
                if (this._leftGuesstime <= 0) {
                    this._leftGuesstime = 0;
                    this.LabFightBeginTime.text = "";
                    utils.timer.clear(this, this.timerHandler);
                    return;
                }
                this.LabFightBeginTime.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_JC1DJS, utils.DateUtil.formatTimeLeft(this._leftGuesstime)));
            };
            TopBattleMyGuess.prototype.onBtnClick = function (e) {
                var _this = this;
                switch (e.target) {
                    case this.btnMyGuess:
                        mg.alertManager.showAlert(dialog.topBattle.TopBattleMyGuessList, true, true);
                        break;
                    case this.imgLeftHead:
                        GameModels.friends.getPromptInfo(this._myGuessBattle.leftPlayer.playerId, utils.Handler.create(this, function (info, count) {
                            mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
                        }));
                        break;
                    case this.imgRightHead:
                        GameModels.friends.getPromptInfo(this._myGuessBattle.rightPlayer.playerId, utils.Handler.create(this, function (info, count) {
                            mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
                        }));
                        break;
                    case this.Check:
                        GameModels.topBattle.requsetGetRoomSceneEndInfo(this._myGuessBattle.roomId, utils.Handler.create(this, function () {
                            _this.fightView();
                        }));
                        break;
                    case this.btnLeftGuess:
                        mg.alertManager.showAlert(dialog.topBattle.TopBattleGuessAlert, true, true, 1);
                        break;
                    case this.btnRightGuess:
                        mg.alertManager.showAlert(dialog.topBattle.TopBattleGuessAlert, true, true, 2);
                        break;
                    case this.imgHelp:
                        mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5901).des);
                        break;
                }
            };
            TopBattleMyGuess.prototype.fightView = function () {
                var _this = this;
                if (!this._myGuessBattle || !this._myGuessBattle.roomId)
                    return;
                var fightStatus = GameModels.topBattle.fightStatus;
                if (fightStatus == 1) {
                    app.gameContext.enterGameTopBattleRoom(this._myGuessBattle.roomId);
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
            TopBattleMyGuess.prototype.exit = function () {
                this._winType = 0;
                this._myGuessBattle = null;
                utils.timer.clear(this, this.timerHandler);
                this.btnMyGuess.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgLeftHead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgRightHead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnLeftGuess.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnRightGuess.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                GameModels.topBattle.removeEventListener(mo.ModelTopBattle.GUESS_UPDATE, this.showView, this);
                GameModels.topBattle.removeEventListener(mo.ModelTopBattle.FIGHT_UPDATE, this.showView, this);
                this.Check.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            };
            return TopBattleMyGuess;
        }(ui.TopBattleMyGuessSkin));
        topBattle.TopBattleMyGuess = TopBattleMyGuess;
        __reflect(TopBattleMyGuess.prototype, "dialog.topBattle.TopBattleMyGuess");
    })(topBattle = dialog.topBattle || (dialog.topBattle = {}));
})(dialog || (dialog = {}));

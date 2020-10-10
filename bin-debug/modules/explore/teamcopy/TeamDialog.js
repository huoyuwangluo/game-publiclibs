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
    var explore;
    (function (explore) {
        var TeamDialog = (function (_super) {
            __extends(TeamDialog, _super);
            function TeamDialog() {
                return _super.call(this) || this;
            }
            TeamDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._passrwards = [this.passreward0, this.passreward1, this.passreward2, this.passreward3];
                this._helprwards = [this.helpreward0, this.helpreward1, this.helpreward2, this.helpreward3];
                this._playInfos = [this.playerInfo0, this.playerInfo1, this.playerInfo2];
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                Mediator.getMediator(this).onUpdate(this, this.update);
            };
            TeamDialog.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                GameModels.copyMaterial.resetTeamLock();
                this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
                GameModels.copyMaterial.addEventListener(mo.ModelGameMaterial.NOTICE_TEAM_LEADER_START, this.noticeTeamLeaderStart, this);
                this.showView();
            };
            TeamDialog.prototype.exit = function () {
                if (!GameModels.copyMaterial.teamLock) {
                    GameModels.copyMaterial.sendTeamExit();
                    GameModels.copyMaterial.unTeamLock();
                }
                this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
                GameModels.copyMaterial.removeEventListener(mo.ModelGameMaterial.NOTICE_TEAM_LEADER_START, this.noticeTeamLeaderStart, this);
                for (var _i = 0, _a = this._playInfos; _i < _a.length; _i++) {
                    var info = _a[_i];
                    info.data = null;
                }
                for (var _b = 0, _c = this._passrwards; _b < _c.length; _b++) {
                    var pitem = _c[_b];
                    pitem.dataSource = null;
                }
                for (var _d = 0, _e = this._helprwards; _d < _e.length; _d++) {
                    var hitem = _e[_d];
                    hitem.dataSource = null;
                }
            };
            TeamDialog.prototype.update = function () {
                this.showView();
            };
            TeamDialog.prototype.showView = function () {
                this._copyVO = GameModels.copyMaterial.getTypelistVOById(mo.ModelGameMaterial.COPY_TEAM, GameModels.copyMaterial.copyId());
                var rewards = this._copyVO.template.firstDrop.split(";");
                var i = 0;
                for (i = 0; i < 4; i++) {
                    var iconBox = this._passrwards[i];
                    if (i < rewards.length) {
                        iconBox.dataSource = rewards[i];
                        this.passGroup.addChild(iconBox);
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.dataSource = null;
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
                var otherMonsterTemp = Templates.getTemplateById(templates.Map.OTHERMONSTER, this._copyVO.template.boss);
                rewards = otherMonsterTemp.baseDrop.split(";");
                for (i = 0; i < 4; i++) {
                    var helpBox = this._helprwards[i];
                    if (i < rewards.length) {
                        helpBox.dataSource = rewards[i];
                        this.helpGroup.addChild(helpBox);
                    }
                    else {
                        if (helpBox.parent) {
                            helpBox.dataSource = null;
                            helpBox.parent.removeChild(helpBox);
                        }
                    }
                }
                var playerInfos = GameModels.copyMaterial.playerInfos();
                for (var i = 0; i < this._playInfos.length; i++) {
                    if (playerInfos[i]) {
                        this._playInfos[i].data = { playerInfo: playerInfos[i], copyId: this._copyVO.id };
                    }
                    else {
                        this._playInfos[i].data = null;
                    }
                }
                var helpCount = 0;
                for (var _i = 0, playerInfos_1 = playerInfos; _i < playerInfos_1.length; _i++) {
                    var playerInfo = playerInfos_1[_i];
                    if (GameModels.user.player.uid == playerInfo.PlayerId) {
                        helpCount = playerInfo.helpCount;
                    }
                }
                if (GameModels.user.player.uid == playerInfos[0].PlayerId) {
                    this.btnEnter.label = Language.C_KSTZ;
                }
                else {
                    this.btnEnter.label = Language.J_TXDZKS;
                }
                var temp = GameModels.dataSet.getDataSettingById(350001);
                this.labNum.text = "(" + helpCount + "/" + temp.value + Language.Z_CI + ")";
            };
            TeamDialog.prototype.onEnterClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                var playerInfos = GameModels.copyMaterial.playerInfos();
                if (GameModels.user.player.uid == playerInfos[0].PlayerId) {
                    GameModels.copyMaterial.sendTeamStart();
                }
                else {
                    GameModels.copyMaterial.requesTeamLeaderStart(utils.Handler.create(this, function () {
                        mg.alertManager.tip(Language.J_TXCG);
                    }));
                }
            };
            TeamDialog.prototype.noticeTeamLeaderStart = function (e) {
                var playerName = e.data;
                var content = Language.getExpression(Language.E_DY1TXNJKJRFB, playerName);
                // var textElement:egret.ITextElement[] = utils.TextFlowMaker.htmlParser(content);
                mg.alertManager.showAlert(PromptAlert, false, true, content, TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                    GameModels.copyMaterial.sendTeamStart();
                }), null, true);
            };
            return TeamDialog;
        }(ui.TeamDialogSkin));
        explore.TeamDialog = TeamDialog;
        __reflect(TeamDialog.prototype, "dialog.explore.TeamDialog");
    })(explore = dialog.explore || (dialog.explore = {}));
})(dialog || (dialog = {}));

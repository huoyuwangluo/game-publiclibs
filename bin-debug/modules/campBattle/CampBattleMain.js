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
    var campBattle;
    (function (campBattle) {
        var CampBattleMain = (function (_super) {
            __extends(CampBattleMain, _super);
            function CampBattleMain() {
                return _super.call(this) || this;
            }
            CampBattleMain.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            CampBattleMain.prototype.enter = function (data) {
                if (GameModels.user.player.legionId == "") {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.J_NSWJRZY, TypeBtnLabel.OK_SIGIN, null, utils.Handler.create(this, function () {
                        mg.uiManager.removeAllDialogs();
                        mg.uiManager.show(LegionList);
                    }));
                    return;
                }
                GameModels.campBattle.isCampBattleView = true;
                this.show();
                this.btnEnter1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                this.btnEnter2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                GameModels.activityNotice.addEventListener(mo.ModelActivityNotice.ACTIVITY_NOTICE_UPDATA, this.show, this);
                GameModels.campBattle.addEventListener(mo.ModelCampBattle.JOINROAD_UPDATE, this.show, this);
            };
            CampBattleMain.prototype.show = function () {
                GameModels.campBattle.updateCampBattleInfo(utils.Handler.create(this, function () {
                    this.showView();
                }));
            };
            CampBattleMain.prototype.showView = function () {
                this._canJoin = GameModels.campBattle.canJoin;
                this._isCampActivite = GameModels.activityNotice.isCampBattleAcvitive;
                var campBattleId = GameModels.campBattle.campBattleIdList;
                var campEntryList = GameModels.campBattle.campBattleEntryList;
                var actTmp = Templates.getTemplateById(templates.Map.SCENEACTIVITY, campBattleId[0]);
                var actTmp1 = Templates.getTemplateById(templates.Map.SCENEACTIVITY, campBattleId[1]);
                this.labTime1.text = Language.getExpression(Language.E_TIMEKZ, Language.C_CTIAN, actTmp.activeTime.split("-")[0]);
                this.labTime2.text = Language.getExpression(Language.E_TIMEKZ, Language.C_CTIAN, actTmp1.activeTime.split("-")[0]);
                var unionArr = GameModels.campBattle.getUnionList(campBattleId[0]);
                for (var i = 0; i < unionArr.length; i++) {
                    if (GameModels.user.player.unionId == unionArr[i]) {
                        this.imgCamp1.source = "img_countryWar_" + unionArr[i] + "_png";
                    }
                    else {
                        this.imgCamp2.source = "img_countryWar_" + unionArr[i] + "_png";
                    }
                }
                var unionArr1 = GameModels.campBattle.getUnionList(campBattleId[1]);
                for (var i = 0; i < unionArr1.length; i++) {
                    if (GameModels.user.player.unionId == unionArr1[i]) {
                        this.imgCamp3.source = "img_countryWar_" + unionArr1[i] + "_png";
                    }
                    else {
                        this.imgCamp4.source = "img_countryWar_" + unionArr1[i] + "_png";
                    }
                }
                if (campEntryList[0] == 0) {
                    this.btnEnter1.label = Language.C_CJ;
                }
                else if (campEntryList[0] == 1) {
                    this.btnEnter1.label = Language.C_YCJ;
                }
                else if (campEntryList[0] == 2) {
                    this.btnEnter1.label = Language.C_GZ;
                }
                else {
                    this.btnEnter1.label = Language.C_CK;
                }
                if (campEntryList[1] == 0) {
                    this.btnEnter2.label = Language.C_CJ;
                }
                else if (campEntryList[1] == 1) {
                    this.btnEnter2.label = Language.C_YCJ;
                }
                else if (campEntryList[1] == 2) {
                    this.btnEnter2.label = Language.C_GZ;
                }
                else {
                    this.btnEnter2.label = Language.C_CK;
                }
            };
            CampBattleMain.prototype.exit = function () {
                this.btnEnter1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                this.btnEnter2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                GameModels.campBattle.removeEventListener(mo.ModelCampBattle.JOINROAD_UPDATE, this.showView, this);
            };
            CampBattleMain.prototype.onBtnClickHandler = function (evt) {
                // app.gameContext.enterCampBattleWar(GameModels.campBattle.campBattleIdList[1]);
                // mg.uiManager.show(dialog.campBattle.CampBattleJoin, GameModels.campBattle.campBattleIdList[1]);
                var activityId = 0;
                var entryState = 0;
                if (evt.currentTarget == this.btnEnter1) {
                    activityId = GameModels.campBattle.campBattleIdList[0];
                    entryState = GameModels.campBattle.campBattleEntryList[0];
                }
                else {
                    activityId = GameModels.campBattle.campBattleIdList[1];
                    entryState = GameModels.campBattle.campBattleEntryList[1];
                }
                if (entryState == 2) {
                    app.gameContext.enterCampBattleWar(activityId);
                }
                else if (entryState == 3) {
                    GameModels.campBattle.requsetBattleResultInfo(activityId);
                }
                else {
                    mg.uiManager.show(dialog.campBattle.CampBattleJoin, activityId);
                }
            };
            return CampBattleMain;
        }(ui.CampBattleMainSkin));
        campBattle.CampBattleMain = CampBattleMain;
        __reflect(CampBattleMain.prototype, "dialog.campBattle.CampBattleMain");
    })(campBattle = dialog.campBattle || (dialog.campBattle = {}));
})(dialog || (dialog = {}));

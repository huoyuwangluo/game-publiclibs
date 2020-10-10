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
var main;
(function (main) {
    /**全民boss */
    var GuideEveryBoss = (function (_super) {
        __extends(GuideEveryBoss, _super);
        function GuideEveryBoss() {
            return _super.call(this) || this;
        }
        GuideEveryBoss.prototype.reset = function () {
            _super.prototype.reset.call(this);
            if (this._viewFightBoss) {
                this._viewFightBoss.removeEventListener(dialog.explore.CopyFightBossDialog.CHANG_TAL, this.update, this);
                this._viewFightBoss.removeEventListener(dialog.explore.CopyFightBossDialog.CHANG_BOSS, this.update, this);
                this._viewFightBoss = null;
            }
        };
        GuideEveryBoss.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updataView();
        };
        GuideEveryBoss.prototype.stop = function () {
            _super.prototype.stop.call(this);
            utils.timer.clearAll(this);
            this._viewFightBoss.removeEventListener(dialog.explore.CopyFightBossDialog.CHANG_TAL, this.update, this);
            this._viewFightBoss.removeEventListener(dialog.explore.CopyFightBossDialog.CHANG_BOSS, this.update, this);
        };
        GuideEveryBoss.prototype.updataView = function () {
            if (this._viewFightBoss) {
                this._viewFightBoss.removeEventListener(dialog.explore.CopyFightBossDialog.CHANG_TAL, this.update, this);
                this._viewFightBoss.removeEventListener(dialog.explore.CopyFightBossDialog.CHANG_BOSS, this.update, this);
            }
            this._viewFightBoss = mg.uiManager.getView(dialog.explore.CopyFightBossDialog);
            this._viewFightBoss.addEventListener(dialog.explore.CopyFightBossDialog.CHANG_TAL, this.update, this);
            this._viewFightBoss.addEventListener(dialog.explore.CopyFightBossDialog.CHANG_BOSS, this.update, this);
        };
        GuideEveryBoss.prototype.update = function () {
            logger.log("全民boss引导=====", GameModels.guide.guideType);
            utils.timer.clear(this);
            this.updataView();
            if (!app.gameContext.gameCurrent) {
                this.updateComponent(null);
                return;
            }
            if (!TypeGame.isMainGame(this._gameType)) {
                this.updateComponent(null);
                return;
            }
            if (mg.StoryManager.instance.storyId > 0 || mg.alertManager.current || mg.TipManager.instance.current || copy.CopyWinInstance.instance.copyWinTipView || copy.CopyFailInstance.instance.copyFailTipView) {
                this.updateComponent(null);
                return;
            }
            if (!mg.uiManager.hasDialog && GameModels.guide.guideType) {
                if (this._gameType == TypeGame.ATKCITY) {
                    utils.timer.once(200, this, function () {
                        this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.btnCity, Language.C_DJHC, TypeDirection.LEFT);
                    });
                }
                else {
                    if (app.gameContext.manager.view) {
                        utils.timer.once(200, this, function () {
                            if (app.gameContext.manager.view && app.gameContext.manager.view instanceof s.ViewMainCity)
                                this.updateComponent(app.gameContext.manager.view.getCityImg(9), Language.J_DJDK, TypeDirection.UP);
                        });
                    }
                }
                return;
            }
            if (mg.uiManager.isOpen(dialog.explore.CopyFightBossDialog)) {
                if (!GameModels.guide.guideType) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                if (GameModels.guide.guideType == mo.ModelGuide.guideType9) {
                    if (this._viewFightBoss.currState != "person") {
                        utils.timer.once(200, this, function () {
                            if (this._viewFightBoss)
                                this.updateComponent(this._viewFightBoss.btnPerson, Language.C_DJGRFB, TypeDirection.UP);
                        });
                    }
                    else {
                        if (this._viewFightBoss)
                            this.updateComponent(this._viewFightBoss.btnEnter, Language.J_DJTZ);
                    }
                }
                else {
                    if (this._viewFightBoss.currState != "every") {
                        utils.timer.once(200, this, function () {
                            if (this._viewFightBoss)
                                this.updateComponent(this._viewFightBoss.btnPerson, Language.C_DJQMFB, TypeDirection.UP);
                        });
                    }
                    else {
                        if (this._viewFightBoss)
                            this.updateComponent(this._viewFightBoss.btnEnter, Language.J_DJTZ);
                    }
                }
                return;
            }
            if (mg.uiManager.hasDialog) {
                this.updateComponent(null);
                return;
            }
            //this.updateComponent(this._taskHot, GameModels.task.curTask.canSubmit ? Language.C_WCRW : GameModels.task.curTask.name,TypeDirection.UP);
        };
        return GuideEveryBoss;
    }(main.GuideBase));
    main.GuideEveryBoss = GuideEveryBoss;
    __reflect(GuideEveryBoss.prototype, "main.GuideEveryBoss");
})(main || (main = {}));

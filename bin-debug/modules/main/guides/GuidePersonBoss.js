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
    /**个人boss */
    var GuidePersonBoss = (function (_super) {
        __extends(GuidePersonBoss, _super);
        function GuidePersonBoss() {
            return _super.call(this) || this;
        }
        GuidePersonBoss.prototype.reset = function () {
            _super.prototype.reset.call(this);
            if (this._viewFightBoss) {
                this._viewFightBoss.removeEventListener(dialog.explore.CopyFightBossDialog.CHANG_TAL, this.update, this);
                this._viewFightBoss.removeEventListener(dialog.explore.CopyFightBossDialog.CHANG_BOSS, this.update, this);
                this._viewFightBoss = null;
            }
        };
        GuidePersonBoss.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updataView();
        };
        GuidePersonBoss.prototype.stop = function () {
            _super.prototype.stop.call(this);
            utils.timer.clearAll(this);
            this._viewFightBoss.removeEventListener(dialog.explore.CopyFightBossDialog.CHANG_TAL, this.update, this);
            this._viewFightBoss.removeEventListener(dialog.explore.CopyFightBossDialog.CHANG_BOSS, this.update, this);
        };
        GuidePersonBoss.prototype.updataView = function () {
            if (this._viewFightBoss) {
                this._viewFightBoss.removeEventListener(dialog.explore.CopyFightBossDialog.CHANG_TAL, this.update, this);
                this._viewFightBoss.removeEventListener(dialog.explore.CopyFightBossDialog.CHANG_BOSS, this.update, this);
            }
            this._viewFightBoss = mg.uiManager.getView(dialog.explore.CopyFightBossDialog);
            this._viewFightBoss.addEventListener(dialog.explore.CopyFightBossDialog.CHANG_TAL, this.update, this);
            this._viewFightBoss.addEventListener(dialog.explore.CopyFightBossDialog.CHANG_BOSS, this.update, this);
        };
        // protected gameChangeHandler() {
        //     this._gameType = app.gameContext.gameCurrent.type;
        //     if (this._gameType == TypeGame.PERSONAL_BOSS) {
        //         if (GameModels.task.hasTask && GameModels.task.curTask.type == 17) {
        //             mg.guideManager.guide(utils.ObjectPool.from(GuildeMerge, true) as GuildeMerge);
        //             mg.alertManager.tip(Language.J_HSHTKYDDSH, 0xffffff);
        //         }
        //     } else {
        //         this.update();
        //     }
        // }
        GuidePersonBoss.prototype.update = function () {
            utils.timer.clearAll(this);
            if (!GameModels.task.hasTask) {
                this.updateComponent(null);
                return;
            }
            this.updataView();
            if (!TypeGame.isMainGame(this._gameType)) {
                this.updateComponent(null);
                return;
            }
            if (mg.alertManager.current || mg.TipManager.instance.current || copy.CopyWinInstance.instance.copyWinTipView || copy.CopyFailInstance.instance.copyFailTipView) {
                this.updateComponent(null);
                return;
            }
            if (!mg.uiManager.hasDialog && !GameModels.task.curTask.canSubmit) {
                if (this._gameType == TypeGame.ATKCITY) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.btnCity, Language.C_DJHC, TypeDirection.LEFT);
                }
                else {
                    if (app.gameContext.manager.view) {
                        this.updateComponent(app.gameContext.manager.view.getCityImg(9), Language.J_DJDK, TypeDirection.UP);
                    }
                }
                return;
            }
            if (mg.uiManager.isOpen(dialog.explore.CopyFightBossDialog)) {
                if (GameModels.task.curTask.canSubmit) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                if (this._viewFightBoss.currState != "person") {
                    this.updateComponent(this._viewFightBoss.btnSelf, Language.C_DJGRFB, TypeDirection.UP);
                }
                else {
                    this.updateComponent(this._viewFightBoss.btnEnter, Language.J_JRGRBOSSFB);
                }
                return;
            }
            if (mg.uiManager.hasDialog) {
                this.updateComponent(null);
                return;
            }
            utils.timer.once(200, this, function () {
                this.updateComponent(this._taskHot, GameModels.task.curTask.canSubmit ? Language.C_WCRW : GameModels.task.curTask.name, TypeDirection.UP);
            });
        };
        return GuidePersonBoss;
    }(main.GuideBase));
    main.GuidePersonBoss = GuidePersonBoss;
    __reflect(GuidePersonBoss.prototype, "main.GuidePersonBoss");
})(main || (main = {}));

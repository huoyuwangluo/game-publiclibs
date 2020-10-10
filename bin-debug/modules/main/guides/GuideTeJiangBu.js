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
    /**铁匠铺 */
    var GuideTeJiangBu = (function (_super) {
        __extends(GuideTeJiangBu, _super);
        function GuideTeJiangBu() {
            return _super.call(this) || this;
        }
        GuideTeJiangBu.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updateView();
        };
        GuideTeJiangBu.prototype.stop = function () {
            _super.prototype.stop.call(this);
            utils.timer.clearAll(this);
            this._viewPagoda.removeEventListener(dialog.dazao.DaoZaoMainDialog.CHANG_TAL, this.update, this);
        };
        GuideTeJiangBu.prototype.updateView = function () {
            if (this._viewPagoda) {
                this._viewPagoda.removeEventListener(dialog.dazao.DaoZaoMainDialog.CHANG_TAL, this.update, this);
            }
            this._viewPagoda = mg.uiManager.getView(dialog.dazao.DaoZaoMainDialog);
            this._viewPagoda.addEventListener(dialog.dazao.DaoZaoMainDialog.CHANG_TAL, this.update, this);
        };
        GuideTeJiangBu.prototype.update = function () {
            logger.log("铁匠铺引导=====", GameModels.guide.guideType);
            utils.timer.clear(this);
            this.updateView();
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
                                this.updateComponent(app.gameContext.manager.view.getCityImg(7), Language.J_DJDK, TypeDirection.UP);
                        });
                    }
                }
                return;
            }
            if (mg.uiManager.isOpen(dialog.dazao.DaoZaoMainDialog)) {
                if (!GameModels.guide.guideType) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                if (this._viewPagoda.tabIndex != 1) {
                    this.updateComponent(this._viewPagoda.btnShenbing, Language.J_DJDK, TypeDirection.UP);
                }
                return;
            }
            if (mg.uiManager.hasDialog) {
                this.updateComponent(null);
                return;
            }
            //this.updateComponent(this._taskHot, GameModels.task.curTask.canSubmit ? Language.C_WCRW : GameModels.task.curTask.name, TypeDirection.UP);
        };
        return GuideTeJiangBu;
    }(main.GuideBase));
    main.GuideTeJiangBu = GuideTeJiangBu;
    __reflect(GuideTeJiangBu.prototype, "main.GuideTeJiangBu");
})(main || (main = {}));

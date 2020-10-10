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
    /**材料副本 */
    var GuideGamMaterial = (function (_super) {
        __extends(GuideGamMaterial, _super);
        function GuideGamMaterial() {
            return _super.call(this) || this;
        }
        GuideGamMaterial.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updateView();
        };
        GuideGamMaterial.prototype.stop = function () {
            _super.prototype.stop.call(this);
            utils.timer.clearAll(this);
            this._viewCopyMaterial.removeEventListener(dialog.explore.CopyMaterialDialog.CHANG_TAL, this.update, this);
        };
        GuideGamMaterial.prototype.updateView = function () {
            if (this._viewCopyMaterial) {
                this._viewCopyMaterial.removeEventListener(dialog.explore.CopyMaterialDialog.CHANG_TAL, this.update, this);
            }
            this._viewCopyMaterial = mg.uiManager.getView(dialog.explore.CopyMaterialDialog);
            this._viewCopyMaterial.addEventListener(dialog.explore.CopyMaterialDialog.CHANG_TAL, this.update, this);
        };
        GuideGamMaterial.prototype.update = function () {
            logger.log("副本引导=====", GameModels.guide.guideType);
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
                                this.updateComponent(app.gameContext.manager.view.getCityImg(2), Language.J_DJDK, TypeDirection.UP);
                        });
                    }
                }
                return;
            }
            if (mg.uiManager.isOpen(dialog.explore.CopyMaterialDialog)) {
                if (!GameModels.guide.guideType) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                if (this._viewCopyMaterial.currentChooseIndex == 0) {
                    this.updateComponent(this._viewCopyMaterial.btnEnter, Language.C_DJKSTZ, TypeDirection.UP);
                }
                else {
                    this.updateComponent(this._viewCopyMaterial.btnExp, Language.C_DJJYFB, TypeDirection.UP);
                }
                return;
            }
            if (mg.uiManager.hasDialog) {
                this.updateComponent(null);
                return;
            }
            //this.updateComponent(this._taskHot, GameModels.task.curTask.canSubmit ? Language.C_WCRW : GameModels.task.curTask.name, TypeDirection.UP);
        };
        return GuideGamMaterial;
    }(main.GuideBase));
    main.GuideGamMaterial = GuideGamMaterial;
    __reflect(GuideGamMaterial.prototype, "main.GuideGamMaterial");
})(main || (main = {}));

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
    /**红颜赐婚 */
    var GuideHongYanCiHun = (function (_super) {
        __extends(GuideHongYanCiHun, _super);
        function GuideHongYanCiHun() {
            return _super.call(this) || this;
        }
        GuideHongYanCiHun.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updateView();
        };
        GuideHongYanCiHun.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._viewBaoWu.removeEventListener(dialog.baowu.BaoWuMain.CHANG_TAL, this.update, this);
        };
        GuideHongYanCiHun.prototype.updateView = function () {
            if (this._viewBaoWu) {
                this._viewBaoWu.removeEventListener(dialog.baowu.BaoWuMain.CHANG_TAL, this.update, this);
            }
            this._viewBaoWu = mg.uiManager.getView(dialog.baowu.BaoWuMain);
            this._viewBaoWu.addEventListener(dialog.baowu.BaoWuMain.CHANG_TAL, this.update, this);
        };
        GuideHongYanCiHun.prototype.update = function () {
            logger.log("红颜赐婚=====", GameModels.guide.guideTypeClinte);
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
            if (!mg.uiManager.hasDialog && GameModels.guide.guideTypeClinte) {
                utils.timer.once(200, this, function () {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.btnBaoWu, Language.J_DJJLBQ, TypeDirection.DOWN);
                });
                return;
            }
            if (mg.uiManager.isOpen(dialog.baowu.BaoWuMain)) {
                if (!GameModels.guide.guideTypeClinte) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                if (this._viewBaoWu.tabIndex == 0) {
                    this.updateComponent(this._viewBaoWu.hongYanView.btnJieHun, Language.J_DJCH, TypeDirection.UP);
                }
                else {
                    this.updateComponent(this._viewBaoWu.btnHongYan, Language.J_DJHYBQ, TypeDirection.UP);
                }
                return;
            }
            if (mg.uiManager.hasDialog) {
                this.updateComponent(null);
                return;
            }
            //this.updateComponent(this._taskHot, GameModels.task.curTask.canSubmit ? Language.C_WCRW : GameModels.task.curTask.name, TypeDirection.UP);
        };
        return GuideHongYanCiHun;
    }(main.GuideBase));
    main.GuideHongYanCiHun = GuideHongYanCiHun;
    __reflect(GuideHongYanCiHun.prototype, "main.GuideHongYanCiHun");
})(main || (main = {}));

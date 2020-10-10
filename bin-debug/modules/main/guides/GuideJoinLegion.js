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
    /**加入阵营 */
    var GuideJoinLegion = (function (_super) {
        __extends(GuideJoinLegion, _super);
        function GuideJoinLegion() {
            return _super.call(this) || this;
        }
        GuideJoinLegion.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
        };
        GuideJoinLegion.prototype.stop = function () {
            _super.prototype.stop.call(this);
        };
        GuideJoinLegion.prototype.updateView = function () {
        };
        GuideJoinLegion.prototype.update = function () {
            logger.log("加入阵营引导=====", GameModels.guide.guideType);
            utils.timer.clear(this);
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
                utils.timer.once(200, this, function () {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.btnLegion, Language.C_DJZY, TypeDirection.DOWN);
                });
                return;
            }
            if (mg.uiManager.isOpen(LegionList)) {
                if (!GameModels.guide.guideType) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                // var list: LegionList = mg.uiManager.getView(LegionList) as LegionList;
                // this.updateComponent(list.btnSuiJi, Language.C_DJJR, TypeDirection.UP);
                this.updateComponent(null);
                return;
            }
            if (mg.uiManager.hasDialog) {
                this.updateComponent(null);
                return;
            }
            //this.updateComponent(this._taskHot, GameModels.task.curTask.canSubmit ? Language.C_WCRW : GameModels.task.curTask.name, TypeDirection.UP);
        };
        return GuideJoinLegion;
    }(main.GuideBase));
    main.GuideJoinLegion = GuideJoinLegion;
    __reflect(GuideJoinLegion.prototype, "main.GuideJoinLegion");
})(main || (main = {}));

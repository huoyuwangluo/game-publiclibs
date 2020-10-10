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
    /**强征收 */
    var GuideQiangFood = (function (_super) {
        __extends(GuideQiangFood, _super);
        function GuideQiangFood() {
            return _super.call(this) || this;
        }
        GuideQiangFood.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
        };
        GuideQiangFood.prototype.stop = function () {
            _super.prototype.stop.call(this);
        };
        GuideQiangFood.prototype.update = function () {
            logger.log("强征引导=====", GameModels.guide.guideType);
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
            if (GameModels.guide.guideType && !mg.uiManager.hasDialog) {
                var mainUi = mg.uiManager.getView(main.MainUIView);
                if (this._gameType == TypeGame.ATKCITY) {
                    utils.timer.once(200, this, function () {
                        this.updateComponent(mainUi.city.btnGet, Language.J_DJDK, TypeDirection.UP);
                    });
                }
                else {
                    utils.timer.once(200, this, function () {
                        this.updateComponent(mainUi.dock.btnFinght, Language.C_DJZZ, TypeDirection.DOWN);
                    });
                }
                return;
            }
            if (mg.uiManager.isOpen(MainChapterCityReward1)) {
                var view = mg.uiManager.getView(MainChapterCityReward1);
                if (!GameModels.guide.guideType) {
                    this.updateComponent(view.btnBack, Language.C_GBDQJM);
                    return;
                }
                this.updateComponent(view.btnOK, Language.C_DJQZ, TypeDirection.UP);
                return;
            }
            if (mg.uiManager.hasDialog) {
                this.updateComponent(null);
                return;
            }
            // this.updateComponent(this._taskHot, GameModels.task.curTask.canSubmit ? Language.C_WCRW : GameModels.task.curTask.name, TypeDirection.UP);
        };
        return GuideQiangFood;
    }(main.GuideBase));
    main.GuideQiangFood = GuideQiangFood;
    __reflect(GuideQiangFood.prototype, "main.GuideQiangFood");
})(main || (main = {}));

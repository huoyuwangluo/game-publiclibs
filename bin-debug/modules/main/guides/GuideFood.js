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
    /**征收 */
    var GuideFood = (function (_super) {
        __extends(GuideFood, _super);
        function GuideFood() {
            return _super.call(this) || this;
        }
        GuideFood.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
        };
        GuideFood.prototype.stop = function () {
            _super.prototype.stop.call(this);
        };
        GuideFood.prototype.update = function () {
            utils.timer.clear(this);
            if (!GameModels.task.hasTask) {
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
            if (!GameModels.task.curTask.canSubmit && !mg.uiManager.hasDialog && this._gameType == TypeGame.ATKCITY) {
                utils.timer.once(200, this, function () {
                    var mainUi = mg.uiManager.getView(main.MainUIView);
                    this.updateComponent(mainUi.city.imgGold, Language.C_DJLQ, TypeDirection.UP);
                });
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
        return GuideFood;
    }(main.GuideBase));
    main.GuideFood = GuideFood;
    __reflect(GuideFood.prototype, "main.GuideFood");
})(main || (main = {}));

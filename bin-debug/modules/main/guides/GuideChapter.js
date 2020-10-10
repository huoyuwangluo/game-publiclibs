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
    /**关卡 */
    var GuideChapter = (function (_super) {
        __extends(GuideChapter, _super);
        function GuideChapter() {
            return _super.call(this) || this;
        }
        GuideChapter.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this._mainUi = mg.uiManager.getView(main.MainUIView);
            this._mainUi.addEventListener(main.MainUIView.TWEEN_FINSH, this.update, this);
            GameModels.chapter.addEventListener(mo.ModelSceneChapter.AUTOFIGHT_STATE_CHANGE, this.update, this);
        };
        GuideChapter.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._mainUi.removeEventListener(main.MainUIView.TWEEN_FINSH, this.update, this);
            GameModels.chapter.removeEventListener(mo.ModelSceneChapter.AUTOFIGHT_STATE_CHANGE, this.update, this);
        };
        GuideChapter.prototype.update = function () {
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
            if (this._gameType == TypeGame.ATKCITY && !mg.uiManager.hasDialog) {
                this.updateComponent(null);
                if (!GameModels.task.curTask.canSubmit) {
                    if (GameModels.task.curTask.id == 100800) {
                        if (mg.uiManager.getView(s.UserfaceName.main).city.btnAutoAtt.visible) {
                            utils.timer.once(200, this, function () {
                                this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).city.btnAutoAtt, Language.J_DJTZ, TypeDirection.UP);
                            });
                        }
                        else {
                            utils.timer.once(200, this, function () {
                                this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).city.btnAtt, Language.J_DJTZ, TypeDirection.UP);
                            });
                        }
                    }
                    else {
                        utils.timer.once(200, this, function () {
                            this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).city.btnAtt, Language.J_DJTZ, TypeDirection.UP);
                        });
                    }
                    return;
                }
            }
            if (mg.uiManager.hasDialog) {
                this.updateComponent(null);
                return;
            }
            utils.timer.once(200, this, function () {
                this.updateComponent(this._taskHot, GameModels.task.curTask.canSubmit ? Language.C_WCRW : GameModels.task.curTask.name, TypeDirection.UP);
            });
        };
        return GuideChapter;
    }(main.GuideBase));
    main.GuideChapter = GuideChapter;
    __reflect(GuideChapter.prototype, "main.GuideChapter");
})(main || (main = {}));

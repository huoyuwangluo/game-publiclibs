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
    /**圣旨 */
    var GuideShengZhi = (function (_super) {
        __extends(GuideShengZhi, _super);
        function GuideShengZhi() {
            return _super.call(this) || this;
        }
        GuideShengZhi.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updateView();
        };
        GuideShengZhi.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._view.removeEventListener(pet.PetGroupMain.CHANG_TAL, this.update, this);
        };
        GuideShengZhi.prototype.updateView = function () {
            if (this._view) {
                this._view.removeEventListener(pet.PetGroupMain.CHANG_TAL, this.update, this);
            }
            this._view = mg.uiManager.getView(pet.PetGroupMain);
            this._view1 = mg.uiManager.getView(dialog.imperialEdict.ImperialEdictTask);
            this._view.addEventListener(pet.PetGroupMain.CHANG_TAL, this.update, this);
        };
        GuideShengZhi.prototype.update = function () {
            logger.log("圣旨引导=====", GameModels.guide.guideType);
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
                var mainUi = mg.uiManager.getView(main.MainUIView);
                if (this._gameType == TypeGame.ATKCITY) {
                    utils.timer.once(200, this, function () {
                        this.updateComponent(mainUi.city.btnShengZhi, Language.J_DJDK, TypeDirection.RIGHT);
                    });
                }
                else {
                    utils.timer.once(200, this, function () {
                        this.updateComponent(mainUi.dock.btnFinght, Language.C_DJZZ, TypeDirection.DOWN);
                    });
                }
                return;
            }
            /**打开圣旨派出界面 */
            if (mg.uiManager.isOpen(dialog.imperialEdict.ImperialEdictTask)) {
                if (GameModels.guide.guideType) {
                    if (this._view1.clickOneKey) {
                        utils.timer.once(200, this, function () {
                            this.updateComponent(this._view1.btnRefresh0, Language.C_DJPC, TypeDirection.UP);
                        });
                    }
                    else {
                        utils.timer.once(200, this, function () {
                            this.updateComponent(this._view1.btnRefresh, Language.C_DJYJDQ, TypeDirection.UP);
                        });
                    }
                    return;
                }
            }
            /**打开圣旨界面 */
            if (mg.uiManager.isOpen(pet.PetGroupMain)) {
                if (GameModels.guide.guideType) {
                    if (this._view.tabIndex == 0) {
                        if (!this._view.shengzhiView.getCanUseListState()) {
                            this.updateComponent(null);
                            return;
                        }
                        utils.timer.once(200, this, function () {
                            var item = this._view.shengzhiView.getCanUseListItem();
                            this.updateComponent(item, Language.C_DJJS, TypeDirection.UP);
                        });
                    }
                    else {
                        this.updateComponent(this._view.btnShengZhi, Language.C_DJSZBQ, TypeDirection.UP);
                    }
                }
                else {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                }
                return;
            }
            if (mg.uiManager.hasDialog) {
                this.updateComponent(null);
                return;
            }
            //this.updateComponent(this._taskHot, GameModels.task.curTask.canSubmit ? Language.C_WCRW : GameModels.task.curTask.name, TypeDirection.UP);
        };
        return GuideShengZhi;
    }(main.GuideBase));
    main.GuideShengZhi = GuideShengZhi;
    __reflect(GuideShengZhi.prototype, "main.GuideShengZhi");
})(main || (main = {}));

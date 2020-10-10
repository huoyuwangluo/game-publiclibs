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
    /**酒馆抽奖 */
    var GuideSmoPet = (function (_super) {
        __extends(GuideSmoPet, _super);
        function GuideSmoPet() {
            return _super.call(this) || this;
        }
        GuideSmoPet.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updateView();
        };
        GuideSmoPet.prototype.stop = function () {
            _super.prototype.stop.call(this);
            utils.timer.clearAll(this);
            this._view.removeEventListener(treasure.TreasureMain.CHANG_TAL, this.update, this);
        };
        GuideSmoPet.prototype.updateView = function () {
            if (this._view) {
                this._view.removeEventListener(treasure.TreasureMain.CHANG_TAL, this.update, this);
            }
            this._view = mg.uiManager.getView(treasure.TreasureMain);
            this._view.addEventListener(treasure.TreasureMain.CHANG_TAL, this.update, this);
        };
        GuideSmoPet.prototype.update = function () {
            utils.timer.clearAll(this);
            if (!GameModels.task.hasTask) {
                this.updateComponent(null);
                return;
            }
            this.updateView();
            if (!TypeGame.isMainGame(this._gameType)) {
                this.updateComponent(null);
                return;
            }
            if (mg.StoryManager.instance.storyId > 0 || mg.alertManager.current || mg.TipManager.instance.current || copy.CopyWinInstance.instance.copyWinTipView || copy.CopyFailInstance.instance.copyFailTipView) {
                this.updateComponent(null);
                return;
            }
            if (!mg.uiManager.hasDialog && !GameModels.task.curTask.canSubmit) {
                if (this._gameType == TypeGame.ATKCITY) {
                    utils.timer.once(200, this, function () {
                        this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.btnCity, Language.C_DJHC, TypeDirection.LEFT);
                    });
                }
                else {
                    if (app.gameContext.manager.view) {
                        utils.timer.once(300, this, function () {
                            this.updateComponent(app.gameContext.manager.view.getCityImg(10), Language.J_DJDK, TypeDirection.UP);
                        });
                    }
                }
                return;
            }
            if (mg.uiManager.isOpen(treasure.TreasureMain)) {
                if (GameModels.task.curTask.canSubmit) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                if (this._view.currentState == "smokepet") {
                    this.updateComponent(null);
                    utils.timer.clearAll(this);
                    if (GameModels.task.curTask.type == TypeTask.SMOMEPET1) {
                        utils.timer.once(200, this, function () {
                            this.updateComponent(this._view.smokePetView.btnPuTongOne, Language.J_DJZMYC, TypeDirection.UP);
                        });
                    }
                    else if (GameModels.task.curTask.type == TypeTask.SMOMEPET2) {
                        utils.timer.once(200, this, function () {
                            this.updateComponent(this._view.smokePetView.btnGaoJiOne, Language.J_DJZMYC, TypeDirection.UP);
                        });
                    }
                    else if (GameModels.task.curTask.type == TypeTask.SMOMEPET3) {
                        utils.timer.once(200, this, function () {
                            this.updateComponent(this._view.smokePetView.btnPuTongTen, Language.J_DJZMYC, TypeDirection.UP);
                        });
                    }
                    else if (GameModels.task.curTask.type == TypeTask.SMOMEPET4) {
                        utils.timer.once(200, this, function () {
                            this.updateComponent(this._view.smokePetView.btnGaoJiTen, Language.J_DJZMYC, TypeDirection.UP);
                        });
                    }
                }
                else {
                    this.updateComponent(this._view.togSmokPet, Language.J_DJJGBQ, TypeDirection.UP);
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
        return GuideSmoPet;
    }(main.GuideBase));
    main.GuideSmoPet = GuideSmoPet;
    __reflect(GuideSmoPet.prototype, "main.GuideSmoPet");
})(main || (main = {}));

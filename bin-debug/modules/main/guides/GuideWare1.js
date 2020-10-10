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
    /**装备穿戴 */
    var GuideWare1 = (function (_super) {
        __extends(GuideWare1, _super);
        function GuideWare1() {
            return _super.call(this) || this;
        }
        GuideWare1.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updateView();
        };
        GuideWare1.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._viewRole.removeEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
            this._viewPetList.removeEventListener(dialog.list.PetListDialog.CHANG_TAL, this.update, this);
        };
        GuideWare1.prototype.updateView = function () {
            if (this._viewRole) {
                this._viewRole.removeEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
                this._viewPetList.removeEventListener(dialog.list.PetListDialog.CHANG_TAL, this.update, this);
            }
            this._viewRole = mg.uiManager.getView(dialog.role.RoleMainDialog);
            this._viewPetList = mg.uiManager.getView(dialog.list.PetListDialog);
            this._viewRole.addEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
            this._viewPetList.addEventListener(dialog.list.PetListDialog.CHANG_TAL, this.update, this);
        };
        GuideWare1.prototype.update = function () {
            logger.log("武将穿戴=====", GameModels.guide.guideTypeClinte);
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
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.btnWuJiang, Language.J_DJWJBQ, TypeDirection.DOWN);
                });
                return;
            }
            if (mg.uiManager.isOpen(dialog.role.RoleMainDialog)) {
                if (!GameModels.guide.guideTypeClinte) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                if (this._viewRole.tabIndex == 0) {
                    if (GameModels.guide.petPos <= 0) {
                        this.updateComponent(null);
                    }
                    else {
                        if (this._viewRole.equipView.headIndex == GameModels.guide.petPos) {
                            this.updateComponent(this._viewRole.equipView.btnUseEquips, Language.J_DJYJCD, TypeDirection.UP);
                        }
                        else {
                            this.updateComponent(this._viewRole.equipView.getHeadInfo(GameModels.guide.petPos).imgHead, Language.J_DJWJTX, TypeDirection.UP);
                        }
                    }
                }
                else {
                    this.updateComponent(this._viewRole.btnEquipt, Language.J_DJZBBQ, TypeDirection.UP);
                }
                return;
            }
            if (mg.uiManager.hasDialog) {
                this.updateComponent(null);
                return;
            }
            //this.updateComponent(this._taskHot, GameModels.task.curTask.canSubmit ? Language.C_WCRW : GameModels.task.curTask.name, TypeDirection.UP);
        };
        return GuideWare1;
    }(main.GuideBase));
    main.GuideWare1 = GuideWare1;
    __reflect(GuideWare1.prototype, "main.GuideWare1");
})(main || (main = {}));

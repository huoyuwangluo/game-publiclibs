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
    /**武将上阵 */
    var GuidePetUp = (function (_super) {
        __extends(GuidePetUp, _super);
        function GuidePetUp() {
            return _super.call(this) || this;
        }
        GuidePetUp.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updateView();
        };
        GuidePetUp.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._viewRole.removeEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
            this._viewPetList.removeEventListener(dialog.list.PetListDialog.CHANG_TAL, this.update, this);
        };
        GuidePetUp.prototype.updateView = function () {
            if (this._viewRole) {
                this._viewRole.removeEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
                this._viewPetList.removeEventListener(dialog.list.PetListDialog.CHANG_TAL, this.update, this);
            }
            this._viewRole = mg.uiManager.getView(dialog.role.RoleMainDialog);
            this._viewPetList = mg.uiManager.getView(dialog.list.PetListDialog);
            this._viewRole.addEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
            this._viewPetList.addEventListener(dialog.list.PetListDialog.CHANG_TAL, this.update, this);
        };
        GuidePetUp.prototype.update = function () {
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
            if (GameModels.task.curTask.type == TypeTask.PET_UP) {
                if (mg.uiManager.isOpen(dialog.list.PetListDialog)) {
                    this.updateComponent(null);
                    utils.timer.clearAll(this);
                    var petList = mg.uiManager.getView(dialog.list.PetListDialog);
                    if (GameModels.task.curTask.canSubmit) {
                        this.updateComponent(petList.btnBack, Language.C_GBDQJM, TypeDirection.UP);
                        return;
                    }
                    if (this._viewPetList.selectedIndex == 0) {
                        utils.timer.once(200, this, function () {
                            var index = GameModels.task.curTask.template.needTimes;
                            var item = petList.getCanUseListItem();
                            if (item) {
                                this.updateComponent(item, Language.J_DJSZWJ, TypeDirection.UP);
                            }
                            else {
                                this.updateComponent(null);
                            }
                        });
                    }
                    else {
                        this.updateComponent(this._viewPetList.selectedBtn, Language.J_DJBUWJ, TypeDirection.UP);
                    }
                    return;
                }
            }
            if (mg.uiManager.isOpen(dialog.role.RoleMainDialog)) {
                if (GameModels.task.curTask.canSubmit) {
                    utils.timer.clearAll(this);
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                if (this._viewRole.tabIndex == 0) {
                    if (GameModels.task.curTask.type == TypeTask.PET_UP) {
                        utils.timer.clearAll(this);
                        var index = GameModels.task.curTask.template.needTimes;
                        this.updateComponent(this._viewRole.equipView.getHeadInfo(index).imgHead, Language.J_DJSZWJ, TypeDirection.UP);
                    }
                }
                else {
                    utils.timer.clearAll(this);
                    this.updateComponent(this._viewRole.btnEquipt, Language.J_DJZBBQ, TypeDirection.UP);
                }
                return;
            }
            if (mg.uiManager.hasDialog) {
                this.updateComponent(null);
                return;
            }
            //(mg.uiManager.getView(MainUIView) as MainUIView).taskGroup.bottom = this._gameType == TypeGame.CHAPTER?340:189;
            //this._taskHot = (mg.uiManager.getView(MainUIView) as MainUIView).taskGroup;
            this.updateComponent(this._taskHot, GameModels.task.curTask.canSubmit ? Language.C_WCRW : GameModels.task.curTask.name, TypeDirection.UP);
        };
        return GuidePetUp;
    }(main.GuideBase));
    main.GuidePetUp = GuidePetUp;
    __reflect(GuidePetUp.prototype, "main.GuidePetUp");
})(main || (main = {}));

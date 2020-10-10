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
    /**位置升级 */
    var GuidePlayerLevelUp = (function (_super) {
        __extends(GuidePlayerLevelUp, _super);
        function GuidePlayerLevelUp() {
            return _super.call(this) || this;
        }
        GuidePlayerLevelUp.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updateView();
        };
        GuidePlayerLevelUp.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._viewRole.removeEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
        };
        GuidePlayerLevelUp.prototype.updateView = function () {
            if (this._viewRole) {
                this._viewRole.removeEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
            }
            this._viewRole = mg.uiManager.getView(dialog.role.RoleMainDialog);
            this._viewRole.addEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
        };
        GuidePlayerLevelUp.prototype.update = function () {
            utils.timer.clear(this);
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
            if (this.headIndex == null || this.headIndex == undefined)
                return;
            if (mg.uiManager.isOpen(dialog.role.RoleMainDialog)) {
                if (GameModels.task.curTask.canSubmit) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                if (this._viewRole.tabIndex == 0) {
                    if (this._viewRole.equipView.headIndex == this.headIndex) {
                        this.updateComponent(this._viewRole.equipView.btnUpgrade, Language.J_DJSJ);
                    }
                    else {
                        if (this.headIndex == 0) {
                            this.updateComponent(this._viewRole.equipView.getHeadInfo(this.headIndex).imgHead, Language.J_DJJSTX);
                        }
                        else {
                            this.updateComponent(this._viewRole.equipView.getHeadInfo(this.headIndex).imgHead, Language.J_DJWJTX);
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
            utils.timer.once(200, this, function () {
                this.updateComponent(this._taskHot, GameModels.task.curTask.canSubmit ? Language.C_WCRW : GameModels.task.curTask.name, TypeDirection.UP);
            });
        };
        Object.defineProperty(GuidePlayerLevelUp.prototype, "headIndex", {
            get: function () {
                switch (GameModels.task.curTask.type) {
                    case TypeTask.UP_LEVEL_POS1:
                        return 0;
                    case TypeTask.UP_LEVEL_POS2:
                        return 1;
                    case TypeTask.UP_LEVEL_POS3:
                        return 2;
                    case TypeTask.UP_LEVEL_POS4:
                        return 3;
                    case TypeTask.UP_LEVEL_POS5:
                        return 4;
                }
            },
            enumerable: true,
            configurable: true
        });
        return GuidePlayerLevelUp;
    }(main.GuideBase));
    main.GuidePlayerLevelUp = GuidePlayerLevelUp;
    __reflect(GuidePlayerLevelUp.prototype, "main.GuidePlayerLevelUp");
})(main || (main = {}));

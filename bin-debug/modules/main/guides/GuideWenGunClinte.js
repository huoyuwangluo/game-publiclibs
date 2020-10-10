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
    /**文官任务客户端 */
    var GuideWenGunClinte = (function (_super) {
        __extends(GuideWenGunClinte, _super);
        function GuideWenGunClinte() {
            return _super.call(this) || this;
        }
        GuideWenGunClinte.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updateView();
            GameModels.wenguanTask.addEventListener(mo.ModelWenGuanTask.WENTASK_GET_SAMLL_REWARD, this.update, this);
        };
        GuideWenGunClinte.prototype.stop = function () {
            _super.prototype.stop.call(this);
            GameModels.wenguanTask.removeEventListener(mo.ModelWenGuanTask.WENTASK_GET_SAMLL_REWARD, this.update, this);
            this._viewWenGuan.removeEventListener(dialog.WenGuan.WenGuanDialog.CHANG_TAL, this.update, this);
            this._viewRole.removeEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
        };
        GuideWenGunClinte.prototype.updateView = function () {
            this._viewWenGuan = mg.uiManager.getView(dialog.WenGuan.WenGuanDialog);
            this._viewWenGuan.addEventListener(dialog.WenGuan.WenGuanDialog.CHANG_TAL, this.update, this);
            if (this._viewRole) {
                this._viewRole.removeEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
            }
            this._viewRole = mg.uiManager.getView(dialog.role.RoleMainDialog);
            this._viewRole.addEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
        };
        GuideWenGunClinte.prototype.update = function () {
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
            if (mg.uiManager.hasDialog) {
                this.updateComponent(null);
                return;
            }
            if (!GameModels.task.curTask.canSubmit) {
                this.updateComponent(null);
                if (GameModels.wenguanTask.checkWenGuanUp()) {
                    utils.timer.once(200, this, function () {
                        this.updateComponent(this._taskHot, Language.C_QWSG, TypeDirection.UP);
                    });
                }
                else {
                    if (GameModels.wenguanTask.checkWenGuan()) {
                        utils.timer.once(200, this, function () {
                            this.updateComponent(this._taskHot, Language.C_QWJL, TypeDirection.UP);
                        });
                    }
                }
                return;
            }
            utils.timer.once(200, this, function () {
                this.updateComponent(this._taskHot, Language.C_WCRW, TypeDirection.UP);
            });
        };
        return GuideWenGunClinte;
    }(main.GuideBase));
    main.GuideWenGunClinte = GuideWenGunClinte;
    __reflect(GuideWenGunClinte.prototype, "main.GuideWenGunClinte");
})(main || (main = {}));

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
    /**文官任务 */
    var GuideWenGuan = (function (_super) {
        __extends(GuideWenGuan, _super);
        function GuideWenGuan() {
            return _super.call(this) || this;
        }
        GuideWenGuan.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updateView();
            GameModels.wenguanTask.addEventListener(mo.ModelWenGuanTask.WENTASK_GET_SAMLL_REWARD, this.update, this);
        };
        GuideWenGuan.prototype.stop = function () {
            _super.prototype.stop.call(this);
            GameModels.wenguanTask.removeEventListener(mo.ModelWenGuanTask.WENTASK_GET_SAMLL_REWARD, this.update, this);
            this._viewWenGuan.removeEventListener(dialog.WenGuan.WenGuanDialog.CHANG_TAL, this.update, this);
            this._viewRole.removeEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
        };
        GuideWenGuan.prototype.updateView = function () {
            this._viewWenGuan = mg.uiManager.getView(dialog.WenGuan.WenGuanDialog);
            this._viewWenGuan.addEventListener(dialog.WenGuan.WenGuanDialog.CHANG_TAL, this.update, this);
            if (this._viewRole) {
                this._viewRole.removeEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
            }
            this._viewRole = mg.uiManager.getView(dialog.role.RoleMainDialog);
            this._viewRole.addEventListener(dialog.role.RoleMainDialog.CHANG_TAL, this.update, this);
        };
        GuideWenGuan.prototype.update = function () {
            var _this = this;
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
            if (mg.uiManager.isOpen(dialog.role.RoleMainDialog)) {
                var pet = GameModels.pet.getFormatUpVOByPos(1);
                if (pet.lv >= 10) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                if (this._viewRole.tabIndex == 0) {
                    if (this._viewRole.equipView.headIndex == 1) {
                        this.updateComponent(this._viewRole.equipView.btnUpgrade, Language.J_DJSJ);
                    }
                    else {
                        this.updateComponent(this._viewRole.equipView.getHeadInfo(1).imgHead, Language.J_DJJSTX);
                    }
                }
                else {
                    this.updateComponent(this._viewRole.btnEquipt, Language.J_DJZBBQ, TypeDirection.UP);
                }
                return;
            }
            if (mg.uiManager.isOpen(dialog.WenGuan.WenGuanDialog)) {
                if (GameModels.task.curTask.canSubmit) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                if (this._viewWenGuan.tabIndex != 0) {
                    this.updateComponent(this._viewWenGuan.btnWenGuan, Language.J_DWGNBQ, TypeDirection.UP);
                    return;
                }
                if (this._viewWenGuan.wenGuanView.checkIsAllFinsh()) {
                    utils.timer.once(200, this, function () {
                        _this.updateComponent(_this._viewWenGuan.wenGuanView.btnReceive, Language.J_DJLQJLSG, TypeDirection.UP);
                    });
                }
                else {
                    utils.timer.once(200, this, function () {
                        var item = _this._viewWenGuan.wenGuanView.getCanUseListItem();
                        if (item) {
                            var button = item.btn;
                            var state = item.state;
                            if (button) {
                                _this.updateComponent(button, state == 1 ? Language.C_DJLQ : Language.C_DJQW, TypeDirection.UP);
                            }
                            else {
                                _this.updateComponent(null);
                            }
                        }
                        else {
                            _this.updateComponent(null);
                        }
                    });
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
        return GuideWenGuan;
    }(main.GuideBase));
    main.GuideWenGuan = GuideWenGuan;
    __reflect(GuideWenGuan.prototype, "main.GuideWenGuan");
})(main || (main = {}));

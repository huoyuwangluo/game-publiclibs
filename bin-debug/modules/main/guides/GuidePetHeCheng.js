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
    /**武将合成 */
    var GuidePetHeCheng = (function (_super) {
        __extends(GuidePetHeCheng, _super);
        function GuidePetHeCheng() {
            return _super.call(this) || this;
        }
        GuidePetHeCheng.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updateView();
        };
        GuidePetHeCheng.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._viewBag.removeEventListener(dialog.bag.BagDialog.CHANG_TAL, this.update, this);
        };
        GuidePetHeCheng.prototype.updateView = function () {
            if (this._viewBag) {
                this._viewBag.removeEventListener(dialog.bag.BagDialog.CHANG_TAL, this.update, this);
            }
            this._viewBag = mg.uiManager.getView(dialog.bag.BagDialog);
            this._viewBag.addEventListener(dialog.bag.BagDialog.CHANG_TAL, this.update, this);
        };
        GuidePetHeCheng.prototype.update = function () {
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
            if (mg.uiManager.isOpen(dialog.bag.BagDialog)) {
                if (GameModels.task.curTask.canSubmit) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                this.updateComponent(null);
                if (GameModels.task.curTask.template.needTimes == 13018) {
                    if (GameModels.bag.getPetSuiCountById("220018") < 20)
                        return;
                }
                if (this._viewBag.tabIndex == 2) {
                    if (this._viewBag.index == 0) {
                        var img = this._viewBag.getIsCanHeChengPetSui(GameModels.task.curTask.template.needTimes);
                        if (img) {
                            this.updateComponent(img, Language.J_DJHC, TypeDirection.UP);
                        }
                        else {
                            this.updateComponent(null);
                        }
                    }
                    else {
                        this.updateComponent(this._viewBag.btn0, Language.J_DJWJBQ, TypeDirection.UP);
                    }
                }
                else {
                    this.updateComponent(this._viewBag.btnSuiPian, Language.J_DJSPBQ, TypeDirection.UP);
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
        return GuidePetHeCheng;
    }(main.GuideBase));
    main.GuidePetHeCheng = GuidePetHeCheng;
    __reflect(GuidePetHeCheng.prototype, "main.GuidePetHeCheng");
})(main || (main = {}));

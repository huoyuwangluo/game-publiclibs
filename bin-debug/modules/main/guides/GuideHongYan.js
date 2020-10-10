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
    /**红颜升级激活 */
    var GuideHongYan = (function (_super) {
        __extends(GuideHongYan, _super);
        function GuideHongYan() {
            return _super.call(this) || this;
        }
        GuideHongYan.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            _super.prototype.start.call(this, time);
            this.updateView();
        };
        GuideHongYan.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._viewWBao.removeEventListener(dialog.baowu.BaoWuMain.CHANG_TAL, this.update, this);
        };
        GuideHongYan.prototype.updateView = function () {
            if (this._viewWBao) {
                this._viewWBao.removeEventListener(dialog.baowu.BaoWuMain.CHANG_TAL, this.update, this);
            }
            this._viewWBao = mg.uiManager.getView(dialog.baowu.BaoWuMain);
            this._viewWBao.addEventListener(dialog.baowu.BaoWuMain.CHANG_TAL, this.update, this);
        };
        GuideHongYan.prototype.update = function () {
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
            if (mg.uiManager.isOpen(dialog.baowu.BaoWuMain)) {
                if (GameModels.task.curTask.canSubmit) {
                    this.updateComponent(mg.uiManager.getView(s.UserfaceName.main).dock.backXpGroup, Language.C_GBDQJM);
                    return;
                }
                if (this._viewWBao.tabIndex != 0) {
                    this.updateComponent(this._viewWBao.btnHongYan, Language.J_DHYNBQ, TypeDirection.UP);
                    return;
                }
                if (GameModels.task.curTask.type == TypeTask.HONGYAN_ACT) {
                    this.updateComponent(this._viewWBao.hongYanView.btnJihuo, Language.J_DJJH, TypeDirection.UP);
                }
                else {
                    this.updateComponent(null);
                    utils.timer.clearAll(this);
                    utils.timer.once(200, this, function () {
                        this.updateComponent(this._viewWBao.hongYanView.btnCaiLiaoUp, Language.J_DJSJ, TypeDirection.UP);
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
        return GuideHongYan;
    }(main.GuideBase));
    main.GuideHongYan = GuideHongYan;
    __reflect(GuideHongYan.prototype, "main.GuideHongYan");
})(main || (main = {}));

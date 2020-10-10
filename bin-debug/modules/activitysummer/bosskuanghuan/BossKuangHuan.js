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
var view;
(function (view) {
    var activity;
    (function (activity) {
        var BossKuangHuan = (function (_super) {
            __extends(BossKuangHuan, _super);
            function BossKuangHuan() {
                return _super.call(this) || this;
            }
            BossKuangHuan.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            BossKuangHuan.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.BOSS);
                if (temp) {
                    this.labDesc.text = temp.des;
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                this.btnJIfen.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_JFDH);
                this.btnJIfen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenClick, this);
                this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoClick, this);
                this.upDataJifen();
            };
            BossKuangHuan.prototype.upDataJifen = function () {
                this.labCount.text = Language.C_DQJF + GameModels.activitySummer.myJifen;
            };
            BossKuangHuan.prototype.exit = function () {
                this.btnJIfen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenClick, this);
                this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoClick, this);
            };
            BossKuangHuan.prototype.onJifenClick = function (e) {
                GameModels.activitySummer.dispatchEventWith(mo.ModelSgActivitySummer.ACTIVITY_JIFENDUIHUAN_LINK);
            };
            BossKuangHuan.prototype.onGoClick = function (e) {
                mg.uiManager.show(dialog.explore.CopyFightBossDialog, { tabIndex: 1 });
            };
            return BossKuangHuan;
        }(ui.BossKuangHuanSkin));
        activity.BossKuangHuan = BossKuangHuan;
        __reflect(BossKuangHuan.prototype, "view.activity.BossKuangHuan", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

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
        var GuoQingJiZi = (function (_super) {
            __extends(GuoQingJiZi, _super);
            function GuoQingJiZi() {
                return _super.call(this) || this;
            }
            GuoQingJiZi.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.btnJIZi.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_JZDH);
            };
            GuoQingJiZi.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.GQJZ);
                if (temp) {
                    this.labDesc.text = temp.des;
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFightBosslick, this);
                this.btnJIZi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDuiHUanClick, this);
            };
            GuoQingJiZi.prototype.exit = function () {
                this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFightBosslick, this);
                this.btnJIZi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDuiHUanClick, this);
            };
            GuoQingJiZi.prototype.onDuiHUanClick = function (e) {
                GameModels.activitySummer.dispatchEventWith(mo.ModelSgActivitySummer.ACTIVITY_JIZI_DUIHUAN_LINK);
            };
            GuoQingJiZi.prototype.onFightBosslick = function (e) {
                mg.uiManager.show(dialog.explore.CopyFightBossDialog, { tabIndex: 1 });
            };
            return GuoQingJiZi;
        }(ui.GuoQingJiZiSkin));
        activity.GuoQingJiZi = GuoQingJiZi;
        __reflect(GuoQingJiZi.prototype, "view.activity.GuoQingJiZi", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

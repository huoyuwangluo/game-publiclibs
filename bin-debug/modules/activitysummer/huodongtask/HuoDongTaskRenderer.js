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
var renderer;
(function (renderer) {
    var HuoDongTaskRenderer = (function (_super) {
        __extends(HuoDongTaskRenderer, _super);
        function HuoDongTaskRenderer() {
            return _super.call(this) || this;
        }
        HuoDongTaskRenderer.prototype.dataChanged = function () {
            this.labName.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.funTiaoZhuangClick, this);
            if (this.data) {
                this.labName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.funTiaoZhuangClick, this);
                var taskData = this.data;
                var temp = Templates.getTemplateById(templates.Map.HOLIDAYTASK, taskData.TaskId);
                this.labJifen.text = "+" + temp.rewards.split("_")[1];
                this.labJindu.text = taskData.DoneCount + "/" + temp.maxTimes;
                this.labName.textFlow = utils.htmlUtil.getUnderlineFormat(temp.name);
            }
        };
        HuoDongTaskRenderer.prototype.funTiaoZhuangClick = function () {
            if (this.data) {
                var taskData = this.data;
                var temp = Templates.getTemplateById(templates.Map.HOLIDAYTASK, taskData.TaskId);
                var gameItem = Templates.getTemplateById(templates.Map.GAMEFUNCTIONS, temp.functionId);
                // if (gameItem && (GameModels.activity.kaifuDay >= gameItem.openDay) == false) {
                // 	mg.alertManager.tip(Language.getExpression(Language.E_KFD1WT, gameItem.openDay), 0xff0000);
                // 	return;
                // }
                mg.uiManager.showByName(temp.functionId);
            }
        };
        return HuoDongTaskRenderer;
    }(ui.HuoDongTaskRendererSkin));
    renderer.HuoDongTaskRenderer = HuoDongTaskRenderer;
    __reflect(HuoDongTaskRenderer.prototype, "renderer.HuoDongTaskRenderer");
})(renderer || (renderer = {}));

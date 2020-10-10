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
var FamilyBossRenderer = (function (_super) {
    __extends(FamilyBossRenderer, _super);
    function FamilyBossRenderer() {
        return _super.call(this) || this;
    }
    FamilyBossRenderer.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    FamilyBossRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data) {
            if (!this.btnEnter.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            }
            this.bossName.text = this.data.bossName;
            this.bossLv.text = "" + this.data.template.openLv;
            // this.bossHead.source = "img_boss_" + this.data.step + "_png";
            this.bossHead.source = ResPath.getShowBossHalfPath(this.data.templateBoss.resId);
            this.proPrestige.maximum = this.data.bossHPMax;
            this.proPrestige.value = this.data.bossHP;
            this.proPrestige.slideDuration = 0;
            this.proPrestige.labelFunction = this.barLabelFunction;
            var award = this.data.template.dropShow.split(";");
            this.reward0.dataSource = award[0];
            this.reward1.dataSource = award[1];
            this.reward2.dataSource = award[2];
            if (this.data.bossHP == 0) {
                this.btnEnter.filters = utils.filterUtil.grayFilters;
                this.btnEnter.touchEnabled = false;
                this.btnEnter.label = Language.C_YSW;
            }
            else {
                this.btnEnter.filters = null;
                this.btnEnter.touchEnabled = true;
                this.btnEnter.label = Language.C_TZ;
            }
            if (this.data.openLevel > GameModels.user.myConfigLevel) {
                this.btnEnter.label = Language.getExpression(Language.E_1HKQ, convert.getLevelName(this.data.openLevel));
                this.btnEnter.filters = utils.filterUtil.grayFilters;
                this.btnEnter.touchEnabled = false;
            }
        }
    };
    FamilyBossRenderer.prototype.barLabelFunction = function (value, maximum) {
        return Math.ceil(value / maximum * 100) + "%";
    };
    FamilyBossRenderer.prototype.btnClick = function () {
        if (this.data) {
            if (GameModels.copyBoss.pingDingShuZhongBossCount <= 0) {
                if (GameModels.platform.isPay) {
                    mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                }
                else {
                    mg.alertManager.tip(Language.J_GMCSBZ);
                }
                return;
            }
            //app.gameContext.enterFamilyBoss(this.data);
        }
    };
    return FamilyBossRenderer;
}(ui.FamilyBossRenderer));
__reflect(FamilyBossRenderer.prototype, "FamilyBossRenderer");

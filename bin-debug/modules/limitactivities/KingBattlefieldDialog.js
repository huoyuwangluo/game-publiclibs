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
var dialog;
(function (dialog) {
    var limitactivities;
    (function (limitactivities) {
        var KingBattlefieldDialog = (function (_super) {
            __extends(KingBattlefieldDialog, _super);
            function KingBattlefieldDialog() {
                return _super.call(this) || this;
            }
            KingBattlefieldDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            KingBattlefieldDialog.prototype.enter = function (data) {
                this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
                this.showAward();
            };
            KingBattlefieldDialog.prototype.exit = function () {
                this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
            };
            KingBattlefieldDialog.prototype.showAward = function () {
                var activetID = 301;
                this._personReward = Templates.getTemplatesByProperty(templates.Map.RANKREWARD, "type", 5);
                var award = this._personReward[0];
                var list = convert.parseItemsInfo(award.rewards);
                for (var i = 0; i < 4; i++) {
                    if (list[i]) {
                        this["awardItem" + i].dataSource = (list[i].id + "_" + list[i].count);
                        this["awardItem" + i].visible = true;
                    }
                    else {
                        this["awardItem" + i].visible = false;
                    }
                }
                var curActivityTemplate = Templates.getTemplateById(templates.Map.SCENEACTIVITY, activetID);
                var beginTime = curActivityTemplate.activeTime;
                this.validateNow();
                this.limitTime.text = Language.getExpression(Language.E_1Y2R3DKQWZJC, Language.C_QTIAN, '20:00');
                this.limitInfo.text = curActivityTemplate.des;
            };
            KingBattlefieldDialog.prototype.openHelp = function (e) {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 1001).des);
            };
            KingBattlefieldDialog.prototype.onTouchHandler = function (e) {
                switch (e.target) {
                    case this.btnEnter:
                        // if (GameModels.user.myConfigLevel < 80) {
                        // 	mg.alertManager.tip(Language.getExpression(Language.E_XYDJ1TZ, convert.getLevelName(80)))
                        // 	return
                        // }
                        app.gameContext.enterKingBattleGround(); //进入王者疆场
                        break;
                    case this.btnReward:
                        mg.alertManager.showAlert(limitactivities.KingBattlefieldRankDialog);
                        break;
                }
            };
            return KingBattlefieldDialog;
        }(ui.KingBattlefieldSkin));
        limitactivities.KingBattlefieldDialog = KingBattlefieldDialog;
        __reflect(KingBattlefieldDialog.prototype, "dialog.limitactivities.KingBattlefieldDialog");
    })(limitactivities = dialog.limitactivities || (dialog.limitactivities = {}));
})(dialog || (dialog = {}));

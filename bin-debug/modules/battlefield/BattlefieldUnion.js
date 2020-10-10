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
    var battlefield;
    (function (battlefield) {
        var BattlefieldUnion = (function (_super) {
            __extends(BattlefieldUnion, _super);
            function BattlefieldUnion() {
                return _super.call(this) || this;
            }
            BattlefieldUnion.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            BattlefieldUnion.prototype.enter = function () {
                if (GameModels.user.player.legionId == "") {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.J_NSWJRZY, TypeBtnLabel.OK_SIGIN, null, utils.Handler.create(this, function () {
                        mg.uiManager.removeAllDialogs();
                        mg.uiManager.show(LegionList);
                    }));
                    return;
                }
                var v = GameModels.dataSet.getDataSettingValueById(145001);
                this.awardItem0.dataSource = v.split(";")[0] ? v.split(";")[0] : null;
                this.awardItem1.dataSource = v.split(";")[1] ? v.split(";")[1] : null;
                this.awardItem2.dataSource = v.split(";")[2] ? v.split(";")[2] : null;
                this.awardItem3.dataSource = v.split(";")[3] ? v.split(";")[3] : null;
                GameModels.sceneLegin.requestWarInfo(this, this.updata);
                this.img_Go.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            };
            BattlefieldUnion.prototype.exit = function () {
                this.img_Go.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            };
            BattlefieldUnion.prototype.updata = function () {
                var temp = Templates.getTemplateById(templates.Map.SCENEACTIVITY, 101);
                this.labTime.text = Language.getExpression(Language.E_1Y2R3DKQJTZB1, Language.C_XTIAN, '20:00');
            };
            BattlefieldUnion.prototype.onTouchHandler = function (e) {
                switch (e.target) {
                    case this.img_Go:
                        if (GameModels.user.player.legionId == "") {
                            mg.alertManager.tip(Language.J_WJRJTWFCJJTZ);
                        }
                        else {
                            var actData = GameModels.activityNotice.getOpenActivityIdData(mo.ModelActivityNotice.LEGION_WAR);
                            if (actData == null) {
                                mg.alertManager.tip(Language.J_HDWKQ);
                                return;
                            }
                            if (actData.state != 2) {
                                mg.alertManager.tip(Language.J_HDWKQ);
                                return;
                            }
                            app.gameContext.enterLegionWar();
                        }
                        break;
                    case this.btnReward:
                        mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 4302).des);
                        break;
                    case this.btnRank:
                        mg.uiManager.show(dialog.battlefield.BattlefieldRank, false);
                        break;
                    case this.imgHelp:
                        mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 4301).des);
                        break;
                }
            };
            return BattlefieldUnion;
        }(ui.BattlefieldUnionSkin));
        battlefield.BattlefieldUnion = BattlefieldUnion;
        __reflect(BattlefieldUnion.prototype, "dialog.battlefield.BattlefieldUnion");
    })(battlefield = dialog.battlefield || (dialog.battlefield = {}));
})(dialog || (dialog = {}));

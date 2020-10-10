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
        var BattlefieldMonster = (function (_super) {
            __extends(BattlefieldMonster, _super);
            function BattlefieldMonster() {
                return _super.call(this) || this;
            }
            BattlefieldMonster.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            BattlefieldMonster.prototype.enter = function () {
                var _this = this;
                var v = GameModels.dataSet.getDataSettingValueById(900001);
                this.awardItem0.dataSource = v.split(";")[0] ? v.split(";")[0] : null;
                this.awardItem1.dataSource = v.split(";")[1] ? v.split(";")[1] : null;
                this.awardItem2.dataSource = v.split(";")[2] ? v.split(";")[2] : null;
                this.awardItem3.dataSource = v.split(";")[3] ? v.split(";")[3] : null;
                if (GameModels.serverTime.kaifuDay <= 7) {
                    this.limitTime.text = Language.J_QT;
                }
                else {
                    this.limitTime.text = Language.J_MZKF;
                }
                this.labCount.text = "";
                var actData = GameModels.activityNotice.getOpenActivityIdData(mo.ModelActivityNotice.YIZHULAIXI);
                if (actData && actData.state == 2 && actData.endTime > 0) {
                    GameModels.sceneGodDie.getDieBossInfo(utils.Handler.create(this, function () {
                        _this.labCount.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_JRBOSSSY12C, (GameModels.sceneGodDie.leftCount > 0 ? '0x00FF00' : '0xFF0000'), GameModels.sceneGodDie.leftCount));
                    }));
                }
                this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            };
            BattlefieldMonster.prototype.exit = function () {
                this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            };
            BattlefieldMonster.prototype.onTouchHandler = function (e) {
                if (e.currentTarget == this.btnEnter) {
                    app.gameContext.enterGodDie("640100");
                }
                else {
                    mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 6001).des);
                }
            };
            return BattlefieldMonster;
        }(ui.BattlefieldMonsterSkin));
        battlefield.BattlefieldMonster = BattlefieldMonster;
        __reflect(BattlefieldMonster.prototype, "dialog.battlefield.BattlefieldMonster");
    })(battlefield = dialog.battlefield || (dialog.battlefield = {}));
})(dialog || (dialog = {}));

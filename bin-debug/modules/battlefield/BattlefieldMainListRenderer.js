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
    var BattlefieldMainListRenderer = (function (_super) {
        __extends(BattlefieldMainListRenderer, _super);
        function BattlefieldMainListRenderer() {
            var _this = _super.call(this) || this;
            _this._redPointArr = [null, GameRedState.XIANSHI_SANGUO, GameRedState.XIANSHI_WUSHUANG, GameRedState.XIANSHI_WANGZHE, GameRedState.XIANSHI_DIANFENGSAI];
            _this._seasonArr = [Language.C_CTIAN, Language.C_XTIAN, Language.C_QTIAN, Language.C_DTIAN];
            _this._helpArr = [4301, 1001, 5901, 6001];
            return _this;
        }
        BattlefieldMainListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this._type = 0;
            if (this.data) {
                this._type = this.data;
                this.btnReward.visible = this._type == 2 || this._type == 3 || this._type == 4;
                this.imgHelp.visible = this._type != 1;
                GameModels.state.registerWarnTarget(this._redPointArr[this.itemIndex], this.imgRedPoint);
                this.imgBg.source = "img_battleBg_" + this._type + "_png";
                var typeGame = "";
                switch (this._type) {
                    case 1:
                        typeGame = Language.E_1Y2R3DKQSGZB;
                        break;
                    case 2:
                        typeGame = Language.E_1Y2R3DKQSGZB;
                        break;
                    case 3:
                        typeGame = Language.E_1Y2R3DKQWZJC;
                        break;
                    case 4:
                        typeGame = Language.E_1Y2R3DKQDFS;
                        break;
                    case 5:
                        if (GameModels.serverTime.kaifuDay <= 7) {
                            typeGame = Language.E_QTKF;
                            this.labTime.text = typeGame;
                        }
                        else {
                            typeGame = Language.E_QTKF1;
                            this.labTime.text = Language.getExpression(typeGame, '18:00');
                        }
                        break;
                }
                if (this._type < 5) {
                    this.labTime.text = Language.getExpression(typeGame, this._seasonArr[this._type - 1], this._type == 4 ? '12:00' : '20:00');
                }
                this.img_fight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFightClick, this);
                this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardClick, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
                this.imgBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFightClick, this);
            }
            else {
                GameModels.state.unRegisterWarnTarget(this._redPointArr[this.itemIndex]);
            }
        };
        BattlefieldMainListRenderer.prototype.onFightClick = function (e) {
            if (this._type == 1) {
                if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.campBattleMain, -1, true))
                    return;
                mg.uiManager.show(dialog.campBattle.CampBattleMain);
            }
            else if (this._type == 2) {
                if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.battlefieldMain, -1, true))
                    return;
                mg.uiManager.show(dialog.battlefield.BattlefieldUnion);
            }
            else if (this._type == 3) {
                if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.kingBattle, -1, true))
                    return;
                mg.uiManager.show(dialog.limitactivities.KingBattlefieldDialog);
            }
            else if (this._type == 4) {
                if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.topBattle, -1, true))
                    return;
                var hashJingCaiRedPoint = GameModels.topBattle.checkJingCaiRedPoint();
                mg.uiManager.show(dialog.topBattle.TopBattleMainDialog, { tabIndex: hashJingCaiRedPoint ? 1 : 0 });
            }
            else if (this._type == 5) {
                if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.monster, -1, true))
                    return;
                mg.uiManager.show(dialog.battlefield.BattlefieldMonster);
            }
        };
        BattlefieldMainListRenderer.prototype.onRewardClick = function (e) {
            if (this._type == 2) {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 4302).des, Language.J_JLXQ);
            }
            else if (this._type == 3) {
                mg.alertManager.showAlert(dialog.limitactivities.KingBattlefieldRankDialog);
            }
            else {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 6201).des, Language.J_JLXQ);
            }
        };
        BattlefieldMainListRenderer.prototype.onRankClick = function (e) {
            mg.uiManager.show(dialog.battlefield.BattlefieldRank, false);
        };
        BattlefieldMainListRenderer.prototype.onHelpClick = function (e) {
            mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, this._helpArr[this._type - 2]).des);
        };
        return BattlefieldMainListRenderer;
    }(ui.BattlefieldMainListRendererSkin));
    renderer.BattlefieldMainListRenderer = BattlefieldMainListRenderer;
    __reflect(BattlefieldMainListRenderer.prototype, "renderer.BattlefieldMainListRenderer");
})(renderer || (renderer = {}));

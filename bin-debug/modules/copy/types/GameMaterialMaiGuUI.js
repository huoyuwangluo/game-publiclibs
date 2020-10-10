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
var copy;
(function (copy) {
    var GameMaterialMaiGuUI = (function (_super) {
        __extends(GameMaterialMaiGuUI, _super);
        function GameMaterialMaiGuUI() {
            var _this = _super.call(this) || this;
            _this._maiguSkillIcons = [_this.ui.skillIcon0, _this.ui.skillIcon1, _this.ui.skillIcon2];
            return _this;
        }
        Object.defineProperty(GameMaterialMaiGuUI, "instance", {
            get: function () {
                if (!GameMaterialMaiGuUI._instance) {
                    GameMaterialMaiGuUI._instance = new GameMaterialMaiGuUI();
                }
                return GameMaterialMaiGuUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameMaterialMaiGuUI.prototype.setMaiGuSkillIconShow = function (boo) {
            if (!this._maiguSkillIcons || !this._maiguSkillIcons.length)
                return;
            for (var i = 0; i < this._maiguSkillIcons.length; i++) {
                this._maiguSkillIcons[i].visible = boo;
            }
        };
        GameMaterialMaiGuUI.prototype.enter = function () {
            GameModels.copyMaterial.addEventListener(mo.ModelGameMaterial.MAIGU_LUCKBOSS_REWARD, this.luckBossRewardHandler, this);
            this.setMaiGuSkillIcons();
            this.ui.materialMaiguInfo.enter();
        };
        GameMaterialMaiGuUI.prototype.exit = function () {
            for (var i = 0; i < this._maiguSkillIcons.length; i++) {
                this._maiguSkillIcons[i].reset();
                this._maiguSkillIcons[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.maiguSkillHandler, this);
            }
            GameModels.copyMaterial.clearCopyNotifyProgressEx();
            GameModels.copyMaterial.removeEventListener(mo.ModelGameMaterial.MAIGU_LUCKBOSS_REWARD, this.luckBossRewardHandler, this);
        };
        GameMaterialMaiGuUI.prototype.setMaiGuSkillIcons = function () {
            if (!this._maiguSkillIcons || !this._maiguSkillIcons.length)
                return;
            for (var i = 0; i < this._maiguSkillIcons.length; i++) {
                this._maiguSkillIcons[i].type = i + 1;
                this._maiguSkillIcons[i].iconFilter(true);
                this._maiguSkillIcons[i].labTimeShow = false;
                this._maiguSkillIcons[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.maiguSkillHandler, this);
            }
        };
        GameMaterialMaiGuUI.prototype.maiguSkillHandler = function (e) {
            if (!mo.ModelGameMaterial.MAIGU_GAMING_BOO)
                return;
            if (e.target instanceof components.IconButton) {
                var skillIcon = (e.target.parent);
                GameModels.copyMaterial.requestMaiGuUseSkill(skillIcon.type, utils.Handler.create(this, function () {
                    skillIcon.cdStart();
                    if (skillIcon.type == 3) {
                        GameModels.user.player.xpSetValueMax();
                    }
                    mg.alertManager.tip(skillIcon.word);
                }));
            }
        };
        GameMaterialMaiGuUI.prototype.luckBossRewardHandler = function () {
            var items = GameModels.copyMaterial.luckBossServerItems;
            if (items && items.length) {
                mg.alertManager.showAlert(MaiGuLukyBossRewardAlert, true, true, items, utils.Handler.create(this, function () {
                }));
            }
        };
        return GameMaterialMaiGuUI;
    }(copy.GameUIBase));
    copy.GameMaterialMaiGuUI = GameMaterialMaiGuUI;
    __reflect(GameMaterialMaiGuUI.prototype, "copy.GameMaterialMaiGuUI");
})(copy || (copy = {}));

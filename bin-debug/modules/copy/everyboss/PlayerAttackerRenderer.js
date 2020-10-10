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
    var PlayerAttackerRenderer = (function (_super) {
        __extends(PlayerAttackerRenderer, _super);
        function PlayerAttackerRenderer() {
            return _super.call(this) || this;
        }
        PlayerAttackerRenderer.prototype.initialize = function () {
            this.hp.minimum = 0;
            this.hp.maximum = 100;
        };
        PlayerAttackerRenderer.prototype.dataChanged = function () {
            if (this._playerVO) {
                this._playerVO.offTeamHpChange(this, this.hpChange);
                this._playerVO.offTeamDead(this, this.updateState);
                this._playerVO.offTeamTargetChange(this, this.targetChangeHandler);
                GameModels.user.player.offTeamTargetChange(this, this.targetChangeHandler);
                this.imgState.visible = false;
                this.imgAttack.visible = false;
                this.stopAttackEffect();
            }
            this._playerVO = this.data;
            if (this._playerVO) {
                this.head.source = ResPath.getPlayerIconSmall(this._playerVO.headIcon);
                this.labsid.text = (this.isCross() ? "S" + this._playerVO.serverId : '');
                this.labName.text = this._playerVO.name;
                this.imgSameLegoin.visible = this._playerVO.legionId ? true : false;
                this.imgSameLegoin.source = "common_json.img_union_point" + this._playerVO.legionId + "_png";
                //this.imgSameLegoin.visible = (this._playerVO != GameModels.user.player && this._playerVO.legionId == GameModels.user.player.legionId && GameModels.user.player.legionId != "");
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
                //this._playerVO.onPropertyChange(TypeProperty.HP, this, this.hpChange);
                //this._playerVO.onPropertyChange(TypeProperty.MaxHP, this, this.hpChange);
                this._playerVO.onTeamHpChange(this, this.hpChange);
                this._playerVO.onTeamDead(this, this.updateState);
                this._playerVO.onTeamTargetChange(this, this.targetChangeHandler);
                GameModels.user.player.onTeamTargetChange(this, this.targetChangeHandler);
                // if(TypeGame.isMutilBossCopy(app.gameContext.typeGame)||app.gameContext.typeGame==TypeGame.KING_BATTLE_GROUD||app.gameContext.typeGame==TypeGame.LEGION_WAR) {
                //     this.updateState();
                // } else {
                //     this.imgState.visible=false;
                //     this.imgAttack.visible=false;
                //     this.stopAttackEffect();
                // }
                if (app.gameContext.typeGame == TypeGame.JUE_DI_QIU_SHENG) {
                    this.labName.text = Language.C_SMR;
                    this.imgSameLegoin.visible = false;
                }
                this.hpChange();
                this.updateState();
            }
            else {
                this.imgState.visible = false;
                this.imgAttack.visible = false;
                this.imgSameLegoin.visible = false;
                this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
                if (this.stage)
                    this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                this.stopAttackEffect();
            }
        };
        PlayerAttackerRenderer.prototype.isCross = function () {
            switch (app.gameContext.typeGame) {
                case TypeGame.CROSS_BOSS:
                case TypeGame.SECRET_BOSS:
                    // case TypeGame.WOORS_BOSS:
                    // case TypeGame.DEATH_BOSS:
                    return true;
            }
            return false;
        };
        PlayerAttackerRenderer.prototype.hpChange = function () {
            this.hp.value = (this._playerVO.getTeamHp() / this._playerVO.getTeamHpMax()) * 100;
        };
        Object.defineProperty(PlayerAttackerRenderer.prototype, "playerVO", {
            get: function () {
                return this._playerVO;
            },
            enumerable: true,
            configurable: true
        });
        PlayerAttackerRenderer.prototype.targetChangeHandler = function () {
            this.updateState();
        };
        PlayerAttackerRenderer.prototype.updateState = function () {
            if (!this.playerVO || this.playerVO.isTeamAllDead) {
                this.imgState.visible = false;
                this.stopAttackEffect();
                return;
            }
            //if (GameModels.user.player.target != null && GameModels.user.player.target.master == this.playerVO) {
            if (this.playerVO.isSelfTeam(GameModels.user.player.getTeamTarget())) {
                this.imgState.visible = true;
                this.imgState.source = "copy_json.boss_player_attacking";
                this.stopAttackEffect();
                return;
            }
            //if (this.playerVO.target != null && this.playerVO.target.master == GameModels.user.player) {
            if (GameModels.user.player.isSelfTeam(this.playerVO.getTeamTarget())) {
                this.imgState.visible = true;
                this.imgState.source = "copy_json.boss_player_attacked";
                this.startAttackEffect();
                return;
            }
            this.imgState.visible = false;
            this.stopAttackEffect();
        };
        PlayerAttackerRenderer.prototype.startAttackEffect = function () {
            this.imgAttack.visible = true;
            egret.Tween.removeTweens(this.imgAttack);
            egret.Tween.get(this.imgAttack).to({ alpha: this.imgAttack.alpha > 0.5 ? 0.2 : 1 }, 1000).call(this.startAttackEffect, this);
        };
        PlayerAttackerRenderer.prototype.stopAttackEffect = function () {
            this.imgAttack.visible = false;
            egret.Tween.removeTweens(this.imgAttack);
        };
        PlayerAttackerRenderer.prototype.touchHandler = function (e) {
            egret.Tween.removeTweens(this);
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.scaleX = 1;
                    this.scaleY = 1;
                    egret.Tween.get(this).to({ scaleX: 0.8, scaleY: 0.8 }, 300, utils.Ease.cubicOut);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 300, utils.Ease.circOut);
                    if (this.stage)
                        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    break;
            }
        };
        return PlayerAttackerRenderer;
    }(ui.PlayerAttackerRendererSkin));
    renderer.PlayerAttackerRenderer = PlayerAttackerRenderer;
    __reflect(PlayerAttackerRenderer.prototype, "renderer.PlayerAttackerRenderer");
})(renderer || (renderer = {}));

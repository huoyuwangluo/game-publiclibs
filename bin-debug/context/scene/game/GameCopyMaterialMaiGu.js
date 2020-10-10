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
var s;
(function (s) {
    /**埋骨禁地玩法 */
    var GameCopyMaterialMaiGu = (function (_super) {
        __extends(GameCopyMaterialMaiGu, _super);
        function GameCopyMaterialMaiGu() {
            return _super.call(this, TypeGame.MATERIAL_MAIGU) || this;
        }
        GameCopyMaterialMaiGu.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 3;
        };
        GameCopyMaterialMaiGu.prototype.start = function () {
            _super.prototype.start.call(this);
            this._player.onDead(this, this.userDeadHandler);
            this._player.onRelife(this, this.userRelifeHandler);
            this._getGameSmartNpc = this.getGameSmartNpc();
            if (this._getGameSmartNpc && this._getGameSmartNpc.vo) {
                this._getGameSmartNpc.vo.onPropertyChange(TypeProperty.Hp, this, this.hurtHandler);
                this._getGameSmartNpc.vo.onPropertyChange(TypeProperty.MaxHp, this, this.hurtHandler);
            }
        };
        GameCopyMaterialMaiGu.prototype.exit = function () {
            _super.prototype.exit.call(this);
            mo.ModelGameMaterial.MAIGU_IMMEDIATELY_REVIVE = false;
            mo.ModelGameMaterial.MAIGU_GAMING_BOO = false;
            if (this._getGameSmartNpc && this._getGameSmartNpc.vo) {
                this._getGameSmartNpc.vo.offPropertyChange(TypeProperty.Hp, this, this.hurtHandler);
                this._getGameSmartNpc.vo.offPropertyChange(TypeProperty.MaxHp, this, this.hurtHandler);
            }
        };
        GameCopyMaterialMaiGu.prototype.startHandler = function () {
            _super.prototype.startHandler.call(this);
            mo.ModelGameMaterial.MAIGU_GAMING_BOO = true;
        };
        GameCopyMaterialMaiGu.prototype.hurtHandler = function () {
            copy.CopyMainView.instance.materialMaiguInfo.hurtHandler();
        };
        GameCopyMaterialMaiGu.prototype.getGameSmartNpc = function () {
            if (this._sights && this._sights.length) {
                for (var _i = 0, _a = this._sights; _i < _a.length; _i++) {
                    var smartMonster = _a[_i];
                    if (smartMonster.type == TypeActor.NPC) {
                        return smartMonster;
                    }
                }
            }
            return null;
        };
        /**玩家死亡 */
        GameCopyMaterialMaiGu.prototype.userDeadHandler = function (killerVO) {
            /*if (mo.ModelGameMaterial.MAIGU_IMMEDIATELY_REVIVE) {
                if (GameModels.user.player.diamonds < 100) {
                }
                else {
                    GameModels.scene.requestRelife(1)
                    return;
                }
            }
            
            copy.CopyMainView.instance.relifeView.show(killerVO ? killerVO.name : "BOSS", "", 15, 100, this, function (useGold: boolean) {
                GameModels.scene.requestRelife(useGold ? 1 : 0)
            });
            */
        };
        /**玩家复活 */
        GameCopyMaterialMaiGu.prototype.userRelifeHandler = function () {
            /*mg.alertManager.closeALert();
            GameModels.user.player.resetState();
            this._player.damgeEnabled = false;
            this._player.effectEnabled = true;
            this._player.autoAttack = false;
            this._player.setTile(this._scene.getNode(GameModels.user.player.tileX, GameModels.user.player.tileY));
            this._player.actionTo(TypeAction.IDLE, TypeDirection.DOWN);
            this._player.petGroup.formatPosition(this._player.direct, this._player.tileNode);
            this._player.target = null;
            this.startHandler();*/
        };
        return GameCopyMaterialMaiGu;
    }(s.GameMaterial));
    s.GameCopyMaterialMaiGu = GameCopyMaterialMaiGu;
    __reflect(GameCopyMaterialMaiGu.prototype, "s.GameCopyMaterialMaiGu");
})(s || (s = {}));

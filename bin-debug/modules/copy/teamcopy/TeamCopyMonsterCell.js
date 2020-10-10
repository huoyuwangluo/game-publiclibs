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
    var TeamCopyMonsterCell = (function (_super) {
        __extends(TeamCopyMonsterCell, _super);
        function TeamCopyMonsterCell() {
            return _super.call(this) || this;
        }
        TeamCopyMonsterCell.prototype.dataChanged = function () {
            if (this.data && this.data.smartVO != null) {
                var gameMonsterVO = this.data.smartVO;
                this.bossGroup.visible = (gameMonsterVO.type == TypeMonster.BOSS);
                this.monsterGroup.visible = (gameMonsterVO.type != TypeMonster.BOSS);
                this.bossHead.source = this.monsterHead.source = ResPath.getBossIconSmall(gameMonsterVO.resId);
                this.labBossName.text = gameMonsterVO.name;
                if (!this._effect) {
                    this._effect = utils.ObjectPool.from(s.AnimationSprite);
                    this._effect.resId = "6066";
                    this._effect.x = 56;
                    this._effect.y = 13;
                    this.addChild(this._effect);
                }
                if (this.data.isKill) {
                    this._effect.play();
                    this._effect.visible = true;
                }
                else {
                    this._effect.stop();
                    this._effect.visible = false;
                }
            }
            else {
                this.bossHead.source = this.monsterHead.source = null;
                this.labBossName.text = "";
                this.removeEffect();
            }
        };
        TeamCopyMonsterCell.prototype.removeEffect = function () {
            if (this._effect) {
                this._effect.visible = true;
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
                this._effect.stop();
                utils.ObjectPool.to(this._effect, true);
                this._effect = null;
            }
        };
        return TeamCopyMonsterCell;
    }(ui.TeamCopyMonsterCellSkin));
    renderer.TeamCopyMonsterCell = TeamCopyMonsterCell;
    __reflect(TeamCopyMonsterCell.prototype, "renderer.TeamCopyMonsterCell");
})(renderer || (renderer = {}));

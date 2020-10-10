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
    var TopBattleStepBattleListRenderer = (function (_super) {
        __extends(TopBattleStepBattleListRenderer, _super);
        function TopBattleStepBattleListRenderer() {
            return _super.call(this) || this;
        }
        TopBattleStepBattleListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var player = this.data;
                this.labName.text = player.playerName;
                this.labFight.text = Language.P_ZL + player.playerFight;
                this.imgHead.source = ResPath.getPlayerIconSmall(player.head);
                this.labLv.text = "Lv." + player.level;
            }
        };
        return TopBattleStepBattleListRenderer;
    }(ui.TopBattleStepBattleListRendererSkin));
    renderer.TopBattleStepBattleListRenderer = TopBattleStepBattleListRenderer;
    __reflect(TopBattleStepBattleListRenderer.prototype, "renderer.TopBattleStepBattleListRenderer");
})(renderer || (renderer = {}));

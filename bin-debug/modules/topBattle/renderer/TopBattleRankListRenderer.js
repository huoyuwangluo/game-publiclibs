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
    var TopBattleRankListRenderer = (function (_super) {
        __extends(TopBattleRankListRenderer, _super);
        function TopBattleRankListRenderer() {
            return _super.call(this) || this;
        }
        TopBattleRankListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var player = this.data;
                this.labName.text = player.playerName;
                this.labFight.text = Language.P_ZL + player.playerFight;
                this.imgHead.source = ResPath.getPlayerIconSmall(player.head);
                if (player.ranking <= 3) {
                    this.imgRanking.visible = true;
                    this.labRanking.visible = false;
                    this.imgRanking.source = ResPath.getRankingIconKey(player.ranking);
                }
                else {
                    this.imgRanking.visible = false;
                    this.labRanking.visible = true;
                    this.labRanking.text = player.ranking.toString();
                }
            }
        };
        return TopBattleRankListRenderer;
    }(ui.TopBattleRankListRendererSkin));
    renderer.TopBattleRankListRenderer = TopBattleRankListRenderer;
    __reflect(TopBattleRankListRenderer.prototype, "renderer.TopBattleRankListRenderer");
})(renderer || (renderer = {}));

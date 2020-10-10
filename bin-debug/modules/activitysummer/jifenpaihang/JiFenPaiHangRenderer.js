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
    var JiFenPaiHangRenderer = (function (_super) {
        __extends(JiFenPaiHangRenderer, _super);
        function JiFenPaiHangRenderer() {
            return _super.call(this) || this;
        }
        JiFenPaiHangRenderer.prototype.dataChanged = function () {
            var data = this.data;
            this.labRank.visible = false;
            this.imgRanking.source = null;
            this.imgRanking.visible = false;
            if (data) {
                if (data.ranking >= 1 && data.ranking <= 3) {
                    this.imgRanking.visible = true;
                    this.imgRanking.source = "rankCommon_json.img_rank_" + data.ranking;
                }
                else {
                    this.labRank.visible = true;
                    this.labRank.text = data.ranking.toString();
                }
                this.labName.text = data.playerData.PlayerName;
                this.labMyJifen.text = data.playerData.Score.toString();
                if (this.itemIndex >= 0 && this.itemIndex <= 2) {
                    this.reward.dataSource = GameModels.activitySummer.getRankTmps(this.itemIndex);
                }
                else {
                    this.reward.dataSource = GameModels.activitySummer.getRankTmps(3);
                }
            }
        };
        return JiFenPaiHangRenderer;
    }(ui.JiFenPaiHangRendererSkin));
    renderer.JiFenPaiHangRenderer = JiFenPaiHangRenderer;
    __reflect(JiFenPaiHangRenderer.prototype, "renderer.JiFenPaiHangRenderer");
})(renderer || (renderer = {}));

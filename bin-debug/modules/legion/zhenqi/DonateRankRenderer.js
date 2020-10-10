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
    var DonateRankRenderer = (function (_super) {
        __extends(DonateRankRenderer, _super);
        function DonateRankRenderer() {
            return _super.call(this) || this;
        }
        DonateRankRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var data = this.data;
            this.labRank.visible = false;
            this.imgRanking.source = null;
            this.imgRanking.visible = false;
            this.vipLevel.visible = false;
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
                this.imgHead.source = ResPath.getPlayerIconSmall(data.playerData.HeadIcon);
                if (data.playerData.Vip > 0) {
                    this.vipLevel.visible = true;
                    this.vipLevel.source = "newVip_json.vip_" + data.playerData.Vip;
                }
                this.labCount.text = data.playerData.Score.toString();
            }
        };
        return DonateRankRenderer;
    }(ui.DonateRankRendererSkin));
    renderer.DonateRankRenderer = DonateRankRenderer;
    __reflect(DonateRankRenderer.prototype, "renderer.DonateRankRenderer");
})(renderer || (renderer = {}));

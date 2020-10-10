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
    var RankingMainDialogRenderer = (function (_super) {
        __extends(RankingMainDialogRenderer, _super);
        function RankingMainDialogRenderer() {
            var _this = _super.call(this) || this;
            _this._strArr = [Language.C_TGK, Language.C_ZZL, Language.C_ZDJ, Language.C_TTJF, Language.C_WHT, Language.C_HST, Language.C_SZSL];
            return _this;
        }
        RankingMainDialogRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var data = this.data;
                this.imgHead.source = ResPath.getPlayerIconSmall(data.TopPlayerData.HeadIcon);
                if (data.TopPlayerData.UnionId) {
                    this.imgUnion.source = "img_rank_union_" + data.TopPlayerData.UnionId + "_png";
                    this.imgLegion.visible = true;
                    this.imgLegion.source = "common_json.img_union_point" + data.TopPlayerData.UnionId + "_png";
                }
                else {
                    this.imgUnion.source = "img_rank_union_" + 0 + "_png";
                    this.imgLegion.visible = false;
                }
                this.imgTitle.source = "img_rank_title_" + data.SortboardType + "_png";
                this.imgBg.source = "img_rank_bg_" + data.SortboardType + "_png";
                this.labLevel.text = "";
                this.labName.text = data.TopPlayerData.PlayerName;
                this.labTypeFight.text = this._strArr[this.itemIndex] + ":" + data.TopPlayerData.Score;
                this.imgRedPoint.visible = data.DoneWorship <= 0;
            }
        };
        return RankingMainDialogRenderer;
    }(ui.RankingMainDialogRendererSkin));
    renderer.RankingMainDialogRenderer = RankingMainDialogRenderer;
    __reflect(RankingMainDialogRenderer.prototype, "renderer.RankingMainDialogRenderer");
})(renderer || (renderer = {}));

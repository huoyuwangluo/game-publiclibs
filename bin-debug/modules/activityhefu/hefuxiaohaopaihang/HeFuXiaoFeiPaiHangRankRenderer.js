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
    var HeFuXiaoFeiPaiHangRankRenderer = (function (_super) {
        __extends(HeFuXiaoFeiPaiHangRankRenderer, _super);
        function HeFuXiaoFeiPaiHangRankRenderer() {
            var _this = _super.call(this) || this;
            var temp = GameModels.activityHeFu.getActivityHeFuListTemplates(game.TypeHeFuActivity.HEFU_XIAOHAO_PAIHANG);
            if (temp) {
                _this._rewadTmps = Templates.getTemplatesByProperty(templates.Map.MERGERANK, "type", temp.id);
            }
            return _this;
        }
        HeFuXiaoFeiPaiHangRankRenderer.prototype.dataChanged = function () {
            if (this.data) {
                if (this.data == "1111") {
                    this.labName.text = Language.C_XWYD;
                    this.imgRanking.source = "rankCommon_json.img_rank_" + (this.itemIndex + 1);
                    this.headIcon.source = "army_6020101_png";
                    this.labCount.text = "0";
                }
                else {
                    this.labName.text = this.data.PlayerName;
                    this.imgRanking.source = "rankCommon_json.img_rank_" + (this.data.Rank);
                    this.headIcon.source = "qualityBg_json.img_head_png";
                    this.labCount.text = "" + this.data.Value;
                }
                this.reward1.dataSource = this._rewadTmps[this.itemIndex].rewards;
            }
            else {
                this.reward1.dataSource = null;
            }
        };
        return HeFuXiaoFeiPaiHangRankRenderer;
    }(ui.HeFuXiaoFeiPaiHangRankRendererSkin));
    renderer.HeFuXiaoFeiPaiHangRankRenderer = HeFuXiaoFeiPaiHangRankRenderer;
    __reflect(HeFuXiaoFeiPaiHangRankRenderer.prototype, "renderer.HeFuXiaoFeiPaiHangRankRenderer");
})(renderer || (renderer = {}));

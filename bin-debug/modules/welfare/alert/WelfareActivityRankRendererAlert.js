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
    var WelfareActivityRankRendererAlert = (function (_super) {
        __extends(WelfareActivityRankRendererAlert, _super);
        function WelfareActivityRankRendererAlert() {
            return _super.call(this) || this;
        }
        WelfareActivityRankRendererAlert.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var data = this.data;
            if (data) {
                var rankListVo = data;
                if (rankListVo.rank <= 3) {
                    this.blabRank.text = "";
                    this.imgRanking.visible = true;
                    this.imgRanking.source = "rankCommon_json.img_rank_" + rankListVo.rank;
                }
                else {
                    this.imgRanking.visible = false;
                    this.blabRank.text = "" + rankListVo.rank;
                }
                this.imgHead.source = ResPath.getPlayerIconSmall(rankListVo.headIcon);
                this.labName.text = rankListVo.playerName;
                this.labScore.text = "" + rankListVo.score;
            }
        };
        return WelfareActivityRankRendererAlert;
    }(ui.WelfareActivityRankRendererAlertSkin));
    renderer.WelfareActivityRankRendererAlert = WelfareActivityRankRendererAlert;
    __reflect(WelfareActivityRankRendererAlert.prototype, "renderer.WelfareActivityRankRendererAlert");
})(renderer || (renderer = {}));

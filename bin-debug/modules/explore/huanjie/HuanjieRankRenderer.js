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
    var HuanjieRankRenderer = (function (_super) {
        __extends(HuanjieRankRenderer, _super);
        function HuanjieRankRenderer() {
            return _super.call(this) || this;
        }
        HuanjieRankRenderer.prototype.dataChanged = function () {
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
                if (data.playerData.Vip > 0) {
                    this.vipLevel.visible = true;
                    this.vipLevel.source = "newVip_json.vip_" + data.playerData.Vip;
                }
                var ceng = Math.ceil(data.playerData.Score / 10000);
                this.labCount.text = ceng + Language.Z_CENG;
                var time = (ceng * 10000) - data.playerData.Score;
                this.labTime.text = this.getTimeLeft2BySecond(time);
            }
        };
        HuanjieRankRenderer.prototype.getTimeLeft2BySecond = function (s) {
            var minuteStr = "";
            var secondStr = "";
            var minute = Math.floor((s % 3600) / 60);
            if (minute <= 0) {
                minuteStr = "00";
            }
            else if (minute < 10) {
                minuteStr = "0" + minute;
            }
            else {
                minuteStr = "" + minute;
            }
            var second = (s % 60);
            if (second <= 0) {
                secondStr = "00";
            }
            else if (second < 10) {
                secondStr = "0" + second;
            }
            else {
                secondStr = "" + second;
            }
            return minuteStr + ":" + secondStr;
        };
        return HuanjieRankRenderer;
    }(ui.HuanjieRankRendererSkin));
    renderer.HuanjieRankRenderer = HuanjieRankRenderer;
    __reflect(HuanjieRankRenderer.prototype, "renderer.HuanjieRankRenderer");
})(renderer || (renderer = {}));

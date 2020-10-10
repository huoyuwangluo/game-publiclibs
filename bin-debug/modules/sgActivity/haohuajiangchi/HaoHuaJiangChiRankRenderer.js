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
    var HaoHuaJiangChiRankRenderer = (function (_super) {
        __extends(HaoHuaJiangChiRankRenderer, _super);
        function HaoHuaJiangChiRankRenderer() {
            return _super.call(this) || this;
        }
        HaoHuaJiangChiRankRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                if (this.data.rank <= 3) {
                    this.blabRank.text = "";
                    this.imgRanking.visible = true;
                    this.imgRanking.source = "rankCommon_json.img_rank_" + this.data.rank;
                }
                else {
                    this.imgRanking.visible = false;
                    this.blabRank.text = this.data.rank;
                }
                //this.labCount2.text = "" + Math.ceil(GameModels.sgActivity.params * GameModels.dataSet.haohuaJiangchi(this.data.rank));
                if (this.data.rankVo) {
                    var rankVo = this.data.rankVo;
                    this.labName.text = rankVo.playerName;
                    this.labCount1.text = "" + rankVo.score;
                }
                else {
                    this.labName.text = Language.C_XWYD;
                    this.labCount1.text = "" + 0;
                }
                if (this.data.rewardVo) {
                    var rewardVo = this.data.rewardVo;
                    var rewards = rewardVo.templateRewards.split(";");
                    if (rewards[0]) {
                        var itemTmp = Templates.getTemplateById(templates.Map.ITEM, rewards[0].split("_")[0]);
                        this.imgIcon.source = itemTmp.icon;
                        this.labCount2.text = "X" + rewards[0].split("_")[1];
                    }
                    else {
                        this.imgIcon.source = null;
                        this.labCount2.text = "";
                    }
                    if (rewards[1]) {
                        this.reward.dataSource = rewards[1];
                        this.reward.labName.text = "";
                        this.reward.visible = true;
                    }
                    else {
                        this.reward.dataSource = null;
                        this.reward.visible = false;
                    }
                }
                else {
                    this.reward.dataSource = null;
                    this.reward.visible = false;
                }
            }
        };
        return HaoHuaJiangChiRankRenderer;
    }(ui.HaoHuaJiangChiRankRendererSkin));
    renderer.HaoHuaJiangChiRankRenderer = HaoHuaJiangChiRankRenderer;
    __reflect(HaoHuaJiangChiRankRenderer.prototype, "renderer.HaoHuaJiangChiRankRenderer");
})(renderer || (renderer = {}));

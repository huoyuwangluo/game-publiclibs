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
    var BingFenSanLuRankingRenderer = (function (_super) {
        __extends(BingFenSanLuRankingRenderer, _super);
        function BingFenSanLuRankingRenderer() {
            return _super.call(this) || this;
        }
        BingFenSanLuRankingRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            // var data: any = { playerData: null, ranking: 0 };
            if (this.data) {
                this._playerData = this.data.playerData;
                this._ranking = this.data.ranking;
                this.updateState();
            }
            else {
                this.reward1.dataSource = null;
                this.reward0.dataSource = null;
            }
        };
        BingFenSanLuRankingRenderer.prototype.updateState = function () {
            var temps = Templates.getTemplatesByProperty(templates.Map.RANKREWARD, "type", 4); //4势力塔类型
            for (var i = 0; i < temps.length; i++) {
                if (this._ranking >= temps[i].rankMin && this._ranking <= temps[i].rankMax) {
                    this._tempReward = temps[i];
                    break;
                }
                else {
                    this._tempReward = null;
                }
            }
            if (!this._playerData) {
                this.currentState = BingFenSanLuRankingRenderer.NOPLAYER;
                this.updatePrizeData();
            }
            else if (this._tempReward && this._tempReward.rewards) {
                if (this._ranking <= 3) {
                    this.currentState = BingFenSanLuRankingRenderer.HASPLAYER;
                    this.updataData();
                    this.updatePrizeData();
                    this.imgRanking.source = ResPath.getRankingIconKey((this._ranking));
                }
                else {
                    this.currentState = BingFenSanLuRankingRenderer.HASPLAYERART;
                    this.updatePrizeData();
                    this.updataData();
                }
            }
            else {
                this.currentState = BingFenSanLuRankingRenderer.NOREWARD;
                this.updataData();
            }
            this.labRanking.text = this._ranking.toString();
            if (this._playerData) {
                this.icon.setIcon(ResPath.getPlayerIconSmall(this._playerData.playerData.HeadIcon));
            }
            else {
                this.icon.setIcon(ResPath.getPlayerIconSmall(0));
            }
        };
        BingFenSanLuRankingRenderer.prototype.updatePrizeData = function () {
            this.reward0.dataSource ? vo.toPool(this.reward0.dataSource) : null;
            this.reward1.dataSource ? vo.toPool(this.reward1.dataSource) : null;
            var chest = vo.fromPool(vo.PrizeVO, this._tempReward, item.TypePrize.SILVER);
            this.reward0.dataSource = chest.items[0].id + "_" + chest.items[0].count;
            if (chest.items[1]) {
                this.reward1.visible = true;
                this.reward1.dataSource = chest.items[1].id + "_" + chest.items[1].count;
            }
            else {
                this.reward1.dataSource = null;
                this.reward1.visible = false;
            }
        };
        BingFenSanLuRankingRenderer.prototype.updataData = function () {
            if (this._playerData) {
                this.labScore.text = this._playerData.playerData.Score.toString();
                this.labNameGrade.text = this._playerData.playerData.PlayerName + "";
            }
            else {
                this.labScore.text = "0";
                this.labNameGrade.text = Language.C_ZW;
            }
        };
        BingFenSanLuRankingRenderer.HASPLAYER = "hasReward"; //奖励前三
        BingFenSanLuRankingRenderer.HASPLAYERART = "hasRewardArt"; //奖励3外
        BingFenSanLuRankingRenderer.NOREWARD = "noReward"; //无奖励
        BingFenSanLuRankingRenderer.NOPLAYER = "noPlayer"; //无玩家
        return BingFenSanLuRankingRenderer;
    }(ui.BingFenSanLuRankingRendererSkin));
    renderer.BingFenSanLuRankingRenderer = BingFenSanLuRankingRenderer;
    __reflect(BingFenSanLuRankingRenderer.prototype, "renderer.BingFenSanLuRankingRenderer");
})(renderer || (renderer = {}));

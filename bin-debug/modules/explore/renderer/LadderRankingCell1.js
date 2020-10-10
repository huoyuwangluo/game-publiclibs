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
    var LadderRankingCell1 = (function (_super) {
        __extends(LadderRankingCell1, _super);
        function LadderRankingCell1() {
            return _super.call(this) || this;
        }
        LadderRankingCell1.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this._playerData = this.data;
            if (this._playerData) {
                this.updateState();
            }
        };
        LadderRankingCell1.prototype.updateState = function () {
            var temps = Templates.getTemplatesByProperty(templates.Map.RANKREWARD, "type", 32); //32演武类型
            var ladderRanking = this._playerData.ladderRanking;
            for (var i = 0; i < temps.length; i++) {
                if (ladderRanking >= temps[i].rankMin && ladderRanking <= temps[i].rankMax) {
                    this._tempReward = temps[i];
                    break;
                }
                else {
                    this._tempReward = null;
                }
            }
            if (!this._playerData.playerId) {
                this.currentState = LadderRankingCell1.NOPLAYER;
                this.updatePrizeData();
            }
            else if (this._tempReward && this._tempReward.rewards) {
                if (this._playerData.ladderRanking <= 3) {
                    this.currentState = LadderRankingCell1.HASPLAYER;
                    this.updataData();
                    this.updatePrizeData();
                    this.imgRanking.source = ResPath.getRankingIconKey((this._playerData.ladderRanking));
                }
                else {
                    this.currentState = LadderRankingCell1.HASPLAYERART;
                    this.updatePrizeData();
                    this.updataData();
                }
            }
            else {
                this.currentState = LadderRankingCell1.NOREWARD;
                this.updataData();
            }
            this.labRanking.text = this._playerData.ladderRanking.toString();
            var profession = this._playerData.profession;
            this.icon.setIcon(ResPath.getPlayerIconSmall(this._playerData.playerHeadIcon));
        };
        LadderRankingCell1.prototype.updatePrizeData = function () {
            this.reward0.dataSource ? vo.toPool(this.reward0.dataSource) : null;
            this.reward1.dataSource ? vo.toPool(this.reward1.dataSource) : null;
            var chest = vo.fromPool(vo.PrizeVO, this._tempReward, item.TypePrize.SILVER);
            this.reward0.dataSource = chest.items[0].id + "_" + chest.items[0].count;
            this.reward1.dataSource = chest.items[1].id + "_" + chest.items[1].count;
        };
        LadderRankingCell1.prototype.updataData = function () {
            this.labScore.text = this._playerData.myOrAddScore.toString();
            this.labNameGrade.text = this._playerData.name;
        };
        LadderRankingCell1.HASPLAYER = "hasReward"; //奖励前三
        LadderRankingCell1.HASPLAYERART = "hasRewardArt"; //奖励3外
        LadderRankingCell1.NOREWARD = "noReward"; //无奖励
        LadderRankingCell1.NOPLAYER = "noPlayer"; //无玩家
        return LadderRankingCell1;
    }(ui.LadderRankingCell1Skin));
    renderer.LadderRankingCell1 = LadderRankingCell1;
    __reflect(LadderRankingCell1.prototype, "renderer.LadderRankingCell1");
})(renderer || (renderer = {}));

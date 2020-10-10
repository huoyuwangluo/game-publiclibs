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
    var LadderRankingCell = (function (_super) {
        __extends(LadderRankingCell, _super);
        function LadderRankingCell() {
            return _super.call(this) || this;
        }
        LadderRankingCell.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this._playerData = this.data;
            if (this._playerData) {
                this.updateState();
            }
        };
        LadderRankingCell.prototype.updateState = function () {
            var temps = Templates.getTemplatesByProperty(templates.Map.RANKREWARD, "type", 30); //30天梯类型
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
                this.currentState = LadderRankingCell.NOPLAYER;
            }
            else if (this._tempReward && this._tempReward.rewards) {
                if (this._playerData.ladderRanking <= 3) {
                    this.currentState = LadderRankingCell.HASPLAYER;
                    this.updataData();
                    this.updatePrizeData();
                    this.imgRanking.source = ResPath.getRankingIconKey((this._playerData.ladderRanking));
                }
                else {
                    this.currentState = LadderRankingCell.HASPLAYERART;
                    this.updatePrizeData();
                    this.updataData();
                }
            }
            else {
                this.currentState = LadderRankingCell.NOREWARD;
                this.updataData();
            }
            this.labRanking.text = this._playerData.ladderRanking.toString();
            var profession = this._playerData.profession;
            this.icon.setIcon(ResPath.getPlayerIconSmall(this._playerData.playerHeadIcon));
        };
        LadderRankingCell.prototype.updatePrizeData = function () {
            this.reward.dataSource ? vo.toPool(this.reward.dataSource) : null;
            var chest = vo.fromPool(vo.PrizeVO, this._tempReward, item.TypePrize.SILVER);
            this.reward.dataSource = chest.items[0].id;
        };
        LadderRankingCell.prototype.updataData = function () {
            var ladderStep = this._playerData.step;
            this.imgGrade.source = dialog.explore.TypeGrade.getGradeImage(ladderStep);
            if (ladderStep != dialog.explore.TypeGrade.EXTREME) {
                this.imgLv.visible = true;
                this.imgLv.source = dialog.explore.TypeGrade.getLvImge(ladderStep, this._playerData.lv);
            }
            else {
                this.imgLv.visible = false;
            }
            this.labScore.text = this._playerData.myOrAddScore.toString();
            this.labNameGrade.text = this._playerData.name;
        };
        LadderRankingCell.HASPLAYER = "hasReward"; //奖励前三
        LadderRankingCell.HASPLAYERART = "hasRewardArt"; //奖励3外
        LadderRankingCell.NOREWARD = "noReward"; //无奖励
        LadderRankingCell.NOPLAYER = "noPlayer"; //无玩家
        return LadderRankingCell;
    }(ui.LadderRankingCellSkin));
    renderer.LadderRankingCell = LadderRankingCell;
    __reflect(LadderRankingCell.prototype, "renderer.LadderRankingCell");
})(renderer || (renderer = {}));

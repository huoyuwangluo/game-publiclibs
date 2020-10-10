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
    var KingBattlefieldRankCell = (function (_super) {
        __extends(KingBattlefieldRankCell, _super);
        function KingBattlefieldRankCell() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = false;
            return _this;
        }
        KingBattlefieldRankCell.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                if (this.data.type == 1) {
                    this.labLegionName.text = this.data.UnionName;
                    this.labName.text = this.data.LeaderName;
                }
                else {
                    this.labLegionName.text = this.data.PlayerName;
                    this.labName.text = this.data.UnionName;
                }
                this.labScore.text = this.data.Score;
                if (this.data.ranking <= 3) {
                    this.imgRanking.visible = true;
                    this.labRanking.visible = false;
                    this.imgRanking.source = ResPath.getRankingIconKey((this.data.Rank));
                }
                else {
                    this.imgRanking.visible = false;
                    this.labRanking.visible = true;
                    this.labRanking.text = this.data.Rank.toString();
                }
            }
            else {
                this.imgRanking.source = null;
            }
        };
        return KingBattlefieldRankCell;
    }(ui.KingBattlefieldRankCellSkin));
    renderer.KingBattlefieldRankCell = KingBattlefieldRankCell;
    __reflect(KingBattlefieldRankCell.prototype, "renderer.KingBattlefieldRankCell");
})(renderer || (renderer = {}));

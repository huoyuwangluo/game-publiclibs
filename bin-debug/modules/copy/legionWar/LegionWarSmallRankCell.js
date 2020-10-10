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
var legionWar;
(function (legionWar) {
    var LegionWarSmallRankCell = (function (_super) {
        __extends(LegionWarSmallRankCell, _super);
        function LegionWarSmallRankCell() {
            var _this = _super.call(this) || this;
            _this.labRank.text = "";
            _this.labName.text = "";
            _this.labScore.text = "";
            return _this;
        }
        LegionWarSmallRankCell.prototype.upData = function (data, type) {
            if (data) {
                this.visible = true;
                this.labRank.text = data.Rank;
                this.labScore.text = data.Score;
                if (type == 0) {
                    this.labName.text = data.PlayerName;
                }
                else {
                    this.labName.text = data.UnionName;
                }
            }
            else {
                this.visible = false;
                this.labRank.text = "";
                this.labName.text = "";
                this.labScore.text = "";
            }
        };
        return LegionWarSmallRankCell;
    }(ui.LegionWarSmallRankCellSkin));
    legionWar.LegionWarSmallRankCell = LegionWarSmallRankCell;
    __reflect(LegionWarSmallRankCell.prototype, "legionWar.LegionWarSmallRankCell");
})(legionWar || (legionWar = {}));

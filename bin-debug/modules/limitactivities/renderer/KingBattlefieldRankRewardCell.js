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
    var KingBattlefieldRankRewardCell = (function (_super) {
        __extends(KingBattlefieldRankRewardCell, _super);
        function KingBattlefieldRankRewardCell() {
            var _this = _super.call(this) || this;
            _this._rewardItems = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        KingBattlefieldRankRewardCell.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                if (this.data.type == 5) {
                    if (this.data.rankMin <= 3) {
                        this.imgRanking.visible = true;
                        this.labRanking.visible = false;
                        this.imgRanking.source = ResPath.getRankingIconKey((this.data.rankMin));
                    }
                    else {
                        this.imgRanking.visible = false;
                        this.labRanking.visible = true;
                        if (this.data.rankMax > this.data.rankMin) {
                            this.labRanking.text = this.data.rankMin.toString() + "-" + this.data.rankMax.toString();
                        }
                        else {
                            this.labRanking.text = this.data.rankMin.toString();
                        }
                    }
                }
                if (this.data.type == 12) {
                    if (this.data.rankMin <= 1) {
                        this.imgRanking.visible = true;
                        this.labRanking.visible = false;
                        this.imgRanking.source = ResPath.getRankingIconKey((this.data.rankMin));
                    }
                    else {
                        this.imgRanking.visible = false;
                        this.labRanking.visible = true;
                        if (this.data.rankMax > this.data.rankMin) {
                            this.labRanking.text = this.data.rankMin.toString() + "-" + this.data.rankMax.toString();
                        }
                        else {
                            this.labRanking.text = this.data.rankMin.toString();
                        }
                    }
                }
                var list = convert.parseItemsInfo(this.data.rewards);
                var count = 0;
                var i;
                for (i = 0; i < list.length; i++) {
                    this._rewardItems[i].dataSource = (list[i].id + "_" + list[i].count);
                    this._rewardItems[i].visible = true;
                    count++;
                }
                for (i = count; i < this._rewardItems.length; i++) {
                    this._rewardItems[i].visible = false;
                }
            }
            else {
                for (var _i = 0, _a = this._rewardItems; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.dataSource = null;
                }
            }
        };
        return KingBattlefieldRankRewardCell;
    }(ui.KingBattlefieldRankRewardCellSkin));
    renderer.KingBattlefieldRankRewardCell = KingBattlefieldRankRewardCell;
    __reflect(KingBattlefieldRankRewardCell.prototype, "renderer.KingBattlefieldRankRewardCell");
})(renderer || (renderer = {}));

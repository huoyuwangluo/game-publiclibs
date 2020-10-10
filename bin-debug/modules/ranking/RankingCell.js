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
    var RankingCell = (function (_super) {
        __extends(RankingCell, _super);
        function RankingCell() {
            return _super.call(this) || this;
        }
        RankingCell.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.labName.textColor = 0xFBDFA0;
            if (this.data instanceof n.ProtoUnionWarPersonalScore) {
                var personalS = this.data;
                this.imgVip.visible = false;
                this.labVipRanking.visible = false;
                this.labName.text = personalS.PlayerName;
                this.labTypeFight.text = Language.C_JF + ":" + personalS.Score;
                if (TypeUnionName.getUnionId(personalS.UnionName) != 0) {
                    this.imgPoint.visible = true;
                    this.imgPoint.source = "common_json.img_union_point" + TypeUnionName.getUnionId(personalS.UnionName) + "_png";
                }
                else {
                    this.imgPoint.visible = false;
                }
                if (personalS.Rank <= 3) {
                    this.imgRanking.visible = true;
                    this.labRanking.visible = false;
                    this.imgRanking.source = ResPath.getRankingIconKey((personalS.Rank));
                }
                else {
                    this.imgRanking.visible = false;
                    this.labRanking.visible = true;
                    this.labRanking.text = personalS.Rank.toString();
                }
            }
            else if (this.data instanceof n.ProtoPlayerCampBattleData) {
                var campDate = this.data;
                this.imgRanking.visible = false;
                this.labRanking.visible = false;
                this.imgVip.visible = false;
                this.labVipRanking.visible = false;
                if (campDate.VipLevel > 0) {
                    this.imgVip.visible = true;
                    this.labVipRanking.visible = true;
                    this.labVipRanking.text = campDate.VipLevel.toString();
                }
                this.labName.text = campDate.PlayerName;
                if (campDate.PlayerId == GameModels.user.player.uid) {
                    this.labName.textColor = TypeColor.GREEN;
                }
                this.labTypeFight.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_JSRS, campDate.WinCount));
                if (campDate.UnionId != 0) {
                    this.imgPoint.visible = true;
                    this.imgPoint.source = "common_json.img_union_point" + campDate.UnionId + "_png";
                }
                else {
                    this.imgPoint.visible = false;
                }
            }
            else {
                if (this.data) {
                    this._rankingData = this.data;
                    this.labName.text = this._rankingData.playerData.PlayerName;
                    if (this._rankingData.playerData.UnionId != 0) {
                        this.imgPoint.visible = true;
                        this.imgPoint.source = "common_json.img_union_point" + this._rankingData.playerData.UnionId + "_png";
                    }
                    else {
                        this.imgPoint.visible = false;
                    }
                    if (this._rankingData.playerData.Vip > 0) {
                        this.imgVip.visible = true;
                        this.imgVip.source = "common_json.img_vip_png";
                        if (this._rankingData.playerData.Vip > 10) {
                            this.labVipRanking.visible = false;
                            this.imgVip.source = "rankings_json.img_rang_vip" + this._rankingData.playerData.Vip;
                        }
                        else {
                            this.labVipRanking.visible = true;
                            this.labVipRanking.text = this._rankingData.playerData.Vip.toString();
                        }
                    }
                    else {
                        this.imgVip.visible = false;
                        this.labVipRanking.visible = false;
                    }
                    if (this._rankingData.type == Language.C_ZDJ) {
                        this.labTypeFight.text = this._rankingData.type + ":" + utils.htmlUtil.getGrade(this._rankingData.playerData.Score);
                    }
                    else if (this._rankingData.type == Language.C_JWDJ) {
                        //this.labTypeFight.text = this._rankingData.type + ":" + this.jueweiGrade(this._rankingData.playerData.Score);
                    }
                    else {
                        this.labTypeFight.text = this._rankingData.type + ":" + this._rankingData.playerData.Score;
                    }
                    if (this._rankingData.ranking <= 3) {
                        this.imgRanking.visible = true;
                        this.labRanking.visible = false;
                        this.imgRanking.source = ResPath.getRankingIconKey((this._rankingData.ranking));
                    }
                    else {
                        this.imgRanking.visible = false;
                        this.labRanking.visible = true;
                        this.labRanking.text = this._rankingData.ranking.toString();
                    }
                }
            }
        };
        return RankingCell;
    }(ui.RankingCellSkin));
    renderer.RankingCell = RankingCell;
    __reflect(RankingCell.prototype, "renderer.RankingCell");
})(renderer || (renderer = {}));

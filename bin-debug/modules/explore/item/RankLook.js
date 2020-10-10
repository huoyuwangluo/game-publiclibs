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
var item;
(function (item) {
    var RankLook = (function (_super) {
        __extends(RankLook, _super);
        function RankLook() {
            return _super.call(this) || this;
        }
        RankLook.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        RankLook.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        RankLook.prototype.updateData = function (data) {
            this._playerRankVo = null;
            if (data) {
                this._playerRankVo = data;
                this.labName.text = data.playerData.PlayerName;
                this.labCount.text = data.playerData.Score.toString();
                if (data.ranking <= 3) {
                    this.imgRanking.visible = true;
                    this.labNum.visible = false;
                    this.imgRanking.source = ResPath.getRankingIconKey((data.ranking));
                }
                else {
                    this.imgRanking.visible = false;
                    this.labNum.visible = true;
                    this.labNum.text = data.ranking.toString();
                }
            }
            else {
                this.labName.text = "";
                this.labCount.text = "";
                this.imgRanking.visible = false;
                this.labNum.visible = false;
            }
        };
        Object.defineProperty(RankLook.prototype, "playerRankVo", {
            get: function () {
                return this._playerRankVo;
            },
            enumerable: true,
            configurable: true
        });
        return RankLook;
    }(ui.RankLookSkin));
    item.RankLook = RankLook;
    __reflect(RankLook.prototype, "item.RankLook");
})(item || (item = {}));

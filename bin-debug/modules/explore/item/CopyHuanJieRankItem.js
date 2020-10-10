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
(function (item_1) {
    var CopyHuanJieRankItem = (function (_super) {
        __extends(CopyHuanJieRankItem, _super);
        function CopyHuanJieRankItem() {
            return _super.call(this) || this;
        }
        CopyHuanJieRankItem.prototype.dataChange = function () {
            if (this._dataSource) {
                var item = this._dataSource;
                this.rankName.text = item.playerData.PlayerName;
                var ceng = Math.ceil(item.playerData.Score / 10000);
                var time = (ceng * 10000) - item.playerData.Score;
                this.cell.text = ceng + Language.Z_CENG;
                this.labTimer.text = this.getTimeLeft2BySecond(time);
                this.title.source = "sgActivity_json.img_sg_jingjipaihang_" + item.ranking;
            }
            else {
                this.title.source = null;
                this.rankName.text = "";
                this.cell.text = "";
                this.labTimer.text = "";
            }
        };
        CopyHuanJieRankItem.prototype.getTimeLeft2BySecond = function (s) {
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
        return CopyHuanJieRankItem;
    }(ui.CopyHuanJieRankItemSkin));
    item_1.CopyHuanJieRankItem = CopyHuanJieRankItem;
    __reflect(CopyHuanJieRankItem.prototype, "item.CopyHuanJieRankItem");
})(item || (item = {}));

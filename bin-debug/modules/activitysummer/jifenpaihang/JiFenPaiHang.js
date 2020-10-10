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
var view;
(function (view) {
    var activity;
    (function (activity) {
        var JiFenPaiHang = (function (_super) {
            __extends(JiFenPaiHang, _super);
            function JiFenPaiHang() {
                return _super.call(this) || this;
            }
            JiFenPaiHang.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            JiFenPaiHang.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.JFPH);
                if (temp) {
                    this.labDesc.text = temp.des;
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                    if (GameModels.activitySummer.summerActivityOneResourceType > 0) {
                        this.imgTitle.source = "img_summer_jifenrank_" + GameModels.activitySummer.summerActivityOneResourceType + "_jpg";
                    }
                }
                GameModels.ranking.requestRanking(4000 + game.TypeSummerActivity.JFPH, utils.Handler.create(this, function (data) {
                    _this.listReward.dataProvider = new eui.ArrayCollection(GameModels.ranking.laterPlayerData);
                    _this.labMyJifen.text = "" + data.Score;
                    _this.labMyRank.text = "" + data.Ranking;
                }));
            };
            JiFenPaiHang.prototype.exit = function () {
                this.clearList(this.listReward);
            };
            return JiFenPaiHang;
        }(ui.JiFenPaiHangSkin));
        activity.JiFenPaiHang = JiFenPaiHang;
        __reflect(JiFenPaiHang.prototype, "view.activity.JiFenPaiHang", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

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
        var XiaoFeiPaiHang = (function (_super) {
            __extends(XiaoFeiPaiHang, _super);
            function XiaoFeiPaiHang() {
                return _super.call(this) || this;
            }
            XiaoFeiPaiHang.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.touchEnabled = false;
            };
            XiaoFeiPaiHang.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                this.imgfinsh.visible = false;
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.XHPH);
                if (temp) {
                    if (GameModels.activitySummer.getSummerActivityListTiem(temp.id) <= 0) {
                        this.imgfinsh.visible = true;
                        this.labDate.text = Language.C_YJS;
                    }
                    else {
                        this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                    }
                    this.labDesc.text = temp.des;
                    if (GameModels.activitySummer.summerActivityOneResourceType > 0) {
                        this.imgTitle.source = "img_summer_xiaofeipaihang" + GameModels.activitySummer.summerActivityOneResourceType + "_" + temp.typeTable + "_jpg";
                    }
                    this.addEff("2109");
                }
                GameModels.ranking.requestRanking(4000 + game.TypeSummerActivity.XHPH, utils.Handler.create(this, function (data) {
                    _this.updateDisplay();
                }));
            };
            XiaoFeiPaiHang.prototype.exit = function () {
                if (this._efct) {
                    this.removeEffectHandler(this._efct);
                    this._efct = null;
                }
                this.clearList(this.list);
            };
            XiaoFeiPaiHang.prototype.addEff = function (resid) {
                this._efct = utils.ObjectPool.from(s.AnimationSprite, true);
                this._efct.x = 170;
                this._efct.y = 250;
                this._efct.frameRate = 6;
                this._efct.scale(0.6);
                // this._efct.skewY = 180;
                this.addChild(this._efct);
                this._efct.touchEnabled = false;
                this._efct.touchChildren = false;
                this._efct.resId = resid;
                this._efct.play();
                this.addChildAt(this.img5s, this.getChildIndex(this._efct) + 1);
            };
            XiaoFeiPaiHang.prototype.updateDisplay = function () {
                var data = [];
                for (var i = 0; i < 10; i++) {
                    if (GameModels.ranking.laterPlayerData[i]) {
                        data[i] = { rank: GameModels.ranking.laterPlayerData[i].ranking, data: GameModels.ranking.laterPlayerData[i] };
                    }
                    else {
                        data[i] = { rank: i + 1, data: "1111" };
                    }
                }
                this.list.dataProvider = new eui.ArrayCollection(data);
                if (GameModels.ranking.myRank) {
                    this.labMyRank.text = "" + GameModels.ranking.myRank;
                    this.labMyMoShi.text = "" + GameModels.ranking.myScore;
                }
                else {
                    var cmd = n.MessagePool.from(n.C2G_HolidayConsumeRank_GetInfo);
                    n.net.request(n.MessageMap.C2G_HOLIDAYCONSUMERANK_GETINFO, cmd, utils.Handler.create(this, this.myMoshiCount));
                }
            };
            XiaoFeiPaiHang.prototype.myMoshiCount = function (data) {
                this.labMyRank.text = "" + Language.C_WSB;
                this.labMyMoShi.text = "" + data.ConsumeTotal;
            };
            return XiaoFeiPaiHang;
        }(ui.XiaoFeiPaiHangSkin));
        activity.XiaoFeiPaiHang = XiaoFeiPaiHang;
        __reflect(XiaoFeiPaiHang.prototype, "view.activity.XiaoFeiPaiHang", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

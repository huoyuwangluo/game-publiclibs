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
        var HeFuXiaoFeiPaiHang = (function (_super) {
            __extends(HeFuXiaoFeiPaiHang, _super);
            // protected _effect: s.AnimationSprite;
            function HeFuXiaoFeiPaiHang() {
                return _super.call(this) || this;
            }
            HeFuXiaoFeiPaiHang.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            HeFuXiaoFeiPaiHang.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                var temp = GameModels.activityHeFu.getActivityHeFuListTemplates(game.TypeHeFuActivity.HEFU_XIAOHAO_PAIHANG);
                if (temp) {
                    this.imgTitle.source = "img_hefu_xiaofei_" + temp.typeTable + "_jpg";
                    this.labDesc.text = temp.des;
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activityHeFu.getHeFuActivityListTiem(temp.id) * 1000), false);
                }
                // if (!this._effect) {
                // 	this._effect = utils.ObjectPool.from(s.AnimationSprite) as s.AnimationSprite;
                // 	this._effect.touchEnabled = false;
                // 	this._effect.touchChildren = false;
                // 	this.addChild(this._effect);
                // }
                // this._effect.resId = "6356";
                // this._effect.x = 150;
                // this._effect.y = 140;
                // this._effect.play();
                GameModels.activityHeFu.requestHeFuRankList(game.TypeHeFuActivity.HEFU_XIAOHAO_PAIHANG, utils.Handler.create(this, function () {
                    _this.updateDisplay();
                }));
            };
            HeFuXiaoFeiPaiHang.prototype.exit = function () {
                this.clearList(this.list);
                // if (this._effect) {
                // 	this._effect.stop();
                // 	if (this._effect.parent) {
                // 		this._effect.parent.removeChild(this._effect);
                // 	}
                // 	this._effect.reset();
                // 	utils.ObjectPool.to(this._effect, true);
                // 	this._effect = null;
                // }
            };
            HeFuXiaoFeiPaiHang.prototype.updateDisplay = function () {
                var protoHeFuRankData = GameModels.activityHeFu.protoHeFuRankData();
                if (protoHeFuRankData.length == 0) {
                    var data1 = [];
                    data1[0] = "1111";
                    data1[1] = "1111";
                    data1[2] = "1111";
                    this.list.dataProvider = new eui.ArrayCollection(data1);
                }
                else if (protoHeFuRankData.length == 2) {
                    var data1 = [];
                    data1[0] = protoHeFuRankData[0];
                    data1[1] = protoHeFuRankData[1];
                    data1[2] = "1111";
                    this.list.dataProvider = new eui.ArrayCollection(data1);
                }
                else if (protoHeFuRankData.length == 1) {
                    var data1 = [];
                    data1[0] = protoHeFuRankData[0];
                    data1[1] = "1111";
                    data1[2] = "1111";
                    this.list.dataProvider = new eui.ArrayCollection(data1);
                }
                else {
                    var data1 = [];
                    data1[0] = protoHeFuRankData[0];
                    data1[1] = protoHeFuRankData[1];
                    data1[2] = protoHeFuRankData[2];
                    this.list.dataProvider = new eui.ArrayCollection(data1);
                }
                var myRank = 0;
                for (var i = 0; i < protoHeFuRankData.length; i++) {
                    if (protoHeFuRankData[i].PlayerId == GameModels.user.player.uid) {
                        myRank = (i + 1);
                        break;
                    }
                }
                if (myRank > 0) {
                    this.labMyRank.text = "" + myRank;
                }
                else {
                    this.labMyRank.text = "" + Language.C_WSB;
                }
                this.labMyMoShi.text = "" + GameModels.activityHeFu.myScore();
            };
            return HeFuXiaoFeiPaiHang;
        }(ui.HeFuXiaoFeiPaiHangSkin));
        activity.HeFuXiaoFeiPaiHang = HeFuXiaoFeiPaiHang;
        __reflect(HeFuXiaoFeiPaiHang.prototype, "view.activity.HeFuXiaoFeiPaiHang", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

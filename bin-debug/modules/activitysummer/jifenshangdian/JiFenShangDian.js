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
        var JiFenShangDian = (function (_super) {
            __extends(JiFenShangDian, _super);
            function JiFenShangDian() {
                return _super.call(this) || this;
            }
            JiFenShangDian.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            JiFenShangDian.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.JFSC);
                if (temp) {
                    this.labTime.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_JIFEN_SHOP_CHANGE, this.updataList, this);
                GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_MY_JIFEN_CHANGE, this.updataJifen, this);
                GameModels.activitySummer.requestShopData(game.TypeSummerActivity.JFSC, utils.Handler.create(this, function () {
                    if (!_this._listData) {
                        _this._listData = new eui.ArrayCollection(GameModels.activitySummer.shopData);
                    }
                    else {
                        _this._listData.source = GameModels.activitySummer.shopData;
                    }
                    _this.listReward.dataProvider = _this._listData;
                }));
                if (GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.HHZP)) {
                    this.labJifenget.visible = true;
                }
                else {
                    this.labJifenget.visible = false;
                }
                this.labJifenget.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_HDJF);
                this.labJifenget.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenClick, this);
                this.updataJifen();
            };
            JiFenShangDian.prototype.exit = function () {
                this.clearList(this.listReward);
                GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.ACTIVITY_JIFEN_SHOP_CHANGE, this.updataList, this);
                GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.ACTIVITY_MY_JIFEN_CHANGE, this.updataJifen, this);
                this.labJifenget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenClick, this);
            };
            JiFenShangDian.prototype.onJifenClick = function (e) {
                GameModels.activitySummer.dispatchEventWith(mo.ModelSgActivitySummer.ACTIVITY_HAOHUAZUANGPAN_LINK);
            };
            JiFenShangDian.prototype.updataList = function (e) {
                this._listData.itemUpdated(e.data);
            };
            JiFenShangDian.prototype.updataJifen = function () {
                this.labJifen.text = "" + GameModels.activitySummer.myJifen;
            };
            return JiFenShangDian;
        }(ui.JiFenShangDianSkin));
        activity.JiFenShangDian = JiFenShangDian;
        __reflect(JiFenShangDian.prototype, "view.activity.JiFenShangDian", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

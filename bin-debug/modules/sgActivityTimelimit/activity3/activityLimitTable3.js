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
        var activityLimitTable3 = (function (_super) {
            __extends(activityLimitTable3, _super);
            function activityLimitTable3() {
                return _super.call(this) || this;
            }
            activityLimitTable3.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            activityLimitTable3.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act4);
                this.labTime.text = utils.DateUtil.formatDateInChinese(new Date(vo.endTime * 1000), false);
                if (vo.actCfgId == 85101) {
                    //兑换武将
                    this.imgBg.source = "img_limit_851_1_jpg";
                    this.imgTitle.source = "img_limit_851_title1_png";
                }
                else if (vo.actCfgId == 85102) {
                    //兑换武将
                    this.imgBg.source = "img_limit_851_1_jpg";
                    this.imgTitle.source = "img_limit_851_title1_png";
                }
                else if (vo.actCfgId == 85103) {
                    //兑换宠物
                    this.imgBg.source = "img_limit_851_2_jpg";
                    this.imgTitle.source = "img_limit_851_title2_png";
                }
                else {
                    //兑换神兵
                    this.imgBg.source = "img_limit_851_3_jpg";
                    this.imgTitle.source = "img_limit_851_title3_png";
                }
                GameModels.sgActivity.requestDuiHuanInfo(game.sgActivityType.act4, utils.Handler.create(this, function () {
                    var voList = GameModels.sgActivity.duihuanArr;
                    if (voList) {
                        if (!_this._listData) {
                            _this._listData = new eui.ArrayCollection(voList);
                        }
                        else {
                            _this._listData.source = voList;
                        }
                    }
                    else {
                        if (!_this._listData) {
                            _this._listData = new eui.ArrayCollection([]);
                        }
                        else {
                            _this._listData.source = [];
                        }
                    }
                    _this.list.dataProvider = _this._listData;
                }));
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_DUIHUAN_CHOOSE, this.updataList, this);
            };
            activityLimitTable3.prototype.exit = function () {
                GameModels.sgActivity.clearSelecdItem();
                this.clearList(this.list);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_DUIHUAN_CHOOSE, this.updataList, this);
            };
            activityLimitTable3.prototype.onBuyClick = function (e) {
                var item = this.list.selectedItem;
                if (e.target instanceof components.SnapButton) {
                    if (!item.selecdID) {
                        mg.alertManager.tip(Language.J_QXDHDCL);
                        return;
                    }
                    GameModels.sgActivity.requestDuiHuan(game.sgActivityType.act4, item.key, item.selecdID, utils.Handler.create(this, this.getRewardCallback, [item.templactExchange.itemId]));
                }
            };
            activityLimitTable3.prototype.updataList = function () {
                var voList = GameModels.sgActivity.duihuanArr;
                if (this._listData)
                    this._listData.replaceAll(voList);
            };
            activityLimitTable3.prototype.getRewardCallback = function (str) {
                //this.updataList();
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            return activityLimitTable3;
        }(ui.activityLimitTable3Skin));
        activity.activityLimitTable3 = activityLimitTable3;
        __reflect(activityLimitTable3.prototype, "view.activity.activityLimitTable3", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

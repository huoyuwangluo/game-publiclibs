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
        var activityLimitTable1 = (function (_super) {
            __extends(activityLimitTable1, _super);
            function activityLimitTable1(type) {
                if (type === void 0) { type = 0; }
                var _this = _super.call(this) || this;
                _this._type = type;
                return _this;
            }
            activityLimitTable1.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            activityLimitTable1.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                var vo = GameModels.sgActivity.getSgActivityListVOByType(this._type);
                if (this._type == game.sgActivityType.act2) {
                    this.imgTitle.visible = false;
                    this.imgTitle1.visible = false;
                    this.imgBg.source = "img_limit_802_jpg";
                }
                else {
                    if (this._type == game.sgActivityType.act1) {
                        this.imgTitle.visible = true;
                        this.imgTitle1.visible = false;
                        if (vo.actCfgId == 80101) {
                            this.imgBg.source = "img_limit_801_2_jpg";
                            this.imgTitle.source = "img_limit_801_title3_png";
                        }
                        else if (vo.actCfgId == 80102) {
                            this.imgBg.source = "img_limit_801_2_jpg";
                            this.imgTitle.source = "img_limit_801_title4_png";
                        }
                        else if (vo.actCfgId == 80103) {
                            this.imgBg.source = "img_limit_801_1_jpg";
                            this.imgTitle.source = "img_limit_801_title1_png";
                        }
                        else {
                            this.imgBg.source = "img_limit_801_1_jpg";
                            this.imgTitle.source = "img_limit_801_title2_png";
                        }
                    }
                    else {
                        this.imgTitle.visible = false;
                        this.imgTitle1.visible = true;
                        this.imgBg.source = "img_limit_805_jpg";
                        if (vo.actCfgId == 80501) {
                            this.imgTitle1.source = "img_limit_805_title2_png";
                        }
                        else if (vo.actCfgId == 80502) {
                            this.imgTitle1.source = "img_limit_805_title4_png";
                        }
                        else if (vo.actCfgId == 80503) {
                            this.imgTitle1.source = "img_limit_805_title3_png";
                        }
                        else {
                            this.imgTitle1.source = "img_limit_805_title1_png";
                        }
                    }
                }
                this.labTime.text = utils.DateUtil.formatDateInChinese(new Date(vo.endTime * 1000), false);
                var voList = vo.actTaskListVO;
                if (voList) {
                    if (!this._listData) {
                        this._listData = new eui.ArrayCollection(voList);
                    }
                    else {
                        this._listData.source = voList;
                    }
                }
                else {
                    if (!this._listData) {
                        this._listData = new eui.ArrayCollection([]);
                    }
                    else {
                        this._listData.source = [];
                    }
                }
                this.list.dataProvider = this._listData;
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            activityLimitTable1.prototype.exit = function () {
                this.clearList(this.list);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            activityLimitTable1.prototype.onBuyClick = function (e) {
                var item = this.list.selectedItem;
                var vo = GameModels.sgActivity.getSgActivityListVOByType(this._type);
                if (e.target instanceof components.SnapButton) {
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    if (item.status == 1) {
                        GameModels.sgActivity.requestSGGetActivityReward(vo.actCfgId, item.taskCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [item.templateReward]));
                    }
                    else if (item.status == 0) {
                        mg.uiManager.remove(s.UserfaceName.activityLimit);
                        mg.uiManager.showByName(item.templateFunId);
                    }
                }
            };
            activityLimitTable1.prototype.getRewardCallback = function (str) {
                var vo = GameModels.sgActivity.getSgActivityListVOByType(this._type);
                var voList = vo.actTaskListVO;
                if (this._listData)
                    this._listData.replaceAll(voList);
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            return activityLimitTable1;
        }(ui.activityLimitTable1Skin));
        activity.activityLimitTable1 = activityLimitTable1;
        __reflect(activityLimitTable1.prototype, "view.activity.activityLimitTable1", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

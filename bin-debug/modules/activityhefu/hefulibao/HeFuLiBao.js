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
        var HeFuLiBao = (function (_super) {
            __extends(HeFuLiBao, _super);
            function HeFuLiBao() {
                return _super.call(this) || this;
            }
            HeFuLiBao.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._rwards = [this.reward0, this.reward1, this.reward2, this.reward3];
            };
            HeFuLiBao.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                this._id = 0;
                this._data = [];
                this.btnBuy.visible = false;
                this.getVipBox.visible = false;
                this.notAttain.visible = false;
                var temp = GameModels.activityHeFu.getActivityHeFuListTemplates(game.TypeHeFuActivity.HEFU_LIBAO);
                if (temp) {
                    this._id = temp.id;
                    GameModels.activityHeFu.requestRewardInfosData(this._id, utils.Handler.create(this, function () {
                        for (var i = 0; i < GameModels.activityHeFu.rewardInfos.length; i++) {
                            _this._data.push(GameModels.activityHeFu.rewardInfos[i]);
                        }
                        if (_this._data) {
                            _this.listTab.selectedIndex = 0;
                            _this._data.sort(function (a, b) {
                                return a.hefuRewardId - b.hefuRewardId;
                            });
                            for (var i = 0; i < _this._data.length; i++) {
                                if (_this._data[i].hefuRewardState == 1) {
                                    _this.listTab.selectedIndex = i;
                                    break;
                                }
                            }
                            _this.showView(_this.listTab.selectedIndex);
                        }
                    }));
                }
                this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyOnClick, this);
                this.listTab.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
            };
            HeFuLiBao.prototype.exit = function () {
                this._data = null;
                for (var _i = 0, _a = this._rwards; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    reward.dataSource = null;
                }
                this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyOnClick, this);
                this.listTab.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
            };
            HeFuLiBao.prototype.showView = function (index) {
                var data = this._data[index];
                if (data && (data.template instanceof templates.mergeBuy)) {
                    var rewards = data.template.rewards.split(";");
                    for (var i = 0; i < rewards.length; i++) {
                        var iconBox = this._rwards[i];
                        iconBox.labName.stroke = 1;
                        iconBox.dataSource = rewards[i];
                    }
                    this.img1.source = "image_hefu_vip_" + data.template.iconOne + "_png";
                    this.img2.source = "image_hefu_name_" + data.template.iconOne + "_png";
                    this.img3.source = "image_hefu_show_" + data.template.iconTwo + "_png";
                    if (data.hefuRewardState == 1) {
                        this.btnBuy.visible = true;
                        this.btnBuy.label = "" + data.template.consume.split("_")[1];
                        this.getVipBox.visible = false;
                        this.notAttain.visible = false;
                    }
                    if (data.hefuRewardState == 2) {
                        this.btnBuy.visible = false;
                        this.getVipBox.visible = false;
                        this.notAttain.visible = true;
                    }
                    if (data.hefuRewardState == 3) {
                        this.btnBuy.visible = false;
                        this.getVipBox.visible = true;
                        this.notAttain.visible = false;
                    }
                }
            };
            HeFuLiBao.prototype.onItemTouch = function (e) {
                this.onSelected(e.itemIndex);
            };
            HeFuLiBao.prototype.onSelected = function (index) {
                this.listTab.selectedIndex = index;
                this.showView(index);
            };
            HeFuLiBao.prototype.buyOnClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                var item = this._data[this.listTab.selectedIndex];
                // logger.log(item.hefuRewardId);
                if (item.hefuRewardState == 1) {
                    GameModels.activityHeFu.requestGetRewardInfos(this._id, item.hefuRewardId, utils.Handler.create(this, this.getRewardCallback, [item.template.rewards]));
                }
            };
            HeFuLiBao.prototype.getRewardCallback = function (str) {
                this.showView(this.listTab.selectedIndex);
                var rewardArr = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
            };
            return HeFuLiBao;
        }(ui.HeFuLiBaoSkin));
        activity.HeFuLiBao = HeFuLiBao;
        __reflect(HeFuLiBao.prototype, "view.activity.HeFuLiBao", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

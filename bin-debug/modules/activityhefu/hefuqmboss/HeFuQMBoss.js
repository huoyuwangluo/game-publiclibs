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
        var HeFuQMBoss = (function (_super) {
            __extends(HeFuQMBoss, _super);
            function HeFuQMBoss() {
                return _super.call(this) || this;
            }
            HeFuQMBoss.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            HeFuQMBoss.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                this.getVipBox.visible = false;
                this.notAttain.visible = false;
                this.btnGet.visible = false;
                this.labTiaojian.text = "";
                this.btnJIfen.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_QWJS);
                this._id = 0;
                var temp = GameModels.activityHeFu.getActivityHeFuListTemplates(game.TypeHeFuActivity.HEFU_QM_BOSS);
                if (temp) {
                    this._id = temp.id;
                    this.labDesc.text = temp.des;
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activityHeFu.getHeFuActivityListTiem(temp.id) * 1000), false);
                    GameModels.activityHeFu.requestRewardInfosData(this._id, utils.Handler.create(this, function () {
                        var data = GameModels.activityHeFu.rewardInfos;
                        data.sort(function (a, b) {
                            return a.hefuRewardId - b.hefuRewardId;
                        });
                        if (!_this._listData) {
                            _this._listData = new eui.ArrayCollection(data);
                        }
                        else {
                            _this._listData.source = data;
                        }
                        _this.listReward.dataProvider = _this._listData;
                        _this.listReward.selectedIndex = 0;
                        if (GameModels.activityHeFu.isCanLingqu) {
                            _this.listReward.selectedIndex = GameModels.activityHeFu.canLingquIndex;
                        }
                        else {
                            _this.listReward.selectedIndex = GameModels.activityHeFu.noCanLingquIndex;
                        }
                        _this._vo = _this.listReward.selectedItem;
                        _this.showJiangLi();
                        _this.labJiFen.text = "" + GameModels.activityHeFu.currActivityTotal;
                    }));
                }
                this.btnJIfen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenClick, this);
                this.listReward.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnBoxClick, this);
                this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            HeFuQMBoss.prototype.exit = function () {
                this.clearList(this.listReward);
                this.btnJIfen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenClick, this);
                this.btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.listReward.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnBoxClick, this);
            };
            HeFuQMBoss.prototype.onJifenClick = function (e) {
                mg.uiManager.show(dialog.explore.CopyFightBossDialog, { tabIndex: 1 });
            };
            HeFuQMBoss.prototype.btnBoxClick = function (e) {
                this.listReward.selectedIndex = e.itemIndex;
                var item = this.listReward.selectedItem;
                this._vo = item;
                this.showJiangLi();
            };
            HeFuQMBoss.prototype.showJiangLi = function () {
                this.boxGroup.removeChildren();
                this.getVipBox.visible = false;
                this.notAttain.visible = false;
                this.btnGet.visible = false;
                if (this._vo && this._vo.template instanceof templates.mergeReward) {
                    this.labTiaojian.textFlow = (new egret.HtmlTextParser).parser(Language.getExpression(Language.E_JFDD1KLQ, this._vo.template.value));
                }
                var str = this._vo.template.rewards.split(";");
                for (var i = 0; i < str.length; i++) {
                    var iconBox = new components.RewardItemBox();
                    iconBox.labName.stroke = 1;
                    iconBox.dataSource = str[i];
                    this.boxGroup.addChild(iconBox);
                }
                if (this._vo.hefuRewardState == 1) {
                    this.btnGet.visible = true;
                }
                else if (this._vo.hefuRewardState == 2) {
                    this.notAttain.visible = true;
                }
                else {
                    this.getVipBox.visible = true;
                }
            };
            HeFuQMBoss.prototype.onBuyClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (this._vo) {
                    //logger.log(this._vo.hefuRewardId);
                    if (this._vo.hefuRewardState == 1) {
                        GameModels.activityHeFu.requestGetRewardInfos(this._id, this._vo.hefuRewardId, utils.Handler.create(this, this.getRewardCallback, [this._vo.template.rewards]));
                    }
                }
            };
            HeFuQMBoss.prototype.getRewardCallback = function (str) {
                var data = GameModels.activityHeFu.rewardInfos;
                data.sort(function (a, b) {
                    return a.hefuRewardId - b.hefuRewardId;
                });
                this.listReward.dataProvider.replaceAll(data);
                this.notAttain.visible = false;
                this.btnGet.visible = false;
                this.getVipBox.visible = true;
                var rewardArr = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
            };
            return HeFuQMBoss;
        }(ui.HeFuQMBossSkin));
        activity.HeFuQMBoss = HeFuQMBoss;
        __reflect(HeFuQMBoss.prototype, "view.activity.HeFuQMBoss", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

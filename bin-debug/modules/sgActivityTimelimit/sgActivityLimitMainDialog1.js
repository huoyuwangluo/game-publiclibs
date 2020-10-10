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
var dialog;
(function (dialog) {
    var activityLimit;
    (function (activityLimit) {
        var sgActivityLimitMainDialog1 = (function (_super) {
            __extends(sgActivityLimitMainDialog1, _super);
            function sgActivityLimitMainDialog1() {
                return _super.call(this) || this;
            }
            sgActivityLimitMainDialog1.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            sgActivityLimitMainDialog1.prototype.enter = function (data) {
                var _this = this;
                this.imgBg.visible = false;
                GameModels.sgActivity.requestSGRunningActivitys(utils.Handler.create(this, function () {
                    _this.imgBg.visible = true;
                    var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act5);
                    if (vo.actCfgId == 81101) {
                        //武将
                        _this.imgBg.source = "img_limit_811_2_jpg";
                    }
                    else if (vo.actCfgId == 81102) {
                        //武将
                        _this.imgBg.source = "img_limit_811_2_jpg";
                    }
                    else if (vo.actCfgId == 81103) {
                        //宠物
                        _this.imgBg.source = "img_limit_811_1_jpg";
                    }
                    else {
                        //神兵
                        _this.imgBg.source = "img_limit_811_3_jpg";
                    }
                    _this.labTime.text = utils.DateUtil.formatDateInChinese(new Date(vo.endTime * 1000), false);
                    var voList = vo.actTaskListVO;
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
            };
            sgActivityLimitMainDialog1.prototype.exit = function () {
                this.clearList(this.list);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            sgActivityLimitMainDialog1.prototype.onBuyClick = function (e) {
                var item = this.list.selectedItem;
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act5);
                if (e.target instanceof components.SnapButton) {
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    if (item.status == 1) {
                        GameModels.sgActivity.requestSGGetActivityReward(vo.actCfgId, item.taskCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [item.templateReward]));
                    }
                    else if (item.status == 0) {
                        mg.uiManager.remove(this);
                        mg.uiManager.showByName(item.templateFunId);
                    }
                }
            };
            sgActivityLimitMainDialog1.prototype.getRewardCallback = function (str) {
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act5);
                var voList = vo.actTaskListVO;
                if (this._listData)
                    this._listData.replaceAll(voList);
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            return sgActivityLimitMainDialog1;
        }(ui.sgActivityLimitMainDialog1Skin));
        activityLimit.sgActivityLimitMainDialog1 = sgActivityLimitMainDialog1;
        __reflect(sgActivityLimitMainDialog1.prototype, "dialog.activityLimit.sgActivityLimitMainDialog1");
    })(activityLimit = dialog.activityLimit || (dialog.activityLimit = {}));
})(dialog || (dialog = {}));

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
    var imperialEdict;
    (function (imperialEdict) {
        var ImperialEdict = (function (_super) {
            __extends(ImperialEdict, _super);
            function ImperialEdict() {
                return _super.call(this) || this;
            }
            ImperialEdict.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.list.dataProvider = this._listCollection = new eui.ArrayCollection([]);
                this._shengZhiArr = [];
            };
            ImperialEdict.prototype.enter = function () {
                var _this = this;
                this.btnTeQuan.visible = GameModels.platform.isPay;
                if (GameModels.guide.guideType == mo.ModelGuide.guideType10) {
                    mg.StoryManager.instance.startBigStory(128, this, null);
                }
                if (this.scroller.verticalScrollBar) {
                    this.scroller.verticalScrollBar.autoVisibility = false;
                    this.scroller.verticalScrollBar.visible = false;
                }
                this.activityGroup.visible = false;
                GameModels.shengzhi.requestShengZhiInfo(utils.Handler.create(this, function () {
                    _this.showView();
                }));
                this.tequanGroup.visible = false;
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                this.btnRefresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                GameModels.bag.onItemChange(ConfigData.SHENGZHI, this, this.refreshItemCount);
                this.itemIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnTeQuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeQuanClick, this);
                this.labGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoTeQuanView, this);
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideTeQuanTips, this);
                GameModels.vip.addEventListener(mo.ModelVip.VIPTEQUAN_CHANGE, this.refreshTeQuanState, this);
            };
            ImperialEdict.prototype.showView = function () {
                this.btnTeQuan.filters = GameModels.vip.getRewardBuyType(7) ? null : utils.filterUtil.grayFilters;
                this.labAct.text = GameModels.vip.getRewardBuyType(7) ? Language.C_YJH : Language.C_WJH;
                this.labAct.textColor = GameModels.vip.getRewardBuyType(7) ? TypeColor.GREEN1 : TypeColor.RED1;
                this.labGo.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_QW);
                this.btnRefresh.isWarn = false;
                this.moneyGroup.visible = false;
                this.btnRefresh.label = Language.C_SX;
                this._shengZhiArr = GameModels.shengzhi.shengZhiVo;
                this._listCollection.source = this._shengZhiArr;
                var item = Templates.getTemplateById(templates.Map.ITEM, "701");
                this.imgDaoJu.source = item.icon;
                this.labProValue.text = GameModels.user.player.liangcao + "/" + 24000;
                this.expProgress.noTweenValue = GameModels.user.player.liangcao / 24000;
                var item1 = Templates.getTemplateById(templates.Map.ITEM, ConfigData.SHENGZHI);
                this.imgDaoJu0.source = item1.icon;
                this.labCount.text = GameModels.bag.getItemCountById(ConfigData.SHENGZHI).toString();
                this.labCount0.text = GameModels.shengzhi.leftRefreshCount.toString();
                this.btnRefresh.isWarn = GameModels.shengzhi.leftRefreshCount > 0 && this.hashCanReceiveTask();
                if (GameModels.shengzhi.leftRefreshCount > 0) {
                    this.btnRefresh.label = Language.C_MFSX;
                }
                else {
                    if (GameModels.bag.getItemCountById(ConfigData.SHENGZHI) > 0) {
                        this.btnRefresh.label = Language.E_SZSX;
                    }
                    else {
                        this.moneyGroup.visible = true;
                        this.labCount1.text = "20";
                        var animal = GameModels.animal.getAnimalBuyType(18);
                        if (animal.isAct && animal.step >= 3) {
                            this.labCount1.text = "10";
                        }
                    }
                }
                // this.activityGroup.visible = false;
                // if (GameModels.activitySummer.isOpenActivitySummerList(game.sgActivitysummerType.szkh)) {
                // 	this.activityGroup.visible = true;
                // 	this.labDate.text = Language.C_YJS;
                // 	var temp: templates.holidaySeting = GameModels.activitySummer.getActivitySummerListTemplates(game.sgActivitysummerType.szkh)
                // 	if (temp) {
                // 		this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                // 	}
                // }
                this.updataChange();
            };
            ImperialEdict.prototype.hashCanReceiveTask = function () {
                if (this._shengZhiArr.length <= 0)
                    return true;
                for (var _i = 0, _a = this._shengZhiArr; _i < _a.length; _i++) {
                    var task = _a[_i];
                    if (task.status == 1) {
                        return false;
                    }
                }
                return true;
            };
            ImperialEdict.prototype.refreshItemCount = function () {
                this.labCount.text = GameModels.bag.getItemCountById(ConfigData.SHENGZHI).toString();
                this.labProValue.text = GameModels.user.player.liangcao + "/" + 24000;
                this.expProgress.noTweenValue = GameModels.user.player.liangcao / 24000;
                this.btnRefresh.isWarn = GameModels.shengzhi.leftRefreshCount > 0 && this.hashCanReceiveTask();
            };
            ImperialEdict.prototype.refreshTeQuanState = function () {
                this.btnTeQuan.filters = GameModels.vip.getRewardBuyType(7) ? null : utils.filterUtil.grayFilters;
                this.labAct.text = GameModels.vip.getRewardBuyType(7) ? Language.C_YJH : Language.C_WJH;
                this.labAct.textColor = GameModels.vip.getRewardBuyType(7) ? TypeColor.GREEN1 : TypeColor.RED1;
                this.labGo.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_QW);
            };
            ImperialEdict.prototype.onBtnClick = function (e) {
                if (e.currentTarget == this.btnRefresh) {
                    if (GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_1) <= 0) {
                        mg.guideManager.guideStopImmediately(this.btnRefresh);
                        GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_1);
                    }
                    var isHas = false;
                    for (var i = 0; i < this._shengZhiArr.length; i++) {
                        if (this._shengZhiArr[i].shengZhiTemp.quality >= 5 && this._shengZhiArr[i].status == 1) {
                            isHas = true;
                            break;
                        }
                    }
                    if (isHas) {
                        mg.alertManager.showCheckAlert(Language.J_YWWCDCSRW, TypeBtnLabel.OK, TypeCheck.SHENGZHI_REFRESH, null, utils.Handler.create(this, this.refreshShengZhi));
                        //mg.alertManager.showAlert(PromptAlert, false, true, Language.J_YWWCDCSRW, TypeBtnLabel.OK, null, utils.Handler.create(this, this.refreshShengZhi));
                    }
                    else {
                        if (GameModels.shengzhi.leftRefreshCount > 0 || GameModels.bag.getItemCountById(ConfigData.SHENGZHI) > 0) {
                            this.refreshShengZhi();
                        }
                        else {
                            var count = 20;
                            var animal = GameModels.animal.getAnimalBuyType(18);
                            if (animal.isAct && animal.step >= 3) {
                                count = 10;
                            }
                            mg.alertManager.showCheckAlert(Language.getExpression(Language.E_SXSZRW, count), TypeBtnLabel.OK, TypeCheck.SHENGZHI_MONEYREFRESH, null, utils.Handler.create(this, this.refreshShengZhi));
                        }
                    }
                }
                else if (e.currentTarget == this.itemIcon) {
                    mg.alertManager.showAlert(PropOfSourceAlert, true, true, 701);
                }
            };
            ImperialEdict.prototype.refreshShengZhi = function () {
                var _this = this;
                GameModels.shengzhi.requestRefreshShengZhiTask(utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.C_SXCG);
                    _this.showView();
                }));
            };
            ImperialEdict.prototype.refreshListRenderer = function () {
                if (this._listCollection)
                    this._listCollection.itemUpdated(this.list.selectedItem);
            };
            ImperialEdict.prototype.onListClick = function (e) {
                var _this = this;
                if (e.target instanceof components.SnapButton) {
                    var item = this.list.selectedItem;
                    if (item.status == 1) {
                        if (GameModels.user.player.liangcao < 2000) {
                            mg.alertManager.tip(Language.C_LCBZ);
                            return;
                        }
                        mg.uiManager.show(dialog.imperialEdict.ImperialEdictTask, item);
                        this.updataChange();
                    }
                    else if (item.status == 2) {
                        var num = 0;
                        num = Math.floor((Math.floor(item.leftTime / 3600) + 1) / 2) * 10;
                        mg.alertManager.showCheckAlert(Language.getExpression(Language.E_SFXHMSJSRW, num), TypeBtnLabel.OK, TypeCheck.SHENGZHI_CD, null, utils.Handler.create(this, function () {
                            this.cleanCd(item.taskId);
                        }));
                    }
                    else if (item.status == 3) {
                        if (utils.CheckUtil.checkBagSmelting())
                            return;
                        GameModels.shengzhi.requestGetRewardShengZhiTask(item.taskId, utils.Handler.create(this, function () {
                            var rewards = item.shengZhiTemp.rewards.split(";");
                            mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                            if (_this._listCollection) {
                                if (GameModels.shengzhi.shengZhiVo.length > 0) {
                                    _this._listCollection.replaceAll(GameModels.shengzhi.shengZhiVo);
                                }
                                else {
                                    if (GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_1) <= 0) {
                                        mg.guideManager.guideImmediately(_this.btnRefresh, Language.C_DJSX, TypeDirection.UP);
                                    }
                                    _this._listCollection.source = [];
                                }
                            }
                            _this.updataChange();
                        }));
                    }
                }
            };
            ImperialEdict.prototype.cleanCd = function (taskId) {
                var _this = this;
                GameModels.shengzhi.requestCleanCDShengZhiTask(taskId, utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.C_JSUCG);
                    _this._listCollection.itemUpdated(_this.list.selectedItem);
                    _this.updataChange();
                }));
            };
            ImperialEdict.prototype.onTabClick = function (e) {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 4701).des);
            };
            ImperialEdict.prototype.onTeQuanClick = function (e) {
                this.tequanGroup.visible = !this.tequanGroup.visible;
                if (this.tequanGroup.visible) {
                    this.labGo.visible = !GameModels.vip.getRewardBuyType(7);
                }
            };
            ImperialEdict.prototype.onGoTeQuanView = function (e) {
                mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1, param: 7 });
            };
            ImperialEdict.prototype.hideTeQuanTips = function (e) {
                if (e.target == this.btnTeQuan) {
                    return;
                }
                if (this.tequanGroup.visible)
                    this.tequanGroup.visible = false;
            };
            ImperialEdict.prototype.exit = function () {
                mg.guideManager.guideStopImmediately(this.btnRefresh);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                this.btnRefresh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                GameModels.bag.offItemChange(ConfigData.SHENGZHI, this, this.refreshItemCount);
                this.imgRule.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.itemIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnTeQuan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeQuanClick, this);
                this.labGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoTeQuanView, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideTeQuanTips, this);
                GameModels.vip.removeEventListener(mo.ModelVip.VIPTEQUAN_CHANGE, this.refreshTeQuanState, this);
            };
            ImperialEdict.prototype.updataChange = function () {
                var viewRole = mg.uiManager.getView(pet.PetGroupMain);
                if (viewRole)
                    viewRole.updataChange();
            };
            ImperialEdict.prototype.getCanUseListItem = function () {
                this.list.validateNow();
                var array = this._shengZhiArr;
                if (array[0]) {
                    return this.list.getChildAt(0).btnRefresh;
                }
                return null;
            };
            ImperialEdict.prototype.getCanUseListState = function () {
                var array = this._shengZhiArr;
                if (array[0]) {
                    return array[0].status;
                }
                return 0;
            };
            return ImperialEdict;
        }(ui.ImperialEdictSkin));
        imperialEdict.ImperialEdict = ImperialEdict;
        __reflect(ImperialEdict.prototype, "dialog.imperialEdict.ImperialEdict", ["IModuleView", "egret.DisplayObject"]);
    })(imperialEdict = dialog.imperialEdict || (dialog.imperialEdict = {}));
})(dialog || (dialog = {}));

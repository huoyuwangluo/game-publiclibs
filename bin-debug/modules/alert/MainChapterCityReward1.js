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
var MainChapterCityReward1 = (function (_super) {
    __extends(MainChapterCityReward1, _super);
    function MainChapterCityReward1() {
        return _super.call(this) || this;
    }
    MainChapterCityReward1.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
    };
    MainChapterCityReward1.prototype.enter = function () {
        var _this = this;
        this.activityGroup.visible = false;
        if (GameModels.activitySummer.isOpenActivitySummerList(game.sgActivitysummerType.szkh)) {
            this.activityGroup.visible = true;
            this.labDate.text = Language.C_YJS;
            var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.sgActivitysummerType.szkh);
            if (temp) {
                this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
            }
        }
        GameModels.vip.requestSpecailCardGetInfo(true, utils.Handler.create(this, function () {
            _this.showView();
        }));
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onok, this);
        this.labGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGo, this);
        GameModels.common.addEventListener(mo.ModelCommon.QIANGZHENG_CHANGE, this.showView, this);
    };
    MainChapterCityReward1.prototype.showView = function () {
        this.goldGroup.visible = false;
        this.labAct.visible = !!GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_103);
        this.labGo.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_QWJH);
        var str = GameModels.chapter.mainCityTemplate.dropShow.split(";");
        if (!this._listData) {
            this._listData = new eui.ArrayCollection(str);
        }
        else {
            this._listData.source = str;
        }
        this.list.dataProvider = this._listData;
        var totalMainFei = 0;
        var totalBuy = 0;
        var total = 0;
        if (GameModels.vip && !GameModels.vip.getRewardBuyType(5)) {
            totalMainFei = 1;
            totalBuy = 3;
            if (GameModels.activitySummer.isOpenActivitySummerList(game.sgActivitysummerType.szkh)) {
                totalMainFei = totalMainFei + 2;
                totalBuy = totalBuy + 5;
            }
            if (GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_103)) {
                totalMainFei = totalMainFei + 2;
                totalBuy = totalBuy + 4;
            }
            total = totalMainFei + totalBuy;
            this.labGo.visible = GameModels.platform.isPay;
            if (GameModels.common.needBuy) {
                this.labTitle.text = Language.J_JRSY;
                this.goldGroup.visible = true;
                this.labCount.text = (total - GameModels.common.foodCount < 0 ? 0 : total - GameModels.common.foodCount) + Language.Z_CI;
            }
            else {
                this.labTitle.text = Language.J_JRMF;
                this.labCount.text = (totalMainFei - GameModels.common.foodCount < 0 ? 0 : totalMainFei - GameModels.common.foodCount) + Language.Z_CI;
            }
            if (total - GameModels.common.foodCount <= 0) {
                this.btnOK.label = Language.C_HQGDCS;
                this.btnOK.visible = GameModels.platform.isPay;
                this.goldGroup.visible = false;
            }
        }
        else {
            totalMainFei = 4;
            totalBuy = 8;
            if (GameModels.activitySummer.isOpenActivitySummerList(game.sgActivitysummerType.szkh)) {
                totalMainFei = totalMainFei + 2;
                totalBuy = totalBuy + 5;
            }
            if (GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_103)) {
                totalMainFei = totalMainFei + 2;
                totalBuy = totalBuy + 4;
            }
            total = totalMainFei + totalBuy;
            this.btnOK.label = Language.J_QZ;
            this.labGo.visible = false;
            if (GameModels.common.needBuy) {
                this.labTitle.text = Language.J_JRSY;
                this.goldGroup.visible = true;
                this.labCount.text = (total - GameModels.common.foodCount < 0 ? 0 : total - GameModels.common.foodCount) + Language.Z_CI;
            }
            else {
                this.labTitle.text = Language.J_JRMF;
                this.labCount.text = (totalMainFei - GameModels.common.foodCount < 0 ? 0 : totalMainFei - GameModels.common.foodCount) + Language.Z_CI;
            }
            if (total - GameModels.common.foodCount <= 0) {
                this.goldGroup.visible = false;
            }
        }
        if (GameModels.common.needBuy) {
            this.labcount1.text = GameModels.common.getQiangZhengNeedItemNum(GameModels.common.foodCount + 1).toString();
        }
    };
    MainChapterCityReward1.prototype.onGo = function () {
        mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1, param: 5 });
        mg.uiManager.remove(this);
    };
    MainChapterCityReward1.prototype.onok = function () {
        if (GameModels.vip && !GameModels.vip.getRewardBuyType(5)) {
            var count = 4;
            if (GameModels.activitySummer.isOpenActivitySummerList(game.sgActivitysummerType.szkh)) {
                count = count + 7;
            }
            if (GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_103)) {
                count = count + 6;
            }
            if (count - GameModels.common.foodCount <= 0) {
                mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1, param: 5 });
            }
            else {
                if (GameModels.guide.guideType == mo.ModelGuide.guideType1) {
                    GameModels.guide.requestGuideDone(mo.ModelGuide.guideType1);
                }
                if (GameModels.guide.guideType == mo.ModelGuide.guideType4) {
                    GameModels.guide.requestGuideDone(mo.ModelGuide.guideType4);
                }
                if (GameModels.user.player.level < GameModels.common.needLv) {
                    if (GameModels.common.needLv <= 39) {
                        mg.alertManager.tip(Language.getExpression(Language.E_1JKFMFZSYC, GameModels.common.needLv));
                    }
                    else {
                        mg.alertManager.tip(Language.getExpression(Language.E_1JKZCZS, GameModels.common.needLv));
                    }
                    return;
                }
                if (GameModels.user.player.liangcao >= 20000) {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.J_QZLCJDDSX, TypeBtnLabel.GOTO_QIANGZHENG, utils.Handler.create(this, function () {
                        GameModels.common.requestQiangZhengFood(this, function () {
                            mg.alertManager.showAlert(MainChapterCityReward, true, true, true);
                        });
                    }), utils.Handler.create(this, function () {
                        mg.uiManager.show(pet.PetGroupMain);
                    }));
                }
                else {
                    if (GameModels.common.needBuy) {
                        var num = GameModels.common.getQiangZhengNeedItemNum(GameModels.common.foodCount + 1);
                        var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_QZXH, num));
                        mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.QIANGZHENG + "_" + num, null, utils.Handler.create(this, function () {
                            GameModels.common.requestQiangZhengFood(this, function () {
                                mg.alertManager.showAlert(MainChapterCityReward, true, true, true);
                            });
                        }), null, null, true);
                    }
                    else {
                        GameModels.common.requestQiangZhengFood(this, function () {
                            mg.alertManager.showAlert(MainChapterCityReward, true, true, true);
                        });
                    }
                }
            }
        }
        else {
            if (GameModels.guide.guideType == mo.ModelGuide.guideType1) {
                GameModels.guide.requestGuideDone(mo.ModelGuide.guideType1);
            }
            if (GameModels.guide.guideType == mo.ModelGuide.guideType4) {
                GameModels.guide.requestGuideDone(mo.ModelGuide.guideType4);
            }
            if (GameModels.user.player.level < GameModels.common.needLv) {
                if (GameModels.common.needLv <= 39) {
                    mg.alertManager.tip(Language.getExpression(Language.E_1JKFMFZSYC, GameModels.common.needLv));
                }
                else {
                    mg.alertManager.tip(Language.getExpression(Language.E_1JKZCZS, GameModels.common.needLv));
                }
                return;
            }
            if (GameModels.user.player.liangcao >= 20000) {
                mg.alertManager.showAlert(PromptAlert, false, true, Language.J_QZLCJDDSX, TypeBtnLabel.GOTO_QIANGZHENG, utils.Handler.create(this, function () {
                    GameModels.common.requestQiangZhengFood(this, function () {
                        mg.alertManager.showAlert(MainChapterCityReward, true, true, true);
                    });
                }), utils.Handler.create(this, function () {
                    mg.uiManager.show(pet.PetGroupMain);
                }));
            }
            else {
                if (GameModels.common.needBuy) {
                    var num = GameModels.common.getQiangZhengNeedItemNum(GameModels.common.foodCount + 1);
                    var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_QZXH, num));
                    mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.QIANGZHENG + "_" + num, null, utils.Handler.create(this, function () {
                        GameModels.common.requestQiangZhengFood(this, function () {
                            mg.alertManager.showAlert(MainChapterCityReward, true, true, true);
                        });
                    }), null, null, true);
                }
                else {
                    GameModels.common.requestQiangZhengFood(this, function () {
                        mg.alertManager.showAlert(MainChapterCityReward, true, true, true);
                    });
                }
            }
        }
    };
    MainChapterCityReward1.prototype.onClose = function (e) {
        mg.uiManager.remove(this);
    };
    MainChapterCityReward1.prototype.exit = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onok, this);
        this.labGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGo, this);
        GameModels.common.removeEventListener(mo.ModelCommon.QIANGZHENG_CHANGE, this.showView, this);
        this.clearList(this.list);
    };
    return MainChapterCityReward1;
}(ui.MainChapterCityReward1Skin));
__reflect(MainChapterCityReward1.prototype, "MainChapterCityReward1");

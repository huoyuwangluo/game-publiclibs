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
    var yuanZheng;
    (function (yuanZheng) {
        var petWanFaMainDilog = (function (_super) {
            __extends(petWanFaMainDilog, _super);
            function petWanFaMainDilog() {
                return _super.call(this) || this;
            }
            petWanFaMainDilog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._guideType = 0;
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            petWanFaMainDilog.prototype.enter = function () {
                var _this = this;
                GameModels.legion.requestExpeditionInfo(0, utils.Handler.create(this, function () {
                    _this.updataList();
                    if (TypeFunOpen.checkFuncOpen(s.UserfaceName.yuanzheng) && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_4) <= 0) {
                        GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_4);
                        mg.StoryManager.instance.startBigStory(114, _this, _this.storyEndCallFun1);
                    }
                    if (TypeFunOpen.checkFuncOpen(s.UserfaceName.bingfensanlu) && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_5) <= 0) {
                        GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_5);
                        mg.StoryManager.instance.startBigStory(115, _this, _this.storyEndCallFun2);
                    }
                }));
                GameModels.scene.onJoinScene(this, this.updataList);
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                GameModels.legion.addEventListener(mo.ModelLegion.UPDATA_PETWANFAMAIN_VIEW, this.updataList, this);
                mg.uiManager.addEventListener(egret.Event.CHANGE, this.updatePartDisplay, this);
                mg.TipManager.instance.addEventListener(mg.TipManager.SHOW_OR_HIED_TIP, this.updatePartDisplay, this);
                mg.alertManager.addEventListener(mg.AlertManager.SHOW_OR_HIED_ALERT, this.updatePartDisplay, this);
            };
            petWanFaMainDilog.prototype.exit = function () {
                this.updatePartDisplay(1);
                this.clearList(this.list);
                GameModels.scene.offJoinScene();
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                GameModels.legion.removeEventListener(mo.ModelLegion.UPDATA_PETWANFAMAIN_VIEW, this.updataList, this);
                mg.uiManager.removeEventListener(egret.Event.CHANGE, this.updatePartDisplay, this);
                mg.TipManager.instance.removeEventListener(mg.TipManager.SHOW_OR_HIED_TIP, this.updatePartDisplay, this);
                mg.alertManager.removeEventListener(mg.AlertManager.SHOW_OR_HIED_ALERT, this.updatePartDisplay, this);
            };
            petWanFaMainDilog.prototype.updatePartDisplay = function (isExit) {
                if (isExit === void 0) { isExit = 0; }
                if (!this._guideType)
                    return;
                var renderer = this.getCanUseListItem(this._guideType - 1);
                mg.guideManager.guideStopImmediately(renderer, true);
                if (isExit == 1) {
                    this._guideType = 0;
                    return;
                }
                if (mg.uiManager.isOpen(s.UserfaceName.petWanFa) && !mg.uiManager.isOpen(dialog.shop.MallChangeShopMain) &&
                    !mg.uiManager.isOpen(dialog.yuanzheng.BingFenSanLuRanking) && !mg.alertManager.current && !mg.TipManager.instance.current) {
                    mg.guideManager.guideImmediately(renderer, Language.J_DJDK, TypeDirection.UP);
                }
            };
            petWanFaMainDilog.prototype.storyEndCallFun1 = function () {
                var renderer = this.getCanUseListItem(0);
                if (renderer) {
                    this._guideType = 1;
                    mg.guideManager.guideImmediately(renderer, Language.J_DJDK, TypeDirection.UP);
                }
            };
            petWanFaMainDilog.prototype.storyEndCallFun2 = function () {
                var renderer = this.getCanUseListItem(1);
                if (renderer) {
                    this._guideType = 2;
                    mg.guideManager.guideImmediately(renderer, Language.J_DJDK, TypeDirection.UP);
                }
            };
            petWanFaMainDilog.prototype.getCanUseListItem = function (index) {
                if (index === void 0) { index = 0; }
                this.list.validateNow();
                if (this.list.getChildAt(index)) {
                    return this.list.getChildAt(index).imgGo;
                }
                return null;
            };
            petWanFaMainDilog.prototype.updataList = function () {
                var temArr = Templates.getList(templates.Map.EXPLORESHOW);
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(temArr);
                }
                else {
                    this._listData.source = temArr;
                }
                this.list.dataProvider = this._listData;
            };
            petWanFaMainDilog.prototype.onBuyClick = function (e) {
                var item = this.list.selectedItem;
                if (e.target instanceof components.RewardItemBox) {
                    return;
                }
                else if (e.target instanceof components.IconButton) {
                    if (item.id == 2) {
                        mg.uiManager.show(dialog.yuanzheng.BingFenSanLuRanking);
                    }
                    else if (item.id == 1) {
                        mg.uiManager.show(dialog.shop.MallChangeShopMain, { tabIndex: 3 });
                    }
                }
                else {
                    // if (temArr.id == 1) {
                    // else if (temArr.id == 2) {
                    // 	if (GameModels.scene.getjoinSceneListByType(TypeGame.SHILITA_1) || GameModels.scene.getjoinSceneListByType(TypeGame.SHILITA_2)||
                    // 	GameModels.scene.getjoinSceneListByType(TypeGame.SHILITA_3)) {
                    // 		this.imgJoin.visible = true;
                    // 	}
                    // }
                    if (item.id == 1) {
                        if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.yuanzheng, -1, true))
                            return;
                        if (GameModels.scene.getjoinSceneListByType(TypeGame.EXPEDITION)) {
                            app.gameContext.enterExpedition();
                            return;
                        }
                        if (GameModels.scene.getjoinSceneListByType(TypeGame.EXPEDITION_SUPPORT)) {
                            app.gameContext.enterExpeditionSupport("");
                            return;
                        }
                        GameModels.legion.requestExpeditionInfo(0, utils.Handler.create(this, function () {
                            if (GameModels.legion.curSelectMode > 0) {
                                mg.uiManager.show(dialog.yuanZheng.LegionYuanZheng);
                            }
                            else {
                                mg.alertManager.showAlert(dialog.yuanZheng.LegionYuanZhengChoose, true, true);
                            }
                        }));
                    }
                    else {
                        if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.bingfensanlu, -1, true))
                            return;
                        if (GameModels.scene.getjoinSceneListByType(TypeGame.SHILITA_1)) {
                            var fightData = GameModels.copyBoss.getFightData(TypeGame.SHILITA_1);
                            app.gameContext.enterShiLiTa1(fightData ? fightData.copyVo : null, false, fightData ? fightData.isFive : false);
                            return;
                        }
                        if (GameModels.scene.getjoinSceneListByType(TypeGame.SHILITA_2)) {
                            var fightData = GameModels.copyBoss.getFightData(TypeGame.SHILITA_2);
                            app.gameContext.enterShiLiTa2(fightData ? fightData.copyVo : null, false, fightData ? fightData.isFive : false);
                            return;
                        }
                        if (GameModels.scene.getjoinSceneListByType(TypeGame.SHILITA_3)) {
                            var fightData = GameModels.copyBoss.getFightData(TypeGame.SHILITA_3);
                            app.gameContext.enterShiLiTa3(fightData ? fightData.copyVo : null, false, fightData ? fightData.isFive : false);
                            return;
                        }
                        mg.alertManager.showAlert(dialog.yuanZheng.BingFenSanLuChoose, true, true);
                    }
                }
            };
            return petWanFaMainDilog;
        }(ui.petWanFaMainDilogSkin));
        yuanZheng.petWanFaMainDilog = petWanFaMainDilog;
        __reflect(petWanFaMainDilog.prototype, "dialog.yuanZheng.petWanFaMainDilog");
    })(yuanZheng = dialog.yuanZheng || (dialog.yuanZheng = {}));
})(dialog || (dialog = {}));

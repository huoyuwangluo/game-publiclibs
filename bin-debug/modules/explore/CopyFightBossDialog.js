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
    var explore;
    (function (explore) {
        var CopyFightBossDialog = (function (_super) {
            __extends(CopyFightBossDialog, _super);
            function CopyFightBossDialog() {
                var _this = _super.call(this) || this;
                _this._vipTab = 1;
                _this._ifRefresh = true;
                _this._curCityBoss = 0;
                _this.CENTRALITY_X = 358;
                _this.CENTRALITY_Y = 512;
                _this.tabWidth = 119;
                _this._speed = 500;
                _this._lastTime = 0;
                _this._bossCollection = new eui.ArrayCollection();
                _this._itemCollection = new eui.ArrayCollection();
                _this._bossFamilyCollection = new eui.ArrayCollection();
                return _this;
            }
            CopyFightBossDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._familyBtnList = [this.familyTab_0, this.familyTab_1, this.familyTab_2];
                this.listBoss.dataProvider = this._bossCollection;
                this.$maskRect = new egret.Rectangle(0, 0, this.width, this.height);
                this.labAutoSetting.textFlow = [{ text: this.labAutoSetting.text, style: { underline: true } }];
                this._fantasyHpItems = [this.fantasyHpItem1, this.fantasyHpItem2, this.fantasyHpItem3, this.fantasyHpItem4, this.fantasyHpItem5];
                this._fantasyItems = [this.fantasyItem1, this.fantasyItem2, this.fantasyItem3];
                this._imgFantasyImg = [this.imgNo_1, this.imgNo_2, this.imgNo_3];
                this._boxChecked = [this.boxChecked0, this.boxChecked1, this.boxChecked2, this.boxChecked3];
                this._openEnter = [this.openEnter0, this.openEnter1, this.openEnter2, this.openEnter3, this.openEnter4, this.openEnter5, this.openEnter6, this.openEnter7];
                // this._imagExhibitor = new components.FlipExhibitor();
                // this._imagExhibitor.scaleX = this._imagExhibitor.scaleY = .8;
                // this._imagExhibitor.x = this.width / 2 + 100;
                // this._imagExhibitor.y = this.labBossName.y - 150;
                // this.addChild(this._imagExhibitor);
                // this._imagExhibitor.touchEnabled = false;
                this.btnSelf.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.btnPerson.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                // this.btnCity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                // this.btnLose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                // this.btnFamily.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.btnDomain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                // this.btnFantasy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.labAutoSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                GameModels.state.registerWarnTarget(GameRedState.BOSS_COPY_EVERY, this.btnPerson);
                this._scrollerBinder = new components.ScrollerBinder();
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                Mediator.getMediator(this).onUpdate(this, this.update);
                this.progressHonour.slideDuration = 0;
                this.progressHonour1.slideDuration = 0;
                this.markDestoryImage(this.personBackImage);
            };
            CopyFightBossDialog.prototype.destory = function () {
                _super.prototype.destory.call(this);
                this.btnSelf.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.btnPerson.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                // this.btnCity.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                // this.btnLose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                // this.btnFamily.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.btnDomain.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                // this.btnFantasy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.labAutoSetting.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.btnSaoDang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.quilckClick, this);
                if (this._bossCollection) {
                    this._bossCollection.source = null;
                    this._bossCollection = null;
                }
                if (this._itemCollection) {
                    this._itemCollection.source = null;
                    this._itemCollection = null;
                }
                if (this._bossFamilyCollection) {
                    this._bossFamilyCollection.source = null;
                    this._bossFamilyCollection = null;
                }
            };
            CopyFightBossDialog.prototype.enter = function (data) {
                mg.soundManager.playViewLongSound("SoundJM_11", "BOSS");
                if (this.bossScroller.horizontalScrollBar) {
                    this.bossScroller.horizontalScrollBar.autoVisibility = false;
                    this.bossScroller.horizontalScrollBar.visible = true;
                }
                this.update();
                this.imgHelp.touchEnabled = true;
                // this.goldTips.updateData();//暂时先删除银两和元宝的数据显示
                var tabIndex = data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0;
                this._curCityBoss = data && data.hasOwnProperty("param") ? data.param : 0;
                this._tabIndex = tabIndex;
                this.btnTypeLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
                this.btnTypeRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
                this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
                this.listBoss.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBossClick, this);
                // this.btnHint.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHintClick, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
                this.btnAddNum.addEventListener(egret.TouchEvent.TOUCH_TAP, this.domainAddNumHandler, this);
                this.btnSaoDang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quilckClick, this);
                // if (GameModels.task.hasTask && this.currentState == "every") {
                //     if (GameModels.task.curTask.type == TypeTask.EVERY_BOSS_GUIDE_20 || GameModels.task.curTask.type == TypeTask.EVERY_BOSS_GUIDE_30) {
                //         if (GameModels.task.curTask.canSubmit) {
                //             GameModels.task.requestSubmit();
                //         }
                //     }
                // }
                GameModels.copyBoss.requestBossCopyInfo(utils.Handler.create(this, this.enterSelectTab, [tabIndex]));
                utils.timer.loop(1000, this, this.updateFamilyTime);
                for (var i = 0; i < this._familyBtnList.length; i++) {
                    this["family_tab_" + i].visible = false;
                    this["family_tab_" + i].touchEnabled = false;
                    this["family_tab_" + i].touchChildren = false;
                    this._familyBtnList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.familyBtnHandler, this);
                }
                this["family_tab_" + 0].visible = true;
                this._ifRefresh = true;
                //暂时先删除银两和元宝的数据显示
                // GameModels.user.player.onPropertyChange(TypeProperty.Gold, this, this.onGoldChange);
                // GameModels.user.player.onPropertyChange(TypeProperty.UnbindedGold, this, this.onGoldChange);
                GameModels.copyBoss.addEventListener(mo.ModelGameBoss.BOSS_REBORN_FAMILY, this.updateFamilyRefresh, this);
                GameModels.copyBoss.addEventListener(mo.ModelGameBoss.BOSS_REBORN, this.bossRebornHandler, this);
                GameModels.copyBoss.addEventListener(mo.ModelGameBoss.BOSS_REMIND, this.bossRemindHandler, this);
                this.invalidateProperties();
                for (var j = 0; j < this._boxChecked.length; j++) {
                    this._boxChecked[j].addEventListener(eui.UIEvent.CHANGE, this.onFansatyHintClick, this);
                }
                for (var k = 0; k < this._openEnter.length; k++) {
                    this._openEnter[k].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenFantasyClick, this);
                }
                GameModels.state.registerWarnTarget(GameRedState.BOSS_COPY_SELF, this.btnSelf);
                // GameModels.state.registerWarnTarget(GameRedState.BOSS_COPY_CITY, this.btnCity);
                // GameModels.state.registerWarnTarget(GameRedState.BOSS_COPY_LOSE, this.btnLose);
                // GameModels.state.registerWarnTarget(GameRedState.BOSS_COPY_FAMILY, this.btnFamily);
                GameModels.state.registerWarnTarget(GameRedState.BOSS_COPY_DOMAIN, this.btnDomain);
                // GameModels.state.registerWarnTarget(GameRedState.BOSS_COPY_FANTASY, this.btnFantasy);
                this.updateTabBtnsRed();
                this.scrollerTab.addEventListener(eui.UIEvent.CHANGE_END, this.scrollerTabEndHandler, this);
                GameModels.copyBoss.addEventListener(mo.ModelGameBoss.BOSSREFRESH, this.bossRefresh, this);
                GameModels.copyBoss.addEventListener(mo.ModelGameBoss.DOUBLEREFRESH, this.refreshBoss, this);
                GameModels.vip.addEventListener(mo.ModelVip.VIPTEQUAN_CHANGE, this.refreshBoss, this);
                this.btnDuiHuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showChangeShopView, this);
            };
            CopyFightBossDialog.prototype.exit = function () {
                this._copyWinVO = null;
                utils.timer.clear(this, this.refreshLastTime);
                GameModels.state.unRegisterWarnTarget(GameRedState.BOSS_COPY_SELF);
                // GameModels.state.unRegisterWarnTarget(GameRedState.BOSS_COPY_CITY);
                // GameModels.state.unRegisterWarnTarget(GameRedState.BOSS_COPY_LOSE);
                // GameModels.state.unRegisterWarnTarget(GameRedState.BOSS_COPY_FAMILY);
                GameModels.state.unRegisterWarnTarget(GameRedState.BOSS_COPY_DOMAIN);
                // GameModels.state.unRegisterWarnTarget(GameRedState.BOSS_COPY_FANTASY);
                this.btnTypeLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
                this.btnTypeRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
                this.listBoss.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBossClick, this);
                this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
                this.btnDuiHuan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showChangeShopView, this);
                // this.btnHint.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHintClick, this);
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
                this.btnAddNum.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.domainAddNumHandler, this);
                GameModels.copyBoss.removeEventListener(mo.ModelGameBoss.BOSS_REBORN_FAMILY, this.updateFamilyRefresh, this);
                GameModels.copyBoss.removeEventListener(mo.ModelGameBoss.BOSS_REBORN, this.bossRebornHandler, this);
                GameModels.copyBoss.removeEventListener(mo.ModelGameBoss.BOSS_REMIND, this.bossRemindHandler, this);
                this.scrollerTab.removeEventListener(eui.UIEvent.CHANGE_END, this.scrollerTabEndHandler, this);
                this.boxAutoSetting.removeEventListener(egret.Event.CHANGE, this.autoBossCheckChangeHandler, this);
                GameModels.copyBoss.removeEventListener(mo.ModelGameBoss.BOSSREFRESH, this.bossRefresh, this);
                GameModels.copyBoss.removeEventListener(mo.ModelGameBoss.DOUBLEREFRESH, this.refreshBoss, this);
                this.btnSaoDang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.quilckClick, this);
                GameModels.vip.removeEventListener(mo.ModelVip.VIPTEQUAN_CHANGE, this.refreshBoss, this);
                //暂时先删除银两和元宝的数据显示
                // GameModels.user.player.offPropertyChange(TypeProperty.Gold, this, this.onGoldChange);
                // GameModels.user.player.offPropertyChange(TypeProperty.UnbindedGold, this, this.onGoldChange);
                if (this._everyintervalID) {
                    egret.clearInterval(this._everyintervalID);
                }
                if (this._personintervalID) {
                    egret.clearInterval(this._personintervalID);
                }
                // this.listBoss.dataProvider = this._bossCollection = null;
                this.clearList(this.listItems);
                this.loseClear();
                this.clearList(this.rendererList);
                for (var i = 0; i < this._familyBtnList.length; i++) {
                    this._familyBtnList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.familyBtnHandler, this);
                }
                utils.timer.clearAll(this);
                this._vipTab = 1;
                for (var j = 0; j < this._boxChecked.length; j++) {
                    this._boxChecked[j].removeEventListener(eui.UIEvent.CHANGE, this.onFansatyHintClick, this);
                }
                for (var k = 0; k < this._openEnter.length; k++) {
                    this._openEnter[k].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenFantasyClick, this);
                }
                this._curHouseCopyVo = null;
                this._fantasyCopyList = null;
                this._personCopyVo = null;
                egret.Tween.removeTweens(this.btnTypeLeft);
                egret.Tween.removeTweens(this.btnTypeRight);
            };
            CopyFightBossDialog.prototype.update = function () {
                this.groupAutoSetting.visible = false;
                if (GameModels.user.player.vip >= 6) {
                    this.V6AutoSetting.visible = false;
                    this.boxAutoSetting.visible = true;
                    this.boxAutoSetting.selected = GameModels.copyBoss.autoBossEnabled;
                    this.boxAutoSetting.addEventListener(egret.Event.CHANGE, this.autoBossCheckChangeHandler, this);
                }
                else {
                    this.V6AutoSetting.visible = true;
                    this.boxAutoSetting.visible = false;
                }
            };
            CopyFightBossDialog.prototype.autoBossCheckChangeHandler = function (e) {
                if (this.boxAutoSetting.selected) {
                    if (utils.CheckUtil.checkBagSmelting()) {
                        this.boxAutoSetting.selected = false;
                        return;
                    }
                    GameModels.copyBoss.enableAutoBoss();
                    app.gameContext.checkAutoEveryBoss();
                }
                else {
                    GameModels.copyBoss.disableAutoBoss();
                }
            };
            CopyFightBossDialog.prototype.bossRebornHandler = function (e) {
                if (this.currentState == "every") {
                    this._bossCollection.source = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_EVERYONE, 1, true);
                }
                else if (this.currentState == "domain") {
                    this._bossCollection.source = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_DOMAIN, 1, true);
                }
            };
            CopyFightBossDialog.prototype.bossRemindHandler = function (e) {
                if (this._bossCollection) {
                    if (this.currentState == "every") {
                        this._bossCollection.source = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_EVERYONE, 1, true);
                    }
                    else if (this.currentState == "domain") {
                        this._bossCollection.source = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_DOMAIN, 1, true);
                    }
                    this.listBoss.selectedIndex = 0; // 默认选中第一个BOSS
                    this.onSelectBoss(0);
                }
            };
            CopyFightBossDialog.prototype.onLeftClick = function (e) {
                if (this.scrollerTab.viewport.scrollH > 0) {
                    this.scrollerTab.viewport.scrollH = Math.max(0, this.scrollerTab.viewport.scrollH - this.tabWidth);
                    this.updateTabBtnsRed();
                }
            };
            CopyFightBossDialog.prototype.onRightClick = function (e) {
                this.tabGroup.validateNow();
                var width = this.tabGroup.contentWidth - this.scrollerTab.width;
                if (this.scrollerTab.viewport.scrollH < width) {
                    this.scrollerTab.viewport.scrollH = Math.min(width, this.scrollerTab.viewport.scrollH + this.tabWidth);
                    this.updateTabBtnsRed();
                }
            };
            CopyFightBossDialog.prototype.scrollerTabEndHandler = function (e) {
                this.updateTabBtnsRed();
            };
            CopyFightBossDialog.prototype.updateTabBtnsRed = function () {
                this.showLeftTabRed();
                this.showRightTabRed();
            };
            CopyFightBossDialog.prototype.bossRefresh = function (e) {
                var copyVO = e.data;
                var data = this.listBoss.selectedItem;
                if (data && data.templateBoss.id == copyVO.templateBoss.id) {
                    this._curCityBoss = copyVO.templateBoss.id;
                    this.onSelectBoss(0);
                }
            };
            CopyFightBossDialog.prototype.showLeftTabRed = function () {
                var boo = false;
                var num = Math.ceil(this.scrollerTab.viewport.scrollH / this.tabWidth);
                switch (num) {
                    case 0:
                        boo = false;
                        break;
                    case 1:
                        boo = GameModels.copyBoss.checkSelfBossCount();
                        break;
                    case 2:
                    case 3:
                        var left1Boo = GameModels.copyBoss.checkSelfBossCount();
                        // var left2Boo:boolean = GameModels.copyBoss.checkEveryBossCount();//全民boss红点未开启，故这里的判断也要注释掉
                        // if(left1Boo || left2Boo){
                        if (left1Boo) {
                            boo = true;
                        }
                        else {
                            boo = false;
                        }
                        break;
                }
                this.imgWarnLeft.visible = false; //boo;
                this.warnLefttEffect(boo);
            };
            CopyFightBossDialog.prototype.showRightTabRed = function () {
                var boo = false;
                var num = Math.floor(this.scrollerTab.viewport.scrollH / this.tabWidth);
                switch (num) {
                    case 0:
                        var left1Boo = GameModels.copyBoss.checkFamilyBossCount();
                        var left2Boo = GameModels.copyBoss.checkCityBossCount();
                        if (left1Boo || left2Boo) {
                            boo = true;
                        }
                        else {
                            boo = false;
                        }
                        break;
                    case 1:
                        boo = GameModels.copyBoss.checkCityBossCount();
                        break;
                }
                this.imgWarnRight.visible = false; //boo;
                this.warnRightEffect(boo);
            };
            CopyFightBossDialog.prototype.warnLefttEffect = function (boo) {
                egret.Tween.removeTweens(this.btnTypeLeft);
                this.btnTypeLeft.x = 17;
                if (boo) {
                    this.btnTypeLeft.source = "common_json.btn_left_3_png";
                    egret.Tween.get(this.btnTypeLeft, { loop: true }).to({ x: 10 }, this._speed).to({ x: 17 }, this._speed);
                }
                else {
                    this.btnTypeLeft.source = "common_json.btn_left_3_png";
                }
            };
            CopyFightBossDialog.prototype.warnRightEffect = function (boo) {
                egret.Tween.removeTweens(this.btnTypeRight);
                this.btnTypeRight.x = 583;
                if (boo) {
                    this.btnTypeRight.source = "common_json.btn_left_3_png";
                    egret.Tween.get(this.btnTypeRight, { loop: true }).to({ x: 590 }, this._speed).to({ x: 583 }, this._speed);
                }
                else {
                    this.btnTypeRight.source = "common_json.btn_left_3_png";
                }
            };
            //暂时先删除银两和元宝的数据显示
            // private onGoldChange(): void {
            //     this.goldTips.updateData();
            // }
            CopyFightBossDialog.prototype.enterSelectTab = function (index) {
                this.everyStartStoreDown();
                switch (index) {
                    case 0:
                        this.updateState("person");
                        break;
                    case 1:
                        this.updateState("every");
                        break;
                    case 2:
                        this.updateState("domain");
                        break;
                    case 3:
                        this.currentState = "family";
                        this.updateStateToFamily(this._vipTab);
                        break;
                    case 4:
                        this.currentState = "lose";
                        this.updateStateToLose();
                        break;
                    case 5:
                        this.currentState = "fantasy";
                        this.updateStateToFantasy();
                        break;
                    case 6:
                        this.updateState("city");
                        break;
                }
            };
            CopyFightBossDialog.prototype.updateTime = function () {
                var _this = this;
                GameModels.copyBoss.requestBossCopyInfo(utils.Handler.create(this, function () {
                    _this.everyStartStoreDown();
                }));
            };
            CopyFightBossDialog.prototype.everyStartStoreDown = function () {
                if (GameModels.copyBoss.everyBossCount < GameModels.copyBoss.everyBossRefreshNum) {
                    this._everyrestoreTime = GameModels.copyBoss.everyBossRestoreTime - (GameModels.timer.getTimer() * .001) >> 0;
                    if (this._everyrestoreTime <= 0) {
                        this._everyrestoreTime += 60 * 60;
                    }
                    if (this._everyintervalID) {
                        egret.clearInterval(this._everyintervalID);
                    }
                    this._everyintervalID = egret.setInterval(this.everyStoreTimeLoop, this, 1000);
                    this.everyStoreTimeLoop();
                }
                else {
                    this.labRestore.text = "";
                    this._everyrestoreTime = 0;
                    if (this._everyintervalID) {
                        egret.clearInterval(this._everyintervalID);
                    }
                }
            };
            CopyFightBossDialog.prototype.everyStoreTimeLoop = function () {
                if (this._everyrestoreTime <= 0) {
                    if (GameModels.copyBoss.everyBossCount < GameModels.copyBoss.everyBossRefreshNum) {
                        GameModels.copyBoss.everyBossCount++;
                    }
                    this.everyStartStoreDown();
                    this.updateState("every");
                }
                if (this.currentState == "every") {
                    if (this._everyrestoreTime > 0)
                        this.labRestore.text = '(' + Language.getExpression(Language.E_1MHFF, utils.DateUtil.formatTimeLeft(this._everyrestoreTime)) + ')';
                    else
                        this.labRestore.text = "";
                }
                this._everyrestoreTime--;
            };
            CopyFightBossDialog.prototype.onEnterClick = function (e) {
                if (this.currentState == "city") {
                    app.gameContext.enterCity();
                    return;
                }
                var copyVO = this.listBoss.selectedItem;
                this._personCopyVo = copyVO;
                if (this.currentState == "person") {
                    if (utils.CheckUtil.checkPetSmelting())
                        return;
                    if (utils.CheckUtil.checkPetCanCompound(copyVO))
                        return;
                    if (copyVO.personDoneKilled == 0) {
                        if (GameModels.guide.guideType == mo.ModelGuide.guideType9) {
                            GameModels.guide.requestGuideDone(mo.ModelGuide.guideType9);
                        }
                        app.gameContext.enterPersonalBoss(copyVO);
                    }
                    else {
                        if (GameModels.copyBoss.personaBossCount <= 0) {
                            if (GameModels.copyBoss.personaBossBuyCount < GameModels.copyBoss.personaBuyMaxNum) {
                                var num = GameModels.copyBoss.getPersonaBuyItemNum(GameModels.copyBoss.personaBossBuyCount + 1);
                                var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
                                mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.PERSONAL_BOSS + "_" + num, null, utils.Handler.create(this, function () {
                                    GameModels.copyBoss.personaBuyChallengesTimes(utils.Handler.create(this, function () {
                                        this.domainUpdateBuyTimes();
                                    }));
                                }), null, null, true);
                            }
                            else {
                                if (GameModels.platform.isPay) {
                                    mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                                }
                                else {
                                    mg.alertManager.tip(Language.J_GMCSBZ);
                                }
                            }
                        }
                        else {
                            if (GameModels.user.player.level < 50) {
                                if (GameModels.guide.guideType == mo.ModelGuide.guideType9) {
                                    GameModels.guide.requestGuideDone(mo.ModelGuide.guideType9);
                                }
                                app.gameContext.enterPersonalBoss(copyVO);
                            }
                            else {
                                app.gameContext.enterPersonalBoss(copyVO, utils.Handler.create(this, this.quickCallback));
                            }
                        }
                    }
                }
                else if (this.currentState == "domain") {
                    if (GameModels.copyBoss.domainBossCount > 0 && GameModels.copyBoss.domainBossCount <= GameModels.copyBoss.domainRefreshNum) {
                        if (utils.CheckUtil.checkPetSmelting())
                            return;
                        if (utils.CheckUtil.checkPetCanCompound(copyVO))
                            return;
                        app.gameContext.enterGodDomain(copyVO);
                    }
                    else if (GameModels.copyBoss.domainBossCount <= 0) {
                        if (GameModels.copyBoss.domainBossCanBuyCount < GameModels.copyBoss.domainBuyMaxNum) {
                            var num = GameModels.copyBoss.getDomainBuyItemNum(GameModels.copyBoss.domainBossCanBuyCount + 1);
                            var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
                            mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.HUIJUNBEIFA_BOSS + "_" + num, null, utils.Handler.create(this, function () {
                                var _this = this;
                                GameModels.copyBoss.net_requestBuyChallengesTimes(utils.Handler.create(this, function () {
                                    _this.domainUpdateBuyTimes();
                                }));
                            }), null, null, true);
                        }
                        else if (GameModels.copyBoss.domainBossCanBuyCount >= GameModels.copyBoss.domainBuyMaxNum) {
                            if (GameModels.platform.isPay) {
                                mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                            }
                            else {
                                mg.alertManager.tip(Language.J_GMCSBZ);
                            }
                        }
                    }
                    else if (GameModels.copyBoss.domainBossCount > GameModels.copyBoss.domainRefreshNum) {
                        logger.log("神域boss挑战次数大于限制次数，有问题！！！");
                    }
                }
                else {
                    if (utils.CheckUtil.checkPetSmelting())
                        return;
                    if (utils.CheckUtil.checkPetCanCompound(copyVO))
                        return;
                    if (GameModels.copyBoss.checkEveryBossCount() || copyVO.everyDoneKilled == 0) {
                        if (GameModels.guide.guideType == mo.ModelGuide.guideType5) {
                            GameModels.guide.requestGuideDone(mo.ModelGuide.guideType5);
                        }
                        app.gameContext.enterEveryOneBoss(copyVO);
                    }
                    else if (GameModels.copyBoss.everyBossCount <= 0) {
                        if (GameModels.copyBoss.everyBossBuyCount < GameModels.copyBoss.everyBossBuyMax) {
                            var num = GameModels.copyBoss.getEveryBossBuyItemNum(GameModels.copyBoss.everyBossBuyCount + 1);
                            var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
                            mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.EVERY_BOSS + "_" + num, null, utils.Handler.create(this, function () {
                                var _this = this;
                                GameModels.copyBoss.everyBuyChallengesTimes(utils.Handler.create(this, function () {
                                    _this.everyStartStoreDown();
                                    _this.domainUpdateBuyTimes();
                                    _this._everyrestoreTime = GameModels.copyBoss.everyBossRestoreTime - (GameModels.timer.getTimer() * .001) >> 0;
                                }));
                            }), null, null, true);
                        }
                        else if (GameModels.copyBoss.everyBossBuyCount >= GameModels.copyBoss.everyBossBuyMax) {
                            if (GameModels.platform.isPay) {
                                mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                            }
                            else {
                                mg.alertManager.tip(Language.J_GMCSBZ);
                            }
                            return;
                        }
                    }
                }
            };
            CopyFightBossDialog.prototype.quickCallback = function (data) {
                if (!this._copyWinVO)
                    this._copyWinVO = new vo.CopyWinVO();
                var dropItms = [];
                if (data.Items.length > 0) {
                    for (var _i = 0, _a = data.Items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        dropItms.push(vo.fromPool(vo.ItemVO, item));
                    }
                }
                if (this.currentState == "person") {
                    this._copyWinVO.type = TypeGame.PERSONAL_BOSS;
                }
                else if (this.currentState == "every") {
                    this._copyWinVO.type = TypeGame.EVERYONE_BOSS;
                }
                else if (this.currentState == "domain") {
                    this._copyWinVO.type = TypeGame.GOD_DOMAIN;
                }
                this._copyWinVO.petDebris = app.gameContext.getPetDebris(dropItms, 1)[0];
                this._copyWinVO.dropItems = app.gameContext.getPetDebris(dropItms, 0);
                this._copyWinVO.gold = app.gameContext.getPetDebris(dropItms, 2)[0];
                this._copyWinVO.initialize(this, function () {
                    this._copyWinVO.reset();
                    vo.toPoolList(dropItms);
                });
                app.gameContext.showWinTip(this._copyWinVO);
                this.refreshBoss();
            };
            CopyFightBossDialog.prototype.refreshBoss = function () {
                var _this = this;
                GameModels.copyBoss.requestBossCopyInfo(utils.Handler.create(this, function () {
                    _this._bossCollection.replaceAll(_this._bossCollection.source);
                    _this.domainUpdateBuyTimes();
                    _this.onSelectBoss(0);
                }));
            };
            CopyFightBossDialog.prototype.quilckClick = function (e) {
                if (this.currentState == "city") {
                    app.gameContext.enterCity();
                    return;
                }
                var copyVO = this.listBoss.selectedItem;
                this._personCopyVo = copyVO;
                if (utils.CheckUtil.checkPetCanCompound(copyVO))
                    return;
                if (this.currState == "every") {
                    if (GameModels.copyBoss.everyBossCount <= 0) {
                        if (GameModels.copyBoss.everyBossBuyCount < GameModels.copyBoss.everyBossBuyMax) {
                            var num = GameModels.copyBoss.getEveryBossBuyItemNum(GameModels.copyBoss.everyBossBuyCount + 1);
                            var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
                            mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.EVERY_BOSS + "_" + num, null, utils.Handler.create(this, function () {
                                var _this = this;
                                GameModels.copyBoss.everyBuyChallengesTimes(utils.Handler.create(this, function () {
                                    _this.everyStartStoreDown();
                                    _this.domainUpdateBuyTimes();
                                    _this._everyrestoreTime = GameModels.copyBoss.everyBossRestoreTime - (GameModels.timer.getTimer() * .001) >> 0;
                                }));
                            }), null, null, true);
                        }
                        else if (GameModels.copyBoss.everyBossBuyCount >= GameModels.copyBoss.everyBossBuyMax) {
                            if (GameModels.platform.isPay) {
                                mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                            }
                            else {
                                mg.alertManager.tip(Language.J_GMCSBZ);
                            }
                        }
                        return;
                    }
                    if (GameModels.vip.getRewardBuyType(6)) {
                        app.gameContext.enterEveryOneBoss(copyVO, utils.Handler.create(this, this.quickCallback));
                    }
                    else {
                        if (GameModels.copyBoss.publicBossQuickPassLeftTimes <= 0) {
                            if (GameModels.vip.getRewardBuyType(4)) {
                                if (!GameModels.vip.getRewardBuyType(6)) {
                                    if (GameModels.platform.isPay) {
                                        mg.alertManager.showAlert(PromptAlert, false, true, Language.E_GMZUANSHISAODANG, TypeBtnLabel.GOTO, null, utils.Handler.create(this, function () {
                                            mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1, param: 6 });
                                        }), false);
                                    }
                                }
                                else {
                                    mg.alertManager.tip(Language.J_JRCSYYW);
                                }
                            }
                            else {
                                if (GameModels.platform.isPay) {
                                    mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_GMSAODANGBLB, 4), TypeBtnLabel.GOTO, null, utils.Handler.create(this, function () {
                                        mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1, param: 4 });
                                    }), false);
                                }
                            }
                        }
                        else {
                            app.gameContext.enterEveryOneBoss(copyVO, utils.Handler.create(this, this.quickCallback));
                        }
                    }
                }
                else if (this.currState == "domain") {
                    if (GameModels.copyBoss.domainBossCount <= 0) {
                        if (GameModels.copyBoss.domainBossCanBuyCount < GameModels.copyBoss.domainBuyMaxNum) {
                            var num = GameModels.copyBoss.getDomainBuyItemNum(GameModels.copyBoss.domainBossCanBuyCount + 1);
                            var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
                            mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.HUIJUNBEIFA_BOSS + "_" + num, null, utils.Handler.create(this, function () {
                                var _this = this;
                                GameModels.copyBoss.net_requestBuyChallengesTimes(utils.Handler.create(this, function () {
                                    _this.domainUpdateBuyTimes();
                                }));
                            }), null, null, true);
                        }
                        else if (GameModels.copyBoss.domainBossCanBuyCount >= GameModels.copyBoss.domainBuyMaxNum) {
                            if (GameModels.platform.isPay) {
                                mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                            }
                            else {
                                mg.alertManager.tip(Language.J_GMCSBZ);
                            }
                        }
                        return;
                    }
                    if (GameModels.vip.getRewardBuyType(6)) {
                        app.gameContext.enterGodDomain(copyVO, utils.Handler.create(this, this.quickCallback));
                    }
                    else {
                        if (GameModels.copyBoss.godDomainQuickPassLeftTimes <= 0) {
                            if (GameModels.vip.getRewardBuyType(4)) {
                                if (!GameModels.vip.getRewardBuyType(6)) {
                                    if (GameModels.platform.isPay) {
                                        mg.alertManager.showAlert(PromptAlert, false, true, Language.E_GMZUANSHISAODANG, TypeBtnLabel.GOTO, null, utils.Handler.create(this, function () {
                                            mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1, param: 6 });
                                        }), false);
                                    }
                                }
                                else {
                                    mg.alertManager.tip(Language.J_JRCSYYW);
                                }
                            }
                            else {
                                if (GameModels.platform.isPay) {
                                    mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_GMSAODANGBLB, 2), TypeBtnLabel.GOTO, null, utils.Handler.create(this, function () {
                                        mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1, param: 4 });
                                    }), false);
                                }
                            }
                        }
                        else {
                            app.gameContext.enterGodDomain(copyVO, utils.Handler.create(this, this.quickCallback));
                        }
                    }
                }
            };
            CopyFightBossDialog.prototype.onOpenFantasyClick = function (e) {
                var fantasyCopyList = this._fantasyCopyList;
                var copyVO;
                switch (e.currentTarget) {
                    case this.openEnter0:
                    case this.openEnter1:
                    case this.openEnter2:
                        if (e.currentTarget == this.openEnter0) {
                            copyVO = fantasyCopyList[0];
                        }
                        else if (e.currentTarget == this.openEnter1) {
                            copyVO = fantasyCopyList[1];
                        }
                        else if (e.currentTarget == this.openEnter2) {
                            copyVO = fantasyCopyList[2];
                        }
                        if (GameModels.copyBoss.dongWuZhengBaBossCount > 0) {
                            //app.gameContext.enterBossFantasy(copyVO);
                        }
                        else {
                            mg.alertManager.tip(Language.J_TZCSYDSX, 0xff0000);
                        }
                        break;
                    case this.openEnter3:
                    case this.openEnter4:
                    case this.openEnter5:
                    case this.openEnter6:
                    case this.openEnter7:
                        if (e.currentTarget == this.openEnter3) {
                            copyVO = fantasyCopyList[3];
                        }
                        else if (e.currentTarget == this.openEnter4) {
                            copyVO = fantasyCopyList[4];
                        }
                        else if (e.currentTarget == this.openEnter5) {
                            copyVO = fantasyCopyList[5];
                        }
                        else if (e.currentTarget == this.openEnter6) {
                            copyVO = fantasyCopyList[6];
                        }
                        else if (e.currentTarget == this.openEnter7) {
                            copyVO = fantasyCopyList[7];
                        }
                        var level = convert.getFormulaLevel(GameModels.user.player.zhuanShenLevel, GameModels.user.player.level);
                        if (level >= copyVO.openLevel && level <= copyVO.endLevel) {
                            mg.alertManager.showAlert(FantasyEnterAlert, false, true, copyVO);
                        }
                        else {
                            mg.alertManager.tip(Language.J_DQDJBKTZ, 0xff0000);
                        }
                        break;
                }
            };
            CopyFightBossDialog.prototype.onFansatyHintClick = function (e) {
                var copyVO;
                var checkNum;
                var level = GameModels.user.player.level;
                switch (e.target) {
                    case this.boxChecked0:
                    case this.boxChecked1:
                    case this.boxChecked2:
                        var fantasyCopyList = this._fantasyCopyList;
                        if (e.currentTarget == this.boxChecked0) {
                            if (level >= fantasyCopyList[0].openLevel && level <= fantasyCopyList[0].endLevel) {
                                copyVO = fantasyCopyList[0];
                                checkNum = 0;
                                this.boxChecked0.currentState = this.boxChecked0.currentState == "down" ? "up" : "down";
                            }
                            else {
                                copyVO = null;
                                this.boxChecked0.currentState = "up";
                            }
                        }
                        else if (e.currentTarget == this.boxChecked1) {
                            if (level >= fantasyCopyList[1].openLevel && level <= fantasyCopyList[1].endLevel) {
                                copyVO = fantasyCopyList[1];
                                checkNum = 1;
                                this.boxChecked1.currentState = this.boxChecked1.currentState == "down" ? "up" : "down";
                            }
                            else {
                                copyVO = null;
                                this.boxChecked1.currentState = "up";
                            }
                        }
                        else if (e.currentTarget == this.boxChecked2) {
                            if (level >= fantasyCopyList[2].openLevel && level <= fantasyCopyList[2].endLevel) {
                                copyVO = fantasyCopyList[2];
                                checkNum = 2;
                                this.boxChecked2.currentState = this.boxChecked2.currentState == "down" ? "up" : "down";
                            }
                            else {
                                copyVO = null;
                                this.boxChecked2.currentState = "up";
                            }
                        }
                        break;
                    case this.boxChecked3:
                        if (level >= this._curHouseCopyVo.openLevel && level <= this._curHouseCopyVo.endLevel) {
                            copyVO = this._curHouseCopyVo;
                            checkNum = 3;
                            this.boxChecked3.currentState = this.boxChecked3.currentState == "down" ? "up" : "down";
                        }
                        else {
                            copyVO = null;
                            this.boxChecked3.currentState = "up";
                        }
                        break;
                }
                if (copyVO) {
                    // let cmd: n.C2G_MagicWorldBoss_Set_Remind = n.MessagePool.from(n.C2G_MagicWorldBoss_Set_Remind) as n.C2G_MagicWorldBoss_Set_Remind;
                    // cmd.Remind = copyVO.isRemind ? 0 : 1;
                    // cmd.Step = copyVO.step;
                    // n.net.request(n.MessageMap.C2G_MAGICWORLDBOSS_SET_REMIND, cmd, utils.Handler.create(this, function (data: n.G2C_MagicWorldBoss_Set_Remind): void {
                    //     GameModels.copyBoss.getVOByStep(mo.ModelGameBoss.COPY_FANTASY, data.Step).isRemind = this._boxChecked[checkNum].selected = Boolean(data.Remind);
                    // }));
                }
                else {
                    mg.alertManager.tip(Language.C_DJWDD);
                }
            };
            CopyFightBossDialog.prototype.onBossClick = function (e) {
                this.onSelectBoss(e.itemIndex);
            };
            CopyFightBossDialog.prototype.onHintClick = function (e) {
                // let data: vo.CopyVO = this.listBoss.selectedItem;
                // if (this.currState == "every") {
                //     let cmd: n.C2G_Boss_Set_Remind = n.MessagePool.from(n.C2G_Boss_Set_Remind) as n.C2G_Boss_Set_Remind;
                //     cmd.Remind = data.isRemind ? 0 : 1;
                //     cmd.Step = data.step;
                //     n.net.request(n.MessageMap.C2G_BOSS_SET_REMIND, cmd, utils.Handler.create(this, function (data: n.G2C_Boss_Set_Remind): void {
                //         GameModels.copyBoss.getVOByStep(mo.ModelGameBoss.COPY_EVERYONE, data.Step).isRemind = this.imgSelected.visible = Boolean(data.Remind);
                //         GameModels.copyBoss.dispatchEventWith(mo.ModelGameBoss.BOSS_REMIND, false, data.Remind);
                //     }));
                // }
                // else if (this.currState == "domain") {
                //     let cmd: n.C2G_GodDomainBoss_Set_Remind = n.MessagePool.from(n.C2G_GodDomainBoss_Set_Remind) as n.C2G_GodDomainBoss_Set_Remind;
                //     cmd.Remind = data.isRemind ? 0 : 1;
                //     cmd.Step = data.step;
                //     n.net.request(n.MessageMap.C2G_GODDOMAINBOSS_SET_REMIND, cmd, utils.Handler.create(this, function (data: n.G2C_GodDomainBoss_Set_Remind): void {
                //         GameModels.copyBoss.getVOByStep(mo.ModelGameBoss.COPY_DOMAIN, data.Step).isRemind = this.imgSelected.visible = Boolean(data.Remind);
                //         GameModels.copyBoss.dispatchEventWith(mo.ModelGameBoss.BOSS_REMIND, false, data.Remind);
                //     }));
                // }
            };
            CopyFightBossDialog.prototype.closeHandler = function (e) {
                mg.uiManager.remove(CopyFightBossDialog);
            };
            CopyFightBossDialog.prototype.openHelp = function (e) {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 901).des);
            };
            CopyFightBossDialog.prototype.domainAddNumHandler = function (e) {
                var _this = this;
                if (this.currState == "person") {
                    if (GameModels.copyBoss.personaBossBuyCount >= GameModels.copyBoss.personaBuyMaxNum) {
                        if (GameModels.platform.isPay) {
                            mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                        }
                        else {
                            mg.alertManager.tip(Language.J_GMCSBZ);
                        }
                        return;
                    }
                    if (GameModels.copyBoss.personaBossCount >= GameModels.copyBoss.personaRefreshNum) {
                        mg.alertManager.tip(Language.J_CSZGWXGM, 0xff0000);
                        return;
                    }
                    var num = GameModels.copyBoss.getPersonaBuyItemNum(GameModels.copyBoss.personaBossBuyCount + 1);
                    var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
                    mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.PERSONAL_BOSS + "_" + num, null, utils.Handler.create(this, function () {
                        GameModels.copyBoss.personaBuyChallengesTimes(utils.Handler.create(_this, function () {
                            _this.domainUpdateBuyTimes();
                        }));
                    }), null, null, true);
                }
                else if (this.currState == "every") {
                    if (GameModels.copyBoss.everyBossBuyCount >= GameModels.copyBoss.everyBossBuyMax) {
                        if (GameModels.platform.isPay) {
                            mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                        }
                        else {
                            mg.alertManager.tip(Language.J_GMCSBZ);
                        }
                        return;
                    }
                    if (GameModels.copyBoss.everyBossCount >= GameModels.copyBoss.everyBossRefreshNum) {
                        mg.alertManager.tip(Language.J_CSZGWXGM, 0xff0000);
                        return;
                    }
                    var num = GameModels.copyBoss.getEveryBossBuyItemNum(GameModels.copyBoss.everyBossBuyCount + 1);
                    var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
                    mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.EVERY_BOSS + "_" + num, null, utils.Handler.create(this, function () {
                        GameModels.copyBoss.everyBuyChallengesTimes(utils.Handler.create(_this, function () {
                            _this.everyStartStoreDown();
                            _this.domainUpdateBuyTimes();
                            _this._everyrestoreTime = GameModels.copyBoss.everyBossRestoreTime - (GameModels.timer.getTimer() * .001) >> 0;
                        }));
                    }), null, null, true);
                    // mg.alertManager.showAlert(PropOfSourceAlert, true, true, ConfigData.EVERY_BOSS_PROP, GameModels.copyBoss.everyBossBuyMax);
                }
                else if (this.currState == "lose") {
                    if (GameModels.copyBoss.zhuLuZhongYuanBossBuyCount >= GameModels.copyBoss.zhuLuZhongYuanBuyMaxNum) {
                        if (GameModels.platform.isPay) {
                            mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                        }
                        else {
                            mg.alertManager.tip(Language.J_GMCSBZ);
                        }
                        return;
                    }
                    if (GameModels.copyBoss.zhuLuZhongYuanBossCount >= GameModels.copyBoss.zhuLuZhongYuanRefreshNum) {
                        mg.alertManager.tip(Language.J_CSZGWXGM, 0xff0000);
                        return;
                    }
                    var num = GameModels.copyBoss.getZhuLuZhongYuanBuyItemNum(GameModels.copyBoss.zhuLuZhongYuanBossBuyCount + 1);
                    var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
                    mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.ZHULUZHONGYUAN_BOSS + "_" + num, null, utils.Handler.create(this, function () {
                        var _this = this;
                        GameModels.copyBoss.zhuLuZhongYuanBuyChallengesTimes(utils.Handler.create(this, function () {
                            _this.updateStateToLose();
                        }));
                    }), null, null, true);
                }
                else if (this.currState == "family") {
                    if (GameModels.copyBoss.pingDingShuZhongBossBuyCount >= GameModels.copyBoss.pingDingShuZhongBuyMaxNum) {
                        if (GameModels.platform.isPay) {
                            mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                        }
                        else {
                            mg.alertManager.tip(Language.J_GMCSBZ);
                        }
                        return;
                    }
                    if (GameModels.copyBoss.pingDingShuZhongBossCount >= GameModels.copyBoss.pingDingShuZhongRefreshNum) {
                        mg.alertManager.tip(Language.J_CSZGWXGM, 0xff0000);
                        return;
                    }
                    var num = GameModels.copyBoss.getPingDingShuZhongBuyItemNum(GameModels.copyBoss.pingDingShuZhongBossBuyCount + 1);
                    var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
                    mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.PINGDINGSHUZHONG_BOSS + "_" + num, null, utils.Handler.create(this, function () {
                        var _this = this;
                        GameModels.copyBoss.pingDingShuZhongBuyChallengesTimes(utils.Handler.create(this, function () {
                            _this.updateStateToFamily(_this._vipTab);
                        }));
                    }), null, null, true);
                }
                else if (this.currState == "domain") {
                    if (GameModels.copyBoss.domainBossCanBuyCount >= GameModels.copyBoss.domainBuyMaxNum) {
                        if (GameModels.platform.isPay) {
                            mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                        }
                        else {
                            mg.alertManager.tip(Language.J_GMCSBZ);
                        }
                        return;
                    }
                    if (GameModels.copyBoss.domainBossCount >= GameModels.copyBoss.domainRefreshNum) {
                        mg.alertManager.tip(Language.J_CSZGWXGM, 0xff0000);
                        return;
                    }
                    var num = GameModels.copyBoss.getDomainBuyItemNum(GameModels.copyBoss.domainBossCanBuyCount + 1);
                    var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
                    mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.HUIJUNBEIFA_BOSS + "_" + num, null, utils.Handler.create(this, function () {
                        var _this = this;
                        GameModels.copyBoss.net_requestBuyChallengesTimes(utils.Handler.create(this, function () {
                            _this.domainUpdateBuyTimes();
                        }));
                    }), null, null, true);
                }
                else if (this.currState == "fantasy") {
                    if (GameModels.copyBoss.dongWuZhengBaBuyBossCount >= GameModels.copyBoss.dongWuZhengBaBossBuyMax) {
                        if (GameModels.platform.isPay) {
                            mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                        }
                        else {
                            mg.alertManager.tip(Language.J_GMCSBZ);
                        }
                        return;
                    }
                    if (GameModels.copyBoss.dongWuZhengBaBossCount >= GameModels.copyBoss.dongWuZhengBaBossRefreshNum) {
                        mg.alertManager.tip(Language.J_CSZGWXGM, 0xff0000);
                        return;
                    }
                    var num = GameModels.copyBoss.getDomainBuyItemNum(GameModels.copyBoss.dongWuZhengBaBuyBossCount + 1);
                    var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
                    mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.DONGWUZHENGBA_BOSS + "_" + num, null, utils.Handler.create(this, function () {
                        var _this = this;
                        GameModels.copyBoss.dongWuZhengBaBuyChallengesTimes(utils.Handler.create(this, function () {
                            _this.domainUpdateBuyTimes();
                        }));
                    }), null, null, true);
                }
                this.updateTabBtnsRed();
            };
            CopyFightBossDialog.prototype.domainUpdateBuyTimes = function () {
                if (this.currState == "domain") {
                    this.labDomainCount.text = GameModels.copyBoss.domainBossCount + "/" + GameModels.copyBoss.domainRefreshNum;
                    if (GameModels.vip.getRewardBuyType(6)) {
                        this.btnSaoDang.label = Language.C_SD + "(" + GameModels.copyBoss.domainBossCount + ")";
                    }
                    else {
                        this.btnSaoDang.label = Language.C_SD + "(" + GameModels.copyBoss.godDomainQuickPassLeftTimes + ")";
                    }
                    var leftBuyCount = GameModels.copyBoss.domainBuyMaxNum - GameModels.copyBoss.domainBossCanBuyCount;
                    if (leftBuyCount < 0)
                        leftBuyCount = 0;
                    this.labLeftBuyCount.text = Language.getExpression(Language.E_SYGMCS, leftBuyCount);
                }
                else if (this.currState == "person") {
                    this.labDomainCount.text = GameModels.copyBoss.personaBossCount + "/" + GameModels.copyBoss.personaRefreshNum;
                    var leftBuyCount = GameModels.copyBoss.personaBuyMaxNum - GameModels.copyBoss.personaBossBuyCount;
                    if (leftBuyCount < 0)
                        leftBuyCount = 0;
                    this.labLeftBuyCount.text = Language.getExpression(Language.E_SYGMCS, leftBuyCount);
                }
                else if (this.currentState == "every") {
                    this.labCount.text = GameModels.copyBoss.everyBossCount + "/" + GameModels.copyBoss.everyBossRefreshNum;
                    if (GameModels.vip.getRewardBuyType(6)) {
                        this.btnSaoDang.label = Language.C_SD + "(" + GameModels.copyBoss.everyBossCount + ")";
                    }
                    else {
                        this.btnSaoDang.label = Language.C_SD + "(" + GameModels.copyBoss.publicBossQuickPassLeftTimes + ")";
                    }
                    var leftBuyCount = GameModels.copyBoss.everyBossBuyMax - GameModels.copyBoss.everyBossBuyCount;
                    if (leftBuyCount < 0)
                        leftBuyCount = 0;
                    this.labLeftBuyCount.text = Language.getExpression(Language.E_SYGMCS, leftBuyCount);
                }
                else if (this.currentState == "fantasy") {
                    this.fantasyCount.text = "" + GameModels.copyBoss.dongWuZhengBaBossCount + "/" + GameModels.copyBoss.dongWuZhengBaBossRefreshNum;
                }
            };
            CopyFightBossDialog.prototype.touchHandler = function (e) {
                switch (e.currentTarget) {
                    case this.btnSelf:
                        if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.copyboss, 0, true))
                            return;
                        this.updateState("person");
                        break;
                    case this.btnPerson:
                        if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.copyboss, 1, true))
                            return;
                        this.updateState("every");
                        break;
                    // case this.btnCity:
                    //     if (!mg.uiManager.checkFuncOpen(s.UserfaceName.copyboss, 6, true)) return;
                    //     this.updateState("city");
                    //     break;
                    // case this.btnLose:
                    //     if (!mg.uiManager.checkFuncOpen(s.UserfaceName.copyboss, 4, true)) return;
                    //     this.currentState = "lose";
                    //     // this._imagExhibitor.reset();
                    //     this.updateStateToLose();
                    //     break;
                    // case this.btnFamily:
                    //     if (!mg.uiManager.checkFuncOpen(s.UserfaceName.copyboss, 3, true)) return;
                    //     this.currentState = "family";
                    //     // this._imagExhibitor.reset();
                    //     this.updateStateToFamily(this._vipTab);
                    //     break;
                    case this.btnDomain:
                        //开服第三天且等级达到神5开启
                        // if (GameModels.activity.kaifuDay < 3 || GameModels.user.myConfigLevel < 5080) {
                        //     mg.alertManager.tip(Language.getExpression(Language.E_KFD1TKQ, 3, 5), 0xff0000);
                        //     return;
                        // }
                        if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.copyboss, 2, true))
                            return;
                        this.updateState("domain");
                        break;
                    // case this.btnFantasy:
                    //     //开服第五天且等级达到神3开启
                    //     // if (GameModels.activity.kaifuDay < 5 || GameModels.user.myConfigLevel < 3080) {
                    //     //     mg.alertManager.tip(Language.getExpression(Language.E_KFD1TKQ, 5, 3), 0xff0000);
                    //     //     return;
                    //     // }
                    //     if (!mg.uiManager.checkFuncOpen(s.UserfaceName.copyboss, 5, true)) return;
                    //     this.currentState = "fantasy";
                    //     this.updateStateToFantasy();
                    //     break;
                    case this.labAutoSetting:
                        if (GameModels.user.player.vip < 6) {
                            mg.alertManager.tip(Language.J_VIPDJBZ);
                            return;
                        }
                        mg.alertManager.showAlert(explore.EveryAutoAlert, true);
                        break;
                }
                this.invalidateProperties();
            };
            CopyFightBossDialog.prototype.onSelectBoss = function (index) {
                // this._imagExhibitor.selectedIndex = index;
                // this._imagExhibitor.y = this.labBossName.y - 150;
                var data = this.listBoss.selectedItem;
                // this.imgSelected.visible = data.isRemind;
                // this.btnHint.visible = !data.stateLock;
                this.btnEnter.visible = true;
                this.labText.visible = true;
                this.labDomainCount.visible = true;
                this.labCount.visible = true;
                this.btnAddNum.visible = GameModels.platform.isPay;
                this.imgsmallBg.visible = true;
                this.imgsmallIcon.visible = true;
                this.labLeftBuyCount.visible = true;
                // if (data.step == 901) {
                //     if (!GameModels.vip.isOpenMonth) {
                //         this.btnEnter.label = Language.J_YKKQ;
                //     }
                // }
                // else if (data.step == 902) {
                //     if (!GameModels.vip.isOpenPrivilege) {
                //         this.btnEnter.label = Language.J_ZZKKQ;
                //     }
                // }
                // if (parseInt(data.template.parm2) > GameModels.serverTime.kaifuDay) {
                //     this.btnEnter.label = Language.getExpression(Language.E_KFD1WT, parseInt(data.template.parm2))
                //     this.btnEnter.filters = utils.filterUtil.grayFilters;
                //     this.btnEnter.touchEnabled = false;
                // }
                if (this.currentState == "person") {
                    var boosList = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_PERSONAL);
                    if (this._curCityBoss > 0) {
                        for (var i = 0; i < boosList.length; i++) {
                            if (boosList[i].templateBoss.id == this._curCityBoss) {
                                this.listBoss.selectedIndex = i;
                                data = this.listBoss.selectedItem;
                                this._curCityBoss = 0;
                                break;
                            }
                        }
                    }
                    // this.btnEnter.filters = data.stateLock ? utils.filterUtil.grayFilters : null;
                    // this.btnEnter.touchEnabled = data.stateLock ? false : true;
                    var personDonekilled = data.personDoneKilled == 0;
                    this.labIsFirst.visible = personDonekilled;
                    this.labText.visible = !personDonekilled;
                    this.labDomainCount.visible = !personDonekilled;
                    this.btnAddNum.visible = !personDonekilled && GameModels.platform.isPay;
                    this.imgsmallBg.visible = !personDonekilled;
                    this.imgsmallIcon.visible = !personDonekilled;
                    this.labLeftBuyCount.visible = !personDonekilled;
                    var tempCity = Templates.getTemplateById(templates.Map.MAINCITY, data.cityId);
                    if (data.stateLock) {
                        this.labTiaoJian.text = tempCity.name + Language.C_KQ;
                    }
                    else {
                        this.labTiaoJian.text = "";
                    }
                }
                else if (this.currentState == "every") {
                    var boosList = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_EVERYONE, 1, true);
                    if (this._curCityBoss > 0) {
                        for (var i = 0; i < boosList.length; i++) {
                            if (boosList[i].templateBoss.id == this._curCityBoss) {
                                this.listBoss.selectedIndex = i;
                                data = this.listBoss.selectedItem;
                                this._curCityBoss = 0;
                                break;
                            }
                        }
                    }
                    var everyDonekilled = data.everyDoneKilled == 0;
                    this.labIsFirst.visible = everyDonekilled;
                    this.labText.visible = !everyDonekilled;
                    this.labCount.visible = !everyDonekilled;
                    this.btnAddNum.visible = !everyDonekilled && GameModels.platform.isPay;
                    this.labRestore.visible = !everyDonekilled;
                    this.btnSaoDang.visible = !everyDonekilled;
                    this.imgsmallBg.visible = !everyDonekilled;
                    this.imgsmallIcon.visible = !everyDonekilled;
                    this.labLeftBuyCount.visible = !everyDonekilled;
                    if (this.progressHonour1) {
                        this.progressHonour1.labelDisplay.strokeColor = 0x0;
                        this.progressHonour1.labelDisplay.stroke = 2;
                        this.progressHonour1.maximum = utils.htmlUtil.getTemplateAndNameToValue(data.templateBoss.properties, "HP");
                        this.progressHonour1.value = data.bossHP;
                    }
                }
                else if (this.currentState == "city") {
                    if (this._curCityBoss > 0) {
                        this.listBoss.selectedIndex = this._curCityBoss;
                        data = this.listBoss.selectedItem;
                        this._curCityBoss = 0;
                    }
                    this.speakLabel.text = GameModels.copyBoss.getBossSpeak(data);
                    this.tweenStart();
                    this.btnEnter.label = Language.C_QWZZ;
                    this.btnEnter.filters = null;
                    this.btnEnter.touchEnabled = true;
                    this.progressHonour.maximum = data.maxAngry;
                    this.progressHonour.value = data.curAngry;
                    var copyVO = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_EVERYONE, 1, true);
                    if (this.progressHonour.labelDisplay) {
                        this.progressHonour.labelDisplay.strokeColor = 0x0;
                        this.progressHonour.labelDisplay.stroke = 2;
                    }
                    var cdtime = 0;
                    if (data.step == 99) {
                        var s = data.template.parm1.split(";");
                        var count = 0;
                        for (var i = 0; i < s.length; i++) {
                            count = count + parseInt(s[i]);
                        }
                        cdtime = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_EVERYONE, 1, true)[Math.floor(count / s.length)].template.limitTime * (data.maxAngry - data.curAngry);
                        this.conditionLab.text = Language.getExpression(Language.E_HDFN1, convert.getLevelName(data.openLevel));
                        cdtime = cdtime / 10;
                    }
                    else {
                        var time = 0;
                        for (var i = 0; i < copyVO.length; i++) {
                            if (parseInt(data.template.parm1) == copyVO[i].template.step) {
                                time = copyVO[i].template.limitTime;
                            }
                        }
                        cdtime = time * (data.maxAngry - data.curAngry);
                        this.conditionLab.text = Language.getExpression(Language.E_HDFN2, convert.getLevelName(data.openLevel));
                    }
                    if (cdtime > 0) {
                        this.btnEnter.visible = false;
                        this.refreshLab.visible = true;
                    }
                    else {
                        this.refreshLab.visible = false;
                        this.btnEnter.visible = true;
                    }
                    var date = new Date();
                    date.setTime(Number(GameModels.timer.getTimer() + cdtime * 1000));
                    this.refreshLab.text = Language.J_YJSXSJ + ":" + utils.DateUtil.formatDateInChinese(date, false);
                    // this._imagExhibitor.y = this.labBossName.y - 150;
                }
                else if (this.currentState == "domain") {
                    if (this.progressHonour1) {
                        this.progressHonour1.labelDisplay.strokeColor = 0x0;
                        this.progressHonour1.labelDisplay.stroke = 2;
                        this.progressHonour1.maximum = utils.htmlUtil.getTemplateAndNameToValue(data.templateBoss.properties, "HP");
                        this.progressHonour1.value = data.bossHP;
                    }
                    this.btnSaoDang.visible = !data.stateLock;
                }
                /**1111111111111111 */
                utils.timer.clear(this, this.refreshLastTime);
                if (data.isBossKilled) {
                    // this.btnEnter.label = Language.C_YJS1;
                    // this.btnEnter.filters = utils.filterUtil.grayFilters;
                    // this.btnEnter.touchEnabled = false;
                    this._lastTime = data.bossCd - (GameModels.timer.getTimer() * .001) >> 0;
                    if (this._lastTime > 0) {
                        this.btnEnter.label = utils.DateUtil.formatTimeLeft(this._lastTime) + Language.J_HCX;
                        utils.timer.loop(1000, this, this.refreshLastTime);
                    }
                }
                else if (data.stateLock) {
                    if (data.type == mo.ModelGameBoss.COPY_EVERYONE && data.openLevel <= 20) {
                        this.btnEnter.label = Language.J_ZXRWKQ;
                    }
                    else {
                        if (data.type == mo.ModelGameBoss.COPY_PERSONAL) {
                            this.btnEnter.label = data.stateLock ? Language.C_QWGCJS : Language.C_TZ;
                        }
                        else if (data.type == mo.ModelGameBoss.COPY_EVERYONE) {
                            this.btnEnter.label = data.stateLock ? Language.getExpression(Language.E_1HKQ, convert.getLevelName(data.openLevel)) : Language.C_TZ;
                        }
                        else {
                            this.btnEnter.label = Language.getExpression(Language.E_1HKQ, convert.getLevelName(data.openLevel));
                        }
                    }
                    this.btnEnter.filters = utils.filterUtil.grayFilters;
                    this.btnEnter.touchEnabled = false;
                }
                else {
                    this.btnEnter.label = Language.C_TZ;
                    this.btnEnter.filters = null;
                    this.btnEnter.touchEnabled = true;
                }
                if (data.type == mo.ModelGameBoss.COPY_PERSONAL) {
                    if (!data.stateLock && data.personDoneKilled != 0) {
                        if (GameModels.user.player.level < 50) {
                            this.btnEnter.label = Language.C_TZ;
                        }
                        else {
                            this.btnEnter.label = Language.C_SD;
                        }
                    }
                }
                /*1111111111111111*/
                // this.imgModel.source = ResPath.getShowBossPath(data.bossShowId);
                // var point: any = GameModels.copyBoss.getShowPoint(data.bossShowId);
                // this.imgModel.x = this.CENTRALITY_X - 600 + point.x;
                // this.imgModel.y = this.CENTRALITY_Y - 600 + point.y;
                this.body.setPetBody(data.templateBoss.petId.toString(), false, false);
                var itemVo = [];
                var str = this.listBoss.selectedItem.template.dropShow.split(";");
                for (var i = 0; i < str.length; i++) {
                    itemVo.push(vo.fromPool(vo.ItemVO, (str[i] + "_0")));
                }
                if (itemVo) {
                    itemVo.sort(function (a, b) {
                        return b.quality - a.quality;
                    });
                }
                this._itemCollection.source = itemVo;
                this.listItems.dataProvider = this._itemCollection;
            };
            CopyFightBossDialog.prototype.refreshLastTime = function () {
                if (this._lastTime <= 0) {
                    utils.timer.clear(this, this.refreshLastTime);
                    this.btnEnter.label = Language.C_TZ;
                    return;
                }
                this.btnEnter.label = utils.DateUtil.formatTimeLeft(this._lastTime) + Language.J_HCX;
                this._lastTime--;
            };
            CopyFightBossDialog.prototype.updateState = function (state) {
                // this._imagExhibitor.visible = true;
                this.currentState = state;
                var index = 0;
                var copyVo = [];
                switch (state) {
                    case "person":
                        copyVo = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_PERSONAL);
                        this.domainUpdateBuyTimes();
                        break;
                    case "every":
                        copyVo = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_EVERYONE, 1, true);
                        this.domainUpdateBuyTimes();
                        if (this._everyrestoreTime > 0)
                            this.labRestore.text = '(' + Language.getExpression(Language.E_1MHFF, utils.DateUtil.formatTimeLeft(this._everyrestoreTime)) + ')';
                        else
                            this.labRestore.text = "";
                        break;
                    // case "city":
                    //     this._bossCollection.source = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_CITY);
                    //     break;
                    case "domain":
                        copyVo = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_DOMAIN, 1, true);
                        this.domainUpdateBuyTimes();
                        break;
                }
                this._bossCollection.source = copyVo;
                if (GameModels.user.player.level > 100) {
                    for (var i = 0; i < copyVo.length; i++) {
                        if (!copyVo[i].stateLock) {
                            index = i;
                        }
                    }
                }
                this.dispatchEventWith(CopyFightBossDialog.CHANG_TAL);
                this._scrollerBinder.initialize(this.bossScroller, this.listBoss, this.btnPrev, this.btnNext);
                this.listBoss.selectedIndex = index; // 默认选中第一个BOSS
                this.onSelectBoss(0);
                this.listBoss.dispatchEventWith(egret.Event.CHANGING, false, true);
                this.bossScroller.stopAnimation();
                this.updateScrollH(this.listBoss.selectedIndex * 121);
            };
            CopyFightBossDialog.prototype.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
                if (this.listBoss.selectedItem) {
                    var copyvo = this.listBoss.selectedItem;
                    // this.imgModel.source = ResPath.getShowBossPath(copyvo.bossShowId);
                    // var point: any = GameModels.copyBoss.getShowPoint(copyvo.bossShowId);
                    // this.imgModel.x = this.CENTRALITY_X - 600 + point.x;
                    // this.imgModel.y = this.CENTRALITY_Y - 600 + point.y;
                    this.body.setPetBody(copyvo.templateBoss.petId.toString(), false, false);
                }
                if (this.currentState == "every") {
                    this.labCount.text = GameModels.copyBoss.everyBossCount + "/" + GameModels.copyBoss.everyBossRefreshNum;
                    if (GameModels.vip.getRewardBuyType(6)) {
                        this.btnSaoDang.label = Language.C_SD + "(" + GameModels.copyBoss.everyBossCount + ")";
                    }
                    else {
                        this.btnSaoDang.label = Language.C_SD + "(" + GameModels.copyBoss.publicBossQuickPassLeftTimes + ")";
                    }
                    this.labLeftBuyCount.text = Language.getExpression(Language.E_SYGMCS, GameModels.copyBoss.everyBossBuyMax - GameModels.copyBoss.everyBossBuyCount);
                    var data = this.listBoss.selectedItem;
                    // this.imgSelected.visible = Boolean(this.listBoss.selectedItem.isRemind);
                    // this.btnHint.visible = !data.stateLock;
                    // var everyDonekilled: boolean = data.everyDoneKilled == 0;
                    // this.labText.visible = !everyDonekilled;
                    // this.labCount.visible = !everyDonekilled;
                    // this.btnAddNum.visible = !everyDonekilled;
                    // this.labRestore.visible = !everyDonekilled;
                    if (this.progressHonour1) {
                        this.progressHonour1.labelDisplay.strokeColor = 0x0;
                        this.progressHonour1.labelDisplay.stroke = 2;
                        this.progressHonour1.maximum = utils.htmlUtil.getTemplateAndNameToValue(data.templateBoss.properties, "HP");
                        this.progressHonour1.value = data.bossHP;
                    }
                }
                if (this.currentState == "person") {
                    this.labDomainCount.text = GameModels.copyBoss.personaBossCount + "/" + GameModels.copyBoss.personaRefreshNum;
                    this.labLeftBuyCount.text = Language.getExpression(Language.E_SYGMCS, GameModels.copyBoss.personaBuyMaxNum - GameModels.copyBoss.personaBossBuyCount);
                    var data = this.listBoss.selectedItem;
                    var personDonekilled = data.personDoneKilled == 0;
                    this.labIsFirst.visible = personDonekilled;
                    this.labText.visible = !personDonekilled;
                    this.labDomainCount.visible = !personDonekilled;
                    this.btnAddNum.visible = !personDonekilled && GameModels.platform.isPay;
                }
                if (this.currentState == "domain") {
                    this.labDomainCount.text = GameModels.copyBoss.domainBossCount + "/" + GameModels.copyBoss.domainRefreshNum;
                    if (GameModels.vip.getRewardBuyType(6)) {
                        this.btnSaoDang.label = Language.C_SD + "(" + GameModels.copyBoss.domainBossCount + ")";
                    }
                    else {
                        this.btnSaoDang.label = Language.C_SD + "(" + GameModels.copyBoss.godDomainQuickPassLeftTimes + ")";
                    }
                    this.labLeftBuyCount.text = Language.getExpression(Language.E_SYGMCS, GameModels.copyBoss.domainBuyMaxNum - GameModels.copyBoss.domainBossCanBuyCount);
                    var data = this.listBoss.selectedItem;
                    if (this.progressHonour1) {
                        this.progressHonour1.labelDisplay.strokeColor = 0x0;
                        this.progressHonour1.labelDisplay.stroke = 2;
                        this.progressHonour1.maximum = utils.htmlUtil.getTemplateAndNameToValue(data.templateBoss.properties, "HP");
                        this.progressHonour1.value = data.bossHP;
                    }
                    this.btnSaoDang.visible = !data.stateLock;
                }
                this.dispatchEventWith(CopyFightBossDialog.CHANG_BOSS);
            };
            Object.defineProperty(CopyFightBossDialog.prototype, "currState", {
                get: function () {
                    return this.currentState;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CopyFightBossDialog.prototype, "bossSelectedIndex", {
                get: function () {
                    // return this._imagExhibitor.selectedIndex;
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            CopyFightBossDialog.prototype.updateStateToLose = function () {
                this.labText.visible = true;
                this.btnAddNum.visible = GameModels.platform.isPay;
                // this._imagExhibitor.visible = false;
                for (var i = 0; i < 6; i++) {
                    this['rewardItem' + i].initializeData(GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_LOSE)[i]);
                }
                this.loseCount.text = GameModels.copyBoss.zhuLuZhongYuanBossCount + "/" + GameModels.copyBoss.zhuLuZhongYuanRefreshNum;
            };
            CopyFightBossDialog.prototype.loseClear = function () {
                for (var i = 0; i < 6; i++) {
                    this['rewardItem' + i].clear();
                }
            };
            CopyFightBossDialog.prototype.tweenStart = function () {
                egret.Tween.removeTweens(this.speakGroup);
                this.speakGroup.scaleX = this.speakGroup.scaleY = 0.3;
                egret.Tween.get(this.speakGroup).to({ scaleX: 1, scaleY: 1 }, 1500, utils.Ease.elasticOut);
            };
            /**boss之家 */
            CopyFightBossDialog.prototype.updateStateToFamily = function (vipLevel) {
                if (vipLevel === void 0) { vipLevel = 1; }
                this.labDomainCount.visible = true;
                this.labText.visible = true;
                this.btnAddNum.visible = GameModels.platform.isPay;
                GameModels.copyBoss.requestFamilyBossCopyInfo(null);
                // this._imagExhibitor.visible = false;
                this._bossFamilyCollection.source = GameModels.copyBoss.getFamilyBossByVipLevel(vipLevel);
                this.rendererList.dataProvider = this._bossFamilyCollection;
                if (this.currentState == "family") {
                    this.labDomainCount.text = GameModels.copyBoss.pingDingShuZhongBossCount + "/" + GameModels.copyBoss.pingDingShuZhongRefreshNum;
                }
            };
            /**幻界禁地 */
            CopyFightBossDialog.prototype.updateStateToFantasy = function () {
                this.labText.visible = true;
                this.btnAddNum.visible = GameModels.platform.isPay;
                this.fantasyCount.text = "" + GameModels.copyBoss.dongWuZhengBaBossCount + "/" + GameModels.copyBoss.dongWuZhengBaBossRefreshNum;
                this.fantasyCopyList();
                var fantasyCopyList = this._fantasyCopyList;
                var level = GameModels.user.player.level;
                if (fantasyCopyList && fantasyCopyList.length) {
                    for (var i = 0; i < fantasyCopyList.length; i++) {
                        if (i < 3) {
                            this._fantasyItems[i].data = fantasyCopyList[i];
                            // this._boxChecked[i].selected = fantasyCopyList[i].isRemind;
                            this._boxChecked[i].currentState = fantasyCopyList[i].isRemind ? "down" : "up";
                            if (level >= fantasyCopyList[i].openLevel && level <= fantasyCopyList[i].endLevel) {
                                this._imgFantasyImg[i].visible = false;
                            }
                        }
                        else {
                            this._fantasyHpItems[i - 3].data = fantasyCopyList[i];
                            if (level >= fantasyCopyList[i].openLevel && level <= fantasyCopyList[i].endLevel) {
                                this["imgHouse" + (i + 3)].visible = false;
                                this._curHouseCopyVo = fantasyCopyList[i];
                                // this._boxChecked[3].selected = this._curHouseCopyVo.isRemind;
                                this._boxChecked[3].currentState = this._curHouseCopyVo.isRemind ? "down" : "up";
                            }
                        }
                    }
                }
            };
            CopyFightBossDialog.prototype.updataList = function (vipLevel) {
                this._bossFamilyCollection.itemUpdated(null);
                this.updateStateToFamily(vipLevel);
            };
            CopyFightBossDialog.prototype.familyBtnHandler = function (e) {
                switch (e.currentTarget) {
                    case this.familyTab_0:
                        this.updataList(1);
                        this._vipTab = 1;
                        this.family_tab_0.visible = true;
                        this.family_tab_1.visible = false;
                        this.family_tab_2.visible = false;
                        break;
                    case this.familyTab_1:
                        this.updataList(3);
                        this._vipTab = 3;
                        this.family_tab_0.visible = false;
                        this.family_tab_1.visible = true;
                        this.family_tab_2.visible = false;
                        break;
                    case this.familyTab_2:
                        this.updataList(5);
                        this._vipTab = 5;
                        this.family_tab_0.visible = false;
                        this.family_tab_1.visible = false;
                        this.family_tab_2.visible = true;
                        break;
                }
            };
            CopyFightBossDialog.prototype.updateFamilyTime = function () {
                var time = GameModels.copyBoss.getFamilyBossTime();
                var str = utils.DateUtil.formatTimeLeft(time);
                this.familytime.text = Language.getExpression(Language.E_1HSX, str);
            };
            CopyFightBossDialog.prototype.updateFamilyRefresh = function () {
                if (this._ifRefresh && this.currentState == "family") {
                    this.updateStateToFamily(this._vipTab);
                    this._ifRefresh = false;
                }
            };
            CopyFightBossDialog.prototype.fantasyCopyList = function () {
                var copyList = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_FANTASY);
                var fantasyCopyList = [];
                for (var _i = 0, copyList_1 = copyList; _i < copyList_1.length; _i++) {
                    var copyVO = copyList_1[_i];
                    if (copyVO.step < 10) {
                        fantasyCopyList.push(copyVO);
                    }
                    else {
                        if (GameModels.user.player.zhuanShenLevel >= 13) {
                            if (copyVO.step > 15) {
                                fantasyCopyList.push(copyVO);
                            }
                        }
                        else {
                            if (copyVO.step <= 15) {
                                fantasyCopyList.push(copyVO);
                            }
                        }
                    }
                }
                this._fantasyCopyList = fantasyCopyList;
            };
            CopyFightBossDialog.prototype.updateScrollH = function (maxLength) {
                this.listBoss.validateNow();
                var pos = maxLength - 300 + 46;
                var maxScrollV = this.listBoss.contentHeight - 633;
                if (pos <= 0)
                    pos = 0;
                else if (pos >= maxScrollV)
                    pos = maxScrollV;
                this.rollScroller(pos);
            };
            /**滚动条滚动到指定位置 */
            CopyFightBossDialog.prototype.rollScroller = function (pos, duration) {
                if (duration === void 0) { duration = 200; }
                egret.Tween.get(this.bossScroller.viewport).to({ scrollV: pos }, duration);
            };
            CopyFightBossDialog.prototype.showChangeShopView = function (e) {
                mg.uiManager.show(dialog.shop.MallChangeShopMain);
            };
            /**标签改变 */
            CopyFightBossDialog.CHANG_TAL = "CHANG_TAL";
            /**BOSS改变 */
            CopyFightBossDialog.CHANG_BOSS = "CHANG_BOSS";
            return CopyFightBossDialog;
        }(ui.CopyFightBossSkin));
        explore.CopyFightBossDialog = CopyFightBossDialog;
        __reflect(CopyFightBossDialog.prototype, "dialog.explore.CopyFightBossDialog");
    })(explore = dialog.explore || (dialog.explore = {}));
})(dialog || (dialog = {}));

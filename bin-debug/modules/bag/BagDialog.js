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
    var bag;
    (function (bag) {
        var BagDialog = (function (_super) {
            __extends(BagDialog, _super);
            function BagDialog() {
                var _this = _super.call(this) || this;
                _this._seleceIndex = -1;
                return _this;
            }
            BagDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._stack = this.addChild(new eui.ViewStack());
                this._stack.touchEnabled = false;
                this._stack.addChild(this.item1);
                this._stack.addChild(this.item2);
                this._stack.addChild(this.item3);
                this._stack.addChild(this.item6);
                this._stack.addChild(this.item5);
                this.listEquipts.useVirtualLayout = true;
                this.listProp.useVirtualLayout = true;
                this.listPet.useVirtualLayout = true;
                this.listBingFa.useVirtualLayout = true;
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._tabBtns = [this.btnEquipt, this.btnProp, this.btnSuiPian, this.btnBingFa, this.btnHeCheng];
                this._btnArr = [this.btn0, this.btn1];
                this._labArr = [this.lab0, this.lab1];
                GameModels.state.registerWarnTarget(GameRedState.BAG_USABLE_PROP, this.btnProp);
                GameModels.state.registerWarnTarget(GameRedState.BAG_EQUIP, this.btnEquipt);
                GameModels.state.registerWarnTarget(GameRedState.BAG_EQUIP_SMELTING, this.btnRonglian);
                GameModels.state.registerWarnTarget(GameRedState.BAG_PET, this.btnSuiPian);
                GameModels.state.registerWarnTarget(GameRedState.BAG_HECHENG, this.btnHeCheng);
            };
            BagDialog.prototype.enter = function (data) {
                mg.soundManager.playViewLongSound("SoundJM_17", "BAG");
                this._currPos = 0;
                this._index = 0;
                this._currUseItemIsShow = "0";
                this._heChengIndex = data && data.hasOwnProperty("param") ? data.param : 0;
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                this.onRefreshEqiup(null);
                this.btnEquipt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnProp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnSuiPian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnBingFa.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnHeCheng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnRonglian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openMelting, this);
                this.listProp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPropBegin, this);
                this.listProp.addEventListener(egret.TouchEvent.TOUCH_END, this.onPropEnd, this);
                this.btnAddCount.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addCapacity, this);
                this.listPet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPropBegin, this);
                this.listPet.addEventListener(egret.TouchEvent.TOUCH_END, this.onPropEnd, this);
                GameModels.bag.equips.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onRefreshEqiup, this);
                GameModels.bag.petSui.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onRefreshPetSui, this);
                GameModels.bag.bingFa.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onRefreshBingFa, this);
                GameModels.bag.animalSui.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onRefreshAnimalSui, this);
                GameModels.equip.addEventListener(mo.ModelEquip.LOCK_EQUIP_CHANGE, this.onRefreshEqiup, this);
                this.btnGetDebris.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetClick, this);
                GameModels.user.player.onPropertyChange(TypeProperty.MOJING_ID, this, this.showMoJing);
                this.btnAuction.addEventListener(egret.TouchEvent.TOUCH_END, this.onTradingSellClick, this);
                this.btnLog.addEventListener(egret.TouchEvent.TOUCH_END, this.onTradingSellClick, this);
                this.listTrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.helpClick, this);
                this.listBingFa.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPropBegin, this);
                this.listBingFa.addEventListener(egret.TouchEvent.TOUCH_END, this.onPropEnd, this);
                GameModels.tradingSell.addEventListener(mo.ModelTradingSell.TRADINGSELL_BUY_CHANGE, this.updataTradingSellView, this);
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSuiPianBtnClick, this);
                }
                GameModels.bag.addEventListener(mo.ModelBag.HECHENG_CHANG, this.updataSuiPianRedPoint, this);
                GameModels.bag.addEventListener(mo.ModelBag.PETRANDOMHECHENG_CHANG, this.updataSuiPianRedPoint, this);
                if (this.scroller1.verticalScrollBar) {
                    this.scroller1.verticalScrollBar.autoVisibility = this.scroller2.verticalScrollBar.autoVisibility = this.scroller3.verticalScrollBar.autoVisibility = this.scrollerBingFa.verticalScrollBar.autoVisibility = false;
                    this.scroller1.verticalScrollBar.visible = this.scroller2.verticalScrollBar.visible = this.scroller3.verticalScrollBar.visible = this.scrollerBingFa.verticalScrollBar.visible = false;
                }
            };
            BagDialog.prototype.exit = function () {
                GameModels.bag.isOpenPetBag = false;
                this.btnEquipt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnProp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnSuiPian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnBingFa.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnHeCheng.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnRonglian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openMelting, this);
                this.listProp.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPropBegin, this);
                this.listProp.removeEventListener(egret.TouchEvent.TOUCH_END, this.onPropEnd, this);
                this.btnAddCount.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addCapacity, this);
                this.listPet.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPropBegin, this);
                this.listPet.removeEventListener(egret.TouchEvent.TOUCH_END, this.onPropEnd, this);
                this.btnGetDebris.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetClick, this);
                GameModels.user.player.offPropertyChange(TypeProperty.MOJING_ID, this, this.showMoJing);
                this.btnAuction.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTradingSellClick, this);
                this.btnLog.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTradingSellClick, this);
                this.listTrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.helpClick, this);
                this.listBingFa.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPropBegin, this);
                this.listBingFa.removeEventListener(egret.TouchEvent.TOUCH_END, this.onPropEnd, this);
                GameModels.bag.removeEventListener(mo.ModelBag.HECHENG_CHANG, this.updataSuiPianRedPoint, this);
                GameModels.tradingSell.removeEventListener(mo.ModelTradingSell.TRADINGSELL_BUY_CHANGE, this.updataTradingSellView, this);
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSuiPianBtnClick, this);
                }
                this.clearList(this.listProp);
                this.clearList(this.listEquipts);
                this.clearList(this.listPet);
                this.clearList(this.listTrade);
                this.clearList(this.listBingFa);
                GameModels.bag.equips.removeEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onRefreshEqiup, this);
                GameModels.bag.petSui.removeEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onRefreshPetSui, this);
                GameModels.bag.bingFa.removeEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onRefreshBingFa, this);
                GameModels.bag.animalSui.removeEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onRefreshAnimalSui, this);
                GameModels.equip.removeEventListener(mo.ModelEquip.LOCK_EQUIP_CHANGE, this.onRefreshEqiup, this);
                GameModels.bag.removeEventListener(mo.ModelBag.PETRANDOMHECHENG_CHANG, this.updataSuiPianRedPoint, this);
                this._currUseItemIsShow = "0";
                if (this._itemUseData) {
                    n.MessagePool.to(this._itemUseData);
                    this._itemUseData = null;
                }
                this._seleceIndex = -1;
            };
            BagDialog.prototype.onTabChange = function (e) {
                this.onSelectChange(e.itemIndex);
            };
            BagDialog.prototype.addCapacity = function (e) {
                var priceConfig = GameModels.bag.getSlotPrice();
                if (priceConfig == null) {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.J_GZDDSX, TypeBtnLabel.OK);
                    return;
                }
                mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_SFXH1MJKQGZ, priceConfig), TypeBtnLabel.OK, null, utils.Handler.create(this, this.sendBuySlot));
            };
            BagDialog.prototype.sendBuySlot = function () {
                n.net.request(n.MessageMap.C2G_ITEM_OPENSLOT, n.MessagePool.from(n.C2G_Item_OpenSlot), utils.Handler.create(this, this.net_slotChange));
            };
            BagDialog.prototype.net_slotChange = function (data) {
                GameModels.bag.maxCapacity = data.MaxCapacity;
                this.onRefreshEqiup(null);
            };
            BagDialog.prototype.onTabClick = function (e) {
                var index = this._tabBtns.indexOf(e.target);
                if (index != -1)
                    this.onSelectChange(index);
                mg.soundManager.playSound('ButtonClick_1');
            };
            BagDialog.prototype.onSelectChange = function (index) {
                if (index == this._seleceIndex)
                    return;
                if (!TypeFunOpen.checkFuncOpen(this, index, true)) {
                    return;
                }
                this._tabBtns[this._stack.selectedIndex].currentState = "up";
                this._stack.selectedIndex = this._seleceIndex = index;
                this._tabBtns[index].currentState = "down";
                switch (this._seleceIndex) {
                    case 0:
                        this.listEquipts.dataProvider = new eui.ArrayCollection(GameModels.bag.baseEquips);
                        break;
                    case 1:
                        GameModels.bag.isOpenPetBag = true;
                        this.listProp.dataProvider = GameModels.bag.props;
                        break;
                    case 2:
                        GameModels.bag.isOpenPetBag = true;
                        this.updataSuiPianRedPoint();
                        this.showBtnView();
                        break;
                    case 3:
                        this.listBingFa.dataProvider = new eui.ArrayCollection(GameModels.bag.baseBingFa);
                        break;
                    case 4:
                        // this.showTradingSellView();
                        // this.btnIcon1.currentState = "down";
                        this.heChengView.enter(this._heChengIndex);
                        break;
                }
                this.dispatchEventWith(BagDialog.CHANG_TAL);
            };
            BagDialog.prototype.onTradingSellClick = function (e) {
                if (e.currentTarget == this.btnAuction) {
                    mg.uiManager.show(dialog.trading.TradingSellDialog);
                }
                else {
                    mg.uiManager.show(dialog.trading.TradingSellRecord);
                }
            };
            BagDialog.prototype.updataTradingSellView = function () {
                this.labNo.visible = GameModels.tradingSell.tradingSellListVO.length <= 0;
                this._listTrading.replaceAll(GameModels.tradingSell.tradingSellListVO);
            };
            BagDialog.prototype.showTradingSellView = function () {
                var _this = this;
                this.showMoJing();
                GameModels.tradingSell.requestTradingSellList(utils.Handler.create(this, function () {
                    if (!_this._listTrading) {
                        _this._listTrading = new eui.ArrayCollection(GameModels.tradingSell.tradingSellListVO);
                    }
                    else {
                        _this._listTrading.source = GameModels.tradingSell.tradingSellListVO;
                    }
                    _this.listTrade.dataProvider = _this._listTrading;
                    _this.labNo.visible = GameModels.tradingSell.tradingSellListVO.length <= 0;
                }));
            };
            BagDialog.prototype.onBuyClick = function (e) {
                var _this = this;
                if (e.target instanceof components.SnapButton) {
                    var item_1 = this.listTrade.selectedItem;
                    if (item_1.playerId == GameModels.user.player.uid) {
                        GameModels.tradingSell.requestCancelSell(item_1.orderId, utils.Handler.create(this, function () {
                            _this.updataTradingSellView();
                        }));
                    }
                    else {
                        //购买
                        mg.alertManager.showAlert(dialog.trading.TradingSellBuyTip, true, true, item_1);
                    }
                }
            };
            BagDialog.prototype.onGetClick = function () {
                mg.uiManager.show(MallScene, { tabIndex: 4 }, true);
            };
            BagDialog.prototype.showMoJing = function () {
                this.labCount1.text = "" + GameModels.user.player.mojing;
            };
            BagDialog.prototype.onRefreshEqiup = function (e) {
                this.labCount.text = GameModels.bag.equipCount + "/" + GameModels.bag.maxCapacity;
                if (this.listEquipts.dataProvider)
                    this.listEquipts.dataProvider.replaceAll(GameModels.bag.baseEquips);
            };
            BagDialog.prototype.onRefreshProps = function (e) {
                var items = GameModels.bag.props.source;
                this.listProp.dataProvider = new eui.ArrayCollection(items);
            };
            BagDialog.prototype.onRefreshPetSui = function (e) {
                if (this._index == 0) {
                    if (this.listPet.dataProvider)
                        this.listPet.dataProvider.replaceAll(GameModels.bag.basePetSui);
                }
            };
            BagDialog.prototype.onRefreshAnimalSui = function (e) {
                if (this._index == 1) {
                    if (this.listPet.dataProvider)
                        this.listPet.dataProvider.replaceAll(GameModels.bag.baseAnimalSui);
                }
            };
            BagDialog.prototype.onRefreshBingFa = function (e) {
                if (this.listBingFa.dataProvider)
                    this.listBingFa.dataProvider.replaceAll(GameModels.bag.baseBingFa);
            };
            BagDialog.prototype.onPropBegin = function (e) {
                this.mouseX = e.stageX;
                this.mouseY = e.stageY;
            };
            BagDialog.prototype.onPropEnd = function (e) {
                if (!(e.target instanceof renderer.ItemIconRenderer)) {
                    return;
                }
                if (Math.abs(this.mouseX - e.stageX) > 10 || Math.abs(this.mouseY - e.stageY) > 10) {
                    return;
                }
                var vo = e.target.data;
                /**兵法 */
                if (vo.templateProp.type == TypeItem.BINGFA_BOOK) {
                    mg.TipUpManager.instance.showTip(tipUps.BingFaAert, vo);
                    return;
                }
                /**武将碎片 */
                if (vo.templateProp.type == TypeItem.PET_SUI) {
                    return;
                }
                /**改名卡特殊处理 */
                if (vo.type == TypeItem.CHANGE_NAME) {
                    return;
                }
                if (vo.templateProp.mainType == TypeItem.MATERIAL) {
                    return;
                }
                if (vo.templateProp.mainType == TypeItem.DEBRIS) {
                    mg.alertManager.showAlert(SelectPropAlert, true, true, vo, utils.Handler.create(this, this.sendSelectProp));
                }
                if (vo.templateProp.mainType == TypeItem.TREASURE) {
                    mg.alertManager.showAlert(UsePropAlert, true, true, vo, utils.Handler.create(this, this.sendUseProp));
                }
            };
            BagDialog.prototype.sendUseProp = function (data, count) {
                this._currUseItemIsShow = data.templateProp.effectId;
                GameModels.bag.requestUseProp(data.index, count, data.splitType, utils.Handler.create(this, this.net_usePropCallback));
            };
            BagDialog.prototype.sendSelectProp = function (data, useCount, selectId) {
                GameModels.bag.requestSelectProp(data.index, useCount, selectId.toString(), utils.Handler.create(this, this.net_usePropCallback));
            };
            BagDialog.prototype.net_usePropCallback = function (data) {
                logger.log("道具使用成功！");
                if (data instanceof n.G2C_Item_Use) {
                    if (this._currUseItemIsShow == TypeBagGiftTip.EFFECT1) {
                        if (this._itemUseData) {
                            n.MessagePool.to(this._itemUseData);
                            this._itemUseData = null;
                        }
                        this._itemUseData = data;
                        this._itemUseData.autoRecover = false;
                        var tempData = [];
                        for (var i = 0; i < this._itemUseData.ItemIds.length; i++) {
                            tempData.push(this._itemUseData.ItemIds[i]);
                        }
                        mg.alertManager.showAlert(UsePropGetGift, true, true, tempData);
                    }
                }
                if (data.ItemIds.length > 10) {
                    data.ItemIds.length = 10;
                }
                mg.alertManager.showAlert(UsePropGetGift, true, true, data.ItemIds);
            };
            BagDialog.prototype.openMelting = function (e) {
                this._rolePos = 0;
                var equipHashRedPoint = false;
                for (var i = 0; i < 5; i++) {
                    equipHashRedPoint = GameModels.equip.checkEqiupRedPoint(i);
                    if (equipHashRedPoint) {
                        this._rolePos = i;
                        break;
                    }
                }
                if (equipHashRedPoint) {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.J_THCZ, TypeBtnLabel.GOTO_HUISHOU, utils.Handler.create(this, this.showBagRecycleView), utils.Handler.create(this, this.showRoleView));
                }
                else {
                    mg.uiManager.show(dialog.bag.BagRecycleDialog);
                }
                // mg.uiManager.remove(this);
            };
            BagDialog.prototype.showBagRecycleView = function () {
                mg.uiManager.show(dialog.bag.BagRecycleDialog);
            };
            BagDialog.prototype.showRoleView = function () {
                mg.uiManager.show(dialog.role.RoleMainDialog, { tabIndex: 0, param: this._rolePos });
            };
            Object.defineProperty(BagDialog.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BagDialog.prototype, "index", {
                /**武将碎片分页和宠物碎片分页 */
                get: function () {
                    return this._index;
                },
                enumerable: true,
                configurable: true
            });
            BagDialog.prototype.helpClick = function () {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 3501).des);
            };
            BagDialog.prototype.getIsCanHeChengPetSui = function (id) {
                this.listPet.validateNow();
                var items = GameModels.bag.basePetSui;
                if (id == 13018) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].id == "220018" && items[i].count >= 20) {
                            if (this.listPet.getChildAt(i)) {
                                return this.listPet.getChildAt(i).imgQuality;
                            }
                        }
                    }
                }
                return null;
            };
            BagDialog.prototype.showBtnView = function () {
                for (var i = 0; i < this._btnArr.length; i++) {
                    if (i == this._index) {
                        this._btnArr[i].currentState = "down";
                        this._labArr[i].textColor = 0xCCC6BA;
                    }
                    else {
                        this._btnArr[i].currentState = "up";
                        this._labArr[i].textColor = 0x969696;
                    }
                }
                this.showSuiPianList();
            };
            BagDialog.prototype.showSuiPianList = function () {
                if (this._index == 0) {
                    this.listPet.dataProvider = new eui.ArrayCollection(GameModels.bag.basePetSui);
                }
                else {
                    this.listPet.dataProvider = new eui.ArrayCollection(GameModels.bag.baseAnimalSui);
                }
            };
            BagDialog.prototype.onSuiPianBtnClick = function (e) {
                this._index = this._btnArr.indexOf(e.currentTarget);
                this.showBtnView();
                this.dispatchEventWith(BagDialog.CHANG_TAL);
            };
            BagDialog.prototype.updataSuiPianRedPoint = function () {
                this.imgRedPoint0.visible = GameModels.bag.checkPetHeCheng();
                this.imgRedPoint1.visible = GameModels.bag.checkAnimalHeCheng();
            };
            /**标签改变 */
            BagDialog.CHANG_TAL = "CHANG_TAL";
            return BagDialog;
        }(ui.BagSkin));
        bag.BagDialog = BagDialog;
        __reflect(BagDialog.prototype, "dialog.bag.BagDialog");
    })(bag = dialog.bag || (dialog.bag = {}));
})(dialog || (dialog = {}));

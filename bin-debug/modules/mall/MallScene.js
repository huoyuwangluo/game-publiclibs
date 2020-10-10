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
var MallScene = (function (_super) {
    __extends(MallScene, _super);
    function MallScene() {
        return _super.call(this) || this;
    }
    MallScene.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._togs = [this.btnMoShi, this.btnShenMi, this.btnShenBing, this.btnGuanXing, this.btnMingJiang];
        this._btnArr = [this.btn0, this.btn1, this.btn2, this.btn3, this.btn4];
        this._labArr = [this.lab0, this.lab1, this.lab2, this.lab3, this.lab4];
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
        this.listMoShi.itemRenderer = renderer.RechargeItem;
        this.listMoShi.dataProvider = this._moShiList = new eui.ArrayCollection([]);
        GameModels.state.registerWarnTarget(GameRedState.SHENMI_SHOP, this.btnShenMi);
        GameModels.state.registerWarnTarget(GameRedState.GUANXING_SHOP, this.btnGuanXing);
        GameModels.state.registerWarnTarget(GameRedState.MINGJIANG_SHOP, this.btnMingJiang);
    };
    MallScene.prototype.enter = function (data) {
        var _this = this;
        this.group.removeChildren();
        if (GameModels.platform.isPay) {
            this.group.addChild(this.btnMoShi);
            this.group.addChild(this.btnShenMi);
            this.group.addChild(this.btnShenBing);
            this.group.addChild(this.btnGuanXing);
            this.group.addChild(this.btnMingJiang);
        }
        else {
            this.group.addChild(this.btnShenMi);
            this.group.addChild(this.btnShenBing);
            this.group.addChild(this.btnGuanXing);
        }
        GameModels.shop.requestShenMiShopInfo(utils.Handler.create(this, function () {
            if (_this.currentState == "shenmi") {
                _this.showShenMiData();
            }
        }));
        GameModels.changeShop.requestStoreList(TypeShop.GUANXING_SHOP, utils.Handler.create(this, function (data) {
            if (_this.currentState == "duihuan") {
                _this.labMyValue.text = Language.C_WDJF + " : " + GameModels.user.player.getProperty(TypeProperty.GUANXING_JIFEN);
                _this.showJiFenData();
            }
        }));
        GameModels.changeShop.requestStoreList(TypeShop.MINGJIANG_SHOP, utils.Handler.create(this, function (data) {
            if (_this.currentState == "mingjiang") {
                var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.MINGJIANG_ITEM);
                _this.labMyValue.text = item.name + " : " + GameModels.bag.getItemCountById(ConfigData.MINGJIANG_ITEM);
                _this.showMingJiangData();
            }
        }));
        GameModels.smithy.requestSmithyGetShenBingList(utils.Handler.create(this, function (data) {
            if (_this.currentState == "shenbing") {
                var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.SHENBING_DUIHUAN);
                _this.labMyValue.text = item.name + " : " + GameModels.bag.getItemCountById(ConfigData.SHENBING_DUIHUAN);
                _this.showShenbingData();
            }
        }));
        //给控件注册点击事件
        this.btnShenMi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClick, this);
        this.btnMoShi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClick, this);
        this.btnGuanXing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClick, this);
        this.btnMingJiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClick, this);
        this.btnShenBing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClick, this);
        this.btnGetRongyi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRongyiClick, this);
        this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHelpClick, this);
        this.btnRefresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shenMiRefresh, this);
        GameModels.shop.addEventListener(mo.ModelShop.CHANEG_SHENMI_BUY_COUNT, this.updataRongYuList, this);
        GameModels.user.player.onPropertyChange(TypeProperty.GUANXING_JIFEN, this, this.updataJifen);
        GameModels.changeShop.addEventListener(mo.ModelChangeShop.CHANEG_ITEM_BUY_COUNT, this.updataJiFenList, this);
        GameModels.changeShop.addEventListener(mo.ModelChangeShop.CHANEG_SHOP_INFO, this.showJiFenData, this);
        GameModels.bag.onItemChange(ConfigData.MINGJIANG_ITEM, this, this.updataMingJiang);
        GameModels.changeShop.addEventListener(mo.ModelChangeShop.CHANEG_ITEM_BUY_COUNT, this.updataMingJiangList, this);
        GameModels.changeShop.addEventListener(mo.ModelChangeShop.CHANEG_SHOP_INFO, this.showMingJiangData, this);
        GameModels.bag.onItemChange(ConfigData.SHENBING_DUIHUAN, this, this.updataShenBing);
        GameModels.user.player.onPropertyChange(TypeProperty.VIP_LEVEL, this, this.onLevelChange);
        GameModels.user.player.onPropertyChange(TypeProperty.VIP_EXP, this, this.onLevelChange);
        this.btnVip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openVip, this);
        this.listMoShi.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTouch, this);
        if (GameModels.platform.isPay) {
            this.selectedTab(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
        }
        else {
            this.selectedTab(data && data.hasOwnProperty("tabIndex") ? (data.tabIndex == 0 || data.tabIndex == 4) ? 1 : data.tabIndex : 1);
        }
        for (var i = 0; i < this._btnArr.length; i++) {
            this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        }
    };
    MallScene.prototype.exit = function () {
        utils.timer.clear(this, this.refreshLastTime);
        this.btnShenMi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClick, this);
        this.btnMoShi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClick, this);
        this.btnGuanXing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClick, this);
        this.btnMingJiang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClick, this);
        this.btnShenBing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClick, this);
        this.btnGetRongyi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRongyiClick, this);
        this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHelpClick, this);
        GameModels.shop.removeEventListener(mo.ModelShop.CHANEG_SHENMI_BUY_COUNT, this.updataRongYuList, this);
        this.btnRefresh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shenMiRefresh, this);
        GameModels.user.player.offPropertyChange(TypeProperty.GUANXING_JIFEN, this, this.updataJifen);
        GameModels.shop.removeEventListener(mo.ModelChangeShop.CHANEG_ITEM_BUY_COUNT, this.updataJiFenList, this);
        GameModels.shop.removeEventListener(mo.ModelChangeShop.CHANEG_SHOP_INFO, this.showJiFenData, this);
        GameModels.bag.offItemChange(ConfigData.MINGJIANG_ITEM, this, this.updataMingJiang);
        GameModels.shop.removeEventListener(mo.ModelChangeShop.CHANEG_ITEM_BUY_COUNT, this.updataMingJiangList, this);
        GameModels.shop.removeEventListener(mo.ModelChangeShop.CHANEG_SHOP_INFO, this.showMingJiangData, this);
        GameModels.bag.offItemChange(ConfigData.SHENBING_DUIHUAN, this, this.updataShenBing);
        GameModels.user.player.offPropertyChange(TypeProperty.VIP_LEVEL, this, this.onLevelChange);
        GameModels.user.player.offPropertyChange(TypeProperty.VIP_EXP, this, this.onLevelChange);
        this.btnVip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openVip, this);
        this.listMoShi.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTouch, this);
        for (var i = 0; i < this._btnArr.length; i++) {
            this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        }
        this.clearList(this.shenmilist);
        this.clearList(this.guanxinglist);
        this.clearList(this.mingjianglist);
    };
    MallScene.prototype.onBtnClick = function (e) {
        this._index = this._btnArr.indexOf(e.currentTarget);
        this.showBtnView();
        if (this.currentState == "duihuan") {
            this.showJiFenData();
        }
        else if (this.currentState == "mingjiang") {
            this.showMingJiangData();
        }
    };
    MallScene.prototype.showBtnView = function () {
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
    };
    MallScene.prototype.refreshLastTime = function () {
        var _this = this;
        if (this._lastTime <= 0) {
            GameModels.shop.requestShenMiShopInfo(utils.Handler.create(this, function () {
                if (_this.currentState == "shenmi") {
                    _this.updataShenMiView();
                }
            }));
            return;
        }
        this.labTime.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_MFSX, utils.DateUtil.formatTimeLeft(this._lastTime)));
        this._lastTime--;
        GameModels.shop.shenMiRefreshTime--;
    };
    MallScene.prototype.updataJifen = function () {
        if (this.currentState == "duihuan") {
            this.labMyValue.text = Language.C_WDJF + " : " + GameModels.user.player.getProperty(TypeProperty.GUANXING_JIFEN);
        }
    };
    MallScene.prototype.updataMingJiang = function () {
        if (this.currentState == "mingjiang") {
            var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.MINGJIANG_ITEM);
            this.labMyValue.text = item.name + " : " + GameModels.bag.getItemCountById(ConfigData.MINGJIANG_ITEM);
        }
    };
    MallScene.prototype.updataShenBing = function () {
        if (this.currentState == "shenbing") {
            var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.SHENBING_DUIHUAN);
            this.labMyValue.text = item.name + " : " + GameModels.bag.getItemCountById(ConfigData.SHENBING_DUIHUAN);
        }
    };
    MallScene.prototype.commitProperties = function () {
        _super.prototype.commitProperties.call(this);
        if (this.currentState == "shenmi") {
            if (this.scrollershenmiShop.verticalScrollBar) {
                this.scrollershenmiShop.verticalScrollBar.autoVisibility = false;
                this.scrollershenmiShop.verticalScrollBar.visible = false;
            }
        }
        else if (this.currentState == "duihuan") {
            if (this.scrollerguanxingShop.verticalScrollBar) {
                this.scrollerguanxingShop.verticalScrollBar.autoVisibility = false;
                this.scrollerguanxingShop.verticalScrollBar.visible = false;
            }
        }
        else if (this.currentState == "mingjiang") {
            if (this.scrollermingjiangShop.verticalScrollBar) {
                this.scrollermingjiangShop.verticalScrollBar.autoVisibility = false;
                this.scrollermingjiangShop.verticalScrollBar.visible = false;
            }
        }
        else if (this.currentState == "shenbing") {
            if (this.scrollerShenbingShop.verticalScrollBar) {
                this.scrollerShenbingShop.verticalScrollBar.autoVisibility = false;
                this.scrollerShenbingShop.verticalScrollBar.visible = false;
            }
        }
        else {
            if (this.scrollerMoShi.verticalScrollBar) {
                this.scrollerMoShi.verticalScrollBar.autoVisibility = false;
                this.scrollerMoShi.verticalScrollBar.visible = false;
            }
        }
    };
    MallScene.prototype.btnOnClick = function (e) {
        mg.soundManager.playSound("ButtonClick_1");
        var index = this._togs.indexOf(e.currentTarget);
        if (TypeFunOpen.checkFuncOpen(this, index, true)) {
            this.selectedTab(index);
        }
    };
    MallScene.prototype.btnHelpClick = function (e) {
        mg.alertManager.showAlert(PromptAlert, true, true, Language.J_ZSDYBBJRED, TypeBtnLabel.OK_SIGIN, null, null);
    };
    MallScene.prototype.selectedTab = function (index) {
        this._index = 0;
        for (var i = 0; i < this._togs.length; i++) {
            this._togs[i].selected = false;
        }
        switch (this._togs[index]) {
            case this.btnShenMi:
                this.currentState = "shenmi";
                GameModels.oneCountRedPoint.setOpenGongXunView(true, 0);
                this.showShenMiData();
                break;
            case this.btnGuanXing:
                this.currentState = "duihuan";
                this.showBtnView();
                GameModels.oneCountRedPoint.setOpenGongXunView(true, 1);
                this.labMyValue.text = Language.C_WDJF + " : " + GameModels.user.player.getProperty(TypeProperty.GUANXING_JIFEN);
                this.showJiFenData();
                break;
            case this.btnMingJiang:
                this.currentState = "mingjiang";
                this.showBtnView();
                GameModels.oneCountRedPoint.setOpenGongXunView(true, 2);
                var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.MINGJIANG_ITEM);
                this.labMyValue.text = item.name + " : " + GameModels.bag.getItemCountById(ConfigData.MINGJIANG_ITEM);
                this.showMingJiangData();
                break;
            case this.btnShenBing:
                this.currentState = "shenbing";
                //GameModels.oneCountRedPoint.setOpenGongXunView(true, 2);
                var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.SHENBING_DUIHUAN);
                this.labMyValue.text = item.name + " : " + GameModels.bag.getItemCountById(ConfigData.SHENBING_DUIHUAN);
                this.showShenbingData();
                break;
            case this.btnMoShi:
                /**黄纪珊 */
                this.currentState = "moshi";
                this.onLevelChange();
                break;
        }
        this.dispatchEventWith(MallScene.CHANG_TAL);
    };
    MallScene.prototype.onLevelChange = function () {
        GameModels.recharge.requestRechargeData(utils.Handler.create(this, this.updateRechargeData));
        this.requestVipRewardInfo();
    };
    MallScene.prototype.updateRechargeData = function () {
        this._moShiList.replaceAll(GameModels.recharge.rechargeData);
    };
    MallScene.prototype.requestVipRewardInfo = function () {
        var _this = this;
        GameModels.vip.requestVIPRewardInfo((utils.Handler.create(this, function (data) {
            var level = GameModels.user.player.getProperty(TypeProperty.VIP_LEVEL) || 0;
            _this.vipLevel.source = "newVip_json.vip_" + level;
            var next = GameModels.vip.getNextVipTemplate(level);
            var needExp = next.vipExp / 10;
            var nowVip = data.VipExp > 2000000 ? 2000000 : data.VipExp;
            _this.labPro.text = (nowVip / 10) >= needExp ? needExp + "/" + needExp : (nowVip / 10) + "/" + needExp;
            _this.expProgress.noTweenValue = (nowVip / 10) / needExp;
            if (!GameModels.vip.checkMaxVip(level)) {
                _this.labUpgradeNeed.text = Language.getExpression(Language.E_ZCZ1MSCW2, (needExp - (nowVip / 10)), next.id);
            }
            else {
                _this.labUpgradeNeed.text = Language.J_GXNVIPYDDDJ;
            }
        })));
    };
    MallScene.prototype.openVip = function (e) {
        mg.uiManager.show(view.vip.VipMianDailog);
    };
    MallScene.prototype.itemTouch = function (e) {
        var data = e.item;
        // logger.log("调用充值", data.template.id, data.buyState);
        GameModels.platform.buy(data.template.RMB, 1, "" + data.template.id, data.template.name, data.template.des);
    };
    MallScene.prototype.showJiFenData = function () {
        var shopVoArr = GameModels.changeShop.getShopArr(TypeShop.GUANXING_SHOP);
        var shopVo = [];
        for (var _i = 0, shopVoArr_1 = shopVoArr; _i < shopVoArr_1.length; _i++) {
            var shop = shopVoArr_1[_i];
            var country = 0;
            if (shop.itemID == 215003 || shop.itemID == 210303)
                country = 0; //势力招募令和红将碎片
            else
                var petTmp = Templates.getTemplateById(templates.Map.GENERAL, shop.template.nextId);
            if (petTmp)
                country = this._index == 0 ? 0 : petTmp.country;
            if (country == this._index) {
                shopVo.push(shop);
            }
        }
        this.guanxinglist.dataProvider = this._duihuanList = new eui.ArrayCollection(shopVo);
    };
    MallScene.prototype.showMingJiangData = function () {
        var shopVoArr = GameModels.changeShop.getShopArr(TypeShop.MINGJIANG_SHOP);
        var shopVo = [];
        for (var _i = 0, shopVoArr_2 = shopVoArr; _i < shopVoArr_2.length; _i++) {
            var shop = shopVoArr_2[_i];
            var country = 0;
            var petTmp = Templates.getTemplateById(templates.Map.GENERAL, shop.template.nextId);
            if (petTmp)
                country = this._index == 0 ? 0 : petTmp.country;
            if (country == this._index) {
                shopVo.push(shop);
            }
        }
        this.mingjianglist.dataProvider = this._mingjiangList = new eui.ArrayCollection(shopVo);
    };
    MallScene.prototype.showShenbingData = function () {
        this.shenbinglist.dataProvider = this._shenbingList = new eui.ArrayCollection(GameModels.smithy.shenBingIdList);
    };
    MallScene.prototype.showShenMiData = function () {
        this.shenmilist.dataProvider = this._shenmiList = new eui.ArrayCollection(GameModels.shop.shenMiShop);
        this.updataShenMiView();
    };
    MallScene.prototype.updataShenMiView = function () {
        utils.timer.clear(this, this.refreshLastTime);
        this.labTime.text = "";
        this.labType.text = "";
        var hashAnimal = false;
        var animal = GameModels.animal.getAnimalBuyType(16);
        if (animal.isAct && animal.step >= 3) {
            hashAnimal = true;
        }
        if (hashAnimal) {
            if (animal.step >= 4) {
                this.moneyGroup.visible = false;
                this.btnRefresh.label = Language.C_MFSX;
            }
            else {
                this.moneyGroup.visible = true;
                this.labCount.text = "10";
                this.btnRefresh.label = "";
                this._lastTime = GameModels.shop.shenMiRefreshTime;
                if (this._lastTime > 0) {
                    this.labTime.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_MFSX, utils.DateUtil.formatTimeLeft(this._lastTime)));
                    utils.timer.loop(1000, this, this.refreshLastTime);
                }
            }
        }
        else {
            if (GameModels.shop.shenMiFreeLeftCount > 0) {
                this.moneyGroup.visible = false;
                this.btnRefresh.label = Language.C_MFSX;
                this.labType.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_MFSXCS, GameModels.shop.shenMiFreeLeftCount + "/5"));
            }
            else {
                this.moneyGroup.visible = true;
                this.labCount.text = "20";
                this.btnRefresh.label = "";
                this.labType.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_YBSXCS, GameModels.shop.shenMiMoneyLeftCount + "/100"));
            }
            this._lastTime = GameModels.shop.shenMiRefreshTime;
            if (this._lastTime > 0) {
                this.labTime.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_MFSX, utils.DateUtil.formatTimeLeft(this._lastTime)));
                utils.timer.loop(1000, this, this.refreshLastTime);
            }
        }
    };
    MallScene.prototype.shenMiRefresh = function (e) {
        var shopVo = this._shenmiList.source;
        var isHas = false;
        for (var i = 0; i < shopVo.length; i++) {
            if (shopVo[i].shopQuality > 5 && shopVo[i].shopValue != 1) {
                isHas = true;
                break;
            }
        }
        if (isHas) {
            mg.alertManager.showCheckAlert(Language.J_YXYDJ, TypeBtnLabel.OK, TypeCheck.SHOP_MYSTERY, null, utils.Handler.create(this, this.refreshShopMystery));
        }
        else {
            this.refreshShopMystery();
        }
    };
    MallScene.prototype.refreshShopMystery = function () {
        var _this = this;
        GameModels.shop.requestRefreshShenMiShop(utils.Handler.create(this, function () {
            if (_this.currentState == "shenmi") {
                _this.showShenMiData();
            }
        }));
    };
    MallScene.prototype.updataRongYuList = function (e) {
        this._shenmiList.itemUpdated(e.data);
    };
    MallScene.prototype.updataJiFenList = function (e) {
        this._duihuanList.itemUpdated(e.data);
    };
    MallScene.prototype.updataMingJiangList = function (e) {
        this._mingjiangList.itemUpdated(e.data);
    };
    MallScene.prototype.updataShenBingList = function (e) {
        this._shenbingList.itemUpdated(e.data);
    };
    MallScene.prototype.btnRongyiClick = function () {
        if (this.currentState == "duihuan") {
            mg.alertManager.showAlert(PropOfSourceAlert, true, true, "401"); //获取观星积分
        }
        else if (this.currentState == "mingjiang") {
            mg.alertManager.showAlert(PropOfSourceAlert, true, true, ConfigData.MINGJIANG_ITEM); //获取名将令
        }
        else if (this.currentState == "shenbing") {
            mg.alertManager.showAlert(PropOfSourceAlert, true, true, ConfigData.SHENBING_DUIHUAN); //获取名将令
        }
    };
    /**标签改变 */
    MallScene.CHANG_TAL = "CHANG_TAL";
    return MallScene;
}(ui.MallSceneSkin));
__reflect(MallScene.prototype, "MallScene");

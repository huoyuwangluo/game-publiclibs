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
var PropOfSourceAlert = (function (_super) {
    __extends(PropOfSourceAlert, _super);
    function PropOfSourceAlert() {
        return _super.call(this) || this;
    }
    PropOfSourceAlert.prototype.show = function (propId, restrictionValue, isShowDes, buyType) {
        if (restrictionValue === void 0) { restrictionValue = 0; }
        if (isShowDes === void 0) { isShowDes = true; }
        if (buyType === void 0) { buyType = 0; }
        this._itemId = null;
        this._shop = null;
        this._tatolPrice = 0;
        this._restrictionValue = 0;
        this._canBuyCount = 0;
        var isTypeTwo = false;
        this.buyGroup.visible = false;
        this.imgSale.visible = false;
        this.btnBuy.filters = null;
        this.btnBuy.touchEnabled = true;
        this.img_xianGou.visible = false;
        this.labDesc.visible = false;
        this.img_canBuy.visible = false;
        this._data = propId;
        this._restrictionValue = restrictionValue;
        this.textInputNum.text = "1";
        this._buyType = buyType;
        var links = Templates.getTemplatesByProperty(templates.Map.ITEMWAY, "itemId", propId);
        this.prop.redVisible = false;
        var items = [];
        for (var _i = 0, links_1 = links; _i < links_1.length; _i++) {
            var link = links_1[_i];
            var gameItem = Templates.getTemplateById(templates.Map.GAMEFUNCTIONS, link.functionId);
            if (!gameItem) {
                continue;
            }
            /**阵营校验是否加入阵营 */
            if (link.functionId == TypeFunOpen.ZHENYINGRENWU ||
                link.functionId == TypeFunOpen.GUANZHI ||
                link.functionId == TypeFunOpen.ZHENYINGBINGZHONG ||
                link.functionId == TypeFunOpen.ZHENYINGSHANGDIAN ||
                link.functionId == TypeFunOpen.ZHENYINGZHANQI) {
                if (this.checkIsUnion(link.functionId) == false) {
                    continue;
                }
            }
            /**红颜购买活动是否存在 */
            if (link.functionId == TypeFunOpen.HONGYANQIANGGOU) {
                var voYYQG = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.yyqg);
                if (!voYYQG) {
                    continue;
                }
            }
            /**首冲活动是否存在 */
            if (link.functionId == TypeFunOpen.SHOUCHONG) {
                if (!GameModels.sgActivity.isHashFirstRecharge())
                    continue;
            }
            // /**开服活动-特惠礼包 */
            // if (link.functionId == TypeFunOpen.thlb) {
            // 	var vosgOpenServer: vo.SgActivityListVO = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.thlb);
            // 	if (!vosgOpenServer) {
            // 		continue;
            // 	}
            // }
            // /**开服活动-私人订制 */
            // if (link.functionId == TypeFunOpen.srdz) {
            // 	var vosgOpenServer: vo.SgActivityListVO = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.srdz);
            // 	if (!vosgOpenServer) {
            // 		continue;
            // 	}
            // }
            /**每日活动-每月特惠 */
            if (link.functionId == TypeFunOpen.myth) {
                var voMYTH = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.myth);
                if (!voMYTH) {
                    continue;
                }
            }
            /**每日活动-每周特惠 */
            if (link.functionId == TypeFunOpen.mzth) {
                var voMZTH = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mzth);
                if (!voMZTH) {
                    continue;
                }
            }
            /**每日活动-连充豪礼 */
            if (link.functionId == TypeFunOpen.lchl) {
                var voLCHL = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.lchl);
                if (!voLCHL) {
                    continue;
                }
            }
            /**每日活动-每日充值 */
            if (link.functionId == TypeFunOpen.mrcz) {
                var voMRCZ = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                if (!voMRCZ)
                    continue;
                if (voMRCZ && voMRCZ.hashYYQGAndMRCZReceive) {
                    continue;
                }
            }
            /**每日活动-每日累充 */
            if (link.functionId == TypeFunOpen.mrlc) {
                var voMRLC = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrlc);
                if (!voMRLC) {
                    continue;
                }
            }
            /**每日活动-周卡 */
            if (link.functionId == TypeFunOpen.zk) {
                var voMRLC = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.zk);
                if (!voMRLC) {
                    continue;
                }
            }
            /**功能等级没到或者开服天数没到 */
            if (GameModels.user.player.level < gameItem.openLv || GameModels.serverTime.kaifuDay < gameItem.openDay) {
                continue;
            }
            if (link.type == 1) {
                items.push({ des: link.des, funcId: link.functionId });
            }
            if (link.type == 2) {
                isTypeTwo = true;
                this._itemId = link.itemId;
            }
        }
        if (!this._listData) {
            this._listData = new eui.ArrayCollection();
        }
        this._listData.source = items;
        this.listSource.dataProvider = this._listData;
        this.listSource.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this._shop = this.getVipFanWei(this._itemId);
        if (isTypeTwo == true && TypeFunOpen.checkIsOpenByFunId(this._shop.functionID) && GameModels.user.player.vip >= this._shop.needVip) {
            this.buyGroup.visible = true;
            this.img_canBuy.visible = true;
            this.listSource.y = 400;
            this.showBuyData();
        }
        else {
            if (isShowDes) {
                this.labDesc.visible = true;
            }
            this.listSource.y = 230;
            this.prop.updateData(Templates.getTemplateById(templates.Map.ITEM, this._data));
            mg.TipManager.instance.unBind(this.prop);
            if (this.prop.data) {
                switch (this.prop.data.mainType) {
                    case TypeItem.MONEY:
                        if (this.prop.data.type == TypeItem.PET_TYPE) {
                            var pet = Templates.getTemplateById(templates.Map.GENERAL, this.prop.data.id);
                            mg.TipManager.instance.bind(this, tips.GeneralInfoTip, pet);
                        }
                        else {
                            mg.TipManager.instance.bind(this, tips.PropTip, this.prop.data);
                        }
                        break;
                    case TypeItem.DEBRIS:
                        //任选宝箱
                        mg.TipManager.instance.bind(this.prop, tips.SelectedBoxTip, this.prop.data);
                        break;
                    case TypeItem.MATERIAL:
                    case TypeItem.TREASURE:
                    case TypeItem.BINGFA:
                    case TypeItem.ITEM:
                        mg.TipManager.instance.bind(this.prop, tips.PropTip, this.prop.data);
                        break;
                    case TypeItem.EQUIP:
                        mg.TipManager.instance.bind(this.prop, tips.EquipTip, this.prop.data);
                        break;
                }
            }
        }
        this.listSource.validateNow();
        this.imgBg.height = this.listSource.y + this.listSource.height + 30;
        this.img_tishi.y = this.imgBg.y + this.imgBg.height;
        this.textInputNum.addEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
        this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuyClick, this);
        this.btnJia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnJian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnJianTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnJiaTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    PropOfSourceAlert.prototype.OnCharactorChange = function (event) {
        var vo = GameModels.shop.getPropShopVoBuyId(parseInt(this._data));
        var num = Number(this.textInputNum.text);
        if (this.textInputNum.text == "" || num < 1) {
            this.textInputNum.text = "0";
            num = 0;
        }
        else if (num > 999) {
            this.textInputNum.text = "999";
            num = 999;
        }
        else if (num > this._canBuyCount - vo.toDayBuyTimes) {
            mg.alertManager.tip(Language.J_QTSVIPZJXGCS);
            num = this._canBuyCount - vo.toDayBuyTimes;
        }
        this.textInputNum.text = num.toString();
        var price = this.getPriceBuyCount(num);
        this.lblTatolPrice.text = price.toString();
        this._tatolPrice = Number(this.lblTatolPrice.text);
        this.labPrice.text = (num * vo.getPrice()).toString();
    };
    PropOfSourceAlert.prototype.getPriceBuyCount = function (count) {
        var index = 0;
        var price = 0;
        var buyCount = 0;
        var vo = GameModels.shop.getPropShopVoBuyId(parseInt(this._data));
        if (vo.toDayBuyTimes > 0) {
            buyCount = vo.toDayBuyTimes + 1;
            count += vo.toDayBuyTimes;
        }
        else {
            buyCount = 1;
        }
        for (var z = buyCount; z <= count; z++) {
            var num1 = GameModels.shop.getPriceBuyTodayBuyTimes(vo.itemID, z) * vo.getPrice();
            price += num1;
        }
        return price;
    };
    PropOfSourceAlert.prototype.showBuyData = function () {
        if (this._shop) {
            var vo = GameModels.shop.getPropShopVoBuyId(parseInt(this._itemId));
            this.prop.updateData(Templates.getTemplateById(templates.Map.ITEM, this._data), this._shop.itemCount);
            mg.TipManager.instance.unBind(this.prop);
            if (this.prop.data) {
                switch (this.prop.data.mainType) {
                    case TypeItem.MONEY:
                        if (this.prop.data.type == TypeItem.PET_TYPE) {
                            var pet = Templates.getTemplateById(templates.Map.GENERAL, this.prop.data.id);
                            mg.TipManager.instance.bind(this, tips.GeneralInfoTip, pet);
                        }
                        else {
                            mg.TipManager.instance.bind(this, tips.PropTip, this.prop.data);
                        }
                        break;
                    case TypeItem.DEBRIS:
                        //任选宝箱	
                        mg.TipManager.instance.bind(this.prop, tips.SelectedBoxTip, this.prop.data);
                        break;
                    case TypeItem.MATERIAL:
                    case TypeItem.TREASURE:
                    case TypeItem.ITEM:
                        mg.TipManager.instance.bind(this.prop, tips.PropTip, this.prop.data);
                        break;
                    case TypeItem.EQUIP:
                        mg.TipManager.instance.bind(this.prop, tips.EquipTip, this.prop.data);
                        break;
                }
            }
            this.imgSale.visible = true;
            if (GameModels.user.player.vip > 0) {
                this._canBuyCount = 0;
            }
            else {
                this._canBuyCount = 2; //默认两次
            }
            this.imgSale.source = "vip_json.img_vip_" + GameModels.user.player.vip;
            var num = Number(this.textInputNum.text);
            if (num >= (this._canBuyCount - vo.toDayBuyTimes)) {
                this.textInputNum.text = (this._canBuyCount - vo.toDayBuyTimes).toString();
                num = this._canBuyCount - vo.toDayBuyTimes;
            }
            if (num <= 0) {
                this.btnBuy.filters = utils.filterUtil.grayFilters;
                this.btnBuy.touchEnabled = false;
                this.img_xianGou.visible = true;
            }
            this.lblTatolPrice.text = this.getPriceBuyCount(num).toString();
            this.labPrice.text = (num * vo.getPrice()).toString();
            this.textInputNum.text = num.toString();
            this.labCount.text = "(" + Language.C_SYGMCS + (this._canBuyCount - vo.toDayBuyTimes) + ")";
        }
    };
    PropOfSourceAlert.prototype.onBtnBuyClick = function (e) {
        var _this = this;
        var num = parseInt(this.textInputNum.text);
        // logger.log("最后的价格:", this._tatolPrice);
        // logger.log("最后的购买的个数:", num);
        if (utils.CheckUtil.checkDiamonds(this._tatolPrice, true)) {
            GameModels.shop.buyVipShop(this._shop.id.toString(), num, TypeShop.VIP_SHOP, utils.Handler.create(this, function () {
                _this.showBuyData();
            }));
        }
    };
    PropOfSourceAlert.prototype.onBtnClick = function (e) {
        var num = Number(this.textInputNum.text);
        var vo = GameModels.shop.getPropShopVoBuyId(parseInt(this._data));
        switch (e.target) {
            case this.btnJiaTen:
                num = num + 10;
                break;
            case this.btnJianTen:
                num = num - 10;
                break;
            case this.btnJia:
                num = num + 1;
                break;
            case this.btnJian:
                num = num - 1;
                break;
        }
        if (this.textInputNum.text == "" || num < 1) {
            this.textInputNum.text = "1";
            num = 1;
        }
        else if (num > 999) {
            this.textInputNum.text = "999";
            num = 999;
        }
        else if (num > this._canBuyCount - vo.toDayBuyTimes) {
            mg.alertManager.tip(Language.J_QTSVIPZJXGCS);
            num = this._canBuyCount - vo.toDayBuyTimes;
        }
        this.textInputNum.text = String(num);
        var price = this.getPriceBuyCount(num);
        this.lblTatolPrice.text = price.toString();
        this._tatolPrice = Number(this.lblTatolPrice.text);
        this.labPrice.text = (num * vo.getPrice()).toString();
    };
    PropOfSourceAlert.prototype.getVipFanWei = function (id) {
        if (id) {
            var shop = Templates.getList(templates.Map.SHOP);
            for (var i = 0; i < shop.length; i++) {
                if (shop[i].shopType == 9 && shop[i].itemId == id) {
                    return shop[i];
                }
            }
        }
        return null;
    };
    PropOfSourceAlert.prototype.checkIsUnion = function (funId) {
        if (GameModels.user.player.legionId) {
            return true;
        }
        return false;
    };
    PropOfSourceAlert.prototype.checkOpenFuDay = function (openDay) {
        if (GameModels.serverTime.kaifuDay >= openDay) {
            return true;
        }
        return false;
    };
    PropOfSourceAlert.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
        _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
        // this.imgBg.height = this.listSource.y + this.listSource.height + 30;
        // this.imgTitle.y = this.imgBg.height + this.imgTitle.height / 2;
    };
    PropOfSourceAlert.prototype.hide = function () {
        this.textInputNum.text = "1";
        this._buyType = 0;
        this.listSource.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.textInputNum.removeEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
        this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuyClick, this);
        this.btnJia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnJian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnJianTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnJiaTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.clearList(this.listSource);
        this._data = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    PropOfSourceAlert.prototype.onItemTap = function (e) {
        if (this._buyType > 0 && e.item.funcId == TypeFunOpen.mrcz) {
            GameModels.common.buyType = this._buyType;
        }
        if (e.item.funcId == 9999) {
            mg.alertManager.tip(Language.J_YYHDHQ, 0xff0000);
            this.dispatchEventWith(egret.Event.CLOSE);
            return;
        }
        var gameItem = Templates.getTemplateById(templates.Map.GAMEFUNCTIONS, e.item.funcId);
        if (e.item.funcId == TypeFunOpen.WANJIANGXIANGOU) {
            mg.alertManager.showAlert(dialog.baowu.BaoWuPurchaseLimitation, false, true, 3);
        }
        else if (e.item.funcId == TypeFunOpen.CHONGWU_XIANGOU) {
            mg.alertManager.showAlert(dialog.baowu.BaoWuPurchaseLimitation, false, true, 6);
        }
        else {
            mg.uiManager.showByName(e.item.funcId);
        }
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    PropOfSourceAlert.prototype.onClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return PropOfSourceAlert;
}(ui.PropOfSource));
__reflect(PropOfSourceAlert.prototype, "PropOfSourceAlert", ["IAlert", "egret.DisplayObject"]);

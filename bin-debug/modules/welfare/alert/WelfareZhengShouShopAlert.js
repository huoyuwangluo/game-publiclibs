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
var WelfareZhengShouShopAlert = (function (_super) {
    __extends(WelfareZhengShouShopAlert, _super);
    function WelfareZhengShouShopAlert() {
        return _super.call(this) || this;
    }
    WelfareZhengShouShopAlert.prototype.show = function () {
        var _this = this;
        GameModels.changeShop.requestStoreList(TypeShop.ZHENGSHOU_SHOP, utils.Handler.create(this, function (data) {
            var shopVoArr = GameModels.changeShop.getShopArr(TypeShop.ZHENGSHOU_SHOP);
            _this.listRank.dataProvider = _this._listData = new eui.ArrayCollection(shopVoArr);
            _this.listRank.dataProvider = _this._listData;
            var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.ZHENGSHOU_DUIHUAN);
            _this.labMyValue.text = item.name + ":" + GameModels.bag.getItemCountById(ConfigData.ZHENGSHOU_DUIHUAN);
            _this.icon.source = item.icon;
            var qzdh = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.qzdh);
            _this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(qzdh.endTime * 1000), false);
        }));
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.listRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
    };
    WelfareZhengShouShopAlert.prototype.onBuyClick = function (e) {
        if (utils.CheckUtil.checkBagSmelting())
            return;
        if (e.target instanceof components.SnapButton) {
            var item = this.listRank.selectedItem;
            GameModels.changeShop.requestItemBuy(item.shopid.toString(), 1, item.type, utils.Handler.create(this, this.getRewardCallback, [item.shoptemplate.itemId]));
        }
    };
    WelfareZhengShouShopAlert.prototype.getRewardCallback = function (str) {
        this.showList();
        var rewards = str.split(";");
        mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
    };
    WelfareZhengShouShopAlert.prototype.showList = function () {
        var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.ZHENGSHOU_DUIHUAN);
        this.labMyValue.text = item.name + ":" + GameModels.bag.getItemCountById(ConfigData.ZHENGSHOU_DUIHUAN);
        this.icon.source = item.icon;
        var shopVoArr = GameModels.changeShop.getShopArr(TypeShop.ZHENGSHOU_SHOP);
        this._listData.replaceAll(shopVoArr);
    };
    WelfareZhengShouShopAlert.prototype.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btnBack:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnClose:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
        }
    };
    WelfareZhengShouShopAlert.prototype.hide = function () {
        this.clearList(this.listRank);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.listRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return WelfareZhengShouShopAlert;
}(ui.WelfareZhengShouShopAlertSkin));
__reflect(WelfareZhengShouShopAlert.prototype, "WelfareZhengShouShopAlert", ["IAlert", "egret.DisplayObject"]);

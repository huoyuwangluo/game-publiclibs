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
    var shop;
    (function (shop) {
        var MallShouHunChangeShop = (function (_super) {
            __extends(MallShouHunChangeShop, _super);
            function MallShouHunChangeShop() {
                return _super.call(this) || this;
            }
            MallShouHunChangeShop.prototype.enter = function (data) {
                var _this = this;
                GameModels.changeShop.requestStoreList(TypeShop.SHOUHUN_SHOP, utils.Handler.create(this, function (data) {
                    _this.showView();
                }));
                GameModels.user.player.onPropertyChange(TypeProperty.SHOUHUN, this, this.updataView);
                GameModels.changeShop.addEventListener(mo.ModelChangeShop.CHANEG_ITEM_BUY_COUNT, this.updataList, this);
                GameModels.changeShop.addEventListener(mo.ModelChangeShop.CHANEG_SHOP_INFO, this.showView, this);
                this.btnGetItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            };
            MallShouHunChangeShop.prototype.showView = function () {
                var shopVoArr = GameModels.changeShop.getShopArr(TypeShop.SHOUHUN_SHOP);
                this.list.dataProvider = this._listData = new eui.ArrayCollection(shopVoArr);
                var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.SHOUHUN_ITEM);
                this.imgIcon.source = item.icon;
                this.labMyValue.text = item.name + " : " + GameModels.user.player.shouhun;
            };
            MallShouHunChangeShop.prototype.updataView = function () {
                var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.SHOUHUN_ITEM);
                this.imgIcon.source = item.icon;
                this.labMyValue.text = item.name + " : " + GameModels.user.player.shouhun;
            };
            MallShouHunChangeShop.prototype.updataList = function (e) {
                this._listData.itemUpdated(e.data);
            };
            MallShouHunChangeShop.prototype.onBtnClick = function (e) {
                mg.alertManager.showAlert(PropOfSourceAlert, true, true, ConfigData.SHOUHUN_ITEM);
            };
            MallShouHunChangeShop.prototype.exit = function () {
                GameModels.user.player.offPropertyChange(TypeProperty.SHOUHUN, this, this.updataView);
                this.btnGetItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                GameModels.changeShop.removeEventListener(mo.ModelChangeShop.CHANEG_ITEM_BUY_COUNT, this.updataList, this);
                GameModels.changeShop.removeEventListener(mo.ModelChangeShop.CHANEG_SHOP_INFO, this.showView, this);
            };
            return MallShouHunChangeShop;
        }(ui.MallChangeShopSkin));
        shop.MallShouHunChangeShop = MallShouHunChangeShop;
        __reflect(MallShouHunChangeShop.prototype, "dialog.shop.MallShouHunChangeShop", ["IModuleView", "egret.DisplayObject"]);
    })(shop = dialog.shop || (dialog.shop = {}));
})(dialog || (dialog = {}));

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
var mo;
(function (mo) {
    var ModelChangeShop = (function (_super) {
        __extends(ModelChangeShop, _super);
        function ModelChangeShop() {
            return _super.call(this) || this;
        }
        ModelChangeShop.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._shopArr = [];
            this._isOpenJunGongView = false;
            this.initChangeShopInfo(TypeShop.TAOFA_SHOP);
            this.initChangeShopInfo(TypeShop.YUANZHENG_SHOP);
            this.initChangeShopInfo(TypeShop.SHENGWANG_SHOP);
            this.initChangeShopInfo(TypeShop.MINGJIANG_SHOP);
            this.initChangeShopInfo(TypeShop.GUANXING_SHOP);
            this.initChangeShopInfo(TypeShop.ZHENGSHOU_SHOP);
            this.initChangeShopInfo(TypeShop.JUNGONG_SHOP);
            this.initChangeShopInfo(TypeShop.SHOUHUN_SHOP);
        };
        //请求商城信息
        ModelChangeShop.prototype.requestStoreList = function (type, handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Store_GetBuyTimes);
            msg.StoreType = type;
            this.request(n.MessageMap.C2G_STORE_GETBUYTIMES, msg, utils.Handler.create(this, function (data) {
                _this.updataChangeShopInfo(data.StoreType, data.BuyTimesList);
                if (handler) {
                    handler.runWith(data);
                }
            }));
        };
        //请求购买
        ModelChangeShop.prototype.requestItemBuy = function (id, buyCount, storeType, handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Store_BuyItemReq);
            msg.StoreItemRefId = id;
            msg.Count = buyCount;
            msg.StoreType = storeType;
            this.request(n.MessageMap.C2G_STORE_BUYITEMREQ, msg, utils.Handler.create(this, function (data) {
                _this.updateOneChangeShop(data.StoreType, data);
                if (handler) {
                    handler.runWith(data);
                }
            }));
        };
        /**初始化兑换商品信息 */
        ModelChangeShop.prototype.initChangeShopInfo = function (type) {
            var shopItemArr = Templates.getTemplatesByProperty(templates.Map.SHOP, "shopType", type);
            var shopArr = [];
            for (var i = 0; i < shopItemArr.length; i++) {
                var shopVO = vo.fromPool(vo.ShopVO);
                shopVO.decode(shopItemArr[i].id);
                shopArr.push(shopVO);
            }
            this._shopArr[type] = shopArr;
        };
        /**更新全部兑换商品信息  */
        ModelChangeShop.prototype.updataChangeShopInfo = function (type, data) {
            var shopArr = this.getShopArr(type);
            if (!shopArr)
                return;
            for (var _i = 0, shopArr_1 = shopArr; _i < shopArr_1.length; _i++) {
                var temp = shopArr_1[_i];
                for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
                    var tempCount = data_1[_a];
                    if (temp.shopid == tempCount.StoreItemId) {
                        temp.buyCount = (tempCount.LeftBuyTimes);
                    }
                }
            }
            this.dispatchEventWith(ModelChangeShop.CHANEG_SHOP_INFO);
        };
        // /**更新单个兑换商品信息 */
        ModelChangeShop.prototype.updateOneChangeShop = function (type, data) {
            var shopArr = this.getShopArr(type);
            if (!shopArr)
                return;
            for (var _i = 0, shopArr_2 = shopArr; _i < shopArr_2.length; _i++) {
                var temp = shopArr_2[_i];
                if (temp.shopid == parseInt(data.StoreItemRefId)) {
                    temp.buyCount = (data.LeftBuyTimes);
                    this.dispatchEventWith(ModelChangeShop.CHANEG_ITEM_BUY_COUNT, false, temp);
                }
            }
        };
        /**获取商品信息 */
        ModelChangeShop.prototype.getShopArr = function (type) {
            return this._shopArr[type] ? this._shopArr[type] : null;
        };
        Object.defineProperty(ModelChangeShop.prototype, "isOpenJunGongView", {
            /**是否打开vip特权界面 */
            get: function () {
                return this._isOpenJunGongView;
            },
            set: function (value) {
                this._isOpenJunGongView = value;
                GameModels.state.updateState(GameRedState.JUNGONG_SHOP);
            },
            enumerable: true,
            configurable: true
        });
        ModelChangeShop.prototype.checkJunGongShopRedPoint = function () {
            if (!GameModels.user.player.legionId)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.kingwar))
                return false;
            if (!this._isOpenJunGongView)
                return true;
        };
        ModelChangeShop.CHANEG_SHOP_INFO = "CHANEG_SHOP_INFO";
        ModelChangeShop.CHANEG_ITEM_BUY_COUNT = "CHANEG_ITEM_BUY_COUNT";
        return ModelChangeShop;
    }(mo.ModelBase));
    mo.ModelChangeShop = ModelChangeShop;
    __reflect(ModelChangeShop.prototype, "mo.ModelChangeShop");
})(mo || (mo = {}));

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
    var ModelShop = (function (_super) {
        __extends(ModelShop, _super);
        function ModelShop() {
            return _super.call(this) || this;
        }
        ModelShop.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._propshopDataVo = [];
            this._shenMiShop = [];
            this._shenMiFreeLeftCount = 0;
            this._shenMiRefreshTime = 0;
            this._shenMiMoneyLeftCount = 0;
            this.requestShenMiShopInfo();
            this.initDaojuShopData();
            this.requestDaoJuBuyTimesShop(TypeShop.VIP_SHOP);
        };
        ModelShop.prototype.initDaojuShopData = function () {
            this._propshopDataVo = [];
            var shops = Templates.getList(templates.Map.SHOP);
            for (var i = 0; i < shops.length; i++) {
                if (shops[i].shopType == 9) {
                    var shopVO = vo.fromPool(vo.ShopVO);
                    shopVO.decode(shops[i].id);
                    this._propshopDataVo.push(shopVO);
                }
            }
        };
        Object.defineProperty(ModelShop.prototype, "daojuShopData", {
            get: function () {
                var shop = [];
                for (var i = 0; i < this._propshopDataVo.length; i++) {
                    if (TypeFunOpen.checkIsOpenByFunId(this._propshopDataVo[i].shoptemplate.functionID) && GameModels.user.player.vip >= this._propshopDataVo[i].shoptemplate.needVip) {
                        shop.push(this._propshopDataVo[i]);
                    }
                }
                return shop;
            },
            enumerable: true,
            configurable: true
        });
        ModelShop.prototype.getPropShopVoBuyId = function (id) {
            var vo = null;
            for (var _i = 0, _a = this._propshopDataVo; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.itemID == id) {
                    vo = v;
                    break;
                }
            }
            return vo;
        };
        ModelShop.prototype.getPropShopVoBuyShopId = function (id) {
            var vo = null;
            for (var _i = 0, _a = this._propshopDataVo; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.shopid == id) {
                    vo = v;
                    break;
                }
            }
            return vo;
        };
        ModelShop.prototype.getPriceBuyTodayBuyTimes = function (id, count) {
            if (count <= 0)
                count = 1;
            if (count > 360)
                return 1;
            for (var i = 0; i < this._propshopDataVo.length; i++) {
                if (this._propshopDataVo[i].itemID == id) {
                    var str = this._propshopDataVo[i].shoptemplate.param1.split(";");
                    for (var j = 0; j < str.length; j++) {
                        var str1 = str[j].split("_");
                        if (count >= parseInt(str1[0]) && count <= parseInt(str1[1])) {
                            return parseInt(str1[2]) / 100;
                        }
                    }
                }
            }
            return 0;
        };
        /**道具商品剩余次数*/
        ModelShop.prototype.requestDaoJuBuyTimesShop = function (type, handler) {
            var msg = n.MessagePool.from(n.C2G_Store_GetBuyTimes);
            msg.StoreType = type;
            this.request(n.MessageMap.C2G_STORE_GETBUYTIMES, msg, utils.Handler.create(this, function (data) {
                this.setPropShopTimes(data.BuyTimesList);
                if (handler) {
                    handler.run();
                }
            }));
        };
        ModelShop.prototype.setPropShopTimes = function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                var vo = this.getPropShopVoBuyShopId(item.StoreItemId);
                if (vo && vo.type == TypeShop.VIP_SHOP && vo.shopid == item.StoreItemId) {
                    vo.buyCount = item.LeftBuyTimes;
                    vo.toDayBuyTimes = item.TodayBuyTimes;
                }
            }
        };
        /**道具商品购买 */
        ModelShop.prototype.buyDaoJuShop = function (shopid, shopCount, shopType, successhandler) {
            var msg = n.MessagePool.from(n.C2G_Store_BuyItemReq);
            msg.StoreItemRefId = shopid.toString();
            msg.Count = shopCount;
            msg.StoreType = shopType;
            this.request(n.MessageMap.C2G_STORE_BUYITEMREQ, msg, utils.Handler.create(this, function (data) {
                this.updateOneDaoJuBuy(data);
                if (successhandler) {
                    successhandler.run();
                }
            }));
        };
        /**更新单个道具商品信息 */
        ModelShop.prototype.updateOneDaoJuBuy = function (data) {
            for (var _i = 0, _a = this._propshopDataVo; _i < _a.length; _i++) {
                var temp = _a[_i];
                if (temp.shopid == parseInt(data.StoreItemRefId)) {
                    temp.buyCount = (data.LeftBuyTimes);
                    temp.toDayBuyTimes = data.TodayBuyTimes;
                }
            }
        };
        /**Vip商品购买 */
        ModelShop.prototype.buyVipShop = function (shopid, shopCount, shopType, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Store_BuyItemReq);
            msg.StoreItemRefId = shopid.toString();
            msg.Count = shopCount;
            msg.StoreType = shopType;
            this.request(n.MessageMap.C2G_STORE_BUYITEMREQ, msg, utils.Handler.create(this, function (data) {
                _this.updateOneDaoJuBuy(data);
                mg.alertManager.tip(Language.J_GMCG);
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        /**神秘商城 */
        ModelShop.prototype.initShenMiShopInfo = function (data) {
            this._shenMiShop = [];
            for (var i = 0; i < data.length; i++) {
                var shopTemplate = Templates.getTemplateById(templates.Map.STOREMYSTERY, data[i].StoreItemRefId);
                if (shopTemplate) {
                    var shopMysteryVO = vo.fromPool(vo.ShopMysteryVo);
                    shopMysteryVO.decode(data[i]);
                    this._shenMiShop.push(shopMysteryVO);
                }
            }
        };
        ModelShop.prototype.updataShenMiInfo = function (index) {
            if (this._shenMiShop) {
                for (var i = 0; i < this._shenMiShop.length; i++) {
                    if (this._shenMiShop[i].index == index) {
                        this._shenMiShop[i].shopValue = 1;
                        this.dispatchEventWith(ModelShop.CHANEG_SHENMI_BUY_COUNT, false, this._shenMiShop[i]);
                        break;
                    }
                }
            }
        };
        ModelShop.prototype.requestShenMiShopInfo = function (handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Mystery_GetStoreInfo);
            this.request(n.MessageMap.C2G_MYSTERY_GETSTOREINFO, msg, utils.Handler.create(this, function (data) {
                if (data) {
                    _this._shenMiFreeLeftCount = data.StoreInfo.LeftFreeCount;
                    _this._shenMiRefreshTime = data.StoreInfo.LeftCountRefreshTime;
                    _this._shenMiMoneyLeftCount = data.StoreInfo.LeftMoneyRefreshCount;
                    _this.initShenMiShopInfo(data.StoreInfo.StoreItemRefList);
                    if (handler) {
                        handler.runWith(data);
                    }
                }
            }));
        };
        ModelShop.prototype.requestBuyShenMiShop = function (index, handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Mystery_BuyItem);
            msg.Index = index;
            this.request(n.MessageMap.C2G_MYSTERY_BUYITEM, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    _this.updataShenMiInfo(data.Index);
                    if (handler) {
                        handler.runWith(data);
                    }
                }
            }));
        };
        ModelShop.prototype.requestRefreshShenMiShop = function (handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Mystery_RefreshStore);
            this.request(n.MessageMap.C2G_MYSTERY_REFRESHSTORE, msg, utils.Handler.create(this, function (data) {
                if (data) {
                    _this._shenMiFreeLeftCount = data.StoreInfo.LeftFreeCount;
                    _this._shenMiRefreshTime = data.StoreInfo.LeftCountRefreshTime;
                    _this._shenMiMoneyLeftCount = data.StoreInfo.LeftMoneyRefreshCount;
                    _this.initShenMiShopInfo(data.StoreInfo.StoreItemRefList);
                    _this.dispatchEventWith(ModelShop.CHANEG_SHENMI_BUY_COUNT);
                    if (handler) {
                        handler.runWith(data);
                    }
                }
            }));
        };
        Object.defineProperty(ModelShop.prototype, "shenMiShop", {
            get: function () {
                return this._shenMiShop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelShop.prototype, "shenMiFreeLeftCount", {
            get: function () {
                return this._shenMiFreeLeftCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelShop.prototype, "shenMiMoneyLeftCount", {
            get: function () {
                return this._shenMiMoneyLeftCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelShop.prototype, "shenMiRefreshTime", {
            get: function () {
                return this._shenMiRefreshTime;
            },
            set: function (v) {
                this._shenMiRefreshTime = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelShop.CHANEG_SHENMI_BUY_COUNT = "CHANEG_SHENMI_BUY_COUNT";
        return ModelShop;
    }(mo.ModelBase));
    mo.ModelShop = ModelShop;
    __reflect(ModelShop.prototype, "mo.ModelShop");
})(mo || (mo = {}));

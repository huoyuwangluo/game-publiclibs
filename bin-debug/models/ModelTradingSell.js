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
    var ModelTradingSell = (function (_super) {
        __extends(ModelTradingSell, _super);
        function ModelTradingSell() {
            return _super.call(this) || this;
        }
        ModelTradingSell.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._tradingSellMyItemVO = [];
            this._tradingSellListVO = [];
            this._tradingSellRecordVO = [];
            this._leftSellCount = 0;
            n.net.onRoute(n.MessageMap.G2C_TRADE_NOTIFYDROPITEMS, utils.Handler.create(this, this.tradeNotifyDropItems, null, false));
        };
        ModelTradingSell.prototype.tradeNotifyDropItems = function (data) {
            if (this._data) {
                n.MessagePool.to(this._data);
                this._data = null;
            }
            this._data = data;
            this._data.autoRecover = false;
            var items = [];
            for (var i = 0; i < this._data.Items.length; i++) {
                items.push(this._data.Items[i].Id + "_" + this._data.Items[i].Count);
            }
            if (items.length > 0) {
                tips.TradingSellShowItemTip.instance.show(items);
            }
        };
        ModelTradingSell.prototype.initTradingSellMyItem = function (data) {
            this._tradingSellMyItemVO = [];
            for (var i = 0; i < data.length; i++) {
                var voTemp = vo.fromPool(vo.TradingSellMyItemVO);
                voTemp.decode(data[i]);
                this._tradingSellMyItemVO.push(voTemp);
            }
        };
        Object.defineProperty(ModelTradingSell.prototype, "tradingSellMyItemVO", {
            get: function () {
                return this._tradingSellMyItemVO;
            },
            enumerable: true,
            configurable: true
        });
        ModelTradingSell.prototype.initTradingSellList = function (data) {
            this._tradingSellListVO = [];
            for (var i = 0; i < data.length; i++) {
                var voTemp = vo.fromPool(vo.TradingSellListVO);
                voTemp.decode(data[i]);
                this._tradingSellListVO.push(voTemp);
            }
        };
        Object.defineProperty(ModelTradingSell.prototype, "tradingSellListVO", {
            get: function () {
                return this._tradingSellListVO;
            },
            enumerable: true,
            configurable: true
        });
        ModelTradingSell.prototype.initTradingSellRecord = function (data) {
            this._tradingSellRecordVO = [];
            for (var i = 0; i < data.length; i++) {
                var voTemp = vo.fromPool(vo.TradingSellRecordVO);
                voTemp.decode(data[i]);
                this._tradingSellRecordVO.push(voTemp);
            }
        };
        Object.defineProperty(ModelTradingSell.prototype, "tradingSellRecordVO", {
            get: function () {
                return this._tradingSellRecordVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTradingSell.prototype, "leftSellCount", {
            get: function () {
                return this._leftSellCount;
            },
            enumerable: true,
            configurable: true
        });
        /**请求我可以拍卖的商品 */
        ModelTradingSell.prototype.requestTradingSellMyItem = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Trade_GetStorageInfo);
            this.request(n.MessageMap.C2G_TRADE_GETSTORAGEINFO, msg, utils.Handler.create(this, function (data) {
                _this.initTradingSellMyItem(data.ItemList);
                _this._leftSellCount = data.LeftSellCount;
                if (successhandler)
                    successhandler.run();
            }));
        };
        /**请求所有的拍卖商品列表*/
        ModelTradingSell.prototype.requestTradingSellList = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Trade_GetSellInfo);
            this.request(n.MessageMap.C2G_TRADE_GETSELLINFO, msg, utils.Handler.create(this, function (data) {
                _this.initTradingSellList(data.SellItemList);
                if (successhandler)
                    successhandler.run();
            }));
        };
        /**请求拍卖记录*/
        ModelTradingSell.prototype.requestTradingSellRecord = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Trade_GetRecordList);
            this.request(n.MessageMap.C2G_TRADE_GETRECORDLIST, msg, utils.Handler.create(this, function (data) {
                _this.initTradingSellRecord(data.RecordList);
                if (successhandler)
                    successhandler.run();
            }));
        };
        /**请求出售商品*/
        ModelTradingSell.prototype.requestSellShop = function (id, count, price, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Trade_SellItem);
            msg.ItemId = id;
            msg.Count = count;
            msg.Price = price;
            this.request(n.MessageMap.C2G_TRADE_SELLITEM, msg, utils.Handler.create(this, function (data) {
                _this.initTradingSellMyItem(data.ItemList);
                _this._leftSellCount = _this._leftSellCount - 1;
                _this.dispatchEventWith(ModelTradingSell.TRADINGSELL_MYITEM_CHANGE);
                if (successhandler)
                    successhandler.run();
            }));
        };
        /**请求下架商品*/
        ModelTradingSell.prototype.requestCancelSell = function (orderId, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Trade_CancelSell);
            msg.OrderId = orderId;
            this.request(n.MessageMap.C2G_TRADE_CANCELSELL, msg, utils.Handler.create(this, function (data) {
                _this.initTradingSellList(data.ItemList);
                if (successhandler)
                    successhandler.run();
            }));
        };
        /**请求拾取商品*/
        ModelTradingSell.prototype.requestPickupShop = function (id, count, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Trade_PickUpStorageItem);
            msg.ItemId = id;
            msg.Count = count;
            this.request(n.MessageMap.C2G_TRADE_PICKUPSTORAGEITEM, msg, utils.Handler.create(this, function (data) {
                _this.initTradingSellMyItem(data.ItemList);
                _this.dispatchEventWith(ModelTradingSell.TRADINGSELL_MYITEM_CHANGE);
                if (successhandler)
                    successhandler.run();
            }));
        };
        /**请求购买商品*/
        ModelTradingSell.prototype.requestBuyShop = function (orderId, id, count, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Trade_BuyItem);
            msg.OrderId = orderId;
            msg.ItemId = id;
            msg.Count = count;
            this.request(n.MessageMap.C2G_TRADE_BUYITEM, msg, utils.Handler.create(this, function (data) {
                _this.initTradingSellList(data.SellItemList);
                _this.dispatchEventWith(ModelTradingSell.TRADINGSELL_BUY_CHANGE);
                if (successhandler)
                    successhandler.run();
            }));
        };
        ModelTradingSell.TRADINGSELL_MYITEM_CHANGE = "TRADINGSELL_MYITEM_CHANGE";
        ModelTradingSell.TRADINGSELL_BUY_CHANGE = "TRADINGSELL_BUY_CHANGE";
        return ModelTradingSell;
    }(mo.ModelBase));
    mo.ModelTradingSell = ModelTradingSell;
    __reflect(ModelTradingSell.prototype, "mo.ModelTradingSell");
})(mo || (mo = {}));

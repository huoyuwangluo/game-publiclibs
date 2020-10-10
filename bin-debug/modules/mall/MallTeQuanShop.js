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
var view;
(function (view) {
    var vip;
    (function (vip) {
        var MallTeQuanShop = (function (_super) {
            __extends(MallTeQuanShop, _super);
            function MallTeQuanShop() {
                return _super.call(this) || this;
            }
            MallTeQuanShop.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            MallTeQuanShop.prototype.enter = function (data) {
                if (this.scrollerdaojuShop.verticalScrollBar) {
                    this.scrollerdaojuShop.verticalScrollBar.autoVisibility = false;
                    this.scrollerdaojuShop.verticalScrollBar.visible = false;
                }
                this.updataDaoJuList();
            };
            MallTeQuanShop.prototype.exit = function () {
                this.clearList(this.daojushopList);
            };
            MallTeQuanShop.prototype.updataDaoJuList = function () {
                var _this = this;
                GameModels.shop.requestDaoJuBuyTimesShop(TypeShop.VIP_SHOP, utils.Handler.create(this, function () {
                    _this.daojushopList.dataProvider = _this._listData = new eui.ArrayCollection(GameModels.shop.daojuShopData);
                    // if (this._listData) {
                    // 	this._listData = new eui.ArrayCollection(GameModels.shop.daojuShopData);
                    // }
                    // else {
                    // 	this._listData.source = GameModels.shop.daojuShopData;
                    // }
                    // this.daojushopList.dataProvider = this._listData;
                }));
            };
            Object.defineProperty(MallTeQuanShop.prototype, "daoJulist", {
                get: function () {
                    return this._listData;
                },
                enumerable: true,
                configurable: true
            });
            return MallTeQuanShop;
        }(ui.MallTeQuanShopSkin));
        vip.MallTeQuanShop = MallTeQuanShop;
        __reflect(MallTeQuanShop.prototype, "view.vip.MallTeQuanShop", ["IModuleView", "egret.DisplayObject"]);
    })(vip = view.vip || (view.vip = {}));
})(view || (view = {}));

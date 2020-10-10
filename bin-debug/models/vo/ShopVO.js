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
var vo;
(function (vo) {
    var ShopVO = (function (_super) {
        __extends(ShopVO, _super);
        function ShopVO() {
            return _super.call(this) || this;
        }
        ShopVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._buyCount = 0;
            this._toDayBuyTimes = 0;
        };
        ShopVO.prototype.reset = function () {
            this._shopTemplate = null;
            this._template = null;
            this._buyCount = 0;
            this._toDayBuyTimes = 0;
        };
        ShopVO.prototype.decode = function (index) {
            this._shopTemplate = Templates.getTemplateById(templates.Map.SHOP, index);
            this._consumes = this._shopTemplate.consume.split("_");
            if (Math.floor(Number(this._shopTemplate.itemId) / 100000) == 1) {
                // logger.log("表示读取的是物品")
                this._template = Templates.getTemplateById(templates.Map.EQUIP, this._shopTemplate.itemId);
            }
            else {
                // logger.log("表示读取的是装备")
                this._template = Templates.getTemplateById(templates.Map.ITEM, this._shopTemplate.itemId);
            }
        };
        Object.defineProperty(ShopVO.prototype, "shoptemplate", {
            get: function () {
                return this._shopTemplate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "shopid", {
            get: function () {
                return this._shopTemplate.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "type", {
            get: function () {
                return this._shopTemplate.shopType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "templateProp", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        //付费方式
        ShopVO.prototype.getPayType = function () {
            var tmp = Templates.getTemplateById(templates.Map.ITEM, Number(this._consumes[0]));
            return tmp.icon;
        };
        //道具单价
        ShopVO.prototype.getPrice = function () {
            return Number(this._consumes[1]);
        };
        Object.defineProperty(ShopVO.prototype, "prompt", {
            get: function () {
                return this._template.prompt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "quality", {
            get: function () {
                return this._template.quality;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "icon", {
            get: function () {
                return this._template.icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "name", {
            get: function () {
                return this._template.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "job", {
            get: function () {
                return this._template.job;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "des", {
            get: function () {
                return this._template.des;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "lv", {
            get: function () {
                return this._template.lv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "itemID", {
            get: function () {
                return Number(this._shopTemplate.itemId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "count", {
            get: function () {
                return this._shopTemplate.itemCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "buyCount", {
            get: function () {
                return this._buyCount;
            },
            set: function (v) {
                this._buyCount = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "toDayBuyTimes", {
            get: function () {
                return this._toDayBuyTimes;
            },
            set: function (v) {
                this._toDayBuyTimes = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "buyTotalCount", {
            get: function () {
                return this._shopTemplate.buyTimes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopVO.prototype, "needStep", {
            get: function () {
                return this._shopTemplate.needStep;
            },
            enumerable: true,
            configurable: true
        });
        return ShopVO;
    }(vo.VOBase));
    vo.ShopVO = ShopVO;
    __reflect(ShopVO.prototype, "vo.ShopVO");
})(vo || (vo = {}));

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
    var ShopMysteryVo = (function (_super) {
        __extends(ShopMysteryVo, _super);
        function ShopMysteryVo() {
            return _super.call(this) || this;
        }
        ShopMysteryVo.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._shopValue = 0;
            this._shopQuality = 0;
        };
        ShopMysteryVo.prototype.reset = function () {
            this._shopTemplate = null;
            this._template = null;
            this._shopValue = 0;
            this._index = 0;
            this._shopQuality = 0;
        };
        ShopMysteryVo.prototype.decode = function (data) {
            this._shopTemplate = Templates.getTemplateById(templates.Map.STOREMYSTERY, data.StoreItemRefId);
            this._shopValue = data.BuyTimes;
            this._index = data.Index;
            this._shopQuality = this._shopTemplate.quality;
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
        Object.defineProperty(ShopMysteryVo.prototype, "index", {
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "shopQuality", {
            get: function () {
                return this._shopQuality;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "shoptemplate", {
            get: function () {
                return this._shopTemplate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "shopValue", {
            get: function () {
                return this._shopValue;
            },
            set: function (v) {
                this._shopValue = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "shopid", {
            get: function () {
                return this._shopTemplate.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "templateProp", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        //消耗道具id
        ShopMysteryVo.prototype.getconsumesId = function () {
            return this._consumes[0];
        };
        //道具单价
        ShopMysteryVo.prototype.getPrice = function () {
            return Number(this._consumes[1]);
        };
        Object.defineProperty(ShopMysteryVo.prototype, "prompt", {
            get: function () {
                return this._template.prompt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "quality", {
            get: function () {
                return this._template.quality;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "icon", {
            get: function () {
                return this._template.icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "name", {
            get: function () {
                return this._template.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "des", {
            get: function () {
                return this._template.des;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "lv", {
            get: function () {
                return this._template.lv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "itemID", {
            get: function () {
                return Number(this._shopTemplate.itemId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "count", {
            get: function () {
                return this._shopTemplate.itemCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "discount", {
            /**折扣 */
            get: function () {
                return this._shopTemplate.discount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMysteryVo.prototype, "shopName", {
            /**折扣 */
            get: function () {
                return this._shopTemplate.name;
            },
            enumerable: true,
            configurable: true
        });
        return ShopMysteryVo;
    }(vo.VOBase));
    vo.ShopMysteryVo = ShopMysteryVo;
    __reflect(ShopMysteryVo.prototype, "vo.ShopMysteryVo");
})(vo || (vo = {}));

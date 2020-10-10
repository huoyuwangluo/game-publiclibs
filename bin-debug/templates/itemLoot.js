var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var itemLoot = (function () {
        function itemLoot() {
        }
        Object.defineProperty(itemLoot.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemLoot.prototype, "itemLootId", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemLoot.prototype, "order", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemLoot.prototype, "itemId", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemLoot.prototype, "num", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemLoot.prototype, "weight", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemLoot.prototype, "lootNu", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemLoot.prototype, "lootAll", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        itemLoot.prototype.decode = function (data) {
            this._data = data;
        };
        return itemLoot;
    }());
    templates.itemLoot = itemLoot;
    __reflect(itemLoot.prototype, "templates.itemLoot");
})(templates || (templates = {}));

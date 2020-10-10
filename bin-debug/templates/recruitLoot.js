var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var recruitLoot = (function () {
        function recruitLoot() {
        }
        Object.defineProperty(recruitLoot.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(recruitLoot.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(recruitLoot.prototype, "country", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(recruitLoot.prototype, "quality", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(recruitLoot.prototype, "reachValue", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(recruitLoot.prototype, "lootLib", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(recruitLoot.prototype, "startDays", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(recruitLoot.prototype, "weight", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(recruitLoot.prototype, "campWeight", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        recruitLoot.prototype.decode = function (data) {
            this._data = data;
        };
        return recruitLoot;
    }());
    templates.recruitLoot = recruitLoot;
    __reflect(recruitLoot.prototype, "templates.recruitLoot");
})(templates || (templates = {}));

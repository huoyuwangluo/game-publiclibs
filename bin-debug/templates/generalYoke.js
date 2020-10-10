var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var generalYoke = (function () {
        function generalYoke() {
        }
        Object.defineProperty(generalYoke.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalYoke.prototype, "order", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalYoke.prototype, "general", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalYoke.prototype, "yoke", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalYoke.prototype, "properties", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        generalYoke.prototype.decode = function (data) {
            this._data = data;
        };
        return generalYoke;
    }());
    templates.generalYoke = generalYoke;
    __reflect(generalYoke.prototype, "templates.generalYoke");
})(templates || (templates = {}));

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var generalGroup = (function () {
        function generalGroup() {
        }
        Object.defineProperty(generalGroup.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalGroup.prototype, "group", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalGroup.prototype, "country", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalGroup.prototype, "count", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalGroup.prototype, "consume", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalGroup.prototype, "properties", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        generalGroup.prototype.decode = function (data) {
            this._data = data;
        };
        return generalGroup;
    }());
    templates.generalGroup = generalGroup;
    __reflect(generalGroup.prototype, "templates.generalGroup");
})(templates || (templates = {}));

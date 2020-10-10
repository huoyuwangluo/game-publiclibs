var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var bingfaProperties = (function () {
        function bingfaProperties() {
        }
        Object.defineProperty(bingfaProperties.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(bingfaProperties.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(bingfaProperties.prototype, "type", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(bingfaProperties.prototype, "properties", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        bingfaProperties.prototype.decode = function (data) {
            this._data = data;
        };
        return bingfaProperties;
    }());
    templates.bingfaProperties = bingfaProperties;
    __reflect(bingfaProperties.prototype, "templates.bingfaProperties");
})(templates || (templates = {}));

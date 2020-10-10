var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var generalLv = (function () {
        function generalLv() {
        }
        Object.defineProperty(generalLv.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalLv.prototype, "consume", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalLv.prototype, "nextId", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalLv.prototype, "properties", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        generalLv.prototype.decode = function (data) {
            this._data = data;
        };
        return generalLv;
    }());
    templates.generalLv = generalLv;
    __reflect(generalLv.prototype, "templates.generalLv");
})(templates || (templates = {}));

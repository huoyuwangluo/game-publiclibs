var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var smithyShenBingLv = (function () {
        function smithyShenBingLv() {
        }
        Object.defineProperty(smithyShenBingLv.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(smithyShenBingLv.prototype, "growBase", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(smithyShenBingLv.prototype, "growSplit", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(smithyShenBingLv.prototype, "growProP", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        smithyShenBingLv.prototype.decode = function (data) {
            this._data = data;
        };
        return smithyShenBingLv;
    }());
    templates.smithyShenBingLv = smithyShenBingLv;
    __reflect(smithyShenBingLv.prototype, "templates.smithyShenBingLv");
})(templates || (templates = {}));

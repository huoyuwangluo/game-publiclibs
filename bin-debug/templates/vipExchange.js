var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var vipExchange = (function () {
        function vipExchange() {
        }
        Object.defineProperty(vipExchange.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(vipExchange.prototype, "needVip", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(vipExchange.prototype, "consume1", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(vipExchange.prototype, "consume2", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(vipExchange.prototype, "needAct", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        vipExchange.prototype.decode = function (data) {
            this._data = data;
        };
        return vipExchange;
    }());
    templates.vipExchange = vipExchange;
    __reflect(vipExchange.prototype, "templates.vipExchange");
})(templates || (templates = {}));

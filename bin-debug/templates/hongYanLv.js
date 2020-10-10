var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var hongYanLv = (function () {
        function hongYanLv() {
        }
        Object.defineProperty(hongYanLv.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hongYanLv.prototype, "exp", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hongYanLv.prototype, "nextId", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hongYanLv.prototype, "growCon", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hongYanLv.prototype, "growGold", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hongYanLv.prototype, "growProP", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hongYanLv.prototype, "needlv", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        hongYanLv.prototype.decode = function (data) {
            this._data = data;
        };
        return hongYanLv;
    }());
    templates.hongYanLv = hongYanLv;
    __reflect(hongYanLv.prototype, "templates.hongYanLv");
})(templates || (templates = {}));

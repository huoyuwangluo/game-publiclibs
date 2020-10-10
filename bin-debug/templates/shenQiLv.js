var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var shenQiLv = (function () {
        function shenQiLv() {
        }
        Object.defineProperty(shenQiLv.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shenQiLv.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shenQiLv.prototype, "lv", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shenQiLv.prototype, "nextId", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shenQiLv.prototype, "consume", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shenQiLv.prototype, "score", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shenQiLv.prototype, "properties", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        shenQiLv.prototype.decode = function (data) {
            this._data = data;
        };
        return shenQiLv;
    }());
    templates.shenQiLv = shenQiLv;
    __reflect(shenQiLv.prototype, "templates.shenQiLv");
})(templates || (templates = {}));

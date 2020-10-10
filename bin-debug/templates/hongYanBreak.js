var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var hongYanBreak = (function () {
        function hongYanBreak() {
        }
        Object.defineProperty(hongYanBreak.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hongYanBreak.prototype, "star", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hongYanBreak.prototype, "needLv", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hongYanBreak.prototype, "child", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hongYanBreak.prototype, "nextId", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hongYanBreak.prototype, "properties", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hongYanBreak.prototype, "consume", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        hongYanBreak.prototype.decode = function (data) {
            this._data = data;
        };
        return hongYanBreak;
    }());
    templates.hongYanBreak = hongYanBreak;
    __reflect(hongYanBreak.prototype, "templates.hongYanBreak");
})(templates || (templates = {}));

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var wuXianShouTao = (function () {
        function wuXianShouTao() {
        }
        Object.defineProperty(wuXianShouTao.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuXianShouTao.prototype, "lv", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuXianShouTao.prototype, "nextId", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuXianShouTao.prototype, "consume", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuXianShouTao.prototype, "skillName", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuXianShouTao.prototype, "skillCD", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuXianShouTao.prototype, "dec", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuXianShouTao.prototype, "effect", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuXianShouTao.prototype, "noticeID", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuXianShouTao.prototype, "score", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuXianShouTao.prototype, "properties", {
            get: function () {
                return this._data[10];
            },
            enumerable: true,
            configurable: true
        });
        ;
        wuXianShouTao.prototype.decode = function (data) {
            this._data = data;
        };
        return wuXianShouTao;
    }());
    templates.wuXianShouTao = wuXianShouTao;
    __reflect(wuXianShouTao.prototype, "templates.wuXianShouTao");
})(templates || (templates = {}));

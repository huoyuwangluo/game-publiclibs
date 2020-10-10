var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var haoHuaZhuanPan = (function () {
        function haoHuaZhuanPan() {
        }
        Object.defineProperty(haoHuaZhuanPan.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(haoHuaZhuanPan.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(haoHuaZhuanPan.prototype, "rewardType", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(haoHuaZhuanPan.prototype, "pos", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(haoHuaZhuanPan.prototype, "serverPool", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(haoHuaZhuanPan.prototype, "serverStep", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(haoHuaZhuanPan.prototype, "serverLimit", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(haoHuaZhuanPan.prototype, "personalPool", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(haoHuaZhuanPan.prototype, "quitMark", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(haoHuaZhuanPan.prototype, "value", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(haoHuaZhuanPan.prototype, "itemId", {
            get: function () {
                return this._data[10];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(haoHuaZhuanPan.prototype, "isShow", {
            get: function () {
                return this._data[11];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(haoHuaZhuanPan.prototype, "CD", {
            get: function () {
                return this._data[12];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(haoHuaZhuanPan.prototype, "isLight", {
            get: function () {
                return this._data[13];
            },
            enumerable: true,
            configurable: true
        });
        ;
        haoHuaZhuanPan.prototype.decode = function (data) {
            this._data = data;
        };
        return haoHuaZhuanPan;
    }());
    templates.haoHuaZhuanPan = haoHuaZhuanPan;
    __reflect(haoHuaZhuanPan.prototype, "templates.haoHuaZhuanPan");
})(templates || (templates = {}));

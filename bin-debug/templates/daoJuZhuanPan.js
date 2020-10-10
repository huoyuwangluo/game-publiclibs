var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var daoJuZhuanPan = (function () {
        function daoJuZhuanPan() {
        }
        Object.defineProperty(daoJuZhuanPan.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(daoJuZhuanPan.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(daoJuZhuanPan.prototype, "pos", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(daoJuZhuanPan.prototype, "posWeight", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(daoJuZhuanPan.prototype, "itemId", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(daoJuZhuanPan.prototype, "isShow", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(daoJuZhuanPan.prototype, "CD", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(daoJuZhuanPan.prototype, "ServerCD", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        daoJuZhuanPan.prototype.decode = function (data) {
            this._data = data;
        };
        return daoJuZhuanPan;
    }());
    templates.daoJuZhuanPan = daoJuZhuanPan;
    __reflect(daoJuZhuanPan.prototype, "templates.daoJuZhuanPan");
})(templates || (templates = {}));

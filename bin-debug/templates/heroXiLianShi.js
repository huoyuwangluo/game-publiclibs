var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var heroXiLianShi = (function () {
        function heroXiLianShi() {
        }
        Object.defineProperty(heroXiLianShi.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroXiLianShi.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroXiLianShi.prototype, "minStar", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroXiLianShi.prototype, "maxStar", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroXiLianShi.prototype, "parm", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroXiLianShi.prototype, "needExp", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroXiLianShi.prototype, "needLv", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroXiLianShi.prototype, "openOnePre", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroXiLianShi.prototype, "openTwoPre", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroXiLianShi.prototype, "openNum", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroXiLianShi.prototype, "des", {
            get: function () {
                return this._data[10];
            },
            enumerable: true,
            configurable: true
        });
        ;
        heroXiLianShi.prototype.decode = function (data) {
            this._data = data;
        };
        return heroXiLianShi;
    }());
    templates.heroXiLianShi = heroXiLianShi;
    __reflect(heroXiLianShi.prototype, "templates.heroXiLianShi");
})(templates || (templates = {}));

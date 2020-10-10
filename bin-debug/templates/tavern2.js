var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var tavern2 = (function () {
        function tavern2() {
        }
        Object.defineProperty(tavern2.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(tavern2.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(tavern2.prototype, "pos", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(tavern2.prototype, "serverPool", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(tavern2.prototype, "itemId", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(tavern2.prototype, "isShow", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(tavern2.prototype, "serverStep", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(tavern2.prototype, "serverLimit", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        tavern2.prototype.decode = function (data) {
            this._data = data;
        };
        return tavern2;
    }());
    templates.tavern2 = tavern2;
    __reflect(tavern2.prototype, "templates.tavern2");
})(templates || (templates = {}));

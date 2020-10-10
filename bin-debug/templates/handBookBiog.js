var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var handBookBiog = (function () {
        function handBookBiog() {
        }
        Object.defineProperty(handBookBiog.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBiog.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBiog.prototype, "unFinishDes", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBiog.prototype, "biogDes", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBiog.prototype, "target", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBiog.prototype, "rewards", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBiog.prototype, "properties", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        handBookBiog.prototype.decode = function (data) {
            this._data = data;
        };
        return handBookBiog;
    }());
    templates.handBookBiog = handBookBiog;
    __reflect(handBookBiog.prototype, "templates.handBookBiog");
})(templates || (templates = {}));

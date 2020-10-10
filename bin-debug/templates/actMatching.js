var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var actMatching = (function () {
        function actMatching() {
        }
        Object.defineProperty(actMatching.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actMatching.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actMatching.prototype, "name", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actMatching.prototype, "des", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actMatching.prototype, "value", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actMatching.prototype, "title", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actMatching.prototype, "discount", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actMatching.prototype, "randCount", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actMatching.prototype, "threeDayMin", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actMatching.prototype, "threeDayMax", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actMatching.prototype, "consume", {
            get: function () {
                return this._data[10];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actMatching.prototype, "rewards", {
            get: function () {
                return this._data[11];
            },
            enumerable: true,
            configurable: true
        });
        ;
        actMatching.prototype.decode = function (data) {
            this._data = data;
        };
        return actMatching;
    }());
    templates.actMatching = actMatching;
    __reflect(actMatching.prototype, "templates.actMatching");
})(templates || (templates = {}));

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var lifeSoulLine = (function () {
        function lifeSoulLine() {
        }
        Object.defineProperty(lifeSoulLine.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(lifeSoulLine.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(lifeSoulLine.prototype, "pos", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(lifeSoulLine.prototype, "maxLv", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(lifeSoulLine.prototype, "needLv", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(lifeSoulLine.prototype, "openid", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(lifeSoulLine.prototype, "score", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(lifeSoulLine.prototype, "properties", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(lifeSoulLine.prototype, "propertiesRes", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        lifeSoulLine.prototype.decode = function (data) {
            this._data = data;
        };
        return lifeSoulLine;
    }());
    templates.lifeSoulLine = lifeSoulLine;
    __reflect(lifeSoulLine.prototype, "templates.lifeSoulLine");
})(templates || (templates = {}));

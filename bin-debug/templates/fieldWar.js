var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var fieldWar = (function () {
        function fieldWar() {
        }
        Object.defineProperty(fieldWar.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(fieldWar.prototype, "minLv", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(fieldWar.prototype, "maxLv", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(fieldWar.prototype, "rewards", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(fieldWar.prototype, "fixRewards", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(fieldWar.prototype, "dropId", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        fieldWar.prototype.decode = function (data) {
            this._data = data;
        };
        return fieldWar;
    }());
    templates.fieldWar = fieldWar;
    __reflect(fieldWar.prototype, "templates.fieldWar");
})(templates || (templates = {}));

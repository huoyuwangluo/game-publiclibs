var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var cityNpc = (function () {
        function cityNpc() {
        }
        Object.defineProperty(cityNpc.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(cityNpc.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(cityNpc.prototype, "type", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(cityNpc.prototype, "titleRes", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(cityNpc.prototype, "npcRes", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(cityNpc.prototype, "open", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        cityNpc.prototype.decode = function (data) {
            this._data = data;
        };
        return cityNpc;
    }());
    templates.cityNpc = cityNpc;
    __reflect(cityNpc.prototype, "templates.cityNpc");
})(templates || (templates = {}));

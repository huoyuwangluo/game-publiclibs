var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var mainMap = (function () {
        function mainMap() {
        }
        Object.defineProperty(mainMap.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mainMap.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mainMap.prototype, "des", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mainMap.prototype, "cityStart", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mainMap.prototype, "cityEnd", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        mainMap.prototype.decode = function (data) {
            this._data = data;
        };
        return mainMap;
    }());
    templates.mainMap = mainMap;
    __reflect(mainMap.prototype, "templates.mainMap");
})(templates || (templates = {}));

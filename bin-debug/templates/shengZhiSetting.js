var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var shengZhiSetting = (function () {
        function shengZhiSetting() {
        }
        Object.defineProperty(shengZhiSetting.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shengZhiSetting.prototype, "quality", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shengZhiSetting.prototype, "star", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shengZhiSetting.prototype, "value", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shengZhiSetting.prototype, "weight", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shengZhiSetting.prototype, "limit", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shengZhiSetting.prototype, "duration", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        shengZhiSetting.prototype.decode = function (data) {
            this._data = data;
        };
        return shengZhiSetting;
    }());
    templates.shengZhiSetting = shengZhiSetting;
    __reflect(shengZhiSetting.prototype, "templates.shengZhiSetting");
})(templates || (templates = {}));

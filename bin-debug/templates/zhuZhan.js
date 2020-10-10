var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var zhuZhan = (function () {
        function zhuZhan() {
        }
        Object.defineProperty(zhuZhan.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(zhuZhan.prototype, "setting", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(zhuZhan.prototype, "properties", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        zhuZhan.prototype.decode = function (data) {
            this._data = data;
        };
        return zhuZhan;
    }());
    templates.zhuZhan = zhuZhan;
    __reflect(zhuZhan.prototype, "templates.zhuZhan");
})(templates || (templates = {}));

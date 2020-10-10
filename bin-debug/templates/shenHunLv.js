var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var shenHunLv = (function () {
        function shenHunLv() {
        }
        Object.defineProperty(shenHunLv.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shenHunLv.prototype, "growConsumePerc", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shenHunLv.prototype, "growConsumeSplitPerc", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shenHunLv.prototype, "growProperPerc", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        shenHunLv.prototype.decode = function (data) {
            this._data = data;
        };
        return shenHunLv;
    }());
    templates.shenHunLv = shenHunLv;
    __reflect(shenHunLv.prototype, "templates.shenHunLv");
})(templates || (templates = {}));

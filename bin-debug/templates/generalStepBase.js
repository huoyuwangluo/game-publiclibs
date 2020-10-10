var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var generalStepBase = (function () {
        function generalStepBase() {
        }
        Object.defineProperty(generalStepBase.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalStepBase.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalStepBase.prototype, "maxLv", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalStepBase.prototype, "baseCon", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalStepBase.prototype, "properties", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        generalStepBase.prototype.decode = function (data) {
            this._data = data;
        };
        return generalStepBase;
    }());
    templates.generalStepBase = generalStepBase;
    __reflect(generalStepBase.prototype, "templates.generalStepBase");
})(templates || (templates = {}));

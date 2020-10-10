var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var handBookStep = (function () {
        function handBookStep() {
        }
        Object.defineProperty(handBookStep.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookStep.prototype, "step", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookStep.prototype, "nextId", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookStep.prototype, "growCon", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookStep.prototype, "growPro", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        handBookStep.prototype.decode = function (data) {
            this._data = data;
        };
        return handBookStep;
    }());
    templates.handBookStep = handBookStep;
    __reflect(handBookStep.prototype, "templates.handBookStep");
})(templates || (templates = {}));

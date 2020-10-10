var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var equipContractStep = (function () {
        function equipContractStep() {
        }
        Object.defineProperty(equipContractStep.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equipContractStep.prototype, "pos", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equipContractStep.prototype, "needLv", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equipContractStep.prototype, "step", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equipContractStep.prototype, "nextId", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equipContractStep.prototype, "consume", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equipContractStep.prototype, "properties", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        equipContractStep.prototype.decode = function (data) {
            this._data = data;
        };
        return equipContractStep;
    }());
    templates.equipContractStep = equipContractStep;
    __reflect(equipContractStep.prototype, "templates.equipContractStep");
})(templates || (templates = {}));

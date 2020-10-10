var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var generalRec = (function () {
        function generalRec() {
        }
        Object.defineProperty(generalRec.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalRec.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalRec.prototype, "des1", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalRec.prototype, "des2", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalRec.prototype, "general", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        generalRec.prototype.decode = function (data) {
            this._data = data;
        };
        return generalRec;
    }());
    templates.generalRec = generalRec;
    __reflect(generalRec.prototype, "templates.generalRec");
})(templates || (templates = {}));

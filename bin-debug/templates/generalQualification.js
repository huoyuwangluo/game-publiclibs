var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var generalQualification = (function () {
        function generalQualification() {
        }
        Object.defineProperty(generalQualification.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalQualification.prototype, "minQua", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalQualification.prototype, "maxQua", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalQualification.prototype, "proRatio", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        generalQualification.prototype.decode = function (data) {
            this._data = data;
        };
        return generalQualification;
    }());
    templates.generalQualification = generalQualification;
    __reflect(generalQualification.prototype, "templates.generalQualification");
})(templates || (templates = {}));

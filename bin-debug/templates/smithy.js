var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var smithy = (function () {
        function smithy() {
        }
        Object.defineProperty(smithy.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(smithy.prototype, "needExp", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        smithy.prototype.decode = function (data) {
            this._data = data;
        };
        return smithy;
    }());
    templates.smithy = smithy;
    __reflect(smithy.prototype, "templates.smithy");
})(templates || (templates = {}));

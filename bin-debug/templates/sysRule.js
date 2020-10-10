var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var sysRule = (function () {
        function sysRule() {
        }
        Object.defineProperty(sysRule.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(sysRule.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(sysRule.prototype, "des", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        sysRule.prototype.decode = function (data) {
            this._data = data;
        };
        return sysRule;
    }());
    templates.sysRule = sysRule;
    __reflect(sysRule.prototype, "templates.sysRule");
})(templates || (templates = {}));

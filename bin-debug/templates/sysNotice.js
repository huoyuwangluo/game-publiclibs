var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var sysNotice = (function () {
        function sysNotice() {
        }
        Object.defineProperty(sysNotice.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(sysNotice.prototype, "desc", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(sysNotice.prototype, "type", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(sysNotice.prototype, "ifsend", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(sysNotice.prototype, "isRndpush", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(sysNotice.prototype, "description", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        sysNotice.prototype.decode = function (data) {
            this._data = data;
        };
        return sysNotice;
    }());
    templates.sysNotice = sysNotice;
    __reflect(sysNotice.prototype, "templates.sysNotice");
})(templates || (templates = {}));

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var kingWarRecord = (function () {
        function kingWarRecord() {
        }
        Object.defineProperty(kingWarRecord.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(kingWarRecord.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(kingWarRecord.prototype, "des", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        kingWarRecord.prototype.decode = function (data) {
            this._data = data;
        };
        return kingWarRecord;
    }());
    templates.kingWarRecord = kingWarRecord;
    __reflect(kingWarRecord.prototype, "templates.kingWarRecord");
})(templates || (templates = {}));

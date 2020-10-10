var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var itemAlarm = (function () {
        function itemAlarm() {
        }
        Object.defineProperty(itemAlarm.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemAlarm.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemAlarm.prototype, "numMax", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        itemAlarm.prototype.decode = function (data) {
            this._data = data;
        };
        return itemAlarm;
    }());
    templates.itemAlarm = itemAlarm;
    __reflect(itemAlarm.prototype, "templates.itemAlarm");
})(templates || (templates = {}));

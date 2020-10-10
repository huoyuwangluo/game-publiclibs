var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var MapNpcData = (function () {
        function MapNpcData() {
            this.autoRecover = true;
            this.toPoolTime = 0;
        }
        MapNpcData.prototype.initialize = function (node, data) {
            this.node = node;
            this.data = data;
        };
        MapNpcData.prototype.reset = function () {
            this.node = null;
            this.data = null;
        };
        Object.defineProperty(MapNpcData.prototype, "id", {
            get: function () {
                return this.data.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapNpcData.prototype, "index", {
            get: function () {
                return this.data.index;
            },
            enumerable: true,
            configurable: true
        });
        return MapNpcData;
    }());
    s.MapNpcData = MapNpcData;
    __reflect(MapNpcData.prototype, "s.MapNpcData", ["utils.IPool"]);
})(s || (s = {}));

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var MapMonsterData = (function () {
        function MapMonsterData() {
            this.autoRecover = true;
            this.toPoolTime = 0;
        }
        MapMonsterData.prototype.initialize = function (node, data) {
            this.node = node;
            this.data = data;
        };
        MapMonsterData.prototype.reset = function () {
            this.node = null;
            this.data = null;
        };
        Object.defineProperty(MapMonsterData.prototype, "id", {
            get: function () {
                return this.data.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapMonsterData.prototype, "index", {
            get: function () {
                return this.data.index;
            },
            enumerable: true,
            configurable: true
        });
        return MapMonsterData;
    }());
    s.MapMonsterData = MapMonsterData;
    __reflect(MapMonsterData.prototype, "s.MapMonsterData", ["utils.IPool"]);
})(s || (s = {}));

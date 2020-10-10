var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var MapRobotData = (function () {
        function MapRobotData() {
            this.autoRecover = true;
            this.toPoolTime = 0;
        }
        MapRobotData.prototype.initialize = function (node, data) {
            this.node = node;
            this.data = data;
        };
        MapRobotData.prototype.reset = function () {
            this.node = null;
            this.data = null;
        };
        Object.defineProperty(MapRobotData.prototype, "id", {
            get: function () {
                return this.data.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapRobotData.prototype, "index", {
            get: function () {
                return this.data.index;
            },
            enumerable: true,
            configurable: true
        });
        return MapRobotData;
    }());
    s.MapRobotData = MapRobotData;
    __reflect(MapRobotData.prototype, "s.MapRobotData", ["utils.IPool"]);
})(s || (s = {}));

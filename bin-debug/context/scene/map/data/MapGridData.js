var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var MapGridData = (function () {
        function MapGridData() {
        }
        MapGridData.prototype.initialize = function (x, y, type) {
            if (type === void 0) { type = 0; }
            this.x = x;
            this.y = y;
            this.type = type;
        };
        MapGridData.prototype.reset = function () {
            this.x = 0;
            this.y = 0;
            this.type = 0;
        };
        MapGridData.fromPool = function (x, y, type) {
            if (type === void 0) { type = 0; }
            var grid;
            if (MapGridData._pool.length) {
                grid = MapGridData._pool.pop();
            }
            grid = new MapGridData();
            grid.initialize(x, y, type);
            return grid;
        };
        MapGridData.toPool = function (v) {
            if (MapGridData._pool.indexOf(v) < 0) {
                v.reset();
                MapGridData._pool.push(v);
            }
        };
        MapGridData._pool = [];
        return MapGridData;
    }());
    s.MapGridData = MapGridData;
    __reflect(MapGridData.prototype, "s.MapGridData");
})(s || (s = {}));

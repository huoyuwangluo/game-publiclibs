var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var s;
(function (s) {
    var MapCache = (function (_super) {
        __extends(MapCache, _super);
        function MapCache() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MapCache.fromPool = function (data) {
            var block;
            if (!MapCache._pool.length) {
                block = new s.MapBlock();
            }
            else {
                block = MapCache._pool.pop();
            }
            block.initialize(data);
            return block;
        };
        MapCache.toPool = function (block) {
            if (MapCache._pool.indexOf(block) < 0) {
                if (block.parent) {
                    block.parent.removeChild(block);
                }
                block.reset();
                MapCache._pool.push(block);
            }
        };
        MapCache.clear = function () {
            s.MapLoaderThread.instance.clear();
            s.MapRes.clearRes();
        };
        MapCache._pool = [];
        return MapCache;
    }(egret.Bitmap));
    s.MapCache = MapCache;
    __reflect(MapCache.prototype, "s.MapCache");
})(s || (s = {}));

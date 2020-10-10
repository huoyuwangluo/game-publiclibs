var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var MapRes = (function () {
        function MapRes() {
        }
        MapRes.getRes = function (url) {
            if (!this._cache[url]) {
                this._cache[url] = utils.ObjectPool.from(s.MapResData, true, url);
            }
            return this._cache[url];
        };
        MapRes.clearRes = function () {
            if (this._cache) {
                for (var url in this._cache) {
                    utils.ObjectPool.to(this._cache[url], true);
                    this._cache[url] = null;
                    delete this._cache[url];
                }
            }
        };
        MapRes.getCache = function () {
            return MapRes._cache;
        };
        MapRes._cache = {};
        return MapRes;
    }());
    s.MapRes = MapRes;
    __reflect(MapRes.prototype, "s.MapRes");
})(s || (s = {}));

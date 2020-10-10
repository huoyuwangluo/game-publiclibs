var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var MapLoaderThread = (function () {
        function MapLoaderThread() {
            this._max = 3;
            this._index = 0;
            this._threads = [];
            for (var i = 0; i < this._max; i++) {
                var loader = new s.MapQueueLoader();
                this._threads.push(loader);
                loader.onEnd(this, this.endHandler);
            }
        }
        Object.defineProperty(MapLoaderThread, "instance", {
            get: function () {
                if (!MapLoaderThread._instance) {
                    MapLoaderThread._instance = new MapLoaderThread();
                }
                return MapLoaderThread._instance;
            },
            enumerable: true,
            configurable: true
        });
        MapLoaderThread.prototype.add = function (url, caller, method) {
            this._threads[this._index].add(url, caller, method);
            this._index++;
            if (this._index >= this._max) {
                this._index = 0;
            }
        };
        MapLoaderThread.prototype.remove = function (caller) {
            for (var i = 0; i < this._threads.length; i++) {
                this._threads[i].remove(caller);
            }
        };
        MapLoaderThread.prototype.clear = function () {
            for (var _i = 0, _a = this._threads; _i < _a.length; _i++) {
                var loader = _a[_i];
                if (loader.hasQueue) {
                    loader.clear();
                }
            }
        };
        MapLoaderThread.prototype.onEnd = function (caller, method) {
            this.offEnd();
            this._endHandler = utils.Handler.create(caller, method, null, false);
        };
        MapLoaderThread.prototype.offEnd = function () {
            if (this._endHandler) {
                this._endHandler.recover();
                this._endHandler = null;
            }
        };
        MapLoaderThread.prototype.endHandler = function () {
            for (var _i = 0, _a = this._threads; _i < _a.length; _i++) {
                var loader = _a[_i];
                if (loader.hasQueue) {
                    return;
                }
            }
            if (this._endHandler) {
                this._endHandler.run();
            }
        };
        return MapLoaderThread;
    }());
    s.MapLoaderThread = MapLoaderThread;
    __reflect(MapLoaderThread.prototype, "s.MapLoaderThread");
})(s || (s = {}));

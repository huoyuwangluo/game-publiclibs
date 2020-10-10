var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var MapQueueLoader = (function () {
        function MapQueueLoader() {
            this._queue = [];
        }
        MapQueueLoader.prototype.add = function (url, caller, method) {
            var resData = s.MapRes.getRes(url);
            if (resData.texture) {
                method.call(caller, resData.texture);
                return;
            }
            resData.onComplete(caller, method);
            this._queue.push(resData);
            if (!this._loader) {
                this._loader = utils.ObjectPool.from(game.ImageBaseLoader);
            }
            this.next();
        };
        MapQueueLoader.prototype.remove = function (caller) {
            if (this._cur && this._cur.caller == caller) {
                this._cur.offComplete();
            }
            for (var i = 0; i < this._queue.length; i++) {
                if (this._queue[i].caller == caller) {
                    this._queue[i].offComplete();
                    this._queue.splice(i, 1);
                    i--;
                }
            }
        };
        MapQueueLoader.prototype.has = function (url) {
            if (this._cur.url == url)
                return true;
            for (var _i = 0, _a = this._queue; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.url == url)
                    return true;
            }
            return false;
        };
        MapQueueLoader.prototype.next = function () {
            if (!this._queue.length || this._isLoading)
                return;
            this._isLoading = true;
            this._cur = this._queue.shift();
            this._loader.reset();
            this._loader.initialize(this._cur.url);
            this._loader.start(this, this.itemLoadedHandler);
        };
        MapQueueLoader.prototype.itemLoadedHandler = function (texture) {
            this._isLoading = false;
            if (!this._cur) {
                texture.dispose();
                return;
            }
            this._cur.texture = texture;
            this._cur.callComplete();
            if (!this._queue.length) {
                if (this._endMethod)
                    this._endMethod.call(this._endCaller);
                this._endMethod = this._endCaller = null;
            }
            this.next();
        };
        MapQueueLoader.prototype.clear = function () {
            if (this._loader) {
                utils.ObjectPool.to(this._loader, true);
                this._loader = null;
            }
            if (this._queue.length) {
                this._queue.length = 0;
            }
            this._cur = null;
            this._isLoading = false;
            this._endMethod = this._endCaller = null;
        };
        MapQueueLoader.prototype.onEnd = function (caller, method) {
            this._endCaller = caller;
            this._endMethod = method;
        };
        Object.defineProperty(MapQueueLoader.prototype, "hasQueue", {
            get: function () {
                return this._queue.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        return MapQueueLoader;
    }());
    s.MapQueueLoader = MapQueueLoader;
    __reflect(MapQueueLoader.prototype, "s.MapQueueLoader");
})(s || (s = {}));

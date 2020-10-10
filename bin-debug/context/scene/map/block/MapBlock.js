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
    var MapBlock = (function (_super) {
        __extends(MapBlock, _super);
        function MapBlock() {
            return _super.call(this) || this;
        }
        MapBlock.prototype.initialize = function (data) {
            this._mapData = data;
            return this;
        };
        MapBlock.prototype.reset = function () {
            this.texture = null;
            s.MapLoaderThread.instance.remove(this);
            this._url = null;
        };
        MapBlock.prototype.load = function (a, b) {
            if (!this._mapData.hasData)
                return;
            var url = game.MapConfig.BLOCK_PATH + this._mapData.mapRes + "/" + a + "_" + b + ".jpg";
            if (this._url != url) {
                this._url = url;
                this.x = a * game.MapConfig.BLOCK_SIZE;
                this.y = b * game.MapConfig.BLOCK_SIZE;
                s.MapLoaderThread.instance.add(this._url, this, function (data) {
                    this.texture = data;
                });
            }
        };
        return MapBlock;
    }(egret.Bitmap));
    s.MapBlock = MapBlock;
    __reflect(MapBlock.prototype, "s.MapBlock");
})(s || (s = {}));

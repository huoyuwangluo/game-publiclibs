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
    var MapThum = (function (_super) {
        __extends(MapThum, _super);
        function MapThum() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MapThum.prototype.initialize = function (id, isThum, caller, method) {
            if (isThum === void 0) { isThum = true; }
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            var url = "";
            if (isThum) {
                url = game.GameConfig.resource_other + "/map/thum/" + id + ".jpg";
            }
            else {
                url = game.GameConfig.resource_other + "/map/copy/" + id + ".jpg";
            }
            s.MapLoaderThread.instance.add(url, this, function (data) {
                this.texture = data;
                if (method)
                    method.call(caller);
            });
            return this;
        };
        MapThum.prototype.reset = function () {
            if (this.texture) {
                var data = this.texture;
                this.texture = null;
                data.dispose();
            }
        };
        return MapThum;
    }(egret.Bitmap));
    s.MapThum = MapThum;
    __reflect(MapThum.prototype, "s.MapThum");
})(s || (s = {}));

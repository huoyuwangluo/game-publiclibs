var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var MapResData = (function () {
        function MapResData() {
            this.autoRecover = true;
        }
        MapResData.prototype.initialize = function (url) {
            this.url = url;
        };
        MapResData.prototype.reset = function () {
            this.url = null;
            this.caller = null;
            this.complete = null;
            if (this.texture) {
                this.texture.dispose();
                this.texture = null;
            }
        };
        MapResData.prototype.onComplete = function (caller, complete) {
            this.caller = caller;
            this.complete = complete;
        };
        MapResData.prototype.offComplete = function () {
            this.caller = null;
            this.complete = null;
        };
        MapResData.prototype.callComplete = function () {
            if (this.complete) {
                this.complete.call(this.caller, this.texture);
            }
        };
        return MapResData;
    }());
    s.MapResData = MapResData;
    __reflect(MapResData.prototype, "s.MapResData", ["utils.IPool"]);
})(s || (s = {}));

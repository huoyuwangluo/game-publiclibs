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
    var GamePagodaWuHun = (function (_super) {
        __extends(GamePagodaWuHun, _super);
        function GamePagodaWuHun() {
            var _this = _super.call(this, TypeGame.PAGODA_WUHUN) || this;
            _this.mapId = 25003;
            return _this;
        }
        return GamePagodaWuHun;
    }(s.GamePagodaPet));
    s.GamePagodaWuHun = GamePagodaWuHun;
    __reflect(GamePagodaWuHun.prototype, "s.GamePagodaWuHun");
})(s || (s = {}));

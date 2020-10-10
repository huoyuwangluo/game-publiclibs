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
    var GamePagodaPet = (function (_super) {
        __extends(GamePagodaPet, _super);
        function GamePagodaPet(type) {
            if (type === void 0) { type = TypeGame.PAGODA_PET; }
            var _this = _super.call(this, type) || this;
            _this.mapId = 25001;
            return _this;
        }
        return GamePagodaPet;
    }(s.GamePagoda));
    s.GamePagodaPet = GamePagodaPet;
    __reflect(GamePagodaPet.prototype, "s.GamePagodaPet");
})(s || (s = {}));

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
    var GameShiLiTa3 = (function (_super) {
        __extends(GameShiLiTa3, _super);
        function GameShiLiTa3(type) {
            return _super.call(this, TypeGame.SHILITA_3) || this;
        }
        return GameShiLiTa3;
    }(s.GameShiLiTa1));
    s.GameShiLiTa3 = GameShiLiTa3;
    __reflect(GameShiLiTa3.prototype, "s.GameShiLiTa3");
})(s || (s = {}));

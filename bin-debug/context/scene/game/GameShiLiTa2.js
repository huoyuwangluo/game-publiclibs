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
    var GameShiLiTa2 = (function (_super) {
        __extends(GameShiLiTa2, _super);
        function GameShiLiTa2(type) {
            return _super.call(this, TypeGame.SHILITA_2) || this;
        }
        return GameShiLiTa2;
    }(s.GameShiLiTa1));
    s.GameShiLiTa2 = GameShiLiTa2;
    __reflect(GameShiLiTa2.prototype, "s.GameShiLiTa2");
})(s || (s = {}));

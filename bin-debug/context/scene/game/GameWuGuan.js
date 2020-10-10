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
    var GameWuGuan = (function (_super) {
        __extends(GameWuGuan, _super);
        function GameWuGuan(type) {
            var _this = _super.call(this, TypeGame.WUGUAN_FIGHT) || this;
            _this._countdownValue = 3;
            return _this;
        }
        GameWuGuan.prototype.enter = function () {
            _super.prototype.enter.call(this, 27001);
        };
        GameWuGuan.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.guanzhi;
        };
        GameWuGuan.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 1;
        };
        return GameWuGuan;
    }(s.GameSiginPlayerBoss));
    s.GameWuGuan = GameWuGuan;
    __reflect(GameWuGuan.prototype, "s.GameWuGuan");
})(s || (s = {}));

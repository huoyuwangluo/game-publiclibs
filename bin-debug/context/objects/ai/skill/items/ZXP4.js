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
    var ZXP4 = (function (_super) {
        __extends(ZXP4, _super);
        function ZXP4() {
            return _super.call(this) || this;
            //this._type = TypeSkill.Z_XP4;
        }
        ZXP4.prototype.rockAfter = function () {
            _super.prototype.rockAfter.call(this);
            if (app.gameContext.isMySelf(this._body)) {
                this.doShock();
            }
        };
        ZXP4.prototype.doShock = function () {
            this.shockScreen(1200);
            this.splitScreen();
        };
        return ZXP4;
    }(s.CShunFa));
    s.ZXP4 = ZXP4;
    __reflect(ZXP4.prototype, "s.ZXP4");
})(s || (s = {}));

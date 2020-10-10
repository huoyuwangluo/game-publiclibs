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
    var ZXP1 = (function (_super) {
        __extends(ZXP1, _super);
        function ZXP1() {
            return _super.call(this) || this;
            //this._type = TypeSkill.Z_XP1;
            //this._fullDirect = true;
        }
        //this.shockScreen();
        ZXP1.prototype.rockAfter = function () {
            //super.rockAfter();
            //utils.timer.once(100,this,this.doShock,true);
            if (app.gameContext.isMySelf(this._body)) {
                this.doShock();
            }
        };
        ZXP1.prototype.doShock = function () {
            this.shockScreen(1200);
            this.splitScreen();
        };
        return ZXP1;
    }(s.CShunFaResDirect));
    s.ZXP1 = ZXP1;
    __reflect(ZXP1.prototype, "s.ZXP1");
})(s || (s = {}));

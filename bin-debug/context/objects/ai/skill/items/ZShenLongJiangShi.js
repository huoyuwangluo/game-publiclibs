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
    var ZShenLongJiangShi = (function (_super) {
        __extends(ZShenLongJiangShi, _super);
        //private _effect: AnimationBitmap;
        /**坐骑-神龙降世特殊技能表现*/
        function ZShenLongJiangShi() {
            return _super.call(this) || this;
            //this._type = TypeSkill.Z_SLJS;
            //super(TypeSkill.Z_FTLZ, "0", "0", "0", "4024");
            //super(TypeSkill.Z_FTLZ, "0", "0", "0", "4024");
        }
        ZShenLongJiangShi.prototype.start = function () {
            //(this._body as GamePlayer).setHorseSkillState(true);
            _super.prototype.start.call(this);
            //(this._body as GamePlayer).setHorseSkillState(true);
        };
        ZShenLongJiangShi.prototype.rockAfter = function () {
            //super.rockAfter();
            this.shockScreen(600);
            //utils.timer.once(300,this,this.onEnd);
        };
        return ZShenLongJiangShi;
    }(s.CShunFaSelf));
    s.ZShenLongJiangShi = ZShenLongJiangShi;
    __reflect(ZShenLongJiangShi.prototype, "s.ZShenLongJiangShi");
})(s || (s = {}));

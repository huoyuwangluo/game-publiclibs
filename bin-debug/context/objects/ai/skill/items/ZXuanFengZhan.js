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
    var ZXuanFengZhan = (function (_super) {
        __extends(ZXuanFengZhan, _super);
        //private _effect: AnimationBitmap;
        /**飞天连斩(旋风斩)*/
        function ZXuanFengZhan() {
            return _super.call(this) || this;
            //this._type = TypeSkill.Z_FTLZ;
            //super(TypeSkill.Z_FTLZ, "0", "0", "0", "4024");
            //super(TypeSkill.Z_FTLZ, "0", "0", "0", "4024");
        }
        ZXuanFengZhan.prototype.start = function () {
            //(this._body as GamePlayer).setHorseSkillState(true);
            _super.prototype.start.call(this);
        };
        return ZXuanFengZhan;
    }(s.CShunFaResDirect));
    s.ZXuanFengZhan = ZXuanFengZhan;
    __reflect(ZXuanFengZhan.prototype, "s.ZXuanFengZhan");
})(s || (s = {}));

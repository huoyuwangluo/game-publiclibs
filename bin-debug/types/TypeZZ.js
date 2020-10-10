var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeZZ = (function () {
    function TypeZZ() {
    }
    TypeZZ.CROSS_ZZ = 1; //穿透资质
    TypeZZ.MDEF_ZZ = 2; //法防资质
    TypeZZ.HP_ZZ = 3; //生命资质
    TypeZZ.ATT_ZZ = 4; //攻击资质
    TypeZZ.PDEF_ZZ = 5; //物防资质
    return TypeZZ;
}());
__reflect(TypeZZ.prototype, "TypeZZ");

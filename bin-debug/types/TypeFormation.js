var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeFormation = (function () {
    function TypeFormation() {
    }
    TypeFormation.CURR_ZHENYING_TYPE = 0;
    TypeFormation.UP_FORMATION = 1;
    TypeFormation.MINGJIANG_YUANZHENG = 2;
    TypeFormation.BINGFENSANLU_WEI = 3;
    TypeFormation.BINGFENSANLU_SHU = 4;
    TypeFormation.BINGFENSANLU_WU = 5;
    TypeFormation.UP_FORMATION_400 = 6;
    TypeFormation.UP_FORMATION_KINGWAR1 = 11;
    TypeFormation.UP_FORMATION_KINGWAR2 = 12;
    TypeFormation.UP_FORMATION_KINGWAR3 = 13;
    return TypeFormation;
}());
__reflect(TypeFormation.prototype, "TypeFormation");

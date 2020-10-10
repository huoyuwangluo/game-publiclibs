var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeFashion = (function () {
    function TypeFashion() {
    }
    TypeFashion.WEAPON = 11; //武器
    TypeFashion.CLOTHES = 12; //衣服
    // public static WING: number = 13;//翅膀
    TypeFashion.MOUNTS = 14; //坐骑
    TypeFashion.HALO = 15; //光环
    TypeFashion.TITLE_FOREVER = 21; //永久称号
    TypeFashion.TITLE_LIMIT = 22; //限时称号
    // public static TITLE_TIANTI: number = 23;//天梯
    TypeFashion.TITLE_GIUDE = 24; //新手
    return TypeFashion;
}());
__reflect(TypeFashion.prototype, "TypeFashion");

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeColor = (function () {
    function TypeColor() {
    }
    /**品质对应的颜色 */
    TypeColor.WHITE = 0xD6CAB7;
    TypeColor.GREEN = 0x34E22C; //绿色
    TypeColor.BULE = 0x51B3FE; //蓝色
    TypeColor.PURPLE = 0xD165FF; //紫色
    TypeColor.ORANGE = 0xF08E0E; //橙色
    TypeColor.RED = 0xEC3F32; //红色
    TypeColor.GOLDEN = 0xFFD060; //金色
    TypeColor.AN_GOLDEN = 0xDEDEDE; //暗金
    TypeColor.SHENG_GOLDEN = 0xFFE431; //圣金
    /**消耗里面的颜色 */
    TypeColor.RED1 = 0xec3f32;
    TypeColor.GREEN1 = 0x22f100;
    return TypeColor;
}());
__reflect(TypeColor.prototype, "TypeColor");

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeRank = (function () {
    function TypeRank() {
    }
    /**总关卡*/
    TypeRank.ZONGGUANKA = 109;
    /**总战力*/
    TypeRank.ZONGZHANLI = 101;
    /**等级*/
    TypeRank.DENGJI = 102;
    /**武魂塔*/
    TypeRank.WUHUNTA = 106;
    /**武神塔*/
    TypeRank.WUSHENTA = 108;
    /**试炼塔*/
    TypeRank.SHILIANTA = 105;
    /**天梯*/
    TypeRank.TIANTI = 103;
    /**魏国贡献排行*/
    TypeRank.WEI = 900001;
    /**蜀国贡献排行*/
    TypeRank.SHU = 900002;
    /**吴国贡献排行*/
    TypeRank.WU = 900003;
    /**势力塔排行*/
    TypeRank.SHILITA = 900011;
    return TypeRank;
}());
__reflect(TypeRank.prototype, "TypeRank");

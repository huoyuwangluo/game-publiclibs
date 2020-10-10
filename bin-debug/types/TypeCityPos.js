var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeCityPos = (function () {
    function TypeCityPos() {
    }
    TypeCityPos.CHAPTER = 1; //出征 挂机
    TypeCityPos.MATERIAL = 2; //副本
    TypeCityPos.XIANSHI_HUODONG = 3; //限时活动
    TypeCityPos.XIANSHI = 4; //淬炼仙石
    TypeCityPos.SHENGZHI = 5; //圣旨
    TypeCityPos.PATA = 6; //试练塔 武神塔
    TypeCityPos.TIEJIANGBU = 7; //铁匠铺
    TypeCityPos.JIJING = 8; //竞技
    TypeCityPos.BOSS = 9; //boss
    return TypeCityPos;
}());
__reflect(TypeCityPos.prototype, "TypeCityPos");

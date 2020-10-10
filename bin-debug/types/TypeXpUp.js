var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeXpUp = (function () {
    function TypeXpUp() {
    }
    /**Xp值不自动增长*/
    TypeXpUp.STOP = 0;
    /**Xp值自动增长*/
    TypeXpUp.AUTO_UP = 1;
    /**Xp值自动增长自动激活*/
    TypeXpUp.AUTO_UP_AUTO_ACTIVE = 2;
    /**Xp值保持最大化*/
    TypeXpUp.FOREVER = 3;
    return TypeXpUp;
}());
__reflect(TypeXpUp.prototype, "TypeXpUp");

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeRedPoint = (function () {
    function TypeRedPoint() {
    }
    TypeRedPoint.YOKE = 103; //羁绊红点
    TypeRedPoint.SHENGZHI = 105; //圣旨红点
    TypeRedPoint.MONTHCARD = 106; //月卡红点
    TypeRedPoint.ZHANLING = 102; //战令红点
    TypeRedPoint.SEVENDAYTASK = 107; //7日目标红点
    return TypeRedPoint;
}());
__reflect(TypeRedPoint.prototype, "TypeRedPoint");

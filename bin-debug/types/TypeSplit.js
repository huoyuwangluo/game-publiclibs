var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeSplit = (function () {
    function TypeSplit() {
    }
    TypeSplit.btnNameByType = function (type) {
        switch (type) {
            case TypeSplit.HUISHOU:
                return Language.C_HS;
            case TypeSplit.FENJIE:
                return Language.C_FJ;
            case TypeSplit.CHUSHOU:
                return Language.C_CS;
            case TypeSplit.SHIYONG:
                return Language.C_SY;
            case TypeSplit.JIHUO:
                return Language.C_JH;
        }
    };
    TypeSplit.HUISHOU = 1; //回收
    TypeSplit.FENJIE = 2; //分解
    TypeSplit.CHUSHOU = 3; //出售
    TypeSplit.SHIYONG = 4; //使用
    TypeSplit.JIHUO = 5; //使用
    return TypeSplit;
}());
__reflect(TypeSplit.prototype, "TypeSplit");

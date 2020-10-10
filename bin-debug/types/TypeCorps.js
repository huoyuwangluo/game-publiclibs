var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeCorps = (function () {
    function TypeCorps() {
    }
    TypeCorps.getCorpsBuyType = function (type) {
        var cropsName = "";
        switch (type) {
            case 1:
                cropsName = Language.B_BUB;
                break;
            case 2:
                cropsName = Language.B_QIANGB;
                break;
            case 3:
                cropsName = Language.B_QIB;
                break;
            case 4:
                cropsName = Language.B_GONGB;
                break;
            case 5:
                cropsName = Language.B_MOUB;
                break;
        }
        return cropsName;
    };
    return TypeCorps;
}());
__reflect(TypeCorps.prototype, "TypeCorps");

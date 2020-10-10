var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeUnionName = (function () {
    function TypeUnionName() {
    }
    TypeUnionName.getUnionId = function (str) {
        if (!str)
            return 0;
        switch (str) {
            case Language.UNION_W:
                return 1;
            case Language.UNION_S:
                return 2;
            case Language.UNION_W1:
                return 3;
            case Language.UNION_QX:
                return 4;
        }
        return 0;
    };
    TypeUnionName.getCountryName = function (id) {
        if (!id)
            return "";
        switch (id) {
            case TypeUnionName.WEIID:
                return Language.UNION_W;
            case TypeUnionName.SHUID:
                return Language.UNION_S;
            case TypeUnionName.WUID:
                return Language.UNION_W1;
            case TypeUnionName.QUNID:
                return Language.UNION_QX;
            case TypeUnionName.ROLEID:
                return Language.UNION_JZ;
        }
        return "";
    };
    TypeUnionName.getLeginId = function (id) {
        if (!id)
            return "";
        switch (id) {
            case TypeUnionName.WEIID:
                return Language.UNION_WEIG;
            case TypeUnionName.SHUID:
                return Language.UNION_SHUG;
            case TypeUnionName.WUID:
                return Language.UNION_WUG;
            case TypeUnionName.QUNID:
                return Language.UNION_QUNXIONG;
            case TypeUnionName.ROLEID:
                return Language.UNION_JUNZHU;
        }
        return "";
    };
    TypeUnionName.WEIID = 1; //魏
    TypeUnionName.SHUID = 2; //蜀
    TypeUnionName.WUID = 3; //吴
    TypeUnionName.QUNID = 4; //群
    TypeUnionName.ALLID = 5; //全部
    TypeUnionName.ROLEID = 6; //主公
    TypeUnionName.NITICE = [Language.UNION_WEIG,
        Language.UNION_SHUG,
        Language.UNION_WUG];
    TypeUnionName.ANNOUNCEMENT = [Language.C_WEIGUO,
        Language.C_SHUGUO,
        Language.C_WUGUO];
    return TypeUnionName;
}());
__reflect(TypeUnionName.prototype, "TypeUnionName");

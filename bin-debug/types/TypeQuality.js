var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeQuality = (function () {
    function TypeQuality() {
    }
    TypeQuality.getQualityByStar = function (star) {
        var q = 0;
        if (star == 0)
            q = 3;
        if (star >= 10) {
            q = 7;
        }
        else if (star >= 5) {
            q = 6;
        }
        else {
            q = star + 1;
        }
        return q;
    };
    TypeQuality.getStarColor = function (star) {
        if (star == 0)
            star = 3;
        if (star >= 10) {
            star = 7;
        }
        else if (star >= 5) {
            star = 6;
        }
        else {
            star = star + 1;
        }
        switch (star) {
            case TypeQuality.WHITE:
                return TypeColor.WHITE;
            case TypeQuality.GREEN:
                return TypeColor.GREEN;
            case TypeQuality.BLUE:
                return TypeColor.BULE;
            case TypeQuality.PURPLE:
                return TypeColor.PURPLE;
            case TypeQuality.ORANGE:
                return TypeColor.ORANGE;
            case TypeQuality.RED:
                return TypeColor.RED;
            case TypeQuality.GOLDEN:
                return TypeColor.GOLDEN;
            case TypeQuality.AN_GOLDEN:
                return TypeColor.AN_GOLDEN;
            case TypeQuality.SHENG_GOLDEN:
                return TypeColor.SHENG_GOLDEN;
            default:
                return TypeColor.WHITE;
        }
    };
    TypeQuality.getQualityColor = function (type) {
        if (type > TypeQuality.SHENG_GOLDEN)
            type = TypeQuality.SHENG_GOLDEN;
        switch (type) {
            case TypeQuality.WHITE:
                return TypeColor.WHITE;
            case TypeQuality.GREEN:
                return TypeColor.GREEN;
            case TypeQuality.BLUE:
                return TypeColor.BULE;
            case TypeQuality.PURPLE:
                return TypeColor.PURPLE;
            case TypeQuality.ORANGE:
                return TypeColor.ORANGE;
            case TypeQuality.RED:
                return TypeColor.RED;
            case TypeQuality.GOLDEN:
                return TypeColor.GOLDEN;
            case TypeQuality.AN_GOLDEN:
                return TypeColor.AN_GOLDEN;
            case TypeQuality.SHENG_GOLDEN:
                return TypeColor.SHENG_GOLDEN;
            default:
                return TypeColor.WHITE;
        }
    };
    TypeQuality.getQualityName = function (type) {
        switch (type) {
            case TypeQuality.WHITE:
                return Language.COLOR_W;
            case TypeQuality.GREEN:
                return Language.COLOR_G;
            case TypeQuality.BLUE:
                return Language.COLOR_B;
            case TypeQuality.PURPLE:
                return Language.COLOR_P;
            case TypeQuality.ORANGE:
                return Language.COLOR_O;
            case TypeQuality.RED:
                return Language.COLOR_R;
            case TypeQuality.GOLDEN:
                return Language.COLOR_J;
            case TypeQuality.AN_GOLDEN:
                return Language.COLOR_AJ;
            case TypeQuality.SHENG_GOLDEN:
                return Language.COLOR_SJ;
            default:
                return "";
        }
    };
    TypeQuality.getQualityPetName = function (type) {
        switch (type) {
            case TypeQuality.WHITE:
                return Language.COLOR_WJ;
            case TypeQuality.GREEN:
                return Language.COLOR_GJ;
            case TypeQuality.BLUE:
                return Language.COLOR_BJ;
            case TypeQuality.PURPLE:
                return Language.COLOR_PJ;
            case TypeQuality.ORANGE:
                return Language.COLOR_OJ;
            case TypeQuality.RED:
                return Language.COLOR_RJ;
            case TypeQuality.GOLDEN:
                return Language.COLOR_JJ;
            case TypeQuality.AN_GOLDEN:
                return Language.COLOR_AJJ;
            case TypeQuality.SHENG_GOLDEN:
                return Language.COLOR_SJJ;
            default:
                return "";
        }
    };
    TypeQuality.getBingFaBuyQuality = function (type) {
        switch (type) {
            case TypeQuality.BLUE:
                return 1;
            case TypeQuality.PURPLE:
                return 1;
            case TypeQuality.ORANGE:
                return 2;
            case TypeQuality.RED:
                return 3;
            case TypeQuality.GOLDEN:
                return 4;
            case TypeQuality.AN_GOLDEN:
                return 4;
            case TypeQuality.SHENG_GOLDEN:
                return 4;
            default:
                return 0;
        }
    };
    TypeQuality.WHITE = 1;
    TypeQuality.GREEN = 2; //绿色
    TypeQuality.BLUE = 3; //蓝色
    TypeQuality.PURPLE = 4; //紫色
    TypeQuality.ORANGE = 5; //橙色
    TypeQuality.RED = 6; //红色
    TypeQuality.GOLDEN = 7; //金色
    TypeQuality.AN_GOLDEN = 8; //暗金
    TypeQuality.SHENG_GOLDEN = 9; //圣金
    return TypeQuality;
}());
__reflect(TypeQuality.prototype, "TypeQuality");

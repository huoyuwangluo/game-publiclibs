var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeEquip = (function () {
    function TypeEquip() {
    }
    TypeEquip.getEquipPosName = function (type) {
        switch (type) {
            case TypeEquip.WEAPON:
                return Language.PART_WQ;
            case TypeEquip.HEAD:
                return Language.PART_TK;
            case TypeEquip.CLOTHES:
                return Language.PART_YF;
            case TypeEquip.NECKLACE:
                return Language.PART_XZ;
            case TypeEquip.BRACELET_LEFT:
                return Language.PART_SZ;
            case TypeEquip.BRACELET_RIGHT:
                return Language.PART_SW;
            case TypeEquip.BELT:
                return Language.PART_YD;
            case TypeEquip.SHOES:
                return Language.PART_XZ;
            default:
                return "";
        }
    };
    /**基础装备 */
    TypeEquip.JICHU_EQIUP = 110; //1101-1108
    TypeEquip.JICHU_EQIUP_START_POS = 1101;
    TypeEquip.JICHU_EQIUP_END_POS = 1104;
    /**九曲装备 */
    TypeEquip.JIUQU_EQIUP = 130; //1301-1309
    TypeEquip.JIUQU_EQIUP_START_POS = 1301;
    TypeEquip.JIUQU_EQIUP_END_POS = 1309;
    /**六道装备 */
    TypeEquip.LIUDAO_EQIUP = 132; //1321-1326
    TypeEquip.LIUDAO_EQIUP_START_POS = 1321;
    TypeEquip.LIUDAO_EQIUP_END_POS = 1326;
    /**神装 */
    // public static SHEN_EQIUP: number = 150;//1501-1508
    // public static SEHN_EQIUP_START_POS: number = 1501;
    // public static SEHN_EQIUP_END_POS: number = 1508;
    /**星辰装备 */
    TypeEquip.XINGCHEN_EQIUP = 152; //1521-1528
    // public static XINGCHEN_EQIUP_START_POS: number = 1521;
    // public static XINGCHEN_EQIUP_END_POS: number = 1528;
    /**default */
    TypeEquip.DEFAULT_CLOTHES = "1101";
    TypeEquip.DEFAULT_WEAPON = "11102";
    /**
     *武器
        */
    TypeEquip.WEAPON = 1101;
    /**
     *头
        */
    TypeEquip.HEAD = 1102;
    /**
     *衣
        */
    TypeEquip.CLOTHES = 1103;
    /**
     *鞋子
        */
    TypeEquip.NECKLACE = 1104;
    /**
     *镯子左
        */
    TypeEquip.BRACELET_LEFT = 1105;
    /**
     *镯子右
        */
    TypeEquip.BRACELET_RIGHT = 1106;
    /**
     *腰带
        */
    TypeEquip.BELT = 1107;
    /**
     *鞋子
        */
    TypeEquip.SHOES = 1108;
    /**
     *最低级的装备 默认装备
        */
    TypeEquip.defaultEqiupId = [101101, 102101, 103101, 104101];
    return TypeEquip;
}());
__reflect(TypeEquip.prototype, "TypeEquip");

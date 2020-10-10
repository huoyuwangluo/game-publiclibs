var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeItem = (function () {
    function TypeItem() {
    }
    TypeItem.checkInItemBag = function (type) {
        return type == TypeItem.MATERIAL || type == TypeItem.ITEM || type == TypeItem.DEBRIS || type == TypeItem.TREASURE;
    };
    TypeItem.checkIsPetTypeOrPetSuiTyp = function (type) {
        return type == TypeItem.PET_SUI || type == TypeItem.PET_TYPE;
    };
    /**maintype */
    /*货币*/
    TypeItem.MONEY = 0;
    /*装备*/
    TypeItem.EQUIP = 1;
    /*材料*/
    TypeItem.MATERIAL = 2;
    /**普通道具*/
    TypeItem.ITEM = 3;
    /**礼包*/
    TypeItem.DEBRIS = 4;
    /**宝箱*/
    TypeItem.TREASURE = 5;
    /**掉落库*/
    TypeItem.DROPGROUP = 6;
    /**兵法 */
    TypeItem.BINGFA = 8;
    /**武将碎片 是客户端伪造的一个类型*/
    TypeItem.PET = 999;
    /**宠物碎片 是客户端伪造的一个类型*/
    TypeItem.ANIMAL = 888;
    /**type */
    /**武将随机宝箱类型 */
    TypeItem.PET_SUIJI_TYPE = 2103;
    /**灵兽随机宝箱类型 */
    TypeItem.ANIMAL_SUIJI_TYPE = 2106;
    /**红颜激活类型 */
    TypeItem.HONGYAN_ACT = 2117;
    /**红颜交心类型 */
    TypeItem.HONGYAN_LOVE = 2118;
    /**主角升级丹 */
    TypeItem.ROLE_UPLEVEL = 2101;
    /**武将升级丹 */
    TypeItem.PET_UPLEVEL = 2102;
    /**武将 */
    TypeItem.PET_TYPE = 130;
    /**武将碎片 */
    TypeItem.PET_SUI = 2200;
    /**宠物碎片 */
    TypeItem.ANIMAL_SUI = 2990;
    /**兵法 */
    TypeItem.BINGFA_BOOK = 8000;
    /**无双升级 */
    TypeItem.WUSHUANG_UP = 2220;
    /**武将技能升级 */
    TypeItem.PET_SKILL_UP = 2223;
    /**武将天赋学习 */
    TypeItem.PET_TALENT_STUDY = 2900;
    /**羽翼激活 */
    TypeItem.WING_JIHUO = 2128;
    /**神羽合成进阶 */
    TypeItem.GODWING_1 = 2131;
    TypeItem.GODWING_2 = 2132;
    TypeItem.GODWING_3 = 2133;
    TypeItem.GODWING_4 = 2134;
    /**神兵道具 */
    TypeItem.SHENBIN_PROP = 2980;
    /**战骑碎片 */
    // public static ZHANQI: number = 2640;
    /**时装 武器衣服光环*/
    TypeItem.FASHION_CLOATHING = 2710;
    /**时装称号 */
    TypeItem.FASHION_TITLE = 2810;
    /**改名卡*/
    TypeItem.CHANGE_NAME = 2300;
    /**神魔锦囊*/
    TypeItem.SHENMOJINANG = 2157;
    /**灵兽*/
    TypeItem.ANIMAL_ONE = 2950;
    return TypeItem;
}());
__reflect(TypeItem.prototype, "TypeItem");

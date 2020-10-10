var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeGiftBag = (function () {
    function TypeGiftBag() {
    }
    TypeGiftBag.checkGiftBagBuyId = function (id) {
        if (TypeGiftBag.giftArr.indexOf(id) != -1) {
            return true;
        }
        return false;
    };
    /**五星神将任选宝箱 */
    TypeGiftBag.SHOUCHONG_1 = "410801";
    /**至尊神将3选1宝箱 */
    TypeGiftBag.SHOUCHONG_2 = "410802";
    /**魏国上品神兵 */
    TypeGiftBag.WEI_1 = "411001";
    /**魏国神品神兵 */
    TypeGiftBag.WEI_2 = "411002";
    /**蜀国上品神兵 */
    TypeGiftBag.SHU_1 = "411003";
    /**蜀国神品神兵 */
    TypeGiftBag.SHU_2 = "411004";
    /**吴国上品神兵 */
    TypeGiftBag.WU_1 = "411005";
    /**吴国神品神兵 */
    TypeGiftBag.WU_2 = "411006";
    /**群雄上品神兵 */
    TypeGiftBag.QUN_1 = "411007";
    /**群雄神品神兵 */
    TypeGiftBag.QUN_2 = "411008";
    TypeGiftBag.giftArr = [TypeGiftBag.SHOUCHONG_1, TypeGiftBag.SHOUCHONG_2, TypeGiftBag.WEI_1, TypeGiftBag.WEI_2,
        TypeGiftBag.SHU_1, TypeGiftBag.SHU_2, TypeGiftBag.WU_1, TypeGiftBag.WU_2, TypeGiftBag.QUN_1, TypeGiftBag.QUN_2];
    return TypeGiftBag;
}());
__reflect(TypeGiftBag.prototype, "TypeGiftBag");

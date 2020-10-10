var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeTalent = (function () {
    function TypeTalent() {
    }
    /**永久提升生命值**/
    TypeTalent.FOREVER_LIFE = 1;
    /**永久提升魔法攻击**/
    TypeTalent.FOREVER_MATT = 2;
    /**永久提升生命回复**/
    TypeTalent.FOREVER_HPRECOVER = 3;
    /**永久增加攻击力**/
    TypeTalent.ATTACKADD = 4;
    /**永久增加防御力**/
    TypeTalent.DEFENADD = 5;
    /**回血**/
    TypeTalent.RECOVER = 6;
    /**残废**/
    TypeTalent.CRIPPLE = 7;
    /**腐蚀**/
    TypeTalent.CORRODE = 8;
    /**反击**/
    TypeTalent.ATT_BACK = 9;
    /**受击回血**/
    TypeTalent.BACKSPIN = 10;
    /**提高闪避**/
    TypeTalent.UPDODGE = 11;
    /**提高伤害**/
    TypeTalent.UPDAMAGE = 12;
    /**减少伤害**/
    TypeTalent.SUBDAMAGE = 13;
    /**再生**/
    TypeTalent.RELIFE = 14;
    /**嗜血**/
    TypeTalent.BLOOD = 15;
    /**追击**/
    TypeTalent.PURSUIT = 16;
    /**破甲**/
    TypeTalent.ARMOR_BREAK = 17;
    /**眩晕**/
    TypeTalent.VERTIGO = 18;
    /**守护**/
    TypeTalent.GUARD = 19;
    /**审判**/
    TypeTalent.JUDGE = 20;
    /**赐福**/
    TypeTalent.BLESS = 21;
    /**造成百分比伤害**/
    TypeTalent.CRITF = 22;
    /**提暴 */
    TypeTalent.HIGHTCRIT = 23;
    /**伤害加深 */
    TypeTalent.ANGER = 24;
    /**死亡→伤害免疫*/
    TypeTalent.MASTER_INVINCIBLE = 48;
    /**永久伤害加深 */
    TypeTalent.FOREVER_INJUREADD = 26;
    /**永久暴击 */
    TypeTalent.FOREVER_CRIT = 27;
    /**死亡→恢复生命 */
    TypeTalent.PET_RELIFE = 49;
    /**攻击→降低命中 */
    TypeTalent.SUBHIT = 29;
    /**暴击→额外伤害1次 */
    TypeTalent.CRIT_PURSUIT = 30;
    /**合体→攻击加成 */
    TypeTalent.MERGE_ATTADD = 33;
    /**合体→防御加成 */
    TypeTalent.MERGE_DEFADD = 34;
    /**受击→反弹伤害 */
    TypeTalent.MERGE_ATTBACK = 47;
    return TypeTalent;
}());
__reflect(TypeTalent.prototype, "TypeTalent");

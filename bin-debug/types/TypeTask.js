var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeTask = (function () {
    function TypeTask() {
    }
    /**跑图拜访*/
    TypeTask.DIALOG = 1;
    /**跑图武将上阵*/
    TypeTask.PET_UP = 2;
    /**跑图采集*/
    TypeTask.COLLECT = 3;
    /**跑图杀怪*/
    TypeTask.MONSTER = 4;
    /**第一个位置升级*/
    TypeTask.UP_LEVEL_POS1 = 11;
    /**穿戴某等级几件装备*/
    TypeTask.WARE = 12;
    /**通关对应关卡*/
    TypeTask.PASS = 13;
    /**熔炼*/
    TypeTask.MELT = 16;
    /**挑战个人BOSS*/
    TypeTask.PERSON_BOSS = 17;
    /**天梯*/
    TypeTask.LADDER = 28;
    /**野战*/
    TypeTask.YEZHAN = 31;
    /**文官任务*/
    TypeTask.WENGUAN_TASK = 101;
    /**第二个位置升级*/
    TypeTask.UP_LEVEL_POS2 = 102;
    /**坐骑升级*/
    TypeTask.ZUOQI = 105;
    /**激活无双技能*/
    TypeTask.WUSHUANG = 109;
    /**武神塔 */
    TypeTask.COPY_PET_PAGODA = 27;
    /**天赋升级 */
    TypeTask.TALENT_UP = 112;
    /**羽翼升级激活 */
    TypeTask.WING_UP = 114;
    /**神域boss*/
    TypeTask.SHENYU_BOSS = 120;
    /**武官挑战*/
    TypeTask.WUGUAN_TIAOZHAN = 113;
    /**材料副本*/
    TypeTask.MATERIAL = 110;
    /**NPC主城对话 */
    TypeTask.NPC_CITY = 126;
    /**坐骑骑乘 */
    TypeTask.ZUOQI_JICHENG = 127;
    /**第三个位置升级*/
    TypeTask.UP_LEVEL_POS3 = 128;
    /**第五个位置升级*/
    TypeTask.UP_LEVEL_POS5 = 165;
    /**红颜激活*/
    TypeTask.HONGYAN_ACT = 131;
    /**红颜升级*/
    TypeTask.HONGYAN_UP = 145;
    /**武将合成*/
    TypeTask.PET_HECHENG = 135;
    /**橙装*/
    TypeTask.CHENGZHUANG = 136;
    /**战弓副本*/
    TypeTask.MATERIAL_ZHANGGONG = 134;
    /**全民BOSS体验副本20级 */
    TypeTask.EVERY_BOSS_GUIDE_20 = 90;
    /**全民BOSS体验副本30级 */
    TypeTask.EVERY_BOSS_GUIDE_30 = 91;
    /**功勋兑换 */
    TypeTask.GONGXUN_DUIHUAN = 143;
    /**聊天一下 */
    TypeTask.CHAT = 150;
    /**将星抽奖 */
    TypeTask.JIANGXING_CHOUJIANG = 106;
    /**加入阵营 */
    TypeTask.JOIN_LEGION = 25;
    /**第四个位置升级 */
    TypeTask.UP_LEVEL_POS4 = 151;
    /**通缉令 */
    TypeTask.TONGJILING = 155;
    /**征收 */
    TypeTask.FOOD = 152;
    /**圣旨 */
    TypeTask.SHENGZHI = 154;
    /**强征收 */
    TypeTask.QAINGFOOD = 153;
    /**突破 */
    TypeTask.TUPO = 156;
    /**武将上阵指定品质 */
    TypeTask.PET_UP1 = 157;
    /**普通招募一次 */
    TypeTask.SMOMEPET1 = 158;
    /**高级招募一次 */
    TypeTask.SMOMEPET2 = 159;
    /**普通招募10次 */
    TypeTask.SMOMEPET3 = 160;
    /**高级招募10次 */
    TypeTask.SMOMEPET4 = 164;
    return TypeTask;
}());
__reflect(TypeTask.prototype, "TypeTask");

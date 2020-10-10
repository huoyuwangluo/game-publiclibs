var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ConfigData = (function () {
    function ConfigData() {
    }
    ConfigData.GOLD = "101";
    /*橙装碎片*/
    ConfigData.ITEM_ORANGE_DEBRIS_ID = "211001";
    /*经验道具ID*/
    ConfigData.ITEM_EXP_ID = "701";
    /*无暇神力结晶*/
    ConfigData.ITEM_WUXIA_SHENLI_ID = "210501";
    /*纯净神力结晶*/
    ConfigData.ITEM_CHUNJING_SHENLI_ID = "210502";
    /*战士男基础模型*/
    ConfigData.DEFAULT_MODEL_ZHAN_NAN = "1100";
    ConfigData.DEFAULT_MODEL_ZHANSHI_NV = "1150";
    ConfigData.DEFAULT_MODEL_FASHI_NAN = "1200";
    ConfigData.DEFAULT_MODEL_FASHI_NV = "1250";
    ConfigData.DEFAULT_MODEL_YINENG_NAN = "1300";
    ConfigData.DEFAULT_MODEL_YINENG_NV = "1350";
    /*技能最高等级200*/
    ConfigData.SKILL_MAX_LEVEL = 200;
    /** 精品仙魄*/
    ConfigData.XIANTONG_XIANPO_1 = "210601";
    /** 精品仙魄*/
    ConfigData.XIANTONG_XIANPO_2 = "210602";
    /** 精品仙魄*/
    ConfigData.XIANTONG_XIANPO_3 = "210603";
    /** 符文碎片*/
    ConfigData.ITEM_RUNES_DEBRIS_ID = "210701";
    /** 帝龙碎片*/
    ConfigData.DRAGON_TEARS_DEBRIS_ID = "501";
    /**威望值*/
    ConfigData.PRESTIGE_ID = "601";
    /**斗魄值*/
    ConfigData.FIGHTING_SOUL_ID = "401";
    /** 兽魂碎片*/
    ConfigData.ITEM_PET_ZHUANGBEI_ID = "210201";
    /** 灵魂契约*/
    ConfigData.ITEM_PEI_QIYUE_ID = "210801";
    /** 灵魂精华*/
    ConfigData.ITEM_PEI_QIYUE_ID1 = "210901";
    /** XO奇异蛋*/
    ConfigData.ITEM_PEI_HUANHUA = "210101";
    /** 魔魂晶石*/
    ConfigData.ITEM_FORGING_FUMO = "210401";
    /** 宝石碎片*/
    ConfigData.ITEM_FORGING_GEM = "211201";
    /** 圆桌·天枢*/
    ConfigData.ITEM_PEI_QISHI1 = "211501";
    /** 圆桌·玉衡*/
    ConfigData.ITEM_PEI_QISHI2 = "211502";
    /** 圆桌·开阳*/
    ConfigData.ITEM_PEI_QISHI3 = "211503";
    /** 塔罗道具*/
    ConfigData.ITEM_TRAO_PROP = "210301";
    /** 魔龙碎片*/
    ConfigData.ITEM_MONO_UP = "211101";
    /** 武将进阶石*/
    ConfigData.ITEM_PET_JINHUA = "211701";
    /** 白色进化石*/
    ConfigData.ITEM_WHITE_STONE = "211801";
    /** 绿色进化石*/
    ConfigData.ITEM_GREEN_STONE = "211802";
    /** 蓝色进化石*/
    ConfigData.ITEM_BLUE_STONE = "211803";
    /** 紫色进化石*/
    ConfigData.ITEM_PURPLE_STONE = "211804";
    /** 橙色进化石*/
    ConfigData.ITEM_ORANGE_STONE = "211805";
    /** 红色进化石*/
    ConfigData.ITEM_RED_STONE = "211806";
    /** 宝藏钥匙*/
    ConfigData.ITEM_BAOCANG_KEY = "212001";
    /** 酒馆钥匙*/
    ConfigData.ITEM_JIUGUAN_KEY = "212002";
    /**神魂值*/
    ConfigData.SHENHUN_ID = "901";
    /**经验值*/
    ConfigData.EXP_ID = "301";
    /** 幻武之石*/
    ConfigData.ITEM_PHANTOM_ID = "212301";
    /** 命魂值*/
    ConfigData.LIFESOUL_EXP = "1901";
    /** 命魂圣物精华*/
    ConfigData.LIFESOUL_HALIDOM_ELITE = "2001";
    /** 命魂圣物*/
    ConfigData.LIFESOUL_HALIDOM = "250901";
    /** 火之契约*/
    ConfigData.ITEM_QIYUE_HUO = "212101";
    /** 水之契约*/
    ConfigData.ITEM_QIYUE_SHUI = "212102";
    /** 风之契约*/
    ConfigData.ITEM_QIYUE_FENG = "212103";
    /** 土之契约*/
    ConfigData.ITEM_QIYUE_TU = "212104";
    /**羽毛*/
    ConfigData.ITEM_WING_ID = "212701";
    /**神羽1阶*/
    ConfigData.ITEM_GODWING_ID = "212901";
    /**星辰石*/
    ConfigData.ITEM_STARSTONE_ID = "214601";
    /**神骨*/
    ConfigData.ITEM_GODBONE = "259100";
    /**玉石精华*/
    ConfigData.ITEM_GODBONEJADE_JINGHUA = "2201";
    /**战神币*/
    ConfigData.ITEM_ZHANSHEN_COIN = "2401";
    /**神秘刷新令*/
    ConfigData.ITEM_SHENMI_UPDATE = "215801";
    /**无限宝石*/
    ConfigData.ITEM_WUXIANBAOSHI = "215700";
    /** 洗练丹*/
    ConfigData.XILIAN_ITEM = "212401";
    /** 膜拜鲜花*/
    ConfigData.ITEM_MOBAI_FLOWER = "230101";
    /** 膜拜鸡蛋*/
    ConfigData.ITEM_MOBAI_EGGS = "230201";
    /** 神魂碎片*/
    ConfigData.ITEM_SHENDIAN_EXPLOR = "214201";
    /** 迷城挑战券道具*/
    ConfigData.ITEM_HUANJIE_MICHENG = "214301";
    /** 幻界禁地券道具*/
    ConfigData.ITEM_HUANJIE_JINDI = "214401";
    /** 国庆集字 魔*/
    ConfigData.ITEM_GUOQING_MO = "215001";
    /** 国庆集字 域*/
    ConfigData.ITEM_GUOQING_YU = "215002";
    /** 国庆集字 喜*/
    ConfigData.ITEM_GUOQING_XI = "215003";
    /** 国庆集字 迎*/
    ConfigData.ITEM_GUOQING_YING = "215004";
    /** 国庆集字 国*/
    ConfigData.ITEM_GUOQING_GUO = "215005";
    /** 国庆集字 字*/
    ConfigData.ITEM_GUOQING_QING = "215006";
    // /** 豪华转盘*/
    // public static ITEM_HAOHUA: string = "214509";
    // /** 豪华转盘*/
    // public static ITEM_HAOHUA1: string = "214509";
    // /** 道具转盘*/
    // public static ITEM_DAOJU: string = "214508";
    // /** 道具转盘*/
    // public static ITEM_DAOJU1: string = "214508";
    /** 凡品精炼石 */
    ConfigData.ITEM_REFINE_FAN = "215201";
    /**中品精炼石*/
    ConfigData.ITEM_REFINE_ZHONG = "215202";
    /** 上品精炼石*/
    ConfigData.ITEM_REFINE_SHANG = "215203";
    /** 极品精炼石*/
    ConfigData.ITEM_REFINE_JI = "215204";
    /** 天品精炼石*/
    ConfigData.ITEM_REFINE_TIAN = "215205";
    /** X兽*/
    ConfigData.ITEM_X_SHOU = "215401";
    /** 阵营改名卡*/
    ConfigData.ITEM_LEGION_CHANGE_NAME = "230003";
    /** 战骑飞升丹*/
    ConfigData.ITEM_ZHANQI_FEISHENGDAN = "215603";
    /** 战骑进阶丹*/
    ConfigData.ITEM_ZHANQI_UPLEVEL = "215601";
    /** 战骑之灵*/
    ConfigData.ITEM_ZHANQI_ZHILING = "215602";
    /** 追风豹子*/
    ConfigData.ITEM_ZHANQI_BAOZI = "271613";
    /** 火焰狮子*/
    ConfigData.ITEM_ZHANQI_SHIZI = "271618";
    /** 启明金鱼*/
    ConfigData.ITEM_ZHANQI_JINYU = "271625";
    /** 彩凤*/
    ConfigData.ITEM_ZHANQI_CAIFENG = "271627";
    /** 战骑回升单*/
    ConfigData.ITEM_ZHANQI_HUISHENGDAN = "215601";
    /** 战骑1*/
    ConfigData.ITEM_ZHANQI_1 = "260401";
    /** 战骑2*/
    ConfigData.ITEM_ZHANQI_2 = "260402";
    /** 战骑3*/
    ConfigData.ITEM_ZHANQI_3 = "260501";
    /** 战骑4*/
    ConfigData.ITEM_ZHANQI_4 = "260502";
    /** 战骑5*/
    ConfigData.ITEM_ZHANQI_5 = "260601";
    /** 战骑6*/
    ConfigData.ITEM_ZHANQI_6 = "260602";
    /** 战骑7*/
    ConfigData.ITEM_ZHANQI_7 = "260603";
    /** 战骑8*/
    ConfigData.ITEM_ZHANQI_8 = "260801";
    /** 战骑9*/
    ConfigData.ITEM_ZHANQI_9 = "260802";
    /** 战骑10*/
    ConfigData.ITEM_ZHANQI_10 = "260803";
    /** 战骑11*/
    ConfigData.ITEM_ZHANQI_11 = "260804";
    /** 活动幸运夺宝道具*/
    ConfigData.ITEM_XINGYINGDUOBAO = "214514";
    /**普通洗练消耗道具消耗 */
    ConfigData.NORMAL_XILIAN_CONSUME = "210301_1";
    /**至尊洗练消耗道具消耗 */
    ConfigData.SENIOR_XILIAN_CONSUME = "210302_1";
    /**普通洗练消耗道具 */
    ConfigData.NORMAL_XILIAN = "210301";
    /**至尊洗练消耗道具 */
    ConfigData.SENIOR_XILIAN = "210302";
    /**全民boss卷*/
    ConfigData.EVERY_BOSS_PROP = "211601";
    /**图鉴经验*/
    ConfigData.HANDBOOK_EXP = "1201";
    /**精炼石*/
    ConfigData.JINGLIAN_STONE = "210401";
    /**升级丹*/
    ConfigData.PLAYER_ONEUPGRADEITEM = "210101";
    /**武将丹*/
    ConfigData.GENERAL_ONEUPGRADEITEM = "210201";
    /**无双天赋升级*/
    ConfigData.WUSHUANG_TALENT_UP = "222101";
    /**精品基础技能书*/
    ConfigData.JINGPIN_SKILLBOOK = "222301";
    /**上品基础技能书*/
    ConfigData.SHANGPIN_SKILLBOOK = "222302";
    /**极品基础技能书*/
    ConfigData.JIPIN_SKILLBOOK = "222303";
    /**天品基础技能书*/
    ConfigData.TIANPIN_SKILLBOOK = "222304";
    /**神品基础技能书*/
    ConfigData.SHENPIN_SKILLBOOK = "222305";
    /**红颜升级道具*/
    ConfigData.HONGYAN_UP_ITEM = "211901";
    /**战弓碎片*/
    ConfigData.ZHANGONG_UP_ITEM = "211201";
    /**战盾碎片*/
    ConfigData.ZHANDUN_UP_ITEM = "211401";
    /**仙童激活道具1*/
    ConfigData.XIANTONG_ACT_ITEM1 = "240101";
    /**仙童激活道具2*/
    ConfigData.XIANTONG_ACT_ITEM2 = "240102";
    /**仙童激活道具3*/
    ConfigData.XIANTONG_ACT_ITEM3 = "240103";
    /**仙童激活道具4*/
    ConfigData.XIANTONG_ACT_ITEM4 = "240104";
    /**仙童激活道具5*/
    ConfigData.XIANTONG_ACT_ITEM5 = "240105";
    /**仙童激活道具6*/
    ConfigData.XIANTONG_ACT_ITEM6 = "240106";
    /**仙童升级道具1*/
    ConfigData.XIANTONG_UP_ITEM1 = "240201";
    /**仙童升级道具2*/
    ConfigData.XIANTONG_UP_ITEM2 = "240202";
    /**仙童升级道具3*/
    ConfigData.XIANTONG_UP_ITEM3 = "240203";
    /**仙童升级道具4*/
    ConfigData.XIANTONG_UP_ITEM4 = "240204";
    /**仙童升级道具5*/
    ConfigData.XIANTONG_UP_ITEM5 = "240205";
    /**仙童升级道具6*/
    ConfigData.XIANTONG_UP_ITEM6 = "240206";
    /**橙装碎片 */
    ConfigData.CHENGZHUANG_SUIBIAN = "215901";
    /**鉴定石 */
    ConfigData.JIANDINGSHI = "210501";
    /**观星卡*/
    ConfigData.GUANXINGKA = "210901";
    /**起源钥匙 */
    ConfigData.JINGXINGQIYUAN = "212001";
    /**将魂*/
    ConfigData.JIANGHUN = "210301";
    /**神兵碎片*/
    ConfigData.SEHNBINGDEBIES = "211301";
    /**圣旨*/
    ConfigData.SHENGZHI = "214701";
    /**兵法展卷 */
    ConfigData.BINGFA_ITEM = "293100";
    /**普通招募令 */
    ConfigData.PUTON_ZHAOMU = "215001";
    /**高级招募令 */
    ConfigData.GAOJI_ZHAOMU = "215002";
    /**势力招募令 */
    ConfigData.SHILI_ZHAOMU = "215003";
    /**官印 */
    ConfigData.GUANYING = "210401";
    /**凡品兵法 */
    ConfigData.BINGFA_1 = "800001";
    /**精品兵法 */
    ConfigData.BINGFA_2 = "800002";
    /**上品兵法 */
    ConfigData.BINGFA_3 = "800003";
    /**极品兵法 */
    ConfigData.BINGFA_4 = "800004";
    /**天品兵法 */
    ConfigData.BINGFA_5 = "800005";
    /**神品兵法 */
    ConfigData.BINGFA_6 = "800006";
    /**天梯挑战令 */
    ConfigData.LADDER_ITEM = "210801";
    /**演武挑战令 */
    ConfigData.YANWU_ITEM = "210802";
    /**名将道具卡 */
    ConfigData.MINGJIANG_ITEM = "211101";
    /**阵营物资 */
    ConfigData.UNION_ITEM = "211201";
    /**神兵兑换道具 */
    ConfigData.SHENBING_DUIHUAN = "211401";
    /**征收兑换道具 */
    ConfigData.ZHENGSHOU_DUIHUAN = "211501";
    /**讨伐兑换道具 */
    ConfigData.TAOFA_DUIHUAN = "501";
    /**远征兑换道具 */
    ConfigData.YUANZHENG_DUIHUAN = "901";
    /**声望兑换道具 */
    ConfigData.SHENGWANG_DUIHUAN = "601";
    /**芦荟 */
    ConfigData.LUHUI = "214801";
    /**灵芝 */
    ConfigData.LINGZHI = "214802";
    /**银条 */
    ConfigData.YINTIAO = "211601";
    /**金条 */
    ConfigData.JINTIAO = "211602";
    /**神魔胶囊*/
    ConfigData.SHENMOJIAONIAO = "215701";
    /**补兵*/
    ConfigData.BUBING_ITEM = "211801";
    /**军功*/
    ConfigData.JUNGONG_ITEM = "211802";
    /**神锻令*/
    ConfigData.GODDUANZAO_ITEM = "211302";
    /**召唤卷轴*/
    ConfigData.ANIAML_ZHAOHUAN = "215101";
    /**兽魂*/
    ConfigData.SHOUHUN_ITEM = "902";
    return ConfigData;
}());
__reflect(ConfigData.prototype, "ConfigData");

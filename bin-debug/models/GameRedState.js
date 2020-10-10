var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameRedState = (function () {
    function GameRedState() {
        ////////////一级///////////
        // public static ROLE: number = 1;
        // public static BAG: number = 2;
        // // public static FORCE: number = 3;
        // public static EXPLORE: number = 4;
        // public static LEGION: number = 5;
        // public static PET: number = 6;
        // public static ACHIEVEMENT: number = 7;
        // public static WELFARE: number = 8;
        // public static TREASURE: number = 9;
        // public static BOSS_COPY: number = 10;
        // public static ACTIVITY: number = 13;
        // public static ARENA: number = 12;
        // public static MAIL: number = 14;
        // public static MATERIAL_COPY: number = 15;
        // public static SETTING: number = 16;
        // public static AUTO_FIGHT: number = 18;
        // public static FIRST_PLAYER: number = 19;
        // public static LIMIT_TIMER: number = 20;
        // public static FIRST_RECHARGE: number = 21;
        // public static OPENSERVERACTIVITY: number = 22;
        // public static MONTHCARD: number = 23;
        // public static GODDESS: number = 24;
        // public static VIP: number = 25;
        // public static SNMMER_ACTIVITY: number = 26;
        // public static FESTIVAL_ACTIVITY: number = 27;
        // public static HEFU_ACTIVITY: number = 28;
        // public static ATTESTATION_ACTIVITY: number = 29;
        // public static YAOQING_ACTIVITY: number = 30;
        // public static GUANZHU_ACTIVITY: number = 31;
        // public static MEIRI_CHONGZHI_ACTIVITY: number = 32;
        // public static SOCIALITY: number = 33;
        // public static CROSS_ACTIVITY: number = 35;
        // public static PEAKSBATTLE: number = 36;
        // public static ONE_YUAN_BUY: number = 37;
        // public static WEEK_CARD: number = 38;
        // public static LUCKY_BOX: number = 39;
        // public static MAGIC_DRAGON: number = 40;
        // public static SHOU_CNAG: number = 41;
        // public static PEAKSBATTLE_CROSS: number = 42;
        // public static WEI_DUAN: number = 43;
        // public static SPRINT_ACTIVITY: number = 44;
        // ////////////二级////////////
        // public static ROLE_EQUIP: number = 101;
        // public static ROLE_SKILL: number = 102;
        // public static ROLE_XIUSHEN: number = 103;
        // public static ROLE_GODDESS: number = 104;
        // public static ROLE_SHENHUN: number = 105;
        // public static BAG_USABLE_PROP: number = 201;
        // public static BAG_EQUIP: number = 202;
        // public static BAG_SHENHUN_HECHENG: number = 203;
        // // public static FORCE_FUMO: number = 301;
        // // public static FORCE_GEM: number = 302;
        // // public static FORCE_SOUL: number = 303;
        // // public static FORCE_REFINE: number = 304;
        // // public static EXPLORE_BOSS:number = 41;
        // public static EXPLORE_NOEND: number = 404;
        // public static EXPLORE_GODRUINS: number = 405;
        // public static EXPLORE_PETPAGODA: number = 406;//武将塔
        // public static EXPLORE_SUOYAOPAGODA: number = 407;//锁妖塔
        // public static EXPLORE_XIANSHI: number = 408;//限时
        // public static PET_HUANSHOU: number = 601;//武将
        // public static PET_QISHI: number = 604;//骑士
        // public static PET_ZHANQI: number = 605;//战骑
        // public static ACHIEVEMENT_EVERY: number = 701;
        // public static ACHIEVEMENT_CHENGJIU: number = 702;
        // public static ACHIEVEMENT_TUJIAN: number = 703;
        // public static WELFARE_SEVENDAY: number = 801;
        // public static WELFARE_SIGN: number = 802;
        // public static WELFARE_UPREWARD: number = 803;
        // public static WELFARE_VIPKEFU: number = 804;
        // public static TREASURE_TARO: number = 901;
        // //public static TREASURE_MONO: number = 902;
        // public static TREASURE_BAOCANG: number = 903;
        // public static TREASURE_SHENDIAN: number = 904;
        // public static BOSS_COPY_SELF: number = 1001;
        // public static BOSS_COPY_EVERY: number = 1002;
        // public static BOSS_COPY_CITY: number = 1003;
        // public static BOSS_COPY_LOSE: number = 1004;
        // public static BOSS_COPY_FAMILY: number = 1005;
        // public static BOSS_COPY_DOMAIN: number = 1006;
        // public static BOSS_COPY_FANTASY: number = 1007;
        // public static LEGION_RICHANG: number = 501;//阵营日常
        // public static LEGION_FULI: number = 502;//阵营福利
        // public static LEGION_MANAGE: number = 503;//阵营管理
        // public static LEGION_DYNAMIC: number = 504;//阵营动态
        // /**累充返利*/
        // public static ACTIVITY_LCFL: number = 1301;
        // /**累充礼包*/
        // public static ACTIVITY_LCLB: number = 1302;
        // /**天天返利*/
        // public static ACTIVITY_TTFL: number = 1303;
        // /**天天累充*/
        // public static ACTIVITY_TTLC: number = 1304;
        // /**幸运转盘*/
        // public static ACTIVITY_XYZP: number = 1305;
        // /**端午狂欢*/
        // public static ACTIVITY_DWKH: number = 1306;
        // /**VIP礼包 */
        // public static ACTIVITY_VIPG: number = 1307;
        // /**神殿折扣*/
        // public static ACTIVITY_SDZK: number = 1308;
        // /**神殿充值*/
        // public static ACTIVITY_SDCZ: number = 1309;
        // /**秘典转盘*/
        // public static ACTIVITY_MDZP: number = 1310;
        // /**连冲送礼*/
        // public static ACTIVITY_LCSL: number = 1311;
        // /**竞技排行*/
        // public static ACTIVITY_JJPH: number = 2201;
        // /**开服竞技*/
        // public static ACTIVITY_KFJJ: number = 2202;
        // /**开服礼包*/
        // public static ACTIVITY_KFLB: number = 2203;
        // /**全民BOSS击杀*/
        // public static ACTIVITY_QMBOSS: number = 2204;
        // /**限购礼包*/
        // public static ACTIVITY_XGLB: number = 2205;
        // /**阵营争霸*/
        // public static ACTIVITY_JTZB: number = 2206;
        // public static ARENA_YEZHAN: number = 1201;
        // public static ARENA_LADDER: number = 1202;
        // public static GOD_DIE: number = 1203;
        // public static MAIL_ONEGET: number = 1401;
        // public static FIRST_PLAYER_SAMLL: number = 1901;
        // public static FIRST_PLAYER_BIG: number = 1902;
        // /**限时礼包*/
        // public static ACTIVITY_LIMIT_TIMER: number = 2001;
        // public static VIP_RECEIVE: number = 2501;
        // public static SNMMER_ACTIVITY_LJDL: number = 2601;
        // public static SNMMER_ACTIVITY_XRLC: number = 2602;
        // public static SNMMER_ACTIVITY_HHZP: number = 2603;
        // public static SNMMER_ACTIVITY_DJZP: number = 2604;
        // public static SNMMER_ACTIVITY_HDRW: number = 2605;
        // public static SNMMER_ACTIVITY_MSZP: number = 2606;
        // public static SNMMER_ACTIVITY_LCSL: number = 2607;
        // public static SNMMER_ACTIVITY_SDS_BOSS: number = 2608;
        // public static SNMMER_ACTIVITY_XYDB: number = 2609;
        // public static SNMMER_ACTIVITY_YDSZ: number = 26010;
        // public static SNMMER_ACTIVITY_KNLB: number = 26011;
        // public static SNMMER_ACTIVITY_RYCZ: number = 26012;
        // //七夕活动
        // public static FESTIVAL_ACTIVITY_QXHD: number = 2701;
        // public static HEFU_ACTIVITY_HFDL: number = 2801;
        // public static HEFU_ACTIVITY_HFLC: number = 2802;
        // public static HEFU_ACTIVITY_QUANMIN: number = 2803;
        // public static HEFU_ACTIVITY_LIANCHONG: number = 2804;
        // public static HEFU_ACTIVITY_XHFL: number = 2805;
        // public static MEIRI_CHONGZHI_ACTIVITY_LINGQU: number = 3201;
        // public static SOCIALITY_FRIENDS: number = 3301;
        // public static CROSS_BOSS_ACTIVITY: number = 3501;
        // public static CROSS_SECRET_ACTIVITY: number = 3502;
        // public static CROSS_WAR_KING: number = 3503;
        // public static MATERIAL_COPY_FUBEN: number = 1501;
        // public static MATERIAL_COPY_HUANJIE_FUBEN: number = 1502;
        // public static MATERIAL_COPY_MAIGU_FUBEN: number = 1504;
        // public static EXPLORE_GODRUINS_HELP_LIST1 = 4050;
        // public static EXPLORE_GODRUINS_HELP_LIST2 = 4051;
        // ////////////三级////////////
        // public static ROLE_EQUIP_USE: number = 10101;
        // public static ROLE_ORANGE: number = 10102;
        // // public static ROLE_IMPRINT: number = 10103;
        // // public static ROLE_RUNES: number = 10104;
        // // public static ROLE_FIGHTSOUL: number = 10105;
        // // public static ROLE_DRAGON: number = 10106;
        // public static ROLE_PHANTOM: number = 10107;
        // public static ROLE_WING: number = 10108;
        // public static ROLE_DEITYTOTAL: number = 10109;
        // public static ROLE_ZHUANGBAN: number = 10110;
        // public static ROLE_LIFESOUL: number = 10111;
        // public static ROLE_STAREQUIP: number = 10112;
        // public static ROLE_GODHOOD: number = 10113;
        // public static ROLE_GEM: number = 10114;
        // public static ROLE_LILIAN: number = 10115;
        // public static ROLE_SKILL_UP: number = 10201;
        // public static ROLE_SKILL_UPONEKEY: number = 10202;
        // public static ROLE_XIUSHEN_UPGRADE: number = 10301;
        // public static ROLE_XIUSHEN_GAIN: number = 10302;
        // public static ROLE_SHENHUN_PLAYER: number = 10501;
        // public static ROLE_SHENHUN_POINT1: number = 10502;
        // public static ROLE_SHENHUN_POINT2: number = 10503;
        // public static ROLE_SHENHUN_POINT3: number = 10504;
        // public static BAG_EQUIP_SMELTING: number = 20201;
        // // public static FORCE_FUMO_UP: number = 30101;
        // // public static FORCE_GEM_UP: number = 30201;
        // // public static FORCE_SOUL_UP: number = 30301;
        // // public static FORCE_REFINE_UP: number = 30401;
        // // public static EXPLORE_BOSS_SELF:number = 411;
        // // public static EXPLORE_BOSS_EVERY:number = 412;
        // public static ARENA_LADDER_RANK: number = 120201;
        // public static PET_HUANSHOU_POINT0: number = 60101;
        // public static PET_HUANSHOU_POINT1: number = 60102;
        // public static PET_HUANSHOU_POINT2: number = 60103;
        // public static PET_ZHUANGBEI_POINT0: number = 60104;
        // public static PET_ZHUANGBEI_POINT1: number = 60105;
        // public static PET_ZHUANGBEI_POINT2: number = 60106;
        // public static TREASURE_TARO_PRESH: number = 90101;
        // public static TREASURE_TARO_START: number = 90102;
        // public static TREASURE_TARP_WARE: number = 90103;
        // public static TREASURE_TARO_PRIZEBOX: number = 90104;
        // //public static TREASURE_MONO_SWORD: number = 90201;
        // //public static TREASURE_MONO_NAIL: number = 90202;
        // //public static TREASURE_MONO_HELMET: number = 90203;
        // //public static TREASURE_MONO_CHAIN: number = 90204;
        // public static TREASURE_BAOCANG_ONE: number = 90301;
        // public static TREASURE_BAOCANG_TEN: number = 90302;
        // public static TREASURE_BAOCANG_WARE: number = 90303;
        // public static ACTIVITY_VIPG_Zero: number = 130701;
        // public static ACTIVITY_VIPG_Read: number = 130702;
        // public static LEGION_RICHANG_TASK: number = 50101;//阵营任务
        // public static LEGION_RICHANG_DENGJI: number = 50102;//阵营登记
        // public static LEGION_RICHANG_WAR: number = 50103;//阵营战
        // public static LEGION_FULI_SKILL: number = 50201;//阵营技能
        // public static LEGION_FULI_SHOP: number = 50202;//阵营商店
        // public static LEGION_MANAGE_APPLY_LIST: number = 50301;//阵营管理得申请列表
        // public static SOCIALITY_FRIENDS_APPLY: number = 330101;//申请好友
        // public static SOCIALITY_PRIVATE_CHAT: number = 330102;//私聊
        // ////////////4级////////////////
        // public static ROLE_ORANGE_FORGE: number = 1010201;
        // public static ROLE_ORANGE_GET_DEBRIS: number = 1010202;
        // // public static ROLE_IMPRINT_UPGRADE: number = 1010301;
        // // public static ROLE_RUNES_UPGRADE: number = 1010401;
        // // public static ROLE_FIGHTSOUL_UPGRADE: number = 1010501;
        // // public static ROLE_DRAGON_UPGRADE: number = 1010601;
        // public static ROLE_ZHUANGBAN_FASHION: number = 1011001;
        // public static ROLE_RUNES: number = 1011401;
        // public static ROLE_IMPRINT: number = 1011402;
        // public static ROLE_DRAGON: number = 1011403;
        // public static ROLE_INIFINITE_GAUNTLET:number = 1011404;
        // public static ROLE_FIGHTSOUL: number = 1011501;
        // public static ROLE_TAMING_DRAGON: number = 1011502;
        // //5级	
        // public static ROLE_RUNES_UPGRADE: number = 101140301;
        // public static ROLE_DRAGON_UPGRADE: number = 101140302;
        // public static ROLE_FIGHTSOUL_UPGRADE: number = 101150101;
        // public static ROLE_XIUSHEN_LEVELLOWER: number = 1030201;
        // public static ROLE_XIUSHEN_ADDPOWER1: number = 1030202;
        // public static ROLE_XIUSHEN_ADDPOWER2: number = 1030203;
        // public static ARENA_LADDER_REWARD: number = 12020101;
        // public static ROLE_ZHUANGBAN_FASHION_CLOTH: number = 101100101;
        // public static ROLE_ZHUANGBAN_FASHION_WEAPON: number = 101100102;
        // public static ROLE_ZHUANGBAN_FASHION_MOLONG: number = 101100103;
        // public static LEGION_RICHANG_DENGJI_DENGJI: number = 5010201;//阵营登记登记Button
        // public static TREASURE_WAREHOUSE_ONEGET: number = 9010301;
        // public static TREASURE_BAOCANG_WAREHOUSE_ONEGET: number = 9030301;
        // public static LEGION_RICHANG_WAR_STATE: number = 5010301;//阵营战
        // public static LEGION_RICHANG_WAR_REWARD: number = 5010302;//阵营战奖励
        // public static ROLE_DEITYEQUIP: number = 1010901;//神装
        // public static ROLE_DEITYITEM: number = 1010902;//神器
        ////////////////////////////////
        this._bagListenerDict = {};
        this._relations = {};
        /** 红点目标对象*/
        this._targets = {};
        this.initialize();
        this.registerBagRefeshEvent();
        this.addPlayerListeners();
    }
    //////注册界面按钮关系 注册顺序必须由外层到里层  
    GameRedState.prototype.initialize = function () {
        /**设置界面 */
        this.register(GameRedState.MAIN_SET, [GameRedState.MAIN_SET_HEAD]);
        this.registerCall(GameRedState.MAIN_SET_HEAD, utils.Handler.create(GameModels.oneCountRedPoint, GameModels.oneCountRedPoint.checkSetViewRedPoint, null, false));
        /**主城 */
        this.registerCall(GameRedState.CITY, utils.Handler.create(GameModels.common, GameModels.common.checkRedPoint, null, false));
        /**出征 */
        this.registerCall(GameRedState.ATKCITY, utils.Handler.create(GameModels.common, GameModels.common.checkRedPoint1, null, false));
        /**节日活动 */
        this.register(GameRedState.SNMMER_ACTIVITY, [GameRedState.SNMMER_ACTIVITY_LJDL, GameRedState.SNMMER_ACTIVITY_ZGLB]);
        this.registerCall(GameRedState.SNMMER_ACTIVITY_LJDL, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checkLeiJiDengLuRedPoint, null, false));
        this.registerCall(GameRedState.SNMMER_ACTIVITY_ZGLB, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checkZhiGouLiBaoRedPoint, null, false));
        /**宝藏 */
        this.register(GameRedState.TREASURE, [GameRedState.TREASURE_GUANXING, GameRedState.TREASURE_SMOKEPET, GameRedState.TREASURE_JIANGXING]);
        this.registerCall(GameRedState.TREASURE_GUANXING, utils.Handler.create(GameModels.tavern, GameModels.tavern.checkRedPoint, null, false));
        this.registerCall(GameRedState.TREASURE_SMOKEPET, utils.Handler.create(GameModels.smokepet, GameModels.smokepet.checkSmokePetRedPoint, null, false));
        this.registerCall(GameRedState.TREASURE_JIANGXING, utils.Handler.create(GameModels.jiangxing, GameModels.jiangxing.checkRedPoint, null, false));
        /**聚义 */
        this.registerCall(GameRedState.MAIN_JUYI, utils.Handler.create(GameModels.pet, GameModels.pet.checkGongMingRedPoint, null, false));
        // /**酒馆 */
        // this.registerCall(GameRedState.MAIN_SMOKEPET, utils.Handler.create(GameModels.common, GameModels.common.checkTreasureRedPoint2, null, false));
        /**特权卡 */
        this.registerCall(GameRedState.SPECAICARD, utils.Handler.create(GameModels.vip, GameModels.vip.vipSpecailCardRedPoint, null, false));
        /**福利 */
        this.register(GameRedState.WELFARE, [GameRedState.WELFARE_SEVENDAY, GameRedState.WELFARE_UPREWARD, GameRedState.WELFARE_ACITIVITY, GameRedState.WELFARE_FUND /*, GameRedState.WELFARE_VIPKEFU*/]);
        this.registerCall(GameRedState.WELFARE_SEVENDAY, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.ljdl], false));
        this.registerCall(GameRedState.WELFARE_UPREWARD, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.cjjl], false));
        this.registerCall(GameRedState.WELFARE_ACITIVITY, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkAcivityRedPoint, null, false));
        this.registerCall(GameRedState.WELFARE_FUND, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.czjj], false));
        // this.registerCall(GameRedState.WELFARE_VIPKEFU, utils.Handler.create(GameModels.welfare, GameModels.welfare.checkVipKefuRed, null, false));
        /**首冲 */
        this.registerCall(GameRedState.FIRSTRECHARGE, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkFirstRechargeRedPoint, null, false));
        /**文官*/
        this.register(GameRedState.GUANZHI, [GameRedState.GUANZHI_WENGUAN, GameRedState.GUANZHI_WUGUAN]);
        this.registerCall(GameRedState.GUANZHI_WENGUAN, utils.Handler.create(GameModels.wenguanTask, GameModels.wenguanTask.checkWenGuan, null, false));
        this.registerCall(GameRedState.GUANZHI_WUGUAN, utils.Handler.create(GameModels.legion, GameModels.legion.canLingQuFengLu, null, false));
        this.registerCall(GameRedState.GUANZHI1, utils.Handler.create(GameModels.common, GameModels.common.checkGuanZhiRedPoint, null, false));
        /**历练 */
        this.register(GameRedState.LILIAN, [GameRedState.EXPLORE_WUHUNPAGODA, GameRedState.EXPLORE_PETPAGODA, GameRedState.EXPLORE_SUOYAOPAGODA]);
        this.registerCall(GameRedState.EXPLORE_WUHUNPAGODA, utils.Handler.create(GameModels.oneCountRedPoint, GameModels.oneCountRedPoint.checkWuHunViewRedPoint, null, false));
        this.registerCall(GameRedState.EXPLORE_PETPAGODA, utils.Handler.create(GameModels.oneCountRedPoint, GameModels.oneCountRedPoint.checkWushenViewRedPoint, null, false));
        this.registerCall(GameRedState.EXPLORE_SUOYAOPAGODA, utils.Handler.create(GameModels.oneCountRedPoint, GameModels.oneCountRedPoint.checkShilianViewRedPoint, null, false));
        /**限时活动 */
        this.register(GameRedState.EXPLORE_XIANSHI, [GameRedState.XIANSHI_WUSHUANG, GameRedState.XIANSHI_SANGUO, GameRedState.XIANSHI_WANGZHE, GameRedState.XIANSHI_DIANFENGSAI]);
        this.registerCall(GameRedState.XIANSHI_WUSHUANG, utils.Handler.create(GameModels.activityNotice, GameModels.activityNotice.checkLeginWarHed, null, false));
        this.registerCall(GameRedState.XIANSHI_SANGUO, utils.Handler.create(GameModels.activityNotice, GameModels.activityNotice.checkCampBattleHed, null, false));
        this.registerCall(GameRedState.MAIN_UNION_WANFA_CAMPBATTLE, utils.Handler.create(GameModels.activityNotice, GameModels.activityNotice.checkCampBattleHed, null, false));
        this.registerCall(GameRedState.XIANSHI_WANGZHE, utils.Handler.create(GameModels.activityNotice, GameModels.activityNotice.checkKingbattlefieldHed, null, false));
        this.register(GameRedState.XIANSHI_DIANFENGSAI, [GameRedState.XIANSHI_DIANFENGSAI_JINGCAI, GameRedState.XIANSHI_DIANFENGSAI_MOBAI]);
        this.registerCall(GameRedState.XIANSHI_DIANFENGSAI_JINGCAI, utils.Handler.create(GameModels.topBattle, GameModels.topBattle.checkJingCaiRedPoint, null, false));
        this.registerCall(GameRedState.XIANSHI_DIANFENGSAI_MOBAI, utils.Handler.create(GameModels.topBattle, GameModels.topBattle.checkMoBaiRedPoint, null, false));
        /**材料副本 */
        //this.register(GameRedState.MATERIAL_COPY, [GameRedState.MATERIAL_COPY_FUBEN, GameRedState.MATERIAL_COPY_HUANJIE_FUBEN, GameRedState.MATERIAL_COPY_MAIGU_FUBEN, GameRedState.MATERIAL_COPY_ZUDUI_FUBEN])
        // this.registerCall(GameRedState.MATERIAL_COPY_FUBEN, utils.Handler.create(GameModels.copyMaterial, GameModels.copyMaterial.checkMaterialRedPoint, null, false));
        // this.registerCall(GameRedState.MATERIAL_COPY_HUANJIE_FUBEN, utils.Handler.create(GameModels.copyMaterial, GameModels.copyMaterial.checkHuanjieRedPoint, null, false));
        // this.registerCall(GameRedState.MATERIAL_COPY_MAIGU_FUBEN, utils.Handler.create(GameModels.copyMaterial, GameModels.copyMaterial.checkMaiGuRed, null, false));
        // this.registerCall(GameRedState.MATERIAL_COPY_ZUDUI_FUBEN, utils.Handler.create(GameModels.copyMaterial, GameModels.copyMaterial.teamCopyRedPoint, null, false));
        this.register(GameRedState.MATERIAL_COPY, [GameRedState.MATERIAL_COPY_EXPFUBEN, GameRedState.MATERIAL_COPY_ZHANGONGFUBEN, GameRedState.MATERIAL_COPY_ZHANDUNFUBEN,
            GameRedState.MATERIAL_COPY_YUMAOFUBEN]);
        this.registerCall(GameRedState.MATERIAL_COPY_EXPFUBEN, utils.Handler.create(GameModels.copyMaterial, GameModels.copyMaterial.checkMaterialRedPointBuyPos, [0], false));
        this.registerCall(GameRedState.MATERIAL_COPY_ZHANGONGFUBEN, utils.Handler.create(GameModels.copyMaterial, GameModels.copyMaterial.checkMaterialRedPointBuyPos, [3], false));
        this.registerCall(GameRedState.MATERIAL_COPY_ZHANDUNFUBEN, utils.Handler.create(GameModels.copyMaterial, GameModels.copyMaterial.checkMaterialRedPointBuyPos, [2], false));
        this.registerCall(GameRedState.MATERIAL_COPY_YUMAOFUBEN, utils.Handler.create(GameModels.copyMaterial, GameModels.copyMaterial.checkMaterialRedPointBuyPos, [1], false));
        /**竞技 */
        this.register(GameRedState.ARENA, [GameRedState.ARENA_LADDER, GameRedState.ARENA_YANWU]);
        this.register(GameRedState.ARENA_LADDER, [GameRedState.ARENA_LADDER_RANK]);
        this.register(GameRedState.ARENA_LADDER_RANK, [GameRedState.ARENA_LADDER_REWARD]);
        this.registerCall(GameRedState.ARENA_LADDER, utils.Handler.create(GameModels.ladder, GameModels.ladder.checkMadelChest, null, false));
        this.registerCall(GameRedState.ARENA_LADDER_REWARD, utils.Handler.create(GameModels.ladder, GameModels.ladder.checkLadderReward, null, false));
        this.registerCall(GameRedState.ARENA_YANWU, utils.Handler.create(GameModels.ladder1, GameModels.ladder1.checkMadelChest, null, false));
        // this.registerCall(GameRedState.GOD_DIE, utils.Handler.create(GameModels.sceneGodDie, GameModels.sceneGodDie.checkRed, null, false));
        //	this.registerCall(GameRedState.WOORS_BOSS, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkWoorsRed, null, false));
        /**盘古仙境（原灭世荒漠） */
        //this.registerCall(GameRedState.DEATH_BOSS, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkDeathRed, null, false));
        /**boss */
        this.register(GameRedState.BOSS_COPY, [GameRedState.BOSS_COPY_EVERY, GameRedState.BOSS_COPY_SELF, GameRedState.BOSS_COPY_DOMAIN]);
        this.registerCall(GameRedState.BOSS_COPY_EVERY, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkEveryRedPoint, null, false));
        this.registerCall(GameRedState.BOSS_COPY_SELF, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkSelfRedPoint, null, false));
        //	this.registerCall(GameRedState.BOSS_COPY_CITY, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkCityBossCount, null, false));
        //	this.registerCall(GameRedState.BOSS_COPY_LOSE, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkLoseBossCount, null, false));
        //	this.registerCall(GameRedState.BOSS_COPY_FAMILY, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkFamilyBossCount, null, false));
        this.registerCall(GameRedState.BOSS_COPY_DOMAIN, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkDomainBossCount, null, false));
        //	this.registerCall(GameRedState.BOSS_COPY_FANTASY, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkFantasyBossCount, null, false));
        /**背包 */
        this.register(GameRedState.BAG, [GameRedState.BAG_USABLE_PROP, GameRedState.BAG_EQUIP, GameRedState.BAG_PET, GameRedState.BAG_HECHENG]);
        this.register(GameRedState.BAG_EQUIP, [GameRedState.BAG_EQUIP_SMELTING]);
        this.registerCall(GameRedState.BAG_USABLE_PROP, utils.Handler.create(GameModels.bag, GameModels.bag.checkUsableProp, null, false));
        this.registerCall(GameRedState.BAG_EQUIP_SMELTING, utils.Handler.create(GameModels.bag, GameModels.bag.checkSmelting, null, false));
        this.registerCall(GameRedState.BAG_PET, utils.Handler.create(GameModels.bag, GameModels.bag.checkSuiPianHeCheng, null, false));
        this.registerCall(GameRedState.BAG_HECHENG, utils.Handler.create(GameModels.common, GameModels.common.checkCommpentHeChengRedPoint, null, false));
        /**宝物 */
        this.register(GameRedState.BAOWU, [GameRedState.BAOWU_ZUOQI, GameRedState.BAOWU_WING, GameRedState.BAOWU_HONGYAN, GameRedState.BAOWU_SHENBIN]);
        /**神兵 */
        this.registerCall(GameRedState.BAOWU_SHENBIN, utils.Handler.create(GameModels.shenbing, GameModels.shenbing.checkShenBinRed, null, false));
        /**红颜 */
        this.registerCall(GameRedState.BAOWU_HONGYAN, utils.Handler.create(GameModels.hongYan, GameModels.hongYan.checkAllHongYanRedPoint, null, false));
        /**羽翼 */
        this.register(GameRedState.BAOWU_WING, [GameRedState.BAOWU_WING_POS1 /*, GameRedState.BAOWU_WING_POS2, GameRedState.BAOWU_WING_POS3, GameRedState.BAOWU_WING_POS4,
            GameRedState.BAOWU_WING_POS5*/
        ]);
        this.registerCall(GameRedState.BAOWU_WING_POS1, utils.Handler.create(GameModels.role, GameModels.role.checkWingRed, [0], false));
        //this.registerCall(GameRedState.BAOWU_WING_POS2, utils.Handler.create(GameModels.role, GameModels.role.checkWingRed, [1], false));
        //this.registerCall(GameRedState.BAOWU_WING_POS3, utils.Handler.create(GameModels.role, GameModels.role.checkWingRed, [2], false));
        //this.registerCall(GameRedState.BAOWU_WING_POS4, utils.Handler.create(GameModels.role, GameModels.role.checkWingRed, [3], false));
        //this.registerCall(GameRedState.BAOWU_WING_POS5, utils.Handler.create(GameModels.role, GameModels.role.checkWingRed, [4], false));
        /**坐骑 */
        this.registerCall(GameRedState.BAOWU_ZUOQI, utils.Handler.create(GameModels.hores, GameModels.hores.checkHoresRedPoint, null, false));
        /**将领 */
        this.register(GameRedState.ROLE, [GameRedState.ROLE_EQIUP, GameRedState.ROLE_SHENGXING, GameRedState.ROLE_JIUXING, GameRedState.ROLE_LIUDAO]);
        this.register(GameRedState.ROLE_EQIUP, [GameRedState.ROLE_EQIUP_POS1, GameRedState.ROLE_EQIUP_POS2, GameRedState.ROLE_EQIUP_POS3, GameRedState.ROLE_EQIUP_POS4,
            GameRedState.ROLE_EQIUP_POS5]);
        //六道
        this.register(GameRedState.ROLE_LIUDAO, [GameRedState.ROLE_LIUDAO_POS1, GameRedState.ROLE_LIUDAO_POS2, GameRedState.ROLE_LIUDAO_POS3, GameRedState.ROLE_LIUDAO_POS4,
            GameRedState.ROLE_LIUDAO_POS5]);
        this.registerCall(GameRedState.ROLE_LIUDAO_POS1, utils.Handler.create(GameModels.equip, GameModels.equip.checkLiuDaoRedPoint, [0], false));
        this.registerCall(GameRedState.ROLE_LIUDAO_POS2, utils.Handler.create(GameModels.equip, GameModels.equip.checkLiuDaoRedPoint, [1], false));
        this.registerCall(GameRedState.ROLE_LIUDAO_POS3, utils.Handler.create(GameModels.equip, GameModels.equip.checkLiuDaoRedPoint, [2], false));
        this.registerCall(GameRedState.ROLE_LIUDAO_POS4, utils.Handler.create(GameModels.equip, GameModels.equip.checkLiuDaoRedPoint, [3], false));
        this.registerCall(GameRedState.ROLE_LIUDAO_POS5, utils.Handler.create(GameModels.equip, GameModels.equip.checkLiuDaoRedPoint, [4], false));
        //九星
        this.register(GameRedState.ROLE_JIUXING, [GameRedState.ROLE_JIUXING_POS1, GameRedState.ROLE_JIUXING_POS2, GameRedState.ROLE_JIUXING_POS3, GameRedState.ROLE_JIUXING_POS4,
            GameRedState.ROLE_JIUXING_POS5]);
        this.registerCall(GameRedState.ROLE_JIUXING_POS1, utils.Handler.create(GameModels.equip, GameModels.equip.checkJiuXingRedPoint, [0], false));
        this.registerCall(GameRedState.ROLE_JIUXING_POS2, utils.Handler.create(GameModels.equip, GameModels.equip.checkJiuXingRedPoint, [1], false));
        this.registerCall(GameRedState.ROLE_JIUXING_POS3, utils.Handler.create(GameModels.equip, GameModels.equip.checkJiuXingRedPoint, [2], false));
        this.registerCall(GameRedState.ROLE_JIUXING_POS4, utils.Handler.create(GameModels.equip, GameModels.equip.checkJiuXingRedPoint, [3], false));
        this.registerCall(GameRedState.ROLE_JIUXING_POS5, utils.Handler.create(GameModels.equip, GameModels.equip.checkJiuXingRedPoint, [4], false));
        /**升星 */
        this.registerCall(GameRedState.ROLE_SHENGXING, utils.Handler.create(GameModels.upStar, GameModels.upStar.checkTatolUpStarRedPoint, null, false));
        /**装备 */
        this.registerCall(GameRedState.ROLE_EQIUP_POS1, utils.Handler.create(GameModels.equip, GameModels.equip.checkEqiup, [0], false));
        this.registerCall(GameRedState.ROLE_EQIUP_POS2, utils.Handler.create(GameModels.equip, GameModels.equip.checkEqiup, [1], false));
        this.registerCall(GameRedState.ROLE_EQIUP_POS3, utils.Handler.create(GameModels.equip, GameModels.equip.checkEqiup, [2], false));
        this.registerCall(GameRedState.ROLE_EQIUP_POS4, utils.Handler.create(GameModels.equip, GameModels.equip.checkEqiup, [3], false));
        this.registerCall(GameRedState.ROLE_EQIUP_POS5, utils.Handler.create(GameModels.equip, GameModels.equip.checkEqiup, [4], false));
        /**资质 */
        //this.registerCall(GameRedState.ROLE_ZIZHI, utils.Handler.create(GameModels.role, GameModels.role.checkZiZhiRedPoint, null, false));
        /**时装 */
        this.register(GameRedState.ROLE_EQIUP_FASHION, [GameRedState.ROLE_EQIUP_FASHION_CLOTH, GameRedState.ROLE_EQIUP_FASHION_WEAPON, GameRedState.ROLE_EQIUP_FASHION_HALO]);
        this.registerCall(GameRedState.ROLE_EQIUP_FASHION_CLOTH, utils.Handler.create(GameModels.fashion, GameModels.fashion.checkFashionRed, [TypeFashion.CLOTHES], false));
        this.registerCall(GameRedState.ROLE_EQIUP_FASHION_WEAPON, utils.Handler.create(GameModels.fashion, GameModels.fashion.checkFashionRed, [TypeFashion.WEAPON], false));
        this.registerCall(GameRedState.ROLE_EQIUP_FASHION_HALO, utils.Handler.create(GameModels.fashion, GameModels.fashion.checkFashionRed, [TypeFashion.HALO], false));
        /**阵营 */
        this.register(GameRedState.UNION, [GameRedState.UNION_RICHANG, GameRedState.UNION_FULI]);
        this.register(GameRedState.UNION_RICHANG, [GameRedState.UNION_RICHANG_WUGUAN, GameRedState.UNION_RICHANG_MOBAI, GameRedState.UNION_RICHANG_ZHANQI, GameRedState.UNION_RICHANG_TASK]);
        this.registerCall(GameRedState.UNION_RICHANG_WUGUAN, utils.Handler.create(GameModels.legion, GameModels.legion.canLingQuFengLu, null, false));
        this.registerCall(GameRedState.UNION_RICHANG_MOBAI, utils.Handler.create(GameModels.legion, GameModels.legion.canMoBai, null, false));
        this.registerCall(GameRedState.UNION_RICHANG_ZHANQI, utils.Handler.create(GameModels.legion, GameModels.legion.canJunXian, null, false));
        this.register(GameRedState.UNION_RICHANG_TASK, [GameRedState.UNION_RICHANG_TASK_TASK, GameRedState.UNION_RICHANG_TASK_ZHANLING]);
        this.registerCall(GameRedState.UNION_RICHANG_TASK_ZHANLING, utils.Handler.create(GameModels.redPoint, GameModels.redPoint.checkZhanLingRedPoint, null, false));
        this.registerCall(GameRedState.UNION_RICHANG_TASK_TASK, utils.Handler.create(GameModels.achievement, GameModels.achievement.checkQst, null, false));
        this.register(GameRedState.UNION_FULI, [GameRedState.UNION_FULI_TEHUI, GameRedState.UNION_FULI_BINGZHONG, GameRedState.UNION_SHARE]);
        this.registerCall(GameRedState.UNION_FULI_BINGZHONG, utils.Handler.create(GameModels.corps, GameModels.corps.checkAllLegoinCorps, null, false));
        this.register(GameRedState.UNION_FULI_TEHUI, [GameRedState.UNION_FULI_TEHUI_GOUMAI, GameRedState.UNION_FULI_TEHUI_LINGQU]);
        this.registerCall(GameRedState.UNION_FULI_TEHUI_GOUMAI, utils.Handler.create(GameModels.legion, GameModels.legion.checkTeHuiGouMaiRedPoint, null, false));
        this.registerCall(GameRedState.UNION_FULI_TEHUI_LINGQU, utils.Handler.create(GameModels.legion, GameModels.legion.checkTeHuiRedPoint, null, false));
        this.registerCall(GameRedState.UNION_SHARE, utils.Handler.create(GameModels.share, GameModels.share.checkFriendShareRedPoint, null, false));
        /**日常活动 */
        this.register(GameRedState.DAILY_ACTIVITY, [GameRedState.DAILY_ACTIVITY_MEIRILEICHONG, GameRedState.DAILY_ACTIVITY_ZHOUKA, GameRedState.DAILY_ACTIVITY_MEIRICHONGZHI, GameRedState.MONTHCARD, GameRedState.DAILY_ACTIVITY_MEIZHOUTEHUI, GameRedState.DAILY_ACTIVITY_MEIYUETEHUI,
            GameRedState.DAILY_ACTIVITY_LIANCHONGHAOLI]);
        this.registerCall(GameRedState.DAILY_ACTIVITY_MEIRILEICHONG, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.mrlc], false));
        this.registerCall(GameRedState.DAILY_ACTIVITY_MEIRICHONGZHI, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.mrcz], false));
        this.registerCall(GameRedState.DAILY_ACTIVITY_MEIZHOUTEHUI, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.mzth], false));
        this.registerCall(GameRedState.DAILY_ACTIVITY_MEIYUETEHUI, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.myth], false));
        this.registerCall(GameRedState.DAILY_ACTIVITY_LIANCHONGHAOLI, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.lchl], false));
        this.registerCall(GameRedState.DAILY_ACTIVITY_ZHOUKA, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkWeekCardRedPoint, null, false));
        /**月卡 */
        this.registerCall(GameRedState.MONTHCARD, utils.Handler.create(GameModels.redPoint, GameModels.redPoint.checkMonthCardRedPoint, null, false));
        this.registerCall(GameRedState.OPENSERVER_ACTIVITY_SIRENDINGZHI, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.srdz], false));
        this.registerCall(GameRedState.OPENSERVER_ACTIVITY_ZHUANSHUTEQUAN, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkZhuanShuRedPoint, null, false));
        /**一元抢购 */
        this.registerCall(GameRedState.ONEYUANBUY, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.yyqg], false));
        /**邮件 */
        this.register(GameRedState.MAIN_MAIL_SOCIALITY, [GameRedState.MAIN_MAIL, GameRedState.MAIN_SOCIALITY]);
        this.registerCall(GameRedState.MAIN_MAIL, utils.Handler.create(GameModels.mail, GameModels.mail.checkMailRed, null, false));
        this.register(GameRedState.MAIL, [GameRedState.MAIL_ONEGET]);
        this.registerCall(GameRedState.MAIL_ONEGET, utils.Handler.create(GameModels.mail, GameModels.mail.checkMailRed, null, false));
        /**好友 */
        this.registerCall(GameRedState.MAIN_SOCIALITY, utils.Handler.create(GameModels.friends, GameModels.friends.mainPrivateChatRedPoint, null, false));
        this.register(GameRedState.SOCIALITY, [GameRedState.SOCIALITY_FRIENDS]);
        this.register(GameRedState.SOCIALITY_FRIENDS, [GameRedState.SOCIALITY_FRIENDS_APPLY, GameRedState.SOCIALITY_PRIVATE_CHAT]);
        this.registerCall(GameRedState.SOCIALITY_FRIENDS_APPLY, utils.Handler.create(GameModels.friends, GameModels.friends.checkApplyList, null, false));
        this.registerCall(GameRedState.SOCIALITY_PRIVATE_CHAT, utils.Handler.create(GameModels.friends, GameModels.friends.checkPrivateChatRed, null, false));
        /**VIP特权 */
        this.register(GameRedState.VIP_TEQUAN, [GameRedState.VIP_TEQUAN_XIANGOU, GameRedState.VIP_TEQUAN_SPECAILCARD]);
        this.registerCall(GameRedState.VIP_TEQUAN_XIANGOU, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkVipBuyRedPoint, null, false));
        //this.registerCall(GameRedState.VIP_TEQUAN_DUIHUAN, utils.Handler.create(GameModels.vip, GameModels.vip.vipChangeRedPoint, null, false));
        this.registerCall(GameRedState.VIP_TEQUAN_SPECAILCARD, utils.Handler.create(GameModels.vip, GameModels.vip.vipSpecailCardRedPoint, null, false));
        /**功勋商店 */
        this.register(GameRedState.SHOP, [GameRedState.SHENMI_SHOP, GameRedState.GUANXING_SHOP, GameRedState.MINGJIANG_SHOP]);
        this.registerCall(GameRedState.SHENMI_SHOP, utils.Handler.create(GameModels.oneCountRedPoint, GameModels.oneCountRedPoint.checkGongXunRedPoint, [0], false));
        this.registerCall(GameRedState.GUANXING_SHOP, utils.Handler.create(GameModels.oneCountRedPoint, GameModels.oneCountRedPoint.checkGongXunRedPoint, [1], false));
        this.registerCall(GameRedState.MINGJIANG_SHOP, utils.Handler.create(GameModels.oneCountRedPoint, GameModels.oneCountRedPoint.checkGongXunRedPoint, [2], false));
        /**圣旨 */
        this.register(GameRedState.SHENGZHIMAIN, [GameRedState.SHENGZHI, GameRedState.WANJIANGGUIXIN, GameRedState.MINGJIANGTASK]);
        this.registerCall(GameRedState.SHENGZHI, utils.Handler.create(GameModels.redPoint, GameModels.redPoint.checkShengZhiRedPoint, null, false));
        this.registerCall(GameRedState.WANJIANGGUIXIN, utils.Handler.create(GameModels.petGroup, GameModels.petGroup.checkPetGroupRedPoint, null, false));
        this.registerCall(GameRedState.MINGJIANGTASK, utils.Handler.create(GameModels.mingJiangTask, GameModels.mingJiangTask.checkRedPoint, null, false));
        /**城池界面的首冲 每日活动 开服活动  */
        this.registerCall(GameRedState.FIRSTRECHARGE1, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkFirstRechargeRedPoint, null, false));
        this.registerCall(GameRedState.DAILY_ACTIVITY1, utils.Handler.create(GameModels.common, GameModels.common.checkDAILYACTIVITYRedPoint, null, false));
        this.registerCall(GameRedState.TEQUAN, utils.Handler.create(GameModels.vip, GameModels.vip.vipSpecailCardRedPoint, null, false));
        /**通缉令*/
        //this.registerCall(GameRedState.TONGJILING, utils.Handler.create(GameModels.chapter, GameModels.chapter.checkTongJiRedPoint, null, false));
        /**偶遇仙人 */
        this.registerCall(GameRedState.OUYUXIANREN, utils.Handler.create(GameModels.ouYuXianRen, GameModels.ouYuXianRen.checkOuYuXianRenRedPoint, null, false));
        /**诸葛亮 */
        this.registerCall(GameRedState.ZHUGELIANG, utils.Handler.create(GameModels.limitTarget, GameModels.limitTarget.checkPedPoint, null, false));
        /**强征 */
        this.registerCall(GameRedState.QIANGZHENG, utils.Handler.create(GameModels.common, GameModels.common.checkQiangZhengRedPoint, null, false));
        /**远征 */
        this.register(GameRedState.PETWANFA, [GameRedState.PETWANFA_YUANZHENG]);
        this.registerCall(GameRedState.PETWANFA_YUANZHENG, utils.Handler.create(GameModels.legion, GameModels.legion.checkYuanZhengRedPoint, null, false));
        this.registerCall(GameRedState.PETWANFA_BINGFENSANLU, utils.Handler.create(GameModels.legion, GameModels.legion.checkBingFenSanLuRedPoint, null, false));
        /**图鉴 */
        this.register(GameRedState.TUJIAN, [GameRedState.TUJIAN_TUJIAN, GameRedState.TUJIAN_QUCIK_SHENGXING, GameRedState.TUJIAN_LV_ZHONGSEHNG, GameRedState.TUJIAN_STAR_ZHONGSEHNG]);
        /**将星 */
        // this.register(GameRedState.TUJIAN_TUJIAN, [GameRedState.TUJIAN_TUJIAN_MOSHEN]);
        this.registerCall(GameRedState.TUJIAN_TUJIAN, utils.Handler.create(GameModels.handBook, GameModels.handBook.checkMoShenRedPoint, null, false));
        /**魔神 */
        // this.registerCall(GameRedState.TUJIAN_TUJIAN_MOSHEN, utils.Handler.create(GameModels.handBook, GameModels.handBook.checkMoShenRedPoint, null, false));
        /**等级重生 */
        this.registerCall(GameRedState.TUJIAN_LV_ZHONGSEHNG, utils.Handler.create(GameModels.upStar, GameModels.upStar.checkPetZhongShengRedPoint, null, false));
        /**快速升星 */
        this.registerCall(GameRedState.TUJIAN_QUCIK_SHENGXING, utils.Handler.create(GameModels.petChoose, GameModels.petChoose.checkTatolRedPoint, null, false));
        /**打造 */
        this.register(GameRedState.DAZAO, [GameRedState.DAZAO_SHENBING, GameRedState.DAZAO_CHENGZHUANG, GameRedState.DAZAO_SHENZHIDUANZAO]);
        /**神兵打造 */
        this.registerCall(GameRedState.DAZAO_SHENBING, utils.Handler.create(GameModels.smithy, GameModels.smithy.checkRedPoint, null, false));
        /**神之锻造 */
        this.registerCall(GameRedState.DAZAO_SHENZHIDUANZAO, utils.Handler.create(GameModels.tavern, GameModels.tavern.checkDodDuanZao, null, false));
        /**橙装*/
        this.register(GameRedState.DAZAO_CHENGZHUANG, [GameRedState.DAZAO_CHENGZHUANG_POS1, GameRedState.DAZAO_CHENGZHUANG_POS2,
            GameRedState.DAZAO_CHENGZHUANG_POS3, GameRedState.DAZAO_CHENGZHUANG_POS4, GameRedState.DAZAO_CHENGZHUANG_POS5]);
        this.registerCall(GameRedState.DAZAO_CHENGZHUANG_POS1, utils.Handler.create(GameModels.equip, GameModels.equip.checkChengEqiup, [0], false));
        this.registerCall(GameRedState.DAZAO_CHENGZHUANG_POS2, utils.Handler.create(GameModels.equip, GameModels.equip.checkChengEqiup, [1], false));
        this.registerCall(GameRedState.DAZAO_CHENGZHUANG_POS3, utils.Handler.create(GameModels.equip, GameModels.equip.checkChengEqiup, [2], false));
        this.registerCall(GameRedState.DAZAO_CHENGZHUANG_POS4, utils.Handler.create(GameModels.equip, GameModels.equip.checkChengEqiup, [3], false));
        this.registerCall(GameRedState.DAZAO_CHENGZHUANG_POS5, utils.Handler.create(GameModels.equip, GameModels.equip.checkChengEqiup, [4], false));
        /**主界面战令 */
        this.registerCall(GameRedState.MAIN_ZHANLING, utils.Handler.create(GameModels.redPoint, GameModels.redPoint.checkZhanLingRedPoint, null, false));
        /**限时礼包 */
        this.registerCall(GameRedState.XIANSHI_GIFT, utils.Handler.create(GameModels.notifyGift, GameModels.notifyGift.checkRedPoint, [1], false));
        /**绝版礼包 */
        this.registerCall(GameRedState.JUEBAN_GIFT, utils.Handler.create(GameModels.notifyGift, GameModels.notifyGift.checkRedPoint, [2], false));
        /**时间追赶礼包 */
        this.registerCall(GameRedState.TIMEPICK_GIFT, utils.Handler.create(GameModels.common, GameModels.common.checkTimePickGiftRedPoint, null, false));
        /**国战 */
        this.registerCall(GameRedState.KING_WAR, utils.Handler.create(GameModels.kingwar, GameModels.kingwar.checkRedPoint, null, false));
        /**七日目标 */
        this.registerCall(GameRedState.MAIN_SEVENDAY, utils.Handler.create(GameModels.redPoint, GameModels.redPoint.checkSevenDayRedPoint, null, false));
        this.register(GameRedState.ANIMAL, [GameRedState.ANIMAL_UPGRADE, GameRedState.ANIMAL_REWAED, GameRedState.ANIMAL_CHOUJIANG]);
        this.registerCall(GameRedState.ANIMAL_UPGRADE, utils.Handler.create(GameModels.animal, GameModels.animal.checkAnimalGradeRedPoint, null, false));
        this.registerCall(GameRedState.ANIMAL_REWAED, utils.Handler.create(GameModels.animal, GameModels.animal.checkAnimalRewardRedPoint, [1], false));
        this.registerCall(GameRedState.ANIMAL_CHOUJIANG, utils.Handler.create(GameModels.animal, GameModels.animal.checkAnimalTavernRedPoint, [2], false));
        /**限时活动1 */
        this.register(GameRedState.LIMIT1, [GameRedState.LIMIT1_1, GameRedState.LIMIT1_2, GameRedState.LIMIT1_3, GameRedState.LIMIT1_4]);
        this.registerCall(GameRedState.LIMIT1_1, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.act1], false));
        this.registerCall(GameRedState.LIMIT1_2, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.act2], false));
        this.registerCall(GameRedState.LIMIT1_3, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.act3], false));
        this.registerCall(GameRedState.LIMIT1_4, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.act7], false));
        /**限时活动2 */
        this.registerCall(GameRedState.LIMIT2, utils.Handler.create(GameModels.sgActivity, GameModels.sgActivity.checkRedPoint, [game.sgActivityType.act5], false));
        /**军功商城 */
        this.register(GameRedState.INTEGRALSHOP, [GameRedState.JUNGONG_SHOP]);
        this.registerCall(GameRedState.JUNGONG_SHOP, utils.Handler.create(GameModels.changeShop, GameModels.changeShop.checkJunGongShopRedPoint, null, false));
        /**分享 */
        this.registerCall(GameRedState.SHARE, utils.Handler.create(GameModels.share, GameModels.share.checkShareRedPoint, null, false));
        // //1
        // this.register(GameRedState.ROLE, [GameRedState.ROLE_EQUIP, GameRedState.ROLE_SKILL, GameRedState.ROLE_XIUSHEN, GameRedState.ROLE_GODDESS, GameRedState.ROLE_SHENHUN]);
        // this.register(GameRedState.BOSS_COPY, [GameRedState.BOSS_COPY_SELF, GameRedState.BOSS_COPY_LOSE, GameRedState.BOSS_COPY_DOMAIN, GameRedState.BOSS_COPY_FANTASY, GameRedState.BOSS_COPY_FAMILY, GameRedState.BOSS_COPY_CITY]);
        // //日常
        // this.register(GameRedState.ACTIVITY, [GameRedState.ACTIVITY_DWKH, GameRedState.ACTIVITY_VIPG, GameRedState.ACTIVITY_XYZP, GameRedState.ACTIVITY_KFLB, GameRedState.ACTIVITY_TTLC, GameRedState.ACTIVITY_LCLB, GameRedState.ACTIVITY_TTFL, GameRedState.ACTIVITY_SDZK, GameRedState.ACTIVITY_SDCZ, GameRedState.ACTIVITY_MDZP,GameRedState.ACTIVITY_LCSL]);
        // //开服
        // this.register(GameRedState.OPENSERVERACTIVITY, [GameRedState.ACTIVITY_KFJJ, GameRedState.ACTIVITY_JJPH, GameRedState.ACTIVITY_JTZB, GameRedState.ACTIVITY_QMBOSS, GameRedState.ACTIVITY_XGLB]);
        // //2
        // this.register(GameRedState.ROLE_EQUIP, [GameRedState.ROLE_EQUIP_USE, GameRedState.ROLE_ORANGE, GameRedState.ROLE_GEM, GameRedState.ROLE_LILIAN, GameRedState.ROLE_PHANTOM, GameRedState.ROLE_WING,
        // GameRedState.ROLE_DEITYTOTAL, GameRedState.ROLE_ZHUANGBAN, GameRedState.ROLE_LIFESOUL, GameRedState.ROLE_STAREQUIP, GameRedState.ROLE_GODHOOD]);
        // this.register(GameRedState.ROLE_SKILL, [GameRedState.ROLE_SKILL_UP, GameRedState.ROLE_SKILL_UPONEKEY]);
        // this.register(GameRedState.ROLE_XIUSHEN, [GameRedState.ROLE_XIUSHEN_UPGRADE, GameRedState.ROLE_XIUSHEN_GAIN]);
        // this.register(GameRedState.ROLE_XIUSHEN_GAIN, [GameRedState.ROLE_XIUSHEN_LEVELLOWER, GameRedState.ROLE_XIUSHEN_ADDPOWER1, GameRedState.ROLE_XIUSHEN_ADDPOWER2]);
        // this.register(GameRedState.ROLE_SHENHUN, [GameRedState.ROLE_SHENHUN_PLAYER, GameRedState.ROLE_SHENHUN_POINT1, GameRedState.ROLE_SHENHUN_POINT2, GameRedState.ROLE_SHENHUN_POINT3]);
        // ///3
        // this.register(GameRedState.ROLE_ORANGE, [GameRedState.ROLE_ORANGE_FORGE, GameRedState.ROLE_ORANGE_GET_DEBRIS]);
        // this.register(GameRedState.ROLE_DEITYTOTAL, [GameRedState.ROLE_DEITYEQUIP, GameRedState.ROLE_DEITYITEM]);
        // // this.register(GameState.ROLE_IMPRINT, [GameState.ROLE_IMPRINT_UPGRADE]);
        // // this.register(GameState.ROLE_RUNES, [GameState.ROLE_RUNES_UPGRADE]);
        // // this.register(GameRedState.ROLE_FIGHTSOUL, [GameRedState.ROLE_FIGHTSOUL_UPGRADE]);
        // // this.register(GameRedState.ROLE_DRAGON, [GameRedState.ROLE_DRAGON_UPGRADE]);
        // this.register(GameRedState.ROLE_GEM, [GameRedState.ROLE_RUNES, GameRedState.ROLE_IMPRINT, GameRedState.ROLE_DRAGON,GameRedState.ROLE_INIFINITE_GAUNTLET]);
        // this.register(GameRedState.ROLE_LILIAN, [GameRedState.ROLE_FIGHTSOUL, GameRedState.ROLE_TAMING_DRAGON]);
        // this.registerCall(GameRedState.ROLE_TAMING_DRAGON, utils.Handler.create(GameModels.tamingDragon, GameModels.tamingDragon.checkTamingDragon, null, false));
        // // this.register(GameRedState.ROLE_IMPRINT, [GameRedState.ROLE_IMPRINT_UPGRADE]);
        // this.register(GameRedState.ROLE_RUNES, [GameRedState.ROLE_RUNES_UPGRADE]);
        // this.register(GameRedState.ROLE_DRAGON, [GameRedState.ROLE_DRAGON_UPGRADE]);
        // this.register(GameRedState.ROLE_FIGHTSOUL, [GameRedState.ROLE_FIGHTSOUL_UPGRADE]);
        // this.register(GameRedState.ROLE_ZHUANGBAN, [GameRedState.ROLE_ZHUANGBAN_FASHION]);
        // this.register(GameRedState.ROLE_ZHUANGBAN_FASHION, [GameRedState.ROLE_ZHUANGBAN_FASHION_CLOTH, GameRedState.ROLE_ZHUANGBAN_FASHION_WEAPON,GameRedState.ROLE_ZHUANGBAN_FASHION_MOLONG]);
        // //叶子节点
        // this.registerCall(GameRedState.ROLE_SKILL_UP, utils.Handler.create(GameModels.role, GameModels.role.checkAllSkillUpgrade, null, false));
        // this.registerCall(GameRedState.ROLE_SKILL_UPONEKEY, utils.Handler.create(GameModels.role, GameModels.role.checkAllSkillUpgrade, null, false));
        // this.registerCall(GameRedState.ROLE_EQUIP_USE, utils.Handler.create(GameModels.bag, GameModels.bag.checkBestEquip, null, false));
        // this.registerCall(GameRedState.ROLE_XIUSHEN_UPGRADE, utils.Handler.create(GameModels.role, GameModels.role.checkXiuShenUpgrade, null, false));
        // this.registerCall(GameRedState.ROLE_XIUSHEN_LEVELLOWER, utils.Handler.create(GameModels.role, GameModels.role.checkXiuShenData1, null, false));
        // this.registerCall(GameRedState.ROLE_XIUSHEN_ADDPOWER1, utils.Handler.create(GameModels.role, GameModels.role.checkXiuShenData2, null, false));
        // this.registerCall(GameRedState.ROLE_XIUSHEN_ADDPOWER2, utils.Handler.create(GameModels.role, GameModels.role.checkXiuShenData3, null, false));
        // this.registerCall(GameRedState.ROLE_GODDESS, utils.Handler.create(GameModels.goddess, GameModels.goddess.checkGoddessShowRed, null, false));
        // this.registerCall(GameRedState.ROLE_FIGHTSOUL_UPGRADE, utils.Handler.create(GameModels.role, GameModels.role.checkFightSoulUpgrade, null, false));
        // this.registerCall(GameRedState.ROLE_DRAGON_UPGRADE, utils.Handler.create(GameModels.role, GameModels.role.checkDragontears, null, false));
        // this.registerCall(GameRedState.ROLE_INIFINITE_GAUNTLET, utils.Handler.create(GameModels.infiniteGauntlet, GameModels.infiniteGauntlet.checkInfiniteGauntletRed, null, false));
        // this.registerCall(GameRedState.ROLE_PHANTOM, utils.Handler.create(GameModels.role, GameModels.role.checkPhantomsHeadIcons, null, false));
        // this.registerCall(GameRedState.ROLE_WING, utils.Handler.create(GameModels.role, GameModels.role.checkWingRed, null, false));
        // this.registerCall(GameRedState.ROLE_DEITYTOTAL, utils.Handler.create(GameModels.equip, GameModels.equip.checkDeityTotal, null, false));
        // this.registerCall(GameRedState.ROLE_DEITYEQUIP, utils.Handler.create(GameModels.equip, GameModels.equip.checkDeityRed, null, false));
        // this.registerCall(GameRedState.ROLE_DEITYITEM, utils.Handler.create(GameModels.deityItem, GameModels.deityItem.checkDeityItemRed, null, false));
        // this.registerCall(GameRedState.ROLE_ORANGE_GET_DEBRIS, utils.Handler.create(GameModels.bag, GameModels.bag.checkOrangeEquipDecompose, null, false));
        // this.registerCall(GameRedState.ROLE_LIFESOUL, utils.Handler.create(GameModels.lifeSoul, GameModels.lifeSoul.checkLifeSoulRed, null, false));
        // this.registerCall(GameRedState.ROLE_STAREQUIP, utils.Handler.create(GameModels.starEquip, GameModels.starEquip.checkStarEquipRed, null, false));
        // this.registerCall(GameRedState.ROLE_GODHOOD, utils.Handler.create(GameModels.godhood, GameModels.godhood.checkGodhoodRed, null, false));
        // this.registerCall(GameRedState.ROLE_ZHUANGBAN_FASHION_CLOTH, utils.Handler.create(GameModels.fashion, GameModels.fashion.checkFashionRed, [TypeFashion.CLOTHES], false));
        // this.registerCall(GameRedState.ROLE_ZHUANGBAN_FASHION_WEAPON, utils.Handler.create(GameModels.fashion, GameModels.fashion.checkFashionRed, [TypeFashion.WEAPON], false));
        // this.registerCall(GameRedState.ROLE_ZHUANGBAN_FASHION_MOLONG, utils.Handler.create(GameModels.fashion, GameModels.fashion.checkFashionRed, [TypeFashion.HALO], false));
        // this.registerCall(GameRedState.ROLE_SHENHUN_PLAYER, utils.Handler.create(GameModels.role, GameModels.role.checkShenHunCanEquip, [0], false));
        // this.registerCall(GameRedState.ROLE_SHENHUN_POINT1, utils.Handler.create(GameModels.role, GameModels.role.checkShenHunCanEquip, [1], false));
        // this.registerCall(GameRedState.ROLE_SHENHUN_POINT2, utils.Handler.create(GameModels.role, GameModels.role.checkShenHunCanEquip, [2], false));
        // this.registerCall(GameRedState.ROLE_SHENHUN_POINT3, utils.Handler.create(GameModels.role, GameModels.role.checkShenHunCanEquip, [3], false));
        // //BAG 
        // this.register(GameRedState.BAG, [GameRedState.BAG_USABLE_PROP, GameRedState.BAG_EQUIP,GameRedState.BAG_SHENHUN_HECHENG]);
        // this.register(GameRedState.BAG_EQUIP, [GameRedState.BAG_EQUIP_SMELTING]);
        // this.registerCall(GameRedState.BAG_USABLE_PROP, utils.Handler.create(GameModels.bag, GameModels.bag.checkUsableProp, null, false));
        // this.registerCall(GameRedState.BAG_EQUIP_SMELTING, utils.Handler.create(GameModels.bag, GameModels.bag.checkSmelting, null, false));
        // this.registerCall(GameRedState.BAG_SHENHUN_HECHENG, utils.Handler.create(GameModels.bag, GameModels.bag.checkShenHunHeCheng, null, false));
        // this.registerCall(GameRedState.BOSS_COPY_EVERY, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkEveryBossCount, null, false));
        // this.registerCall(GameRedState.BOSS_COPY_SELF, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkSelfBossCount, null, false));
        // this.registerCall(GameRedState.BOSS_COPY_CITY, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkCityBossCount, null, false));
        // this.registerCall(GameRedState.BOSS_COPY_LOSE, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkLoseBossCount, null, false));
        // this.registerCall(GameRedState.BOSS_COPY_FAMILY, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkFamilyBossCount, null, false));
        // this.registerCall(GameRedState.BOSS_COPY_DOMAIN, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkDomainBossCount, null, false));
        // this.registerCall(GameRedState.BOSS_COPY_FANTASY, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkFantasyBossCount, null, false));
        // //日常
        // this.registerCall(GameRedState.ACTIVITY_LCFL, utils.Handler.create(GameModels.activity, GameModels.activity.checkLCFLRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_LCLB, utils.Handler.create(GameModels.activity, GameModels.activity.checkLCLBRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_TTFL, utils.Handler.create(GameModels.activity, GameModels.activity.checkTTFLRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_TTLC, utils.Handler.create(GameModels.activity, GameModels.activity.checkTTLCRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_KFLB, utils.Handler.create(GameModels.activity, GameModels.activity.checkKFLBRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_XYZP, utils.Handler.create(GameModels.activity, GameModels.activity.checkXYZPRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_DWKH, utils.Handler.create(GameModels.activity, GameModels.activity.checkDWKHRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_SDZK, utils.Handler.create(GameModels.activity, GameModels.activity.checkShenDianDiscountRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_SDCZ, utils.Handler.create(GameModels.activity, GameModels.activity.checkShenDianRechargeRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_MDZP, utils.Handler.create(GameModels.activity, GameModels.activity.checkMDZPRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_LCSL, utils.Handler.create(GameModels.activity, GameModels.activity.checkLCSLRed, null, false));
        // this.register(GameRedState.ACTIVITY_VIPG, [GameRedState.ACTIVITY_VIPG_Zero, GameRedState.ACTIVITY_VIPG_Read]);
        // this.registerCall(GameRedState.ACTIVITY_VIPG_Zero, utils.Handler.create(GameModels.vip, GameModels.vip.checkVipIsBuyZero, null, false));
        // this.registerCall(GameRedState.ACTIVITY_VIPG_Read, utils.Handler.create(GameModels.vip, GameModels.vip.checkVipGiftIsRead, null, false));
        // //开服
        // this.registerCall(GameRedState.ACTIVITY_JJPH, utils.Handler.create(GameModels.activity, GameModels.activity.checkJJPHRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_KFJJ, utils.Handler.create(GameModels.activity, GameModels.activity.checkKFJJRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_QMBOSS, utils.Handler.create(GameModels.activity, GameModels.activity.checkQMBOSSRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_JTZB, utils.Handler.create(GameModels.activity, GameModels.activity.checkJTZBRed, null, false));
        // this.registerCall(GameRedState.ACTIVITY_XGLB, utils.Handler.create(GameModels.activity, GameModels.activity.checkXGLBRed, null, false));
        // this.register(GameRedState.EXPLORE, [GameRedState.EXPLORE_NOEND, GameRedState.EXPLORE_COLLIER, GameRedState.EXPLORE_GODRUINS, GameRedState.EXPLORE_PETPAGODA, GameRedState.EXPLORE_SUOYAOPAGODA, GameRedState.EXPLORE_XIANSHI]);
        // // this.register(GameState.EXPLORE_BOSS, [GameState.EXPLORE_BOSS_EVERY]);
        // // this.registerCall(GameState.EXPLORE_BOSS_EVERY, utils.Handler.create(GameModels.copyBoss, GameModels.copyBoss.checkEntireBossCount, null, false));
        // //材料副本
        // this.register(GameRedState.MATERIAL_COPY, [GameRedState.MATERIAL_COPY_FUBEN, GameRedState.MATERIAL_COPY_HUANJIE_FUBEN, GameRedState.MATERIAL_COPY_MAIGU_FUBEN])
        // this.registerCall(GameRedState.MATERIAL_COPY_FUBEN, utils.Handler.create(GameModels.copyMaterial, GameModels.copyMaterial.checkMaterialCount, null, false));
        // this.registerCall(GameRedState.MATERIAL_COPY_HUANJIE_FUBEN, utils.Handler.create(GameModels.copyMaterial, GameModels.copyMaterial.checkHuanjieRedPoint, null, false));
        // this.registerCall(GameRedState.MATERIAL_COPY_MAIGU_FUBEN, utils.Handler.create(GameModels.copyMaterial, GameModels.copyMaterial.checkMaiGuRed, null, false));
        // //设置
        // this.registerCall(GameRedState.SETTING, utils.Handler.create(GameModels.setting, GameModels.setting.checkAutoXP, null, false));
        // //首充
        // this.registerCall(GameRedState.FIRST_RECHARGE, utils.Handler.create(GameModels.firstRecharge, GameModels.firstRecharge.checkfirstRecharge, null, false));
        // //限时礼包
        // this.register(GameRedState.LIMIT_TIMER, [GameRedState.ACTIVITY_LIMIT_TIMER]);
        // this.registerCall(GameRedState.ACTIVITY_LIMIT_TIMER, utils.Handler.create(GameModels.activity, GameModels.activity.checkLimitTime, null, false));
        // //月卡
        // this.registerCall(GameRedState.MONTHCARD, utils.Handler.create(GameModels.vip, GameModels.vip.checkMothCard, null, false));
        // //女神激活
        // this.registerCall(GameRedState.GODDESS, utils.Handler.create(GameModels.goddess, GameModels.goddess.checkGoddessActivation, null, false));
        // this.register(GameRedState.FIRST_PLAYER, [GameRedState.FIRST_PLAYER_SAMLL, GameRedState.FIRST_PLAYER_BIG]);
        // this.registerCall(GameRedState.FIRST_PLAYER_SAMLL, utils.Handler.create(GameModels.firstPlayer, GameModels.firstPlayer.checkSamll, null, false));
        // this.registerCall(GameRedState.FIRST_PLAYER_BIG, utils.Handler.create(GameModels.firstPlayer, GameModels.firstPlayer.checkBig, null, false));
        // this.register(GameRedState.PET, [GameRedState.PET_HUANSHOU, GameRedState.PET_QISHI, GameRedState.PET_ZHANQI]);
        // this.register(GameRedState.PET_HUANSHOU, [GameRedState.PET_HUANSHOU_POINT0, GameRedState.PET_HUANSHOU_POINT1, GameRedState.PET_HUANSHOU_POINT2]);
        // this.registerCall(GameRedState.PET_HUANSHOU_POINT0, utils.Handler.create(GameModels.pet, GameModels.pet.checkPetPos0, null, false));
        // this.registerCall(GameRedState.PET_HUANSHOU_POINT1, utils.Handler.create(GameModels.pet, GameModels.pet.checkPetPos1, null, false));
        // this.registerCall(GameRedState.PET_HUANSHOU_POINT2, utils.Handler.create(GameModels.pet, GameModels.pet.checkPetPos2, null, false));
        // this.registerCall(GameRedState.PET_ZHANQI, utils.Handler.create(GameModels.hores, GameModels.hores.checkHores, null, false));
        // this.registerCall(GameRedState.PET_ZHUANGBEI_POINT0, utils.Handler.create(GameModels.pet, GameModels.pet.checkIsUpZhuangBeiByPos0, null, false));
        // this.registerCall(GameRedState.PET_ZHUANGBEI_POINT1, utils.Handler.create(GameModels.pet, GameModels.pet.checkIsUpZhuangBeiByPos1, null, false));
        // this.registerCall(GameRedState.PET_ZHUANGBEI_POINT2, utils.Handler.create(GameModels.pet, GameModels.pet.checkIsUpZhuangBeiByPos2, null, false));
        // this.registerCall(GameRedState.PET_QISHI, utils.Handler.create(GameModels.pet, GameModels.pet.checkPetQiShi, null, false));
        // //LEGION
        // this.register(GameRedState.LEGION, [GameRedState.LEGION_MANAGE, GameRedState.LEGION_DYNAMIC, GameRedState.LEGION_RICHANG, GameRedState.LEGION_FULI]);
        // this.register(GameRedState.LEGION_MANAGE, [GameRedState.LEGION_MANAGE_APPLY_LIST]);
        // this.register(GameRedState.LEGION_RICHANG, [GameRedState.LEGION_RICHANG_TASK, GameRedState.LEGION_RICHANG_DENGJI, GameRedState.LEGION_RICHANG_WAR]);
        // this.register(GameRedState.LEGION_FULI, [GameRedState.LEGION_FULI_SKILL, GameRedState.LEGION_FULI_SHOP]);
        // this.register(GameRedState.LEGION_RICHANG_DENGJI, [GameRedState.LEGION_RICHANG_DENGJI_DENGJI]);
        // this.register(GameRedState.LEGION_RICHANG_WAR, [GameRedState.LEGION_RICHANG_WAR_STATE, GameRedState.LEGION_RICHANG_WAR_REWARD]);
        // this.registerCall(GameRedState.LEGION_MANAGE_APPLY_LIST, utils.Handler.create(GameModels.legion, GameModels.legion.checkApplyList, null, false));
        // this.registerCall(GameRedState.LEGION_RICHANG_TASK, utils.Handler.create(GameModels.legionTask, GameModels.legionTask.checkTaskReceiveGift, null, false));
        // this.registerCall(GameRedState.LEGION_RICHANG_DENGJI_DENGJI, utils.Handler.create(GameModels.legionTotem, GameModels.legionTotem.checkLegoinTotem, null, false));
        // this.registerCall(GameRedState.LEGION_RICHANG_WAR_STATE, utils.Handler.create(GameModels.activityNotice, GameModels.activityNotice.checkLeginWarHed, null, false));
        // this.registerCall(GameRedState.LEGION_RICHANG_WAR_REWARD, utils.Handler.create(GameModels.legion, GameModels.legion.checkLeginWarRewardHed, null, false));
        // this.registerCall(GameRedState.LEGION_FULI_SKILL, utils.Handler.create(GameModels.legionSkill, GameModels.legionSkill.checkLegoinSkill, null, false));
        // this.registerCall(GameRedState.LEGION_FULI_SHOP, utils.Handler.create(GameModels.shop, GameModels.shop.checkLegoinShop, null, false));
        // /**HJS END */
        // //LXQ
        // //1
        // this.register(GameRedState.ACHIEVEMENT, [GameRedState.ACHIEVEMENT_EVERY, GameRedState.ACHIEVEMENT_CHENGJIU, GameRedState.ACHIEVEMENT_TUJIAN]);
        // this.register(GameRedState.MAIL, [GameRedState.MAIL_ONEGET]);
        // // this.register(GameRedState.FORCE, [GameRedState.FORCE_FUMO, GameRedState.FORCE_GEM, GameRedState.FORCE_SOUL, GameRedState.FORCE_REFINE]);
        // this.register(GameRedState.ARENA, [GameRedState.ARENA_LADDER, GameRedState.ARENA_YEZHAN, GameRedState.GOD_DIE]);
        // this.register(GameRedState.WELFARE, [GameRedState.WELFARE_SEVENDAY, GameRedState.WELFARE_SIGN, GameRedState.WELFARE_UPREWARD, GameRedState.WELFARE_VIPKEFU]);
        // this.register(GameRedState.TREASURE, [GameRedState.TREASURE_BAOCANG, GameRedState.TREASURE_TARO, GameRedState.TREASURE_SHENDIAN]);
        // this.register(GameRedState.VIP, [GameRedState.VIP_RECEIVE]);
        // //2
        // // this.register(GameRedState.FORCE_FUMO, [GameRedState.FORCE_FUMO_UP]);
        // // this.register(GameRedState.FORCE_GEM, [GameRedState.FORCE_GEM_UP]);
        // // this.register(GameRedState.FORCE_SOUL, [GameRedState.FORCE_SOUL_UP]);
        // // this.register(GameRedState.FORCE_REFINE, [GameRedState.FORCE_REFINE_UP]);
        // this.register(GameRedState.TREASURE_BAOCANG, [GameRedState.TREASURE_BAOCANG_ONE, GameRedState.TREASURE_BAOCANG_TEN, GameRedState.TREASURE_BAOCANG_WARE]);
        // this.register(GameRedState.TREASURE_TARO, [GameRedState.TREASURE_TARO_PRESH, GameRedState.TREASURE_TARO_START, GameRedState.TREASURE_TARP_WARE, GameRedState.TREASURE_TARO_PRIZEBOX]);
        // this.register(GameRedState.EXPLORE_COLLIER, [GameRedState.EXPLORE_COLLIER_PRODUCE]);
        // this.register(GameRedState.ARENA_LADDER, [GameRedState.ARENA_LADDER_RANK]);
        // //this.register(GameRedState.TREASURE_MONO, [GameRedState.TREASURE_MONO_SWORD, GameRedState.TREASURE_MONO_NAIL, GameRedState.TREASURE_MONO_HELMET, GameRedState.TREASURE_MONO_CHAIN]);
        // //3
        // this.register(GameRedState.TREASURE_TARP_WARE, [GameRedState.TREASURE_WAREHOUSE_ONEGET]);
        // this.register(GameRedState.ARENA_LADDER_RANK, [GameRedState.ARENA_LADDER_REWARD]);
        // this.register(GameRedState.TREASURE_BAOCANG_WARE, [GameRedState.TREASURE_BAOCANG_WAREHOUSE_ONEGET]);
        // //夏日活动
        // this.register(GameRedState.SNMMER_ACTIVITY, [GameRedState.SNMMER_ACTIVITY_LJDL, GameRedState.SNMMER_ACTIVITY_XRLC, GameRedState.SNMMER_ACTIVITY_HHZP, GameRedState.SNMMER_ACTIVITY_DJZP, GameRedState.SNMMER_ACTIVITY_HDRW,
        // GameRedState.SNMMER_ACTIVITY_MSZP, GameRedState.SNMMER_ACTIVITY_LCSL, GameRedState.SNMMER_ACTIVITY_SDS_BOSS, GameRedState.SNMMER_ACTIVITY_XYDB,GameRedState.SNMMER_ACTIVITY_YDSZ,
        // GameRedState.SNMMER_ACTIVITY_KNLB,GameRedState.SNMMER_ACTIVITY_RYCZ]);
        // this.registerCall(GameRedState.SNMMER_ACTIVITY_HHZP, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checkZuangPanItemRedPoint, null, false));
        // this.registerCall(GameRedState.SNMMER_ACTIVITY_LJDL, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checkLeiJiDengLuRedPoint, null, false));
        // this.registerCall(GameRedState.SNMMER_ACTIVITY_XRLC, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checkXiaRiLeiJiRedPoint, null, false));
        // this.registerCall(GameRedState.SNMMER_ACTIVITY_DJZP, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checkDaoJuZhuanPanRedPoint, null, false));
        // this.registerCall(GameRedState.SNMMER_ACTIVITY_HDRW, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checkHuoDongTaskRedPoint, null, false));
        // this.registerCall(GameRedState.SNMMER_ACTIVITY_MSZP, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checkMoShiRedPoint, null, false));
        // this.registerCall(GameRedState.SNMMER_ACTIVITY_LCSL, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checklianchongRedPoint, null, false));
        // this.registerCall(GameRedState.SNMMER_ACTIVITY_SDS_BOSS, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checkShengDanShuRedPoint, null, false));
        // this.registerCall(GameRedState.SNMMER_ACTIVITY_XYDB, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checkXingYingDuoBaoRedPoint, null, false));
        // this.registerCall(GameRedState.SNMMER_ACTIVITY_YDSZ, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checkYuanDanShiZhuangRedPoint, null, false));
        // this.registerCall(GameRedState.SNMMER_ACTIVITY_KNLB, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checkKuaNianLiBaoRedPoint, null, false));
        // this.registerCall(GameRedState.SNMMER_ACTIVITY_RYCZ, utils.Handler.create(GameModels.activitySummer, GameModels.activitySummer.checkRenYiChongZhiRedPoint, null, false));
        // //和服活动
        // this.register(GameRedState.HEFU_ACTIVITY, [GameRedState.HEFU_ACTIVITY_HFDL, GameRedState.HEFU_ACTIVITY_HFLC, GameRedState.HEFU_ACTIVITY_QUANMIN, GameRedState.HEFU_ACTIVITY_LIANCHONG,GameRedState.HEFU_ACTIVITY_XHFL]);
        // this.registerCall(GameRedState.HEFU_ACTIVITY_HFDL, utils.Handler.create(GameModels.activityHeFu, GameModels.activityHeFu.checkDengLuRedPoint, null, false));
        // this.registerCall(GameRedState.HEFU_ACTIVITY_HFLC, utils.Handler.create(GameModels.activityHeFu, GameModels.activityHeFu.checkleichongRedPoint, null, false));
        // this.registerCall(GameRedState.HEFU_ACTIVITY_QUANMIN, utils.Handler.create(GameModels.activityHeFu, GameModels.activityHeFu.checkQuanMinRedPoint, null, false));
        // this.registerCall(GameRedState.HEFU_ACTIVITY_LIANCHONG, utils.Handler.create(GameModels.activityHeFu, GameModels.activityHeFu.checkLianChongRedPoint, null, false));
        // this.registerCall(GameRedState.HEFU_ACTIVITY_XHFL, utils.Handler.create(GameModels.activityHeFu, GameModels.activityHeFu.checkXiaoHaoFanLiRedPoint, null, false));
        // this.register(GameRedState.FESTIVAL_ACTIVITY, [GameRedState.FESTIVAL_ACTIVITY_QXHD]);
        // this.registerCall(GameRedState.FESTIVAL_ACTIVITY_QXHD, utils.Handler.create(GameModels.activityFestival, GameModels.activityFestival.checkQiXiRed, null, false));
        // this.register(GameRedState.MEIRI_CHONGZHI_ACTIVITY, [GameRedState.MEIRI_CHONGZHI_ACTIVITY_LINGQU]);
        // this.registerCall(GameRedState.MEIRI_CHONGZHI_ACTIVITY_LINGQU, utils.Handler.create(GameModels.activity, GameModels.activity.checkMeiRiChongZhiRedPoint, null, false));
        // //叶子节点		
        // this.registerCall(GameRedState.EXPLORE_NOEND, utils.Handler.create(GameModels.copyNoEnd, GameModels.copyNoEnd.checkNoend, null, false));
        // this.registerCall(GameRedState.EXPLORE_COLLIER, utils.Handler.create(GameModels.collier, GameModels.collier.checkPlunderRed, null, false));
        // this.registerCall(GameRedState.EXPLORE_COLLIER_PRODUCE, utils.Handler.create(GameModels.collier, GameModels.collier.checkMiningRed, null, false));
        // this.registerCall(GameRedState.ARENA_LADDER, utils.Handler.create(GameModels.ladder, GameModels.ladder.checkMadelChest, null, false));
        // this.registerCall(GameRedState.GOD_DIE, utils.Handler.create(GameModels.sceneGodDie, GameModels.sceneGodDie.checkRed, null, false));
        // this.registerCall(GameRedState.ARENA_LADDER_REWARD, utils.Handler.create(GameModels.ladder, GameModels.ladder.checkLadderReward, null, false));
        // this.registerCall(GameRedState.EXPLORE_GODRUINS, utils.Handler.create(GameModels.godruins, GameModels.godruins.checkGodRuins, null, false));
        // this.registerCall(GameRedState.EXPLORE_PETPAGODA, utils.Handler.create(GameModels.copyPagoda, GameModels.copyPagoda.checkSavageCopyRed, null, false));
        // this.registerCall(GameRedState.EXPLORE_SUOYAOPAGODA, utils.Handler.create(GameModels.copyPagoda, GameModels.copyPagoda.checkLockCopyRed, null, false));
        // this.registerCall(GameRedState.EXPLORE_XIANSHI, utils.Handler.create(GameModels.activityNotice, GameModels.activityNotice.checkKingbattlefieldHed, null, false));
        // this.registerCall(GameRedState.MAIL_ONEGET, utils.Handler.create(GameModels.mail, GameModels.mail.checkMailRed, null, false));
        // this.registerCall(GameRedState.WELFARE_SEVENDAY, utils.Handler.create(GameModels.welfare, GameModels.welfare.checkSevenDay, null, false));
        // this.registerCall(GameRedState.WELFARE_SIGN, utils.Handler.create(GameModels.welfare, GameModels.welfare.checkSign, null, false));
        // this.registerCall(GameRedState.WELFARE_UPREWARD, utils.Handler.create(GameModels.welfare, GameModels.welfare.checkUpGradeRed, null, false));
        // this.registerCall(GameRedState.WELFARE_VIPKEFU, utils.Handler.create(GameModels.welfare, GameModels.welfare.checkVipKefuRed, null, false));
        // // this.registerCall(GameRedState.FORCE_FUMO_UP, utils.Handler.create(GameModels.forging, GameModels.forging.checkFumo, null, false));
        // // this.registerCall(GameRedState.FORCE_GEM_UP, utils.Handler.create(GameModels.forging, GameModels.forging.checkGem, null, false));
        // // this.registerCall(GameRedState.FORCE_SOUL_UP, utils.Handler.create(GameModels.forging, GameModels.forging.checkSoul, null, false));
        // // this.registerCall(GameRedState.FORCE_REFINE_UP, utils.Handler.create(GameModels.equipRefine, GameModels.equipRefine.checkRefine, null, false));
        // this.registerCall(GameRedState.TREASURE_TARO_PRESH, utils.Handler.create(GameModels.treasure, GameModels.treasure.checkTraoReFresh, null, false));
        // this.registerCall(GameRedState.TREASURE_TARO_START, utils.Handler.create(GameModels.treasure, GameModels.treasure.checkTraoFlop, null, false));
        // this.registerCall(GameRedState.TREASURE_TARO_PRIZEBOX, utils.Handler.create(GameModels.treasure, GameModels.treasure.checkTraoPrizeBox, null, false));
        // //this.registerCall(GameRedState.TREASURE_MONO_SWORD, utils.Handler.create(GameModels.treasure, GameModels.treasure.checkMonoSward, null, false));
        // //this.registerCall(GameRedState.TREASURE_MONO_NAIL, utils.Handler.create(GameModels.treasure, GameModels.treasure.checkMonoNail, null, false));
        // //this.registerCall(GameRedState.TREASURE_MONO_HELMET, utils.Handler.create(GameModels.treasure, GameModels.treasure.checkMonoHelmet, null, false));
        // //this.registerCall(GameRedState.TREASURE_MONO_CHAIN, utils.Handler.create(GameModels.treasure, GameModels.treasure.checkMonoChain, null, false));
        // this.registerCall(GameRedState.TREASURE_WAREHOUSE_ONEGET, utils.Handler.create(GameModels.treasure, GameModels.treasure.checkTraoHouse, null, false));
        // this.registerCall(GameRedState.ACHIEVEMENT_EVERY, utils.Handler.create(GameModels.achievement, GameModels.achievement.checkQst, null, false));
        // this.registerCall(GameRedState.ACHIEVEMENT_CHENGJIU, utils.Handler.create(GameModels.achievement, GameModels.achievement.checkAchievement, null, false));
        // this.registerCall(GameRedState.ACHIEVEMENT_TUJIAN, utils.Handler.create(GameModels.handBook, GameModels.handBook.checkHandBookRedPoint, null, false));
        // this.registerCall(GameRedState.TREASURE_BAOCANG_ONE, utils.Handler.create(GameModels.treasure, GameModels.treasure.checkBaoCangOne, null, false));
        // this.registerCall(GameRedState.TREASURE_BAOCANG_TEN, utils.Handler.create(GameModels.treasure, GameModels.treasure.checkBaoCangTen, null, false));
        // this.registerCall(GameRedState.TREASURE_SHENDIAN, utils.Handler.create(GameModels.shendian, GameModels.shendian.checkRedPoint, null, false));
        // this.registerCall(GameRedState.TREASURE_BAOCANG_WAREHOUSE_ONEGET, utils.Handler.create(GameModels.treasure, GameModels.treasure.checkBaoCangHouse, null, false));
        // this.registerCall(GameRedState.VIP_RECEIVE, utils.Handler.create(GameModels.vip, GameModels.vip.checkVipReceive, null, false));
        // this.registerCall(GameRedState.ATTESTATION_ACTIVITY, utils.Handler.create(GameModels.platformActivity, GameModels.platformActivity.checkAttestationReceive, null, false));
        // this.registerCall(GameRedState.YAOQING_ACTIVITY, utils.Handler.create(GameModels.platformActivity, GameModels.platformActivity.checkYaoQingReceive, null, false));
        // this.registerCall(GameRedState.GUANZHU_ACTIVITY, utils.Handler.create(GameModels.platformActivity, GameModels.platformActivity.checkAttestationReceive, null, false));
        // //好友
        // this.register(GameRedState.SOCIALITY, [GameRedState.SOCIALITY_FRIENDS]);
        // this.register(GameRedState.SOCIALITY_FRIENDS, [GameRedState.SOCIALITY_FRIENDS_APPLY,GameRedState.SOCIALITY_PRIVATE_CHAT]);
        // this.registerCall(GameRedState.SOCIALITY_FRIENDS_APPLY, utils.Handler.create(GameModels.friends, GameModels.friends.checkApplyList, null, false));
        // this.registerCall(GameRedState.SOCIALITY_PRIVATE_CHAT, utils.Handler.create(GameModels.friends, GameModels.friends.checkPrivateChatRed, null, false));
        // this.registerCall(GameRedState.EXPLORE_GODRUINS_HELP_LIST1, utils.Handler.create(GameModels.godruins, GameModels.godruins.helpApplyListRedPoint, null, false));
        // this.registerCall(GameRedState.EXPLORE_GODRUINS_HELP_LIST2, utils.Handler.create(GameModels.godruins, GameModels.godruins.helpApplyListRedPoint, null, false));
        // //跨服
        // this.register(GameRedState.CROSS_ACTIVITY, [GameRedState.CROSS_BOSS_ACTIVITY,GameRedState.CROSS_SECRET_ACTIVITY,GameRedState.CROSS_WAR_KING]);
        // this.registerCall(GameRedState.CROSS_BOSS_ACTIVITY, utils.Handler.create(GameModels.crossServer, GameModels.crossServer.checkLifeBossRed, null, false));
        // this.registerCall(GameRedState.CROSS_SECRET_ACTIVITY, utils.Handler.create(GameModels.crossServer, GameModels.crossServer.checkLifeSecretBossRed, null, false));
        // this.registerCall(GameRedState.CROSS_WAR_KING, utils.Handler.create(GameModels.warKing, GameModels.warKing.checkRed, null, false));
        // //巅峰战
        // this.registerCall(GameRedState.PEAKSBATTLE, utils.Handler.create(GameModels.peaksBattle, GameModels.peaksBattle.checkPeaksBattle, null, false));
        // //跨服巅峰战
        // this.registerCall(GameRedState.PEAKSBATTLE_CROSS, utils.Handler.create(GameModels.peaksBattleCross, GameModels.peaksBattleCross.checkPeaksBattleCross, null, false));
        // //一元抢购
        // this.registerCall(GameRedState.ONE_YUAN_BUY, utils.Handler.create(GameModels.activity, GameModels.activity.checkOneYuanBuy, null, false));
        // //周卡
        // this.registerCall(GameRedState.WEEK_CARD, utils.Handler.create(GameModels.activityDayCard, GameModels.activityDayCard.checkWeekCard, null, false));
        // //宝盒
        // this.registerCall(GameRedState.LUCKY_BOX, utils.Handler.create(GameModels.activity, GameModels.activity.checkLuckyBox, null, false));
        // this.registerCall(GameRedState.MAGIC_DRAGON, utils.Handler.create(GameModels.activityDayCard, GameModels.activityDayCard.checkMagicDragon, null, false));
        // this.registerCall(GameRedState.SHOU_CNAG, utils.Handler.create(GameModels.platformActivity, GameModels.platformActivity.checkShouCang, null, false));
        // this.registerCall(GameRedState.SPRINT_ACTIVITY, utils.Handler.create(GameModels.activitySprint, GameModels.activitySprint.checkRedPoint, null, false));
        // this.registerCall(GameRedState.WEI_DUAN, utils.Handler.create(GameModels.platformActivity, GameModels.platformActivity.checkWeiduanGiftState, null, false));
    };
    GameRedState.prototype.registerBagRefeshEvent = function () {
        var _this = this;
        var dic = this._bagListenerDict;
        function addBagRefeshCall(itemId, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            dic[itemId] = { method: method, args: args };
        }
        // addBagRefeshCall(ConfigData.ITEM_HUANJIE_MICHENG, this.updateState, GameRedState.MATERIAL_COPY_HUANJIE_FUBEN);
        addBagRefeshCall(ConfigData.HONGYAN_UP_ITEM, this.updateState, GameRedState.BAOWU_HONGYAN);
        addBagRefeshCall(ConfigData.ITEM_ZHANQI_UPLEVEL, this.updateState, GameRedState.BAOWU_ZUOQI);
        addBagRefeshCall(ConfigData.ITEM_ZHANQI_BAOZI, this.updateState, GameRedState.BAOWU_ZUOQI);
        addBagRefeshCall(ConfigData.ITEM_ZHANQI_SHIZI, this.updateState, GameRedState.BAOWU_ZUOQI);
        addBagRefeshCall(ConfigData.ITEM_ZHANQI_JINYU, this.updateState, GameRedState.BAOWU_ZUOQI);
        addBagRefeshCall(ConfigData.ITEM_ZHANQI_CAIFENG, this.updateState, GameRedState.BAOWU_ZUOQI);
        addBagRefeshCall(ConfigData.JIANDINGSHI, this.updateState, GameRedState.CITY);
        addBagRefeshCall(ConfigData.SEHNBINGDEBIES, this.updateState, GameRedState.BAOWU_SHENBIN);
        addBagRefeshCall(ConfigData.GUANYING, this.updateState, GameRedState.ROLE_SHENGXING);
        addBagRefeshCall(ConfigData.MINGJIANG_ITEM, this.updateState, GameRedState.MINGJIANG_SHOP);
        addBagRefeshCall(ConfigData.UNION_ITEM, this.updateState, GameRedState.UNION_RICHANG_ZHANQI);
        addBagRefeshCall(ConfigData.LINGZHI, this.updateState, GameRedState.BAOWU_HONGYAN);
        addBagRefeshCall(ConfigData.LUHUI, this.updateState, GameRedState.BAOWU_HONGYAN);
        addBagRefeshCall(ConfigData.JINTIAO, this.updateState, GameRedState.WANJIANGGUIXIN);
        addBagRefeshCall(ConfigData.JINTIAO, this.updateState, GameRedState.ATKCITY);
        addBagRefeshCall(ConfigData.YINTIAO, this.updateState, GameRedState.WANJIANGGUIXIN);
        addBagRefeshCall(ConfigData.YINTIAO, this.updateState, GameRedState.ATKCITY);
        addBagRefeshCall(ConfigData.ANIAML_ZHAOHUAN, this.updateState, GameRedState.ANIMAL_CHOUJIANG);
        addBagRefeshCall(ConfigData.CHENGZHUANG_SUIBIAN, function () {
            _this.updateState(GameRedState.DAZAO_CHENGZHUANG_POS1);
            _this.updateState(GameRedState.DAZAO_CHENGZHUANG_POS2);
            _this.updateState(GameRedState.DAZAO_CHENGZHUANG_POS3);
            _this.updateState(GameRedState.DAZAO_CHENGZHUANG_POS4);
            _this.updateState(GameRedState.DAZAO_CHENGZHUANG_POS5);
        });
        addBagRefeshCall(ConfigData.LADDER_ITEM, function () {
            _this.updateState(GameRedState.ARENA_LADDER);
            _this.updateState(GameRedState.ARENA_LADDER_REWARD);
            _this.updateState(GameRedState.CITY);
        });
        addBagRefeshCall(ConfigData.ITEM_WING_ID, function () {
            _this.updateState(GameRedState.BAOWU_WING_POS1);
            _this.updateState(GameRedState.BAOWU_WING_POS2);
            _this.updateState(GameRedState.BAOWU_WING_POS3);
            _this.updateState(GameRedState.BAOWU_WING_POS4);
            _this.updateState(GameRedState.BAOWU_WING_POS5);
        });
        addBagRefeshCall(ConfigData.ITEM_GODWING_ID, function () {
            _this.updateState(GameRedState.BAOWU_WING_POS1);
            _this.updateState(GameRedState.BAOWU_WING_POS2);
            _this.updateState(GameRedState.BAOWU_WING_POS3);
            _this.updateState(GameRedState.BAOWU_WING_POS4);
            _this.updateState(GameRedState.BAOWU_WING_POS5);
        });
        addBagRefeshCall(ConfigData.PUTON_ZHAOMU, function () {
            // this.updateState(GameRedState.MAIN_SMOKEPET);
            _this.updateState(GameRedState.TREASURE_SMOKEPET);
            _this.updateState(GameRedState.TREASURE_GUANXING);
        });
        addBagRefeshCall(ConfigData.GAOJI_ZHAOMU, function () {
            // this.updateState(GameRedState.MAIN_SMOKEPET);
            _this.updateState(GameRedState.TREASURE_SMOKEPET);
            _this.updateState(GameRedState.TREASURE_GUANXING);
        });
        addBagRefeshCall(ConfigData.SHILI_ZHAOMU, function () {
            // this.updateState(GameRedState.MAIN_SMOKEPET);
            _this.updateState(GameRedState.TREASURE_SMOKEPET);
            _this.updateState(GameRedState.TREASURE_GUANXING);
        });
        addBagRefeshCall(ConfigData.GUANXINGKA, function () {
            // this.updateState(GameRedState.MAIN_SMOKEPET);
            _this.updateState(GameRedState.TREASURE_SMOKEPET);
            _this.updateState(GameRedState.TREASURE_GUANXING);
        });
        addBagRefeshCall(ConfigData.JINGXINGQIYUAN, function () {
            _this.updateState(GameRedState.TREASURE_JIANGXING);
            // this.updateState(GameRedState.MAIN_SMOKEPET);
            _this.updateState(GameRedState.TREASURE_SMOKEPET);
            _this.updateState(GameRedState.TREASURE_GUANXING);
        });
        addBagRefeshCall(ConfigData.BINGFA_1, function () {
            _this.updateState(GameRedState.ROLE_EQIUP_POS1);
            _this.updateState(GameRedState.ROLE_EQIUP_POS2);
            _this.updateState(GameRedState.ROLE_EQIUP_POS3);
            _this.updateState(GameRedState.ROLE_EQIUP_POS4);
            _this.updateState(GameRedState.ROLE_EQIUP_POS5);
        });
        addBagRefeshCall(ConfigData.BINGFA_2, function () {
            _this.updateState(GameRedState.ROLE_EQIUP_POS1);
            _this.updateState(GameRedState.ROLE_EQIUP_POS2);
            _this.updateState(GameRedState.ROLE_EQIUP_POS3);
            _this.updateState(GameRedState.ROLE_EQIUP_POS4);
            _this.updateState(GameRedState.ROLE_EQIUP_POS5);
        });
        addBagRefeshCall(ConfigData.BINGFA_3, function () {
            _this.updateState(GameRedState.ROLE_EQIUP_POS1);
            _this.updateState(GameRedState.ROLE_EQIUP_POS2);
            _this.updateState(GameRedState.ROLE_EQIUP_POS3);
            _this.updateState(GameRedState.ROLE_EQIUP_POS4);
            _this.updateState(GameRedState.ROLE_EQIUP_POS5);
        });
        addBagRefeshCall(ConfigData.BINGFA_4, function () {
            _this.updateState(GameRedState.ROLE_EQIUP_POS1);
            _this.updateState(GameRedState.ROLE_EQIUP_POS2);
            _this.updateState(GameRedState.ROLE_EQIUP_POS3);
            _this.updateState(GameRedState.ROLE_EQIUP_POS4);
            _this.updateState(GameRedState.ROLE_EQIUP_POS5);
        });
        addBagRefeshCall(ConfigData.BINGFA_5, function () {
            _this.updateState(GameRedState.ROLE_EQIUP_POS1);
            _this.updateState(GameRedState.ROLE_EQIUP_POS2);
            _this.updateState(GameRedState.ROLE_EQIUP_POS3);
            _this.updateState(GameRedState.ROLE_EQIUP_POS4);
            _this.updateState(GameRedState.ROLE_EQIUP_POS5);
        });
        addBagRefeshCall(ConfigData.BINGFA_6, function () {
            _this.updateState(GameRedState.ROLE_EQIUP_POS1);
            _this.updateState(GameRedState.ROLE_EQIUP_POS2);
            _this.updateState(GameRedState.ROLE_EQIUP_POS3);
            _this.updateState(GameRedState.ROLE_EQIUP_POS4);
            _this.updateState(GameRedState.ROLE_EQIUP_POS5);
        });
        GameModels.bag.onChange(this, function (itemId) {
            if (this._bagListenerDict) {
                if (!this._bagListenerDict[itemId])
                    return;
                var object = this._bagListenerDict[itemId];
                (_a = object.method).call.apply(_a, [this].concat(object.args));
            }
            var _a;
        });
    };
    //添加监听
    GameRedState.prototype.addPlayerListeners = function () {
        var _this = this;
        GameModels.user.player.onPropertyChange(TypeProperty.Level, this, function (smartVO, propertyId) {
            this.updateState(GameRedState.WELFARE_UPREWARD);
            this.updateState(GameRedState.ARENA_LADDER);
            this.updateState(GameRedState.ARENA_YANWU);
            this.updateState(GameRedState.ARENA_LADDER_REWARD);
            this.updateState(GameRedState.MATERIAL_COPY_EXPFUBEN);
            this.updateState(GameRedState.MATERIAL_COPY_ZHANGONGFUBEN);
            this.updateState(GameRedState.MATERIAL_COPY_ZHANDUNFUBEN);
            this.updateState(GameRedState.MATERIAL_COPY_YUMAOFUBEN);
            this.updateState(GameRedState.BAOWU_WING_POS1);
            // this.updateState(GameRedState.BAOWU_WING_POS2);
            // this.updateState(GameRedState.BAOWU_WING_POS3);
            // this.updateState(GameRedState.BAOWU_WING_POS4);
            // this.updateState(GameRedState.BAOWU_WING_POS5);
            this.updateState(GameRedState.ROLE_EQIUP_POS2);
            this.updateState(GameRedState.ROLE_EQIUP_POS3);
            this.updateState(GameRedState.ROLE_EQIUP_POS4);
            this.updateState(GameRedState.ROLE_EQIUP_POS5);
            this.updateState(GameRedState.TUJIAN_TUJIAN);
            this.updateState(GameRedState.ROLE_SHENGXING);
            this.updateState(GameRedState.TUJIAN_QUCIK_SHENGXING);
            this.updateState(GameRedState.MATERIAL_COPY);
            this.updateState(GameRedState.XIANSHI_SANGUO);
            this.updateState(GameRedState.XIANSHI_WANGZHE);
            this.updateState(GameRedState.XIANSHI_WUSHUANG);
            this.updateState(GameRedState.MAIN_UNION_WANFA_CAMPBATTLE);
            this.updateState(GameRedState.LILIAN);
            this.updateState(GameRedState.DAZAO_SHENBING);
            this.updateState(GameRedState.ARENA);
            this.updateState(GameRedState.BOSS_COPY);
            this.updateState(GameRedState.CITY);
            this.updateState(GameRedState.QIANGZHENG);
            this.updateState(GameRedState.PETWANFA_YUANZHENG);
            // this.updateState(GameRedState.MAIN_SMOKEPET);
            this.updateState(GameRedState.TREASURE_SMOKEPET);
            this.updateState(GameRedState.TREASURE_GUANXING);
            this.updateState(GameRedState.BOSS_COPY_EVERY);
            this.updateState(GameRedState.BAOWU_HONGYAN);
            this.updateState(GameRedState.BAOWU_ZUOQI);
            this.updateState(GameRedState.MAIN_JUYI);
            this.updateState(GameRedState.TUJIAN_QUCIK_SHENGXING);
            this.updateState(GameRedState.WELFARE_FUND);
        });
        GameModels.user.player.onPropertyChange(TypeProperty.TOTAL_RECHARGE, this, function (smartVO, propertyId) {
            this.updateState(GameRedState.OUYUXIANREN);
            this.updateState(GameRedState.ZHUGELIANG);
        });
        GameModels.user.player.onPropertyChange(TypeProperty.VIP_LEVEL, this, function (smartVO, propertyId) {
            // this.updateState(GameRedState.MAIN_SMOKEPET);
            this.updateState(GameRedState.TREASURE_SMOKEPET);
            this.updateState(GameRedState.TREASURE_GUANXING);
            this.updateState(GameRedState.ZHUGELIANG);
            this.updateState(GameRedState.TIMEPICK_GIFT);
        });
        GameModels.user.player.onPropertyChange(TypeProperty.Gold, this, function (smartVO, propertyId) {
            this.updateState(GameRedState.BAOWU_HONGYAN);
        });
        GameModels.user.player.onPropertyChange(TypeProperty.WUGUAN_ID, this, function (smartVO, propertyId) {
            this.updateState(GameRedState.GUANZHI_WUGUAN);
            this.updateState(GameRedState.GUANZHI1);
        });
        GameModels.user.player.onPropertyChange(TypeProperty.UnionGongXian, this, function (smartVO, propertyId) {
            this.updateState(GameRedState.UNION_FULI_BINGZHONG);
        });
        GameModels.user.player.onPropertyChange(TypeProperty.GUANXING_JIFEN, this, function (smartVO, propertyId) {
            this.updateState(GameRedState.GUANXING_SHOP);
        });
        GameModels.user.player.onPropertyChange(TypeProperty.LIANGCAO, this, function (smartVO, propertyId) {
            this.updateState(GameRedState.SHENGZHI);
        });
        var callback1 = function () {
            _this.updateState(GameRedState.TUJIAN_TUJIAN);
        };
        GameModels.user.player.onPropertyChange(TypeProperty.HANDBOOK_EXP, this, callback1);
        GameModels.user.player.onPropertyChange(TypeProperty.INFINITE_GAUNTLET, this, function () {
            // this.updateState(GameRedState.ROLE_INIFINITE_GAUNTLET);
        });
    };
    /**注册控件关系 */
    GameRedState.prototype.register = function (type, targets) {
        if (!this._relations[type]) {
            var children = [];
            for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
                var subType = targets_1[_i];
                children.push({ type: subType, parent: type, children: null });
            }
            this._relations[type] = { type: type, parent: null, children: children };
        }
    };
    /**注册控件状态获取函数 */
    GameRedState.prototype.registerCall = function (type, handler) {
        this._relations[type] = { handler: handler, isWarn: handler.run() };
    };
    GameRedState.prototype.checkWarnState = function (type) {
        if (this._relations[type]) {
            var info = this._relations[type];
            if (info.children) {
                for (var _i = 0, _a = info.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    if (this.checkWarnState(child.type)) {
                        return true;
                    }
                }
            }
            else if (info.hasOwnProperty("isWarn")) {
                if (info.isWarn)
                    return true;
            }
        }
        return false;
    };
    /**
     * 刷新&通知状态变更  此方法应该由各个Model调用
     * 子级发生改变必须要求父级重新确认自己状态
     * 父级必须验证全部子对象状态方能判定自身状态，
     * 条件触发者为子对象，子对象发生改变时调用函数并将结果记录， 保证上级在验证下属状态时不再重复调用check函数
     * */
    GameRedState.prototype.updateState = function (type) {
        var info = this._relations[type];
        if (info) {
            if (info.hasOwnProperty("handler")) {
                info.isWarn = info.handler.run();
            }
            var target = this._targets[type];
            if (target) {
                if (target instanceof components.SnapButton || target instanceof components.SnapButtonActBiaoJi) {
                    target.isWarn = this.checkWarnState(type);
                }
                else if (target instanceof eui.Button) {
                    if (target.iconDisplay)
                        target.iconDisplay.visible = this.checkWarnState(type);
                }
                else if (target instanceof utils.Handler) {
                    target.runWith(this.checkWarnState(type));
                }
                else {
                    target.visible = this.checkWarnState(type);
                }
            }
        }
        type = type / 100 >> 0; //让父类验证自己身份
        if (type > 0) {
            this.updateState(type);
        }
    };
    /**
     * 监听红点状态变化 此方法应该有各个Module调用
     * 显示对象注册时同时也是这个对象刚创建完成，需要展示给玩家时，直接验证自己状态
     * 牵扯特效的状态 固改snapButton*/
    GameRedState.prototype.registerWarnTarget = function (type, redDisplay) {
        this.unRegisterWarnTarget(type);
        this._targets[type] = redDisplay;
        this.updateState(type);
    };
    /**
     * 解除监听红点状态变化
     */
    GameRedState.prototype.unRegisterWarnTarget = function (type) {
        if (this._targets[type]) {
            if (this._targets[type] instanceof utils.Handler) {
                this._targets[type].recover();
            }
            this._targets[type] = null;
        }
    };
    /**三国红点 */
    /**一级 */
    GameRedState.TREASURE = 2;
    GameRedState.WELFARE = 4;
    GameRedState.FIRSTRECHARGE = 5;
    GameRedState.MATERIAL_COPY = 8;
    GameRedState.ARENA = 9;
    GameRedState.BOSS_COPY = 10;
    GameRedState.SKILL = 11;
    GameRedState.BAG = 12;
    GameRedState.BAOWU = 14;
    GameRedState.ROLE = 15;
    GameRedState.UNION = 16;
    GameRedState.DAILY_ACTIVITY = 17;
    // public static OPENSERVER_ACTIVITY: number = 18;
    GameRedState.ONEYUANBUY = 21;
    GameRedState.GUANZHI = 22;
    GameRedState.MAIL = 23;
    GameRedState.SOCIALITY = 24;
    GameRedState.VIP_TEQUAN = 25;
    GameRedState.SHOP = 28;
    GameRedState.MAIN_UNION_WANFA_CAMPBATTLE = 30;
    GameRedState.CITY = 34;
    GameRedState.SPECAICARD = 35;
    GameRedState.LILIAN = 36; //历练 武神塔试炼塔
    GameRedState.EXPLORE_XIANSHI = 37; //限时
    GameRedState.DAZAO = 38; //打造
    GameRedState.FIRSTRECHARGE1 = 41;
    GameRedState.DAILY_ACTIVITY1 = 42;
    GameRedState.TEQUAN = 43;
    // public static TONGJILING: number = 45;
    GameRedState.MAIN_MAIL_SOCIALITY = 46;
    GameRedState.SNMMER_ACTIVITY = 47;
    GameRedState.SHENGZHIMAIN = 48;
    GameRedState.MAIN_SET = 49;
    GameRedState.OUYUXIANREN = 50;
    GameRedState.QIANGZHENG = 51;
    GameRedState.MAIN_JUYI = 52;
    // public static MAIN_SMOKEPET: number = 53;
    GameRedState.PETWANFA = 54;
    GameRedState.TUJIAN = 56;
    GameRedState.ZHUGELIANG = 57;
    GameRedState.MAIN_ZHANLING = 58;
    GameRedState.XIANSHI_GIFT = 59;
    GameRedState.JUEBAN_GIFT = 60;
    GameRedState.TIMEPICK_GIFT = 61;
    GameRedState.KING_WAR = 62;
    GameRedState.MAIN_SEVENDAY = 63;
    GameRedState.ATKCITY = 64;
    GameRedState.GUANZHI1 = 65;
    GameRedState.LIMIT1 = 66;
    GameRedState.LIMIT2 = 67;
    GameRedState.ANIMAL = 68;
    GameRedState.INTEGRALSHOP = 69;
    GameRedState.SHARE = 70;
    /**二级 */
    GameRedState.SHENMI_SHOP = 2801;
    GameRedState.GUANXING_SHOP = 2802;
    GameRedState.MINGJIANG_SHOP = 2803;
    GameRedState.XIANSHI_SANGUO = 3701;
    GameRedState.XIANSHI_WUSHUANG = 3702;
    GameRedState.XIANSHI_WANGZHE = 3703;
    GameRedState.XIANSHI_DIANFENGSAI = 3704;
    GameRedState.MAIN_MAIL = 4601;
    GameRedState.MAIN_SOCIALITY = 4602;
    GameRedState.SNMMER_ACTIVITY_LJDL = 4701;
    GameRedState.SNMMER_ACTIVITY_ZGLB = 4702;
    GameRedState.SHENGZHI = 4801;
    GameRedState.WANJIANGGUIXIN = 4802;
    GameRedState.MINGJIANGTASK = 4803;
    GameRedState.TREASURE_GUANXING = 201;
    GameRedState.TREASURE_SMOKEPET = 202;
    GameRedState.TREASURE_JIANGXING = 203;
    //public static TREASURE_SHENDIAN: number = 202;
    GameRedState.WELFARE_SEVENDAY = 401;
    GameRedState.WELFARE_UPREWARD = 402;
    // public static WELFARE_VIPKEFU: number = 403;
    GameRedState.WELFARE_ACITIVITY = 404;
    GameRedState.WELFARE_FUND = 405;
    // public static MATERIAL_COPY_FUBEN: number = 801;
    // public static MATERIAL_COPY_HUANJIE_FUBEN: number = 802;
    // public static MATERIAL_COPY_MAIGU_FUBEN: number = 803;
    // public static MATERIAL_COPY_ZUDUI_FUBEN: number = 804;
    GameRedState.MATERIAL_COPY_EXPFUBEN = 801;
    GameRedState.MATERIAL_COPY_ZHANGONGFUBEN = 802;
    GameRedState.MATERIAL_COPY_ZHANDUNFUBEN = 803;
    GameRedState.MATERIAL_COPY_YUMAOFUBEN = 804;
    GameRedState.ARENA_YANWU = 901;
    GameRedState.ARENA_LADDER = 902;
    // public static GOD_DIE: number = 903;
    // public static WOORS_BOSS: number = 904;
    // public static DEATH_BOSS: number = 905;
    GameRedState.BOSS_COPY_SELF = 1001;
    GameRedState.BOSS_COPY_EVERY = 1002;
    // public static BOSS_COPY_CITY: number = 1003;
    // public static BOSS_COPY_LOSE: number = 1004;
    // public static BOSS_COPY_FAMILY: number = 1005;
    GameRedState.BOSS_COPY_DOMAIN = 1006;
    // public static BOSS_COPY_FANTASY: number = 1007;
    GameRedState.BAG_USABLE_PROP = 1201;
    GameRedState.BAG_EQUIP = 1202;
    GameRedState.BAG_PET = 1203;
    GameRedState.BAG_HECHENG = 1204;
    GameRedState.BAOWU_ZUOQI = 1401;
    GameRedState.BAOWU_WING = 1402;
    GameRedState.BAOWU_HONGYAN = 1403;
    GameRedState.BAOWU_SHENBIN = 1404;
    GameRedState.ROLE_EQIUP = 1501;
    GameRedState.ROLE_ZIZHI = 1502;
    GameRedState.ROLE_SHENGXING = 1505;
    GameRedState.ROLE_JIUXING = 1506;
    GameRedState.ROLE_LIUDAO = 1507;
    GameRedState.UNION_RICHANG = 1601;
    GameRedState.UNION_FULI = 1602;
    GameRedState.DAILY_ACTIVITY_MEIRILEICHONG = 1701;
    GameRedState.DAILY_ACTIVITY_ZHOUKA = 1702;
    GameRedState.DAILY_ACTIVITY_MEIRICHONGZHI = 1703;
    GameRedState.MONTHCARD = 1704;
    GameRedState.DAILY_ACTIVITY_MEIZHOUTEHUI = 1705;
    GameRedState.DAILY_ACTIVITY_MEIYUETEHUI = 1706;
    GameRedState.DAILY_ACTIVITY_LIANCHONGHAOLI = 1707;
    GameRedState.OPENSERVER_ACTIVITY_SIRENDINGZHI = 1804;
    GameRedState.OPENSERVER_ACTIVITY_ZHUANSHUTEQUAN = 1807;
    GameRedState.FIRST_PLAYER_SAMLL = 1901;
    GameRedState.FIRST_PLAYER_BIG = 1902;
    GameRedState.GUANZHI_WENGUAN = 2201;
    GameRedState.GUANZHI_WUGUAN = 2202;
    GameRedState.MAIL_ONEGET = 2301;
    GameRedState.SOCIALITY_FRIENDS = 2401;
    GameRedState.VIP_TEQUAN_XIANGOU = 2501;
    // public static VIP_TEQUAN_DUIHUAN: number = 2503;
    GameRedState.VIP_TEQUAN_SPECAILCARD = 2504;
    GameRedState.EXPLORE_PETPAGODA = 3601; //武将塔
    GameRedState.EXPLORE_SUOYAOPAGODA = 3602; //试炼塔
    GameRedState.EXPLORE_WUHUNPAGODA = 3603; //试炼塔
    GameRedState.MAIN_SET_HEAD = 4901;
    GameRedState.PETWANFA_YUANZHENG = 5401; //名将远征
    GameRedState.PETWANFA_BINGFENSANLU = 5402; //兵分三路
    GameRedState.TUJIAN_TUJIAN = 5601;
    GameRedState.TUJIAN_QUCIK_SHENGXING = 5602;
    GameRedState.TUJIAN_LV_ZHONGSEHNG = 5603;
    GameRedState.TUJIAN_STAR_ZHONGSEHNG = 5604;
    GameRedState.DAZAO_SHENBING = 3801; //打造神兵
    GameRedState.DAZAO_CHENGZHUANG = 3802; //打造橙装
    GameRedState.DAZAO_SHENZHIDUANZAO = 3803; //神之锻造
    GameRedState.LIMIT1_1 = 6601;
    GameRedState.LIMIT1_2 = 6602;
    GameRedState.LIMIT1_3 = 6603;
    GameRedState.LIMIT1_4 = 6604;
    GameRedState.ANIMAL_UPGRADE = 6801; //宠物升级
    GameRedState.ANIMAL_REWAED = 6802; //宠物领奖
    GameRedState.ANIMAL_CHOUJIANG = 6803; //宠物抽奖
    GameRedState.JUNGONG_SHOP = 6901; //军功商城
    /**三级 */
    GameRedState.ARENA_LADDER_RANK = 90201;
    GameRedState.BAG_EQUIP_SMELTING = 120201;
    GameRedState.BAOWU_WING_POS1 = 140201;
    GameRedState.BAOWU_WING_POS2 = 140202;
    GameRedState.BAOWU_WING_POS3 = 140203;
    GameRedState.BAOWU_WING_POS4 = 140204;
    GameRedState.BAOWU_WING_POS5 = 140205;
    GameRedState.ROLE_EQIUP_POS1 = 150101;
    GameRedState.ROLE_EQIUP_POS2 = 150102;
    GameRedState.ROLE_EQIUP_POS3 = 150103;
    GameRedState.ROLE_EQIUP_POS4 = 150104;
    GameRedState.ROLE_EQIUP_POS5 = 150105;
    GameRedState.ROLE_EQIUP_FASHION = 150106;
    GameRedState.ROLE_JIUXING_POS1 = 150601;
    GameRedState.ROLE_JIUXING_POS2 = 150602;
    GameRedState.ROLE_JIUXING_POS3 = 150603;
    GameRedState.ROLE_JIUXING_POS4 = 150604;
    GameRedState.ROLE_JIUXING_POS5 = 150605;
    GameRedState.ROLE_LIUDAO_POS1 = 150701;
    GameRedState.ROLE_LIUDAO_POS2 = 150702;
    GameRedState.ROLE_LIUDAO_POS3 = 150703;
    GameRedState.ROLE_LIUDAO_POS4 = 150704;
    GameRedState.ROLE_LIUDAO_POS5 = 150705;
    GameRedState.UNION_RICHANG_WUGUAN = 160101;
    GameRedState.UNION_RICHANG_ZHANQI = 160102;
    GameRedState.UNION_RICHANG_MOBAI = 160103;
    GameRedState.UNION_RICHANG_TASK = 160104;
    GameRedState.UNION_FULI_TEHUI = 160203;
    GameRedState.UNION_FULI_BINGZHONG = 160204;
    GameRedState.UNION_SHARE = 160205;
    GameRedState.SOCIALITY_FRIENDS_APPLY = 240101; //申请好友
    GameRedState.SOCIALITY_PRIVATE_CHAT = 240102; //私聊
    GameRedState.XIANSHI_DIANFENGSAI_JINGCAI = 370401;
    GameRedState.XIANSHI_DIANFENGSAI_MOBAI = 370402;
    GameRedState.TUJIAN_TUJIAN_MOSHEN = 560101;
    GameRedState.DAZAO_CHENGZHUANG_POS1 = 380201;
    GameRedState.DAZAO_CHENGZHUANG_POS2 = 380202;
    GameRedState.DAZAO_CHENGZHUANG_POS3 = 380203;
    GameRedState.DAZAO_CHENGZHUANG_POS4 = 380204;
    GameRedState.DAZAO_CHENGZHUANG_POS5 = 380205;
    /**四级 */
    GameRedState.ARENA_LADDER_REWARD = 9020101;
    GameRedState.ROLE_EQIUP_FASHION_CLOTH = 15010601;
    GameRedState.ROLE_EQIUP_FASHION_WEAPON = 15010602;
    GameRedState.ROLE_EQIUP_FASHION_HALO = 15010603;
    GameRedState.UNION_RICHANG_TASK_TASK = 16010401;
    GameRedState.UNION_RICHANG_TASK_ZHANLING = 16010402;
    GameRedState.UNION_FULI_TEHUI_LINGQU = 16020301;
    GameRedState.UNION_FULI_TEHUI_GOUMAI = 16020302;
    return GameRedState;
}());
__reflect(GameRedState.prototype, "GameRedState");

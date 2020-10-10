var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeProperty = (function () {
    function TypeProperty() {
    }
    TypeProperty.getChinese = function (field) {
        if (field === void 0) { field = ""; }
        switch (field) {
            case "HP": return Language.P_SM + " : ";
            case "ATT": return Language.P_GJ + " : ";
            case "DEF": return Language.P_FY + " : ";
            case "CROSS": return Language.P_CT + " : ";
            case "HIT": return Language.P_MZ + " : ";
            case "EVD": return Language.P_SB + " : ";
            case "CRI": return Language.P_BJ + " : ";
            case "ANTICRI": return Language.P_KB + " : ";
            case "CRIDMG": return Language.P_BS + " : ";
            case "ANTICRIDMG": return Language.P_RX + " : ";
            case "DMGINCR": return Language.P_SHJS + " : ";
            case "DMGREDU": return Language.P_SHJM + " : ";
            case "EXHP": return Language.P_SMJC + " : ";
            case "EXATT": return Language.P_GJJC + " : ";
            case "EXDEF": return Language.P_FYJC + " : ";
            case "EXGOLD": return Language.P_JBJC + " : ";
            case "EXEXP": return Language.P_JYJC + " : ";
            case "CTRL": return Language.P_KZ + " : ";
            case "IGNORECTRL": return Language.P_KK + " : ";
            case "HEAL": return Language.P_ZL1 + " : ";
            case "BEHEAL": return Language.P_SL + " : ";
        }
        return "";
    };
    //用在兵法tips
    TypeProperty.getChineseByPropertyValue = function (field) {
        if (!field)
            return "";
        var prop = parseInt(field.split("_")[0]);
        var propValue = field.split("_")[1];
        switch (prop) {
            case TypeProperty.Hp: return Language.P_SM + " : " + propValue;
            case TypeProperty.MaxHp: return Language.P_SM + " : " + propValue;
            case TypeProperty.PAtk: return Language.P_GJ + " : " + propValue;
            case TypeProperty.PDef: return Language.P_FY + " : " + propValue;
            case TypeProperty.IgnorePDef: return Language.P_CT + " : " + propValue;
            case TypeProperty.Hit: return Language.P_MZ + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.Dodge: return Language.P_SB + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.Crit: return Language.P_BJ + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.IgnoreCrit: return Language.P_KB + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.CritInjure: return Language.P_BS + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.IgnoreCritInjure: return Language.P_RX + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.InjureAdd: return Language.P_SHJS + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.InjureIgnore: return Language.P_SHJM + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.PerHP: return Language.P_SMJC + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.PerPAtk: return Language.P_GJJC + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.PerPDef: return Language.P_FYJC + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.Ctrl: return Language.P_KZ + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.IgnoreCtrl: return Language.P_KK + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.Heal: return Language.P_ZL1 + " : " + parseInt(propValue) / 100 + "%";
            case TypeProperty.BeHeal: return Language.P_SL + " : " + parseInt(propValue) / 100 + "%";
        }
        return "";
    };
    //属性值：100 例如HP_100；
    TypeProperty.getChineseAndValue = function (field) {
        if (!field)
            return "";
        var propName = field.split("_")[0];
        var propValue = field.split("_")[1];
        switch (propName) {
            case "HP": return Language.P_SM + " : " + propValue;
            case "ATT": return Language.P_GJ + " : " + propValue;
            case "DEF": return Language.P_FY + " : " + propValue;
            case "CROSS": return Language.P_CT + " : " + propValue;
            case "HIT": return Language.P_MZ + " : " + parseInt(propValue) / 100 + "%";
            case "EVD": return Language.P_SB + " : " + parseInt(propValue) / 100 + "%";
            case "CRI": return Language.P_BJ + " : " + parseInt(propValue) / 100 + "%";
            case "ANTICRI": return Language.P_KB + " : " + parseInt(propValue) / 100 + "%";
            case "CRIDMG": return Language.P_BS + " : " + parseInt(propValue) / 100 + "%";
            case "ANTICRIDMG": return Language.P_RX + " : " + parseInt(propValue) / 100 + "%";
            case "DMGINCR": return Language.P_SHJS + " : " + parseInt(propValue) / 100 + "%";
            case "DMGREDU": return Language.P_SHJM + " : " + parseInt(propValue) / 100 + "%";
            case "EXHP": return Language.P_SMJC + " : " + parseInt(propValue) / 100 + "%";
            case "EXATT": return Language.P_GJJC + " : " + parseInt(propValue) / 100 + "%";
            case "EXDEF": return Language.P_FYJC + " : " + parseInt(propValue) / 100 + "%";
            case "EXGOLD": return Language.P_JBJC + " : " + parseInt(propValue) / 100 + "%";
            case "EXEXP": return Language.P_JYJC + " : " + parseInt(propValue) / 100 + "%";
            case "CTRL": return Language.P_KZ + " : " + parseInt(propValue) / 100 + "%";
            case "IGNORECTRL": return Language.P_KK + " : " + parseInt(propValue) / 100 + "%";
            case "HEAL": return Language.P_ZL1 + " : " + parseInt(propValue) / 100 + "%";
            case "BEHEAL": return Language.P_SL + " : " + parseInt(propValue) / 100 + "%";
        }
        return "";
    };
    /**生命 */
    TypeProperty.Hp = 100;
    /**怒气 */
    TypeProperty.Mp = 101;
    /**生命上限 */
    TypeProperty.MaxHp = 104;
    /**攻击 */
    TypeProperty.PAtk = 105;
    /**防御 */
    TypeProperty.PDef = 106;
    /**穿透 */
    TypeProperty.IgnorePDef = 107;
    /**生命加成 */
    TypeProperty.PerHP = 111;
    /**攻击加成 */
    TypeProperty.PerPAtk = 112;
    /**防御加成 */
    TypeProperty.PerPDef = 113;
    /**穿透加成 */
    TypeProperty.PerIgnorePDef = 114;
    /**命中 */
    TypeProperty.Hit = 121;
    /**闪避 */
    TypeProperty.Dodge = 122;
    /**暴击 */
    TypeProperty.Crit = 123;
    /**暴击伤害 暴伤*/
    TypeProperty.CritInjure = 124;
    /**抗暴 */
    TypeProperty.IgnoreCrit = 125;
    /**暴击抵抗 韧性*/
    TypeProperty.IgnoreCritInjure = 126;
    /**伤害加深 */
    TypeProperty.InjureAdd = 127;
    /**伤害减免 */
    TypeProperty.InjureIgnore = 128;
    /**治疗 */
    TypeProperty.Heal = 129;
    /**受疗 */
    TypeProperty.BeHeal = 130;
    /**控制 */
    TypeProperty.Ctrl = 131;
    /**抗控 */
    TypeProperty.IgnoreCtrl = 132;
    /**怒气 */
    TypeProperty.MaxMp = 133;
    /**讨伐积分 */
    TypeProperty.TAOFA = 243;
    /**远征积分 */
    TypeProperty.YUANZHGENG = 244;
    /**声望积分 */
    TypeProperty.SHENGWANG = 245;
    /**战斗加速 */
    TypeProperty.BattleSettingId = 156;
    /**阵型羁绊计 */
    //public static CampJibanRefId: number = 157
    /**等级 */
    TypeProperty.Level = 1000;
    /**经验 */
    TypeProperty.Exp = 1001;
    /**转生等级 */
    TypeProperty.ZhuanShenLevel = 1525;
    /**银两 */
    TypeProperty.Gold = 1005;
    /**元宝 */
    TypeProperty.UnbindedGold = 1007;
    /**关卡 */
    TypeProperty.Chapter = 10090;
    /**注灵值(阿拉玛之魂) */
    TypeProperty.ZhuLin = 10091;
    /**帝龙碎片*/
    TypeProperty.DragonDebris = 10109;
    /**战力*/
    TypeProperty.FightValue = 161;
    /**阵营身份 */
    TypeProperty.UnionOfficialId = 1041;
    /**累计登陆天数 */
    TypeProperty.LEIJIDENGLU_DATA = 10123;
    /**阵营贡献 */
    TypeProperty.UnionGongXian = 10124;
    /**武官id*/
    TypeProperty.WUGUAN_ID = 1017;
    /**斗魄等级*/
    TypeProperty.FIGHT_SOUL_LEVEL = 10118;
    /**斗魄经验*/
    TypeProperty.FIGHT_SOUL_EXP = 10119;
    /**帝龙等级*/
    TypeProperty.DRAGON_LEVEL = 10110;
    /**印记等级*/
    TypeProperty.IMPRINT_LEVEL = 10107;
    /**符文等级*/
    TypeProperty.RUNES_LEVEL = 10108;
    /** 女神激活ID*/
    TypeProperty.ACTIVED_GODDESS_ID = 10131;
    /**女神唤醒ID*/
    TypeProperty.AWAKEN_GODDESS_ID = 10132;
    /**神魂精华*/
    TypeProperty.SHEN_HUN_DEBRIS_ID = 10137;
    /**活动总充值*/
    TypeProperty.ACTIVITY_TOTAL_RECHARGE = 10130;
    /**总计充值*/
    TypeProperty.TOTAL_RECHARGE = 10068;
    /**当天充值 毛*/
    TypeProperty.TODAY_RECHARGE = 10141;
    /**累充天数*/
    TypeProperty.RECHARGE_DAYS = 10142;
    /**背包格子已购买次数*/
    TypeProperty.BUY_BAG_COUNT = 10191;
    /**创角时间*/
    TypeProperty.BIRTH_DATE = 163;
    /**怒气回复速度万分比加成*/
    TypeProperty.XPAngerPer = 182;
    /**XP技能持续时间万分比加成*/
    TypeProperty.XPTimePer = 183;
    /**XP对怪物的伤害*/
    TypeProperty.XPHurtMonster = 184;
    /**XP对玩家的伤害*/
    TypeProperty.XPHurtPlayer = 185;
    /**荣誉*/
    TypeProperty.HonorId = 162;
    /**VIP等级*/
    TypeProperty.VIP_LEVEL = 10126;
    /**VIP经验*/
    TypeProperty.VIP_EXP = 10160;
    /**疲劳值*/
    TypeProperty.VP_VALUE = 10230;
    /**累积首冲金额  毛*/
    TypeProperty.TOTAL_FIRST_RECHARGE = 10070;
    /**女神积分*/
    TypeProperty.GODDESS_SCORE_Id = 10172;
    /**出战幻武id*/
    TypeProperty.PHANTOM_BATTLE_Id = 10174;
    //玩家终身次数
    TypeProperty.WholeLifeCountInfo_Id = 10159;
    /**月卡到期时间秒*/
    TypeProperty.MONTHCARDLEFTTIME = 10153;
    /**特权到期时间秒*/
    TypeProperty.SUPERMONTHCARDLEFTTIME = 10154;
    /**时装衣服 */
    TypeProperty.FASHION_CLOTH = 10148;
    /**时装翅膀 没用到*/
    TypeProperty.FASHION_WING = 10149;
    /**时装武器*/
    TypeProperty.FASHION_WEAPON = 10150;
    /**时装坐骑 */
    TypeProperty.FASHION_HORSE = 10151;
    /**时装称号*/
    TypeProperty.DRESSEDTITLE = 10152;
    /**时装光环 */
    TypeProperty.FASHION_HALO = 10249;
    /**红装中的头顶小飞龙 */
    TypeProperty.HELMET_MODLEID = 10184;
    //武器模型
    TypeProperty.WEAPON_MODLEID = 1501;
    //衣服模型
    TypeProperty.CLOTH_MODLEID = 1502;
    //翅膀模型
    TypeProperty.WING_MODLEID = 1503;
    //假日积分
    TypeProperty.HOLIDAYSCORE_ID = 10194;
    //命魂经验值
    TypeProperty.LIFESOUL_EXP = 10203;
    //命魂圣物精华
    TypeProperty.LIFESOUL_HALIDOM_ELITE = 10204;
    //神格经验
    TypeProperty.GODHOOD_EXP = 10212;
    //玉石精华
    TypeProperty.GODBONE_JADE = 10223;
    //战神币
    TypeProperty.ZHANSHEN_COIN = 10232;
    //无限手套infiniteGauntlet
    TypeProperty.INFINITE_GAUNTLET = 10244;
    //无限手套当前出战技能
    TypeProperty.INFINITE_GAUNTLET_BATTLE = 10245;
    //反沉迷
    TypeProperty.ADDICTION = 10218;
    //阵营ID
    TypeProperty.UNIONID = 10231;
    // //出站的战骑
    // public static CHUZHANZHANQI: number = 10275;
    //XP体验时间
    TypeProperty.XP_EXPERIENCET_TIME = 10240;
    /**魔晶 */
    TypeProperty.MOJING_ID = 10253;
    /**图鉴身上有的经验 */
    TypeProperty.HANDBOOK_EXP = 10265;
    /**出战的无双 */
    TypeProperty.CHUZHANWUSHUANG = 10266;
    /**主角和人物总战力*/
    TypeProperty.ALLFIGHT = 10267;
    TypeProperty.Cross_zz_Id = 10268;
    TypeProperty.Mdef_zz_Id = 10269;
    TypeProperty.Hp_zz_Id = 10270;
    TypeProperty.Att_zz_Id = 10271;
    TypeProperty.Pdef_zz_Id = 10272;
    /**主角资质所属武将ID*/
    TypeProperty.Cross_zz_from_Id = 10282;
    TypeProperty.Mdef_zz_from_Id = 10283;
    TypeProperty.Hp_zz_from_Id = 10284;
    TypeProperty.Att_zz_from_Id = 10285;
    TypeProperty.Pdef_zz_from_Id = 10286;
    /**文官id */
    TypeProperty.wenGuanId = 1524;
    /**三国首冲 */
    TypeProperty.SG_FIRSTRECHARGE_ID = 10277;
    /**设置界面*/
    TypeProperty.SET_AUTO_ID = 10279;
    /**主角总资质*/
    TypeProperty.UNACTIVEZZPOINT_ID = 10274;
    /**主角头像*/
    TypeProperty.HEADICON = 10290;
    /**征收的时间*/
    TypeProperty.FOOD_TIME = 10093;
    /**粮草*/
    TypeProperty.LIANGCAO = 10089;
    /**观星积分*/
    TypeProperty.GUANXING_JIFEN = 242;
    /**品质2兵法重铸次数*/
    TypeProperty.BINGFA2_CREATE_CNT = 632;
    /**品质3兵法重铸次数*/
    TypeProperty.BINGFA3_CREATE_CNT = 633;
    /**品质4兵法重铸次数*/
    TypeProperty.BINGFA4_CREATE_CNT = 634;
    /**品质5兵法重铸次数*/
    TypeProperty.BINGFA5_CREATE_CNT = 635;
    /**品质6兵法重铸次数*/
    TypeProperty.BINGFA6_CREATE_CNT = 636;
    /**品质7兵法重铸次数*/
    TypeProperty.BINGFA7_CREATE_CNT = 637;
    /**竞猜币*/
    TypeProperty.TOPBATTLE_BETCOIN = 2401;
    /**御敌积分 */
    TypeProperty.YUDIJIFEN = 246;
    /**兽魂 */
    TypeProperty.SHOUHUN = 247;
    /**军功 */
    TypeProperty.JUNGONG = 248;
    TypeProperty.baseProperties = [
        TypeProperty.Hp,
        TypeProperty.MaxHp,
        TypeProperty.PAtk,
        TypeProperty.PDef,
        TypeProperty.IgnorePDef
    ];
    TypeProperty.specialProperties = [
        TypeProperty.Crit,
        TypeProperty.CritInjure,
        TypeProperty.IgnoreCrit,
        TypeProperty.IgnoreCritInjure,
        TypeProperty.Hit,
        TypeProperty.Dodge,
        TypeProperty.InjureAdd,
        TypeProperty.InjureIgnore,
        TypeProperty.Heal,
        TypeProperty.BeHeal,
        TypeProperty.Ctrl,
        TypeProperty.IgnoreCtrl
    ];
    return TypeProperty;
}());
__reflect(TypeProperty.prototype, "TypeProperty");

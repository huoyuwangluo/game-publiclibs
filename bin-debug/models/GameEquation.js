var equation;
(function (equation) {
    /*
     1.算概率
        B_DodgeProbabi=(B_Dodge-A_Hit)*BATTLE_PROBABI;
        B_DodgeProbabi=B_DodgeProbabi<0?0:B_DodgeProbabi;

        B_CritedProbabi=((A_Crit+(B_isBoss?A_CritBoss:0))-B_IgnoreCrit)*BATTLE_PROBABI;

        2.区间判定 Math.random() >>  B_DodgeProbabi>>B_CritedProbabi>>Damage;

        var DamageProbabi:Number=(100-B_DodgeProbabi-B_CritedProbabi);


        var mark:number=0;
        var a1:any={min:mark,max:mark+B_DodgeProbabi}
        mark+=B_DodgeProbabi;
        var b1:any={min:mark,max:mark+B_CritedProbabi}
        mark+=B_CritedProbabi;
        var c1:any={min:mark,max:mark+DamageProbabi}
        mark+=DamageProbabi;
        var v:number=Math.random();
        if(a1.min<v&&v<a1.max){
            return 0;
        }
        if(b1.min<v&&v<b1.max){
            return (1.5+((A_CritInjure+(B_isBoss?A_CritInjureBoss:0)-B_IgnoreCritInjure)*BATTLE_PROBABI)
        }
        if(c1.min<v&&v<c1.max){
            return 1;
        }
        3.算伤害
        //闪避
        Damage=0;
        //暴击
        A_Damage_Rate=(1.5+((A_CritInjure+(B_isBoss?A_CritInjureBoss:0)-B_IgnoreCritInjure)*BATTLE_PROBABI)
        //普通攻击
        A_Damage_Rate=1;

        Damage = A_Attack*A_Attack/(A_Attack+(B_Defene-A_IgnoreDef)*2)*A_Damage_Rate*(1+((A_InjureAdd+(B_isBoss?A_InjureAddBoss:0))+B_InjureIgnore)*BATTLE_PROBABI);
    */
    /** 概率系数 通用概率系数 相当于 除以10000*/
    equation.BATTLE_PROBABI = 0.0001;
    /** 生命回复间隔 毫秒数*/
    equation.BATTLE_HP_RECOVER_INVERTAL = 2000;
    /**
     * 取攻击系数 圆桌判定
     * @param A_Crit                暴击
     * @param A_Hit                 命中
     * @param A_CritInjure          暴击伤害
     * @param A_CritBoss            BOSS暴击值
     * @param A_CritInjureBoss      BOSS暴击伤害
     * @param B_Dodge               闪避
     * @param B_IgnoreCrit          抗暴
     * @param B_IgnoreCritInjure    暴击抵抗
     * @param B_isBoss              目标是否为BOSS
     * @param B_dodgePrecent        闪避率系数
     * @param A_critPrecent         暴击率系数
     * @return 0: 闪避  ==1: 普通攻击  >1: 暴击
     */
    function getBattleRate(A_Crit, A_Hit, A_CritInjure, A_CritBoss, A_CritInjureBoss, B_Dodge, B_IgnoreCrit, B_IgnoreCritInjure, B_isBoss) {
        var B_DodgeProbabi = (B_Dodge - A_Hit) * equation.BATTLE_PROBABI;
        if (B_DodgeProbabi < 0)
            B_DodgeProbabi = 0;
        var A_CritedProbabi = (((A_Crit + (B_isBoss ? A_CritBoss : 0)) - B_IgnoreCrit) * equation.BATTLE_PROBABI);
        //刻度
        var mark = 0;
        var B_DodgeProbabi_Min = mark;
        var B_DodgeProbabi_Max = mark + B_DodgeProbabi;
        //刻度叠加
        mark += B_DodgeProbabi;
        var A_CritedProbabi_Min = mark;
        var A_CritedProbabi_Max = mark + A_CritedProbabi;
        var v = Math.random();
        if (B_DodgeProbabi_Min < v && v < B_DodgeProbabi_Max) {
            return 0;
        }
        if (A_CritedProbabi_Min < v && v < A_CritedProbabi_Max) {
            return 1.5 + ((A_CritInjure + (B_isBoss ? A_CritInjureBoss : 0) - B_IgnoreCritInjure) * equation.BATTLE_PROBABI);
        }
        return 1;
    }
    equation.getBattleRate = getBattleRate;
    /**
     * 获取攻击伤害值
     * @param A_Attack              攻击
     * @param A_IgnoreDef           穿刺 物理系-物防穿刺|法术系-法防穿刺
     * @param A_InjureAdd           伤害加深
     * @param A_InjureAddBoss       BOSS伤害加深
     * @param B_Defene              防御 物理系-物防|法术系-法防
     * @param B_InjureIgnore        伤害减免
     * @param A_Damage_Rate         伤害系数 getBattleRate;
     * @param B_isBoss              目标是否为BOSS
     */
    function battleCombat(A_Attack, A_IgnoreDef, A_InjureAdd, A_InjureAddBoss, B_Defene, B_InjureIgnore, A_Damage_Rate, B_isBoss) {
        if (A_Damage_Rate === void 0) { A_Damage_Rate = 1; }
        B_Defene -= A_IgnoreDef;
        if (B_Defene < 0)
            B_Defene = 0;
        return A_Attack * A_Attack / (A_Attack + B_Defene) * A_Damage_Rate * (1 + ((A_InjureAdd + (B_isBoss ? A_InjureAddBoss : 0)) - B_InjureIgnore) * equation.BATTLE_PROBABI);
    }
    equation.battleCombat = battleCombat;
    /**
     * 获取攻击
     * @param A_Attack          攻击
     * @param A_IgnoreDef       穿刺 物理系-物防穿刺|法术系-法防穿刺
     * @param A_InjureAdd       伤害加深
     * @param A_InjureAddBoss   BOSS伤害加深
     * @param B_Defene          防御 物理系-物防|法术系-法防
     * @param B_InjureIgnore    伤害减免
     * @param A_Damage_Rate     伤害系数
     * @param A_Nobility        官职
     * @param B_Nobility        官职
     * @param A_Spirit          斗魄
     * @param B_Spirit          斗魄
     */
    function battleCombatPvp(A_Attack, A_IgnoreDef, A_InjureAdd, A_InjureAddBoss, B_Defene, B_InjureIgnore, A_Damage_Rate, A_Nobility, B_Nobility, A_Spirit, B_Spirit) {
        return battleCombat(A_Attack, A_IgnoreDef, A_InjureAdd, A_InjureAddBoss, B_Defene, B_InjureIgnore, A_Damage_Rate, false) * (1 + (A_Nobility > B_Nobility ? 0.07 : 0)) * (1 - (A_Spirit >= B_Spirit ? 0 : 0.07));
    }
    equation.battleCombatPvp = battleCombatPvp;
    function int(v) {
        return v >> 0;
    }
    equation.int = int;
    function random(a, b) {
        return Math.random() * (b - a) + a;
    }
    equation.random = random;
    function hatchlv(num) {
        switch (num) {
            case 0: return 1;
            case 500: return 1.05;
            case 1000: return 1.10;
            case 1500: return 1.15;
            case 2000: return 1.20;
            default:
                return 1;
        }
    }
    equation.hatchlv = hatchlv;
    //幻化计算
    function illusionUp(petbasic, petChangeRate, petStepRate, init) {
        return Math.floor((petbasic * (petStepRate + petChangeRate) / 10000) * this.hatchlv(init));
    }
    equation.illusionUp = illusionUp;
    //喂养计算
    function petFeedLv(petbasic, petChangeRate, init) {
        return Math.floor((petbasic * (petChangeRate / 10000)) * this.hatchlv(init));
    }
    equation.petFeedLv = petFeedLv;
    //取万计算
    function thousandChange(value) {
        if (value >= 100000000) {
            return (value / 100000000).toFixed(1) + Language.Z_YI;
        }
        else if (value >= 10000) {
            if (value % 10000 < 1000) {
                return Math.floor(value / 10000) + Language.Z_WAN;
            }
            else {
                return (value / 10000).toFixed(1) + Language.Z_WAN;
            }
        }
        else {
            return value.toString();
        }
    }
    equation.thousandChange = thousandChange;
    // //------------------------------------------------------------
    // //                     其他游戏参考
    // //------------------------------------------------------------
    // /**
    //  * 麻痹公式
    //  * @param a 自身麻痹
    //  * @param b 目标抗麻
    //  */
    // export function calBlock(a:number, b:number) { return Math.min(Math.max((b - a) * 0.006, 0.005), 0.5); }
    // /**
    //  * 购买银两元宝消耗公式
    //  * @param x 银两购买次数
    //  */
    // export function calBuyGoldDiamond(x:number) { return 10 + 10 * int(x / 1.5); }
    // /**
    //  * 购买银两获得公式
    //  * @param a 银两购买次数
    //  * @param b 增量值
    //  * @param s 等级购买银两基数
    //  */
    // export function calBuyGold(a:number, b:number, s:number) { return s + b * a; }
    // /**
    //  * 境界购买次数
    //  * @param x 已购买次数
    //  */
    // export function calBuyRealm(x:number) { return 10 + 2 << x - 1; }
    // /**
    //  * 装备购买次数
    //  * @param x 已购买次数
    //  */
    // export function calBuyEquip(x:number) { return 10 + 2 << x - 1; }
    // /**
    //  * 炼狱boss购买次数
    //  * @param x 购买次数
    //  */
    // export function calBuyBoss(x:number) { return 110 * x - 70; }
    // /**
    //  * PK获得荣誉
    //  * @param a 胜负参数
    //  * @param x 历史pk值
    //  */
    // export function calPkOutHonor(a:number, x:number) { return int(a * Math.pow(x, 0.25)); }
    // /**
    //  * PK获得的银两
    //  * @param a pk值
    //  * @param b 对方玩家等级
    //  * @param x 己方红黄名参数
    //  * @param y 敌方红黄名参数
    //  */
    // export function calPkOutGold(a:number, b:number, x:number, y:number) { return (100 + random(b, b)) * (x + y) * 25; }
    // /**
    //  * pk获得的经验
    //  * @param a pk值
    //  * @param b 对方玩家等级
    //  * @param c pk差异值(升级表)
    //  * @param x 己方红黄名参数
    //  * @param y 敌方红黄名参数
    //  */
    // export function calPkOutexpc(a:number, b:number, c:number, x:number, y:number) { return (50 * c + random(b, b)) * (x + y); }
    // /**
    //  * 装备附加概率公式
    //  * @param a 装备属性
    //  * @param c 装备属性随机倍率
    //  */
    // export function calEquipSubjoin(a, c) { return int(a * ((c + random(1, 20)) / 100)); }
    // /**
    //  * 装备评分公式
    //  * @param a 基础评分
    //  * @param c 附加值
    //  * @param b 装备附加参数
    //  */
    // export function calEquipGrade(a, c, b) { return a + c * b; }
    // /**
    //  * 熔炼获得强化石数量
    //  * @param a 熔炼参数
    //  * @param b 装备等级
    //  */
    // export function calSmeltintensify(a, b) { return a * int(1 + b / 20); }
    // /**
    //  * 获得杀戮值计算
    //  * @param a 攻方杀戮值
    //  * @param b 防御方杀戮值
    //  */
    // export function calKillValue(a, b) { return int(25 * Math.pow((Math.abs(Math.max(a - b, 2))), 0.1)); }
    // /**
    //  * 随机装备升阶熔炼ID
    //  * @param a 模板装备ID
    //  */
    // export function calSmeltUpId(a) { return a + 100000 + random(1, 3) * 10000; }
    // /**
    //  * 随机装备熔炼ID
    //  * @param a 模板装备ID
    //  */
    // export function calSmeltId(a) { return a + random(1, 3) * 10000; }
    // /**
    //  * 技能CD时间（s）
    //  * @param a 技能等级
    //  */
    // export function calSkillCd(a) { return int(a / 6 + 1) * 120; }
    // /**
    //  * 清除CD需要消费元宝（s）
    //  * @param a 当前的CD时间
    //  */
    // export function calSkillDiamond(a) { return int(a / 300); }
    // /**
    //  * 基础属性战斗力公式
    //  * @param a 血量之和
    //  * @param a1 血量参数
    //  * @param b 攻击之和
    //  * @param b1 攻击参数
    //  * @param c 物防之和
    //  * @param c1 物防参数
    //  * @param d 魔防之和
    //  * @param d1 魔防参数
    //  * @param e 暴击之和
    //  * @param e1 暴击参数
    //  * @param f 抗暴之和
    //  * @param f1 抗暴参数
    //  * @param g 闪避之和
    //  * @param g1 闪避参数
    //  * @param h 命中之和
    //  * @param h1 命中参数
    //  * @param j 攻击频率
    //  * @param j1 攻击频率参数
    //  */
    // export function calBaseCombat(a, a1, b, b1, c, c1, d, d1, e, e1, f, f1, g, g1, h, h1, j, j1) { return int((a * a1 + b * b1 + c * c1 + d * d1 + e * e1 + f * f1 + g * g1 + h * h1) * (j / j1)); }
    // /**
    //  * 戒指战力公式
    //  * @param a 戒指1
    //  * @param b 戒指2
    //  * @param c 戒指3
    //  * @param d 戒指4
    //  */
    // export function calBreakCombat(a, b, c, d) { return int(a + b + c + d); }
    // /**
    //  * 技能战力公式
    //  * @param k 第1技能战力
    //  * @param k1 第1技能等级
    //  * @param l 第2技能战力
    //  * @param l1 第2技能等级
    //  * @param m 第3技能战力
    //  * @param m1 第3技能等级
    //  * @param n 第4技能战力
    //  * @param n1 第4技能等级
    //  * @param s 第5技能战力
    //  * @param s1 第5技能等级
    //  */
    // export function calSkillCombat(k, k1, l, l1, m, m1, n, n1, s, s1) { return int(k * k1 + l * l1 + m * m1 + n * n1 + s * s1); }
    // /**
    //  * 总战力公式
    //  * @param a 基础属性战斗力
    //  * @param b 戒指战力
    //  * @param c 技能战力
    //  */
    // export function callCountCombat(a, b, c) { return a + b + c; }
    // /**
    //  * 装备背包购买消耗公式
    //  * @param a 购买次数
    //  */
    // export function callBuyEquipBag(a) { return int(a / 2) + 3; }
    // /**
    //  * 离线每装备转化的银两
    //  * @param a 当前所在的普通关卡ID
    //  */
    // export function callEquipTraGold(a) { return int(4 * Math.exp(0.45 * (a / 40))); }
    // /**
    //  * 离线获得的装备数
    //  * @param b 离线时间
    //  */
    // export function callOfflineEquipCount(b) { return random(int(b / 180), int(b / 120)); }
    // /**
    //  * 离线获得的银两数
    //  * @param a 当前所在的普通关卡获得的银两
    //  * @param b 领主等级
    //  * @param c 离线时间(秒)
    //  */
    // export function callOfflineGold(a, b, c) { return a * (c / 10) * Math.log(b + 1) / 3 * (-10 * Math.log(c) / 2.5 + 100) / 100; }
    // /**
    //  * 离线获得的经验数
    //  * @param a 每秒获得的经验
    //  * @param c 离线时间(秒)
    //  */
    // export function callOfflineexp(a, c) { return a * c * (-10 * Math.log(c) / 2.5 + 80) / 100; }
    // /**
    //  * 离线获得的装备等级
    //  * @param a 当前所在的普通关卡ID
    //  */
    // export function callEquipLvl(a) { return int(a / 40 + 1) * 10; }
    // /**
    //  * 离线获得的装备ID
    //  * @param a 离线掉落装备等级
    //  */
    // export function callOfflineEquipId(a) { return (int(a / 10) + 1) + 100000 + random(1, 3) * 10000 + random(1, 6) * 1000; }
    // /**
    //  * 刷新商店消耗银两
    //  * @param a 刷新次数
    //  */
    // export function callRefreshShop(a) { return Math.min(int(a / 4), 1) * 1000; }
    // /**
    //  * pk消耗元宝数量
    //  * @param a PK购买次数
    //  */
    // export function calRefreshPKCost(a) { return int(15); }
    // /**
    //  * pk杀戮值匹配
    //  * @param a 自己的杀戮值
    //  * @param b PK杀戮值取值区间值
    //  */
    // export function calPkKillCfg(a, b) { return Math.max((a + b), 0); }
    // /**
    //  * pk战力值匹配
    //  * @param a 自己等级
    //  * @param b 自身战力
    //  * @param c PK战力取值区间
    //  */
    // export function calPkCombatCfg(a, b, c) { return Math.max(((15 * a) / 100 * c + b), 0); }
    // /**
    //  * PK值清除消耗元宝
    //  * @param a 当前的PK值
    //  */
    // export function calClearPkCost(a) { return int(a / 2); }
    // /**
    //  * 熔炼获得货币数量
    //  * @param a 装备颜色参数
    //  * @param b 装备等级参数
    //  */
    // export function calSmeltGetCurrency(a, b) { return int(a * b); }
    // /**
    //  * pk红名掠夺boo令牌几率（万分率）
    //  * @param b 己方红名点
    //  */
    // export function calBossRate(b) { return Math.min((b * 10), 3500); }
    // /**
    //  * 公会退会次数需要CD
    //  * @param a 公会退会次数
    //  */
    // export function calQuitGuildCfg(a) { return Math.max(60, int(a / 2) * 1200); }
    // /**
    //  * 红包公式
    //  * @param a 当前红包剩余总金额
    //  * @param b 当前剩余分配红包数
    //  */
    // export function calRedEnvelopeShareCfg(a, b) { return Math.max(1, int((a / b) * random(50, 125) / 100)); }
    // /**
    //  * 每日国库发放钱粮
    //  * @param a 当前玩家等级
    //  * @param b 当前银两贮藏量
    //  * @param c 领取银两参数1
    //  * @param d 领取银两参数2
    //  */
    // export function calCoffersPersonRecource(a, b, c, d) { return int(a * a * b / c * Math.exp(d)); }
    // /**
    //  * 国库城防防守者增加血量
    //  * @param a 当前城防值
    //  * @param b 城防参数
    //  * @param c 当前防守者血量
    //  */
    // export function calCoffersPersonHp(a, b, c) { return int((a * b * c) / 100); }
    // /**
    //  * 国库城防显示增加血量百分比
    //  * @param a 当前城防值
    //  * @param b 城防参数
    //  */
    // export function calCoffersAllHp(a, b) { return (a * b) / 100; }
    // /**
    //  * 离线获得的铜宝箱数量
    //  * @param b 离线分钟
    //  */
    // export function calCuChests(b) { return int(random((0.75 * b / 40), (0.85 * b / 40))); }
    // /**
    //  * 离线获得的银宝箱数量
    //  * @param b 离线分钟
    //  */
    // export function calAgChests(b) { return int(random((0.75 * b / 120), (0.85 * b / 120))); }
    // /**
    //  * 离线获得的金宝箱数量
    //  * @param b 离线分钟
    //  */
    // export function calAuChests(b) { return int(random((0.75 * b / 360), (0.85 * b / 360))); }
    // /**
    //  * 国库掠夺银两公式
    //  * @param a 伤害量计算获得银两
    //  * @param b 国库当前银两
    //  * @param c 被击破守卫人数
    //  */
    // export function calCoffersLoot(a, b, c) { return (a + b * 0.018) * c * 0.25; }
    // /**
    //  * 行会副本秒CD花费
    //  * @param a 当前剩余秒数
    //  */
    // export function calGuildCopyCd(a) { return int(int(a / 6) * 0.5); }
    // /**
    //  * 跨服战进攻秒CD花费
    //  * @param a 购买次数
    //  */
    // export function calClearGuildWarCd(a) { return 20 + (a - 1) * 30; }
    // /**
    //  * 跨服个人鼓舞花费元宝
    //  * @param a 鼓舞次数
    //  */
    // export function calInspireGuildWar(a) { return 100 + (a - 1) * 100; }
    // /**
    //  * 隐姓埋名元宝消耗
    //  * @param a 购买次数
    //  */
    // export function calIncognito(a) { return int(100 * Math.pow(1.1, a - 1)); }
    // /**
    //  * 高级密探元宝消耗
    //  * @param a 购买次数
    //  */
    // export function calSpies(a) { return int(100 + 30 * a); }
    // /**
    //  * 爬塔宝库购买抽奖消耗
    //  * @param a 购买次数
    //  * @param b 当前塔层数
    //  */
    // export function calPaTaAward(a, b) { return int(150000 * Math.exp(0.2 * a) / 10000) + b * 5; }
    // /**
    //  * 随机宝箱开出等级
    //  * @param a 人物等级
    //  */
    // export function calEquipLvlCfg(a) { return int(a / 10) + 1; }
    // /**
    //  * 法宝洗资质成功概率
    //  * @param a 当前资质
    //  * @param b 上限资质
    //  */
    // export function calTrumpPro(a, b) { return 1.31 - a / b; }
    // /**
    //  * 法宝资质增加
    //  * @param a 当前资质
    //  * @param b 上限资质
    //  */
    // export function calTrumpAdd(a, b) { return int(Math.max(((b - a) / random(50, 100)), 1)) + random(3, 7); }
    // /**
    //  * 法宝资质减少
    //  * @param a 当前资质
    //  * @param b 上限资质
    //  */
    // export function calTrumpSub(a, b) { return int(Math.max(((b - a) / random(30, 100)), 1)); }
    // /**
    //  * 清除BOSS CD花费
    //  * @param a 当前BOSS等级
    //  * @param b 剩余CD时间(秒)
    //  * @param c 今日召唤次数
    //  */
    // export function calGuildBossRepeat(a, b, c) { return int(a * 3 + b * 0.005 + 500 * (c + 1) + Math.pow(4.5, c)); }
    // /**
    //  * 凌云石购买价格
    //  * @param a 购买次数
    //  */
    // export function calBuyLingyun(a) { return a * 2 + 5; }
    // /**
    //  * 计算基金vip购买次数
    //  * @param a 人物vip等级
    //  * @param b vip限制等级
    //  */
    // export function calFundVipCount(a, b) { return a >= b ? 1 : 0; }
})(equation || (equation = {}));

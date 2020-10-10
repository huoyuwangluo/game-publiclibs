var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeModel = (function () {
    function TypeModel() {
    }
    TypeModel.isShowPetTips = function (modelId) {
        var idArr = [this.SmokePet, this.MuMingErLai, this.PetCompound, this.PetRandomCompound];
        if (idArr.indexOf(modelId) != -1)
            return true;
        return false;
    };
    /**
     * GM
     */
    TypeModel.GMSend = 0;
    /**
     * 充值
     */
    TypeModel.Recharge = 1;
    /**
     * 成就
     */
    TypeModel.Achievement = 2;
    /**
     * 挖宝
     */
    TypeModel.Digs = 3;
    /**
     * 天梯
     */
    TypeModel.Ladder = 4;
    /**
     * 签到
     */
    TypeModel.Sign = 5;
    /**
     * 日常任务
     */
    TypeModel.DailyQuest = 6;
    /**
     * 主线任务
     */
    TypeModel.Quest = 7;
    /**
     * 切面任务
     */
    TypeModel.SectionQuest = 8;
    /**
     * 副本任务
     */
    TypeModel.GameInstanceQuest = 9;
    /**
     * 法宝
     */
    TypeModel.Talisman = 10;
    /**
     * 商店
     */
    TypeModel.Store = 11;
    /**
     * VIP
     */
    TypeModel.Vip = 12;
    /**
     * 采集
     */
    TypeModel.Pluck = 13;
    /**
     * 邮件
     */
    TypeModel.Mail = 14;
    /**
     * 遮天基金
     */
    TypeModel.FundActivity = 15;
    /**
     * 关卡奖励
     */
    TypeModel.CHAPTEREWARD = 16;
    /**
     * 掉落拾取
     */
    TypeModel.Loot = 18;
    /**
     * 分解
     */
    TypeModel.FenJie = 19;
    /**
     * 脱装备
     */
    TypeModel.DeEquip = 20;
    /**
     * 开礼包
     */
    TypeModel.OpenGift = 21;
    /**
     * 首充
     */
    TypeModel.FirstRecharge = 22;
    /**
     * 累计充值
     */
    TypeModel.TotalRecharge = 23;
    /**
     * 每日充值
     */
    TypeModel.DayRecharge = 24;
    /**
     * 周累计消费
     */
    TypeModel.WeekConsume = 25;
    /**
     * 限时冲榜
     */
    TypeModel.LimitTimeRank = 26;
    /**
     * 沙巴克攻城
     */
    TypeModel.CastleWar = 27;
    /**
     * 爵位
     */
    TypeModel.Peerage = 28;
    /**
     * 进阶奖励
     */
    TypeModel.Advanced = 29;
    /**
     * 升级奖励
     */
    TypeModel.LevelUp = 30;
    /**
     * 在线时长
     */
    TypeModel.TotalOnline = 31;
    /**
     * 副本
     */
    TypeModel.GameInstance = 32;
    /**
     * 技能
     */
    TypeModel.Skill = 33;
    /**
     * 公会
     */
    TypeModel.Union = 34;
    /**
     * 强化
     */
    TypeModel.QiangHua = 35;
    /**
     * 洗练
     */
    TypeModel.XiLian = 36;
    /**
     * 聊天
     */
    TypeModel.Chat = 37;
    /**
     * 传送
     */
    TypeModel.TransFer = 38;
    /**
     * pk
     */
    TypeModel.Pk = 39;
    /**
     * 翅膀
     */
    TypeModel.Wing = 40;
    /**
     * 坐骑
     */
    TypeModel.Monut = 41;
    /**
     * VIP抽奖
     */
    TypeModel.VipLotter = 42;
    /**
     * 怪物入侵
     */
    TypeModel.MonsterInvasion = 43;
    /**
     * 背包使用
     */
    TypeModel.ItemBagUse = 44;
    /**
     * 背包出售
     */
    TypeModel.ItemBagSell = 45;
    /**
     * Debug
     */
    TypeModel.Debug = 46;
    /**
     * 复活
     */
    TypeModel.Revice = 47;
    /**
     * 分包下载
     */
    TypeModel.resDownLoad = 48;
    /**
     * 礼包码兑换
     */
    TypeModel.giftCode = 49;
    /**
     * 升级
     */
    TypeModel.equipLevelUp = 50;
    /**
     * 拍卖行
     */
    TypeModel.auction = 51;
    /**
     * 付费地宫
     */
    TypeModel.payOnPalace = 52;
    /**
     * 仓库
     */
    TypeModel.depot = 53;
    /**
     * 神秘商店
     */
    TypeModel.RefreshShop = 54;
    /**
     * 魔晶锻造
     */
    TypeModel.EnchantingEquipment = 55;
    /**
     * 修神
     */
    TypeModel.XiuSheng = 56;
    /**
     * 出生
     */
    TypeModel.Born = 59;
    /**
     * 关卡普通掉落
     */
    TypeModel.ChapterDrop = 60;
    /**
     * 关卡BOSS掉落
     */
    TypeModel.ChapterBossDrop = 61;
    /**
     * 装备熔炼
     */
    TypeModel.RongLian = 62;
    /**
     * 橙装
     */
    TypeModel.OrangeEquip = 63;
    /**
     * 幻兽
     */
    TypeModel.Pet = 64;
    /**
     * 活动塔罗牌
     */
    TypeModel.Tarot = 65;
    /**
     * 角色
     */
    TypeModel.Hero = 66;
    /**
     * 红装(魔龙装备)
     */
    TypeModel.RedEquip = 67;
    /**
     * 任务
     */
    TypeModel.Task = 68;
    /**
     * 公会任务
     */
    TypeModel.UnionTask = 69;
    /**
     * 全民BOSS
     */
    TypeModel.PublicBoss = 70;
    /**
     * 锁妖塔
     */
    TypeModel.SuoYaoTa = 71;
    /**
     * 幻兽塔
     */
    TypeModel.HuanShouTa = 72;
    /**
     * 女神
     */
    TypeModel.NvSheng = 73;
    /**
     * 月卡
     */
    TypeModel.Card = 74;
    /**
     * 时装
     */
    TypeModel.Fashion = 75;
    /**
     * 矿洞
     */
    TypeModel.Mineral = 76;
    /**
     * 材料副本
     */
    TypeModel.MatCopy = 77;
    /**
     * 个人BOSS副本
     */
    TypeModel.PersonalBoss = 78;
    /**
     * 神魂
     */
    TypeModel.ShenHun = 79;
    /**
     * 野战
     */
    TypeModel.WidePk = 80;
    /**
     * 特权,超级月卡
     */
    TypeModel.SuperCard = 81;
    /**
     * 无尽挑战
     */
    TypeModel.WuJin = 82;
    /**
     * 众神宝藏
     */
    TypeModel.GodBox = 83;
    /**
     * 头号玩家
     */
    TypeModel.FirstPlayer = 84;
    /**
     * 图鉴
     */
    TypeModel.Handbook = 85;
    /**
     * 推送礼包
     */
    TypeModel.TuiSongLiBao = 86;
    /**
     * 膜拜
     */
    TypeModel.Worship = 87;
    /**
     * 主城boss
     */
    TypeModel.mainCityBoss = 88;
    /**
     * 幸运转盘
     */
    TypeModel.LuckTurnTable = 89;
    /**
     * 幻武
     */
    TypeModel.Phantom = 90;
    /**
     * 军团战
     */
    TypeModel.UnionWar = 91;
    /**
     * 神秘商人
     */
    TypeModel.MysticTrader = 92;
    /**
     * 符文秘典
     */
    TypeModel.RuniSecret = 93;
    /**
     * 幻兽秘典
     */
    TypeModel.PetSecret = 94;
    /**
     * 印记秘典
     */
    TypeModel.MarkSecret = 95;
    /**
     * 红包
     */
    TypeModel.RedBag = 96;
    /**
     * 遗迹
     */
    TypeModel.LostTemple = 97;
    /**
     * 改名卡
     */
    TypeModel.UpdateNameCard = 98;
    /**
     * 跨天
     */
    TypeModel.DayChange = 99;
    /**
     * 战魂
     */
    TypeModel.ZhanHun = 100;
    /**
     * 兑换
     */
    TypeModel.Exchange = 101;
    /**
     * 注灵
     */
    TypeModel.ZhuLing = 102;
    /**
     * 拔剑
     */
    TypeModel.SwordWar = 103;
    /**
     * 神装降世
     */
    TypeModel.GodEquip = 104;
    /**
     * 传送门
     */
    TypeModel.PortalBoss = 105;
    /**
     * 开服竞技
     */
    TypeModel.SportActivity = 106;
    /**
     * 道具合成
     */
    TypeModel.ItemCompose = 107;
    /**
     * 等级福利礼包
     */
    TypeModel.LevelBag = 108;
    /**
     * 人气之星
     */
    TypeModel.CityWorship = 109;
    /**
     * 假日活动
     */
    TypeModel.HolidayActivity = 110;
    /**
     * 合服活动
     */
    TypeModel.HeFuActivity = 111;
    /**
     * 神殿探险
     */
    TypeModel.GodTemple = 112;
    /**
     * 开服活动
     */
    TypeModel.KaiFu = 113;
    /**
     * 命魂
     */
    TypeModel.LifeSoul = 114;
    /**
     * 增加技能书
     */
    TypeModel.AddSkillBook = 115;
    /**
     * 宠物重生
     */
    TypeModel.PetChongsheng = 116;
    /**
     * 限时豪礼
     */
    TypeModel.FunctionGift = 117;
    /**
     * 星辰装备
     */
    TypeModel.starEquip = 118;
    /**
     * 日常活动
     */
    TypeModel.commonActivity = 119;
    /**
     * 王者军团战
     */
    TypeModel.kingUnionWar = 120;
    /**
     * 神格
     */
    TypeModel.ShenGe = 121;
    /**
     * 功能礼包充值
     */
    TypeModel.FunctionGiftRecharge = 122;
    /**
     * 神骨
     */
    TypeModel.ShenGu = 123;
    /**
     * 埋骨禁地
     */
    TypeModel.MaiGuJinDi = 124;
    /**
     * 精炼
     */
    TypeModel.JingLian = 125;
    /**
     * 绝地求生
     */
    TypeModel.JueDi = 126;
    /**
     * 组队副本
     */
    TypeModel.TeamCopy = 127;
    /**
     * 驯龙
     */
    TypeModel.XunLong = 128;
    /**
     * 神器
     */
    TypeModel.shenQi = 129;
    /**
     * 玩吧平台礼包
     */
    TypeModel.WanBaGift = 130;
    /**
     * 神陨之地
     */
    TypeModel.ShenYunZhiDi = 131;
    /**
     * 好友切磋
     */
    TypeModel.FriendChallenge = 132;
    /**
     * 巅峰之战
     */
    TypeModel.DianFengZhiZhan = 133;
    /**
     * 战骑
     */
    TypeModel.ZhanQi = 134;
    /**
     * 幻兽分解
     */
    TypeModel.RecoverPet = 135;
    /**
     * 竞技礼包
     */
    TypeModel.JingJiLiBao = 138;
    /**
     * 连充活动
     */
    TypeModel.LianChongSongLi = 139;
    /**
     * 无限手套
     */
    TypeModel.wuxianGlove = 140;
    /**
     * 周卡
     */
    TypeModel.weekCard = 141;
    /**
     * 跨服BOSS
     */
    TypeModel.KuaFuBoss = 144;
    /**
     * 幸运夺宝
     */
    TypeModel.XinYunDuoBao = 144;
    /**
     * 网龙接口
     */
    TypeModel.WangLongAPI = 145;
    /**
     * 跨年礼包
     */
    TypeModel.KuaNianGift = 146;
    /**
     * 功能开启冲刺活动
     */
    TypeModel.FunctionSpurt = 147;
    /**
     * 交易行拾取到背包
     */
    TypeModel.TradePickUp = 148;
    /**
     * 交易行买卖道具
     */
    TypeModel.TradeBuyOrSell = 149;
    /**
     * 交易行下架
     */
    TypeModel.TradeCancelSell = 150;
    /**
     * 宠物天梯
     */
    TypeModel.PetLadder = 151;
    /**
     * 新装备
     */
    TypeModel.NewEquip = 152;
    /**
     * 幻兽森林
     */
    TypeModel.PetWoods = 155;
    /**
     * 宝物
     */
    TypeModel.SG_BaoWu = 1000;
    /**
     * 等级提升
     */
    TypeModel.LevelUpgrade = 1001;
    /**
     * 酒馆
     */
    TypeModel.Tavern = 1002;
    /**
     * 神兵
     */
    TypeModel.ShenBing = 1003;
    /**
     * 文官
     */
    TypeModel.WenGuan = 1004;
    /**
     * 契约
     */
    TypeModel.qiYue = 1005;
    /**
     * 脱神魂
     */
    TypeModel.TaskOffShenHun = 1006;
    //武将寻访
    TypeModel.XunFang = 1007;
    /**
     * 酒馆积分
     */
    TypeModel.TavernJiFen = 1008;
    /**
     * 道具分解
     */
    TypeModel.ItemFenJie = 1009;
    /**
     * 仙童
     */
    TypeModel.XianTong = 1010;
    /**
     * 红颜
     */
    TypeModel.HongYan = 1011;
    /**
     * 灭世荒漠
     */
    TypeModel.MieShiHuangMo = 1012;
    /**
     * 逐鹿中原
     */
    TypeModel.ZhuLuZhongYuan = 1013;
    /**
     * 慕名而来
     */
    TypeModel.MuMingErLai = 1014;
    /**
      * 酒馆
      */
    TypeModel.SmokePet = 11039;
    /**
      * 道具合成（此处用在武将碎片合成）
      */
    TypeModel.PetCompound = 10045;
    /**
      * 随机武将碎片合成
      */
    TypeModel.PetRandomCompound = 1021;
    /**暂定自动升级过时材料不够不弹物品获取Tips的限制等级*/
    TypeModel.LimitLevel = 30;
    return TypeModel;
}());
__reflect(TypeModel.prototype, "TypeModel");

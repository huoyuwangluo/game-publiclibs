var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var UserfaceName = (function () {
        function UserfaceName() {
        }
        /**平台相关的界面*/
        UserfaceName.yellowDiamond = "yellowDiamond";
        UserfaceName.fangChenMi = "fangChenMi";
        UserfaceName.dianjingGift = "dianjingGift";
        UserfaceName.btnWeiDuan = "btnWeiDuan";
        UserfaceName.xinyueGift = "xinyueGift";
        UserfaceName.yearsGift = "yearsGift";
        UserfaceName.wanbaAiwanAd = "wanbaAiwanAd";
        UserfaceName.btnAiwanIos = "btnAiwanIos";
        /**主界面*/
        UserfaceName.main = "main";
        // /**关卡BOSS按钮 */
        // public static buttonChapter: string = "buttonChapter";
        // /**寻宝按钮*/
        // public static buttonTreasureTarot: string = "buttonTreasureTarot";
        // /**自动挑战按钮 */
        // public static buttonAutofight: string = "buttonAutofight";
        // /**开服活动按钮 */
        // public static buttonServerOpenctivity: string = "buttonServerOpenctivity";
        // /**女神激活按钮 */
        // public static buttonGoddessActive: string = "buttonGoddessActive";
        // /**女神激活界面 */
        // public static goddessActivateWarn: string = "goddessActivateWarn";
        // public static login: string = "login";
        // public static loginServer: string = "serverlist";
        // public static serverList: string = "changeServer";
        /**创角界面 */
        UserfaceName.createactor = "createactor";
        /**将领 */
        UserfaceName.role = "role";
        /**时装 */
        UserfaceName.roleFashion = "roleFashion";
        /**翅膀神羽 */
        UserfaceName.roleWingGod = "roleWingGod";
        /**法宝*/
        UserfaceName.roleFaBao = "roleFaBao";
        /**巅峰之战*/
        UserfaceName.peaksBattle = "peaksBattle";
        /**巅峰之战下注*/
        UserfaceName.peaksBattleBet = "peaksBattleBet";
        /**跨服巅峰之战*/
        UserfaceName.peaksBattleCross = "peaksBattleCross";
        /**跨服巅峰之战下注*/
        UserfaceName.peaksBattleCrossBet = "peaksBattleCrossBet";
        /**登录有礼*/
        UserfaceName.loginAward = "loginAward";
        /**幸运宝盒*/
        UserfaceName.luckyBox = "luckyBox";
        /**背包 */
        UserfaceName.bag = "bag";
        /**官职*/
        UserfaceName.guanzhi = "guanzhi";
        /**坐骑技能升级 */
        UserfaceName.RoleZhanQiTalentUp = "RoleZhanQiTalentUp";
        /**副本 */
        UserfaceName.material = "material";
        /**图鉴 */
        UserfaceName.tuJianUp = "tuJianUp";
        /**试炼塔 武神塔 武魂塔 */
        UserfaceName.explorePetpagoda = "explorePetpagoda";
        /**BOSS */
        UserfaceName.copyboss = 'copyboss';
        /**邮件*/
        UserfaceName.mail = "mail";
        /**邮件附件*/
        // public static mailPop: string = "mailPop";
        /**商城*/
        UserfaceName.shop = "shop";
        /**任务*/
        UserfaceName.task = "task";
        /**采集*/
        // public static taskcollect: string = "taskcollect";
        /**宝藏*/
        UserfaceName.treasure = "treasure";
        /**奖励预览*/
        UserfaceName.treasureAllprize = "treasureAllprize";
        /**vip*/
        UserfaceName.vip = "vip";
        /**福利 */
        UserfaceName.welfare = "welfare";
        /**排行*/
        UserfaceName.rank = "rank";
        /**排行*/
        UserfaceName.rankMain = "rankMain";
        /**社交*/
        UserfaceName.sociality = "sociality";
        /**私聊*/
        UserfaceName.privateChat = "privateChat";
        /**推荐好友*/
        UserfaceName.tuijianFriend = "tuijianFriend";
        /**好友申请*/
        UserfaceName.applyFriend = "applyFriend";
        /**离线收益*/
        //public static offline: string = "offline";
        /**首冲*/
        UserfaceName.firstRecharge = "firstRecharge";
        /**专属礼包*/
        UserfaceName.zhuanshuGift = "zhuanshuGift";
        /**设置*/
        UserfaceName.setting = "setting";
        /**竞技 */
        UserfaceName.sports = "sports";
        /**段位奖励 */
        UserfaceName.ladderReward = "ladderReward";
        /**段位排行 */
        UserfaceName.ladderRanking = "ladderRanking";
        /**演武排行 */
        UserfaceName.ladderRanking1 = "ladderRanking1";
        /**欢迎界面 */
        UserfaceName.welcome = "welcome";
        UserfaceName.playerRelife = "playerRelife";
        /**胜利界面 */
        //public static copyWinTip: string = "copyWinTip";
        /**失败界面 */
        //public static copyFailTip: string = "copyFailTip";
        /**限时惊喜 */
        UserfaceName.xianshilibao = "xianshilibao";
        /**限时豪礼 */
        UserfaceName.limitBigGift = "limitBigGift";
        /**合服 */
        UserfaceName.kefu = "kefu";
        /**阵营战*/
        UserfaceName.legionWar = "legionWar";
        /**限时活动*/
        UserfaceName.exploreAtivities = "exploreAtivities";
        /**膜拜*/
        UserfaceName.worship = "worship";
        /**夏日活动*/
        UserfaceName.activitysumme = "activitysumme";
        /**平台登录 */
        UserfaceName.logInAward = "logInAward";
        /**宝盒 */
        UserfaceName.luckybox = "luckybox";
        /**实名认证 */
        UserfaceName.attestation = "attestation";
        /**关注 */
        UserfaceName.guanzhu = "guanzhu";
        /**邀请 */
        UserfaceName.yaoqing = "yaoqing";
        /**收藏 */
        UserfaceName.shoucang = "shoucang";
        /**获得称号 */
        UserfaceName.getTitle = "getTitle";
        /**合服活动 */
        UserfaceName.activityHeFu = "activityHeFu";
        /**神殿商店 */
        UserfaceName.shendianShop = "shendianShop";
        /**幻界排行 */
        UserfaceName.huanjieRank = "huanjieRank";
        /**阵营捐献排行 */
        UserfaceName.legiondonateRank = "legiondonateRank";
        /**王者阵营战 */
        UserfaceName.kinglegionwar = "kinglegionwar";
        /**攻击*/
        UserfaceName.attackinfo = "attackinfo";
        /**组队 */
        UserfaceName.teamCopy = "teamcopy";
        /**幸运夺宝 */
        UserfaceName.yearsGiftPreview = "yearsGiftPreview";
        /**跨年礼包 */
        UserfaceName.kuanainGift = "kuanainGift";
        /**冲刺活动 */
        UserfaceName.activitysprint = "activitysprint";
        /**跨服的界面 */
        UserfaceName.crossWarKingRank = "crossWarKingRank";
        UserfaceName.crossWarKingHall = "crossWarKingHall";
        UserfaceName.crossServer = "crossServer";
        UserfaceName.crossBossRewardTip = "crossBossRewardTip";
        UserfaceName.crossWarKingPetList = "crossWarKingPetList";
        /**阵营俸禄**/
        UserfaceName.LegionFengLu = "LegionFengLu";
        /**阵营阵旗**/
        UserfaceName.LegionZhenQi = "LegionZhenQi";
        /**阵营*/
        UserfaceName.legion = "legion";
        /**阵营成员列表*/
        UserfaceName.legionMembermanage = "legionMembermanage";
        /**阵营任务*/
        UserfaceName.legionTask = "legionTask";
        /**阵营商城*/
        UserfaceName.legionShop = "legionShop";
        /**阵营特惠*/
        UserfaceName.legionBuy = "legionBuy";
        /**阵营分红，红包*/
        UserfaceName.legionRedPacket = "legionRedPacket";
        /**阵营列表*/
        UserfaceName.legionList = "legionList";
        /**交易*/
        UserfaceName.tradingSell = "tradingSell";
        /**上架*/
        UserfaceName.tradingSellShangJia = "tradingSellShangJia";
        /**交易记录*/
        UserfaceName.tradingSellRecord = "tradingSellRecord";
        /**宝物*/
        UserfaceName.baowu = "baowu";
        /**契约分解*/
        UserfaceName.contractresolve = "contractresolve";
        /**装备穿戴*/
        UserfaceName.roleEquipDress = "roleEquipDress";
        /**寻访*/
        UserfaceName.xunFang = "xunFang";
        /**回收*/
        UserfaceName.bagRecycle = "bagRecycle";
        /**武将列表*/
        UserfaceName.petList = "petList";
        /**武将进阶需要的武将列表*/
        UserfaceName.petStepList = "petStepList";
        /**功能预览*/
        UserfaceName.funPreview = "funPreview";
        /**三国日常 */
        UserfaceName.sgDaily = "sgDaily";
        /**三国开服 */
        UserfaceName.sgOpenServer = "sgOpenServer";
        /**每日充值 */
        UserfaceName.meirichongzhi = "meirichongzhi";
        /**一元购买 */
        UserfaceName.oneYuanBuy = "oneYuanBuy";
        /**橙装分解 */
        UserfaceName.chengzhuangFenJie = "chengzhuangFenJie";
        /**魔神封印 */
        UserfaceName.moshenFengYin = "moshenFengYin";
        /**小组竞技 */
        UserfaceName.samllRank = "samllRank";
        UserfaceName.smithyTeam = "smithyTeam";
        UserfaceName.exploreSmithy = "exploreSmithy";
        UserfaceName.smithyTalent = "smithyTalent";
        /**王之疆场 */
        UserfaceName.kingBattle = "kingBattle";
        /**无双战场 */
        UserfaceName.battlefieldMain = "battlefieldMain";
        /**无双战场准备界面 */
        UserfaceName.battlefieldReady = "battlefieldReady";
        /**无双战场结算界面 */
        UserfaceName.battlefieldEnd = "battlefieldEnd";
        /**车轮战结算界面 */
        UserfaceName.CampbattlefieldEnd = "CampbattlefieldEnd";
        /**将军令 */
        UserfaceName.token = "token";
        /**神兵预览 */
        UserfaceName.smithyCiRi = "smithyCiRi";
        /**vip特权 */
        UserfaceName.vipTeQuan = "vipTeQuan";
        /**巅峰赛 */
        UserfaceName.topBattle = "topBattle";
        /**国战 */
        UserfaceName.campBattleMain = "campBattleMain";
        UserfaceName.campBattleJoin = "campBattleJoin";
        UserfaceName.campBattleCheckPlayer = "campBattleCheckPlayer";
        /**挂机 */
        UserfaceName.xpMain = "xpMain";
        /**国战预告 */
        UserfaceName.countryWarAdvanceNotice = "countryWarAdvanceNotice";
        /**圣旨任务 */
        // public static shengzhi: string = "shengzhi";
        /**圣旨任务 */
        UserfaceName.tongjiling = "tongjiling";
        /**圣旨任务领取 */
        UserfaceName.shengzhiTask = "shengzhiTask";
        /**强征 */
        UserfaceName.qiangzheng = "qiangzheng";
        /**特权卡到期 */
        UserfaceName.tequanExpire = "tequanExpire";
        // /**招募武将*/
        // public static smokePet: string = "smokePet";
        /**兵种*/
        UserfaceName.legioncorps = "legioncorps";
        /**图鉴*/
        UserfaceName.tujian = "tujian";
        /**赐婚 */
        UserfaceName.hongYanCiHun = "hongYanCiHun";
        /**兵法列表 */
        UserfaceName.bingfaList = "bingfaList";
        /**兵法重铸*/
        UserfaceName.bingfaZhongZhu = "bingfaZhongZhu";
        /**豪华奖池排行榜*/
        UserfaceName.haohuaRank = "haohuaRank";
        /**布阵*/
        UserfaceName.buzhen = "buzhen";
        /**偶遇仙人*/
        UserfaceName.ouYuXianRen = "ouYuXianRen";
        /**七日目标*/
        UserfaceName.sevenDayTask = "sevenDayTask";
        /**送诸葛亮*/
        UserfaceName.zhugeliang = "zhugeliang";
        /**送灵兽*/
        UserfaceName.animalFloat = "animalFloat";
        /**专属特权*/
        UserfaceName.zhuanshuTeQuan = "zhuanshuTeQuan";
        /**武将玩法 */
        UserfaceName.petWanFa = "petWanFa";
        /**名将远征 */
        UserfaceName.yuanzheng = "yuanzheng";
        /**兵分三路 */
        UserfaceName.bingfensanlu = "bingfensanlu";
        /**兵分三路排行 */
        UserfaceName.bingfensanluRank = "bingfensanluRank";
        /**吐槽 //strategy攻略*/
        UserfaceName.strategy = "strategy";
        /**聚义堂 //共鸣功能*/
        UserfaceName.gongming = "gongming";
        /**武将总览*/
        UserfaceName.allPetList = "allPetList";
        /**武将分解*/
        UserfaceName.petFenJie = "petFenJie";
        /**兑换商店*/
        UserfaceName.changeShop = "changeShop";
        /**圣旨主入口*/
        UserfaceName.shengZhiMain = "shengZhiMain";
        /**限时礼包*/
        UserfaceName.xianshiGift = "xianshiGift";
        /**绝版礼包*/
        UserfaceName.juebanGift = "juebanGift";
        /**时间追赶大礼包 */
        UserfaceName.timePickGift = "timePickGift";
        /**国战 */
        UserfaceName.kingwar = "kingwar";
        /**异族来袭 */
        UserfaceName.monster = "monster";
        /**助战 */
        UserfaceName.zhuzhan = "zhuzhan";
        /**助战总览 */
        UserfaceName.zhuzhanAll = "zhuzhanAll";
        /**限时活动*/
        UserfaceName.activityLimit = "activityLimit";
        /**限时活动1*/
        UserfaceName.activityLimit1 = "activityLimit1";
        /**宠物*/
        UserfaceName.animal = "animal";
        /**分享*/
        UserfaceName.share = "share";
        /**招募战友*/
        UserfaceName.shareFriend = "shareFriend";
        /**特殊的界面 */
        /**掠夺 */
        UserfaceName.chapterBossMainView = "chapterBossMainView";
        /**征收 */
        UserfaceName.zhengshou = "zhengshou";
        /** 特别处理  给有其它入口系统增加一个主界面入口*/
        /**特权主界面入口*/
        UserfaceName.mainTeQuan = "mainTeQuan";
        /**功勋兑换商城主界面入口 */
        UserfaceName.mainGongxunShop = "mainGongxunShop";
        /**战力主界面入口 */
        UserfaceName.mainZhanLing = "mainZhanLing";
        return UserfaceName;
    }());
    s.UserfaceName = UserfaceName;
    __reflect(UserfaceName.prototype, "s.UserfaceName");
})(s || (s = {}));

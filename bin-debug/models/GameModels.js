var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameModels = (function () {
    function GameModels() {
    }
    GameModels.initializeLogin = function (data) {
        GameModels.timer = new mo.ModelTimer();
        GameModels.login = new mo.ModelLogin(data);
        GameModels.user = new mo.ModelUser();
        GameModels.equip = new mo.ModelEquip();
        GameModels.platform = new mo.ModelPlatform();
    };
    GameModels.initialize = function (data) {
        //系统弹出提示框
        GameModels.sysNotice = new mo.ModelSysNotice();
        GameModels.world = new mo.ModelWorld();
        GameModels.world.initializeData(data.CharInfo);
        GameModels.clientTag = new mo.ModelClientTag();
        GameModels.dataSet = new mo.ModelDataSetting();
        GameModels.platformActivity = new mo.ModelPlatformActivity();
        GameModels.serverTime = new mo.ModelServerTime();
        GameModels.sgActivity = new mo.ModelSgActivity();
        GameModels.activitySummer = new mo.ModelSgActivitySummer();
        GameModels.activityHeFu = new mo.ModelActivityHeFu();
        GameModels.setting = new mo.ModelSetting();
        GameModels.funcs = new mo.ModelFuncs();
        GameModels.friends = new mo.ModelFriend();
        GameModels.chapter = new mo.ModelSceneChapter();
        GameModels.animal = new mo.ModelAnimal();
        GameModels.task = new mo.ModelTask();
        GameModels.bag = new mo.ModelBag();
        GameModels.shop = new mo.ModelShop();
        GameModels.changeShop = new mo.ModelChangeShop();
        GameModels.mail = new mo.ModelMail();
        GameModels.achievement = new mo.ModelAchievement();
        GameModels.pet = new mo.ModelPet();
        GameModels.tavern = new mo.ModelTavern();
        GameModels.jiangxing = new mo.ModelJiangXing();
        GameModels.role = new mo.ModelRole();
        GameModels.ranking = new mo.ModelRanking();
        GameModels.copyMaterial = new mo.ModelGameMaterial();
        GameModels.copyBoss = new mo.ModelGameBoss();
        GameModels.copyPagoda = new mo.ModelGamePagoda();
        GameModels.chat = new mo.ModelChat();
        GameModels.legion = new mo.ModelLegion();
        GameModels.welfare = new mo.ModelWelfare();
        GameModels.xpExp = new mo.ModelXPExperencet();
        GameModels.ladder = new mo.ModelLadder();
        GameModels.ladder1 = new mo.ModelLadder1();
        GameModels.fashion = new mo.ModelFashion();
        GameModels.activityNotice = new mo.ModelActivityNotice();
        GameModels.vip = new mo.ModelVip();
        GameModels.city = new mo.ModelCity();
        GameModels.recharge = new mo.ModelRecharge();
        GameModels.sceneWoorsServer = new mo.ModelSceneWoorsBoss();
        GameModels.warKing = new mo.ModelWarKing();
        GameModels.handBook = new mo.ModelHandBook();
        GameModels.hecheng = new mo.ModelHeCheng();
        GameModels.sceneLegin = new mo.ModelSceneLegion();
        GameModels.sceneKingBattle = new mo.ModelSceneKingBattle();
        GameModels.sceneCrossWarKing = new mo.ModelSceneWarKing();
        GameModels.scene = new mo.ModelScene();
        GameModels.sceneEveryBoss = new mo.ModelSceneEveryBoss();
        GameModels.sceneEveryBossGuide = new mo.ModelSceneEveryBossGuide();
        GameModels.sceneGodDie = new mo.ModelSceneGodDie();
        GameModels.hores = new mo.ModelHores();
        GameModels.tradingSell = new mo.ModelTradingSell();
        GameModels.shenbing = new mo.ModelShenBing();
        GameModels.wenguanTask = new mo.ModelWenGuanTask();
        GameModels.hongYan = new mo.ModelHongYan();
        GameModels.gameBook = new mo.ModelGameBook();
        GameModels.smithy = new mo.ModelSmithy();
        GameModels.redPoint = new mo.ModelRedPoint();
        GameModels.campBattle = new mo.ModelCampBattle();
        GameModels.topBattle = new mo.ModelTopBattle();
        GameModels.oneCountRedPoint = new mo.ModelOneCountRedPoint();
        GameModels.zhuanshuGift = new mo.ModelZhuanShuGift();
        GameModels.notifyGift = new mo.ModelNotifyGift();
        GameModels.shengzhi = new mo.ModelShengZhi();
        GameModels.petChoose = new mo.ModelPetChoose();
        GameModels.upStar = new mo.ModelUpStar();
        GameModels.firstRecharge = new mo.ModelFirstRecharge1();
        GameModels.zhanling = new mo.ModelZhanLing();
        GameModels.smokepet = new mo.ModelSmokePet();
        GameModels.corps = new mo.ModelCorps();
        GameModels.guide = new mo.ModelGuide();
        GameModels.ouYuXianRen = new mo.ModelOuYuXianRen();
        GameModels.shilita = new mo.ModelShiLiTa();
        GameModels.limitTarget = new mo.ModelLimitTargetTask();
        GameModels.sevenDayTask = new mo.ModelSevenDayTask();
        GameModels.petGroup = new mo.ModelPetGroup();
        GameModels.kingwar = new mo.ModelKingWar();
        GameModels.mingJiangTask = new mo.ModelMingJiangTask();
        GameModels.common = new mo.ModelCommon();
        GameModels.share = new mo.ModelShare();
        //GameModels.role.initializeSkillData(data.CharInfo.Skills, data.CharInfo.WuShuangInfo);
        GameModels.task.initializeData(data.CharInfo.Task);
        GameModels.pet.initializeData(data.CharInfo.PetRoomList); //初始化武将
        // GameModels.legion.initializeData(data.CharInfo.UnionState);
        GameModels.serverTime.initializeData(data.CharInfo.OpenServiceTime, data.CharInfo.OpenServiceWhichDay, data.CharInfo.Birthday, data.CharInfo.SportsActivityValue);
        GameModels.sceneLegin.initializeData(data.CharInfo.OpenServiceWhichDay);
        GameModels.mail.initMailRet(data.CharInfo.HasNewMail);
        //保持状态为最后一个初始化
        GameModels.state = new GameRedState();
    };
    return GameModels;
}());
__reflect(GameModels.prototype, "GameModels");

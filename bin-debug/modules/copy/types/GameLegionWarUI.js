var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var copy;
(function (copy) {
    var GameLegionWarUI = (function (_super) {
        __extends(GameLegionWarUI, _super);
        function GameLegionWarUI() {
            var _this = _super.call(this) || this;
            _this._isShiedPet = false;
            _this._lastCancalAutoAttackTime = 0;
            /**顺序是永远是魏蜀吴，isClickIndex==2一定是防守
             * 如果自己是魏 那么isClickIndex==0就是攻蜀isClickIndex==1就是攻吴
             **/
            _this._curSelectCamp = "";
            _this._findMonsterIds = [];
            _this._defenceSide1 = [];
            _this._defenceSide2 = [];
            _this._defenceHome = [];
            //选择敌方单位
            _this._curTargetFlagCamp = ""; //阵营塔死完，当前中哪个阵营的旗子
            _this._curTargetPlayerId = ""; //点击玩家头像选中玩家进行攻击
            _this._clickTargetArr = [_this.ui.imgAtt1, _this.ui.imgAtt2, _this.ui.imgAtt3];
            _this._bossHeadList = [_this.ui.godDieBossHead1, _this.ui.godDieBossHead2, _this.ui.godDieBossHead3, _this.ui.godDieBossHead4, _this.ui.godDieBossHead5];
            return _this;
        }
        Object.defineProperty(GameLegionWarUI, "instance", {
            get: function () {
                if (!GameLegionWarUI._instance) {
                    GameLegionWarUI._instance = new GameLegionWarUI();
                }
                return GameLegionWarUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameLegionWarUI.prototype.enter = function (userGame, battleScene, battleAttackHandler, userPlayer) {
            this._userGame = userGame;
            this._battleScene = battleScene;
            this._battleAttackHandler = battleAttackHandler;
            this._userPlayer = userPlayer;
            this._userPlayer.onTargetChange(this, this.userTargetChangeHandler);
            this._userPlayer.vo.onTeamDead(this, this.userPlayerDeadHandler);
            this._userPlayer.vo.onTeamRelife(this, this.userPlayerRelifeHandler);
            GameModels.scene.onSightAdd(this, this.sightAddHandler);
            GameModels.scene.onSightRemove(this, this.sightRemoveHandler);
            this.ui.legionWarRankGroup.x = -260;
            this.ui.legionRight.visible = true;
            this.ui.bloodGroup.visible = false;
            this.ui.legionWarRank.enter();
            this.ui.labProgressScore.text = GameModels.sceneLegin.curMyScore + "/" + GameModels.sceneLegin.personScoreReward[GameModels.sceneLegin.personScoreReward.length - 1].value.split("&")[0];
            this.ui.progressBar.maximum = parseInt(GameModels.sceneLegin.personScoreReward[GameModels.sceneLegin.personScoreReward.length - 1].value.split("&")[0]);
            this.ui.progressBar.value = GameModels.sceneLegin.curMyScore;
            this.ui.legionRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toRight, this);
            this.ui.legionLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toLeft, this);
            this.ui.listAttacker.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
            this.ui.btnAddInspire.visible = true;
            this.ui.btnAddInspire.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.inspireKingUnionHandler, this);
            this.ui.btnArmyAddInspire.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.inspireKingUnionHandler, this);
            this.ui.imgAtt1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTarget, this);
            this.ui.imgAtt2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTarget, this);
            this.ui.imgAtt3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTarget, this);
            for (var i = 0; i < this._bossHeadList.length; i++) {
                this._bossHeadList[i].enableHandler();
            }
            if (GameModels.user.player.wuguanLevel <= 1) {
                this.ui.allArmyGroup.visible = true;
                this.ui.allArmyJcGroup.visible = true;
            }
            else {
                this.ui.allArmyGroup.visible = false;
                this.ui.allArmyJcGroup.visible = false;
            }
            this.ui.imgSelected.visible = false;
            GameModels.sceneLegin.onScoreInitHandler(this, this.upLegionWarData);
            //GameModels.sceneLegin.onScorePersonChangeHandler(this, this.upLegionWarData);
            //GameModels.sceneLegin.onScoreTeamChangeHandler(this, this.upLegionWarData);
            GameModels.sceneLegin.onGuWuCountChangHandler(this, this.onGuWuCountChangHandler);
            GameModels.sceneLegin.onWuDiChangHandler(this, this.updateBossInfo);
            this._isShiedPet = false;
            this.ui.listAttacker.dataProvider = GameModels.sceneLegin.attackersCollection;
            this.upLegionWarData();
            this.onGuWuCountChangHandler();
            this.updataClickTargetChange();
            this.updateBossInfo();
            if (app.gameContext.typeGame == TypeGame.LEGION_WAR) {
                if (!game.state.getItem(GameModels.user.player.uid, TypeSetting.ENTER_LEGION_WAR) && this.ui.imgAtt1) {
                    mg.guideManager.guideImmediately(this.ui.imgAtt1, Language.J_DJKQDY, TypeDirection.DOWN);
                }
            }
            utils.timer.loop(100, this, this.checkAutoSelectTarget);
            utils.timer.loop(300, this, this.refreshAttackList);
        };
        GameLegionWarUI.prototype.exit = function () {
            mg.guideManager.guideStopImmediately(this.ui.imgAtt1);
            utils.timer.clear(this, this.checkAutoSelectTarget);
            utils.timer.clear(this, this.refreshAttackList);
            GameModels.scene.offSightAdd(this, this.sightAddHandler);
            GameModels.scene.offSightRemove(this, this.sightRemoveHandler);
            this.ui.legionWarRankGroup.x = -260;
            this.ui.legionRight.visible = true;
            this.ui.listAttacker.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
            this.ui.legionRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toRight, this);
            this.ui.legionLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toLeft, this);
            this.ui.btnAddInspire.visible = false;
            this.ui.btnAddInspire.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.inspireKingUnionHandler, this);
            this.ui.btnArmyAddInspire.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.inspireKingUnionHandler, this);
            this.ui.imgAtt1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTarget, this);
            this.ui.imgAtt2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTarget, this);
            this.ui.imgAtt3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTarget, this);
            for (var i = 0; i < this._bossHeadList.length; i++) {
                this._bossHeadList[i].disableHandler();
            }
            GameModels.sceneLegin.offScoreInitHandler();
            GameModels.sceneLegin.offScorePersonChangeHandler();
            GameModels.sceneLegin.offScoreTeamChangeHandler();
            GameModels.sceneLegin.offOwnerChange();
            GameModels.sceneLegin.offGuWuCountChangHandler();
            GameModels.sceneLegin.offWuDiChangHandler();
            if (this._userPlayer) {
                this._userPlayer.offTargetChange(this, this.userTargetChangeHandler);
                this._userPlayer.vo.offTeamDead(this, this.userPlayerDeadHandler);
                this._userPlayer.vo.offTeamRelife(this, this.userPlayerRelifeHandler);
                this._userPlayer = null;
            }
            this._battleScene = null;
            this._userGame = null;
        };
        GameLegionWarUI.prototype.clickTarget = function (e) {
            for (var i = 0; i < this._clickTargetArr.length; i++) {
                if (e.currentTarget == this._clickTargetArr[i]) {
                    this._curTargetPlayerId = "";
                    this.updataClickTargetChange(i);
                    if (!game.state.getItem(GameModels.user.player.uid, TypeSetting.ENTER_LEGION_WAR) && this.ui.imgAtt1) {
                        mg.guideManager.guideStopImmediately(this.ui.imgAtt1);
                        game.state.setItem(GameModels.user.player.uid, TypeSetting.ENTER_LEGION_WAR, true);
                    }
                    break;
                }
            }
        };
        GameLegionWarUI.prototype.cancelAutoAttackCamp = function () {
            this._curTargetPlayerId = "";
            this._lastCancalAutoAttackTime = egret.getTimer();
            this.updataClickTargetChange();
        };
        //更新我方BOSS状态
        GameLegionWarUI.prototype.updateBossInfo = function () {
            var bossId = GameModels.sceneLegin.getBoosId(GameModels.user.player.sceneFlag);
            for (var i = 0; i < bossId.length; i++) {
                if (bossId[i]) {
                    this._bossHeadList[i].visible = true;
                    this._bossHeadList[i].initializeData(bossId[i]);
                }
            }
        };
        GameLegionWarUI.prototype.updataSelected = function (boss) {
            var bossId = GameModels.sceneLegin.getBoosId(GameModels.user.player.sceneFlag);
            var pos = bossId.indexOf(boss);
            if (GameModels.user.player.wuguanLevel <= 3 && pos != 2) {
                this.ui.imgSelected.visible = true;
                this.ui.imgSelected.x = this._bossHeadList[pos].x;
            }
            else {
                this.ui.imgSelected.visible = false;
            }
            for (var i = 0; i < this._bossHeadList.length; i++) {
                this._bossHeadList[i].initBtn();
            }
        };
        GameLegionWarUI.prototype.updataClickTargetChange = function (isClickIndex) {
            if (isClickIndex === void 0) { isClickIndex = -1; }
            this.ui.imgSelecd.visible = false;
            this.ui.imgAtt3.source = "battlefield_json.img_guard_1";
            var selectCamp = "";
            if (GameModels.user.player.sceneFlag == "1") {
                this.ui.imgAtt1.source = "battlefield_json.img_shu_1";
                this.ui.imgAtt2.source = "battlefield_json.img_wu_1";
                if (isClickIndex == 0) {
                    selectCamp = "2";
                    this._findMonsterIds = [6703001, 6703002, 6703003];
                }
                else if (isClickIndex == 1) {
                    selectCamp = "3";
                    this._findMonsterIds = [6704001, 6704004, 6704005];
                }
                else if (isClickIndex == 2) {
                    selectCamp = "1";
                    this._defenceSide1 = [6702002, 6702003];
                    this._defenceSide2 = [6702004, 6702005];
                    this._defenceHome = [6702001];
                }
            }
            else if (GameModels.user.player.sceneFlag == "2") {
                this.ui.imgAtt1.source = "battlefield_json.img_wei_1";
                this.ui.imgAtt2.source = "battlefield_json.img_wu_1";
                if (isClickIndex == 0) {
                    selectCamp = "1";
                    this._findMonsterIds = [6702001, 6702002, 6702003];
                }
                else if (isClickIndex == 1) {
                    selectCamp = "3";
                    this._findMonsterIds = [6704001, 6704002, 6704003];
                }
                else if (isClickIndex == 2) {
                    selectCamp = "2";
                    this._defenceSide1 = [6703002, 6703003];
                    this._defenceSide2 = [6703004, 6703005];
                    this._defenceHome = [6703001];
                }
            }
            else {
                this.ui.imgAtt1.source = "battlefield_json.img_wei_1";
                this.ui.imgAtt2.source = "battlefield_json.img_shu_1";
                if (isClickIndex == 0) {
                    selectCamp = "1";
                    this._findMonsterIds = [6702001, 6702004, 6702005];
                }
                else if (isClickIndex == 1) {
                    selectCamp = "2";
                    this._findMonsterIds = [6703001, 6703004, 6703005];
                }
                else if (isClickIndex == 2) {
                    selectCamp = "3";
                    this._defenceSide1 = [6704002, 6704003];
                    this._defenceSide2 = [6704004, 6704005];
                    this._defenceHome = [6704001];
                }
            }
            this._curSelectCamp = selectCamp;
            this._curTargetFlagCamp = "";
            if (isClickIndex < 0)
                return;
            this.ui.imgSelecd.visible = true;
            for (var i = 0; i < this._clickTargetArr.length; i++) {
                if (i == isClickIndex) {
                    this._clickTargetArr[i].source = this._clickTargetArr[i].source.toString().split("_1")[0] + "_2";
                    this.ui.imgSelecd.x = this._clickTargetArr[i].x;
                    this.ui.imgSelecd.y = this._clickTargetArr[i].y;
                    break;
                }
            }
            this.checkAutoSelectTarget();
        };
        GameLegionWarUI.prototype.getDistanceByVO = function (vo1, vo2) {
            return battle.manager.getNodeSpace2(vo1.tileX, vo1.tileY, vo2.tileX, vo2.tileY);
        };
        GameLegionWarUI.prototype.checkAutoSelectTarget = function () {
            if (this._userPlayer == null || this._userPlayer.isTeamAllDead())
                return true;
            var selectCamp = this._curSelectCamp;
            var findEnemyCamp = selectCamp;
            var leader = this._userPlayer.getTeamLeader();
            var isMySelfCamp = false;
            if (selectCamp == this._userPlayer.vo.sceneFlag) {
                isMySelfCamp = true;
                findEnemyCamp = "";
            }
            //leader = null;
            if (leader == null || leader.vo == null) {
                return;
            }
            var targetVO = null;
            var targetCamp = ""; //目标阵营
            var targetMasterId = ""; //目标玩家的id
            var checkAutoAttack = false;
            //if (this._userPlayer.target) {
            if (leader.vo) {
                targetVO = leader.vo.target;
                if (targetVO != null && !targetVO.isTeamAllDead) {
                    targetCamp = targetVO.sceneFlag;
                    if (targetVO.master != null) {
                        targetMasterId = targetVO.master.uid;
                    }
                }
            }
            if (this._curTargetPlayerId != "" && this._curTargetPlayerId == targetMasterId) {
                return true; //当前目标就是选中的玩家
            }
            if (selectCamp != "" && targetCamp != selectCamp && this._curTargetFlagCamp != selectCamp) {
                var sightMonsters = GameModels.scene.getObjectVOList(TypeActor.MONSTER);
                var smartVO = null;
                if (selectCamp == this._userPlayer.vo.sceneFlag) {
                    //防守找离自己最近的前线塔
                    smartVO = this.findNearDefenceTower(sightMonsters);
                }
                else {
                    //进攻时候先找塔
                    smartVO = this.findTowerMonster(sightMonsters, this._findMonsterIds);
                }
                //找不到塔就找旗子
                if (smartVO == null) {
                    var npc = this.findFlag(selectCamp);
                    if (npc != null) {
                        var needSetTarget = true;
                        if (isMySelfCamp) {
                            var tDis = this.getDistanceByVO(leader.vo, npc.vo);
                            //如果是到达防守目标周边，就不去设置目标，改为等待寻找敌人进行攻击
                            if (tDis <= 6) {
                                needSetTarget = false;
                            }
                        }
                        if (needSetTarget) {
                            //GameModels.scene.syncTarget(null);
                            app.gameContext.gameCurrent.startMove(npc.tileX, npc.tileY);
                            //this._userPlayer.movePathTo(npc.tileX, npc.tileY);
                            this._curTargetFlagCamp = selectCamp;
                            return true;
                        }
                    }
                }
                if (smartVO) {
                    if (isMySelfCamp) {
                        var tDis = this.getDistanceByVO(leader.vo, smartVO);
                        //如果是到达防守目标周边，就不去设置目标，改为等待寻找敌人进行攻击
                        if (tDis > 6) {
                            var randomX = Math.floor(Math.random() * 2);
                            var randomY = Math.floor(Math.random() * 2);
                            if (randomX == 0 && randomY == 0) {
                                randomX = 0;
                                randomY = 1;
                            }
                            app.gameContext.gameCurrent.startMove(smartVO.tileX + randomX, smartVO.tileY + randomY);
                        }
                    }
                    else {
                        if (targetVO != smartVO) {
                            app.gameContext.gameCurrent.startAttack(smartVO);
                            //GameModels.scene.syncTarget(smartVO);
                        }
                        return true;
                    }
                }
            }
            ///*
            //以下为找附近的敌人自动打
            if (egret.getTimer() - this._lastCancalAutoAttackTime < 1000) {
                return true; //点击地面1.0秒内不去自动攻击
            }
            if (selectCamp != "" && leader.action != TypeAction.IDLE && leader.action != TypeAction.RUN) {
                return true; //只有不攻击时才自动攻击
            }
            if ((isMySelfCamp || selectCamp == "") && leader.action != TypeAction.IDLE) {
                return true; //如果是选的是防守，只有玩家待机时才去自动攻击
            }
            var nearSmartVO = this.findNearEnemyMonster(findEnemyCamp);
            if (!nearSmartVO) {
                nearSmartVO = this.findNearEnemyPlayer(findEnemyCamp);
            }
            if (nearSmartVO) {
                if (targetVO != nearSmartVO) {
                    app.gameContext.gameCurrent.startAttack(nearSmartVO);
                    //GameModels.scene.syncTarget(nearSmartVO);
                }
                return true;
            }
            //*/
            if (targetVO != null) {
                return true;
            }
            return false;
        };
        GameLegionWarUI.prototype.findNearDefenceTower = function (sightMonsters) {
            var ret = null;
            var smartVO1 = this.findTowerMonster(sightMonsters, this._defenceSide1);
            var smartVO2 = this.findTowerMonster(sightMonsters, this._defenceSide2);
            var tDis1 = -1;
            var tDis2 = -1;
            if (smartVO1 == null) {
                ret = smartVO2;
            }
            else if (smartVO2 == null) {
                ret = smartVO1;
            }
            else {
                var leader = this._userPlayer.getTeamLeader();
                var tDis1 = this.getDistanceByVO(leader.vo, smartVO1);
                var tDis2 = this.getDistanceByVO(leader.vo, smartVO2);
                if (tDis1 < tDis2) {
                    ret = smartVO1;
                }
                else {
                    ret = smartVO2;
                }
            }
            if (ret == null) {
                ret = this.findTowerMonster(sightMonsters, this._defenceHome);
            }
            return ret;
        };
        //刷新攻击列表[附近的玩家]
        GameLegionWarUI.prototype.refreshAttackList = function () {
            var leader = this._userPlayer.getTeamLeader();
            if (leader == null) {
                return null;
            }
            var curTargetPlayerIsFar = true;
            var nearEnemys = [];
            var sightPlayers = GameModels.scene.getObjectVOList(TypeActor.PLAYER);
            for (var _i = 0, sightPlayers_1 = sightPlayers; _i < sightPlayers_1.length; _i++) {
                var smartVO = sightPlayers_1[_i];
                if (smartVO.sceneFlag == this._userPlayer.vo.sceneFlag)
                    continue;
                var targetLeaderVO = smartVO.getTeamLeaderVO();
                if (targetLeaderVO == null)
                    continue;
                var tDis = this.getDistanceByVO(leader.vo, targetLeaderVO);
                if (tDis <= 8) {
                    nearEnemys.push(smartVO);
                    if (smartVO.uid == this._curTargetPlayerId) {
                        curTargetPlayerIsFar = false;
                    }
                }
            }
            if (curTargetPlayerIsFar) {
                this._curTargetPlayerId = "";
            }
            GameModels.sceneLegin.setAttacks(nearEnemys);
        };
        GameLegionWarUI.prototype.sightAddHandler = function (smartVO) {
        };
        GameLegionWarUI.prototype.sightRemoveHandler = function (smartVO) {
        };
        //找一个附近最近的怪
        GameLegionWarUI.prototype.findNearEnemyMonster = function (camp) {
            var leader = this._userPlayer.getTeamLeader();
            if (leader == null) {
                return null;
            }
            var ret = null;
            var minDis = 6;
            var sightMonsters = GameModels.scene.getObjectVOList(TypeActor.MONSTER);
            for (var _i = 0, sightMonsters_1 = sightMonsters; _i < sightMonsters_1.length; _i++) {
                var smartVO = sightMonsters_1[_i];
                if (smartVO.sceneFlag == this._userPlayer.vo.sceneFlag)
                    continue;
                if (camp != "" && camp != smartVO.sceneFlag)
                    continue;
                var tDis = this.getDistanceByVO(leader.vo, smartVO);
                if (tDis < minDis) {
                    ret = smartVO;
                    minDis = tDis;
                }
            }
            return ret;
        };
        //找一个附近最近的玩家
        GameLegionWarUI.prototype.findNearEnemyPlayer = function (camp) {
            var leader = this._userPlayer.getTeamLeader();
            if (leader == null) {
                return null;
            }
            var ret = null;
            var minDis = 9;
            var sightPlayers = GameModels.scene.getObjectVOList(TypeActor.PLAYER);
            for (var _i = 0, sightPlayers_2 = sightPlayers; _i < sightPlayers_2.length; _i++) {
                var smartVO = sightPlayers_2[_i];
                if (smartVO.sceneFlag == this._userPlayer.vo.sceneFlag)
                    continue;
                if (camp != "" && camp != smartVO.sceneFlag)
                    continue;
                var tDis = this.getDistanceByVO(leader.vo, smartVO);
                if (tDis < minDis) {
                    ret = smartVO;
                    minDis = tDis;
                }
            }
            return ret;
        };
        //找阵营旗子
        GameLegionWarUI.prototype.findFlag = function (camp) {
            var ret = null;
            var npcs = this._userGame.getNpcs();
            for (var _i = 0, npcs_1 = npcs; _i < npcs_1.length; _i++) {
                var obj = npcs_1[_i];
                if (obj.npcType == 4 && camp == "1" || obj.npcType == 5 && camp == "2" || obj.npcType == 6 && camp == "3") {
                    ret = obj;
                    break;
                }
            }
            return ret;
        };
        GameLegionWarUI.prototype.findTowerMonster = function (sightMonsters, monsterIds) {
            var ret = null;
            for (var _i = 0, sightMonsters_2 = sightMonsters; _i < sightMonsters_2.length; _i++) {
                var smartVO = sightMonsters_2[_i];
                if (monsterIds.indexOf(smartVO.configId) < 0)
                    continue;
                if (ret == null || ret.configId < smartVO.configId) {
                    ret = smartVO;
                }
            }
            return ret;
        };
        GameLegionWarUI.prototype.findSoldierMonster = function (sightMonsters, campFlag) {
            var ret = null;
            var dis = 0;
            var leaderVO = null;
            if (this._userPlayer.getTeamLeader() != null) {
                leaderVO = this._userPlayer.getTeamLeader().vo;
            }
            if (leaderVO == null) {
                return null;
            }
            for (var _i = 0, sightMonsters_3 = sightMonsters; _i < sightMonsters_3.length; _i++) {
                var smartVO = sightMonsters_3[_i];
                if (smartVO.sceneFlag != campFlag)
                    continue;
                if (smartVO.isBoss)
                    continue;
                if (ret == null) {
                    ret = smartVO;
                    dis = utils.MathUtil.getDistance(leaderVO.tileX, leaderVO.tileY, smartVO.tileX, smartVO.tileY);
                }
                else {
                    var tDis = utils.MathUtil.getDistance(leaderVO.tileX, leaderVO.tileY, smartVO.tileX, smartVO.tileY);
                    if (tDis < dis) {
                        ret = smartVO;
                        dis = tDis;
                    }
                }
            }
            return ret;
        };
        GameLegionWarUI.prototype.userTargetChangeHandler = function () {
            this._curTargetFlagCamp = "";
            this.refreshAttackList();
        };
        GameLegionWarUI.prototype.userPlayerDeadHandler = function () {
            this._curTargetFlagCamp = "";
            this._curTargetPlayerId = "";
            GameModels.scene.syncTarget(null);
        };
        GameLegionWarUI.prototype.userPlayerRelifeHandler = function () {
            this._curTargetFlagCamp = "";
            this._curTargetPlayerId = "";
            GameModels.scene.syncTarget(null);
        };
        GameLegionWarUI.prototype.onGuWuCountChangHandler = function () {
            this.ui.labPrice.text = GameModels.sceneLegin.guWuNeedCount + "";
            this.ui.labAddAtt.text = Language.getExpression(Language.E_J1BFH, (GameModels.sceneLegin.guWuTimes * 20));
            this.ui.labAddHp.text = Language.getExpression(Language.E_J1BFH, (GameModels.sceneLegin.guWuTimes * 20));
            this.ui.labPrice0.text = GameModels.sceneLegin.allArmyGuWuNeedCount + "";
            this.ui.labAddAtt0.text = Language.getExpression(Language.E_J1BFH, (GameModels.sceneLegin.allArmyGuWuTimes));
            this.ui.labAddHp0.text = Language.getExpression(Language.E_J1BFH, (GameModels.sceneLegin.allArmyGuWuTimes));
        };
        GameLegionWarUI.prototype.inspireKingUnionHandler = function (e) {
            if (e.currentTarget == this.ui.btnAddInspire) {
                GameModels.sceneLegin.requestWarGuWu(0);
            }
            else {
                GameModels.sceneLegin.requestWarGuWu(1);
            }
        };
        GameLegionWarUI.prototype.listItemTapHandler = function (e) {
            var playerVO = e.item;
            if (!playerVO || (playerVO && playerVO.uid == GameModels.user.player.uid))
                return;
            if (GameModels.user.player.target) {
                if (GameModels.user.player.target.master == playerVO) {
                    mg.alertManager.tip(Language.J_ZZTZGWJ);
                    return;
                }
            }
            if (playerVO.isTeamAllDead) {
                mg.alertManager.tip(Language.J_GWJYSW);
                return;
            }
            this._curTargetPlayerId = playerVO.uid;
            if (this._battleAttackHandler) {
                this._battleAttackHandler.runWith(playerVO);
            }
            this.updataClickTargetChange();
        };
        GameLegionWarUI.prototype.toRight = function () {
            var _this = this;
            egret.Tween.get(this.ui.legionWarRankGroup).to({ x: this.ui.legionWarRankGroup.x + 260 }, 100, utils.Ease.quadOut).call(function () {
                _this.ui.legionRight.visible = false;
            }, this);
        };
        GameLegionWarUI.prototype.toLeft = function () {
            var _this = this;
            egret.Tween.get(this.ui.legionWarRankGroup).to({ x: this.ui.legionWarRankGroup.x - 260 }, 100, utils.Ease.quadOut).call(function () {
                _this.ui.legionRight.visible = true;
            }, this);
        };
        GameLegionWarUI.prototype.upLegionWarData = function () {
            this.ui.legionWarRank.upData();
            this.ui.labWeiScore.text = "" + GameModels.sceneLegin.getcurUnionScoreListByUnionId(1);
            this.ui.labShuScore.text = "" + GameModels.sceneLegin.getcurUnionScoreListByUnionId(2);
            this.ui.labWuScore.text = "" + GameModels.sceneLegin.getcurUnionScoreListByUnionId(3);
            this.ui.progressBar.value = GameModels.sceneLegin.curMyScore;
            this.ui.labProgressScore.text = GameModels.sceneLegin.curMyScore + "/" + GameModels.sceneLegin.personScoreReward[GameModels.sceneLegin.personScoreReward.length - 1].value.split("&")[0];
        };
        return GameLegionWarUI;
    }(copy.GameUIBase));
    copy.GameLegionWarUI = GameLegionWarUI;
    __reflect(GameLegionWarUI.prototype, "copy.GameLegionWarUI");
})(copy || (copy = {}));

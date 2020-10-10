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
var mo;
(function (mo) {
    var ModelScene = (function (_super) {
        __extends(ModelScene, _super);
        function ModelScene() {
            var _this = _super.call(this) || this;
            _this._fightEnabled = true;
            _this._attackEnabled = true;
            _this._localSightEnabled = true;
            /**进入玩法 */
            _this._selfPetId = [];
            _this._otherPetId = [];
            _this._mapId = 0;
            _this._leftTime = null;
            _this._isBackEnter = 0;
            _this._campSkillTimeList = [];
            _this._joinSceneList = [];
            _this._endGameDataArrList = [];
            _this._storySupportPetId = 0;
            return _this;
        }
        ModelScene.prototype.getFightEnabled = function () {
            return this._fightEnabled;
        };
        ModelScene.prototype.setFightEnabled = function (value) {
            this._fightEnabled = value;
        };
        ModelScene.prototype.getAttackEnabled = function () {
            return this._attackEnabled;
        };
        ModelScene.prototype.setAttackEnabled = function (value) {
            //this._attackEnabled = value;
        };
        ModelScene.prototype.initialize = function () {
            this._userPlayer = GameModels.user.player;
            this._sights = [];
            this._sightPlayers = [];
            this._sightMonsters = [];
            this._sightNpcs = [];
            // this._localSights=[];
            // this._localSightsHash={};
            this.onRoute(n.MessageMap.G2C_SCENE_NOTIFY_GAMEEND, utils.Handler.create(this, this.gameEndHandler, null, false));
            this.onRoute(n.MessageMap.G2C_SCENE_NOTIFSCENESNAP, utils.Handler.create(this, this.gameSightsSnapHandler, null, false));
            this.onRoute(n.MessageMap.G2C_SCENE_PLAYERRELIFE, utils.Handler.create(this, this.objectRelifeCountHandler, null, false));
            this.onRoute(n.MessageMap.G2C_SCENE_NOTIFYKICKOUT, utils.Handler.create(this, this.gameKickOutHandler, null, false));
            this.onRoute(n.MessageMap.G2C_SCENE_NOTIFYSTORYSTART, utils.Handler.create(this, this.playStoryHandler, null, false));
            this.onRoute(n.MessageMap.G2C_SCENE_NOTIFYJOINSCENELIST, utils.Handler.create(this, this.gameJoinSceneList, null, false));
        };
        ModelScene.prototype.addRoutes = function () {
            this.onRoute(n.MessageMap.G2C_SCENE_MERGENOTIFYOBJECTSKILL, utils.Handler.create(this, this.mergeObjectSkillHandler, null, false));
            //this.onRoute(n.MessageMap.G2C_SCENE_NOTIFYOBJECTSKILL, utils.Handler.create(this, this.objectSkillHandler, null, false));
            this.onRoute(n.MessageMap.G2C_SCENE_NOTIFYPLAYERENTER, utils.Handler.create(this, this.sightAddPlayerHandler, null, false));
            this.onRoute(n.MessageMap.G2C_SCENE_NOTIFYMONSTERENTER, utils.Handler.create(this, this.sightAddMonsterHandler, null, false));
            this.onRoute(n.MessageMap.G2C_SCENE_NOTIFYOBJECTEXIT, utils.Handler.create(this, this.sightRemoveHandler, null, false));
            this.onRoute(n.MessageMap.G2C_SCENE_NOTIFYPLAYERLOCKTARGET, utils.Handler.create(this, this.objectTargetChangeHandler, null, false));
            //this.onRoute(n.MessageMap.G2C_SCENE_NOTIFYPETMERGE, utils.Handler.create(this, this.mergeChangeHandler, null, false));
            this.onRoute(n.MessageMap.G2C_SCENE_NOTIFYOBJECTTALENTTRIGGER, utils.Handler.create(this, this.talentHandler, null, false));
            //this.onRoute(n.MessageMap.G2C_SCENE_NOTIFYPETSUPPORT, utils.Handler.create(this, this.supportChangeHandler, null, false));
            //this.onRoute(n.MessageMap.G2C_SCENE_NOTIFYGUIDESTART, utils.Handler.create(this, this.guideStartHandler, null, false));
            //性能优化
            this.onRoute(n.MessageMap.G2C_SCENE_MERGENOTIFYOBJECTINFO, utils.Handler.create(this, this.mergeObjectInfoHandler, null, false));
            this.onRoute(n.MessageMap.G2C_SCENE_MERGENOTIFYOBJECTSHOWHPFONT, utils.Handler.create(this, this.mergeObjectShowHPFontHandler, null, false));
            this.onRoute(n.MessageMap.G2C_SCENE_MERGENOTIFYOBJECTBUFFLIST, utils.Handler.create(this, this.mergeObjectBuffListHandler, null, false));
        };
        ModelScene.prototype.removeRoutes = function () {
            //this.offRoute(n.MessageMap.G2C_SCENE_NOTIFYOBJECTSKILL);
            //this.offRoute(n.MessageMap.G2C_SCENE_NOTIFYOBJECTSKILL);
            this.offRoute(n.MessageMap.G2C_SCENE_NOTIFYPLAYERENTER);
            this.offRoute(n.MessageMap.G2C_SCENE_NOTIFYMONSTERENTER);
            this.offRoute(n.MessageMap.G2C_SCENE_NOTIFYOBJECTEXIT);
            this.offRoute(n.MessageMap.G2C_SCENE_NOTIFYPLAYERLOCKTARGET);
            //this.offRoute(n.MessageMap.G2C_SCENE_NOTIFYPETMERGE);
            this.offRoute(n.MessageMap.G2C_SCENE_NOTIFYOBJECTTALENTTRIGGER);
            //this.offRoute(n.MessageMap.G2C_SCENE_NOTIFYPETSUPPORT);
            //this.offRoute(n.MessageMap.G2C_SCENE_NOTIFYGUIDESTART);
            this.offRoute(n.MessageMap.G2C_SCENE_MERGENOTIFYOBJECTINFO);
            this.offRoute(n.MessageMap.G2C_SCENE_MERGENOTIFYOBJECTSHOWHPFONT);
            this.offRoute(n.MessageMap.G2C_SCENE_MERGENOTIFYOBJECTBUFFLIST);
        };
        /**请求多倍领奖 （1:1倍，2:2倍，4:4倍）*/
        ModelScene.prototype.requestDoubleGetGift = function (type, handler) {
            // var msg: n.C2G_Copy_Rewards = n.MessagePool.from(n.C2G_Copy_Rewards) as n.C2G_Copy_Rewards;
            // msg.Type = type;
            // this.request(n.MessageMap.C2G_COPY_REWARDS, msg, utils.Handler.create(this, (data: n.G2C_Copy_Rewards) => {
            // 	if (handler) handler.runWith(data);
            // }));
        };
        /**同步位置信息 */
        ModelScene.prototype.syncPosition = function (type, objectId, x, y) {
            //logger.log('同步位置:',x,y)
            var msg = n.MessagePool.from(n.C2G_Scene_ObjectPosChange);
            msg.ObjectId = objectId;
            msg.PosX = x;
            msg.PosY = y;
            msg.SceneType = type;
            this.notify(n.MessageMap.C2G_SCENE_OBJECTPOSCHANGE, msg);
            //this._userPlayer.syncTile(x,y,false);
            //if(objectId==this._userPlayer.uid) this.updateLocalSight(this._userPlayer);
        };
        /**同步位置列表 */
        ModelScene.prototype.syncPositionList = function (xyList, targetId) {
            //logger.log('同步位置:',x,y)
            var msg = n.MessagePool.from(n.C2G_Scene_ObjectPosListAndTarget);
            msg.PosXY = xyList;
            msg.TargetId = targetId;
            this.notify(n.MessageMap.C2G_SCENE_OBJECTPOSLISTANDTARGET, msg);
        };
        /**同步目标信息 */
        ModelScene.prototype.syncTarget = function (smartVO) {
            if (!smartVO || smartVO.stateTeamDead) {
                //if (GameModels.user.player.setTarget(null, true)) {
                this.syncTargetToServer(GameModels.user.player.uid, "", "");
                //}
            }
            else {
                //if (GameModels.user.player.setTarget(smartVO, true)) {
                var mainTargetId = smartVO.master ? smartVO.master.uid : smartVO.uid;
                this.syncTargetToServer(GameModels.user.player.uid, mainTargetId, smartVO.uid);
                //}
            }
        };
        ModelScene.prototype.syncTargetToServer = function (objectId, mainTargetId, targetObjectId) {
            if (!objectId)
                return;
            var msg = n.MessagePool.from(n.C2G_Scene_PlayerLockTarget);
            msg.ObjectId = objectId;
            msg.MainTargetId = mainTargetId ? mainTargetId : "";
            msg.TargetId = targetObjectId ? targetObjectId : "";
            //if (!mainTargetId) {
            this.notify(n.MessageMap.C2G_SCENE_PLAYERLOCKTARGET, msg); //取消锁定目标时往服务端发消息，为的是取消攻击列表上的被攻击图标
            //}
            //this.notify(n.MessageMap.C2G_SCENE_PLAYERLOCKTARGET, msg);
        };
        //public syncTarget(...args) {
        /*public syncTarget(objectId:string, targetObjectId:string) {
            //var objectId = args[0];
            //var targetObjectId = args[1];
            //logger.log('同步目标:',targetObjectId)
            var msg: n.C2G_Scene_PlayerLockTarget = n.MessagePool.from(n.C2G_Scene_PlayerLockTarget) as n.C2G_Scene_PlayerLockTarget;
            msg.ObjectId = objectId ? objectId : "";
            msg.TargetId = targetObjectId ? targetObjectId : "";
            this.notify(n.MessageMap.C2G_SCENE_PLAYERLOCKTARGET, msg);
        }*/
        /**同步技能施放 */
        ModelScene.prototype.syncSkill = function (castObjId, skillId, targetObjId, direct, posX, posY) {
            if (posX === void 0) { posX = 0; }
            if (posY === void 0) { posY = 0; }
            var msg = n.MessagePool.from(n.C2G_Scene_ObjectSkill);
            msg.ObjectId = castObjId;
            msg.SkillId = skillId;
            msg.TargetId = targetObjId;
            msg.Direct = direct;
            msg.PosX = posX;
            msg.PosY = posY;
            this.notify(n.MessageMap.C2G_SCENE_OBJECTSKILL, msg);
        };
        //同步XP施放
        ModelScene.prototype.syncUseXP = function (xpSkillId) {
            var msg = n.MessagePool.from(n.C2G_Scene_NofityUseXP);
            msg.SkillId = xpSkillId;
            this.notify(n.MessageMap.C2G_SCENE_NOFITYUSEXP, msg);
        };
        /**同步解合体 */
        ModelScene.prototype.syncMerge = function (petUId, status) {
            var msg = n.MessagePool.from(n.C2G_Scene_PetMerge);
            msg.ObjectId = petUId;
            msg.Status = status ? 1 : 0;
            this.notify(n.MessageMap.C2G_SCENE_PETMERGE, msg);
        };
        /**请求复活 （0:常规，1:原地立即复活）*/
        ModelScene.prototype.requestRelife = function (type) {
            var msg = n.MessagePool.from(n.C2G_Scene_PlayerRelife);
            msg.Type = type;
            this.notify(n.MessageMap.C2G_SCENE_PLAYERRELIFE, msg);
        };
        ModelScene.prototype.notifyStoryEnd = function (type) {
            if (type === void 0) { type = 0; }
            var msg = n.MessagePool.from(n.C2G_Scene_NotifyStoryEnd);
            msg.StoryEnd = type;
            this.notify(n.MessageMap.C2G_SCENE_NOTIFYSTORYEND, msg);
        };
        Object.defineProperty(ModelScene.prototype, "selfPetId", {
            get: function () {
                return this._selfPetId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelScene.prototype, "otherPetId", {
            get: function () {
                return this._otherPetId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelScene.prototype, "mapId", {
            get: function () {
                return this._mapId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelScene.prototype, "leftTime", {
            get: function () {
                return this._leftTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelScene.prototype, "isBackEnter", {
            get: function () {
                return this._isBackEnter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelScene.prototype, "campSkillTimeList", {
            get: function () {
                return this._campSkillTimeList;
            },
            enumerable: true,
            configurable: true
        });
        ModelScene.prototype.enterNextGame = function (type, param, caller, method) {
            var _this = this;
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            // this.removeRoutes();
            // this.clearSights();
            logger.log('开始进入场景...');
            var msg = n.MessagePool.from(n.C2G_Scene_EnterGame);
            msg.SceneType = type;
            msg.EnterParam = param ? param : '';
            msg.RealEnter = 0;
            this.onError(n.MessageMap.C2G_SCENE_ENTERGAME, utils.Handler.create(this, function () {
                logger.warn('进入场景失败!');
                _this.offError(n.MessageMap.C2G_SCENE_ENTERGAME);
                method.call.apply(method, [caller, false].concat(args));
            }), false);
            this.request(n.MessageMap.C2G_SCENE_ENTERGAME, msg, utils.Handler.create(this, function (data) {
                method.call.apply(method, [caller, data.Status].concat(args));
            }));
        };
        ModelScene.prototype.enterGame = function (type, param, caller, method) {
            var _this = this;
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            this.removeRoutes();
            this.clearSights();
            logger.log('开始进入场景...');
            var msg = n.MessagePool.from(n.C2G_Scene_EnterGame);
            msg.SceneType = type;
            msg.EnterParam = param ? param : '';
            msg.RealEnter = 1;
            this.onError(n.MessageMap.C2G_SCENE_ENTERGAME, utils.Handler.create(this, function () {
                logger.warn('进入场景失败!');
                _this.offError(n.MessageMap.C2G_SCENE_ENTERGAME);
                method.call.apply(method, [caller, false].concat(args));
            }), false);
            this.request(n.MessageMap.C2G_SCENE_ENTERGAME, msg, utils.Handler.create(this, function (data) {
                _this.offError(n.MessageMap.C2G_SCENE_ENTERGAME);
                logger.log('进入场景成功.');
                _this._selfPetId = data.LeftPetList.concat();
                _this._otherPetId = data.RightPetList.concat();
                _this._mapId = data.Status;
                _this._leftTime = data.LeftTime;
                _this._isBackEnter = data.IsBackEnter;
                _this._campSkillTimeList = data.CampSkillTimeList.concat();
                method.call.apply(method, [caller, data.Status].concat(args));
            }));
        };
        /**请求快照 */
        ModelScene.prototype.requestSightsSnap = function (caller, method) {
            var _this = this;
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var msg = n.MessagePool.from(n.C2G_Scene_SceneSnap);
            this.request(n.MessageMap.C2G_SCENE_SCENESNAP, msg, utils.Handler.create(this, function (data) {
                _this.gameSightsSnapHandler(data);
                if (_this._sightSnapHandler) {
                    _this._sightSnapHandler.run();
                }
                //this._userPlayer.syncTile(data.SelfPosX, data.SelfPosY, false);
                //this._userPlayer.syncHp(data.SelfHP, this._userPlayer.battleHpMax);
                _this._killerObjectId = data.KillerId;
                method.call.apply(method, [caller].concat(args));
            }));
        };
        /**通知服务器开始玩法 */
        ModelScene.prototype.startGame = function (caller, method) {
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            this.onRoute(n.MessageMap.G2C_SCENE_NOTIFYSTARTGAME, utils.Handler.create(this, function () {
                if (method) {
                    method.call(caller);
                }
            }));
            this.notify(n.MessageMap.C2G_SCENE_STARTGAME, n.MessagePool.from(n.C2G_Scene_StartGame));
        };
        Object.defineProperty(ModelScene.prototype, "sights", {
            /**视野信息 */
            get: function () {
                return this._sights;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelScene.prototype, "curMapId", {
            // /**本地视野信息 */
            // public get localsights():vo.GameSmartVO[]{
            // 	return this._localSights;
            // }
            /**当前地图Id */
            get: function () {
                return this._curMapId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelScene.prototype, "killerObjectId", {
            /**进入场景时被杀的杀人者 */
            get: function () {
                return this._killerObjectId;
            },
            enumerable: true,
            configurable: true
        });
        /**监听被踢出 */
        ModelScene.prototype.onKickOut = function (caller, method) {
            this.offKickOut();
            this._kickOutHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelScene.prototype.offKickOut = function () {
            if (this._kickOutHandler) {
                this._kickOutHandler.recover();
                this._kickOutHandler = null;
            }
        };
        /**监听快照 */
        ModelScene.prototype.onSightSnap = function (caller, method) {
            this.offSightSnap();
            this._sightSnapHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelScene.prototype.offSightSnap = function () {
            if (this._sightSnapHandler) {
                this._sightSnapHandler.recover();
                this._sightSnapHandler = null;
            }
        };
        /**监听视野添加 */
        ModelScene.prototype.onSightAdd = function (caller, method) {
            if (!this._sightAddHandlers) {
                this._sightAddHandlers = new utils.Handlers(false);
            }
            this._sightAddHandlers.add(caller, method, null, false);
        };
        ModelScene.prototype.offSightAdd = function (caller, method) {
            if (this._sightAddHandlers) {
                this._sightAddHandlers.remove(caller, method);
            }
        };
        /**监听视野移除 */
        ModelScene.prototype.onSightRemove = function (caller, method) {
            if (!this._sightRemoveHandlers) {
                this._sightRemoveHandlers = new utils.Handlers(false);
            }
            this._sightRemoveHandlers.add(caller, method, null, false);
        };
        ModelScene.prototype.offSightRemove = function (caller, method) {
            if (this._sightRemoveHandlers) {
                this._sightRemoveHandlers.remove(caller, method);
            }
        };
        ModelScene.prototype.offAllSightRemove = function () {
            if (this._sightRemoveHandlers) {
                this._sightRemoveHandlers.clear();
            }
        };
        /**监听玩法结束 */
        ModelScene.prototype.onGameOver = function (caller, method) {
            this.offGameOver();
            this._gameOverHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelScene.prototype.offGameOver = function () {
            if (this._gameOverHandler) {
                this._gameOverHandler.recover();
                this._gameOverHandler = null;
            }
        };
        /**监听目标变化 */
        ModelScene.prototype.onTargetChange = function (caller, method) {
            this.offTargetChange();
            this._targetChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelScene.prototype.offTargetChange = function () {
            if (this._targetChangeHandler) {
                this._targetChangeHandler.recover();
                this._targetChangeHandler = null;
            }
        };
        /**监听通知触发引导 */
        ModelScene.prototype.onGuideStart = function (caller, method) {
            this.offGuideStart();
            this._guideStartHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelScene.prototype.offGuideStart = function () {
            if (this._guideStartHandler) {
                this._guideStartHandler.recover();
                this._guideStartHandler = null;
            }
        };
        /**监听目标状态变化 */
        ModelScene.prototype.onObjectTeamStatusChange = function (caller, method) {
            if (!this._objectTeamStatusChangeHandlers) {
                this._objectTeamStatusChangeHandlers = new utils.Handlers(false);
            }
            this._objectTeamStatusChangeHandlers.add(caller, method, null, false);
            //this.offObjectStatusChange();
            //this._objectStatusChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelScene.prototype.offObjectTeamStatusChange = function (caller, method) {
            if (this._objectTeamStatusChangeHandlers) {
                this._objectTeamStatusChangeHandlers.remove(caller, method);
            }
            //if (this._objectStatusChangeHandler) {
            //	this._objectStatusChangeHandler.recover();
            //	this._objectStatusChangeHandler = null;
            //}
        };
        ModelScene.prototype.offAllObjectTeamStatusChange = function () {
            if (this._objectTeamStatusChangeHandlers) {
                this._objectTeamStatusChangeHandlers.clear();
            }
        };
        ModelScene.prototype.updateUserSceneInfo = function (playerInfo) {
            this._userPlayer.updateSceneInfo(playerInfo.SceneInfo);
            for (var _i = 0, _a = playerInfo.PetList; _i < _a.length; _i++) {
                var pet = _a[_i];
                var petVO = this._userPlayer.petList.getPetVOByUId(pet.PetId);
                if (petVO != null) {
                    petVO.updateSceneInfo(pet.SceneInfo);
                }
            }
        };
        ModelScene.prototype.addToSight = function (data, event) {
            if (event === void 0) { event = true; }
            var smartVO;
            if (data instanceof n.ProtoCopyPlayer) {
                if (data.PlayerId == this._userPlayer.uid) {
                    this._userPlayer.updateProtoCopyPlayer(data);
                    //this.updateUserSceneInfo(data);
                    return;
                }
                else {
                    smartVO = vo.fromPool(vo.GamePlayerVO, data);
                    smartVO.updateProtoCopyPlayer(data);
                    this._sightPlayers.push(smartVO);
                }
            }
            else if (data instanceof n.ProtoMonster) {
                switch (data.Type) {
                    case TypeActor.NPC:
                        smartVO = vo.fromPool(vo.GameSmartNpcVO, data, TypeActor.NPC);
                        this._sightNpcs.push(smartVO);
                        break;
                    case TypeActor.BOSS:
                    case TypeActor.NPCSUPPORT:
                        smartVO = vo.fromPool(vo.GameMonsterVO, data, TypeActor.BOSS);
                        this._sightMonsters.push(smartVO);
                        break;
                    default:
                        smartVO = vo.fromPool(vo.GameMonsterVO, data, TypeActor.MONSTER);
                        this._sightMonsters.push(smartVO);
                        break;
                }
            }
            // logger.log('添加到视野:',smartVO.name,smartVO.uid)
            this._sights.push(smartVO);
            smartVO.autoRecover = false;
            if (event && this._sightAddHandlers) {
                this._sightAddHandlers.runWith(smartVO);
            }
            // if(this._localSightEnabled&&this.isInLocalSight(smartVO)){
            // 	this.addToLocalSight(smartVO,event);
            // }
        };
        ModelScene.prototype.removeFromSight = function (uid, event) {
            if (event === void 0) { event = true; }
            var index = -1;
            for (var i = 0; i < this._sights.length; i++) {
                if (this._sights[i].uid == uid) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                var smartVO = this._sights[index];
                // logger.log('从视野移除:',smartVO.name,smartVO.uid);
                if (smartVO instanceof vo.GamePlayerVO) {
                    this._sightPlayers.splice(this._sightPlayers.indexOf(smartVO), 1);
                }
                else if (smartVO instanceof vo.GameSmartNpcVO) {
                    this._sightNpcs.splice(this._sightNpcs.indexOf(smartVO), 1);
                }
                else if (smartVO instanceof vo.GameMonsterVO) {
                    this._sightMonsters.splice(this._sightMonsters.indexOf(smartVO), 1);
                }
                this._sights.splice(this._sights.indexOf(smartVO), 1);
                //this.removeFromLocalSight(smartVO,event);
                if (event && this._sightRemoveHandlers) {
                    this._sightRemoveHandlers.runWith(smartVO);
                }
                smartVO.autoRecover = true;
                vo.toPool(smartVO);
            }
        };
        // private updateLocalSight(smartVO:vo.GameSmartVO){
        // 	if(!this._localSightEnabled) return;
        // 	if(this._userPlayer==smartVO){
        // 		for(var smartVO of this._sights){
        // 			if(this.isInLocalSight(smartVO)){
        // 				this.addToLocalSight(smartVO,true);
        // 			}else{
        // 				this.removeFromLocalSight(smartVO,true);
        // 			}
        // 		}
        // 	}else{
        // 		if(this.isInLocalSight(smartVO)){
        // 			this.addToLocalSight(smartVO,true);
        // 		}else{
        // 			this.removeFromLocalSight(smartVO,true);
        // 		}
        // 	}
        // }
        // private addToLocalSight(smartVO:vo.GameSmartVO,event:boolean){
        // 	if(!this._localSightsHash[smartVO.uid]){
        // 		this._localSights.push(smartVO);
        // 		this._localSightsHash[smartVO.uid]=smartVO;
        // 		if(event&&this._sightAddHandlers){
        // 			this._sightAddHandlers.runWith(smartVO);
        // 		}
        // 		logger.log("单位进入:",this._localSights.length);
        // 	}
        // }
        // private removeFromLocalSight(smartVO:vo.GameSmartVO,event:boolean){
        // 	if(this._localSightsHash[smartVO.uid]){
        // 		this._localSightsHash[smartVO.uid]=null;
        // 		delete this._localSightsHash[smartVO.uid];
        // 		this._localSights.splice(this._localSights.indexOf(smartVO),1);
        // 		logger.log("单位离开:",this._localSights.length);
        // 		if(event&&this._sightRemoveHandlers){
        // 			this._sightRemoveHandlers.runWith(smartVO);
        // 		}	
        // 	}	
        // }
        // private isInLocalSight(smartVO:vo.GameSmartVO){
        // 	 return Math.abs(smartVO.tileX-this._userPlayer.tileX)<=this._localRangX&&Math.abs(smartVO.tileY-this._userPlayer.tileY)<=this._localRangY;
        // }
        /**解合体状态更变 */
        ModelScene.prototype.mergeChangeHandler = function (data) {
            var smartVO = this.getObjectByUId(data.ObjectId);
            if (smartVO)
                smartVO.updateMergedState(data.Status == 1);
            var smartVO1 = this.getObjectByUId(data.ObjectId);
            if (smartVO1)
                smartVO1.syncMergedState(data.Status == 1);
        };
        /**设置援助状态 */
        ModelScene.prototype.supportChangeHandler = function (data) {
            var smartVO = this.getObjectByUId(data.ObjectId);
            if (smartVO)
                smartVO.isSupport = (data.Status == 1);
        };
        /**通知触发引导 */
        ModelScene.prototype.guideStartHandler = function (data) {
            if (this._guideStartHandler != null) {
                this._guideStartHandler.runWith(data.GuideType);
            }
        };
        /**天赋表现 */
        ModelScene.prototype.talentHandler = function (data) {
            var smartVO = this.getObjectByUId(data.ObjectId);
            if (smartVO) {
                //smartVO.syncTalent(data.TalentId,data.HPChange,true);
                //battle.manager.showTalent(smartVO, data.TalentId, data.HPChange);
            }
        };
        /**取视野对象 */
        ModelScene.prototype.getObjectByUId = function (uid) {
            if (uid == "")
                return null;
            for (var i = 0; i < this._sights.length; i++) {
                if (this._sights[i].uid == uid) {
                    return this._sights[i];
                }
            }
            var petVO = null;
            for (var _i = 0, _a = this._sightPlayers; _i < _a.length; _i++) {
                var playerVO = _a[_i];
                petVO = playerVO.petList.getPetVOByUId(uid);
                if (!!petVO)
                    return petVO;
            }
            if (this._userPlayer.uid == uid)
                return this._userPlayer;
            petVO = this._userPlayer.petList.getPetVOByUId(uid);
            if (!!petVO)
                return petVO;
            return null;
        };
        /**通过战场标识获取玩家信息 */
        ModelScene.prototype.getObjectBySceneObjectId = function (sceneObjectId) {
            if (sceneObjectId == 0)
                return null;
            for (var i = 0; i < this._sights.length; i++) {
                if (this._sights[i].sceneObjectId == sceneObjectId) {
                    return this._sights[i];
                }
            }
            var petVO = null;
            for (var _i = 0, _a = this._sightPlayers; _i < _a.length; _i++) {
                var playerVO = _a[_i];
                petVO = playerVO.petList.getObjectBySceneObjectId(sceneObjectId);
                if (!!petVO)
                    return petVO;
            }
            if (this._userPlayer.sceneObjectId == sceneObjectId)
                return this._userPlayer;
            petVO = this._userPlayer.petList.getObjectBySceneObjectId(sceneObjectId);
            if (!!petVO)
                return petVO;
            return null;
        };
        /**通过战场标识获取玩家信息 */
        ModelScene.prototype.getPlayerVOBySceneFlag = function (flag) {
            for (var _i = 0, _a = this._sightPlayers; _i < _a.length; _i++) {
                var playerVO = _a[_i];
                if (playerVO.sceneFlag == flag) {
                    return playerVO;
                }
            }
            return null;
        };
        /**取对象列表 */
        ModelScene.prototype.getObjectVOList = function (actorType) {
            switch (actorType) {
                case TypeActor.PLAYER:
                case TypeActor.ROBOT:
                    return this._sightPlayers;
                case TypeActor.MONSTER:
                case TypeActor.BOSS:
                    return this._sightMonsters;
                case TypeActor.NPC:
                    return this._sightNpcs;
            }
            return null;
        };
        /**踢出玩法 */
        ModelScene.prototype.gameKickOutHandler = function (data) {
            logger.log("玩法强制结束:", data.Message);
            if (this._kickOutHandler) {
                this._kickOutHandler.runWith(data.Message);
            }
        };
        /**监听加入的战斗变化*/
        ModelScene.prototype.onJoinScene = function (caller, method) {
            this.offJoinScene();
            this._joinSceneHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelScene.prototype.offJoinScene = function () {
            if (this._joinSceneHandler) {
                this._joinSceneHandler.recover();
                this._joinSceneHandler = null;
            }
        };
        Object.defineProperty(ModelScene.prototype, "joinSceneList", {
            get: function () {
                return this._joinSceneList;
            },
            enumerable: true,
            configurable: true
        });
        ModelScene.prototype.getjoinSceneListByType = function (type) {
            for (var i = 0; i < this._joinSceneList.length; i++) {
                if (this._joinSceneList[i] == type) {
                    return true;
                }
            }
            return false;
        };
        /**index 1:天梯演武 2:武魂武将试炼 3:名将远征兵分三路 4:副本 */
        ModelScene.prototype.hashjoinSceneListByIndex = function (index) {
            if (index < 1 || index > 4)
                return false;
            for (var i = 0; i < this._joinSceneList.length; i++) {
                if (index == 1) {
                    if (this._joinSceneList[i] == TypeGame.LADDER_FIGHT || this._joinSceneList[i] == TypeGame.LADDER_FIGHT1) {
                        return true;
                    }
                }
                else if (index == 2) {
                    if (this._joinSceneList[i] == TypeGame.PAGODA_LOCK || this._joinSceneList[i] == TypeGame.PAGODA_PET || this._joinSceneList[i] == TypeGame.PAGODA_WUHUN) {
                        return true;
                    }
                }
                else if (index == 3) {
                    if (this._joinSceneList[i] == TypeGame.EXPEDITION || this._joinSceneList[i] == TypeGame.EXPEDITION_SUPPORT || this._joinSceneList[i] == TypeGame.SHILITA_1 ||
                        this._joinSceneList[i] == TypeGame.SHILITA_2 || this._joinSceneList[i] == TypeGame.SHILITA_3) {
                        return true;
                    }
                }
                else {
                    if (this._joinSceneList[i] == TypeGame.MATERIAL) {
                        return true;
                    }
                }
            }
            return false;
        };
        ModelScene.prototype.gameJoinSceneList = function (data) {
            this._joinSceneList = data.List.concat();
            this.dispatchEventWith(mo.ModelScene.JOINSCENE_CHANGE);
            if (this._joinSceneHandler) {
                this._joinSceneHandler.runWith(data);
            }
        };
        /**玩法结束 */
        ModelScene.prototype.mainStroyCallFun = function (data) {
            this.gameEnd(data);
        };
        ModelScene.prototype.gameEndHandler = function (data) {
            data.autoRecover = false;
            var copyWin = copy.CopyWinInstance.instance.copyWinTipView;
            var copyFail = copy.CopyFailInstance.instance.copyFailTipView;
            if (!copyWin && !copyFail) {
                //logger.log("结算的场景====", data.SceneType);
                if (GameModels.chapter.totalChapter == 1) {
                    mg.StoryManager.instance.startBigStory(102, this, this.mainStroyCallFun, data);
                }
                else {
                    this.gameEnd(data);
                }
            }
            else {
                //logger.log("存入队列中的场景===", data.SceneType);
                //logger.log("结算结果===", data.result);
                this._endGameDataArrList.push(data);
            }
        };
        ModelScene.prototype.removeEndGameDataFromList = function () {
            //logger.log("移除队列中的场景111111111111111111");
            if (this._endGameDataArrList.length <= 0)
                return;
            //logger.log("移除队列中的场景===", this._endGameDataArrList[0].SceneType);
            this.gameEnd(this._endGameDataArrList[0]);
            this._endGameDataArrList.splice(0, 1);
        };
        ModelScene.prototype.gameEnd = function (data) {
            var list = vo.parseProtoItems(data.Items);
            var selfEndVo = vo.fromPool(vo.ProtoSceneObjectEndInfoVO, data.MyEndInfo);
            var otherEndVo = vo.fromPool(vo.ProtoSceneObjectEndInfoVO, data.EnemyEndInfo);
            //logger.log("玩法结束:", "result,", data.result, "Stars,", data.Stars, "EndParam,", data.EndParam, "itemList,", list, "selfEndVo,", selfEndVo, "otherEndVo,", otherEndVo);
            if (app.gameContext.typeGame == data.SceneType) {
                if (this._gameOverHandler) {
                    this._gameOverHandler.runWith(data.result, data.Stars, list, data.EndParam, selfEndVo, otherEndVo);
                }
            }
            else {
                if (data.result) {
                    if (!this._copyWinVO)
                        this._copyWinVO = new vo.CopyWinVO();
                    var fightData = GameModels.copyBoss.getFightData(data.SceneType);
                    this._copyWinVO.copyVo = fightData ? fightData.copyVo : null;
                    this._copyWinVO.isFive = fightData ? fightData.isFive : null;
                    this._copyWinVO.type = data.SceneType;
                    this._copyWinVO.dropItems = list;
                    this._copyWinVO.selfEndVo = selfEndVo;
                    this._copyWinVO.otherEndVo = otherEndVo;
                    this._copyWinVO.initialize(this, function (isNext, isFive, copyVo) {
                        if (isNext === void 0) { isNext = null; }
                        if (isFive === void 0) { isFive = null; }
                        if (copyVo === void 0) { copyVo = null; }
                        app.gameContext.copyWinCallFun(data.SceneType, list, isNext, isFive, copyVo, false);
                    });
                    GameModels.copyBoss.removeFightData(data.SceneType);
                    app.gameContext.showWinTip(this._copyWinVO);
                }
                else {
                    GameModels.copyBoss.removeFightData(data.SceneType);
                    app.gameContext.copyFailCallFun(data.SceneType, data.Stars, selfEndVo, otherEndVo);
                }
            }
        };
        /**视野快照 */
        ModelScene.prototype.gameSightsSnapHandler = function (data) {
            this._curMapId = data.MapId;
            GameModels.user.player.sceneFlag = data.SceneFlag;
            for (var _i = 0, _a = data.PlayerList; _i < _a.length; _i++) {
                var playerData = _a[_i];
                this.addToSight(playerData, false);
            }
            for (var _b = 0, _c = data.MonsterList; _b < _c.length; _b++) {
                var monsterData = _c[_b];
                this.addToSight(monsterData, false);
            }
            this.addRoutes();
            // logger.log('本地视野:',this._localSights.length);
        };
        ModelScene.prototype.clearSights = function () {
            this._sightPlayers.length = 0;
            this._sightMonsters.length = 0;
            this._sightNpcs.length = 0;
            // this._localSights.length=0;
            // for(var key in this._localSightsHash){
            // 	this._localSightsHash[key]=null;
            // 	delete this._localSightsHash[key];
            // }
            for (var _i = 0, _a = this._sights; _i < _a.length; _i++) {
                var smartVO = _a[_i];
                vo.toPool(smartVO);
            }
            this._sights.length = 0;
            utils.timer.clearAll(this);
        };
        /**视野玩家进入同步 */
        ModelScene.prototype.sightAddPlayerHandler = function (data) {
            this.addToSight(data.Player);
        };
        /**视野怪物进入同步  */
        ModelScene.prototype.sightAddMonsterHandler = function (data) {
            for (var _i = 0, _a = data.MonsterList; _i < _a.length; _i++) {
                var proto = _a[_i];
                this.addToSight(proto);
            }
        };
        /**视野对象离开同步 */
        ModelScene.prototype.sightRemoveHandler = function (data) {
            for (var _i = 0, _a = data.ObjectIds; _i < _a.length; _i++) {
                var objectId = _a[_i];
                //utils.timer.once(2000,this,this.removeFromSight,false,objectId);
                this.removeFromSight(objectId);
            }
        };
        /**对象技能同步  */
        ModelScene.prototype.objectSkillHandler = function (data) {
            var smartVO = this.getObjectByUId(data.ObjectId);
            if (smartVO) {
                var curTarget = this.getObjectByUId(data.TargetId);
                smartVO.syncSkill(data.SkillId, curTarget, data.PosX, data.PosY, smartVO.stateDead ? false : true);
            }
        };
        /**对象目标同步 */
        ModelScene.prototype.objectTargetChangeHandler = function (data) {
            var smartVO = this.getObjectByUId(data.ObjectId);
            if (smartVO) {
                var targetVO = this.getObjectByUId(data.MainTargetId);
                smartVO.setMainTarget(targetVO, true);
                //logger.log("单位目标变化:",smartVO.name,smartVO.target?smartVO.target.name:"",data.TargetId)
                if (this._targetChangeHandler) {
                    this._targetChangeHandler.runWith(smartVO, smartVO.target);
                }
            }
        };
        /**对象技能同步(带目标及飘字)  */
        ModelScene.prototype.mergeObjectSkillHandler = function (data) {
            var smartVO = this.getObjectBySceneObjectId(data.ObjectId);
            if (smartVO) {
                smartVO.syncServerSkill(data);
            }
        };
        /**对象信息同步（性能优化）  */
        ModelScene.prototype.mergeObjectInfoHandler = function (data) {
            var smartVO = null;
            for (var _i = 0, _a = data.List; _i < _a.length; _i++) {
                var info = _a[_i];
                smartVO = this.getObjectBySceneObjectId(info.SceneObjectId);
                if (smartVO) {
                    //更新血量
                    if (info.HPMax > 0) {
                        smartVO.syncHp(info.HP, info.HPMax);
                    }
                    //更新怒气
                    if (info.MP > 0) {
                        smartVO.syncMp(info.MP - 1);
                    }
                    //更新移动
                    if (info.PosX > 0 || info.PosY > 0) {
                        if (info.IncludeSelf > 0) {
                            smartVO.syncTile(info.PosX, info.PosY, smartVO.stateDead ? false : true);
                        }
                        else if (this._userPlayer != smartVO.master) {
                            smartVO.syncTile(info.PosX, info.PosY, smartVO.stateDead ? false : true);
                        }
                    }
                    //更新状态					
                    if (info.Status > 0) {
                        var isDead = info.Status == 2;
                        var killerVO = this.getObjectBySceneObjectId(info.FromObjectId);
                        smartVO.syncStatus(isDead, killerVO);
                        //更新移动
                        if (info.PosX > 0 || info.PosY > 0) {
                            smartVO.syncTile(info.PosX, info.PosY, smartVO.stateDead ? false : true);
                        }
                    }
                    //更新状态队伍
                    if (info.TeamStatus > 0) {
                        var isTeamAllDead = info.TeamStatus == 2;
                        var killerVO = this.getObjectBySceneObjectId(info.FromObjectId);
                        var lostContent = info.LostContent;
                        smartVO.syncTeamStatus(isTeamAllDead, killerVO);
                        if (this._objectTeamStatusChangeHandlers) {
                            this._objectTeamStatusChangeHandlers.runWith(smartVO, !isTeamAllDead, killerVO, lostContent);
                        }
                    }
                }
            }
        };
        /**对象血量变化飘字（性能优化）  */
        ModelScene.prototype.mergeObjectShowHPFontHandler = function (data) {
            var smartVO = null;
            var attackVO = null;
            for (var _i = 0, _a = data.List; _i < _a.length; _i++) {
                var info = _a[_i];
                smartVO = this.getObjectBySceneObjectId(info.SceneObjectId);
                if (smartVO) {
                    //开始飘字
                    for (var _b = 0, _c = info.List; _b < _c.length; _b++) {
                        var showInfo = _c[_b];
                        attackVO = this.getObjectBySceneObjectId(showInfo.FromObjectId);
                        if (attackVO == null) {
                            attackVO = smartVO;
                        }
                        battle.manager.skillHurtByServer(attackVO, smartVO, showInfo.ChangeHP, showInfo.FontType);
                    }
                }
            }
        };
        /**BUFF变化（性能优化）  */
        ModelScene.prototype.mergeObjectBuffListHandler = function (data) {
            var smartVO = null;
            for (var _i = 0, _a = data.List; _i < _a.length; _i++) {
                var info = _a[_i];
                smartVO = this.getObjectBySceneObjectId(info.SceneObjectId);
                if (smartVO) {
                    var newHasTypes = [];
                    var needRemoveBuffs = [];
                    for (var _b = 0, _c = info.BuffList; _b < _c.length; _b++) {
                        var buffId = _c[_b];
                        var buffTemplate = Templates.getTemplateById(templates.Map.SKILLBUFFNEW, buffId);
                        if (buffTemplate) {
                            if (!smartVO.hasBuff(buffTemplate.type)) {
                                smartVO.addBuff(vo.fromBuffPool(smartVO, smartVO, buffTemplate));
                            }
                            else {
                                var oldBuffVO = smartVO.getBuff(buffTemplate.type);
                                if (oldBuffVO.template != buffTemplate) {
                                    smartVO.removeBuff(oldBuffVO);
                                    smartVO.addBuff(vo.fromBuffPool(smartVO, smartVO, buffTemplate));
                                }
                            }
                            newHasTypes.push(buffTemplate.type);
                        }
                        else {
                            logger.error('配置中找不到BUFF:' + buffId);
                        }
                        //if (buffTemplate) smartVO.addBuff(vo.fromBuffPool(this.getObjectByUId(data.FromObjectId), smartVO, buffTemplate) as vo.BuffVO);
                    }
                    for (var key in smartVO.buffList) {
                        var buffType = parseInt(key);
                        if (newHasTypes.indexOf(buffType) == -1) {
                            needRemoveBuffs.push(buffType);
                        }
                    }
                    for (var _d = 0, needRemoveBuffs_1 = needRemoveBuffs; _d < needRemoveBuffs_1.length; _d++) {
                        var buffType = needRemoveBuffs_1[_d];
                        smartVO.removeBuff(smartVO.getBuff(buffType));
                    }
                    //以下为期间增加过的BUFF，需检查一下飘字
                    for (var _e = 0, _f = info.AddList; _e < _f.length; _e++) {
                        var buffId = _f[_e];
                        var buffTemplate = Templates.getTemplateById(templates.Map.SKILLBUFFNEW, buffId);
                        if (buffTemplate) {
                            battle.manager.showBuff(smartVO, buffTemplate);
                        }
                        else {
                            logger.error('配置中找不到BUFF:' + buffId);
                        }
                    }
                }
            }
        };
        /**播放剧情  */
        ModelScene.prototype.playStoryHandler = function (data) {
            // if (data.StoryId > 0) {
            // 	mg.StoryManager.instance.startBigStory(data.StoryId, this, this.notifyStoryEnd);
            // }
            /*if (data.StoryId > 0) {
                if (data.SupportPetId > 0) {
                    GameModels.scene.setFightEnabled(false);
                    this.notifyStoryEndTrue();
                    this._storySupportPetId = data.SupportPetId;
                    mg.StoryManager.instance.startStory(data.StoryId, this, this.playSupportPetMovie);
                }
                else {
                    mg.StoryManager.instance.startStory(data.StoryId, this, this.notifyStoryEndTrue);
                }
                //mg.StoryManager.instance.startStory(data.StoryId, this, this.notifyStoryEndTrue);
            }
            //else if (data.SupportPetId > 0) {
            else if (data.SupportPetId > 0) {
                GameModels.scene.setFightEnabled(false);
                this._storySupportPetId = data.SupportPetId;
                this.playSupportPetMovie();
            }
            else if (data.BossPetId > 0) {
                //mg.alertManager.showAlert(bossComing.CopyBossComing, true, true, data.BossPetId, this, this.notifyStoryEnd);
                GameModels.scene.setFightEnabled(false);
                copy.CopyMainView.instance.showBossComming(data.BossPetId);
                utils.timer.once(2000, this, this.notifyStoryEnd);
            }
            else {
                //解除暂停通知
                GameModels.scene.setFightEnabled(true);
            }*/
        };
        Object.defineProperty(ModelScene.prototype, "storySupportPetId", {
            get: function () {
                return this._storySupportPetId;
            },
            set: function (v) {
                this._storySupportPetId = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelScene.prototype.playSupportPetMovie = function () {
            if (this._storySupportPetId > 0) {
                this.petSupport();
            }
            else {
                //this.notifyStoryEnd();
            }
        };
        ModelScene.prototype.petSupport = function () {
            utils.timer.clear(this, this.petSupport);
            GameModels.scene.setFightEnabled(false);
            GameModels.scene.setAttackEnabled(false);
            utils.timer.once(2000, this, this.notifyStoryEnd, false);
            this._storySupportPetId = 0;
            this.dispatchEventWith(mo.ModelScene.STORY_SUPPORTPETID, false);
        };
        /**复活次数变更同步  */
        ModelScene.prototype.objectRelifeCountHandler = function (data) {
            this._userPlayer.syncRelifeCount(data.RelifeCount);
        };
        /** 设置加速*/
        ModelScene.prototype.sceneNotifyBattleSetting = function (speedRate) {
            var cmd = n.MessagePool.from(n.C2G_Scene_NotifyBattleSetting);
            cmd.SpeedRate = speedRate;
            this.notify(n.MessageMap.C2G_SCENE_NOTIFYBATTLESETTING, cmd);
        };
        /**请求援军上场 */
        ModelScene.prototype.requestPetSupport = function () {
            this.request(n.MessageMap.C2G_SCENE_PETSUPPORT, n.MessagePool.from(n.C2G_Scene_PetSupport), utils.Handler.create(this, function (data) {
                logger.log("1111111111111==", data.Succ);
            }));
        };
        ModelScene.STORY_SUPPORTPETID = "STORY_SUPPORTPETID";
        ModelScene.JOINSCENE_CHANGE = "JOINSCENE_CHANGE";
        return ModelScene;
    }(mo.ModelBase));
    mo.ModelScene = ModelScene;
    __reflect(ModelScene.prototype, "mo.ModelScene", ["mo.IModelScene"]);
})(mo || (mo = {}));

// module s {
// 	export class GameUnionChapter extends GameBase {
// 		private _robot: GameRobot[];
// 		private _monsterDrops: vo.ItemVO[];
// 		private _lastRequestDropTime: number = 0; //上一次请求掉落的时间
// 		constructor() {
// 			super(TypeGame.CHAPTER_UNION);
// 		}
// 		public enter() {
// 			super.enter();
// 			this.enterChapter();
// 		}
// 		public exit() {
// 			utils.timer.clear(this, this.enterChapter);
// 			this.removeRobot();
// 			this._scene.manager.clear();
// 			super.exit();
// 			this._player.remove();
// 			this._scene.clear(true);
// 			GameModels.chapter.requesUnionSyncKillCount(GameModels.chapter.unionKillCount);
// 		}
// 		private enterChapter() {
// 			this.removeRobot();
// 			this._robot = [];
// 			this._scene.manager.clear();
// 			this._scene.clear(true);
// 			GameModels.user.player.xpState = TypeXpUp.STOP;
// 			GameModels.user.player.resetXp();
// 			GameModels.chapter.resetUnioState(this, function () {
// 				if (GameModels.user.player.legionId == "1") {
// 					this.enterMap(22008);
// 				}
// 				else if (GameModels.user.player.legionId == "2") {
// 					this.enterMap(22009);
// 				}
// 				else {
// 					this.enterMap(22010);
// 				}
// 				this.start();
// 			});
// 		}
// 		public start() {
// 			GameModels.user.player.resetState();
// 			GameModels.user.player.resetMergeState();
// 			//this._player.aiClass=AISmartSync;
// 			this._player.aiClass = AITeamPet;
// 			this._player.petAIClass = AITeamPet;
// 			this._player.initialize(GameModels.user.player);
// 			this._scene.addPlayer(this._player);
// 			this._player.setTile(this._scene.data.born);
// 			//this._scene.lookAt(this._player.getTeamLeader());
// 			this._player.actionTo(TypeAction.IDLE, TypeDirection.DOWN);
// 			this._player.onDead(this, this.playerDeadHandler);
// 			this._player.updatePetTile();
// 			this._player.focusMode = false;
// 			this._player.damgeEnabled = true;
// 			this._player.effectEnabled = true;
// 			this._player.pickUpOneByOne = false;
// 			(this._player.vo as vo.GamePlayerVO).xpState = TypeXpUp.AUTO_UP;
// 			this._player.autoAttack = true;
// 			this._player.refreshTeamLeader();
// 			//this._player.petFllow=true;
// 			this._scene.start();
// 			this._player.hpAutoEnabled = true;
// 			this._player.come(500);
// 			this._player.start();
// 			//this._player.fixedMoveSpeed=10;
// 			this._scene.manager.onMonsterDead(this, this.monsterDeadHandler);
// 			this.startRefreshMonster();//刷怪 
// 			for (var i = 0; i < GameModels.chapter.unionRobotPlayerVOs.length; i++) {
// 				if (GameModels.chapter.unionRobotPlayerVOs[i].uid != "") {
// 					this.addRobot(i);//增加机器人
// 				}
// 			}
// 			this.startSyncMonsterKillCount();//同步杀怪数量
// 			this.enableControl();
// 			super.start();
// 		}
// 		protected stop() {
// 			this._player.offDead(this, this.playerDeadHandler);
// 			this._player.stop();
// 			this._scene.stop();
// 			this.stopRefreshMonster();
// 			this.stopSyncMonsterKillCount();
// 			GameModels.chapter.requesUnionSyncKillCount(GameModels.chapter.unionKillCount);
// 		}
// 		/**玩家不打玩家 */
// 		public isEnemyObject(fs: SmartObject, target: SmartObject): boolean {
// 			if (fs == target || fs == null || target == null) return false;
// 			if (TypeActor.isPlayerOrPet(fs.type) && TypeActor.isPlayerOrPet(target.type)) return false;
// 			return super.isEnemyObject(fs, target);
// 		}
// 		public addRobot(index: number) {
// 			if (this._robot && this._robot[index] && this._robot[index].parent) return;
// 			if (!this._robot[index]) {
// 				this._robot[index] = utils.ObjectPool.from(GameRobot) as GameRobot;
// 			}
// 			GameModels.chapter.unionRobotPlayerVOs[index].resetState();
// 			this._robot[index].aiClass = AITeamPet;
// 			this._robot[index].petAIClass = AITeamPet;
// 			this._robot[index].initialize(GameModels.chapter.unionRobotPlayerVOs[index]);
// 			//this._robot.setMaster(this._player);
// 			this._robot[index].effectEnabled = false;
// 			this._robot[index].damgeEnabled = false;
// 			this._robot[index].vo.hpAutoRecover = (GameModels.chapter.unionRobotPlayerVOs[index].hp * 0.5);
// 			this._scene.addPlayer(this._robot[index]);
// 			this._robot[index].setTile(battle.manager.getAroundRandomNode(this._scene, this._player.tileNode));
// 			this._robot[index].autoAttack = true;
// 			this._robot[index].refreshTeamLeader();
// 			this._robot[index].start();
// 			this._robot[index].setFriendTitle();
// 		}
// 		public removeRobot() {
// 			if (this._robot && this._robot.length > 0) {
// 				for (var i = 0; i < this._robot.length; i++) {
// 					if (this._robot[i]) {
// 						this._robot[i].stop();
// 						if (this._robot[i].parent) {
// 							this._scene.removePlayer(this._robot[i]);
// 							utils.ObjectPool.to(this._robot[i], true);
// 						}
// 					}
// 				}
// 				this._robot.length = 0;
// 			}
// 		}
// 		protected stopAttack() {
// 			this._player.offTileChange(this, this.playerTileChangeHandler);
// 			if (this._modelScene) this._modelScene.syncTarget(null);
// 			this._player.target = null;
// 		}
// 		private playerDeadHandler(killerVO: vo.GamePlayerVO) {
// 			this.stop();
// 			this.enterChapter();
// 		}
// 		private startSyncMonsterKillCount() {
// 			this.stopSyncMonsterKillCount();
// 			GameModels.chapter.requesUnionSyncKillCount(GameModels.chapter.unionKillCount);
// 			utils.timer.once(5000, this, this.startSyncMonsterKillCount);
// 		}
// 		private stopSyncMonsterKillCount() {
// 			utils.timer.clear(this, this.startSyncMonsterKillCount);
// 		}
// 		private startRefreshMonster(): void {
// 			this.stopRefreshMonster();
// 			if (app.gameContext.manager.monsterTotal <= 0) GameModels.chapter.refreshUnionMonster();
// 			utils.timer.once(1000, this, this.startRefreshMonster);
// 			if(GameModels.chapter.monsterDrops == null || GameModels.chapter.monsterDrops.length == 0)
// 			{
// 				var now:number = egret.getTimer();
// 				if(now - this._lastRequestDropTime > 5000) //5秒请求一下掉落
// 				{
// 					GameModels.chapter.requestMonsterDrop();
// 					this._lastRequestDropTime = now;
// 				}
// 			}
// 		}
// 		private stopRefreshMonster(): void {
// 			utils.timer.clear(this, this.startRefreshMonster);
// 		}
// 		private dropItemClearHandler(dropItems: vo.ItemVO[]) {
// 			GameModels.chapter.clearNormalDrops();
// 			var point: egret.Point = this._player.localToGlobal();
// 			var flyItem: s.FlyIconsEffect = new s.FlyIconsEffect();
// 			flyItem.initialize(dropItems, point);
// 			GameModels.chapter.clearBossDrops();
// 			//飘银两
// 			let targetPos: egret.Point = (mg.uiManager.getView(main.MainUIView) as main.MainUIView).getMoneyPostion(true);
// 			mg.effectManager.flyEffects("6160", 10, point, targetPos, mg.layerManager.uiEffect);
// 			flyItem.start();
// 			for (var itemVO of this._monsterDrops) {
// 				vo.toPool(itemVO);
// 			}
// 			this._monsterDrops.length = 0;
// 		}
// 		private _startPoint: egret.Point;
// 		private _endPoint: egret.Point;
// 		private monsterDeadHandler(smartVO: vo.GameSmartVO, type: number, node: PF.Node, killer: SmartObject) {
// 			if (!killer) return;
// 			if (killer.type == TypeActor.ROBOT) return;
// 			if (killer.master != null && killer.master.type == TypeActor.ROBOT) return;
// 			switch (type) {
// 				case TypeActor.MONSTER: {
// 					if (!this._startPoint) this._startPoint = new egret.Point();
// 					if (!this._endPoint) this._startPoint = new egret.Point();
// 					var startPoint: egret.Point = this._startPoint;
// 					var endPoint: egret.Point = this._endPoint;
// 					startPoint.setTo(game.MapConfig.getReaX(node.x), game.MapConfig.getReaY(node.y) - 60);
// 					startPoint = this._scene.localToGlobal(startPoint.x, startPoint.y, startPoint);
// 					if (GameModels.chapter.monsterDrops && !this._scene.hasDrop && (Math.random() > 0.5)) {
// 						if (this._monsterDrops == null) {
// 							this._monsterDrops = [];
// 						}
// 						for (var itemVO of GameModels.chapter.monsterDrops) {
// 							this._monsterDrops.push(itemVO.clone());
// 						}
// 						this._scene.onDropClear(this, this.dropItemClearHandler, this._monsterDrops);
// 						this._scene.manager.dropItems(node, GameModels.chapter.monsterDrops); //道具不掉的话，就掉假银币
// 						//GameModels.chapter.clearNormalDrops();
// 					}
// 					GameModels.chapter.unionKillCount++;
// 				}
// 				break;
// 			}
// 		}
// 	}
// } 

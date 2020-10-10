// module s {
// 	export class GameHongYanBoss extends GameMutiPlayerBoss {
// 		constructor(type: number) {
// 			super(TypeGame.HONGYAN_BOSS);
// 		}
// 		/*protected getEnemy(type: number): number[] {
// 			switch (type) {
// 				case TypeActor.PLAYER:
// 				case TypeActor.PET:
// 					return [TypeActor.MONSTER, TypeActor.BOSS]
// 				case TypeActor.MONSTER:
// 				case TypeActor.BOSS:
// 					return [TypeActor.PLAYER]
// 			}
// 			return [];
// 		}
// 		*/
// 		/**玩家不打玩家 */
//         public isEnemyObject(fs: SmartObject, target: SmartObject): boolean {
// 			if(fs == target || fs == null || target == null) return false;
// 			if(TypeActor.isPlayerOrPet(fs.type) && TypeActor.isPlayerOrPet(target.type)) return false;
//             return super.isEnemyObject(fs,target);
//         }
// 		/*public enter(vo: vo.CopyVO) {
// 			super.enter(vo);
// 			Loading.instance.add();
// 			Loading.instance.updateProgress(1);
// 			this._scene.clear(true);
// 			this.enterMap(vo.template.map);
// 		}
// 		public exit() {
// 			this._player.remove();
// 			utils.timer.clear(this, this.end);
// 			// this._player.offDead(this, this.userDeadHandler);
// 			// this._player.offRelife(this, this.userRelifeHandler);
// 			super.exit();
// 			GameModels.scene.offObjectStatusChange(this, this.sightStatusHandler);
// 			this._scene.clear(true);
// 		}
// 		*/
// 		protected addMonsterToSight(monsterVO: vo.GameMonsterVO) {
// 			var monster: GameMonster = super.addMonsterToSight(monsterVO);
// 			if (monster.vo.type == TypeActor.BOSS) {
// 				copy.CopyMainView.instance.showBossBlood(monster.vo as vo.GameMonsterVO);
// 			}
// 			return monster;
// 		}
// 		// protected sightInitHandler() {
// 		// 	this.enableControl();
// 		// 	this.enableObjectsTap();
// 		// }
// 		public start() {
// 			Loading.instance.remove();
// 			super.start();
// 			this._player.come(500);
// 			this._scene.lookAt(this._player);
// 			// this._player.onDead(this, this.userDeadHandler);
// 			//GameModels.scene.onObjectStatusChange(this, this.sightStatusHandler);
// 			// this._player.onRelife(this, this.userRelifeHandler);
// 			CopyTimerCountDown.instance.start(3, this, this.startHandler);
// 		}
// 		protected startHandler() {
// 			GameModels.scene.startGame();
// 			this._player.autoAttack=true;
// 			this._player.start();
// 			this.enableControl(); //可以控制移动
// 			super.startHandler();
// 		}
// 		/*protected sightStatusHandler(smartVO: vo.GameSmartVO, status: boolean, killerVO: vo.GameSmartVO) {
// 			if (smartVO instanceof vo.GamePlayerVO) {
// 				if (smartVO == this._player.vo) {
// 					if (status) {
// 						this.userRelifeHandler();
// 					} else {
// 						this.userDeadHandler(killerVO);
// 					}
// 				}
// 				else
// 				{
// 					if (status) {				
// 						this.otherPlayerRelifeHandler(smartVO);
// 					}
// 					else {
// 						this.otherPlayerDeadHandler(smartVO, killerVO as vo.GamePlayerVO);
// 					}
// 				}
// 			}
// 		}*/
// 		/**玩家死亡 */
// 		/*protected userDeadHandler(killerVO: vo.GameSmartVO) {
// 			var killerName: string = 'BOSS';
// 			if (killerVO instanceof vo.GamePlayerVO) {
// 				killerName = killerVO.name;
// 			}
// 			copy.CopyMainView.instance.relifeView.show(killerName, "", 15, 100, this, function (useGold: boolean) {
// 				GameModels.scene.requestRelife(useGold ? 1 : 0)
// 			});
// 		}
// 		*/
// 		/**玩家复活 */
// 		/*protected userRelifeHandler() {
// 			mg.alertManager.closeALert();
// 			GameModels.user.player.resetState();
// 			//this._player.initialize(GameModels.user.player);
// 			this._player.damgeEnabled = false;
// 			this._player.effectEnabled = true;
// 			this._player.autoMerged = true;
// 			this._player.autoAttack = true;
// 			this._player.setTile(this._scene.getNode(GameModels.user.player.tileX, GameModels.user.player.tileY));
// 			this._player.actionTo(TypeAction.IDLE, TypeDirection.DOWN);
// 			this._player.petGroup.formatPosition(this._player.direct, this._player.tileNode);
// 			this._player.target = null;
// 			this._player.refreshTeamLeader();
// 			this._player.start();
// 		}
// 		*/
// 		/**其他玩家死亡 */
// 		protected otherPlayerDeadHandler(bodyVO: vo.GamePlayerVO, killerVO: vo.GamePlayerVO) {
// 		}
// 		/**其他玩家复活 */
// 		/*protected otherPlayerRelifeHandler(bodyVO: vo.GamePlayerVO) {
// 			var player: GamePlayer = this.getObjectByVO(bodyVO) as GamePlayer;
// 			if (player) {
// 				bodyVO.resetState();
// 				//player.initialize(bodyVO);
// 				player.damgeEnabled = false;
// 				player.effectEnabled = false;
// 				player.autoMerged = false;
// 				player.autoAttack = false;
// 				player.setTile(this._scene.getNode(bodyVO.tileX, bodyVO.tileY));
// 				player.actionTo(TypeAction.IDLE, TypeDirection.DOWN);
// 				player.petGroup.formatPosition(player.direct, player.tileNode);
// 				player.target = null;
// 				player.refreshTeamLeader();
// 				player.start();
// 			}
// 		}
// 		*/
// 		public getExitAutoOpenUI(): string {
// 			return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.hongyanBoss;
// 		}
// 		public getExitAutoOpenUITableIndex(): number {
// 			return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 0;
// 		}
// 		/*protected endHandler(result: boolean, totalStar: number, dropItems: vo.ItemVO[]) {
// 			this.end(result, totalStar, dropItems);
// 		}*/
// 	}
// } 

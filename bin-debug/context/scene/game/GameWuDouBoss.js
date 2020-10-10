// module s {
// 	export class GameWuDouBoss extends GameSiginPlayerBoss {
// 		constructor(type: number) {
// 			super(TypeGame.WUDOU_BOSS);
// 			this._countdownValue = 3;
// 			this._delayTime = 3;
// 		}
// 		public enter() {
// 			this._isEnter = true;
// 			this._isEnterOver = false;
// 			this._scene.clear(true);
// 			this.enterMap(23001);
// 		}
// 		public exit() {
// 			super.exit();
// 		}
// 		public start() {
// 			//GameModels.scene.onSightAdd(this,this.sightAddHandler);
// 			//GameModels.scene.onSightRemove(this,this.sightRemoveHandler);
// 			//GameModels.scene.onGameOver(this,this.endHandler);
// 			//this.displaySightObjects();
// 			//this.displayMyPlayer();
// 			super.start();
// 			this._scene.start();
// 			this._scene.lookAtCenter(this._player);
// 			//this.enableControl();
// 		}
// 		public getExitAutoOpenUI(): string {
// 			return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.sgOpenServer;
// 		}
// 		public getExitAutoOpenUITableIndex(): number {
// 			return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : game.sgActivityType.wd;
// 		}
// 		protected startUI() {
// 			copy.CopyMainView.instance.showBossBlood(GameModels.scene.sights[0] as vo.GameMonsterVO);
// 		}
// 	}
// } 

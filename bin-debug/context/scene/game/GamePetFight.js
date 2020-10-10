// module s {
// 	export class GamePetFight extends GameSightsBase {
// 		constructor(type:number) {
// 			super(type?type:TypeGame.PET_FIGHT);
// 		}
// 		public getExitAutoOpenUI():string{
//             return this._exitOpenUI?this._exitOpenUI:s.UserfaceName.exploreDreamland;
//         }
//         public getExitAutoOpenUITableIndex():number{
//             return this._exitOpenUITabIndex?this._exitOpenUITabIndex:0;
//         }
// 		public enter(enemyPlayerVO: vo.GamePlayerVO) {
// 			super.enter();
// 			Loading.instance.add();
// 			Loading.instance.updateProgress(1);
// 			this._scene.clear(true);
// 			this.enterMap(22003);
// 		}
//         public exit() {
// 			this._player.remove();
// 			utils.timer.clear(this, this.end);
// 			super.exit();
// 			this._scene.clear(true);
// 		}
// 		public start() {
// 			Loading.instance.remove();
// 			super.start();
// 			this._player.come(500);
// 			CopyTimerCountDown.instance.start(3, this, this.startHandler);
// 		}
// 		protected startHandler() {
// 			GameModels.scene.startGame();
// 			this._player.autoAttack = false;
// 			this._player.start();
// 			this._player.targetVO = GameModels.scene.sights[0];
// 			super.startHandler();
// 		}
//         protected displayMyPlayer() {
// 			super.displayMyPlayer();
// 			this._player.autoAttack = false;
// 		}
// 		protected stop() {
// 			utils.timer.clearAll(this);
// 			this._scene.offDropClear();
// 			this._player.stop();
// 			this._scene.stop();
// 			CopyTimerCountDown.instance.stop();
// 			super.stop();
// 		}
//         protected endHandler(result:boolean,totalStar:number,dropItems:vo.ItemVO[],...args){
//             this.end(result,totalStar,dropItems);
//         }
// 	}
// } 

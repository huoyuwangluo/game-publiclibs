// module vo {
// 	export class SignVO extends VOBase {
// 		private _temps: templates.magicChess[];
// 		private _tempsNum: number = 5;
// 		private _signNode: number;
// 		private _rewards: vo.ItemVO[];
// 		public constructor() {
// 			super();
// 		}
// 		public initialize(signNode: number): void {
// 			this._signNode = signNode;
// 			this.setTempsAndReward();
// 		}
// 		public reset(): void {
// 			this._temps = null;
// 			vo.toPoolList(this._rewards);
// 			this._rewards = null;
// 			this._signNode = 0;
// 		}
// 		private setTempsAndReward() {
// 			this._temps = [];
// 			this._rewards = [];
// 			var maxId: number = this._signNode * this._tempsNum;
// 			var minId: number = maxId - this._tempsNum + 1;
// 			for (var i: number = minId; i <= maxId; i++) {
// 				var temp: templates.magicChess = Templates.getTemplateById(templates.Map.MAGICCHESS, i);
// 				this._rewards.push(this.getReward(temp.rewards));
// 				this._temps.push(temp);
// 			}
// 		}
// 		private getReward(temp: string): vo.ItemVO {
// 			var item: any;
// 			if (temp) {
// 				var itemStr: string[] = temp.split("_");
// 				if (Math.floor(parseInt(itemStr[0]) / 100000) == 1) {
// 					item = <vo.EquipVO>vo.fromPool(vo.EquipVO, parseInt(itemStr[0]));
// 				}
// 				else {
// 					item = <vo.ItemVO>vo.fromPool(vo.ItemVO, parseInt(itemStr[0]));
// 				}
// 				item.count = parseInt(itemStr[1]);
// 				return item;
// 			}
// 			return null;
// 		}
// 		public updateItemByPos(pos: number, item: string) {
// 			if (this._rewards && (pos - 1) > 0) {
// 				this._rewards[pos - 1] = this.getReward(item);
// 			}
// 		}
// 		public get temps(): templates.magicChess[] {
// 			return this._temps;
// 		}
// 		public get rewards(): any[] {
// 			return this._rewards;
// 		}
// 		public get signNode(): number {
// 			return this._signNode;
// 		}
// 	}
// } 

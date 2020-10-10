// module vo {
// 	export class PlayerAgreementVO extends VOBase {
// 		private _equipContractTemplate: templates.equipContract;
// 		private _contractList: Array<n.ProtoPetContractData>
// 		public constructor() {
// 			super();
// 		}
// 		public initialize(...args) {
// 			this._contractList = [];
// 		}
// 		public reset() {
// 			this._equipContractTemplate = null;
// 			this._contractList = null;
// 		}
// 		public decode(data:Array<n.ProtoPetContractData>): void {
// 			for (var i: number = 0; i < data.length; i++) {
// 				if (data[i].posId) {
// 					this._contractList[data[i].posId - 1] = data[i];
// 				}
// 			}
// 			this._contractList.length = 4;
// 		}
// 		/**
// 		 * 角色契约
// 		 */
// 		public getpetequipContract(id: string): templates.equipContract {
// 			this._equipContractTemplate = Templates.getTemplateById(templates.Map.EQUIPCONTRACT, id);
// 			return this._equipContractTemplate;
// 		}
// 		public setpetequipContractproperties(id: string): string {
// 			let args: Array<any> = [];
// 			let petContract: templates.equipContract = Templates.getTemplateById(templates.Map.EQUIPCONTRACT, id);
// 			// let arr: Array<string> = petContract.properties.split(";");
// 			// for (var i: number = 0; i < arr.length; i++) {
// 			// 	let arr1 = arr[i].split("_")
// 			// 	args.push({ key: arr1[0], value: arr1[1] });
// 			// }
// 			return petContract.properties;
// 		}
// 		public getpetequipContractNeedLv(id: string): any {
// 			let data = { string: "", color: 0x000000 }
// 			let petContract: templates.equipContract = Templates.getTemplateById(templates.Map.EQUIPCONTRACT, id);
// 			if (petContract.needLv < 1000) {
// 				data.string = Language.getExpression(Language.E_1J, petContract.needLv);
// 				if (GameModels.user.player.level >= petContract.needLv) {
// 					data.color = 0x00FF00;
// 				}
// 				else {
// 					data.color = 0xFF0000;
// 				}
// 				return data;
// 			}
// 			else {
// 				var num = Math.floor(petContract.needLv / 1000)
// 				data.string = Language.getExpression(Language.E_S1, num);
// 				if (GameModels.user.player.zhuanShenLevel >= num) {
// 					data.color = 0x00FF00;
// 				} else {
// 					data.color = 0xFF0000;
// 				}
// 				return data;
// 			}
// 		}
// 		public getpetequipContractConsume1(id: string): any {
// 			let data = { string: "", color: 0x000000 }
// 			let petContract: templates.equipContract = Templates.getTemplateById(templates.Map.EQUIPCONTRACT, id);
// 			let arr = petContract.consume1.split("_");
// 			if (arr.length == 2) {
// 				if (Number(arr[1]) <= GameModels.bag.getItemCountById(arr[0])) {
// 					data.string = GameModels.bag.getItemCountById(arr[0]) + "/" + arr[1];
// 					data.color = 0x00FF00;
// 				}
// 				else {
// 					data.string = GameModels.bag.getItemCountById(arr[0]) + "/" + arr[1];
// 					data.color = 0xFF0000;
// 				}
// 			}
// 			return data;
// 		}
// 		public getpetequipContractConsume2(id: string): any {
// 			let data = { string: "", color: 0x000000 }
// 			let petContract: templates.equipContract = Templates.getTemplateById(templates.Map.EQUIPCONTRACT, id);
// 			let arr = petContract.consume2.split("_");
// 			if (arr.length == 2) {
// 				if (Number(arr[1]) <= GameModels.bag.getItemCountById(arr[0])) {
// 					data.string = GameModels.bag.getItemCountById(arr[0]) + "/" + arr[1];
// 					data.color = 0x00FF00;
// 				}
// 				else {
// 					data.string = GameModels.bag.getItemCountById(arr[0]) + "/" + arr[1];
// 					data.color = 0xFF0000;
// 				}
// 			}
// 			return data;
// 		}
// 		/**
// 		 * 角色契约
// 		 */
// 		public get contractlist(): Array<n.ProtoPetContractData> {
// 			return this._contractList;
// 		}
// 		public getContractlistByIndex(index: number): n.ProtoPetContractData {
// 			return this._contractList[index];
// 		}
// 		public setContractlistbyIndex(index: number, data: n.ProtoPetContractData): void {
// 			if (data) {
// 				this._contractList[index] = data;
// 			}
// 		}
// 	}
// } 

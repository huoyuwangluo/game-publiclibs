// module dialog.platformactivity {
//     export class ShouCangAwardDialog extends ui.ShouCangAwardSkin {
//         private _rewards: components.RewardItemBox[];//shoucang
//         public constructor() {
//             super();
//         }
//         protected initialize() {
//             super.initialize();
//             this._rewards = [this.reward0, this.reward1, this.reward2];
//             Mediator.getMediator(this).onAdd(this, this.enter);
//             Mediator.getMediator(this).onRemove(this, this.exit);
//         }
//         private enter() {
//             this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
//             this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this)
//             this.refeshData();
//         }
//         private exit() {
//             this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
//             this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this)
//         }
//         private refeshData(): void {
//             var rewardData = GameModels.dataSet.getDataSettingById(709001);
//             var list: any[] = convert.parseItemsInfo(rewardData.value);
//             for (var i = 0; i < 3; i++) {
//                 if (list[i]) {
//                     this._rewards[i].dataSource = (list[i].id + "_" + list[i].count);
//                 } else {
//                     this._rewards[i].visible = false;
//                 }
//             }
//         }
//         private onReceive(e: egret.TouchEvent): void {
//             GameModels.platformActivity.showFocus();
//             mg.uiManager.remove(this);
//         }
//         private onClose(e: egret.TouchEvent): void {
//             mg.uiManager.remove(this);
//         }
//     }
// } 

// module dialog.platformactivity {
//     export class YellowDiamondGift extends ui.YellowDiamondGiftSkin {
//         private _rewardCurrs: components.RewardItemBox[];
//         private _rewardNexts: components.RewardItemBox[];
//         private _dataSeting: Array<templates.dataSetting>;
//         public constructor() {
//             super();
//         }
//         protected initialize() {
//             super.initialize();
//             this._rewardCurrs = [this.reward0, this.reward1, this.reward2];
//             this._rewardNexts = [this.reward3, this.reward4, this.reward5];
//             this._dataSeting = [];
//             var dataSettingID: number[] = [717001, 717002, 717003, 717004, 717005, 717006];
//             for (var i = 0; i < dataSettingID.length; i++) {
//                 var setting: templates.dataSetting =GameModels.dataSet.getDataSettingById(dataSettingID[i]);
//                 if (setting) this._dataSeting.push(setting);
//             }
//             Mediator.getMediator(this).onAdd(this, this.enter);
//             Mediator.getMediator(this).onRemove(this, this.exit);
//         }
//         private enter() {
//             this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
//             this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this)
//             this.refeshData();
//             GameModels.platformActivity.addEventListener(mo.ModelPlatformActivity.YELLOW_DIAMODE_UPDATE, this.refeshData, this);
//         }
//         private exit() {
//             this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
//             this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this)
//             GameModels.platformActivity.removeEventListener(mo.ModelPlatformActivity.YELLOW_DIAMODE_UPDATE, this.refeshData, this);
//         }
//         private refeshData(): void {
//             this.btnReceive.visible = false;
//             this.imgFinsh.visible = false;
//             this.imgVip.filters = null;
//             this.imgVip.source = "platformactivity_json.img_Yellow_v" + GameModels.platformActivity.yellowDiamondLv;
//             if (GameModels.platformActivity.yellowDiamondLv <= 0) {
//                 this.imgVip.filters = utils.filterUtil.grayFilters;
//                 for (var i = 0; i < 3; i++) {
//                     this._rewardCurrs[i].visible = false;
//                     if (this._dataSeting && this._dataSeting[0]) {
//                         var str: string[] = this._dataSeting[0].value.split(";");
//                         if (str[i]) this._rewardNexts[i].dataSource = str[i];
//                     }
//                 }
//             }
//             else if (GameModels.platformActivity.yellowDiamondLv >= 6) {
//                 if (GameModels.platformActivity.yellowDiamondState) {
//                     this.imgFinsh.visible = true;
//                 }
//                 else {
//                     this.btnReceive.visible = true;
//                 }
//                 for (var i = 0; i < 3; i++) {
//                     this._rewardNexts[i].visible = false;
//                     if (this._dataSeting && this._dataSeting[5]) {
//                         var str: string[] = this._dataSeting[5].value.split(";");
//                         if (str[i]) this._rewardCurrs[i].dataSource = str[i];
//                     }
//                 }
//             }
//             else {
//                 if (GameModels.platformActivity.yellowDiamondState) {
//                     this.imgFinsh.visible = true;
//                 }
//                 else {
//                     this.btnReceive.visible = true;
//                 }
//                 for (var i = 0; i < 3; i++) {
//                     this._rewardCurrs[i].visible = true;
//                     this._rewardNexts[i].visible = true;
//                     if (this._dataSeting && this._dataSeting[GameModels.platformActivity.yellowDiamondLv - 1]) {
//                         var data: templates.dataSetting = this._dataSeting[GameModels.platformActivity.yellowDiamondLv - 1];
//                         if (data) {
//                             var str: string[] = data.value.split(";");
//                             if (str[i]) this._rewardCurrs[i].dataSource = str[i];
//                         }
//                     }
//                     if (this._dataSeting && this._dataSeting[GameModels.platformActivity.yellowDiamondLv]) {
//                         var data1: templates.dataSetting = this._dataSeting[GameModels.platformActivity.yellowDiamondLv];
//                         if (data1) {
//                             var str: string[] = data1.value.split(";");
//                             if (str[i]) this._rewardNexts[i].dataSource = str[i];
//                         }
//                     }
//                 }
//             }
//         }
//         private onReceive(e: egret.TouchEvent): void {
//             if (utils.CheckUtil.checkBagSmelting()) return;
//             if (GameModels.platformActivity.yellowDiamondLv > 0) {
//                 var id:number= 60240 + GameModels.platformActivity.yellowDiamondLv;
//                 GameModels.platformActivity.requesYellowDiamondGetGift(id,utils.Handler.create(this, function () {
//                     this.refeshData();
//                 }));
//             }
//         }
//         private onClose(e: egret.TouchEvent): void {
//             mg.uiManager.remove(this);
//         }
//     }
// } 

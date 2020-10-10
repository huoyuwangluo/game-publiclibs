// module dialog.platformactivity {
//     export class YaoQingAwardDialog extends ui.YaoQingAwardSkin {
//         private _rewards: components.RewardItemBox[];//邀请奖励
//         private _time: number;
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
//             GameModels.platformActivity.addEventListener(mo.ModelPlatformActivity.PLAT_STATE_UPDATE, this.updateTime, this);
//             this._time = GameModels.platformActivity.shareCountCD;
//             GameModels.platformActivity.getUesrPlatStateInfo(utils.Handler.create(this, this.complte));
//             this.updateLab();
//             utils.timer.loop(1000, this, this.updateLab);
//             this.updateTime();
//             this.refeshData();
//         }
//         private complte() {
//             this._time = GameModels.platformActivity.shareCountCD;
//         }
//         private exit() {
//             this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
//             this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this)
//             GameModels.platformActivity.removeEventListener(mo.ModelPlatformActivity.PLAT_STATE_UPDATE, this.updateTime, this);
//             utils.timer.clearAll(this);
//         }
//         private updateLab() {
//             var str = ''
//             if (this._time > 0 && GameModels.platformActivity.todayShareState > 0) {
//                 str = utils.DateUtil.formatTimeLeft(this._time)
//                 this.timeDownLabel.text = Language.getExpression(Language.E_YQYJ, str);
//                 this._time--;
//             }
//             else {
//                 this.timeDownLabel.text = "";
//                 this._time = 0;
//             }
//         }
//         private refeshData(): void {
//             var rewardData = TGameModels.dataSet.getDataSettingById((704001 + 3 - GameModels.platformActivity.todayShareState));
//             if (GameModels.platformActivity.todayShareState == 0) {
//                 rewardData = GameModels.dataSet.getDataSettingById(704003);
//             }
//             var list: any[] = convert.parseItemsInfo(rewardData.value);
//             for (var i = 0; i < 3; i++) {
//                 if (list[i]) {
//                     this._rewards[i].dataSource = (list[i].id + "_" + list[i].count);
//                 } else {
//                     this._rewards[i].visible = false;
//                 }
//             }
//         }
//         public updateTime() {
//             this.timeLabel.text = Language.J_BRYQJL + "(" + (3 - GameModels.platformActivity.todayShareState) + "/" + 3 + ")";
//              GameModels.platformActivity.getUesrPlatStateInfo(utils.Handler.create(this, this.complte));
//         }
//         private onReceive(e: egret.TouchEvent): void {
//             if (platform.sdk && platform.sdk.type == platform.FKYLC) {
//                 mg.alertManager.showAlert(YaoQingGuidance, true,true,null);
//             }
//             else if(platform.sdk && platform.sdk.type == platform.WB&& platform.sdk.wanbaWx){
//                 mg.alertManager.showAlert(YaoQingGuidance, true,true,null);
//             }
//             else {
//                 GameModels.platformActivity.showShare();
//             }
//         }
//         private onClose(e: egret.TouchEvent): void {
//             mg.uiManager.remove(this);
//         }
//     }
// } 

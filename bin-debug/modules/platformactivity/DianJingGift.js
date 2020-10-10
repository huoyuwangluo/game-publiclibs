// module dialog.platformactivity {
//     export class DianJingGift extends ui.DianJingGiftSkin {
//         private _reward: components.RewardItemBox[];
//         public constructor() {
//             super();
//         }
//         protected initialize() {
//             super.initialize();
//             this._reward = [this.reward0, this.reward1, this.reward2];
//             Mediator.getMediator(this).onAdd(this, this.enter);
//             Mediator.getMediator(this).onRemove(this, this.exit);
//         }
//         private enter() {
//             this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
//             this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this)
//             this.btnSee.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this)
//             GameModels.platformActivity.requesDailyGiftState(mo.ModelPlatformActivity.DIANJING_GIFT,utils.Handler.create(this, function () {
//                 this.refeshData();
//             }));
//         }
//         private exit() {
//             this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
//             this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this)
//             this.btnSee.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this)
//             for (var i = 0; i < this._reward.length; i++) {
//                 this._reward[i].dataSource = null;
//             }
//         }
//         private refeshData(): void {
//             if (GameModels.platformActivity.dailyGiftState == 1) {
//                 this.btnReceive.visible = true;
//                 this.imgFinsh.visible = false;
//             }
//             else {
//                 this.btnReceive.visible = false;
//                 this.imgFinsh.visible = true;
//             }
//             var dataset: templates.dataSetting = GameModels.dataSet.getDataSettingById(mo.ModelPlatformActivity.DIANJING_GIFT);
//             if (dataset) {
//                 var str: string[] = dataset.value.split(";");
//                 for (var i = 0; i < this._reward.length; i++) {
//                     if (str[i]) {
//                         this._reward[i].visible = true;
//                         this._reward[i].dataSource = str[i];
//                     }
//                     else {
//                         this._reward[i].visible = false;
//                         this._reward[i].dataSource = null;
//                     }
//                 }
//             }
//         }
//         private onBtnClick(e: egret.TouchEvent): void {
//             if (e.currentTarget == this.btnSee) {
//                 if (platform.sdk) {
//                     var appid: string = platform.sdk.appId;
//                     var str: string = "http://m.egame.qq.com/download/app?channel=h5ldy2&type=act&url=qgameapi%3A%2F%2Fbrowser%3Furl%3Dhttp%253A%252F%2F%252Fcdn.egame.qq.com%252%252Fgame-weex%252Fpage%ge%252FdetailV2.html%253%253F" + appid + "%253D3463%2526_pggwv%253D8%2526_wv%253D1%2526v%253D20180730%2526ADTAG%253Dkjldy%26weex%3Dhttp%253A%252F%2F%252Fcdn.egame.qq.com%252%252Fgame-weex%252Fweex%252FdetailV2%V2%252Fapp.js%253%253F" + appid + "%253D3463%2526_pggwv%253D8%2526_wv%253D1%2526v%253D20180730%2526ADTAG%253Dkjldy"
//                     window.open(str);
//                 }
//             }
//             else {
//                 if (utils.CheckUtil.checkBagSmelting()) return;
//                 GameModels.platformActivity.requesGetDailyGift(mo.ModelPlatformActivity.DIANJING_GIFT,utils.Handler.create(this, function () {
//                     this.refeshData();
//                 }));
//             }
//         }
//         private onClose(e: egret.TouchEvent): void {
//             mg.uiManager.remove(this);
//         }
//     }
// } 

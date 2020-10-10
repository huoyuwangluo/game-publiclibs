// module dialog.platformactivity {
//     export class LogInAwardDialog extends ui.LogInAwardSkin {
//         private _rewards: components.RewardItemBox[];//关注
//         public constructor() {
//             super();
//         }
//         protected initialize() {
//             super.initialize();
//             this._rewards = [this.reward0, this.reward1, this.reward2];
//             Mediator.getMediator(this).onAdd(this, this.enter);
//             Mediator.getMediator(this).onRemove(this, this.exit);
//             //https://www.xy.com/h5/api/getQrCode?gid=xxxx&uid=xxxx&sign=xxxxxplatform.sdk.userId
//         }
//         private enter() {
//             this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
//             this.refeshData();
//             if(!platform.sdk){
//                 return;
//             }
//             var sign = window['md5']((platform.sdk.roleId).toString() + "37" + "x*aTQAumo*qByrff");
//             var loader: egret.URLLoader = new egret.URLLoader();
//             //设置加载方式为纹理
//             loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
//             //添加加载完成侦听
//             loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
//             //添加加载失败侦听
//             loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
//             var url = "https://interface.xy.com/h5/api/getQrCode?gid=37&uid=" + platform.sdk.roleId + "+&sign=" + sign;
//             var request: egret.URLRequest = new egret.URLRequest(url);
//             //开始加载
//             loader.load(request);
//         }
//         private onLoadComplete(event: egret.Event): void {
//             logger.log("onLoadComplete");
//             var loader: egret.URLLoader = <egret.URLLoader>event.target;
//             //获取加载到的纹理对象
//             var texture: egret.Texture = <egret.Texture>loader.data;
//             logger.log(texture);
//             this.codeImg.source = texture;
//         }
//         private onLoadError(): void {
//             logger.log("onLoadError");
//         }
//         private exit() {
//             this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
//         }
//         private refeshData(): void {
//             var rewardData = GameModels.dataSet.getDataSettingById(719001);
//             var list: any[] = convert.parseItemsInfo(rewardData.value);
//             for (var i = 0; i < 3; i++) {
//                 if (list[i]) {
//                     this._rewards[i].dataSource = (list[i].id + "_" + list[i].count);
//                 }else{
//                     this._rewards[i].visible=false;
//                 }
//             }
//         }
//         private onClose(e: egret.TouchEvent): void {
//             mg.uiManager.remove(this);
//         }
//     }
// } 

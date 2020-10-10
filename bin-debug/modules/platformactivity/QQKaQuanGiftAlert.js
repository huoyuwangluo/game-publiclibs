// module dialog.platformactivity {
// 	export class QQKaQuanGiftAlert extends ui.QQKaQuanGiftAlertSkin implements IAlert {
// 		public constructor() {
// 			super();
// 		}
// 		public show(isLingqu: boolean) {
// 			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
// 			this.labHave.visible = !isLingqu;
// 			this.labNoHave.visible = isLingqu;
// 			var rewardImg: components.RewardItemBox[] = [this.reward0, this.reward1, this.reward2];
// 			var data: templates.dataSetting = GameModels.dataSet.getDataSettingById(718021);
// 			if (data) {
// 				var str: string[] = data.value.split(";");
// 				for (var i = 0; i < 3; i++) {
// 					if (str[i]) rewardImg[i].dataSource = str[i];
// 				}
// 			}
// 		}
// 		private onClose(e: egret.TouchEvent): void {
// 			this.dispatchEventWith(egret.Event.CLOSE);
// 		}
// 		public hide() {
// 			this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
// 			if (this.parent) {
// 				this.parent.removeChild(this);
// 			}
// 		}
// 	}
// } 

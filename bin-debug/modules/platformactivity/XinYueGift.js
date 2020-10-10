// module dialog.platformactivity {
// 	export class XinYueGift extends ui.XinYueGiftSkin {
// 		private _reward: components.RewardItemBox[];
// 		public constructor() {
// 			super();
// 		}
// 		protected initialize() {
// 			super.initialize();
// 			this._reward = [this.reward0, this.reward1, this.reward2, this.reward3];
// 			Mediator.getMediator(this).onAdd(this, this.enter);
// 			Mediator.getMediator(this).onRemove(this, this.exit);
// 		}
// 		private enter() {
// 			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
// 			this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this)
// 			this.btnSee.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this)
// 			GameModels.platformActivity.requesDailyGiftState(mo.ModelPlatformActivity.XINYUE_GIFT, utils.Handler.create(this, function () {
// 				this.refeshData();
// 			}));
// 		}
// 		private exit() {
// 			this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
// 			this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this)
// 			this.btnSee.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this)
// 			for (var i = 0; i < this._reward.length; i++) {
// 				this._reward[i].dataSource = null;
// 			}
// 		}
// 		private refeshData(): void {
// 			if (GameModels.platformActivity.dailyGiftState == 1) {
// 				this.btnReceive.visible = true;
// 				this.imgFinsh.visible = false;
// 			}
// 			else {
// 				this.btnReceive.visible = false;
// 				this.imgFinsh.visible = true;
// 			}
// 			var dataset: templates.dataSetting = GameModels.dataSet.getDataSettingById(mo.ModelPlatformActivity.XINYUE_GIFT);
// 			if (dataset) {
// 				var str: string[] = dataset.value.split(";");
// 				for (var i = 0; i < this._reward.length; i++) {
// 					if (str[i]) {
// 						this._reward[i].visible = true;
// 						this._reward[i].dataSource = str[i];
// 					}
// 					else {
// 						this._reward[i].visible = false;
// 						this._reward[i].dataSource = null;
// 					}
// 				}
// 			}
// 		}
// 		private onBtnClick(e: egret.TouchEvent): void {
// 			if (e.currentTarget == this.btnSee) {
// 				var str: string = "http://xinyue.qq.com/act/a20181130xyh5game/index.html"
// 				window.open(str);
// 			}
// 			else {
// 				if (utils.CheckUtil.checkBagSmelting()) return;
// 				GameModels.platformActivity.requesGetDailyGift(mo.ModelPlatformActivity.XINYUE_GIFT, utils.Handler.create(this, function () {
// 					this.refeshData();
// 				}));
// 			}
// 		}
// 		private onClose(e: egret.TouchEvent): void {
// 			mg.uiManager.remove(this);
// 		}
// 	}
// } 

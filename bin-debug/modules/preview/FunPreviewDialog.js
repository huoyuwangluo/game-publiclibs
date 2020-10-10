// module dialog.funPreview {
// 	export class FunPreviewDialog extends ui.FunPreviewDialogSkin {
// 		private _listData: eui.ArrayCollection;
// 		public constructor() {
// 			super();
// 		}
// 		protected initialize() {
// 			super.initialize();
// 			Mediator.getMediator(this).onAdd(this, this.enter);
// 			Mediator.getMediator(this).onRemove(this, this.exit);
// 		}
// 		private enter(): void {
// 			if (!this._listData) {
// 				this._listData = new eui.ArrayCollection(GameModels.funcs.hashFunPreview);
// 			} else {
// 				this._listData.source = GameModels.funcs.hashFunPreview;
// 			}
// 			this.list.dataProvider = this._listData;
// 			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
// 			this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
// 		}
// 		private exit(): void {
// 			this.clearList(this.list);
// 			this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
// 			this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
// 		}
// 		private btnCloseClick(e: egret.TouchEvent): void {
// 			mg.uiManager.remove(this);
// 		}
// 	}
// } 

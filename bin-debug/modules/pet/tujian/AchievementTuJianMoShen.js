// module achievement {
// 	export class AchievementTuJianMoShen extends ui.AchievementTuJianMoShenSkin {
// 		private _step: number;
// 		private _handBookId: number;
// 		private _index1: number;
// 		private _index2: number;
// 		public constructor() {
// 			super();
// 		}
// 		protected initialize() {
// 			super.initialize();
// 			Mediator.getMediator(this).onAdd(this, this.enter);
// 			Mediator.getMediator(this).onRemove(this, this.exit);
// 		}
// 		public enter(data?: number): void {
// 			this.showView(data);
// 			this.img_check.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
// 		}
// 		public showView(data?: number): void {
// 			GameModels.handBook.requestHandbookInfo(utils.Handler.create(this, () => {
// 				var handBookVo: vo.HandBookVO[] = GameModels.handBook.handbookVo;
// 				this._step = 0;
// 				for (var i = 0; i < handBookVo.length; i++) {
// 					if (handBookVo[i]) {
// 						var handBookList: vo.HandBookIndexVO[] = handBookVo[i].handbookIndexVoList;
// 						var imgArr: eui.Group = this.imgGroup.getChildAt(i) as eui.Group;
// 						var deArchiveCount: number = 0;
// 						for (var j = 0; j < handBookList.length; j++) {
// 							var sealimg: eui.Image = imgArr.getChildAt(j) as eui.Image;
// 							var lineimg: eui.Image = this.lineGroup.getChildAt(i) as eui.Image;
// 							lineimg.visible = false;
// 							sealimg.visible = false;
// 							if (handBookList[j].status >= 2) {
// 								deArchiveCount++;
// 								if (deArchiveCount >= handBookList.length) {
// 									lineimg.visible = true;
// 								}
// 								sealimg.visible = true;
// 								sealimg.source = "tujian_json." + "img_moshenstate_3";
// 							}
// 						}
// 					}
// 				}
// 				this.expProgress.noTweenValue = GameModels.handBook.getSealCount() / GameModels.handBook.getAllTuJianCount();
// 				this.labValue.text = GameModels.handBook.getSealCount() + "/" + GameModels.handBook.getAllTuJianCount();
// 			}));
// 		}
// 		private onBtnClick(evt: egret.TouchEvent): void {
// 			mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 4101).des);
// 		}
// 		public exit(): void {
// 			this.img_check.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
// 		}
// 	}
// } 

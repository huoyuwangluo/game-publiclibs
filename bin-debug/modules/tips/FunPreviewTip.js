// module tips {
// 	export class FunPreviewTip extends ui.FunPreviewTipSkin {
// 		private _id: number;
// 		public constructor() {
// 			super();
// 		}
// 		private static _instance: FunPreviewTip;
// 		public static get instance(): FunPreviewTip {
// 			if (!FunPreviewTip._instance) {
// 				FunPreviewTip._instance = new FunPreviewTip();
// 				FunPreviewTip._instance.touchEnabled = FunPreviewTip._instance.touchChildren = false;
// 			}
// 			return FunPreviewTip._instance;
// 		}
// 		public show(id: number): void {
// 			this._id = id;
// 			this.anchorOffsetX = this.width / 2;
// 			this.anchorOffsetY = this.height / 2;
// 			this.imgIcon.source = "preview_json.img_preview_icon_" + id;
// 			mg.layerManager.tip.addChild(this);
// 			this.scaleX = this.scaleY = 2;
// 			this.alpha = 1;
// 			this.x = mg.stageManager.stageWidth * .5;
// 			this.y = mg.stageManager.stageHeight * .5;
// 			egret.Tween.get(this.imgbg).to({ rotation: 720 }, 1000, utils.Ease.quadInOut).wait(1000).call(function (): void {
// 				this.hide();
// 			}, this);
// 		}
// 		public hide(): void {
// 			egret.Tween.removeTweens(this);
// 			egret.Tween.get(this).to({ alpha: 0, }, 300, utils.Ease.cubicIn).call(function (): void {
// 				if (this.parent) {
// 					this.parent.removeChild(this);
// 				}
// 			});
// 			var game: templates.gameFunctions = Templates.getTemplateById(templates.Map.GAMEFUNCTIONS, this._id);
// 			if (game.uiOne) {
// 				var bagPosition: egret.Point = (mg.uiManager.getView(main.MainUIView) as main.MainUIView).getPointByName(game.uiOne);
// 				if (bagPosition) {
// 					var img: components.Icon = utils.ObjectPool.from(components.Icon) as components.Icon;
// 					img.initialize(this.imgIcon.texture);
// 					mg.layerManager.top.addChild(img);
// 					var point: egret.Point = this.imgIcon.localToGlobal(0, 0);
// 					img.anchorOffsetX = img.width / 2;
// 					img.anchorOffsetY = img.height / 2;
// 					img.x = point.x + img.width / 2;
// 					img.y = point.y + img.height / 2;
// 					egret.Tween.get(img).to({ x: bagPosition.x, y: bagPosition.y, scaleX: 0.5, scaleY: 0.5 }, 1000, utils.Ease.cubicInOut).call(this.flyOverHandler, this, [img])
// 				}
// 			}
// 		}
// 		private flyOverHandler(img: eui.Image) {
// 			if (img.parent) {
// 				img.parent.removeChild(img);
// 				img.scaleX = img.scaleY = 1;
// 			}
// 			this.imgIcon.source = null;
// 		}
// 	}
// } 

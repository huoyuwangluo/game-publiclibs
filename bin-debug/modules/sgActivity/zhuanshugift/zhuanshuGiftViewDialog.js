// module dialog.activity {
// 	export class zhuanshuGiftViewDialog extends ui.zhuanshuGiftViewSkin {
// 		private _imgFinsh: Array<eui.Image>;
// 		public constructor() {
// 			super();
// 		}
// 		protected initialize() {
// 			super.initialize();
// 			Mediator.getMediator(this).onAdd(this, this.enter);
// 			Mediator.getMediator(this).onRemove(this, this.exit);
// 			this._imgFinsh = [this.imgFinsh1, this.imgFinsh2, this.imgFinsh3];
// 		}
// 		private enter(): void {
// 			GameModels.zhuanshuGift.requestGetGiftInfo(utils.Handler.create(this, () => {
// 				if (!GameModels.zhuanshuGift.hasGift) {
// 					mg.alertManager.tip(Language.C_HDYJS);
// 					mg.uiManager.remove(this);
// 					return;
// 				}
// 				this.showView();
// 			}));
// 			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
// 			this.btnChongZhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnChongzhiClick, this);
// 			this.btnLingQu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLingQuClick, this);
// 			GameModels.zhuanshuGift.addEventListener(mo.ModelZhuanShuGift.CHANGE_GIFT_INFO, this.showView, this);
// 		}
// 		private exit(): void {
// 			utils.timer.clear(this, this.timerZhuanShuHandler);
// 			this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
// 			this.btnChongZhi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnChongzhiClick, this);
// 			this.btnLingQu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLingQuClick, this);
// 			GameModels.zhuanshuGift.removeEventListener(mo.ModelZhuanShuGift.CHANGE_GIFT_INFO, this.showView, this);
// 		}
// 		private _zhuanshuTime: number;
// 		private showView(): void {
// 			this.labTime.text = "";
// 			this.btnChongZhi.visible = false;
// 			this.btnLingQu.visible = false;
// 			this.imgCiRiLingqu.visible = false;
// 			for (var i = 0; i < this._imgFinsh.length; i++) {
// 				this._imgFinsh[i].visible = false;
// 			}
// 			this.labYuan.text = GameModels.zhuanshuGift.rechargeRMB + "";
// 			this.labYuanBao.text = GameModels.zhuanshuGift.rechargeRMB * 10 + "";
// 			this.currentState = "state1";
// 			this.showOneDayReward();
// 			if (GameModels.zhuanshuGift.rechargeStatus <= 0 && GameModels.zhuanshuGift.leftTime > 0) {
// 				this._zhuanshuTime = GameModels.zhuanshuGift.leftTime;
// 				utils.timer.clear(this, this.timerZhuanShuHandler);
// 				this.labTime.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_LBSYSJ, utils.DateUtil.formatTimeLeft(this._zhuanshuTime)));
// 				utils.timer.loop(1000, this, this.timerZhuanShuHandler);
// 			}
// 		}
// 		private timerZhuanShuHandler() {
// 			this._zhuanshuTime--;
// 			if (this._zhuanshuTime <= 0) {
// 				this._zhuanshuTime = 0;
// 				this.labTime.text = ""
// 				utils.timer.clear(this, this.timerZhuanShuHandler);
// 				GameModels.zhuanshuGift.requestGetGiftInfo(utils.Handler.create(this, () => {
// 					if (!GameModels.zhuanshuGift.hasGift) {
// 						mg.alertManager.tip(Language.C_HDYJS);
// 						mg.uiManager.remove(this);
// 						return;
// 					}
// 					this.showView();
// 				}));
// 				return;
// 			}
// 			this.labTime.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_LBSYSJ, utils.DateUtil.formatTimeLeft(this._zhuanshuTime)));
// 		}
// 		private showOneDayReward(): void {
// 			var strArr: string[] = GameModels.zhuanshuGift.rewardStr.split(";");
// 			this.rewardOne1.visible = strArr[0] ? true : false;
// 			this.rewardOne1.dataSource = strArr[0] ? strArr[0] : null;
// 			this.rewardOne2.visible = strArr[1] ? true : false;
// 			this.rewardOne2.dataSource = strArr[1] ? strArr[1] : null;
// 			if (GameModels.zhuanshuGift.rechargeStatus <= 0) {
// 				this.btnChongZhi.visible = true;
// 			}
// 			else {
// 				if (GameModels.zhuanshuGift.hasGift) {
// 					this.btnLingQu.visible = true;
// 				}
// 				else {
// 					mg.uiManager.remove(this);
// 				}
// 			}
// 		}
// 		private btnCloseClick(e: egret.TouchEvent): void {
// 			mg.uiManager.remove(this);
// 		}
// 		private btnChongzhiClick(): void {
// 			var temRecharge: templates.gameRecharge = Templates.getTemplateById(templates.Map.GAMERECHARGE, GameModels.zhuanshuGift.rechargeId);
// 			if (temRecharge) GameModels.platform.buy(temRecharge.RMB, 1, "" + temRecharge.id, temRecharge.name, temRecharge.des);
// 		}
// 		private _str: string = "";
// 		private btnLingQuClick(): void {
// 			this._str = GameModels.zhuanshuGift.rewardStr;
// 			GameModels.zhuanshuGift.requestGetGiftReward(1, utils.Handler.create(this, () => {
// 				if (this._str) {
// 					var flyItem: s.FlyIconsEffect = new s.FlyIconsEffect();
// 					flyItem.initializeConfigStr(this._str, this.rewardOne1.localToGlobal(), mg.layerManager.top);
// 					flyItem.start();
// 				}
// 				if (!GameModels.zhuanshuGift.hasGift) {
// 					mg.uiManager.remove(this);
// 					return;
// 				}
// 				this.showView();
// 			}));
// 		}
// 	}
// }

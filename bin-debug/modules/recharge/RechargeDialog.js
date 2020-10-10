// module dialog.recharge {
// 	export class RechargeDialog extends ui.RechargeDialogSkin {
// 		private _listDatas: eui.ArrayCollection;
// 		public constructor() {
// 			super();
// 		}
// 		protected initialize() {
// 			super.initialize();
// 			this.list.itemRenderer = renderer.RechargeItem;
// 			this.list.dataProvider = this._listDatas = new eui.ArrayCollection([]);
// 			Mediator.getMediator(this).onAdd(this, this.enter);
// 			Mediator.getMediator(this).onRemove(this, this.exit);
// 			GameModels.user.player.onPropertyChange(TypeProperty.VIP_LEVEL, this, this.onLevelChange);
// 			GameModels.user.player.onPropertyChange(TypeProperty.VIP_EXP, this, this.onLevelChange);
// 		}
// 		private enter(data: any): void {
// 			this.onLevelChange();
// 			this.btnVip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openVip, this);
// 			this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTouch, this);
// 		}
// 		private exit(): void {
// 			this.btnVip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openVip, this);
// 			this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTouch, this);
// 			GameModels.user.player.offPropertyChange(TypeProperty.VIP_LEVEL, this, this.onLevelChange);
// 			GameModels.user.player.offPropertyChange(TypeProperty.VIP_EXP, this, this.onLevelChange);
// 		}
// 		private requestVipRewardInfo(): void {
// 			GameModels.vip.requestVIPRewardInfo((utils.Handler.create(this, (data: n.G2C_VIP_RewardInfo) => {
// 				let level: number = GameModels.user.player.getProperty(TypeProperty.VIP_LEVEL) || 0;
// 				this.vipLevel.source = "newVip_json.vip_" + level;
// 				let next: templates.gameVip = GameModels.vip.getNextVipTemplate(level);
// 				this.labPro.text = data.VipExp >= next.vipExp ? next.vipExp + "/" + next.vipExp : data.VipExp + "/" + next.vipExp;
// 				this.expProgress.noTweenValue = data.VipExp / next.vipExp;
// 				if (!GameModels.vip.checkMaxVip(level)) {
// 					this.labUpgradeNeed.text = Language.getExpression(Language.E_ZCZ1MSCW2, (next.vipExp - data.VipExp), next.id);
// 				}
// 				else {
// 					this.labUpgradeNeed.text = Language.J_GXNVIPYDDDJ;
// 				}
// 			})));
// 		}
// 		private onLevelChange(): void {
// 			GameModels.recharge.requestRechargeData(utils.Handler.create(this, this.updateData));
// 			this.requestVipRewardInfo();
// 		}
// 		private openVip(e: egret.TouchEvent): void {
// 			 mg.uiManager.show(view.vip.VipMianDailog);
// 		}
// 		private itemTouch(e: eui.ItemTapEvent) {
// 			let data: vo.RechargeVO = e.item;
// 			// if (platform.sdk && platform.sdk.type == platform.XL) {
// 			// 	//无需翻译，只有闲来平台会用的中文
// 			// 	mg.alertManager.showAlert(PromptAlert, false, false, `是否花费${data.template.RMB * 10}个元宝购买[${data.template.name}]?`, TypeBtnLabel.BUY, null, utils.Handler.create(this, () => {
// 			// 		logger.log("调用充值", data.template.id, data.buyState);
// 			// 		GameModels.platform.buy(data.template.RMB, 1, "" + data.template.id, data.template.name, data.template.des);
// 			// 	}));
// 			// } else {
// 			// 	logger.log("调用充值", data.template.id, data.buyState);
// 			// 	GameModels.platform.buy(data.template.RMB, 1, "" + data.template.id, data.template.name, data.template.des);
// 			// }
// 			logger.log("调用充值", data.template.id, data.buyState);
// 			GameModels.platform.buy(data.template.RMB, 1, "" + data.template.id, data.template.name, data.template.des);
// 		}
// 		private updateData(): void {
// 			this._listDatas.replaceAll(GameModels.recharge.rechargeData);
// 		}
// 	}
// } 

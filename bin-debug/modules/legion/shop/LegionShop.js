// class LegionShop extends ui.LegionShopSkin {
// 	private _doujuList: eui.ArrayCollection;
// 	public constructor() {
// 		super();
// 	}
// 	protected initialize() {
// 		super.initialize();
// 		Mediator.getMediator(this).onAdd(this, this.enter);
// 		Mediator.getMediator(this).onRemove(this, this.exit);
// 	}
// 	public enter(): void {
// 		this.updataGongXian();
// 		this.currentState = "daoju";
// 		this.daojuscroller.viewport = this.daojulist;
// 		// this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
// 		// this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
// 		// this.btnGetData.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGetData, this);
// 		this.showDataList();
// 		GameModels.shop.requestUnionShop(TypeShop.UNION_SHOP);
// 		GameModels.legion.addEventListener(mo.ModelLegion.CHANGE_GONGXIAN, this.updataGongXian, this);
// 		GameModels.shop.addEventListener(mo.ModelShop.CHANEG_UNION_BUY_COUNT, this.updataList, this);
// 		GameModels.shop.addEventListener(mo.ModelShop.INIT_UNION_BUY_COUNT, this.showDataList, this);
// 		this.getItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.alertPropView, this);
// 	}
// 	public showDataList(): void {
// 		this.daojulist.dataProvider = this._doujuList = new eui.ArrayCollection(GameModels.shop.unionShopData);
// 	}
// 	public updataList(e: egret.Event): void {
// 		this._doujuList.itemUpdated(e.data);
// 	}
// 	// private onClickGetData(e: egret.TouchEvent): void {
// 	// 	mg.uiManager.show(LegionTask);
// 	// }
// 	private updataGongXian(): void {
// 		this.labMy.text = GameModels.legion.gongXian.toString();
// 	}
// 	protected commitProperties(): void {
// 		super.commitProperties()
// 		if (this.currentState == "daoju") {
// 			if (this.daojuscroller.verticalScrollBar) {
// 				this.daojuscroller.verticalScrollBar.autoVisibility = false;
// 				this.daojuscroller.verticalScrollBar.visible = false;
// 			}
// 		}
// 		if (this.currentState == "xiangou") {
// 			if (this.xiangouscroller.verticalScrollBar) {
// 				this.xiangouscroller.verticalScrollBar.autoVisibility = false;
// 				this.xiangouscroller.verticalScrollBar.visible = false;
// 			}
// 		}
// 	}
// 	private alertPropView() {
// 		mg.alertManager.showAlert(PropOfSourceAlert, true, true, 1401);
// 	}
// 	public exit(): void {
// 		// this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
// 		// this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
// 		// this.btnGetData.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGetData, this);
// 		GameModels.legion.removeEventListener(mo.ModelLegion.CHANGE_GONGXIAN, this.updataGongXian, this);
// 		GameModels.shop.removeEventListener(mo.ModelShop.INIT_UNION_BUY_COUNT, this.showDataList, this);
// 		this.getItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.alertPropView, this);
// 		this.clearList(this.daojulist);
// 	}
// 	private onClose(e: egret.TouchEvent): void {
// 		mg.uiManager.remove(this);
// 	}
// } 

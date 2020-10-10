// class TongJiLing extends ui.TongJiLingSkin {
// 	private _want: templates.wanted;
// 	private _petId: string;
// 	private _pet: templates.general;
// 	public static CHANG_TAL: string = "CHANG_TAL";
// 	public constructor() {
// 		super();
// 	}
// 	protected initialize() {
// 		super.initialize();
// 		Mediator.getMediator(this).onAdd(this, this.enter);
// 		Mediator.getMediator(this).onRemove(this, this.exit);
// 	}
// 	private enter(data: templates.general, want: templates.wanted = null): void {
// 		this.showView(data, want);
// 		this.btnCloseTip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
// 		this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoClick, this);
// 		this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
// 		this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
// 	}
// 	private showView(data: templates.general, want: templates.wanted = null): void {
// 		this._want = want;
// 		this._petId = data.id.toString();
// 		this._pet = data;
// 		this.labZhaoLingContent.text = "   " + Language.getExpression(Language.E_ZSL, data.name);
// 		this.labGeneralRenWu.text = Language.getExpression(Language.E_HDWJ1, data.name);
// 		this.reward0.dataSource = this._want.rewards;
// 		this.body.setPetBody(data.model);
// 		this.btnGo.label = GameModels.chapter.wantedState <= 0 ? Language.J_HQLJ : Language.J_LKLQ;
// 		this.btnGo.skinName = GameModels.chapter.wantedState <= 0 ? "skins.SnapBigButton1Skin" : "skins.SnapBigButton3Skin";
// 	}
// 	private onBtnClick(e: egret.TouchEvent): void {
// 		if (e.currentTarget == this.imgHelp) {
// 			if (this._pet) mg.TipManager.instance.showTip(tips.GeneralInfoTip, this._pet);
// 		} else {
// 			mg.uiManager.remove(this);
// 		}
// 	}
// 	private btnGoClick(): void {
// 		if (!this._want) return;
// 		if (GameModels.chapter.wantedState <= 0) {
// 			if (this._petId) mg.alertManager.showAlert(PropOfSourceAlert, true, true, this._petId);
// 		}
// 		else {
// 			GameModels.chapter.requestWantedGetReward(utils.Handler.create(this, function () {
// 				var fromPoint: egret.Point = new egret.Point(mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2);
// 				var moneyPoint = (mg.uiManager.getView(main.MainUIView) as main.MainUIView).getMoneyPostion(true);
// 				mg.effectManager.flyEffects("6161", 10, fromPoint, moneyPoint, mg.layerManager.top);
// 				mg.uiManager.remove(this);
// 			}));
// 		}
// 	}
// 	private exit(): void {
// 		utils.timer.clear(this);
// 		this._want = null;
// 		this._pet = null;
// 		this.btnCloseTip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
// 		this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoClick, this);
// 		this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
// 		this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
// 	}
// }

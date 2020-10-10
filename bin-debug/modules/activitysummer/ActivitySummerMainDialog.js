// module dialog.activity {
// 	export class ActivitySummerMainDialog extends ui.ActivitySummerMainDialogSkin {
// 		private _tabs: Array<renderer.ActivityTabButton>;
// 		private _views: Array<IModuleView>;
// 		private _curstack: eui.ViewStack;
// 		private _curtabs: Array<renderer.ActivityTabButton>;
// 		private _curviews: Array<IModuleView>;
// 		public constructor() {
// 			super();
// 		}
// 		protected initialize() {
// 			super.initialize();
// 			this._selected = -1;
// 			this.btnClose.sound = null;
// 			Mediator.getMediator(this).onAdd(this, this.enter);
// 			Mediator.getMediator(this).onRemove(this, this.exit);
// 			function getButton(imgIcon: string) {
// 				let btn = new renderer.ActivityTabButton();
// 				btn.setImgIcon = imgIcon;
// 				return btn;
// 			}
// 			this._tabs = [];
// 			this._tabs[game.TypeSummerActivity.LJDL] = getButton("activitySummer_icon1_json.btn_LJDL");
// 			this._tabs[game.TypeSummerActivity.MRLC] = getButton("activitySummer_icon1_json.btn_MRLC");
// 			this._tabs[game.TypeSummerActivity.XYLP] = getButton("activitySummer_icon1_json.btn_XYLP");
// 			this._tabs[game.TypeSummerActivity.JFSC] = getButton("activitySummer_icon1_json.btn_JFSC");
// 			this._tabs[game.TypeSummerActivity.XGLB] = getButton("activitySummer_icon1_json.btn_XGLB");
// 			this._tabs[game.TypeSummerActivity.HHZP] = getButton("activitySummer_icon1_json.btn_HHZP");
// 			this._tabs[game.TypeSummerActivity.BOSS] = getButton("activitySummer_icon1_json.btn_BOSS");
// 			this._tabs[game.TypeSummerActivity.JFPH] = getButton("activitySummer_icon1_json.btn_JFPH");
// 			this._tabs[game.TypeSummerActivity.SPFL] = getButton("activitySummer_icon1_json.btn_SPFL");
// 			this._tabs[game.TypeSummerActivity.DJZP] = getButton("activitySummer_icon1_json.btn_DJZP");
// 			this._tabs[game.TypeSummerActivity.TASK] = getButton("activitySummer_icon1_json.btn_TASK");
// 			this._tabs[game.TypeSummerActivity.MSZP] = getButton("activitySummer_icon1_json.btn_MSZP");
// 			this._tabs[game.TypeSummerActivity.XHPH] = getButton("activitySummer_icon1_json.btn_XHPH");
// 			this._tabs[game.TypeSummerActivity.GQJZ] = getButton("activitySummer_icon1_json.btn_GQJZ");
// 			this._tabs[game.TypeSummerActivity.DJDH] = getButton("activitySummer_icon1_json.btn_DJDH");
// 			this._tabs[game.TypeSummerActivity.SBZZ] = getButton("activitySummer_icon1_json.btn_SBZZ");
// 			this._tabs[game.TypeSummerActivity.LCSL] = getButton("activitySummer_icon1_json.btn_LCSL");
// 			this._tabs[game.TypeSummerActivity.JLSC] = getButton("activitySummer_icon1_json.btn_JLSC");
// 			this._tabs[game.TypeSummerActivity.KFXHPH] = getButton("activitySummer_icon1_json.btn_KFXHPH");
// 			this._tabs[game.TypeSummerActivity.SDSBOSS] = getButton("activitySummer_icon1_json.btn_SDSBOSS");
// 			this._tabs[game.TypeSummerActivity.XYDB] = getButton("activitySummer_icon1_json.btn_XYDB");
// 			this._tabs[game.TypeSummerActivity.YDSZ] = getButton("activitySummer_icon1_json.btn_YDSZ");
// 			this._tabs[game.TypeSummerActivity.KNLB] = getButton("activitySummer_icon1_json.btn_KNLB");
// 			this._tabs[game.TypeSummerActivity.RYCZ] = getButton("activitySummer_icon1_json.btn_RYCZ");
// 			this._tabs[game.TypeSummerActivity.TJHB] = getButton("activitySummer_icon1_json.btn_TJHB");
// 			this._views = [];
// 			this._views[game.TypeSummerActivity.LJDL] = new view.activity.LeiJiDengLu();
// 			this._views[game.TypeSummerActivity.MRLC] = new view.activity.XiaRiLeiChong();
// 			this._views[game.TypeSummerActivity.XYLP] = new view.activity.XingYingLunPan();
// 			this._views[game.TypeSummerActivity.JFSC] = new view.activity.JiFenShangDian();
// 			this._views[game.TypeSummerActivity.XGLB] = new view.activity.SummerXianGouLiBao();
// 			this._views[game.TypeSummerActivity.HHZP] = new view.activity.HaoHuaZhuangPan();
// 			this._views[game.TypeSummerActivity.BOSS] = new view.activity.BossKuangHuan();
// 			this._views[game.TypeSummerActivity.JFPH] = new view.activity.JiFenPaiHang();
// 			this._views[game.TypeSummerActivity.SPFL] = new view.activity.ShuangBeiFanLi();
// 			this._views[game.TypeSummerActivity.TASK] = new view.activity.HuoDongTask();
// 			this._views[game.TypeSummerActivity.MSZP] = new view.activity.MoShiZhuanPan();
// 			this._views[game.TypeSummerActivity.XHPH] = new view.activity.XiaoFeiPaiHang();
// 			this._views[game.TypeSummerActivity.GQJZ] = new view.activity.GuoQingJiZi();
// 			this._views[game.TypeSummerActivity.DJDH] = new view.activity.DaoJuDuiHuan();
// 			this._views[game.TypeSummerActivity.SBZZ] = new view.activity.FanBei();
// 			this._views[game.TypeSummerActivity.LCSL] = new view.activity.LeiJiChongZhi();
// 			this._views[game.TypeSummerActivity.JLSC] = new view.activity.ShenMiShangDian();
// 			this._views[game.TypeSummerActivity.KFXHPH] = new view.activity.KuaFuXiaoFeiPaiHang();
// 			this._views[game.TypeSummerActivity.SDSBOSS] = new view.activity.ShengDanShu();
// 			this._views[game.TypeSummerActivity.XYDB] = new view.activity.XingYingDuoBao();
// 			this._views[game.TypeSummerActivity.YDSZ] = new view.activity.YuanDanShiZhuang();
// 			this._views[game.TypeSummerActivity.KNLB] = new view.activity.KuaNianLiBao();
// 			this._views[game.TypeSummerActivity.RYCZ] = new view.activity.RenYiChongZhi();
// 			this._views[game.TypeSummerActivity.TJHB] = new view.activity.TianJiangHongBao();
// 			this._curstack = new eui.ViewStack();
// 			this._curstack.touchEnabled = false;
// 			this.group.addChild(this._curstack);
// 		}
// 		private enter(data: any, isScroll: boolean = false): void {
// 			// if (GameModels.activitySummer.isFirst && GameModels.activitySummer.getActivitySummerListTemplates(t.TypeSummerActivity.KFXHPH)) {
// 			// 	mg.alertManager.showAlert(view.activity.XingYingDuoBaoTips, true, true);
// 			// 	GameModels.activitySummer.isFirst = false;
// 			// }
// 			// if (app.gameContext.typeGame != TypeGame.CITY) mg.soundManager.playBackGround2("XYDB_BG");
// 			// mg.soundManager.enabledEffect = false;
// 			GameModels.activitySummer.isDaoJuHeZiAnm = true;
// 			this.updateView(data, isScroll);
// 			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
// 			this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
// 			this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
// 			this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
// 			this.tabGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
// 			this.scrollerTab.viewport.scrollH = 0;
// 			GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_JIFENDUIHUAN_LINK, this.openJifenShopHandler, this);
// 			GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_LUNPAN_LINK, this.openXingyingLunPanHandler, this);
// 			GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_JIZI_DUIHUAN_LINK, this.openJiZiDuiHuanHandler, this);
// 			GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_HAOHUAZUANGPAN_LINK, this.openHaoHuaZhuangpanHandler, this);
// 			GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.GO_GET_PET_VIEW, this.openGetPetViewHandler, this);
// 			GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_SUMMER_OPEN, this.closeView, this);
// 			if (GameModels.activitySummer.summerActivityOneResourceType > 0) {
// 				this.imgTitle.source = "img_summer_title" + GameModels.activitySummer.summerActivityOneResourceType + "_png";
// 			}
// 		}
// 		private exit(): void {
// 			// if (app.gameContext.typeGame != TypeGame.CITY) mg.soundManager.stopBackGround2();
// 			// mg.soundManager.enabledEffect = true;
// 			GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.ACTIVITY_SUMMER_OPEN, this.closeView, this);
// 			this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
// 			this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
// 			this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
// 			this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
// 			this.tabGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
// 			if ((<IModuleView>this._curstack.selectedChild)) (<IModuleView>this._curstack.selectedChild).exit();
// 			GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.ACTIVITY_JIFENDUIHUAN_LINK, this.openJifenShopHandler, this);
// 			GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.ACTIVITY_LUNPAN_LINK, this.openXingyingLunPanHandler, this);
// 			GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.ACTIVITY_JIZI_DUIHUAN_LINK, this.openJiZiDuiHuanHandler, this);
// 			GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.ACTIVITY_HAOHUAZUANGPAN_LINK, this.openHaoHuaZhuangpanHandler, this);
// 			GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.GO_GET_PET_VIEW, this.openGetPetViewHandler, this);
// 			utils.timer.clearAll(this);
// 		}
// 		private closeView(): void {
// 			if (GameModels.activitySummer.summerOpenActivityList.length <= 0) {
// 				mg.uiManager.remove(this);
// 			}
// 		}
// 		private openGetPetViewHandler() {
// 			this.onSelectChange(GameModels.activitySummer.getActivitySummerListByIndex(game.TypeSummerActivity.KFXHPH));
// 		}
// 		private openJifenShopHandler() {
// 			this.onSelectChange(GameModels.activitySummer.getActivitySummerListByIndex(game.TypeSummerActivity.JFSC));
// 		}
// 		private openXingyingLunPanHandler() {
// 			this.onSelectChange(GameModels.activitySummer.getActivitySummerListByIndex(game.TypeSummerActivity.XYLP));
// 		}
// 		private openJiZiDuiHuanHandler() {
// 			this.onSelectChange(GameModels.activitySummer.getActivitySummerListByIndex(game.TypeSummerActivity.DJDH));
// 		}
// 		private openHaoHuaZhuangpanHandler() {
// 			this.onSelectChange(GameModels.activitySummer.getActivitySummerListByIndex(game.TypeSummerActivity.HHZP));
// 		}
// 		private updateView(data: any, isScroll: boolean = false) {
// 			this.clear();
// 			//-----------------------刷新页签
// 			let openList: Array<templates.holidaySeting> = GameModels.activitySummer.summerActivityTemplates;
// 			if (openList.length == 0) {
// 				return;
// 			}
// 			this._curtabs = [];
// 			for (var i: number = 0; i < openList.length; i++) {
// 				if (this._tabs[openList[i].type]) {
// 					var btn = this._tabs[openList[i].type];
// 					btn.x = i * 121;
// 					var resid: string = "activitySummer_icon" + openList[i].resourceType + "_json.btn_" + game.TypeSummerActivity.getName(openList[i].type);
// 					btn.setImgIcon = resid;
// 					this.tabGroup.addChild(btn);
// 					this._curtabs.push(btn);
// 				}
// 			}
// 			if (!this._curviews) this._curviews = [];
// 			let childIndex: number = 0;
// 			for (var i = 0; i < openList.length; i++) {
// 				if (GameModels.activitySummer.isOpenActivitySummerList(openList[i].type)) {
// 					this._curviews.push(this._curstack.addChild(this._views[openList[i].type]) as IModuleView);
// 					if (openList[i].type == game.TypeSummerActivity.LJDL) {
// 						//GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_LJDL, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
// 					}
// 					else if (openList[i].type == game.TypeSummerActivity.MRLC) {
// 						//GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_XRLC, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
// 					}
// 					else if (openList[i].type == game.TypeSummerActivity.HHZP) {
// 						//GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_HHZP, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
// 					}
// 					else if (openList[i].type == game.TypeSummerActivity.DJZP) {
// 						//GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_DJZP, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
// 					}
// 					else if (openList[i].type == game.TypeSummerActivity.TASK) {
// 						//GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_HDRW, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
// 					}
// 					else if (openList[i].type == game.TypeSummerActivity.MSZP) {
// 						//GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_MSZP, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
// 					}
// 					else if (openList[i].type == game.TypeSummerActivity.LCSL) {
// 						//GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_LCSL, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
// 					}
// 					else if (openList[i].type == game.TypeSummerActivity.SDSBOSS) {
// 						//GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_SDS_BOSS, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
// 					}
// 					else if (openList[i].type == game.TypeSummerActivity.XYDB) {
// 						//GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_XYDB, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
// 					}
// 					else if (openList[i].type == game.TypeSummerActivity.YDSZ) {
// 						//GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_YDSZ, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
// 					}
// 					else if (openList[i].type == game.TypeSummerActivity.KNLB) {
// 						//GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_KNLB, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
// 					}
// 					else if (openList[i].type == game.TypeSummerActivity.RYCZ) {
// 						//GameModels.state.registerWarnTarget(GameRedState.SNMMER_ACTIVITY_RYCZ, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
// 					}
// 					else {
// 						childIndex++;
// 					}
// 				}
// 			}
// 			this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0, isScroll);
// 		}
// 		private updateRedState(index: number, value: boolean): void {
// 			this._curtabs[index].imgRed.visible = value;
// 		}
// 		private onTabClick(e: egret.TouchEvent): void {
// 			let index: number = this._curtabs.indexOf(e.target.parent)
// 			if (index != -1) {
// 				this.onSelectChange(index);
// 			}
// 		}
// 		private onLeftClick(e: egret.TouchEvent): void {
// 			if (this.scrollerTab.viewport.scrollH > 0) {
// 				this.scrollerTab.viewport.scrollH = Math.max(0, this.scrollerTab.viewport.scrollH - 121);
// 			}
// 		}
// 		private onRightClick(e: egret.TouchEvent): void {
// 			this.tabGroup.validateNow();
// 			let width: number = this.tabGroup.contentWidth - this.scrollerTab.width;
// 			if (this.scrollerTab.viewport.scrollH < width) {
// 				this.scrollerTab.viewport.scrollH = Math.min(width, this.scrollerTab.viewport.scrollH + 121);
// 			}
// 		}
// 		private clear() {
// 			//---------------清空页面
// 			if (this._selected != -1) {
// 				this._curtabs[this._selected].currentState = "up";
// 				this._selected = -1;
// 			}
// 			for (var btn of this._tabs) {
// 				if (btn && btn.parent) {
// 					btn.parent.removeChild(btn);
// 				}
// 			}
// 			if (this._curtabs) this._curtabs.length = 0;
// 			for (var view of this._views) {
// 				if (view && view.parent) {
// 					view.parent.removeChild(view);
// 				}
// 			}
// 			if (this._curviews) this._curviews.length = 0;
// 			this._curstack.selectedIndex = 0;
// 		}
// 		private _selected: number;
// 		private onSelectChange(index: number, isScroll: boolean = false): void {
// 			if (isScroll && index >= 4) {
// 				this.tabGroup.validateNow();
// 				this.scrollerTab.validateNow();
// 				utils.timer.once(200, this, function () {
// 					var width: number = this.tabGroup.contentWidth - this.scrollerTab.width;
// 					this.scrollerTab.viewport.scrollH = width;
// 				});
// 			}
// 			if (this._curstack.selectedChild) (<IModuleView>this._curstack.selectedChild).exit();
// 			if (!this._curviews[index]) return;
// 			this._curstack.selectedIndex = index;
// 			this._curviews[index].enter(null,null);
// 			if (this._selected != -1) {
// 				this._curtabs[this._selected].currentState = "up";
// 			}
// 			this._selected = index;
// 			this._curtabs[index].currentState = "down";
// 		}
// 		private onClose(e: egret.TouchEvent): void {
// 			mg.uiManager.remove(this);
// 		}
// 	}
// } 

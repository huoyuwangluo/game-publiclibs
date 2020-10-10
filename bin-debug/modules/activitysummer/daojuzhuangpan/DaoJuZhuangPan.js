// module view.activity {
// 	export class DaoJuZhuangPan extends ui.DaoJuZhuangPanSkin implements IModuleView {
// 		private _listData: eui.ArrayCollection;
// 		private _labName: Array<eui.Label>;
// 		private _labCount: Array<eui.Label>;
// 		private _imgIcon: Array<components.Icon>;
// 		private _listBoxData: eui.ArrayCollection;
// 		private _vo: vo.ActivitySummerVO;
// 		private _rewadTmps: templates.daoJuZhuanPan[]
// 		private _id: number;
// 		public constructor() {
// 			super();
// 		}
// 		protected initialize() {
// 			super.initialize();
// 			this._imgIcon = [this.img_icon1, this.img_icon2, this.img_icon3, this.img_icon4, this.img_icon5,
// 			this.img_icon6, this.img_icon7, this.img_icon8, this.img_icon9, this.img_icon10];
// 			this._labName = [this.lab_name1, this.lab_name2, this.lab_name3, this.lab_name4, this.lab_name5,
// 			this.lab_name6, this.lab_name7, this.lab_name8, this.lab_name9, this.lab_name10]
// 			this._labCount = [this.lab_count1, this.lab_count2, this.lab_count3, this.lab_count4, this.lab_count5,
// 			this.lab_count6, this.lab_count7, this.lab_count8, this.lab_count9, this.lab_count10]
// 			this.imgHeZi.mask = this.imgMask;
// 		}
// 		public enter(data: any = null): void {
// 			this.imgHeZi.visible = false;
// 			// this.imgHeZi.x =-this.imgHeZi.width/2;
// 			// if (GameModels.activitySummer.isDaoJuHeZiAnm == true) {
// 			// 	this.imgHeZi.visible = true;
// 			// 	egret.Tween.get(this.imgHeZi).to({ x: 300  }, 500, utils.Ease.quartOut).wait(500).to({ x: 800 }, 500, utils.Ease.quartOut).call(function (): void {
// 			// 		this.imgHeZi.visible = false;
// 			// 	}, this);
// 			// 	GameModels.activitySummer.isDaoJuHeZiAnm = false;
// 			// }
// 			this.imgTeXiao10.visible = false;
// 			this.imgTeXiao50.visible = false;
// 			this.btnChouJiang.touchEnabled = true;
// 			this.btnTeXiao10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
// 			this.btnTeXiao50.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
// 			this.btnChouJiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
// 			this.listBox.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnBoxClick, this);
// 			this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.helpClick, this);
// 			this.labDiamond.text = "" + GameModels.user.player.diamonds;
// 			this._id = 0;
// 			GameModels.user.player.onPropertyChange(TypeProperty.UnbindedGold, this, this.onGoldChange);
// 			var temp: templates.holidaySeting = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.DJZP)
// 			if (temp) {
// 				this._id = temp.id;
// 				this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
// 				this._rewadTmps = Templates.getTemplatesByProperty(templates.Map.DAOJUZHUANPAN, "type", temp.id);
// 				this._rewadTmps.sort(function (a: templates.daoJuZhuanPan, b: templates.daoJuZhuanPan): number {
// 					return a.pos - b.pos;
// 				})
// 				for (var i = 0; i < 10; i++) {
// 					if (this._rewadTmps[i]) {
// 						var item: templates.item = Templates.getTemplateById(templates.Map.ITEM, this._rewadTmps[i].itemId);
// 						if (item) {
// 							// if (i == 1) {
// 							// 	this._imgIcon[i].source = "activitySummer_json.img_nvwushen";
// 							// }
// 							// else {
// 							// 	this._imgIcon[i].source = item.icon;
// 							// }
// 							this._imgIcon[i].source = item.icon;
// 							this._labName[i].text = item.name;
// 							this._labCount[i].text = "";
// 							this._imgIcon[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
// 						}
// 					}
// 				}
// 			}
// 			//请求宝箱
// 			this.showBoxView(true);
// 			GameModels.activitySummer.requestDaoJuChougJiangRecord(utils.Handler.create(this, () => {
// 				this.chougJiangRecord();
// 			}));
// 			this.showCaiLiao();
// 		}
// 		private showBoxView(isBool: boolean): void {
// 			GameModels.activitySummer.requestRewardInfosData(game.TypeSummerActivity.DJZP, utils.Handler.create(this, () => {
// 				if (!this._listBoxData) {
// 					this._listBoxData = new eui.ArrayCollection(GameModels.activitySummer.taskBoxDataZhuanPan);
// 				} else {
// 					this._listBoxData.source = GameModels.activitySummer.taskBoxDataZhuanPan;
// 				}
// 				//if (isBool) {
// 				this.listBox.dataProvider = this._listBoxData;
// 				this.listBox.selectedIndex = 0;
// 				this._vo = this.listBox.selectedItem;
// 				//}
// 				this.labCount.text = Language.C_YCCS + GameModels.activitySummer.tatolValue;
// 			}));
// 		}
// 		public exit(): void {
// 			this.clearList(this.list);
// 			egret.Tween.removeTweens(this.imgHeZi);
// 			for (var i = 0; i < this._imgIcon.length; i++) {
// 				if (this._imgIcon[i]) this._imgIcon[i].source = null;
// 			}
// 			this.btnTeXiao10.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
// 			this.btnTeXiao50.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
// 			this.btnChouJiang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
// 			this.listBox.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnBoxClick, this);
// 			GameModels.user.player.offPropertyChange(TypeProperty.UnbindedGold, this, this.onGoldChange);
// 			this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.helpClick, this);
// 		}
// 		private btnBoxClick(e: eui.ItemTapEvent): void {
// 			this.listBox.selectedIndex = e.itemIndex;
// 			var item: vo.ActivitySummerVO = this.listBox.selectedItem;
// 			this._vo = item;
// 			if (this._vo) {
// 				if (this._vo.holidayRewardState == 1) {
// 					GameModels.activitySummer.requestGetRewardInfos(this._vo.holidayRewardId, game.TypeSummerActivity.DJZP, utils.Handler.create(this, this.getRewardCallback, [this.localToGlobal(20, 650)]))
// 				}
// 				else {
// 					var str: string[] = this._vo.template.rewards.split("_");
// 					if (str && str[0]) {
// 						mg.TipManager.instance.showTip(tips.PropTip, { count: str[1], templateProp: Templates.getTemplateById(templates.Map.ITEM, str[0]) });
// 					}
// 				}
// 			}
// 		}
// 		private getRewardCallback(fromPoint: egret.Point): void {
// 			(<eui.ArrayCollection>this.listBox.dataProvider).replaceAll(GameModels.activitySummer.taskBoxDataZhuanPan);
// 			var flyItem: s.FlyIconsEffect = new s.FlyIconsEffect();
// 			let item: vo.ActivitySummerVO = this.listBox.selectedItem;
// 			flyItem.initializeConfigStr(item.template.rewards, fromPoint, mg.layerManager.top);
// 			flyItem.start();
// 		}
// 		private onGoldChange(): void {
// 			this.labDiamond.text = "" + GameModels.user.player.diamonds;
// 		}
// 		private onChouJiangClick(e: egret.TouchEvent): void {
// 			//1为连抽 2为10连抽
// 			var type: number = 0;
// 			if (this.imgTeXiao10.visible == true && this.imgTeXiao50.visible == false) {
// 				type = 2;
// 			}
// 			if (this.imgTeXiao10.visible == false && this.imgTeXiao50.visible == true) {
// 				type = 3;
// 			}
// 			if (this.imgTeXiao10.visible == false && this.imgTeXiao50.visible == false) {
// 				type = 1;
// 			}
// 			if (type == 0) {
// 				logger.log("抽奖类型出错", type);
// 				return;
// 			}
// 			this.checkTwoShowTip(type);
// 		}
// 		private checkTwoShowTip(type: number): void {
// 			var zhaohuanCount: number = 0;
// 			var seting: templates.dataSetting = GameModels.activitySummer.currDaoJuDataSeting;
// 			if (!seting) return;
// 			var str: string[] = seting.value.split(";");
// 			var needCount: number = parseInt(str[1].split("_")[1]);
// 			var price: number = parseInt(str[0].split("_")[1]);
// 			var item: templates.item = Templates.getTemplateById(templates.Map.ITEM, str[1].split("_")[0]);
// 			if (type == 1) {
// 				zhaohuanCount = 1;
// 			}
// 			else if (type == 2) {
// 				zhaohuanCount = 10;
// 			}
// 			else {
// 				zhaohuanCount = 50;
// 			}
// 			var bagCount: number = GameModels.bag.getItemCountById(item.id);
// 			var xiaoHaoCount: number = zhaohuanCount * needCount;
// 			if (bagCount >= xiaoHaoCount) {
// 				this.requestChouJiang(type);
// 			}
// 			else {
// 				var num: number = xiaoHaoCount - bagCount;
// 				mg.alertManager.showCheckAlert(Language.getExpression(Language.E_SFEWXH1MS2B3JXCJ4C, price * num, num, item.name, zhaohuanCount), TypeBtnLabel.OK, TypeCheck.HAOHUA_ZHUANGPAN, null, utils.Handler.create(this, () => {
// 					this.requestChouJiang(type);
// 				}));
// 			}
// 		}
// 		private requestChouJiang(type: number): void {
// 			if (utils.CheckUtil.checkBagSmelting()) return;
// 			GameModels.activitySummer.requestDaoJuChougJiang(type, utils.Handler.create(this, () => {
// 				// logger.log("抽奖类型为.......", type);
// 				this.btnChouJiang.touchEnabled = false;
// 				var data: n.ProtoDaoJuZhuanPanItem[] = GameModels.activitySummer.daoJuItemList;
// 				this.showCaiLiao();
// 				this.showBoxView(false);
// 				if (data && data[data.length - 1]) {
// 					this.playZhuanPanRotation(data[0].Pos);
// 				}
// 			}));
// 		}
// 		private playZhuanPanRotation(pos: number) {
// 			logger.log("转盘停下来的位置", pos);
// 			egret.Tween.get(this.imgSelecd).to({ rotation: 720 + ((pos - 1) * 360 / 10) }, 3000, utils.Ease.quartOut).call(function (index: number): void {
// 				this.imgSelecd.rotation = ((pos - 1) * 360 / 10);
// 				this.btnChouJiang.touchEnabled = true;
// 				GameModels.activitySummer.requestDaoJuChougJiangRecord(utils.Handler.create(this, () => {
// 					this.chougJiangRecord();
// 				}));
// 				//弹出奖励展示界面
// 				mg.alertManager.showAlert(HaoHuaZhuangPanGetAlert, true, true, GameModels.activitySummer.daoJuItemList);
// 			}, this, [pos]);
// 		}
// 		private onTeXiaoClick(e: egret.TouchEvent): void {
// 			if (e.currentTarget == this.btnTeXiao10) {
// 				this.imgTeXiao10.visible = !this.imgTeXiao10.visible;
// 				this.imgTeXiao50.visible = false;
// 			}
// 			else {
// 				this.imgTeXiao50.visible = !this.imgTeXiao50.visible;
// 				this.imgTeXiao10.visible = false;
// 			}
// 		}
// 		private showCaiLiao(): void {
// 			var seting: templates.dataSetting = GameModels.activitySummer.currDaoJuDataSeting;
// 			if (!seting) return;
// 			var str: string[] = seting.value.split(";");
// 			var item: templates.item = Templates.getTemplateById(templates.Map.ITEM, str[1].split("_")[0]);
// 			this.imgItem.source = item.icon;
// 			this.labDiamonds.text = str[0].split("_")[1];
// 			var count: number = GameModels.bag.getItemCountById(str[1].split("_")[0]);
// 			this.labItemCount.text = count + "/" + str[1].split("_")[1];
// 			if (count >= parseInt(str[1].split("_")[1])) {
// 				this.labItemCount.textColor = 0x34E22C;
// 			}
// 			else {
// 				this.labItemCount.textColor = 0xFF0000;
// 			}
// 		}
// 		private onIconClick(e: egret.TouchEvent): void {
// 			for (var i = 0; i < 10; i++) {
// 				if (e.currentTarget == this._imgIcon[i]) {
// 					if (this._rewadTmps[i]) {
// 						var item: templates.item = Templates.getTemplateById(templates.Map.ITEM, this._rewadTmps[i].itemId);
// 						if (item) {
// 							mg.TipManager.instance.showTip(tips.PropTip, item);
// 						}
// 					}
// 					break;
// 				}
// 			}
// 		}
// 		private chougJiangRecord(): void {
// 			if (!this._listData) {
// 				this._listData = new eui.ArrayCollection(GameModels.activitySummer.recordDaoJuAllList);
// 			} else {
// 				this._listData.source = GameModels.activitySummer.recordDaoJuAllList;
// 			}
// 			this.list.dataProvider = this._listData;
// 		}
// 		private helpClick(): void {
// 			// 		sysRuleID 3201 对应 90701
// 			//    3202 对应 90702
// 			//      3203 对应 90703
// 			//    3204 对应 90704
// 			if (this._id == 90701) {
// 				mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 3201).des);
// 			}
// 			else if (this._id == 90702) {
// 				mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 3202).des);
// 			}
// 			else if (this._id == 90703) {
// 				mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 3203).des);
// 			}
// 			else if (this._id == 90704) {
// 				mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 3204).des);
// 			}
// 		}
// 	}
// } 

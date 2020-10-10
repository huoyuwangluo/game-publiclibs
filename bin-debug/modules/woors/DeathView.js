// module dialog.woods {
//     export class DeathView extends ui.WoorsSkin {
//         private _scrollerBinder: components.ScrollerBinder;
//         private _itemCollection: eui.ArrayCollection;
//         private _time1: number;
//         private _time2: number;
//         private CENTRALITY_X: number = 340;
//         private CENTRALITY_Y: number = 464;
//         protected initialize() {
//             super.initialize();
//             this._scrollerBinder = new components.ScrollerBinder();
//             this._itemCollection = new eui.ArrayCollection();
//             this.progressHonour.slideDuration = 0;
//             this.listItems.scaleY = this.listItems.scaleX = 0.9;
//         }
//         public destory() {
//             super.destory();
//             if (this._itemCollection) {
//                 this._itemCollection.source = null;
//                 this._itemCollection = null;
//             }
//             this.listBoss.dataProvider = null;
//         }
//         public enter(data: any): void {
//             this.labTiaoJian.visible = true;
//             this.labFight.visible = true;
//             this.imgFight.visible = true;
//             GameModels.common.requestFightNum(this, TypeFunction.MieShiShenZhuang_TATOL, (fightNum: number) => {
//                 this.labFight.text = fightNum.toString();
//                 this.listBoss.dataProvider = new eui.ArrayCollection(GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_DEATH, 1, true));
//                 this._scrollerBinder.initialize(this.bossScroller, this.listBoss, this.btnPrev, this.btnNext);
//             });
//             if (this.bossScroller.horizontalScrollBar) {
//                 this.bossScroller.horizontalScrollBar.autoVisibility = false;
//                 this.bossScroller.horizontalScrollBar.visible = true;
//             }
//             this.listBoss.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBossClick, this);
//             this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
//             this.btnAddNum.addEventListener(egret.TouchEvent.TOUCH_TAP, this.woodsAddNumHandler, this);
//             GameModels.copyBoss.requestBossCopyInfo(utils.Handler.create(this, this.onSelectBoss));
//             this.updateBuyTimes();
//         }
//         public exit(): void {
//             utils.timer.clearAll(this);
//             this.listBoss.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBossClick, this);
//             this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
//             this.btnAddNum.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.woodsAddNumHandler, this);
//         }
//         private onBossClick(e: eui.ItemTapEvent): void {
//             this.onSelectBoss(e.itemIndex);
//         }
//         private onSelectBoss(index: number = 0): void {
//             this.listBoss.selectedIndex = index;// 默认选中第一个BOSS
//             let data: vo.CopyVO = this.listBoss.selectedItem;
//             this.labTiaoJian.text = Language.J_MSZL + data.template.needCE + Language.C_KQ;
//             if (this.progressHonour) {
//                 this.progressHonour.labelDisplay.strokeColor = 0x0;
//                 this.progressHonour.labelDisplay.stroke = 2;
//                 this.progressHonour.maximum = utils.htmlUtil.getTemplateAndNameToValue(data.templateBoss.properties, "HP");
//                 this.progressHonour.value = data.bossHP;
//             }
//             this._itemCollection.source = this.listBoss.selectedItem.template.dropShow.split(";");
//             this.listItems.dataProvider = this._itemCollection;
//             // this.imgModel.source = ResPath.getShowBossPath(data.bossShowId);
//             // var point: any = GameModels.copyBoss.getShowPoint(data.bossShowId);
//             // this.imgModel.x = this.CENTRALITY_X - 600 + point.x;
//             // this.imgModel.y = this.CENTRALITY_Y - 600 + point.y;
//             this.body.setPetBody(data.templateBoss.petId.toString(), false);
//             if (data.isBossKilled) {
//                 this.btnEnter.label = Language.C_YJS1;
//                 this.btnEnter.filters = utils.filterUtil.grayFilters;
//                 this.btnEnter.touchEnabled = false;
//             } else if (data.stateLock) {
//                 this.btnEnter.label = Language.C_WKQ;
//                 this.btnEnter.filters = utils.filterUtil.grayFilters;
//                 this.btnEnter.touchEnabled = false;
//             } else {
//                 this.btnEnter.label = Language.C_TZ;
//                 this.btnEnter.filters = null;
//                 this.btnEnter.touchEnabled = true;
//                 this.labTiaoJian.text = "";
//             }
//             // } else if (data.template.needCE > 2000) {
//             //     this.btnEnter.label = Language.C_WKQ;
//             //     this.btnEnter.filters = utils.filterUtil.grayFilters;
//             //     this.btnEnter.touchEnabled = false;
//             // }
//             // else {
//             //     this.btnEnter.label = Language.C_TZ;
//             //     this.btnEnter.filters = null;
//             //     this.btnEnter.touchEnabled = true;
//             // }
//             this.updateBuyTimes();
//         }
//         private updateBuyTimes() {
//             this.labDomainCount.text = GameModels.copyBoss.deathBossCount + "/" + GameModels.copyBoss.deathRefreshNum;
//         }
//         private openHelp(e: egret.TouchEvent): void {
//         }
//         private onEnterClick(e: egret.TouchEvent): void {
//             if (GameModels.copyBoss.deathBossCount > 0) {
//                 var copyVO: vo.CopyVO = this.listBoss.selectedItem;
//                 app.gameContext.enterDeathEveryOneBoss(copyVO)
//             }
//             else {
//                 mg.alertManager.showAlert(PromptAlert, false, true, Language.J_WSKTZCSBZ, TypeBtnLabel.OK_SIGIN, null,
//                     utils.Handler.create(this, function (): void {
//                     }));
//             }
//         }
//         private woodsAddNumHandler(e: egret.TouchEvent): void {
//             // if (GameModels.copyBoss.woorsBossBuyCount >= GameModels.copyBoss.woorsBuyMaxNum) {
//             //     mg.alertManager.tip(Language.J_GMCSYDSX, 0xff0000);
//             //     return;
//             // }
//             if (GameModels.copyBoss.deathBossCount >= GameModels.copyBoss.deathRefreshNum) {
//                 mg.alertManager.tip(Language.J_CSZGWXGM, 0xff0000);
//                 return;
//             }
//             var num: number = GameModels.copyBoss.deathBuyCost(GameModels.copyBoss.deathBossBuyCount + 1);
//             mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_SFXH1MSGMTZJH, num), TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
//                 GameModels.copyBoss.deathBuyChallengesTimes(utils.Handler.create(this, function () {
//                     this.updateBuyTimes();
//                 }));
//             }), null, true);
//         }
//     }
// } 

// module dialog.activity {
//     export class sgOpenServerActivityMainDialog extends ui.sgOpenServerActivityMainDialogSkin {
//         private _curstack: eui.ViewStack;
//         private _curtabs: Array<renderer.ActivityTabButton>;
//         private _curviews: Array<IModuleView>;
//         private _selected: number;
//         public constructor() {
//             super();
//         }
//         protected initialize() {
//             super.initialize();
//             this._selected = -1;
//             Mediator.getMediator(this).onAdd(this, this.enter);
//             Mediator.getMediator(this).onRemove(this, this.exit);
//             this._curstack = new eui.ViewStack();
//             this._curstack.touchEnabled = false;
//             this.group.addChild(this._curstack);
//         }
//         private enter(data: any): void {
//             this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
//             this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
//             this.tabGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
//             GameModels.sgActivity.requestSGRunningActivitys(utils.Handler.create(this, () => {
//                 this.updateView(data);
//             }));
//         }
//         private exit(): void {
//             this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
//             this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
//             this.tabGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
//             if ((<IModuleView>this._curstack.selectedChild)) (<IModuleView>this._curstack.selectedChild).exit();
//         }
//         private updateView(data: any) {
//             this.clear();
//             let openList: Array<vo.SgActivityListVO> = GameModels.sgActivity.openServerActListVO;
//             if (openList.length == 0) return;
//             this._curtabs = [];
//             for (var i: number = 0; i < openList.length; i++) {
//                 var btn = new renderer.ActivityTabButton();
//                 btn.actType = openList[i].actType;
//                 btn.setImgIcon = game.sgActivityType.getIcon(openList[i].actType);
//                 btn.x = i * 121;
//                 btn.setLabName = game.sgActivityType.getName(openList[i].actType);
//                 this.tabGroup.addChild(btn);
//                 this._curtabs.push(btn);
//             }
//             if (!this._curviews) this._curviews = [];
//             for (var i = 0; i < this._curtabs.length; i++) {
//                 if (this._curtabs[i] && this._curtabs[i].actType) {
//                     var viewstack: any = null;
//                     if (viewstack) this._curviews.push(this._curstack.addChild(viewstack) as IModuleView);
//                 }
//                 if (data && data.hasOwnProperty("tabIndex") && data.tabIndex == this._curtabs[i].actType) {
//                     data.tabIndex = i;
//                 }
//             }
//             this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0, data && data.hasOwnProperty("parms") ? data.parms : 0);
//         }
//         private updateRedState(index: number, value: boolean): void {
//             this._curtabs[index].imgRed.visible = value;
//         }
//         private clear() {
//             if (this._selected != -1) {
//                 this._curtabs[this._selected].currentState = "up";
//                 this._selected = -1;
//             }
//             if (this._curtabs) this._curtabs.length = 0;
//             if (this._curviews) this._curviews.length = 0;
//             this._curstack.selectedIndex = 0;
//         }
//         private onTabClick(e: egret.TouchEvent): void {
//             var index: number = this._curtabs.indexOf(e.target.parent)
//             if (index != -1) {
//                 this.onSelectChange(index);
//             }
//         }
//         private onSelectChange(index: number, index1: number = 0): void {
//             if (this._curstack.selectedChild) (<IModuleView>this._curstack.selectedChild).exit();
//             if (!this._curviews[index]) return;
//             this._curstack.selectedIndex = index;
//             this._curviews[index].enter(index, [index1]);
//             if (this._selected != -1) {
//                 this._curtabs[this._selected].currentState = "up";
//             }
//             this._selected = index;
//             this._curtabs[index].currentState = "down";
//             // this.updateScrollH(this.tabGroup.getChildAt(index).x, this.tabGroup.getChildAt(index).width);
//         }
//         private updateScrollH(maxLength: number, itemLength: number, initScrollH?: number) {
//             this.tabGroup.validateNow();
//             var pos: number;
//             if (initScrollH)
//                 pos = initScrollH;
//             else
//                 pos = maxLength - this.scrollerTab.width / 2 + itemLength / 2;
//             var maxScrollH = this.tabGroup.contentWidth - this.scrollerTab.width;
//             if (pos <= 0)
//                 pos = 0;
//             else if (pos >= maxScrollH)
//                 pos = maxScrollH;
//             this.rollScroller(pos);
//         }
//         /**滚动条滚动到指定位置 */
//         private rollScroller(pos: number, duration: number = 200) {
//             egret.Tween.get(this.scrollerTab.viewport).to({ scrollH: pos }, duration)
//         }
//         private onLeftClick(e: egret.TouchEvent): void {
//             if (this.scrollerTab.viewport.scrollH > 0) {
//                 this.scrollerTab.viewport.scrollH = Math.max(0, this.scrollerTab.viewport.scrollH - 121);
//             }
//         }
//         private onRightClick(e: egret.TouchEvent): void {
//             this.tabGroup.validateNow();
//             let width: number = this.tabGroup.contentWidth - this.scrollerTab.width;
//             if (this.scrollerTab.viewport.scrollH < width) {
//                 this.scrollerTab.viewport.scrollH = Math.min(width, this.scrollerTab.viewport.scrollH + 121);
//             }
//         }
//     }
// } 

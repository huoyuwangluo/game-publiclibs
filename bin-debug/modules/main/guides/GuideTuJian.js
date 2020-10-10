// module main {
//     /**图鉴 */
//     export class GuideTuJian extends GuideBase {
//         public constructor() {
//             super();
//         }
//         private _viewTuJian: dialog.tujian.TuJianMainDialog;
//         public start(time: number = 0) {
//             super.start(time);
//             this.updateView();
//         }
//         public stop() {
//             super.stop();
//             this._viewTuJian.removeEventListener(dialog.tujian.TuJianMainDialog.CHANG_TAL, this.update, this);
//         }
//         private updateView() {
//             if (this._viewTuJian) {
//                 this._viewTuJian.removeEventListener(dialog.tujian.TuJianMainDialog.CHANG_TAL, this.update, this);
//             }
//             this._viewTuJian = mg.uiManager.getView(dialog.tujian.TuJianMainDialog) as dialog.tujian.TuJianMainDialog;
//             this._viewTuJian.addEventListener(dialog.tujian.TuJianMainDialog.CHANG_TAL, this.update, this);
//         }
//         protected update() {
//             logger.log("图鉴引导=====", GameModels.guide.guideType);
//             utils.timer.clear(this);
//             this.updateView();
//             if (!app.gameContext.gameCurrent) {
//                 this.updateComponent(null);
//                 return;
//             }
//             if (!TypeGame.isMainGame(this._gameType)) {
// 				this.updateComponent(null);
// 				return;
// 			}
//             if (mg.StoryManager.instance.storyId > 0||mg.alertManager.current || mg.TipManager.instance.current) {
//                 this.updateComponent(null);
//                 return;
//             }
//             if (!mg.uiManager.hasDialog && GameModels.guide.guideType) {
//                 utils.timer.once(200, this, function () {
//                     this.updateComponent((mg.uiManager.getView(s.UserfaceName.main) as main.MainUIView).dock.btnTuJian, Language.J_DJTJBQ, TypeDirection.DOWN);
//                 })
//                 return;
//             }
//             if (mg.uiManager.isOpen(AchievementTuJianUp)) {
//                 if (!GameModels.guide.guideType) {
//                     this.updateComponent(null);
//                     return;
//                 }
//                 var view: AchievementTuJianUp = mg.uiManager.getView(AchievementTuJianUp) as AchievementTuJianUp;
//                 this.updateComponent(view.btnAct, Language.J_DJJH, TypeDirection.UP);
//                 return;
//             }
//             if (mg.uiManager.isOpen(dialog.tujian.TuJianMainDialog)) {
//                 if (!GameModels.guide.guideType) {
//                     this.updateComponent((mg.uiManager.getView(s.UserfaceName.main) as main.MainUIView).dock.backXpGroup, Language.C_GBDQJM);
//                     return;
//                 }
//                 if (this._viewTuJian.tabIndex == 0) {
//                     if (this._viewTuJian.tujianView.downIndex <= 0) {
//                         var img: eui.Image = this._viewTuJian.tujianView.getListItem();
//                         if (img) {
//                             utils.timer.once(200, this, function () {
//                                 this.updateComponent(img, Language.J_DJDK, TypeDirection.UP);
//                             })
//                         }
//                     }
//                     else {
//                         var img: eui.Image = this._viewTuJian.tujianView.getDownListItem();
//                         if (img) {
//                             utils.timer.once(200, this, function () {
//                                 this.updateComponent(img, Language.J_DJDK, TypeDirection.UP);
//                             })
//                         }
//                     }
//                 }
//                 else {
//                     this.updateComponent(this._viewTuJian.btnTuJian, Language.J_DJTJBQ, TypeDirection.UP);
//                 }
//                 return;
//             }
//             if (mg.uiManager.hasDialog) {
//                 this.updateComponent(null);
//                 return;
//             }
//             //this.updateComponent(this._taskHot, GameModels.task.curTask.canSubmit ? Language.C_WCRW : GameModels.task.curTask.name, TypeDirection.UP);
//         }
//     }
// } 

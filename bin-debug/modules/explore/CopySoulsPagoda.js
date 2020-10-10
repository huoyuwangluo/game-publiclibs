var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var dialog;
(function (dialog) {
    var explore;
    (function (explore) {
        var CopySoulsPagoda = (function (_super) {
            __extends(CopySoulsPagoda, _super);
            function CopySoulsPagoda() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CopySoulsPagoda.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._actors = [this.role0, this.role1, this.role2];
                this._countLab = [this.labCeng0, this.labCeng1, this.labCeng2];
                this._cengBaArr = [this.imgCengBg0, this.imgCengBg1, this.imgCengBg2];
            };
            CopySoulsPagoda.prototype.enter = function (data) {
                GameModels.oneCountRedPoint.isOpenWuHunView = true;
                this.initRankGroup();
                this.labRank.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_GDPH);
                this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
                this.btnAtt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
                this.labRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRankView, this);
                this.imgJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHander, this);
                GameModels.scene.onJoinScene(this, this.updataJoinFightState);
                GameModels.copyPagoda.requestWuHunCopyInfo(this, this.getCopyInfoHandler);
                GameModels.copyPagoda.requestRanking(mo.ModelGamePagoda.COPY_WUHUN_PAGODA_RANK, utils.Handler.create(this, this.showRank));
            };
            CopySoulsPagoda.prototype.exit = function () {
                this.initRankGroup();
                GameModels.scene.offJoinScene();
                this.labRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showRankView, this);
                this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
                this.btnAtt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
                this.imgJoin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHander, this);
                this._currentFloor = null;
            };
            CopySoulsPagoda.prototype.onJoinHander = function () {
                var fightData = GameModels.copyBoss.getFightData(TypeGame.PAGODA_WUHUN);
                app.gameContext.enterWuHunPagodaPet(fightData ? fightData.copyVo : null, false, fightData ? fightData.isFive : false);
            };
            CopySoulsPagoda.prototype.updataJoinFightState = function () {
                if (GameModels.scene.getjoinSceneListByType(TypeGame.PAGODA_WUHUN)) {
                    this.imgJoin.visible = true;
                    this.btnEnter.visible = this.btnAtt.visible = this.labCount.visible = false;
                }
                else {
                    this.imgJoin.visible = false;
                    this.btnEnter.visible = this.btnAtt.visible = this.labCount.visible = true;
                }
            };
            //显示排行
            CopySoulsPagoda.prototype.showRank = function () {
                var arr = GameModels.copyPagoda.rankWuHunTaList;
                if (arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] && i < 4) {
                            var rankItem = new item.RankLook();
                            rankItem.updateData(arr[i]);
                            this.rankGroup.addChild(rankItem);
                        }
                    }
                }
            };
            CopySoulsPagoda.prototype.showRankView = function (evt) {
                mg.uiManager.show(dialog.ranking.RankingMain);
            };
            CopySoulsPagoda.prototype.closeHandler = function (e) {
                mg.uiManager.remove(explore.CopyAnimalPagodaDialog);
            };
            CopySoulsPagoda.prototype.getCopyInfoHandler = function () {
                this.selectBoss(GameModels.copyPagoda.wuHunFloorPassed);
                this.updataJoinFightState();
                this.showCopyMaxPassUpReward(GameModels.copyPagoda.wuHunMaxPass);
            };
            CopySoulsPagoda.prototype.selectBoss = function (passFloor) {
                if (!this.parent)
                    return;
                this.imgLight.visible = true;
                this.btnEnter.visible = true;
                var args = GameModels.copyPagoda.getCurrentWuHunList(passFloor);
                if (args.length && args[args.length - 1].step >= passFloor) {
                    for (var i = 0; i < args.length; i++) {
                        var temp = Templates.getTemplateById(templates.Map.GENERAL, args[i].templateBoss.petId);
                        if (temp) {
                            this._actors[i].setGeneralHeadInfo(parseInt(temp.model), 0, true, temp);
                        }
                        this._countLab[i].text = args[i].step.toString();
                    }
                    if (passFloor <= 0) {
                        this._currentFloor = args[0];
                        this.showCurrentFloor(0);
                        this.btnEnter.y = 662;
                        this.imgLight.y = 475;
                        this.imgBg0.scaleX = this.imgBg0.scaleY = 1.3;
                    }
                    else {
                        this.imgBg0.scaleX = this.imgBg0.scaleY = 1;
                        if (!GameModels.copyPagoda.isWuHunDemonOver(passFloor)) {
                            this._currentFloor = args[1];
                            this.showCurrentFloor(1);
                            this.btnEnter.y = 500;
                            this.imgLight.y = 340;
                            this.imgBg1.scaleX = this.imgBg1.scaleY = 1.3;
                        }
                        else {
                            this.imgBg1.scaleX = this.imgBg1.scaleY = 1;
                            this._currentFloor = null;
                            this.showCurrentFloor(4);
                            this.btnEnter.visible = false;
                            this.imgLight.visible = false;
                        }
                    }
                    if (this._currentFloor) {
                        var dropCfg = void 0;
                        if ((GameModels.copyPagoda.isWuHunDemonOver(GameModels.copyPagoda.wuHunMaxPass) == false) && GameModels.copyPagoda.wuHunMaxPass <= passFloor) {
                            dropCfg = this._currentFloor.template.firstDrop;
                        }
                        else {
                            dropCfg = this._currentFloor.templateBoss.baseDrop;
                        }
                        var drops = dropCfg.split(";");
                        this.drop1.visible = true;
                        ;
                        this.drop2.visible = true;
                        this.drop1.dataSource = (drops[0]);
                        this.drop2.dataSource = (drops[1]);
                        this.drop1.labName.text = this.drop2.labName.text = "";
                        this.imgMax.visible = true;
                        this.labMax.visible = false;
                    }
                    else {
                        this.drop1.visible = false;
                        this.drop2.visible = false;
                        this.imgMax.visible = false;
                        this.labMax.visible = true;
                    }
                    var viewRole = mg.uiManager.getView(dialog.explore.CopyPagodaMain);
                    if (viewRole)
                        viewRole.updataChange();
                }
            };
            CopySoulsPagoda.prototype.showCurrentFloor = function (index) {
                for (var j = 0; j < this._actors.length; j++) {
                    if (j == index) {
                        this._actors[j].scaleX = this._actors[j].scaleY = 1.3;
                        this._actors[j].alpha = 1;
                        this._cengBaArr[j].visible = false;
                    }
                    else {
                        this._actors[j].scaleX = this._actors[j].scaleY = 1;
                        this._actors[j].alpha = 0.6;
                        this._cengBaArr[j].visible = true;
                    }
                }
            };
            CopySoulsPagoda.prototype.onEnterClick = function (e) {
                // 当前关卡是 当日已通关关卡+1；
                if (e.currentTarget == this.btnAtt) {
                    // if (GameModels.platform.isPay && GameModels.user.player.level < 80 && GameModels.user.player.vip < 2) {
                    // 	mg.alertManager.tip(Language.J_80V2KAIQI);
                    // 	return;
                    // }
                    var maxPassUpFloor = GameModels.copyPagoda.getCopyMaxPassUp(mo.ModelGamePagoda.COPY_WUHUN_PAGODA, GameModels.copyPagoda.wuHunMaxPass);
                    if (maxPassUpFloor) {
                        if (GameModels.guide.guideType == mo.ModelGuide.guideType7) {
                            GameModels.guide.requestGuideDone(mo.ModelGuide.guideType7);
                        }
                        mg.alertManager.showAlert(PrewarEmbattle, true, true, 7, null, maxPassUpFloor, true);
                    }
                    else {
                        mg.alertManager.tip(Language.C_YDSX);
                    }
                    return;
                }
                if (this._currentFloor) {
                    var copyVO = this._currentFloor;
                    if (GameModels.guide.guideType == mo.ModelGuide.guideType7) {
                        GameModels.guide.requestGuideDone(mo.ModelGuide.guideType7);
                    }
                    // app.gameContext.enterPagodaPet(copyVO);
                    mg.alertManager.showAlert(PrewarEmbattle, true, true, 7, null, copyVO);
                }
            };
            CopySoulsPagoda.prototype.openHelp = function (e) {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5301).des);
            };
            //显示（最大通关数往上的关数:比如最大通关数为5，这个数就是10，最大通关数是59，这个数就是60）关卡奖励
            CopySoulsPagoda.prototype.showCopyMaxPassUpReward = function (maxPass) {
                this.labCount.text = "";
                this.btnAtt.visible = false;
                if (GameModels.copyPagoda.isWuHunDemonOver(maxPass)) {
                    this.maxPassGroup.visible = false;
                    return;
                }
                this.maxPassGroup.visible = true;
                var maxPassUpFloor = GameModels.copyPagoda.getCopyMaxPassUp(mo.ModelGamePagoda.COPY_WUHUN_PAGODA, maxPass);
                if (maxPassUpFloor) {
                    var elements1 = [];
                    elements1.push({ text: Language.C_TGD, style: { textColor: 0xDCC28F, size: 20 } });
                    elements1.push({ text: maxPassUpFloor.step.toString(), style: { textColor: TypeColor.GREEN1, size: 24 } });
                    elements1.push({ text: Language.C_CJL, style: { textColor: 0xDCC28F, size: 20 } });
                    this.labCustoms.textFlow = elements1;
                    var dropCfg = maxPassUpFloor.template.firstDrop;
                    var drops = dropCfg.split(";");
                    this.drop3.dataSource = drops[0];
                    this.drop4.dataSource = drops[1];
                    var animal = GameModels.animal.getAnimalBuyType(10);
                    if (animal.isAct) {
                        this.labCount.text = maxPassUpFloor.step.toString();
                        this.btnAtt.visible = true;
                    }
                }
                else {
                    this.drop3.dataSource = null;
                    this.drop4.dataSource = null;
                }
            };
            CopySoulsPagoda.prototype.initRankGroup = function () {
                for (var z = this.rankGroup.numChildren; z >= 0; z--) {
                    var btns = this.rankGroup.getChildAt(z);
                    if (btns) {
                        this.rankGroup.removeChildAt(z);
                    }
                }
            };
            return CopySoulsPagoda;
        }(ui.CopySoulsPagodaSkin));
        explore.CopySoulsPagoda = CopySoulsPagoda;
        __reflect(CopySoulsPagoda.prototype, "dialog.explore.CopySoulsPagoda", ["IModuleView", "egret.DisplayObject"]);
    })(explore = dialog.explore || (dialog.explore = {}));
})(dialog || (dialog = {}));

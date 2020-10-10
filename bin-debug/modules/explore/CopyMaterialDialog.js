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
        var CopyMaterialDialog = (function (_super) {
            __extends(CopyMaterialDialog, _super);
            function CopyMaterialDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._pointX = 300;
                _this._pointY = 550;
                return _this;
            }
            CopyMaterialDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.markDestoryImage(this.back);
                this.mask = new egret.Rectangle(0, 0, this.width, this.height);
                this._boxes = [this.box1, this.box2];
                // this.box1.type = mo.ModelGameMaterial.COPY_GEM;
                // this.box2.type = mo.ModelGameMaterial.COPY_FUNPET;
                // this.box3.type = mo.ModelGameMaterial.COPY_DRAGON;
                // this.box4.type = mo.ModelGameMaterial.COPY_RUNE;
                // this.box5.type = mo.ModelGameMaterial.COPY_MARK;
                this._quickBtn = null;
                this._btnArr = [this.btnExp, this.btnYuMao, this.btnZhanDun, this.btnZhanGong];
                this._transcriptType = [mo.ModelGameMaterial.COPY_EXP,
                    mo.ModelGameMaterial.COPY_YUMAO,
                    mo.ModelGameMaterial.COPY_ZHANDUN,
                    mo.ModelGameMaterial.COPY_ZHANGONG];
                this._transcriptName = [Language.C_JYFB, Language.C_YMFB, Language.C_ZGFB, Language.C_ZDFB];
                this._materialType = [TypeCheck.EXP_MATERIAL, TypeCheck.YUMAO_MATERIAL, TypeCheck.ZHANDUN_MATERIAL, TypeCheck.ZHANGONG_MATERIAL];
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                GameModels.state.registerWarnTarget(GameRedState.MATERIAL_COPY_EXPFUBEN, this.btnExp);
                GameModels.state.registerWarnTarget(GameRedState.MATERIAL_COPY_ZHANGONGFUBEN, this.btnZhanGong);
                GameModels.state.registerWarnTarget(GameRedState.MATERIAL_COPY_ZHANDUNFUBEN, this.btnZhanDun);
                GameModels.state.registerWarnTarget(GameRedState.MATERIAL_COPY_YUMAOFUBEN, this.btnYuMao);
            };
            CopyMaterialDialog.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                if (GameModels.guide.guideType == mo.ModelGuide.guideType11) {
                    mg.StoryManager.instance.startBigStory(126, this, null);
                }
                mg.soundManager.playViewLongSound("SoundJM_8", "MATERIAL");
                this._transcriptIndex = data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0;
                this.selectedTab(this._transcriptIndex);
                this.btnNextStep.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.btnPrevStep.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.btnAddNum0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyChallengeCount, this);
                this.btnExp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
                this.btnZhanGong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
                this.btnZhanDun.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
                this.btnYuMao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
                this.imgJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHander, this);
                GameModels.scene.onJoinScene(this, this.updataJoinFightState);
                //this.btnQuickPass.addEventListener(egret.TouchEvent.TOUCH_TAP, this.oneKeyQuickPass, this);
                this.updataJoinFightState();
            };
            CopyMaterialDialog.prototype.exit = function () {
                this._quickBtn = null;
                this.btnEnter.x = 299;
                //this.btnQuickPass.visible = false;
                //tils.timer.clear(this, this.oneKeyQuickPassHandler);
                this.clearEffect();
                this.btnAddNum0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyChallengeCount, this);
                this.btnNextStep.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.btnPrevStep.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                this.btnExp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
                this.btnZhanGong.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
                this.btnZhanDun.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
                this.btnYuMao.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
                this.imgJoin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHander, this);
                GameModels.scene.offJoinScene();
                //this.btnQuickPass.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.oneKeyQuickPass, this);
            };
            CopyMaterialDialog.prototype.onJoinHander = function () {
                var fightData = GameModels.copyBoss.getFightData(TypeGame.MATERIAL);
                app.gameContext.enterMaterial(fightData ? fightData.copyVo : null);
            };
            CopyMaterialDialog.prototype.updataJoinFightState = function () {
                if (GameModels.scene.getjoinSceneListByType(TypeGame.MATERIAL)) {
                    this.imgJoin.visible = true;
                    this.btnEnter.visible = false;
                }
                else {
                    this.imgJoin.visible = false;
                    this.btnEnter.visible = true;
                }
            };
            CopyMaterialDialog.prototype.selectedTab = function (index) {
                if (TypeFunOpen.checkFuncOpen(s.UserfaceName.material, index, true)) {
                    this._transcriptIndex = index;
                    for (var i = 0; i < this._btnArr.length; i++) {
                        if (index == i) {
                            this._btnArr[i].currentState = "down";
                        }
                        else {
                            this._btnArr[i].currentState = "up";
                        }
                    }
                    this.dispatchEventWith(CopyMaterialDialog.CHANG_TAL);
                    this.showView();
                }
            };
            CopyMaterialDialog.prototype.enterHandler = function (e) {
                var index = this._btnArr.indexOf(e.currentTarget);
                if (index != this._transcriptIndex) {
                    this.selectedTab(index);
                }
            };
            CopyMaterialDialog.prototype.showView = function () {
                var _this = this;
                this._selectedType = this._transcriptType[this._transcriptIndex];
                GameModels.copyMaterial.updateCopyData(this, function () {
                    _this._selectedStep = GameModels.copyMaterial.getCurStep(_this._transcriptIndex + 1);
                    var array = GameModels.copyMaterial.getVOByStep(_this._transcriptType[_this._transcriptIndex], _this._selectedStep);
                    if (array.openLevel > GameModels.user.myConfigLevel) {
                        _this._selectedStep--;
                        if (_this._selectedStep <= 0) {
                            _this._selectedStep = 1;
                        }
                    }
                    _this.updateBox();
                    _this.update();
                });
            };
            CopyMaterialDialog.prototype.closeHandler = function (e) {
                mg.uiManager.remove(CopyMaterialDialog);
            };
            CopyMaterialDialog.prototype.updateBox = function () {
                var curVO = GameModels.copyMaterial.getVOByStep(this._transcriptType[this._transcriptIndex], this._selectedStep);
                var rawarItem = curVO.template.dropShow.split(";");
                for (var i = 0; i < 2; i++) {
                    var iconBox = this._boxes[i];
                    iconBox.labName.stroke = 1;
                    if (i < rawarItem.length) {
                        iconBox.dataSource = rawarItem[i];
                        this.boxGroup.addChild(iconBox);
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
            };
            CopyMaterialDialog.prototype.touchHandler = function (e) {
                //utils.timer.clear(this, this.oneKeyQuickPassHandler);
                switch (e.currentTarget) {
                    case this.btnNextStep:
                        this.changeStep(true);
                        break;
                    case this.btnPrevStep:
                        this.changeStep(false);
                        break;
                    case this.btnEnter:
                        this._quickBtn = this.btnEnter;
                        var curVO = GameModels.copyMaterial.getVOByStep(this._transcriptType[this._transcriptIndex], this._selectedStep);
                        var curChapterId = 0;
                        if (this._transcriptIndex == 1) {
                            curChapterId = GameModels.copyMaterial.serverData.List[3].CurCopyId;
                        }
                        else if (this._transcriptIndex == 3) {
                            curChapterId = GameModels.copyMaterial.serverData.List[1].CurCopyId;
                        }
                        else {
                            curChapterId = GameModels.copyMaterial.serverData.List[this._transcriptIndex].CurCopyId;
                        }
                        if (curChapterId == 0) {
                            curChapterId = curVO.type * 1000 + 1;
                        }
                        else {
                            if (this._transcriptIndex == 1) {
                                curChapterId = GameModels.copyMaterial.serverData.List[3].CurCopyId + 1;
                            }
                            else if (this._transcriptIndex == 3) {
                                curChapterId = GameModels.copyMaterial.serverData.List[1].CurCopyId + 1;
                            }
                            else {
                                curChapterId = GameModels.copyMaterial.serverData.List[this._transcriptIndex].CurCopyId + 1;
                            }
                            if (curChapterId - (curVO.type * 1000) > 13) {
                                curChapterId = GameModels.copyMaterial.serverData.List[this._transcriptIndex].CurCopyId;
                            }
                        }
                        var MonsterStep = Templates.getTemplateById(templates.Map.OTHERCHAPTER, curChapterId);
                        if (curVO.template.id > curChapterId) {
                            mg.alertManager.tip(Language.C_QXTZ + convert.getLevelName(MonsterStep.openLv) + this._transcriptName[this._transcriptIndex]);
                            return;
                        }
                        if (GameModels.copyMaterial.isFirstFight(curVO, this._transcriptIndex + 1)) {
                            if (GameModels.guide.guideType == mo.ModelGuide.guideType11) {
                                GameModels.guide.requestGuideDone(mo.ModelGuide.guideType11);
                            }
                            app.gameContext.enterMaterial(curVO, null);
                        }
                        else {
                            var leftCount = 0;
                            var buyCount = 0;
                            if (this._transcriptIndex == 1) {
                                leftCount = GameModels.copyMaterial.serverData.List[3].LeftCount;
                                buyCount = GameModels.copyMaterial.serverData.List[3].BuyCount;
                            }
                            else if (this._transcriptIndex == 3) {
                                leftCount = GameModels.copyMaterial.serverData.List[1].LeftCount;
                                buyCount = GameModels.copyMaterial.serverData.List[1].BuyCount;
                            }
                            else {
                                leftCount = GameModels.copyMaterial.serverData.List[this._transcriptIndex].LeftCount;
                                buyCount = GameModels.copyMaterial.serverData.List[this._transcriptIndex].BuyCount;
                            }
                            if (leftCount > 0) {
                                if (GameModels.user.player.level < 50) {
                                    if (GameModels.guide.guideType == mo.ModelGuide.guideType11) {
                                        GameModels.guide.requestGuideDone(mo.ModelGuide.guideType11);
                                    }
                                    app.gameContext.enterMaterial(curVO, null);
                                }
                                else {
                                    app.gameContext.enterMaterial(curVO, utils.Handler.create(this, this.quickCallback));
                                }
                            }
                            else {
                                if (buyCount < GameModels.copyMaterial.getMaterialsBuyItemMax) {
                                    var num = GameModels.copyMaterial.getMaterialsBuyItemNum(buyCount + 1);
                                    var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
                                    mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, this._materialType[this._transcriptIndex] + "_" + num, null, utils.Handler.create(this, function () {
                                        var _this = this;
                                        GameModels.copyMaterial.materialsBuyChallengesTimes(this._transcriptType[this._transcriptIndex], utils.Handler.create(this, function () {
                                            _this.update();
                                        }));
                                    }), null, null, true);
                                }
                                else {
                                    if (!GameModels.vip.getRewardBuyType(6)) {
                                        if (GameModels.platform.isPay) {
                                            mg.alertManager.showAlert(PromptAlert, false, true, Language.E_FBZUANSHISAODANG, TypeBtnLabel.GOTO, null, utils.Handler.create(this, function () {
                                                mg.uiManager.remove(this);
                                                mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1, param: 6 });
                                            }), false);
                                        }
                                    }
                                    else {
                                        if (GameModels.platform.isPay) {
                                            mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                                        }
                                        else {
                                            mg.alertManager.tip(Language.J_GMCSBZ);
                                        }
                                    }
                                }
                            }
                        }
                        break;
                }
            };
            // private oneKeyQuickPass(evt: egret.TouchEvent): void {
            //     this._quickBtn = this.btnQuickPass;
            //     var curVO: vo.CopyVO = GameModels.copyMaterial.getVOByStep(this._transcriptType[this._transcriptIndex], this._selectedStep);
            //     if (GameModels.copyMaterial.serverData.List[this._transcriptIndex].LeftCount > 0) {
            //         var count: number = GameModels.copyMaterial.serverData.List[this._transcriptIndex].LeftCount;
            //         for (var i = 0; i < count; i++) {
            //             utils.timer.once(i * 400, this, this.oneKeyQuickPassHandler, false, curVO);
            //         }
            //     } else {
            //         if (GameModels.copyMaterial.serverData.List[this._transcriptIndex].BuyCount < GameModels.copyMaterial.getMaterialsBuyItemMax) {
            //             var num: number = GameModels.copyMaterial.getMaterialsBuyItemNum(GameModels.copyMaterial.serverData.List[this._transcriptIndex].BuyCount + 1);
            //             var str: egret.ITextElement[] = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
            //             mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, this._materialType[this._transcriptIndex] + "_" + num, null, utils.Handler.create(this, function () {
            //                 GameModels.copyMaterial.materialsBuyChallengesTimes(this._transcriptType[this._transcriptIndex], utils.Handler.create(this, () => {
            //                     this.update();
            //                 }));
            //             }), null, null, true);
            //         } else {
            //             mg.alertManager.tip(Language.J_KSDCSBZ, 0xff0000);
            //         }
            //     }
            // }
            // private oneKeyQuickPassHandler(curVO: vo.CopyVO) {
            //     app.gameContext.enterMaterial(curVO, utils.Handler.create(this, this.quickCallback), this._transcriptIndex);
            //     GameModels.state.updateState(GameRedState.MATERIAL_COPY_EXPFUBEN);
            //     GameModels.state.updateState(GameRedState.MATERIAL_COPY_ZHANGONGFUBEN);
            //     GameModels.state.updateState(GameRedState.MATERIAL_COPY_ZHANDUNFUBEN);
            // }
            CopyMaterialDialog.prototype.changeCopy = function (evt) {
                //utils.timer.clear(this, this.oneKeyQuickPassHandler);
                this._transcriptIndex = this._btnArr.indexOf(evt.currentTarget);
                this.dispatchEventWith(CopyMaterialDialog.CHANG_TAL);
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].currentState = this._transcriptIndex == i ? "down" : "up";
                }
                this._selectedStep = GameModels.copyMaterial.getCurStep(this._transcriptIndex + 1);
                this.updateBox();
                this.update();
            };
            CopyMaterialDialog.prototype.quickCallback = function (data) {
                var _this = this;
                // mg.alertManager.tip(Language.J_SDCG);
                GameModels.copyMaterial.updateCopyData(this, function () {
                    _this.updateBox();
                    _this.update();
                });
                if (data.Items) {
                    var rewardArr = data.Items.concat();
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
                }
                //mg.effectManager.flyIconsToBag(data.Items, this._quickBtn.localToGlobal(this._quickBtn.width * .5, this._quickBtn.height * .5));
            };
            CopyMaterialDialog.prototype.changeStep = function (isNext) {
                if (isNext) {
                    var data = GameModels.copyMaterial.getVOByStep(this._selectedType, this._selectedStep + 1);
                    if (data && data.openLevel > GameModels.user.myConfigLevel) {
                        mg.alertManager.tip(Language.getExpression(Language.E_1HKQ, convert.getLevelName(data.openLevel)), TypeColor.RED);
                        return;
                    }
                    this._selectedStep++;
                }
                else {
                    this._selectedStep--;
                    if (this._selectedStep <= 0) {
                        this._selectedStep = 1;
                    }
                }
                this.updateBox();
                this.update();
                mg.effectManager.playEffectOnce("6311", 80, 5, this.gpStepEft);
            };
            CopyMaterialDialog.prototype.update = function () {
                var curVO = GameModels.copyMaterial.getVOByStep(this._transcriptType[this._transcriptIndex], this._selectedStep);
                this.oneStarLabel.text = TypeGame.getCopyLimitTime(TypeGame.MATERIAL) + Language.Z_MIAO;
                var leftCount = 0;
                var buyCount = 0;
                if (this._transcriptIndex == 1) {
                    leftCount = GameModels.copyMaterial.serverData.List[3].LeftCount;
                    buyCount = GameModels.copyMaterial.serverData.List[3].BuyCount;
                }
                else if (this._transcriptIndex == 3) {
                    leftCount = GameModels.copyMaterial.serverData.List[1].LeftCount;
                    buyCount = GameModels.copyMaterial.serverData.List[1].BuyCount;
                }
                else {
                    leftCount = GameModels.copyMaterial.serverData.List[this._transcriptIndex].LeftCount;
                    buyCount = GameModels.copyMaterial.serverData.List[this._transcriptIndex].BuyCount;
                }
                this.labCount.text = leftCount + "/" + GameModels.copyMaterial.getMaterialsRefreshNum;
                var canBuyCount = GameModels.copyMaterial.getMaterialsBuyItemMax - buyCount;
                if (canBuyCount < 0)
                    canBuyCount = 0;
                this.labLeftBuyCount.text = Language.getExpression(Language.E_SYGMCS, canBuyCount);
                this.labBossName.text = convert.getLevelName(curVO.openLevel) + this._transcriptName[this._transcriptIndex];
                if (GameModels.copyMaterial.isFirstFight(curVO, this._transcriptIndex + 1)) {
                    this.btnEnter.label = Language.C_KSTZ;
                }
                else {
                    if (GameModels.user.player.level < 50) {
                        this.btnEnter.label = Language.C_KSTZ;
                    }
                    else {
                        this.btnEnter.label = Language.C_SD;
                    }
                }
                var isFirstFight = GameModels.copyMaterial.isFirstFight(curVO, this._transcriptIndex + 1);
                this.labIsFirst.visible = isFirstFight;
                this.numGroup.visible = !isFirstFight;
                this.labLeftBuyCount.visible = !isFirstFight && GameModels.copyMaterial.getMaterialsBuyItemMax > 0;
                this.body.setPetBody(curVO.bossShowId, false, false);
                // if (GameModels.user.player.vip < 7 || isFirstFight || GameModels.user.player.level < 70) {
                //     this.btnEnter.x = 299;
                //     this.btnQuickPass.visible = false;
                // } else {
                //     this.btnEnter.x = 150;
                //     this.btnQuickPass.visible = true;
                // }
                var copyVO;
                this.btnNextStep.visible = this._selectedStep < GameModels.copyMaterial.stepMax;
                this.btnPrevStep.visible = this._selectedStep > GameModels.copyMaterial.stepMin;
                if (this.btnNextStep.visible) {
                    copyVO = GameModels.copyMaterial.getVOByStep(this._selectedType, this._selectedStep + 1);
                }
                if (this.btnPrevStep.visible) {
                    copyVO = GameModels.copyMaterial.getVOByStep(this._selectedType, this._selectedStep - 1);
                }
            };
            Object.defineProperty(CopyMaterialDialog.prototype, "currentViewState", {
                /**当前的界面状态 */
                get: function () {
                    return this.currentState;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CopyMaterialDialog.prototype, "currentChooseIndex", {
                /**材料副本中哪个副本*/
                get: function () {
                    return this._transcriptIndex;
                },
                enumerable: true,
                configurable: true
            });
            CopyMaterialDialog.prototype.buyChallengeCount = function (evt) {
                var _this = this;
                //utils.timer.clear(this, this.oneKeyQuickPassHandler);
                var leftCount = 0;
                var buyCount = 0;
                if (this._transcriptIndex == 1) {
                    leftCount = GameModels.copyMaterial.serverData.List[3].LeftCount;
                    buyCount = GameModels.copyMaterial.serverData.List[3].BuyCount;
                }
                else if (this._transcriptIndex == 3) {
                    leftCount = GameModels.copyMaterial.serverData.List[1].LeftCount;
                    buyCount = GameModels.copyMaterial.serverData.List[1].BuyCount;
                }
                else {
                    leftCount = GameModels.copyMaterial.serverData.List[this._transcriptIndex].LeftCount;
                    buyCount = GameModels.copyMaterial.serverData.List[this._transcriptIndex].BuyCount;
                }
                if (buyCount >= GameModels.copyMaterial.getMaterialsBuyItemMax) {
                    if (GameModels.platform.isPay) {
                        mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                    }
                    else {
                        mg.alertManager.tip(Language.J_GMCSBZ);
                    }
                    return;
                }
                if (leftCount >= GameModels.copyMaterial.getMaterialsRefreshNum) {
                    mg.alertManager.tip(Language.J_CSZGWXGM, 0xff0000);
                    return;
                }
                var num = GameModels.copyMaterial.getMaterialsBuyItemNum(buyCount + 1);
                var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMTZJH, num));
                mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, this._materialType[this._transcriptIndex] + "_" + num, null, utils.Handler.create(this, function () {
                    GameModels.copyMaterial.materialsBuyChallengesTimes(_this._transcriptType[_this._transcriptIndex], utils.Handler.create(_this, function () {
                        _this.update();
                    }));
                }), null, null, true);
            };
            CopyMaterialDialog.CHANG_TAL = "CHANG_TAL";
            return CopyMaterialDialog;
        }(ui.CopyMaterialSkin));
        explore.CopyMaterialDialog = CopyMaterialDialog;
        __reflect(CopyMaterialDialog.prototype, "dialog.explore.CopyMaterialDialog");
    })(explore = dialog.explore || (dialog.explore = {}));
})(dialog || (dialog = {}));

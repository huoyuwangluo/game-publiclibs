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
    var yuanZheng;
    (function (yuanZheng) {
        var BingFenSanLu = (function (_super) {
            __extends(BingFenSanLu, _super);
            function BingFenSanLu() {
                return _super.call(this) || this;
            }
            BingFenSanLu.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._posArr3 = [new egret.Point(375, 749), new egret.Point(176, 771), new egret.Point(89, 644), new egret.Point(76, 475), new egret.Point(76, 359),
                    new egret.Point(273, 385), new egret.Point(411, 385), new egret.Point(371, 263), new egret.Point(220, 161), new egret.Point(53, 127)];
                this._posArr2 = [new egret.Point(447, 784), new egret.Point(196, 761), new egret.Point(133, 641), new egret.Point(283, 568), new egret.Point(404, 439),
                    new egret.Point(214, 402), new egret.Point(65, 263), new egret.Point(381, 263), new egret.Point(220, 161), new egret.Point(62, 103)];
                this._posArr1 = [new egret.Point(498, 712), new egret.Point(447, 504), new egret.Point(220, 618), new egret.Point(158, 787), new egret.Point(26, 646),
                    new egret.Point(86, 479), new egret.Point(246, 354), new egret.Point(363, 298), new egret.Point(220, 161), new egret.Point(114, 75)];
                this._itemArr = [this.item1, this.item2, this.item3, this.item4, this.item5, this.item6,
                    this.item7, this.item8, this.item9, this.item10];
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].initView(i + 1);
                }
            };
            BingFenSanLu.prototype.enter = function () {
                var _this = this;
                GameModels.legion.isOpenBingFenSanLuView = true;
                GameModels.shilita.requestShiLiTaInfo(utils.Handler.create(this, function () {
                    _this.imgChapter.source = "img_bingfensanlu_title" + GameModels.shilita.currIndex + "_png";
                    _this.imgBg.source = "img_bingfensanlu_bg" + GameModels.shilita.currIndex + "_jpg";
                    if (GameModels.shilita.currIndex == 1) {
                        for (var i = 0; i < _this._itemArr.length; i++) {
                            _this._itemArr[i].x = _this._posArr1[i].x;
                            _this._itemArr[i].y = _this._posArr1[i].y;
                        }
                    }
                    else if (GameModels.shilita.currIndex == 2) {
                        for (var i = 0; i < _this._itemArr.length; i++) {
                            _this._itemArr[i].x = _this._posArr2[i].x;
                            _this._itemArr[i].y = _this._posArr2[i].y;
                        }
                    }
                    else {
                        for (var i = 0; i < _this._itemArr.length; i++) {
                            _this._itemArr[i].x = _this._posArr3[i].x;
                            _this._itemArr[i].y = _this._posArr3[i].y;
                        }
                    }
                    _this.showView();
                }));
                this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnAtt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                }
            };
            BingFenSanLu.prototype.exit = function () {
                egret.Tween.removeTweens(this.imgSelecd);
                this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnAtt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].dataSource = null;
                    this._itemArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                }
            };
            BingFenSanLu.prototype.showView = function () {
                this.labCount.text = "";
                this.btnAtt.visible = false;
                this._currStep = GameModels.shilita.currStep[GameModels.shilita.currIndex - 1] + 1;
                var maxPassUpFloor = GameModels.shilita.getCopyMaxPassUp(80 + GameModels.shilita.currIndex, this._currStep);
                if (maxPassUpFloor) {
                    var animal = GameModels.animal.getAnimalBuyType(9);
                    if (animal.isAct && animal.step >= 3) {
                        this.labCount.text = maxPassUpFloor.step.toString();
                        this.btnAtt.visible = true;
                    }
                }
                var data = GameModels.copyBoss.getCopyList(80 + GameModels.shilita.currIndex);
                var temData = [];
                var step = [];
                var startStep = Math.floor(GameModels.shilita.currStep[GameModels.shilita.currIndex - 1] / 10) * 10 + 1;
                var endStep = startStep + 9;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].template.step >= startStep && data[i].template.step <= endStep) {
                        temData.push(data[i]);
                        step.push(data[i].template.step);
                    }
                }
                step.sort(function (a, b) {
                    return a - b;
                });
                temData.sort(function (a, b) {
                    return a.template.step - b.template.step;
                });
                logger.log("当前的模式是==", GameModels.shilita.currIndex);
                logger.log("历史的阶级是==", this._currStep - 1);
                logger.log("当前的阶级是==", this._currStep);
                logger.log("当前的10关是的阶级是==", step);
                for (var i = 0; i < 10; i++) {
                    this._itemArr[i].dataSource = temData[i] ? temData[i] : null;
                }
                this.imgSelecd.visible = true;
                if (this._currStep % 10 == 0) {
                    this.imgSelecd.x = this._itemArr[this._itemArr.length - 1].x;
                    this.imgSelecd.y = this._itemArr[this._itemArr.length - 1].y;
                }
                else {
                    this.imgSelecd.x = this._itemArr[this._currStep % 10 - 1].x;
                    this.imgSelecd.y = this._itemArr[this._currStep % 10 - 1].y;
                }
                egret.Tween.removeTweens(this.imgSelecd);
                this.playTween(false);
            };
            BingFenSanLu.prototype.playTween = function (isBool) {
                var index = 0;
                if (this._currStep % 10 == 0) {
                    index = this._itemArr.length - 1;
                }
                else {
                    index = this._currStep % 10 - 1;
                }
                var x1 = this._itemArr[index].y;
                var x2 = this._itemArr[index].y - 20;
                egret.Tween.get(this.imgSelecd).to({ y: isBool ? x1 : x2 }, 500).call(this.playTween, this, [!isBool]);
            };
            BingFenSanLu.prototype.clickHandler = function (e) {
                switch (e.currentTarget) {
                    case this.btnHelp:
                        mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5701).des);
                        break;
                    case this.btnAtt:
                        var maxPassUpFloor = GameModels.shilita.getCopyMaxPassUp(80 + GameModels.shilita.currIndex, this._currStep);
                        if (maxPassUpFloor) {
                            GameModels.shilita.requestShiLiTaChapterInfo(maxPassUpFloor.template.id, utils.Handler.create(this, function () {
                                mg.alertManager.showAlert(PrewarEmbattleShiLiTa, true, true, maxPassUpFloor, true);
                            }));
                        }
                        else {
                            mg.alertManager.tip(Language.C_YDSX);
                        }
                        break;
                    default:
                        for (var i = 0; i < this._itemArr.length; i++) {
                            if (e.currentTarget == this._itemArr[i]) {
                                var data = this._itemArr[i].dataSource;
                                if (data.template.step > this._currStep) {
                                    if (data.template.step % 5 == 0) {
                                        mg.alertManager.showAlert(ChestPreviewAlert, true, true, GameModels.common.paserPrizeItems(data.template.firstDrop), null, null, null, false, false, null, '');
                                    }
                                    else {
                                        mg.alertManager.tip(Language.J_GCHWKQ);
                                    }
                                }
                                else if (data.template.step < this._currStep) {
                                    if (data.template.step % 5 == 0) {
                                        mg.alertManager.showAlert(ChestPreviewAlert, true, true, GameModels.common.paserPrizeItems(data.template.firstDrop), null, null, null, false, false, null, '');
                                    }
                                    else {
                                        mg.alertManager.tip(Language.J_GCYBGZ);
                                    }
                                }
                                else {
                                    if (GameModels.shilita.currIndex == 1) {
                                        if (GameModels.sgActivity.getCurrWeek() == 1 || GameModels.sgActivity.getCurrWeek() == 4 || GameModels.sgActivity.getCurrWeek() == 7) {
                                            GameModels.shilita.requestShiLiTaChapterInfo(data.template.id, utils.Handler.create(this, function () {
                                                mg.alertManager.showAlert(PrewarEmbattleShiLiTa, true, true, data);
                                            }));
                                        }
                                        else {
                                            mg.alertManager.tip(Language.J_HDWKQ);
                                        }
                                    }
                                    else if (GameModels.shilita.currIndex == 2) {
                                        if (GameModels.sgActivity.getCurrWeek() == 2 || GameModels.sgActivity.getCurrWeek() == 5 || GameModels.sgActivity.getCurrWeek() == 7) {
                                            GameModels.shilita.requestShiLiTaChapterInfo(data.template.id, utils.Handler.create(this, function () {
                                                mg.alertManager.showAlert(PrewarEmbattleShiLiTa, true, true, data);
                                            }));
                                        }
                                        else {
                                            mg.alertManager.tip(Language.J_HDWKQ);
                                        }
                                    }
                                    else {
                                        if (GameModels.sgActivity.getCurrWeek() == 3 || GameModels.sgActivity.getCurrWeek() == 6 || GameModels.sgActivity.getCurrWeek() == 7) {
                                            GameModels.shilita.requestShiLiTaChapterInfo(data.template.id, utils.Handler.create(this, function () {
                                                mg.alertManager.showAlert(PrewarEmbattleShiLiTa, true, true, data);
                                            }));
                                        }
                                        else {
                                            mg.alertManager.tip(Language.J_HDWKQ);
                                        }
                                    }
                                }
                                break;
                            }
                        }
                        break;
                }
            };
            return BingFenSanLu;
        }(ui.BingFenSanLuSkin));
        yuanZheng.BingFenSanLu = BingFenSanLu;
        __reflect(BingFenSanLu.prototype, "dialog.yuanZheng.BingFenSanLu");
    })(yuanZheng = dialog.yuanZheng || (dialog.yuanZheng = {}));
})(dialog || (dialog = {}));

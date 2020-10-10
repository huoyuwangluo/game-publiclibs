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
        var LegionYuanZheng = (function (_super) {
            __extends(LegionYuanZheng, _super);
            function LegionYuanZheng() {
                var _this = _super.call(this) || this;
                _this._leftTime = 0;
                return _this;
            }
            LegionYuanZheng.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._itemArr = [this.item1, this.item2, this.item3, this.item4, this.item5, this.item6,
                    this.item7, this.item8, this.item9, this.item10, this.item11, this.item12, this.item13,
                    this.item14, this.item15, this.item16, this.item17, this.item18, this.item19, this.item20];
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].initView(i + 1);
                }
            };
            LegionYuanZheng.prototype.enter = function () {
                this._leftTime = 0;
                GameModels.legion.isOpenYuanZhengView = true;
                this.initView();
                this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                }
                this.rewardGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                GameModels.legion.addEventListener(mo.ModelLegion.UNION_QUICKPASS, this.initView, this);
            };
            LegionYuanZheng.prototype.initView = function () {
                var _this = this;
                GameModels.legion.requestExpeditionInfo(0, utils.Handler.create(this, function () {
                    if (GameModels.legion.leftTime > 0) {
                        if (GameModels.legion.currStep - GameModels.legion.startStep >= 20) {
                            mg.alertManager.showAlert(PromptAlert, false, true, Language.J_GXNQBTG, TypeBtnLabel.OK_SIGIN, null, null, null, false, true, true, true, Language.J_SYSJJSHJKQXYL);
                        }
                        _this.showView();
                        _this._leftTime = GameModels.legion.leftTime;
                        utils.timer.clear(_this, _this.timerHandler);
                        _this.labTime.text = Language.C_SYSJ + ":" + utils.DateUtil.formatTimeLeft(_this._leftTime);
                        utils.timer.loop(1000, _this, _this.timerHandler);
                    }
                    else {
                        mg.uiManager.removeAllDialogs();
                    }
                }));
            };
            LegionYuanZheng.prototype.timerHandler = function () {
                this._leftTime--;
                if (this._leftTime <= 0) {
                    this._leftTime = 0;
                    this.labTime.text = "";
                    mg.uiManager.removeAllDialogs();
                    return;
                }
                this.labTime.text = Language.C_SYSJ + ":" + utils.DateUtil.formatTimeLeft(this._leftTime);
            };
            LegionYuanZheng.prototype.exit = function () {
                egret.Tween.removeTweens(this.imgSelecd);
                this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].dataSource = null;
                    this._itemArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                }
                this.rewardGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                GameModels.legion.removeEventListener(mo.ModelLegion.UNION_QUICKPASS, this.initView, this);
            };
            LegionYuanZheng.prototype.showView = function () {
                this.imgChapter.source = "yuanzheng_json.img_yuanzheng_title" + GameModels.legion.curSelectMode;
                this.icon.source = GameModels.legion.curSelectMode < 3 ? "yuanzheng_json.img_rewardIcon1" : "yuanzheng_json.img_rewardIcon2";
                this.imgOrde.source = "chapterMap_json.img_city_" + Math.ceil(GameModels.legion.startStep / 20);
                var data = GameModels.copyBoss.getCopyList(70 + GameModels.legion.curSelectMode);
                var temData = [];
                var step = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].template.step >= GameModels.legion.startStep && data[i].template.step <= GameModels.legion.startStep + 19) {
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
                logger.log("当前的模式是==", GameModels.legion.curSelectMode);
                logger.log("当前的阶级是==", GameModels.legion.currStep);
                logger.log("当前的20关是的阶级是==", step);
                for (var i = 0; i < 20; i++) {
                    this._itemArr[i].dataSource = null;
                    this._itemArr[i].dataSource = temData[i] ? temData[i] : null;
                }
                var endVo = this._itemArr[this._itemArr.length - 1].dataSource;
                this.labGetReward.text = "X" + endVo.template.firstDrop.split(";")[0].split("_")[1];
                if (GameModels.legion.currStep - GameModels.legion.startStep >= 20 /*|| GameModels.legion.currStep > 20*/) {
                    this.imgSelecd.visible = false;
                }
                else {
                    var currIndex = GameModels.legion.currStep - GameModels.legion.startStep;
                    this.imgSelecd.visible = true;
                    this.imgSelecd.x = this._itemArr[currIndex].x;
                    this.imgSelecd.y = this._itemArr[currIndex].y;
                    egret.Tween.removeTweens(this.imgSelecd);
                    this.playTween(false);
                }
            };
            LegionYuanZheng.prototype.playTween = function (isBool) {
                var currIndex = GameModels.legion.currStep - GameModels.legion.startStep;
                var x1 = this._itemArr[currIndex].y;
                var x2 = this._itemArr[currIndex].y - 20;
                egret.Tween.get(this.imgSelecd).to({ y: isBool ? x1 : x2 }, 500).call(this.playTween, this, [!isBool]);
            };
            LegionYuanZheng.prototype.clickHandler = function (e) {
                switch (e.currentTarget) {
                    case this.btnHelp:
                        mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5401).des);
                        break;
                    case this.btnRank:
                        break;
                    case this.rewardGroup:
                        var endVo = this._itemArr[this._itemArr.length - 1].dataSource;
                        if (endVo)
                            mg.alertManager.showAlert(ChestPreviewAlert, true, true, GameModels.common.paserPrizeItems(endVo.template.firstDrop), null, null, null, false, false, null, '');
                        break;
                    default:
                        for (var i = 0; i < this._itemArr.length; i++) {
                            if (e.currentTarget == this._itemArr[i]) {
                                var data = this._itemArr[i].dataSource;
                                if (data.template.step > GameModels.legion.currStep) {
                                    if (data.template.step % 5 == 0) {
                                        mg.alertManager.showAlert(ChestPreviewAlert, true, true, GameModels.common.paserPrizeItems(data.template.firstDrop), null, null, null, false, false, null, '');
                                    }
                                    else {
                                        mg.alertManager.tip(Language.J_GCHWKQ);
                                    }
                                }
                                else if (data.template.step < GameModels.legion.currStep) {
                                    if (data.template.step % 5 == 0) {
                                        mg.alertManager.showAlert(ChestPreviewAlert, true, true, GameModels.common.paserPrizeItems(data.template.firstDrop), null, null, null, false, false, null, '');
                                    }
                                    else {
                                        mg.alertManager.tip(Language.J_GCYBGZ);
                                    }
                                }
                                else {
                                    GameModels.legion.requestExpeditionChapterInfo(utils.Handler.create(this, function () {
                                        mg.alertManager.showAlert(PrewarEmbattleYuanZheng, true, true, data);
                                    }));
                                }
                                break;
                            }
                        }
                        break;
                }
            };
            return LegionYuanZheng;
        }(ui.LegionYuanZhengSkin));
        yuanZheng.LegionYuanZheng = LegionYuanZheng;
        __reflect(LegionYuanZheng.prototype, "dialog.yuanZheng.LegionYuanZheng");
    })(yuanZheng = dialog.yuanZheng || (dialog.yuanZheng = {}));
})(dialog || (dialog = {}));

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
    var buzhen;
    (function (buzhen) {
        var BuZhenDialog = (function (_super) {
            __extends(BuZhenDialog, _super);
            function BuZhenDialog() {
                return _super.call(this) || this;
            }
            BuZhenDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._headArr = [this.head0, this.head1, this.head2, this.head3, this.head4];
                this._skillIconList = [this.skill1, this.skill2, this.skill3];
                this._skillLockList = [this.skillLock1, this.skillLock2, this.skillLock3];
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            BuZhenDialog.prototype.enter = function () {
                GameModels.pet.petGetFormationData(TypeFormation.UP_FORMATION, utils.Handler.create(this, function () {
                    this.registerMoveItem();
                    this.showView();
                    this.updataInfo();
                    logger.log("当前的阵型的配置id:", GameModels.pet.getLegionSkillByGameType() ? GameModels.pet.getLegionSkillByGameType().id : 0);
                }));
                this.skill1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.skill2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.skill3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnSave.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            };
            BuZhenDialog.prototype.updataInfo = function () {
                this.skill1.source = "legionSkill_json.img_legionSkill_601101";
                this.skill2.source = "legionSkill_json.img_legionSkill_601201";
                this.skill3.source = "legionSkill_json.img_legionSkill_601301";
                if (GameModels.pet.getLegionSkillByGameType()) {
                    var strArr = GameModels.pet.getLegionSkillByGameType().skill.split(";");
                    for (var i = 0; i < this._skillIconList.length; i++) {
                        if (strArr[i]) {
                            this._skillLockList[i].visible = false;
                            this._skillIconList[i].source = "legionSkill_json.img_legionSkill_" + strArr[i];
                            this._skillIconList[i].filters = null;
                        }
                        else {
                            this._skillLockList[i].visible = true;
                            this._skillIconList[i].filters = utils.filterUtil.grayFilters;
                        }
                    }
                }
                else {
                    this.skill1.filters = this.skill2.filters = this.skill3.filters = utils.filterUtil.grayFilters;
                }
            };
            BuZhenDialog.prototype.registerMoveItem = function () {
                var _this = this;
                var drags = this._headArr;
                var puts = this._headArr;
                this.moveItem.register(this, drags, function (index) {
                    _this._touchIndex = index;
                    logger.log("dragHandler" + index);
                    _this._headArr[_this._touchIndex].visible = false;
                    return true;
                }, puts, function (index) {
                    _this._endIndex = index;
                    logger.log("putHandler" + index);
                    _this._headArr[_this._touchIndex].visible = true;
                    //this._headArr[this._touchIndex].alpha = 1;
                    if (_this._endIndex == 9999)
                        return false;
                    if (_this._endIndex == -1)
                        return false;
                    if (_this._touchIndex < 3 && _this._endIndex >= 3) {
                        mg.alertManager.tip(Language.J_QPWJZNBZQP);
                        return false;
                    }
                    if (_this._touchIndex >= 3 && _this._endIndex < 3) {
                        mg.alertManager.tip(Language.J_HPWJZNBZHP);
                        return false;
                    }
                    var touchVo = _this._headArr[_this._touchIndex].vo;
                    var endVo = _this._headArr[_this._endIndex].vo;
                    if (endVo) {
                        _this._headArr[_this._touchIndex].data = endVo;
                    }
                    else {
                        _this._headArr[_this._touchIndex].data = null;
                    }
                    _this._headArr[_this._endIndex].data = touchVo;
                    return true;
                }, function (index) {
                    return true;
                });
                this.moveItem.getSourceMethod = function (selectItem, index) {
                    return selectItem.vo;
                };
            };
            BuZhenDialog.prototype.showView = function () {
                var formationData = GameModels.pet.formationData;
                for (var i = 0; i < this._headArr.length; i++) {
                    if (formationData[i]) {
                        var vo = GameModels.pet.getFormatUpVO(formationData[i]);
                        this._headArr[i].data = vo;
                    }
                    else {
                        this._headArr[i].data = null;
                    }
                }
            };
            BuZhenDialog.prototype.onBtnClick = function (e) {
                if (e.currentTarget == this.btnSave) {
                    this._petUid = [];
                    for (var i = 0; i < this._headArr.length; i++) {
                        this._petUid.push(this._headArr[i].petUid);
                    }
                    GameModels.pet.petSetFormationData(TypeFormation.UP_FORMATION, this._petUid, utils.Handler.create(this, function () {
                        if (TypeGame.isFormationGame()) {
                            mg.alertManager.tip(Language.J_XCZDTZSX);
                        }
                        else {
                            mg.alertManager.tip(Language.J_ZXTZCG);
                        }
                        this.showView();
                    }));
                }
                else if (e.currentTarget == this.skill1) {
                    mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: 1, config: null });
                }
                else if (e.currentTarget == this.skill2) {
                    mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: 2, config: null });
                }
                else if (e.currentTarget == this.skill3) {
                    mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: 3, config: null });
                }
            };
            BuZhenDialog.prototype.exit = function () {
                this.moveItem.reset();
                for (var i = 0; i < this._headArr.length; i++) {
                    this._headArr[i].data = null;
                }
                this.skill1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.skill2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.skill3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnSave.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            };
            return BuZhenDialog;
        }(ui.BuZhenDialogSkin));
        buzhen.BuZhenDialog = BuZhenDialog;
        __reflect(BuZhenDialog.prototype, "dialog.buzhen.BuZhenDialog");
    })(buzhen = dialog.buzhen || (dialog.buzhen = {}));
})(dialog || (dialog = {}));

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
var item;
(function (item) {
    var MainPetBigItem = (function (_super) {
        __extends(MainPetBigItem, _super);
        function MainPetBigItem() {
            return _super.call(this) || this;
        }
        MainPetBigItem.prototype.initialize = function () {
            this.hp.minimum = 0;
            this.hp.maximum = 100;
            this._quan = new s.AnimationSprite();
            this._quan.touchEnabled = this._quan.touchChildren = false;
            this.touchChildren = false;
            //this.hp.labelFunction = function (value: number, max: number): string { return "" };
            this.removeChild(this.labTime);
        };
        MainPetBigItem.prototype.initializeData = function (data, petPos) {
            this.reset();
            this._data = data;
            this.imgBack.source = "uiMain_json.img_main_petbg";
            if (petPos == 3)
                this.imgBack.source = "uiMain_json.img_main_petbg1";
            if (this._data) {
                this.icon.source = ResPath.getPetIconSmall(data.headIcon);
                this.imgQuality.source = ResPath.getLingXingQuality(data.quality);
                data.onPropertyChange(TypeProperty.Hp, this, this.hpChange);
                data.onPropertyChange(TypeProperty.MaxHp, this, this.hpChange);
                if (this._enableHandler)
                    data.onMergeStateChange(this, this.mergeStateChange);
                this.hpChange();
            }
            if (this._enableHandler)
                this.updateTagState();
            // if (GameModels.task.hasTask && GameModels.task.curTask.id < 100800) {
            // 	this.imgStateUntie.filters = utils.filterUtil.grayFilters;
            // 	this.imgStateJoin.filters = utils.filterUtil.grayFilters;
            // }
            // else {
            // 	this.imgStateJoin.filters = null;
            // 	this.imgStateUntie.filters = null;
            // }
        };
        MainPetBigItem.prototype.reset = function () {
            if (this._data) {
                this._data.offPropertyChange(TypeProperty.Hp, this, this.hpChange);
                this._data.offPropertyChange(TypeProperty.MaxHp, this, this.hpChange);
                this._data.offMergeStateChange(this, this.mergeStateChange);
            }
        };
        MainPetBigItem.prototype.disableHandler = function () {
            if (this._data) {
                this._data.offMergeStateChange(this, this.mergeStateChange);
            }
            this._enableHandler = false;
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        };
        MainPetBigItem.prototype.enableHandler = function () {
            this.updateTagState();
            if (this._data) {
                this._data.onMergeStateChange(this, this.mergeStateChange);
            }
            this._enableHandler = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        };
        MainPetBigItem.prototype.playQuanEffect = function () {
            this._quan.x = this.x + 31.5;
            this._quan.y = this.y + 31.5;
            mg.effectManager.addChild(this._quan);
            this._quan.resId = '6149';
            this._quan.play();
        };
        MainPetBigItem.prototype.hideQuanEffect = function () {
            if (this._quan) {
                this._quan.stop();
                if (this._quan.parent) {
                    this._quan.parent.removeChild(this._quan);
                }
                this._quan.reset();
            }
        };
        MainPetBigItem.prototype.hpChange = function () {
            this.hp.value = (this._data.battleHp / this._data.battleHpMax) * 100;
            if (this._data.battleHp == 0) {
                this.icon.alpha = 0.5;
            }
            else {
                this.icon.alpha = 1;
            }
        };
        MainPetBigItem.prototype.mergeStateChange = function () {
            this.updateTagState();
            this.startCountDown();
        };
        MainPetBigItem.prototype.touchHandler = function (e) {
            if (!this._data)
                return;
            if (this._data.template.job != 5)
                return;
            // if (GameModels.task.hasTask && GameModels.task.curTask.id < 100800) {
            // 	mg.alertManager.tip(Language.J_HSTRWJSHT);
            // 	return;
            // }
            egret.Tween.removeTweens(this);
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    if (GameModels.pet.isHashMerged && !this._data.isMerged) {
                        mg.alertManager.tip(Language.J_TSZNYGHZ);
                        return;
                    }
                    this.scaleX = this.scaleY = 1;
                    egret.Tween.get(this).to({
                        scaleX: 0.5,
                        scaleY: 0.5
                    }, 300, utils.Ease.cubicOut);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    if (this._data.stateDead) {
                        mg.alertManager.tip(Language.J_HSYSWWFJH);
                        return;
                    }
                    if (GameModels.user.player.stateDead) {
                        mg.alertManager.tip(Language.J_ZJYSW);
                        return;
                    }
                    if (!this._data.isMergeCding) {
                        GameModels.scene.syncMerge(this._data.uid, !this._data.isMerged);
                    }
                    else {
                        if (this._data.isMerged) {
                            mg.alertManager.tip(Language.J_JTCDZ);
                        }
                        else {
                            mg.alertManager.tip(Language.J_HTCDZ);
                        }
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                    egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 300, utils.Ease.circOut);
                    if (this.stage)
                        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    // this.effectEnabled = false;
                    break;
            }
        };
        MainPetBigItem.prototype.updateTagState = function () {
            if (!this._data)
                return;
            if (this._data.stateDead) {
                if (this.imgStateJoin.parent) {
                    this.imgStateJoin.parent.removeChild(this.imgStateJoin);
                }
                if (this.imgStateUntie.parent) {
                    this.imgStateUntie.parent.removeChild(this.imgStateUntie);
                }
                this.addChild(this.imgStateDead);
                //this.hp.y = 104;
                return;
            }
            if (this._data.template.job == 5) {
                //this.hp.y = 104;
                if (this.imgStateDead.parent) {
                    this.imgStateDead.parent.removeChild(this.imgStateDead);
                }
                if (this._data.isMerged) {
                    this.addChild(this.imgStateUntie);
                }
                else {
                    this.addChild(this.imgStateJoin);
                    //this.hp.y = 104;
                }
            }
            else {
                if (this.imgStateJoin.parent) {
                    this.imgStateJoin.parent.removeChild(this.imgStateJoin);
                }
                if (this.imgStateDead.parent) {
                    this.imgStateDead.parent.removeChild(this.imgStateDead);
                }
                if (this.imgStateUntie.parent) {
                    this.imgStateUntie.parent.removeChild(this.imgStateUntie);
                }
                //this.hp.y = 78;
            }
        };
        MainPetBigItem.prototype.startCountDown = function () {
            this.timerHandler();
            if (this._data.isMergeCding) {
                this.addChild(this.labTime);
                utils.timer.loop(1000, this, this.timerHandler, true);
            }
        };
        MainPetBigItem.prototype.timerHandler = function () {
            if (this._data.isMergeCding) {
                this.labTime.text = Math.round((5000 - (egret.getTimer() - this._data.mergeCd)) / 1000).toString();
                return;
            }
            utils.timer.clear(this, this.timerHandler);
            if (this.labTime.parent) {
                this.labTime.parent.removeChild(this.labTime);
            }
        };
        return MainPetBigItem;
    }(ui.MainPetItemBigSkin));
    item.MainPetBigItem = MainPetBigItem;
    __reflect(MainPetBigItem.prototype, "item.MainPetBigItem");
})(item || (item = {}));

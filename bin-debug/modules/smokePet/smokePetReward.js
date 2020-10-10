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
var smokePetReward = (function (_super) {
    __extends(smokePetReward, _super);
    function smokePetReward() {
        var _this = _super.call(this) || this;
        _this._imgCardArr = [_this.imgCard0, _this.imgCard1, _this.imgCard2, _this.imgCard3, _this.imgCard4, _this.imgCard5,
            _this.imgCard6, _this.imgCard7, _this.imgCard8, _this.imgCard9];
        _this._imgBgArr = [_this.imgBg0, _this.imgBg1, _this.imgBg2, _this.imgBg3, _this.imgBg4, _this.imgBg5,
            _this.imgBg6, _this.imgBg7, _this.imgBg8, _this.imgBg9];
        _this._effCardArr = [];
        return _this;
    }
    smokePetReward.prototype.show = function (type, count) {
        this.clearEff();
        this._fiveStarPokerNoFinsh = false;
        this._fourStarPoker = [];
        this._fiveStarPoker = [];
        this._type = type;
        this._count = count;
        GameModels.smokepet.type = type;
        GameModels.smokepet.count = count;
        this.imgHide.visible = false;
        this.onceGroup.visible = false;
        this.imgCard.visible = false;
        this.imgBg.visible = false;
        this._allStarArr = [];
        for (var i = 0; i < this._imgCardArr.length; i++) {
            this._imgCardArr[i].visible = false;
            this._imgBgArr[i].visible = false;
        }
        if (GameModels.smokepet.petList.length > 1) {
            var petArr = GameModels.smokepet.petList;
            for (var j = 0; j < petArr.length; j++) {
                this._imgBgArr[j].visible = true;
                this._imgBgArr[j].scaleX = 1;
                this._imgCardArr[j].data = GameModels.smokepet.petList[j];
                if (petArr[j]) {
                    var tempPet = Templates.getTemplateById(templates.Map.GENERAL, petArr[j].split("_")[0]);
                    if (tempPet.star > 4) {
                        this._fiveStarPoker.push(j);
                    }
                    else {
                        this._fourStarPoker.push(j);
                    }
                    this._allStarArr.push(tempPet.star);
                }
            }
            if (this._fiveStarPoker.length > 0) {
                this._fiveStarPokerNoFinsh = true;
                for (var z = 0; z < this._fiveStarPoker.length; z++) {
                    var index = this._fiveStarPoker[z];
                    this.startPalyTween(this._imgCardArr[index], this._imgBgArr[index], this._allStarArr[index], index);
                }
                utils.timer.once(2000, this, this.playFrouStarTween, false);
            }
            else {
                for (var p = 0; p < this._imgCardArr.length; p++) {
                    this.startPalyTween(this._imgCardArr[p], this._imgBgArr[p], this._allStarArr[p], p);
                }
                utils.timer.once(2000, this, this.showOnceBtn, false);
            }
        }
        else {
            var tempPet = Templates.getTemplateById(templates.Map.GENERAL, GameModels.smokepet.petList[0].split("_")[0]);
            this.imgCard.data = GameModels.smokepet.petList[0];
            this.startPalyTween(this.imgCard, this.imgBg, tempPet.star, 0);
            utils.timer.once(2000, this, this.showOnceBtn, false);
        }
        this.imgCloseBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    smokePetReward.prototype.createEffect = function (index) {
        if (!this._effCardArr[index]) {
            this._effCardArr[index] = utils.ObjectPool.from(s.AnimationSprite);
        }
        return this._effCardArr[index];
    };
    smokePetReward.prototype.clearEff = function () {
        for (var i = 0; i < this._effCardArr.length; i++) {
            if (this._effCardArr[i]) {
                egret.Tween.removeTweens(this._effCardArr[i]);
                this._effCardArr[i].stop();
                if (this._effCardArr[i].parent) {
                    this._effCardArr[i].parent.removeChild(this._effCardArr[i]);
                }
                this._effCardArr[i].scaleX = 1;
                this._effCardArr[i].offAllComplete();
                this.toEffect(this._effCardArr[i]);
                this._effCardArr[i] = null;
            }
        }
        this._effCardArr.length = 0;
    };
    smokePetReward.prototype.playFrouStarTween = function () {
        if (!this._fiveStarPokerNoFinsh)
            return;
        this._fiveStarPokerNoFinsh = false;
        for (var i = 0; i < this._fourStarPoker.length; i++) {
            var index = this._fourStarPoker[i];
            this.startPalyTween(this._imgCardArr[index], this._imgBgArr[index], this._allStarArr[index], index);
        }
        utils.timer.once(2000, this, this.showOnceBtn, false);
    };
    /**开始播放翻牌特效 */
    smokePetReward.prototype.startPalyTween = function (card, bg, star, index) {
        bg.scaleX = 1; //背着的牌
        card.scaleX = 0; //要翻开的牌
        card.visible = true;
        bg.visible = true;
        this.flipCardFront(card, bg, star, this.createEffect(index));
    };
    /**翻牌前 */
    smokePetReward.prototype.flipCardFront = function (card, bg, star, effCard) {
        var _this = this;
        if (star > 4) {
            effCard.resId = "34004";
            utils.TweenUtil.shock(bg, 1000, 10);
            mg.soundManager.playSoundStopLast("hongkashanxian");
        }
        else {
            if (star == 3) {
                effCard.resId = "34001";
            }
            else {
                effCard.resId = "34002";
            }
        }
        effCard.x = card.x;
        effCard.y = card.y;
        effCard.frameRate = 24;
        this.addChildAt(effCard, this.getChildIndex(card) - 1);
        effCard.playOnce();
        effCard.onComplete(this, function (card, bg, star, effect) {
            if (effCard) {
                effCard.stop();
                if (effCard.parent) {
                    effCard.parent.removeChild(effCard);
                }
                effCard.scaleX = 1;
                effCard.offAllComplete();
            }
            _this.flipCardCentre(card, bg, star, effCard);
        }, card, bg, star, effCard);
    };
    /**翻牌中 */
    smokePetReward.prototype.flipCardCentre = function (card, bg, star, effCard) {
        var _this = this;
        if (star > 4) {
            effCard.resId = "34007";
        }
        else {
            if (star == 3) {
                effCard.resId = "34000";
            }
            else {
                effCard.resId = "34006";
            }
        }
        mg.soundManager.playSoundStopLast("fanpaiyinxiao");
        effCard.x = card.x;
        effCard.y = card.y;
        this.addChildAt(effCard, this.getChildIndex(card) - 1);
        effCard.play();
        egret.Tween.get(effCard).to({ scaleX: 0 }, 600, egret.Ease.backIn).call(function () {
            egret.Tween.get(effCard).to({ scaleX: 1 }, 600, egret.Ease.backOut).call(_this.flipCardAfter, _this, [card, bg, star, effCard]);
        });
        egret.Tween.get(bg).to({ scaleX: 0 }, 600, egret.Ease.backIn).call(function () {
            egret.Tween.get(card).to({ scaleX: 1 }, 600, egret.Ease.backOut);
        });
    };
    /**翻牌后 */
    smokePetReward.prototype.flipCardAfter = function (card, bg, star, effCard) {
        if (effCard) {
            effCard.stop();
            effCard.scaleX = 1;
            effCard.offAllComplete();
        }
        if (star > 4) {
            effCard.resId = "34005";
        }
        else {
            if (star == 3) {
                effCard.resId = "34000";
            }
            else {
                effCard.resId = "34003";
            }
        }
        effCard.x = card.x;
        effCard.y = card.y;
        this.addChildAt(effCard, this.getChildIndex(card) - 1);
        effCard.play();
    };
    smokePetReward.prototype.showOnceBtn = function () {
        this.imgHide.visible = true;
        this.onceGroup.visible = true;
        this.onceGroup.y = this._count == 1 ? 630 : 960;
        var hashAnimal = false;
        var tianFenganimal = GameModels.animal.getAnimalBuyType(19); //天凤
        if (tianFenganimal.isAct && tianFenganimal.step >= 6) {
            hashAnimal = true;
        }
        var puTongCount = GameModels.bag.getItemCountById(ConfigData.PUTON_ZHAOMU);
        var gaiJiCount = GameModels.bag.getItemCountById(ConfigData.GAOJI_ZHAOMU);
        var shiLiCount = GameModels.bag.getItemCountById(ConfigData.SHILI_ZHAOMU);
        var needCount = 0;
        if (this._count == 1) {
            needCount = 1;
            if (this._type == 2) {
                var count = hashAnimal ? 120 : 240;
                if (gaiJiCount >= 1) {
                    this.labCount.text = gaiJiCount + "/" + needCount;
                    this.labCount.textColor = gaiJiCount >= needCount ? TypeColor.GREEN1 : TypeColor.RED1;
                    this.imgType.source = "smokePet_json.img_smokePet_icon_gaoji";
                }
                else {
                    this.labCount.text = GameModels.user.player.diamonds + "/" + count;
                    this.labCount.textColor = GameModels.user.player.diamonds >= count ? TypeColor.GREEN1 : TypeColor.RED1;
                    this.imgType.source = "uiMain_json.main_img_diamonds";
                }
            }
            else {
                if (this._type == 1) {
                    this.labCount.text = puTongCount + "/" + needCount;
                    this.labCount.textColor = puTongCount >= needCount ? TypeColor.GREEN1 : TypeColor.RED1;
                    this.imgType.source = "smokePet_json.img_smokePet_icon_putong";
                }
                else {
                    this.labCount.text = shiLiCount + "/" + needCount;
                    this.labCount.textColor = shiLiCount >= needCount ? TypeColor.GREEN1 : TypeColor.RED1;
                    this.imgType.source = "smokePet_json.img_smokePet_icon_shili";
                }
            }
            this.btnOne.label = Language.C_ZLYC;
        }
        else {
            this.btnOne.label = Language.C_ZLSC;
            needCount = 10;
            if (this._type == 2) {
                var count = hashAnimal ? 1000 : 2000;
                if (gaiJiCount >= 10) {
                    this.labCount.text = gaiJiCount + "/" + needCount;
                    this.labCount.textColor = gaiJiCount >= needCount ? TypeColor.GREEN1 : TypeColor.RED1;
                    this.imgType.source = "smokePet_json.img_smokePet_icon_gaoji";
                }
                else {
                    this.labCount.text = GameModels.user.player.diamonds + "/" + count;
                    this.labCount.textColor = GameModels.user.player.diamonds >= count ? TypeColor.GREEN1 : TypeColor.RED1;
                    this.imgType.source = "uiMain_json.main_img_diamonds";
                }
            }
            else {
                if (this._type == 1) {
                    this.labCount.text = puTongCount + "/" + needCount;
                    this.labCount.textColor = puTongCount >= needCount ? TypeColor.GREEN1 : TypeColor.RED1;
                    this.imgType.source = "smokePet_json.img_smokePet_icon_putong";
                }
                else {
                    this.labCount.text = shiLiCount + "/" + needCount;
                    this.labCount.textColor = shiLiCount >= needCount ? TypeColor.GREEN1 : TypeColor.RED1;
                    this.imgType.source = "smokePet_json.img_smokePet_icon_shili";
                }
            }
        }
        this.imgCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPetClick, this);
        for (var i = 0; i < this._imgCardArr.length; i++) {
            this._imgCardArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPetClick, this);
        }
        if (GameModels.task.hasTask && GameModels.task.curTask.type == TypeTask.SMOMEPET1) {
            mg.StoryManager.instance.startBigStory(141, this, null);
        }
        if (GameModels.task.hasTask && GameModels.task.curTask.type == TypeTask.SMOMEPET2) {
            mg.StoryManager.instance.startBigStory(142, this, null);
        }
    };
    smokePetReward.prototype.onPetClick = function (e) {
        var tempPet = null;
        if (GameModels.smokepet.petList.length > 1) {
            for (var i = 0; i < this._imgCardArr.length; i++) {
                if (e.currentTarget == this._imgCardArr[i]) {
                    tempPet = Templates.getTemplateById(templates.Map.GENERAL, GameModels.smokepet.petList[i].split("_")[0]);
                    break;
                }
            }
        }
        else {
            tempPet = Templates.getTemplateById(templates.Map.GENERAL, GameModels.smokepet.petList[0].split("_")[0]);
        }
        if (tempPet)
            mg.TipManager.instance.showTip(tips.GeneralInfoTip, tempPet);
    };
    smokePetReward.prototype.onBtnClick = function (e) {
        if (e.currentTarget == this.btnClose) {
            this.dispatchEventWith(egret.Event.CLOSE);
        }
        else {
            this.dispatchEventWith(egret.Event.CLOSE);
            GameModels.smokepet.smokePetChoujiang(this._type, this._count, utils.Handler.create(this, function () {
                mg.alertManager.showAlert(smokePetReward, false, true, GameModels.smokepet.type, GameModels.smokepet.count);
            }));
        }
    };
    smokePetReward.prototype.onBgClick = function (e) {
        if (this._fiveStarPokerNoFinsh) {
            this.playFrouStarTween();
        }
        else {
            if (!this.onceGroup.visible)
                return;
            this.dispatchEventWith(egret.Event.CLOSE);
        }
    };
    smokePetReward.prototype.hide = function () {
        this._fiveStarPokerNoFinsh = false;
        this._fourStarPoker = [];
        this._fiveStarPoker = [];
        this._allStarArr = [];
        this.imgHide.visible = false;
        this.onceGroup.visible = false;
        this.imgCard.data = null;
        this.clearEff();
        egret.Tween.removeTweens(this.imgCard);
        egret.Tween.removeTweens(this.imgBg);
        utils.timer.clearAll(this);
        for (var i = 0; i < this._imgCardArr.length; i++) {
            this._imgCardArr[i].data = null;
            egret.Tween.removeTweens(this._imgCardArr[i]);
            egret.Tween.removeTweens(this._imgBgArr[i]);
        }
        this.imgCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPetClick, this);
        for (var i = 0; i < this._imgCardArr.length; i++) {
            this._imgCardArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPetClick, this);
        }
        this.imgCloseBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnOne.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        if (this._count != 1 && GameModels.user.player.totalRecharge > 0 && GameModels.user.player.totalRecharge < mo.ModelSgActivity.FIRSRRECHAGR_MAX * 10) {
            var view = game.state.getItem(GameModels.user.player.uid, TypeSetting.SHOWVIEW_2);
            if (!view) {
                game.state.setItem(GameModels.user.player.uid, TypeSetting.SHOWVIEW_2, true);
                mg.uiManager.show(dialog.firstrecharge.FirstRechargeDialog1, { tabIndex: 1 });
            }
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return smokePetReward;
}(ui.smokePetRewardSkin));
__reflect(smokePetReward.prototype, "smokePetReward", ["IAlert", "egret.DisplayObject"]);

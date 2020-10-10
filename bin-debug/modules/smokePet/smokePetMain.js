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
var treasure;
(function (treasure) {
    var smokePetMain = (function (_super) {
        __extends(smokePetMain, _super);
        function smokePetMain() {
            return _super.call(this) || this;
        }
        smokePetMain.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            //Mediator.getMediator(this).onAdd(this, this.enter);
            //Mediator.getMediator(this).onRemove(this, this.exit);
            this._speakArr = [Language.J_JGSPEAK1, Language.J_JGSPEAK2, Language.J_JGSPEAK3, Language.J_JGSPEAK4];
        };
        smokePetMain.prototype.enter = function () {
            var _this = this;
            this.boxReward.visible = this.labProCount.visible = this.pro.visible = this.imgRew.visible = GameModels.platform.isPay;
            this._count = 0;
            this._angle = 0;
            this.createPhantomEffect();
            this.btnPuTongOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPuTongClick, this);
            this.btnPuTongTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPuTongClick, this);
            this.btnGaoJiOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGaoJiClick, this);
            this.btnGaoJiTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGaoJiClick, this);
            this.btnShiLiOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShiLiClick, this);
            this.btnShiLiTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShiLiClick, this);
            this.btnShiLiIocn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeClick, this);
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
            this.boxReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardClick, this);
            GameModels.smokepet.addEventListener(mo.ModelSmokePet.SMOKEPET_SHILI_CHANGE, this.showShiLi, this);
            GameModels.smokepet.addEventListener(mo.ModelSmokePet.SMOKEPET_UPDATE, this.showView, this);
            this.imgPreview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreviewClick, this);
            GameModels.bag.onItemChange(ConfigData.GAOJI_ZHAOMU, this, this.showXiaoHao);
            GameModels.bag.onItemChange(ConfigData.SHILI_ZHAOMU, this, this.showXiaoHao);
            GameModels.bag.onItemChange(ConfigData.PUTON_ZHAOMU, this, this.showXiaoHao);
            this.showShiLi();
            GameModels.smokepet.getSmokePetInfo(utils.Handler.create(this, function () {
                _this.showView();
            }));
        };
        smokePetMain.prototype.exit = function () {
            this._count = 0;
            this._angle = 0;
            this.removePhantomEffect();
            egret.Tween.removeTweens(this.imgPreBg);
            GameModels.smokepet.type = 0;
            GameModels.smokepet.count = 0;
            this.btnPuTongOne.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPuTongClick, this);
            this.btnPuTongTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPuTongClick, this);
            this.btnGaoJiOne.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGaoJiClick, this);
            this.btnGaoJiTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGaoJiClick, this);
            this.btnShiLiOne.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShiLiClick, this);
            this.btnShiLiTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShiLiClick, this);
            this.btnShiLiIocn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeClick, this);
            this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
            this.boxReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardClick, this);
            GameModels.smokepet.removeEventListener(mo.ModelSmokePet.SMOKEPET_SHILI_CHANGE, this.showShiLi, this);
            GameModels.smokepet.removeEventListener(mo.ModelSmokePet.SMOKEPET_UPDATE, this.showView, this);
            this.imgPreview.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreviewClick, this);
            GameModels.bag.offItemChange(ConfigData.GAOJI_ZHAOMU, this, this.showXiaoHao);
            GameModels.bag.offItemChange(ConfigData.SHILI_ZHAOMU, this, this.showXiaoHao);
            GameModels.bag.offItemChange(ConfigData.PUTON_ZHAOMU, this, this.showXiaoHao);
        };
        smokePetMain.prototype.showView = function () {
            this.imgPreBg.visible = false;
            this.labTalk.text = this._speakArr[Math.floor(Math.random() * this._speakArr.length)];
            this.labProCount.text = GameModels.smokepet.score + "/1000";
            if (GameModels.smokepet.score >= 1000) {
                this.imgPreBg.visible = true;
                this.tweenPreviewImgHandler();
            }
            else {
                egret.Tween.removeTweens(this.imgPreBg);
            }
            var num = GameModels.smokepet.score / 1000;
            this.pro.noTweenValue = num > 1 ? 1 : num;
            this.showXiaoHao();
            this.labLeft1.text = Language.getExpression(Language.E_SYMFCS1, GameModels.smokepet.leftType1FreeCnt);
            if (GameModels.smokepet.leftType1FreeCnt <= 0) {
                this.labLeft1.textColor = TypeColor.RED1;
            }
            else {
                this.labLeft1.textColor = TypeColor.GREEN1;
            }
            this.labLeft2.text = Language.getExpression(Language.E_SYMFCS1, GameModels.smokepet.leftType2FreeCnt);
            if (GameModels.smokepet.leftType2FreeCnt <= 0) {
                this.labLeft2.textColor = TypeColor.RED1;
            }
            else {
                this.labLeft2.textColor = TypeColor.GREEN1;
            }
            // this.labLeft1.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SYMFCS1, GameModels.smokepet.leftType1FreeCnt));
            // this.labLeft2.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SYMFCS1, GameModels.smokepet.leftType2FreeCnt));
        };
        smokePetMain.prototype.showXiaoHao = function () {
            var hashAnimal = false;
            var tianFenganimal = GameModels.animal.getAnimalBuyType(19); //天凤
            if (tianFenganimal.isAct && tianFenganimal.step >= 6) {
                hashAnimal = true;
            }
            var gaiJiCount = GameModels.bag.getItemCountById(ConfigData.GAOJI_ZHAOMU);
            if (gaiJiCount >= 1) {
                this.imgIcon1.source = "smokePet_json.img_smokePet_icon_gaoji";
                this.lab1.text = 1 + "";
                if (gaiJiCount >= 10) {
                    this.imgIcon10.source = "smokePet_json.img_smokePet_icon_gaoji";
                    this.lab10.text = 10 + "";
                }
                else {
                    this.imgIcon10.source = "uiMain_json.main_img_diamonds";
                    this.lab10.text = (hashAnimal ? 1000 : 2000) + "";
                }
            }
            else {
                this.imgIcon1.source = this.imgIcon10.source = "uiMain_json.main_img_diamonds";
                this.lab1.text = (hashAnimal ? 120 : 240) + "";
                this.lab10.text = (hashAnimal ? 1000 : 2000) + "";
            }
            this.labPuTongCount.text = GameModels.bag.getItemCountById(ConfigData.PUTON_ZHAOMU) + "";
            this.labGaoJiCount.text = gaiJiCount + "";
            this.labShiLiCount.text = GameModels.bag.getItemCountById(ConfigData.SHILI_ZHAOMU) + "";
            this.btnPuTongTen.isWarn = GameModels.bag.getItemCountById(ConfigData.PUTON_ZHAOMU) >= 10 && GameModels.funcs.hashFunIsOpen(2004);
            this.btnGaoJiTen.isWarn = gaiJiCount >= 10 && GameModels.funcs.hashFunIsOpen(2005);
            this.btnShiLiTen.isWarn = GameModels.bag.getItemCountById(ConfigData.SHILI_ZHAOMU) >= 10 && GameModels.funcs.hashFunIsOpen(2006);
            this.btnPuTongOne.isWarn = GameModels.funcs.hashFunIsOpen(2004) && GameModels.smokepet.leftType1FreeCnt > 0;
            this.btnGaoJiOne.isWarn = GameModels.funcs.hashFunIsOpen(2005) && GameModels.smokepet.leftType2FreeCnt > 0;
        };
        smokePetMain.prototype.showShiLi = function () {
            var index = game.state.getItem(GameModels.user.player.uid, TypeSetting.SMOKEPET_ID);
            if (index) {
                this.imgShiLiIcon.source = "smokePet_json.img_smokePet_icon_" + index;
                this.imgShiLiBg.source = "img_smokePet_bg_shili_" + index + "_png";
            }
            else {
                game.state.setItem(GameModels.user.player.uid, TypeSetting.SMOKEPET_ID, 4);
                this.imgShiLiIcon.source = "smokePet_json.img_smokePet_icon_" + 4;
                this.imgShiLiBg.source = "img_smokePet_bg_shili_" + 4 + "_png";
            }
        };
        smokePetMain.prototype.onPuTongClick = function (e) {
            var _this = this;
            if (e.currentTarget == this.btnPuTongOne) {
                if (!GameModels.funcs.hashFunIsOpen(2004)) {
                    mg.alertManager.tip(Language.getExpression(Language.E_1JKFGN, GameModels.funcs.getConfigOpenLv(2004)), 0xff0000);
                    return;
                }
                GameModels.smokepet.smokePetChoujiang(1, 1, utils.Handler.create(this, function () {
                    _this.showView();
                    mg.alertManager.showAlert(smokePetReward, false, true, 1, 1);
                }));
            }
            else {
                GameModels.smokepet.smokePetChoujiang(1, 10, utils.Handler.create(this, function () {
                    _this.showView();
                    mg.alertManager.showAlert(smokePetReward, false, true, 1, 10);
                }));
            }
        };
        smokePetMain.prototype.onGaoJiClick = function (e) {
            var _this = this;
            if (!GameModels.funcs.hashFunIsOpen(2005)) {
                mg.alertManager.tip(Language.getExpression(Language.E_1JKFGN, GameModels.funcs.getConfigOpenLv(2005)), 0xff0000);
                return;
            }
            var itemCount = GameModels.bag.getItemCountById(ConfigData.GAOJI_ZHAOMU);
            var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act3);
            if (e.currentTarget == this.btnGaoJiOne) {
                if (GameModels.task.hasTask && !GameModels.task.curTask.canSubmit && GameModels.task.curTask.type == TypeTask.SMOMEPET4) {
                    mg.alertManager.tip(Language.J_QXWCZXRW);
                    return;
                }
                if (GameModels.smokepet.leftType2FreeCnt > 0) {
                    GameModels.smokepet.smokePetChoujiang(2, 1, utils.Handler.create(this, function () {
                        _this.showView();
                        mg.alertManager.showAlert(smokePetReward, false, true, 2, 1);
                    }));
                }
                else {
                    if (itemCount >= 1 && vo.actCfgId == 80504) {
                        mg.TipManager.instance.showCheckAlert(Language.J_TIPS2, TypeBtnLabel.OK, TypeCheck.INDEX_4, null, utils.Handler.create(this, function () {
                            var _this = this;
                            GameModels.smokepet.smokePetChoujiang(2, 1, utils.Handler.create(this, function () {
                                _this.showView();
                                mg.alertManager.showAlert(smokePetReward, false, true, 2, 1);
                            }));
                        }));
                    }
                    else {
                        mg.alertManager.showCheckAlert(Language.J_GJYLC, TypeBtnLabel.OK, TypeCheck.SMOKEPET_GAOJI_ONE, null, utils.Handler.create(this, function () {
                            GameModels.smokepet.smokePetChoujiang(2, 1, utils.Handler.create(_this, function () {
                                _this.showView();
                                mg.alertManager.showAlert(smokePetReward, false, true, 2, 1);
                            }));
                        }));
                    }
                }
            }
            else {
                if (vo.actCfgId == 80504 && itemCount >= 10) {
                    mg.TipManager.instance.showCheckAlert(Language.J_TIPS2, TypeBtnLabel.OK, TypeCheck.INDEX_4, null, utils.Handler.create(this, function () {
                        var _this = this;
                        GameModels.smokepet.smokePetChoujiang(2, 10, utils.Handler.create(this, function () {
                            _this.showView();
                            mg.alertManager.showAlert(smokePetReward, false, true, 2, 10);
                        }));
                    }));
                }
                else {
                    GameModels.smokepet.smokePetChoujiang(2, 10, utils.Handler.create(this, function () {
                        _this.showView();
                        mg.alertManager.showAlert(smokePetReward, false, true, 2, 10);
                    }));
                }
            }
        };
        smokePetMain.prototype.onShiLiClick = function (e) {
            var _this = this;
            if (!GameModels.funcs.hashFunIsOpen(2006)) {
                mg.alertManager.tip(Language.getExpression(Language.E_1JKFGN, GameModels.funcs.getConfigOpenLv(2006)), 0xff0000);
                return;
            }
            if (e.currentTarget == this.btnShiLiOne) {
                GameModels.smokepet.smokePetChoujiang(3, 1, utils.Handler.create(this, function () {
                    _this.showView();
                    mg.alertManager.showAlert(smokePetReward, false, true, 3, 1);
                }));
            }
            else {
                GameModels.smokepet.smokePetChoujiang(3, 10, utils.Handler.create(this, function () {
                    _this.showView();
                    mg.alertManager.showAlert(smokePetReward, false, true, 3, 10);
                }));
            }
        };
        smokePetMain.prototype.onRewardClick = function () {
            mg.alertManager.showAlert(smokePetJiFenReward, true, true);
        };
        smokePetMain.prototype.onChangeClick = function () {
            mg.alertManager.showAlert(smokePetChangeShiLi, true, true);
        };
        smokePetMain.prototype.onHelpClick = function () {
            mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 4901).des);
        };
        smokePetMain.prototype.tweenPreviewImgHandler = function () {
            this._count++;
            this._angle = this._count * 360;
            egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
        };
        smokePetMain.prototype.onPreviewClick = function (e) {
            mg.alertManager.showAlert(treasure.TreasureAllPrize, true, true, "8101001");
        };
        smokePetMain.prototype.createPhantomEffect = function () {
            if (!this._effect) {
                this._effect = utils.ObjectPool.from(s.AnimationSprite);
                this._effect.y = 533;
                this._effect.x = 457;
                this._effect.frameRate = 6;
                this._effect.resId = "10";
                this._effect.play();
                this.addChildAt(this._effect, this.getChildIndex(this.btnGaoJiTen) - 1);
            }
            if (!this._effect1) {
                this._effect1 = utils.ObjectPool.from(s.AnimationSprite);
                this._effect1.y = 752;
                this._effect1.x = 457;
                this._effect1.frameRate = 6;
                this._effect1.resId = "10";
                this._effect1.play();
                this.addChildAt(this._effect1, this.getChildIndex(this.btnShiLiTen) - 1);
            }
        };
        smokePetMain.prototype.removePhantomEffect = function () {
            if (this._effect) {
                this._effect.stop();
                this._effect.filters = null;
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
                utils.ObjectPool.to(this._effect, true);
                this._effect = null;
            }
            if (this._effect1) {
                this._effect1.stop();
                this._effect1.filters = null;
                if (this._effect1.parent) {
                    this._effect1.parent.removeChild(this._effect1);
                }
                utils.ObjectPool.to(this._effect1, true);
                this._effect1 = null;
            }
        };
        return smokePetMain;
    }(ui.smokePetMainSkin));
    treasure.smokePetMain = smokePetMain;
    __reflect(smokePetMain.prototype, "treasure.smokePetMain");
})(treasure || (treasure = {}));

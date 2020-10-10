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
var renderer;
(function (renderer) {
    var kingWarMapChooseArmyRenderer = (function (_super) {
        __extends(kingWarMapChooseArmyRenderer, _super);
        function kingWarMapChooseArmyRenderer() {
            var _this = _super.call(this) || this;
            _this._petArr = [_this.head1, _this.head2, _this.head3, _this.head4, _this.head5];
            _this._groupArr = [_this.group1, _this.group2, _this.group3, _this.group4, _this.group5];
            return _this;
        }
        kingWarMapChooseArmyRenderer.prototype.clickHandler = function (e) {
            var _this = this;
            var vo = this.data;
            if (!vo)
                return;
            switch (e.currentTarget) {
                case this.btnPaiChu:
                    if (vo.isFight) {
                        mg.alertManager.tip(Language.J_DWZZDZ);
                        return;
                    }
                    if (GameModels.kingwar.cityState == 1) {
                        if (GameModels.user.player.level >= 250 && !GameModels.kingwar.cityHashPlayerArmy) {
                            GameModels.kingwar.requestQuickFight(GameModels.kingwar.cityDetailCityId, vo.armyId, utils.Handler.create(this, function () {
                                // mg.alertManager.closeALert(dialog.kingwar.kingWarMapAtt);
                                // mg.TipManager.instance.removeBlack();
                                // mg.TipManager.instance.current.removeSelf();
                                mg.alertManager.tip(Language.J_SDCG);
                            }));
                        }
                        else {
                            GameModels.kingwar.sendHandler(GameModels.kingwar.cityDetailCityId, vo.armyId, utils.Handler.create(this, function () {
                                if (GameModels.kingwar.result) {
                                    mg.alertManager.removeBlack();
                                    mg.alertManager.closeALert(dialog.kingwar.kingWarMapAtt);
                                    mg.TipManager.instance.removeBlack();
                                    mg.TipManager.instance.current.removeSelf();
                                    mg.alertManager.tip(Language.J_GZMYZSBDZJZLCG);
                                }
                                else {
                                    GameModels.pet.petGetFormationData(vo.formationType, utils.Handler.create(_this, function () {
                                        mg.uiManager.removeAllDialogs();
                                        app.gameContext.enterGameKingWar(vo.formationType + ";" + GameModels.kingwar.cityDetailCityId);
                                        mg.alertManager.removeBlack();
                                        mg.alertManager.closeALert(dialog.kingwar.kingWarMapAtt);
                                        mg.TipManager.instance.removeBlack();
                                        mg.TipManager.instance.current.removeSelf();
                                    }));
                                }
                            }));
                        }
                    }
                    else {
                        GameModels.kingwar.requestDefendCity(GameModels.kingwar.cityDetailCityId, vo.armyId, utils.Handler.create(this, function () {
                            GameModels.kingwar.dispatchEventData();
                            mg.TipManager.instance.removeBlack();
                            mg.TipManager.instance.current.removeSelf();
                        }));
                    }
                    break;
                case this.btnHBubing:
                    if (vo.isFight) {
                        mg.alertManager.tip(Language.J_DWZZDZ);
                        return;
                    }
                    if (vo.tameBingLi >= 100) {
                        mg.alertManager.tip(Language.J_BLYMWXBB);
                        return;
                    }
                    mg.TipUpManager.instance.showTip(dialog.kingwar.kingWarMapArmyBuBing, { data: vo, index: this.itemIndex + 1 });
                    break;
                default:
                    if (vo.isFight) {
                        mg.alertManager.tip(Language.J_DWZZDZ);
                        return;
                    }
                    mg.TipUpManager.instance.showTip(kingWarMapBuZhen1, this.itemIndex + 11);
                    break;
            }
        };
        kingWarMapChooseArmyRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            for (var i = 0; i < this._petArr.length; i++) {
                this._petArr[i].data = null;
                this._petArr[i].visible = false;
                this._groupArr[i].visible = false;
            }
            this.imgBuDui.source = "kingwar_json.img_budui" + (this.itemIndex + 1);
            this.labState.text = "";
            this.btnPaiChu.visible = false;
            this.imgLock.visible = false;
            this.btnHBubing.visible = false;
            this.btnPaiChu.label = GameModels.kingwar.cityState == 2 ? Language.C_ZS1 : Language.C_JG;
            if (GameModels.kingwar.cityState == 1 && GameModels.user.player.level >= 250 && !GameModels.kingwar.cityHashPlayerArmy) {
                this.btnPaiChu.label = Language.C_SD;
            }
            this.labTip.visible = false;
            this.labLock.visible = false;
            this.group.visible = false;
            if (this.data) {
                var vo = this.data;
                for (var i = 0; i < this._groupArr.length; i++) {
                    this._groupArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                }
                this.group.visible = true;
                this.labBingLi.text = vo.tameBingLi + "";
                this.btnPaiChu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnHBubing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnPaiChu.visible = true;
                this.btnHBubing.visible = true;
                if (vo.isFight) {
                    this.labState.text = Language.J_ZZZ;
                }
                else {
                    if (vo.defendCityId) {
                        var cityMap = Templates.getTemplateById(templates.Map.KINGWARCITY, vo.defendCityId);
                        if (cityMap) {
                            this.labState.text = Language.getExpression(Language.E_ZSZ, cityMap.cityName);
                        }
                    }
                    else {
                        this.labState.text = Language.J_KXZ;
                    }
                }
                var isHashPet = false;
                for (var i = 0; i < vo.kingWarPetVOArr.length; i++) {
                    if (vo.kingWarPetVOArr[i].petId) {
                        this._petArr[i].visible = true;
                        this._groupArr[i].visible = false;
                        this._petArr[i].data = vo.kingWarPetVOArr[i];
                        isHashPet = true;
                    }
                    else {
                        this._petArr[i].visible = false;
                        this._groupArr[i].visible = true;
                    }
                }
                if (!isHashPet)
                    this.btnPaiChu.visible = false;
                if (!isHashPet)
                    this.btnHBubing.visible = false;
                if (this.btnHBubing.visible) {
                    if (GameModels.kingwar.cityState == 2) {
                        if (vo.tameBingLi == 0) {
                            this.labTip.visible = true;
                        }
                    }
                    else {
                        if (vo.tameBingLi < 50) {
                            this.labTip.visible = true;
                        }
                    }
                }
            }
            else {
                this.labLock.visible = true;
                if (this.itemIndex == 1) {
                    this.labLock.text = Language.J_200JVIP2JS;
                }
                else {
                    this.labLock.text = Language.J_300JVIP3JS;
                }
                this.imgLock.visible = true;
                this.btnPaiChu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnHBubing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                for (var i = 0; i < this._groupArr.length; i++) {
                    this._groupArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                }
            }
        };
        return kingWarMapChooseArmyRenderer;
    }(ui.kingWarMapChooseArmyRendererSkin));
    renderer.kingWarMapChooseArmyRenderer = kingWarMapChooseArmyRenderer;
    __reflect(kingWarMapChooseArmyRenderer.prototype, "renderer.kingWarMapChooseArmyRenderer");
})(renderer || (renderer = {}));

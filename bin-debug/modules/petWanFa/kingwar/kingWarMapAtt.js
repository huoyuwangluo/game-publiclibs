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
    var kingwar;
    (function (kingwar) {
        /**国战单个城池信息 */
        var kingWarMapAtt = (function (_super) {
            __extends(kingWarMapAtt, _super);
            function kingWarMapAtt() {
                return _super.call(this) || this;
            }
            kingWarMapAtt.prototype.show = function (vo, isPlayer) {
                var _this = this;
                if (isPlayer === void 0) { isPlayer = false; }
                this.imgPlay.visible = false;
                this._vo = vo;
                if (isPlayer) {
                    this.imgPlay.visible = true;
                    this.imgPlay.y = this.labCont.y;
                    egret.Tween.get(this.imgPlay).to({ y: this.labCont.y - 50 }, 1000, utils.Ease.backOut).call(function () {
                        _this.imgPlay.visible = false;
                    }, this);
                }
                this.showView();
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnAtt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnTarget.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnLingQu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                GameModels.kingwar.addEventListener(mo.ModelKingWar.CITY_CHANGE, this.showView, this);
            };
            kingWarMapAtt.prototype.showView = function () {
                var _this = this;
                this.labDes.visible = false;
                this.reward0.visible = false;
                this.reward1.visible = false;
                this.reward2.visible = false;
                GameModels.kingwar.requestGetCityDetail(this._vo.cityId, utils.Handler.create(this, function () {
                    var cityVo = GameModels.kingwar.getCityDataByID(_this._vo.cityId);
                    _this.labCityName.text = cityVo.cityTemp.cityName;
                    _this.imgCity.source = _this.getCitySource(cityVo);
                    _this.imgCityBg.source = "img_kingwar_city_" + cityVo.cityTemp.areaCountry + "_png";
                    _this.btnLingQu.isWarn = true;
                    _this.btnLingQu.visible = GameModels.kingwar.hashReward == 1;
                    _this.labCounty.text = !GameModels.kingwar.cityDetailCountry ? Language.C_ZW : TypeUnionName.getCountryName(GameModels.kingwar.cityDetailCountry);
                    var hashAnimal = false;
                    var animal = GameModels.animal.getAnimalBuyType(15);
                    if (animal.isAct && animal.step >= 4) {
                        hashAnimal = true;
                    }
                    if (_this._vo.cityTemp.type == 1) {
                        _this.imgDes.source = "kingwar_json.img_guishu";
                        _this.labReward.text = Language.J_GSZYSYWMXSHD;
                        _this.labReward.right = 46;
                        _this.reward2.visible = true;
                        var str = _this._vo.cityTemp.holdTimeReward.split(";")[0].split("_");
                        var count = hashAnimal ? parseInt(str[1]) + (Math.ceil(parseInt(str[1]) / 2)) : parseInt(str[1]);
                        _this.reward2.dataSource = str[0] + "_" + count;
                        _this.btnLingQu.visible = false;
                    }
                    else {
                        if (GameModels.kingwar.cityDetailCountry && GameModels.kingwar.hashReward == 0) {
                            _this.imgDes.source = "kingwar_json.img_guishu";
                            _this.labReward.text = Language.J_GSZYSYWMXSHD;
                            _this.labReward.right = 46;
                            _this.reward2.visible = true;
                            var str = _this._vo.cityTemp.holdTimeReward.split(";")[0].split("_");
                            var count = hashAnimal ? parseInt(str[1]) + (Math.ceil(parseInt(str[1]) / 2)) : parseInt(str[1]);
                            _this.reward2.dataSource = str[0] + "_" + count;
                        }
                        else {
                            _this.imgDes.source = "kingwar_json.img_gongzhan";
                            _this.labReward.text = Language.J_DYCZLZLCCZY;
                            _this.labReward.right = 11;
                            _this.reward0.visible = true;
                            _this.reward0.dataSource = _this._vo.cityTemp.seizeReward.split(";")[0];
                            _this.reward1.visible = true;
                            _this.reward1.dataSource = _this._vo.cityTemp.seizeReward.split(";")[1];
                        }
                    }
                    if (!_this._listData) {
                        _this._listData = new eui.ArrayCollection(GameModels.kingwar.cityDetailArmyVOArr);
                    }
                    else {
                        _this._listData.source = GameModels.kingwar.cityDetailArmyVOArr;
                    }
                    _this.list.dataProvider = _this._listData;
                    _this.labCont.text = "" + GameModels.kingwar.cityDetailArmyVOArrCount;
                    _this.showBtnState();
                }));
            };
            kingWarMapAtt.prototype.showBtnState = function () {
                this.labDes.text = Language.J_MYXLDECZWFGD;
                this.btnTarget.visible = false;
                if (this._vo.cityTemp.type == 1) {
                    this.btnAtt.visible = false;
                    this.labDes.visible = false;
                }
                else {
                    this.btnAtt.visible = GameModels.kingwar.cityState > 0;
                    this.labDes.visible = GameModels.kingwar.cityState <= 0;
                    this.btnAtt.label = GameModels.kingwar.cityState == 2 ? Language.C_ZS1 : Language.C_JG;
                    if (GameModels.kingwar.cityState > 0) {
                        this.btnTarget.visible = GameModels.user.player.wuguanLevel <= 1;
                    }
                    if (GameModels.scene.getjoinSceneListByType(TypeGame.KING_WAR) && GameModels.kingwar.cityState != 2) {
                        this.labDes.visible = true;
                        this.btnAtt.visible = false;
                        this.btnTarget.visible = false;
                        this.labDes.text = Language.J_CZHMYJSDZD;
                    }
                }
            };
            kingWarMapAtt.prototype.getCitySource = function (vo) {
                if (vo.cityTemp.pos == 0) {
                    return "kingwar_json.img_kingwar_maincity_" + vo.country;
                }
                else if (vo.cityTemp.pos == 1 || vo.cityTemp.pos == 2) {
                    return "kingwar_json.img_kingwar_city_l_" + vo.country;
                }
                else if (vo.cityTemp.pos == 3 || vo.cityTemp.pos == 3) {
                    return "kingwar_json.img_kingwar_city_c_" + vo.country;
                }
                else {
                    return "kingwar_json.img_kingwar_city_h_" + vo.country;
                }
            };
            kingWarMapAtt.prototype.clickHandler = function (e) {
                var _this = this;
                switch (e.currentTarget) {
                    case this.btnBack:
                        this.dispatchEventWith(egret.Event.CLOSE);
                        break;
                    case this.btnClose:
                        this.dispatchEventWith(egret.Event.CLOSE);
                        break;
                    case this.btnLingQu:
                        GameModels.kingwar.requestGetSeizeReward(this._vo.cityId, utils.Handler.create(this, function () {
                            var rewards = GameModels.kingwar.strArr.split(";");
                            mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                            _this.showView();
                        }));
                        break;
                    case this.btnAtt:
                        if (GameModels.kingwar.cityState == 1) {
                            if (GameModels.user.player.level < 170 && this._vo.country > 0) {
                                mg.alertManager.tip(Language.J_GDZLCC);
                                return;
                            }
                            mg.TipManager.instance.showTip(dialog.kingwar.kingWarMapChooseArmy, null);
                        }
                        else if (GameModels.kingwar.cityState == 2) {
                            mg.TipManager.instance.showTip(dialog.kingwar.kingWarMapChooseArmy, null);
                        }
                        break;
                    case this.btnTarget:
                        if (GameModels.kingwar.cityState == 1) {
                            var str = Language.getExpression(Language.E_TAR1, this._vo.cityTemp.cityName);
                            mg.alertManager.showAlert(PromptAlert, true, true, str, TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                                this.setCityTarget();
                            }));
                        }
                        else if (GameModels.kingwar.cityState == 2) {
                            var str1 = Language.getExpression(Language.E_TAR2, this._vo.cityTemp.cityName);
                            mg.alertManager.showAlert(PromptAlert, true, true, str1, TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                                this.setCityTarget();
                            }));
                        }
                        break;
                }
            };
            kingWarMapAtt.prototype.setCityTarget = function () {
                if (GameModels.kingwar.cityState == 1) {
                    GameModels.kingwar.requestSetFirstTarget(1, this._vo.cityId, utils.Handler.create(this, function () {
                        mg.alertManager.tip(Language.J_HZCG);
                    }));
                }
                else if (GameModels.kingwar.cityState == 2) {
                    GameModels.kingwar.requestSetFirstTarget(2, this._vo.cityId, utils.Handler.create(this, function () {
                        mg.alertManager.tip(Language.J_HZCG);
                    }));
                }
            };
            kingWarMapAtt.prototype.hide = function () {
                egret.Tween.removeTweens(this.imgPlay);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnAtt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                GameModels.kingwar.removeEventListener(mo.ModelKingWar.CITY_CHANGE, this.showView, this);
                this.btnLingQu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return kingWarMapAtt;
        }(ui.kingWarMapAttSkin));
        kingwar.kingWarMapAtt = kingWarMapAtt;
        __reflect(kingWarMapAtt.prototype, "dialog.kingwar.kingWarMapAtt", ["IAlert", "egret.DisplayObject"]);
    })(kingwar = dialog.kingwar || (dialog.kingwar = {}));
})(dialog || (dialog = {}));

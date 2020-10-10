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
(function (item_1) {
    var fashion;
    (function (fashion) {
        var FashionItem = (function (_super) {
            __extends(FashionItem, _super);
            //271101 271102 271103
            //271201 271202 271203
            function FashionItem() {
                return _super.call(this) || this;
            }
            FashionItem.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                //this.markDestoryImage(this.imgBg);
                this.listFashion.itemRenderer = renderer.FashionRenderer;
                this._type = TypeFashion.WEAPON;
                this._teHuiLiBaoType = [3, 2, 1];
                this._properitesLab = [this.labHp, this.labAtk, this.labDef, this.labMdef];
                this._labArr = [this.lab1, this.lab2, this.lab3, this.lab4];
            };
            FashionItem.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                if (!this._playerShowAvatar) {
                    this._playerShowAvatar = new components.PlayerShowAvatar();
                }
                if (this._playerShowAvatar)
                    this.setPlayerModel();
                this.addChild(this._playerShowAvatar);
                this._playerShowAvatar.x = 300;
                this._playerShowAvatar.y = 340;
                this._index = data.type;
                this._pos = data.pos;
                this.changeTypeStage(this._index);
                //this.refreshImageDisplay(this.imgBg);
                this.listFashion.dataProvider = this._listData = new eui.ArrayCollection();
                GameModels.fashion.addEventListener(mo.ModelFashion.FASHION_ITEM_CHANGE, this.fashionOnChange, this);
                this.listFashion.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTapHandler, this);
                this.btnState.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stateOnClick, this);
                this.btnActivity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stateOnClick, this);
                this.btnChongZhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stateOnClick, this);
                GameModels.bag.onItemChange("271101", this, this.fashionOnChange);
                GameModels.bag.onItemChange("271102", this, this.fashionOnChange);
                GameModels.bag.onItemChange("271103", this, this.fashionOnChange);
                GameModels.bag.onItemChange("271201", this, this.fashionOnChange);
                GameModels.bag.onItemChange("271202", this, this.fashionOnChange);
                GameModels.bag.onItemChange("271203", this, this.fashionOnChange);
                GameModels.fashion.net_requestFashionInfo(utils.Handler.create(this, this.net_fashionInfoHandler));
            };
            FashionItem.prototype.exit = function () {
                GameModels.fashion.removeEventListener(mo.ModelFashion.FASHION_ITEM_CHANGE, this.fashionOnChange, this);
                this.listFashion.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTapHandler, this);
                this.btnState.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stateOnClick, this);
                this.btnActivity.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stateOnClick, this);
                this.btnChongZhi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stateOnClick, this);
                GameModels.bag.offItemChange("271101", this, this.fashionOnChange);
                GameModels.bag.offItemChange("271102", this, this.fashionOnChange);
                GameModels.bag.offItemChange("271103", this, this.fashionOnChange);
                GameModels.bag.offItemChange("271201", this, this.fashionOnChange);
                GameModels.bag.offItemChange("271202", this, this.fashionOnChange);
                GameModels.bag.offItemChange("271203", this, this.fashionOnChange);
                if (this._playerShowAvatar) {
                    this._playerShowAvatar.reset();
                }
                this.clearList(this.listFashion);
                if (this._effect) {
                    if (this._effect.parent) {
                        this._effect.parent.removeChild(this._effect);
                    }
                    this._effect.stop();
                    utils.ObjectPool.to(this._effect, true);
                    this._effect = null;
                }
            };
            FashionItem.prototype.setPlayerModel = function () {
                var bol = this.showClothesAvatar();
                if (bol) {
                    this._playerShowAvatar.clothResId = GameModels.user.player.clothResId;
                }
                var bol1 = this.showFashionWeapon();
                if (bol1) {
                    this._playerShowAvatar.weaponResId = GameModels.user.player.weaponResId;
                }
                // var items: vo.EquipVO[] = GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.JICHU_EQIUP, 0)
                // for (var i = 0; i < items.length; i++) {
                // 	if (items[i].pos == TypeEquip.CLOTHES) {
                // 		var bol: boolean = this.showClothesAvatar();
                // 		if (bol) {
                // 			if (items[i].templateEquip) {
                // 				var id: string = items[i].templateEquip.model;
                // 				this._playerShowAvatar.clothResId = id;
                // 			}
                // 			else {
                // 				if (this._playerShowAvatar) {
                // 					this._playerShowAvatar.clothResId = TypeEquip.DEFAULT_CLOTHES;
                // 				}
                // 			}
                // 		}
                // 	}
                // 	if (items[i].pos == TypeEquip.WEAPON) {
                // 		var bol: boolean = this.showFashionWeapon();
                // 		if (bol) {
                // 			if (items[i].templateEquip) {
                // 				let tmp: templates.equip = items[i].templateEquip;
                // 				if (this._playerShowAvatar) {
                // 					this._playerShowAvatar.weaponResId = tmp.model;
                // 				}
                // 			}
                // 			else {
                // 				if (this._playerShowAvatar) {
                // 					this._playerShowAvatar.weaponResId = TypeEquip.DEFAULT_WEAPON;
                // 				}
                // 			}
                // 		}
                // 	}
                // }
            };
            FashionItem.prototype.showFashionWeapon = function () {
                var fashionWeapon = GameModels.user.player.getProperty(TypeProperty.FASHION_WEAPON);
                if (fashionWeapon) {
                    var templateWeapon = Templates.getTemplateById(templates.Map.GAMEFASHION, fashionWeapon);
                    if (templateWeapon) {
                        this._playerShowAvatar.weaponResId = templateWeapon.modelId;
                        return false;
                    }
                }
                return true;
            };
            FashionItem.prototype.showClothesAvatar = function () {
                var fashionCloth = GameModels.user.player.getProperty(TypeProperty.FASHION_CLOTH);
                if (fashionCloth) {
                    var templateCloth = Templates.getTemplateById(templates.Map.GAMEFASHION, fashionCloth);
                    if (templateCloth) {
                        this._playerShowAvatar.clothResId = templateCloth.modelId;
                        return false;
                    }
                }
                return true;
            };
            FashionItem.prototype.fashionOnChange = function (e) {
                if (!this._currentItem)
                    return;
                var data = e && e.data ? e.data : this._currentItem;
                this.refreshSelected();
                if (data.type == this._type)
                    this._listData.replaceAll(GameModels.fashion.getFashionData(data.type));
            };
            FashionItem.prototype.net_fashionInfoHandler = function (data) {
                this._listData.source = GameModels.fashion.getFashionData(this._type);
                this.listFashion.selectedIndex = 0;
                this.listFashion.dispatchEventWith(egret.Event.CHANGING, false, true);
                if (this._pos != 0) {
                    for (var i = 0; i < GameModels.fashion.getFashionData(this._type).length; i++) {
                        if (GameModels.fashion.getFashionData(this._type)[i].id == this._pos) {
                            this.listFashion.selectedIndex = i;
                            break;
                        }
                    }
                }
                this.setSelectedItem(this._listData.source[this.listFashion.selectedIndex]);
            };
            FashionItem.prototype.changeTypeStage = function (index) {
                switch (index) {
                    case 0:
                        this._type = TypeFashion.WEAPON;
                        break;
                    case 1:
                        this._type = TypeFashion.CLOTHES;
                        break;
                    case 2:
                        this._type = TypeFashion.HALO;
                        break;
                    default:
                        this._type = TypeFashion.CLOTHES;
                        break;
                }
            };
            FashionItem.prototype.selectedType = function () {
                this._listData.source = GameModels.fashion.getFashionData(this._type);
                this.listFashion.selectedIndex = 0;
                this.listFashion.dispatchEventWith(egret.Event.CHANGING, false, true);
                this.setSelectedItem(this._listData.source[0]);
            };
            FashionItem.prototype.itemTapHandler = function (e) {
                this.setSelectedItem(e.item);
            };
            FashionItem.prototype.setSelectedItem = function (item) {
                this._currentItem = item;
                this.refreshSelected();
            };
            FashionItem.prototype.updateFashionModel = function () {
                switch (this._currentItem.type) {
                    case TypeFashion.WEAPON:
                        if (this._playerShowAvatar) {
                            this._playerShowAvatar.weaponResId = this._currentItem.template.modelId;
                        }
                        break;
                    case TypeFashion.CLOTHES:
                        if (this._playerShowAvatar) {
                            this._playerShowAvatar.clothResId = this._currentItem.template.modelId;
                        }
                        break;
                    case TypeFashion.HALO:
                        if (!this._effect) {
                            this._effect = this.fromEffect("");
                        }
                        this._effect.x = 300;
                        this._effect.y = 480;
                        this._effect.play();
                        this._effect.resId = this._currentItem.template.modelId;
                        this.addChild(this._effect);
                        this.addChild(this._playerShowAvatar);
                        break;
                }
            };
            FashionItem.prototype.refreshSelected = function () {
                this.updateFashionModel();
                this.btnActivity.skinName = "skins.SnapBigButton1Skin";
                this.btnState.visible = true;
                this.btnActivity.isWarn = false;
                this.btnChongZhi.visible = false;
                this.labPrice.text = "";
                this.imgPrice.visible = false;
                var item = this._currentItem;
                this.img_title.source = "fashion_json.img_fashion_" + item.template.id;
                if (item.template.duration == -1) {
                    this.img_type.source = "fashion_json.img_type_2";
                }
                else {
                    if (item.template.duration == 86400) {
                        this.img_type.source = "fashion_json.img_type_3";
                    }
                    else {
                        this.img_type.source = "fashion_json.img_type_1";
                    }
                }
                if (item.isActived) {
                    this._leftTime = item.lastTime;
                    if (this._leftTime > 0) {
                        this.startTime();
                    }
                    else {
                        this.timeOver();
                    }
                }
                else {
                    this.timeOver();
                }
                this.labDesc.textFlow = utils.TextFlowMaker.generateTextFlow(item.template.des);
                this.bitMapPwore.text = item.template.score + "";
                var str = item.template.properties.split(";");
                for (var i = 0; i < this._properitesLab.length; i++) {
                    if (str[i]) {
                        this._properitesLab[i].text = str[i].split("_")[1];
                        this._labArr[i].text = utils.htmlUtil.getAttributeName(str[i].split("_")[0]) + ":";
                    }
                    else {
                        this._properitesLab[i].text = "";
                        this._labArr[i].text = "";
                    }
                }
                if (item.isActived == false) {
                    var activeItem = item.template.consume.split("_");
                    var count = GameModels.bag.getItemCountById(activeItem[0]);
                    if (count >= parseInt(activeItem[1])) {
                        this.btnActivity.label = Language.C_JH;
                        this.btnActivity.isWarn = true;
                        this._state = 1;
                        this.btnActivity.visible = true;
                        this.btnState.visible = false;
                    }
                    else {
                        if (item.template.price) {
                            var priceArr = item.template.price.split("_");
                            if (priceArr.length <= 1) {
                                var gameF = Templates.getTemplateById(templates.Map.GAMERECHARGE, priceArr[0]);
                                this.btnState.visible = false;
                                this.btnChongZhi.visible = true;
                                this.btnChongZhi.source = gameF && gameF.RMB ? "btnMoney_json.btn_sg_chongzhi_" + gameF.RMB : "";
                                this.btnState.label = Language.C_WJH;
                            }
                            else {
                                this.btnState.visible = true;
                                this.labPrice.text = priceArr[1];
                                this.imgPrice.visible = true;
                                this.btnState.label = Language.C_GM;
                            }
                        }
                        else {
                            this.btnState.visible = true;
                            this.btnState.label = Language.C_WJH;
                        }
                        this.btnActivity.visible = false;
                        this._state = 4;
                    }
                }
                else {
                    this.btnActivity.visible = false;
                    this.btnState.visible = true;
                    if (item.isDressed) {
                        this.btnState.label = Language.C_XX;
                        this._state = 2;
                    }
                    else {
                        if (item.limitSeconds == 0) {
                            this.btnState.label = Language.C_YJS;
                        }
                        else {
                            this.btnActivity.label = Language.C_CD;
                            this.btnActivity.skinName = "skins.SnapBigButton2Skin";
                            this._state = 3;
                            this.btnActivity.visible = true;
                            this.btnState.visible = false;
                            this.btnActivity.isWarn = true;
                        }
                    }
                }
            };
            FashionItem.prototype.stateOnClick = function (e) {
                var _this = this;
                var item = this._currentItem;
                var priceArr = item.template.price.split("_");
                if (e.currentTarget == this.btnChongZhi) {
                    if (this._state == 4 && priceArr.length <= 1) {
                        var gameF = Templates.getTemplateById(templates.Map.GAMERECHARGE, priceArr[0]);
                        if (gameF) {
                            GameModels.platform.buy(gameF.RMB, 1, "" + gameF.id, gameF.name, gameF.des);
                        }
                    }
                    return;
                }
                if (this._state == 1) {
                    GameModels.fashion.net_requestFashionActive(this._currentItem.id, utils.Handler.create(this, function () {
                        mg.effectManager.playEffectOnce(TypeEffectId.JIHUO_EFF, _this.width * 0.5, _this.height * 0.5, _this);
                    }));
                }
                else if (this._state == 2) {
                    GameModels.fashion.net_requestFashionUnDress(this._currentItem.id);
                }
                else if (this._state == 3) {
                    GameModels.fashion.net_requestFashionDress(this._currentItem.id);
                }
                else if (this._state == 4) {
                    if (priceArr.length > 1) {
                        GameModels.fashion.net_requestFashionBuy(this._currentItem.id, null);
                    }
                    else {
                        mg.alertManager.tip(Language.C_WJH);
                    }
                }
            };
            FashionItem.prototype.showThlb = function (evt) {
                //mg.uiManager.show(dialog.activity.sgOpenServerActivityMainDialog, { tabIndex: game.sgActivityType.thlb, parms: this._teHuiLiBaoType[this._index] });
            };
            /**开始倒计时*/
            FashionItem.prototype.startTime = function () {
                this.labLeftTime.visible = true;
                this.showTime();
                this.updateTime();
            };
            /**倒计时结束 */
            FashionItem.prototype.timeOver = function () {
                utils.timer.clearAll(this);
                this.labLeftTime.visible = false;
            };
            /**进行倒计时 */
            FashionItem.prototype.updateTime = function () {
                utils.timer.countdown(this._leftTime, this, this.showTime, this.timeOver);
            };
            /**显示倒计时*/
            FashionItem.prototype.showTime = function () {
                this._leftTime--;
                if (this._leftTime > 3600) {
                    this.labLeftTime.text = Language.C_SYSJ + ":" + utils.DateUtil.formatTimeLeftInChinese(this._leftTime, true, true, false, false, false);
                }
                else {
                    this.labLeftTime.text = Language.C_SYSJ + ":" + Language.J_XY1XS;
                }
            };
            return FashionItem;
        }(ui.FashionItemSkin));
        fashion.FashionItem = FashionItem;
        __reflect(FashionItem.prototype, "item.fashion.FashionItem", ["IModuleView", "egret.DisplayObject"]);
    })(fashion = item_1.fashion || (item_1.fashion = {}));
})(item || (item = {}));

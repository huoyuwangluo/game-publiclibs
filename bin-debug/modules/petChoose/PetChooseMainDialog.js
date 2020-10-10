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
    var petChoose;
    (function (petChoose) {
        var PetChooseMainDialog = (function (_super) {
            __extends(PetChooseMainDialog, _super);
            function PetChooseMainDialog() {
                return _super.call(this) || this;
            }
            PetChooseMainDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            PetChooseMainDialog.prototype.enter = function () {
                GameModels.upStar.isOpenQuickShengXingView = true;
                this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.btnUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.renderer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.renderer2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.renderer3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
                GameModels.petChoose.addEventListener(mo.ModelPetChoose.ADD_REMOVE_GAMEPETVO, this.updataRenderer, this);
                this.btnOneKey.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this._selecdIndex = 0;
                this.btn1.currentState = "down";
                this.btn2.currentState = "up";
                this.btn3.currentState = "up";
                this.btnOneKey.visible = true;
                this.btnUp.x = 415;
                this._isPutOn = false;
                this.showView();
            };
            PetChooseMainDialog.prototype.exit = function () {
                this._isPutOn = false;
                GameModels.petChoose.clearGamePetVo();
                this.clearList(this.list);
                this.renderer2.data = null;
                this.renderer3.data = null;
                this._currData = null;
                this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.btnUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.renderer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.renderer2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.renderer3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
                GameModels.petChoose.removeEventListener(mo.ModelPetChoose.ADD_REMOVE_GAMEPETVO, this.updataRenderer, this);
                this.btnOneKey.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
                this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
            };
            PetChooseMainDialog.prototype.onListClick = function (e) {
                if (e.item.selecd == true)
                    return;
                this._isPutOn = false;
                GameModels.petChoose.clearGamePetVo();
                this._currData.selecd = false;
                this._listData.itemUpdated(this._currData);
                e.item.selecd = !e.item.selecd;
                this._listData.itemUpdated(e.item);
                this.list.selectedIndex = e.itemIndex;
                this._currData = this.list.selectedItem;
                this.updataPetModel();
                this.updataRenderer();
            };
            PetChooseMainDialog.prototype.showView = function () {
                GameModels.petChoose.clearGamePetVo();
                this._currBreakId = GameModels.petChoose.quickGeneralBreakArr[this._selecdIndex];
                var tem = GameModels.petChoose.getAllPetTempArrByQuality(this._selecdIndex);
                this.btnUp.visible = tem.length > 0;
                this.body.visible = tem.length > 0;
                this.imgStarbg.visible = tem.length > 0;
                this.imgStar.visible = tem.length > 0;
                this.imgDi1.visible = tem.length > 0;
                this.imgDi2.visible = tem.length > 0;
                this.btn1.isWarn = GameModels.petChoose.checkTableRedPoint(0);
                this.btn2.isWarn = GameModels.petChoose.checkTableRedPoint(1);
                this.btn3.isWarn = !GameModels.petChoose.isOpenUpStar && GameModels.user.player.level >= 200 && GameModels.petChoose.checkTableRedPoint(2);
                var data = [];
                for (var i = 0; i < tem.length; i++) {
                    var obj = { petData: null, selecd: false, count: "", star: mo.ModelPetChoose.STARARR[this._selecdIndex] + 1, point: false };
                    obj.petData = tem[i];
                    obj.selecd = false;
                    obj.count = "";
                    obj.point = GameModels.user.player.level >= this._currBreakId.needLV && GameModels.petChoose.checkPetAllRedPoint(tem[i].id, this._currBreakId);
                    data.push(obj);
                }
                data.sort(function (a, b) {
                    if (a.point == true && b.point == true) {
                        return a.petData.id - a.petData.id;
                    }
                    else {
                        if (a.point == false && b.point == false) {
                            return a.petData.id - a.petData.id;
                        }
                        else if (a.point == false) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    }
                });
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(data);
                }
                else {
                    this._listData.source = data;
                }
                this.list.dataProvider = this._listData;
                this.list.selectedIndex = 0;
                this._currData = this.list.selectedItem;
                this._currData.selecd = true;
                this._listData.itemUpdated(this._currData);
                this.updataPetModel();
                this.updataRenderer();
            };
            PetChooseMainDialog.prototype.updataRenderer = function () {
                this.renderer2.data = null;
                this.renderer3.data = null;
                this.renderer.data = null;
                this.renderer3.visible = false;
                this.renderer.visible = false;
                if (this._currData) {
                    var isCan = GameModels.user.player.level >= this._currBreakId.needLV && (GameModels.petChoose.getGamePetVoArrByPos(0).length < this._currBreakId.selfGenFast) && GameModels.petChoose.checkRedPointSelf(this._currData.petData.id, this._currBreakId);
                    var templ = Templates.getTemplateById(templates.Map.GENERAL, this._currData.petData.id);
                    var obj1 = { petData: this._currData.petData, selecd: false, count: GameModels.petChoose.getGamePetVoArrByPos(0).length + "/" + this._currBreakId.selfGenFast, star: templ.star, point: isCan };
                    this.renderer2.data = obj1;
                    if (this._currBreakId.otherGenFast) {
                        this.renderer3.visible = true;
                        var str = this._currBreakId.otherGenFast.split("_");
                        var isCan1 = GameModels.user.player.level >= this._currBreakId.needLV && (GameModels.petChoose.getGamePetVoArrByPos(1).length < parseInt(str[1])) && GameModels.petChoose.checkRedPointOther(this._currData.petData.id, this._currBreakId);
                        var obj2 = { petData: str[0], selecd: false, count: GameModels.petChoose.getGamePetVoArrByPos(1).length + "/" + parseInt(str[1]), star: parseInt(str[0]), point: isCan1 };
                        this.renderer3.data = obj2;
                    }
                    if (this._currBreakId.campGenFast) {
                        this.renderer.visible = true;
                        var str = this._currBreakId.campGenFast.split("_");
                        var templgeneral = Templates.getTemplateById(templates.Map.GENERAL, this._currData.petData.id);
                        var isCan2 = GameModels.user.player.level >= this._currBreakId.needLV && (GameModels.petChoose.getGamePetVoArrByPos(2).length < parseInt(str[1])) && GameModels.petChoose.checkRedPointLegion(this._currData.petData.id, this._currBreakId);
                        var obj3 = { petData: str[0], selecd: false, count: GameModels.petChoose.getGamePetVoArrByPos(2).length + "/" + parseInt(str[1]), star: parseInt(str[0]), point: isCan2, legion: templgeneral.country };
                        this.renderer.data = obj3;
                        if (!this.renderer3.visible) {
                            this.renderer.x = this.renderer3.x;
                            this.renderer.y = this.renderer3.y;
                        }
                        else {
                            this.renderer.x = 260;
                            this.renderer.y = 20;
                        }
                    }
                }
            };
            PetChooseMainDialog.prototype.updataPetModel = function () {
                if (this._currData) {
                    var temp = this._currData.petData;
                    this.body.setPetBody(temp.model);
                    this.imgStar.source = "pet_json.img_petStar" + (mo.ModelPetChoose.STARARR[this._selecdIndex] + 1) + "_png";
                    // this.star.updataStar(1, mo.ModelPetChoose.STARARR[this._selecdIndex] + 1);
                    GameModels.petChoose.onekeyChooseSelf(temp.id, this._currBreakId);
                }
            };
            PetChooseMainDialog.prototype.touchEventClick = function (e) {
                switch (e.currentTarget) {
                    case this.btnOneKey:
                        if (this._currData) {
                            var temp = this._currData.petData;
                            if (!GameModels.petChoose.checkPetAllRedPoint(temp.id, this._currBreakId)) {
                                mg.alertManager.tip(Language.J_CLBZTZZDSJ);
                                this._isPutOn = false;
                                return;
                            }
                            if (!this._isPutOn) {
                                this._isPutOn = true;
                                mg.alertManager.tip(Language.C_YFR);
                            }
                            else {
                                mg.alertManager.tip(Language.C_YFRQHC);
                                return;
                            }
                            GameModels.petChoose.onekeyChooseSelf(temp.id, this._currBreakId);
                            if (this._currBreakId.campGenFast) {
                                GameModels.petChoose.onekeyChooseLegion(temp.id, this._currBreakId);
                            }
                            GameModels.petChoose.onekeyChooseOther(temp.id, this._currBreakId);
                        }
                        break;
                    case this.btnUp:
                        if (this._currData) {
                            this._isPutOn = false;
                            // if (!this._currData.point) {
                            // 	mg.alertManager.tip(Language.J_CLBZTZZDSJ);
                            // 	return;
                            // }
                            GameModels.petChoose.petStarBreakFast(this._currBreakId, utils.Handler.create(this, function () {
                                this.showView();
                                mg.effectManager.playEffectOnce(TypeEffectId.HECHENG_EFF, this.width * 0.5, this.height * 0.5, this);
                            }));
                        }
                        break;
                    case this.btn1:
                        this._isPutOn = false;
                        this.btn1.currentState = "down";
                        this.btn2.currentState = "up";
                        this.btn3.currentState = "up";
                        this._selecdIndex = 0;
                        this.btnOneKey.visible = true;
                        this.btnUp.x = 415;
                        this.showView();
                        break;
                    case this.btn2:
                        this._isPutOn = false;
                        this.btn1.currentState = "up";
                        this.btn2.currentState = "down";
                        this.btn3.currentState = "up";
                        this._selecdIndex = 1;
                        this.showView();
                        this.btnOneKey.visible = true;
                        this.btnUp.x = 415;
                        break;
                    case this.btn3:
                        this._isPutOn = false;
                        GameModels.petChoose.isOpenUpStar = true;
                        this.btn1.currentState = "up";
                        this.btn2.currentState = "up";
                        this.btn3.currentState = "down";
                        this._selecdIndex = 2;
                        this.showView();
                        this.btnOneKey.visible = false;
                        this.btnUp.x = 300;
                        break;
                    case this.renderer:
                        var temp = this._currData.petData;
                        mg.alertManager.showAlert(PetChooseListAlert, true, true, this._currBreakId, 2, this._currData.petData);
                        break;
                    case this.renderer2:
                        var temp = this._currData.petData;
                        mg.alertManager.showAlert(PetChooseListAlert, true, true, this._currBreakId, 0, this._currData.petData);
                        break;
                    case this.renderer3:
                        var temp = this._currData.petData;
                        mg.alertManager.showAlert(PetChooseListAlert, true, true, this._currBreakId, 1, this._currData.petData);
                        break;
                    case this.btnHelp:
                        mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5201).des);
                        break;
                }
            };
            return PetChooseMainDialog;
        }(ui.PetChooseMainDialogSkin));
        petChoose.PetChooseMainDialog = PetChooseMainDialog;
        __reflect(PetChooseMainDialog.prototype, "dialog.petChoose.PetChooseMainDialog", ["IModuleView", "egret.DisplayObject"]);
    })(petChoose = dialog.petChoose || (dialog.petChoose = {}));
})(dialog || (dialog = {}));

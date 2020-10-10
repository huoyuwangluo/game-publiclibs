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
/**武将快速升星选择消耗材料 */
var PetChooseListAlert = (function (_super) {
    __extends(PetChooseListAlert, _super);
    function PetChooseListAlert() {
        var _this = _super.call(this) || this;
        _this._imgSelecdArr = [_this.imgSelecd0, _this.imgSelecd1, _this.imgSelecd2];
        return _this;
    }
    PetChooseListAlert.prototype.show = function (temp, pos, currData) {
        this._currBreakId = temp;
        this._currData = currData;
        this.showView(pos);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.renderer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
        this.renderer2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
        this.renderer3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
    };
    PetChooseListAlert.prototype.showView = function (pos) {
        this._pos = pos;
        this.labNo.text = Language.J_MYWJ;
        this.labCompound.visible = false;
        var templ = Templates.getTemplateById(templates.Map.GENERAL, this._currData.id);
        var voArr = [];
        if (pos == 0) {
            voArr = GameModels.pet.getPetListByQAndStar1(0, this._currData.id);
            for (var i = voArr.length - 1; i >= 0; i--) {
                if (GameModels.petChoose.getGamePetVoArrByPos(1).indexOf(voArr[i]) != -1 ||
                    GameModels.petChoose.getGamePetVoArrByPos(2).indexOf(voArr[i]) != -1) {
                    voArr.splice(i, 1);
                }
            }
        }
        else if (pos == 1) {
            voArr = GameModels.pet.getPetListByQAndStar1(parseInt(this._currBreakId.otherGenFast.split("_")[0]), 0);
            for (var i = voArr.length - 1; i >= 0; i--) {
                if (GameModels.petChoose.getGamePetVoArrByPos(0).indexOf(voArr[i]) != -1 ||
                    GameModels.petChoose.getGamePetVoArrByPos(2).indexOf(voArr[i]) != -1) {
                    voArr.splice(i, 1);
                }
            }
        }
        else {
            voArr = GameModels.pet.getPetListByQAndStar1(parseInt(this._currBreakId.campGenFast.split("_")[0]), 0, templ.country);
            for (var i = voArr.length - 1; i >= 0; i--) {
                if (GameModels.petChoose.getGamePetVoArrByPos(0).indexOf(voArr[i]) != -1 ||
                    GameModels.petChoose.getGamePetVoArrByPos(1).indexOf(voArr[i]) != -1) {
                    voArr.splice(i, 1);
                }
            }
        }
        voArr.sort(function (a, b) {
            var aB = a.isGongMing == 1 || a.isLock == 1;
            var bB = b.isGongMing == 1 || b.isLock == 1;
            if (!aB && !bB) {
                if (a.quality != b.quality) {
                    return a.quality - b.quality;
                }
                else {
                    return parseInt(a.refId) - parseInt(b.refId);
                }
            }
            else if (bB) {
                return -1;
            }
            else if (aB) {
                return 1;
            }
        });
        var data = [];
        for (var i = 0; i < voArr.length; i++) {
            var star = 0;
            if (this._pos > 1) {
                star = parseInt(this._currBreakId.campGenFast.split("_")[0]);
            }
            else {
                star = this._pos == 0 ? templ.star : parseInt(this._currBreakId.otherGenFast.split("_")[0]);
            }
            var obj = { petData: null, selecd: false, count: "", star: star };
            obj.petData = voArr[i];
            obj.selecd = GameModels.petChoose.getGamePetVoArrByPos(pos).indexOf(voArr[i]) != -1 ? true : false;
            obj.count = "";
            data.push(obj);
        }
        if (!this._listData) {
            this._listData = new eui.ArrayCollection(data);
        }
        else {
            this._listData.source = data;
        }
        this.list.dataProvider = this._listData;
        this.labNo.visible = data.length <= 0;
        if (this._pos > 1) {
            this._count = parseInt(this._currBreakId.campGenFast.split("_")[1]);
        }
        else {
            this._count = this._pos == 0 ? this._currBreakId.selfGenFast : parseInt(this._currBreakId.otherGenFast.split("_")[1]);
        }
        var chooseCount = GameModels.petChoose.getGamePetVoArrByPos(this._pos).length;
        var elements = [];
        elements.push({ text: Language.C_YXZ + ":", style: { textColor: 0xD3D3D3 } });
        elements.push({ text: chooseCount + "/" + this._count, style: { textColor: chooseCount >= this._count ? 0x00ff00 : 0xff0000 } });
        if (this._pos != 0 && GameModels.petChoose.getXiYouPetCountArrByPos(this._pos) > 0) {
            elements.push({ text: "," + Language.C_H, style: { textColor: 0xD3D3D3 } });
            elements.push({ text: "" + GameModels.petChoose.getXiYouPetCountArrByPos(this._pos), style: { textColor: 0xFF0000 } });
            elements.push({ text: Language.J_GXYWJ, style: { textColor: 0xD3D3D3 } });
        }
        this.labXiYou.textFlow = elements;
        this.updataRenderer();
    };
    PetChooseListAlert.prototype.updataRenderer = function () {
        this.renderer3.visible = false;
        this.renderer.visible = false;
        this.group.removeChild(this.renderer2);
        this.group.removeChild(this.renderer3);
        this.group.removeChild(this.renderer);
        this.groupSelecd.removeChild(this.imgSelecd0);
        this.groupSelecd.removeChild(this.imgSelecd1);
        this.groupSelecd.removeChild(this.imgSelecd2);
        if (this._currData) {
            var isCan = GameModels.user.player.level >= this._currBreakId.needLV && (GameModels.petChoose.getGamePetVoArrByPos(0).length < this._currBreakId.selfGenFast) && GameModels.petChoose.checkRedPointSelf(this._currData.id, this._currBreakId);
            var templ = Templates.getTemplateById(templates.Map.GENERAL, this._currData.id);
            var obj1 = { petData: this._currData, selecd: false, count: GameModels.petChoose.getGamePetVoArrByPos(0).length + "/" + this._currBreakId.selfGenFast, star: templ.star, point: isCan };
            this.renderer2.data = obj1;
            this.group.addChild(this.renderer2);
            this.groupSelecd.addChild(this.imgSelecd0);
            if (this._currBreakId.otherGenFast) {
                this.renderer3.visible = true;
                this.group.addChild(this.renderer3);
                this.groupSelecd.addChild(this.imgSelecd1);
                var str = this._currBreakId.otherGenFast.split("_");
                var isCan1 = GameModels.user.player.level >= this._currBreakId.needLV && (GameModels.petChoose.getGamePetVoArrByPos(1).length < parseInt(str[1])) && GameModels.petChoose.checkRedPointOther(this._currData.id, this._currBreakId);
                var obj2 = { petData: str[0], selecd: false, count: GameModels.petChoose.getGamePetVoArrByPos(1).length + "/" + parseInt(str[1]), star: parseInt(str[0]), point: isCan1 };
                this.renderer3.data = obj2;
            }
            if (this._currBreakId.campGenFast) {
                this.renderer.visible = true;
                this.group.addChild(this.renderer);
                this.groupSelecd.addChild(this.imgSelecd2);
                var str = this._currBreakId.campGenFast.split("_");
                var templgeneral = Templates.getTemplateById(templates.Map.GENERAL, this._currData.id);
                var isCan2 = GameModels.user.player.level >= this._currBreakId.needLV && (GameModels.petChoose.getGamePetVoArrByPos(2).length < parseInt(str[1])) && GameModels.petChoose.checkRedPointLegion(this._currData.id, this._currBreakId);
                var obj3 = { petData: str[0], selecd: false, count: GameModels.petChoose.getGamePetVoArrByPos(2).length + "/" + parseInt(str[1]), star: parseInt(str[0]), point: isCan2, legion: templgeneral.country };
                this.renderer.data = obj3;
            }
        }
        for (var i = 0; i < this._imgSelecdArr.length; i++) {
            if (i == this._pos) {
                this._imgSelecdArr[i].visible = true;
            }
            else {
                this._imgSelecdArr[i].visible = false;
            }
        }
    };
    PetChooseListAlert.prototype.onListClick = function (e) {
        var temp = this.list.selectedItem.petData;
        if (temp.isGongMing == 1) {
            mg.alertManager.tip(Language.J_XZWJTS1);
            return;
        }
        if (temp.isLock == 1) {
            mg.alertManager.tip(Language.J_XZWJTS2);
            return;
        }
        if (!e.item.selecd && GameModels.petChoose.getGamePetVoArrByPos(this._pos).length == this._count) {
            mg.alertManager.tip(Language.J_WJXZYM);
            return;
        }
        e.item.selecd = !e.item.selecd;
        this._listData.itemUpdated(e.item);
        if (this.list.selectedItem.selecd) {
            GameModels.petChoose.addGamePetVo(temp, this._pos);
            this.updataRenderer();
        }
        else {
            GameModels.petChoose.removeGamePetVo(temp, this._pos);
            this.updataRenderer();
        }
        var chooseCount = GameModels.petChoose.getGamePetVoArrByPos(this._pos).length;
        var elements = [];
        elements.push({ text: Language.C_YXZ + ":", style: { textColor: 0xD3D3D3 } });
        elements.push({ text: chooseCount + "/" + this._count, style: { textColor: chooseCount >= this._count ? 0x00ff00 : 0xff0000 } });
        if (this._pos != 0 && GameModels.petChoose.getXiYouPetCountArrByPos(this._pos) > 0) {
            elements.push({ text: "," + Language.C_H, style: { textColor: 0xD3D3D3 } });
            elements.push({ text: "(" + GameModels.petChoose.getXiYouPetCountArrByPos(this._pos) + Language.J_GXYWJ + ")", style: { textColor: 0xFF0000 } });
            // elements.push({ text: Language.J_GXYWJ, style: { textColor: 0xD3D3D3 } });
        }
        this.labXiYou.textFlow = elements;
    };
    PetChooseListAlert.prototype.clickHandler = function (e) {
        if (e.currentTarget == this.btnClose) {
            //GameModels.petChoose.clearGamePetVo(true);
            this.dispatchEventWith(egret.Event.CLOSE);
            return;
        }
        if (this._pos != 0) {
            if (GameModels.petChoose.getShenMoPetCountArrByPos(this._pos) > 0) {
                mg.TipManager.instance.showCheckAlert(Language.J_SXWJZYXYJ1, TypeBtnLabel.OK, TypeCheck.QUICK_PETUP_SHENMOWUJIANG, null, utils.Handler.create(this, function () {
                    this.dispatchEventWith(egret.Event.CLOSE);
                }));
                return;
            }
            if (GameModels.petChoose.getUpPetCountArrByPos(this._pos) > 0) {
                mg.TipManager.instance.showCheckAlert(Language.J_SXWJZYXYJ2, TypeBtnLabel.OK, TypeCheck.QUICK_PETUP_UPWUJIANG, null, utils.Handler.create(this, function () {
                    this.dispatchEventWith(egret.Event.CLOSE);
                }));
                return;
            }
            this.dispatchEventWith(egret.Event.CLOSE);
        }
        else {
            this.dispatchEventWith(egret.Event.CLOSE);
        }
    };
    PetChooseListAlert.prototype.touchEventClick = function (e) {
        switch (e.currentTarget) {
            case this.renderer:
                this.showView(2);
                break;
            case this.renderer2:
                this.showView(0);
                break;
            case this.renderer3:
                this.showView(1);
                break;
        }
    };
    PetChooseListAlert.prototype.hide = function () {
        this._pos = 0;
        this._count = 0;
        this._isSelfId = 0;
        this.clearList(this.list);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.renderer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
        this.renderer2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
        this.renderer3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return PetChooseListAlert;
}(ui.PetChooseListAlertSkin));
__reflect(PetChooseListAlert.prototype, "PetChooseListAlert", ["IAlert", "egret.DisplayObject"]);

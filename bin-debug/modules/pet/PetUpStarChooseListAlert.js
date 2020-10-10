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
/**武将升星选择消耗材料 */
var PetUpStarChooseListAlert = (function (_super) {
    __extends(PetUpStarChooseListAlert, _super);
    function PetUpStarChooseListAlert() {
        var _this = _super.call(this) || this;
        _this._imgSelecdArr = [_this.imgSelecd0, _this.imgSelecd1, _this.imgSelecd2, _this.imgSelecd3];
        return _this;
    }
    PetUpStarChooseListAlert.prototype.show = function (petData, pos) {
        this._petData = petData;
        this.showView(pos);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.labCompound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showCompoundView, this);
        this.needItemSelf.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
        this.needItemOther0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
        this.needItemOther1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
        this.needItemLegion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
    };
    PetUpStarChooseListAlert.prototype.showView = function (pos) {
        this._pos = pos;
        this.labCompound.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_QWKSHC);
        var voArr = [];
        if (pos == 0) {
            voArr = GameModels.pet.getPetListByQAndStar1(0, parseInt(this._petData.refId));
            for (var i = voArr.length - 1; i >= 0; i--) {
                if (GameModels.upStar.getGamePetVoArrByPos(1).indexOf(voArr[i]) != -1
                    || GameModels.upStar.getGamePetVoArrByPos(2).indexOf(voArr[i]) != -1
                    || GameModels.upStar.getGamePetVoArrByPos(3).indexOf(voArr[i]) != -1
                    || this._petData == voArr[i]) {
                    voArr.splice(i, 1);
                }
            }
            this.labCompound.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_CKHQTJ);
            this.labNo.text = Language.J_MYBTWJ;
        }
        else if (pos == 1) {
            voArr = GameModels.pet.getPetListByQAndStar1(this._petData.getOtherPetStar(), 0);
            for (var i = voArr.length - 1; i >= 0; i--) {
                if (GameModels.upStar.getGamePetVoArrByPos(0).indexOf(voArr[i]) != -1
                    || GameModels.upStar.getGamePetVoArrByPos(2).indexOf(voArr[i]) != -1
                    || GameModels.upStar.getGamePetVoArrByPos(3).indexOf(voArr[i]) != -1
                    || this._petData == voArr[i]) {
                    voArr.splice(i, 1);
                }
            }
            this.labNo.text = Language.getExpression(Language.E_MYKXZD1X2J, this._petData.getOtherPetCount(), this._petData.getOtherPetStar());
        }
        else if (pos == 2) {
            voArr = GameModels.pet.getPetListByQAndStar1(this._petData.getOtherPetStar(1), 0);
            for (var i = voArr.length - 1; i >= 0; i--) {
                if (GameModels.upStar.getGamePetVoArrByPos(0).indexOf(voArr[i]) != -1
                    || GameModels.upStar.getGamePetVoArrByPos(1).indexOf(voArr[i]) != -1
                    || GameModels.upStar.getGamePetVoArrByPos(3).indexOf(voArr[i]) != -1
                    || this._petData == voArr[i]) {
                    voArr.splice(i, 1);
                }
            }
            this.labNo.text = Language.getExpression(Language.E_MYKXZD1X2J, this._petData.getOtherPetCount(1), this._petData.getOtherPetStar(1));
        }
        else {
            voArr = GameModels.pet.getPetListByQAndStar1(this._petData.legionPetStar, 0, this._petData.refId == "13000" ? 4 : this._petData.template.country);
            for (var i = voArr.length - 1; i >= 0; i--) {
                if (GameModels.upStar.getGamePetVoArrByPos(0).indexOf(voArr[i]) != -1
                    || GameModels.upStar.getGamePetVoArrByPos(1).indexOf(voArr[i]) != -1
                    || GameModels.upStar.getGamePetVoArrByPos(2).indexOf(voArr[i]) != -1
                    || this._petData == voArr[i]) {
                    voArr.splice(i, 1);
                }
            }
            if (this._petData.refId == "13000") {
                this.labNo.text = Language.getExpression(Language.E_MYKXZD1X2JTZY1, this._petData.legionPetCount, this._petData.legionPetStar);
            }
            else {
                this.labNo.text = Language.getExpression(Language.E_MYKXZD1X2JTZY, this._petData.legionPetCount, this._petData.legionPetStar);
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
            var obj = { petData: null, selecd: false, count: "", star: voArr[i].star, des: "" };
            obj.petData = voArr[i];
            obj.selecd = GameModels.upStar.getGamePetVoArrByPos(pos).indexOf(voArr[i]) != -1 ? true : false;
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
        var count = 0;
        if (this._pos > 2) {
            count = this._petData.legionPetCount;
        }
        else {
            count = this._pos == 0 ? this._petData.selfPetCount : this._petData.getOtherPetCount(this._pos - 1);
        }
        var chooseCount = GameModels.upStar.getGamePetVoArrByPos(this._pos).length;
        var elements = [];
        elements.push({ text: Language.C_YXZ + ":", style: { textColor: 0xD3D3D3 } });
        elements.push({ text: chooseCount + "/" + count, style: { textColor: chooseCount >= count ? 0x00ff00 : 0xff0000 } });
        if (this._pos != 0 && GameModels.upStar.getXiYouPetCountArrByPos(this._pos) > 0) {
            elements.push({ text: "," + Language.C_H, style: { textColor: 0xD3D3D3 } });
            elements.push({ text: "(" + GameModels.upStar.getXiYouPetCountArrByPos(this._pos) + Language.J_GXYWJ + ")", style: { textColor: 0xFF0000 } });
            // elements.push({ text: Language.J_GXYWJ, style: { textColor: 0xD3D3D3 } });
        }
        this.labXiYou.textFlow = elements;
        this.showNeedItem();
    };
    PetUpStarChooseListAlert.prototype.showNeedItem = function () {
        this.group.removeChild(this.needItemSelf);
        this.group.removeChild(this.needItemOther0);
        this.group.removeChild(this.needItemOther1);
        this.group.removeChild(this.needItemLegion);
        this.groupSelecd.removeChild(this.imgSelecd0);
        this.groupSelecd.removeChild(this.imgSelecd1);
        this.groupSelecd.removeChild(this.imgSelecd2);
        this.groupSelecd.removeChild(this.imgSelecd3);
        var isAllCaiLiaoCan = GameModels.upStar.checkPetHeadUpStarRedPoint(this._petData);
        if (this._petData.selfPetCount > 0) {
            if (this._petData.generalBraekTmp.consume) {
                var consumeArr = this._petData.generalBraekTmp.consume.split("_");
                this.group.addChild(this.needItemOther1);
                this.groupSelecd.addChild(this.imgSelecd2);
                var templ1 = Templates.getTemplateById(templates.Map.ITEM, consumeArr[0]);
                var obj1 = { petData: templ1, selecd: false, count: GameModels.bag.getItemCountById(ConfigData.GUANYING) + "/" + consumeArr[1] };
                this.needItemOther1.data = null;
                this.needItemOther1.data = obj1;
            }
            this.group.addChild(this.needItemSelf);
            this.groupSelecd.addChild(this.imgSelecd0);
            if (GameModels.upStar.getGamePetVoArrByPos(0).length > 0) {
                var templ = Templates.getTemplateById(templates.Map.GENERAL, this._petData.refId);
                var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(0).length < this._petData.selfPetCount && GameModels.upStar.checkRedPointSelf(this._petData);
                var obj1 = { petData: GameModels.upStar.getGamePetVoArrByPos(0)[0], selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(0).length + "/" + this._petData.selfPetCount, star: templ.star, point: isCount };
                this.needItemSelf.data = null;
                this.needItemSelf.data = obj1;
            }
            else {
                var temp = Templates.getTemplateById(templates.Map.GENERAL, this._petData.refId);
                var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(0).length < this._petData.selfPetCount && GameModels.upStar.checkRedPointSelf(this._petData);
                var obj1 = { petData: temp, selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(0).length + "/" + this._petData.selfPetCount, point: isCount };
                this.needItemSelf.data = null;
                this.needItemSelf.data = obj1;
            }
            if (this._petData.hashLegionPet) {
                this.group.addChild(this.needItemLegion);
                this.groupSelecd.addChild(this.imgSelecd3);
                var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(3).length < this._petData.legionPetCount && GameModels.upStar.checkRedPointLegion(this._petData);
                var obj1 = { petData: this._petData.legionPetStar, selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(3).length + "/" + this._petData.legionPetCount, star: this._petData.legionPetStar, point: isCount, legion: this._petData.refId == "13000" ? 4 : this._petData.template.country };
                this.needItemLegion.data = null;
                this.needItemLegion.data = obj1;
            }
            if (this._petData.hashOtherPetTypeCount > 0) {
                this.group.addChild(this.needItemOther0);
                this.groupSelecd.addChild(this.imgSelecd1);
                var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(1).length < this._petData.getOtherPetCount() && GameModels.upStar.checkRedPointOther1(this._petData);
                var obj1 = { petData: this._petData.getOtherPetStar(), selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(1).length + "/" + this._petData.getOtherPetCount(), star: this._petData.getOtherPetStar(), point: isCount };
                this.needItemOther0.data = null;
                this.needItemOther0.data = obj1;
            }
        }
        else {
            if (this._petData.generalBraekTmp.consume) {
                var consumeArr = this._petData.generalBraekTmp.consume.split("_");
                this.group.addChild(this.needItemSelf);
                this.groupSelecd.addChild(this.imgSelecd0);
                var templ1 = Templates.getTemplateById(templates.Map.ITEM, consumeArr[0]);
                var obj1 = { petData: templ1, selecd: false, count: GameModels.bag.getItemCountById(ConfigData.GUANYING) + "/" + consumeArr[1] };
                this.needItemSelf.data = null;
                this.needItemSelf.data = obj1;
            }
            if (this._petData.hashLegionPet) {
                this.group.addChild(this.needItemLegion);
                this.groupSelecd.addChild(this.imgSelecd3);
                var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(3).length < this._petData.legionPetCount && GameModels.upStar.checkRedPointLegion(this._petData);
                var obj1 = { petData: this._petData.legionPetStar, selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(3).length + "/" + this._petData.legionPetCount, star: this._petData.legionPetStar, point: isCount, legion: this._petData.refId == "13000" ? 4 : this._petData.template.country };
                this.needItemLegion.data = null;
                this.needItemLegion.data = obj1;
            }
            if (this._petData.hashOtherPetTypeCount > 0) {
                if (this._petData.hashOtherPetTypeCount == 1) {
                    this.group.addChild(this.needItemOther0);
                    this.groupSelecd.addChild(this.imgSelecd1);
                    var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(1).length < this._petData.getOtherPetCount() && GameModels.upStar.checkRedPointOther1(this._petData);
                    var obj1 = { petData: this._petData.getOtherPetStar(), selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(1).length + "/" + this._petData.getOtherPetCount(), star: this._petData.getOtherPetStar(), point: isCount };
                    this.needItemOther0.data = null;
                    this.needItemOther0.data = obj1;
                }
                else {
                    this.group.addChild(this.needItemOther0);
                    this.groupSelecd.addChild(this.imgSelecd1);
                    var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(1).length < this._petData.getOtherPetCount() && GameModels.upStar.checkRedPointOther1(this._petData);
                    var obj = { petData: this._petData.getOtherPetStar(), selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(1).length + "/" + this._petData.getOtherPetCount(), star: this._petData.getOtherPetStar(), point: isCount };
                    this.needItemOther0.data = null;
                    this.needItemOther0.data = obj;
                    this.group.addChild(this.needItemOther1);
                    this.groupSelecd.addChild(this.imgSelecd2);
                    var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(2).length < this._petData.getOtherPetCount(1) && GameModels.upStar.checkRedPointOther2(this._petData);
                    var obj1 = { petData: this._petData.getOtherPetStar(1), selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(2).length + "/" + this._petData.getOtherPetCount(1), star: this._petData.getOtherPetStar(1), point: isCount };
                    this.needItemOther1.data = null;
                    this.needItemOther1.data = obj1;
                }
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
    PetUpStarChooseListAlert.prototype.touchEventClick = function (e) {
        if (!this._petData)
            return;
        switch (e.currentTarget) {
            case this.needItemSelf:
                if (this._petData.generalBraekTmp.consume && this._petData.refId == "13000") {
                    // mg.alertManager.tip(Language.J_TGWGRWHQ);
                    mg.alertManager.showAlert(PropOfSourceAlert, true, true, "210401");
                    return;
                }
                this.showView(0);
                break;
            case this.needItemOther0:
                this.showView(1);
                break;
            case this.needItemOther1:
                if (this._petData.generalBraekTmp.consume && this._petData.refId != "13000") {
                    // mg.alertManager.tip(Language.J_TGWGRWHQ);
                    mg.alertManager.showAlert(PropOfSourceAlert, true, true, "210401");
                    return;
                }
                this.showView(2);
                break;
            case this.needItemLegion:
                this.showView(3);
                break;
        }
    };
    PetUpStarChooseListAlert.prototype.onListClick = function (e) {
        var temp = this.list.selectedItem.petData;
        if (temp.isGongMing == 1) {
            mg.alertManager.tip(Language.J_XZWJTS1);
            return;
        }
        if (temp.isLock == 1) {
            mg.alertManager.tip(Language.J_XZWJTS2);
            return;
        }
        var count = 0;
        if (this._pos > 2) {
            count = this._petData.legionPetCount;
        }
        else {
            count = this._pos == 0 ? this._petData.selfPetCount : this._petData.getOtherPetCount(this._pos - 1);
        }
        if (!e.item.selecd && GameModels.upStar.getGamePetVoArrByPos(this._pos).length == count) {
            mg.alertManager.tip(Language.J_WJXZYM);
            return;
        }
        if (temp.isLock == 1) {
            mg.alertManager.tip(Language.J_WJJSHCNQS);
            return;
        }
        e.item.selecd = !e.item.selecd;
        this._listData.itemUpdated(e.item);
        if (this.list.selectedItem.selecd) {
            GameModels.upStar.addGamePetVo(temp, this._pos);
            this.showNeedItem();
        }
        else {
            GameModels.upStar.removeGamePetVo(temp, this._pos);
            this.showNeedItem();
        }
        var chooseCount = GameModels.upStar.getGamePetVoArrByPos(this._pos).length;
        var elements = [];
        elements.push({ text: Language.C_YXZ + ":", style: { textColor: 0xD3D3D3 } });
        elements.push({ text: chooseCount + "/" + count, style: { textColor: chooseCount >= count ? 0x00ff00 : 0xff0000 } });
        if (this._pos != 0 && GameModels.upStar.getXiYouPetCountArrByPos(this._pos) > 0) {
            elements.push({ text: "," + Language.C_H, style: { textColor: 0xD3D3D3 } });
            elements.push({ text: "" + GameModels.upStar.getXiYouPetCountArrByPos(this._pos), style: { textColor: 0xFF0000 } });
            elements.push({ text: Language.J_GXYWJ, style: { textColor: 0xD3D3D3 } });
        }
        this.labXiYou.textFlow = elements;
    };
    PetUpStarChooseListAlert.prototype.showCompoundView = function (e) {
        if (this._pos != 0) {
            mg.uiManager.show(dialog.tujian.TuJianMainDialog, { tabIndex: 2 });
        }
        else {
            mg.alertManager.showAlert(PropOfSourceAlert, true, true, this._petData.refId);
        }
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    PetUpStarChooseListAlert.prototype.clickHandler = function (e) {
        if (e.currentTarget == this.btnClose) {
            //GameModels.upStar.clearGamePetVo(true);
            this.dispatchEventWith(egret.Event.CLOSE);
            return;
        }
        if (this._pos != 0) {
            if (GameModels.upStar.getShenMoPetCountArrByPos(this._pos) > 0) {
                mg.TipManager.instance.showCheckAlert(Language.J_SXWJZYXYJ1, TypeBtnLabel.OK, TypeCheck.QUICK_PETUP_SHENMOWUJIANG, null, utils.Handler.create(this, function () {
                    this.dispatchEventWith(egret.Event.CLOSE);
                }));
                return;
            }
            if (GameModels.upStar.getUpPetCountArrByPos(this._pos) > 0) {
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
    PetUpStarChooseListAlert.prototype.hide = function () {
        this._pos = 0;
        this._petData = null;
        this.clearList(this.list);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.labCompound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showCompoundView, this);
        this.needItemSelf.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
        this.needItemOther0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
        this.needItemOther1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
        this.needItemLegion.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return PetUpStarChooseListAlert;
}(ui.PetUpStarListAlertSkin));
__reflect(PetUpStarChooseListAlert.prototype, "PetUpStarChooseListAlert", ["IAlert", "egret.DisplayObject"]);

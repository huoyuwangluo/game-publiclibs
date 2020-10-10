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
var tips;
(function (tips) {
    var SelectedBoxTip = (function (_super) {
        __extends(SelectedBoxTip, _super);
        function SelectedBoxTip() {
            var _this = _super.call(this) || this;
            _this._btnArr = [_this.btn0, _this.btn1, _this.btn2, _this.btn3, _this.btn4];
            _this._labArr = [_this.lab0, _this.lab1, _this.lab2, _this.lab3, _this.lab4];
            return _this;
        }
        SelectedBoxTip.prototype.show = function (data) {
            if (data instanceof templates.item) {
                this.setInfo(data, 1);
            }
            else {
                this.setInfo(data.templateProp, data.count, data.step, data.inBag);
            }
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        SelectedBoxTip.prototype.onClick = function (e) {
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        SelectedBoxTip.prototype.setInfo = function (temp, count, step, inBag) {
            if (count === void 0) { count = 0; }
            if (step === void 0) { step = 0; }
            if (inBag === void 0) { inBag = false; }
            this._isShenBing = false;
            this.btnGroup.visible = false;
            this.scroller.y = 190;
            this._type = -1;
            this._temp = temp;
            this.labName.text = this._temp.name;
            this.imgQuality.source = ResPath.getQuality(this._temp.quality);
            this.imgIcon.source = ResPath.getItemIconKey(this._temp.icon);
            this.labType.text = "" + (count || "");
            this.labStep.text = "" + this._temp.lv;
            this.labDes.textFlow = utils.TextFlowMaker.generateTextFlow(this._temp.des);
            this.updateQualityEfct(this._temp.quality);
            /**上品神兵任选或者神品神兵任选 */
            if (this._temp.id == "410901" || this._temp.id == "410902" || this._temp.id == "411401" || this._temp.id == "411203") {
                this._isShenBing = true;
                if (this._temp.id == "410901" || this._temp.id == "410902") {
                    this._type = 0;
                }
                else {
                    this._type = 1;
                }
            }
            if (this._isShenBing) {
                this.btnGroup.visible = true;
                this.scroller.y = 240;
                this._index = 0;
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this.showBtnView();
            }
            this.showList();
        };
        SelectedBoxTip.prototype.showBtnView = function () {
            for (var i = 0; i < this._btnArr.length; i++) {
                if (i == this._index) {
                    this._btnArr[i].currentState = "down";
                    this._labArr[i].textColor = 0xCCC6BA;
                }
                else {
                    this._btnArr[i].currentState = "up";
                    this._labArr[i].textColor = 0x969696;
                }
            }
        };
        SelectedBoxTip.prototype.showList = function () {
            if (!this._temp)
                return;
            this.scroller.stopAnimation();
            this.scroller.viewport.scrollV = 0;
            var items = this._temp.extraParam.split(";");
            if (this._isShenBing) {
                if (this._type == 0) {
                    var sbItems = [];
                    if (this._index == 0) {
                        for (var i = 0; i < items.length; i++) {
                            var itemBox = Templates.getTemplateById(templates.Map.ITEM, items[i].split("_")[0]);
                            var sbitems1 = itemBox.extraParam.split(";");
                            for (var _i = 0, sbitems1_1 = sbitems1; _i < sbitems1_1.length; _i++) {
                                var sb = sbitems1_1[_i];
                                sbItems.push(sb);
                            }
                        }
                    }
                    else {
                        var itemBox = Templates.getTemplateById(templates.Map.ITEM, items[this._index - 1].split("_")[0]);
                        sbItems = itemBox.extraParam.split(";");
                    }
                    this.list.dataProvider = new eui.ArrayCollection(sbItems);
                }
                else {
                    var petItems = [];
                    for (var i = 0; i < items.length; i++) {
                        var pet = Templates.getTemplateById(templates.Map.GENERAL, items[i].split("_")[0]);
                        if (pet) {
                            if (this._index == 0) {
                                petItems.push(items[i]);
                            }
                            else {
                                if (pet.country == this._index) {
                                    petItems.push(items[i]);
                                }
                            }
                        }
                    }
                    this.list.dataProvider = new eui.ArrayCollection(petItems);
                }
            }
            else {
                this.list.dataProvider = new eui.ArrayCollection(items);
            }
        };
        SelectedBoxTip.prototype.updateQualityEfct = function (quality) {
            this.clearEffect();
            var isPet = false;
            if (this._temp.mainType != TypeItem.EQUIP && TypeItem.checkIsPetTypeOrPetSuiTyp(this._temp.type)) {
                // var tem: templates.general = Templates.getTemplateById(templates.Map.GENERAL, this._itemVO.type == TypeItem.PET_SUI ? this._itemVO.nextId : this._itemVO.id);
                isPet = true;
            }
            if (isPet && quality == TypeQuality.GOLDEN)
                return;
            switch (quality) {
                // case TypeQuality.GREEN:
                // 	this.addEffect(TypeEffectId.GREEN_EFF, 93, 370, this, 12);
                // 	break;
                // case TypeQuality.BLUE:
                // 	this.addEffect(TypeEffectId.BULE_EFF, 93, 370, this, 12);
                // 	break;
                case TypeQuality.PURPLE:
                    this.addEffect(TypeEffectId.PURPLE_EFF, 68, 117, this, 12);
                    break;
                case TypeQuality.ORANGE:
                    this.addEffect(TypeEffectId.ORANGE_EFF, 68, 117, this, 12);
                    break;
                case TypeQuality.RED:
                    this.addEffect(TypeEffectId.RED_EFF, 68, 117, this, 12);
                    break;
                case TypeQuality.GOLDEN:
                case TypeQuality.AN_GOLDEN:
                case TypeQuality.SHENG_GOLDEN:
                    this.addEffect(TypeEffectId.GOLDEN_EFF, 68, 117, this, 12);
                    break;
            }
        };
        SelectedBoxTip.prototype.onBtnClick = function (e) {
            this._index = this._btnArr.indexOf(e.currentTarget);
            this.showBtnView();
            this.showList();
        };
        SelectedBoxTip.prototype.hide = function () {
            this._temp = null;
            this._isShenBing = false;
            this._index = 0;
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return SelectedBoxTip;
    }(ui.SelectedBoxTipSkin));
    tips.SelectedBoxTip = SelectedBoxTip;
    __reflect(SelectedBoxTip.prototype, "tips.SelectedBoxTip", ["IAlert", "egret.DisplayObject"]);
})(tips || (tips = {}));

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
    var role;
    (function (role) {
        var ChengZhuangEquipInfoAlert = (function (_super) {
            __extends(ChengZhuangEquipInfoAlert, _super);
            function ChengZhuangEquipInfoAlert() {
                var _this = _super.call(this) || this;
                _this._nameStrs = [Language.PART_WQ, Language.PART_TK, Language.PART_XJ, Language.PART_XZ];
                _this._suitArr = Templates.getTemplatesByProperty(templates.Map.SYSTEMSUIT, "type", 9);
                return _this;
            }
            ChengZhuangEquipInfoAlert.prototype.show = function (rolePos, data) {
                this.labDes.text = data.templateEquip.des;
                this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeHandler, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this._rolePos = rolePos;
                this._vo = data;
                this._eqiupPos = this._vo.pos;
                this.showView();
            };
            ChengZhuangEquipInfoAlert.prototype.hide = function () {
                this.btnChange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeHandler, this);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            ChengZhuangEquipInfoAlert.prototype.showView = function () {
                if (!this._vo)
                    return;
                this.labName.text = this._vo.name;
                this.labName.textColor = TypeQuality.getQualityColor(this._vo.templateEquip.quality);
                this.imgQuality.source = ResPath.getQuality(this._vo.templateEquip.quality);
                this.imgIcon.source = this._vo.icon;
                this.labCount.text = this._nameStrs[this._vo.pos - 1101];
                this.labLvType.text = Language.C_DJ + ":";
                this.labLv.text = this._vo.templateEquip.lv + "";
                this.labFight.text = utils.htmlUtil.computeModelTatolFighting(this._vo.templateEquip.properties) + "";
                this.labPropertys.textFlow = this.getProperty(this._vo.templateEquip.properties);
                this._suitStep = [];
                var equip = GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.JICHU_EQIUP, this._rolePos);
                for (var i = 0; i < 4; i++) {
                    if (equip[i].refId) {
                        if (equip[i].templateEquip.quality == 5) {
                            this._suitStep.push(equip[i].templateEquip.step);
                        }
                    }
                }
                this._suitStep.sort(function (a, b) {
                    return a - b;
                });
                this.showSuit();
            };
            ChengZhuangEquipInfoAlert.prototype.hashStep = function (step, count) {
                var num = 0;
                for (var i = 0; i < this._suitStep.length; i++) {
                    if (this._suitStep[i] >= step) {
                        num++;
                    }
                }
                if (num >= count)
                    return step;
                return null;
            };
            ChengZhuangEquipInfoAlert.prototype.showSuit = function () {
                var obj = {};
                for (var i = 8; i >= 2; i--, i--) {
                    for (var j = 0; j < this._suitStep.length; j++) {
                        var step = this.hashStep(this._suitStep[j], i);
                        if (step) {
                            obj[i] = step;
                        }
                    }
                }
                this._suitCurrArr = [];
                for (var key in obj) {
                    this._suitCurrArr.push(this.hashSystemSuit(obj[key], key));
                }
                for (var i = 0; i < this._suitCurrArr.length; i++) {
                    logger.log("111111111111=", this._suitCurrArr[i]);
                }
                if (this._suitCurrArr.length <= 0) {
                    this.labPropertysGroup.text = "";
                    this.imgLine.visible = false;
                    this.imgBg.height = 440;
                    this.imgBg.validateNow();
                }
                else {
                    this.labPropertysGroup.textFlow = this.getProperty1();
                    this.imgLine.visible = true;
                    this.labPropertys.validateNow();
                    this.imgLine.y = this.labPropertys.y + this.labPropertys.textHeight + 5;
                    this.labPropertysGroup.y = this.labPropertys.y + this.labPropertys.textHeight + 20;
                    this.labPropertysGroup.validateNow();
                    this.imgBg.height = 440 + this.labPropertysGroup.textHeight;
                    this.imgBg.validateNow();
                }
                this.validateNow();
            };
            ChengZhuangEquipInfoAlert.prototype.hashSystemSuit = function (step, count) {
                for (var i = 0; i < this._suitArr.length; i++) {
                    if (this._suitArr[i].groupStep == step && this._suitArr[i].groupCount == count) {
                        return this._suitArr[i];
                    }
                }
                return null;
            };
            ChengZhuangEquipInfoAlert.prototype.changeHandler = function (e) {
                mg.uiManager.show(dialog.role.AncientEquipDressDialog, this._rolePos, this._vo);
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            ChengZhuangEquipInfoAlert.prototype.onClose = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            ChengZhuangEquipInfoAlert.prototype.getProperty1 = function () {
                var arys = [];
                var text = Language.getExpression(Language.E_1JTZSX, this._suitCurrArr[0].groupCount, this._suitCurrArr[0].groupCount);
                arys.push({ text: text + "\n", style: { "textColor": 0xFF8F16 } });
                var sortStr = utils.htmlUtil.comAttributessorting(this._suitCurrArr[0].properties).split(";");
                for (var i = 0; i < sortStr.length; i++) {
                    var str1 = utils.htmlUtil.getAttributeFormat(sortStr[i]).split(":");
                    // arys.push({text: this.getFormatHtml1(utils.htmlUtil.getAttributeName(str1[0]) + " : " + str1[1], i % 2 == 0 ? "" : "\n"),style:{"textAlign":egret.HorizontalAlign.LEFT}});
                    arys.push(this.getFormatHtml(utils.htmlUtil.getAttributeName(str1[0]) + " : " + str1[1]));
                }
                if (this._suitCurrArr[1]) {
                    var text1 = Language.getExpression(Language.E_1JTZSX, this._suitCurrArr[1].groupCount);
                    arys.push({ text: text1 + "\n", style: { "textColor": 0xFF8F16 } });
                    var sortStr1 = utils.htmlUtil.comAttributessorting(this._suitCurrArr[1].properties).split(";");
                    for (var i = 0; i < sortStr1.length; i++) {
                        var str2 = utils.htmlUtil.getAttributeFormat(sortStr1[i]).split(":");
                        // arys.push({text:this.getFormatHtml1(utils.htmlUtil.getAttributeName(str2[0]) + " : " + str2[1], i % 2 == 0 ? "" : "\n"),style:{"textAlign":egret.HorizontalAlign.LEFT}});
                        arys.push(this.getFormatHtml(utils.htmlUtil.getAttributeName(str2[0]) + " : " + str2[1]));
                    }
                }
                return arys;
            };
            ChengZhuangEquipInfoAlert.prototype.getProperty = function (data) {
                var arys = [];
                arys.push({ text: Language.C_JBSX + "\n", style: { "textColor": 0xFF8F16 } });
                var str = "";
                str = utils.htmlUtil.computeAttribute(data);
                var sortStr = utils.htmlUtil.comAttributessorting(str).split(";");
                for (var i = 0; i < sortStr.length; i++) {
                    var str1 = utils.htmlUtil.getAttributeFormat(sortStr[i]).split(":");
                    arys.push(this.getFormatHtml(utils.htmlUtil.getAttributeName(str1[0]) + " : " + str1[1]));
                }
                return arys;
            };
            ChengZhuangEquipInfoAlert.prototype.getFormatHtml = function (value, pfx) {
                if (pfx === void 0) { pfx = "\n"; }
                return { text: "  " + value + pfx };
            };
            ChengZhuangEquipInfoAlert.prototype.getFormatHtml1 = function (value, pfx) {
                if (pfx === void 0) { pfx = "\n"; }
                return "  " + (pfx != "\n" ? value : String.fromCharCode(12288) + String.fromCharCode(12288) + String.fromCharCode(12288) + String.fromCharCode(12288) + value) + pfx;
            };
            return ChengZhuangEquipInfoAlert;
        }(ui.ChengZhuangEquipInfoAlertSkin));
        role.ChengZhuangEquipInfoAlert = ChengZhuangEquipInfoAlert;
        __reflect(ChengZhuangEquipInfoAlert.prototype, "dialog.role.ChengZhuangEquipInfoAlert", ["IAlert", "egret.DisplayObject"]);
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));

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
        var AncientEquipInfoAlert = (function (_super) {
            __extends(AncientEquipInfoAlert, _super);
            function AncientEquipInfoAlert() {
                var _this = _super.call(this) || this;
                _this._nameStrs = [Language.PART_WQ, Language.PART_TK, Language.PART_XJ, Language.PART_XZ];
                _this._nameStrs1 = [Language.PART_LIUDAO1, Language.PART_LIUDAO2, Language.PART_LIUDAO3, Language.PART_LIUDAO4, Language.PART_LIUDAO5,
                    Language.PART_LIUDAO6];
                _this._nameStrs2 = [Language.PART_JIUJU1, Language.PART_JIUJU2, Language.PART_JIUJU3, Language.PART_JIUJU4, Language.PART_JIUJU5, Language.PART_JIUJU6,
                    Language.PART_JIUJU7, Language.PART_JIUJU8, Language.PART_JIUJU9];
                return _this;
            }
            AncientEquipInfoAlert.prototype.show = function (rolePos, data) {
                this.labDes.text = data.templateEquip.des;
                this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeHandler, this);
                this.btnComposite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.compositeHandler, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this._rolePos = rolePos;
                this._vo = data;
                this._eqiupPos = this._vo.pos;
                this.showView();
            };
            AncientEquipInfoAlert.prototype.hide = function () {
                this.btnChange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeHandler, this);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnComposite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.compositeHandler, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            AncientEquipInfoAlert.prototype.showView = function () {
                if (!this._vo)
                    return;
                this.labName.text = this._vo.name;
                this.labName.textColor = TypeQuality.getQualityColor(this._vo.templateEquip.quality);
                ;
                this.imgQuality.source = ResPath.getQuality(this._vo.templateEquip.quality);
                this.imgIcon.source = this._vo.icon;
                if (this._vo.type == TypeEquip.JIUQU_EQIUP) {
                    this.labCount.text = this._nameStrs2[this._vo.pos - 1301];
                }
                else if (this._vo.type == TypeEquip.LIUDAO_EQIUP) {
                    this.labCount.text = this._nameStrs1[this._vo.pos - 1321];
                }
                else {
                    this.labCount.text = this._nameStrs[this._vo.pos - 1101];
                }
                if (this._vo.templateEquip.type == 130 || this._vo.templateEquip.type == 132) {
                    this.labLvType.text = Language.C_JJ1 + ":";
                    this.labLv.text = this._vo.templateEquip.step + "";
                }
                else {
                    this.labLvType.text = Language.C_DJ + ":";
                    this.labLv.text = this._vo.templateEquip.lv + "";
                }
                this.labFight.text = utils.htmlUtil.computeModelTatolFighting(this._vo.templateEquip.properties) + "";
                this.labPropertys.textFlow = this.getProperty(this._vo.templateEquip.properties);
                this.btnComposite.visible = true;
                this.btnChange.x = 150;
                if (this._vo.templateEquip.nextId == "-1" || this._vo.type == TypeEquip.JICHU_EQIUP) {
                    this.btnComposite.visible = false;
                    this.btnChange.x = 250;
                }
            };
            AncientEquipInfoAlert.prototype.changeHandler = function (e) {
                mg.uiManager.show(dialog.role.AncientEquipDressDialog, this._rolePos, this._vo);
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            AncientEquipInfoAlert.prototype.compositeHandler = function (e) {
                mg.alertManager.showAlert(role.AncientEquipCompositeAlert, true, true, this._rolePos, this._vo);
            };
            AncientEquipInfoAlert.prototype.onClose = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            AncientEquipInfoAlert.prototype.getProperty = function (data) {
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
            AncientEquipInfoAlert.prototype.getFormatHtml = function (value, pfx) {
                if (pfx === void 0) { pfx = "\n"; }
                return { text: "  " + value + pfx };
            };
            return AncientEquipInfoAlert;
        }(ui.AncientEquipInfoAlertSkin));
        role.AncientEquipInfoAlert = AncientEquipInfoAlert;
        __reflect(AncientEquipInfoAlert.prototype, "dialog.role.AncientEquipInfoAlert", ["IAlert", "egret.DisplayObject"]);
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));

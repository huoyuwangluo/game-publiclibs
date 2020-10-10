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
        var AncientEquipCompositeAlert = (function (_super) {
            __extends(AncientEquipCompositeAlert, _super);
            function AncientEquipCompositeAlert() {
                var _this = _super.call(this) || this;
                _this._compositeIcons = [_this.reward1, _this.reward2, _this.reward3];
                _this.labGet0.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_QWHQ);
                _this.labGet1.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_QWHQ);
                return _this;
            }
            AncientEquipCompositeAlert.prototype.show = function (pos, vo) {
                this._rolePos = pos;
                this._eqiupPos = vo.pos;
                this._vo = vo;
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnComposite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.compositeHandler, this);
                this.labGet0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.linkHandler, this);
                this.labGet1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.linkHandler, this);
                this.showView();
            };
            AncientEquipCompositeAlert.prototype.hide = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnComposite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.compositeHandler, this);
                this.labGet0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.linkHandler, this);
                this.labGet1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.linkHandler, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            AncientEquipCompositeAlert.prototype.showView = function () {
                if (!this._vo)
                    return;
                this.reward0.dataSource = this._vo.templateEquip.nextId;
                // this.reward1.dataSource = this._vo.id;
                // var nextTemp: templates.equip = Templates.getTemplateById(templates.Map.EQUIP, this._vo.templateEquip.nextId);
                // var strArr: string[] = nextTemp.combine.split(";");
                // for (var i = 0; i < strArr.length; i++) {
                // 	var s: string[] = strArr[i].split("_");
                // 	var needCount: number = parseInt(s[1]);
                // 	if (i == 0) {
                // 		var bagCount: number = GameModels.bag.getEqiupCountById(s[0]);
                // 		this.reward2.dataSource = s[0];
                // 		this.reward2.labCount.text = bagCount + "/" + needCount;
                // 		this.reward2.labCount.textColor = bagCount >= needCount ? 0x00ff00 : 0xff0000;
                // 	}
                // 	else {
                // 		var bagCount: number = GameModels.bag.getEqiupCountById(s[0]);
                // 		this.reward3.dataSource = s[0];
                // 		this.reward3.labCount.text = bagCount + "/" + needCount;
                // 		this.reward3.labCount.textColor = bagCount >= needCount ? 0x00ff00 : 0xff0000;
                // 	}
                // }
                var nextTemp = Templates.getTemplateById(templates.Map.EQUIP, this._vo.templateEquip.nextId);
                var strArr = nextTemp.combine.split(";");
                for (var i = 0; i < strArr.length; i++) {
                    if (i == 0) {
                        this._compositeIcons[i].dataSource = strArr[i];
                        this._compositeIcons[i].labCount.text = "";
                    }
                    else {
                        var s = strArr[i].split("_");
                        var needCount = parseInt(s[1]);
                        var bagCount = GameModels.bag.getEqiupCountById(s[0]);
                        this._compositeIcons[i].dataSource = s[0];
                        this._compositeIcons[i].labCount.text = bagCount + "/" + needCount;
                        this._compositeIcons[i].labCount.textColor = bagCount >= needCount ? 0x00ff00 : 0xff0000;
                    }
                }
            };
            AncientEquipCompositeAlert.prototype.linkHandler = function (e) {
                if (e.target == this.labGet0) {
                    //mg.alertManager.showAlert(PropOfSourceAlert, true, true, 330001);//远古装备获得途径
                }
                else if (e.target == this.labGet1) {
                    //mg.alertManager.showAlert(PropOfSourceAlert, true, true, 215901);//道具获得途径
                }
            };
            AncientEquipCompositeAlert.prototype.compositeHandler = function (e) {
                GameModels.equip.requesHeChengNewEquips(this._rolePos, this._eqiupPos, utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.C_HCCG);
                    this.dispatchEventWith(egret.Event.CLOSE);
                }));
            };
            AncientEquipCompositeAlert.prototype.onClose = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            return AncientEquipCompositeAlert;
        }(ui.AncientEquipCompositeAlertSkin));
        role.AncientEquipCompositeAlert = AncientEquipCompositeAlert;
        __reflect(AncientEquipCompositeAlert.prototype, "dialog.role.AncientEquipCompositeAlert", ["IAlert", "egret.DisplayObject"]);
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));

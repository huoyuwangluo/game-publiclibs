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
        var AncientEquipDressDialog = (function (_super) {
            __extends(AncientEquipDressDialog, _super);
            function AncientEquipDressDialog() {
                return _super.call(this) || this;
            }
            AncientEquipDressDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            AncientEquipDressDialog.prototype.enter = function (rolePos, eqiup) {
                this._rolePos = rolePos;
                this._eqiupPos = eqiup.pos;
                this._eqiup = eqiup;
                var bagEquips = GameModels.bag.getEquipsByPos(eqiup.pos);
                if (eqiup.refId && this._eqiup.type != TypeEquip.JICHU_EQIUP) {
                    bagEquips.unshift(eqiup);
                }
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(bagEquips);
                }
                else {
                    this._listData.source = bagEquips;
                }
                this.list.dataProvider = this._listData;
                this.labNoDec.visible = bagEquips.length <= 0;
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
            };
            AncientEquipDressDialog.prototype.exit = function () {
                this.clearList(this.list);
                this._listData = null;
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
            };
            AncientEquipDressDialog.prototype.listHandler = function (e) {
                var _this = this;
                var items = GameModels.equip.useNewEquips;
                if (e.target instanceof components.SnapButton) {
                    var data = this.list.selectedItem;
                    if (items.indexOf(data) != -1) {
                        GameModels.equip.requesVailNewEquips(this._rolePos, this._eqiupPos, utils.Handler.create(this, function () {
                            mg.alertManager.tip(Language.C_XXCG);
                            mg.uiManager.remove(_this);
                        }));
                    }
                    else {
                        var pet = GameModels.pet.getFormatUpVOByPos(this._rolePos);
                        if (pet && pet.star < 7 && this._eqiupPos >= TypeEquip.JIUQU_EQIUP_START_POS && this._eqiupPos <= TypeEquip.JIUQU_EQIUP_END_POS) {
                            mg.alertManager.tip(Language.J_7XCKYZD);
                            return;
                        }
                        if (pet && pet.star < 8 && this._eqiupPos >= TypeEquip.LIUDAO_EQIUP_START_POS && this._eqiupPos <= TypeEquip.LIUDAO_EQIUP_END_POS) {
                            mg.alertManager.tip(Language.J_8XCKYZD);
                            return;
                        }
                        GameModels.equip.requesDressNewEquips(this._rolePos, this._eqiupPos, data.index, utils.Handler.create(this, function () {
                            mg.alertManager.tip(Language.C_ZBCG);
                            mg.uiManager.remove(_this);
                        }));
                    }
                }
            };
            return AncientEquipDressDialog;
        }(ui.AncientEquipDressDialogSkin));
        role.AncientEquipDressDialog = AncientEquipDressDialog;
        __reflect(AncientEquipDressDialog.prototype, "dialog.role.AncientEquipDressDialog");
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));

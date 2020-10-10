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
        var AncientPetTuiJianTeam = (function (_super) {
            __extends(AncientPetTuiJianTeam, _super);
            function AncientPetTuiJianTeam() {
                return _super.call(this) || this;
            }
            AncientPetTuiJianTeam.prototype.show = function () {
                var teamTmp = Templates.getList(templates.Map.GENERALREC);
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(teamTmp);
                }
                else {
                    this._listData.source = teamTmp;
                }
                this.list.dataProvider = this._listData;
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            };
            AncientPetTuiJianTeam.prototype.onClose = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            AncientPetTuiJianTeam.prototype.hide = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.clearList(this.list);
                this._listData = null;
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return AncientPetTuiJianTeam;
        }(ui.AncientPetTuiJianTeamSkin));
        role.AncientPetTuiJianTeam = AncientPetTuiJianTeam;
        __reflect(AncientPetTuiJianTeam.prototype, "dialog.role.AncientPetTuiJianTeam", ["IAlert", "egret.DisplayObject"]);
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));

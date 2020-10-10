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
        var liLian;
        (function (liLian) {
            var RoleShenBingTalentTips = (function (_super) {
                __extends(RoleShenBingTalentTips, _super);
                function RoleShenBingTalentTips() {
                    return _super.call(this) || this;
                }
                RoleShenBingTalentTips.prototype.show = function (talent, armsname, openstar, star, general) {
                    if (talent) {
                        var temp = Templates.getTemplateById(templates.Map.GENERAL, general);
                        this.imgIcon.source = talent.icon;
                        this.labName.text = talent.name;
                        this.labBelong.text = temp.name;
                        this.labBelong.textColor = TypeQuality.getQualityColor(temp.quality);
                        this.labContent.textFlow = utils.TextFlowMaker.generateTextFlow(talent.desc);
                        if (star <= 0) {
                            this.labNeed.text = Language.C_JHTJ + ":";
                            this.labNeedContent.text = Language.getExpression(Language.E_SBZSTFJH, armsname, openstar);
                        }
                        else {
                            this.labNeed.text = Language.J_SJTJ + ":";
                            if (star >= 10) {
                                this.labNeedContent.text = Language.C_YMJ;
                            }
                            else {
                                this.labNeedContent.text = Language.getExpression(Language.E_SBZSTFSJ, armsname, openstar);
                            }
                        }
                    }
                    this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                };
                RoleShenBingTalentTips.prototype.onClose = function (evt) {
                    this.dispatchEventWith(egret.Event.CLOSE);
                };
                RoleShenBingTalentTips.prototype.hide = function () {
                    this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                };
                return RoleShenBingTalentTips;
            }(ui.RoleShenBingTalentTipsSkin));
            liLian.RoleShenBingTalentTips = RoleShenBingTalentTips;
            __reflect(RoleShenBingTalentTips.prototype, "dialog.role.liLian.RoleShenBingTalentTips", ["IAlert", "egret.DisplayObject"]);
        })(liLian = role.liLian || (role.liLian = {}));
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));

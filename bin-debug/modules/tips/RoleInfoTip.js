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
    var RoleInfoTip = (function (_super) {
        __extends(RoleInfoTip, _super);
        function RoleInfoTip() {
            return _super.call(this) || this;
        }
        Object.defineProperty(RoleInfoTip.prototype, "data", {
            set: function (data) {
                var voData;
                if (data)
                    voData = data;
                else
                    voData = GameModels.user.player;
                if (voData instanceof vo.GamePlayerVO) {
                    this.labName.text = voData.name;
                    this.jobGroup.visible = false;
                }
                else {
                    this.jobGroup.visible = true;
                    this.labName.text = GameModels.pet.getFormatUpVO(voData.petId).name;
                    var job = TypeJob.getJobName(GameModels.pet.getFormatUpVO(voData.petId).template.job);
                    this.labJob.text = "";
                    this.labJobContent.text = "  ";
                }
                this.labBJ.text = "" + (voData.getProperty(TypeProperty.Crit) * .01).toFixed(2) + "%";
                this.labBJDK.text = "" + (voData.getProperty(TypeProperty.IgnoreCritInjure) * .01).toFixed(2) + "%";
                this.labBJSH.text = "" + (voData.getProperty(TypeProperty.CritInjure) * .01).toFixed(2) + "%";
                this.labGJ.text = "" + voData.getProperty(TypeProperty.PAtk);
                this.labKB.text = "" + (voData.getProperty(TypeProperty.IgnoreCrit) * .01).toFixed(2) + "%";
                this.labMZ.text = "" + (voData.getProperty(TypeProperty.Hit) * .01).toFixed(2) + "%";
                this.labSB.text = "" + (voData.getProperty(TypeProperty.Dodge) * .01).toFixed(2) + "%";
                this.labSHJM.text = "" + (voData.getProperty(TypeProperty.InjureIgnore) * .01).toFixed(2) + "%";
                this.labSHJS.text = "" + (voData.getProperty(TypeProperty.InjureAdd) * .01).toFixed(2) + "%";
                this.labSM.text = "" + voData.getProperty(TypeProperty.MaxHp);
                this.labWF.text = "" + voData.getProperty(TypeProperty.PDef);
                this.labWFCT.text = "" + voData.getProperty(TypeProperty.IgnorePDef);
            },
            enumerable: true,
            configurable: true
        });
        RoleInfoTip.prototype.removeSelf = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return RoleInfoTip;
    }(ui.RoleInfoTipSkin));
    tips.RoleInfoTip = RoleInfoTip;
    __reflect(RoleInfoTip.prototype, "tips.RoleInfoTip", ["ITipLogic", "egret.DisplayObject"]);
})(tips || (tips = {}));

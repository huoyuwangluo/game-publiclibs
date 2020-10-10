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
var tipUps;
(function (tipUps) {
    var PropertyTips = (function (_super) {
        __extends(PropertyTips, _super);
        function PropertyTips() {
            return _super.call(this) || this;
        }
        Object.defineProperty(PropertyTips.prototype, "data", {
            set: function (data) {
                var property = data.proper;
                var refId = data.refId;
                this.labCRI.text = "" + ((property[TypeProperty.Crit] ? property[TypeProperty.Crit] : 0) * .01).toFixed(2) + "%";
                this.labANTICRIDMG.text = "" + ((property[TypeProperty.IgnoreCritInjure] ? property[TypeProperty.IgnoreCritInjure] : 0) * .01).toFixed(2) + "%";
                this.labCRIDMG.text = "" + ((property[TypeProperty.CritInjure] ? property[TypeProperty.CritInjure] : 0) * .01).toFixed(2) + "%";
                this.labATT.text = "" + property[TypeProperty.PAtk] ? property[TypeProperty.PAtk] : 0;
                this.labANTICRI.text = "" + ((property[TypeProperty.IgnoreCrit] ? property[TypeProperty.IgnoreCrit] : 0) * .01).toFixed(2) + "%";
                this.labHIT.text = "" + ((property[TypeProperty.Hit] ? property[TypeProperty.Hit] : 0) * .01).toFixed(2) + "%";
                this.labEVD.text = "" + ((property[TypeProperty.Dodge] ? property[TypeProperty.Dodge] : 0) * .01).toFixed(2) + "%";
                this.labDMGREDU.text = "" + ((property[TypeProperty.InjureIgnore] ? property[TypeProperty.InjureIgnore] : 0) * .01).toFixed(2) + "%";
                this.labDMGINCR.text = "" + ((property[TypeProperty.InjureAdd] ? property[TypeProperty.InjureAdd] : 0) * .01).toFixed(2) + "%";
                this.labHP.text = "" + (property[TypeProperty.MaxHp] ? property[TypeProperty.MaxHp] : 0);
                this.labDEF.text = "" + (property[TypeProperty.PDef] ? property[TypeProperty.PDef] : 0);
                this.labCROSS.text = "" + (property[TypeProperty.IgnorePDef] ? property[TypeProperty.IgnorePDef] : 0);
                this.labIGNORECTRL.text = "" + (property[TypeProperty.IgnoreCtrl] ? property[TypeProperty.IgnoreCtrl] : 0);
                this.labHEAL.text = "" + (property[TypeProperty.Heal] ? property[TypeProperty.Heal] : 0);
                this.labCTRL.text = "" + (property[TypeProperty.Ctrl] ? property[TypeProperty.Ctrl] : 0);
                this.labBEHEAL.text = "" + (property[TypeProperty.BeHeal] ? property[TypeProperty.BeHeal] : 0);
                var petTmp = Templates.getTemplateById(templates.Map.GENERAL, refId);
                if (petTmp)
                    this.labMP.text = "" + ((property[TypeProperty.MaxMp] ? property[TypeProperty.MaxMp] : 0) + 500) + "/" + petTmp.skillMP;
            },
            enumerable: true,
            configurable: true
        });
        PropertyTips.prototype.removeSelf = function () {
            mg.TipUpManager.instance.setCurrent();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PropertyTips;
    }(ui.PropertyTipsSkin));
    tipUps.PropertyTips = PropertyTips;
    __reflect(PropertyTips.prototype, "tipUps.PropertyTips", ["ITipLogic", "egret.DisplayObject"]);
})(tipUps || (tipUps = {}));

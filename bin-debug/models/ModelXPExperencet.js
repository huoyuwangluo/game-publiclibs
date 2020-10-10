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
var mo;
(function (mo) {
    var ModelXPExperencet = (function (_super) {
        __extends(ModelXPExperencet, _super);
        function ModelXPExperencet() {
            return _super.call(this) || this;
        }
        ModelXPExperencet.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            GameModels.user.player.onPropertyChange(TypeProperty.XP_EXPERIENCET_TIME, this, this.updataXPTime);
        };
        ModelXPExperencet.prototype.updataXPTime = function () {
            logger.log("开始xp体验时间", GameModels.user.player.xpExperiencetTime);
            //this.dispatchEventWith(ModelXPExperencet.UPDATA_XP_TIME);
            //if (GameModels.user.player.vip < 3) mg.alertManager.showAlert(dialog.xpExperencet.xpExperencetMain, true, true, false);
        };
        ModelXPExperencet.UPDATA_XP_TIME = "UPDATA_XP_TIME";
        return ModelXPExperencet;
    }(mo.ModelBase));
    mo.ModelXPExperencet = ModelXPExperencet;
    __reflect(ModelXPExperencet.prototype, "mo.ModelXPExperencet");
})(mo || (mo = {}));

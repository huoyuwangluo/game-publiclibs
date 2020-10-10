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
    var ModelSysNotice = (function (_super) {
        __extends(ModelSysNotice, _super);
        function ModelSysNotice() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModelSysNotice.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.onRoute(n.MessageMap.G2C_SYSTEM_POPMSG, utils.Handler.create(this, function (data) {
                mg.alertManager.showAlert(SystemAlert, false, true, data.Msg ? data.Msg : "");
            }));
        };
        return ModelSysNotice;
    }(mo.ModelBase));
    mo.ModelSysNotice = ModelSysNotice;
    __reflect(ModelSysNotice.prototype, "mo.ModelSysNotice");
})(mo || (mo = {}));

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
    var ModelLegionBoss = (function (_super) {
        __extends(ModelLegionBoss, _super);
        function ModelLegionBoss() {
            return _super.call(this) || this;
        }
        ModelLegionBoss.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        ModelLegionBoss.prototype.checkLegoinBoss = function () {
            return false;
        };
        return ModelLegionBoss;
    }(mo.ModelBase));
    mo.ModelLegionBoss = ModelLegionBoss;
    __reflect(ModelLegionBoss.prototype, "mo.ModelLegionBoss");
})(mo || (mo = {}));

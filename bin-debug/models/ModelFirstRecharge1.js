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
    var ModelFirstRecharge1 = (function (_super) {
        __extends(ModelFirstRecharge1, _super);
        function ModelFirstRecharge1() {
            return _super.call(this) || this;
        }
        ModelFirstRecharge1.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._firstRechargeIndex = 0;
            this._clickFirstRecharge = false;
            this._hashFirstRecharge = false;
        };
        Object.defineProperty(ModelFirstRecharge1.prototype, "firstRechargeIndex", {
            get: function () {
                return this._firstRechargeIndex;
            },
            set: function (v) {
                this._firstRechargeIndex = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelFirstRecharge1.prototype, "clickFirstRecharge", {
            get: function () {
                return this._clickFirstRecharge;
            },
            set: function (v) {
                this._clickFirstRecharge = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelFirstRecharge1.prototype, "hashFirstRecharge", {
            get: function () {
                return this._hashFirstRecharge;
            },
            set: function (v) {
                this._hashFirstRecharge = v;
            },
            enumerable: true,
            configurable: true
        });
        return ModelFirstRecharge1;
    }(mo.ModelBase));
    mo.ModelFirstRecharge1 = ModelFirstRecharge1;
    __reflect(ModelFirstRecharge1.prototype, "mo.ModelFirstRecharge1");
})(mo || (mo = {}));

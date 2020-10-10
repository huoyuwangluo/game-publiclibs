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
    var ModelWorld = (function (_super) {
        __extends(ModelWorld, _super);
        function ModelWorld() {
            return _super.call(this) || this;
        }
        ModelWorld.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        ModelWorld.prototype.initializeData = function (data) {
            this._isKuaFuOpen = data.IsKuaFuOpen;
        };
        Object.defineProperty(ModelWorld.prototype, "isKuaFuOpen", {
            get: function () {
                return this._isKuaFuOpen;
            },
            enumerable: true,
            configurable: true
        });
        return ModelWorld;
    }(mo.ModelBase));
    mo.ModelWorld = ModelWorld;
    __reflect(ModelWorld.prototype, "mo.ModelWorld");
})(mo || (mo = {}));

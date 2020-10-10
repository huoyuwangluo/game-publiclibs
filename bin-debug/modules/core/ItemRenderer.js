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
var base;
(function (base) {
    var ItemRenderer = (function (_super) {
        __extends(ItemRenderer, _super);
        function ItemRenderer() {
            return _super.call(this) || this;
        }
        ItemRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initialize();
        };
        ItemRenderer.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        ItemRenderer.prototype.reset = function () { };
        Object.defineProperty(ItemRenderer.prototype, "data", {
            get: function () {
                return egret.superGetter(ItemRenderer, this, "data");
            },
            set: function (value) {
                egret.superSetter(ItemRenderer, this, "data", value);
                if (!value) {
                    this.reset();
                }
            },
            enumerable: true,
            configurable: true
        });
        return ItemRenderer;
    }(eui.ItemRenderer));
    base.ItemRenderer = ItemRenderer;
    __reflect(ItemRenderer.prototype, "base.ItemRenderer");
})(base || (base = {}));

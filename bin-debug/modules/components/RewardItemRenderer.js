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
var components;
(function (components) {
    var RewardItemRenderer = (function (_super) {
        __extends(RewardItemRenderer, _super);
        function RewardItemRenderer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._selected = false;
            _this.itemIndex = -1;
            return _this;
        }
        RewardItemRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        Object.defineProperty(RewardItemRenderer.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
                this.dataChanged();
            },
            enumerable: true,
            configurable: true
        });
        RewardItemRenderer.prototype.dataChanged = function () {
            if (this._data) {
                this.updateHandler(this._data);
            }
            else {
                this.reset();
            }
        };
        Object.defineProperty(RewardItemRenderer.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                if (this._selected == value)
                    return;
                this._selected = value;
                this.invalidateState();
            },
            enumerable: true,
            configurable: true
        });
        return RewardItemRenderer;
    }(components.RewardItemBox));
    components.RewardItemRenderer = RewardItemRenderer;
    __reflect(RewardItemRenderer.prototype, "components.RewardItemRenderer", ["eui.IItemRenderer", "eui.UIComponent", "egret.DisplayObject"]);
})(components || (components = {}));

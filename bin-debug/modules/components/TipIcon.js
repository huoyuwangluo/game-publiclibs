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
/**
 * @class TipIcon
 *
 * 所有图标显示的基类
 * 子类有 ItemIcon RewardItemBox NormalItemSkin EquipBoxSkin.
 * 其中ItemIcon,RewardItemBox为背包图标显示和奖励图标显示的基础控件.
 * 但是背包实际在使用的是继承自ItemIcon的ui.ItemIconSkin的子类ItemIconRenderer.
 * 剩下的NormalItemSkin,EquipBoxSkin为exml生成的视图类，其对应的子类NormalItem和EquipBox为实际使用的控件.
 * 此类是历史遗留问题造成的晦涩且繁琐的继承关系，由于已经广泛使用且涉及exml界面里面的大量引用，牵扯面太大，重构难度大.
 * 以后有机会在全部重构
 */
var item;
(function (item) {
    var TipIcon = (function (_super) {
        __extends(TipIcon, _super);
        function TipIcon() {
            var _this = _super.call(this) || this;
            _this._tipEnabled = true;
            return _this;
        }
        Object.defineProperty(TipIcon.prototype, "tipEnabled", {
            get: function () {
                return this._data && this._tipEnabled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TipIcon.prototype, "tipData", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TipIcon.prototype, "tipClass", {
            get: function () {
                return (this._data && this._data.mainType == TypeItem.EQUIP) ? tips.EquipTip : tips.PropTip;
            },
            enumerable: true,
            configurable: true
        });
        return TipIcon;
    }(base.View));
    item.TipIcon = TipIcon;
    __reflect(TipIcon.prototype, "item.TipIcon");
})(item || (item = {}));

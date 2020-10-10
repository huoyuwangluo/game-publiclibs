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
var ui;
(function (ui) {
    var BagXuemaiCheckBoxSkin = (function (_super) {
        __extends(BagXuemaiCheckBoxSkin, _super);
        function BagXuemaiCheckBoxSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.BagXuemaiCheckBoxSkin';
            return _this;
        }
        return BagXuemaiCheckBoxSkin;
    }(base.ItemRenderer));
    ui.BagXuemaiCheckBoxSkin = BagXuemaiCheckBoxSkin;
    __reflect(BagXuemaiCheckBoxSkin.prototype, "ui.BagXuemaiCheckBoxSkin");
})(ui || (ui = {}));

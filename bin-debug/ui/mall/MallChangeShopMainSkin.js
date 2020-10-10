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
    var MallChangeShopMainSkin = (function (_super) {
        __extends(MallChangeShopMainSkin, _super);
        function MallChangeShopMainSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'MallChangeShopMainSkin';
            return _this;
        }
        return MallChangeShopMainSkin;
    }(base.View));
    ui.MallChangeShopMainSkin = MallChangeShopMainSkin;
    __reflect(MallChangeShopMainSkin.prototype, "ui.MallChangeShopMainSkin");
})(ui || (ui = {}));

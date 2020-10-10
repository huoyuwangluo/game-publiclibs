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
    var DonateRankSkin = (function (_super) {
        __extends(DonateRankSkin, _super);
        function DonateRankSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'DonateRankSkin';
            return _this;
        }
        return DonateRankSkin;
    }(base.View));
    ui.DonateRankSkin = DonateRankSkin;
    __reflect(DonateRankSkin.prototype, "ui.DonateRankSkin");
})(ui || (ui = {}));

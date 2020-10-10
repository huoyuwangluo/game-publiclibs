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
    var sgActivityLimitMainDialog1Skin = (function (_super) {
        __extends(sgActivityLimitMainDialog1Skin, _super);
        function sgActivityLimitMainDialog1Skin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'sgActivityLimitMainDialog1Skin';
            return _this;
        }
        return sgActivityLimitMainDialog1Skin;
    }(base.View));
    ui.sgActivityLimitMainDialog1Skin = sgActivityLimitMainDialog1Skin;
    __reflect(sgActivityLimitMainDialog1Skin.prototype, "ui.sgActivityLimitMainDialog1Skin");
})(ui || (ui = {}));

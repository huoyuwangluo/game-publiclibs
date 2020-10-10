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
    var activityLimitTable2Skin = (function (_super) {
        __extends(activityLimitTable2Skin, _super);
        function activityLimitTable2Skin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'activityLimitTable2Skin';
            return _this;
        }
        return activityLimitTable2Skin;
    }(base.View));
    ui.activityLimitTable2Skin = activityLimitTable2Skin;
    __reflect(activityLimitTable2Skin.prototype, "ui.activityLimitTable2Skin");
})(ui || (ui = {}));

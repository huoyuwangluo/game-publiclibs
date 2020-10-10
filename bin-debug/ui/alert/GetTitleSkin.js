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
    var GetTitleSkin = (function (_super) {
        __extends(GetTitleSkin, _super);
        function GetTitleSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'GetTitleSkin';
            return _this;
        }
        return GetTitleSkin;
    }(base.View));
    ui.GetTitleSkin = GetTitleSkin;
    __reflect(GetTitleSkin.prototype, "ui.GetTitleSkin");
})(ui || (ui = {}));

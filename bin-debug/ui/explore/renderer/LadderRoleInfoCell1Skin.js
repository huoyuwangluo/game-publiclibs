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
    var LadderRoleInfoCell1Skin = (function (_super) {
        __extends(LadderRoleInfoCell1Skin, _super);
        function LadderRoleInfoCell1Skin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.LadderRoleInfoCell1Skin';
            return _this;
        }
        return LadderRoleInfoCell1Skin;
    }(base.ItemRenderer));
    ui.LadderRoleInfoCell1Skin = LadderRoleInfoCell1Skin;
    __reflect(LadderRoleInfoCell1Skin.prototype, "ui.LadderRoleInfoCell1Skin");
})(ui || (ui = {}));

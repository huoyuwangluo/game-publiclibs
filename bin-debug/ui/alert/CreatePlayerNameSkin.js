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
    var CreatePlayerNameSkin = (function (_super) {
        __extends(CreatePlayerNameSkin, _super);
        function CreatePlayerNameSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'CreatePlayerNameSkin';
            return _this;
        }
        return CreatePlayerNameSkin;
    }(base.View));
    ui.CreatePlayerNameSkin = CreatePlayerNameSkin;
    __reflect(CreatePlayerNameSkin.prototype, "ui.CreatePlayerNameSkin");
})(ui || (ui = {}));

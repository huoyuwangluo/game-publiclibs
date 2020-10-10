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
    var HuoDongTaskSkin = (function (_super) {
        __extends(HuoDongTaskSkin, _super);
        function HuoDongTaskSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'normal.XiaRiLeiChongSkin';
            return _this;
        }
        return HuoDongTaskSkin;
    }(base.View));
    ui.HuoDongTaskSkin = HuoDongTaskSkin;
    __reflect(HuoDongTaskSkin.prototype, "ui.HuoDongTaskSkin");
})(ui || (ui = {}));

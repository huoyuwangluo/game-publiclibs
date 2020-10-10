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
    var LadderViewRecordRendererSkin = (function (_super) {
        __extends(LadderViewRecordRendererSkin, _super);
        function LadderViewRecordRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.LadderViewRecordRendererSkin';
            return _this;
        }
        return LadderViewRecordRendererSkin;
    }(base.ItemRenderer));
    ui.LadderViewRecordRendererSkin = LadderViewRecordRendererSkin;
    __reflect(LadderViewRecordRendererSkin.prototype, "ui.LadderViewRecordRendererSkin");
})(ui || (ui = {}));

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
    var jiuguanAndzongshenRendererSkin = (function (_super) {
        __extends(jiuguanAndzongshenRendererSkin, _super);
        function jiuguanAndzongshenRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.jiuguanAndzongshenRendererSkin';
            return _this;
        }
        return jiuguanAndzongshenRendererSkin;
    }(base.ItemRenderer));
    ui.jiuguanAndzongshenRendererSkin = jiuguanAndzongshenRendererSkin;
    __reflect(jiuguanAndzongshenRendererSkin.prototype, "ui.jiuguanAndzongshenRendererSkin");
})(ui || (ui = {}));

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
var renderer;
(function (renderer) {
    var WelfareGameBookRenderer = (function (_super) {
        __extends(WelfareGameBookRenderer, _super);
        function WelfareGameBookRenderer() {
            var _this = _super.call(this) || this;
            _this._stars = [_this.star_1, _this.star_2, _this.star_3, _this.star_4, _this.star_5];
            return _this;
        }
        WelfareGameBookRenderer.prototype.dataChanged = function () {
            if (this.data) {
                var data = this.data;
                this.imgQ.source = "qualityBg_json.img_head_1_png";
                this.head.source = "taskicon_json." + data.icon;
                for (var i = 0; i < this._stars.length; i++) {
                    this._stars[i].visible = (i < data.starLv) ? true : false;
                }
                this.starGroup.x = 58 - data.starLv * 10;
                this.labPetName.text = data.name;
            }
        };
        return WelfareGameBookRenderer;
    }(ui.WelfareGameBookRendererSkin));
    renderer.WelfareGameBookRenderer = WelfareGameBookRenderer;
    __reflect(WelfareGameBookRenderer.prototype, "renderer.WelfareGameBookRenderer");
})(renderer || (renderer = {}));

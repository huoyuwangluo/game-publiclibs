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
var components;
(function (components) {
    var SoundSlider = (function (_super) {
        __extends(SoundSlider, _super);
        function SoundSlider() {
            return _super.call(this) || this;
        }
        SoundSlider.prototype.updateSkinDisplayList = function () {
            _super.prototype.updateSkinDisplayList.call(this);
            if (this.progress) {
                this.progress.width = this.thumb.x + this.thumb.width / 2 - this.progress.x;
            }
        };
        return SoundSlider;
    }(eui.HSlider));
    components.SoundSlider = SoundSlider;
    __reflect(SoundSlider.prototype, "components.SoundSlider");
})(components || (components = {}));

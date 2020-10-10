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
    var LadderIconItem = (function (_super) {
        __extends(LadderIconItem, _super);
        function LadderIconItem() {
            return _super.call(this) || this;
        }
        LadderIconItem.prototype.setIcon = function (icon, quality) {
            if (quality) {
                this.imgOrder.source = ResPath.getQuality(quality);
            }
            this.imgPlayer.source = icon;
        };
        return LadderIconItem;
    }(ui.LadderIconSkin));
    renderer.LadderIconItem = LadderIconItem;
    __reflect(LadderIconItem.prototype, "renderer.LadderIconItem");
})(renderer || (renderer = {}));

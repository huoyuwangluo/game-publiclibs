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
    var PrivateChatHeadCell = (function (_super) {
        __extends(PrivateChatHeadCell, _super);
        function PrivateChatHeadCell() {
            return _super.call(this) || this;
        }
        PrivateChatHeadCell.prototype.dataChanged = function () {
            if (this.data) {
                var data = this.data;
                this.imgHead1.source = ResPath.getPlayerIconSmall(data.headIcon);
                this.labPlayerName.text = this.data.PlayerName;
                if (data.isNew) {
                    this.iconRed.visible = true;
                }
                else {
                    this.iconRed.visible = false;
                }
                if (this.data.Time > 0) {
                    this.imgHead1.filters = utils.filterUtil.grayFilters;
                }
                else {
                    this.imgHead1.filters = null;
                }
            }
            else {
                this.imgHead1.source = null;
            }
        };
        return PrivateChatHeadCell;
    }(ui.PrivateChatHeadCellSkin));
    renderer.PrivateChatHeadCell = PrivateChatHeadCell;
    __reflect(PrivateChatHeadCell.prototype, "renderer.PrivateChatHeadCell");
})(renderer || (renderer = {}));

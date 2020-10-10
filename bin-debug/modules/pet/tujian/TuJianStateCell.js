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
    var TuJianStateCell = (function (_super) {
        __extends(TuJianStateCell, _super);
        function TuJianStateCell() {
            return _super.call(this) || this;
        }
        TuJianStateCell.prototype.dataChanged = function () {
            this.imgIcon.source = this.data.resId;
            this.imgRedPoint.visible = this.data.isRed;
        };
        return TuJianStateCell;
    }(ui.TuJianStateCellSkin));
    renderer.TuJianStateCell = TuJianStateCell;
    __reflect(TuJianStateCell.prototype, "renderer.TuJianStateCell");
})(renderer || (renderer = {}));

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
var item;
(function (item) {
    var FloorItem = (function (_super) {
        __extends(FloorItem, _super);
        function FloorItem() {
            var _this = _super.call(this) || this;
            _this.CENTRALITY_X = 138;
            _this.CENTRALITY_Y = 210;
            return _this;
        }
        FloorItem.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            // this.img.scaleX = this.img.scaleY = 0.8;
        };
        FloorItem.prototype.updateData = function (vo) {
            this.img.source = ResPath.getShowPetPath(vo.bossShowId); //ResPath.getShowBossPath(vo.bossShowId);
            // var point: any = GameModels.copyBoss.getShowPoint(vo.bossShowId);
            // if(!point)point = GameModels.copyBoss.getShowPoint("2504");
            // this.img.x = this.CENTRALITY_X + (point.x - 600) * 0.8;
            // this.img.y = this.CENTRALITY_Y + (point.y - 600) * 0.8;
            this.labFloor.text = Language.getExpression(Language.E_D1G, vo.template.step);
        };
        FloorItem.prototype.clearData = function () {
            this.img.source = null;
            this.labFloor.text = "";
        };
        FloorItem.prototype.addSelect = function (display) {
            this.addChildAt(display, 0);
        };
        Object.defineProperty(FloorItem.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            enumerable: true,
            configurable: true
        });
        return FloorItem;
    }(ui.FloorItemSkin));
    item.FloorItem = FloorItem;
    __reflect(FloorItem.prototype, "item.FloorItem");
})(item || (item = {}));

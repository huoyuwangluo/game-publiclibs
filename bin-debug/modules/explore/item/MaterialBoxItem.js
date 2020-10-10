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
(function (item_1) {
    var MaterialBoxItem = (function (_super) {
        __extends(MaterialBoxItem, _super);
        function MaterialBoxItem() {
            var _this = _super.call(this) || this;
            _this._selected = null;
            _this.touchChildren = false;
            return _this;
        }
        MaterialBoxItem.prototype.dataChange = function () {
            if (this._dataSource) {
                var item = this._dataSource;
                this.labName.text = item.name;
                this.icon.source = item.icon;
                // this.labNum.text = copyVO.template.dropShow.split("_")[1];
            }
            else {
                this.labName.text = "";
                this.icon.source = null;
            }
        };
        return MaterialBoxItem;
    }(ui.MaterialBoxSkin));
    item_1.MaterialBoxItem = MaterialBoxItem;
    __reflect(MaterialBoxItem.prototype, "item.MaterialBoxItem");
})(item || (item = {}));

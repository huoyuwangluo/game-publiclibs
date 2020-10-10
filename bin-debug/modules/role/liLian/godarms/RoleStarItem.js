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
    var RoleStarItem = (function (_super) {
        __extends(RoleStarItem, _super);
        function RoleStarItem() {
            var _this = _super.call(this) || this;
            _this._stars = [_this.imgStar1, _this.imgStar2, _this.imgStar3, _this.imgStar4, _this.imgStar5,
                _this.imgStar6, _this.imgStar7, _this.imgStar8, _this.imgStar9, _this.imgStar10];
            return _this;
        }
        RoleStarItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        RoleStarItem.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        RoleStarItem.prototype.setStar = function (num) {
            for (var i = 0; i < this._stars.length; i++) {
                this._stars[i].visible = (i < num) ? true : false;
            }
        };
        return RoleStarItem;
    }(ui.RoleStarItemSkin));
    item.RoleStarItem = RoleStarItem;
    __reflect(RoleStarItem.prototype, "item.RoleStarItem");
})(item || (item = {}));

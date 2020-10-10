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
    var RolePhantomStar = (function (_super) {
        __extends(RolePhantomStar, _super);
        function RolePhantomStar() {
            var _this = _super.call(this) || this;
            _this._stars = [_this.star1, _this.star2, _this.star3, _this.star4, _this.star5, _this.star6, _this.star7, _this.star8, _this.star9, _this.star10];
            return _this;
        }
        RolePhantomStar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        RolePhantomStar.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        //num是亮起来的星数，shownum是展示的星数
        RolePhantomStar.prototype.setStar = function (num, shownum) {
            if (shownum === void 0) { shownum = 10; }
            for (var i = 0; i < this._stars.length; i++) {
                if (i > shownum - 1) {
                    this._stars[i].visible = false;
                }
                else {
                    this._stars[i].visible = true;
                }
                if (i < num) {
                    this._stars[i].source = "role_json.role_phantom_star2_png";
                    this._stars[i].y = 3;
                }
                else {
                    this._stars[i].source = "role_json.role_phantom_star1_png";
                    this._stars[i].y = 0;
                }
            }
        };
        return RolePhantomStar;
    }(ui.RolePhantomStarSkin));
    item.RolePhantomStar = RolePhantomStar;
    __reflect(RolePhantomStar.prototype, "item.RolePhantomStar");
})(item || (item = {}));

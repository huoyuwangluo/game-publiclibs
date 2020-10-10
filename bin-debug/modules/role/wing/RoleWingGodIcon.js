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
    var RoleWingGodIcon = (function (_super) {
        __extends(RoleWingGodIcon, _super);
        function RoleWingGodIcon() {
            var _this = _super.call(this) || this;
            _this.touchChildren = false;
            return _this;
        }
        Object.defineProperty(RoleWingGodIcon.prototype, "nameStr", {
            set: function (value) {
                this.labName.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleWingGodIcon.prototype, "isWarn", {
            set: function (boo) {
                if (this.imgWarn.visible != boo) {
                    this.imgWarn.visible = boo;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleWingGodIcon.prototype, "iconSour", {
            set: function (value) {
                this.imgIcon.source = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleWingGodIcon.prototype, "quality", {
            set: function (value) {
                this.imgQuality.source = ResPath.getQuality(value);
                this.labName.textColor = TypeQuality.getQualityColor(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleWingGodIcon.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (value) {
                this._index = value;
            },
            enumerable: true,
            configurable: true
        });
        return RoleWingGodIcon;
    }(ui.RoleWingGodIconSkin));
    item.RoleWingGodIcon = RoleWingGodIcon;
    __reflect(RoleWingGodIcon.prototype, "item.RoleWingGodIcon");
})(item || (item = {}));

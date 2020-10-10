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
    var RoleWingTypeIcon = (function (_super) {
        __extends(RoleWingTypeIcon, _super);
        function RoleWingTypeIcon() {
            var _this = _super.call(this) || this;
            _this.touchChildren = false;
            return _this;
        }
        Object.defineProperty(RoleWingTypeIcon.prototype, "wingSource", {
            set: function (value) {
                this.imgWing.source = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleWingTypeIcon.prototype, "wingQuality", {
            set: function (value) {
                this.imgQuality.source = ResPath.getQuality(value);
                this.labName.textColor = TypeQuality.getQualityColor(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleWingTypeIcon.prototype, "nameLabel", {
            set: function (value) {
                this.labName.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleWingTypeIcon.prototype, "lv", {
            set: function (value) {
                this.labLv.text = Language.getExpression(Language.E_1J1, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleWingTypeIcon.prototype, "isWarn", {
            set: function (boo) {
                if (this.imgWarn.visible != boo) {
                    this.imgWarn.visible = boo;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleWingTypeIcon.prototype, "lvShow", {
            set: function (value) {
                if (this.labLv.visible != value) {
                    this.labLv.visible = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleWingTypeIcon.prototype, "nameShow", {
            set: function (value) {
                if (this.labName.visible != value) {
                    this.labName.visible = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleWingTypeIcon.prototype, "filter", {
            set: function (boo) {
                if (boo) {
                    this.imgWing.filters = null;
                    this.imgQuality.filters = null;
                    this.labName.filters = null;
                    this.labLv.filters = null;
                }
                else {
                    this.imgWing.filters = utils.filterUtil.grayFilters;
                    this.imgQuality.filters = utils.filterUtil.grayFilters;
                    this.labName.filters = utils.filterUtil.grayFilters;
                    this.labLv.filters = utils.filterUtil.grayFilters;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleWingTypeIcon.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (value) {
                this._index = value;
            },
            enumerable: true,
            configurable: true
        });
        return RoleWingTypeIcon;
    }(ui.RoleWingTypeIconSkin));
    item.RoleWingTypeIcon = RoleWingTypeIcon;
    __reflect(RoleWingTypeIcon.prototype, "item.RoleWingTypeIcon");
})(item || (item = {}));

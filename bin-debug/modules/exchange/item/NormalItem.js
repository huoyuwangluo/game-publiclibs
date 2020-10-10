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
    var NormalItem = (function (_super) {
        __extends(NormalItem, _super);
        function NormalItem() {
            var _this = _super.call(this) || this;
            _this.initialize();
            return _this;
        }
        NormalItem.prototype.initialize = function () {
            this.touchChildren = false;
        };
        NormalItem.prototype.updateData = function (tmp) {
            this._data = tmp;
            if (this._data) {
                this.imgIcon.source = ResPath.getItemIconKey(tmp.icon);
                this.imgQuality.source = ResPath.getQuality(tmp.quality);
                if (this._data.type == TypeItem.PET_TYPE) {
                    var pet = Templates.getTemplateById(templates.Map.GENERAL, this._data.id);
                    mg.TipManager.instance.bind(this, tips.GeneralInfoTip, pet);
                }
                else {
                    mg.TipManager.instance.bind(this, tips.PropTip, this._data);
                }
            }
            else {
                this.imgIcon.source = null;
                this.imgQuality.source = null;
                mg.TipManager.instance.unBind(this);
            }
        };
        Object.defineProperty(NormalItem.prototype, "tipClass", {
            get: function () {
                return this._data && tips.PropTip;
            },
            enumerable: true,
            configurable: true
        });
        return NormalItem;
    }(ui.NormalItemSkin));
    item.NormalItem = NormalItem;
    __reflect(NormalItem.prototype, "item.NormalItem");
})(item || (item = {}));

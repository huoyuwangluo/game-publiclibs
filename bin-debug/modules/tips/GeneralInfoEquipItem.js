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
    var GeneralInfoEquipItem = (function (_super) {
        __extends(GeneralInfoEquipItem, _super);
        function GeneralInfoEquipItem() {
            return _super.call(this) || this;
        }
        GeneralInfoEquipItem.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        GeneralInfoEquipItem.prototype.show = function (type, equips) {
            if (equips === void 0) { equips = []; }
            this.hide();
            this.imgType.source = "pet_json.img_equipType_" + type + "_png";
            if (equips.length > 0) {
                for (var i = 0; i < equips.length; i++) {
                    var equip = new renderer.ItemIconRenderer();
                    equip.scaleX = equip.scaleY = 0.8;
                    equip.data = equips[i];
                    this.equipGroup.addChild(equip);
                }
            }
        };
        GeneralInfoEquipItem.prototype.hide = function () {
            for (var z = this.equipGroup.numChildren; z >= 0; z--) {
                var btns = this.equipGroup.getChildAt(z);
                if (btns) {
                    this.equipGroup.removeChildAt(z);
                }
            }
        };
        return GeneralInfoEquipItem;
    }(ui.GeneralInfoEquipItemSkin));
    item.GeneralInfoEquipItem = GeneralInfoEquipItem;
    __reflect(GeneralInfoEquipItem.prototype, "item.GeneralInfoEquipItem");
})(item || (item = {}));

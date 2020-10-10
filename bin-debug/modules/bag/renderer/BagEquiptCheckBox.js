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
    var BagEquiptCheckBox = (function (_super) {
        __extends(BagEquiptCheckBox, _super);
        function BagEquiptCheckBox() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = true;
            _this.touchChildren = false;
            return _this;
        }
        BagEquiptCheckBox.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var equipt = this.data.templateEquip;
            this.labLv.text = vo.EquipVO.getStepName(equipt.lv);
            this.imgQuility.source = ResPath.getQuality(equipt.quality);
            this.imgIcon.source = ResPath.getItemIconKey(equipt.icon);
            this.checkboxPick.selected = this.data.pick;
            this.labScore.text = Language.C_PF + ":" + this.data.score;
        };
        Object.defineProperty(BagEquiptCheckBox.prototype, "pick", {
            set: function (value) {
                this.checkboxPick.selected = this.data.pick = value;
            },
            enumerable: true,
            configurable: true
        });
        return BagEquiptCheckBox;
    }(ui.BagEquiptCheckBoxSkin));
    renderer.BagEquiptCheckBox = BagEquiptCheckBox;
    __reflect(BagEquiptCheckBox.prototype, "renderer.BagEquiptCheckBox");
})(renderer || (renderer = {}));

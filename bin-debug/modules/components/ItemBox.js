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
/**
 * 自定義組件
 * 通用物品格子
 *          主要應該與 獎勵頁面，掉落頁面，等
 */
var components;
(function (components) {
    var ItemBox = (function (_super) {
        __extends(ItemBox, _super);
        function ItemBox() {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            _this.skinName = 'components.ItemBoxSkin';
            return _this;
        }
        ItemBox.prototype.initialize = function (data) {
            this.data = data;
        };
        ItemBox.prototype.reset = function () {
            this.data = null;
        };
        ItemBox.prototype.dataChanged = function () {
            // var itemVO:vo.ItemVO=this.data as vo.ItemVO;
            if (!!this.data && this.data instanceof vo.ItemVO) {
                this.updatePropDisplay(this.data, this.data.count);
            }
            else if (!!this.data && this.data instanceof vo.EquipVO) {
                this.updatePropDisplay(this.data, this.data.count);
            }
            else {
                if (this._resData) {
                    this._resData.offReference(this, this.updateAsset);
                    this._resData = null;
                }
                this.labCount.text = "";
                this.labName.text = "";
                this.icon.source = null;
            }
        };
        ItemBox.prototype.updatePropDisplay = function (data, count) {
            this.updateIcon(data.icon);
            this.updateQualityDisplay(data.quality);
            this.labName.text = data.name;
            this.labCount.visible = count > 1;
            this.labCount.text = "" + count;
        };
        ItemBox.prototype.updateIcon = function (id) {
            if (this._resData) {
                this._resData.offReference(this, this.updateAsset);
                this._resData = null;
            }
            this._resData = mg.assetsManager.getIconData(id);
            if (this._resData) {
                this._resData.holdReference(this, this.updateAsset);
            }
        };
        ItemBox.prototype.updateQualityDisplay = function (type) {
            if (!this.quality)
                return;
            this.quality.source = ResPath.getQuality(type);
        };
        ItemBox.prototype.updateAsset = function (texture) {
            this.icon.texture = texture;
        };
        return ItemBox;
    }(eui.ItemRenderer));
    components.ItemBox = ItemBox;
    __reflect(ItemBox.prototype, "components.ItemBox", ["utils.IPool"]);
})(components || (components = {}));

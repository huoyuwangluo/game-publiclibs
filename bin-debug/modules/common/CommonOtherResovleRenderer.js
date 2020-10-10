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
    var CommonOtherResovleRenderer = (function (_super) {
        __extends(CommonOtherResovleRenderer, _super);
        function CommonOtherResovleRenderer() {
            var _this = _super.call(this) || this;
            _this.btnFenjie.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.btnIconClick, _this);
            return _this;
        }
        CommonOtherResovleRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var item = this.data.tmp;
                this._caller = this.data.caller;
                this.labName.text = item.name;
                this.imgQuality.source = ResPath.getQuality(item.quality);
                this.imgIcon.source = item.icon;
                this.labCount.text = "" + this.data.num;
                var strArr = [];
                if (item.type == TypeItem.SHENBIN_PROP) {
                    var shenBingTemp = Templates.getTemplateById(templates.Map.SMITHYSHENBING, item.id);
                    strArr = shenBingTemp.split.split("_");
                }
                else {
                    if (item.splitItem) {
                        strArr = (item.splitItem).split("_");
                    }
                }
                var items = Templates.getTemplateById(templates.Map.ITEM, strArr[0]);
                this.labGet.text = items.name + "X" + strArr[1];
            }
        };
        CommonOtherResovleRenderer.prototype.btnIconClick = function (e) {
            var _this = this;
            GameModels.bag.requestResovle(2, this.data.tmp.index, 1, utils.Handler.create(this, function () {
                _this.updataList();
                mg.alertManager.tip(Language.C_FJCG);
            }));
        };
        CommonOtherResovleRenderer.prototype.updataList = function () {
            if (this._caller) {
                var view = this._caller;
                view.updateItems();
            }
        };
        return CommonOtherResovleRenderer;
    }(ui.CommonOtherResovleRendererSkin));
    renderer.CommonOtherResovleRenderer = CommonOtherResovleRenderer;
    __reflect(CommonOtherResovleRenderer.prototype, "renderer.CommonOtherResovleRenderer");
})(renderer || (renderer = {}));

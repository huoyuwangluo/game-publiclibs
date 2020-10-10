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
    var fashion;
    (function (fashion) {
        var TitleItem = (function (_super) {
            __extends(TitleItem, _super);
            function TitleItem() {
                return _super.call(this) || this;
            }
            TitleItem.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._listData = new eui.ArrayCollection();
            };
            TitleItem.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this.initType(data.type);
                GameModels.fashion.addEventListener(mo.ModelFashion.TITLE_ITEM_CHANGE, this.titleOnChange, this);
                this.btnForever.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tabOnClick, this);
                this.btnLimit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tabOnClick, this);
                this.listTitle.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTapHandler, this);
                n.net.request(n.MessageMap.C2G_TITLE_INFO, n.MessagePool.from(n.C2G_Title_Info), utils.Handler.create(this, this.net_titleInfo));
            };
            TitleItem.prototype.exit = function () {
                this.scrollerTitle.stopAnimation();
                this.clearList(this.listTitle);
                GameModels.fashion.isGuide = false;
                GameModels.fashion.guideId = null;
                GameModels.fashion.removeEventListener(mo.ModelFashion.TITLE_ITEM_CHANGE, this.titleOnChange, this);
                this.btnForever.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tabOnClick, this);
                this.btnLimit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tabOnClick, this);
                this.listTitle.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTapHandler, this);
            };
            TitleItem.prototype.net_titleInfo = function (data) {
                GameModels.fashion.updateTitleInfo(data);
                this._listData.source = this.sortTitleList(this._type);
                this.listTitle.dataProvider = this._listData;
            };
            TitleItem.prototype.sortTitleList = function (type) {
                var titleList = GameModels.fashion.getFashionData(type);
                titleList.sort(function (a, b) {
                    if (a.isActived && !b.isActived)
                        return -1;
                    else if (!a.isActived && b.isActived)
                        return 1;
                    else if (a.template.order < b.template.order)
                        return -1;
                    else if (a.template.order > b.template.order)
                        return 1;
                });
                return titleList;
            };
            TitleItem.prototype.initType = function (data) {
                this._type = data && data == TypeFashion.TITLE_LIMIT ? TypeFashion.TITLE_LIMIT : TypeFashion.TITLE_FOREVER;
                this.imgSelected.x = this._type == TypeFashion.TITLE_FOREVER ? this.btnForever.x : this.btnLimit.x;
            };
            TitleItem.prototype.tabOnClick = function (e) {
                this.imgSelected.x = e.target.x;
                switch (e.target) {
                    case this.btnForever:
                        this._type = TypeFashion.TITLE_FOREVER;
                        break;
                    case this.btnLimit:
                        this._type = TypeFashion.TITLE_LIMIT;
                        break;
                }
                this.selectedType();
            };
            TitleItem.prototype.selectedType = function () {
                this._listData.source = this.sortTitleList(this._type);
            };
            TitleItem.prototype.itemTapHandler = function (e) {
                var data = e.item;
                if (data.template.modelId == GameModels.fashion.guideId) {
                    GameModels.fashion.isGuide = false;
                    GameModels.fashion.guideId = null;
                }
                if (data.isDressed) {
                    GameModels.fashion.net_requestTitleUndress(data.id);
                }
                else {
                    GameModels.fashion.net_requestTitleDress(data.id);
                }
            };
            TitleItem.prototype.titleOnChange = function (e) {
                var data = e.data;
                this._listData.replaceAll(this.sortTitleList(data.type));
            };
            return TitleItem;
        }(ui.TitleItemSkin));
        fashion.TitleItem = TitleItem;
        __reflect(TitleItem.prototype, "item.fashion.TitleItem", ["IModuleView", "egret.DisplayObject"]);
    })(fashion = item.fashion || (item.fashion = {}));
})(item || (item = {}));

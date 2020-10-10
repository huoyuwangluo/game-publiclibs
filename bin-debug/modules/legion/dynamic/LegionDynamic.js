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
var LegionDynamic = (function (_super) {
    __extends(LegionDynamic, _super);
    function LegionDynamic() {
        return _super.call(this) || this;
    }
    LegionDynamic.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
    };
    LegionDynamic.prototype.enter = function (data) {
        this.scroller.viewport = this.list;
        if (this.scroller.verticalScrollBar) {
            this.scroller.verticalScrollBar.autoVisibility = false;
            this.scroller.verticalScrollBar.visible = false;
        }
        GameModels.legion.getLegionDynamicInfo(utils.Handler.create(this, function (data) {
            this._data = data;
            this._data.autoRecover = false;
            this.list.dataProvider = new eui.ArrayCollection(this._data.UnionLogList);
        }));
    };
    LegionDynamic.prototype.exit = function () {
        if (this._data) {
            this._data.reset();
            n.MessagePool.to(this._data);
            this._data = null;
        }
    };
    return LegionDynamic;
}(ui.LegionDynamicSkin));
__reflect(LegionDynamic.prototype, "LegionDynamic");

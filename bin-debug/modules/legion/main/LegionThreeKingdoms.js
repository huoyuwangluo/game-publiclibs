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
var LegionThreeKingdoms = (function (_super) {
    __extends(LegionThreeKingdoms, _super);
    function LegionThreeKingdoms() {
        var _this = _super.call(this) || this;
        _this._items = [_this.item0, _this.item1, _this.item2];
        return _this;
    }
    LegionThreeKingdoms.prototype.show = function () {
        var _this = this;
        GameModels.legion.getLegionList(1, utils.Handler.create(this, function () {
            _this.showView();
        }));
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
    };
    LegionThreeKingdoms.prototype.showView = function () {
        var legionVo = GameModels.legion.legionListDataVo;
        for (var i = 0; i < this._items.length; i++) {
            if (legionVo[i]) {
                this._items[i].visible = true;
                this._items[i].show(legionVo[i]);
            }
            else {
                this._items[i].visible = false;
            }
        }
    };
    LegionThreeKingdoms.prototype.hide = function () {
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    LegionThreeKingdoms.prototype.btnCloseClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return LegionThreeKingdoms;
}(ui.LegionThreeKingdomsSkin));
__reflect(LegionThreeKingdoms.prototype, "LegionThreeKingdoms", ["IAlert", "egret.DisplayObject"]);

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
var DonateRank = (function (_super) {
    __extends(DonateRank, _super);
    function DonateRank() {
        return _super.call(this) || this;
    }
    DonateRank.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        // Mediator.getMediator(this).onAdd(this, this.enter);
        // Mediator.getMediator(this).onRemove(this, this.exit);
    };
    DonateRank.prototype.show = function () {
        var _this = this;
        var legionID = 0;
        switch (GameModels.user.player.legionId) {
            case "1":
                legionID = TypeRank.WEI;
                break;
            case "2":
                legionID = TypeRank.SHU;
                break;
            case "3":
                legionID = TypeRank.WU;
                break;
        }
        GameModels.ranking.requestRanking(legionID, utils.Handler.create(this, function (data) {
            _this.listRank.dataProvider = new eui.ArrayCollection(GameModels.ranking.laterPlayerData);
        }));
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
    };
    DonateRank.prototype.hide = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    DonateRank.prototype.btnCloseClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return DonateRank;
}(ui.DonateRankSkin));
__reflect(DonateRank.prototype, "DonateRank", ["IAlert", "egret.DisplayObject"]);

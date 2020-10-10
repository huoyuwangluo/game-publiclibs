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
var LadderViewRecord = (function (_super) {
    __extends(LadderViewRecord, _super);
    function LadderViewRecord() {
        return _super.call(this) || this;
    }
    LadderViewRecord.prototype.show = function (type) {
        var _this = this;
        this._type = type;
        GameModels.ladder1.type = type;
        this.labTitle.text = Language.J_TZJL;
        GameModels.ladder1.requestLadderGetRecordList(this._type, utils.Handler.create(this, function () {
            if (!_this._listData) {
                _this._listData = new eui.ArrayCollection(GameModels.ladder1.recordVoArr);
            }
            else {
                _this._listData.source = GameModels.ladder1.recordVoArr;
            }
            _this.list.dataProvider = _this._listData;
            _this.labNo.visible = GameModels.ladder1.recordVoArr.length <= 0;
        }));
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    LadderViewRecord.prototype.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btnBack:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnClose:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
        }
    };
    LadderViewRecord.prototype.hide = function () {
        this.clearList(this.list);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return LadderViewRecord;
}(ui.LadderViewRecordSkin));
__reflect(LadderViewRecord.prototype, "LadderViewRecord", ["IAlert", "egret.DisplayObject"]);

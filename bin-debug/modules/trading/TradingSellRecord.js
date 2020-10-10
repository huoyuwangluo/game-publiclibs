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
var dialog;
(function (dialog) {
    var trading;
    (function (trading) {
        var TradingSellRecord = (function (_super) {
            __extends(TradingSellRecord, _super);
            function TradingSellRecord() {
                return _super.call(this) || this;
            }
            TradingSellRecord.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            TradingSellRecord.prototype.enter = function () {
                var _this = this;
                GameModels.tradingSell.requestTradingSellRecord(utils.Handler.create(this, function () {
                    if (!_this._listTrading) {
                        _this._listTrading = new eui.ArrayCollection(GameModels.tradingSell.tradingSellRecordVO);
                    }
                    else {
                        _this._listTrading.source = GameModels.tradingSell.tradingSellRecordVO;
                    }
                    _this.listRecord.dataProvider = _this._listTrading;
                    _this.labNo.visible = GameModels.tradingSell.tradingSellRecordVO.length <= 0;
                }));
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            };
            TradingSellRecord.prototype.exit = function () {
                this.clearList(this.listRecord);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            };
            TradingSellRecord.prototype.onClose = function (e) {
                mg.uiManager.remove(this);
            };
            return TradingSellRecord;
        }(ui.TradingSellRecordSkin));
        trading.TradingSellRecord = TradingSellRecord;
        __reflect(TradingSellRecord.prototype, "dialog.trading.TradingSellRecord");
    })(trading = dialog.trading || (dialog.trading = {}));
})(dialog || (dialog = {}));

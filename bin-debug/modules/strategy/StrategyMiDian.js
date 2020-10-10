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
    var strategy;
    (function (strategy) {
        var StrategyMiDian = (function (_super) {
            __extends(StrategyMiDian, _super);
            function StrategyMiDian() {
                var _this = _super.call(this) || this;
                _this._btnArr = [_this.btn0, _this.btn1, _this.btn2];
                return _this;
            }
            StrategyMiDian.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this.list.dataProvider = this._listData = new eui.ArrayCollection([]);
                this._index = data ? data : 0;
                this.showBtnView();
                this.showList();
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuiJianClick, this);
            };
            StrategyMiDian.prototype.showBtnView = function () {
                for (var i = 0; i < this._btnArr.length; i++) {
                    if (i == this._index) {
                        this._btnArr[i].skinName = "skins.SnapBigButton2Skin";
                    }
                    else {
                        this._btnArr[i].skinName = "skins.SnapBigButton1Skin";
                    }
                }
            };
            StrategyMiDian.prototype.showList = function () {
                var secretBook = GameModels.common.getSecretBookTempBuyType(this._index + 1);
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(secretBook);
                }
                else {
                    this._listData.source = secretBook;
                }
                this.imgType.source = "midian_json.img_miDianType_" + (this._index + 1);
            };
            StrategyMiDian.prototype.onBtnClick = function (e) {
                this._index = this._btnArr.indexOf(e.currentTarget);
                this.showBtnView();
                this.showList();
            };
            StrategyMiDian.prototype.onListClick = function (e) {
                if (e.target instanceof components.SnapButton) {
                    var item = this.list.selectedItem;
                    mg.uiManager.showByName(item.gameFun);
                }
            };
            StrategyMiDian.prototype.onTuiJianClick = function (e) {
                mg.alertManager.showAlert(dialog.role.AncientPetTuiJianTeam, true, true);
            };
            StrategyMiDian.prototype.exit = function () {
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuiJianClick, this);
            };
            return StrategyMiDian;
        }(ui.StrategyMiDianSkin));
        strategy.StrategyMiDian = StrategyMiDian;
        __reflect(StrategyMiDian.prototype, "dialog.strategy.StrategyMiDian");
    })(strategy = dialog.strategy || (dialog.strategy = {}));
})(dialog || (dialog = {}));

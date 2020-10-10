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
    var vip;
    (function (vip) {
        var PrivilegeDialog = (function (_super) {
            __extends(PrivilegeDialog, _super);
            function PrivilegeDialog() {
                return _super.call(this) || this;
            }
            PrivilegeDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._monthCardVo = [];
                this._imgTitle = [this.imgtitle0, this.imgtitle1];
                this._labTime = [this.labmothCardTime, this.labsuperMothCardTime];
                this._labValue = [this.labValue0, this.labValue1];
                this._exppress = [this.expProgress0, this.expProgress1];
                this._imgBuy = [this.imgBuyFinsh0, this.imgBuyFinsh1];
                this._btnArr = [this.btnYueka, this.btnZhizun];
                this._moneyCount = [280, 980];
                this._imgRedArr = [this.imgRed0, this.imgRed1];
            };
            PrivilegeDialog.prototype.enter = function () {
                for (var i = 0; i < this._imgRedArr.length; i++) {
                    this._imgRedArr[i].visible = false;
                }
                GameModels.vip.addEventListener(mo.ModelVip.ACTIVITY_CARDINFO, this.showView, this);
                this.btnYueka.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
                this.btnZhizun.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
                this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showShop, this);
                this.showView();
            };
            PrivilegeDialog.prototype.showView = function () {
                var _this = this;
                this.box0.dataSource = "201_120";
                this.box0.labName.text = "";
                this.box1.dataSource = "201_200";
                this.box1.labName.text = "";
                GameModels.vip.requestMonthCardGetInfo(utils.Handler.create(this, function () {
                    _this._monthCardVo = GameModels.vip.monthCardDate;
                    for (var i = 0; i < _this._monthCardVo.length; i++) {
                        if (_this._monthCardVo[i].cardStatus == 0) {
                            _this._imgTitle[i].visible = true;
                            _this._exppress[i].visible = true;
                            _this._labValue[i].visible = true;
                            _this._labTime[i].visible = false;
                            _this._btnArr[i].visible = false;
                            _this._imgBuy[i].visible = false;
                            if (_this._monthCardVo[i].totalPay >= _this._moneyCount[i]) {
                                _this._imgTitle[i].visible = false;
                                _this._exppress[i].visible = false;
                                _this._labValue[i].visible = false;
                                _this._btnArr[i].visible = true;
                                _this._btnArr[i].source = "img_activiteBtn_png";
                                _this._imgRedArr[i].visible = true;
                            }
                            _this._exppress[i].noTweenValue = _this._monthCardVo[i].totalPay / _this._moneyCount[i];
                            _this._labValue[i].text = (_this._monthCardVo[i].totalPay / 10) + "/" + (_this._moneyCount[i] / 10);
                        }
                        else {
                            _this._imgTitle[i].visible = false;
                            _this._exppress[i].visible = false;
                            _this._labValue[i].visible = false;
                            _this._labTime[i].visible = true;
                            _this._btnArr[i].visible = _this._monthCardVo[i].doneGotReward == 0;
                            _this._btnArr[i].source = "img_sg_oneyuan_reward_png";
                            _this._imgBuy[i].visible = _this._monthCardVo[i].doneGotReward == 1;
                            _this._imgRedArr[i].visible = _this._monthCardVo[i].doneGotReward == 0;
                            if (_this._monthCardVo[i].leftDays < 0) {
                                _this._labTime[i].text = Language.J_SYYJ;
                            }
                            else {
                                _this._labTime[i].text = Language.getExpression(Language.E_SY1T, _this._monthCardVo[i].leftDays);
                            }
                        }
                    }
                }));
            };
            PrivilegeDialog.prototype.exit = function () {
                this.btnYueka.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
                this.btnZhizun.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
                GameModels.vip.removeEventListener(mo.ModelVip.ACTIVITY_CARDINFO, this.showView, this);
                this.btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showShop, this);
            };
            PrivilegeDialog.prototype.onButtonClick = function (e) {
                var _this = this;
                var index = this._btnArr.indexOf(e.currentTarget);
                var monthCard = this._monthCardVo[index];
                if (monthCard.cardStatus == 0 && monthCard.totalPay >= this._moneyCount[index]) {
                    GameModels.vip.requestActivateMonthCard(index + 1, utils.Handler.create(this, function () {
                        _this.showView();
                    }));
                }
                else {
                    GameModels.vip.requestMonthCardReward(index + 1, utils.Handler.create(this, function () {
                        // this.box0.playFlyItem();
                        // this.box1.playFlyItem();
                        var rewards = [index == 0 ? _this.box0.dataSource : _this.box1.dataSource];
                        mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                        _this.showView();
                    }));
                }
            };
            PrivilegeDialog.prototype.showShop = function (e) {
                GameModels.recharge.openRechargeDialog();
            };
            return PrivilegeDialog;
        }(ui.PrivilegeDialogSkin));
        vip.PrivilegeDialog = PrivilegeDialog;
        __reflect(PrivilegeDialog.prototype, "dialog.vip.PrivilegeDialog", ["IModuleView", "egret.DisplayObject"]);
    })(vip = dialog.vip || (dialog.vip = {}));
})(dialog || (dialog = {}));

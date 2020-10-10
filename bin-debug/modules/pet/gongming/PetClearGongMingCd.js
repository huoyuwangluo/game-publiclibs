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
var pet;
(function (pet) {
    var PetClearGongMingCd = (function (_super) {
        __extends(PetClearGongMingCd, _super);
        function PetClearGongMingCd() {
            return _super.call(this) || this;
        }
        PetClearGongMingCd.prototype.show = function (cdTime, cdIndex) {
            this._cdIndex = cdIndex;
            this.labTime.text = Language.C_SYLQSJ + utils.DateUtil.formatTimeLeft(cdTime);
            this.labDiamonds.text = (Math.ceil(cdTime / 3600) * 10).toString();
            this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        };
        PetClearGongMingCd.prototype.onBtnClick = function (evt) {
            if (evt.currentTarget == this.btnOk) {
                GameModels.pet.cleanGongMingCd(this._cdIndex, utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.C_LJLQCG);
                }));
            }
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        PetClearGongMingCd.prototype.hide = function () {
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PetClearGongMingCd;
    }(ui.PetClearGongMingCdSkin));
    pet.PetClearGongMingCd = PetClearGongMingCd;
    __reflect(PetClearGongMingCd.prototype, "pet.PetClearGongMingCd", ["IAlert", "egret.DisplayObject"]);
})(pet || (pet = {}));

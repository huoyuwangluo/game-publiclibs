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
    var setting;
    (function (setting) {
        var ChangePlayerHead = (function (_super) {
            __extends(ChangePlayerHead, _super);
            function ChangePlayerHead() {
                return _super.call(this) || this;
            }
            ChangePlayerHead.prototype.show = function () {
                var _this = this;
                GameModels.oneCountRedPoint.isOpenChangeViewView = true;
                this._playerHeadArr = [];
                this.list.dataProvider = this._listData = new eui.ArrayCollection();
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnQuit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                GameModels.handBook.requestHandbookInfo(utils.Handler.create(this, function () {
                    _this.showView();
                }));
            };
            ChangePlayerHead.prototype.hide = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnQuit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            ChangePlayerHead.prototype.showView = function () {
                if (GameModels.user.player.headIcon != 0) {
                    this._playerHeadArr.push(0);
                }
                var petArr = GameModels.handBook.getActiviteGeneral();
                for (var i = 0; i < petArr.length; i++) {
                    if (petArr[i]) {
                        var general = Templates.getTemplateById(templates.Map.GENERAL, petArr[i].general);
                        this._playerHeadArr.push(parseInt(general.model));
                    }
                }
                this._listData.source = this._playerHeadArr;
            };
            ChangePlayerHead.prototype.onBtnClick = function (evt) {
                var vo = this.list.selectedItem;
                if (vo && vo < 0) {
                    mg.alertManager.tip(Language.J_QXXZNYHDTX);
                    return;
                }
                GameModels.role.requestChangePlayerHead(vo, utils.Handler.create(this, function () {
                    this.dispatchEventWith(egret.Event.CLOSE);
                }));
            };
            ChangePlayerHead.prototype.onClose = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            return ChangePlayerHead;
        }(ui.ChangePlayerHeadSkin));
        setting.ChangePlayerHead = ChangePlayerHead;
        __reflect(ChangePlayerHead.prototype, "dialog.setting.ChangePlayerHead", ["IAlert", "egret.DisplayObject"]);
    })(setting = dialog.setting || (dialog.setting = {}));
})(dialog || (dialog = {}));

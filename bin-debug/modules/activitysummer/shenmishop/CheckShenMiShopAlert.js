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
var view;
(function (view) {
    var activity;
    (function (activity) {
        var CheckShenMiShopAlert = (function (_super) {
            __extends(CheckShenMiShopAlert, _super);
            function CheckShenMiShopAlert() {
                return _super.call(this) || this;
            }
            CheckShenMiShopAlert.prototype.show = function (vo, okHandler) {
                this._isUse = true;
                this.boxChecked.selected = this._isUse;
                this._okHandler = okHandler;
                this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOkClick, this);
                this.boxChecked.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCheckClick, this);
                if (vo) {
                    this._vo = vo;
                    this.showView();
                }
            };
            CheckShenMiShopAlert.prototype.btnCloseClick = function () {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            CheckShenMiShopAlert.prototype.showView = function () {
                var dataSet = GameModels.dataSet.getDataSettingById(319002);
                var itemVo = Templates.getTemplateById(templates.Map.ITEM, this._vo.template.itemId);
                var num = 0;
                if (this._isUse) {
                    if (this._vo.template.price > parseInt(dataSet.value)) {
                        num = this._vo.template.price - parseInt(dataSet.value);
                    }
                }
                else {
                    num = this._vo.template.price;
                }
                this.labContent.text = Language.getExpression(Language.E_SFXH1MSGM3DJ, num, itemVo.name);
            };
            CheckShenMiShopAlert.prototype.btnOkClick = function () {
                if (this._vo) {
                    var num = 1;
                    if (this._isUse == false)
                        num = 0;
                    if (this._okHandler) {
                        this._okHandler.runWith(num);
                        this._okHandler = null;
                    }
                    this.dispatchEventWith(egret.Event.CLOSE);
                }
                // if (this._vo) {
                // 	var num: number = 1;
                // 	if (this._isUse == false) num = 0;
                // 	GameModels.activitySummer.requestbuyMysteryShop(this._vo.shopid, num, utils.Handler.create(this, function (data: n.G2C_HolidayMysteryShop_Buy) {
                // 		mg.alertManager.tip(Language.J_GMCG);
                // 		this.dispatchEventWith(egret.Event.CLOSE);
                // 		// var img: components.Icon = utils.ObjectPool.from(components.Icon) as components.Icon;
                // 		// img.initialize(this.imgIcon.texture);
                // 		// mg.layerManager.top.addChild(img);
                // 		// var point: egret.Point = this.imgIcon.localToGlobal(0, 0);
                // 		// img.anchorOffsetX = img.width / 2;
                // 		// img.anchorOffsetY = img.height / 2;
                // 		// img.x = point.x + img.width / 2;
                // 		// img.y = point.y + img.height / 2;
                // 		// var bagPosition: egret.Point = (mg.uiManager.getView(main.MainUIView) as main.MainUIView).getBagPostion(true);
                // 		// egret.Tween.get(img).to({ x: bagPosition.x, y: bagPosition.y, scaleX: 0.5, scaleY: 0.5 }, 1000, utils.Ease.cubicInOut).call(this.flyOverHandler, this, [img])
                // 	}));
                // }
            };
            CheckShenMiShopAlert.prototype.btnCheckClick = function () {
                this._isUse = !this._isUse;
                this.boxChecked.selected = this._isUse;
                this.showView();
            };
            CheckShenMiShopAlert.prototype.hide = function () {
                this.btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOkClick, this);
                this.boxChecked.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCheckClick, this);
                if (this._okHandler) {
                    this._okHandler.recover();
                    this._okHandler = null;
                }
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return CheckShenMiShopAlert;
        }(ui.CheckShenMiShopAlertSkin));
        activity.CheckShenMiShopAlert = CheckShenMiShopAlert;
        __reflect(CheckShenMiShopAlert.prototype, "view.activity.CheckShenMiShopAlert", ["IAlert", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));

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
var tips;
(function (tips) {
    var ShenMoPetGetTip = (function (_super) {
        __extends(ShenMoPetGetTip, _super);
        function ShenMoPetGetTip() {
            var _this = _super.call(this) || this;
            _this._count = 0;
            _this._angle = 0;
            return _this;
        }
        Object.defineProperty(ShenMoPetGetTip.prototype, "data", {
            // data: any[], call: any = null, handler: Function = null
            set: function (data) {
                this.reward.visible = false;
                this._handler = data.handler;
                this._call = data.call;
                if (data.data.length == 1) {
                    this.reward.visible = true;
                    var str = data.data[0].ItemId + "_" + data.data[0].Count;
                    this.reward.dataSource = str;
                }
                else {
                    this.list.dataProvider = new eui.ArrayCollection(data.data);
                }
                var itemcount = GameModels.bag.getItemCountById(ConfigData.SHENMOJIAONIAO);
                var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.SHENMOJIAONIAO);
                this.imgDaoJu.source = item.icon;
                this.btnOne.label = Language.C_ZLYC;
                this.labDaoJu.text = itemcount + "/" + 1;
                this.labDaoJu.textColor = itemcount >= 1 ? 0x00ff00 : 0xff0000;
                egret.Tween.removeTweens(this.img_ratoion);
                this.tweenPreviewImgHandler();
                utils.timer.clearAll(this);
                this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            },
            enumerable: true,
            configurable: true
        });
        ShenMoPetGetTip.prototype.onBtnClick = function (e) {
            if (e.currentTarget == this.btnOne) {
                if (this._call && this._handler) {
                    this._handler.call(this._call);
                }
            }
            mg.TipManager.instance.removeBlack();
            this.removeSelf();
        };
        ShenMoPetGetTip.prototype.tweenPreviewImgHandler = function () {
            this._count++;
            this._angle = this._count * 360;
            egret.Tween.get(this.img_ratoion).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
        };
        ShenMoPetGetTip.prototype.removeSelf = function () {
            this._count = 0;
            this._angle = 0;
            egret.Tween.removeTweens(this.img_ratoion);
            utils.timer.clearAll(this);
            this.btnOne.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.clearList(this.list);
            this.reward.dataSource = null;
            this._call = null;
            this._handler = null;
            mg.TipManager.instance.setCurrent();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return ShenMoPetGetTip;
    }(ui.TavernGetAlertSkin));
    tips.ShenMoPetGetTip = ShenMoPetGetTip;
    __reflect(ShenMoPetGetTip.prototype, "tips.ShenMoPetGetTip", ["ITipLogic", "egret.DisplayObject"]);
})(tips || (tips = {}));

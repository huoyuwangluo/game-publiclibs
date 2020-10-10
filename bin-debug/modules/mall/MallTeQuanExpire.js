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
var MallTeQuanExpire = (function (_super) {
    __extends(MallTeQuanExpire, _super);
    function MallTeQuanExpire() {
        return _super.call(this) || this;
    }
    MallTeQuanExpire.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
        this._typeTmp = [660001, 670003, 680003];
        this._iconArr1 = [this.reward0, this.reward1, this.reward2];
        this._typeContent1 = [Language.J_TQ1, Language.J_TQ2, Language.J_TQ3];
        this._typeContent2 = [Language.J_TQ4, Language.J_TQ5, Language.J_TQ6];
    };
    MallTeQuanExpire.prototype.enter = function (type) {
        this._type = type;
        this.showView();
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    MallTeQuanExpire.prototype.showView = function () {
        if (!this._type)
            return;
        this.labcontent1.text = this._typeContent1[this._type - 3];
        this.labcontent2.text = this._typeContent2[this._type - 3];
        this.labcontent3.visible = this._type == 3;
        this.img_title.source = "shop_json.img_tequantypeBg" + this._type + "_png";
        this.imgType1.source = "shop_json.img_tequantypeIcon" + this._type + "_png";
        this.imgType.source = "shop_json.img_tequantype" + this._type + "_png";
        if (this._type != 4) {
            this.imgType2.source = "shop_json.img_monthXianGou_png";
            this.labDay.text = Language.J_MGSJZ1;
        }
        else {
            this.imgType2.source = "shop_json.img_weekXianGou_png";
            this.labDay.text = Language.J_MGSJY1;
        }
        var str1 = GameModels.dataSet.getDataSettingValueById(this._typeTmp[this._type - 3]);
        var reward1 = str1.split(";");
        for (var i = 0; i < 3; i++) {
            var iconBox = this._iconArr1[i];
            iconBox.labName.stroke = 1;
            if (i < reward1.length) {
                iconBox.dataSource = reward1[i];
                iconBox.labName.text = "";
                this.boxGroup.addChild(iconBox);
            }
            else {
                if (iconBox.parent) {
                    iconBox.parent.removeChild(iconBox);
                }
            }
        }
    };
    MallTeQuanExpire.prototype.exit = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this._type = null;
    };
    MallTeQuanExpire.prototype.onClose = function (e) {
        if (e.currentTarget == this.btnReceive) {
            mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1, param: this._type ? this._type : 0 });
        }
        mg.uiManager.remove(this);
    };
    return MallTeQuanExpire;
}(ui.MallTeQuanExpireSkin));
__reflect(MallTeQuanExpire.prototype, "MallTeQuanExpire");

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
var SelectPropAlert = (function (_super) {
    __extends(SelectPropAlert, _super);
    function SelectPropAlert() {
        return _super.call(this) || this;
    }
    SelectPropAlert.prototype.show = function (data, useCallBack) {
        this._data = data;
        this._useHandler = useCallBack;
        this.initData();
        this.initView();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    SelectPropAlert.prototype.hide = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        egret.Tween.removeTweens(this.gpRewards);
        this.gpRewards.removeChildren();
        this.gpRewards.scrollH = 0;
        this._useCount = 0;
        this._data = null;
        for (var _i = 0, _a = this._rewards; _i < _a.length; _i++) {
            var reward = _a[_i];
            reward.data = null;
        }
        this._rewards = null;
        if (this._useHandler) {
            this._useHandler.recover();
            this._useHandler = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    SelectPropAlert.prototype.onClick = function (e) {
        switch (e.target) {
            case this.btnLeft:
                egret.Tween.removeTweens(this.gpRewards);
                egret.Tween.get(this.gpRewards).to({ scrollH: 0 }, 300);
                break;
            case this.btnRight:
                egret.Tween.removeTweens(this.gpRewards);
                egret.Tween.get(this.gpRewards).to({ scrollH: this.gpRewards.contentWidth - this.gpRewards.width }, 300);
                break;
            case this.btnUse:
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (!this._selectItemId) {
                    mg.alertManager.tip(Language.J_QXZXYDDJ);
                    return;
                }
                if (this._useHandler)
                    this._useHandler.runWith(this._data, this._useCount, this._selectItemId);
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnClose:
            case this.btnBack:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnXiao:
                this._useCount = 1;
                this.labUseCount.text = "1";
                break;
            case this.btnDa:
                this._useCount = this._data.count;
                this.labUseCount.text = this._useCount.toString();
                break;
            case this.btnJia:
                if (this._useCount < this._data.count) {
                    this._useCount++;
                    this.labUseCount.text = this._useCount.toString();
                }
                break;
            case this.btnJian:
                if (this._useCount > 1) {
                    this._useCount--;
                    this.labUseCount.text = this._useCount.toString();
                }
                break;
            case this.btnClose:
            case this.btnBack:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
        }
    };
    SelectPropAlert.prototype.updateScrollPos = function (targetPos, width) {
        if (this.gpRewards.contentWidth <= this.gpRewards.parent.width)
            return;
        var pos = targetPos + width / 2 - this.gpRewards.width / 2;
        if (pos < 0)
            pos = 0;
        else if (pos > this.gpRewards.contentWidth - this.gpRewards.width)
            pos = this.gpRewards.contentWidth - this.gpRewards.width;
        egret.Tween.removeTweens(this.gpRewards);
        if (this.gpRewards.scrollH = pos)
            return;
        egret.Tween.get(this.gpRewards).to({ scrollH: pos }, 300);
    };
    SelectPropAlert.prototype.initData = function () {
        this._rewards = [];
        this._useCount = 1;
        this._selectItemId = null;
        this._selectIndex = -1;
    };
    SelectPropAlert.prototype.initView = function () {
        this.labCount.text = Language.C_SL + ":" + this._data.count.toString();
        this.labName.text = this._data.name;
        this.labName.textColor = TypeQuality.getQualityColor(this._data.quality);
        this.labUseCount.text = this._useCount.toString();
        var itemTemp = Templates.getTemplateById(templates.Map.ITEM, this._data.id);
        var items = itemTemp.extraParam.split(";");
        for (var i = 0; i < items.length; i++) {
            if (items[i].length <= 0)
                continue;
            var reward = new renderer.SelectItemIconRenderer();
            reward.data = items[i];
            reward.clickCallBack = utils.Handler.create(this, this.itemSelectCallBack, null, false);
            this.gpRewards.addChild(reward);
            this._rewards.push(reward);
        }
        this.gpRewards.validateNow();
        if (this.gpRewards.contentWidth > this.gpRewards.parent.width) {
            this.btnLeft.visible = true;
            this.btnRight.visible = true;
        }
        else {
            this.btnLeft.visible = false;
            this.btnRight.visible = false;
        }
    };
    SelectPropAlert.prototype.itemSelectCallBack = function (target) {
        if (!this.gpRewards)
            return;
        var index = this.gpRewards.getChildIndex(target);
        if (index >= 0 && index < this._rewards.length) {
            if (this._selectIndex >= 0 && this._selectIndex < this._rewards.length)
                this._rewards[this._selectIndex].isSelected = false;
            this._rewards[index].isSelected = true;
            this._selectIndex = index;
            this._selectItemId = parseInt(this._rewards[index].id);
        }
    };
    return SelectPropAlert;
}(ui.SelectPropSkin));
__reflect(SelectPropAlert.prototype, "SelectPropAlert", ["IAlert", "egret.DisplayObject"]);

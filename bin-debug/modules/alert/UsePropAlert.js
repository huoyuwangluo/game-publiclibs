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
var UsePropAlert = (function (_super) {
    __extends(UsePropAlert, _super);
    function UsePropAlert() {
        return _super.call(this) || this;
    }
    UsePropAlert.prototype.show = function (data, okFun) {
        this._data = data;
        this.btnUse.visible = true;
        this.btnGroup.visible = true;
        if (this._data.templateProp.mainType == TypeItem.TREASURE) {
            this.btnUse.label = TypeSplit.btnNameByType(4);
        }
        else {
            this.btnUse.label = TypeSplit.btnNameByType(this._data.splitType);
        }
        this._okHandler = okFun;
        this.initData();
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    UsePropAlert.prototype.hide = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this._data = null;
        if (this._okHandler) {
            this._okHandler.recover();
            this._okHandler = null;
        }
        this._count = 0;
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.imgIcon.source = null;
    };
    UsePropAlert.prototype.onClick = function (e) {
        switch (e.target) {
            case this.btnUse:
                if (utils.CheckUtil.checkBagSmelting()) {
                    return;
                }
                if (this._okHandler) {
                    // if (this._data.id == "590001" && !utils.CheckUtil.checkRecharge() && GameModels.activity.birthDay < 3) {
                    // 	mg.uiManager.show(dialog.firstrecharge.FirstRechargeDialog);
                    // }
                    // else {
                    // 	this._okHandler.runWith(this._data, this._count);
                    // }
                    this._okHandler.runWith(this._data, this._count);
                }
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnClose:
            case this.btnBack:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnXiao:
                this._count = 1;
                this.labUseCount.text = "1";
                break;
            case this.btnDa:
                this._count = this._data.count;
                if (this._count >= 1000) {
                    this._count = 999;
                }
                this.labUseCount.text = this._count.toString();
                break;
            case this.btnJia:
                if (this._count < this._data.count) {
                    this._count++;
                    if (this._count >= 1000) {
                        this._count = 999;
                    }
                    this.labUseCount.text = this._count.toString();
                }
                break;
            case this.btnJian:
                if (this._count > 1) {
                    this._count--;
                    this.labUseCount.text = this._count.toString();
                }
                break;
            case this.btnBack:
            case this.btnClose:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
        }
    };
    UsePropAlert.prototype.initData = function () {
        var vo = this._data;
        this._count = vo.count;
        if (this._count >= 1000) {
            this._count = 999;
        }
        this.labName.text = vo.templateProp.name;
        this.labName.textColor = TypeQuality.getQualityColor(vo.templateProp.quality);
        this.labUseCount.text = this.labCount.text = this._count.toString();
        // this.labLv.text = vo.propTemplate.needLv.toString();
        if (vo.type == TypeItem.FASHION_CLOATHING || vo.type == TypeItem.FASHION_TITLE) {
            var fashion = Templates.getTemplateById(templates.Map.GAMEFASHION, vo.id);
            this.labDesc.textFlow = utils.TextFlowMaker.generateTextFlow(fashion.des);
        }
        else {
            this.labDesc.textFlow = utils.TextFlowMaker.generateTextFlow(vo.templateProp.des);
        }
        this.imgQuality.source = ResPath.getQuality(vo.templateProp.quality);
        this.imgIcon.source = ResPath.getItemIconKey(vo.templateProp.icon);
        // if (vo.templateProp.mainType == TypeItem.MATERIAL && vo.templateProp.type == TypeItemSub.FASHION) {
        // 	this.btnGroup.visible = false;
        // 	this.btnUse.label = Language.C_JH;
        // } else {
        // 	this.btnGroup.visible = true;
        // 	if (vo.id == "590001") {
        // 		if (GameModels.activity.birthDay >= 3) {
        // 			this.btnUse.label = Language.C_LQ;
        // 		}
        // 		else {
        // 			this.btnUse.label = "1" + Language.C_MS;
        // 		}
        // 	} else if (vo.templateProp.mainType == TypeItem.MATERIAL && vo.templateProp.type == TypeItemSub.SELL) {
        // 		this.btnUse.label = Language.C_CS;
        // 	} else {
        // 		this.btnUse.label = Language.C_SY;
        // 	}
        // }
    };
    return UsePropAlert;
}(ui.UsePropSkin));
__reflect(UsePropAlert.prototype, "UsePropAlert", ["IAlert", "egret.DisplayObject"]);

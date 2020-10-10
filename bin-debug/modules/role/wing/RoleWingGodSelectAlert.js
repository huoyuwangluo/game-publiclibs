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
var RoleWingGodSelectAlert = (function (_super) {
    __extends(RoleWingGodSelectAlert, _super);
    function RoleWingGodSelectAlert() {
        return _super.call(this) || this;
    }
    RoleWingGodSelectAlert.prototype.show = function (data, handler) {
        if (handler === void 0) { handler = null; }
        if (handler)
            this._handler = handler;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.getItemData(data);
    };
    RoleWingGodSelectAlert.prototype.hide = function () {
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        if (this._handler) {
            this._handler.recover();
            this._handler = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    RoleWingGodSelectAlert.prototype.getItemData = function (data) {
        var arr0;
        var arr1;
        var arr2;
        if (data.type == TypeItem.GODWING_1) {
            arr0 = Templates.getTemplatesByProperty(templates.Map.ITEM, "type", TypeItem.GODWING_2);
            arr1 = Templates.getTemplatesByProperty(templates.Map.ITEM, "type", TypeItem.GODWING_3);
            arr2 = Templates.getTemplatesByProperty(templates.Map.ITEM, "type", TypeItem.GODWING_4);
        }
        else if (data.type == TypeItem.GODWING_2) {
            arr0 = Templates.getTemplatesByProperty(templates.Map.ITEM, "type", TypeItem.GODWING_1);
            arr1 = Templates.getTemplatesByProperty(templates.Map.ITEM, "type", TypeItem.GODWING_3);
            arr2 = Templates.getTemplatesByProperty(templates.Map.ITEM, "type", TypeItem.GODWING_4);
        }
        else if (data.type == TypeItem.GODWING_3) {
            arr0 = Templates.getTemplatesByProperty(templates.Map.ITEM, "type", TypeItem.GODWING_1);
            arr1 = Templates.getTemplatesByProperty(templates.Map.ITEM, "type", TypeItem.GODWING_2);
            arr2 = Templates.getTemplatesByProperty(templates.Map.ITEM, "type", TypeItem.GODWING_4);
        }
        else if (data.type == TypeItem.GODWING_4) {
            arr0 = Templates.getTemplatesByProperty(templates.Map.ITEM, "type", TypeItem.GODWING_1);
            arr1 = Templates.getTemplatesByProperty(templates.Map.ITEM, "type", TypeItem.GODWING_2);
            arr2 = Templates.getTemplatesByProperty(templates.Map.ITEM, "type", TypeItem.GODWING_3);
        }
        var template0 = this.getTemplateItem(data.lv, arr0);
        this._item0 = vo.fromPool(vo.ItemVO, template0);
        var template1 = this.getTemplateItem(data.lv, arr1);
        this._item1 = vo.fromPool(vo.ItemVO, template1);
        var template2 = this.getTemplateItem(data.lv, arr2);
        this._item2 = vo.fromPool(vo.ItemVO, template2);
        if (this._item0)
            this.setIconData(this.icon0, this._item0);
        if (this._item1)
            this.setIconData(this.icon1, this._item1);
        if (this._item2)
            this.setIconData(this.icon2, this._item2);
        this.selectIcon(this.icon0, this._item0);
    };
    RoleWingGodSelectAlert.prototype.getTemplateItem = function (lv, arr) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var item = arr_1[_i];
            if (item.lv == lv) {
                return item;
            }
        }
        return null;
    };
    RoleWingGodSelectAlert.prototype.setIconData = function (icon, item) {
        icon.lv = item.lv;
        icon.nameLabel = item.name;
        icon.wingSource = item.icon;
        icon.wingQuality = item.quality;
    };
    RoleWingGodSelectAlert.prototype.onClick = function (e) {
        switch (e.target) {
            case this.btnOk:
                if (!this._selectItem) {
                    mg.alertManager.tip(Language.J_QXZYZHSY, 0xff0000);
                    return;
                }
                if (this._handler) {
                    this._handler.runWith(this._selectItem);
                }
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnClose:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnBack:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.icon0:
                this.selectIcon(this.icon0, this._item0);
                break;
            case this.icon1:
                this.selectIcon(this.icon1, this._item1);
                break;
            case this.icon2:
                this.selectIcon(this.icon2, this._item2);
                break;
        }
    };
    RoleWingGodSelectAlert.prototype.selectIcon = function (icon, item) {
        this.imgSelect.x = icon.x - 2;
        this.imgSelect.y = icon.y - 3;
        this._selectItem = item;
    };
    return RoleWingGodSelectAlert;
}(ui.RoleWingGodSelectAlertSkin));
__reflect(RoleWingGodSelectAlert.prototype, "RoleWingGodSelectAlert", ["IAlert", "egret.DisplayObject"]);

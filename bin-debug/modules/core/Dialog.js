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
var base;
(function (base) {
    var Dialog = (function (_super) {
        __extends(Dialog, _super);
        function Dialog() {
            var _this = _super.call(this) || this;
            _this.skinName = "base.PopSkin";
            return _this;
        }
        Object.defineProperty(Dialog, "instance", {
            get: function () {
                if (!Dialog._instance) {
                    Dialog._instance = new Dialog();
                    Dialog._instance.btnClose.sound = null;
                }
                return Dialog._instance;
            },
            enumerable: true,
            configurable: true
        });
        Dialog.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnClose.sound = "ui_click_close";
            this.labTitle.text = "";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
            this.icon1.visible = this.icon2.visible = this.icon3.visible = GameModels.platform.isPay;
            if (GameModels.platform.isPay) {
                this.groupGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.groupRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.anyGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            }
            if (platform.sdk && platform.sdk.type == "wx") {
                this.btnClose.visible = false;
            }
            else {
                this.btnClose.visible = true;
            }
        };
        Dialog.prototype.onClick = function (e) {
            if (e.currentTarget == this.groupGold) {
                mg.alertManager.showAlert(PropOfSourceAlert, true, true, ConfigData.GOLD);
            }
            else if (e.currentTarget == this.groupRecharge) {
                mg.uiManager.show(MallScene);
            }
            else {
                mg.alertManager.showAlert(PropOfSourceAlert, true, true, 801);
            }
        };
        Dialog.prototype.register = function (group) {
            this._parent = group;
        };
        Dialog.prototype.update = function (item) {
            this._uiStruct = item;
            if (this._uiStruct) {
                this.updateTitle(this._uiStruct.name);
            }
        };
        Dialog.prototype.updateTitle = function (name) {
            var url = game.GameConfig.resource_path + "/ui/title/img_title_" + name + ".png";
            if (this._url) {
                if (this._url == url)
                    return;
                game.imageLoader.remove(this._url);
                var texture = this.imgTitle.texture;
                this.imgTitle.source = null;
                this._url = null;
                if (texture)
                    texture.dispose();
                texture = null;
            }
            this._url = url;
            game.imageLoader.add(this._url, this, this.imageLoadedHandler);
        };
        Dialog.prototype.imageLoadedHandler = function (data) {
            this.imgTitle.source = data;
        };
        Dialog.prototype.updateGold = function () {
            this.labMoney.text = convert.formatGold(GameModels.user.player.gold);
            this.labDiamond.text = "" + GameModels.user.player.diamonds;
            var temp = Templates.getTemplateById(templates.Map.ITEM, 801);
            this.iconAny.source = temp.icon;
            this.labAnyCount.text = "" + GameModels.user.player.getProperty(TypeProperty.HonorId);
            if (this._uiStruct.name == s.UserfaceName.shop) {
                this.anyGroup.visible = true;
            }
            else {
                this.anyGroup.visible = false;
            }
        };
        Dialog.prototype.add = function (item) {
            this.update(item);
            this.updateGold();
            this._parent.addChild(this);
            mg.layerManager.dialog.addChild(this.gpTitle);
            GameModels.user.player.onPropertyChange(TypeProperty.Gold, this, this.updateGold);
            GameModels.user.player.onPropertyChange(TypeProperty.UnbindedGold, this, this.updateGold);
            GameModels.user.player.onPropertyChange(TypeProperty.HonorId, this, this.updateGold);
            mg.stageManager.onResize(this, this.resizeHandler, true);
        };
        Dialog.prototype.remove = function () {
            if (this.parent) {
                GameModels.user.player.offPropertyChange(TypeProperty.Gold, this, this.updateGold);
                GameModels.user.player.offPropertyChange(TypeProperty.UnbindedGold, this, this.updateGold);
                this.parent.removeChild(this);
            }
            if (this.gpTitle.parent) {
                this.gpTitle.parent.removeChild(this.gpTitle);
            }
        };
        Dialog.prototype.resizeHandler = function (w, h) {
            if (this.parent) {
                this.width = Math.max(Math.min(700, w), 600);
                this.height = h;
                this.x = w / 2 - this.width / 2;
                this.gpTitle.x = this.x;
                this.gpTitle.y = (platform.sdk && platform.sdk.uiOffsetY) ? platform.sdk.uiOffsetY : 0;
                this.gpTitle.width = this.width;
                // this.labTitle.horizontalCenter = 
                //this.btnClose.x=(tw<this.width?tw:this.width)-this.btnClose.width;
            }
            // if(this.btnClose.parent){
            // 	this.btnClose.x=(w/2+this.width/2);
            // }
        };
        Dialog.prototype.closeHandler = function (e) {
            mg.uiManager.remove(this._uiStruct.clazz);
        };
        return Dialog;
    }(eui.Component));
    base.Dialog = Dialog;
    __reflect(Dialog.prototype, "base.Dialog");
})(base || (base = {}));

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
    var CommonUnLockItem = (function (_super) {
        __extends(CommonUnLockItem, _super);
        function CommonUnLockItem() {
            return _super.call(this) || this;
        }
        CommonUnLockItem.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        Object.defineProperty(CommonUnLockItem.prototype, "data", {
            set: function (data) {
                if (!data)
                    return;
                this.show(data.item, data.type);
            },
            enumerable: true,
            configurable: true
        });
        CommonUnLockItem.prototype.show = function (itemVo, type) {
            this.showView(itemVo, type);
            this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
        };
        CommonUnLockItem.prototype.showView = function (itemVo, type) {
            this._type = type;
            this.body.visible = false;
            if (type == 1 || type == 2) {
                this.imgBg.source = "common_getcomeBg1_png";
            }
            else {
                this.imgBg.source = "common_getcomeBg2_png";
            }
            this.imgTitle.source = "common_getTitle" + this._type + "_png";
            this.imgXianTong.visible = false;
            this.btnOk.skinName = "skins.SnapBigButton2Skin";
            this.btnOk.label = Language.C_QD;
            if (itemVo instanceof vo.CopyVO) {
                this._data = itemVo;
                this.body.visible = true;
                this.body.setPetBody(itemVo.templateBoss.petId.toString(), false);
                this.btnOk.skinName = "skins.SnapBigButton1Skin";
                this.btnOk.label = Language.J_QWCK;
            }
            else if (itemVo instanceof templates.wenGuan) {
                var temp = itemVo;
                if (!this._playerShowAvatar) {
                    this._playerShowAvatar = new components.PlayerShowAvatar();
                    this.addChild(this._playerShowAvatar);
                    this._playerShowAvatar.x = 251;
                    this._playerShowAvatar.y = 350;
                    this._playerShowAvatar.clothResId = temp.modelLead.toString();
                    this._playerShowAvatar.weaponResId = temp.modelWeapon.toString();
                }
            }
        };
        CommonUnLockItem.prototype.createPhantomEffect = function () {
            if (!this._effect) {
                this._effect = utils.ObjectPool.from(s.AnimationSprite);
                this._effect.y = 200;
                this._effect.x = 251;
                this._effect.frameRate = 6;
                this.addChild(this._effect);
            }
        };
        CommonUnLockItem.prototype.removePhantomEffect = function () {
            if (this._effect) {
                this._effect.stop();
                this._effect.alpha = 1;
                this._effect.filters = null;
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
                utils.ObjectPool.to(this._effect, true);
                this._effect = null;
            }
        };
        CommonUnLockItem.prototype.removeSelf = function () {
            this._data = null;
            this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
            mg.TipManager.instance.setCurrent();
            this.removePhantomEffect();
            if (this._playerShowAvatar) {
                if (this._playerShowAvatar.parent) {
                    this._playerShowAvatar.parent.removeChild(this._playerShowAvatar);
                }
                this._playerShowAvatar.reset();
                this._playerShowAvatar = null;
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        CommonUnLockItem.prototype.closeClick = function (evt) {
            if (evt.currentTarget == this.btnOk) {
                switch (this._type) {
                    case 2:
                        if (!this._data)
                            return;
                        mg.uiManager.show(dialog.explore.CopyFightBossDialog, { tabIndex: 0, param: this._data.template.boss });
                        break;
                }
            }
            mg.TipManager.instance.removeBlack();
            this.removeSelf();
        };
        return CommonUnLockItem;
    }(ui.CommonUnLockItemSkin));
    tips.CommonUnLockItem = CommonUnLockItem;
    __reflect(CommonUnLockItem.prototype, "tips.CommonUnLockItem", ["ITipLogic", "egret.DisplayObject"]);
})(tips || (tips = {}));

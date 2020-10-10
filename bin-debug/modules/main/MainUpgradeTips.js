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
var main;
(function (main) {
    var MainUpgradeTips = (function (_super) {
        __extends(MainUpgradeTips, _super);
        function MainUpgradeTips() {
            return _super.call(this) || this;
        }
        MainUpgradeTips.prototype.init = function () {
            this._parent = this.parent;
            this.btnLink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpgrade, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpgrade, this);
        };
        MainUpgradeTips.prototype.add = function () {
            this._itemId = GameModels.bag.getDataItemId;
            if (!this.parent && this._itemId) {
                this._parent.addChild(this);
                this.showView();
            }
        };
        MainUpgradeTips.prototype.onBtnUpgrade = function (e) {
            var _this = this;
            GameModels.bag.getDataItemId = 0;
            this.remove();
            if (e.currentTarget == this.btnLink) {
                var item = Templates.getTemplateById(templates.Map.ITEM, this._itemId);
                var itemJump = Templates.getTemplateByProperty(templates.Map.ITEMJUMP, "itemId", this._itemId);
                if (item.type == TypeItem.PET_SUI && GameModels.user.player.level < 80) {
                    GameModels.bag.requestCompoundProp(item.nextId, 1, utils.Handler.create(this, function () {
                        mg.effectManager.playEffectOnce(TypeEffectId.PETHECHENG_EFF, mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2 + 100);
                        _this.remove();
                    }));
                }
                else {
                    if (itemJump) {
                        mg.uiManager.showByName(itemJump.functionId, itemJump.functionParams);
                    }
                }
            }
        };
        MainUpgradeTips.prototype.showView = function () {
            var item = Templates.getTemplateById(templates.Map.ITEM, this._itemId);
            if (item) {
                this.btnLink.source = "pet_json.img_checkLook_png";
                this.reward.dataSource = item.id;
                if (item.type == TypeItem.SHENBIN_PROP) {
                    this.labTitle.text = Language.C_HDSB;
                }
                else if (item.type == TypeItem.HONGYAN_ACT) {
                    this.labTitle.text = Language.C_HDHY;
                }
                else if (item.type == TypeItem.FASHION_CLOATHING) {
                    this.labTitle.text = Language.C_HDSZ;
                }
                else if (item.type == TypeItem.PET_SUI) {
                    if (GameModels.user.player.level < 80) {
                        this.btnLink.source = "pet_json.img_compound_png";
                    }
                    this.labTitle.text = Language.C_WJKHC;
                }
                else {
                    this.labTitle.text = Language.C_HDCH;
                }
            }
            this.startCloseTime();
        };
        MainUpgradeTips.prototype.startCloseTime = function () {
            this._endTime = 5;
            this.timeUpdateHandler();
            utils.timer.countdown(this._endTime, this, this.timeUpdateHandler, this.finshTime);
        };
        MainUpgradeTips.prototype.timeUpdateHandler = function () {
            if (this._endTime <= 0) {
                return;
            }
            this._endTime--;
        };
        MainUpgradeTips.prototype.finshTime = function () {
            GameModels.bag.getDataItemId = 0;
            this.remove();
        };
        MainUpgradeTips.prototype.remove = function () {
            this._endTime = 0;
            utils.timer.clear(this, this.timeUpdateHandler);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return MainUpgradeTips;
    }(ui.MainUpgradeTipsSkin));
    main.MainUpgradeTips = MainUpgradeTips;
    __reflect(MainUpgradeTips.prototype, "main.MainUpgradeTips");
})(main || (main = {}));

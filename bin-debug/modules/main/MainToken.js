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
    var MainToken = (function (_super) {
        __extends(MainToken, _super);
        function MainToken() {
            var _this = _super.call(this) || this;
            Mediator.getMediator(_this).onAdd(_this, _this.enter);
            Mediator.getMediator(_this).onRemove(_this, _this.exit);
            _this._copyNameArr = [Language.C_JYFB, Language.C_ZDFB, Language.C_ZGFB, Language.C_YMFB, Language.J_GRBOSS];
            _this._funOpenIdArr = [TypeFunOpen.FUBEN_0, TypeFunOpen.FUBEN_1, TypeFunOpen.FUBEN_2, TypeFunOpen.FUBEN_3];
            return _this;
        }
        MainToken.prototype.enter = function () {
            this.show();
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.img_tokenIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclick, this);
            this.img_personCopy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.img_materialsCopy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.btnGetReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclick, this);
        };
        MainToken.prototype.show = function () {
            this.btnGetReward.label = Language.C_LQ;
            this.btnGetReward.filters = null;
            utils.filterUtil.grayFilters;
            this.btnGetReward.touchEnabled = true;
        };
        MainToken.prototype.onBtnclick = function (evt) {
            var _this = this;
            if (evt.currentTarget == this.btnGetReward) {
                for (var i = 0; i < GameModels.copyMaterial.serverData.List.length; i++) {
                    if (GameModels.copyMaterial.serverData.List[i].LeftCount >= GameModels.copyMaterial.getMaterialsRefreshNum && TypeFunOpen.checkIsOpenByFunId(this._funOpenIdArr[i])) {
                        mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_1CSZGSFJXGM, this._copyNameArr[i]), TypeBtnLabel.OK, null, utils.Handler.create(this, this.sendGetReward), null, null, true, false);
                        return;
                    }
                }
                if (GameModels.copyBoss.personaBossCount >= GameModels.copyBoss.personaRefreshNum) {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_1CSZGSFJXGM, this._copyNameArr[4]), TypeBtnLabel.OK, null, utils.Handler.create(this, this.sendGetReward), null, null, true, false);
                    return;
                }
                GameModels.copyBoss.getTokenReward(utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.C_LQCG);
                    GameModels.copyBoss.token = false;
                    GameModels.copyMaterial.needUpdate = true;
                    _this.btnGetReward.label = Language.C_YLQ;
                    _this.btnGetReward.filters = utils.filterUtil.grayFilters;
                    _this.btnGetReward.touchEnabled = false;
                }));
            }
            else if (evt.currentTarget == this.img_tokenIcon) {
                var item = Templates.getTemplateById(templates.Map.ITEM, "211001");
                mg.TipManager.instance.showTip(tips.PropTip, item);
            }
        };
        MainToken.prototype.sendGetReward = function () {
            var _this = this;
            GameModels.copyBoss.getTokenReward(utils.Handler.create(this, function () {
                mg.alertManager.tip(Language.C_LQCG);
                GameModels.copyBoss.token = false;
                GameModels.copyMaterial.needUpdate = true;
                _this.btnGetReward.label = Language.C_YLQ;
                _this.btnGetReward.filters = utils.filterUtil.grayFilters;
                _this.btnGetReward.touchEnabled = false;
            }));
        };
        MainToken.prototype.exit = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.img_tokenIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclick, this);
            this.img_personCopy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclick, this);
            this.img_materialsCopy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclick, this);
            this.btnGetReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclick, this);
        };
        MainToken.prototype.onClose = function (evt) {
            if (evt.currentTarget == this.img_personCopy) {
                mg.uiManager.show(dialog.explore.CopyFightBossDialog, { tabIndex: 0 });
            }
            else if (evt.currentTarget == this.img_materialsCopy) {
                mg.uiManager.show(dialog.explore.CopyMaterialDialog, { tabIndex: 0 });
            }
            mg.uiManager.remove(this);
        };
        return MainToken;
    }(ui.MainTokenSkin));
    main.MainToken = MainToken;
    __reflect(MainToken.prototype, "main.MainToken");
})(main || (main = {}));

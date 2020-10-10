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
var LegionZhenQi = (function (_super) {
    __extends(LegionZhenQi, _super);
    function LegionZhenQi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionZhenQi.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
    };
    LegionZhenQi.prototype.enter = function (data) {
        var _this = this;
        this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnDonate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnDonate0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnDonate1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        GameModels.legion.addEventListener(mo.ModelLegion.CHANGE_UNIONLV, this.showView, this);
        this.btnAddNum.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnAddNum0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnAddNum1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        var legionID = 0;
        switch (GameModels.user.player.legionId) {
            case "1":
                legionID = TypeRank.WEI;
                break;
            case "2":
                legionID = TypeRank.SHU;
                break;
            case "3":
                legionID = TypeRank.WU;
                break;
        }
        GameModels.ranking.requestRanking(legionID, utils.Handler.create(this, function (data) {
            _this.updatebanner();
        }));
        this.createFalgEffect();
        this.showView();
    };
    LegionZhenQi.prototype.exit = function () {
        this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnDonate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnDonate0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnDonate1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        GameModels.legion.removeEventListener(mo.ModelLegion.CHANGE_UNIONLV, this.showView, this);
        this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnAddNum.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnAddNum0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnAddNum1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.removeFalgEffect();
    };
    LegionZhenQi.prototype.onBtnClick = function (e) {
        switch (e.currentTarget) {
            case this.btnDonate:
                if (GameModels.legion.leftDontaCount > 0) {
                    GameModels.legion.getdonate(0, 20, utils.Handler.create(this, function () {
                        mg.alertManager.tip(Language.getExpression(Language.E_HDGXZ, 500));
                    }));
                }
                break;
            case this.btnDonate0:
                GameModels.legion.getdonate(1, 1, utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.getExpression(Language.E_HDGXZ, 500));
                }));
                break;
            case this.btnDonate1:
                if (GameModels.user.player.vip <= 0) {
                    mg.alertManager.tip(Language.J_VIPJSZQ);
                }
                else if (GameModels.legion.donateYuanbao >= GameModels.legion.vipYuanBaoDonateLimit) {
                    mg.alertManager.tip(Language.J_ZQJXBKCGMRJXSX);
                }
                else {
                    mg.alertManager.showAlert(DonateAlert, true, true);
                }
                break;
            case this.btnRank:
                mg.alertManager.showAlert(DonateRank, false, true);
                break;
            case this.btnRight:
                this.showstep++;
                if (Templates.getTemplateById(templates.Map.CAMPFLAG, this.showstep) != null) {
                    this._flagData = Templates.getTemplateById(templates.Map.CAMPFLAG, this.showstep);
                    this.upeff(this._flagData.resource);
                }
                else {
                    this.showstep--;
                }
                break;
            case this.btnLeft:
                this.showstep--;
                if (Templates.getTemplateById(templates.Map.CAMPFLAG, this.showstep) != null) {
                    this._flagData = Templates.getTemplateById(templates.Map.CAMPFLAG, this.showstep);
                    this.upeff(this._flagData.resource);
                }
                else {
                    this.showstep++;
                }
                break;
            case this.btnAddNum:
                if (GameModels.user.player.vip >= 10) {
                    mg.alertManager.tip(Language.J_NYDDVIPSX);
                }
                else {
                    mg.alertManager.tip(Language.J_TSVIPDJZJCS);
                }
                break;
            case this.btnAddNum0:
                var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.UNION_ITEM);
                mg.alertManager.showAlert(PropOfSourceAlert, true, true, item.id); //激活道具获得途径
                break;
            case this.btnAddNum1:
                if (GameModels.user.player.vip >= 10) {
                    mg.alertManager.tip(Language.J_NYDDVIPSX);
                }
                else {
                    mg.alertManager.tip(Language.J_TSVIPDJZJSX);
                }
                break;
        }
    };
    LegionZhenQi.prototype.showView = function () {
        this.mianfeiGroup.visible = false;
        this.daojuGroup.visible = false;
        this.yuanbaoGroup.visible = false;
        this.btnDonate.isWarn = false;
        this.btnDonate0.isWarn = false;
        if (GameModels.legion.leftDontaCount > 0) {
            this.mianfeiGroup.visible = true;
            this.labCount.text = GameModels.legion.leftDontaCount.toString();
            this.btnDonate.isWarn = true;
        }
        else {
            this.daojuGroup.visible = true;
            this.yuanbaoGroup.visible = true;
            var bagCount = GameModels.bag.getItemCountById(ConfigData.UNION_ITEM);
            var temp = Templates.getTemplateById(templates.Map.ITEM, ConfigData.UNION_ITEM);
            this.labItemName.text = temp.name + ":";
            this.itemIcon.source = temp.icon;
            this.labCount0.text = bagCount + "/1";
            this.labCount0.textColor = bagCount >= 1 ? TypeColor.GREEN1 : TypeColor.RED1;
            this.btnDonate0.isWarn = bagCount >= 1;
            this.labCount1.text = (GameModels.legion.vipYuanBaoDonateLimit - GameModels.legion.donateYuanbao) + "/" + GameModels.legion.vipYuanBaoDonateLimit;
            this.labCount1.textColor = GameModels.legion.donateYuanbao >= GameModels.legion.vipYuanBaoDonateLimit ? TypeColor.RED1 : TypeColor.GREEN1;
        }
        this.showstep = GameModels.legion.legionLevel;
        this.labMy.text = GameModels.user.player.getProperty(TypeProperty.UnionGongXian);
        var data = Templates.getTemplateById(templates.Map.CAMPFLAG, this.showstep);
        var nextdata = Templates.getTemplateById(templates.Map.CAMPFLAG, data.nextId);
        this.progressStarExp.noTweenValue = GameModels.legion.legionPrestige / data.exp;
        this.legionname.source = ResPath.getShowBannerPath(GameModels.legion.unionId);
        if (data.lv < 9) {
            this.labLv.text = data.name.substring(data.name.length - 3);
        }
        else {
            this.labLv.text = data.name.substring(data.name.length - 4);
        }
        if (data.nextId == -1) {
            this.labPro.text = Language.C_YMJ;
            this.lab_tip.text = Language.C_YMJ;
            this.lab_tip.textColor = TypeColor.GREEN1;
        }
        else {
            this.labPro.text = GameModels.legion.legionPrestige + "/" + data.exp;
            this.lab_tip.text = Language.getExpression(Language.E_ZJXDSYBKJJXYJ, Math.ceil((data.exp - GameModels.legion.legionPrestige) / 50));
            this.lab_tip.textColor = 0xF08C5B;
        }
        this.upeff(data.resource);
        this.propertyBox.updateAtts(data.properties, nextdata ? nextdata.properties : null);
    };
    LegionZhenQi.prototype.updatebanner = function () {
        var playerArr = GameModels.ranking.laterPlayerData;
        if (playerArr.length <= 0) {
            this.playerName.text = Language.Z_WU;
        }
        for (var i = 0; i < playerArr.length; i++) {
            if (i == 0 && playerArr[i].playerData.PlayerName) {
                this.playerName.text = playerArr[i].playerData.PlayerName;
            }
        }
    };
    LegionZhenQi.prototype.upeff = function (effectId) {
        if (this._effect) {
            this._effect.stop();
            this._effect.resId = effectId;
            this._effect.play();
        }
    };
    LegionZhenQi.prototype.createFalgEffect = function () {
        if (!this._effect) {
            this._effect = utils.ObjectPool.from(s.AnimationSprite);
            this._effect.y = 470;
            this._effect.x = 300;
            this._effect.frameRate = 6;
            this.addChild(this._effect);
        }
    };
    LegionZhenQi.prototype.removeFalgEffect = function () {
        if (this._effect) {
            this._effect.stop();
            if (this._effect.parent) {
                this._effect.parent.removeChild(this._effect);
            }
            utils.ObjectPool.to(this._effect, true);
            this._effect = null;
        }
    };
    return LegionZhenQi;
}(ui.LegionZhenQiSkin));
__reflect(LegionZhenQi.prototype, "LegionZhenQi");

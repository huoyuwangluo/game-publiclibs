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
var BingFaZhongZhu = (function (_super) {
    __extends(BingFaZhongZhu, _super);
    function BingFaZhongZhu() {
        return _super.call(this) || this;
    }
    BingFaZhongZhu.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
    };
    BingFaZhongZhu.prototype.enter = function (vo, pos) {
        this._vo = vo;
        this._pos = pos;
        GameModels.pet.petGetBingFaResetInfo(this._vo.uid, this._pos, utils.Handler.create(this, function () {
            this.showView();
        }));
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        this.btnBaoCun.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
        this.btnZhongZhu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
        this.getItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
        this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
    };
    BingFaZhongZhu.prototype.exit = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        this.btnBaoCun.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
        this.btnZhongZhu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
        this.getItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
        this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
    };
    BingFaZhongZhu.prototype.showView = function () {
        var bingfaVo = this._vo.getBingFaVOListByPos(this._pos);
        var temItem = Templates.getTemplateById(templates.Map.ITEM, ConfigData.BINGFA_ITEM);
        this.imgNeedIcon.source = temItem.icon;
        this.labNeed.text = temItem.name;
        var bagCount = GameModels.bag.getItemCountById(ConfigData.BINGFA_ITEM);
        this.labCount.text = bagCount + "/" + bingfaVo.price;
        this.labCount.textColor = bagCount >= bingfaVo.price ? 0x00ff00 : 0xff0000;
        this.imgQuality.source = ResPath.getQuality(bingfaVo.quality);
        this.imgIcon.source = bingfaVo.icon;
        this.labName.text = bingfaVo.name;
        this.labName.textColor = TypeQuality.getQualityColor(bingfaVo.quality);
        this.btnBaoCun.filters = utils.filterUtil.grayFilters;
        this.btnBaoCun.touchEnabled = false;
        this.labAttsN1.text = bingfaVo.baseBingFaProp[0] ? Language.C_SJSX : "";
        this.labAttsN2.text = bingfaVo.specialBingFaProp[1] ? Language.C_SJSX : "";
        this.labAttsN3.text = bingfaVo.specialBingFaProp[1] ? Language.C_SJSX : "";
        this.labNameN1.text = bingfaVo.bingFaSkillList[0] ? Language.C_SJJN : "";
        this.labNameN2.text = bingfaVo.bingFaSkillList[1] ? Language.C_SJJN : "";
        this.labDesN1.text = "";
        this.labDesN2.text = "";
        this.imgSuiJi1.visible = bingfaVo.bingFaSkillList[0] ? true : false;
        this.imgSuiJi2.visible = bingfaVo.bingFaSkillList[1] ? true : false;
        this.skillN1.visible = bingfaVo.bingFaSkillList[0] ? true : false;
        this.skillN2.visible = bingfaVo.bingFaSkillList[1] ? true : false;
        if (GameModels.pet.hashTempBingFa) {
            this.btnBaoCun.filters = null;
            this.btnBaoCun.touchEnabled = true;
            if (GameModels.pet.temBingFa.baseBingFaProp[0])
                this.labAttsN1.text = TypeProperty.getChineseByPropertyValue(GameModels.pet.temBingFa.baseBingFaProp[0].strText);
            if (GameModels.pet.temBingFa.specialBingFaProp[0])
                this.labAttsN2.text = TypeProperty.getChineseByPropertyValue(GameModels.pet.temBingFa.specialBingFaProp[0].strText);
            if (GameModels.pet.temBingFa.specialBingFaProp[1])
                this.labAttsN3.text = TypeProperty.getChineseByPropertyValue(GameModels.pet.temBingFa.specialBingFaProp[1].strText);
            if (GameModels.pet.temBingFa.bingFaSkillList[0]) {
                this.skillN1.visible = true;
                this.skillN1.dataSource = GameModels.pet.temBingFa.bingFaSkillList[0];
                this.labNameN1.text = GameModels.pet.temBingFa.bingFaSkillList[0].name;
                this.labDesN1.text = GameModels.pet.temBingFa.bingFaSkillList[0].desc;
            }
            else {
                this.skillN1.visible = false;
                this.labNameN1.text = "";
                this.labDesN1.text = "";
            }
            if (GameModels.pet.temBingFa.bingFaSkillList[1]) {
                this.skillN2.visible = true;
                this.skillN2.dataSource = GameModels.pet.temBingFa.bingFaSkillList[1];
                this.labNameN2.text = GameModels.pet.temBingFa.bingFaSkillList[1].name;
                this.labDesN2.text = GameModels.pet.temBingFa.bingFaSkillList[1].desc;
            }
            else {
                this.skillN2.visible = false;
                this.labNameN2.text = "";
                this.labDesN2.text = "";
            }
            this.imgSuiJi1.visible = false;
            this.imgSuiJi2.visible = false;
        }
        this.labAttsC1.text = bingfaVo.baseBingFaProp[0] ? TypeProperty.getChineseByPropertyValue(bingfaVo.baseBingFaProp[0].strText) : "";
        this.labAttsC2.text = bingfaVo.specialBingFaProp[0] ? TypeProperty.getChineseByPropertyValue(bingfaVo.specialBingFaProp[0].strText) : "";
        this.labAttsC3.text = bingfaVo.specialBingFaProp[1] ? TypeProperty.getChineseByPropertyValue(bingfaVo.specialBingFaProp[1].strText) : "";
        if (bingfaVo.bingFaSkillList[0]) {
            this.skillC1.visible = true;
            this.skillC1.dataSource = bingfaVo.bingFaSkillList[0];
            this.labNameC1.text = bingfaVo.bingFaSkillList[0].name;
            this.labDesC1.text = bingfaVo.bingFaSkillList[0].desc;
        }
        else {
            this.skillC1.visible = false;
            this.labNameC1.text = "";
            this.labDesC1.text = "";
        }
        if (bingfaVo.bingFaSkillList[1]) {
            this.skillC2.visible = true;
            this.skillC2.dataSource = bingfaVo.bingFaSkillList[1];
            this.labNameC2.text = bingfaVo.bingFaSkillList[1].name;
            this.labDesC2.text = bingfaVo.bingFaSkillList[1].desc;
        }
        else {
            this.skillC2.visible = false;
            this.labNameC2.text = "";
            this.labDesC2.text = "";
        }
        if (bingfaVo.quality >= 5) {
            this.needGroup.y = 545;
            this.createGroup.visible = true;
            var createCnt = 0;
            switch (bingfaVo.quality) {
                case 5:
                    createCnt = GameModels.user.player.bingFa5CreateCnt;
                    break;
                case 6:
                    createCnt = GameModels.user.player.bingFa6CreateCnt;
                    break;
                case 7:
                    createCnt = GameModels.user.player.bingFa7CreateCnt;
                    break;
            }
            var count = bingfaVo.baoDiCnt - createCnt;
            if (count < 0)
                count;
            this.labCreateCnt.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_ZJX1CCZBCXYJN, count));
            this.expProgress.noTweenValue = createCnt / bingfaVo.baoDiCnt;
            this.labPro.text = createCnt + "/" + bingfaVo.baoDiCnt;
        }
        else {
            this.needGroup.y = 575;
            this.createGroup.visible = false;
        }
    };
    BingFaZhongZhu.prototype.btnCloseClick = function (e) {
        mg.uiManager.remove(this);
    };
    BingFaZhongZhu.prototype.onTabClick = function (e) {
        switch (e.currentTarget) {
            case this.btnBaoCun:
                GameModels.pet.petSaveBingFa(this._vo.uid, this._pos, utils.Handler.create(this, function () {
                    this.showView();
                }));
                break;
            case this.btnZhongZhu:
                GameModels.pet.petResetBingFa(this._vo.uid, this._pos, utils.Handler.create(this, function () {
                    this.showView();
                }));
                break;
            case this.getItem:
                var bingfaVo = this._vo.getBingFaVOListByPos(this._pos);
                if (bingfaVo)
                    mg.alertManager.showAlert(PropOfSourceAlert, true, true, 293100);
                break;
            case this.btnHelp:
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5101).des);
                break;
        }
    };
    return BingFaZhongZhu;
}(ui.BingFaZhongZhuSkin));
__reflect(BingFaZhongZhu.prototype, "BingFaZhongZhu");

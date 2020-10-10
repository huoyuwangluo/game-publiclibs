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
var LegionCorpsMain = (function (_super) {
    __extends(LegionCorpsMain, _super);
    function LegionCorpsMain() {
        var _this = _super.call(this) || this;
        _this._language = [Language.B_BUB, Language.B_QIANGB, Language.B_QIB, Language.B_GONGB, Language.B_MOUB];
        return _this;
    }
    LegionCorpsMain.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
        this._propertyArr = [
            ["EXHP", "EXATT", "EXDEF", "CRI", "DMGINCR", "DMGREDU"],
            ["EXHP", "EXATT", "EXDEF", "CRI", "CRIDMG", "DMGINCR"],
            ["EXHP", "EXATT", "EXDEF", "ANTICRI", "IGNORECTRL", "DMGREDU"],
            ["EXHP", "EXATT", "EXDEF", "CRI", "CRIDMG", "HIT"],
            ["EXHP", "EXATT", "EXDEF", "CRI", "DMGINCR", "CTRL"]
        ];
        this._bingZhongModel = [
            [1928, 1913, 1940],
            [1879, 1878, 1941],
            [1917, 1872, 1943],
            [1860, 1861, 1915],
            [1914, 1930, 1916]
        ];
        this._corpsVo = null;
        this._redPointArr = [this.imgRed0, this.imgRed1, this.imgRed2, this.imgRed3, this.imgRed4];
        this._iconArr = [this.icon1, this.icon2, this.icon3, this.icon4, this.icon5, this.icon6];
        this._countArr = [this.labCount1, this.labCount2, this.labCount3, this.labCount4, this.labCount5, this.labCount6];
        this._btnArr = [this.btn0, this.btn1, this.btn2, this.btn3, this.btn4];
        this._corpsLab = [this.lab0, this.lab1, this.lab2, this.lab3, this.lab4];
        this._propertyLab = [this.labText1, this.labText2, this.labText3, this.labText4, this.labText5, this.labText6];
    };
    LegionCorpsMain.prototype.enter = function (type) {
        if (type === void 0) { type = 0; }
        GameModels.corps.isOpenView = true;
        this._index = type;
        GameModels.corps.requestCorpsInfo(utils.Handler.create(this, function () {
            this.showView();
        }));
        for (var i = 0; i < this._btnArr.length; i++) {
            this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        }
        this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnUpgrade, this);
        this.btnZhongZhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZhongZhiClick, this);
        this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
        GameModels.user.player.onPropertyChange(TypeProperty.UnionGongXian, this, this.updataGongXian);
    };
    LegionCorpsMain.prototype.showView = function (isPaly) {
        if (isPaly === void 0) { isPaly = false; }
        for (var i = 0; i < this._btnArr.length; i++) {
            if (i == this._index) {
                this._btnArr[i].currentState = "down";
                this._corpsLab[i].textColor = 0xffffff;
            }
            else {
                this._btnArr[i].currentState = "up";
                this._corpsLab[i].textColor = 0xcfd0d0;
            }
            this._redPointArr[i].visible = GameModels.corps.checkLegoinCorps(i + 1);
        }
        this._corpsVo = GameModels.corps.getCorpsVoByType(this._index + 1);
        this.btnZhongZhi.visible = this._corpsVo.level > 0;
        logger.log("11111111111111", this._corpsVo.level % 6);
        logger.log("22222222222222", this._corpsVo.level / 6);
        this.imgSelecd.x = this._iconArr[this._corpsVo.level % 6].x;
        this.imgSelecd.y = this._iconArr[this._corpsVo.level % 6].y;
        var maxJieJi = this._corpsVo.hashNext ? (this._corpsVo.cropsTemp.step) : 30;
        this.labJieJi.text = maxJieJi + Language.C_J + this._language[this._index];
        for (var i = 0; i < this._countArr.length; i++) {
            this._iconArr[i].source = "crops_json.img_corps_icon_" + this._propertyArr[this._index][i];
            this._countArr[i].text = (this._corpsVo.hashNext ? this._corpsVo.cropsTemp.step : 30) + "";
            if (this._corpsVo.hashNext && this._corpsVo.level % 6 <= i) {
                this._iconArr[i].filters = utils.filterUtil.grayFilters;
            }
            else {
                this._iconArr[i].filters = null;
            }
        }
        this.updataGongXian();
        this.showProperty();
        this.imgSelecd.visible = this._corpsVo.hashNext;
        this.btnUpgrade.visible = this._corpsVo.hashNext;
        this.labTip0.visible = this._corpsVo.hashNext;
        this.reward.visible = this._corpsVo.hashNext;
        this.imgXiaoHao.visible = this._corpsVo.hashNext;
        this.imgManJi.visible = !this._corpsVo.hashNext;
        //var templ: templates.corpsLv = this._corpsVo.hashNext ? this._corpsVo.nextCropsTemp : this._corpsVo.cropsTemp
        this.labUp.text = this._corpsVo.hashNext ? this._corpsVo.nextCropsTemp.name : "";
        this.labDown.textFlow = this._corpsVo.hashNext ? utils.htmlUtil.showProperty(this._corpsVo.nextCropsTemp.propreties) : [];
    };
    LegionCorpsMain.prototype.showProperty = function () {
        var str = "";
        for (var i = 1; i <= this._corpsVo.level; i++) {
            var corpsTemp = Templates.getTemplateByTwoProperty(templates.Map.CORPSLV, "corps", this._corpsVo.type, "lv", i);
            if (str) {
                str = str + ";" + corpsTemp.propreties;
            }
            else {
                str = corpsTemp.propreties;
            }
        }
        str = utils.htmlUtil.computeAttribute(str);
        var strArr = str ? str.split(";") : [];
        for (var i = 0; i < this._propertyLab.length; i++) {
            if (strArr[i]) {
                this._propertyLab[i].textFlow = utils.htmlUtil.showProperty(strArr[i]);
            }
            else {
                this._propertyLab[i].textFlow = utils.htmlUtil.showProperty(this._propertyArr[this._index][i] + "_0");
            }
        }
    };
    LegionCorpsMain.prototype.onZhongZhiClick = function () {
        this.closeZDSJ();
        mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_SFXH1MSJXZZ, this._corpsVo.cropsTemp.resetCost.split("_")[1]), TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
            var _this = this;
            GameModels.corps.requestResetCorps(this._corpsVo.type, utils.Handler.create(this, function () {
                _this.showView();
            }));
        }));
    };
    LegionCorpsMain.prototype.onHelpClick = function () {
        this.closeZDSJ();
        mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5001).des);
    };
    LegionCorpsMain.prototype.onBtnUpgrade = function (e) {
        if (!this._corpsVo)
            return;
        common.CommonBtnLongClick.instance.startLongClickFun(this.btnUpgrade, this, this.caiLiaoUpgradeHandler);
    };
    LegionCorpsMain.prototype.onBtnClick = function (e) {
        this.closeZDSJ();
        this._index = this._btnArr.indexOf(e.currentTarget);
        this.showView();
    };
    LegionCorpsMain.prototype.caiLiaoUpgradeHandler = function () {
        var _this = this;
        if (this._caiLiaoBagCount >= this._caiLiaoNeedCount) {
            GameModels.corps.requestUpCorps(this._corpsVo.type, utils.Handler.create(this, function () {
                mg.effectManager.playEffectOnce(TypeEffectId.SHENGJI_EFF, _this.width * 0.5, _this.height * 0.5, _this);
                _this.showView(true);
            }));
        }
        else {
            this.alertPropView("1401");
        }
    };
    LegionCorpsMain.prototype.alertPropView = function (id) {
        this.closeZDSJ();
        mg.alertManager.showAlert(PropOfSourceAlert, true, true, id);
    };
    LegionCorpsMain.prototype.closeZDSJ = function () {
        common.CommonBtnLongClick.instance.stopLongClickFun();
    };
    LegionCorpsMain.prototype.updataGongXian = function () {
        if (!this._corpsVo.hashNext)
            return;
        this.reward.dataSource = this._corpsVo.cropsTemp.consume.split("_")[0] + "_0";
        this._caiLiaoBagCount = GameModels.user.player.getProperty(TypeProperty.UnionGongXian);
        this._caiLiaoNeedCount = parseInt(this._corpsVo.cropsTemp.consume.split("_")[1]);
        this.reward.labName.text = this._caiLiaoBagCount + "/" + this._caiLiaoNeedCount;
        this.reward.labName.textColor = this._caiLiaoBagCount >= this._caiLiaoNeedCount ? 0x00ff00 : 0xff0000;
    };
    LegionCorpsMain.prototype.exit = function () {
        this.closeZDSJ();
        for (var i = 0; i < this._btnArr.length; i++) {
            this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        }
        this.btnUpgrade.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnUpgrade, this);
        this.btnZhongZhi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onZhongZhiClick, this);
        this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
        GameModels.user.player.offPropertyChange(TypeProperty.UnionGongXian, this, this.updataGongXian);
    };
    return LegionCorpsMain;
}(ui.LegionCorpsMainSkin));
__reflect(LegionCorpsMain.prototype, "LegionCorpsMain");

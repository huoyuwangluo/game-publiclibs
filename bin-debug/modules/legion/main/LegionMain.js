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
var LegionMain = (function (_super) {
    __extends(LegionMain, _super);
    function LegionMain() {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this._angle = 0;
        return _this;
    }
    LegionMain.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
        Mediator.getMediator(this).onUpdate(this, function () {
            this.upDataMyLegion();
        });
        this._playerShowAvatar = [];
        this._bossName = [this.labname1, this.labname2, this.labname3];
        this._bossHead = [this.imgPetModel0, this.imgPetModel1, this.imgPetModel2];
        for (var i = 0; i < 3; i++) {
            var playerShowAvatar = new components.PlayerShowAvatar();
            this._playerShowAvatar.push(playerShowAvatar);
            if (i == 0) {
                playerShowAvatar.x = 300;
                playerShowAvatar.y = 430;
                this.addChild(playerShowAvatar);
            }
            else if (i == 1) {
                playerShowAvatar.x = 300 - 200;
                playerShowAvatar.y = 460;
                this.addChildAt(playerShowAvatar, this.getChildIndex(this._playerShowAvatar[0]) - 1);
            }
            else {
                playerShowAvatar.x = 300 + 200;
                playerShowAvatar.y = 460;
                this.addChildAt(playerShowAvatar, this.getChildIndex(this._playerShowAvatar[0]) - 1);
                this.addChildAt(this.imgPreBg, this.getChildIndex(playerShowAvatar) + 1);
                this.addChildAt(this.btnFirstGift, this.getChildIndex(this.imgPreBg) + 1);
            }
            // this.addChild(playerShowAvatar);
        }
        this._tabBtns = [this.btnDaily, this.btnWelfare];
        this._btnMoBai = [this.btn_worship1, this.btn_worship2, this.btn_worship3];
        GameModels.state.registerWarnTarget(GameRedState.UNION_RICHANG, this.btnDaily);
        GameModels.state.registerWarnTarget(GameRedState.UNION_FULI, this.btnWelfare);
        GameModels.state.registerWarnTarget(GameRedState.UNION_RICHANG_ZHANQI, this.btnFlag);
        GameModels.state.registerWarnTarget(GameRedState.UNION_RICHANG_TASK, this.btnTask);
        GameModels.state.registerWarnTarget(GameRedState.UNION_RICHANG_WUGUAN, this.btnOfficer);
        GameModels.state.registerWarnTarget(GameRedState.UNION_FULI_BINGZHONG, this.btnCrops);
        GameModels.state.registerWarnTarget(GameRedState.UNION_FULI_TEHUI, this.btnLegionTeHui);
        GameModels.state.registerWarnTarget(GameRedState.UNION_SHARE, this.btnShare);
    };
    LegionMain.prototype.enter = function (data) {
        this.btnFashion.visible = GameModels.platform.isPay;
        this.group1.removeChildren();
        this.group2.removeChildren();
        if (GameModels.platform.isPay) {
            this.group1.addChild(this.btnTask);
            this.group1.addChild(this.btnOfficer);
            this.group1.addChild(this.btnFlag);
            this.group1.addChild(this.btnList);
            this.group2.addChild(this.btnCrops);
            this.group2.addChild(this.btnLegionTeHui);
            if (platform.sdk && platform.sdk.type == "wx") {
                this.group2.addChild(this.btnShare);
            }
        }
        else {
            this.group1.addChild(this.btnTask);
            this.group1.addChild(this.btnOfficer);
            this.group1.addChild(this.btnList);
            this.group2.addChild(this.btnCrops);
            if (platform.sdk && platform.sdk.type == "wx") {
                this.group2.addChild(this.btnShare);
            }
        }
        if (GameModels.serverTime.kaifuDay == 2 && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_3) <= 0) {
            mg.alertManager.showAlert(dialog.battlefield.BattlefieldYuGao, true, true);
            GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_3);
        }
        this._count = 0;
        this._angle = 0;
        egret.Tween.removeTweens(this.imgPreBg);
        mg.soundManager.playViewLongSound("SoundJM_4", "LEGIONMAIN");
        var index = data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 1;
        this.showLegionType(index);
        this.btnWelfare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnDaily.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        //this.btnDynamic.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnTask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnOfficer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OfficerClick, this);
        this.btnFlag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.flagClick, this);
        // this.btnShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shopClick, this);
        this.btn_worship1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btn_worship2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btn_worship3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnCrops.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnLegionTeHui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnFashion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnFirstGift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        GameModels.legion.addEventListener(mo.ModelLegion.UNION_FIRSTGIFT, this.updateGiftRedPoint, this);
        GameModels.legion.myLegionInfo(1, utils.Handler.create(this, function () {
            this.upDataMyLegion();
        }));
        GameModels.legion.updateMiliary(utils.Handler.create(this, function () {
            this.showView();
        }));
        GameModels.legion.addEventListener(mo.ModelLegion.CHANGE_UNIONLV, this.upDataMyLegion, this);
        GameModels.user.player.onPropertyChange(TypeProperty.UnionOfficialId, this, this.upDataMyLegion);
        GameModels.legion.addEventListener(mo.ModelLegion.CHANGE_FIGTHPOWER, this.upDataMyLegion, this);
        this.btnCheckUnion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
    };
    // private shopClick(e: egret.TouchEvent): void {
    // 	mg.uiManager.show(LegionShop);
    // }
    LegionMain.prototype.flagClick = function (e) {
        mg.uiManager.show(LegionZhenQi);
    };
    LegionMain.prototype.OfficerClick = function (e) {
        mg.uiManager.show(dialog.WenGuan.WenGuanDialog, { tabIndex: 1 });
    };
    LegionMain.prototype.upDataMyLegion = function () {
        this.img_name.source = "img_flag_" + GameModels.legion.unionId + "_png";
        this.lvnuber.text = GameModels.legion.legionLevel.toString();
        this.labNotice.text = TypeUnionName.ANNOUNCEMENT[GameModels.legion.unionId - 1];
    };
    LegionMain.prototype.updateGiftRedPoint = function () {
        this.btnFirstGift.visible = GameModels.legion.firstRewardFlag < 2;
        this.imgPreBg.visible = GameModels.legion.firstRewardFlag < 2;
        this.btnFirstGift.isWarn = GameModels.legion.firstRewardFlag == 1;
    };
    LegionMain.prototype.showView = function () {
        this.btnFirstGift.visible = GameModels.legion.firstRewardFlag < 2;
        this.imgPreBg.visible = GameModels.legion.firstRewardFlag < 2;
        this.btnFirstGift.isWarn = GameModels.legion.firstRewardFlag == 1;
        if (GameModels.legion.firstRewardFlag < 2)
            this.tweenPreviewImgHandler();
        var itmes = GameModels.legion.TopThreeList;
        for (var i = 0; i < itmes.length; i++) {
            if (itmes[i]) {
                if (itmes[i].CanWorship == 1) {
                    this._btnMoBai[i].filters = null;
                    this._btnMoBai[i].touchEnabled = true;
                    this._btnMoBai[i].label = Language.J_MB;
                }
                else {
                    this._btnMoBai[i].filters = utils.filterUtil.grayFilters;
                    this._btnMoBai[i].touchEnabled = false;
                    this._btnMoBai[i].label = Language.J_YMB;
                }
                if (itmes[i].MonsterId > 0) {
                    var data = Templates.getTemplateByProperty(templates.Map.OTHERMONSTER, "id", itmes[i].MonsterId);
                    this._bossHead[i].visible = true;
                    this._bossHead[i].setPetBody(data.resId, true, false);
                    this._bossName[i].text = data.name;
                    if (this._playerShowAvatar[i]) {
                        this._playerShowAvatar[i].reset();
                    }
                }
                else {
                    this.refreshModel(itmes[i].ClothesId.toString(), itmes[i].WeaponId.toString(), itmes[i].Step, itmes[i].PlayerName);
                    this._bossHead[i].visible = false;
                }
            }
        }
        this.btn_worship1.isWarn = this.btn_worship1.touchEnabled;
        this.btn_worship2.isWarn = this.btn_worship2.touchEnabled;
        this.btn_worship3.isWarn = this.btn_worship3.touchEnabled;
    };
    LegionMain.prototype.refreshModel = function (clothId, weaponId, step, name) {
        if (this._playerShowAvatar[step - 1])
            this._playerShowAvatar[step - 1].reset();
        var c = Templates.getTemplateById(templates.Map.GAMEFASHION, clothId);
        var w = Templates.getTemplateById(templates.Map.GAMEFASHION, weaponId);
        if (!!c) {
            clothId = c.modelId;
        }
        if (!!w) {
            weaponId = w.modelId;
        }
        if (this._playerShowAvatar[step - 1]) {
            this._playerShowAvatar[step - 1].clothResId = clothId;
            this._playerShowAvatar[step - 1].weaponResId = weaponId;
        }
        this._bossName[step - 1].text = name;
    };
    LegionMain.prototype.showLegionType = function (type) {
        if (type == 1) {
            this.group1.visible = true;
            this.group2.visible = false;
            this._tabBtns[0].currentState = "down";
            this._tabBtns[1].currentState = "up";
        }
        else if (type == 2) {
            this.group1.visible = false;
            this.group2.visible = true;
            this._tabBtns[0].currentState = "up";
            this._tabBtns[1].currentState = "down";
        }
    };
    LegionMain.prototype.setNoticeText = function (text) {
        this.labNotice.text = text;
    };
    LegionMain.prototype.btnClick = function (e) {
        var _this = this;
        if (e.currentTarget == this.btnDaily) {
            this.showLegionType(1);
        }
        else if (e.currentTarget == this.btnWelfare) {
            this.showLegionType(2);
        }
        else if (e.currentTarget == this.btnTask) {
            mg.uiManager.show(dialog.legion.LegionTaskMain, { tabIndex: 1 });
        }
        else if (e.currentTarget == this.btnList) {
            mg.uiManager.show(LegionNumberList);
        }
        else if (e.currentTarget == this.btnCrops) {
            //  mg.alertManager.tip("正在开放中....");
            mg.uiManager.show(LegionCorpsMain);
        }
        else if (e.currentTarget == this.btn_worship1) {
            GameModels.legion.Worship(1, utils.Handler.create(this, function () {
                this.btn_worship1.filters = utils.filterUtil.grayFilters;
                this.btn_worship1.touchEnabled = false;
                this.btn_worship1.label = Language.J_YMB;
                this.btn_worship1.isWarn = this.btn_worship1.touchEnabled;
                mg.alertManager.tip(Language.getExpression(Language.J_HDGX, 300));
            }));
        }
        else if (e.currentTarget == this.btn_worship2) {
            GameModels.legion.Worship(2, utils.Handler.create(this, function () {
                this.btn_worship2.filters = utils.filterUtil.grayFilters;
                this.btn_worship2.touchEnabled = false;
                this.btn_worship2.label = Language.J_YMB;
                this.btn_worship2.isWarn = this.btn_worship2.touchEnabled;
                mg.alertManager.tip(Language.getExpression(Language.J_HDGX, 200));
            }));
        }
        else if (e.currentTarget == this.btn_worship3) {
            GameModels.legion.Worship(3, utils.Handler.create(this, function () {
                _this.btn_worship3.filters = utils.filterUtil.grayFilters;
                _this.btn_worship3.touchEnabled = false;
                _this.btn_worship3.label = Language.J_YMB;
                _this.btn_worship3.isWarn = _this.btn_worship3.touchEnabled;
                mg.alertManager.tip(Language.getExpression(Language.J_HDGX, 100));
            }));
        }
        else if (e.currentTarget == this.btnCheckUnion) {
            mg.alertManager.showAlert(LegionThreeKingdoms, true, true);
        }
        else if (e.currentTarget == this.btnLegionTeHui) {
            mg.uiManager.show(dialog.legion.LegionTeHuiMain);
        }
        else if (e.currentTarget == this.btnFashion) {
            mg.uiManager.show(dialog.fashion.FashionMainDialog);
        }
        else if (e.currentTarget == this.btnFirstGift) {
            mg.alertManager.showAlert(CampFirstImperatorGiftAlert, true, true);
        }
        else if (e.currentTarget == this.btnShare) {
            mg.uiManager.show(dialog.legion.LegionShareFriend);
        }
    };
    LegionMain.prototype.exit = function () {
        if (GameModels.serverTime.kaifuDay == 1 && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_2) <= 0) {
            mg.alertManager.showAlert(dialog.battlefield.BattlefieldYuGao, true, true);
            GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_2);
        }
        this._count = 0;
        this._angle = 0;
        egret.Tween.removeTweens(this.imgPreBg);
        this.btnWelfare.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnDaily.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        //this.btnDynamic.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnTask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btn_worship1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btn_worship2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btn_worship3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnOfficer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OfficerClick, this);
        this.btnFlag.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.flagClick, this);
        this.btnLegionTeHui.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        GameModels.legion.removeEventListener(mo.ModelLegion.UNION_FIRSTGIFT, this.updateGiftRedPoint, this);
        // this.btnShop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shopClick, this);
        GameModels.legion.removeEventListener(mo.ModelLegion.CHANGE_UNIONLV, this.upDataMyLegion, this);
        GameModels.user.player.offPropertyChange(TypeProperty.UnionOfficialId, this, this.upDataMyLegion);
        GameModels.legion.removeEventListener(mo.ModelLegion.CHANGE_FIGTHPOWER, this.upDataMyLegion, this);
        this.btnCrops.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnCheckUnion.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnFashion.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnFirstGift.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        this.btnShare.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        for (var i = 0; i < 3; i++) {
            if (this._playerShowAvatar[i]) {
                this._playerShowAvatar[i].reset();
            }
        }
    };
    LegionMain.prototype.tweenPreviewImgHandler = function () {
        this._count++;
        this._angle = this._count * 360;
        egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
    };
    LegionMain.prototype.removeThis = function () {
        mg.uiManager.remove(this);
    };
    return LegionMain;
}(ui.LegionMainSkin));
__reflect(LegionMain.prototype, "LegionMain");
